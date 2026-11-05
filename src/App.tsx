import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickEstimator } from './components/QuickEstimator';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { BenefitsSection } from './components/BenefitsSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FinalCTA } from './components/FinalCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ServiceModal } from './components/ServiceModal';
import { QuoteModal } from './components/QuoteModal';
import { ServiceItem } from './types';

export default function App() {
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preSelectedQuoteServiceId, setPreSelectedQuoteServiceId] = useState<string | undefined>(undefined);

  // Cross-component state transfer from QuickEstimator to Contact form
  const [formVehicle, setFormVehicle] = useState('');
  const [formService, setFormService] = useState('');

  const handleOpenQuoteModal = (serviceId?: string) => {
    setPreSelectedQuoteServiceId(serviceId);
    setQuoteModalOpen(true);
  };

  const handleOpenQuoteWithServiceName = (serviceName: string) => {
    setFormService(serviceName);
    const contactElem = document.getElementById('contacto');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFromEstimator = (vehicle: string, serviceNames: string[]) => {
    setFormVehicle(vehicle);
    if (serviceNames.length > 0) {
      setFormService(serviceNames[0]);
    }
  };

  const handleExploreServices = () => {
    const servicesElem = document.getElementById('servicios');
    if (servicesElem) {
      servicesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col font-sans selection:bg-[#D92B2B] selection:text-white antialiased">
      {/* Sticky Header with 3-Zone contract */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section A & B: Hero Section with high-impact visual & proposition */}
        <Hero
          onOpenQuoteModal={handleOpenQuoteModal}
          onExploreServices={handleExploreServices}
        />

        {/* Section C: Interactive Customizer / Quick Estimator */}
        <QuickEstimator onSelectForForm={handleSelectFromEstimator} />

        {/* Section D: Services Portfolio (12 services across 3 lines) */}
        <ServicesSection
          onSelectService={(service) => setSelectedServiceForModal(service)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* Section E: About Us, Purpose & Craftsmanship */}
        <AboutSection />

        {/* Section F: Benefits & Competitive Differentiators */}
        <BenefitsSection />

        {/* Section G: Portfolio, Before & After Transformation Slider */}
        <BeforeAfterGallery />

        {/* Section H: Testimonials & Client Reviews */}
        <TestimonialsSection />

        {/* Section I: Final High-Conversion CTA */}
        <FinalCTA onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Section J: Direct Contact Form & Workshop Details */}
        <ContactSection
          initialVehicle={formVehicle}
          initialService={formService}
        />
      </main>

      {/* Section K: Footer & Legal */}
      <Footer />

      {/* Section L: Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Interactive Modals */}
      <ServiceModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onOpenQuoteWithService={handleOpenQuoteWithServiceName}
      />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preSelectedServiceId={preSelectedQuoteServiceId}
        onOpenFormWithData={(vehicle, service) => {
          setFormVehicle(vehicle);
          setFormService(service);
        }}
      />
    </div>
  );
}
