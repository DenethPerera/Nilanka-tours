import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation(); // දැනට ඉන්න page එක බලාගන්න

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isAuthenticated = localStorage.getItem('token');

    // 🔥 Links Array එක පිළිවෙලට හදාගමු
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Destinations', path: '/#destinations' }, // Home page එකේ section එකකට
        { name: 'Tours', path: '/#tours' },               // Home page එකේ section එකකට
        { name: 'Gallery', path: '/gallery' },            // වෙනම Page එකක්
        { name: 'Contact', path: '/contact' }             // 🔥 වෙනම Page එකක්
    ];

    // Link එකක් Click කලහම වෙන්න ඕන දේ (Scroll or Navigate)
    const handleNavClick = (path) => {
        setIsOpen(false); // Mobile menu එක වහන්න
        
        // Hash link එකක් නම් (# වලින් පටන් ගන්න), අදාල තැනට scroll කරන්න
        if (path.includes('#')) {
            const elementId = path.split('#')[1];
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                // වෙන page එකක ඉඳන් එනවා නම් Home එකට යන්න
                window.location.href = path; 
            }
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isOpen || location.pathname !== '/' ? 'bg-emerald-900/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-4 md:py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                
                {/* Logo */}
                <div className="flex items-center">
                    <Leaf className="h-6 w-6 md:h-8 md:w-8 text-emerald-400 mr-2" />
                    <Link to="/" className="text-xl md:text-2xl font-bold text-white tracking-wider">
                        Nilanka <span className="text-emerald-400">Travels</span>
                    </Link>
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((item) => (
                        item.path.includes('#') ? (
                            // Home Page Sections (Anchor Tags via Helper)
                            <a 
                                key={item.name} 
                                href={item.path}
                                className="text-white hover:text-emerald-400 transition-colors text-sm font-medium uppercase tracking-wide cursor-pointer"
                            >
                                {item.name}
                            </a>
                        ) : (
                            // Separate Pages (Router Links)
                            <Link 
                                key={item.name} 
                                to={item.path} 
                                className="text-white hover:text-emerald-400 transition-colors text-sm font-medium uppercase tracking-wide"
                            >
                                {item.name}
                            </Link>
                        )
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="hidden md:block">
                    {isAuthenticated ? (
                        <Link to="/admin" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all shadow-lg font-medium">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/contact"> {/* Book Now එකත් Contact page එකට යවමු */}
                                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full transition-all shadow-lg font-medium">
                                    Book Now
                                </button>
                            </Link>
                            <Link to="/admin/login" className="ml-4 text-sm text-gray-300 hover:text-emerald-400 font-medium">
                                Guide Login
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            <div className={`md:hidden absolute w-full bg-emerald-900 border-t border-emerald-800 shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-4 pt-4 pb-6 space-y-2">
                    {navItems.map((item) => (
                         item.path.includes('#') ? (
                            <a 
                                key={item.name} 
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 text-white hover:bg-emerald-800 rounded-lg text-center font-medium"
                            >
                                {item.name}
                            </a>
                        ) : (
                            <Link 
                                key={item.name} 
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 text-white hover:bg-emerald-800 rounded-lg text-center font-medium"
                            >
                                {item.name}
                            </Link>
                        )
                    ))}
                    
                    {isAuthenticated ? (
                        <Link to="/admin" onClick={() => setIsOpen(false)} className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg font-bold shadow-md block text-center">
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/admin/login" onClick={() => setIsOpen(false)} className="w-full mt-4 bg-gray-500 text-white py-3 rounded-lg font-bold shadow-md block text-center">
                            Admin Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;