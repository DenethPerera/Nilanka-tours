import React from 'react';
import { Star, Leaf, Users, Camera, MapPin } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 pt-16 md:pt-40" id="destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          <div className="lg:w-1/2 relative w-full">
            <div className="hidden md:block absolute -top-4 -left-4 w-24 h-24 bg-emerald-100 rounded-full opacity-50 z-0"></div>
            <div className="hidden md:block absolute -bottom-4 -right-4 w-32 h-32 bg-teal-100 rounded-full opacity-50 z-0"></div>
            <img 
              src="https://i.pinimg.com/736x/21/03/69/21036923589592ed24e04c2797be80e8.jpg" 
              alt="Tea Plantation" 
              className="relative z-10 rounded-3xl shadow-2xl w-full h-64 sm:h-[400px] md:h-[500px] object-cover"
            />
            {/* Top Rated Badge */}
            
          </div>
          
          <div className="lg:w-1/2 pt-6 md:pt-0">
            <h4 className="text-emerald-600 font-bold uppercase tracking-wider mb-2 text-sm md:text-base">Explore Sri Lanka</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">Dream Holiday in the <br/>Pearl of the Indian Ocean</h2>
            <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-base md:text-lg">
              Sri Lanka is a land of staggering contrast and spectacular beauty due to its compactness. Along the coast, visitors can explore amazing beaches, while the interior offers tea plantations and rainforested peaks.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                {icon: <Leaf className="text-emerald-500" />, title: "Nature Trails", desc: "Walk through lush green forests."},
                {icon: <Users className="text-blue-500" />, title: "Cultural Tours", desc: "Experience ancient history."},
                {icon: <Camera className="text-orange-500" />, title: "Wildlife Safari", desc: "See elephants and leopards."},
                {icon: <MapPin className="text-red-500" />, title: "Best Locations", desc: "Handpicked scenic spots."}
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all border border-gray-100">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-8 md:mt-10 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors w-full md:w-auto">
              Read More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;