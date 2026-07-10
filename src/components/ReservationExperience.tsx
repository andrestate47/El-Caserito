"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

export default function ReservationExperience() {
  const lenis = useLenis();
  const [opened, setOpened] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "19:00",
    guests: "2",
    notes: ""
  });

  const sceneRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const closedHintRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<(HTMLElement | null)[]>([]);

  const busy = useRef(false);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "584247222220"; // Número real de El Caserito
    
    const message = `*NUEVA SOLICITUD DE RESERVA* 🍽️
Hola El Caserito, quiero solicitar una mesa:

👤 *Nombre:* ${formData.name}
📅 *Fecha:* ${formData.date}
⏰ *Hora:* ${formData.time}
👥 *Personas:* ${formData.guests}
💬 *Notas especiales:* ${formData.notes || "Ninguna"}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  /* ── Mount ── */
  useEffect(() => {
    // Animación de levitación suave (floating) para la tarjeta cerrada
    gsap.to(cardRef.current, {
      y: -10,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  /* ── Expand Sequence ── */
  const openCard = () => {
    if (busy.current || opened) return;
    busy.current = true;
    
    // Detener la animación de levitación
    gsap.killTweensOf(cardRef.current);

    // Scroll automatically to center the card on the screen
    if (cardRef.current) {
      if (lenis) {
        lenis.scrollTo(cardRef.current, { duration: 1.5, offset: -50, easing: (t) => 1 - Math.pow(1 - t, 3) });
      } else {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // 0. Set content to flex (but invisible) so GSAP can calculate the target 'auto' height correctly
    gsap.set(cardContentRef.current, { display: "flex", opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        setOpened(true);
      },
    });

    // 1. Ocultar el texto de ayuda
    tl.to(closedHintRef.current, { opacity: 0, duration: 0.3 })
      .set(closedHintRef.current, { display: "none" })
      
      // 2. Expandir la tarjeta suavemente
      .to(cardRef.current, {
        y: 0,
        width: "100%",
        maxWidth: "100%",
        height: "auto",
        borderRadius: "0px",
        duration: 1.5,
        ease: "power2.inOut",
        boxShadow: "none",
        cursor: "default"
      })

      // 3. Mostrar el contenido interior
      .to(cardContentRef.current, { opacity: 1, duration: 0.8 }, "-=0.8")
      
      // 4. Stagger de los elementos de texto
      .fromTo(
        textElementsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" },
        "-=0.6"
      );
  };

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !textElementsRef.current.includes(el)) {
      textElementsRef.current.push(el);
    }
  };

  return (
    <section ref={sceneRef} className="relative z-20 w-full min-h-[50vh] flex items-center justify-center bg-[#141A2D] py-16 px-4 md:px-8">
      
      <div className="w-full max-w-7xl relative flex flex-col items-center justify-center min-h-[40vh]">
        
        {/* ── THE CARD ── */}
        <div 
          ref={cardRef} 
          onClick={openCard}
          className="bg-[#FDFBF7] shadow-2xl overflow-hidden flex flex-col items-center justify-center relative transition-transform"
          style={{
            width: "clamp(280px, 80vw, 400px)",
            height: "clamp(180px, 55vw, 250px)",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}
        >
          {/* Ticket Borders (Top & Bottom) */}
          <div className="absolute top-0 left-0 w-full h-[12px] md:h-[16px] z-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(to right, #0A192F 0, #0A192F 16px, transparent 16px, transparent 32px)" }} />
          <div className="absolute bottom-0 left-0 w-full h-[12px] md:h-[16px] z-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(to right, #0A192F 0, #0A192F 16px, transparent 16px, transparent 32px)" }} />

          {/* Hint text when closed */}
          <div ref={closedHintRef} className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-6 text-center">
            <span className="text-[#0A192F] font-serif font-bold text-3xl mb-4 tracking-tight drop-shadow-sm">TU RESERVA</span>
            <span className="text-[#0A192F]/60 text-xs uppercase tracking-[0.2em] font-medium border border-[#0A192F]/20 rounded-full px-4 py-2 bg-white/50 backdrop-blur-sm">Haz clic para abrir</span>
          </div>

          {/* Inner Content wrapper (Hidden initially) */}
          <div ref={cardContentRef} className="relative opacity-0 hidden w-full max-w-4xl mx-auto px-6 py-24 md:py-32 flex-col items-center flex-grow pointer-events-auto">
            
            <p ref={addToRefs} className="text-[#0A192F] font-serif italic text-sm md:text-base tracking-[0.2em] uppercase mb-4 text-center">
              El Caserito
            </p>
            
            <h2 ref={addToRefs} className="text-[#0A192F] font-serif font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-8 text-center" style={{ textShadow: "2px 2px 0px rgba(10,25,47,0.05)" }}>
              TU<br/>RESERVA
            </h2>
            
            {/* Dashed Separator */}
            <div ref={addToRefs} className="w-full max-w-[200px] md:max-w-[300px] border-t-2 border-dashed border-[#0A192F]/40 mb-8" />
            
            <p ref={addToRefs} className="text-[#0A192F] font-serif italic text-lg md:text-xl text-center mb-16 px-4">
              Para consultas, reservas o pedidos especiales
            </p>

            {/* Formulario Interactivo */}
            <form onSubmit={handleWhatsAppSubmit} ref={addToRefs} className="w-full max-w-xl flex flex-col mb-16 gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-[#0A192F] font-bold tracking-[0.15em] text-xs md:text-sm uppercase">Nombre Completo</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-[#0A192F]/20 py-2 focus:outline-none focus:border-[#0A192F] text-[#0A192F] font-sans font-medium text-base md:text-lg transition-colors placeholder:text-[#0A192F]/50"
                  placeholder="Tu nombre completo..."
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[#0A192F] font-bold tracking-[0.15em] text-xs md:text-sm uppercase">Fecha</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-[#0A192F]/20 py-2 focus:outline-none focus:border-[#0A192F] text-[#0A192F] font-sans font-medium text-base md:text-lg transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[#0A192F] font-bold tracking-[0.15em] text-xs md:text-sm uppercase">Hora</label>
                  <input 
                    type="time" 
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-[#0A192F]/20 py-2 focus:outline-none focus:border-[#0A192F] text-[#0A192F] font-sans font-medium text-base md:text-lg transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#0A192F] font-bold tracking-[0.15em] text-xs md:text-sm uppercase">Número de Personas</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-[#0A192F]/20 py-2 focus:outline-none focus:border-[#0A192F] text-[#0A192F] font-sans font-medium text-base md:text-lg transition-colors cursor-pointer"
                >
                  {[1,2,3,4,5,6,7,8,"9+"].map(num => (
                    <option key={num} value={num} className="font-sans text-sm">{num} {num === 1 ? 'persona' : 'personas'}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#0A192F] font-bold tracking-[0.15em] text-xs md:text-sm uppercase">Requerimientos Especiales (Opcional)</label>
                <textarea 
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-[#0A192F]/20 py-2 focus:outline-none focus:border-[#0A192F] text-[#0A192F] font-sans font-medium text-base md:text-lg transition-colors resize-none placeholder:text-[#0A192F]/50"
                  placeholder="Silla de bebé, alergias, celebraciones..."
                />
              </div>

              <button 
                type="submit"
                className="mt-8 px-8 py-5 md:px-12 md:py-6 border-[3px] border-double border-[#0A192F] text-[#0A192F] font-bold tracking-[0.25em] text-xs md:text-sm uppercase hover:bg-[#0A192F] hover:text-[#FDFBF7] transition-all duration-300 w-full"
              >
                Confirmar Reserva por WhatsApp
              </button>
            </form>

            {/* Stamp "¡TE ESPERAMOS!" */}
            <div ref={addToRefs} className="absolute top-24 right-4 md:top-32 md:right-16 lg:right-24 rotate-[15deg] w-20 h-20 md:w-28 md:h-28 rounded-[100%] border border-[#0A192F] flex items-center justify-center p-1 opacity-90 hidden sm:flex">
              <div className="w-full h-full rounded-[100%] border border-[#0A192F] border-dashed flex items-center justify-center">
                 <span className="text-[#0A192F] font-bold text-[8px] md:text-[10px] tracking-widest text-center uppercase leading-tight">¡Te<br/>esperamos!</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
