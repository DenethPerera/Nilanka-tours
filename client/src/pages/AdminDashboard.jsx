import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import moment from 'moment';
import { LogOut, Image, CalendarDays, ListOrdered, MessageSquare, Trash2, CheckCircle } from 'lucide-react'; 
import toast from 'react-hot-toast';

import Navbar from '../components/Navbar';
import AdminPhotoUploadPanel from '../components/AdminPhotoUploadPanel'; 

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]); // 🔥 State for Reviews
  const [calendarDates, setCalendarDates] = useState([]);
  const [activeTab, setActiveTab] = useState('requests'); 
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/admin/login'; 
      return null;
    }
    return {
      headers: { 'x-auth-token': token }
    };
  };

  // Fetch Bookings AND Reviews
  const fetchData = async () => {
    const config = getAuthHeaders();
    if (!config) return;

    setLoading(true);
    try {
      // 1. Fetch Bookings
      const bookingRes = await axios.get('/api/bookings', config);
      setBookings(bookingRes.data);
      
      const confirmedDates = bookingRes.data
        .filter(b => b.status === 'Confirmed')
        .map(b => moment(b.date).format('YYYY-MM-DD'));
      setCalendarDates(confirmedDates);

      // 2. Fetch Admin Reviews (Pending & Approved)
      const reviewRes = await axios.get('/api/reviews/admin', config);
      setReviews(reviewRes.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/admin/login'; 
      }
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Booking Actions
  const updateStatus = async (id, status) => {
    const config = getAuthHeaders();
    try {
      await axios.patch(`/api/bookings/${id}`, { status }, config);
      toast.success(`Booking ${status}`);
      fetchData(); 
    } catch (error) {
      toast.error("Error updating booking");
    }
  };

  // Review Actions
  const approveReview = async (id) => {
    const config = getAuthHeaders();
    try {
        await axios.patch(`/api/reviews/${id}/approve`, {}, config);
        toast.success("Review Approved!");
        fetchData(); // Refresh list
    } catch (error) {
        toast.error("Failed to approve review");
    }
  };

  const deleteReview = async (id) => {
    if(!window.confirm("Are you sure you want to delete this review?")) return;
    
    const config = getAuthHeaders();
    try {
        await axios.delete(`/api/reviews/${id}`, config);
        toast.success("Review Deleted");
        fetchData();
    } catch (error) {
        toast.error("Failed to delete review");
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      if (calendarDates.includes(formattedDate)) {
        return 'bg-red-400 text-white font-bold rounded-full'; 
      }
    }
  };

  const pendingRequests = bookings.filter(b => b.status === 'Pending');
  const pendingReviews = reviews.filter(r => !r.isApproved); // Count pending reviews

  if (loading) {
    return (
        <>
            <Navbar />
            <div className="text-center mt-40 text-gray-600 text-xl">Loading Dashboard...</div>
        </>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="container mx-auto p-8 pt-28">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors shadow-md">
            <LogOut size={20} /> Logout
          </button>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 border-b border-gray-200 mb-8">
          <button onClick={() => setActiveTab('requests')} className={`flex items-center gap-2 py-3 px-6 font-semibold rounded-t-lg transition-colors ${activeTab === 'requests' ? 'bg-white border-b-2 border-emerald-600 text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-emerald-500 hover:bg-white/50'}`}>
            <ListOrdered size={20} /> Requests 
            {pendingRequests.length > 0 && <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingRequests.length}</span>}
          </button>

          <button onClick={() => setActiveTab('calendar')} className={`flex items-center gap-2 py-3 px-6 font-semibold rounded-t-lg transition-colors ${activeTab === 'calendar' ? 'bg-white border-b-2 border-emerald-600 text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-emerald-500 hover:bg-white/50'}`}>
            <CalendarDays size={20} /> Availability
          </button>

          <button onClick={() => setActiveTab('gallery')} className={`flex items-center gap-2 py-3 px-6 font-semibold rounded-t-lg transition-colors ${activeTab === 'gallery' ? 'bg-white border-b-2 border-emerald-600 text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-emerald-500 hover:bg-white/50'}`}>
            <Image size={20} /> Gallery Uploads
          </button>

          {/* 🔥 NEW REVIEWS TAB */}
          <button onClick={() => setActiveTab('reviews')} className={`flex items-center gap-2 py-3 px-6 font-semibold rounded-t-lg transition-colors ${activeTab === 'reviews' ? 'bg-white border-b-2 border-emerald-600 text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-emerald-500 hover:bg-white/50'}`}>
            <MessageSquare size={20} /> Reviews
            {pendingReviews.length > 0 && <span className="ml-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingReviews.length}</span>}
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm min-h-[400px]">
            
            {/* ... Existing Requests Tab ... */}
            {activeTab === 'requests' && (
                <div className="overflow-x-auto">
                {pendingRequests.length > 0 ? (
                    <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                        <th className="py-3 px-4 text-left font-semibold text-gray-600">Customer</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-600">Date</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-600">Tour</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequests.map((booking) => (
                        <tr key={booking._id} className="border-b hover:bg-yellow-50 transition-colors">
                            <td className="py-4 px-4">
                            <div className="font-bold text-gray-800">{booking.customerName}</div>
                            <div className="text-sm text-gray-500">{booking.phone}</div>
                            </td>
                            <td className="py-4 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                            <td className="py-4 px-4">{booking.tourId?.title || 'Custom'}</td>
                            <td className="py-4 px-4 flex gap-2">
                            <button onClick={() => updateStatus(booking._id, 'Confirmed')} className="bg-emerald-500 text-white text-sm px-4 py-2 rounded hover:bg-emerald-600 transition-colors">Confirm</button>
                            <button onClick={() => updateStatus(booking._id, 'Rejected')} className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition-colors">Reject</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <div className="text-center py-10"><p className="text-gray-500 text-lg">No new booking requests. ✅</p></div>
                )}
                </div>
            )}

            {/* ... Existing Calendar Tab ... */}
            {activeTab === 'calendar' && (
                <div className="max-w-xl mx-auto">
                    <h3 className="text-xl font-bold mb-6 text-center text-gray-800">Confirmed Booking Schedule</h3>
                    <div className="flex justify-center"><Calendar tileClassName={tileClassName} value={new Date()} className="shadow-lg rounded-lg border-0 p-4"/></div>
                </div>
            )}

            {/* ... Existing Gallery Tab ... */}
            {activeTab === 'gallery' && (
                <div className="max-w-2xl mx-auto py-8">
                    <h3 className="text-xl font-bold mb-6 text-center text-gray-800">Upload New Photos</h3>
                    <AdminPhotoUploadPanel onUploadSuccess={() => console.log("Uploaded")} />
                </div>
            )}

            {/* 🔥 NEW REVIEWS TAB CONTENT */}
            {activeTab === 'reviews' && (
                 <div className="overflow-x-auto">
                 {reviews.length > 0 ? (
                     <table className="min-w-full">
                     <thead className="bg-gray-100">
                         <tr>
                         <th className="py-3 px-4 text-left font-semibold text-gray-600">Client</th>
                         <th className="py-3 px-4 text-left font-semibold text-gray-600">Rating</th>
                         <th className="py-3 px-4 text-left font-semibold text-gray-600">Comment</th>
                         <th className="py-3 px-4 text-left font-semibold text-gray-600">Status</th>
                         <th className="py-3 px-4 text-left font-semibold text-gray-600">Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                         {reviews.map((review) => (
                         <tr key={review._id} className={`border-b transition-colors ${review.isApproved ? 'bg-white' : 'bg-yellow-50'}`}>
                             <td className="py-4 px-4 font-bold text-gray-800">{review.customerName}</td>
                             <td className="py-4 px-4 text-yellow-500 font-bold">{review.rating}/5</td>
                             <td className="py-4 px-4 text-sm text-gray-600 max-w-xs truncate" title={review.comment}>{review.comment}</td>
                             <td className="py-4 px-4">
                                {review.isApproved ? 
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">Approved</span> : 
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">Pending</span>
                                }
                             </td>
                             <td className="py-4 px-4 flex gap-2">
                                {!review.isApproved && (
                                    <button onClick={() => approveReview(review._id)} className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600" title="Approve">
                                        <CheckCircle size={16} />
                                    </button>
                                )}
                                <button onClick={() => deleteReview(review._id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600" title="Delete">
                                    <Trash2 size={16} />
                                </button>
                             </td>
                         </tr>
                         ))}
                     </tbody>
                     </table>
                 ) : (
                     <div className="text-center py-10"><p className="text-gray-500 text-lg">No reviews found.</p></div>
                 )}
                 </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;