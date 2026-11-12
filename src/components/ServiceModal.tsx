import React from 'react';
import { ServiceItem } from '../types';
import { BRAND_INFO } from '../data/brandData';
import { X, Check, Clock, Shield, Sparkles, MessageSquare } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuoteWithService: (serviceName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onOpenQuoteWithService,
}) => {
  if (!service) return null;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `¡Hola Forros Sky! Me interesa recibir asesoría y cotización para el servicio: *${service.name}* (${service.categoryLabel}).`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#0D0D0D] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-neutral-800 text-white transition-colors"
          aria-label="Cerrar modal de servicio"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Thumbnail if present */}
        {service.image && (
          <div className="aspect-[16/8] w-full relative bg-neutral-950 overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('forros_sky_hero_interior.jpg')) {
                  target.src = '/assets/images/forros_sky_hero_interior.jpg';
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6">
              <span className="px-2.5 py-1 bg-[#D92B2B] text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
                {service.categoryLabel}
              </span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            {!service.image && (
              <span className="text-xs font-bold uppercase tracking-wider text-[#D92B2B] block mb-1">
                {service.categoryLabel}
              </span>
            )}
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
              {service.name}
            </h3>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
              Beneficios Clave
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-200">
                  <Check className="w-3.5 h-3.5 text-[#D92B2B] mt-0.5 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Materials & Turnaround */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Materiales Empleados
              </span>
              <ul className="text-xs text-neutral-300 space-y-1">
                {service.materials.map((m, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#D92B2B]" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Tiempo en Taller
              </span>
              <div className="flex items-center gap-2 text-xs font-medium text-white">
                <Clock className="w-4 h-4 text-[#D92B2B]" />
                <span className="font-mono">{service.estimatedTime}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenQuoteWithService(service.name);
              }}
              className="w-full sm:w-auto px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold rounded-xl border border-neutral-800 transition-colors"
            >
              Llenar Formulario Web
            </button>
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#D92B2B] hover:bg-[#b52222] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#D92B2B]/20 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Cotizar por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
