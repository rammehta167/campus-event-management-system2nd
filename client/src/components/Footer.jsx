import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-wider bg-gradient-to-r from-amberAccent to-tealAccent bg-clip-text text-transparent">
            URJOTSAV 2026
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            The annual techno-cultural and innovation festival of PIEMR. Witnessing technological benchmarks and aesthetic cultural integrations.
          </p>
          <div className="flex space-x-4">
            <span className="text-[11px] font-semibold text-gray-400 bg-obsidian border border-white/10 px-3 py-1 rounded">
              #Urjotsav2k26
            </span>
            <span className="text-[11px] font-semibold text-gray-400 bg-obsidian border border-white/10 px-3 py-1 rounded">
              #PIEMR
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-amberAccent font-black text-xs uppercase tracking-widest mb-4 border-b border-amberAccent/20 pb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-amberAccent"></span> Quick Navigation
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link to="/" className="hover:text-tealAccent transition-colors duration-200">
                Home Page
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-tealAccent transition-colors duration-200">
                Fest Events
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-tealAccent transition-colors duration-200">
                Get In Touch
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-tealAccent transition-colors duration-200">
                Student & Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Address Column */}
        <div>
          <h4 className="text-tealAccent font-black text-xs uppercase tracking-widest mb-4 border-b border-tealAccent/20 pb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-tealAccent animate-pulse"></span> Organizing Institute
          </h4>
          <p className="text-sm text-gray-400 font-semibold mb-2">
            Prestige Institute of Engineering Management and Research (PIEMR)
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Prestige Vihar, Vijay Nagar, Scheme No. 74C,<br />
            Indore – 452010,<br />
            Madhya Pradesh, India
          </p>
        </div>

        {/* Contacts Column */}
        <div>
          <h4 className="text-amberAccent font-black text-xs uppercase tracking-widest mb-4 border-b border-amberAccent/20 pb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-amberAccent"></span> Helpdesk & Queries
          </h4>
          <ul className="space-y-2 text-xs text-gray-400 leading-relaxed">
            <li>
              <span className="font-bold text-gray-300">Email:</span> urjotsav@piemr.edu.in
            </li>
            <li>
              <span className="font-bold text-gray-300">Call Support:</span> +91 731-4013000
            </li>
            <li>
              <span className="font-bold text-gray-300">Timings:</span> 09:00 AM - 05:00 PM
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; 2026 PIEMR Indore. All rights reserved.</p>
        <p className="mt-2 md:mt-0 flex items-center space-x-1"></p>
      </div>
    </footer>
  );
};

export default Footer;
