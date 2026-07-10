"use client";

import React, { useState, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

const C = {
  navy: "#0B245B",
  deepNavy: "#081C46",
  white: "#FFFFFF",
  cream: "#F7F2E8",
  beige: "#D8C7AF",
  ink: "#1B1B1B",
};

interface Stamp {
  id: number;
  x: number;
  y: number;
  rotation: string;
  text: string;
}

interface HoldButtonProps {
  href: string;
  className: string;
  style?: React.CSSProperties;
  fillClassName: string;
  labelNode: React.ReactNode;
  logoNode: React.ReactNode;
}

const HoldButton: React.FC<HoldButtonProps> = ({ href, className, style, fillClassName, labelNode, logoNode }) => {
  const [state, setState] = useState<'idle' | 'holding' | 'success'>('idle');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.type === 'mousedown' && (e as React.MouseEvent).button !== 0) return;
    setState('holding');
    timerRef.current = setTimeout(() => {
      setState('success');
      setTimeout(() => {
        window.open(href, '_blank');
        setState('idle');
      }, 1000);
    }, 2000);
  };

  const cancelHold = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (state !== 'success') {
      setState('idle');
    }
  };

  return (
    <div
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      onTouchCancel={cancelHold}
      onContextMenu={(e) => { e.preventDefault(); cancelHold(); }}
      className={`relative group overflow-hidden cursor-pointer ${className}`}
      style={{ ...style, WebkitTouchCallout: 'none', userSelect: 'none', touchAction: 'none' }}
      data-interactive="true"
    >
      <div 
        className={`absolute inset-0 origin-left ${fillClassName} z-0`}
        style={{
          transform: state === 'holding' || state === 'success' ? 'scaleX(1)' : 'scaleX(0)',
          transition: state === 'holding' ? 'transform 2000ms linear' : 'transform 400ms ease-out'
        }}
      />
      
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        {state === 'success' ? (
          <span className="font-serif italic font-black text-2xl md:text-3xl text-white drop-shadow-md animate-pulse">
            OK
          </span>
        ) : (
          <>
            <div className={`absolute flex items-center justify-center transition-all duration-[600ms] ease-in-out group-hover:opacity-0 group-hover:scale-90 group-hover:translate-y-2 ${state === 'holding' ? 'opacity-0 scale-90 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}>
              {labelNode}
            </div>
            <div className={`absolute flex items-center justify-center transition-all duration-[600ms] ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 text-white drop-shadow-md delay-100 ${state === 'holding' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 -translate-y-2'}`}>
              {logoNode}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function Footer() {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const stampTexts = ["CASERITO"];

  const handleFooterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return;
    if (!footerRef.current) return;
    
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotation = `${Math.floor(Math.random() * 25) - 12}deg`;
    const text = stampTexts[Math.floor(Math.random() * stampTexts.length)];
    const newStamp = { id: Date.now(), x, y, rotation, text };
    
    setStamps((prev) => [...prev, newStamp]);

    setTimeout(() => {
      setStamps((currentStamps) => currentStamps.filter((s) => s.id !== newStamp.id));
    }, 4500);
  };

  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      // Use Lenis for a very slow, premium scroll (duration in seconds)
      lenis.scrollTo(0, { duration: 2.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer 
      className="relative w-full z-10 pt-16 flex flex-col items-center justify-center selection:bg-[#F7F2E8] selection:text-[#081C46] overflow-hidden"
      style={{ backgroundColor: C.deepNavy }}
    >
      {/* Absolute background element if needed, but since it's the end of the page, it can just float. We'll let it float over whatever is below. */}
      
      {/* ─── STAMP CSS ─── */}
      <style>{`
        .stamp-mark {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          animation: stampIn 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, stampOut 0.5s ease-in forwards 3.5s;
          /* Color dorado del texto 2015 */
          color: #D4AF37; 
          mix-blend-mode: multiply; /* Efecto de tinta real sobre papel */
          font-family: var(--font-serif), serif;
          font-weight: 900;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1.5px solid #D4AF37;
          border-radius: 4px;
          padding: 0.25rem 1rem;
          white-space: nowrap;
          z-index: 40;
        }

        /* Force normal pointer on interactive elements */
        footer a, footer button {
          cursor: pointer !important;
        }

        @keyframes stampIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.6) rotate(var(--rotation));
            filter: blur(1px);
          }
          to {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1) rotate(var(--rotation));
            filter: blur(0);
          }
        }

        @keyframes stampOut {
          from {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1) rotate(var(--rotation));
          }
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95) rotate(var(--rotation));
            filter: blur(2px);
          }
        }

        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          display: flex;
        }

        .marquee-content {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Main Box matching the reference image */}
      <div 
        ref={footerRef}
        onClick={handleFooterClick}
        onMouseMove={(e) => {
          if (!footerRef.current || !cursorRef.current) return;
          const rect = footerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          cursorRef.current.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0) rotate(-12deg)`;
          
          const target = e.target as HTMLElement;
          const isInteractive = target.closest('a, button, [data-interactive="true"]');
          cursorRef.current.style.opacity = isInteractive ? "0" : "1";
        }}
        onMouseEnter={() => {
          if (cursorRef.current) cursorRef.current.style.opacity = "1";
        }}
        onMouseLeave={() => {
          if (cursorRef.current) cursorRef.current.style.opacity = "0";
        }}
        onMouseDown={() => {
          if (cursorRef.current) cursorRef.current.style.transform += " scale(0.85)";
        }}
        onMouseUp={(e) => {
          if (cursorRef.current) {
            const rect = footerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cursorRef.current.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0) rotate(-12deg)`;
          }
        }}
        className="relative w-[95%] max-w-[1300px] border-[3px] border-b-0 border-double shadow-2xl cursor-none flex flex-col overflow-hidden"
        style={{ backgroundColor: C.cream, borderColor: C.deepNavy, color: C.deepNavy }}
      >
        {/* ─── CUSTOM "CLIC" CURSOR ─── */}
        <div 
          ref={cursorRef}
          className="pointer-events-none absolute z-50 w-20 h-20 border-[2px] rounded-full flex items-center justify-center opacity-0 transition-[opacity,transform] duration-[300ms,75ms] ease-out"
          style={{ 
            borderColor: C.deepNavy, 
            color: C.deepNavy,
            top: 0,
            left: 0,
            transform: "translate3d(-50%, -50%, 0) rotate(-12deg)",
            willChange: "transform",
            backgroundColor: "transparent",
            backdropFilter: "blur(2px)",
          }}
        >
          <div 
            className="w-[85%] border-t-[2px] border-b-[2px] py-1 flex items-center justify-center" 
            style={{ borderColor: C.deepNavy }}
          >
            <span className="font-serif font-black text-lg uppercase tracking-widest pl-1 drop-shadow-sm">
              CLIC
            </span>
          </div>
        </div>

        {/* ─── STAMPS RENDER ─── */}
        {stamps.map((stamp) => (
          <div
            key={stamp.id}
            className="stamp-mark"
            style={{ 
              left: stamp.x, 
              top: stamp.y, 
              '--rotation': stamp.rotation 
            } as React.CSSProperties}
          >
            {stamp.text}
          </div>
        ))}

        {/* Top Spacer (Stamp Area) */}
        <div className="w-full h-[350px] md:h-[200px]">
        </div>

        {/* ─── GRID LINKS SECTION ─── */}
        <div className="w-full flex flex-col border-t" style={{ borderColor: C.deepNavy }}>
          
          <div className="flex flex-col md:flex-row w-full">
            {/* Left Column: Contáctanos (WhatsApp) */}
            <HoldButton 
              href="https://wa.me/584247222220"
              className="w-full md:w-1/4 border-b md:border-b-0 md:border-r flex items-center justify-center bg-[#081C46]/5 h-[65px] md:h-auto"
              style={{ borderColor: C.deepNavy }}
              fillClassName="bg-[#25D366]/85 backdrop-blur-md"
              labelNode={<h4 className="font-serif font-black italic text-xl md:text-2xl text-center leading-tight uppercase">WHATSAPP</h4>}
              logoNode={
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 2c-5.513 0-9.988 4.474-9.988 9.988 0 1.944.509 3.844 1.478 5.518L2 22l4.63-1.215a9.96 9.96 0 0 0 5.401 1.577c5.514 0 9.988-4.475 9.988-9.988S17.545 2 12.031 2zm5.72 14.331c-.244.686-1.42 1.309-1.95 1.385-.505.071-1.157.142-3.414-.793-2.714-1.124-4.442-3.876-4.577-4.057-.134-.181-1.092-1.45-1.092-2.766 0-1.315.684-1.961.927-2.227.243-.265.529-.331.706-.331.176 0 .353.001.507.008.163.007.382-.061.597.458.221.536.75 1.83.816 1.962.066.132.11.287.022.463-.088.177-.132.287-.265.441-.132.155-.276.331-.397.441-.132.121-.27.254-.122.507.149.254.662 1.092 1.424 1.77 1.011.899 1.821 1.18 2.074 1.301.254.121.403.105.551-.061.149-.166.64-.75.811-1.009.171-.259.342-.215.574-.132.232.083 1.467.695 1.72.827.254.132.425.199.486.309.061.111.061.64-.183 1.326z"/>
                </svg>
              }
            />

            {/* Right Columns Grid */}
            <div className="w-full md:w-3/4 flex flex-col">
              {/* Row 1 */}
              <div className="grid grid-cols-3 w-full border-b" style={{ borderColor: C.deepNavy }}>
                <HoldButton 
                  href="https://www.instagram.com/elcaseritorestaurante/" 
                  className="border-r flex items-center justify-center bg-[#081C46]/5 min-h-[80px]" 
                  style={{ borderColor: C.deepNavy }}
                  fillClassName="bg-gradient-to-r from-[#833ab4]/85 via-[#fd1d1d]/85 to-[#fcb045]/85 backdrop-blur-md"
                  labelNode={<span className="font-sans font-bold text-[9px] md:text-[10px] lg:text-[11px] tracking-widest uppercase">Instagram</span>}
                  logoNode={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  }
                />
                <a href="/nosotros" className="p-4 border-r flex items-center justify-center hover:bg-[#081C46]/5 transition-colors font-sans font-bold text-[9px] md:text-[10px] lg:text-[11px] tracking-widest uppercase" style={{ borderColor: C.deepNavy }}>
                  Nosotros
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 flex items-center justify-center font-sans font-bold text-[9px] md:text-[10px] lg:text-[11px] tracking-widest uppercase text-center hover:bg-[#081C46]/5 transition-colors"
                >
                  Créditos
                </a>
              </div>
              
              {/* Row 2 */}
              <div className="grid grid-cols-3 w-full">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Av.+Andres+Eloy+Blanco,+Maturín+6201,+Monagas,+Venezuela"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-r flex items-center justify-center hover:bg-[#081C46]/5 transition-colors font-sans font-bold text-[8px] md:text-[9px] lg:text-[10px] leading-[1.6] tracking-[0.15em] uppercase text-center" 
                  style={{ borderColor: C.deepNavy }}
                >
                  Av. Andres Eloy Blanco, Maturín 6201, Monagas, Venezuela
                </a>
                <a href="/carta.pdf" download="Carta_El_Caserito.pdf" className="p-4 border-r flex items-center justify-center hover:bg-[#081C46]/5 transition-colors font-sans font-bold text-[9px] md:text-[10px] lg:text-[11px] tracking-widest uppercase" style={{ borderColor: C.deepNavy }}>
                  Nuestra Carta (PDF)
                </a>
                <button onClick={scrollToTop} className="p-4 flex items-center justify-center hover:bg-[#081C46]/5 transition-colors font-sans font-bold text-[9px] md:text-[10px] lg:text-[11px] tracking-widest uppercase">
                  Subir <ArrowUp className="ml-2 w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ─── MARQUEE ─── */}
        <div className="w-full border-t py-3 marquee-container" style={{ borderColor: C.deepNavy }}>
          <div className="marquee-content font-sans font-bold text-[9px] md:text-[10px] tracking-widest uppercase flex gap-8 px-4">
            {/* We duplicate the entire string multiple times to ensure perfect infinite seamless loop */}
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span>TRADICIÓN</span>
                <span>•</span>
                <span>DESAYUNOS</span>
                <span>•</span>
                <span>ALMUERZOS</span>
                <span>•</span>
                <span>SABOR DE CASA</span>
                <span>•</span>
                <span>FAMILIA</span>
                <span>•</span>
                <span>CAFÉ</span>
                <span>•</span>
                <span>RESERVAS</span>
                <span>•</span>
                <span>EVENTOS</span>
                <span>•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Checkered Pattern */}
        <div className="w-full h-4 flex border-t" style={{ backgroundColor: C.cream, borderColor: C.deepNavy }}>
          {[...Array(80)].map((_, i) => (
            <div key={i} className="flex-1 h-full" style={{ backgroundColor: i % 2 === 0 ? C.deepNavy : 'transparent' }} />
          ))}
        </div>

      </div>

      {/* ─── STANDARD LEGAL BOTTOM BAR ─── */}
      <div className="w-[95%] max-w-[1300px] flex flex-col sm:flex-row justify-between items-center py-4 mt-2 text-[#F7F2E8]/60 font-sans text-[8px] md:text-[10px] tracking-wider uppercase gap-2 pb-4 text-center">
        <div className="mb-1 sm:mb-0">
          © {new Date().getFullYear()} El Caserito. Todos los derechos reservados.
        </div>
        <div className="flex flex-row gap-3 items-center">
          <a href="#" className="hover:text-[#F7F2E8] transition-colors">Políticas de Privacidad</a>
          <span className="opacity-50">|</span>
          <a href="#" className="hover:text-[#F7F2E8] transition-colors">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
}
