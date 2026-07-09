import { Link, useLocation } from "react-router-dom";
import { Phone, MapPin, Clock, Menu, X, MessageCircle, Facebook, Home, Info, Stethoscope, Users, Briefcase, ShieldCheck, Mail } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Logo = () => (
  <div className="flex items-center space-x-3 group">
    <div className="relative p-1.5 bg-white rounded-xl border border-slate-100 shadow-xs flex items-center justify-center shrink-0 group-hover:border-[#128C7E]/30 transition-all duration-300">
      <svg viewBox="0 0 200 270" className="h-11 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Top Left G */}
        <rect x="0" y="0" width="95" height="95" fill="white" />
        <text x="47.5" y="82" fontFamily="Georgia, serif" fontSize="105" fontWeight="bold" fill="#1a1a1a" textAnchor="middle">G</text>

        {/* Top Right Orange */}
        <rect x="105" y="0" width="95" height="95" fill="#F28123" />

        {/* Bottom Left Orange + ECG */}
        <rect x="0" y="105" width="95" height="95" fill="#F28123" />
        <path d="M 0 165 L 15 165 L 25 155 L 35 170 L 45 115 L 52 190 L 65 145 L 75 165 L 95 165" fill="none" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />

        {/* Bottom Right H */}
        <rect x="105" y="105" width="95" height="95" fill="white" />
        <text x="152.5" y="187" fontFamily="Georgia, serif" fontSize="105" fontWeight="bold" fill="#1a1a1a" textAnchor="middle">H</text>

        {/* Tagline */}
        <text x="100" y="225" fontFamily="Arial, sans-serif" fontSize="21" fill="#333333" textAnchor="middle" letterSpacing="0.5">We Serve... We Care</text>

        {/* Red Banner */}
        <rect x="0" y="235" width="200" height="35" fill="#9A2124" rx="2" />
        <text x="100" y="260" fontFamily="Arial, sans-serif" fontSize="22" fill="white" textAnchor="middle" letterSpacing="0.5">Gajanan Hospital</text>
      </svg>
      {/* Decorative pulse element on the logo container */}
      <span className="absolute -top-1 -right-1 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    </div>
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
        <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">
          GAJANAN
        </span>
        <span className="text-xl md:text-2xl font-extrabold text-[#128C7E] tracking-tight leading-none">
          HOSPITAL
        </span>
      </div>
      <span className="text-[9px] md:text-[10px] font-bold text-slate-500 tracking-[0.25em] uppercase leading-none mt-1.5">
        &amp; Critical Care Centre
      </span>
    </div>
  </div>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Departments", path: "/departments", icon: Stethoscope },
    { name: "Doctors", path: "/doctors", icon: Users },
    { name: "MR Portal", path: "/medical-rep", icon: Briefcase },
    { name: "Insurances", path: "/insurances", icon: ShieldCheck },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03),0_4px_6px_-2px_rgba(0,0,0,0.01)]">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-2 text-[11px] md:text-xs font-semibold border-b border-white/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center max-w-7xl gap-2 md:gap-0">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <div className="flex items-center space-x-2 font-medium bg-white/5 px-3 py-1 rounded-full border border-white/10 hover:bg-white/10 transition-all">
              <Phone className="h-3 w-3 text-emerald-400" />
              <span className="tracking-wide">Emergency Support: 8329573283</span>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-slate-300 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>24/7 Emergency &amp; Ambulance Services Available</span>
            </div>
          </div>
          <div className="flex items-center space-x-5 text-slate-300 font-medium">
            <div className="flex items-center space-x-1.5">
              <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
              <span className="tracking-wide">Garkheda &amp; Bajajnagar</span>
            </div>
            <a 
              href="https://www.facebook.com/Gajananhospitalccu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-full shadow-xs border border-blue-500/30 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-3 w-3" aria-hidden="true" />
              <span className="font-bold text-[10px] uppercase tracking-wider hidden sm:inline">Follow Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center focus:outline-none focus:opacity-90 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-slate-600 hover:text-[#128C7E] font-semibold text-sm tracking-wide relative py-2 transition-all duration-200 group focus:outline-none focus:text-[#128C7E]",
                    isActive && "text-[#128C7E] font-bold"
                  )}
                >
                  <span>{link.name}</span>
                  {/* Sliding Underline Effect */}
                  <span className={cn(
                    "absolute bottom-0 left-0 right-0 h-[3px] bg-[#128C7E] rounded-full transition-transform duration-300 origin-center",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </Link>
              );
            })}
            <Link
              to="/book-appointment"
              className="bg-gradient-to-r from-[#128C7E] to-[#0b6c61] hover:from-[#0b6c61] hover:to-[#075E54] text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center shadow-md shadow-[#128C7E]/10 hover:shadow-lg hover:shadow-[#128C7E]/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2"
            >
              <MessageCircle className="mr-2 h-4 w-4 animate-pulse" aria-hidden="true" />
              <span className="text-sm">Book Appointment</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-700 hover:text-[#128C7E] hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#128C7E] rounded-xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden bg-slate-50/98 backdrop-blur-lg border-t border-slate-100 shadow-inner">
          <div className="container mx-auto px-4 py-5 flex flex-col space-y-2.5">
            {navLinks.map((link) => {
              const LinkIcon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 text-slate-700 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 hover:bg-slate-100 hover:text-[#128C7E]",
                    isActive && "text-[#128C7E] bg-teal-50/80 shadow-xs border border-teal-100/30"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <LinkIcon className={cn("h-4 w-4 text-slate-400 shrink-0", isActive && "text-[#128C7E]")} />
                  <span className="text-sm tracking-wide">{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-150">
              <Link
                to="/book-appointment"
                className="bg-gradient-to-r from-[#128C7E] to-[#075E54] text-white text-center py-3.5 px-4 rounded-xl font-bold flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

