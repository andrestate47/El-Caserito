"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, BookOpen } from "lucide-react";

export default function ReservationCTA() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-brand-black text-brand-cream z-10 overflow-hidden">
      
      {/* Background Image with Blur and Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-xs scale-105 opacity-35"
        style={{ backgroundImage: "url('/images/restaurante.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-brand-black/80 to-brand-black/95 z-0" />

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="text-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.3em] bg-brand-orange/10 px-4 py-1.5 rounded-full border border-brand-orange/20">
            Reserva tu Mesa
          </span>
          
          <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">
            ¿Se te antojó?
          </h2>
          
          <p className="text-brand-cream/80 text-base md:text-2xl font-serif italic max-w-2xl">
            Escríbenos por WhatsApp, consulta la disponibilidad de hoy o asegura tu mesa para compartir un momento especial.
          </p>

          <p className="text-brand-cream/60 text-xs md:text-sm max-w-lg font-sans">
            Atención al instante de lunes a domingo. También realizamos pedidos para llevar y entregas a domicilio en Maturín.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 pointer-events-auto z-20">
            <a
              href="https://wa.me/58XXXXXXXXXX?text=Hola%20El%20Caserito!%20Me%20gustaría%20realizar%20una%20reserva."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-2.5 hover:translate-y-[-2px] text-sm uppercase tracking-wider"
            >
              <Phone className="w-5 h-5 fill-white" />
              <span>Reservar por WhatsApp</span>
            </a>
            
            <a
              href="#menu"
              className="px-8 py-4 bg-brand-gold hover:bg-[#cda03c] text-brand-black font-bold rounded-full transition-all duration-300 shadow-xl shadow-brand-gold/20 flex items-center justify-center gap-2.5 hover:translate-y-[-2px] text-sm uppercase tracking-wider"
            >
              <BookOpen className="w-5 h-5" />
              <span>Ver la Carta</span>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
