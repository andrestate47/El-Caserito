"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, Heart, Smile, Sparkles } from "lucide-react";

interface PillarItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ExperienceSection() {
  const pillars: PillarItem[] = [
    {
      icon: <Coffee className="w-8 h-8 text-brand-gold" />,
      title: "Ambiente Acogedor",
      description: "Un espacio diseñado para desconectarse de la rutina, conversar tranquilamente y compartir recuerdos con una buena taza de café.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-brand-orange" />,
      title: "Sabor Venezolano",
      description: "Tradición culinaria de nuestro país con ingredientes frescos de la zona y preparaciones hechas al momento con amor.",
    },
    {
      icon: <Smile className="w-8 h-8 text-brand-gold" />,
      title: "Atención Cercana",
      description: "Nos esforzamos por brindarte un trato amable, familiar y cercano. Para nosotros, cada visitante es un invitado de honor en casa.",
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[#FFF3DE] text-[#0B0B0B] z-10 overflow-hidden">
      
      {/* Subtle lines texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#6B3F24_1px,transparent_1px),linear-gradient(to_bottom,#6B3F24_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-3 block">
            Nuestra Esencia
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-brown font-bold tracking-tight mb-4">
            Más que comer, es sentirse en casa.
          </h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto mb-6 rounded-full" />
          <p className="text-[#0B0B0B]/80 text-base md:text-xl font-sans max-w-2xl mx-auto">
            En El Caserito cada plato llega con calidez, cada café invita a quedarse y cada visita se convierte en un momento especial para recordar.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pointer-events-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/40 backdrop-blur-xs border border-white/60 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-[#0B0B0B] flex items-center justify-center mb-6 shadow-md shadow-black/10">
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl text-brand-brown font-bold mb-3">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-[#0B0B0B]/75 leading-relaxed font-sans">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
