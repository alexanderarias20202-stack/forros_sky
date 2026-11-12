import React, { useState, useEffect } from 'react';
import { ForrosSkyLogo } from './ForrosSkyLogo';
import { BRAND_INFO } from '../data/brandData';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal?: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cotizador', href: '#cotizador' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Beneficios', href: '#beneficios' },
    { label: 'Portafolio', href: '#galeria' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppDirect = () => {
    const msg = encodeURIComponent('¡Hola Forros Sky! Me gustaría solicitar información y cotización para mi vehículo.');
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-md py-3'
            : 'bg-white/95 backdrop-blur-md border-b border-neutral-200/60 shadow-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Single element brand mark on white header */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="inline-flex items-center whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D92B2B]"
              aria-label="Forros Sky Inicio"
            >
              <ForrosSkyLogo className="h-9 sm:h-10 w-auto" variant="light" />
            </a>

            {/* Zone 2: 4-5 single-line clean text links with hover underline */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-neutral-700">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative py-1 whitespace-nowrap shrink-0 hover:text-black transition-colors duration-150 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D92B2B] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="hidden xl:inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-black px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
                title="Llamar al taller"
              >
                <Phone className="w-3.5 h-3.5 text-[#D92B2B]" />
                <span className="font-mono">{BRAND_INFO.phone}</span>
              </a>

              <button
                type="button"
                onClick={() => (onOpenQuoteModal ? onOpenQuoteModal() : handleWhatsAppDirect())}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#D92B2B] hover:bg-[#b82222] active:scale-[0.98] transition-all duration-150 rounded-lg shadow-md shadow-[#D92B2B]/25 whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Cotizar Ahora</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => (onOpenQuoteModal ? onOpenQuoteModal() : handleWhatsAppDirect())}
                className="inline-flex items-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#D92B2B] rounded-md shadow-sm"
              >
                Cotizar
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D92B2B] rounded-md"
                aria-label="Abrir menú de navegación"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Consistent white theme) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white/98 backdrop-blur-md pt-24 px-6 pb-8 flex flex-col justify-between shadow-2xl animate-fadeIn">
          <div className="space-y-4">
            <div className="pb-4 border-b border-neutral-200">
              <span className="text-xs font-bold tracking-wider text-[#D92B2B] uppercase">
                Menú de Navegación
              </span>
            </div>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-bold text-neutral-800 hover:text-[#D92B2B] hover:translate-x-1 transition-all py-2 border-b border-neutral-100"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-neutral-200">
            <div className="text-xs text-neutral-600">
              <p className="font-bold text-neutral-900">{BRAND_INFO.city}</p>
              <p>{BRAND_INFO.address}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppDirect();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#D92B2B] text-white text-sm font-bold uppercase tracking-wider rounded-lg shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chatear por WhatsApp</span>
            </button>
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-medium rounded-lg border border-neutral-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#D92B2B]" />
              <span>Llamar: {BRAND_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
