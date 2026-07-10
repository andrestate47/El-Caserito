import React from "react";
import { menuData } from "@/data/menuData";
import MenuCategoryClient from "@/components/MenuCategoryClient";
import BackButton from "@/components/BackButton";

export default async function MenuCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category.toLowerCase();
  const categoryData = menuData[categorySlug];

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-[#FFF7EA] text-[#141A2D] flex flex-col items-center justify-center p-8">
        <h1 className="font-serif text-4xl mb-4">Categoría no encontrada</h1>
        <BackButton variant="bottom" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7EA] text-[#141A2D] flex flex-col items-center py-24 px-6 md:px-12 selection:bg-[#141A2D] selection:text-[#FFF7EA] relative overflow-x-hidden">
      
      {/* ─── ENCABEZADO ─── */}
      <div className="max-w-4xl w-full text-center space-y-6 mb-20 animate-fade-in-up mt-16 md:mt-0">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase">
          {categoryData.title}
        </h1>
        <div className="w-20 md:w-32 h-[2px] bg-[#E5987A] mx-auto opacity-80" />
        <p className="font-sans text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
          {categoryData.description}
        </p>
      </div>

      {/* ─── CLIENT COMPONENT FOR HOVER REVEAL ─── */}
      <MenuCategoryClient subcategories={categoryData.subcategories} />
      
      {/* ─── BOTÓN VOLVER (Opcional, pero lo mantenemos por si bajan mucho) ─── */}
      <div className="mt-32 pb-12 w-full flex justify-center animate-fade-in-up" style={{ animationDelay: "800ms" }}>
        <BackButton variant="bottom" />
      </div>

    </div>
  );
}
