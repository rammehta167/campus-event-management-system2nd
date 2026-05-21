import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useContext(AuthContext);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [phone, setPhone] = useState('');

  // UI States
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect handling
  const redirectPath = searchParams.get('redirect');
  const eventId = searchParams.get('event');

  useEffect(() => {
    if (isAuthenticated) {
      if (redirectPath === 'register' && eventId) {
        navigate(`/register?event=${eventId}`);
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, navigate, redirectPath, eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (isLogin) {
      // Login validation
      if (!email || !password) {
        setError('Please fill in all credentials.');
        setSubmitting(false);
        return;
      }

      const result = await login(email, password);
      if (!result.success) {
        setError(result.error);
      }
    } else {
      // Register validation
      if (!name || !email || !password || !college || !phone) {
        setError('All registration fields are required.');
        setSubmitting(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must contain at least 6 characters.');
        setSubmitting(false);
        return;
      }

      const result = await register(name, email, password, college, phone);
      if (!result.success) {
        setError(result.error);
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-dots grid-cyber overflow-hidden cyber-scanlines">
      
      {/* Decorative Blurs */}
      <div className="absolute top-[20%] left-[25%] w-[350px] h-[350px] rounded-full cyber-mesh-glow -z-10 animate-float pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[25%] w-[350px] h-[350px] rounded-full cyber-mesh-glow-teal -z-10 animate-float pointer-events-none" style={{ animationDelay: '-6s' }}></div>

      <div className="glass-panel border border-white/10 p-8 md:p-10 cyber-clip-x max-w-md w-full shadow-2xl relative z-10 cyber-corner-box">
        
        {/* Logo/Icon Area */}
        <div className="flex flex-col items-center mb-8">
          <span className="font-extrabold text-3xl tracking-widest bg-gradient-to-r from-amberAccent to-tealAccent bg-clip-text text-transparent select-none font-display drop-shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            URJOTSAV
          </span>
          <span className="text-[9px] uppercase font-black tracking-widest text-gray-500 mt-1">
            Secure Entry Portal
          </span>
        </div>

        {/* Toggle Headings */}
        <div className="flex border-b border-white/5 pb-4 mb-8">
          <button
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
            className={`flex-1 text-center font-black pb-2 uppercase tracking-widest text-xs transition-all duration-300 ${
              isLogin ? 'text-amberAccent border-b-2 border-amberAccent glow-text-amber' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
            className={`flex-1 text-center font-black pb-2 uppercase tracking-widest text-xs transition-all duration-300 ${
              !isLogin ? 'text-amberAccent border-b-2 border-amberAccent glow-text-amber' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Join Fest
          </button>
        </div>

        {/* Info Banner when redirecting */}
        {redirectPath === 'register' && (
          <div className="mb-6 p-4 bg-tealAccent/15 border border-tealAccent/25 text-[11px] text-tealAccent text-center font-bold tracking-wide">
            Authentication is required to register for this event.
          </div>
        )}

        {/* Error Messaging */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-[11px] text-red-400 text-center font-bold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {!isLogin && (
            <div>
              <label className="text-[9px] uppercase font-black tracking-wider text-gray-500 block mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                required
                className="w-full cyber-input px-4 py-3 text-sm text-white placeholder-gray-600"
              />
            </div>
          )}

          <div>
            <label className="text-[9px] uppercase font-black tracking-wider text-gray-500 block mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@piemr.edu.in"
              required
              className="w-full cyber-input px-4 py-3 text-sm text-white placeholder-gray-600"
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="text-[9px] uppercase font-black tracking-wider text-gray-500 block mb-1.5">College/Institute</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Prestige Institute, Indore"
                  required
                  className="w-full cyber-input px-4 py-3 text-sm text-white placeholder-gray-600"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase font-black tracking-wider text-gray-500 block mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  required
                  className="w-full cyber-input px-4 py-3 text-sm text-white placeholder-gray-600"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-[9px] uppercase font-black tracking-wider text-gray-500 block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full cyber-input px-4 py-3 text-sm text-white placeholder-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="cyber-btn cyber-clip-btn w-full py-3.5 bg-amberAccent hover:bg-tealAccent text-obsidian font-black uppercase tracking-wider shadow-lg shadow-amberAccent/5 hover:shadow-tealAccent/20 text-xs mt-6 flex items-center justify-center cursor-pointer transition-all duration-300"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
            ) : isLogin ? (
              'Authenticate Securely'
            ) : (
              'Create Identity Profile'
            )}
          </button>

        </form>

        <div className="text-center mt-8 text-xs text-gray-500">
          {isLogin ? (
            <p className="font-medium">
              Don't have a secure pass?{' '}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError(null);
                }}
                className="text-tealAccent hover:underline font-bold"
              >
                Join the Fest
              </button>
            </p>
          ) : (
            <p className="font-medium">
              Already verified identity?{' '}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError(null);
                }}
                className="text-tealAccent hover:underline font-bold"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>

      </div>

    </div>
  );
};

export default Login;
