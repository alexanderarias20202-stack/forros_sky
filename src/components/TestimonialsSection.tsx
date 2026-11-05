import React from 'react';
import { TESTIMONIALS_LIST } from '../data/brandData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonios" className="py-24 bg-[#0D0D0D] text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D92B2B]">
            <Quote className="w-4 h-4" />
            <span>Opiniones de Propietarios</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Clientes Satisfechos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight [text-wrap:balance]">
            LA EXPERIENCIA DE QUIENES YA TIENEN SU AUTO A OTRO NIVEL
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Reseñas directas de conductores y entusiastas automotrices en Barranquilla y la región Caribe.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_LIST.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-all duration-200 hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-4">
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D92B2B] text-[#D92B2B]" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    {t.date}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  “{t.comment}”
                </p>
              </div>

              {/* Author & Vehicle */}
              <div className="mt-6 pt-4 border-t border-neutral-900 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    {t.clientName}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#D92B2B] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verificado</span>
                  </div>
                </div>
                <div className="text-xs text-neutral-400">
                  {t.vehicle} · <span className="text-neutral-300 font-medium">{t.service}</span>
                </div>
                <div className="text-[11px] text-neutral-500">
                  {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
