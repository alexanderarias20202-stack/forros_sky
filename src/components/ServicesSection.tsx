import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/brandData';
import { ServiceCategory, ServiceItem } from '../types';
import { Shield, Sparkles, Wrench, ArrowUpRight, Check, Clock, ChevronRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuoteModal: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onOpenQuoteModal }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('todos');

  const categories = [
    { id: 'todos', label: 'Todos los Servicios (12)' },
    { id: 'interior', label: 'Interior (6)' },
    { id: 'proteccion', label: 'Protección (4)' },
    { id: 'mecanica', label: 'Mecánica y Base (2)' },
  ];

  const filteredServices = SERVICES_LIST.filter((service) => {
    if (activeCategory === 'todos') return true;
    return service.category === activeCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'interior':
        return <span className="text-[11px] font-semibold text-[#D92B2B]">Línea Interior</span>;
      case 'proteccion':
        return <span className="text-[11px] font-semibold text-sky-400">Línea Protección</span>;
      case 'mecanica':
        return <span className="text-[11px] font-semibold text-amber-400">Línea Mecánica y Base</span>;
      default:
        return null;
    }
  };

  return (
    <section id="servicios" className="py-24 bg-[#0D0D0D] text-white relative">
      {/* Background design accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D92B2B]">
              <span>Portafolio de Servicios</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>12 Especialidades Integradas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase [text-wrap:balance]">
              INGENIERÍA Y ESTILO PARA CADA MILÍMETRO DE TU AUTO
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Presentamos doce servicios concebidos como un sistema único de protección, confort y elegancia para vehículos en Barranquilla.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (allowed as functional buttons in Constitution §1.A) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-xl shrink-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as ServiceCategory)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D92B2B] text-white shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
            >
              {/* Service Hero Thumbnail for visual presentation */}
              {service.image && (
                <div className="mb-5 -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 overflow-hidden rounded-t-2xl aspect-[16/9] relative border-b border-neutral-800">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('forros_sky_hero_interior.jpg')) {
                        target.src = '/assets/images/forros_sky_hero_interior.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-neutral-700/60 rounded text-[10px] font-semibold text-neutral-300">
                    {service.estimatedTime}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  {getCategoryBadge(service.category)}
                  <span className="text-xs font-mono text-neutral-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#D92B2B] transition-colors flex items-center justify-between">
                  <span>{service.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#D92B2B]" />
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Benefits Bullet Points */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-900">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#D92B2B] mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with CTAs */}
              <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Ver detalles</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(service.id)}
                  className="px-3.5 py-2 bg-[#D92B2B]/10 hover:bg-[#D92B2B] text-[#D92B2B] hover:text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-[#D92B2B]/30 hover:border-[#D92B2B] transition-all duration-150"
                >
                  Cotizar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Differential Box (Directly from Brand Board Page 6) */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D92B2B]">
              Diferencial Forros Sky
            </span>
            <p className="text-sm sm:text-base font-semibold text-white">
              Medida exacta + materiales de calidad + instalación experta + garantía.
            </p>
            <p className="text-xs text-neutral-400">
              Cada vehículo es único y se trabaja a su medida, sin atajos ni materiales genéricos de baja durabilidad.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="px-6 py-3 bg-[#D92B2B] hover:bg-[#b52222] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-[#D92B2B]/20 transition-all shrink-0 whitespace-nowrap"
          >
            Solicitar Asesoría de Taller
          </button>
        </div>
      </div>
    </section>
  );
};
