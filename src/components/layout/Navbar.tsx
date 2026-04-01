import { Link, useLocation } from "react-router-dom";
import { Phone, MapPin, Clock, Menu, X, MessageCircle, Facebook } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Logo = () => (
  <div className="flex items-center space-x-3">
    <svg viewBox="0 0 200 270" className="w-16 h-auto shrink-0" xmlns="http://www.w3.org/2000/svg">
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
    <div className="flex flex-col">
      <span className="text-2xl md:text-3xl font-bold text-blue-900 leading-none tracking-wide font-sans">
        Gajanan Hospital
      </span>
      <span className="text-sm md:text-base font-bold text-gray-800 leading-tight font-sans">
        & Critical Care Centre
      </span>
    </div>
  </div>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Departments", path: "/departments" },
    { name: "Doctors", path: "/doctors" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 text-xs md:text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center max-w-7xl gap-1 md:gap-0">
          <div className="flex flex-col md:flex-row items-center md:space-x-6">
            <div className="flex items-center space-x-2 font-medium">
              <Phone className="h-3 w-3 md:h-4 md:w-4" />
              <span>Emergency & Primary: 8329573283</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>24/7 Emergency Services</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-center opacity-90">
            <div className="flex items-center space-x-1 md:space-x-2">
              <MapPin className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
              <span>Garkheda & Bajajnagar</span>
            </div>
            <a 
              href="https://www.facebook.com/Gajananhospitalccu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-1 bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded transition-colors"
            >
              <Facebook className="h-3 w-3 md:h-4 md:w-4" />
              <span className="font-bold hidden sm:inline">Follow Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-gray-600 hover:text-blue-900 font-medium transition-colors",
                  location.pathname === link.path && "text-blue-900 font-bold"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book-appointment"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-md font-bold transition-colors flex items-center shadow-md shadow-[#25D366]/20"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Book Appointment
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-gray-600 font-medium py-2",
                  location.pathname === link.path && "text-blue-900 font-bold"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book-appointment"
              className="bg-[#25D366] text-white text-center px-6 py-3 rounded-md font-bold flex items-center justify-center shadow-md"
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
