"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import Image from "next/image";
import { MenuSubcategory } from "@/data/menuData";

interface MenuCategoryClientProps {
  subcategories: MenuSubcategory[];
}

export default function MenuCategoryClient({ subcategories }: MenuCategoryClientProps) {
  const [hoveredItem, setHoveredItem] = useState<{ image: string; name: string } | null>(null);

  // Mouse position state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth springs for the floating image position
  const springX = useSpring(0, { stiffness: 100, damping: 20 });
  const springY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [springX, springY]);

  return (
    <>
      <div className="max-w-4xl w-full space-y-24">
        {subcategories.map((subcat, i) => (
          <div key={i} className="flex flex-col w-full animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 150}ms` }}>
            
            {/* Título de Subcategoría */}
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-serif text-3xl md:text-4xl italic text-[#141A2D]">
                {subcat.title}
              </h2>
              <div className="flex-1 h-[1px] bg-[#141A2D] opacity-20" />
            </div>

            {/* Ítems de la Subcategoría */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {subcat.items.map((item, j) => (
                <li 
                  key={j} 
                  className="flex flex-col group cursor-pointer relative"
                  onMouseEnter={() => {
                    if (item.image) setHoveredItem({ image: item.image as string, name: item.name });
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                  }}
                  onClick={() => {
                    // En móviles (o si no hay hover real), al tocar alterna la foto
                    if (item.image) {
                      setHoveredItem(prev => prev?.name === item.name ? null : { image: item.image as string, name: item.name });
                    }
                  }}
                >
                  <div className="flex items-end justify-between mb-2">
                    <h3 className="font-sans font-black text-sm md:text-base uppercase tracking-wider text-[#141A2D] group-hover:text-[#E5987A] transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="flex-1 mx-4 border-b-2 border-dotted border-[#141A2D]/20 mb-[6px] group-hover:border-[#E5987A]/50 transition-colors duration-300" />
                    <span className="font-serif font-bold text-lg md:text-xl whitespace-nowrap text-[#141A2D] group-hover:text-[#E5987A] transition-colors duration-300">
                      {item.price !== "-" ? <span className="text-xs opacity-60 mr-1">Ref.</span> : null}{item.price}
                    </span>
                  </div>
                  {item.description && (
                    <p className="font-serif italic text-sm md:text-base opacity-70 leading-snug w-[85%] group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  )}
                  {/* Inline Image Accordion for Mobile */}
                  <AnimatePresence>
                    {item.image && hoveredItem?.name === item.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="md:hidden overflow-hidden rounded-sm"
                      >
                        <div className="relative w-full h-48 border border-[#141A2D]/10 rounded-sm overflow-hidden">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 320px"
                            priority={false}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

      {/* Floating Hover Image Reveal */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed pointer-events-none z-50 w-[250px] h-[300px] md:w-[320px] md:h-[380px] shadow-2xl rounded-sm p-3 pb-12 hidden md:block"
            style={{
              left: 0,
              top: 0,
              marginLeft: "-160px",
              marginTop: "-190px",
              x: springX,
              y: springY,
              backgroundColor: "#141A2D"
            }}
          >
            <div className="relative w-full h-full overflow-hidden border" style={{ borderColor: "rgba(255, 247, 234, 0.1)" }}>
              <Image 
                src={hoveredItem.image} 
                alt={hoveredItem.name} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
            {/* Pequeño texto decorativo de polaroid */}
            <div className="absolute bottom-3 left-0 w-full text-center px-3">
              <span className="font-serif italic text-sm md:text-base leading-tight block truncate" style={{ color: "#FFF7EA" }}>
                {hoveredItem.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
