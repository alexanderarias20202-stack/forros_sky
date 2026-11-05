import React from 'react';
import { BRAND_INFO } from '../data/brandData';
import { ArrowRight, MessageSquare, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: (serviceId?: string) => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onExploreServices }) => {
  const handleWhatsAppHero = () => {
    const msg = encodeURIComponent('¡Hola Forros Sky! Deseo una cotización para transformar el interior y protección de mi vehículo.');
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#0D0D0D]">
      {/* Subtle ambient red energy glow in the background */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D92B2B]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#D9303E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle geometric racing line accents referencing the brand board diagonal cut */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-10">
        <div className="w-full h-full border-r border-[#D92B2B] -skew-x-12 translate-x-16" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Clean unboxed kicker with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#D92B2B]">
              <span>Tapicería Automotriz</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Protección Nano-Cerámica</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">Barranquilla, Colombia</span>
            </div>

            {/* Main Headline with refined typographic hierarchy */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.05] [text-wrap:balance]">
                TU VEHÍCULO, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#D92B2B]">
                  A OTRO NIVEL.
                </span>
              </h1>
              <p className="text-sm font-semibold text-[#D92B2B] italic tracking-wide">
                Tapicería · Protección · Confort · Estilo
              </p>
            </div>

            {/* Value Proposition */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg font-medium text-neutral-200 leading-relaxed [text-wrap:balance]">
                Combinamos <strong className="text-white font-semibold">fuerza mecánica con acabado artesanal</strong>: precisión milimétrica en cada costura, cuero genuino de exportación y blindaje térmico contra el sol de la Costa.
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl">
                Forros a medida exacta sin bolsas ni arrugas, retapizados deportivos, polarizados nano-cerámicos y porcelanización con garantía formal por escrito en nuestro taller especializado.
              </p>
            </div>

            {/* Fast Value Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D92B2B] shrink-0" />
                <span>Medida exacta de butaca original</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D92B2B] shrink-0" />
                <span>Cueros, vinilos y nanotecnología certificados</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D92B2B] shrink-0" />
                <span>Instalación experta por maestros tapiceros</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D92B2B] shrink-0" />
                <span>Garantía formal por escrito</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleWhatsAppHero}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#D92B2B] hover:bg-[#b52222] active:scale-[0.98] transition-all duration-150 rounded-lg shadow-xl shadow-[#D92B2B]/25 group whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Cotizar por WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-200 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all duration-150 rounded-lg whitespace-nowrap"
              >
                <span>Ver Servicios & Portafolio</span>
              </button>
            </div>

            {/* Micro Trust Adjacency */}
            <div className="flex items-center gap-4 pt-2 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 font-medium text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-[#D92B2B]" />
                Atención directa sin intermediarios
              </span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span>Respuesta inmediata en minutos</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Masterpiece */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950 group">
              {/* Image Frame */}
              <div className="aspect-[4/3] lg:aspect-[5/4] w-full overflow-hidden">
                <img
                  src="/src/assets/images/forros_sky_hero_interior_1793885600736.jpg"
                  alt="Interior de vehículo de alta gama con tapicería artesanal en cuero negro y costuras rojas Forros Sky"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>

              {/* Gradient Scrim for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80" />

              {/* Bottom Floating Craft Highlight Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0D0D0D]/90 backdrop-blur-md border border-neutral-800/80 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D92B2B]" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-300">
                        Acabado Deportivo Sky
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Cuero perforado vacuno · Pespunte rojo velocidad
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal('tapiceria-automotriz')}
                    className="text-xs font-semibold text-[#D92B2B] hover:text-white underline underline-offset-4 shrink-0 transition-colors"
                  >
                    Personalizar
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle decorative corner badge */}
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0D0D] border border-neutral-800 rounded-lg text-[11px] text-neutral-300 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#D92B2B]" />
              <span className="font-semibold text-white">Barranquilla</span>
              <span className="text-neutral-500">|</span>
              <span>Taller Propio</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Proof Strip Below Hero Split */}
      <div className="mt-12 border-y border-neutral-800/80 bg-neutral-950/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                +15 <span className="text-[#D92B2B] text-xl font-sans">Años</span>
              </div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
                De oficio y maestría artesanal
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                100% <span className="text-[#D92B2B] text-xl font-sans">A Medida</span>
              </div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
                Corte exacto sin arrugas
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                +4,800
              </div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
                Vehículos transformados
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D92B2B] font-mono tabular-nums">
                100%
              </div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
                Garantía formal por escrito
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
