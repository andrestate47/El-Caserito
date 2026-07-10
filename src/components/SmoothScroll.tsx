"use client";

import React, { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Sync GSAP with Lenis for any GSAP ScrollTrigger animations (if we add them later)
  useEffect(() => {
    // We only need to configure this if we were extensively using GSAP ScrollTrigger,
    // but ReactLenis handles the basic smooth scroll for the whole app out of the box.
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // Ultra-smooth fluidity
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
