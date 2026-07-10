"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const C = {
  navy: '#0A183C',
  deepNavy: '#081C46',
  gold: '#D4AF37',
  offWhite: '#FAF9F6'
};

export default function NosotrosPage() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <main className="relative min-h-[100svh] selection:bg-[#D4AF37] selection:text-[#0A183C]">
      
      {/* Fixed Parallax Background Image & Hero Content */}
      <div className="fixed inset-0 z-0 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/caseritoantiguo.png"
            alt="El Caserito en sus inicios"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient Overlays for readability */}
          <div className="absolute inset-0 bg-[#0A183C]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A183C] via-[#0A183C]/60 to-transparent opacity-95" />
        </div>

        {/* Hero Content (Now Fixed) */}
        <div className="relative z-10 text-center px-4 mt-24 md:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-[#FDFBD4]/70 uppercase mb-4 block">
              Desde 2015
            </span>
            <h1 className="font-serif italic text-4xl md:text-7xl lg:text-8xl text-brand-gold tracking-wide drop-shadow-lg leading-tight mb-6">
              Nuestra Historia
            </h1>
            <p className="font-sans text-sm md:text-lg text-[#FAF9F6] max-w-xl mx-auto leading-relaxed font-light drop-shadow-md">
              El viaje que transformó una pasión familiar en el hogar del auténtico sabor venezolano en Maturín.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Content Wrapper */}
      <div className="relative z-10">

        {/* Transparent Spacer to allow scrolling past the fixed hero */}
        <div className="relative w-full h-[100svh] pointer-events-none" />

        {/* Story Content Section (Transparent floating over hero) */}
        <section className="relative py-24 md:py-48 px-4 md:px-6 flex justify-center min-h-[120svh]">
          <div className="max-w-3xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="bg-[#081C46]/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-16 shadow-2xl prose prose-lg md:prose-xl prose-p:font-sans prose-p:font-light prose-p:leading-relaxed prose-p:text-[#FAF9F6]/90"
            >
              <h2 className="font-serif font-black text-4xl md:text-5xl mb-12 text-center text-[#D4AF37]">
                El Origen del Auténtico Sabor
              </h2>

              <p className="mb-8">
                En el año 2015, en el corazón de Maturín, abrimos las puertas de El Caserito con una misión muy clara: rescatar el verdadero sabor de la cocina de hogar. En un mundo que va cada vez más rápido, nosotros decidimos ir más lento. Decidimos cocinar como lo hacían nuestras abuelas: con paciencia, con los mejores ingredientes locales y con muchísimo amor.
              </p>

              <p className="mb-8">
                Lo que comenzó como un pequeño sueño familiar se ha convertido en el punto de encuentro de los monaguenses que buscan reconfortarse con una arepa recién hecha, una parrilla en su punto exacto o el inconfundible aroma de un café por la mañana.
              </p>

              <div className="my-16 flex justify-center">
                <div className="w-24 h-[1px] bg-[#D4AF37]/50" />
              </div>

              <p className="mb-8">
                Casi una década después, nuestro compromiso sigue intacto. No somos solo un restaurante; somos la extensión del comedor de tu casa. Cada plato que sale de nuestra cocina lleva consigo la calidez de la tradición venezolana.
              </p>

              <p className="text-center italic font-serif font-bold text-3xl md:text-4xl mt-16 text-[#D4AF37]">
                "Gracias por ser parte de nuestra familia desde 2015."
              </p>
            </motion.div>
          </div>
        </section>



      </div>
    </main>
  );
}
