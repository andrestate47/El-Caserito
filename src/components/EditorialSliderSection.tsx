"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";

/* ─── Palette tokens ─────────────────────────────────────────────────────── */
const C = {
  navy: "#0B245B",
  deepNavy: "#081C46",
  white: "#FFFFFF",
  cream: "#F7F2E8",
  beige: "#D8C7AF",
  ink: "#1B1B1B",
  frame: "#594A41",
} as const;

/* ─── Shared Wax Seal Component ──────────────────────────────────────────── */
const WaxSealSVG = ({ className, style }: any) => (
  <div 
    className={`flex items-center justify-center pointer-events-none select-none ${className}`} 
    style={{ ...style, backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
  >
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
      {/* Wavy Edge (12 bumps) - Inverted colors for maximum contrast */}
      <circle 
        cx="100" cy="100" r="78" 
        fill="none" stroke={C.navy} strokeWidth="32" 
        strokeDasharray="0 40.84" strokeLinecap="round" 
      />
      {/* Solid Core */}
      <circle cx="100" cy="100" r="82" fill={C.navy} />
      
      {/* Inner Decorative Rings */}
      <circle cx="100" cy="100" r="64" fill="none" stroke={C.cream} strokeWidth="2.5" opacity="0.9" />
      <circle cx="100" cy="100" r="56" fill="none" stroke={C.cream} strokeWidth="1" opacity="0.6" />
      
      {/* Text */}
      <text x="100" y="90" fontFamily="var(--font-serif), serif" fontSize="34" fontWeight="900" fill={C.white} textAnchor="middle">
        El
      </text>
      <text x="100" y="128" fontFamily="var(--font-serif), serif" fontSize="26" fontWeight="900" fill={C.white} textAnchor="middle" letterSpacing="1">
        Caserito
      </text>
    </svg>
  </div>
);

/* ─── Image Parallax Card Component ──────────────────────────────────────── */
const ParallaxCard = ({ img, title, rot, isSeal, yOffset }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div 
      ref={ref}
      className={`relative flex-shrink-0 w-[90vw] md:w-[70vw] lg:w-[60vw] h-[58vh] md:h-[68vh] rounded-xl p-4 md:p-6 group cursor-pointer shadow-xl ${yOffset || ""}`}
      style={{
        backgroundColor: C.navy,
        transform: `rotate(${rot}deg)`,
        transformOrigin: "center center",
      }}
      whileHover={{ scale: 1.02, rotate: rot > 0 ? rot + 1 : rot - 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Inner Frame for Image */}
      <div 
        className="relative w-full h-full overflow-hidden rounded-md"
        style={{ border: `1px solid ${C.navy}80` }}
      >
        <motion.div 
          className="absolute inset-[-10%] w-[120%] h-[120%]"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitFontSmoothing: "antialiased" 
          }}
        >
          <Image 
            src={img} 
            alt={title} 
            fill 
            className="object-cover" 
            sizes="(max-w-768px) 100vw, 50vw" 
          />
        </motion.div>
      </div>
      
      {/* Optional Decorative Wax Seal over the image frame */}
      {isSeal && (
        <WaxSealSVG 
          className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-6 z-30 w-[90px] h-[90px] md:w-[110px] md:h-[110px]"
          style={{ transform: "rotate(-12deg)" }}
        />
      )}
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function EditorialSliderSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic scroll range calculation based on viewport width to handle wider cards beautifully
  const [scrollRange, setScrollRange] = useState("-110vw");

  useEffect(() => {
    const updateRange = () => {
      const w = window.innerWidth;
      if (w < 768) {
        // Mobile: 5 cards of 90vw each
        setScrollRange("-410vw");
      } else if (w < 1024) {
        // Tablet: 5 cards of 70vw each
        setScrollRange("-310vw");
      } else {
        // Desktop: 5 cards of 60vw each
        setScrollRange("-250vw");
      }
    };
    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, []);

  // Transform vertical scroll [0, 1] to horizontal slide [0vw, scrollRange]
  // This avoids complex CSS calc() strings which can break Framer Motion interpolation
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", scrollRange]);

  const cards = [
    { id: 1, img: "/platos-caserito/4arepas con queso.webp", title: "Arepas con Queso", rot: -3, yOffset: "translate-y-4 md:translate-y-8", isSeal: false },
    { id: 2, img: "/platos-caserito/interior1.jpg", title: "Ambiente", rot: 4, yOffset: "-translate-y-6 md:-translate-y-10", isSeal: true },
    { id: 3, img: "/platos-caserito/parrilla.webp", title: "Parrillas", rot: -2, yOffset: "translate-y-5 md:translate-y-12", isSeal: false },
    { id: 4, img: "/platos-caserito/Casuela de marisco.webp", title: "Cazuela de Marisco", rot: 5, yOffset: "-translate-y-4 md:-translate-y-8", isSeal: false },
    { id: 5, img: "/platos-caserito/coctel_mojito_premium.png", title: "Cócteles", rot: -4, yOffset: "translate-y-3 md:translate-y-6", isSeal: false },
  ];

  return (
    <section style={{ backgroundColor: C.cream }}>
      {/* Editorial Header (Scrolls normally, disappears first before horizontal slider starts) */}
      <div className="w-full px-6 md:px-12 flex flex-col items-center text-center pt-20 md:pt-32 pb-10 relative z-10">
        <div className="flex flex-col items-center justify-center max-w-4xl relative">
          {/* Title */}
          <h2 
            className="font-serif font-black text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-6 md:mb-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:skew-x-[-12deg] hover:-skew-y-[2deg] hover:scale-y-[1.15] hover:scale-x-[0.95] hover:tracking-[0.02em] cursor-default inline-block origin-center" 
            style={{ color: C.navy }}
          >
            SABOR DE CASA<br />
            RECIÉN HECHO
          </h2>
          
          {/* Small floating "EL CASERITO" badge next to the title */}
          <div 
            className="absolute -right-4 md:-right-8 top-12 md:top-16 flex items-center px-3 py-1 rounded-sm font-serif italic text-[10px] md:text-xs tracking-wide shadow-sm border"
            style={{ backgroundColor: C.navy, borderColor: C.cream, color: C.cream, transform: "rotate(4deg)" }}
          >
            EL CASERITO
          </div>

          {/* Paragraph */}
          <p 
            className="font-sans text-sm md:text-lg leading-relaxed max-w-[600px] opacity-90" 
            style={{ color: C.navy }}
          >
            En El Caserito preparamos sabores de casa con ese toque cálido que provoca volver siempre. Platos auténticos, atención cercana y recetas que hacen sentir tradición, familia y hogar.
          </p>
        </div>
      </div>

      {/* Horizontal Slider Section (Sticky) */}
      <div ref={containerRef} className="relative w-full h-[500vh]">
        {/* Sticky Container holds the view while scrolling the 500vh height */}
        <div className="sticky top-0 flex flex-col h-screen overflow-hidden justify-center">
          
          {/* Horizontal Scrolling Slider Track */}
          <div className="w-full relative flex items-center overflow-hidden">
            <motion.div 
              className="flex gap-8 md:gap-16 px-[10vw] items-center w-max"
              style={{ x }}
            >
              {cards.map((c) => (
                <ParallaxCard key={c.id} {...c} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

