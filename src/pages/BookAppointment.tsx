import React, { useState } from "react";
import { MessageCircle, User, Stethoscope, ArrowRight, CheckCircle2, Phone, Mail, FileText } from "lucide-react";

const directors = [
  { id: "dr-gitesh", name: "Dr. Gitesh Dalvi", spec: "Physician Diabetologist & Intensivist" },
  { id: "dr-vijay", name: "Dr. Vijay Walture", spec: "Physician Diabetologist & Intensivist" },
  { id: "dr-sachin", name: "Dr. Sachin Suryawanshi", spec: "Physician Diabetologist & Intensivist" },
  { id: "dr-sachin-patil", name: "Dr. Sachin Patil", spec: "Orthopaedic & Joint Replacement Surgeon" },
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

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !doctor || !phone) return;

    const selectedDoc = directors.find(d => d.id === doctor)?.name;
    
    // Pre-filled message for the WhatsApp Chatbot / Reception
    const message = `Hello Gajanan Hospital & Critical Care Centre,\n\nI would like to book an appointment.\n\n*Patient Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'Not provided'}\n*Consulting Doctor:* ${selectedDoc}\n*Reason for Visit:* ${reason || 'General Consultation'}\n\nPlease guide me with the available timings.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/qr/4VVVV63VTXY3M1?text=${encodedMessage}`, "_blank");
    
    // Show confirmation state
    setIsSent(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setName("");
      setPhone("");
      setEmail("");
      setDoctor("");
      setReason("");
      setIsSent(false);
    }, 10000); // Reset after 10 seconds
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Book an Appointment</h1>
          <p className="text-lg text-gray-600">
            Consult with our Main Directors and Specialists. Book instantly via our WhatsApp Chatbot.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#25D366]">
          <div className="p-8 md:p-10">
            {isSent ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Sent!</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                  Your booking request has been initiated. Please complete the process in the WhatsApp window that just opened.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center space-x-3 mb-8 bg-[#25D366]/10 py-4 rounded-lg text-[#25D366]">
                  <MessageCircle className="h-8 w-8" />
                  <span className="text-xl font-bold">WhatsApp Booking</span>
                </div>

                <form onSubmit={handleWhatsAppBooking} className="space-y-6">
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
                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-[#25D366] hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-lg shadow-[#25D366]/30"
                  >
                    <MessageCircle className="mr-2 h-6 w-6" />
                    Continue to WhatsApp Chat
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                  <p>By continuing, you will be redirected to WhatsApp to complete your booking with our automated assistant.</p>
                  <p className="mt-2 font-semibold text-gray-700">Emergency & Primary Contact: 8329573283</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
