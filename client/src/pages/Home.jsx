import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Set target date to 15 days from current time
  const [timeLeft, setTimeLeft] = useState({ days: 15, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);
    targetDate.setHours(9, 0, 0, 0); // 9:00 AM 15 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: '3 DAYS', label: 'Techno-Cultural Chaos' },
    { value: '15+', label: 'Competitions & Battles' },
    { value: '2500+', label: 'Expected Footfall' },
    { value: '₹4.5L+', label: 'Accumulated Prizes' }
  ];

  const highlights = [
    {
      title: 'RoboWars 2026',
      desc: 'Enter the steel arena. Custom 15kg war bots battling for survival in a high-octane double elimination clash.',
      badge: 'TECHNICAL'
    },
    {
      title: 'PPL Cricket',
      desc: '8-over leather ball cricket tournament designed for pure high-speed athletic action and grand campus bragging rights.',
      badge: 'SPORTS'
    },
    {
      title: 'Beat Drop',
      desc: 'High-tempo classical-contemporary fusion group routines on the main lawn under professional concert stage production.',
      badge: 'CULTURAL'
    }
  ];

  const sponsors = [
    'Intel', 'RedBull', 'GitHub', 'AWS', 'Vite', 'Google Cloud', 'MongoDB', 'React', 'TailwindCSS'
  ];

  return (
    <div className="relative min-h-screen bg-dots grid-cyber overflow-hidden cyber-scanlines">
      
      {/* Decorative Grid Lines / Ambient Lighting */}
      <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none"></div>
      <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] rounded-full cyber-mesh-glow -z-10 animate-float"></div>
      <div className="absolute bottom-[15%] right-[-15%] w-[700px] h-[700px] rounded-full cyber-mesh-glow-teal -z-10 animate-float" style={{ animationDelay: '-3s' }}></div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-tealAccent/20 to-transparent"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-28 text-center flex flex-col items-center relative z-10">
        <span className="px-4 py-1.5 text-[9px] uppercase font-black tracking-widest text-tealAccent border border-tealAccent/30 rounded bg-tealAccent/5 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.05)] animate-pulse flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-tealAccent animate-ping"></span> PRESTIGE ANNUAL FESTIVAL 2026
        </span>
        
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white mb-6 uppercase leading-none select-none">
          URJOTSAV<br className="sm:hidden" />
          <span className="bg-gradient-to-r from-amberAccent via-amberAccent to-tealAccent bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,176,0,0.18)] font-display"> 2K26</span>
        </h1>
        <div className="w-36 h-[2px] bg-gradient-to-r from-amberAccent via-amberAccent to-tealAccent mb-10"></div>
        
        <p className="max-w-xl text-sm md:text-base text-gray-400 mb-14 leading-relaxed font-semibold">
          Unleash innovation, digital craftsmanship, and athletic dominance at PIEMR's premier technological and cultural arena. Register now for gate passes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-24 w-full sm:w-auto px-6">
          <Link
            to="/events"
            className="cyber-btn cyber-clip-btn px-12 py-4 bg-amberAccent text-obsidian font-black uppercase tracking-widest text-xs shadow-lg shadow-amberAccent/10 hover:shadow-amberAccent/30 hover:-translate-y-0.5 text-center transition-all duration-300"
          >
            Explore Events
          </Link>
          <Link
            to="/login"
            className="cyber-btn cyber-clip-btn px-12 py-4 bg-charcoal border border-white/10 hover:border-tealAccent/40 hover:bg-tealAccent/5 text-gray-200 font-black uppercase tracking-widest text-xs hover:-translate-y-0.5 text-center transition-all duration-300"
          >
            Sign Up Portal
          </Link>
        </div>

        {/* Countdown Timer Dashboard */}
        <div className="max-w-3xl w-full glass-panel p-8 md:p-10 border border-white/5 flex flex-col md:flex-row justify-around items-center gap-8 mb-20 shadow-2xl relative cyber-corner-box">
          <div className="absolute -top-3 left-6 px-4 py-1 bg-charcoal border border-amberAccent/20 text-amberAccent text-[8px] font-black uppercase tracking-widest rounded-sm shadow-[0_0_15px_rgba(255,176,0,0.1)]">
            SYSTEM CONVERGENCE TELEMETRY
          </div>
          
          <div className="flex items-center justify-around w-full">
            <div className="text-center px-4 relative group">
              <span className="text-5xl md:text-7xl font-mono font-black text-amberAccent block drop-shadow-[0_0_15px_rgba(255,176,0,0.2)]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black mt-2 block">Days</span>
            </div>
            <div className="text-4xl font-mono text-gray-700 select-none animate-pulse">:</div>
            <div className="text-center px-4">
              <span className="text-5xl md:text-7xl font-mono font-black text-white block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black mt-2 block">Hours</span>
            </div>
            <div className="text-4xl font-mono text-gray-700 select-none animate-pulse">:</div>
            <div className="text-center px-4">
              <span className="text-5xl md:text-7xl font-mono font-black text-white block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black mt-2 block">Minutes</span>
            </div>
            <div className="text-4xl font-mono text-gray-700 select-none animate-pulse">:</div>
            <div className="text-center px-4">
              <span className="text-5xl md:text-7xl font-mono font-black text-tealAccent block drop-shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black mt-2 block">Seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="border-y border-white/5 bg-charcoal/20 py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center relative group">
              <span className="text-4xl md:text-5xl font-black text-white block mb-2 font-mono bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent group-hover:to-tealAccent transition-colors duration-500">
                {stat.value}
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full cyber-mesh-glow -z-10 pointer-events-none"></div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 text-center uppercase tracking-tight">
          THE FEST <span className="bg-gradient-to-r from-amberAccent to-tealAccent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,229,255,0.25)]">HIGHLIGHTS</span>
        </h2>
        <p className="text-center text-gray-400 max-w-md mx-auto mb-20 text-sm font-medium">
          Get a glimpse of the highly contested flagship arenas waiting for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((hl, idx) => (
            <div
              key={idx}
              className={`glass-panel p-8 cyber-clip-y flex flex-col items-start border border-white/5 hover:border-tealAccent/30 hover:shadow-xl hover:shadow-tealAccent/5 transition-all duration-500 relative ${
                hl.badge === 'TECHNICAL' ? 'cyber-corner-box-amber' : 'cyber-corner-box'
              }`}
            >
              <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-charcoal border rounded mb-8 ${
                hl.badge === 'TECHNICAL' ? 'text-amberAccent border-amberAccent/35 shadow-[0_0_8px_rgba(255,176,0,0.1)]' : 
                hl.badge === 'SPORTS' ? 'text-white border-white/15' : 'text-tealAccent border-tealAccent/35 shadow-[0_0_8px_rgba(0,229,255,0.1)]'
              }`}>
                {hl.badge}
              </span>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">
                {hl.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-8 flex-grow">{hl.desc}</p>
              <Link 
                to="/events" 
                className="text-[10px] font-black uppercase tracking-widest text-tealAccent hover:text-white transition-colors duration-200 flex items-center gap-1 group"
              >
                Launch Arena <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors Infinite Marquee */}
      <section className="bg-charcoal/40 border-y border-white/5 py-16 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">
            Official Collaboration Partners
          </p>
        </div>
        <div className="relative w-full flex items-center">
          <div className="animate-marquee whitespace-nowrap flex space-x-20 text-3xl font-black font-display tracking-widest text-gray-700 uppercase select-none">
            {sponsors.map((sp, idx) => (
              <span key={idx} className="hover:text-amberAccent cursor-pointer transition-colors duration-200 opacity-60 hover:opacity-100">
                {sp}
              </span>
            ))}
            {/* Duplicate for infinite loop */}
            {sponsors.map((sp, idx) => (
              <span key={`dup-${idx}`} className="hover:text-tealAccent cursor-pointer transition-colors duration-200 opacity-60 hover:opacity-100">
                {sp}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
