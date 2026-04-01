import { ShieldCheck, CheckCircle2, Info, FileText, Heart } from "lucide-react";
import { motion } from "motion/react";
import { LogoImage } from "../components/ui/LogoImage";
import { HospitalName } from "../components/ui/HospitalName";

export function ABPMJAY() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-blue-600 p-12 text-center text-white">
            <LogoImage 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Ayushman_Bharat_logo.svg/512px-Ayushman_Bharat_logo.svg.png" 
              alt="AB-PMJAY Logo" 
              className="h-40 mx-auto mb-8 bg-white p-2 rounded-full shadow-lg"
              fallbackText="PMJAY"
            />
            <h1 className="text-4xl font-black mb-4">AB-PMJAY Scheme</h1>
            <p className="text-blue-100 text-lg">Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana</p>
          </div>

          <div className="p-12">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="mr-3 text-blue-600" />
                What is AB-PMJAY?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ayushman Bharat PM-JAY is the world's largest health insurance/assurance scheme fully financed by the government. It provides a cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization across public and private empanelled hospitals in India.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <HospitalName className="text-blue-900" /> is an empanelled hospital for AB-PMJAY, providing high-quality medical care to eligible beneficiaries.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ShieldCheck className="mr-3 text-blue-600" />
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Coverage up to ₹5 Lakh per family per year",
                  "Cashless and paperless access to services",
                  "Covers pre-existing diseases from day one",
                  "Includes 3 days pre-hospitalization and 15 days post-hospitalization",
                  "No restriction on family size, age or gender",
                  "Available across all empanelled hospitals in India"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="mr-3 text-blue-600" />
                Required Documents
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-3 font-medium">
                <li>Ayushman Bharat Card (Golden Card)</li>
                <li>Aadhar Card / Voter ID / Ration Card</li>
                <li>Registered Mobile Number</li>
                <li>Medical Reports and Doctor's Prescription</li>
              </ul>
            </section>

            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-500" />
                How to Avail?
              </h3>
              <p className="text-blue-800">
                Beneficiaries can visit our hospital with their Ayushman Bharat card. Our PMJAY coordinator will verify your eligibility and assist you with the entire process.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
