"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";
import { Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTransition } from "@/context/TransitionContext";

/* ─── Palette tokens ─────────────────────────────────────────────────────── */
const C = {
  warm: "#FFF7EA",
  navy: "#141A2D",
  green: "#3B4A2F",
};

/* ─── Shared Wax Seal Component ──────────────────────────────────────────── */
const WaxSealSVG = ({ className, style, animate, initial, exit, transition }: any) => (
  <motion.div 
    className={`flex items-center justify-center ${className}`} 
    style={{ ...style, backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
    initial={initial}
    animate={animate}
    exit={exit}
    transition={transition}
  >
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
      {/* Wavy Edge (12 bumps) */}
      <circle cx="100" cy="100" r="78" fill="none" stroke="#E5987A" strokeWidth="32" strokeDasharray="0 40.84" strokeLinecap="round" />
      <circle cx="100" cy="100" r="82" fill="#E5987A" />
      <circle cx="100" cy="100" r="64" fill="none" stroke="#C87A5E" strokeWidth="2.5" opacity="0.8" />
      <circle cx="100" cy="100" r="56" fill="none" stroke="#C87A5E" strokeWidth="1" opacity="0.5" />
      <text x="100" y="90" fontFamily="var(--font-serif), serif" fontSize="34" fontWeight="900" fill={C.warm} textAnchor="middle">El</text>
      <text x="100" y="128" fontFamily="var(--font-serif), serif" fontSize="26" fontWeight="900" fill={C.warm} textAnchor="middle" letterSpacing="1">Caserito</text>
    </svg>
  </motion.div>
);

const CATS = [
  { n: "01", label: "DESAYUNOS", img: "/platos-caserito/arepa,caraota,tajada,huevo,carnemechada2.webp" },
  { n: "02", label: "ENTRADAS Y ENSALADAS", img: "/images/platos/CesarConCamarones.png" },
  { n: "03", label: "CARNES Y AVES", img: "/platos-caserito/parrilla.webp" },
  { n: "04", label: "DEL MAR", img: "/platos-caserito/Casuela de marisco.webp" },
  { n: "05", label: "ARROZ Y PASTAS", img: "/platos-caserito/paella.webp" },
  { n: "06", label: "BEBIDAS Y DRINKS", img: "/platos-caserito/coctel_mojito_premium.png" },
  { n: "07", label: "POSTRES", img: "/images/restaurante.webp" }, // Placeholder temporal hasta que haya postre
];


export default function InteractiveMenuSection() {
  const { triggerTransition } = useTransition();
  const [hovered, setHovered] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress to subtle physical movements
  const cardY = useTransform(smoothProgress, [0, 1], [100, -100]);
  const cardRotate = useTransform(smoothProgress, [0, 1], [-4, 0]);
  const cardScale = useTransform(smoothProgress, [0, 1], [0.95, 1.05]);

  return (
    <>
      <section id="menu-section" ref={sectionRef} className="relative w-full h-[100dvh] lg:h-[110dvh] overflow-x-clip flex items-center z-20">
      
      {/* ── Background Image & Dark Overlay ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src="/images/restaurante.webp" 
          alt="Fondo Restaurante" 
          fill 
          sizes="100vw"
          className="object-cover scale-105 opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-[#0B245B] opacity-90" />
      </div>

      <div className="max-w-[1500px] w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-16">
        
        {/* ── Left Side (Printed Paper Card) ── */}
        <div className="lg:w-[55%] z-10 relative">
          
          {/* Paper Card Background with Parallax */}
          <motion.div 
            className="w-full bg-[#FFF7EA] shadow-2xl p-8 md:px-16 md:py-24 relative mt-12 lg:mt-0 min-h-[600px]"
            style={{ 
              y: cardY,
              rotate: cardRotate,
              scale: cardScale,
            }}
          >
            
            {/* Inner Border (Editorial feel) */}
            <div className="absolute inset-4 border" style={{ borderColor: `${C.navy}40` }} />

            {/* Header in the paper */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 mt-4 gap-2">
              <h2 className="font-sans font-bold text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase leading-tight" style={{ color: C.navy }}>
                Nuestra carta te espera
              </h2>
              <span className="font-sans font-bold text-[11px] tracking-[0.25em]" style={{ color: C.navy }}>07</span>
            </div>

            <div className="w-full h-px mb-5 relative z-10" style={{ backgroundColor: C.navy, opacity: 0.2 }} />

            <ul className="flex flex-col relative z-10">
              {CATS.map((cat, i) => {
                const isActive = hovered === i;
                return (
                  <li key={cat.n} className="relative border-b border-dashed" style={{ borderColor: `${C.navy}30` }}>
                    <button
                      className="w-full flex items-center justify-between py-5 md:py-6 px-4 md:px-6 transition-colors duration-300 relative"
                      style={{
                        backgroundColor: isActive ? C.navy : "transparent",
                        color: isActive ? C.warm : C.navy,
                        zIndex: isActive ? 10 : 1,
                        boxShadow: isActive ? "0 10px 20px rgba(0,0,0,0.1)" : "none",
                        backfaceVisibility: "hidden",
                        transform: "translateZ(0)"
                      }}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => triggerTransition(`/menu/${cat.label.toLowerCase().replace(/ /g, "-")}`)}
                    >
                      <div className="flex items-center md:items-baseline gap-3 md:gap-6 relative z-10 w-full overflow-hidden">
                        <span className="font-sans font-bold text-[10px] md:text-xs tracking-widest opacity-50 shrink-0">
                          {cat.n}
                        </span>
                        <span className="font-serif font-bold text-xl sm:text-2xl md:text-4xl tracking-tight leading-tight md:leading-none pt-1 break-words">
                          {cat.label}
                        </span>
                      </div>
                      
                      <motion.div 
                        className="relative z-10 border-l pl-3 md:pl-6 shrink-0"
                        style={{ borderColor: isActive ? C.warm : `${C.navy}30` }}
                        animate={{ x: isActive ? 8 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <ArrowRight size={26} strokeWidth={1.5} />
                      </motion.div>
                    </button>

                    {/* Wax Seal on Active Row */}
                    <AnimatePresence>
                      {isActive && (
                        <WaxSealSVG 
                          initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                          animate={{ opacity: 1, scale: 1, rotate: -12 }}
                          exit={{ opacity: 0, scale: 0.5, rotate: -30 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="absolute right-16 top-1/2 -translate-y-1/2 mt-1 z-30 w-[100px] h-[100px] pointer-events-none"
                        />
                      )}
                    </AnimatePresence>

                    {/* Polaroid Image popping out from the side */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -30, rotate: -10 }}
                          animate={{ opacity: 1, x: 0, rotate: 6 }}
                          exit={{ opacity: 0, x: -20, rotate: 10 }}
                          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute top-1/2 -translate-y-1/2 left-[100%] ml-16 w-[360px] h-[450px] p-4 pb-16 shadow-2xl rounded-sm z-40 hidden lg:block"
                          style={{
                            backgroundColor: C.navy,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0,0,0,0.2)"
                          }}
                        >
                          <div className="relative w-full h-[370px] overflow-hidden border" style={{ borderColor: "rgba(255, 247, 234, 0.1)" }}>
                            <Image
                              src={cat.img}
                              alt={cat.label}
                              fill
                              sizes="(max-width: 1024px) 100vw, 400px"
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute bottom-3 left-0 w-full text-center">
                            <span className="font-serif italic text-lg" style={{ color: C.warm }}>
                              {cat.label.toLowerCase()}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Empty right side flex filler if needed, but flex-row justify-between handles it */}
        <div className="lg:w-[40%] hidden lg:block pointer-events-none"></div>
      </div>
    </section>
    </>
  );
}
