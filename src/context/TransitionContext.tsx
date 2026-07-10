"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface TransitionContextType {
  triggerTransition: (href: string) => void;
  isTransitioning: boolean;
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
  nextHref: string | null;
  setNextHref: React.Dispatch<React.SetStateAction<string | null>>;
  playOutAnimation: boolean;
  setPlayOutAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextHref, setNextHref] = useState<string | null>(null);
  const [playOutAnimation, setPlayOutAnimation] = useState(false);

  const triggerTransition = (href: string) => {
    setNextHref(href);
    setIsTransitioning(true); // Esto activará la animación IN
    // La navegación real y el setPlayOutAnimation ocurrirán al final de la animación IN,
    // gestionados por el componente PageTransition.
  };

  return (
    <TransitionContext.Provider
      value={{
        triggerTransition,
        isTransitioning,
        setIsTransitioning,
        nextHref,
        setNextHref,
        playOutAnimation,
        setPlayOutAnimation,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};
