import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Admin = () => {
  const { isAdmin, isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Sub-tabs
  const [activeSubTab, setActiveSubTab] = useState('events');

  // Database Data States
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Fetching states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Event Form State (For Create / Edit)
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('technical');
  const [formSubCategory, setFormSubCategory] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('');
  const [formVenue, setFormVenue] = useState('');
  const [formTeamSize, setFormTeamSize] = useState(1);
  const [formFee, setFormFee] = useState(0);
  const [formPrize, setFormPrize] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formRules, setFormRules] = useState(''); // Textarea, comma or newline separated
  const [formContact, setFormContact] = useState('');

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, authLoading, navigate]);

  // Fetch Data depending on selected tab
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !isAdmin) return;
      setLoading(true);
      setError(null);

      try {
        if (activeSubTab === 'events') {
          const res = await axios.get('/api/events');
          if (res.data.success) setEvents(res.data.data);
        } else if (activeSubTab === 'registrations') {
          const res = await axios.get('/api/register/all');
          if (res.data.success) setRegistrations(res.data.data);
        } else if (activeSubTab === 'contacts') {
          const res = await axios.get('/api/contact');
          if (res.data.success) setContacts(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to fetch data from the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSubTab, isAuthenticated, isAdmin]);

  // Delete event handler
  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event? This will orphan any registrations for this event.')) return;
    try {
      const res = await axios.delete(`/api/events/${id}`);
      if (res.data.success) {
        setEvents(events.filter(e => e._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete event.');
    }
  };

  // Populate form for editing
  const startEditEvent = (event) => {
    setIsEditing(true);
    setEditEventId(event._id);
    setFormTitle(event.title);
    setFormCategory(event.category);
    setFormSubCategory(event.subCategory);
    setFormDate(event.date);
    setFormTime(event.time);
    setFormVenue(event.venue);
    setFormTeamSize(event.teamSize);
    setFormFee(event.fee);
    setFormPrize(event.prize || '');
    setFormDescription(event.description);
    setFormRules(event.rules ? event.rules.join('\n') : '');
    setFormContact(event.contact);
    setFormError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearForm = () => {
    setIsEditing(false);
    setEditEventId(null);
    setFormTitle('');
    setFormCategory('technical');
    setFormSubCategory('');
    setFormDate('');
    setFormTime('');
    setFormVenue('');
    setFormTeamSize(1);
    setFormFee(0);
    setFormPrize('');
    setFormDescription('');
    setFormRules('');
    setFormContact('');
    setFormError(null);
  };

  // Form Submit Handler (Create/Edit Event)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    // Format rules from newline splits
    const rulesArray = formRules
      .split('\n')
      .map(r => r.trim())
      .filter(r => r !== '');

    const eventPayload = {
      title: formTitle,
      category: formCategory,
      subCategory: formSubCategory,
      date: formDate,
      time: formTime,
      venue: formVenue,
      teamSize: Number(formTeamSize),
      fee: Number(formFee),
      prize: formPrize,
      description: formDescription,
      rules: rulesArray,
      contact: formContact
    };

    try {
      if (isEditing) {
        // Edit event
        const res = await axios.put(`/api/events/${editEventId}`, eventPayload);
        if (res.data.success) {
          setEvents(events.map(e => (e._id === editEventId ? res.data.data : e)));
          clearForm();
        }
      } else {
        // Create event
        const res = await axios.post('/api/events', eventPayload);
        if (res.data.success) {
          setEvents([res.data.data, ...events]);
          clearForm();
        }
      }
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.error || 'Failed to submit event details.');
    } finally {
      setFormSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="font-mono text-xs text-amberAccent glow-text-amber animate-pulse">
          &gt; SYSTEM CHECK: VERIFYING ADMIN SECURE NODE ACCESS...
        </div>
        <div className="w-48 h-1 bg-charcoal relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-amberAccent animate-[scanlineAnimation_1.5s_infinite] w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-6 py-16 max-w-7xl mx-auto grid-cyber bg-dots">
      
      {/* Background Neon Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full cyber-mesh-glow pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] rounded-full cyber-mesh-glow-teal pointer-events-none z-0"></div>

      {/* Control Deck Header */}
      <div className="relative z-10 border-b border-white/10 pb-6 mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-tealAccent glow-text-teal block mb-1">
            // SYS.CONTROL_ROOM_DECK.v4.0
          </span>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            PIEMR CONTROL <span className="bg-gradient-to-r from-amberAccent to-tealAccent bg-clip-text text-transparent">DECK</span>
          </h1>
        </div>

        {/* Sidebar subtabs */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button
            onClick={() => setActiveSubTab('events')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cyber-clip-btn border ${
              activeSubTab === 'events' 
                ? 'bg-amberAccent text-obsidian font-extrabold border-amberAccent/40 shadow-[0_0_15px_rgba(255,176,0,0.2)]' 
                : 'bg-charcoal/50 text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
            }`}
          >
            Events Planner
          </button>
          <button
            onClick={() => setActiveSubTab('registrations')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cyber-clip-btn border ${
              activeSubTab === 'registrations' 
                ? 'bg-amberAccent text-obsidian font-extrabold border-amberAccent/40 shadow-[0_0_15px_rgba(255,176,0,0.2)]' 
                : 'bg-charcoal/50 text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
            }`}
          >
            Auditor ({registrations.length})
          </button>
          <button
            onClick={() => setActiveSubTab('contacts')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cyber-clip-btn border ${
              activeSubTab === 'contacts' 
                ? 'bg-amberAccent text-obsidian font-extrabold border-amberAccent/40 shadow-[0_0_15px_rgba(255,176,0,0.2)]' 
                : 'bg-charcoal/50 text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
            }`}
          >
            Helpline ({contacts.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="relative z-10 mb-8 p-4 bg-red-500/10 border border-red-500/35 text-xs font-mono text-red-400 text-center cyber-clip-y">
          &gt; ERROR DETECTED: {error}
        </div>
      )}

      {/* SUBTAB: EVENTS PLANNER */}
      {activeSubTab === 'events' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Event Form (Create/Edit) */}
          <div className="glass-panel-amber border border-amberAccent/20 p-6 cyber-clip-y cyber-corner-box-amber h-fit space-y-5 relative">
            <div className="absolute top-2 right-3 font-mono text-[8px] text-amberAccent/40">SYS.DECK_01</div>
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amberAccent animate-ping rounded-full inline-block"></span>
              {isEditing ? 'MODIFY EVENT LISTING' : 'INITIALIZE EVENT LISTING'}
            </h3>

            {formError && (
              <div className="p-3 bg-red-500/15 border border-red-500/30 text-[10px] font-mono text-red-400 text-center">
                &gt; SUBMISSION FAILED: {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                  // Event Title
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. HACKOVERFLOW 5.0"
                  className="w-full cyber-input px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                    // Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full cyber-input px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="technical" className="bg-obsidian text-white">Technical</option>
                    <option value="cultural" className="bg-obsidian text-white">Cultural</option>
                    <option value="sports" className="bg-obsidian text-white">Sports</option>
                  </select>
                </div>
                <div>
                  <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                    // Sub Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formSubCategory}
                    onChange={(e) => setFormSubCategory(e.target.value)}
                    placeholder="e.g. Hackathons"
                    className="w-full cyber-input px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                    // Date
                  </label>
                  <input
                    type="text"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="e.g. April 16, 2026"
                    className="w-full cyber-input px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                    // Time
                  </label>
                  <input
                    type="text"
                    required
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    placeholder="e.g. 09:00 AM - 09:00 PM"
                    className="w-full cyber-input px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                    // Max Team Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formTeamSize}
                    onChange={(e) => setFormTeamSize(e.target.value)}
                    className="w-full cyber-input px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                    // Fee (INR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formFee}
                    onChange={(e) => setFormFee(e.target.value)}
                    className="w-full cyber-input px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                    // Venue
                  </label>
                  <input
                    type="text"
                    required
                    value={formVenue}
                    onChange={(e) => setFormVenue(e.target.value)}
                    placeholder="e.g. LAB 4 (BLOCK A)"
                    className="w-full cyber-input px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                    // Prize Pool
                  </label>
                  <input
                    type="text"
                    value={formPrize}
                    onChange={(e) => setFormPrize(e.target.value)}
                    placeholder="e.g. ₹50,000 CASH"
                    className="w-full cyber-input px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                  // Event Description
                </label>
                <textarea
                  rows="3"
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Summarize the core flow of this node..."
                  className="w-full cyber-input px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                  // Rules (One per line)
                </label>
                <textarea
                  rows="3"
                  value={formRules}
                  onChange={(e) => setFormRules(e.target.value)}
                  placeholder="Solo participation only&#10;No templates allowed"
                  className="w-full cyber-input px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="text-[8px] uppercase tracking-wider font-bold text-amberAccent/80 block mb-1">
                  // Coordinator Contacts
                </label>
                <input
                  type="text"
                  required
                  value={formContact}
                  onChange={(e) => setFormContact(e.target.value)}
                  placeholder="e.g. Kiran Sen (9876543210)"
                  className="w-full cyber-input px-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={clearForm}
                  className="flex-1 py-2.5 bg-charcoal/50 border border-white/10 text-gray-400 font-bold uppercase text-[10px] cyber-clip-btn hover:text-white transition-colors duration-200"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="flex-1 py-2.5 bg-amberAccent text-obsidian font-black uppercase text-[10px] cyber-clip-btn cyber-btn flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,176,0,0.2)] disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <>
                      <div className="w-3 h-3 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
                      <span>PROCESS...</span>
                    </>
                  ) : (
                    <span>{isEditing ? 'COMMIT UPDATE' : 'PUBLISH RECORD'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Events Listings Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-tealAccent rounded-full inline-block"></span>
                ACTIVE DIRECTORY ({events.length})
              </h3>
              <span className="font-mono text-[9px] text-tealAccent/50">// TOTAL_RECORDS</span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-gray-500 font-mono text-xs animate-pulse">
                &gt; QUERYING SERVER DATABASE...
              </div>
            ) : events.length === 0 ? (
              <div className="py-12 border border-dashed border-white/10 rounded-lg text-center text-gray-500 font-mono text-xs">
                &gt; DATABASE INVENTORY IS VACANT.
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="glass-panel p-5 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-tealAccent/25 hover:shadow-[0_0_15px_rgba(0,229,255,0.05)] transition-all duration-300 cyber-clip-y cyber-corner-box relative group"
                  >
                    <div>
                      <div className="flex items-center space-x-2.5">
                        <span className="text-sm font-extrabold text-white tracking-wide group-hover:text-tealAccent transition-colors">
                          {event.title}
                        </span>
                        <span className="text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 bg-charcoal text-tealAccent rounded border border-tealAccent/20">
                          {event.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-400 mt-2 font-mono">
                        <span className="text-amberAccent">{event.date}</span>
                        <span className="text-gray-600">|</span>
                        <span>{event.venue}</span>
                        <span className="text-gray-600">|</span>
                        <span>TEAM SIZE: {event.teamSize}</span>
                        <span className="text-gray-600">|</span>
                        <span className="text-white">FEE: ₹{event.fee}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto relative z-10">
                      <button
                        onClick={() => startEditEvent(event)}
                        className="flex-1 md:flex-none px-4 py-2 bg-tealAccent/10 border border-tealAccent/30 text-tealAccent hover:bg-tealAccent hover:text-obsidian font-black uppercase text-[9px] transition-all duration-200 cyber-clip-btn shadow-[inset_0_0_8px_rgba(0,229,255,0.1)]"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="flex-1 md:flex-none px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white font-black uppercase text-[9px] transition-all duration-200 cyber-clip-btn"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* SUBTAB: REGISTRATIONS AUDITOR */}
      {activeSubTab === 'registrations' && (
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amberAccent rounded-full inline-block animate-pulse"></span>
              REGISTRATIONS CENTRAL AUDITOR ({registrations.length})
            </h3>
            <span className="font-mono text-[9px] text-amberAccent/50">// TRANSACTION_LOGS</span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-mono text-xs animate-pulse">
              &gt; AUDITING DATABASE RECORDS...
            </div>
          ) : registrations.length === 0 ? (
            <div className="py-12 border border-dashed border-white/10 rounded-lg text-center text-gray-500 font-mono text-xs">
              &gt; NO PASSES GENERATED BY USERS.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs cyber-table">
                <thead>
                  <tr className="text-tealAccent/70 font-display font-bold uppercase tracking-widest text-[9px] border-b border-white/10 bg-charcoal/30">
                    <th className="p-4">Access Pass ID</th>
                    <th className="p-4">Holder</th>
                    <th className="p-4">Origin / College</th>
                    <th className="p-4">Comms Link</th>
                    <th className="p-4">Target Node (Event)</th>
                    <th className="p-4">Affiliated Squad</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {registrations.map((reg) => (
                    <tr key={reg._id} className="border-b border-white/5">
                      <td className="p-4 font-mono font-black text-amberAccent glow-text-amber uppercase select-all">
                        {reg.ticketId || 'N/A'}
                      </td>
                      <td className="p-4">
                        <div className="font-extrabold text-white">{reg.user?.name || 'Decommissioned Account'}</div>
                      </td>
                      <td className="p-4 font-medium text-gray-400">
                        {reg.user?.college || 'N/A'}
                      </td>
                      <td className="p-4 font-mono">
                        <span className="block text-[11px] text-gray-300">{reg.user?.email || 'N/A'}</span>
                        <span className="text-[9px] text-gray-500">{reg.user?.phone || 'N/A'}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-extrabold text-white block">{reg.event?.title || 'Deleted Event'}</span>
                        <span className="text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 bg-charcoal/50 text-tealAccent rounded border border-tealAccent/15 inline-block mt-0.5">
                          {reg.event?.category || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4">
                        {reg.teammates && reg.teammates.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {reg.teammates.map((mate, idx) => (
                              <span key={idx} className="bg-charcoal-light border border-white/10 text-[8px] px-1.5 py-0.5 rounded text-gray-300 font-mono">
                                {mate}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-500 font-mono text-[9px] tracking-wider uppercase">// SOLO_OP</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB: HELPLINE LOGS */}
      {activeSubTab === 'contacts' && (
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-tealAccent rounded-full inline-block animate-ping"></span>
              HELPLINE INQUIRY TICKETS ({contacts.length})
            </h3>
            <span className="font-mono text-[9px] text-tealAccent/50">// COMMS_BUFFER</span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-mono text-xs animate-pulse">
              &gt; ESTABLISHING LINK TO COMMS SERVER...
            </div>
          ) : contacts.length === 0 ? (
            <div className="py-12 border border-dashed border-white/10 rounded-lg text-center text-gray-500 font-mono text-xs">
              &gt; COMMUNICATIONS BROADCAST CHANNEL IS CLEAR.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className="glass-panel p-6 border border-white/5 flex flex-col justify-between hover:border-amberAccent/20 hover:shadow-[0_0_15px_rgba(255,176,0,0.03)] transition-all duration-300 cyber-clip-y cyber-corner-box relative"
                >
                  <div className="absolute top-2 right-3 font-mono text-[8px] text-gray-600">// COM_TICKET_LOG</div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b border-white/5 pb-3">
                      <div>
                        <h4 className="text-sm font-extrabold text-white tracking-wide">{contact.name}</h4>
                        <span className="text-[10px] text-tealAccent font-mono select-all">{contact.email}</span>
                      </div>
                      <span className="text-[9px] text-gray-500 font-mono bg-charcoal px-2 py-0.5 rounded border border-white/5">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="bg-obsidian/40 border border-white/5 p-3 rounded font-mono text-xs text-gray-300 leading-relaxed min-h-[60px] whitespace-pre-line relative">
                      <span className="text-amberAccent/40 text-[9px] absolute top-1 right-2">RAW_MSG</span>
                      "{contact.message}"
                    </div>
                  </div>

                  <div className="mt-5 border-t border-white/5 pt-4 text-right">
                    <a
                      href={`mailto:${contact.email}?subject=Urjotsav Helpline Query Reply`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-amberAccent text-obsidian font-black uppercase text-[9px] transition-all duration-200 hover:shadow-[0_0_15px_rgba(255,176,0,0.3)] cyber-clip-btn cyber-btn"
                    >
                      <span>DISPATCH EMAIL REPLY</span>
                      <svg className="w-2.5 h-2.5 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Admin;
