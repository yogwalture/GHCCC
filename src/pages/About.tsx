import { Target, Eye, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HospitalName } from "../components/ui/HospitalName";

export function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <HospitalName className="text-blue-900" /> is dedicated to providing compassionate, high-quality healthcare to our community.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-500 hover:shadow-2xl transition-shadow">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              We intend to provide appropriate, optimum and quality health care services to the patients from all sections and strata of our society with a sense of social commitment as an important plank of our medical profession.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600 hover:shadow-2xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Eye className="h-8 w-8 text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vision & Objectives</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              We will provide appropriate, optimum and quality health care services by adopting latest knowledge, state of the art technology and highest skills, backed by effective methods of management.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              We will try to provide maximum medical services at affordable cost. We will have very conducive and totally patient centered Work Culture.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              We will strive to evolve and sustain such culture by educating the servicing staff, continually. We all work together to provide best treatment and other services at all levels.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <div className="flex items-center space-x-4 mb-8">
            <Users className="h-10 w-10 text-blue-900" />
            <h2 className="text-3xl font-bold text-gray-900">Our Commitment</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-orange-500 mb-3">Patient-Centered</h3>
              <p className="text-gray-600">Every decision we make is focused on the well-being and comfort of our patients.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-500 mb-3">Affordable Care</h3>
              <p className="text-gray-600">Striving to provide maximum medical services at costs that are accessible to all.</p>
            </div>
            <div className="group cursor-pointer">
              <h3 className="text-xl font-bold text-orange-500 mb-3 group-hover:text-blue-900 transition-colors">Govt. Schemes</h3>
              <p className="text-gray-600 mb-4">Empanelled with MJPJAY and ABPMJAY (Ayushman Bharat) to provide cashless treatment.</p>
              <div className="flex flex-col space-y-2">
                <Link to="/mjpjay" className="text-sm font-bold text-blue-900 hover:underline flex items-center">
                  Learn about MJPJAY <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
                <Link to="/ab-pmjay" className="text-sm font-bold text-blue-900 hover:underline flex items-center">
                  Learn about AB-PMJAY <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-500 mb-3">Continuous Learning</h3>
              <p className="text-gray-600">Educating our staff continually to sustain a culture of excellence and innovation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
