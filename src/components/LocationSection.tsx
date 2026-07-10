"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Instagram, Clock, Compass } from "lucide-react";

export default function LocationSection() {
  const coordinates = "9.7490,-63.1812"; // Maturin approximate coords
  const mapQuery = encodeURIComponent("El Caserito Restaurante Maturin Monagas");
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <section id="ubicacion" className="relative w-full py-24 bg-[#FFF3DE] text-[#0B0B0B] z-10">
      
      {/* Decorative dots grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#6B3F24_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-stretch">
        
        {/* Left Column: Contact and Details Card */}
        <motion.div 
          className="lg:col-span-5 flex flex-col justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col gap-6">
            <span className="text-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.25em]">
              Ubicación
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-brown font-bold tracking-tight">
              Estamos en Maturín, Monagas.
            </h2>
            <p className="text-base text-[#0B0B0B]/80 font-sans">
              Ven a vivir la experiencia de El Caserito. Te esperamos con los brazos abiertos, un café recién colado, arepas calientes y platos preparados con el mayor cariño.
            </p>

            <div className="flex flex-col gap-4 mt-4">
              
              {/* Address block */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-brown/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-brand-brown" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-brand-brown">Dirección</h4>
                  <p className="text-sm text-[#0B0B0B]/75">Avenida Principal, Maturín, Monagas, Venezuela.</p>
                </div>
              </div>

              {/* Hours block */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-brown/10 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-brand-brown" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-brand-brown">Horario</h4>
                  <p className="text-sm text-[#0B0B0B]/75">Lunes a Domingo — 8:00 AM a 10:00 PM</p>
                </div>
              </div>

            </div>
          </div>

          {/* Social Links buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-brand-brown text-brand-cream font-bold text-xs uppercase tracking-wider rounded-full hover:bg-brand-brown/95 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:translate-y-[-1px]"
            >
              <Compass className="w-4 h-4" />
              <span>Cómo llegar</span>
            </a>
            <a
              href="https://wa.me/58XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-brand-brown/30 hover:border-brand-brown text-brand-brown font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:translate-y-[-1px]"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://instagram.com/elcaserito"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-brand-brown/30 hover:border-brand-brown text-brand-brown font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:translate-y-[-1px]"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          </div>

        </motion.div>

        {/* Right Column: Stylized map card */}
        <motion.div 
          className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[350px] md:h-auto min-h-[350px] pointer-events-auto"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* We embed a stylized Google Maps iframe for actual interactivity */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.848834468638!2d-63.1932373!3d9.7490089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3341b5278d6b9d%3A0xe104cf5e2d6b97db!2sMaturin%2C%20Monagas!5e0!3m2!1ses!2sve!4v1700000000000!5m2!1ses!2sve"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale contrast-125 brightness-95 opacity-90 hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}
