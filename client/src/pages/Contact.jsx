import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar'; // Navbar එක import කරන්න
import Footer from '../components/Footer'; // Footer එක import කරන්න

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  // .env file එකෙන් විස්තර ලබා ගැනීම (Vite භාවිතා කරන නිසා import.meta.env)
  const contactDetails = {
    address: ['HPT Homes Seeduwe'], // ලිපිනය වෙනස් නම් env එකට දාගන්න පුළුවන්
    phone: import.meta.env.VITE_CONTACT_PHONE || '+94 75 6000 850',
    email: import.meta.env.VITE_CONTACT_EMAIL || 'dilshan.goldenvoyages@gmail.com'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend API එකට data යැවීම
      await axios.post('/api/contact', formData);
      
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Form එක clear කිරීම

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reusable Item Component
  const ContactInfoItem = ({ icon: Icon, title, details }) => (
    <div className="flex flex-col items-center p-6 text-center hover:bg-gray-50 transition-colors rounded-lg">
      <div className="p-4 bg-emerald-100 rounded-full mb-3 text-emerald-600 shadow-sm">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mt-2">{title}</h3>
      <div className="text-gray-600 text-sm mt-1">
        {Array.isArray(details) ? details.map((line, index) => (
          <p key={index}>{line}</p>
        )) : <p>{details}</p>}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-8 font-sans">
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-3">
              <span className="w-10 h-px bg-emerald-600 mr-3 hidden sm:block"></span>
              <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-600">
                Contact Us
              </h2>
              <span className="w-10 h-px bg-emerald-600 ml-3 hidden sm:block"></span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Get in Touch With Us
            </h1>
          </div>

          {/* Main Content Card */}
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">

              {/* Left Column: Contact Details */}
              <div className="lg:col-span-1 p-8 bg-gray-50 border-b lg:border-r lg:border-b-0 flex flex-col justify-center">
                <div className="space-y-8">
                  <ContactInfoItem 
                    icon={MapPin} 
                    title="Address" 
                    details={contactDetails.address} 
                  />
                  <ContactInfoItem 
                    icon={Phone} 
                    title="Mobile" 
                    details={contactDetails.phone} 
                  />
                  <ContactInfoItem 
                    icon={Mail} 
                    title="Email" 
                    details={contactDetails.email} 
                  />
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-2 p-8 sm:p-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Send us a message</h2>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  Have questions about our tours or need a custom itinerary? Send us a message and our team will get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    required
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none"
                    required
                  ></textarea>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;