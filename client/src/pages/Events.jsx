import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Filter State
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events');
        if (res.data.success) {
          setEvents(res.data.data);
          setFilteredEvents(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Could not load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle Filtering & Search
  useEffect(() => {
    let result = events;

    // Filter by Tab
    if (activeTab !== 'all') {
      result = result.filter(e => e.category.toLowerCase() === activeTab.toLowerCase());
    }

    // Filter by Search Query
    if (search.trim() !== '') {
      result = result.filter(e => 
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.subCategory.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredEvents(result);
  }, [search, activeTab, events]);

  const handleRegisterClick = (eventId) => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=register&event=${eventId}`);
    } else {
      navigate(`/register?event=${eventId}`);
    }
  };

  const tabs = [
    { id: 'all', label: 'All Arenas' },
    { id: 'technical', label: 'Technical' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'sports', label: 'Sports' }
  ];

  return (
    <div className="relative min-h-screen bg-dots grid-cyber overflow-hidden cyber-scanlines">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full cyber-mesh-glow -z-10 animate-float pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[550px] h-[550px] rounded-full cyber-mesh-glow-teal -z-10 animate-float pointer-events-none" style={{ animationDelay: '-5s' }}></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="px-3.5 py-1 text-[9px] uppercase font-black tracking-widest text-tealAccent border border-tealAccent/20 rounded bg-tealAccent/5 mb-4 inline-block shadow-[0_0_12px_rgba(0,229,255,0.05)]">
            PIEMR Battles
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight mb-4">
            FEST <span className="bg-gradient-to-r from-amberAccent to-tealAccent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,176,0,0.15)] font-display">EVENTS</span>
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-amberAccent to-tealAccent mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-sm text-gray-400 font-medium">
            Search and register for technical hackathons, cultural bands, group dances, or competitive outdoor sports.
          </p>
        </div>

        {/* Search & Tabs Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          {/* Category Tabs */}
          <div className="flex space-x-2 bg-charcoal/40 p-1.5 rounded-xl border border-white/5 w-full md:w-auto overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-amberAccent text-obsidian shadow-[0_0_12px_rgba(255,176,0,0.25)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search arenas, rules, coordinates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full cyber-input cyber-input-teal px-5 py-3 text-sm text-white placeholder-gray-500"
            />
            <span className="absolute right-4 top-3.5 text-gray-500">
              <svg className="w-4 h-4 fill-current text-tealAccent" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-24">
            <div className="w-10 h-10 border-2 border-amberAccent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-black">Syncing digital grids...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 border border-red-500/20 bg-red-500/5 rounded-2xl max-w-xl mx-auto">
            <p className="text-red-400 font-bold mb-2">Sync Error</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-24 glass-panel border border-white/5 rounded-2xl max-w-2xl mx-auto">
            <p className="text-gray-400 font-medium">No active coordinates found matching your query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const isTech = event.category.toLowerCase() === 'technical';
              return (
                <div
                  key={event._id}
                  className={`cyber-card cyber-clip-y border border-white/5 flex flex-col justify-between relative group ${
                    isTech ? 'cyber-corner-box-amber' : 'cyber-corner-box'
                  }`}
                >
                  <div className="p-8">
                    {/* Event Category Badge */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-charcoal-light text-tealAccent border border-tealAccent/15 rounded">
                        {event.subCategory}
                      </span>
                      <span className="text-[11px] text-amberAccent font-black font-mono tracking-wide glow-text-amber">
                        {event.fee === 0 ? 'FREE ADMISSION' : `Entry: ₹${event.fee}`}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 font-display">{event.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-6 font-medium">
                      {event.description}
                    </p>

                    {/* Event meta snippets */}
                    <div className="space-y-3 text-xs border-t border-white/5 pt-5">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-bold uppercase tracking-wider">Timeline:</span>
                        <span className="text-gray-300 font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-bold uppercase tracking-wider">Coordinate:</span>
                        <span className="text-gray-300 font-medium truncate max-w-[180px]">{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Event actions */}
                  <div className="bg-charcoal/30 border-t border-white/5 p-5 flex gap-4">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="flex-1 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-300 text-xs font-black uppercase tracking-wider rounded transition-all duration-300"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRegisterClick(event._id)}
                      className="flex-1 py-3 bg-amberAccent hover:bg-tealAccent text-obsidian text-xs font-black uppercase tracking-wider rounded shadow-md shadow-amberAccent/5 hover:shadow-tealAccent/20 transition-all duration-300"
                    >
                      Secure Pass
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details Overlay Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md transition-opacity duration-300">
          <div className="glass-panel-amber border border-amberAccent/20 cyber-clip-x max-w-2xl w-full p-8 md:p-10 max-h-[85vh] overflow-y-auto relative shadow-2xl cyber-corner-box-amber">
            {/* Close button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl focus:outline-none transition-colors duration-200"
            >
              &times;
            </button>

            {/* Modal Title */}
            <div className="mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-tealAccent border border-tealAccent/20 rounded bg-tealAccent/5 px-2.5 py-1">
                {selectedEvent.category} // {selectedEvent.subCategory}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 font-display">
                {selectedEvent.title}
              </h2>
              <div className="w-16 h-[2px] bg-amberAccent mt-3"></div>
            </div>

            {/* Modal Content */}
            <div className="space-y-8 text-sm text-gray-300 leading-relaxed font-medium">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">{selectedEvent.description}</p>

              {/* Event details parameters */}
              <div className="grid grid-cols-2 gap-4 bg-charcoal/40 border border-white/5 rounded p-5">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block font-bold mb-1">Registration Fee</span>
                  <span className="text-base font-black text-white font-mono">{selectedEvent.fee === 0 ? 'Free Entry' : `₹${selectedEvent.fee}`}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block font-bold mb-1">Prize pool</span>
                  <span className="text-base font-black text-amberAccent drop-shadow-[0_0_10px_rgba(255,176,0,0.2)] font-mono">{selectedEvent.prize || 'Certificates & Cups'}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block font-bold mb-1">Grid Size</span>
                  <span className="text-sm font-bold text-white">
                    {selectedEvent.teamSize === 1 ? 'Solo Arena' : `Team: Up to ${selectedEvent.teamSize}`}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block font-bold mb-1">Venue Coordinates</span>
                  <span className="text-sm font-bold text-white truncate block">{selectedEvent.venue}</span>
                </div>
              </div>

              {/* Rules List */}
              {selectedEvent.rules && selectedEvent.rules.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white font-black mb-3">CONSTRAINTS & COMPLIANCE</h4>
                  <ul className="space-y-2.5 text-xs text-gray-400 pl-1">
                    {selectedEvent.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-tealAccent mt-0.5 select-none">■</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Help contact */}
              <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs">
                <div>
                  <span className="text-gray-500 font-bold block uppercase tracking-wider mb-1">Arena Coordinator</span>
                  <span className="text-gray-300 font-black">{selectedEvent.contact}</span>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 md:flex-none px-6 py-3 border border-white/10 hover:border-white/20 text-gray-300 uppercase font-black tracking-wider rounded text-[10px] transition-colors duration-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleRegisterClick(selectedEvent._id);
                      setSelectedEvent(null);
                    }}
                    className="flex-1 md:flex-none px-8 py-3 bg-amberAccent hover:bg-tealAccent text-obsidian uppercase font-black tracking-wider rounded text-[10px] shadow-md shadow-amberAccent/10 transition-colors duration-200"
                  >
                    Register Arena
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Events;
