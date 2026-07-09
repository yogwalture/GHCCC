import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Facebook, ArrowRight } from "lucide-react";
import { LogoImage } from "../ui/LogoImage";

const Logo = () => (
  <div className="flex items-center space-x-3 group">
    <div className="relative p-1.5 bg-white rounded-xl border border-slate-800 shadow-xs flex items-center justify-center shrink-0">
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
      <div className="flex items-center gap-1">
        <span className="text-lg font-black text-white tracking-tight leading-none">
          GAJANAN
        </span>
        <span className="text-lg font-extrabold text-[#128C7E] tracking-tight leading-none">
          HOSPITAL
        </span>
      </div>
      <span className="text-[8px] font-bold text-slate-400 tracking-[0.22em] uppercase leading-none mt-1.5">
        &amp; Critical Care Centre
      </span>
    </div>
  </div>
);

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="flex flex-col space-y-5">
            <div>
              <Logo />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Providing appropriate, optimum, and premium quality healthcare services to
              the patients from all sections and strata of our society.
            </p>
            <div className="flex items-center space-x-2.5 text-slate-300 font-semibold text-xs bg-slate-800/40 w-fit px-3.5 py-2 rounded-xl border border-slate-800">
              <Clock className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span>24/7 Emergency &amp; Trauma Support</span>
            </div>
            <a 
              href="https://www.facebook.com/Gajananhospitalccu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center space-x-2 text-white bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm shadow-blue-600/10 hover:shadow-lg hover:shadow-blue-600/20 w-fit"
            >
              <Facebook className="h-4 w-4" />
              <span>Connect on Facebook</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 relative pb-2 border-b border-[#128C7E]/40 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-3.5 text-sm font-semibold">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Our Departments", to: "/departments" },
                { label: "Specialist Doctors", to: "/doctors" },
                { label: "MR Portal Roster", to: "/medical-rep" },
                { label: "Empanelled Insurances", to: "/insurances" },
                { label: "Contact & Support", to: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.to} 
                    className="text-slate-400 hover:text-[#128C7E] flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <ArrowRight className="h-3 w-3 text-slate-600 group-hover:text-[#128C7E] group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Main Branch */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 relative pb-2 border-b border-[#128C7E]/40 inline-block">
              Garkheda (Branch 1)
            </h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                <span className="leading-relaxed">
                  Sarang Society, Plot No. 8, Gajanan Mandir Chowk, Dominos Pizza Shejari, Axis Bank Samor, Garkheda, Chhatrapati Sambhaji Nagar - 431009
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">8329573283, 0240-2451055</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="mailto:gajananhospitalicu@gmail.com" className="hover:text-[#128C7E] transition-colors text-slate-300">
                  gajananhospitalicu@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Branch 2 */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 relative pb-2 border-b border-[#128C7E]/40 inline-block">
              Bajaj Nagar (Branch 2)
            </h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-teal-400 shrink-0 mt-1" />
                <span className="leading-relaxed">
                  Unit-2: Bajaj Nagar, Plot No. P 146, Kamgar Kalyan Bhavan, Mohata Devi Mandir Chowk Shejari, Waluj MIDC, Chhatrapati Sambhaji Nagar
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-teal-400 shrink-0" />
                <span className="text-slate-300">0240-2553555, 9168100600</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-teal-400 shrink-0" />
                <a href="mailto:ghcccbajajnagar@gmail.com" className="hover:text-[#128C7E] transition-colors text-slate-300">
                  ghcccbajajnagar@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator / Bottom Metadata */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-semibold text-center lg:text-left">
            &copy; {new Date().getFullYear()} Gajanan Hospital &amp; Critical Care Centre. All rights reserved. 
            <span className="mx-2 text-slate-700">|</span> 
            <Link to="/admin" className="text-slate-400 hover:text-white underline underline-offset-4 decoration-slate-700 hover:decoration-[#128C7E] transition-colors">
              Admin Portal
            </Link>
          </p>

          <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-xs text-slate-400 font-semibold">
            <Link to="/nabh" className="flex items-center space-x-2.5 bg-slate-900/60 hover:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 transition-all">
              <LogoImage 
                src="/images/nabh.png" 
                alt="NABH" 
                className="h-7 w-auto bg-white p-0.5 rounded-sm" 
                fallbackText="NABH"
              />
              <span className="text-[11px] tracking-wide text-slate-300">NABH Accredited</span>
            </Link>
            <Link to="/mjpjay" className="flex items-center space-x-2.5 bg-slate-900/60 hover:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 transition-all">
              <LogoImage 
                src="/images/mjpjay.svg" 
                alt="MJPJAY" 
                className="h-7 w-auto bg-white p-0.5 rounded-full" 
                fallbackText="MJPJAY"
              />
              <span className="text-[11px] tracking-wide text-slate-300">MJPJAY Empanelled</span>
            </Link>
            <Link to="/ab-pmjay" className="flex items-center space-x-2.5 bg-slate-900/60 hover:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 transition-all">
              <LogoImage 
                src="/images/abpmjay.png" 
                alt="AB-PMJAY" 
                className="h-7 w-auto bg-white p-0.5 rounded-full" 
                fallbackText="PMJAY"
              />
              <span className="text-[11px] tracking-wide text-slate-300">AB-PMJAY Approved</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

