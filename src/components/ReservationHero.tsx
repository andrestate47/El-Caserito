import React from 'react';

export default function ReservationHero() {
  return (
    <section className="relative w-full h-[75vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/videocaserito.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for text contrast and blending into the next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-black/40 to-[#141A2D]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center mt-12">
        <span className="text-[#E4D5B7] font-serif italic text-sm md:text-lg tracking-[0.2em] uppercase mb-4 opacity-90">
          Experiencia Inolvidable
        </span>
        <h1 className="text-white font-serif font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8 drop-shadow-lg">
          PLANIFICA<br/>TU VISITA
        </h1>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce z-10">
        <span className="text-[#E4D5B7]/80 text-xs tracking-[0.3em] uppercase">Baja para reservar</span>
        <svg className="w-5 h-5 text-[#E4D5B7]/80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
