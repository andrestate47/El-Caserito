"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useTransition } from "@/context/TransitionContext";

// Imágenes de prueba para el collage (Ahora 10 fotos con proporciones fotográficas correctas)
const IMAGES = [
  { id: 1, src: "/platos-caserito/Casuela de marisco.webp", className: "w-[70vw] md:w-[35vw] aspect-[4/5] left-[-10%] top-[-5%]" },
  { id: 2, src: "/platos-caserito/4arepas con queso.webp", className: "w-[75vw] md:w-[40vw] aspect-square right-[-10%] top-[-5%]" },
  { id: 3, src: "/platos-caserito/parrilla.webp", className: "w-[85vw] md:w-[45vw] aspect-[4/3] left-[-5%] bottom-[-5%]" },
  { id: 4, src: "/platos-caserito/cafe con leche.webp", className: "w-[65vw] md:w-[35vw] aspect-[3/4] right-[-5%] bottom-[-5%]" },
  { id: 5, src: "/platos-caserito/ensalada cesar.webp", className: "w-[90vw] md:w-[50vw] aspect-video left-[5%] top-[25%]" },
  { id: 6, src: "/platos-caserito/milanesa pure.webp", className: "w-[80vw] md:w-[45vw] aspect-square right-[5%] top-[20%]" },
  { id: 7, src: "/platos-caserito/paella.webp", className: "w-[85vw] md:w-[45vw] aspect-[4/5] left-[20%] bottom-[15%]" },
  { id: 8, src: "/platos-caserito/trio.webp", className: "w-[75vw] md:w-[40vw] aspect-[3/4] right-[25%] bottom-[10%]" },
  { id: 9, src: "/platos-caserito/pasta al pesto.webp", className: "w-[80vw] md:w-[40vw] aspect-video left-[35%] top-[5%]" },
  { id: 10, src: "/platos-caserito/chicharron aceitunas .webp", className: "w-[85vw] md:w-[45vw] aspect-[4/3] right-[10%] top-[10%]" },
  { id: 11, src: "/platos-caserito/interior1.jpg", className: "w-[100vw] md:w-[55vw] aspect-video left-[10%] top-[45%]" },
  { id: 12, src: "/platos-caserito/coctel_mojito_premium.png", className: "w-[70vw] md:w-[35vw] aspect-[3/4] right-[30%] top-[40%]" },
];

export default function PageTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    isTransitioning,
    setIsTransitioning,
    nextHref,
    setNextHref,
    playOutAnimation,
    setPlayOutAnimation,
  } = useTransition();

  // GSAP Context para limpiar fácilmente
  const gsapCtx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    gsapCtx.current = gsap.context(() => {}, containerRef);
    return () => gsapCtx.current?.revert();
  }, []);

  // Animación IN (cubrir pantalla)
  useEffect(() => {
    if (isTransitioning && nextHref) {
      // Bloquear scroll
      document.body.style.overflow = "hidden";
      
      gsapCtx.current?.add(() => {
        // Asegurarnos de que el contenedor es visible y captura clicks
        gsap.set(containerRef.current, {
          display: "block",
          pointerEvents: "auto",
        });

        // Posiciones iniciales aleatorias para cada imagen desde los bordes de la pantalla
        const starts = IMAGES.map(() => {
          const edge = Math.floor(Math.random() * 4);
          let x = 0, y = 0;
          if (edge === 0) y = -window.innerHeight;
          else if (edge === 1) y = window.innerHeight;
          else if (edge === 2) x = -window.innerWidth;
          else x = window.innerWidth;
          return { x, y, scale: 1.15, opacity: 0 };
        });

        gsap.set(".transition-bg", { opacity: 0 });
        gsap.to(".transition-bg", { opacity: 0.9, duration: 0.4, ease: "power2.out" });

        gsap.set(".collage-photo", {
          x: (i) => starts[i].x,
          y: (i) => starts[i].y,
          scale: (i) => starts[i].scale,
          opacity: 0,
          rotate: () => gsap.utils.random(-8, 8),
        });

        gsap.to(".collage-photo", {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.07,
          ease: "power4.inOut",
          onComplete: () => {
            // Cuando termina la animación de entrada, navegamos
            setIsTransitioning(false);
            setPlayOutAnimation(true);
            router.push(nextHref);
            setNextHref(null);
          },
        });
      });
    }
  }, [isTransitioning, nextHref, router, setIsTransitioning, setPlayOutAnimation, setNextHref]);

  // Animación OUT (revelar nueva página)
  useEffect(() => {
    if (playOutAnimation) {
      gsapCtx.current?.add(() => {
        gsap.to(".transition-bg", { opacity: 0, duration: 0.4, ease: "power3.inOut" });
        gsap.to(".collage-photo", {
          y: -window.innerHeight * 0.5,
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.inOut",
          onComplete: () => {
            // Ocultar contenedor y liberar scroll
            gsap.set(containerRef.current, {
              display: "none",
              pointerEvents: "none",
            });
            document.body.style.overflow = "";
            setPlayOutAnimation(false);
          },
        });
      });
    }
  }, [playOutAnimation, setPlayOutAnimation]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] hidden pointer-events-none overflow-hidden"
    >
      {/* Fondo semitransparente o sólido oscuro si se desea. Añadiré un fondo oscuro leve para asegurar el contraste si no se cubren todos los huecos. */}
      <div className="absolute inset-0 bg-[#081C46] opacity-90 transition-bg" />

      {IMAGES.map((img, i) => (
        <div
          key={img.id}
          className={`collage-photo absolute shadow-2xl bg-[#F7F2E8] border-[6px] border-[#F7F2E8] flex items-center justify-center overflow-hidden ${img.className}`}
          style={{
            willChange: "transform, opacity",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={img.src}
              alt="Transition Image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      ))}
    </div>
  );
}
