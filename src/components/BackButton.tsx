"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useTransition } from "@/context/TransitionContext";

interface BackButtonProps {
  variant: "sticker" | "bottom";
}

export default function BackButton({ variant }: BackButtonProps) {
  const { triggerTransition } = useTransition();

  const handleGoBack = () => {
    // Navigate back to home with the collage transition
    triggerTransition("/");
  };

  if (variant === "sticker") {
    return (
      <button 
        onClick={handleGoBack}
        className="fixed top-8 left-4 md:top-12 md:left-12 z-50 group hover:scale-110 transition-transform duration-300"
      >
        <div 
          className="inline-flex items-center justify-center px-8 py-4 rounded-[100%] shadow-xl shadow-[#141A2D]/10 bg-[#FFF7EA] border border-[#141A2D]/10 group-hover:shadow-2xl transition-all duration-300"
          style={{ transform: "rotate(-12deg)" }}
        >
          <span className="font-sans font-black text-xl tracking-widest uppercase text-[#141A2D]">
            CARTA
          </span>
        </div>
      </button>
    );
  }

  return (
    <button 
      onClick={handleGoBack}
      className="inline-flex items-center justify-center px-8 py-4 border border-[#141A2D] bg-transparent text-[#141A2D] font-sans font-bold text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-[#141A2D] hover:text-[#FFF7EA] transition-all duration-500 ease-out group"
    >
      <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-2 transition-transform duration-300" />
      Volver a la Carta
    </button>
  );
}
