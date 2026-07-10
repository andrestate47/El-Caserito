"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section id="historia" className="relative w-full py-24 md:py-32 bg-[#FFF3DE] text-[#0B0B0B] z-10 overflow-hidden">
      
      {/* Subtle paper texture background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#6B3F24_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
        
        {/* Left Column: Text Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.25em]">
            Nuestra Historia
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-brown font-bold tracking-tight leading-tight">
            El sabor de casa, en el corazón de Maturín.
          </h2>
          <div className="w-20 h-1 bg-brand-gold rounded-full" />
          <p className="text-base md:text-xl text-[#0B0B0B]/80 leading-relaxed font-sans mt-2">
            El Caserito es ese lugar donde la comida se siente cercana, cálida y hecha con cariño. Un restaurante pensado para compartir, disfrutar un buen café, una arepa, una ensalada fresca o un corte de carne preparado con dedicación.
          </p>
          <p className="text-sm md:text-base text-[#0B0B0B]/70 leading-relaxed italic">
            "Aquí cada plato cuenta una historia de tradición y cada taza de café se sirve con el calor de nuestro hogar venezolano."
          </p>
        </motion.div>

        {/* Right Column: Image with parallax slide */}
        <motion.div 
          className="lg:col-span-5 relative w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-[#6B3F24]/10 z-10 pointer-events-none" />
          <Image 
            src="/images/restaurante.webp" 
            alt="Interior de El Caserito" 
            fill 
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}
