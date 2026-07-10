"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, Phone, BookOpen, Star } from "lucide-react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { getIsEnvelopeOpened } from "./EnvelopeIntro";

export default function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const currentIndex = useRef(0);
  const globalZIndex = useRef(1);
  const [startReveal, setStartReveal] = useState(false);

  // ── Sincronización con la animación de la Carta ───────────────────────────
  useEffect(() => {
    // Si la carta ya se abrió antes (navegación SPA), mostrar inmediatamente
    if (getIsEnvelopeOpened()) {
      setStartReveal(true);
      return;
    }

    const handleEnvelope = () => {
      // Retrasar el montaje para que los textos empiecen a animarse justo cuando 
      // las solapas de la carta se están abriendo (aprox 1.2s después del clic)
      setTimeout(() => {
        setStartReveal(true);
      }, 1200);
    };

    window.addEventListener("envelopeOpening", handleEnvelope);
    return () => window.removeEventListener("envelopeOpening", handleEnvelope);
  }, []);

  const images = [
    "/platos-caserito/4arepas con queso.webp",
    "/platos-caserito/cafe con leche.webp",
    "/platos-caserito/parrilla.webp",
    "/platos-caserito/ensalada cesar.webp",
    "/platos-caserito/Casuela de marisco.webp",
    "/platos-caserito/milanesa pure.webp",
    "/platos-caserito/paella.webp",
    "/platos-caserito/trio.webp",
  ];

  // ── Optimized Combined Mouse Move Logic ──────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Cache layout to prevent layout thrashing (huge performance killer)
    let rect = container.getBoundingClientRect();
    
    // Throttle resize events
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        rect = container.getBoundingClientRect();
      }, 200);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial setup for custom cursor
    const cursor = cursorRef.current;
    if (cursor && window.innerWidth >= 768) {
      gsap.set(cursor, { x: -100, y: -100, opacity: 0 });
    }

    const onEnter = () => { if (cursor && window.innerWidth >= 768) gsap.to(cursor, { opacity: 1, duration: 0.2 }); };
    const onLeave = () => { if (cursor && window.innerWidth >= 768) gsap.to(cursor, { opacity: 0, duration: 0.2 }); };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Si el touch o mouse está fuera del contenedor, no hacemos nada
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        if (cursor && !('touches' in e)) gsap.to(cursor, { opacity: 0, duration: 0.2, overwrite: "auto" });
        return;
      }

      // 1. Update Custom Cursor Instantly (only desktop)
      if (cursor && !('touches' in e)) {
        gsap.set(cursor, { x, y, opacity: 1, overwrite: "auto" });
      }

      // 2. Image Trail Logic
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const distance = Math.hypot(dx, dy);
      
      const isMobile = window.innerWidth < 768;
      const threshold = isMobile ? 120 : 250;

      // Only spawn a new image if cursor moved at least threshold
      if (distance > threshold) {
        lastPos.current = { x, y };

        const index = currentIndex.current;
        const imgEl = imageRefs.current[index];

        if (imgEl) {
          globalZIndex.current += 1;

          const offsetDist = Math.random() * 20;
          const offsetAngle = Math.random() * Math.PI * 2;
          const offsetX = Math.cos(offsetAngle) * offsetDist;
          const offsetY = Math.sin(offsetAngle) * offsetDist;
          const rotation = Math.random() * 16 - 8;

          const centerX = isMobile ? 100 : 175;
          const centerY = isMobile ? 150 : 262;

          gsap.killTweensOf(imgEl);
          gsap.set(imgEl, { clearProps: "all" });

          gsap.fromTo(
            imgEl,
            { x: x + offsetX - centerX, y: y + offsetY - centerY, opacity: 0, scale: 0.9, rotate: rotation, zIndex: globalZIndex.current },
            {
              opacity: 0.9,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.2)",
              onComplete: () => {
                gsap.to(imgEl, {
                  opacity: 0,
                  scale: 0.85,
                  y: "+=400", // Gravedad hacia abajo restaurada
                  duration: 0.8,
                  delay: 1.2,
                  ease: "power3.in", // Aceleración agresiva
                });
              },
            }
          );
        }

        // Loop index circularly
        currentIndex.current = (currentIndex.current + 1) % images.length;
      }
    };

    // Usamos window para atrapar el mouse/touch incluso si hay un overlay de transición temporalmente encima
    window.addEventListener("mousemove", handleMove as EventListener, { passive: true });
    window.addEventListener("touchmove", handleMove as EventListener, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove as EventListener);
      window.removeEventListener("touchmove", handleMove as EventListener);
      if (cursor) gsap.killTweensOf(cursor);
      imageRefs.current.forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
    };
  }, [images.length]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[600px] bg-[#0A183C] text-[#FDFBD4] overflow-hidden flex flex-col justify-center items-center select-none [&_*]:cursor-none"
      style={{ cursor: "none" }} // hide native cursor on desktop (CSS handles mobile)
    >
      {/* ── Custom Coffee Cup Cursor (desktop only) ── */}
      <div
        ref={cursorRef}
        className="hidden md:flex pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ top: 0, left: 0, willChange: "transform" }}
        aria-hidden="true"
      >
        <span className="text-2xl leading-none select-none drop-shadow-lg">
          ☕
        </span>
      </div>

      {/* Dark overlay removed to let the brand navy color shine through */}

      {/* Animated Ambient Orbs (Using pure CSS for better performance) */}
      <div 
        className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 animate-pulse animate-float-slow"
        style={{ background: "radial-gradient(circle, #E5987A 0%, transparent 60%)" }}
      />
      <div 
        className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-10 animate-pulse animate-float-medium"
        style={{ background: "radial-gradient(circle, #D8C7AF 0%, transparent 60%)", animationDelay: "2s" }}
      />

      {/* Editorial Content Layer (Z-index 20 so it remains readable above images) */}
      <div className="relative z-20 text-center max-w-5xl px-6 flex flex-col items-center gap-8 md:gap-10 pointer-events-auto mt-[-5vh]">
        {startReveal && (
          <>
            <div className="flex flex-col gap-4 md:gap-6 items-center">
              {/* Reveal Title */}
              <div className="overflow-hidden py-4 px-2">
                <motion.h1 
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="font-serif text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tight text-[#FDFBD4] leading-none drop-shadow-2xl"
                >
                  El Caserito
                </motion.h1>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-brand-gold tracking-wide max-w-3xl leading-snug drop-shadow-lg px-4"
              >
                Tradición y sabor de casa desde <span className="text-[1.3em] font-semibold mx-1 leading-none align-baseline">2015</span>
              </motion.p>
            </div>




          </>
        )}
      </div>

      {/* Image Trail Elements (Visible on all devices, scaled down on mobile) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {images.map((src, index) => (
          <div
            key={index}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute w-[200px] h-[300px] md:w-[350px] md:h-[525px] opacity-0 rounded-2xl overflow-hidden border border-brand-cream/15 shadow-2xl bg-brand-black"
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src={src}
              alt="Plato Caserito"
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* ── Editorial Marquee Strip ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="hero-marquee absolute bottom-0 left-0 right-0 z-30 overflow-hidden"
        style={{
          background: "transparent",
        }}
      >
        {/* Inner scrolling track — duplicated for seamless loop */}
        <div
          className="marquee-track flex items-center"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            width: "max-content",
          }}
        >
          {[
            "DESPUÉS DEL TRABAJO",
            "CITA ROMÁNTICA",
            "SABOR DE CASA",
            "PAUSA DEL MEDIODÍA",
            "ALMUERZO",
            "CAFÉ CALIENTE",
            "AREPAS RECIÉN HECHAS",
            "COMER RICO",
            "COMPARTIR",
            "VOLVER SIEMPRE",
            "MOMENTOS EN FAMILIA",
            "ANTOJOS DE MATURÍN",
            "EL TOQUE CASERITO",
          ]
            /* Duplicate the list so the loop is invisible */
            .concat([
              "DESPUÉS DEL TRABAJO",
              "CITA ROMÁNTICA",
              "SABOR DE CASA",
              "PAUSA DEL MEDIODÍA",
              "ALMUERZO",
              "CAFÉ CALIENTE",
              "AREPAS RECIÉN HECHAS",
              "COMER RICO",
              "COMPARTIR",
              "VOLVER SIEMPRE",
              "MOMENTOS EN FAMILIA",
              "ANTOJOS DE MATURÍN",
              "EL TOQUE CASERITO",
            ])
            .map((phrase, i) => (
              <React.Fragment key={i}>
                <span
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(0.7rem, 1.4vw, 1.05rem)",
                    letterSpacing: "0.2em",
                    color: "#FDFBD4",
                    padding: "0.85rem 1.6rem",
                  }}
                >
                  {phrase}
                </span>
                <span style={{ 
                  color: "#FFFFFF", 
                  opacity: 1,
                  textShadow: "0 0 4px #fff, 0 0 8px #fff, 0 0 12px rgba(255,255,255,0.8)"
                }}>•</span>
              </React.Fragment>
            ))}
        </div>
      </div>

    </section>
  );
}
