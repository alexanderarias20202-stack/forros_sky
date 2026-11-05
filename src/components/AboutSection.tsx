import React from 'react';
import { Shield, Sparkles, Award, Users, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-24 bg-neutral-950 text-white border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D92B2B]">
              <span>Sobre Nosotros</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Identidad & Propósito</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-tight [text-wrap:balance]">
              FUERZA MECÁNICA CON <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#D92B2B]">
                ACABADO ARTESANAL
              </span>
            </h2>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                En <strong className="text-white font-semibold">Forros Sky</strong> creemos que el habitáculo de tu vehículo no es solo un medio de transporte, sino un espacio personal de confort, distinción y seguridad.
              </p>
              <p className="text-neutral-400">
                El <span className="text-white font-medium">ala de nuestro logotipo</span> representa velocidad, ligereza y dinamismo en el camino; el <span className="text-[#D92B2B] font-medium">rojo</span>, la pasión por el mundo motor y el detalle estético; y el <span className="text-white font-medium">negro</span>, la solidez, la resistencia y la disciplina del oficio manual.
              </p>
              <p className="text-neutral-400">
                Desde nuestro taller especializado en Barranquilla, atendemos a propietarios que exigen resultados genuinos: costuras rectas que no se deshilachan, espumas con densidad exacta y materiales capaces de desafiar las altas temperaturas sin agrietarse.
              </p>
            </div>

            {/* Promesa de Valor formal */}
            <div className="p-5 rounded-xl bg-[#0D0D0D] border border-neutral-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D92B2B]">
                Nuestra Promesa de Valor
              </span>
              <p className="text-sm text-neutral-200 font-normal leading-relaxed">
                “Trabajo garantizado, materiales de calidad y un acabado que se ve y se siente desde el primer día. Hablamos claro, cumplimos tiempos y cuidamos cada vehículo como si fuera nuestro.”
              </p>
              <div className="pt-2 text-sm font-semibold text-[#D92B2B] italic tracking-wide">
                Tu vehículo, a otro nivel.
              </div>
            </div>
          </div>

          {/* Visual Pair Collage */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-neutral-800 aspect-[4/3] bg-neutral-900 group">
                <img
                  src="/src/assets/images/craftsman_stitching_detail_1793885601216.jpg"
                  alt="Maestro artesano cociendo cuero en máquina industrial en taller Forros Sky"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800">
                <span className="text-xs font-bold text-white block">Costura de Precisión</span>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Hilo de alta resistencia UV calibrado para soportar tensión y roce constante.
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:translate-y-6">
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800">
                <span className="text-xs font-bold text-white block">Taller Especializado</span>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Instalaciones preparadas para desmonte cuidadoso sin alterar sensores ni airbags.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-neutral-800 aspect-[4/3] bg-neutral-900 group">
                <img
                  src="/src/assets/images/taller_acabado_entrega_1793885603262.jpg"
                  alt="Bahía de trabajo y entrega impecable en taller Forros Sky"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6 Personalities of the Brand from Page 3 */}
        <div className="pt-10 border-t border-neutral-800/80">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-6 text-center">
            Pilares de Personalidad Forros Sky
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Resistente', desc: 'Materiales grado automotriz que no se rajan' },
              { label: 'Dinámica', desc: 'Líneas deportivas y estilo vanguardista' },
              { label: 'Precisa', desc: 'Ajuste exacto al milímetro de fábrica' },
              { label: 'Confiable', desc: 'Garantía por escrito sin letras pequeñas' },
              { label: 'Moderna', desc: 'Nanotecnología y procesos actualizados' },
              { label: 'Cercana', desc: 'Atención personalizada en Barranquilla' },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#0D0D0D] border border-neutral-800 text-center hover:border-neutral-700 transition-colors"
              >
                <span className="text-xs font-bold uppercase text-white block tracking-wider">
                  {p.label}
                </span>
                <span className="text-[11px] text-neutral-400 mt-1 block leading-tight">
                  {p.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
