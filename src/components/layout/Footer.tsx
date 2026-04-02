import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Facebook } from "lucide-react";
import { LogoImage } from "../ui/LogoImage";

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
      <span className="text-2xl font-bold text-white leading-none tracking-wide font-sans">
        Gajanan Hospital
      </span>
      <span className="text-sm font-bold text-orange-400 leading-tight font-sans">
        & Critical Care Centre
      </span>
    </div>
  </div>
);

export function Footer() {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Providing appropriate, optimum and quality health care services to
              the patients from all sections and strata of our society.
            </p>
            <div className="flex items-center space-x-4 text-gray-300 mb-6">
              <Clock className="h-5 w-5 text-orange-500" />
              <span>24/7 Emergency Services</span>
            </div>
            <a 
              href="https://www.facebook.com/Gajananhospitalccu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center space-x-2 text-white bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Facebook className="h-5 w-5" />
              <span className="font-medium">Follow Us on Facebook</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/departments" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link to="/insurances" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Empanelled Insurances
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Main Branch */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2 inline-block">
              Main Branch
            </h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-1" />
                <span>
                  Sarang Society, Plot No. 8, Gajanan Mandir Chowk, Dominos Pizza Shejari, Axis Bank Samor, Garkheda, Chhatrapati Sambhaji Nagar - 431009
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                <span>8329573283, 0240-2451055</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 shrink-0" />
                <a href="mailto:gajananhospitalicu@gmail.com" className="hover:text-orange-500">
                  gajananhospitalicu@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Branch 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2 inline-block">
              Branch 2
            </h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-1" />
                <span>
                  Unit-2: Bajaj Nagar, Plot No. P 146, Kamgar Kalyan Bhavan, Mohata Devi Mandir Chowk Shejari, Waluj MIDC, Chhatrapati Sambhaji Nagar
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                <span>0240-2553555, 9168100600</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 shrink-0" />
                <a href="mailto:ghcccbajajnagar@gmail.com" className="hover:text-orange-500">
                  ghcccbajajnagar@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Gajanan Hospital & Critical Care Centre. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-gray-400">
            <Link to="/nabh" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <LogoImage 
                src="/images/nabh.png" 
                alt="NABH" 
                className="h-8 w-auto bg-white p-0.5 rounded" 
                fallbackText="NABH"
              />
              <span>NABH Accredited</span>
            </Link>
            <Link to="/mjpjay" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <LogoImage 
                src="/images/mjpjay.svg" 
                alt="MJPJAY" 
                className="h-8 w-auto bg-white p-0.5 rounded-full" 
                fallbackText="MJPJAY"
              />
              <span>MJPJAY</span>
            </Link>
            <Link to="/ab-pmjay" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <LogoImage 
                src="/images/abpmjay.png" 
                alt="AB-PMJAY" 
                className="h-8 w-auto bg-white p-0.5 rounded-full" 
                fallbackText="PMJAY"
              />
              <span>AB-PMJAY</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
