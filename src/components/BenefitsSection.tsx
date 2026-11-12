import React from 'react';
import { Ruler, ShieldCheck, Wrench, Award, SunMedium, Clock } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';

export const BenefitsSection: React.FC = () => {
  const differentiators = [
    {
      icon: <Ruler className="w-6 h-6 text-[#D92B2B]" />,
      title: 'Medida Exacta Sin Arrugas',
      description: 'Cada butaca es patronada de forma individual según el año y modelo exacto. Olvídate de fundas universales holgadas que se mueven al sentarte.',
      detail: 'Patronaje milimétrico computarizado y manual',
    },
    {
      icon: <SunMedium className="w-6 h-6 text-[#D92B2B]" />,
      title: 'Resistencia Térmica al Sol del Caribe',
      description: 'Materiales con aditivos UV que no se resecan, no se cuartean y no queman la piel tras horas bajo el sol abrasador de la Costa.',
      detail: 'Grado automotriz certificado hasta 85°C',
    },
    {
      icon: <Wrench className="w-6 h-6 text-[#D92B2B]" />,
      title: 'Instalación Segura de Taller',
      description: 'Nuestros maestros desmontan y vuelven a ensamblar cada pieza respetando conectores eléctricos, sensores de presencia y bolsas de aire (Airbags).',
      detail: 'Cero daños en sistemas electrónicos originales',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#D92B2B]" />,
      title: 'Garantía Formal Certificada',
      description: 'Entregamos certificado de garantía por escrito que cubre costuras, elasticidad de fijación y despegue de películas solares.',
      detail: 'Garantía de hasta 2 años según el paquete',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#D92B2B]" />,
      title: 'Cumplimiento Estricto de Horarios',
      description: 'Tu tiempo vale oro. Pactamos fecha y hora de entrega exacta desde el momento en que ingresa tu vehículo a nuestras instalaciones.',
      detail: 'Servicio express disponible en 24 horas',
    },
    {
      icon: <Award className="w-6 h-6 text-[#D92B2B]" />,
      title: 'Preservación del Valor de Reventa',
      description: 'Mantener la tapicería original intacta o retapizar en cuero premium puede aumentar hasta un 15% el valor comercial al momento de vender tu auto.',
      detail: 'Inversión comprobada de alto retorno',
    },
  ];

  return (
    <section id="beneficios" className="py-24 bg-[#0D0D0D] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D92B2B]">
            <span>Ventajas Competitivas</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Por qué Forros Sky</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight [text-wrap:balance]">
            LA DIFERENCIA ENTRE UNA FUNDA GENÉRICA Y UN TRABAJO DE ALTA GAMA
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            No vendemos accesorios desechables. Diseñamos e instalamos soluciones de ingeniería estética construidas para durar años.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 hover:border-[#D92B2B]/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div className="p-3 w-fit rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-[#D92B2B]/50 transition-colors mb-5">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neutral-100">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-neutral-300">
                  {item.detail}
                </span>
                <span className="text-xs font-mono text-neutral-600">
                  0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
