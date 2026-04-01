import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export function Contact() {
  const branches = [
    {
      id: "main",
      title: "Main Branch (Garkheda)",
      address: "Sarang Society, Plot No. 8, Gajanan Mandir Chowk, Dominos Pizza Shejari, Axis Bank Samor, Garkheda, Chhatrapati Sambhaji Nagar - 431009",
      phone: "0240 - 2451055, 8329573283, 9158460777",
      emergency: "9545702020",
      email: "gajananhospitalicu@gmail.com",
      timings: "Morning: 10.00 AM to 02.00 PM, Evening: 05.00 PM to 08.00 PM",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.553488775618!2d75.34688991491325!3d19.85873998664364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba28e7e1f4803%3A0x6d90d8a6f4e1c51a!2sGajanan%20Hospital%20%26%20Critical%20Care%20Centre!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir//Gajanan+Hospital+%26+Critical+Care+Centre,+Sarang+Society,+Plot+No.+8,+Gajanan+Mandir+Chowk,+Garkheda,+Chhatrapati+Sambhaji+Nagar,+Maharashtra+431009/@19.85874,75.3490786,17z",
      color: "blue"
    },
    {
      id: "branch2",
      title: "Branch 2 (Bajaj Nagar)",
      address: "Unit-2: Bajaj Nagar, Plot No. P 146, Kamgar Kalyan Bhavan, Mohata Devi Mandir Chowk Shejari, Waluj MIDC, Chhatrapati Sambhaji Nagar",
      phone: "0240-2553555, 9168100600",
      emergency: "24/7 Emergency Available",
      email: "ghcccbajajnagar@gmail.com",
      timings: "Morning: 10.00 AM to 02.00 PM, Evening: 05.00 PM to 08.00 PM",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.61352467554!2d75.2425555149132!3d19.85619998664536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb990000000001%3A0x0!2sBajaj%20Nagar%2C%20Waluj%20MIDC!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir//Gajanan+Hospital+%26+Critical+Care+Centre,+Bajaj+Nagar,+Waluj+MIDC,+Chhatrapati+Sambhaji+Nagar,+Maharashtra/@19.856199,75.2447442,17z",
      color: "orange"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We are here to help you. Reach out to us for appointments, inquiries, or emergency services at either of our locations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {branches.map((branch) => (
            <div 
              key={branch.id} 
              className={`bg-white rounded-3xl shadow-xl overflow-hidden border-t-8 ${branch.color === 'blue' ? 'border-blue-900' : 'border-orange-500'}`}
            >
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-start mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {branch.title}
                  </h2>
                  <a 
                    href={branch.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                      branch.color === 'blue' 
                        ? 'bg-blue-900 text-white hover:bg-blue-800' 
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Get Directions
                  </a>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl shrink-0 ${branch.color === 'blue' ? 'bg-blue-50' : 'bg-orange-50'}`}>
                      <MapPin className={`h-6 w-6 ${branch.color === 'blue' ? 'text-blue-900' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Address</h3>
                      <p className="text-gray-700 leading-relaxed font-medium">
                        {branch.address}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl shrink-0 ${branch.color === 'blue' ? 'bg-blue-50' : 'bg-orange-50'}`}>
                        <Phone className={`h-6 w-6 ${branch.color === 'blue' ? 'text-blue-900' : 'text-orange-600'}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</h3>
                        <p className="text-gray-700 font-medium">{branch.phone}</p>
                        <p className="text-orange-600 font-bold mt-1">Emergency: {branch.emergency}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl shrink-0 ${branch.color === 'blue' ? 'bg-blue-50' : 'bg-orange-50'}`}>
                        <Mail className={`h-6 w-6 ${branch.color === 'blue' ? 'text-blue-900' : 'text-orange-600'}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email</h3>
                        <a href={`mailto:${branch.email}`} className="text-blue-600 hover:underline font-medium">
                          {branch.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 pt-4 border-t border-gray-100">
                    <div className={`p-3 rounded-xl shrink-0 ${branch.color === 'blue' ? 'bg-blue-50' : 'bg-orange-50'}`}>
                      <Clock className={`h-6 w-6 ${branch.color === 'blue' ? 'text-blue-900' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">OPD Timings</h3>
                      <p className="text-gray-700 font-medium">{branch.timings}</p>
                      <p className="text-blue-900 font-bold mt-1">24/7 Emergency Services Available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="h-96 w-full bg-gray-200 border-t border-gray-100">
                <iframe
                  title={`${branch.title} Map`}
                  src={branch.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
