import React, { useState } from 'react';
import { ForrosSkyLogo } from './ForrosSkyLogo';
import { BRAND_INFO, SERVICES_LIST } from '../data/brandData';
import { Instagram, Phone, MapPin, Mail, ArrowUp, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-white text-neutral-900 border-t border-neutral-200/90 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-neutral-200">
            {/* Col 1: Brand Wordmark and Statement */}
            <div className="lg:col-span-4 space-y-4">
              <ForrosSkyLogo className="h-10 w-auto" variant="light" />
              <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
                Fuerza mecánica con acabado artesanal en Barranquilla: forros a la medida exacta, cuero genuino, polarizados de alta gama y porcelanización con garantía real.
              </p>
              <div className="text-xs text-[#D92B2B] font-semibold italic">
                “{BRAND_INFO.slogan}”
              </div>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={BRAND_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-black hover:border-[#D92B2B] hover:bg-neutral-50 transition-colors"
                  aria-label="Instagram de Forros Sky"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-black hover:border-[#D92B2B] hover:bg-neutral-50 transition-colors"
                  aria-label="WhatsApp de Forros Sky"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Línea Interior */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                Línea Interior
              </span>
              <ul className="space-y-2 text-xs text-neutral-600">
                {SERVICES_LIST.filter((s) => s.category === 'interior').map((s) => (
                  <li key={s.id}>
                    <a
                      href="#servicios"
                      onClick={(e) => handleNavClick(e, '#servicios')}
                      className="hover:text-black hover:underline underline-offset-2 transition-colors"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Línea Protección & Mecánica */}
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                Protección & Base
              </span>
              <ul className="space-y-2 text-xs text-neutral-600">
                {SERVICES_LIST.filter((s) => s.category !== 'interior').map((s) => (
                  <li key={s.id}>
                    <a
                      href="#servicios"
                      onClick={(e) => handleNavClick(e, '#servicios')}
                      className="hover:text-black hover:underline underline-offset-2 transition-colors"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Taller y Contacto */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                Taller & Atención
              </span>
              <div className="space-y-2.5 text-xs text-neutral-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D92B2B] mt-0.5 shrink-0" />
                  <span>{BRAND_INFO.address}, {BRAND_INFO.city}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D92B2B] shrink-0" />
                  <a href={`tel:${BRAND_INFO.phone}`} className="hover:text-black font-mono font-medium">
                    {BRAND_INFO.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D92B2B] shrink-0" />
                  <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-black font-medium">
                    {BRAND_INFO.email}
                  </a>
                </p>
                <p className="text-[11px] text-neutral-500 pt-1">
                  {BRAND_INFO.schedule}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Back to Top */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div>
              © {new Date().getFullYear()} {BRAND_INFO.name}. Todos los derechos reservados. Barranquilla, Colombia.
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-neutral-800 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Aviso de Privacidad y Términos
              </button>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black rounded-lg border border-neutral-200 transition-colors"
                title="Volver al inicio"
                aria-label="Volver arriba"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#D92B2B]" />
                <span className="text-[11px] font-medium">Arriba</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPrivacyModalOpen(false)}
        >
          <div
            className="bg-[#0D0D0D] border border-neutral-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white"
              aria-label="Cerrar modal de privacidad"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white uppercase tracking-tight">
              Aviso de Privacidad & Garantías Forros Sky
            </h3>

            <div className="space-y-3 text-xs text-neutral-300 max-h-96 overflow-y-auto pr-2 leading-relaxed">
              <p>
                <strong>Tratamiento de Datos:</strong> De conformidad con la Ley 1581 de 2012 de Colombia, los datos personales suministrados (nombre, número de contacto, correo y datos de vehículo) serán tratados exclusivamente con el fin de cotizar, agendar y prestar servicios de tapicería, polarizados y estética automotriz por Forros Sky en Barranquilla.
              </p>
              <p>
                <strong>Garantías de Trabajo:</strong> Todos los forros a la medida, tapicería fija y películas de seguridad cuentan con garantía formal documentada. La garantía cubre desprendimiento de costuras, defectos de fabricación del material y fallas en la película bajo condiciones normales de uso.
              </p>
              <p>
                <strong>Seguridad en Taller:</strong> Cada vehículo ingresado a nuestras instalaciones cuenta con inventario fotográfico de recepción y custodia profesional durante todo el tiempo de permanencia.
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-800 text-right">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="px-4 py-2 bg-[#D92B2B] text-white text-xs font-bold uppercase rounded-lg hover:bg-[#b52222]"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
