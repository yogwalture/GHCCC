import React, { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Briefcase, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Download, 
  AlertCircle, 
  UserCheck, 
  QrCode, 
  RefreshCw, 
  Sparkles, 
  Activity, 
  Clock, 
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { TiltCard } from "../components/ui/TiltCard";

interface QuickScanQRProps {
  url: string;
  label: string;
  title?: string;
  phoneNumber?: string;
}

function QuickScanQR({ url, label, title = "Smart Quick Scan QR", phoneNumber = "+91 83295 73283" }: QuickScanQRProps) {
  const [showQR, setShowQR] = useState(true);
  const [copied, setCopied] = useState(false);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}&color=0-94-84&bgcolor=255-255-255`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div id="quick-scan-qr-feature" className="border border-dashed border-teal-500/30 bg-teal-50/20 rounded-2xl p-4 hover:border-teal-500/50 transition-all duration-300 relative overflow-hidden text-center shadow-xs">
      <div className="absolute top-0 right-0 bg-teal-600 text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-bl-lg shadow-xs">
        ⚡ MR SCAN
      </div>

      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex items-center gap-1.5 text-teal-800 font-extrabold text-xs uppercase tracking-wider">
          <QrCode className="h-4.5 w-4.5 text-teal-600 animate-pulse" />
          <span>{title}</span>
        </div>
        
        <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-[280px]">
          {label}
        </p>

        <div className="pt-1.5 w-full flex justify-center">
          <button
            type="button"
            onClick={() => setShowQR(!showQR)}
            className="text-[10px] font-black tracking-wider uppercase text-teal-700 hover:text-teal-900 bg-teal-50 px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer border border-teal-100"
          >
            {showQR ? "Hide Code" : "Show Code"}
          </button>
        </div>

        {showQR && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pt-2 flex flex-col items-center space-y-2"
          >
            <div className="relative p-2.5 bg-white border border-teal-500/20 rounded-2xl shadow-sm group">
              <img 
                src={qrUrl} 
                alt="WhatsApp QR Code Link" 
                referrerPolicy="no-referrer"
                className="w-32 h-32 rounded-lg select-none transition-transform group-hover:scale-[1.03] duration-300 ease-out"
              />
              <div className="absolute left-2.5 right-2.5 top-2.5 h-0.5 bg-teal-400 opacity-60 rounded shadow-md animate-bounce" style={{ animationDuration: '3.6s' }} />
            </div>

            <div className="space-y-0.5">
              <span className="text-[9px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                Live Scan Link
              </span>
              <p className="text-[10px] text-gray-400 font-semibold mt-1">
                Hospital support contact: <strong className="text-gray-600">{phoneNumber}</strong>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className="text-[9px] font-black text-gray-500 hover:text-gray-700 bg-gray-150/40 hover:bg-gray-150 px-2 rounded-md transition-all cursor-pointer"
              >
                {copied ? "Copied! ✓" : "Copy Link"}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function MedicalRep() {
  const [mrName, setMrName] = useState("");
  const [mrCompany, setMrCompany] = useState("");
  const [mrDoctor, setMrDoctor] = useState("");
  const [mrPhone, setMrPhone] = useState("");
  const [mrDate, setMrDate] = useState("");
  const [mrTimeSlot, setMrTimeSlot] = useState("");
  const [mrProduct, setMrProduct] = useState("");
  const [mrTab, setMrTab] = useState<"book" | "guidelines" | "status">("book");
  const [mrBookings, setMrBookings] = useState<any[]>([]);
  const [awaitingConfirm, setAwaitingConfirm] = useState<any | null>(null);
  const [bookingSuccessCode, setBookingSuccessCode] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState("");

  const mrDoctors = [
    { id: "dr-gitesh", name: "Dr. Gitesh Dalvi", desc: "Director - Medicine & Critical Care", schedule: "Tuesdays (1:30 PM to 2:00 PM)", timeSlot: "1:30 PM - 2:00 PM", callDay: "Tuesday" },
    { id: "dr-vijay", name: "Dr. Vijay Walture", desc: "Director - Medicine & Critical Care", schedule: "Fridays (2:30 PM to 3:00 PM)", timeSlot: "2:30 PM - 3:00 PM", callDay: "Friday" },
    { id: "dr-sachin-s", name: "Dr. Sachin Suryawanshi", desc: "Director - Medicine & Critical Care", schedule: "Fridays (3:00 PM to 3:30 PM)", timeSlot: "3:00 PM - 3:30 PM", callDay: "Friday" },
    { id: "dr-sachin-patil", name: "Dr. Sachin Patil", desc: "Consultant - Orthopaedic Department", schedule: "1st Thursday of Month (3:00 PM to 3:30 PM)", timeSlot: "3:00 PM - 3:30 PM", callDay: "1st Thursday" },
    { id: "dr-dilip", name: "Dr. Dilip Thombre", desc: "Director - Medicine & Critical Care", schedule: "Special permission only", timeSlot: "Special Request Slot", callDay: "Prior Appointment" },
    { id: "dr-rameshwar", name: "Dr. Rameshwar Hajare", desc: "Director - Medicine & Critical Care", schedule: "Special permission only", timeSlot: "Special Request Slot", callDay: "Prior Appointment" }
  ];

  const getCallStartTime = (timeSlot: string): { hour: number; minute: number } => {
    if (!timeSlot || timeSlot === "Special Request Slot") {
      return { hour: 17, minute: 0 };
    }
    try {
      // e.g. "1:30 PM - 2:00 PM"
      const startPart = timeSlot.split("-")[0].trim(); // "1:30 PM"
      const [timeStr, ampm] = startPart.split(" "); // ["1:30", "PM"]
      let [hourStr, minStr] = timeStr.split(":"); // ["1", "30"]
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minStr, 10);
      if (ampm.toUpperCase() === "PM" && hour !== 12) {
        hour += 12;
      } else if (ampm.toUpperCase() === "AM" && hour === 12) {
        hour = 0;
      }
      return { hour, minute };
    } catch (e) {
      return { hour: 13, minute: 30 }; // default fallback 1:30 PM
    }
  };

  const isDateMatchingDoctor = (dateObj: Date, callDay: string): boolean => {
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    if (callDay === "Tuesday" && dayName === "Tuesday") return true;
    if (callDay === "Friday" && dayName === "Friday") return true;
    if (callDay === "1st Thursday") {
      if (dayName !== "Thursday") return false;
      const dateNum = dateObj.getDate();
      return dateNum >= 1 && dateNum <= 7;
    }
    if (callDay === "Prior Appointment") {
      return dateObj.getDay() !== 0; // Mon-Sat are acceptable
    }
    return false;
  };

  const getFilteredDatesWithStatus = (docId: string) => {
    const docObj = mrDoctors.find(d => d.id === docId);
    if (!docObj) return [];

    const list = [];
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Generate upcoming dates (up to 30 days) to find available call days
    for (let i = 0; i < 30; i++) {
      const temp = new Date(todayMidnight.getTime());
      temp.setDate(temp.getDate() + i);

      // Skip Sundays
      if (temp.getDay() === 0) continue;

      if (isDateMatchingDoctor(temp, docObj.callDay)) {
        const readable = temp.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric"
        });
        const iso = temp.toISOString().split("T")[0];

        // Precision time calculations
        const now = new Date();
        const callTimeParts = getCallStartTime(docObj.timeSlot);
        
        const callStartTime = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), callTimeParts.hour, callTimeParts.minute, 0, 0);
        
        // Starts exactly 1 day before at 8:00 AM
        const bookingOpenTime = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() - 1, 8, 0, 0, 0);

        let status: "OPEN" | "LOCKED" | "EXPIRED" = "OPEN";
        if (now.getTime() < bookingOpenTime.getTime()) {
          status = "LOCKED";
        } else if (now.getTime() >= callStartTime.getTime()) {
          status = "EXPIRED";
        }

        const priorReadable = bookingOpenTime.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric"
        }) + " at 8:00 AM";

        const callTimeReadable = callStartTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        });

        list.push({
          readable,
          iso,
          status,
          bookingOpenTime,
          callStartTime,
          priorReadable,
          callTimeReadable
        });
      }
    }
    return list;
  };

  useEffect(() => {
    if (mrDoctor) {
      const docObj = mrDoctors.find(d => d.id === mrDoctor);
      if (docObj) {
        setMrTimeSlot(docObj.timeSlot);
      }
      setMrDate(""); // Reset selected date when doctor changes
    }
  }, [mrDoctor]);

  const defaultMrBookings: any[] = [];

  useEffect(() => {
    // Force a one-time wipe of old demo data/bookings to ensure a fresh start
    const isWiped = localStorage.getItem("gajanan_mr_bookings_wiped_v3");
    if (!isWiped) {
      localStorage.setItem("gajanan_mr_bookings", JSON.stringify([]));
      localStorage.setItem("gajanan_mr_bookings_wiped_v3", "true");
      setMrBookings([]);
      return;
    }

    const stored = localStorage.getItem("gajanan_mr_bookings");
    if (stored) {
      try {
        setMrBookings(JSON.parse(stored));
      } catch (e) {
        setMrBookings([]);
      }
    } else {
      localStorage.setItem("gajanan_mr_bookings", JSON.stringify([]));
      setMrBookings([]);
    }
  }, []);

  const handleMRRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError("");

    if (mrBookings.length >= 25) {
      setBookingError("Booking capacity full! Clear slots or wait for next cycle.");
      return;
    }

    if (!mrName || !mrCompany || !mrDoctor || !mrPhone || !mrDate || !mrTimeSlot || !mrProduct) {
      setBookingError("Please fill out all representative details.");
      return;
    }

    const selectedDateObj = getFilteredDatesWithStatus(mrDoctor).find(d => d.readable === mrDate);
    if (selectedDateObj && selectedDateObj.status !== "OPEN") {
      if (selectedDateObj.status === "LOCKED") {
        setBookingError(`Appointments can only be booked from 1 day prior starting at 8:00 AM. Booking for this slot opens on ${selectedDateObj.priorReadable}.`);
      } else {
        setBookingError(`This booking window has closed. The call timing (${selectedDateObj.callTimeReadable}) for this date has already passed.`);
      }
      return;
    }

    const selectedDocName = mrDoctors.find(d => d.id === mrDoctor)?.name || mrDoctor;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `MR-GAJ-${randomSuffix}`;

    const tempBooking = {
      name: mrName,
      company: mrCompany,
      doctor: selectedDocName,
      date: mrDate,
      time: mrTimeSlot,
      product: mrProduct,
      phone: mrPhone,
      code
    };

    setAwaitingConfirm(tempBooking);
  };

  const handleOpenWhatsApp = () => {
    if (!awaitingConfirm) return;

    const message = `Hello Gajanan Hospital & Critical Care Centre,\n\nI am a Medical Representative requesting a doctor meeting slot. Please confirm our booking from your official hospital WhatsApp account!\n\n*Proposed Booking Details:*\n- *Booking Reference Code:* ${awaitingConfirm.code || "MR-GAJ-NEW"}\n- *Rep Name:* ${awaitingConfirm.name}\n- *Company:* ${awaitingConfirm.company}\n- *Mobile Number:* ${awaitingConfirm.phone}\n- *Target Doctor:* ${awaitingConfirm.doctor}\n- *Proposed Date:* ${awaitingConfirm.date}\n- *Time Slot:* ${awaitingConfirm.time}\n- *Product focus / Molecule:* ${awaitingConfirm.product}\n\n*Please reply with 'CONFIRMED' directly from this hospital account to lock my slot. Thank you!*`;
    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=918329573283&text=${encoded}`, "_blank");
  };

  const finalizeMRBooking = () => {
    if (!awaitingConfirm) return;

    const newBooking = {
      ...awaitingConfirm,
      status: "Fixed & Confirmed"
    };

    const updatedBookings = [...mrBookings, newBooking];
    setMrBookings(updatedBookings);
    localStorage.setItem("gajanan_mr_bookings", JSON.stringify(updatedBookings));

    setBookingSuccessCode(awaitingConfirm.code);
    setAwaitingConfirm(null);

    // Clear Form Fields
    setMrName("");
    setMrCompany("");
    setMrPhone("");
    setMrProduct("");
    setMrDoctor("");
    setMrDate("");
    setMrTimeSlot("");
  };

  const normalizePhoneNumber = (phone: string) => {
    const clean = phone.replace(/\D/g, "");
    if (clean.length === 10) {
      return `91${clean}`;
    }
    return clean;
  };

  const sendSuccessMessageToMR = (booking: any) => {
    if (!booking) return;
    const message = `Hello Gajanan Hospital,\n\nMy Medical Representative meeting has been scheduled and fixed on the website! Can you please send the official confirmation message for Booking Reference: *${booking.code}* back to my number (+${booking.phone})?\n\n*Appointment Receipt:*\n- *ID:* ${booking.code}\n- *Rep Name:* ${booking.name}\n- *Company:* ${booking.company}\n- *Consulting Doctor:* ${booking.doctor}\n- *Slot:* ${booking.date} (${booking.time})\n\nThank you!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=918329573283&text=${encoded}`, "_blank");
  };

  const getAwaitingConfirmUrl = () => {
    if (!awaitingConfirm) return "";
    const message = `Hello Gajanan Hospital & Critical Care Centre,\n\nI am a Medical Representative requesting a doctor meeting slot. Please confirm our booking from your official hospital WhatsApp account!\n\n*Proposed Booking Details:*\n- *Booking Reference Code:* ${awaitingConfirm.code || "MR-GAJ-NEW"}\n- *Rep Name:* ${awaitingConfirm.name}\n- *Company:* ${awaitingConfirm.company}\n- *Mobile Number:* ${awaitingConfirm.phone}\n- *Target Doctor:* ${awaitingConfirm.doctor}\n- *Proposed Date:* ${awaitingConfirm.date}\n- *Time Slot:* ${awaitingConfirm.time}\n- *Product focus / Molecule:* ${awaitingConfirm.product}\n\n*Please reply with 'CONFIRMED' directly from this hospital account to lock my slot. Thank you!*`;
    return `https://api.whatsapp.com/send?phone=918329573283&text=${encodeURIComponent(message)}`;
  };

  const getSuccessConfirmUrl = (booking: any) => {
    if (!booking) return "";
    const message = `Hello Gajanan Hospital,\n\nMy Medical Representative meeting has been scheduled and fixed on the website! Can you please send the official confirmation message for Booking Reference: *${booking.code}* back to my number (+${booking.phone})?\n\n*Appointment Receipt:*\n- *ID:* ${booking.code}\n- *Rep Name:* ${booking.name}\n- *Company:* ${booking.company}\n- *Consulting Doctor:* ${booking.doctor}\n- *Slot:* ${booking.date} (${booking.time})\n\nThank you!`;
    return `https://api.whatsapp.com/send?phone=918329573283&text=${encodeURIComponent(message)}`;
  };

  const parseDateTimeForICS = (dateStr: string, timeSlotStr: string) => {
    try {
      const year = 2026;
      let monthIndex = 4; // default May
      if (dateStr.includes("Jun")) monthIndex = 5;

      const dateNumMatch = dateStr.match(/\d+/);
      const day = dateNumMatch ? parseInt(dateNumMatch[0]) : 26;

      const timeClean = timeSlotStr.split("-")[0].trim();
      let hourMatch = parseInt(timeClean.split(":")[0]);
      const minuteMatch = parseInt(timeClean.split(":")[1].replace(/\D/g, "") || "0");
      const isPM = timeClean.toLowerCase().includes("pm");

      if (isPM && hourMatch !== 12) hourMatch += 12;
      if (!isPM && hourMatch === 12) hourMatch = 0;

      const dateObj = new Date(year, monthIndex, day, hourMatch, minuteMatch);
      const endOffset = new Date(dateObj.getTime() + 45 * 60 * 1000); // 45 mins session

      const formatICSDate = (d: Date) => {
        return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      };

      return {
        startStr: formatICSDate(dateObj),
        endStr: formatICSDate(endOffset)
      };
    } catch (e) {
      const now = new Date();
      return {
        startStr: now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
        endStr: new Date(now.getTime() + 45 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
      };
    }
  };

  const handleDownloadICS = (booking: any) => {
    if (!booking) return;
    const { startStr, endStr } = parseDateTimeForICS(booking.date, booking.time);

    const title = `Gajanan Hospital MR Meeting: ${booking.doctor}`;
    const description = `Medical Representative Appointment confirmation\n\nRepresentative Name: ${booking.name}\nCompany: ${booking.company}\nScientific / Molecule Focus: ${booking.product}\nBooking Code: ${booking.code}\nHospital Address: Gajanan Hospital & Critical Care Centre, Chhatrapati Sambhajinagar\nHospital Mobile: +91 83295 73283`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Gajanan Hospital//Clinical Roster R1//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
      "LOCATION:Gajanan Hospital & Critical Care Centre, Chhatrapati Sambhajinagar",
      `UID:${booking.code}-${Date.now()}@gajanan.hospital`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Gajanan_Hospital_Meeting_${booking.code}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAllMyMRBookings = () => {
    setMrBookings(defaultMrBookings);
    localStorage.setItem("gajanan_mr_bookings", JSON.stringify(defaultMrBookings));
  };

  const resetSuccessState = () => {
    setBookingSuccessCode(null);
    setAwaitingConfirm(null);
    setBookingError("");
  };

  const selectedDocObj = mrDoctors.find(d => d.id === mrDoctor);

  return (
    <div className="bg-gray-50/50 min-h-screen font-sans text-gray-800">
      
      {/* Sleek Subheader Header */}
      <div className="bg-gradient-to-r from-teal-50 via-sky-50 to-blue-50 border-b border-gray-150 py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-teal-800 hover:text-teal-950 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home Page
          </Link>
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 text-[10px] font-black uppercase tracking-wider mb-3 border border-teal-200">
              Healthcare Industry Gateway
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
              Medical Representatives Portal
            </h1>
            <p className="text-sm text-gray-600 mt-2 font-medium leading-relaxed">
              We highly value scientific interaction with pharmaceutical and surgical experts. Please reserve one of our 25 daily available slots to present new formulations, clinical studies, or healthcare technologies to our core medical directors.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: capacity stats and summary steps */}
          <div className="lg:col-span-4 space-y-6">
            <TiltCard 
              maxTilt={2} 
              scale={1} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-150/80 flex flex-col justify-between"
              glowColor="rgba(13, 148, 136, 0.05)"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Roster Load</span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${mrBookings.length >= 25 ? 'bg-red-50 text-red-700' : 'bg-teal-50 text-teal-800'}`}>
                    {Math.max(0, 25 - mrBookings.length)} Slots Available
                  </span>
                </div>

                <div className="text-3xl font-black text-gray-900 mb-1">
                  {mrBookings.length} <span className="text-sm font-bold text-gray-400">/ 25 daily slots booked</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-4 flex">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${
                      mrBookings.length >= 25 
                        ? 'bg-red-500' 
                        : mrBookings.length >= 18 
                          ? 'bg-amber-500' 
                          : 'bg-teal-600'
                    }`}
                    style={{ width: `${Math.min(100, (mrBookings.length / 25) * 100)}%` }}
                  />
                </div>

                <p className="text-[11px] font-semibold text-gray-500 leading-normal">
                  To protect focus on emergency services, we restrict active industry scientific sessions to 25 bookings daily across our directors and surgical consultants.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase">Hospital Status:</span>
                <span className="flex items-center text-[10px] font-black text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded-full tracking-wider">
                  <Activity className="h-3 w-3 mr-1 text-emerald-600 animate-pulse" />
                  Roster Live
                </span>
              </div>
            </TiltCard>

            {/* Quick guide */}
            <div className="bg-blue-950 p-6 rounded-2xl shadow-sm text-white relative overflow-hidden border border-blue-900">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full -mr-8 -mt-8 pointer-events-none" />
              <h3 className="text-xs font-black tracking-widest uppercase mb-3 flex items-center text-teal-300">
                <Sparkles className="h-4 w-4 mr-1.5" />
                Dual-Step Process
              </h3>
              <ol className="space-y-3.5 text-xs font-medium text-blue-100 leading-normal list-decimal pl-3.5">
                <li>Complete the scientific index form and select a medical director.</li>
                <li>Tap <strong className="text-white">Step 1</strong> to open your pre-filled invite page inside WhatsApp.</li>
                <li>Tap <strong className="text-white">Step 2</strong> on your screen to immediately lock your slot on the official hospital roster.</li>
              </ol>

              {mrBookings.length > 0 && (
                <button 
                  onClick={clearAllMyMRBookings} 
                  className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider border border-white/5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="h-2.5 w-2.5 animate-spin" style={{ animationDuration: '6s' }} />
                  Reset Slots (Demo Toggle)
                </button>
              )}
            </div>
          </div>

          {/* Right panel: Tab selectors and interface */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-150 overflow-hidden">
            
            {/* Tab Headers */}
            <div className="flex border-b border-gray-150 bg-gray-50/70">
              {[
                { id: "book", label: "Book Appointment", icon: Briefcase },
                { id: "guidelines", label: "Scientific Policy", icon: ShieldCheck },
                { id: "status", label: `Roster Slots (${mrBookings.length})`, icon: Calendar },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setMrTab(tab.id as any); resetSuccessState(); }}
                  className={`flex-1 py-3 text-xs md:text-sm font-black uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    mrTab === tab.id
                      ? "border-teal-600 text-teal-800 bg-white"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/40"
                  }`}
                >
                  <tab.icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content Area */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                
                {mrTab === "book" && (
                  <motion.div
                    key="book"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {bookingSuccessCode ? (
                      
                      /* Success confirmation display card */
                      <div className="text-center py-6 space-y-5 max-w-md mx-auto">
                        <div className="inline-flex p-1.5 px-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 items-center gap-1.5">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="font-extrabold text-[10px] uppercase tracking-wider">Ticket Approved & Scheduled</span>
                        </div>
                        
                        <div className="space-y-1">
                          <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Roster Slot Secured!</h3>
                          <p className="text-xs font-semibold text-gray-500 leading-normal">
                            Your briefing slot is officially requested. Use the verified reference ticket below at our counter or follow up on WhatsApp.
                          </p>
                        </div>

                        {/* Incoming message receipt preview */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-black text-gray-400 px-1">
                            <span>WHATSAPP SUPPORT RECEIPT LOG</span>
                            <span className="text-emerald-700">VERIFIED SYSTEM ticket</span>
                          </div>
                          
                          <div className="border border-teal-600/20 bg-emerald-100/10 rounded-xl overflow-hidden shadow-xs text-left">
                            <div className="bg-teal-900 text-white px-3 py-2 flex items-center justify-between text-[11px] font-bold">
                              <span>Gajanan Clinical Support</span>
                              <span className="text-[8px] bg-teal-700/80 px-1.5 rounded-full uppercase text-white">active code</span>
                            </div>
                            <div className="p-3 bg-white space-y-2 text-xs">
                              <p className="font-extrabold text-gray-800">Dear Roster Representative,</p>
                              <p className="text-gray-600 leading-relaxed text-[11px]">
                                Your clinical briefing with <strong>{mrBookings[mrBookings.length - 1]?.doctor}</strong> is logged. Details:
                              </p>
                              <div className="p-2.5 bg-gray-50 rounded border border-gray-200 font-mono text-[10px] space-y-0.5 text-gray-700">
                                <p>• <strong>ID CODE:</strong> {bookingSuccessCode}</p>
                                <p>• <strong>DOCTOR:</strong> {mrBookings[mrBookings.length - 1]?.doctor}</p>
                                <p>• <strong>DATE:</strong> {mrBookings[mrBookings.length - 1]?.date}</p>
                                <p>• <strong>TIME:</strong> {mrBookings[mrBookings.length - 1]?.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 text-left text-xs space-y-1">
                          <div className="flex justify-between items-center border-b border-gray-150 pb-1.5 mb-1.5">
                            <span className="font-black text-gray-400 text-[9px] uppercase tracking-wider">Ticket Reference:</span>
                            <span className="font-mono font-black text-teal-800 bg-teal-50 px-2 rounded-md tracking-tight select-all">
                              {bookingSuccessCode}
                            </span>
                          </div>
                          <p className="text-gray-500 text-[10px] leading-relaxed">
                            Secured slot on <strong className="text-gray-700">{mrBookings[mrBookings.length - 1]?.date}</strong> during the <strong className="text-gray-700">{mrBookings[mrBookings.length - 1]?.time}</strong> outpatient threshold.
                          </p>
                        </div>

                        {/* Scanner for confirmation receipt */}
                        <QuickScanQR 
                          url={getSuccessConfirmUrl(mrBookings[mrBookings.length - 1])}
                          label="Scan to pull your prefilled ticket confirmation status on WhatsApp instantly."
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          <button
                            onClick={() => sendSuccessMessageToMR(mrBookings[mrBookings.length - 1])}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-black py-2.5 rounded-xl flex items-center justify-center gap-1 hover:scale-[1.01] transition-all text-xs cursor-pointer shadow-xs"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0" />
                            Open Chat Window
                          </button>
                          <button
                            onClick={() => handleDownloadICS(mrBookings[mrBookings.length - 1])}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-black py-2.5 rounded-xl flex items-center justify-center gap-1 hover:scale-[1.01] transition-all text-xs cursor-pointer border border-gray-200"
                          >
                            <Download className="h-4 w-4 shrink-0" />
                            To Calendar (.ics)
                          </button>
                        </div>

                        <button
                          onClick={resetSuccessState}
                          className="px-4 py-2 text-xs font-black uppercase text-teal-700 hover:text-teal-900 transition-colors w-full"
                        >
                          Fill New Slot Booking Form &rarr;
                        </button>
                      </div>
                    ) : awaitingConfirm ? (
                      
                      /* Step-by-step dispatch control panel */
                      <div className="space-y-6">
                        <div className="flex items-start gap-3 p-4 bg-amber-50/40 border border-amber-200 rounded-xl text-amber-900 text-xs">
                          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="font-black uppercase tracking-wider">Step-by-Step WhatsApp Action Required</p>
                            <p className="text-gray-600">
                              Please submit step 1 to fire your details securely on our WhatsApp portal link. Then return here and tap step 2 to record the slot on the clinical terminal.
                            </p>
                          </div>
                        </div>

                        {/* Summary details */}
                        <div className="bg-gray-50 rounded-xl border border-gray-150 p-5 space-y-3 text-xs leading-normal">
                          <h4 className="font-black text-gray-400 uppercase tracking-widest text-[10px] border-b border-gray-200 pb-1">Proposed Roster Slip</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider">Representative Name:</span>
                              <strong className="text-gray-800 text-xs font-black">{awaitingConfirm.name}</strong>
                            </div>
                            <div>
                              <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider">Scientific Molecule:</span>
                              <strong className="text-gray-800 text-xs font-semibold">{awaitingConfirm.product}</strong>
                            </div>
                            <div>
                              <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider">Hospital Doctor:</span>
                              <strong className="text-teal-950 text-xs font-extrabold">{awaitingConfirm.doctor}</strong>
                            </div>
                            <div>
                              <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider">Date & Preferred Time:</span>
                              <strong className="text-gray-800 text-xs font-bold">{awaitingConfirm.date} @ {awaitingConfirm.time}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Scanner option */}
                        <QuickScanQR 
                          url={getAwaitingConfirmUrl()}
                          label="Scan to automatically format and bridge this representative dispatch straight to your smartphone's WhatsApp chat."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          <button
                            onClick={handleOpenWhatsApp}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                          >
                            <MessageCircle className="h-4.5 w-4.5" />
                            Step 1: Dispatch WhatsApp Msg
                          </button>
                          <button
                            onClick={finalizeMRBooking}
                            className="bg-blue-950 hover:bg-blue-900 border border-blue-950 text-white py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <UserCheck className="h-4.5 w-4.5" />
                            Step 2: Save on Roster
                          </button>
                        </div>

                        <div className="text-center">
                          <button 
                            type="button"
                            onClick={() => setAwaitingConfirm(null)}
                            className="text-xs font-bold text-gray-400 hover:text-gray-600 underline"
                          >
                            Cancel and update form entries
                          </button>
                        </div>
                      </div>
                    ) : (
                      
                      /* Normal form input */
                      <form onSubmit={handleMRRequest} className="space-y-5">
                        {bookingError && (
                          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-800 text-xs font-bold flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                            <span>{bookingError}</span>
                          </div>
                        )}

                        {mrBookings.length >= 25 && (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs space-y-1">
                            <h4 className="font-extrabold uppercase tracking-wide flex items-center">
                              <AlertCircle className="h-4 w-4 text-red-600 mr-1" />
                              Roster Closed
                            </h4>
                            <p className="text-red-700 font-medium">Daily medical representative index is fully allocated today.</p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Representative Name */}
                          <div className="space-y-1">
                            <label htmlFor="mrName" className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Representative Name</label>
                            <input
                              id="mrName"
                              type="text"
                              placeholder="Anand Deshmukh"
                              value={mrName}
                              onChange={(e) => setMrName(e.target.value)}
                              disabled={mrBookings.length >= 25}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all"
                              required
                            />
                          </div>

                          {/* Company Name */}
                          <div className="space-y-1">
                            <label htmlFor="mrCompany" className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Pharmaceutical Company</label>
                            <input
                              id="mrCompany"
                              type="text"
                              placeholder="Cipla, Sun Pharma, etc."
                              value={mrCompany}
                              onChange={(e) => setMrCompany(e.target.value)}
                              disabled={mrBookings.length >= 25}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all"
                              required
                            />
                          </div>

                          {/* Contact Number */}
                          <div className="space-y-1">
                            <label htmlFor="mrPhone" className="block text-[10px] font-black uppercase tracking-wider text-gray-400">WhatsApp Mobile Number</label>
                            <input
                              id="mrPhone"
                              type="tel"
                              placeholder="9876543210"
                              value={mrPhone}
                              onChange={(e) => setMrPhone(e.target.value)}
                              disabled={mrBookings.length >= 25}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all"
                              required
                            />
                          </div>

                          {/* Doctor list selector */}
                          <div className="space-y-1">
                            <label htmlFor="mrDoctor" className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Target Doctor</label>
                            <select
                              id="mrDoctor"
                              value={mrDoctor}
                              onChange={(e) => setMrDoctor(e.target.value)}
                              disabled={mrBookings.length >= 25}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-extrabold focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all"
                              required
                            >
                              <option value="">-- Choose Specialist Dr. --</option>
                              {mrDoctors.map(doc => (
                                <option key={doc.id} value={doc.id}>
                                  {doc.name} ({doc.callDay} Slot)
                                </option>
                              ))}
                            </select>
                            
                            {mrDoctor && (
                              <div className="mt-2 p-2.5 bg-teal-50/80 border border-teal-100 rounded-lg text-[10px] text-teal-950 font-semibold space-y-1">
                                <p className="flex items-center gap-1 text-teal-900 uppercase tracking-wider text-[9px] font-black">
                                  <Clock className="w-3 h-3 text-teal-600 animate-pulse" />
                                  <span>Official calling day schedule</span>
                                </p>
                                <p className="font-bold text-[11px] text-teal-800">
                                  {mrDoctors.find(d => d.id === mrDoctor)?.name} accepts representatives strictly on <strong className="font-extrabold text-teal-950 uppercase">{mrDoctors.find(d => d.id === mrDoctor)?.schedule}</strong>.
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Dates */}
                          <div className="space-y-1">
                            <label htmlFor="mrDate" className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Proposed Date</label>
                            <select
                              id="mrDate"
                              value={mrDate}
                              onChange={(e) => setMrDate(e.target.value)}
                              disabled={!mrDoctor || mrBookings.length >= 25}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-extrabold focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-400"
                              required
                            >
                              {!mrDoctor ? (
                                <option value="">-- Please Select Target Doctor First --</option>
                              ) : (
                                <>
                                  <option value="">-- Select Available Date --</option>
                                  {getFilteredDatesWithStatus(mrDoctor).map(d => (
                                    <option key={d.iso} value={d.readable}>
                                      {d.readable} {d.status === "OPEN" ? "★ (Active Roster - Booking Open!)" : d.status === "LOCKED" ? `(Locked - Opens at 8:00 AM on 1 day prior)` : `(Closed - Call Time Passed)`}
                                    </option>
                                  ))}
                                </>
                              )}
                            </select>

                            {/* Alert messages for the 1-day prior constraint */}
                            {mrDoctor && (
                              <div className="mt-2 text-[10px] leading-relaxed">
                                {!mrDate ? (
                                  <div className="p-2.5 bg-teal-50/50 border border-teal-100 rounded-lg text-teal-850 font-semibold flex items-start gap-1.5 shadow-xs">
                                    <AlertCircle className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                                    <div>
                                      <p className="font-extrabold uppercase text-[9px] tracking-wider text-teal-900">Roster Window Rule</p>
                                      <p className="text-gray-600 font-medium font-sans">
                                        Booking is open exactly from 1 day before at 8:00 AM up to the doctor's call time. Choose the day marked with ★.
                                      </p>
                                    </div>
                                  </div>
                                ) : (() => {
                                  const selectedDateObj = getFilteredDatesWithStatus(mrDoctor).find(d => d.readable === mrDate);
                                  if (selectedDateObj) {
                                    if (selectedDateObj.status === "OPEN") {
                                      return (
                                        <div className="p-2.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg font-semibold flex items-start gap-1.5 shadow-xs">
                                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                          <div>
                                            <p className="font-bold uppercase text-[9px] tracking-wider text-emerald-850">Roster Window Active ✓</p>
                                            <p className="text-gray-650 font-sans">Booking is open and active! Slots are available and booking remains open until the call starts ({selectedDateObj.callTimeReadable}).</p>
                                          </div>
                                        </div>
                                      );
                                    } else if (selectedDateObj.status === "LOCKED") {
                                      return (
                                        <div className="p-2.5 bg-amber-50 text-amber-950 border border-amber-200 rounded-lg font-semibold flex flex-col gap-1.5 shadow-xs">
                                          <div className="flex items-start gap-1.5">
                                            <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                                            <div>
                                              <p className="font-bold uppercase text-[9px] tracking-wider text-amber-900">Booking Locked (Too Early)</p>
                                              <p className="text-gray-650 font-medium font-sans">
                                                Representatives can take appointment just one day before the call date.
                                              </p>
                                            </div>
                                          </div>
                                          <p className="text-[9.5px] font-bold text-amber-850 bg-white/70 px-2 py-1 rounded border border-amber-100/50">
                                            📅 Booking opens at 8:00 AM on <strong className="font-extrabold uppercase text-amber-950">{selectedDateObj.priorReadable}</strong>.
                                          </p>
                                        </div>
                                      );
                                    } else {
                                      return (
                                        <div className="p-2.5 bg-rose-50 text-rose-950 border border-rose-200 rounded-lg font-semibold flex flex-col gap-1.5 shadow-xs">
                                          <div className="flex items-start gap-1.5">
                                            <AlertCircle className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                                            <div>
                                              <p className="font-bold uppercase text-[9px] tracking-wider text-rose-900">Roster Closed (Passed)</p>
                                              <p className="text-gray-650 font-medium">The call timing ({selectedDateObj.callTimeReadable}) for this date has already passed. Please select another date.</p>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  }
                                  return null;
                                })()}
                              </div>
                            )}
                          </div>

                          {/* Slots */}
                          <div className="space-y-1">
                            <label htmlFor="mrTimeSlot" className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Preferred Briefing Time</label>
                            <select
                              id="mrTimeSlot"
                              value={mrTimeSlot}
                              onChange={(e) => setMrTimeSlot(e.target.value)}
                              disabled={mrBookings.length >= 25}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-extrabold focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all"
                              required
                            >
                              <option value="">-- Select Slot Window --</option>
                              {selectedDocObj && selectedDocObj.timeSlot !== "Special Request Slot" && (
                                <option value={selectedDocObj.timeSlot}>{selectedDocObj.timeSlot} ({selectedDocObj.schedule} - Recommended)</option>
                              )}
                              <option value="10:30 AM - 11:30 AM">10:30 AM - 11:30 AM (Director Molecule Briefing)</option>
                              <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM (Clinical Outpatient Interval)</option>
                              <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM (Specialized Presentation Slot)</option>
                              <option value="08:15 PM - 09:00 PM">08:15 PM - 09:00 PM (Late-Evening Scientific Round)</option>
                            </select>
                          </div>
                        </div>

                        {/* Focus Molecule */}
                        <div className="space-y-1">
                          <label htmlFor="mrProduct" className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Molecule / Therapeutic Scientific focus (short index)</label>
                          <input
                            id="mrProduct"
                            type="text"
                            placeholder="SGLT2 Inhibitor / Knee Orthosis components / Biosimilar Insulin"
                            value={mrProduct}
                            onChange={(e) => setMrProduct(e.target.value)}
                            disabled={mrBookings.length >= 25}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <button
                            type="submit"
                            disabled={
                              mrBookings.length >= 25 || 
                              !mrDate || 
                              (mrDoctor ? getFilteredDatesWithStatus(mrDoctor).find(d => d.readable === mrDate)?.status !== "OPEN" : false)
                            }
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none hover:scale-[1.005] transition-all text-xs cursor-pointer uppercase tracking-wider"
                          >
                            <MessageCircle className="h-4 w-4" />
                            {(() => {
                              if (!mrDoctor || !mrDate) return "Launch Dual-Step Booking Route";
                              const selectedDateObj = getFilteredDatesWithStatus(mrDoctor).find(d => d.readable === mrDate);
                              if (selectedDateObj) {
                                if (selectedDateObj.status === "LOCKED") return "Booking Locked (Opens 1 Day Prior at 8:00 AM)";
                                if (selectedDateObj.status === "EXPIRED") return "Booking Closed (Call Time Passed)";
                              }
                              return "Launch Dual-Step Booking Route";
                            })()}
                          </button>
                          <p className="text-[10px] text-gray-400 text-center mt-2.5 font-semibold leading-normal">
                            By booking, you agree to prioritize direct patient emergencies and follow clinical director rules.
                          </p>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}

                {mrTab === "guidelines" && (
                  <motion.div
                    key="guidelines"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6 text-xs text-gray-700"
                  >
                    {/* Official Notice Board Header */}
                    <div className="bg-gradient-to-tr from-teal-950 via-slate-900 to-indigo-950 text-white p-5 rounded-xl border border-teal-500/10 flex flex-col items-center text-center relative overflow-hidden shadow-sm">
                      <div className="absolute inset-0 bg-radial-gradient from-teal-500/15 via-transparent to-transparent opacity-60 pointer-events-none" />
                      <div className="relative z-10 space-y-1.5 w-full">
                        <p className="text-[9px] font-black tracking-widest text-teal-400 uppercase">Gajanan Hospital & Critical Care Centre</p>
                        <h4 className="text-sm md:text-base font-black tracking-wide text-slate-100 uppercase border-y border-teal-500/30 py-1.5 px-6 inline-block w-full">
                          Guideline for Medical Representative
                        </h4>
                        <p className="text-[10px] text-gray-300 font-medium">Verified Official Roster Rules (Sarang Society, Plot No. 8, Garkheda)</p>
                      </div>
                    </div>

                    {/* Roster Table of calling days */}
                    <div className="space-y-2.5">
                      <h5 className="font-extrabold text-teal-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                        Dedicated Weekly Call Days
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {mrDoctors.map((doc, idx) => (
                          <div key={doc.id} className="p-3 bg-teal-50/20 border border-teal-100/40 rounded-xl flex items-start gap-2.5">
                            <span className="bg-teal-600 text-white font-black h-5 w-5 rounded-md flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div className="space-y-0.5">
                              <p className="font-extrabold text-slate-900 text-xs">{doc.name.toUpperCase()}</p>
                              <p className="text-gray-400 text-[10px] font-semibold">{doc.desc}</p>
                              <div className="mt-1.5 flex flex-wrap gap-1.5 items-center">
                                <span className="bg-teal-50 text-teal-850 border border-teal-100 px-1.5 py-0.5 rounded text-[9px] font-black uppercase">
                                  {doc.callDay}
                                </span>
                                <span className="text-[10px] text-gray-600 font-extrabold flex items-center gap-0.5">
                                  <Clock className="w-3 h-3 text-teal-600" />
                                  {doc.schedule.split("(")[1]?.replace(")", "") || doc.timeSlot}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Conduct rules verbatim from printed notice list */}
                    <div className="space-y-3 pt-1">
                      <h5 className="font-extrabold text-teal-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                        Code of Conduct (Adherence Mandatory)
                      </h5>
                      <div className="bg-white rounded-xl border border-gray-150 p-4 divide-y divide-gray-100">
                        
                        <div className="pb-3 flex items-start gap-2.5 text-xs">
                          <span className="text-red-600 shrink-0 font-bold text-sm">🏡</span>
                          <div>
                            <p className="font-semibold text-gray-700">
                              <strong>Cabin Meeting Clause:</strong> Kindly meet the doctor in the cabin only.
                            </p>
                            <span className="text-red-705 font-bold uppercase text-[9px] tracking-wide inline-block bg-red-50 text-red-700 px-2 py-0.5 mt-0.5 rounded-md border border-red-155">
                              Meeting the doctor in the passage / staircase / parking is strictly not allowed.
                            </span>
                          </div>
                        </div>
                        
                        <div className="py-3 flex items-start gap-2.5 text-xs">
                          <span className="text-amber-650 shrink-0 font-bold text-sm">📞</span>
                          <p className="font-semibold text-gray-700 leading-normal">
                            <strong>Emergency Roster Threshold:</strong> Call the doctor in the emergency situation only, <span className="text-amber-805 font-extrabold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded">no unnecessary phone calls please.</span>
                          </p>
                        </div>

                        <div className="py-3 flex items-start gap-2.5 text-xs">
                          <span className="text-emerald-500 shrink-0 font-bold text-sm">💬</span>
                          <p className="font-semibold text-gray-700 leading-normal">
                            <strong>WhatsApp Communication Etiquette:</strong> Don't send unnecessary WhatsApp messages like Good Morning, Good Night etc.
                          </p>
                        </div>

                        <div className="py-3 flex items-start gap-2.5 text-xs">
                          <span className="text-purple-650 shrink-0 font-bold text-sm">🧘</span>
                          <p className="font-semibold text-gray-700 leading-normal">
                            <strong>Work-Life Balance Alignment:</strong> Kindly respect doctors' privacy, personal life and help them to reduce stress.
                          </p>
                        </div>

                        <div className="py-3 flex items-start gap-2.5 text-xs">
                          <span className="text-slate-500 shrink-0 font-bold text-sm">🕒</span>
                          <p className="font-semibold text-gray-700 leading-normal">
                            <strong>Prerequisite Waiting Clock:</strong> Please be seated in the waiting area just 15 minutes before the call.
                          </p>
                        </div>

                        <div className="py-3 flex items-start gap-2.5 text-xs">
                          <span className="text-blue-700 shrink-0 font-bold text-sm">👵</span>
                          <p className="font-semibold text-gray-700 leading-normal">
                            <strong>Senior Professional Priority:</strong> Take prior appointment if you are senior and want to meet the doctor.
                          </p>
                        </div>

                        <div className="pt-3 flex flex-col md:flex-row gap-2 justify-between items-center text-[10px] font-extrabold text-teal-800 bg-teal-50/50 p-2.5 rounded-lg border border-teal-100">
                          <span className="flex items-center gap-1">🤝 Together we will make a healthy society and will serve the humanity.</span>
                          <span className="flex items-center gap-1">🏡 Take care of yourself and your family.</span>
                        </div>

                      </div>
                    </div>

                    {/* Official Marathi Roster board guidelines and footer indices */}
                    <div className="border border-dashed border-gray-200 bg-gray-50 p-4 rounded-xl space-y-3 text-[10.5px] text-gray-600 font-semibold shadow-3xs">
                      <p className="font-black text-slate-800 uppercase tracking-widest text-[9px] flex items-center gap-1">
                        📢 OFFICIAL DESK NOTICE BOARD / नियमावली
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-slate-800 font-black flex items-center gap-1 text-[11px]">
                            🏥 OPD TIMINGS / ओपीडी वेळ:
                          </p>
                          <div className="bg-white p-2 border border-gray-150 rounded-lg pl-3">
                            <p className="text-teal-900 text-xs font-black">सकाळी १० ते २ • संध्या. ५ ते ९</p>
                            <p className="text-gray-400 text-[10px] font-bold mt-0.5">(Morning 10:00 AM to 2:00 PM • Evening 5:00 PM to 9:00 PM)</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-slate-800 font-black flex items-center gap-1 text-[11px]">
                            📝 REQUIRED COUNTER STEPS:
                          </p>
                          <div className="bg-white p-2 border border-gray-150 rounded-lg pl-3 space-y-1">
                            <p className="text-slate-800 font-bold">• कृपया येण्यापूर्वी नाव नोंदणी करावी। <span className="text-gray-400 font-semibold">(Prior registration is mandatory)</span></p>
                            <p className="text-slate-800 font-bold">• परत येताना हा कागद सोबत आणावा। <span className="text-gray-400 font-semibold">(Please bring this receipt card when returning)</span></p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-250 flex flex-col sm:flex-row justify-between text-[10px] text-gray-400 gap-2 font-bold select-all">
                        <p>Hospital Helpline Desk: 0240-2451055, 8329573283</p>
                        <p>Official Escalation Roster: gajananhospitalicu@gmail.com</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {mrTab === "status" && (
                  <motion.div
                    key="status"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-5"
                  >
                    <div className="flex justify-between items-center pb-2.5 border-b border-gray-155">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Appointments</span>
                      <span className="text-[10px] font-bold text-teal-850 bg-teal-50 px-2 py-0.5 rounded-md">
                        {mrBookings.length} / 25 daily limit
                      </span>
                    </div>

                    <div className="max-h-[380px] overflow-y-auto space-y-2.5 pr-2 scrollbar-thin">
                      {mrBookings.length > 0 ? (
                        mrBookings.map((booking, idx) => (
                          <div 
                            key={idx} 
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-white border border-gray-150 rounded-xl hover:border-teal-200 hover:shadow-2xs transition-all duration-200"
                          >
                            <div className="space-y-0.5">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-extrabold text-gray-950 text-xs sm:text-sm">{booking.name}</span>
                                <span className="text-[9px] font-black uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full">
                                  {booking.company}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 font-semibold">
                                Visiting <strong className="text-teal-900 font-bold">{booking.doctor}</strong> on <span className="text-gray-700 font-medium">{booking.date} at {booking.time}</span>
                              </p>
                              <p className="text-[10px] text-gray-400 italic">
                                Scientific Target: {booking.product}
                              </p>
                            </div>
                            <div className="mt-2.5 sm:mt-0 flex items-center sm:flex-col gap-1.5 sm:items-end shrink-0">
                              <span className="inline-flex items-center text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                <CheckCircle2 className="h-2.5 w-2.5 mr-0.5 text-emerald-600" />
                                {booking.status}
                              </span>
                              <span className="text-[9px] font-mono text-gray-400 font-bold">
                                {booking.code}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 text-gray-400 space-y-2">
                          <Calendar className="h-8 w-8 text-gray-200 mx-auto" />
                          <p className="font-bold text-xs">No slot reservations logged.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
