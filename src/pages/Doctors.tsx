import { useState, useEffect } from "react";
import { User, Award, Clock, MapPin } from "lucide-react";
import { TiltCard } from "../components/ui/TiltCard";

export function Doctors() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const directors = [
    { 
      name: "Dr. Sachin D. Suryawanshi", 
      specialty: "Intervention Pulmonologist & Intensivist", 
      qualifications: "MBBS (MIMSR MIT Medical College, Latur), IDCCM (KEM Hospital, Pune), TDD - Chest Physician (CPS Mumbai), Dip. in Diabetology (Boston University, USA)",
      role: "Director",
      description: "Expert Intervention Pulmonologist & Intensivist. Extensive experience as Intensivist at KEM Hospital Pune & Jehangir Hospital Pune, and Senior Registrar at Bhabha Hospital Mumbai & MGM Medical College.",
      availability: "Mon - Sat: 10:00 AM - 2:00 PM, 6:00 PM - 9:00 PM"
    },
    { 
      name: "Dr. Vijay Walture", 
      specialty: "Medicine & Critical Care Consultant", 
      qualifications: "MBBS, TDD, D.Cardiology, Member of ACC",
      role: "Director",
      description: "Specialist in Cardiology and Critical Care. Dedicated to providing advanced cardiac care and managing intensive care units.",
      availability: "Mon - Sat: 11:00 AM - 3:00 PM, 7:00 PM - 10:00 PM"
    },
    { 
      name: "Dr. Gitesh Dalvi", 
      specialty: "Medicine & Critical Care Consultant", 
      qualifications: "MBBS, FCPS (Medicine), DNB, TDD, AFIH",
      role: "Director",
      description: "Highly qualified physician with expertise in occupational health and critical care medicine. Focused on holistic patient recovery.",
      availability: "Mon - Sat: 9:00 AM - 1:00 PM, 5:00 PM - 8:00 PM"
    },
    { 
      name: "Dr. Dilip Thombre", 
      specialty: "Medicine & Critical Care Consultant", 
      qualifications: "MBBS, MD (Medicine BJMC, Pune), Fellow 2D Echo",
      role: "Director",
      description: "Expert in 2D Echocardiography and Internal Medicine. Extensive experience in diagnosing and treating cardiovascular disorders.",
      availability: "Mon - Sat: 10:00 AM - 2:00 PM, 6:00 PM - 9:00 PM"
    },
    { 
      name: "Dr. Rameshwar Hajare", 
      specialty: "Medicine & Critical Care Consultant", 
      qualifications: "MBBS, DTCD, Consultant Physician & Intensivist",
      role: "Director",
      description: "Consultant Physician and Intensivist specializing in respiratory medicine and critical care management.",
      availability: "Mon - Sat: 11:00 AM - 3:00 PM, 7:00 PM - 10:00 PM"
    },
  ];

  const consultantsList = [
    { name: "Dr. Sachin Atmaram Patil", specialty: "Orthopaedic", qualifications: "MBBS, D.Ortho, FCPS Ortho | Fellowship in Joint Replacement & Arthroscopy | Consultant Joint Replacement, Arthroscopy and Orthopaedic Surgeon | Exp: J.J Hospital (Mumbai - 3 Yrs), ESIC Andheri (3 Yrs), Unit Head - ESIS Aurangabad" },
    { name: "Dr. Govind Changule", specialty: "Maxillofacial Surgery", qualifications: "MDS, Member ISOI, Oral Maxillofacial Reconstructive Surgeon" },
    { name: "Dr. Jitendra Rathod", specialty: "ENT", qualifications: "MBBS, MS (ENT) Surgery" },
    { name: "Dr. Sharad Shelke", specialty: "ENT", qualifications: "MBBS, MS (ENT)" },
    { name: "Dr. Prashant More", specialty: "Cardio-Thorasic Surgery", qualifications: "MBBS, MS Mch (CVTS)" },
    { name: "Dr. Anand Soni", specialty: "Neurology", qualifications: "MBBS, MD, DM (Neurology)" },
    { name: "Dr. Pravin Wasdikar", specialty: "Surgery", qualifications: "MBBS, MS (Gen Surgery), Endoscopy, Laparoscopy, Colorectal & General Surgeon" },
    { name: "Dr. Sandip Bhalsing", specialty: "Surgery", qualifications: "MBBS, MS Surgery, DNB Surgical Gastro-entrology, Advanced Laparoscopy Surgeon" },
    { name: "Dr. Ashish Gandhi", specialty: "Gastro Enterology", qualifications: "MBBS, DNB Medicine (Pune), DNB Gastroenterology (Delhi)" },
    { name: "Dr. Jay Toshniwal", specialty: "Gastro Enterology", qualifications: "MBBS MD, DM (Gastro Enterology)" },
    { name: "Dr. Prashant Darakh", specialty: "Uro Surgery", qualifications: "MBBS MS, DNB (Uro Surgery)" },
    { name: "Dr. Arun Chinchole", specialty: "Uro Surgery", qualifications: "MBBS MS, DNB (Uro Surgery)" },
    { name: "Dr. Nitin Kotecha", specialty: "Neuro & Spine Surgery", qualifications: "MBBS, MS, Mch (Neurosurgery), Neuro Surgeon" },
    { name: "Dr. Anand Dank", specialty: "Neuro & Spine Surgery", qualifications: "MBBS, MS, Mch (Neurosurgery), Neuro Surgeon" },
    { name: "Dr. Nitin Tathe", specialty: "Onco Surgery", qualifications: "MBBS, MS, FIAGES, Cancer Surgeon" },
    { name: "Dr. Lalit Banswal", specialty: "Onco Surgery", qualifications: "MBBS, MS General Surgery, Cancer Surgeon" },
    { name: "Dr. Avinash Yelikar", specialty: "Plastic Surgery", qualifications: "MBBS, MS, MCH (Plastic Surgery)" },
    { name: "Dr. Amit Patil", specialty: "Plastic Surgery", qualifications: "MBBS, MS, MCH (Plastic Surgery)" },
    { name: "Dr. Jayant Indurkar", specialty: "Haematology", qualifications: "MBBS, MD, (Haematology-Onchologist)" },
    { name: "Dr. Manoj Toshniwal", specialty: "Haematology", qualifications: "MBBS, MD, DM (Haematology-Onchologist)" },
    { name: "Dr. Sachin Soni", specialty: "Nephrology", qualifications: "MBBS, MD, DNB, (Nephrology)" },
    { name: "Dr. Shreeganesh Barnela", specialty: "Nephrology", qualifications: "MBBS, MD, DNB, (Nephrology)" },
    { name: "Dr. Rahul Ruikar", specialty: "Nephrology", qualifications: "MBBS, DNB Medicine, DNB Nephrology, Kidney disease specialist" },
    { name: "Dr. Pankaj Golegavkar", specialty: "Skin & Hair Transplant", qualifications: "MBBS, DVD (Skin)" },
    { name: "Dr. Alka Kotecha", specialty: "Skin & Hair Transplant", qualifications: "MBBS, MD (Skin & VD)" },
    { name: "Dr. Parsi Jilla", specialty: "Cardiology", qualifications: "MBBS, MD, (Med.) Cardiologist" },
    { name: "Dr. Mukund Bajaj", specialty: "Cardiology", qualifications: "MBBS, MD, (Med.) DM Cardiology" },
    { name: "Dr. Devendra Borgavkar", specialty: "Cardiology", qualifications: "MBBS, MD, (Med.) DM Cardiology" },
    { name: "Dr. Devrao Tenge", specialty: "Cardiology", qualifications: "MBBS, MD, (Med.) DNB Cardiology" },
    { name: "Dr. Chandrashekhar Chavan", specialty: "Gynaecologist", qualifications: "MBBS, MD (OBGY)" },
    { name: "Dr. Nimisha Pagare", specialty: "Gynaecologist", qualifications: "MBBS, MD (OBGY)" },
    { name: "Dr. Shravan Tunganwar", specialty: "Radio - Oncologist", qualifications: "MBBS, MD, (Radio Theraphy)" },
    { name: "Dr. Kiran Bodkhe", specialty: "Psychiatrist", qualifications: "MBBS, DPM, MD, (Psy)" },
  ];

  // Group consultants by specialty
  const groupedConsultants = consultantsList.reduce((acc, doctor) => {
    if (!acc[doctor.specialty]) {
      acc[doctor.specialty] = [];
    }
    acc[doctor.specialty].push(doctor);
    return acc;
  }, {} as Record<string, typeof consultantsList>);

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-6"></div>
            <div className="h-6 w-3/4 max-w-3xl bg-gray-200 animate-pulse rounded mx-auto"></div>
          </div>

          {/* Directors Skeleton */}
          <div className="mb-24">
            <div className="flex items-center justify-center space-x-4 mb-12">
              <div className="h-1 w-12 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-1 w-12 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gray-200 animate-pulse p-8 min-h-[200px]"></div>
                  <div className="md:w-2/3 p-8">
                    <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full mb-4"></div>
                    <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
                    <div className="h-4 w-64 bg-gray-200 animate-pulse rounded mb-6"></div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                    <div className="space-y-3 border-t border-gray-100 pt-6">
                      <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consultants Skeleton */}
          <div>
            <div className="flex items-center justify-center space-x-4 mb-12">
              <div className="h-1 w-12 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-1 w-12 bg-gray-200 animate-pulse rounded-full"></div>
            </div>

            <div className="space-y-12">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-8 border-l-8 border-gray-200">
                  <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-8"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <div key={j} className="flex items-start space-x-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full shrink-0"></div>
                        <div className="flex-1">
                          <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded mb-2"></div>
                          <div className="h-3 w-full bg-gray-200 animate-pulse rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 relative overflow-hidden">
      {/* Dynamic ambient blur light shades for enhanced modern aesthetics */}
      <div className="absolute top-[10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-orange-100/20 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">Our Medical Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Meet our dedicated directors and expert consultants committed to your health and well-being.
          </p>
        </div>

        {/* Directors Section */}
        <div className="mb-24">
          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Our Directors</h2>
            <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {directors.map((director, index) => (
              <TiltCard 
                key={index} 
                maxTilt={6} 
                scale={1.01} 
                glowColor="rgba(30, 58, 138, 0.1)"
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row h-full group"
              >
                <div className="md:w-1/3 bg-blue-900 flex items-center justify-center p-8 shrink-0">
                  <div className="bg-white/10 p-6 rounded-full border-2 border-white/20 transition-transform duration-500 group-hover:scale-110">
                    <User className="h-20 w-20 text-white" />
                  </div>
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                          {director.role}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900">{director.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-blue-700 font-semibold mb-4 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      {director.specialty}
                    </p>
                    
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed italic">
                      "{director.description}"
                    </p>
                  </div>
                  
                  <div className="space-y-3 border-t border-gray-100 pt-6">
                    <div className="flex items-start text-sm">
                      <div className="font-bold text-gray-900 w-24 shrink-0">Education:</div>
                      <div className="text-gray-600">{director.qualifications}</div>
                    </div>
                    <div className="flex items-start text-sm">
                      <div className="font-bold text-gray-900 w-24 shrink-0 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Hours:
                      </div>
                      <div className="text-gray-600">{director.availability}</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Consultants Section */}
        <div>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="h-1 w-12 bg-blue-900 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Expert Consultants</h2>
            <div className="h-1 w-12 bg-blue-900 rounded-full"></div>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedConsultants).map(([specialty, doctors]) => (
              <div key={specialty} className="bg-white rounded-2xl shadow-md p-8 border-l-8 border-blue-900">
                <h3 className="text-2xl font-bold text-blue-900 mb-8 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                  {specialty}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor, index) => (
                    <TiltCard 
                      key={index} 
                      maxTilt={8} 
                      scale={1.03}
                      glowColor="rgba(30, 58, 138, 0.05)"
                      className="flex items-start space-x-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all h-full group"
                    >
                      <div className="bg-blue-100 p-2 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <User className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{doctor.name}</h4>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">
                          {doctor.qualifications}
                        </p>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
