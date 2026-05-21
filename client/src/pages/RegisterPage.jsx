import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const eventId = searchParams.get('event');

  // API states
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [teammates, setTeammates] = useState([]);

  // Fetch Event details
  useEffect(() => {
    if (!eventId) {
      setError('No event specified for registration.');
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${eventId}`);
        if (res.data.success) {
          setEvent(res.data.data);
          // Set teammate inputs length dynamically to (teamSize - 1)
          const teammatesLength = res.data.data.teamSize - 1;
          setTeammates(Array(teammatesLength).fill(''));
        } else {
          setError('Event not found.');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to fetch event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleTeammateChange = (index, value) => {
    const updated = [...teammates];
    updated[index] = value;
    setTeammates(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Clean teammates list by removing empty strings
    const cleanedTeammates = teammates.filter(t => t.trim() !== '');

    try {
      const res = await axios.post('/api/register', {
        event: eventId,
        teammates: cleanedTeammates
      });

      if (res.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || 'Registration failed. Please check details.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-dots grid-cyber flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-amberAccent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-black">Syncing form registry...</p>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="relative min-h-screen bg-dots grid-cyber flex items-center justify-center px-6">
        <div className="max-w-xl w-full text-center">
          <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-2xl mb-6">
            <p className="text-red-400 font-bold mb-2">Registry Error</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
          <Link to="/events" className="text-tealAccent hover:underline text-xs font-black uppercase tracking-widest">
            &larr; Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-dots grid-cyber overflow-hidden py-20 px-6 cyber-scanlines">
      
      {/* Decorative glows */}
      <div className="absolute top-[15%] left-[20%] w-[400px] h-[400px] rounded-full cyber-mesh-glow -z-10 animate-float pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[20%] w-[400px] h-[400px] rounded-full cyber-mesh-glow-teal -z-10 animate-float pointer-events-none" style={{ animationDelay: '-4s' }}></div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {success ? (
          // Success screen
          <div className="glass-panel-teal border border-tealAccent/20 p-8 md:p-12 cyber-clip-x text-center max-w-xl mx-auto shadow-2xl cyber-corner-box">
            <span className="w-16 h-16 bg-tealAccent/15 border border-tealAccent/40 text-tealAccent rounded-full flex items-center justify-center text-3xl mx-auto mb-8 shadow-lg shadow-tealAccent/5">
              ✓
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase mb-4 tracking-tight font-display">
              REGISTRATION CONFIRMED
            </h2>
            <div className="w-16 h-[2px] bg-tealAccent mx-auto mb-6"></div>
            <p className="text-sm text-gray-300 mb-8 leading-relaxed font-medium">
              Your pass for <span className="text-amberAccent font-bold">{event.title}</span> has been issued. You can view your holographic entrance ticket and QR code directly in your profile dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="cyber-btn cyber-clip-btn flex-1 py-3.5 bg-tealAccent hover:bg-amberAccent text-obsidian font-black uppercase tracking-wider text-xs text-center shadow-md shadow-tealAccent/5 hover:shadow-amberAccent/20 transition-all duration-300"
              >
                View Ticket Pass
              </Link>
              <Link
                to="/events"
                className="cyber-btn cyber-clip-btn flex-1 py-3.5 bg-charcoal border border-white/10 hover:border-white/20 text-gray-300 font-black uppercase tracking-wider text-xs text-center transition-all duration-300"
              >
                Explore Other Events
              </Link>
            </div>
          </div>
        ) : (
          // Registration Form
          <div className="glass-panel border border-white/10 cyber-clip-y shadow-2xl p-8 md:p-12 relative cyber-corner-box">
            
            <div className="border-b border-white/5 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-tealAccent border border-tealAccent/20 rounded bg-tealAccent/5 px-2.5 py-1">
                  Event Registration Portal
                </span>
                <h1 className="text-3xl font-extrabold text-white mt-4 uppercase font-display">
                  {event.title}
                </h1>
              </div>
              
              <div className="text-left md:text-right">
                <span className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Registration Fee</span>
                <span className="text-2xl font-mono font-black text-amberAccent drop-shadow-[0_0_10px_rgba(255,176,0,0.15)] glow-text-amber">
                  {event.fee === 0 ? 'FREE ADMISSION' : `₹${event.fee}`}
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-[11px] text-red-400 text-center font-bold">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Team Leader (Primary user details) */}
              <div className="bg-charcoal/40 border border-white/10 p-6 cyber-corner-box">
                <h3 className="text-xs uppercase font-extrabold text-tealAccent mb-5 tracking-wider font-display">
                  Team Leader / Primary User
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 block mb-1.5 font-bold">Full Name</span>
                    <span className="font-extrabold text-white block text-sm">{user?.name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 block mb-1.5 font-bold">College/Institute</span>
                    <span className="font-extrabold text-white block text-sm">{user?.college}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 block mb-1.5 font-bold">Phone Contact</span>
                    <span className="font-extrabold text-white block text-sm">{user?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Teammates fields */}
              {teammates.length > 0 && (
                <div className="space-y-6 border-t border-white/5 pt-8">
                  <div>
                    <h3 className="text-xs uppercase font-extrabold text-tealAccent tracking-wider font-display mb-1">
                      Teammate Registry
                    </h3>
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                      This event allows teams of up to {event.teamSize} members. Please specify the names of your teammates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {teammates.map((mate, idx) => (
                      <div key={idx}>
                        <label className="text-[9px] uppercase font-black tracking-wider text-gray-500 block mb-1.5">
                          Teammate #{idx + 2} Full Name
                        </label>
                        <input
                          type="text"
                          value={mate}
                          onChange={(e) => handleTeammateChange(idx, e.target.value)}
                          placeholder={`Enter teammate #${idx + 2} name`}
                          className="w-full cyber-input px-4 py-3 text-sm text-white placeholder-gray-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Terms and Submit */}
              <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[10px] text-gray-500 leading-relaxed max-w-md font-medium">
                  By registering, you agree to PIEMR event terms and guidelines. Registration fees (if any) are collected at the venue desk prior to commencement.
                </p>

                <div className="flex gap-4 w-full md:w-auto">
                  <Link
                    to="/events"
                    className="cyber-clip-btn flex-1 md:flex-none px-6 py-3 border border-white/10 hover:border-white/20 text-gray-300 uppercase font-black tracking-wider text-[10px] text-center transition-colors duration-200"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="cyber-btn cyber-clip-btn flex-1 md:flex-none px-8 py-3 bg-amberAccent hover:bg-tealAccent text-obsidian uppercase font-black tracking-wider text-[10px] shadow-md shadow-amberAccent/10 hover:shadow-tealAccent/20 flex items-center justify-center cursor-pointer transition-all duration-300"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'Confirm Pass'
                    )}
                  </button>
                </div>
              </div>

            </form>

          </div>
        )}

      </div>

    </div>
  );
};

export default RegisterPage;
