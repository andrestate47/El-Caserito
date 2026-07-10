"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface FeaturedItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  details: string[];
}

export default function FeaturedDishes() {
  const features: FeaturedItem[] = [
    {
      id: "fd1",
      tag: "Especialidad Criolla",
      title: "Arepas de la Casa",
      description: "Crujientes, calientes y preparadas con el sabor tradicional venezolano que a todos encanta. Una masa suave por dentro con un tostado exterior perfecto.",
      image: "/platos-caserito/4arepas con queso.webp",
      details: ["Ingredientes 100% frescos", "Masa artesanal", "Variedad de rellenos clásicos"],
    },
    {
      id: "fd2",
      tag: "Gourmet de Tarde",
      title: "Café Especial",
      description: "La combinación ideal de granos seleccionados y barismo profesional. Perfecto para comenzar el día, conversar o acompañar una buena tarde de tertulia.",
      image: "/platos-caserito/cafe con leche.webp",
      details: ["Granos seleccionados nacionales", "Baristas certificados", "Tostado medio aromático"],
    },
    {
      id: "fd3",
      tag: "Frescura y Sabor",
      title: "Ensalada César",
      description: "Fresca, crujiente, cremosa y preparada al momento con lechugas seleccionadas, crotones de pan hechos en casa y el toque secreto de nuestro aderezo César.",
      image: "/platos-caserito/ensalada cesar.webp",
      details: ["Aderezo casero", "Parmesano genuino rallado al momento", "Pollo al grill marinado"],
    },
    {
      id: "fd4",
      tag: "Al Carbón / Brasa",
      title: "Cortes de Carne",
      description: "Carnes seleccionadas de primera calidad, preparadas con absoluta dedicación y servidas al punto exacto de cocción con el toque especial de brasa de El Caserito.",
      image: "/platos-caserito/parrilla.webp",
      details: ["Cortes premium nacionales", "Cocido lento a las brasas", "Acompañantes tradicionales"],
    },
  ];

  return (
    <section id="destacados" className="relative w-full py-24 md:py-32 bg-[#050505] text-[#FFF3DE] z-10 overflow-hidden">
      
      {/* Light glow effects */}
      <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[35%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-3 block">
            Nuestros Orgullos
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            Nuestras Recomendaciones
          </h2>
          <div className="w-24 h-1 bg-brand-orange mt-4 rounded-full" />
        </div>

        {/* Alternate Items list */}
        <div className="flex flex-col gap-24 md:gap-32">
          {features.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center"
              >
                
                {/* Image Side (Alternating layout using order in CSS) */}
                <motion.div 
                  className={`lg:col-span-6 relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden border border-brand-cream/15 shadow-3xl ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                </motion.div>

                {/* Text Content Side */}
                <motion.div 
                  className={`lg:col-span-6 flex flex-col gap-5 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <span className="text-brand-gold text-xs md:text-sm font-semibold tracking-wider bg-brand-gold/10 px-3 py-1 rounded-full self-start">
                    {item.tag}
                  </span>
                  
                  <h3 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-brand-cream/80 text-sm md:text-base leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Bullet details list */}
                  <ul className="flex flex-col gap-2.5 mt-2">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-brand-cream/75 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Link */}
                  <a
                    href="#menu"
                    className="flex items-center gap-2 mt-4 text-brand-gold hover:text-brand-orange font-bold text-sm transition-colors duration-300 self-start group pointer-events-auto"
                  >
                    <span>Ver platos similares</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-[-1px]" />
                  </a>

                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
