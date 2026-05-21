import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TicketVisual from '../components/TicketVisual';

const Dashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Teammate Edit Modal/Form State
  const [editingReg, setEditingReg] = useState(null);
  const [editTeammates, setEditTeammates] = useState([]);
  const [editError, setEditError] = useState(null);
  const [editSubmitting, setEditSubmitting] = useState(false);

  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch student registrations
  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!isAuthenticated) return;
      try {
        const res = await axios.get('/api/register');
        if (res.data.success) {
          setRegistrations(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching registrations:', err);
        setError('Failed to fetch registration passes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [isAuthenticated]);

  const handleCancelPass = async (regId) => {
    if (!window.confirm('Are you sure you want to cancel this entry pass?')) return;
    try {
      const res = await axios.delete(`/api/register/${regId}`);
      if (res.data.success) {
        setRegistrations(registrations.filter(r => r._id !== regId));
      }
    } catch (err) {
      console.error('Error deleting registration:', err);
      alert(err.response?.data?.error || 'Could not cancel pass.');
    }
  };

  const startEditTeammates = (reg) => {
    setEditingReg(reg);
    const matesCount = reg.event.teamSize - 1;
    // Pre-populate with existing teammates or empty strings
    const currentMates = [...reg.teammates];
    const initialList = Array(matesCount).fill('').map((_, i) => currentMates[i] || '');
    setEditTeammates(initialList);
    setEditError(null);
  };

  const handleEditTeammateChange = (index, value) => {
    const updated = [...editTeammates];
    updated[index] = value;
    setEditTeammates(updated);
  };

  const handleSaveTeammates = async (e) => {
    e.preventDefault();
    setEditSubmitting(true);
    setEditError(null);

    const cleaned = editTeammates.filter(t => t.trim() !== '');

    try {
      const res = await axios.put(`/api/register/${editingReg._id}/teammates`, {
        teammates: cleaned
      });

      if (res.data.success) {
        // Update local registrations list
        setRegistrations(registrations.map(r => {
          if (r._id === editingReg._id) {
            return { ...r, teammates: cleaned };
          }
          return r;
        }));
        setEditingReg(null);
      }
    } catch (err) {
      console.error('Error saving teammates:', err);
      setEditError(err.response?.data?.error || 'Failed to update teammates.');
    } finally {
      setEditSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="text-center py-20">
        <div className="w-12 h-12 border-4 border-amberAccent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Syncing user profile database...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-dots grid-cyber overflow-hidden py-16 px-6 cyber-scanlines">
      
      {/* Visual background glows */}
      <div className="absolute top-20 left-1/4 w-[300px] h-[300px] rounded-full cyber-mesh-glow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full cyber-mesh-glow-teal -z-10 pointer-events-none" style={{ animationDelay: '-3s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grid Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card Sidebar */}
          <div className="glass-panel p-6 border border-white/10 h-fit space-y-6 cyber-clip-y cyber-corner-box">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-tealAccent">
                Student Profile Card
              </span>
              <h2 className="text-xl font-bold text-white mt-1 font-display">{user?.name}</h2>
              <span className="text-xs font-semibold text-gray-400 uppercase font-mono">{user?.college}</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-gray-500 block uppercase font-bold tracking-wider mb-1">Email Address</span>
                <span className="text-gray-200 text-sm font-mono">{user?.email}</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase font-bold tracking-wider mb-1">Phone Number</span>
                <span className="text-gray-200 text-sm">{user?.phone}</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase font-bold tracking-wider mb-1">Account Role</span>
                <span className="text-xs px-2.5 py-0.5 border border-tealAccent/20 text-tealAccent uppercase font-bold tracking-wider inline-block">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Passes Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-black uppercase text-white mb-2">
                MY ENTRY <span className="bg-gradient-to-r from-amberAccent to-tealAccent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,229,255,0.15)] font-display">PASSES</span>
              </h1>
              <p className="text-xs text-gray-400">
                Manage your registered events, teammates databases, and download QR codes for gate access.
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-center font-medium">
                {error}
              </div>
            )}

            {registrations.length === 0 ? (
              <div className="glass-panel p-12 text-center border border-white/5 cyber-clip-y cyber-corner-box">
                <p className="text-gray-500 mb-6 font-medium">You haven't registered for any Urjotsav events yet.</p>
                <Link
                  to="/events"
                  className="cyber-btn cyber-clip-btn px-6 py-2.5 bg-amberAccent hover:bg-tealAccent text-obsidian uppercase font-extrabold text-xs shadow-md shadow-amberAccent/10 hover:shadow-tealAccent/20 transition-all duration-300"
                >
                  Find Events & Register
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {registrations.map((reg) => (
                  <div key={reg._id} className="space-y-4">
                    {/* Holographic ticket pass */}
                    <TicketVisual registration={reg} />

                    {/* Actions under the pass */}
                    <div className="max-w-2xl mx-auto flex justify-end items-center gap-4 text-xs px-2">
                      {reg.event.teamSize > 1 && (
                        <button
                          onClick={() => startEditTeammates(reg)}
                          className="px-4 py-2 border border-white/10 hover:border-tealAccent/30 hover:text-tealAccent text-gray-300 font-bold uppercase rounded transition-colors duration-200"
                        >
                          Edit Teammates
                        </button>
                      )}
                      <button
                        onClick={() => handleCancelPass(reg._id)}
                        className="px-4 py-2 border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-400 font-bold uppercase rounded transition-colors duration-200"
                      >
                        Cancel Entry Pass
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Inline Teammate Edit Overlay Modal */}
      {editingReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-sm">
          <div className="glass-panel-amber border border-amberAccent/20 cyber-clip-x max-w-md w-full p-6 md:p-8 relative shadow-2xl cyber-corner-box-amber">
            
            <button
              onClick={() => setEditingReg(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl focus:outline-none"
            >
              &times;
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-tealAccent">
                Edit squad teammates
              </span>
              <h3 className="text-xl font-bold text-white mt-1 font-display">
                {editingReg.event.title}
              </h3>
            </div>

            {editError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center font-medium">
                {editError}
              </div>
            )}

            <form onSubmit={handleSaveTeammates} className="space-y-4">
              {editTeammates.map((mate, idx) => (
                <div key={idx}>
                  <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                    Teammate #{idx + 2} Name
                  </label>
                  <input
                    type="text"
                    value={mate}
                    onChange={(e) => handleEditTeammateChange(idx, e.target.value)}
                    placeholder="Enter full name"
                    className="w-full cyber-input px-4 py-2 text-sm text-white placeholder-gray-700"
                  />
                </div>
              ))}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingReg(null)}
                  className="flex-1 py-2.5 border border-white/10 hover:border-white/20 text-gray-300 uppercase font-bold rounded text-xs transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSubmitting}
                  className="cyber-btn flex-1 py-2.5 bg-amberAccent hover:bg-tealAccent text-obsidian uppercase font-black rounded text-xs transition-all duration-300 shadow-md shadow-amberAccent/10 hover:shadow-tealAccent/25 flex items-center justify-center cursor-pointer"
                >
                  {editSubmitting ? (
                    <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Save Teammates'
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
