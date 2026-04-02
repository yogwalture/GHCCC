import { ShieldCheck, CheckCircle2, Info, FileText } from "lucide-react";
import { motion } from "motion/react";
import { LogoImage } from "../components/ui/LogoImage";
import { HospitalName } from "../components/ui/HospitalName";

export function MJPJAY() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-orange-600 p-12 text-center text-white">
            <LogoImage 
              src="/images/mjpjay.svg" 
              alt="MJPJAY Logo" 
              className="h-40 mx-auto mb-8 bg-white p-2 rounded-full shadow-lg"
              fallbackText="MJPJAY"
            />
            <h1 className="text-4xl font-black mb-4">MJPJAY Scheme</h1>
            <p className="text-orange-100 text-lg">Mahatma Jyotirao Phule Jan Arogya Yojana</p>
          </div>

          <div className="p-12">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="mr-3 text-orange-600" />
                What is MJPJAY?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY) is a flagship health insurance scheme of the Government of Maharashtra. It provides end-to-end cashless services for identified diseases through a network of empanelled hospitals.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <HospitalName className="text-blue-900" /> is an empanelled hospital for MJPJAY, providing high-quality medical care to eligible beneficiaries.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ShieldCheck className="mr-3 text-orange-600" />
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Cashless treatment for 996 procedures",
                  "Coverage up to ₹1.5 Lakh per family per year",
                  "Covers pre-existing diseases",
                  "Includes pre-hospitalization and post-hospitalization costs",
                  "Available for Yellow, Orange and Antyodaya ration card holders",
                  "Specialized care in Cardiology, Nephrology, Oncology, etc."
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="mr-3 text-orange-600" />
                Required Documents
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-3 font-medium">
                <li>Valid Ration Card (Yellow/Orange/Antyodaya)</li>
                <li>Aadhar Card / Voter ID / Driving License</li>
                <li>Income Certificate (if applicable)</li>
                <li>Medical Reports and Doctor's Prescription</li>
              </ul>
            </section>

            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
              <h3 className="text-xl font-bold text-orange-900 mb-4">How to Avail?</h3>
              <p className="text-orange-800">
                Patients can visit our hospital with their valid ration card and identity proof. Our dedicated Arogyamitra will assist you with the entire process.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
