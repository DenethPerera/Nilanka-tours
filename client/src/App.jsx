// App.jsx (Your main router file)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

// Components and Pages
import HomePage from './pages/Home'; // Example Public Page
import AdminDashboard from './pages/AdminDashboard'; // The component you provided
import AdminLogin from './pages/AdminLogin'; // The new Login Page
import PrivateRoute from './components/PrivateRoute';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery'; // The new protection component

function App() {
  return (
    <Router>
        <Toaster position="top-center" reverseOrder={false} />
        
        <Routes>
            {/* 1. Public Route */}
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* 2. Admin Login Route (Publicly accessible) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* 3. Protected Dashboard Route (CRITICAL CHANGE) */}
            <Route 
                path="/admin" 
                element={
                    <PrivateRoute>
                        <AdminDashboard />
                    </PrivateRoute>
                } 
            />
        </Routes>
    </Router>
  );
}

export default App;