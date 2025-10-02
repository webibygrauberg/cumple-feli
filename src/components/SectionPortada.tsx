import React from "react";

export default function SectionPortada() {
  return (
    <section className="relative w-30 h-[75vh] md:h-[130vh] overflow-hidden">
      {/* Fondo para escritorio */}
      <div className="absolute inset-0 bg-[url('/img/desktopPortada.png')] bg-cover bg-center  hidden md:block"></div>

      {/* Fondo para celular */}
      <div className="absolute inset-0 bg-[url('/img/mobilePortada.png')] bg-cover bg-center  block md:hidden"></div>

      
    </section>
  );
}
