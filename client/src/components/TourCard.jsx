import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full border border-gray-100">
      
      {/* Image Container with Overlay Effect */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={tour.image || 'https://via.placeholder.com/400x300'} 
          alt={tour.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* Price Tag Overlay */}
        <div className="absolute top-4 right-4 bg-yellow-500 text-teal-900 text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
           {tour.price ? `$${tour.price}` : 'Ask Price'}
        </div>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
             <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded">
                ⏱ {tour.duration}
             </span>
             <span className="text-xs text-gray-400 flex items-center">
                ⭐ 5.0 (24)
             </span>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-teal-600 transition-colors">
            {tour.title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {tour.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <Link to={`/tour/${tour._id}`} className="w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;