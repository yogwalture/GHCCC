import { ShieldCheck, CheckCircle2, Info } from "lucide-react";
import { motion } from "motion/react";
import { LogoImage } from "../components/ui/LogoImage";
import { HospitalName } from "../components/ui/HospitalName";

export function NABH() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-blue-900 p-12 text-center text-white">
            <LogoImage 
              src="/images/nabh.png" 
              alt="NABH Logo" 
              className="h-40 mx-auto mb-8 bg-white p-2 rounded-2xl shadow-lg"
              fallbackText="NABH"
            />
            <h1 className="text-4xl font-black mb-4">NABH Accreditation</h1>
            <p className="text-blue-100 text-lg">National Accreditation Board for Hospitals & Healthcare Providers</p>
          </div>

          <div className="p-12">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="mr-3 text-blue-900" />
                What is NABH?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                NABH is a constituent board of Quality Council of India, set up to establish and operate accreditation programme for healthcare organizations. The board is structured to cater to much desired needs of the consumers and to set benchmarks for progress of health industry.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <HospitalName className="text-blue-900" /> is proud to be a NABH Pre-Accredited hospital, signifying our commitment to the highest standards of patient safety and quality of care.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ShieldCheck className="mr-3 text-blue-900" />
                Benefits for Patients
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "High quality of care and patient safety",
                  "Patients are serviced by credentialed medical staff",
                  "Rights of patients are respected and protected",
                  "Patient satisfaction is regularly evaluated",
                  "Continuous improvement of services",
                  "Standardized protocols for all procedures"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Our Quality Policy</h3>
              <p className="text-blue-800 italic">
                "To provide appropriate, optimum and quality health care services to the patients from all sections and strata of our society with a sense of social commitment."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
