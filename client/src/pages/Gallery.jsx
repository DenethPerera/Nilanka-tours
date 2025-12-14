import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { ArrowUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminPhotoUploadPanel from '../components/AdminPhotoUploadPanel';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const isAuthenticated = localStorage.getItem('token'); // Admin check

    // Fetch Images from Backend
    const fetchImages = async () => {
        try {
            const res = await axios.get('/api/gallery');
            setImages(res.data);
        } catch (err) {
            console.error("Error fetching images:", err);
        }
    };

    useEffect(() => {
        fetchImages();

        // Scroll Handler
        const handleScroll = () => {
            if (window.scrollY > 300) setShowScrollTop(true);
            else setShowScrollTop(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-white py-24 sm:py-32 font-sans" id="gallery-top">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-10 sm:mb-16">
                    <div className="flex items-center justify-center mb-3">
                        <span className="w-10 h-px bg-cyan-600 mr-3 hidden sm:block"></span>
                        <h2 className="text-sm font-medium tracking-widest uppercase text-cyan-600">
                            Our Gallery
                        </h2>
                        <span className="w-10 h-px bg-cyan-600 ml-3 hidden sm:block"></span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                        Tourism & Traveling Gallery.
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-gray-600 leading-relaxed">
                        Explore stunning photos of breathtaking destinations and unforgettable moments from our tours.
                    </p>
                </div>

                {/* 🔥 Admin Upload Section (Only visible if logged in) */}
                {isAuthenticated && (
                    <AdminPhotoUploadPanel onUploadSuccess={fetchImages} />
                )}

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {images.length > 0 ? (
                        images.map((item) => (
                            <div key={item._id} className="rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl">
                                <div className="relative pt-[100%] w-full bg-gray-100"> {/* Square Aspect Ratio */}
                                    <img
                                        // 🔥 FIX 1: Use the full Cloudinary URL and force HTTPS to fix Mixed Content
                                        src={item.imageUrl.replace('http:', 'https:')} 
                                        alt={item.category}
                                        className="absolute top-0 left-0 w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    {/* Category Badge */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                        <span className="text-white text-xs font-semibold px-2 py-1 bg-cyan-600 rounded-full">
                                            {item.category || 'Tour'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-400">
                            <p>No photos uploaded yet. Admin can upload photos using the panel above.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-700 transition z-50"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            )}
        </div>
        <Footer />
        </>
    );
};

export default Gallery;