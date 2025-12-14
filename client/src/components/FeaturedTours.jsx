import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const FeaturedTours = () => {
  const scrollRef = useRef(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Tours from Database
  useEffect(() => {
    axios.get('/api/tours')
      .then(res => {
        setTours(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tours:", err);
        setLoading(false);
      });
  }, []);

  // Scroll Function (Left/Right)
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      if (direction === 'left') {
        current.scrollBy({ left: -350, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: 350, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white" id="tours">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Title & Arrows */}
        <div className="flex justify-between items-end mb-10 md:mb-16">
          <div>
            <h4 className="text-emerald-600 font-bold uppercase tracking-wider mb-2 text-sm md:text-base">Our Packages</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">We Offer Great Experiences</h2>
          </div>
          
          {/* Navigation Buttons (Only visible on Desktop) */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-gray-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-gray-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Scroll Container (Slider) */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
             <div className="w-full text-center py-10 text-gray-500">Loading tours...</div>
          ) : tours.length > 0 ? (
            tours.map((tour) => (
              <div 
                key={tour._id} 
                className="group min-w-[300px] md:min-w-[350px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 snap-center"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={tour.image || 'https://via.placeholder.com/400x300'} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                    {/* Duration and Price Tags REMOVED */}
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <div className="flex justify-start items-center mb-3">
                    {/* Price Tag REMOVED */}
                    <h3 className="text-xl font-bold text-gray-900 truncate pr-2">{tour.title}</h3>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 min-h-[40px]">
                    {tour.description}
                  </p>
                  
                  <div className="flex">
                    {/* Only View Details button remains and is full width */}
                    <Link 
                        to={`/tour/${tour._id}`} 
                        className="flex-1 text-center bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium shadow-md"
                    >
                        View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="w-full text-center py-10 text-gray-500">No tours available at the moment.</div>
          )}
        </div>

      </div>
      
      {/* CSS to hide default scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturedTours;