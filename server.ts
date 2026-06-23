import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Database files structure (JSON state persistent database)
  const DB_DIR = path.join(process.cwd(), "data");
  const MR_DB_PATH = path.join(DB_DIR, "mr_bookings.json");
  const PAST_MR_DB_PATH = path.join(DB_DIR, "past_mr_bookings.json");
  const PATIENT_DB_PATH = path.join(DB_DIR, "patient_appointments.json");

  // Ensure DB files exist
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(MR_DB_PATH)) {
      fs.writeFileSync(MR_DB_PATH, JSON.stringify([], null, 2), "utf-8");
    }
    if (!fs.existsSync(PAST_MR_DB_PATH)) {
      fs.writeFileSync(PAST_MR_DB_PATH, JSON.stringify([], null, 2), "utf-8");
    }
    if (!fs.existsSync(PATIENT_DB_PATH)) {
      fs.writeFileSync(PATIENT_DB_PATH, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Database directory setup error:", err);
  }

  // API Route - Get MR bookings
  app.get("/api/mr-bookings", (req, res) => {
    try {
      if (!fs.existsSync(MR_DB_PATH)) {
        return res.json([]);
      }
      const data = fs.readFileSync(MR_DB_PATH, "utf-8");
      res.json(JSON.parse(data || "[]"));
    } catch (e) {
      console.error("Error reading MR bookings:", e);
      res.status(500).json({ error: "Failed to read database" });
    }
  });

  // API Route - Get past (historical) MR bookings
  app.get("/api/past-mr-bookings", (req, res) => {
    try {
      if (!fs.existsSync(PAST_MR_DB_PATH)) {
        return res.json([]);
      }
      const data = fs.readFileSync(PAST_MR_DB_PATH, "utf-8");
      res.json(JSON.parse(data || "[]"));
    } catch (e) {
      console.error("Error reading past MR bookings:", e);
      res.status(500).json({ error: "Failed to read past database" });
    }
  });

  // API Route - Save/Update MR bookings
  app.post("/api/mr-bookings", (req, res) => {
    try {
      const newBookings = req.body; // Expects array of bookings
      if (!Array.isArray(newBookings)) {
        return res.status(400).json({ error: "Invalid booking payload" });
      }
      if (newBookings.length > 15) {
        return res.status(400).json({ error: "Booking capacity exceeded. Maximum is 15." });
      }
      
      fs.writeFileSync(MR_DB_PATH, JSON.stringify(newBookings, null, 2), "utf-8");

      // Auto-populate past_mr_bookings.json with newly introduced bookings in history
      let pastBookings: any[] = [];
      if (fs.existsSync(PAST_MR_DB_PATH)) {
        try {
          pastBookings = JSON.parse(fs.readFileSync(PAST_MR_DB_PATH, "utf-8") || "[]");
        } catch (err) {
          pastBookings = [];
        }
      }

      let historyChanged = false;
      newBookings.forEach((booking) => {
        const alreadyExists = pastBookings.some((p) => p.code === booking.code);
        if (!alreadyExists) {
          pastBookings.push(booking);
          historyChanged = true;
        }
      });

      if (historyChanged || !fs.existsSync(PAST_MR_DB_PATH)) {
        fs.writeFileSync(PAST_MR_DB_PATH, JSON.stringify(pastBookings, null, 2), "utf-8");
      }

      res.json({ success: true, bookings: newBookings });
    } catch (e) {
      console.error("Error writing MR bookings:", e);
      res.status(500).json({ error: "Failed to save to database" });
    }
  });

  // API Route - Get patient appointments
  app.get("/api/patient-appointments", (req, res) => {
    try {
      if (!fs.existsSync(PATIENT_DB_PATH)) {
        return res.json([]);
      }
      const data = fs.readFileSync(PATIENT_DB_PATH, "utf-8");
      res.json(JSON.parse(data || "[]"));
    } catch (e) {
      console.error("Error reading patient appointments:", e);
      res.status(500).json({ error: "Failed to read database" });
    }
  });

  // API Route - Save/Update patient appointments
  app.post("/api/patient-appointments", (req, res) => {
    try {
      const newAppointments = req.body; // Expects array of appointments
      if (!Array.isArray(newAppointments)) {
        return res.status(400).json({ error: "Invalid appointment payload" });
      }
      fs.writeFileSync(PATIENT_DB_PATH, JSON.stringify(newAppointments, null, 2), "utf-8");
      res.json({ success: true, appointments: newAppointments });
    } catch (e) {
      console.error("Error writing patient appointments:", e);
      res.status(500).json({ error: "Failed to save to database" });
    }
  });

  // Vite middleware for development or static server for production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Database Server] Live on http://localhost:${PORT}`);
  });
}

startServer();
