import React, { useState } from 'react';
import { BRAND_INFO, VEHICLE_TYPES, SERVICES_LIST } from '../data/brandData';
import { Car, Truck, ShieldAlert, Flame, Check, MessageSquare, Sparkles, Clock, Send } from 'lucide-react';

interface QuickEstimatorProps {
  onSelectForForm?: (vehicleName: string, selectedServicesNames: string[]) => void;
}

export const QuickEstimator: React.FC<QuickEstimatorProps> = ({ onSelectForForm }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('suv');
  const [selectedServices, setSelectedServices] = useState<string[]>(['forros', 'polarizados']);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('vinilocuero');

  const materials = [
    {
      id: 'vinilocuero',
      name: 'Vinilocuero Automotriz Pesado',
      desc: 'Alta resistencia al sol caribeño, impermeable y fácil limpieza.',
      tag: 'Más Solicitado',
    },
    {
      id: 'cuero-genuino',
      name: 'Cuero Genuino 100% Vacuno',
      desc: 'Acabado de lujo europeo, tacto suave, durabilidad de más de 8 años.',
      tag: 'Gama Alta',
    },
    {
      id: 'hibrido-deportivo',
      name: 'Híbrido Deportivo (Cuero + Microperforado)',
      desc: 'Transpirable, diseño tipo AMG/M-Sport con pespuntes en rojo.',
      tag: 'Estilo Racing',
    },
  ];

  const handleToggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((id) => id !== serviceId));
      }
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const getVehicleData = () => VEHICLE_TYPES.find((v) => v.id === selectedVehicle) || VEHICLE_TYPES[1];
  const getMaterialData = () => materials.find((m) => m.id === selectedMaterial) || materials[0];

  const selectedServicesObjects = SERVICES_LIST.filter((s) => selectedServices.includes(s.id));

  // Compute turnaround estimate
  const estimatedDays = selectedServices.length > 2 ? '2 a 3 días' : selectedServices.length > 1 ? '24 a 48 horas' : 'Mismo día / 24h';

  const handleWhatsAppSend = () => {
    const vName = getVehicleData().name;
    const sNames = selectedServicesObjects.map((s) => s.name).join(', ');
    const matName = getMaterialData().name;

    const message = `¡Hola Forros Sky! Estuve usando el cotizador de su sitio web y deseo cotizar:%0A%0A` +
      `🚗 *Vehículo:* ${vName}%0A` +
      `🛠️ *Servicios seleccionados:* ${sNames}%0A` +
      `🧵 *Material preferido:* ${matName}%0A%0A` +
      `¿Podrían indicarme el valor aproximado y agenda disponible para llevarlo al taller? Gracias.`;

    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleApplyToForm = () => {
    if (onSelectForForm) {
      onSelectForForm(
        getVehicleData().name,
        selectedServicesObjects.map((s) => s.name)
      );
    }
    const contactElem = document.getElementById('contacto');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getVehicleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      default:
        return <Car className="w-5 h-5" />;
    }
  };

  return (
    <section id="cotizador" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D92B2B]">
            <Sparkles className="w-4 h-4" />
            <span>Herramienta Interactiva</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Cotización Inmediata</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase [text-wrap:balance]">
            CONFIGURA LA TRANSFORMACIÓN DE TU AUTO
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Selecciona tu tipo de vehículo, los servicios de tu interés y el tipo de material para obtener una propuesta a la medida en cuestión de segundos.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: Steps 1, 2, 3 */}
          <div className="lg:col-span-8 space-y-8 bg-[#0D0D0D] p-6 sm:p-8 rounded-2xl border border-neutral-800">
            {/* Step 1: Vehicle Category */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D92B2B]">
                  Paso 1: Tipo de Carrocería
                </span>
                <span className="text-xs text-neutral-400">Selecciona 1 opción</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {VEHICLE_TYPES.map((v) => {
                  const isSelected = selectedVehicle === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVehicle(v.id)}
                      className={`flex flex-col items-center justify-center text-center p-4 rounded-xl border transition-all duration-150 ${
                        isSelected
                          ? 'bg-[#D92B2B]/10 border-[#D92B2B] text-white shadow-md shadow-[#D92B2B]/10'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg mb-2 ${isSelected ? 'bg-[#D92B2B] text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                        {getVehicleIcon(v.iconName)}
                      </div>
                      <span className="text-xs font-bold uppercase">{v.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Services of Interest */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D92B2B]">
                  Paso 2: Servicios que necesitas
                </span>
                <span className="text-xs text-neutral-400">Puedes combinar varios</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_LIST.slice(0, 6).map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleToggleService(service.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 ${
                        isSelected
                          ? 'bg-neutral-900 border-[#D92B2B]/70 text-white'
                          : 'bg-neutral-900/30 border-neutral-800/80 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? 'bg-[#D92B2B] border-[#D92B2B] text-white'
                            : 'border-neutral-700 bg-neutral-950'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{service.name}</span>
                          {service.popular && (
                            <span className="text-[10px] text-[#D92B2B] font-semibold">
                              (Popular)
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-1">
                          {service.shortDesc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Preferred Material */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D92B2B]">
                  Paso 3: Nivel de Material & Acabado
                </span>
                <span className="text-xs text-neutral-400">Calidad certificada</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {materials.map((m) => {
                  const isSelected = selectedMaterial === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMaterial(m.id)}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 ${
                        isSelected
                          ? 'bg-[#D92B2B]/10 border-[#D92B2B] text-white shadow-sm'
                          : 'bg-neutral-900/40 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-white">{m.name}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-normal">
                          {m.desc}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                        <span className="text-[10px] text-[#D92B2B] font-semibold uppercase">
                          {m.tag}
                        </span>
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#D92B2B] bg-[#D92B2B]' : 'border-neutral-700'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Estimate Summary Card */}
          <div className="lg:col-span-4 sticky top-24 bg-[#0D0D0D] border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D92B2B]">
                  Resumen de Configuración
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Cotización Personalizada
                </h3>
              </div>
              <div className="p-2 bg-neutral-900 rounded-lg text-neutral-400">
                <Sparkles className="w-5 h-5 text-[#D92B2B]" />
              </div>
            </div>

            {/* Selected Spec List */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between py-1.5 border-b border-neutral-900">
                <span className="text-neutral-400">Carrocería:</span>
                <span className="font-semibold text-white text-right">{getVehicleData().name}</span>
              </div>

              <div className="py-1.5 border-b border-neutral-900">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-neutral-400">Servicios ({selectedServicesObjects.length}):</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedServicesObjects.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[11px] text-neutral-200"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start justify-between py-1.5 border-b border-neutral-900">
                <span className="text-neutral-400">Acabado:</span>
                <span className="font-semibold text-white text-right max-w-[60%]">
                  {getMaterialData().name}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 text-neutral-300">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-[#D92B2B]" />
                  Tiempo estimado:
                </span>
                <span className="font-mono font-semibold text-white">{estimatedDays}</span>
              </div>
            </div>

            {/* CRO Assurance */}
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800/80 text-[11px] text-neutral-400 space-y-1">
              <p className="font-semibold text-neutral-300">
                ✓ Sin compromiso ni costo
              </p>
              <p>
                Te responderemos con el presupuesto detallado y fotos de trabajos previos en el mismo modelo de tu vehículo.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-[#D92B2B] hover:bg-[#b52222] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-[#D92B2B]/20 transition-all duration-150"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enviar por WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleApplyToForm}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium rounded-lg border border-neutral-800 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-neutral-400" />
                <span>Llenar Formulario de Contacto</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
