import React from 'react';
import { BRAND_INFO } from '../data/brandData';
import { MessageSquare, PhoneCall, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenQuoteModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenQuoteModal }) => {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent('¡Hola Forros Sky! Deseo agendar una cita o cotizar para llevar mi vehículo al taller.');
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0D0D0D] via-neutral-950 to-[#0D0D0D] border-t border-neutral-800">
      {/* Background glow and geometric brand accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#D92B2B]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D92B2B]/10 border border-[#D92B2B]/30 text-xs font-bold uppercase tracking-wider text-[#D92B2B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Agenda tu Cupo Esta Semana</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight [text-wrap:balance]">
            ¿LISTO PARA LLEVAR TU VEHÍCULO A OTRO NIVEL?
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed [text-wrap:balance]">
            Visítanos en nuestro taller en Barranquilla o escríbenos directamente por WhatsApp. Te asesoramos con muestras físicas de cueros, colores de costura y películas solares.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D92B2B] hover:bg-[#b52222] active:scale-[0.98] text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-[#D92B2B]/25 transition-all duration-150 group"
            >
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Chatear por WhatsApp Ahora</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-sm font-semibold rounded-xl border border-neutral-800 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#D92B2B]" />
              <span>Llamar al {BRAND_INFO.phone}</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5 font-medium text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-[#D92B2B]" />
              Garantía por escrito
            </span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Instalación en taller propio</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Barranquilla, Atlántico</span>
          </div>
        </div>
      </div>
    </section>
  );
};
