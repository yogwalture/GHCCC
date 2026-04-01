import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const Insurances = () => {
  const insurances = [
    { name: "MD India", note: "" },
    { name: "Star Health", note: "" },
    { name: "Paramount TPA", note: "(Only Private Insurance covered)" },
    { name: "IndusInd General Insurance", note: "" },
    { name: "Generali Central Insurance", note: "" },
    { name: "Iffco Tokio", note: "" },
    { name: "Navi Health Insurance", note: "" },
    { name: "SBI GENERAL INSURANCE", note: "" },
    { name: "Park Mediclaim TPA", note: "" },
    { name: "ICICI LOMBARD", note: "" },
    { name: "Mediassit TPA", note: "(Only Private Insurance covered)" },
    { name: "Universal Sompo TPA", note: "" },
    { name: "Ericson TPA", note: "" },
    { name: "TATA AIG", note: "" },
    { name: "Acko General Insurance", note: "" },
    { name: "FHPL TPA", note: "" },
    { name: "ADITYA BIRLA GENERAL INSURANCE", note: "" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-blue-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Empanelled Insurances & TPA</h1>
            <p className="text-xl text-blue-100">
              Cashless facility available for the following private health insurances and TPAs.
            </p>
          </div>
        </div>
      </section>

      {/* Insurances List */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center border-b pb-4">
              *Cashless Facility Available is here*
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {insurances.map((insurance, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-4 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100"
                >
                  <div className="bg-green-100 p-2 rounded-full shrink-0 mr-4">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{index + 1}. {insurance.name}</h3>
                    {insurance.note && (
                      <p className="text-sm text-orange-600 font-medium mt-1">{insurance.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
              <p className="text-gray-700">
                For any queries regarding insurance coverage and cashless claims, please contact our TPA desk at the hospital reception.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insurances;
