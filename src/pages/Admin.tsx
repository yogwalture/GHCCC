import React, { useState, useEffect } from "react";
import { 
  Users, 
  Calendar, 
  Activity, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageCircle,
  Send,
  Sliders,
  Smartphone,
  Check,
  Save,
  Plus,
  Trash2,
  Download,
  Briefcase,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

// Standard patient mock data representing different clinic visits and feedback stages
const defaultPatients = [
  {
    id: "clinical-1",
    name: "Rahul Sharma",
    phone: "918329573283",
    email: "rahul.sharma@gmail.com",
    doctor: "Dr. Gitesh Dalvi",
    reason: "Post-Diabetic Follow-up",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Yesterday
    time: "10:30 AM",
    status: "completed",
    feedbackScheduled: true,
    feedbackScheduledTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    feedbackTriggered: false
  },
  {
    id: "clinical-2",
    name: "Priya Patil",
    phone: "917028123456",
    email: "priya.p@outlook.com",
    doctor: "Dr. Sachin Patil",
    reason: "Knee Joint Pain Consultation",
    date: new Date(Date.now()).toISOString().split("T")[0], // Today
    time: "11:15 AM",
    status: "confirmed",
    feedbackScheduled: true,
    feedbackScheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    feedbackTriggered: false
  },
  {
    id: "clinical-3",
    name: "Suresh Deshmukh",
    phone: "919422345678",
    email: "suresh.desh@gmail.com",
    doctor: "Dr. Vijay Walture",
    reason: "Chronic Hypertension Check",
    date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().split("T")[0], // 2 days ago
    time: "12:00 PM",
    status: "completed",
    feedbackScheduled: true,
    feedbackScheduledTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    feedbackTriggered: true,
    feedbackTriggeredAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
  },
  {
    id: "clinical-4",
    name: "Anita Kulkarni",
    phone: "918888888888",
    email: "anita.k@yahoo.com",
    doctor: "Dr. Dilip Thombre",
    reason: "Cardiology Screening",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Tomorrow
    time: "02:30 PM",
    status: "confirmed",
    feedbackScheduled: false,
    feedbackScheduledTime: "N/A - Pending Visit",
    feedbackTriggered: false
  }
];

export function Admin() {
  const [adminEmail, setAdminEmail] = useState<string | null>(() => localStorage.getItem("gajanan_admin_email"));
  const [loginStep, setLoginStep] = useState<"choose" | "enter" | "authenticating">("choose");
  const [inputEmail, setInputEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [mrBookings, setMrBookings] = useState<any[]>([]);
  const [mrSearchQuery, setMrSearchQuery] = useState("");
  const [mrDoctorFilter, setMrDoctorFilter] = useState("all");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [feedbackTemplate, setFeedbackTemplate] = useState<string>(() => {
    return localStorage.getItem("gajanan_feedback_template") || 
      `Dear *{PATIENT_NAME}*,\n\nGreetings from *Gajanan Hospital & Critical Care Centre*! 🏥\n\nIt has been {DELAY_HOURS} hours since your appointment with *{DOCTOR_NAME}*. We hope you are recovering well! 🌸\n\nTo help us constantly elevate our clinic standards, please rate your experience by replying with 1 to 5 stars or comment directly on how we did. Thank you! ⭐\n\n_Keep this chat saved for reports, upcoming clinical checkups, or medicine advice._`;
  });
  const [feedbackDelay, setFeedbackDelay] = useState<string>("24");
  const [toastMsg, setToastMsg] = useState("");
  const [isAddingApt, setIsAddingApt] = useState(false);
  
  // Custom states for manual appointment addition
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientPhone, setNewPatientPhone] = useState("");
  const [newPatientDoc, setNewPatientDoc] = useState("Dr. Gitesh Dalvi");
  const [newPatientReason, setNewPatientReason] = useState("");

  // Clean raw phone number
  const normalizePhoneNumber = (phone: string) => {
    const clean = phone.replace(/\D/g, "");
    if (clean.length === 10) {
      return `91${clean}`;
    }
    return clean;
  };

  // Sync to database and local storage
  useEffect(() => {
    const fetchAndSyncAppointments = async () => {
      let serverAppointments: any[] = [];
      try {
        const res = await fetch("/api/patient-appointments");
        if (res.ok) {
          serverAppointments = await res.json();
        }
      } catch (err) {
        console.error("Failed to fetch patient appointments:", err);
      }

      const stored = localStorage.getItem("gajanan_patient_appointments");
      let localAppointments: any[] = [];
      if (stored) {
        try {
          localAppointments = JSON.parse(stored);
        } catch (e) {
          localAppointments = [];
        }
      } else {
        localAppointments = defaultPatients;
      }

      // Merge arrays based on key uniqueness
      const merged = [...serverAppointments];
      localAppointments.forEach((local) => {
        const exists = merged.some((serv) => serv.id === local.id);
        if (!exists) {
          merged.push(local);
        }
      });

      // If both were completely empty, fallback to defaultPatients
      if (merged.length === 0) {
        merged.push(...defaultPatients);
      }

      setAppointments(merged);
      localStorage.setItem("gajanan_patient_appointments", JSON.stringify(merged));

      // Push back to server DB if merged is larger than server list
      if (merged.length > serverAppointments.length) {
        try {
          await fetch("/api/patient-appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(merged),
          });
        } catch (err) {
          console.error("Failed to sync merged appointments to backend database:", err);
        }
      }
    };

    fetchAndSyncAppointments();
  }, []);

  // Sync MR bookings list from server-side persistent database when tab is selected
  useEffect(() => {
    const fetchMrBookingsData = async () => {
      try {
        const res = await fetch("/api/mr-bookings");
        if (res.ok) {
          const data = await res.json();
          setMrBookings(data);
        }
      } catch (err) {
        console.error("Failed to fetch MR bookings in admin:", err);
      }
    };
    if (adminEmail === "yogwalture@gmail.com") {
      fetchMrBookingsData();
    }
  }, [activeTab, adminEmail]);

  // Handler to delete/cancel MR bookings
  const handleDeleteMrBooking = async (code: string) => {
    const updated = mrBookings.filter((b) => b.code !== code);
    setMrBookings(updated);
    localStorage.setItem("gajanan_mr_bookings", JSON.stringify(updated));
    try {
      await fetch("/api/mr-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      triggerToast("Representative meeting slot canceled successfully.");
    } catch (err) {
      console.error("Failed to sync deleted MR booking:", err);
    }
  };

  const saveAppointments = async (updated: any[]) => {
    setAppointments(updated);
    localStorage.setItem("gajanan_patient_appointments", JSON.stringify(updated));
    try {
      await fetch("/api/patient-appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error("Failed to save appointments to server database:", err);
    }
  };

  // Toast notifier
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg("");
    }, 4000);
  };

  // Add new clinical appointment directly
  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName || !newPatientPhone) return;

    const newApt = {
      id: `clinical-${Date.now()}`,
      name: newPatientName,
      phone: normalizePhoneNumber(newPatientPhone),
      email: "Added by Admin",
      doctor: newPatientDoc,
      reason: newPatientReason || "General consultation follow-up",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM",
      status: "confirmed",
      feedbackScheduled: true,
      feedbackScheduledTime: new Date(Date.now() + parseInt(feedbackDelay) * 60 * 60 * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      feedbackTriggered: false
    };

    const updated = [newApt, ...appointments];
    saveAppointments(updated);
    triggerToast("Patient added! Feedback session scheduled in " + feedbackDelay + " hours.");

    // Reset Form
    setNewPatientName("");
    setNewPatientPhone("");
    setNewPatientReason("");
    setIsAddingApt(false);
  };

  // Save changes to template
  const handleSaveTemplate = () => {
    localStorage.setItem("gajanan_feedback_template", feedbackTemplate);
    triggerToast("Feedback template saved successfully!");
  };

  // Delete appointment
  const handleDeleteAppointment = (id: string) => {
    const filtered = appointments.filter(a => a.id !== id);
    saveAppointments(filtered);
    triggerToast("Patient file and scheduler deleted.");
  };

  // Toggle feedback scheduling
  const handleToggleSchedule = (id: string) => {
    const updated = appointments.map(appt => {
      if (appt.id === id) {
        const nextScheduledDate = new Date(Date.now() + parseInt(feedbackDelay) * 60 * 60 * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
        return {
          ...appt,
          feedbackScheduled: !appt.feedbackScheduled,
          feedbackScheduledTime: appt.feedbackScheduled ? "N/A - Paused" : nextScheduledDate
        };
      }
      return appt;
    });
    saveAppointments(updated);
    triggerToast("Feedback scheduler state updated.");
  };

  // Toggle treatment/appointment status
  const handleToggleAptStatus = (id: string, newStatus: string) => {
    const updated = appointments.map(appt => {
      if (appt.id === id) {
        const nextScheduledDate = new Date(Date.now() + parseInt(feedbackDelay) * 60 * 60 * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
        return {
          ...appt,
          status: newStatus,
          // When marked as completed, make sure scheduled is active
          feedbackScheduled: newStatus === "completed" ? true : appt.feedbackScheduled,
          feedbackScheduledTime: newStatus === "completed" ? nextScheduledDate : appt.feedbackScheduledTime
        };
      }
      return appt;
    });
    saveAppointments(updated);
    triggerToast(`Appointment marked as ${newStatus}!`);
  };

  // Build real WhatsApp API link
  const getWhatsAppURL = (appt: any) => {
    let text = feedbackTemplate
      .replace("{PATIENT_NAME}", appt.name)
      .replace("{DOCTOR_NAME}", appt.doctor)
      .replace("{DELAY_HOURS}", feedbackDelay);

    const normPhone = normalizePhoneNumber(appt.phone);
    return `https://api.whatsapp.com/send?phone=${normPhone}&text=${encodeURIComponent(text)}`;
  };

  // Trigger campaign message directly and mark as sent
  const triggerFeedbackNow = (appt: any) => {
    const updated = appointments.map(a => {
      if (a.id === appt.id) {
        return {
          ...a,
          feedbackTriggered: true,
          feedbackTriggeredAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
        };
      }
      return a;
    });
    saveAppointments(updated);

    // Open WhatsApp Message tab
    const url = getWhatsAppURL(appt);
    window.open(url, "_blank");
    triggerToast(`Feedback dispatched to ${appt.name} inside WhatsApp layout!`);
  };

  // Simulated Time Machine: Trigger all pending 24h messages in a batch
  const triggerBatchFeedbacks = () => {
    let count = 0;
    const updated = appointments.map(appt => {
      if (appt.feedbackScheduled && !appt.feedbackTriggered && (appt.status === "completed" || appt.status === "confirmed")) {
        count++;
        return {
          ...appt,
          feedbackTriggered: true,
          feedbackTriggeredAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
        };
      }
      return appt;
    });

    if (count === 0) {
      triggerToast("No new scheduled feedback tasks were pending of past dates.");
      return;
    }

    saveAppointments(updated);
    triggerToast(`Time Machine fast-forward successful! Auto-dispatched ${count} scheduled feedback messages!`);
  };

  // Generate a live rendering preview based on first patient
  const previewPatient = appointments[0] || { name: "Guest Patient", doctor: "Dr. Gitesh Dalvi" };
  const renderedPreviewText = feedbackTemplate
    .replace("{PATIENT_NAME}", previewPatient.name)
    .replace("{DOCTOR_NAME}", previewPatient.doctor)
    .replace("{DELAY_HOURS}", feedbackDelay);

  // Filter listings
  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch = appt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          appt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          appt.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === "all" || appt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats calculation
  const totalCount = appointments.length;
  const completedCount = appointments.filter(a => a.status === "completed").length;
  const scheduledCount = appointments.filter(a => a.feedbackScheduled && !a.feedbackTriggered).length;
  const triggeredCount = appointments.filter(a => a.feedbackTriggered).length;
  const rateLimitResponsePercent = totalCount > 0 ? Math.round((triggeredCount / totalCount) * 100) : 0;

  if (adminEmail !== "yogwalture@gmail.com") {
    const handleGoogleChoose = (email: string) => {
      setLoginStep("authenticating");
      setErrorMsg("");
      setTimeout(() => {
        if (email === "yogwalture@gmail.com") {
          localStorage.setItem("gajanan_admin_email", "yogwalture@gmail.com");
          setAdminEmail("yogwalture@gmail.com");
        } else {
          setLoginStep("choose");
          setErrorMsg("Access Denied. Only yogwalture@gmail.com is authorized to enter this dashboard.");
        }
      }, 1500);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputEmail) return;
      
      const trimmed = inputEmail.trim().toLowerCase();
      setLoginStep("authenticating");
      setErrorMsg("");
      setTimeout(() => {
        if (trimmed === "yogwalture@gmail.com") {
          localStorage.setItem("gajanan_admin_email", "yogwalture@gmail.com");
          setAdminEmail("yogwalture@gmail.com");
        } else {
          setLoginStep("enter");
          setErrorMsg("Access Denied. Only yogwalture@gmail.com is registered as an administrator.");
        }
      }, 1500);
    };

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans antialiased text-gray-950 border-t-[5px] border-t-blue-900">
        <Link to="/" className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-950 transition-colors">
          &larr; Back to Hospital Front
        </Link>
        
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-gray-200/80 p-8 space-y-6 relative overflow-hidden transition-all duration-300">
          
          {/* Top Google G logo */}
          <div className="flex flex-col items-center text-center space-y-4">
            <svg className="h-10 w-10 select-none animate-pulse" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ animationDuration: '3.6s' }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">Sign in with Google</h2>
              <p className="text-xs text-gray-500 font-medium">to continue to Gajanan Hospital Clinical Portal</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loginStep === "choose" && (
              <motion.div
                key="choose"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 font-sans"
              >
                {/* Error Banner if any */}
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="border border-gray-150 rounded-xl divide-y divide-gray-150 overflow-hidden bg-white">
                    
                    {/* Authorized Account option */}
                    <button
                      type="button"
                      onClick={() => handleGoogleChoose("yogwalture@gmail.com")}
                      className="w-full text-left p-3.5 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-blue-600 text-white font-bold text-sm tracking-wide uppercase rounded-full flex items-center justify-center shadow-xs">
                          YW
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-950 truncate">Yogesh Walture (Admin)</p>
                          <p className="text-[11px] text-gray-500 truncate">yogwalture@gmail.com</p>
                        </div>
                      </div>
                      <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-100 font-extrabold px-1.5 py-0.5 rounded-full tracking-wider uppercase">Verified Admin</span>
                    </button>

                    {/* Another account option */}
                    <button
                      type="button"
                      onClick={() => {
                        setLoginStep("enter");
                        setErrorMsg("");
                      }}
                      className="w-full text-left p-3.5 hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer focus:outline-none"
                    >
                      <div className="h-9 w-9 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-700">Use another Google Account</p>
                        <p className="text-[10px] text-gray-400">Sign in with a different email</p>
                      </div>
                    </button>
                    
                  </div>
                </div>

                <div className="text-[10.5px] text-gray-400 leading-normal text-center pt-2">
                  Hospital policy restricts unrecognized domains. Google OAuth accounts mapping verified handlers can enter.
                </div>
              </motion.div>
            )}

            {loginStep === "enter" && (
              <motion.div
                key="enter"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 font-sans"
              >
                {/* Error Banner if any */}
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black tracking-wider uppercase text-gray-400">Google Account Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. yogwalture@gmail.com"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      className="w-full text-xs font-medium p-3 border border-gray-200 focus:ring-1 focus:ring-[#128C7E] focus:border-[#128C7E] rounded-lg outline-none bg-slate-50/50 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginStep("choose");
                        setErrorMsg("");
                      }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-all shadow-xs cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {loginStep === "authenticating" && (
              <motion.div
                key="authenticating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="relative h-12 w-12 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20" />
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Secure Sign-On</p>
                  <p className="text-xs text-gray-600 font-semibold leading-relaxed">Verifying Google user permissions with clinic role database...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
        
        {/* Footer info lock indicator */}
        <div className="mt-8 flex items-center gap-1.5 text-[10.5px] text-gray-400 font-semibold select-none">
          <Lock className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          <span>Gajanan Admin Security Protocol v3.8</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans text-gray-800">
      
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 bg-blue-950 text-white font-black text-xs uppercase px-5 py-3 rounded-full shadow-xl border border-blue-800 flex items-center gap-2.5 z-50 tracking-wider"
          >
            <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Sidebar Navigation */}
      <aside className="w-full lg:w-68 bg-blue-950 text-white shrink-0 flex flex-col border-r border-blue-900">
        <div className="p-6 border-b border-blue-900 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-1">
              <span className="text-emerald-400 font-extrabold uppercase">Gajanan</span>
              <span>Hospital</span>
            </h1>
            <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mt-0.5">Clinical Admin Module</p>
          </div>
          <Link 
            to="/" 
            className="text-[10.5px] font-black bg-blue-900 border border-blue-800 text-blue-100 hover:text-white hover:bg-blue-805 px-2.5 py-1.5 rounded-lg transition-all"
          >
            Exit Dashboard
          </Link>
        </div>
        
        <nav className="flex-grow p-4 space-y-1.5">
          {[
            { id: "dashboard", label: "Overview Controls", icon: Activity, count: null },
            { id: "appointments", label: "Patients & Queue", icon: Users, count: filteredAppointments.length },
            { id: "feedback", label: "Feedback Campaign", icon: MessageCircle, count: scheduledCount > 0 ? scheduledCount : null },
            { id: "mr_bookings", label: "MR Portal Bookings", icon: Briefcase, count: mrBookings.length > 0 ? mrBookings.length : null },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === item.id 
                  ? "bg-[#128C7E] text-white shadow-md font-bold" 
                  : "text-blue-200 hover:bg-blue-900/40 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <item.icon className="h-4.5 w-4.5 flex-shrink-0" />
                <span className="text-xs font-bold leading-none">{item.label}</span>
              </div>
              {item.count !== null && (
                <span className="text-[10px] bg-blue-900 px-2 py-0.5 rounded-full font-bold">{item.count}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-900 space-y-3 bg-blue-955/30">
          <div className="bg-blue-900/40 rounded-xl p-3 border border-blue-900/50">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Automated Scheduler</span>
            </div>
            <p className="text-[11px] text-blue-200 font-medium leading-normal mt-1">
              Active delay: <strong className="text-white">{feedbackDelay} Hours</strong> after consultation status completed.
            </p>
          </div>
          <Link to="/" className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-xs font-bold text-red-300 hover:bg-red-500/10 rounded-lg transition-colors leading-none cursor-pointer">
            <LogOut className="h-4 w-4" />
            <span>Return to Site Home</span>
          </Link>
          <button 
            type="button"
            onClick={() => {
              localStorage.removeItem("gajanan_admin_email");
              setAdminEmail(null);
            }}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/10 rounded-lg transition-colors leading-none cursor-pointer border border-dashed border-amber-500/25"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto max-h-screen">
        
        {/* Header Ribbon */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-black text-sm border border-emerald-100 shadow-xs">
              AD
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900 flex items-center gap-1.5 uppercase tracking-wide">
                <span>Dr. Admin Officer</span>
                <span className="bg-emerald-100 text-emerald-800 rounded font-bold text-[8px] px-1 py-0.5 select-none leading-none">ROOT ACCESS</span>
              </h2>
              <p className="text-[11px] text-gray-500 font-semibold">Gajanan Hospital & Critical Care Centre Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* Batch Dispatch Simulator button */}
            <button
              onClick={triggerBatchFeedbacks}
              className="bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-[10.5px] uppercase tracking-wider py-2 px-4 rounded-lg flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
              title="Fast forward time by 24h to trigger all pending message streams directly"
            >
              <Clock className="h-3.5 w-3.5 text-blue-300 animate-spin" style={{ animationDuration: '4s' }} />
              Fast-Forward 24h & Send Batch
            </button>
            
            <div className="h-8 w-px bg-gray-200 hidden sm:block" />

            <div className="text-right hidden md:block">
              <span className="block text-[9px] font-bold text-gray-400 uppercase">Current Session</span>
              <span className="text-[11px] font-bold text-gray-700 font-mono">2026-05-26 (UTC)</span>
            </div>
          </div>
        </header>

        {/* Dashboard Pages */}
        <div className="p-6 space-y-8 flex-grow">
          
          {/* Active Tab: OVERVIEW */}
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="space-y-1.5">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">System Controls & Overview</h2>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Monitor patient queues, update consulting records, and dispatch scheduled feedback campaigns directly via automated templates.
                </p>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Active Queue Queue", value: totalCount, change: "All Records", trend: "up", color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Feedback Scheduled", value: scheduledCount, change: `${feedbackDelay}h post-visit`, trend: "up", color: "text-yellow-600", bg: "bg-yellow-50" },
                  { label: "WhatsApp Dispatched", value: triggeredCount, change: `${rateLimitResponsePercent}% of total`, trend: "neutral", color: "text-green-600", bg: "bg-green-50" },
                  { label: "Treatment Completed", value: completedCount, change: "Feedbacks ready", trend: "down", color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((stat, i) => (
                  <div key={stat.label} className="bg-white p-5 rounded-2xl shadow-xs border border-gray-150">
                    <p className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest">{stat.label}</p>
                    <div className="flex justify-between items-baseline mt-2">
                      <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                      <span className="text-[9.5px] font-bold text-gray-500">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Split layout: Recent Overview patients and template short snapshot */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left side: Patient Queue overview */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white rounded-2xl shadow-xs border border-gray-150 overflow-hidden">
                    <div className="p-5 border-b border-gray-150 flex items-center justify-between bg-gray-50/50">
                      <div>
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Ongoing Clinic Cohort</h3>
                        <p className="text-[10px] text-gray-400 font-semibold">Tethered with automatic 24h WhatsApp schedule engine</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("appointments")} 
                        className="text-xs font-black text-blue-900 hover:text-blue-800 leading-none select-none"
                      >
                        View Full Directory &rarr;
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-[#fcfdfe] text-gray-400 text-[9px] font-extrabold uppercase tracking-wider border-b border-gray-100">
                          <tr>
                            <th className="px-5 py-3">Patient Account</th>
                            <th className="px-5 py-3">Specialist Doctor</th>
                            <th className="px-5 py-3">Clinic Status</th>
                            <th className="px-5 py-3">24h Feedback Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs">
                          {appointments.slice(0, 4).map((apt) => (
                            <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-5 py-3.5">
                                <div className="font-extrabold text-gray-950">{apt.name}</div>
                                <div className="text-[10px] text-gray-400 font-semibold">+{apt.phone}</div>
                              </td>
                              <td className="px-5 py-3.5 font-bold text-gray-700">{apt.doctor}</td>
                              <td className="px-5 py-3.5">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                  apt.status === "completed" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" :
                                  apt.status === "confirmed" ? "bg-blue-50 text-blue-800 border border-blue-100" :
                                  "bg-gray-100 text-gray-700"
                                }`}>
                                  {apt.status}
                                </span>
                              </td>
                              <td className="px-5 py-3.5">
                                {apt.feedbackTriggered ? (
                                  <span className="text-green-800 font-extrabold text-[10px] flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                    Triggered Done
                                  </span>
                                ) : apt.feedbackScheduled ? (
                                  <span className="text-yellow-800 font-extrabold text-[10px] flex items-center gap-1" title={apt.feedbackScheduledTime}>
                                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />
                                    Scheduled in 24h
                                  </span>
                                ) : (
                                  <span className="text-gray-400 font-bold text-[10px]">
                                    Paused
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right side: Template Control Room info and Scheduler Status */}
                <div className="space-y-6">
                  {/* System Status Controls card */}
                  <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 space-y-4">
                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Active Automation Status</h3>
                    
                    <div className="space-y-3.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-405 font-semibold">Hospital Service API</span>
                        <span className="text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase">online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-405 font-semibold">Patients Log Tracker</span>
                        <span className="text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase">linked</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-405 font-semibold">24h Wait Loop Thread</span>
                        <span className="text-yellow-600 bg-yellow-50 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase">awaiting trigger</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-center">
                      <p className="text-[11px] text-[#075E54] font-extrabold tracking-wide uppercase">WhatsApp Web Client Integration</p>
                      <p className="text-[10px] text-gray-500 font-semibold mt-1 leading-normal">
                        Message drafts are automatically structured. Admin clicks trigger to route to direct clinical WhatsApp channels.
                      </p>
                    </div>
                  </div>

                  {/* Feedback campaign quick guide summary */}
                  <div className="bg-gradient-to-br from-[#128C7E] to-[#075E54] rounded-2xl shadow-md p-5 text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-3">
                      <h4 className="text-sm font-black uppercase tracking-wider">Campaign Settings</h4>
                      <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                        Need to edit your patient feedback questions? Click below to load the customized clinical messaging suite.
                      </p>
                      <button 
                        onClick={() => setActiveTab("feedback")} 
                        className="bg-white hover:bg-emerald-50 text-[#075E54] font-black text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
                      >
                        Adjust Feedback Templates
                      </button>
                    </div>
                    <Smartphone className="absolute -bottom-6 -right-6 h-24 w-24 text-white/10" />
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Active Tab: APPOINTMENTS DIRECTORY */}
          {activeTab === "appointments" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Clinical Patients Directory</h2>
                  <p className="text-xs text-gray-500 font-semibold">Control treatment queues, patient statuses, and trigger post-consultation WhatsApp feedback loops.</p>
                </div>
                
                <button
                  onClick={() => setIsAddingApt(!isAddingApt)}
                  className="bg-[#128C7E] hover:bg-[#075E54] text-white font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Plus className="h-4 w-4" />
                  Register New Patient
                </button>
              </div>

              {/* Form to Register Patient */}
              <AnimatePresence>
                {isAddingApt && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <form onSubmit={handleCreateAppointment} className="bg-white border border-gray-150 p-6 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400">Patient Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="John Doe"
                          value={newPatientName}
                          onChange={e => setNewPatientName(e.target.value)}
                          className="w-full text-xs font-semibold p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#128C7E] focus:border-[#128C7E]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400">Phone Number (with Country Code)</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. 918329573283"
                          value={newPatientPhone}
                          onChange={e => setNewPatientPhone(e.target.value)}
                          className="w-full text-xs font-semibold p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#128C7E] focus:border-[#128C7E]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400">Consulting Specialist</label>
                        <select 
                          value={newPatientDoc}
                          onChange={e => setNewPatientDoc(e.target.value)}
                          className="w-full text-xs font-extrabold p-2.5 border border-gray-200 bg-white rounded-lg focus:ring-1 focus:ring-[#128C7E] focus:border-[#128C7E]"
                        >
                          <option>Dr. Gitesh Dalvi</option>
                          <option>Dr. Vijay Walture</option>
                          <option>Dr. Sachin Suryawanshi</option>
                          <option>Dr. Sachin Patil</option>
                          <option>Dr. Dilip Thombre</option>
                        </select>
                      </div>

                      <div className="flex gap-2.5">
                        <button
                          type="submit"
                          className="flex-1 bg-blue-950 hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-all"
                        >
                          Confirm Entry & Queue
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAddingApt(false)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs py-3 px-4 rounded-lg transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Filtering Suite */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-150">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients, specialist..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border-none rounded-lg text-xs font-semibold focus:ring-1 focus:ring-[#128C7E] transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto justify-end">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider shrink-0">Clinic Status:</span>
                  {["all", "confirmed", "completed"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shrink-0 transition-all cursor-pointer ${
                        statusFilter === st 
                          ? "bg-blue-950 text-white shadow-xs" 
                          : "bg-gray-100 text-gray-500 hover:bg-gray-205"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Directory Table */}
              <div className="bg-white rounded-2xl shadow-xs border border-gray-150 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-wider border-b border-gray-150">
                      <tr>
                        <th className="px-5 py-4">Patient Name & Phone</th>
                        <th className="px-5 py-4">Consulting Doctor</th>
                        <th className="px-5 py-4">Treatment Reason</th>
                        <th className="px-5 py-4 text-center">Treatment Status</th>
                        <th className="px-5 py-4">24h Post-Consultation Schedule</th>
                        <th className="px-5 py-4 text-right">Actions Panel</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 text-xs">
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-gray-400 font-bold">
                            No patient records match the filter query.
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((appt) => (
                          <tr key={appt.id} className="hover:bg-gray-50/50 transition-all">
                            <td className="px-5 py-3.5">
                              <span className="font-extrabold text-gray-900 text-sm block">{appt.name}</span>
                              <span className="text-gray-400 font-semibold block text-[10.5px]">phone: +{appt.phone}</span>
                            </td>
                            <td className="px-5 py-3.5 font-bold text-gray-700">{appt.doctor}</td>
                            <td className="px-5 py-3.5 text-gray-550 italic font-medium">{appt.reason}</td>
                            
                            {/* Interactive patient status controller */}
                            <td className="px-5 py-3.5 text-center">
                              <select 
                                value={appt.status}
                                onChange={e => handleToggleAptStatus(appt.id, e.target.value)}
                                className={`text-[10px] font-black uppercase px-2 py-1 rounded-md border border-gray-200 outline-none cursor-pointer bg-white ${
                                  appt.status === "completed" ? "text-emerald-800 bg-emerald-50 border-emerald-100" :
                                  "text-blue-800 bg-blue-50 border-blue-105"
                                }`}
                              >
                                <option value="confirmed">confirmed</option>
                                <option value="completed">completed</option>
                              </select>
                            </td>

                            {/* Post Consultation Feedback Toggle & status log */}
                            <td className="px-5 py-3.5">
                              <div className="space-y-1.5 min-w-[190px]">
                                <div className="flex items-center gap-2">
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                      type="checkbox" 
                                      checked={appt.feedbackScheduled} 
                                      onChange={() => handleToggleSchedule(appt.id)}
                                      className="sr-only peer"
                                    />
                                    <div className="w-8 h-4.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#128C7E]"></div>
                                  </label>
                                  <span className="text-[10px] font-black uppercase text-gray-400">
                                    {appt.feedbackScheduled ? "Scheduler Active" : "Scheduler Paused"}
                                  </span>
                                </div>
                                <div className="text-[10px] leading-tight font-semibold">
                                  {appt.feedbackTriggered ? (
                                    <span className="text-green-700 font-black flex items-center gap-1">
                                      <CheckCircle2 className="h-3 w-3 shrink-0 text-green-500" />
                                      Sent at {appt.feedbackTriggeredAt || "24h check"}
                                    </span>
                                  ) : appt.feedbackScheduled ? (
                                    <span className="text-yellow-700 font-black flex items-center gap-1">
                                      <Clock className="h-3 w-3 text-yellow-500 animate-spin" style={{ animationDuration: '6s' }} />
                                      Awaiting {appt.feedbackScheduledTime}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400 font-bold">Feedback delivery is suspended</span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Trigger buttons */}
                            <td className="px-5 py-3.5 text-right space-y-2">
                              <div className="flex justify-end items-center gap-2">
                                <button
                                  onClick={() => triggerFeedbackNow(appt)}
                                  className={`text-[10.5px] font-black uppercase tracking-wider py-1.5 px-3 rounded-lg flex items-center gap-1 transition-all border cursor-pointer ${
                                    appt.feedbackTriggered 
                                      ? "bg-gray-150 text-gray-600 border-gray-200 hover:bg-gray-200"
                                      : "bg-[#128C7E] text-white border-transparent hover:bg-[#075E54] shadow-xs"
                                  }`}
                                  title={`Trigger pre-filled clinical feedback page via WhatsApp directly to ${appt.phone}`}
                                >
                                  <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                                  <span>{appt.feedbackTriggered ? "Resend Loop" : "Trigger WhatsApp"}</span>
                                </button>
                                
                                <button
                                  onClick={() => handleDeleteAppointment(appt.id)}
                                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete patient queue record"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Active Tab: FEEDBACK CAMPAIGNS CONFIG DESIGNER */}
          {activeTab === "feedback" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="space-y-1.5">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Post-Consultation Campaign Workspace</h2>
                <p className="text-xs text-gray-500 font-semibold">
                  Personalize the automated WhatsApp message payload. Dynamic placeholder tokens sync clinical variables at runtime block dispatch.
                </p>
              </div>

              {/* Grid: Editor + Previews */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Custom Content Editor Card */}
                <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-gray-950 uppercase tracking-widest border-b border-gray-100 pb-2">Templates Layout Settings</h3>
                    <p className="text-[11px] text-gray-400 font-semibold">
                      These keywords will be dynamically replaced when triggering messages for patients:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="bg-blue-50 text-blue-800 font-mono text-[10px] uppercase font-black px-2 py-0.5 rounded tracking-wide font-bold">{`{PATIENT_NAME}`}</span>
                      <span className="bg-blue-50 text-blue-800 font-mono text-[10px] uppercase font-black px-2 py-0.5 rounded tracking-wide font-bold">{`{DOCTOR_NAME}`}</span>
                      <span className="bg-blue-50 text-blue-800 font-mono text-[10px] uppercase font-black px-2 py-0.5 rounded tracking-wide font-bold">{`{DELAY_HOURS}`}</span>
                    </div>
                  </div>

                  {/* Delay schedule setting option */}
                  <div className="space-y-2">
                    <label className="text-[10.5px] font-black uppercase text-gray-500 tracking-wide block">Feedback Delay Stream (Hours after treatment completed)</label>
                    <div className="flex items-center gap-2">
                      <select 
                        value={feedbackDelay}
                        onChange={e => {
                          setFeedbackDelay(e.target.value);
                          triggerToast(`Scheduler delay changed to ${e.target.value}h!`);
                        }}
                        className="text-xs font-extrabold bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#128C7E] cursor-pointer"
                      >
                        <option value="12">12 Hours (Same-Day Evening)</option>
                        <option value="24">24 Hours (Standard Post-Consultation)</option>
                        <option value="48">48 Hours (Detailed Medical Observation)</option>
                        <option value="72">72 Hours (Three-Day Recovery Survey)</option>
                      </select>
                    </div>
                    <p className="text-[10px] text-gray-400 font-semibold italic">Automated scheduler tracks patients marked Completed and triggers after this threshold.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10.5px] font-black uppercase text-gray-500 tracking-wide block">WhatsApp Message Template Editor (supports WhatsApp italic *bold* formatting)</label>
                    <textarea
                      rows={11}
                      value={feedbackTemplate}
                      onChange={e => setFeedbackTemplate(e.target.value)}
                      className="w-full text-xs font-semibold font-mono p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-1 focus:ring-[#128C7E] leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveTemplate}
                      className="bg-[#128C7E] hover:bg-[#075E54] text-white font-black text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Save className="h-4.5 w-4.5" />
                      Save template
                    </button>
                    <button
                      onClick={() => {
                        setFeedbackTemplate(`Dear *{PATIENT_NAME}*,\n\nGreetings from *Gajanan Hospital & Critical Care Centre*! 🏥\n\nIt has been {DELAY_HOURS} hours since your appointment with *{DOCTOR_NAME}*. We hope you are recovering well! 🌸\n\nTo help us constantly elevate our clinic standards, please rate your experience by replying with 1 to 5 stars or comment directly on how we did. Thank you! ⭐\n\n_Keep this chat saved for reports, upcoming clinical checkups, or medicine advice._`);
                        triggerToast("Restored template to default!");
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs py-3 px-4 rounded-lg transition-all"
                    >
                      Reset Default
                    </button>
                  </div>
                </div>

                {/* Smartphone Device Mock Visual Simulation */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
                    <span>LIVE WHATSAPP SCREEN SIMULATION</span>
                    <span className="text-[#128C7E]">PREVIEW</span>
                  </div>

                  <div className="border border-emerald-600/30 bg-[#E5DDD5] rounded-2xl overflow-hidden shadow-md max-w-sm mx-auto text-left">
                    {/* Phone Status bar */}
                    <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between font-bold leading-normal">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-blue-900 border border-white/20 flex items-center justify-center font-black text-xs text-white">GH</div>
                        <div>
                          <div className="flex items-center gap-1 font-black text-xs text-white hover:underline cursor-pointer">
                            Gajanan Hospital Support
                            <span className="bg-emerald-500 rounded-full text-white p-0.5 inline-flex items-center justify-center text-[5px]" style={{ width: '9px', height: '9px' }}>✓</span>
                          </div>
                          <p className="text-[8.5px] text-[#A6D1CD] font-medium">Official Business Account</p>
                        </div>
                      </div>
                      <span className="text-[8px] text-white/90 bg-[#128C7E] px-1.5 py-0.5 rounded font-black tracking-wider uppercase">online</span>
                    </div>
                    
                    {/* Chat Content Body */}
                    <div className="p-4 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-[size:110px] min-h-[360px] flex flex-col justify-end">
                      <div className="text-[9px] bg-white/95 text-gray-500 font-extrabold text-center py-1 px-3 rounded-md self-center mx-auto my-2 shadow-xs uppercase tracking-wider max-w-[90%]">
                        🔒 Messages are end-to-end encrypted. No third-party can read them.
                      </div>
                      
                      <div className="bg-white text-gray-950 text-xs rounded-xl p-3 max-w-[85%] shadow-sm self-start relative border border-gray-205 space-y-1">
                        <p className="leading-relaxed whitespace-pre-wrap select-text selection:bg-emerald-100 font-semibold">{renderedPreviewText}</p>
                        <div className="text-[8px] text-gray-405 text-right mt-1 font-semibold">
                          Just now • Delivered
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-3 text-xs text-gray-500 font-semibold bg-gray-100 rounded-xl border border-gray-200 max-w-sm mx-auto">
                    👉 Placements of the tags <strong className="text-gray-700">{`{PATIENT_NAME}`}</strong> and <strong className="text-gray-700">{`{DOCTOR_NAME}`}</strong> will update dynamically with each patient's parameters inside the dispatch feed automatically.
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Active Tab: MEDICAL REPRESENTATIVES BOOKINGS LIST AND ROSTER */}
          {activeTab === "mr_bookings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 font-sans text-gray-800">
              
              {/* Header section with Stats summary */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-[#128C7E]" />
                    <span>Medical Representatives Booking Roster</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-semibold">
                    Monitor, search, filter, and purge registered MR sessions and target schedules in real time.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/mr-bookings");
                        if (res.ok) {
                          setMrBookings(await res.json());
                          triggerToast("Roster synced successfully.");
                        }
                      } catch (err) {
                        triggerToast("Sync failed. Check connection.");
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all border border-gray-200 cursor-pointer"
                  >
                    <span>Refresh List</span>
                  </button>

                  <button
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to clear ALL Medical Representative bookings? This cannot be undone.")) {
                        setMrBookings([]);
                        localStorage.setItem("gajanan_mr_bookings", "[]");
                        try {
                          await fetch("/api/mr-bookings", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: "[]"
                          });
                          triggerToast("All representative bookings have been wiped.");
                        } catch (err) {
                          console.error("Purge fail:", err);
                        }
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition-all border border-rose-100 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Clear All Bookings</span>
                  </button>
                </div>
              </div>

              {/* Roster Quick Figures Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
                  <span className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Reserved Slots</span>
                  <div className="text-2xl font-black text-gray-950">{mrBookings.length} Bookings</div>
                  <p className="text-[10px] text-gray-400 font-semibold mt-1">Synced across local database</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
                  <span className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest block mb-1">Target Doctors Active</span>
                  <div className="text-2xl font-black text-[#128C7E]">
                    {new Set(mrBookings.map(b => b.doctor)).size} Specialists
                  </div>
                  <p className="text-[10px] text-gray-400 font-semibold mt-1">Distinct consultations scheduled</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
                  <span className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest block mb-1">Active Cap Load</span>
                  <div className="text-2xl font-black text-amber-600">
                    {Math.round((mrBookings.length / 15) * 100)}% Capacity
                  </div>
                  <p className="text-[10px] text-gray-400 font-semibold mt-1">Based on daily limit of 15 slots</p>
                </div>
              </div>

              {/* Search and Filters Section */}
              <div className="bg-white p-4 rounded-2xl border border-gray-150 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by Rep Name, Company, Product, or Code..."
                    value={mrSearchQuery}
                    onChange={(e) => setMrSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#128C7E] focus:border-[#128C7E] rounded-xl text-xs font-semibold bg-gray-50/50"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                  <span className="text-xs text-gray-405 font-black uppercase tracking-wider shrink-0">Filter Doctor:</span>
                  <select
                    value={mrDoctorFilter}
                    onChange={(e) => setMrDoctorFilter(e.target.value)}
                    className="text-xs font-semibold py-2 px-3 border border-gray-205 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#128C7E]"
                  >
                    <option value="all">All Doctors</option>
                    {Array.from(new Set(mrBookings.map(b => b.doctor))).map(doc => (
                      <option key={doc} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Main bookings table list */}
              <div className="bg-white rounded-2xl border border-gray-150 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-150">
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Booking Code</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Representative Details</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product / Science</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Consulting Doctor</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Slot Schedule</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mrBookings.filter(b => {
                        const matchesSearch = 
                          (b.name || "").toLowerCase().includes(mrSearchQuery.toLowerCase()) ||
                          (b.company || "").toLowerCase().includes(mrSearchQuery.toLowerCase()) ||
                          (b.product || "").toLowerCase().includes(mrSearchQuery.toLowerCase()) ||
                          (b.code || "").toLowerCase().includes(mrSearchQuery.toLowerCase());
                        
                        const matchesDoc = mrDoctorFilter === "all" || b.doctor === mrDoctorFilter;

                        return matchesSearch && matchesDoc;
                      }).length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-gray-400 text-xs font-semibold">
                            No medical representative bookings matched the current query.
                          </td>
                        </tr>
                      ) : (
                        mrBookings
                          .filter(b => {
                            const matchesSearch = 
                              (b.name || "").toLowerCase().includes(mrSearchQuery.toLowerCase()) ||
                              (b.company || "").toLowerCase().includes(mrSearchQuery.toLowerCase()) ||
                              (b.product || "").toLowerCase().includes(mrSearchQuery.toLowerCase()) ||
                              (b.code || "").toLowerCase().includes(mrSearchQuery.toLowerCase());
                            
                            const matchesDoc = mrDoctorFilter === "all" || b.doctor === mrDoctorFilter;

                            return matchesSearch && matchesDoc;
                          })
                          .map((booking) => (
                            <tr key={booking.code} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4">
                                <span className="font-mono text-xs font-bold text-gray-950 bg-gray-100 border border-gray-200 py-1 px-2.5 rounded-md shadow-3xs">
                                  {booking.code}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="space-y-0.5">
                                  <p className="text-xs font-bold text-gray-900">{booking.name}</p>
                                  <p className="text-[11px] text-gray-500 font-semibold">{booking.company} ({booking.phone})</p>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-bold bg-teal-50 text-teal-800 border border-teal-100/60 max-w-[180px] truncate" title={booking.product}>
                                  {booking.product}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                  <span className="text-xs font-bold text-gray-900">{booking.doctor}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="space-y-0.5">
                                  <p className="text-xs font-bold text-gray-900">{booking.date}</p>
                                  <p className="text-[10.5px] text-gray-400 font-semibold flex items-center gap-1">
                                    <Clock className="h-3 w-3 inline text-gray-400" />
                                    <span>{booking.time}</span>
                                  </p>
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMrBooking(booking.code)}
                                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-rose-100"
                                  title="Cancel Slot & Release"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
