"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ── Palette Tokens (Realistic Parchment & Caramel Wax) ── */
const C = {
  paperBase: "#D3BE9C", 
  paperLight: "#E5D4B7", // Bottom and Top flaps
  paperSide: "#DCC5A0",  // Side flaps (slightly darker for depth)
  paperShadow: "#B9A27F",
  sealBase: "#b83014",
  sealDark: "#601202",
  sealHighlight: "#f77359"
};

/* ── Realistic 3D Wax Seal Component (Super HD) ── */
const WaxSealSVG = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
  <div 
    className={`flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-[1.03] ${className}`} 
    onClick={onClick}
    style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
  >
    <svg viewBox="0 0 1000 1000" className="w-full h-full" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      <defs>
        <radialGradient id="waxBase" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#C42A2A" />
          <stop offset="50%" stopColor="#8A1313" />
          <stop offset="90%" stopColor="#4A0505" />
          <stop offset="100%" stopColor="#2E0101" />
        </radialGradient>
        
        {/* High-Quality Internal Drop Shadow */}
        <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="20" stdDeviation="15" floodColor="#000000" floodOpacity="0.6" />
        </filter>

        <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feOffset dx="0" dy="30" />
          <feGaussianBlur stdDeviation="20" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="#000000" floodOpacity="0.8" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>

        <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feOffset dx="-5" dy="-5" in="SourceAlpha" result="hiOffset" />
          <feGaussianBlur stdDeviation="8" in="hiOffset" result="hiBlur" />
          <feFlood floodColor="#FF8585" floodOpacity="0.8" />
          <feComposite operator="in" in2="hiBlur" result="hiMask" />
          
          <feOffset dx="10" dy="15" in="SourceAlpha" result="shOffset" />
          <feGaussianBlur stdDeviation="12" in="shOffset" result="shBlur" />
          <feFlood floodColor="#210000" floodOpacity="0.9" />
          <feComposite operator="in" in2="shBlur" result="shMask" />
          
          <feMerge>
            <feMergeNode in="shMask" />
            <feMergeNode in="hiMask" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <g filter="url(#sealShadow)">
        {/* Organic Melted Wax Edge (Overlapping circles) */}
        <circle cx="500" cy="500" r="410" fill="url(#waxBase)" />
        <circle cx="470" cy="425" r="390" fill="url(#waxBase)" />
        <circle cx="540" cy="560" r="380" fill="url(#waxBase)" />
        <circle cx="430" cy="540" r="375" fill="url(#waxBase)" />
        <circle cx="560" cy="440" r="385" fill="url(#waxBase)" />
        
        {/* The Stamp Impression (Recessed circular area) */}
        <circle cx="500" cy="500" r="320" fill="#7A0E0E" filter="url(#innerShadow)" />
        
        {/* The Raised Inner Rim of the stamp */}
        <circle cx="500" cy="500" r="270" fill="none" stroke="#A31C1C" strokeWidth="15" filter="url(#emboss)" />

        {/* Stamped Text (Vector layered for 100% crisp anti-aliasing, no pixelation) */}
        {/* Shadow Layer (Bottom Right) */}
        <g>
          <text x="503" y="443" fontFamily="var(--font-playfair), serif" fontSize="170" fontWeight="900" fill="#3D0000" textAnchor="middle">El</text>
          <text x="503" y="653" fontFamily="var(--font-playfair), serif" fontSize="130" fontWeight="900" fill="#3D0000" textAnchor="middle" letterSpacing="5">Caserito</text>
        </g>
        {/* Highlight Layer (Top Left) */}
        <g>
          <text x="497" y="437" fontFamily="var(--font-playfair), serif" fontSize="170" fontWeight="900" fill="#F06060" textAnchor="middle">El</text>
          <text x="497" y="647" fontFamily="var(--font-playfair), serif" fontSize="130" fontWeight="900" fill="#F06060" textAnchor="middle" letterSpacing="5">Caserito</text>
        </g>
        {/* Base Color Layer */}
        <g>
          <text x="500" y="440" fontFamily="var(--font-playfair), serif" fontSize="170" fontWeight="900" fill="#991515" textAnchor="middle">El</text>
          <text x="500" y="650" fontFamily="var(--font-playfair), serif" fontSize="130" fontWeight="900" fill="#991515" textAnchor="middle" letterSpacing="5">Caserito</text>
        </g>
        
        {/* Overall Specular Gloss Highlight Curve */}
        <path d="M 200 300 Q 450 100 750 250" fill="none" stroke="#FFFFFF" strokeWidth="40" opacity="0.12" filter="blur(10px)" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

// Usamos una variable global en window para que persista durante la navegación SPA (incluso en dev mode),
// pero que se reinicie obligatoriamente cuando el usuario refresca la página (F5).
let isEnvelopeOpened = false;
if (typeof window !== "undefined") {
  isEnvelopeOpened = (window as any).__envelopeOpened === true;
}

export const getIsEnvelopeOpened = () => {
  if (typeof window !== "undefined") {
    return (window as any).__envelopeOpened === true;
  }
  return false;
};

export default function EnvelopeIntro() {
  const [hidden, setHidden] = useState(() => {
    if (typeof window !== "undefined") {
      return (window as any).__envelopeOpened === true;
    }
    return false;
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeBodyRef = useRef<HTMLDivElement>(null);
  const topFlapWrapperRef = useRef<HTMLDivElement>(null);
  const bottomFlapRef = useRef<HTMLDivElement>(null);
  const leftFlapRef = useRef<HTMLDivElement>(null);
  const rightFlapRef = useRef<HTMLDivElement>(null);
  const sealContainerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  
  const isAnimating = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).__envelopeOpened === true) {
      setHidden(true);
      return;
    }
    
    // Forzar el scroll al inicio para evitar que el navegador restaure el scroll
    // a la sección del menú y el usuario vea la carta en lugar del hero al abrir el sobre.
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    
    // Solo bloqueamos el scroll si no está oculto
    document.body.style.overflow = "hidden";
  }, []);

  const completeIntro = () => {
    if (typeof window !== "undefined") {
      (window as any).__envelopeOpened = true;
    }
    document.body.style.overflow = "";
    setHidden(true);
  };

  const openEnvelope = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // Emitir evento para que el Hero sepa que debe preparar sus animaciones
    window.dispatchEvent(new Event("envelopeOpening"));

    const tl = gsap.timeline({
      onComplete: completeIntro
    });

    // 1. Anticipación ultra-suave: El sello se hunde lentamente
    tl.to(sealContainerRef.current, { scale: 0.95, duration: 0.3, ease: "power1.inOut" })
      .to(hintRef.current, { opacity: 0, duration: 0.3 }, "<")
      
      // 2. Bamboleo de la solapa: Sube un poco
      .to(topFlapWrapperRef.current, {
        rotateX: 15,
        duration: 0.4,
        ease: "sine.inOut"
      })
      // Baja
      .to(topFlapWrapperRef.current, {
        rotateX: 0,
        duration: 0.3,
        ease: "sine.inOut"
      })
      // Sube hasta abrirse por completo muy suavemente
      .to(topFlapWrapperRef.current, {
        rotateX: 180, 
        duration: 2.5, // Ultra suave
        ease: "power2.inOut",
        onUpdate: function() {
          const progress = this.progress();
          const yOffset = 5 + (progress * 150); 
          const blur = 15 + (progress * 100);
          const opacity = 0.5 - (progress * 0.4); 
          
          if (topFlapWrapperRef.current) {
            topFlapWrapperRef.current.style.filter = `drop-shadow(0px ${yOffset}px ${blur}px rgba(0,0,0,${Math.max(opacity, 0)}))`;
          }
        }
      }, "+=0.1")
      // A la par que se abre la solapa, desvanecemos el fondo negro para ir mostrando el Hero
      .to(containerRef.current, {
        backgroundColor: "rgba(0,0,0,0)",
        duration: 2.5,
        ease: "power2.inOut"
      }, "<")
      // Abrir solapa inferior (Hacia abajo)
      .to(bottomFlapRef.current, {
        rotateX: -180,
        duration: 2.2,
        ease: "power2.inOut"
      }, "-=2.2")
      // Abrir solapas laterales (Hacia los lados)
      .to(leftFlapRef.current, {
        rotateY: -180,
        duration: 2.0,
        ease: "power2.inOut"
      }, "-=1.9")
      .to(rightFlapRef.current, {
        rotateY: 180,
        duration: 2.0,
        ease: "power2.inOut"
      }, "<")
      
      // Liberar el scroll de la página y el ratón justo cuando las solapas ya están abiertas (antes de que termine de desvanecerse)
      .call(() => {
        document.body.style.overflow = "";
        if (envelopeBodyRef.current) {
          envelopeBodyRef.current.style.pointerEvents = "none";
        }
      }, [], "-=1.5")
      
      // 3. Desvanecer la pantalla completa de forma cinematográfica
      .to(envelopeBodyRef.current, {
        scale: 1.15, // Ligero zoom in para dar efecto de atravesar el sobre
        opacity: 0,
        duration: 1.8,
        ease: "power2.inOut"
      }, "-=1.2")
      .to(containerRef.current, {
        opacity: 0,
        duration: 1
      }, "<");
  };

  const skipIntro = () => {
    if (isAnimating.current) return;
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      onComplete: completeIntro
    });
  };

  if (hidden) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-black"
    >
      <button 
        onClick={skipIntro}
        className="absolute top-16 right-8 text-[#991515] hover:text-[#C42A2A] font-sans text-sm tracking-[0.3em] uppercase transition-colors z-[110] pointer-events-auto font-bold"
      >
        Saltar
      </button>

      {/* Contenedor del Sobre masivo */}
      {/* 2px de desbordamiento en cada borde para ocultar cualquier línea de corte y que cubra toda la pantalla */}
      <div 
        ref={envelopeBodyRef}
        className="absolute w-[calc(100%+4px)] h-[calc(100dvh+4px)] -left-[2px] -top-[2px] pointer-events-auto transition-transform" 
        style={{ perspective: "1800px" }}
      >
        
        {/* SVG Filter for Paper Noise Texture */}
        <svg className="hidden">
          <filter id="paperNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.08 0" in="noise" result="coloredNoise" />
            <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
          </filter>
        </svg>

        {/* NOTA: El sobre es hueco para que se vea el Hero al abrirse */}
        
        {/* 1. Solapa Izquierda */}
        <div
          ref={leftFlapRef}
          className="absolute top-0 bottom-0 left-0 w-[50.5%] pointer-events-none z-10"
          style={{
            backgroundColor: C.paperSide,
            clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            filter: "drop-shadow(6px 0px 15px rgba(0,0,0,0.35)) drop-shadow(2px 0px 5px rgba(0,0,0,0.2)) url(#paperNoise)",
            transformOrigin: "left"
          }}
        />
        
        {/* 2. Solapa Derecha */}
        <div
          ref={rightFlapRef}
          className="absolute top-0 bottom-0 right-0 w-[50.5%] pointer-events-none z-10"
          style={{
            backgroundColor: C.paperSide,
            clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)",
            filter: "drop-shadow(-6px 0px 15px rgba(0,0,0,0.35)) drop-shadow(-2px 0px 5px rgba(0,0,0,0.2)) url(#paperNoise)",
            transformOrigin: "right"
          }}
        />

        {/* 3. Solapa Inferior (Sobre las laterales) */}
        <div
          ref={bottomFlapRef}
          className="absolute bottom-0 left-0 w-full h-[50.5%] pointer-events-none z-20"
          style={{
            backgroundColor: C.paperLight,
            clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
            filter: "drop-shadow(0px -4px 12px rgba(0,0,0,0.4)) drop-shadow(0px -1px 3px rgba(0,0,0,0.3)) url(#paperNoise)",
            transformOrigin: "bottom"
          }}
        />

        {/* 4. Solapa Superior (Animada) */}
        <div 
          ref={topFlapWrapperRef}
          className="absolute inset-0 w-full h-[100dvh] pointer-events-none z-30"
          style={{ 
            // Crisper shadow to match the reference image lighting
            filter: "drop-shadow(0px 8px 20px rgba(0,0,0,0.5)) drop-shadow(0px 3px 6px rgba(0,0,0,0.3))", 
            perspective: "1800px",
            transformOrigin: "top"
          }}
        >
          {/* Geometría de la solapa superior */}
          <div
            className="absolute top-0 left-0 w-full h-[51%]"
            style={{
              backgroundColor: C.paperLight,
              clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
              filter: "url(#paperNoise)"
            }}
          >
             {/* Highlight en los bordes diagonales */}
             <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(255,255,255,0.3)]" style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }} />
          </div>
          {/* Sello de Cera hiperrealista (Anclado a la solapa superior) */}
          <div 
            ref={sealContainerRef}
            className="absolute top-[51%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] md:w-[180px] md:h-[180px] pointer-events-auto z-40"
            style={{ transformStyle: "preserve-3d" }}
          >
            <WaxSealSVG onClick={openEnvelope} />
            
            {/* Texto de instrucción flotante */}
            <span 
              ref={hintRef}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-sans text-xs tracking-[0.4em] text-[#520404] uppercase whitespace-nowrap opacity-80"
              style={{ textShadow: "0px 1px 2px rgba(255,255,255,0.2)" }}
            >
              Clica para abrir
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

