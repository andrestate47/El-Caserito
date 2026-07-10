"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Check } from "lucide-react";

interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "Todo el menú" },
    { id: "arepas", label: "Arepas" },
    { id: "cafe", label: "Cafetería" },
    { id: "carnes", label: "Carnes" },
    { id: "ensaladas", label: "Ensaladas" },
    { id: "postres", label: "Postres" },
  ];

  const menuItems: MenuItem[] = [
    {
      id: "1",
      category: "arepas",
      name: "Arepa Reina Pepiada",
      description: "Nuestra clásica arepa rellena de ensalada de gallina o pollo desmechado con aguacate y mayonesa.",
      price: "$4.50",
      image: "/images/arepa.webp",
    },
    {
      id: "2",
      category: "arepas",
      name: "Arepa Pelúa",
      description: "Crujiente arepa de maíz amarillo rellena de abundante carne desmechada sazonada y queso amarillo rallado.",
      price: "$4.80",
      image: "/images/arepa.webp",
    },
    {
      id: "3",
      category: "cafe",
      name: "Capuccino de la Casa",
      description: "Espresso doble con leche vaporizada sedosa, cacao espolvoreado y un sutil toque de canela.",
      price: "$2.50",
      image: "/images/cafe.webp",
    },
    {
      id: "4",
      category: "cafe",
      name: "Mocaccino Especial",
      description: "Combinación perfecta de espresso, chocolate espeso venezolano, leche texturizada y crema batida.",
      price: "$3.00",
      image: "/images/cafe.webp",
    },
    {
      id: "5",
      category: "carnes",
      name: "Parrilla El Caserito",
      description: "Corte premium de punta trasera, pechuga de pollo, chorizo, yuca frita, arepitas fritas y ensalada rallada.",
      price: "$14.50",
      image: "/images/carne.webp",
    },
    {
      id: "6",
      category: "carnes",
      name: "Solomo a la Plancha",
      description: "Tierno filete de solomo de cuerito de 300g, sazonado al grill, acompañado con papas fritas o ensalada.",
      price: "$12.00",
      image: "/images/carne.webp",
    },
    {
      id: "7",
      category: "ensaladas",
      name: "Ensalada César Premium",
      description: "Lechugas romanas crujientes, croutons dorados, queso parmesano fresco, aderezo césar y pollo a la plancha.",
      price: "$7.50",
      image: "/images/ensalada.webp",
    },
    {
      id: "8",
      category: "postres",
      name: "Tres Leches Criollo",
      description: "Bizcocho húmedo bañado en tres tipos de leche, coronado con merengue italiano espolvoreado con canela.",
      price: "$3.50",
      image: "/images/restaurante.webp",
    },
  ];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="relative w-full py-24 bg-[#0B0B0B] text-[#FFF3DE] z-10">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-brand-brown/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-3 block">
            Nuestra Carta
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Sabores para cada momento
          </h2>
          <p className="text-brand-cream/75 text-base md:text-xl">
            Desde un café tranquilo hasta una comida especial, en El Caserito siempre hay algo que provoca.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 pointer-events-auto border ${
                activeCategory === cat.id
                  ? "bg-brand-gold text-brand-black border-brand-gold shadow-lg shadow-brand-gold/15"
                  : "bg-transparent text-brand-cream/70 border-brand-cream/20 hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative flex flex-col bg-brand-black/40 border border-brand-cream/10 rounded-2xl overflow-hidden hover:border-brand-gold/40 hover:shadow-2xl hover:shadow-brand-gold/5 transition-all duration-300"
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {/* Card Image */}
              <div className="relative w-full h-48 overflow-hidden bg-black/40">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-brand-black/80 backdrop-blur-xs border border-brand-gold/20 rounded-full text-xs font-bold text-brand-gold">
                  {item.price}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-grow p-5 justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-lg md:text-xl font-bold group-hover:text-brand-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-cream/70 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Pedir Button */}
                <a
                  href={`https://wa.me/58XXXXXXXXXX?text=Hola%20El%20Caserito!%20Me%20gustaría%20ordenar%20el%20plato:%20${encodeURIComponent(item.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-brand-brown/20 hover:bg-brand-gold border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:text-brand-black font-bold text-xs rounded-full transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Pedir por WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
