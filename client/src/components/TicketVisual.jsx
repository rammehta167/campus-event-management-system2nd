import React from 'react';

const TicketVisual = ({ registration }) => {
  if (!registration || !registration.event) return null;

  const { ticketId, teammates, event } = registration;
  const studentName = registration.user?.name || "Attendee";
  const studentCollege = registration.user?.college || "PIEMR Indore";

  // Category specific border colors
  const categoryColors = {
    technical: 'border-l-4 border-l-amberAccent shadow-[inset_4px_0_12px_rgba(255,176,0,0.05)]',
    cultural: 'border-l-4 border-l-tealAccent shadow-[inset_4px_0_12px_rgba(0,229,255,0.05)]',
    sports: 'border-l-4 border-l-amberAccent shadow-[inset_4px_0_12px_rgba(255,176,0,0.05)]'
  };

  const getCategoryColor = (cat) => {
    return categoryColors[cat.toLowerCase()] || 'border-l-4 border-l-amberAccent';
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${ticketId}&color=1E1E1E&bgcolor=FFB000`;

  return (
    <div className="relative max-w-2xl mx-auto w-full glass-panel cyber-scanlines border border-white/10 rounded-xl overflow-hidden hover:border-amberAccent/40 hover:shadow-2xl hover:shadow-amberAccent/5 transition-all duration-500 flex flex-col md:flex-row cyber-corner-box">
      
      {/* Decorative Cutouts */}
      <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-obsidian border-r border-white/10 z-10 hidden md:block"></div>
      <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-obsidian border-l border-white/10 z-10 hidden md:block"></div>

      {/* Main Pass Section */}
      <div className={`flex-1 p-6 md:p-8 flex flex-col justify-between ${getCategoryColor(event.category)}`}>
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div>
              <span className="text-[9px] uppercase tracking-widest font-black text-tealAccent">
                Official Access Authorization
              </span>
              <h4 className="text-xl font-bold tracking-tight text-white font-display mt-0.5">{event.title}</h4>
            </div>
            <span className="px-2.5 py-1 text-[10px] uppercase font-black tracking-widest rounded bg-charcoal border border-white/10 text-gray-300">
              {event.category}
            </span>
          </div>

          {/* Grid Metadata */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold block">Telemetry Date</span>
              <span className="text-sm font-semibold text-gray-200">{event.date}</span>
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold block">Temporal Window</span>
              <span className="text-sm font-semibold text-gray-200">{event.time}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold block">Operational Venue</span>
              <span className="text-sm font-semibold text-gray-200">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Student metadata */}
        <div className="border-t border-dashed border-white/10 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block">Authorized Subject</span>
              <span className="text-base font-black text-amberAccent uppercase tracking-wide">{studentName}</span>
              <span className="text-[10px] text-gray-500 uppercase font-semibold block">{studentCollege}</span>
            </div>
          </div>

          {teammates && teammates.length > 0 && (
            <div className="mt-4">
              <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold block mb-1">Squad Teammates</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {teammates.map((mate, idx) => (
                  <span key={idx} className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-charcoal border border-white/5 text-gray-300 font-bold">
                    {mate}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Stubb - Separator line */}
      <div className="border-t-2 border-dashed border-white/10 md:border-t-0 md:border-l-2 md:border-dashed md:h-auto md:w-0"></div>

      {/* Ticket Stubb / QR Code Section */}
      <div className="p-6 md:p-8 flex flex-col items-center justify-center bg-charcoal/20 w-full md:w-48 text-center relative">
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-tealAccent animate-ping"></span>
          <span className="text-[7px] text-tealAccent font-mono font-bold tracking-widest uppercase">Sync Active</span>
        </div>

        {/* Mock Barcode visual */}
        <div className="flex items-center space-x-[2px] h-6 opacity-30 mb-4 select-none overflow-hidden justify-center w-full">
          <div className="w-[1px] h-full bg-white"></div>
          <div className="w-[3px] h-full bg-white"></div>
          <div className="w-[1px] h-full bg-white"></div>
          <div className="w-[2px] h-full bg-white"></div>
          <div className="w-[4px] h-full bg-white"></div>
          <div className="w-[1px] h-full bg-white"></div>
          <div className="w-[3px] h-full bg-white"></div>
          <div className="w-[1px] h-full bg-white"></div>
          <div className="w-[2px] h-full bg-white"></div>
          <div className="w-[1px] h-full bg-white"></div>
          <div className="w-[4px] h-full bg-white"></div>
          <div className="w-[2px] h-full bg-white"></div>
          <div className="w-[1px] h-full bg-white"></div>
        </div>

        <div className="p-2 bg-amberAccent rounded-lg inline-block mb-3 glow-amber">
          <img 
            src={qrCodeUrl} 
            alt="Ticket QR Code" 
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
            onError={(e) => {
              e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${ticketId}`;
            }}
          />
        </div>
        <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold block">Ticket ID</span>
        <span className="text-base font-mono font-extrabold text-white tracking-widest uppercase">
          {ticketId}
        </span>
        <span className="text-[8px] uppercase tracking-wider text-tealAccent mt-1 font-black">
          Scan Gate Access
        </span>
      </div>

    </div>
  );
};

export default TicketVisual;
