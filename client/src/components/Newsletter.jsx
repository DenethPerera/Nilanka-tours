import React from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Share Your Ideas With Us</h2>
        <p className="text-gray-400 mb-8 text-sm md:text-base">Subscribe to our newsletter to get the latest updates and special offers.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 bg-white/10 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 bg-transparent border-none text-white placeholder-gray-400 px-6 py-3 focus:outline-none text-center sm:text-left"
          />
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2">
            Subscribe <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;