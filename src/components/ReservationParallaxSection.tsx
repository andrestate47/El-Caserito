"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useTransition } from "@/context/TransitionContext";

/* ─── Palette Tokens ─────────────────────────────────────────────────────── */
const C = {
  navy: "#071C45",
  deepNavy: "#051433",
  white: "#FFFFFF",
  cream: "#F7F2E8",
  beige: "#D8C7AF",
  paper: "#FFFDF7",
  ink: "#1B1B1B",
} as const;

export default function ReservationParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { triggerTransition } = useTransition();

  /* ─── Scroll Parallax ──────────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start animation when top of section enters bottom of viewport
    // End when bottom of section leaves top of viewport
    offset: ["start end", "end start"]
  });

  // Background Animations (Direct mapping, no spring needed since Lenis handles smooth scroll)
  const bgY = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  // Card Animations
  const cardY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], ["-6deg", "-1deg"]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden bg-[#051433]"
    >
      {/* ─── Background Parallax ─── */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image 
          src="/images/restaurante.webp" 
          alt="Restaurante Ambiente" 
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Subtle cream/navy overlay for brand integration without heavy mix-blend filters */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071C45]/90 via-[#071C45]/60 to-[#071C45]/90" />
      </motion.div>

      {/* ─── Floating Card (Menu / Reservation) Wrapper ─── */}
      <motion.div
        className="relative z-10 w-[85%] max-w-[400px] md:max-w-[460px] lg:max-w-[500px]"
      >
        <motion.div
          className="w-full shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
          style={{
            backgroundColor: C.paper,
            color: C.navy,
            y: cardY,
            rotate: cardRotate,
            scale: cardScale,
          }}
        >
          
          {/* Top Checkered Pattern */}
          <div className="w-full h-3 flex" style={{ backgroundColor: C.paper }}>
            {[...Array(40)].map((_, i) => (
              <div key={i} className="flex-1 h-full" style={{ backgroundColor: i % 2 === 0 ? C.navy : 'transparent' }} />
            ))}
          </div>

          <div className="w-full px-5 md:px-12 py-10 md:py-16 flex flex-col items-center relative">
            {/* Small Tilted Seal */}
            <div 
              className="absolute -right-2 top-12 md:-right-4 md:top-20 flex items-center justify-center rounded-[50%] border p-1 shadow-sm z-20 w-[55px] h-[35px] md:w-[85px] md:h-[55px]"
              style={{ borderColor: C.navy, backgroundColor: C.paper, transform: "rotate(-15deg)" }}
            >
              <div className="w-full h-full border border-dashed rounded-[50%] flex items-center justify-center" style={{ borderColor: C.navy }}>
                <span className="font-sans font-bold text-[5px] md:text-[8px] leading-tight text-center uppercase" style={{ color: C.navy }}>
                  ¡TE<br/>ESPERAMOS!
                </span>
              </div>
            </div>

            {/* Header Small */}
            <span className="font-serif italic font-bold tracking-[0.2em] text-xs md:text-sm mb-4 opacity-90" style={{ color: C.navy }}>
              EL CASERITO
            </span>

            {/* Big Title */}
            <h2 className="font-serif font-black text-4xl sm:text-5xl md:text-[4rem] leading-[0.9] tracking-tight mb-7">
              TU<br/>RESERVA
            </h2>

            {/* ZigZag Separator */}
            <div className="w-full max-w-[220px] h-[3px] mb-7 opacity-60" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${C.navy} 0, ${C.navy} 2px, transparent 0, transparent 50%)`, backgroundSize: '10px 10px' }}></div>

            {/* Subtitle */}
            <p className="font-sans font-medium text-xs md:text-sm mb-12 opacity-80" style={{ color: C.navy }}>
              Visítanos o aparta tu mesa con anticipación para asegurar tu lugar.
            </p>

            {/* Table / List */}
            <div className="w-full flex flex-col text-left mb-12 border-t border-b" style={{ borderColor: `${C.navy}40` }}>
              
              <div className="flex flex-row border-b min-h-[70px] md:min-h-[85px]" style={{ borderColor: `${C.navy}40` }}>
                <div className="w-1/3 flex flex-col justify-center border-r p-3 md:p-4" style={{ borderColor: `${C.navy}40` }}>
                  <span className="font-sans font-black text-[10px] md:text-xs uppercase tracking-widest">HORARIOS</span>
                </div>
                <div className="w-2/3 flex items-center p-3 md:p-4">
                  <span className="font-sans text-xs md:text-sm opacity-90 leading-relaxed font-medium">
                    Lunes a Domingo<br/>7:30 AM - 4:00 PM
                  </span>
                </div>
              </div>

              <div className="flex flex-row border-b min-h-[70px] md:min-h-[85px]" style={{ borderColor: `${C.navy}40` }}>
                <div className="w-1/3 flex flex-col justify-center border-r p-3 md:p-4" style={{ borderColor: `${C.navy}40` }}>
                  <span className="font-sans font-black text-[10px] md:text-xs uppercase tracking-widest">UBICACIÓN</span>
                </div>
                <div className="w-2/3 flex items-center p-3 md:p-4">
                  <span className="font-sans text-xs md:text-sm opacity-90 leading-relaxed font-medium">
                    Centro de Maturín, Monagas.<br/>Con estacionamiento privado.
                  </span>
                </div>
              </div>

              <div className="flex flex-row min-h-[70px] md:min-h-[85px]">
                <div className="w-1/3 flex flex-col justify-center border-r p-3 md:p-4" style={{ borderColor: `${C.navy}40` }}>
                  <span className="font-sans font-black text-[10px] md:text-xs uppercase tracking-widest">AMBIENTE</span>
                </div>
                <div className="w-2/3 flex items-center p-3 md:p-4">
                  <span className="font-sans text-xs md:text-sm opacity-90 leading-relaxed font-medium">
                    Salón principal climatizado y acogedora terraza al aire libre.
                  </span>
                </div>
              </div>

            </div>

            {/* CTA Button */}
            <button 
              onClick={() => triggerTransition("/reservas")}
              className="w-full py-4 md:py-5 border-[1.5px] border-[#071C45] bg-[#071C45] hover:bg-[#F7F2E8] transition-colors duration-500 ease-out flex items-center justify-center relative group"
            >
              {/* Animated inner border */}
              <div 
                className="absolute inset-1 border border-[#FFFDF7] group-hover:border-[#071C45] transition-colors duration-500 ease-out opacity-80" 
              />
              
              {/* Text content */}
              <span 
                className="font-serif font-black italic text-xs md:text-sm tracking-widest uppercase z-10 transition-colors duration-500 ease-out text-[#FFFDF7] group-hover:text-[#071C45]" 
              >
                Hacer Reserva
              </span>
            </button>

          </div>

          {/* Bottom Checkered Pattern */}
          <div className="w-full h-3 flex" style={{ backgroundColor: C.paper }}>
            {[...Array(40)].map((_, i) => (
              <div key={i} className="flex-1 h-full" style={{ backgroundColor: i % 2 === 0 ? C.navy : 'transparent' }} />
            ))}
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
}
