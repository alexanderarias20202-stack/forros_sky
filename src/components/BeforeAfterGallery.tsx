import React, { useState } from 'react';
import { GALLERY_ITEMS, BRAND_INFO } from '../data/brandData';
import { GalleryItem } from '../types';
import { Maximize2, X, SlidersHorizontal, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export const BeforeAfterGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <section id="galeria" className="py-24 bg-neutral-950 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D92B2B]">
              <span>Portafolio de Entregas</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Galería & Transformaciones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight [text-wrap:balance]">
              RESULTADOS REALES QUE HABLAN POR NUESTRO OFICIO
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Dirección fotográfica auténtica en taller: luz natural, detalles de costuras y acabados finales en vehículos entregados a clientes en Barranquilla.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <SlidersHorizontal className="w-4 h-4 text-[#D92B2B]" />
            <span>Haz clic en cualquier imagen para ver en alta resolución</span>
          </div>
        </div>

        {/* Interactive Before & After Transformation Slider Feature */}
        <div className="mb-16 bg-[#0D0D0D] border border-neutral-800 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D92B2B]">
                Transformación Interactiva
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Desliza para comparar el Antes y Después
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-neutral-400 font-medium">
                Tapizado de fábrica con 6 años de uso
              </span>
              <ArrowLeftRight className="w-4 h-4 text-[#D92B2B]" />
              <span className="px-3 py-1 bg-[#D92B2B]/20 border border-[#D92B2B]/40 rounded-md text-white font-bold">
                Tapicería deportiva Forros Sky
              </span>
            </div>
          </div>

          {/* Interactive Split Slider Container */}
          <div className="relative w-full aspect-[16/9] max-h-[500px] rounded-2xl overflow-hidden select-none border border-neutral-800">
            {/* "After" Image (Full background) */}
            <img
              src="/assets/images/forros_sky_hero_interior.jpg"
              alt="Después de la transformación por Forros Sky"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#D92B2B] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-lg pointer-events-none z-10">
              Después · Forros Sky
            </div>

            {/* "Before" Image (Clipped by slider percentage) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src="/assets/images/craftsman_stitching_detail.jpg"
                alt="Antes de la transformación"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-75 brightness-75"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/80 text-neutral-300 text-xs font-bold uppercase tracking-wider rounded-md border border-neutral-700 pointer-events-none z-10">
                Antes · Estado Inicial
              </div>
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#D92B2B] border-2 border-white flex items-center justify-center text-white shadow-xl">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Range Input for dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Deslizador comparador antes y después"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600 hover:shadow-2xl ${
                index === 0 ? 'lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('forros_sky_hero_interior.jpg')) {
                    target.src = '/assets/images/forros_sky_hero_interior.jpg';
                  }
                }}
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 bg-[#D92B2B]/90 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
                  {item.tag}
                </span>
              </div>

              {/* Maximize Icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <div className="text-[11px] text-neutral-400 font-medium">
                  {item.vehicle}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-neutral-100">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-300 line-clamp-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0D0D0D] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-neutral-800 text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] w-full bg-neutral-950 overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('forros_sky_hero_interior.jpg')) {
                    target.src = '/assets/images/forros_sky_hero_interior.jpg';
                  }
                }}
              />
            </div>

            <div className="p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D92B2B] uppercase">
                <span>{selectedImage.tag}</span>
                <span className="text-neutral-600">·</span>
                <span>{selectedImage.vehicle}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-neutral-300">
                {selectedImage.description}
              </p>
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Trabajo realizado y garantizado por Forros Sky Barranquilla
                </span>
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=Hola,%20me%20interesó%20el%20trabajo%20de%20la%20galería:%20${encodeURIComponent(selectedImage.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#D92B2B] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#b52222] transition-colors"
                >
                  Cotizar Algo Similar
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
