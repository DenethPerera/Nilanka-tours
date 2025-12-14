import React, { useState } from 'react';
import axios from '../api/axios';

const BookingForm = ({ tourId }) => {
  const [formData, setFormData] = useState({
    customerName: '', email: '', phone: '', date: '', guests: 1, specialRequests: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bookings', { ...formData, tourId });
      setSubmitted(true);
    } catch (error) {
      alert("Error sending request");
    }
  };

  if (submitted) return (
    <div className="bg-green-100 p-6 rounded text-center text-green-700">
      <h3 className="text-xl font-bold">Request Sent!</h3>
      <p>I will review your dates and confirm via WhatsApp/Email shortly.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-4">Request to Book</h3>
      
      <div className="mb-4">
        <label className="block text-gray-700">Full Name</label>
        <input type="text" className="w-full border p-2 rounded" 
               onChange={(e) => setFormData({...formData, customerName: e.target.value})} required />
      </div>

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
            <label className="block text-gray-700">Date</label>
            <input type="date" className="w-full border p-2 rounded" 
                onChange={(e) => setFormData({...formData, date: e.target.value})} required />
        </div>
        <div className="w-1/2">
            <label className="block text-gray-700">Guests</label>
            <input type="number" min="1" className="w-full border p-2 rounded" 
                onChange={(e) => setFormData({...formData, guests: e.target.value})} required />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">WhatsApp / Phone</label>
        <input type="text" className="w-full border p-2 rounded" 
               onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
        Send Booking Request
      </button>
      <p className="text-xs text-gray-500 mt-2 text-center">*No payment required now. Confirmation is subject to availability.</p>
    </form>
  );
};

export default BookingForm;