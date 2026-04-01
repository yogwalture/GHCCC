import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Activity, 
  Heart, 
  Brain, 
  Stethoscope, 
  ShieldCheck, 
  Bone, 
  Wind, 
  Syringe, 
  Eye, 
  User, 
  Microscope, 
  Ear, 
  Droplets, 
  Scan, 
  Sparkles, 
  Smile, 
  Video,
  ArrowRight
} from "lucide-react";

export function Departments() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const departments = [
    { 
      name: "General Medicine", 
      icon: <Stethoscope className="h-6 w-6" />,
      description: "Comprehensive care for adult diseases, focusing on prevention, diagnosis, and treatment.",
      services: ["Fever & Infections", "Chronic Disease Management", "Hypertension", "Preventive Health Checks"],
      advancedProcedures: [
        { name: "Complex Multi-system Disease Management", specialist: "Dr. Sachin Suryawanshi" },
        { name: "Advanced Geriatric Care", specialist: "Dr. Dilip Thombre" }
      ],
      leadDoctor: "Dr. Sachin Suryawanshi, Dr. Dilip Thombre"
    },
    { 
      name: "General Surgery", 
      icon: <Activity className="h-6 w-6" />,
      description: "Advanced surgical interventions for a wide range of common and complex conditions.",
      services: ["Appendectomy", "Hernia Repair", "Gallbladder Surgery", "Trauma Surgery"],
      advancedProcedures: [
        { name: "Complex Trauma Reconstruction", specialist: "Dr. Pravin Wasdikar" },
        { name: "Advanced Colorectal Surgery", specialist: "Dr. Sandip Bhalsing" }
      ],
      leadDoctor: "Dr. Pravin Wasdikar, Dr. Sandip Bhalsing"
    },
    { 
      name: "Cardiology", 
      icon: <Heart className="h-6 w-6" />,
      description: "Expert care for heart and cardiovascular conditions with state-of-the-art diagnostics.",
      services: ["ECG & 2D Echo", "Angiography", "Angioplasty", "Heart Failure Management"],
      advancedProcedures: [
        { name: "Complex Coronary Angioplasty", specialist: "Dr. Parsi Jilla" },
        { name: "Pacemaker Implantation", specialist: "Dr. Mukund Bajaj" }
      ],
      leadDoctor: "Dr. Parsi Jilla, Dr. Mukund Bajaj"
    },
    { 
      name: "Critical Care", 
      icon: <ShieldCheck className="h-6 w-6" />,
      description: "24/7 intensive care for life-threatening illnesses and injuries.",
      services: ["24/7 ICU", "Ventilator Support", "Multi-organ Failure", "Trauma Care"],
      advancedProcedures: [
        { name: "Advanced Hemodynamic Monitoring", specialist: "Dr. Vijay Walture" },
        { name: "Continuous Renal Replacement Therapy (CRRT)", specialist: "Dr. Gitesh Dalvi" }
      ],
      leadDoctor: "Dr. Vijay Walture, Dr. Gitesh Dalvi"
    },
    { 
      name: "Orthopedic Surgery", 
      icon: <Bone className="h-6 w-6" />,
      description: "Specialized treatment for musculoskeletal system disorders and injuries.",
      services: ["Fracture Management", "Joint Replacement", "Spine Surgery", "Sports Injuries"],
      advancedProcedures: [
        { name: "Computer-Assisted Joint Replacement", specialist: "Dr. Sachin Patil" },
        { name: "Complex Pelvic-Acetabular Surgery", specialist: "Dr. Sachin Patil" }
      ],
      leadDoctor: "Dr. Sachin Patil"
    },
    { 
      name: "Laparoscopy Surgery", 
      icon: <Video className="h-6 w-6" />,
      description: "Minimally invasive surgical procedures for faster recovery and less pain.",
      services: ["Diagnostic Laparoscopy", "Laparoscopic Cholecystectomy", "Hernia Repair", "Appendectomy"],
      advancedProcedures: [
        { name: "Single Incision Laparoscopic Surgery (SILS)", specialist: "Dr. Pravin Wasdikar" },
        { name: "Laparoscopic Bariatric Surgery", specialist: "Dr. Sandip Bhalsing" }
      ],
      leadDoctor: "Dr. Pravin Wasdikar, Dr. Sandip Bhalsing"
    },
    { 
      name: "Nephrology & Dialysis", 
      icon: <Droplets className="h-6 w-6" />,
      description: "Comprehensive care for kidney-related conditions and advanced dialysis services.",
      services: ["Hemodialysis", "Kidney Disease Management", "Renal Failure Treatment", "Hypertension Control"],
      advancedProcedures: [
        { name: "Continuous Ambulatory Peritoneal Dialysis (CAPD)", specialist: "Dr. Sachin Soni" },
        { name: "Pre-transplant Renal Evaluation", specialist: "Dr. Shreeganesh Barnela" }
      ],
      leadDoctor: "Dr. Sachin Soni, Dr. Shreeganesh Barnela"
    },
    { 
      name: "ENT (Otorhinolaryngology)", 
      icon: <Ear className="h-6 w-6" />,
      description: "Diagnosis and treatment of ear, nose, throat, and head & neck disorders.",
      services: ["Ear Infections", "Sinus Surgery", "Tonsillectomy", "Hearing Tests"],
      advancedProcedures: [
        { name: "Functional Endoscopic Sinus Surgery (FESS)", specialist: "Dr. Jitendra Rathod" },
        { name: "Micro-ear Surgery", specialist: "Dr. Sharad Shelke" }
      ],
      leadDoctor: "Dr. Jitendra Rathod, Dr. Sharad Shelke"
    },
    { 
      name: "Medical Oncology", 
      icon: <Microscope className="h-6 w-6" />,
      description: "Advanced cancer care including diagnosis, treatment, and ongoing management.",
      services: ["Chemotherapy", "Targeted Therapy", "Immunotherapy", "Cancer Screening"],
      advancedProcedures: [
        { name: "Precision Oncology & Genomic Testing", specialist: "Dr. Nitin Tathe" },
        { name: "Intrathecal Chemotherapy", specialist: "Dr. Lalit Banswal" }
      ],
      leadDoctor: "Dr. Nitin Tathe, Dr. Lalit Banswal"
    },
    { 
      name: "Diabetology", 
      icon: <Syringe className="h-6 w-6" />,
      description: "Specialized care for the management and prevention of diabetes and its complications.",
      services: ["Type 1 & 2 Diabetes", "Diabetic Foot Care", "Insulin Therapy", "Dietary Counseling"],
      advancedProcedures: [
        { name: "Continuous Glucose Monitoring (CGM)", specialist: "Dr. Sachin Suryawanshi" },
        { name: "Insulin Pump Therapy", specialist: "Dr. Dilip Thombre" }
      ],
      leadDoctor: "Dr. Sachin Suryawanshi, Dr. Dilip Thombre"
    },
    { 
      name: "Psychiatry & Neuropsychiatry", 
      icon: <Brain className="h-6 w-6" />,
      description: "Mental health services for emotional, behavioral, and cognitive disorders.",
      services: ["Depression & Anxiety", "Schizophrenia", "Cognitive Disorders", "Counseling"],
      advancedProcedures: [
        { name: "Electroconvulsive Therapy (ECT)", specialist: "Dr. Kiran Bodkhe" },
        { name: "Neuropsychological Rehabilitation", specialist: "Dr. Kiran Bodkhe" }
      ],
      leadDoctor: "Dr. Kiran Bodkhe"
    },
    { 
      name: "Neurology", 
      icon: <Brain className="h-6 w-6" />,
      description: "Expert diagnosis and treatment of nervous system disorders.",
      services: ["Stroke Management", "Epilepsy", "Parkinson's Disease", "Headaches/Migraines"],
      advancedProcedures: [
        { name: "Thrombolytic Therapy for Acute Stroke", specialist: "Dr. Anand Soni" },
        { name: "Video EEG Monitoring", specialist: "Dr. Anand Soni" }
      ],
      leadDoctor: "Dr. Anand Soni"
    },
    { 
      name: "Pulmonology", 
      icon: <Wind className="h-6 w-6" />,
      description: "Specialized care for respiratory tract and lung diseases.",
      services: ["Asthma", "COPD", "Pneumonia", "Bronchoscopy"],
      advancedProcedures: [
        { name: "Advanced Interventional Pulmonology", specialist: "Expert Pulmonologists" },
        { name: "Sleep Apnea Management", specialist: "Expert Pulmonologists" }
      ],
      leadDoctor: "Expert Pulmonologists"
    },
    { 
      name: "Skin & V.D.", 
      icon: <Sparkles className="h-6 w-6" />,
      description: "Comprehensive dermatological care for skin, hair, and venereal diseases.",
      services: ["Acne Treatment", "Psoriasis & Eczema", "Venereal Diseases", "Laser Therapy"],
      advancedProcedures: [
        { name: "Advanced Laser Skin Resurfacing", specialist: "Dr. Pankaj Golegavkar" },
        { name: "Biological Therapy for Psoriasis", specialist: "Dr. Alka Kotecha" }
      ],
      leadDoctor: "Dr. Pankaj Golegavkar, Dr. Alka Kotecha"
    },
    { 
      name: "Hemato Oncology", 
      icon: <Droplets className="h-6 w-6" />,
      description: "Specialized treatment for blood cancers and blood-related disorders.",
      services: ["Leukemia", "Lymphoma", "Multiple Myeloma", "Bone Marrow Disorders"],
      advancedProcedures: [
        { name: "Autologous Bone Marrow Transplant", specialist: "Dr. Jayant Indurkar" },
        { name: "Targeted Therapy for Lymphoma", specialist: "Dr. Manoj Toshniwal" }
      ],
      leadDoctor: "Dr. Jayant Indurkar, Dr. Manoj Toshniwal"
    },
    { 
      name: "Gastro-Enterology", 
      icon: <Activity className="h-6 w-6" />,
      description: "Diagnosis and treatment of digestive system and liver disorders.",
      services: ["Endoscopy", "Colonoscopy", "Liver Diseases", "Inflammatory Bowel Disease"],
      advancedProcedures: [
        { name: "Endoscopic Retrograde Cholangiopancreatography (ERCP)", specialist: "Dr. Ashish Gandhi" },
        { name: "Advanced Liver Cirrhosis Management", specialist: "Dr. Jay Toshniwal" }
      ],
      leadDoctor: "Dr. Ashish Gandhi, Dr. Jay Toshniwal"
    },
    { 
      name: "Radiology", 
      icon: <Scan className="h-6 w-6" />,
      description: "Advanced imaging services for accurate diagnosis and treatment planning.",
      services: ["Digital X-Ray", "Sonography", "Color Doppler", "CT Scan"],
      advancedProcedures: [
        { name: "Image-Guided Biopsies", specialist: "Expert Radiologists" },
        { name: "Advanced Doppler Studies", specialist: "Expert Radiologists" }
      ],
      leadDoctor: "Expert Radiologists"
    },
    { 
      name: "Plastic & Cosmetic Surgery", 
      icon: <Smile className="h-6 w-6" />,
      description: "Reconstructive and aesthetic surgical procedures.",
      services: ["Reconstructive Surgery", "Burn Management", "Cosmetic Procedures", "Scar Revision"],
      advancedProcedures: [
        { name: "Microvascular Reconstructive Surgery", specialist: "Dr. Avinash Yelikar" },
        { name: "High-Definition Liposuction", specialist: "Dr. Amit Patil" }
      ],
      leadDoctor: "Dr. Avinash Yelikar, Dr. Amit Patil"
    },
    { 
      name: "Uro Surgery", 
      icon: <Droplets className="h-6 w-6" />,
      description: "Surgical care for urinary tract and male reproductive system disorders.",
      services: ["Kidney Stones", "Prostate Surgery", "Urinary Tract Infections", "Urologic Oncology"],
      advancedProcedures: [
        { name: "Laser Lithotripsy for Kidney Stones", specialist: "Dr. Prashant Darakh" },
        { name: "Laparoscopic Radical Prostatectomy", specialist: "Dr. Arun Chinchole" }
      ],
      leadDoctor: "Dr. Prashant Darakh, Dr. Arun Chinchole"
    },
    { 
      name: "C.V.T. Surgery", 
      icon: <Heart className="h-6 w-6" />,
      description: "Cardiothoracic and vascular surgical procedures.",
      services: ["Bypass Surgery", "Valve Replacement", "Thoracic Surgery", "Vascular Surgery"],
      advancedProcedures: [
        { name: "Beating Heart Bypass Surgery", specialist: "Dr. Prashant More" },
        { name: "Minimally Invasive Cardiac Surgery", specialist: "Dr. Prashant More" }
      ],
      leadDoctor: "Dr. Prashant More"
    },
    { 
      name: "Neuro Spine Surgery", 
      icon: <Bone className="h-6 w-6" />,
      description: "Advanced surgical treatment for spinal cord and nerve disorders.",
      services: ["Spinal Cord Injuries", "Disc Herniation", "Spinal Tumors", "Minimally Invasive Spine Surgery"],
      advancedProcedures: [
        { name: "Endoscopic Spine Surgery", specialist: "Dr. Nitin Kotecha" },
        { name: "Complex Spinal Deformity Correction", specialist: "Dr. Anand Dank" }
      ],
      leadDoctor: "Dr. Nitin Kotecha, Dr. Anand Dank"
    },
    { 
      name: "Pathology", 
      icon: <Syringe className="h-6 w-6" />,
      description: "24/7 comprehensive laboratory testing and diagnostic services.",
      services: ["Blood Tests", "Biopsies", "Microbiology", "Clinical Chemistry"],
      advancedProcedures: [
        { name: "Advanced Immunohistochemistry", specialist: "Expert Pathologists" },
        { name: "Molecular Diagnostics", specialist: "Expert Pathologists" }
      ],
      leadDoctor: "Expert Pathologists"
    }
  ];

  const facilities = [
    "Well-equipped Air-conditioned Intensive Care Unit (ICU)",
    "Isolation ICU",
    "Poisoning & Snake bite diagnosis and treatment",
    "Diabetes diagnosis and treatment",
    "Heart disease diagnosis and treatment",
    "Lung disease diagnosis and treatment",
    "Cancer diagnosis and treatment",
    "Brain disease diagnosis and treatment",
    "Skin disease & Laser",
    "Well-equipped Dialysis Department",
    "Kidney disease & treatment",
    "Sonography & Color Doppler",
    "Endoscopy Department",
    "Bronchoscopy",
    "Laser therapy (for varicose veins)",
    "24 hours Ambulance service available",
    "Orthopedic diagnosis & treatment",
    "Accident & Trauma care",
    "Joint Replacement",
    "Joint & Spine Surgery",
    "Arthroscopy",
    "Maxillofacial & Dental Surgery",
    "Face, Mouth & Jaw diagnosis and treatment",
    "Neuro Surgery",
    "Cancer Surgery & Chemotherapy",
    "Plastic Surgery",
    "General Laparoscopic Surgery",
    "2D Echo Cardiography",
    "Digital X-Ray",
    "Physiotherapy & Treatment",
    "24 hours Pathology Lab & Pharmacy",
    "24 hours Expert Doctor available",
    "A.C. Room facility",
  ];

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="h-12 w-3/4 max-w-2xl bg-gray-200 animate-pulse rounded mx-auto mb-6"></div>
            <div className="h-6 w-2/3 max-w-xl bg-gray-200 animate-pulse rounded mx-auto"></div>
          </div>

          {/* Departments Grid Skeleton */}
          <div className="mb-24">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
                  <div className="p-6 border-b border-gray-50 flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gray-200 animate-pulse rounded-lg shrink-0"></div>
                    <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col space-y-6">
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                    <div>
                      <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-3"></div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(j => <div key={j} className="h-3 w-full bg-gray-200 animate-pulse rounded"></div>)}
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-start space-x-3">
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full shrink-0"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities Skeleton */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-gray-200">
            <div className="text-center mb-12">
              <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-4"></div>
              <div className="h-4 w-96 bg-gray-200 animate-pulse rounded mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
              {Array.from({ length: 15 }).map((_, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-full shrink-0"></div>
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded mt-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">Departments & Scope of Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive medical care across a wide range of specialties, supported by advanced technology and expert professionals.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center border-b-2 border-orange-500 pb-4 inline-block">
            Our Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full"
              >
                <div className="p-6 border-b border-gray-50 flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-white">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-700 shrink-0">
                    {dept.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{dept.name}</h3>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {dept.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Key Services</h4>
                    <ul className="space-y-2">
                      {dept.services.map((service, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <span className="text-orange-500 mr-2 mt-0.5">•</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {dept.advancedProcedures && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="text-xs font-bold text-blue-800 mb-3 uppercase tracking-widest flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" /> Advanced Procedures
                      </h4>
                      <ul className="space-y-3">
                        {dept.advancedProcedures.map((proc, idx) => (
                          <li key={idx} className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900 leading-tight">{proc.name}</span>
                            <span className="text-xs text-blue-600 font-medium mt-0.5">By {proc.specialist}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-100 p-1.5 rounded-full shrink-0 mt-0.5">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Lead Specialists</h4>
                        <p className="text-sm font-medium text-blue-900">{dept.leadDoctor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities List */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-blue-900">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Facilities</h2>
            <p className="text-gray-600 mb-6">State-of-the-art infrastructure and round-the-clock services.</p>
            <Link to="/insurances" className="inline-flex items-center space-x-2 text-blue-900 font-bold hover:text-blue-700 transition-colors bg-blue-50 px-6 py-3 rounded-full">
              <ShieldCheck className="h-5 w-5" />
              <span>View Empanelled Insurances & TPA</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
            {facilities.map((facility, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-orange-100 p-1.5 rounded-full shrink-0 mt-0.5">
                  <ShieldCheck className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-gray-700 font-medium leading-snug">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
