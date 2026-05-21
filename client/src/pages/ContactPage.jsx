import React, { useState } from 'react';
import axios from 'axios';

const ContactPage = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axios.post('/api/contact', {
        name,
        email,
        message
      });

      if (res.data.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setError(err.response?.data?.error || 'Failed to submit query. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-dots grid-cyber overflow-hidden py-16 px-6 cyber-scanlines">
      
      {/* Background Glows */}
      <div className="absolute bottom-20 left-1/4 w-[300px] h-[300px] rounded-full cyber-mesh-glow-teal -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-tealAccent">
            PIEMR Technical Student Council
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight mt-1 mb-4 font-display drop-shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            GET IN <span className="bg-gradient-to-r from-amberAccent to-tealAccent bg-clip-text text-transparent">TOUCH</span>
          </h1>
          <div className="w-12 h-[2px] bg-gradient-to-r from-amberAccent to-tealAccent mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-sm text-gray-400">
            Have queries about rules, team sizes, schedule adjustments, or sponsorship opportunities? Connect with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info Sidebar */}
          <div className="glass-panel p-8 border border-white/10 space-y-8 cyber-clip-y cyber-corner-box">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Campus Location</h3>
              <p className="text-sm text-gray-400 font-semibold mb-1">
                Prestige Institute of Engineering Management and Research (PIEMR)
              </p>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Prestige Vihar, Vijay Nagar, Scheme No. 74C,<br />
                Indore – 452010, Madhya Pradesh, India
              </p>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-4 font-medium">
              <div>
                <h4 className="text-xs uppercase font-bold text-amberAccent tracking-wider mb-1">Email Helpline</h4>
                <p className="text-sm font-mono text-gray-300">urjotsav@piemr.edu.in</p>
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold text-tealAccent tracking-wider mb-1">Telephones</h4>
                <p className="text-sm text-gray-300">+91 731-4013000</p>
                <p className="text-sm text-gray-300">+91 731-4013008</p>
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-1">Festival Timelines</h4>
                <p className="text-sm text-gray-300 font-mono">April 15 - April 17, 2026</p>
              </div>
            </div>
          </div>

          {/* Query Form */}
          <div className="glass-panel-amber border border-amberAccent/20 p-8 shadow-2xl cyber-clip-x cyber-corner-box-amber">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider font-display">
              Submit a Helpline Query
            </h3>

            {success && (
              <div className="mb-6 p-4 bg-tealAccent/10 border border-tealAccent/20 text-sm text-tealAccent text-center font-bold">
                ✓ Message submitted successfully! Our student committee will respond shortly.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  required
                  className="w-full cyber-input px-4 py-2.5 text-sm text-white placeholder-gray-600"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@piemr.edu.in"
                  required
                  className="w-full cyber-input px-4 py-2.5 text-sm text-white placeholder-gray-600"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Message Description</label>
                <textarea
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your question or support details here..."
                  required
                  className="w-full cyber-input px-4 py-2.5 text-sm text-white placeholder-gray-600 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="cyber-btn cyber-clip-btn w-full py-3 bg-amberAccent hover:bg-tealAccent text-obsidian font-extrabold uppercase shadow-lg shadow-amberAccent/10 hover:shadow-tealAccent/25 transition-all duration-300 text-xs tracking-wider flex items-center justify-center cursor-pointer"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Submit Helpline Ticket'
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ContactPage;
