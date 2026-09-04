'use client';

import dynamic from 'next/dynamic';

const Hero3DBackgroundScene = dynamic(
  () => import('@/components/three/IndustrialScene/Hero3DBackground'),
  { ssr: false, loading: () => null }
);

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none">
      {/* Base Theme Background Color */}
      <div className="absolute inset-0 bg-background transition-colors duration-300" />

      {/* Interactive 3D Industrial Canvas Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Hero3DBackgroundScene />
      </div>

      {/* Depth Atmosphere & Vignette Overlays for Text Legibility */}
      {/* 1. Vertical Gradient (Top & Bottom Fade) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/80 via-transparent to-background pointer-events-none" />

      {/* 2. Directional Gradient (Text Side Backdrop Protection for RTL & LTR) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/90 via-background/60 to-transparent rtl:bg-gradient-to-l rtl:from-background/90 rtl:via-background/60 rtl:to-transparent pointer-events-none" />
    </div>
  );
}

