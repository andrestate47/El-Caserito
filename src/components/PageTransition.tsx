"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useTransition } from "@/context/TransitionContext";

// Imágenes de prueba para el collage (Ahora 10 fotos con proporciones fotográficas correctas)
const IMAGES = [
  { id: 1, src: "/platos-caserito/Casuela de marisco.webp", className: "w-[45vw] md:w-[25vw] aspect-[4/5] left-[2%] top-[5%]" },
  { id: 2, src: "/platos-caserito/4arepas con queso.webp", className: "w-[40vw] md:w-[22vw] aspect-square right-[5%] top-[2%]" },
  { id: 3, src: "/platos-caserito/parrilla.webp", className: "w-[50vw] md:w-[30vw] aspect-[4/3] left-[10%] bottom-[10%]" },
  { id: 4, src: "/platos-caserito/cafe con leche.webp", className: "w-[35vw] md:w-[20vw] aspect-[3/4] right-[15%] bottom-[5%]" },
  { id: 5, src: "/platos-caserito/ensalada cesar.webp", className: "w-[60vw] md:w-[35vw] aspect-video left-[20%] top-[35%]" },
  { id: 6, src: "/platos-caserito/milanesa pure.webp", className: "w-[45vw] md:w-[28vw] aspect-square right-[20%] top-[30%]" },
  { id: 7, src: "/platos-caserito/paella.webp", className: "w-[55vw] md:w-[32vw] aspect-[4/5] left-[35%] bottom-[20%]" },
  { id: 8, src: "/platos-caserito/trio.webp", className: "w-[38vw] md:w-[24vw] aspect-[3/4] right-[30%] bottom-[25%]" },
  { id: 9, src: "/platos-caserito/pasta al pesto.webp", className: "w-[42vw] md:w-[26vw] aspect-video left-[45%] top-[10%]" },
  { id: 10, src: "/platos-caserito/chicharron aceitunas .webp", className: "w-[48vw] md:w-[28vw] aspect-[4/3] right-[40%] top-[15%]" },
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
        gsap.to(".transition-bg", { opacity: 0.9, duration: 0.8, ease: "power2.out" });

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
          duration: 0.8,
          stagger: 0.15,
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
        gsap.to(".transition-bg", { opacity: 0, duration: 0.8, ease: "power3.inOut" });
        gsap.to(".collage-photo", {
          y: -window.innerHeight * 0.5,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.1,
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
