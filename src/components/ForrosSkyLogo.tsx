import React from 'react';

interface ForrosSkyLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'badge';
  showSubtitle?: boolean;
}

export const ForrosSkyLogo: React.FC<ForrosSkyLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'dark',
  showSubtitle = false,
}) => {
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
        <div className="bg-white px-2.5 py-1 rounded-lg flex items-center shadow-md border border-white/20">
          <img
            src="/assets/aistudio/forros_sky_logo_cropped.png"
            alt="Forros Sky - Tapicería Automotriz & Protección"
            className="h-7 sm:h-8 w-auto object-contain"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
        {showSubtitle && (
          <div className="hidden sm:flex flex-col border-l border-neutral-700 pl-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D92B2B]">
              Tapicería & Protección
            </span>
            <span className="text-[9px] text-neutral-400 font-medium">
              Barranquilla · Atlántico
            </span>
          </div>
        )}
      </div>
    );
  }

  // If variant === 'light', use the original black & red logo
  // If variant === 'dark', use the negative white & red logo for dark backgrounds
  const logoSrc =
    variant === 'light'
      ? '/assets/aistudio/forros_sky_logo_cropped.png'
      : '/assets/aistudio/forros_sky_logo_negative.png';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Forros Sky - Tapicería Automotriz & Protección"
        className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
        loading="eager"
        referrerPolicy="no-referrer"
      />
      {showSubtitle && (
        <div className="hidden sm:flex flex-col border-l border-neutral-700 pl-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D92B2B]">
            Tapicería & Protección
          </span>
          <span className="text-[9px] text-neutral-400 font-medium">
            Barranquilla · Atlántico
          </span>
        </div>
      )}
    </div>
  );
};
