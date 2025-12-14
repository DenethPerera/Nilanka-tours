import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/About';
import Stats from '../components/Stats';
import FeaturedTours from '../components/FeaturedTours';
import BookingSection from '../components/BookingSection';
import WhyChooseUs from '../components/WhyChooseUs';
//import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section (Main Banner) */}
      <Hero />

      {/* Introduction / About Sri Lanka */}
      <AboutSection />

      {/* Statistics Counter */}
      <Stats />

      {/* Featured Tour Packages */}
      <FeaturedTours />

      <Testimonials />

      {/* Booking Form Section */}
      <BookingSection />

      {/* Why Choose Us Features */}
      <WhyChooseUs />

      {/* Newsletter Subscription */}
      

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;