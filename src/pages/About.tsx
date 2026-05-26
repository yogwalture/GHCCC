import { Target, Eye, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HospitalName } from "../components/ui/HospitalName";
import { TiltCard } from "../components/ui/TiltCard";

export function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 relative overflow-hidden">
      {/* Decorative calm background glow elements */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-orange-100/20 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-white border border-gray-150 text-blue-900 text-xs font-bold rounded-full uppercase tracking-wider mb-4 shadow-sm">
            Our Journey
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">About Us</h1>
          <p className="text-xl text-gray-650 max-w-2xl mx-auto leading-relaxed font-medium">
            <HospitalName className="text-blue-900 font-bold" /> is dedicated to providing compassionate, high-quality healthcare to our community.
          </p>
        </div>

        {/* Mission & Vision Cards (Interactive 3D Tilt Cards) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <TiltCard
            maxTilt={6}
            scale={1.01}
            glowColor="rgba(249, 115, 22, 0.1)"
            className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-orange-500 h-full flex flex-col hover:border-orange-600 transition-all cursor-default"
          >
            <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-orange-100/50">
              <Target className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg font-medium">
              We intend to provide appropriate, optimum and quality health care services to the patients from all sections and strata of our society with a sense of social commitment as an important plank of our medical profession.
            </p>
          </TiltCard>

          {/* Vision */}
          <TiltCard
            maxTilt={6}
            scale={1.01}
            glowColor="rgba(37, 99, 235, 0.1)"
            className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-blue-600 h-full flex flex-col hover:border-blue-700 transition-all cursor-default"
          >
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-blue-100/50">
              <Eye className="h-8 w-8 text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vision & Objectives</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4 font-medium">
              We will provide appropriate, optimum and quality health care services by adopting latest knowledge, state of the art technology and highest skills, backed by effective methods of management.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-4 font-medium">
              We will try to provide maximum medical services at affordable cost, creating a fully patient-centered work culture.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg font-medium">
              We all work together to provide best treatment and other services at all levels, establishing quality benchmarks continuously.
            </p>
          </TiltCard>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-100/70">
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-blue-50 p-3 rounded-2xl">
              <Users className="h-8 w-8 text-blue-900" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Our Commitments</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-orange-500">Patient-Centered</h3>
              <p className="text-gray-600 font-medium text-sm leading-relaxed">Every decision we make is focused on the well-being and comforting care of our patients.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-orange-500">Affordable Care</h3>
              <p className="text-gray-600 font-medium text-sm leading-relaxed">Striving to provide maximum secondary and critical services at costs that remain accessible to all families.</p>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <h3 className="text-lg font-extrabold text-orange-500 group-hover:text-blue-900 transition-colors">Govt. Schemes</h3>
              <p className="text-gray-600 font-medium text-sm leading-relaxed mb-4">Empanelled with MJPJAY and ABPMJAY (Ayushman Bharat) to provide cashless standard treatments.</p>
              <div className="flex flex-col space-y-2 border-t border-gray-100 pt-3">
                <Link to="/mjpjay" className="text-xs font-bold text-blue-900 hover:text-blue-700 hover:underline flex items-center">
                  Learn about MJPJAY <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
                <Link to="/ab-pmjay" className="text-xs font-bold text-blue-900 hover:text-blue-700 hover:underline flex items-center">
                  Learn about AB-PMJAY <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-orange-500">Staff Training</h3>
              <p className="text-gray-600 font-medium text-sm leading-relaxed font-medium">Educating our clinical and support staff continually to sustain a true culture of care excellence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
