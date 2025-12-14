import React from 'react';
import { Shield, DollarSign, Star, Leaf } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    { icon: <Shield size={32} />, title: "Safe Travel", desc: "We prioritize your safety with certified guides and secure transport." },
    { icon: <DollarSign size={32} />, title: "Affordable", desc: "Best prices guaranteed for the highest quality experiences." },
    { icon: <Star size={32} />, title: "Top Rated", desc: "Consistently rated 5-stars by travelers from around the world." },
    { icon: <Leaf size={32} />, title: "Eco Friendly", desc: "We support sustainable tourism and protect our wildlife." },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-10 md:mb-16">Why You Should Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-emerald-100 group">
              <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;