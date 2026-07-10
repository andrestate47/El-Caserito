"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  size: "large" | "medium" | "small";
}

export default function GallerySection() {
  const galleryItems: GalleryItem[] = [
    { id: "g1", image: "/platos-caserito/Casuela de marisco.webp", title: "Cazuela del Mar", size: "large" },
    { id: "g2", image: "/platos-caserito/trio.webp", title: "Trío de Empanaditas", size: "small" },
    { id: "g3", image: "/platos-caserito/pasta al pesto.webp", title: "Pasta al Pesto", size: "medium" },
    { id: "g4", image: "/platos-caserito/chicharron aceitunas .webp", title: "Chicharrón de Pescado", size: "medium" },
    { id: "g5", image: "/platos-caserito/milanesa pure.webp", title: "Milanesa con Puré", size: "small" },
    { id: "g6", image: "/platos-caserito/varias parrillas.webp", title: "Cortes a la Parrilla", size: "large" },
  ];

  return (
    <section id="galeria" className="relative w-full py-24 bg-[#0B0B0B] text-[#FFF3DE] z-10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-3 block">
            Galería Visual
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            Momentos en El Caserito
          </h2>
          <div className="w-20 h-1 bg-brand-gold mt-4 rounded-full" />
        </div>

        {/* Mobile View: Horizontal Scroll Carousel */}
        <div className="flex md:hidden overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x pointer-events-auto">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="relative min-w-[280px] h-[350px] rounded-2xl overflow-hidden snap-center border border-brand-cream/10"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-5">
                <h3 className="font-serif text-lg font-bold text-brand-cream">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Grid Layout */}
        <div className="hidden md:grid grid-cols-12 gap-6 auto-rows-[220px] pointer-events-auto">
          {galleryItems.map((item, index) => {
            // Determine grid spans based on item size
            let colSpan = "col-span-4";
            let rowSpan = "row-span-1";

            if (item.size === "large") {
              colSpan = "col-span-6";
              rowSpan = "row-span-2";
            } else if (item.size === "medium") {
              colSpan = "col-span-4";
              rowSpan = "row-span-2";
            } else if (item.size === "small") {
              colSpan = "col-span-3";
              rowSpan = "row-span-1";
            }

            // Adjust spans to make a perfect masonry layout
            if (index === 1) colSpan = "col-span-3";
            if (index === 4) colSpan = "col-span-2";

            return (
              <motion.div
                key={item.id}
                className={`${colSpan} ${rowSpan} group relative rounded-3xl overflow-hidden border border-brand-cream/10 cursor-pointer shadow-lg`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Black gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-brand-gold text-[10px] uppercase tracking-[0.2em] font-bold">El Caserito</span>
                    <h3 className="font-serif text-xl font-bold text-brand-cream mt-1">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
