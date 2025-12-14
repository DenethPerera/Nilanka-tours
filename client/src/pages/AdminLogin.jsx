import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn } from 'lucide-react';

const AdminLogin = () => {
    // 🔥 FIX 1: Revert state back to 'username'
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 🔥 FIX 2: Send 'username' instead of 'email' in the payload
            const res = await axios.post('/api/auth/login', {
                username, 
                password
            });

            localStorage.setItem('token', res.data.token);
            navigate('/admin'); 

        } catch (err) {
            const errMsg = err.response?.data?.msg || 'Login failed. Check credentials.';
            setError(errMsg);
            console.error('Login Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <Lock size={40} className="mx-auto text-emerald-600 mb-3" />
                    <h1 className="text-3xl font-bold text-gray-800">Tour Guide Login</h1>
                    <p className="text-gray-500">Access to Booking Dashboard</p>
                </div>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        {/* 🔥 FIX 3: Input field uses 'username' state and type 'text' */}
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" 
                               value={username} 
                               onChange={(e) => setUsername(e.target.value)}
                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                               placeholder="Enter your guide username"
                               required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" 
                               value={password} 
                               onChange={(e) => setPassword(e.target.value)}
                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                               placeholder="••••••••"
                               required />
                    </div>
                    
                    <button type="submit" 
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Logging in...' : (
                            <>
                                <LogIn size={20} /> Login
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;