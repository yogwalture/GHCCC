import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Activity, Heart, Stethoscope, ShieldCheck, Clock, Phone, MessageCircle, 
  Users, Award, Building2, Syringe, Brain, Bone, Droplets, Scissors, ChevronLeft, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LogoImage } from "../components/ui/LogoImage";

import { HospitalName } from "../components/ui/HospitalName";

export function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
            alt="Hospital Background"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-blue-900/75"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl py-24 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link to="/nabh" className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all">
                <LogoImage 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/NABH_logo.png/220px-NABH_logo.png" 
                  alt="NABH" 
                  className="h-6 w-auto brightness-110 bg-white p-0.5 rounded" 
                  fallbackText="NABH"
                />
                <span className="text-xs font-bold tracking-tight uppercase">NABH Accredited</span>
              </Link>
              <Link to="/ab-pmjay" className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all">
                <LogoImage 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Ayushman_Bharat_logo.svg/512px-Ayushman_Bharat_logo.svg.png" 
                  alt="ABPMJAY" 
                  className="h-6 w-auto brightness-110" 
                  fallbackText="PMJAY"
                />
                <span className="text-xs font-bold tracking-tight uppercase">AB-PMJAY</span>
              </Link>
              <Link to="/mjpjay" className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all">
                <LogoImage 
                  src="https://hospitals.pmjay.gov.in/Search/images/mjpjay_logo.png" 
                  alt="MJPJAY" 
                  className="h-6 w-auto brightness-110 bg-white p-0.5 rounded" 
                  fallbackText="MJPJAY"
                />
                <span className="text-xs font-bold tracking-tight uppercase">MJPJAY</span>
              </Link>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1]">
              Advanced Care. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Compassionate Healing.
              </span>
            </h1>
            <p className="text-xl text-blue-100/90 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              <HospitalName className="text-white" /> provides world-class medical services with state-of-the-art technology and a patient-first approach.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
              <Link
                to="/book-appointment"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl shadow-[#25D366]/20 flex items-center justify-center group"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <a
                href="tel:8329573283"
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all border border-white/20 flex items-center justify-center"
              >
                <Phone className="mr-3 h-5 w-5 text-orange-400" />
                Emergency: 8329573283
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-orange-500/10 to-transparent blur-3xl pointer-events-none"></div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border-b-4 border-blue-900 flex flex-col items-center text-center"
              >
                <div className="bg-blue-50 p-4 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-blue-900" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="grid grid-cols-1 gap-6">
                {/* NABH Card */}
                <Link to="/nabh" className="group">
                  <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-transparent hover:border-blue-900 transition-all flex items-center space-x-6">
                    <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-900 transition-colors shrink-0">
                      <LogoImage 
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/NABH_logo.png/220px-NABH_logo.png" 
                        alt="NABH" 
                        className="h-16 w-auto group-hover:scale-110 transition-transform bg-white p-1 rounded-lg" 
                        fallbackText="NABH"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">NABH Accredited</h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">National Accreditation Board for Hospitals & Healthcare Providers. Benchmark for quality care.</p>
                    </div>
                  </div>
                </Link>

                {/* MJPJAY Card */}
                <Link to="/mjpjay" className="group">
                  <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-transparent hover:border-orange-500 transition-all flex items-center space-x-6">
                    <div className="bg-orange-50 p-4 rounded-2xl group-hover:bg-orange-500 transition-colors shrink-0">
                      <LogoImage 
                        src="https://hospitals.pmjay.gov.in/Search/images/mjpjay_logo.png" 
                        alt="MJPJAY" 
                        className="h-16 w-auto group-hover:scale-110 transition-transform bg-white p-1 rounded-lg" 
                        fallbackText="MJPJAY"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">MJPJAY Scheme</h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">Mahatma Jyotirao Phule Jan Arogya Yojana. Cashless treatment for eligible beneficiaries.</p>
                    </div>
                  </div>
                </Link>

                {/* AB-PMJAY Card */}
                <Link to="/ab-pmjay" className="group">
                  <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-transparent hover:border-blue-600 transition-all flex items-center space-x-6">
                    <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors shrink-0">
                      <LogoImage 
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Ayushman_Bharat_logo.svg/512px-Ayushman_Bharat_logo.svg.png" 
                        alt="AB-PMJAY" 
                        className="h-16 w-auto group-hover:scale-110 transition-transform" 
                        fallbackText="PMJAY"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">AB-PMJAY (Ayushman Bharat)</h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">World's largest health assurance scheme. Coverage up to ₹5 Lakh per family per year.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="inline-block px-4 py-2 bg-blue-50 text-blue-900 font-bold rounded-lg text-xs uppercase tracking-[0.2em] mb-6">
                Our Commitment
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                Setting New Standards in <span className="text-blue-900">Patient Care</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
                <HospitalName className="text-blue-900" /> is more than just a medical facility. We are a sanctuary of healing where advanced technology meets human compassion.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {[
                  { title: "NABH Accredited", desc: "Highest quality standards", icon: ShieldCheck },
                  { title: "MJPJAY Empanelled", desc: "Cashless Govt. Scheme", icon: Award },
                  { title: "AB-PMJAY (Ayushman)", desc: "₹5 Lakh Health Cover", icon: Heart },
                  { title: "Cashless Facility", desc: "Major insurance support", icon: Activity },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                      <item.icon className="h-5 w-5 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 group"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block px-4 py-2 bg-orange-50 text-orange-600 font-bold rounded-lg text-xs uppercase tracking-[0.2em] mb-6">
              Specialized Care
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our Key Departments</h2>
            <p className="text-lg text-gray-600 font-medium">
              World-class expertise across multiple specialties, all under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyDepartments.map((dept, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-blue-200 transition-all group"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-900 transition-colors">
                  <dept.icon className="h-8 w-8 text-blue-900 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {dept.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/departments"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-blue-900 text-blue-900 font-bold rounded-xl hover:bg-blue-900 hover:text-white transition-all"
            >
              Explore All Departments
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-blue-900">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Facilities</h2>
              <p className="text-gray-600">State-of-the-art infrastructure and round-the-clock services.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-1.5 rounded-full shrink-0 mt-0.5">
                    <ShieldCheck className="h-4 w-4 text-orange-600" />
                  </div>
                  <span className="text-gray-700 font-medium leading-snug">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-900 font-bold rounded-lg text-xs uppercase tracking-[0.2em] mb-6">
              Patient Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Voices of Recovery</h2>
            <p className="text-lg text-gray-600 font-medium">
              Nothing speaks louder than the experiences of those we've had the privilege to treat.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-gray-50 p-10 md:p-16 rounded-[3rem] relative border border-gray-100 shadow-sm"
                >
                  <div className="absolute -top-6 left-12 bg-blue-900 text-white p-4 rounded-2xl shadow-lg">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                    <div className="shrink-0">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-gray-600 italic mb-8 leading-relaxed text-xl md:text-2xl">
                        "{testimonials[currentTestimonial].quote}"
                      </p>
                      <div>
                        <h4 className="text-xl font-black text-gray-900">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-sm text-blue-900 font-black uppercase tracking-widest mt-1">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center mt-12 space-x-6">
              <button 
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-3 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-blue-900 hover:border-blue-900 transition-all shadow-sm"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentTestimonial === index ? "w-8 bg-blue-900" : "w-2 bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-3 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-blue-900 hover:border-blue-900 transition-all shadow-sm"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
