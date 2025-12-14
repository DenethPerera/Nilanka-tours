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
        if (!file) return toast.error("Please select a photo.");

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file); // Backend එක බලාපොරොත්තු වන නම
        formData.append('category', category);

        try {
            const token = localStorage.getItem('token');
            
            await axios.post('/api/gallery', formData, {
                headers: { 'x-auth-token': token }
            });
            toast.success("Photo uploaded successfully!");
            setFile(null);
            setCategory('');
            onUploadSuccess(); // Gallery එක Refresh කරන්න
        } catch (err) {
            toast.error("Upload failed.");
            console.error(err);
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

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                    Upload
                </button>
            </form>
        </div>
    );
};

export default AdminPhotoUploadPanel;