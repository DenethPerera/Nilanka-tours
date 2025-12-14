import React, { useState } from 'react';
import axios from '../api/axios';
import { Upload, Loader2, ImagePlus } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPhotoUploadPanel = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        
        // 1. Validation Check
        if (!file) return toast.error("Please select a photo.");
        if (!category) return toast.error("Please select a category."); // Added category validation

        setLoading(true);
        
        // 2. Prepare FormData
        const formData = new FormData();
        formData.append('image', file); // The field name 'image' MUST match .single('image') in galleryRoutes.js
        formData.append('category', category);

        try {
            const token = localStorage.getItem('token');
            
            // 3. API Call with FormData and Auth Token
            await axios.post('/api/gallery', formData, {
                headers: { 
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data' // Explicitly set for file uploads
                }
            });
            
            // Success Feedback
            toast.success("Photo uploaded successfully!");
            setFile(null);
            setCategory('');
            onUploadSuccess(); // Refresh the Gallery component to show the new image
            
        } catch (err) {
            // Error Handling Improvement: Check for a message from the server
            const errorMessage = err.response?.data?.msg || "Upload failed. Check server logs (Render) for details.";
            
            console.error("Upload Error:", err);
            toast.error(errorMessage);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border-2 border-dashed border-cyan-200 rounded-xl p-6 mb-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4 text-cyan-700">
                <ImagePlus size={24} />
                <h3 className="font-bold text-lg">Admin Upload Panel</h3>
            </div>
            
            <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4 items-center">
                
                {/* File Input */}
                <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-cyan-50 file:text-cyan-700
                        hover:file:bg-cyan-100"
                    accept="image/*"
                />
                
                {/* Category Selection */}
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg text-sm w-full sm:w-auto focus:ring-2 focus:ring-cyan-500 outline-none"
                >
                    <option value="">Select Category</option>
                    <option value="Day Tour">Day Tour</option>
                    <option value="Round Tour">Round Tour</option>
                    <option value="Clients">Our Clients</option>
                </select>

                {/* Upload Button */}
                <button 
                    type="submit" 
                    disabled={loading || !file || !category} // Disable if no file or category is selected
                    className="w-full sm:w-auto px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                    Upload
                </button>
            </form>
            
            {/* Display selected file name (Optional: for better UX) */}
            {file && <p className="mt-2 text-xs text-gray-600">Selected File: **{file.name}**</p>}

        </div>
    );
};

export default AdminPhotoUploadPanel;