import React, { useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-hot-toast'; // Assuming you use react-hot-toast for messages

// Note: You need to replace this placeholder image URL 
const PACKAGE_IMAGE_URL = 'https://i.pinimg.com/736x/4a/f9/60/4af960759257b44d40b4b88b1bc48916.jpg'; 

const BookingSection = () => {
    const [selectedPackage, setSelectedPackage] = useState('6_days');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        adults: 2,
        children: 0,
        startDate: '',
        customizationDetails: ''
    });
    const [loading, setLoading] = useState(false);

    // Static package details for display purposes
    const mainPackage = {
        title: "6 Days Epic Sri Lanka Explorer",
        pricePerDay: 60,
        totalTransport: 360,
        inclusions: [
            { text: "Private Driver/Guide" },
            { text: "Driver's Food" },
            { text: "Driver's Accommodation" },
            { text: "Highway Tolls & Parking" },
            { text: "Fuel/Gas" }
        ],
        description: "5 Nights / 6 Days Tour covering Kandy, Nuwara Eliya, & Ella."
    };
    
    // Handle form input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend = {
            name: formData.name,
            email: formData.email,
            adults: parseInt(formData.adults),
            children: parseInt(formData.children),
            startDate: formData.startDate,
            packageOption: selectedPackage,
            customizationDetails: formData.customizationDetails,
        };

        try {
            // API call to your Express backend
            await axios.post('/api/bookings', dataToSend);
            
            // Success feedback
            toast.success("Booking inquiry sent! Check your email for confirmation."); 
            // Reset form
            setFormData({ name: '', email: '', adults: 2, children: 0, startDate: '', customizationDetails: '' });
            setSelectedPackage('6_days');

        } catch (error) {
            console.error("Submission Error:", error);
            const errMsg = error.response?.data?.message || "Failed to send inquiry. Please check your server connection.";
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 md:py-24 bg-gray-50" id="booking">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Start Your Adventure</h2>
                    <p className="text-lg text-gray-600 mt-2">Customize Your Trip or Select Our Exclusive Package</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* 1. Package Summary (LEFT COLUMN - RESTORED DESIGN) */}
                    <div className="lg:col-span-1 bg-emerald-900 rounded-xl shadow-2xl text-white h-fit lg:sticky lg:top-10 overflow-hidden">
                        
                        {/* Image Container */}
                        <div className="relative h-64">
                            <img 
                                src={PACKAGE_IMAGE_URL} 
                                alt="Sri Lanka Tour Road" 
                                className="w-full h-full object-cover brightness-75"
                            />
                            <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                ALL INCLUSIVE TRANSPORT
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="p-6">
                            <h3 className="text-3xl font-extrabold mb-4 leading-tight">{mainPackage.title}</h3>
                            
                            {/* Pricing */}
                            <div className="mb-4">
                                <p className="text-5xl font-extrabold text-emerald-400 leading-none inline-block align-bottom">
                                    $ {mainPackage.pricePerDay}
                                </p>
                                <span className="text-lg font-light ml-2 text-emerald-100">USD per day</span>
                                
                                <p className="mt-2 text-xl font-bold text-white border-t border-emerald-700 pt-3">
                                    Total: $ {mainPackage.totalTransport} 
                                    <span className="text-base font-normal ml-1 text-emerald-200">(for 6 days)</span>
                                </p>
                            </div>
                            
                            <p className="text-sm font-light mb-5">{mainPackage.description}</p>

                            <h4 className="font-semibold mb-2 text-emerald-100 uppercase tracking-wider">What's Included:</h4>
                            
                            {/* Inclusions List (Styled Checkmarks) */}
                            <ul className="space-y-2 text-sm">
                                {mainPackage.inclusions.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-6 pt-4 border-t border-emerald-700 text-xs font-light italic">
                                * Note: This rate covers the vehicle & driver services only. Food and accommodation for the driver are handled by Sajith.
                            </p>
                        </div>
                    </div>

                    {/* 2. Booking Form (RIGHT COLUMNS - FUNCTIONAL) */}
                    <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-xl shadow-2xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Your Booking Details</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Package Selection Dropdown */}
                            <div>
                                <label htmlFor="package_select" className="block text-sm font-medium text-gray-700">Select Your Tour Option <span className="text-red-500">*</span></label>
                                <select 
                                    id="package_select" 
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white appearance-none"
                                    value={selectedPackage}
                                    onChange={(e) => setSelectedPackage(e.target.value)}
                                    required
                                >
                                    <option value="6_days">{mainPackage.title} (5 Nights / 6 Days)</option>
                                    <option value="customize">Customized Tour / Own Itinerary</option>
                                </select>
                            </div>

                            {/* Row 1: Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" id="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" required />
                                </div>
                            </div>

                            {/* Row 2: Guests and Date */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="adults" className="block text-sm font-medium text-gray-700">Adults (12+)</label>
                                    <input type="number" id="adults" min="1" value={formData.adults} onChange={handleChange} className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" required />
                                </div>
                                <div>
                                    <label htmlFor="children" className="block text-sm font-medium text-gray-700">Children (0-11)</label>
                                    <input type="number" id="children" min="0" value={formData.children} onChange={handleChange} className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                                </div>
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Preferred Start Date</label>
                                    <input type="date" id="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" required />
                                </div>
                            </div>
                            
                            {/* Row 3: Customization/Special Request Field */}
                            <div>
                                <label htmlFor="customizationDetails" className="block text-sm font-medium text-gray-700">
                                    {selectedPackage === 'customize' ? 
                                        `Tell me your requirements (I will help you plan the trip based on your needs!)` 
                                        : 
                                        `Customization or Additional Requests`}
                                </label>
                                <textarea 
                                    id="customizationDetails" 
                                    rows="3" 
                                    value={formData.customizationDetails}
                                    onChange={handleChange}
                                    placeholder={selectedPackage === 'customize' ? 
                                                 "I'm interested in a 10-day tour covering Anuradhapura and Jaffna, with budget accommodation." 
                                                 : 
                                                 "Dietary needs, preferred hotels, flight details, or any changes to the 6-day itinerary."} 
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-wait">
                                {loading ? 'Sending Inquiry...' : 'Send Booking Inquiry (No Obligation)'}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BookingSection;