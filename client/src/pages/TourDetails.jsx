import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import BookingForm from '../components/BookingForm';

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    // Fetch single tour data
    axios.get(`/api/tours/${id}`) // Note: You might need to add this route to backend if it's missing!
      .then(res => setTour(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!tour) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Tour Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <img src={tour.image} alt={tour.title} className="w-full h-96 object-cover" />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
          <p className="text-gray-600 text-lg mb-4">{tour.duration} | {tour.locations.join(', ')}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">
             {tour.price ? `$${tour.price} per person` : 'Contact for Price'}
          </p>
          
          <h3 className="text-2xl font-bold mb-3">Itinerary & Details</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
            {tour.description}
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-700 font-bold">Interested in this tour?</p>
          <p className="text-blue-600 text-sm">Fill out the form below. No payment required. I will contact you to confirm dates.</p>
        </div>
        <BookingForm tourId={tour._id} />
      </div>
    </div>
  );
};

export default TourDetails;