import React, { useState } from "react";
import { MessageCircle, User, Stethoscope, ArrowRight, CheckCircle2, Phone, Mail, FileText, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const directors = [
  { id: "dr-gitesh", name: "Dr. Gitesh Dalvi", spec: "Physician Diabetologist & Intensivist" },
  { id: "dr-vijay", name: "Dr. Vijay Walture", spec: "Physician Diabetologist & Intensivist" },
  { id: "dr-sachin", name: "Dr. Sachin Suryawanshi", spec: "Physician Diabetologist & Intensivist" },
  { id: "dr-sachin-patil", name: "Dr. Sachin Atmaram Patil", spec: "Consultant Joint Replacement, Arthroscopy & Orthopaedic Surgeon" },
  { id: "dr-rahul-ruikar", name: "Dr. Rahul Ruikar", spec: "Nephrology / Kidney Specialist (OPD 5:00 PM - 7:00 PM)" },
  { id: "dr-dilip", name: "Dr. Dilip Thombre", spec: "Physician Cardiologist, Diabetologist & Intensivist" },
  { id: "dr-rameshwar", name: "Dr. Rameshwar Hajare", spec: "Consultant Physician & Intensivist" },
];

export function BookAppointment() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [doctor, setDoctor] = useState("");
  const [reason, setReason] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleWhatsAppBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !doctor || !phone) return;

    const selectedDoc = directors.find(d => d.id === doctor)?.name;
    
    // Pre-filled message for the WhatsApp Chatbot / Reception
    const message = `Hello Gajanan Hospital & Critical Care Centre,\n\nI would like to book an appointment.\n\n*Patient Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'Not provided'}\n*Consulting Doctor:* ${selectedDoc}\n*Reason for Visit:* ${reason || 'General Consultation'}\n\nPlease guide me with the available timings.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect to WhatsApp
    window.open(`https://api.whatsapp.com/send?phone=918329573283&text=${encodedMessage}`, "_blank");
    
    // Save to server database + localStorage so admin can see it and manage feedback
    try {
      const existing = localStorage.getItem("gajanan_patient_appointments");
      const list = existing ? JSON.parse(existing) : [];
      const newAppt = {
        id: `clinical-${Date.now()}`,
        name,
        phone,
        email: email || "Not provided",
        doctor: selectedDoc || doctor,
        reason: reason || "General Consultation",
        date: new Date().toISOString().split("T")[0],
        time: "Tentative",
        status: "confirmed",
        feedbackScheduled: true,
        feedbackScheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        feedbackTriggered: false
      };
      const updatedList = [newAppt, ...list];
      localStorage.setItem("gajanan_patient_appointments", JSON.stringify(updatedList));

      // Sync to database
      try {
        const res = await fetch("/api/patient-appointments");
        let serverList: any[] = [];
        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            if (Array.isArray(data)) {
              serverList = data;
            }
          } else {
            console.warn("Expected JSON from /api/patient-appointments but received non-JSON: " + contentType);
          }
        }
        const mergedList = [newAppt, ...serverList];
        // Ensure uniqueness by ID
        const uniqueMerged = Array.from(new Map(mergedList.map(item => [item.id, item])).values());

        await fetch("/api/patient-appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uniqueMerged),
        });
      } catch (err) {
        console.error("Failed to sync new patient appointment with database:", err);
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }

    // Show confirmation state
    setIsSent(true);
  };

  return (
    <div className="bg-gradient-to-b from-teal-50/20 to-gray-150/10 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-teal-55 text-teal-800 text-[10px] font-black uppercase tracking-wider mb-2 border border-teal-100">
            Outpatient Services
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-teal-950 tracking-tight leading-tight mb-2">Book an Appointment</h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto leading-relaxed font-semibold">
            Consult with our Directors and Orthopaedic Specialists. Prep your ticket and secure timings via WhatsApp instantly.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xs overflow-hidden border border-gray-150">
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-black text-gray-905 mb-2">Redirecting to WhatsApp...</h2>
                  <p className="text-xs text-gray-500 mb-6 max-w-md mx-auto font-medium">
                    Your appointment details have been prepared. Please click <strong>"Send"</strong> inside WhatsApp to file the request on our roster system.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        const message = `Hello Gajanan Hospital & Critical Care Centre,\n\nI would like to book an appointment.\n\n*Patient Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'Not provided'}\n*Consulting Doctor:* ${directors.find(d => d.id === doctor)?.name}\n*Reason for Visit:* ${reason || 'General Consultation'}`;
                        window.open(`https://api.whatsapp.com/send?phone=918329573283&text=${encodeURIComponent(message)}`, "_blank");
                      }}
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-[#25D366] text-white text-xs font-black uppercase tracking-wider rounded-lg hover:bg-[#20bd5a] transition-all cursor-pointer shadow-xs"
                    >
                      <ExternalLink className="mr-1.5 h-4 w-4" />
                      Manually open WhatsApp Link
                    </button>
                    <button
                      onClick={() => {
                        setName("");
                        setPhone("");
                        setEmail("");
                        setDoctor("");
                        setReason("");
                        setIsSent(false);
                      }}
                      className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-200 text-xs font-black uppercase tracking-wider rounded-lg text-gray-500 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Book Another Slip
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-center space-x-2.5 mb-6 bg-teal-50/50 py-3 px-4 border border-teal-100 rounded-xl text-teal-850">
                    <MessageCircle className="h-5 w-5 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider">Automated Assistant Booking Slip</span>
                  </div>

                  <form onSubmit={handleWhatsAppBooking} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Patient Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                        Patient Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#25D366] focus:border-[#25D366] transition-colors"
                          placeholder="Full Name"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#25D366] focus:border-[#25D366] transition-colors"
                          placeholder="Contact Number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email Address */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#25D366] focus:border-[#25D366] transition-colors"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>

                    {/* Select Doctor */}
                    <div>
                      <label htmlFor="doctor" className="block text-sm font-bold text-gray-700 mb-2">
                        Select Doctor
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Stethoscope className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="doctor"
                          required
                          value={doctor}
                          onChange={(e) => setDoctor(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#25D366] focus:border-[#25D366] transition-colors appearance-none bg-white"
                        >
                          <option value="" disabled>Select a doctor...</option>
                          {directors.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                              {doc.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Reason for Visit */}
                  <div>
                    <label htmlFor="reason" className="block text-sm font-bold text-gray-700 mb-2">
                      Reason for Visit
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        id="reason"
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#25D366] focus:border-[#25D366] transition-colors"
                        placeholder="Briefly describe your symptoms or reason for consultation"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!name || !doctor || !phone}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-xs font-black uppercase tracking-wider rounded-xl text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-150 disabled:text-gray-400 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-xs cursor-pointer group"
                  >
                    <MessageCircle className="mr-1.5 h-4.5 w-4.5" />
                    Proceed to WhatsApp Chat
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>

                <div className="mt-6 text-center text-[11px] text-gray-400 font-semibold leading-normal">
                  <p>By proceeding, you will be bridged to WhatsApp to secure your slot with on-floor clinical support.</p>
                  <p className="mt-1.5 text-slate-800">Primary Ward Hotline: +91 83295 73283</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </div>
  );
}
