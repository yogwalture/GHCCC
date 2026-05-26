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
    { id: "dr-sachin-s", name: "Dr. Sachin Suryawanshi", desc: "Director - Medicine & Critical Care" },
    { id: "dr-vijay", name: "Dr. Vijay Walture", desc: "Director - Medicine & Critical Care" },
    { id: "dr-gitesh", name: "Dr. Gitesh Dalvi", desc: "Director - Medicine & Critical Care" },
    { id: "dr-dilip", name: "Dr. Dilip Thombre", desc: "Director - Medicine & Critical Care" },
    { id: "dr-rameshwar", name: "Dr. Rameshwar Hajare", desc: "Director - Medicine & Critical Care" },
    { id: "dr-sachin-patil", name: "Dr. Sachin Patil", desc: "Consultant - Orthopaedic Department" }
  ];

  const getNextFiveWorkingDays = () => {
    const list = [];
    const temp = new Date();
    let count = 0;
    while (count < 6) {
      if (temp.getDay() !== 0) { // Skip Sunday
        const readable = temp.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric"
        });
        const iso = temp.toISOString().split("T")[0];
        list.push({ readable, iso });
        count++;
      }
      temp.setDate(temp.getDate() + 1);
    }
    return list;
  };

  const defaultMrBookings = [
    { name: "Rohan Khanna", company: "Cipla Ltd", doctor: "Dr. Gitesh Dalvi", date: "Wed, May 27, 2026", time: "10:30 AM - 11:30 AM", product: "Inhaler Tech / Monotherapy", status: "Fixed & Confirmed", code: "MR-GAJ-8371" },
    { name: "Priya Sharma", company: "Sun Pharmaceutical", doctor: "Dr. Sachin Suryawanshi", date: "Wed, May 27, 2026", time: "02:00 PM - 03:00 PM", product: "Anti-diabetic formulations", status: "Fixed & Confirmed", code: "MR-GAJ-4251" },
    { name: "Amit Joshi", company: "Dr. Reddy's Lab", doctor: "Dr. Dilip Thombre", date: "Thu, May 28, 2026", time: "03:00 PM - 04:00 PM", product: "Cardiovascular Beta-Blockers", status: "Fixed & Confirmed", code: "MR-GAJ-9134" },
    { name: "Snehal Sinde", company: "Lupin Pharmaceuticals", doctor: "Dr. Sachin Patil", date: "Thu, May 28, 2026", time: "02:00 PM - 03:00 PM", product: "Osteoarthritis Joint Supplements", status: "Fixed & Confirmed", code: "MR-GAJ-1082" }
  ];

  useEffect(() => {
    const stored = localStorage.getItem("gajanan_mr_bookings");
    if (stored) {
      try {
        setMrBookings(JSON.parse(stored));
      } catch (e) {
        setMrBookings(defaultMrBookings);
      }
    } else {
      localStorage.setItem("gajanan_mr_bookings", JSON.stringify(defaultMrBookings));
      setMrBookings(defaultMrBookings);
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
                              <optgroup label="Core Medical Directors">
                                {mrDoctors.slice(0, 5).map(doc => (
                                  <option key={doc.id} value={doc.id}>{doc.name}</option>
                                ))}
                              </optgroup>
                              <optgroup label="Orthopaedic Specialty">
                                {mrDoctors.slice(5).map(doc => (
                                  <option key={doc.id} value={doc.id}>{doc.name}</option>
                                ))}
                              </optgroup>
                            </select>
                          </div>

                          {/* Dates */}
                          <div className="space-y-1">
                            <label htmlFor="mrDate" className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Proposed Date</label>
                            <select
                              id="mrDate"
                              value={mrDate}
                              onChange={(e) => setMrDate(e.target.value)}
                              disabled={mrBookings.length >= 25}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-extrabold focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all"
                              required
                            >
                              <option value="">-- Select Available Date --</option>
                              {getNextFiveWorkingDays().map(d => (
                                  <option key={d.iso} value={d.readable}>{d.readable}</option>
                              ))}
                            </select>
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
                            disabled={mrBookings.length >= 25}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none hover:scale-[1.005] transition-all text-xs cursor-pointer uppercase tracking-wider"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Launch Dual-Step Booking Route
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
                    className="space-y-5 text-xs text-gray-600 font-medium leading-relaxed"
                  >
                    <h4 className="text-base font-black text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-1.5">Briefing Regulations</h4>
                    <p className="leading-relaxed">To ensure standard critical care schedules and diagnostic procedures remain completely uninterrupted, Gajanan Hospital maintains strict representative criteria:</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-teal-50/20 rounded-xl border border-teal-100/50 space-y-1">
                        <h5 className="font-extrabold text-teal-900 uppercase text-[10px] tracking-wider">Scientific Content Standard</h5>
                        <p className="text-gray-500 leading-normal text-[11px]">Submission materials are limited to peer-reviewed clinical data panels, bio-equivalence studies, or patent updates. Promotional branding displays are prohibited.</p>
                      </div>
                      <div className="p-4 bg-sky-50/20 rounded-xl border border-sky-100/50 space-y-1">
                        <h5 className="font-extrabold text-[#1d4ed8] uppercase text-[10px] tracking-wider">Departmental Priorities</h5>
                        <p className="text-gray-500 leading-normal text-[11px]">All hip/knee reconstruction assets or orthopaedic drugs must be logged strictly for Dr. Sachin Patil's dedicated consultative windows.</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h5 className="font-extrabold text-gray-900 uppercase text-[10px] tracking-wide mb-2">Policy Checkpoints:</h5>
                      <ul className="list-disc pl-4 space-y-2 text-[11px] text-gray-500">
                        <li>Roster reservations booked online and confirmed via standard WhatsApp triggers are mandatory. Drop-ins or unscheduled briefings will not be facilitated.</li>
                        <li>Scientific presentation durations are strictly restricted to 8-10 minutes maximum duration.</li>
                        <li>Authorized reps must carry valid industry identity tokens and active immunization cards upon ward entry.</li>
                      </ul>
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
