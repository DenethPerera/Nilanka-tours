import React from 'react';
import { Leaf, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-6">
            <Leaf className="h-6 w-6 text-emerald-500 mr-2" />
            <span className="text-2xl font-bold">Ceylon<span className="text-emerald-500">Wild</span></span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Discover the wonders of Sri Lanka with us. We create unforgettable memories in the pearl of the Indian Ocean.
          </p>
          <div className="flex space-x-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {['Home', 'About Us', 'Destinations', 'Tour Packages', 'Contact'].map(item => (
              <li key={item}><a href="#" className="hover:text-emerald-500 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6">Support</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {['FAQ', 'Privacy Policy', 'Terms of Service', 'Booking Guide', 'Customer Care'].map(item => (
              <li key={item}><a href="#" className="hover:text-emerald-500 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-gray-400 text-sm flex flex-col items-center md:items-start">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-emerald-500 mt-1" />
              <span>123 Temple Road,<br/>Colombo 03, Sri Lanka</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-emerald-500" />
              <span>+94 11 234 5678</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-emerald-500" />
              <span>info@ceylonwild.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-900 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2024 CeylonWild Travels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;