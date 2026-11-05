import React, { useState } from 'react';
import { BRAND_INFO, SERVICES_LIST } from '../data/brandData';
import { ContactFormData } from '../types';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, Instagram } from 'lucide-react';

interface ContactSectionProps {
  initialVehicle?: string;
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialVehicle = '',
  initialService = '',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    telefono: '',
    email: '',
    vehiculo: initialVehicle || '',
    servicio: initialService || 'Forros a la Medida',
    mensaje: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Por favor ingresa tu nombre completo';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Por favor ingresa un número de teléfono o WhatsApp';
    } else if (!/^[0-9+() -]{7,15}$/.test(formData.telefono.trim())) {
      newErrors.telefono = 'Ingresa un formato de teléfono válido (ej: 3001234567)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingresa tu correo electrónico';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.vehiculo.trim()) {
      newErrors.vehiculo = 'Indica la marca, modelo y año de tu vehículo (ej: Mazda CX-30 2022)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate realistic asynchronous submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `¡Hola Forros Sky! Deseo comunicarme directamente para cotizar un trabajo en mi vehículo.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contacto" className="py-24 bg-[#0D0D0D] text-white border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D92B2B]">
            <span>Canales de Atención</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Taller Especializado</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight [text-wrap:balance]">
            CONTÁCTANOS Y RECIBE ASESORÍA PERSONALIZADA
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Diligencia el formulario para recibir una cotización detallada en tu correo o comunícate vía WhatsApp para atención prioritaria en Barranquilla.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form with Validation */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-9 rounded-3xl border border-neutral-800 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-[#D92B2B]/20 text-[#D92B2B] rounded-full flex items-center justify-center mx-auto border border-[#D92B2B]/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase">
                  ¡Solicitud Recibida con Éxito!
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Gracias <strong className="text-white">{formData.nombre}</strong>. Uno de nuestros asesores técnicos revisará los requerimientos para tu <strong className="text-white">{formData.vehiculo}</strong> y se comunicará a tu teléfono <strong className="text-white">{formData.telefono}</strong> en menos de 2 horas hábiles.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nombre: '',
                        telefono: '',
                        email: '',
                        vehiculo: '',
                        servicio: 'Forros a la Medida',
                        mensaje: '',
                      });
                    }}
                    className="px-5 py-2.5 bg-neutral-900 text-xs text-neutral-300 hover:text-white rounded-lg border border-neutral-800"
                  >
                    Enviar otra consulta
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppContact}
                    className="px-5 py-2.5 bg-[#D92B2B] text-xs font-bold uppercase tracking-wider text-white rounded-lg hover:bg-[#b52222]"
                  >
                    Acelerar por WhatsApp
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => {
                        setFormData({ ...formData, nombre: e.target.value });
                        if (errors.nombre) setErrors({ ...errors, nombre: undefined });
                      }}
                      placeholder="Ej: Alexander Arias"
                      className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#D92B2B] transition-colors ${
                        errors.nombre ? 'border-red-500' : 'border-neutral-800 focus:border-[#D92B2B]'
                      }`}
                    />
                    {errors.nombre && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.nombre}
                      </p>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                      Teléfono o WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => {
                        setFormData({ ...formData, telefono: e.target.value });
                        if (errors.telefono) setErrors({ ...errors, telefono: undefined });
                      }}
                      placeholder="Ej: 302 214 5589"
                      className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#D92B2B] transition-colors ${
                        errors.telefono ? 'border-red-500' : 'border-neutral-800 focus:border-[#D92B2B]'
                      }`}
                    />
                    {errors.telefono && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.telefono}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="correo@ejemplo.com"
                      className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#D92B2B] transition-colors ${
                        errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-[#D92B2B]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Vehicle field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                      Vehículo (Marca, Modelo, Año) *
                    </label>
                    <input
                      type="text"
                      value={formData.vehiculo}
                      onChange={(e) => {
                        setFormData({ ...formData, vehiculo: e.target.value });
                        if (errors.vehiculo) setErrors({ ...errors, vehiculo: undefined });
                      }}
                      placeholder="Ej: Toyota Prado 2021"
                      className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#D92B2B] transition-colors ${
                        errors.vehiculo ? 'border-red-500' : 'border-neutral-800 focus:border-[#D92B2B]'
                      }`}
                    />
                    {errors.vehiculo && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.vehiculo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                    Servicio Principal de Interés
                  </label>
                  <select
                    value={formData.servicio}
                    onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D92B2B]"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.name} className="bg-neutral-900 text-white">
                        {s.name} ({s.categoryLabel})
                      </option>
                    ))}
                    <option value="Paquete Completo Interior + Protección" className="bg-neutral-900 text-white">
                      Paquete Integral Interior + Protección + Porcelanizado
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                    Detalles Adicionales o Preguntas (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Cuéntanos si buscas un color específico de costura, cambio de espuma, o si deseas agendar visita en el taller..."
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#D92B2B]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-[#D92B2B] hover:bg-[#b52222] active:scale-[0.99] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#D92B2B]/20 transition-all duration-150 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Procesando solicitud...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Solicitud de Cotización</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-neutral-500 text-center">
                  Tus datos se manejan de forma estrictamente confidencial. No enviamos spam.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info & Workshop Address */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-800 space-y-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                Información del Taller
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[#D92B2B] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                      Ubicación
                    </span>
                    <p className="text-neutral-200 font-medium">{BRAND_INFO.address}</p>
                    <p className="text-xs text-neutral-500">{BRAND_INFO.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[#D92B2B] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                      Línea Telefónica & Taller
                    </span>
                    <a
                      href={`tel:${BRAND_INFO.phone}`}
                      className="text-neutral-200 hover:text-white font-mono font-medium transition-colors"
                    >
                      {BRAND_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[#D92B2B] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                      Correo Electrónico
                    </span>
                    <a
                      href={`mailto:${BRAND_INFO.email}`}
                      className="text-neutral-200 hover:text-white font-medium transition-colors"
                    >
                      {BRAND_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[#D92B2B] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                      Horario de Atención
                    </span>
                    <p className="text-neutral-200 font-medium">{BRAND_INFO.schedule}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="pt-4 border-t border-neutral-900 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D92B2B] block">
                  Canal de Respuesta Inmediata
                </span>
                <button
                  type="button"
                  onClick={handleWhatsAppContact}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chatear por WhatsApp Business</span>
                </button>
              </div>
            </div>

            {/* Social Media Link Card */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">@forros_sky.baq</span>
                  <span className="text-[11px] text-neutral-400">Reels de antes y después diarios</span>
                </div>
              </div>
              <a
                href={BRAND_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#D92B2B] hover:text-white transition-colors"
              >
                Seguir
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
