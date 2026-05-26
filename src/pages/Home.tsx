import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Activity, Heart, Stethoscope, ShieldCheck, Clock, Phone, MessageCircle, 
  Users, Award, Building2, Syringe, Brain, Bone, Droplets, Scissors, ChevronLeft, ChevronRight,
  Search, Filter, Briefcase, Calendar, Sparkles, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LogoImage } from "../components/ui/LogoImage";
import { TiltCard } from "../components/ui/TiltCard";
import { HospitalName } from "../components/ui/HospitalName";

export function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchFacility, setSearchFacility] = useState("");

  const stats = [
    { label: "Patients Treated", value: "50,000+", icon: Users },
    { label: "Expert Doctors", value: "25+", icon: Stethoscope },
    { label: "Years of Excellence", value: "15+", icon: Award },
    { label: "Hospital Beds", value: "100+", icon: Building2 },
  ];

  const keyDepartments = [
    { name: "General Medicine", icon: Activity, desc: "Comprehensive primary care and internal medicine." },
    { name: "Cardiology", icon: Heart, desc: "Advanced heart care and diagnostic services." },
    { name: "Critical Care", icon: ShieldCheck, desc: "24/7 high-dependency monitoring and treatment." },
    { name: "Neurology", icon: Brain, desc: "Specialized care for brain and nervous system disorders." },
    { name: "Orthopedics", icon: Bone, desc: "Expert bone, joint, and spinal treatments." },
    { name: "General Surgery", icon: Scissors, desc: "Modern surgical procedures with minimal invasion." },
    { name: "Nephrology", icon: Droplets, desc: "Specialized kidney care and dialysis services." },
    { name: "Oncology", icon: Syringe, desc: "Comprehensive cancer care and chemotherapy." },
  ];

  const facilities = [
    "Well-equipped Air-conditioned Intensive Care Unit (ICU)",
    "Isolation ICU",
    "Poisoning & Snake bite diagnosis and treatment",
    "Diabetes diagnosis and treatment",
    "Heart disease diagnosis and treatment",
    "Lung disease diagnosis and treatment",
    "Cancer diagnosis and treatment",
    "Brain disease diagnosis and treatment",
    "Skin disease & Laser",
    "Well-equipped Dialysis Department",
    "Kidney disease & treatment",
    "Sonography & Color Doppler",
    "Endoscopy Department",
    "Bronchoscopy",
    "Laser therapy (for varicose veins)",
    "24 hours Ambulance service available",
    "Orthopedic diagnosis & treatment",
    "Accident & Trauma care",
    "Joint Replacement",
    "Joint & Spine Surgery",
    "Arthroscopy",
    "Maxillofacial & Dental Surgery",
    "Face, Mouth & Jaw diagnosis and treatment",
    "Neuro Surgery",
    "Cancer Surgery & Chemotherapy",
    "Plastic Surgery",
    "General Laparoscopic Surgery",
    "2D Echo Cardiography",
    "Digital X-Ray",
    "Physiotherapy & Treatment",
    "24 hours Pathology Lab & Pharmacy",
    "24 hours Expert Doctor available",
    "A.C. Room facility",
  ];

  const facilityCategories = [
    { id: "all", label: "All Facilities", color: "border-teal-700 bg-teal-50 text-teal-900 hover:bg-teal-100/50" },
    { id: "critical", label: "Critical & Emergency", keywords: ["icu", "poisoning", "snake", "ambulance", "trauma", "accident", "pathology", "expert doctor"], color: "border-red-500 bg-red-50 text-red-900 hover:bg-red-100" },
    { id: "surgical", label: "Specialty Surgery", keywords: ["surgery", "replacement", "arthroscopy", "maxillofacial", "laparoscopic", "plastic"], color: "border-purple-500 bg-purple-50 text-purple-900 hover:bg-purple-100" },
    { id: "diagnostics", label: "Diagnostics & Labs", keywords: ["sonography", "color", "doppler", "endoscopy", "bronchoscopy", "laser", "echo", "x-ray", "physiotherapy", "dialysis"], color: "border-teal-500 bg-emerald-50 text-teal-900 hover:bg-emerald-100" },
    { id: "inpatient", label: "Expert Care & Comfort", keywords: ["a.c.", "diabetes", "heart disease", "lung disease", "cancer", "kidney disease", "skin disease", "pharmacy", "isolation"], color: "border-amber-600 bg-amber-50 text-amber-900 hover:bg-amber-100" },
  ];

  const filteredFacilities = facilities.filter(item => {
    const matchesSearch = item.toLowerCase().includes(searchFacility.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedCategory === "all") return true;

    const cat = facilityCategories.find(c => c.id === selectedCategory);
    if (!cat || !cat.keywords) return false;

    return cat.keywords.some(kw => item.toLowerCase().includes(kw));
  });

  const testimonials = [
    {
      quote: "The care I received at Gajanan Hospital & Critical Care Centre was exceptional. The doctors are highly professional and the staff is very caring. I felt in safe hands throughout my treatment.",
      name: "Rajesh Kumar",
      role: "Patient",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      quote: "I am extremely grateful for the quick response and excellent treatment my father received in the ICU. The facilities are top-notch and the attention to detail is remarkable.",
      name: "Sneha Patil",
      role: "Family Member",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
      quote: "The best hospital in Chhatrapati Sambhajinagar. Clean facilities, expert doctors, and a very smooth appointment process via WhatsApp. Highly recommended for any critical care.",
      name: "Amit Deshmukh",
      role: "Patient",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="flex flex-col bg-gray-50/30">
      
      {/* Sleek, Radiant, and Light Hospital Hero Section */}
      <section className="relative min-h-[75vh] flex items-center bg-gradient-to-tr from-teal-50/70 via-sky-50/50 to-emerald-50/30 text-gray-950 overflow-hidden border-b border-gray-150/40">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
            alt="Hospital Glow"
            className="w-full h-full object-cover opacity-8 select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl py-14 lg:py-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            {/* Minimalist Accreditations */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-6">
              <Link to="/nabh" className="inline-flex items-center space-x-1.5 bg-white/80 backdrop-blur-md rounded-full px-3 py-1.5 border border-teal-100 shadow-2xs hover:bg-teal-50/50 transition-all">
                <LogoImage 
                  src="/images/nabh.png" 
                  alt="NABH" 
                  className="h-5 w-auto bg-white p-0.5 rounded" 
                  fallbackText="NABH"
                />
                <span className="text-[10px] font-extrabold tracking-wide uppercase text-teal-800">NABH Accredited</span>
              </Link>
              <Link to="/ab-pmjay" className="inline-flex items-center space-x-1.5 bg-white/80 backdrop-blur-md rounded-full px-3 py-1.5 border border-teal-100 shadow-2xs hover:bg-teal-50/50 transition-all">
                <LogoImage 
                  src="/images/abpmjay.png" 
                  alt="ABPMJAY" 
                  className="h-5 w-auto rounded p-0.5" 
                  fallbackText="PMJAY"
                />
                <span className="text-[10px] font-extrabold tracking-wide uppercase text-teal-800">AB-PMJAY Approved</span>
              </Link>
              <Link to="/mjpjay" className="inline-flex items-center space-x-1.5 bg-white/80 backdrop-blur-md rounded-full px-3 py-1.5 border border-teal-100 shadow-2xs hover:bg-teal-50/50 transition-all">
                <LogoImage 
                  src="/images/mjpjay.svg" 
                  alt="MJPJAY" 
                  className="h-5 w-auto bg-white p-0.5 rounded" 
                  fallbackText="MJPJAY"
                />
                <span className="text-[10px] font-extrabold tracking-wide uppercase text-teal-800">MJPJAY Center</span>
              </Link>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              Advanced Clinical Care.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Compassionate Healing.
              </span>
            </h1>

            <p className="text-base text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto font-medium">
              <HospitalName className="text-teal-900 font-bold" /> serves your family with international diagnostic equipment, state-of-the-art emergency units, and a patient-first ethos.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <Link
                to="/book-appointment"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center group"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Book Appointment
                <ArrowRight className="ml-1.5 h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <a
                href="tel:8329573283"
                className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all border border-gray-200 flex items-center justify-center shadow-2xs"
              >
                <Phone className="mr-2 h-4 w-4 text-emerald-600" />
                Helpdesk: 8329573283
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slim, Compact Stats Component */}
      <section className="relative z-20 -mt-10 mb-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TiltCard
                  maxTilt={3}
                  scale={1}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150/80 hover:border-teal-200 transition-all flex items-center gap-4"
                  glowColor="rgba(13, 148, 136, 0.04)"
                >
                  <div className="bg-teal-50 p-3 rounded-xl text-teal-700">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 leading-none mb-0.5">{stat.value}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 bg-white border-b border-gray-150/40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 bg-teal-50 text-teal-800 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 border border-teal-100">
              Departmental Focus
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Clinical Specializations
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed mt-1">
              Engineered for precision diagnosing and rapid critical responses across key specialties.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyDepartments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                className="group"
              >
                <TiltCard
                  maxTilt={3}
                  scale={1.01}
                  glowColor="rgba(13, 148, 136, 0.03)"
                  className="bg-white p-6 rounded-2xl shadow-2xs border border-gray-150 hover:border-teal-300 transition-all h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="bg-teal-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-all duration-300">
                      <dept.icon className="h-6 w-6 text-teal-700 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-800 mb-2 group-hover:text-teal-800 transition-colors duration-300">
                      {dept.name}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-semibold">
                      {dept.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/departments"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-teal-600 text-teal-850 hover:bg-teal-50 transition-all text-xs font-black uppercase tracking-wider rounded-lg"
            >
              Explore All Departments &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Dedicated Shortlink Gateway to separate Medical Representative Portal */}
      <section className="py-12 bg-gradient-to-r from-teal-50 via-sky-50 to-blue-50 border-b border-gray-150/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[9px] font-black uppercase tracking-wider border border-teal-200">
                Industry Shortlink
              </span>
              <h3 className="text-xl md:text-2xl font-black text-blue-950 tracking-tight leading-tight">
                Pharmaceutical & Medical Representatives Portal
              </h3>
              <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                Working as a pharmaceutical or equipment representative? To prioritize patient diagnosis timings, we restrict scientific molecule presentations to our dedicated daily online roster. Lock your visitor ticket slots directly at our standalone MR gateway.
              </p>
            </div>
            
            <div className="shrink-0">
              <Link
                to="/medical-rep"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm shadow-teal-600/10 cursor-pointer"
              >
                <Briefcase className="h-4 w-4 shrink-0" />
                <span>Go to MR Portal</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Explorer Section */}
      <section className="py-16 bg-white border-b border-gray-150/40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white rounded-2xl p-4 md:p-8">
            
            {/* Header Content */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-block px-3 py-1 bg-sky-50 text-sky-800 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 border border-sky-100">
                Interactive Directory
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Clinical Facilities & Equipment
              </h2>
              <p className="text-xs md:text-sm text-gray-500 font-medium mt-1 leading-relaxed">
                Filter or search through our high-capacity critical care blocks, specialized wards, and operational departments dynamically.
              </p>
            </div>

            {/* Interactive Filters Panel */}
            <div className="space-y-5 mb-10">
              {/* Search input with live state */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type a facility (e.g., ICU, Sonography, Dialysis)..."
                  value={searchFacility}
                  onChange={(e) => setSearchFacility(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-transparent transition-all"
                  aria-label="Search facilities"
                />
                {searchFacility && (
                  <button 
                    onClick={() => setSearchFacility("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Responsive Category Selector Pills */}
              <div className="flex flex-wrap justify-center gap-2">
                {facilityCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 border rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-teal-600 text-white border-transparent shadow-2xs"
                        : "border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Filter Indicator */}
            <div className="flex justify-between items-center pb-2.5 mb-6 border-b border-gray-150">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Search Results
              </p>
              <p className="text-[10px] font-bold text-teal-850 bg-teal-50 px-2 py-0.5 rounded-md">
                {filteredFacilities.length} available
              </p>
            </div>

            {/* Render dynamically filtered items */}
            <AnimatePresence mode="popLayout">
              {filteredFacilities.length > 0 ? (
                <motion.div 
                  layout
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {filteredFacilities.map((facility) => {
                    let badgeColor = "bg-orange-50 text-orange-600 border-orange-200";
                    if (facility.toLowerCase().includes("icu") || facility.toLowerCase().includes("poisoning") || facility.toLowerCase().includes("accident") || facility.toLowerCase().includes("expert doctor")) {
                      badgeColor = "bg-red-50 text-red-600 border-red-200";
                    } else if (facility.toLowerCase().includes("surgery") || facility.toLowerCase().includes("replacement") || facility.toLowerCase().includes("laparoscopic")) {
                      badgeColor = "bg-purple-50 text-purple-600 border-purple-200";
                    } else if (facility.toLowerCase().includes("sonography") || facility.toLowerCase().includes("doppler") || facility.toLowerCase().includes("endoscopy") || facility.toLowerCase().includes("x-ray")) {
                      badgeColor = "bg-teal-50 text-teal-600 border-teal-200";
                    } else if (facility.toLowerCase().includes("room") || facility.toLowerCase().includes("pharmacy") || facility.toLowerCase().includes("diabetes")) {
                      badgeColor = "bg-amber-50 text-amber-600 border-amber-200";
                    }

                    return (
                      <motion.div
                        key={facility}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="bg-white p-4 rounded-xl border border-gray-150 shadow-2xs flex items-start gap-3.5 group"
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 border ${badgeColor} transition-all duration-300 group-hover:scale-105`}>
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-gray-800 font-extrabold leading-tight text-xs md:text-sm">
                            {facility}
                          </p>
                          <p className="text-[10px] font-medium text-gray-400 capitalize">
                            Gajanan Hospital Critical Care System
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10 text-gray-400"
                >
                  <Filter className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold">
                    No matching facilities found for <span className="font-bold text-gray-700">"{searchFacility}"</span>.
                  </p>
                  <button
                    onClick={() => {
                      setSearchFacility("");
                      setSelectedCategory("all");
                    }}
                    className="mt-3 px-4 py-1.5 text-[10px] font-black uppercase text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-full border border-teal-150 transition-all cursor-pointer"
                  >
                    Reset Filter Search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 text-center pt-6 border-t border-gray-100">
              <Link 
                to="/insurances" 
                className="inline-flex items-center space-x-1.5 text-teal-850 font-black hover:text-teal-950 transition-colors bg-teal-50 px-4 py-2 rounded-full text-xs uppercase tracking-wide border border-teal-150"
              >
                <ShieldCheck className="h-4.5 w-4.5" />
                <span>Empanelled Government Schemes & TPAs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 overflow-hidden relative border-b border-gray-150/40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-teal-50 text-teal-800 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 border border-teal-100 animate-pulse">
              Patient Stories
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Voices of Recovery</h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-1 leading-relaxed">
              Nothing speaks louder than the real experiences of those we have had the absolute privilege of treating.
            </p>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="bg-white p-6 md:p-10 rounded-2xl relative border border-gray-150 shadow-2xs"
                >
                  <div className="absolute -top-4 left-6 bg-teal-600 text-white p-2.5 rounded-xl shadow-xs">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="shrink-0">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100 shadow-3xs"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left space-y-3">
                      <p className="text-gray-600 italic leading-relaxed text-xs md:text-sm font-medium">
                        "{testimonials[currentTestimonial].quote}"
                      </p>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0f172a]">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-[10px] text-teal-800 font-black uppercase tracking-wider mt-0.5">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center mt-6 space-x-3">
              <button 
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-1.5 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-teal-900 hover:border-teal-500 transition-all cursor-pointer shadow-3xs"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentTestimonial === index ? "w-5 bg-teal-600" : "w-1.5 bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-1.5 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-teal-900 hover:border-teal-500 transition-all cursor-pointer shadow-3xs"
              >
                <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
