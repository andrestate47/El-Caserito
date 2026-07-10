import React from "react";
import ReservationHero from "@/components/ReservationHero";
import ReservationExperience from "@/components/ReservationExperience";
import Footer from "@/components/Footer";


export const metadata = {
  title: "Reservas | El Caserito",
  description: "Haz tu reserva en El Caserito y vive una experiencia inolvidable.",
};

export default function ReservasPage() {
  return (
    <main className="w-full min-h-screen bg-[#141A2D] relative flex flex-col">


      <ReservationHero />
      <ReservationExperience />
      <Footer />
    </main>
  );
}
