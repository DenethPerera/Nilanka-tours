import React from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg"; 
import img3 from "../assets/image3.jpg";


const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 md:pb-0 md:pt-0" id="home">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.pinimg.com/1200x/da/31/58/da3158e322234781e2d848fb553fc0f3.jpg" 
          alt="Sri Lanka Elephant" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 md:to-black/70"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-8 md:mt-0 flex-grow flex flex-col justify-center pb-10 md:pb-32">
        <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs md:text-sm font-semibold mb-4 backdrop-blur-sm animate-fade-in-up">
          EXPLORE THE PARADISE ISLAND
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Nilanka Travels <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Sri Lanka</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
          Experience the untamed beauty of nature, from majestic elephants to misty mountains. Your perfect tropical getaway starts here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-6 sm:px-0">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-emerald-500/30 shadow-lg flex items-center justify-center">
            Start Journey <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all flex items-center justify-center">
            Watch Video
          </button>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="w-full px-4 md:absolute md:-bottom-24 md:left-0 z-20 mt-12 md:mt-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {[
            { img: img1},
            { img: img2},
            { img: img3 }
          ].map((card, idx) => (
            <div key={idx} className="relative h-40 md:h-48 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer transform transition-transform hover:-translate-y-2 border-2 md:border-4 border-white/80 md:border-white">
              <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg md:text-xl">{card.title}</h3>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;