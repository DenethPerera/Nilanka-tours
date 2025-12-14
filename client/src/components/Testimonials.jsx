import React, { useState, useEffect } from 'react';
import { Star, X, CheckCircle, AlertCircle, PenTool } from 'lucide-react';
import axios from '../api/axios';

// Reusable Star Component
const RatingStars = ({ rating, setRating, interactive = false }) => (
  <div className="flex space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        onClick={() => interactive && setRating(i + 1)}
        className={`w-5 h-5 transition-colors duration-200 ${interactive ? 'cursor-pointer' : ''} ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [bookingId, setBookingId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
  const [msg, setMsg] = useState('');

  // Fetch Reviews on Load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('/api/reviews');
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to load reviews");
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await axios.post('http://localhost:5000/api/reviews', {
        bookingId,
        rating,
        comment
      });
      setStatus('success');
      setMsg('Thank you! Your review has been submitted for approval.');
      setBookingId('');
      setComment('');
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.msg || 'Submission failed. Please check your Booking ID.');
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 sm:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-16 relative">
          <div className="flex items-center justify-center mb-3">
            <span className="w-10 h-px bg-cyan-600 mr-3 hidden sm:block"></span>
            <h2 className="text-sm font-medium tracking-widest uppercase text-cyan-600">
              Testimonials
            </h2>
            <span className="w-10 h-px bg-cyan-600 ml-3 hidden sm:block"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Words From Our Customers
          </h1>
          
          {/* Write Review Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-8 bg-cyan-600 text-white px-6 py-2 rounded-full hover:bg-cyan-700 transition flex items-center gap-2 mx-auto shadow-lg"
          >
            <PenTool size={18} /> Write a Review
          </button>
        </div>

        {/* Reviews Carousel/Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="w-full sm:w-96 p-8 rounded-xl shadow-lg bg-gray-50 hover:shadow-xl transition duration-300 border border-gray-100">
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "{review.comment}"
                </p>

                {/* Profile Section */}
                <div className="flex flex-col items-center mt-6 border-t border-gray-200 pt-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-xl mb-2">
                    {review.customerName.charAt(0)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{review.customerName}</h3>
                  <div className="mt-2">
                    <RatingStars rating={review.rating} />
                  </div>
                </div>
              </div>
            ))
          ) : (
             <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
          )}
        </div>
      </div>

      {/* 🔐 Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
            
            {/* Modal Header */}
            <div className="bg-cyan-600 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Rate Your Experience</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>

            <div className="p-6">
              {status === 'success' ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-800">Review Submitted!</h4>
                  <p className="text-gray-600 mt-2">{msg}</p>
                  <button onClick={() => setIsModalOpen(false)} className="mt-6 text-cyan-600 font-semibold hover:underline">Close</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Error Message */}
                  {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                      <AlertCircle size={16} /> {msg}
                    </div>
                  )}

                  {/* 1. Booking ID Validation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Booking ID</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 64a7f..." 
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Found in your confirmation email.</p>
                  </div>

                  {/* 2. Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                    <div className="flex gap-2">
                      <RatingStars rating={rating} setRating={setRating} interactive={true} />
                      <span className="text-sm text-gray-500 ml-2">({rating}/5)</span>
                    </div>
                  </div>

                  {/* 3. Comment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                    <textarea 
                      required
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="How was your trip?"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-700 transition disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Verifying...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Testimonials;