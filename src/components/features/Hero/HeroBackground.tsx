'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';

const Scene3D = dynamic(
  () => import('@/components/three/Scene3D/Scene3D'),
  { ssr: false, loading: () => null }
);

const DieselEngine = dynamic(
  () => import('@/components/three/DieselEngine/DieselEngine'),
  { ssr: false, loading: () => null }
);

export function HeroBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <motion.div 
        className="absolute inset-0 opacity-20 dark:opacity-30 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000")',
          y 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-transparent rtl:bg-gradient-to-l" />

      {/* 3D Canvas element on Desktop */}
      {isDesktop && (
        <div className="absolute top-1/2 ltr:right-10 rtl:left-10 -translate-y-1/2 w-[480px] h-[480px] z-10 pointer-events-auto opacity-90 hidden lg:block">
          <Scene3D>
            <DieselEngine />
          </Scene3D>
        </div>
      )}
    </div>
  );
}
