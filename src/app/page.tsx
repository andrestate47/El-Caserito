import React from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import HeroExperience from "@/components/HeroExperience";
import InteractiveMenuSection from "@/components/InteractiveMenuSection";
import EditorialSliderSection from "@/components/EditorialSliderSection";
import ReservationParallaxSection from "@/components/ReservationParallaxSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full relative bg-[#0B0B0B]">
      {/* Intro Overlay */}
      <EnvelopeIntro />

      {/* Editorial Hero with Interactive Cursor Image Trail */}
      <HeroExperience />
      
      {/* Interactive Menu Section — editorial category showcase */}
      <InteractiveMenuSection />
      
      {/* Editorial Horizontal Slider */}
      <EditorialSliderSection />
      
      {/* Subsequent Page Sections */}
      <ReservationParallaxSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
