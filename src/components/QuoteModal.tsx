import React, { useState, useEffect } from 'react';
import { SERVICES_LIST, VEHICLE_TYPES, BRAND_INFO } from '../data/brandData';
import { X, MessageSquare, Send, Check, ShieldCheck } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  onOpenFormWithData?: (vehicle: string, service: string) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  onOpenFormWithData,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState('suv');
  const [selectedService, setSelectedService] = useState('forros');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedService(preSelectedServiceId);
    }
  }, [preSelectedServiceId]);

  if (!isOpen) return null;

  const currentVehicle = VEHICLE_TYPES.find((v) => v.id === selectedVehicle) || VEHICLE_TYPES[0];
  const currentService = SERVICES_LIST.find((s) => s.id === selectedService) || SERVICES_LIST[0];

  const handleSendWhatsApp = () => {
    const text =
      `¡Hola Forros Sky! Deseo cotizar directamente desde la web:%0A%0A` +
      `🚗 *Vehículo:* ${currentVehicle.name}%0A` +
      `🛠️ *Servicio de interés:* ${currentService.name} (${currentService.categoryLabel})%0A` +
      (comments.trim() ? `📝 *Detalles:* ${encodeURIComponent(comments.trim())}%0A%0A` : `%0A`) +
      `¿Qué disponibilidad tienen en el taller para coordinar? Gracias.`;

    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${text}`, '_blank');
    onClose();
  };

  const handleGoToForm = () => {
    if (onOpenFormWithData) {
      onOpenFormWithData(currentVehicle.name, currentService.name);
    }
    onClose();
    const contactElem = document.getElementById('contacto');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#0D0D0D] border border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          aria-label="Cerrar cotizador"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D92B2B]">
            Cotización Directa
          </span>
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
            Asesoría para tu Auto
          </h3>
          <p className="text-xs text-neutral-400">
            Respuesta inmediata con fotos de acabados y opciones de materiales.
          </p>
        </div>

        {/* Vehicle Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
            1. Tipo de Vehículo
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {VEHICLE_TYPES.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVehicle(v.id)}
                className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-colors ${
                  selectedVehicle === v.id
                    ? 'bg-[#D92B2B] text-white border-[#D92B2B]'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>

        {/* Service Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
            2. Servicio Seleccionado
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D92B2B]"
          >
            {SERVICES_LIST.map((s) => (
              <option key={s.id} value={s.id} className="bg-neutral-900 text-white">
                {s.name} ({s.categoryLabel})
              </option>
            ))}
          </select>
        </div>

        {/* Additional comment */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
            3. Modelo / Año / Nota (Opcional)
          </label>
          <input
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Ej: Mazda 3 2023, quiero costura en hilo rojo"
            className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D92B2B]"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-[#D92B2B] hover:bg-[#b52222] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#D92B2B]/25 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enviar Cotización a WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleGoToForm}
            className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium rounded-xl border border-neutral-800 transition-colors"
          >
            Prefiero llenar el formulario web
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D92B2B]" />
          <span>Taller oficial en Barranquilla · Garantía asegurada</span>
        </div>
      </div>
    </div>
  );
};
