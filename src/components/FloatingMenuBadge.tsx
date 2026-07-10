"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";
import { useLenis } from "lenis/react";

export default function FloatingMenuBadge() {
  const pathname = usePathname();
  const { triggerTransition } = useTransition();
  const lenis = useLenis();
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const badgeRef = useRef<HTMLButtonElement>(null);

  // Motion values for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics to make it feel like jelly/elastic (Slower and smoother)
  const springConfig = { damping: 25, stiffness: 80, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Calculate rotation and scale based on movement velocity (WebGL liquid style)
  // When it moves along X, it tilts slightly and stretches
  const rotateX = useTransform(springY, [-100, 100], [15, -15]);
  const rotateY = useTransform(springX, [-100, 100], [-15, 15]);
  
  // Dynamic scale for the "squish" jelly effect
  const distance = useTransform([springX, springY], ([latestX, latestY]: any) => {
    return Math.sqrt(Math.pow(latestX, 2) + Math.pow(latestY, 2));
  });
  
  const scale = useTransform(distance, [0, 100], [1, 1.05]);
  const scaleX = useTransform(springX, [-100, 0, 100], [1.10, 1, 1.10]);
  const scaleY = useTransform(springY, [-100, 0, 100], [1.10, 1, 1.10]);

  // Parallax text transforms
  const textX = useTransform(springX, (val) => val * 0.2);
  const textY = useTransform(springY, (val) => val * 0.2);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        setIsVisible(window.scrollY > 600);
      } else {
        setIsVisible(true);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!badgeRef.current || !isVisible) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = badgeRef.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = clientX - centerX;
      const distY = clientY - centerY;
      
      const dist = Math.hypot(distX, distY);
      
      // Magnetic pull radius: 150px
      if (dist < 150) {
        // Pull button towards cursor
        x.set(distX * 0.4);
        y.set(distY * 0.4);
      } else {
        // Snap back to center
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible, x, y]);

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    // Snap back immediately on click
    x.set(0);
    y.set(0);
    
    setTimeout(() => {
      setIsClicked(false);
      if (pathname === "/") {
        const menuSection = document.getElementById("menu-section");
        if (menuSection) {
          if (lenis) {
            lenis.scrollTo(menuSection, { duration: 2.0, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
          } else {
            menuSection.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          if (lenis) lenis.scrollTo(1000, { duration: 2.0 });
          else window.scrollTo({ top: 1000, behavior: "smooth" });
        }
      } else {
        triggerTransition("/");
      }
    }, 600); // 600ms to allow the bouncy animation to play
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-50 pointer-events-auto"
          style={{ 
            top: "clamp(20px, 15vh, 120px)",
            left: "clamp(10px, 5vw, 60px)",
            perspective: 800 // Required for the 3D rotation effect
          }}
          // WebGL-style appearance: perfect circle growing outwards, slow and elegant
          initial={{ opacity: 0, scale: 0, borderRadius: "100%" }}
          animate={isClicked ? {
            scale: [1, 0.6, 1.3, 0],
            rotate: [0, -30, 360, 360],
            opacity: [1, 1, 1, 0],
            borderRadius: ["100%", "50%", "100%", "100%"]
          } : { opacity: 1, scale: 1, borderRadius: "100%", rotate: 0 }}
          exit={{ opacity: 0, scale: 0, borderRadius: "100%" }}
          transition={isClicked ? {
            duration: 0.6,
            times: [0, 0.2, 0.7, 1],
            ease: "easeInOut"
          } : { 
            type: "spring", 
            stiffness: 80, 
            damping: 15, 
            mass: 1 
          }}
        >
          <motion.button
            ref={badgeRef}
            onClick={handleClick}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
            style={{
              x: springX,
              y: springY,
              rotateX,
              rotateY,
              scale,
              scaleX,
              scaleY,
              backgroundColor: "#FFF7EA",
              color: "#141A2D",
              transformStyle: "preserve-3d"
            }}
            className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-[100%] shadow-[0_15px_40px_rgba(0,0,0,0.45)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-brand-cream/20"
          >
            {/* Inner text container to counter-rotate slightly for a 3D parallax effect */}
            <motion.span 
              className="font-sans font-black text-xs md:text-sm tracking-[0.2em] uppercase pointer-events-none drop-shadow-sm"
              style={{
                x: textX,
                y: textY,
                z: 20
              }}
            >
              CARTA
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
