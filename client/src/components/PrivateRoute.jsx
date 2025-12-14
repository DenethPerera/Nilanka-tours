// components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom'; // Assuming you use react-router-dom v6

// This component checks if the user is authenticated (has a token)
const PrivateRoute = ({ children }) => {
    // 1. Check for the token in local storage
    const token = localStorage.getItem('token');
    
    // 2. If a token exists, render the child component (the Dashboard)
    if (token) {
        return children;
    } 
    
    // 3. If no token exists, redirect the user to the login page
    // Note: We are using <Navigate> which is the modern way to redirect in React Router v6
    return <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;