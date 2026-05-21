import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-amberAccent font-bold glow-text-amber relative after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-amberAccent after:shadow-[0_0_8px_#FFB000]'
      : 'text-gray-300 hover:text-tealAccent transition-colors duration-200 relative';
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 backdrop-blur-md px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-amberAccent to-tealAccent bg-clip-text text-transparent group-hover:glow-text-teal transition-all duration-300">
            URJOTSAV
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-charcoal border border-amberAccent/30 rounded text-amberAccent group-hover:border-tealAccent group-hover:text-tealAccent transition-colors duration-300">
            PIEMR
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`pb-1 text-sm tracking-wide font-semibold ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/events" className={`pb-1 text-sm tracking-wide font-semibold ${isActive('/events')}`}>
            Events
          </Link>
          <Link to="/contact" className={`pb-1 text-sm tracking-wide font-semibold ${isActive('/contact')}`}>
            Contact
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`pb-1 text-sm tracking-wide font-semibold ${isActive('/dashboard')}`}
            >
              My Passes
            </Link>
          )}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className={`pb-1 text-sm tracking-wide font-semibold ${isActive('/admin')}`}
            >
              Admin Panel
            </Link>
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end text-right">
                <span className="text-sm font-semibold text-gray-200">{user?.name}</span>
                <span className="text-[10px] text-tealAccent font-bold uppercase tracking-wider">{user?.role}</span>
              </div>
              <button
                onClick={handleLogout}
                className="cyber-clip-btn px-4 py-2 bg-red-500/10 border border-red-500/30 hover:border-red-500 hover:bg-red-500/20 text-red-400 text-xs font-black uppercase tracking-wider transition-all duration-300"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="cyber-btn cyber-clip-btn px-6 py-2.5 bg-amberAccent hover:bg-tealAccent text-obsidian font-black uppercase text-xs tracking-wider transition-all duration-300 transform hover:scale-102 shadow-[0_0_15px_rgba(255,176,0,0.15)] hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]"
            >
              Portal Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-amberAccent focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.828 4.828 4.829z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/5 flex flex-col space-y-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-amberAccent text-sm font-semibold tracking-wide"
          >
            Home
          </Link>
          <Link
            to="/events"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-amberAccent text-sm font-semibold tracking-wide"
          >
            Events
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-amberAccent text-sm font-semibold tracking-wide"
          >
            Contact
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-amberAccent text-sm font-semibold tracking-wide"
            >
              My Passes
            </Link>
          )}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-amberAccent text-sm font-semibold tracking-wide"
            >
              Admin Panel
            </Link>
          )}
          {isAuthenticated ? (
            <div className="pt-2 border-t border-white/5 flex flex-col space-y-3">
              <span className="text-sm font-bold text-tealAccent">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="w-full text-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2.5 bg-amberAccent hover:bg-tealAccent text-obsidian font-black uppercase rounded text-xs tracking-wider transition-all duration-200"
            >
              Portal Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
