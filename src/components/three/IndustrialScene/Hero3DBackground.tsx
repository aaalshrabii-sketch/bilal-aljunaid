'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useParallaxScroll } from '@/hooks/useParallaxScroll';
import { LightingAndEnvironment } from './LightingAndEnvironment';
import { IndustrialComponents } from './IndustrialComponents';

export default function Hero3DBackground() {
  const { smoothMouseX, smoothMouseY, scrollProgress, isMobile } =
    useParallaxScroll();

  // Entrance animation progress state (0 to 1)
  const [animProgress, setAnimProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // 0–1s: Fade in background canvas
    const timer1 = setTimeout(() => {
      setOpacity(1);
    }, 100);

    // 1–3s & 3-5s: Smooth entrance progress interpolation
    let startTime: number | null = null;
    let animationFrameId: number;

    const animateEntrance = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // in seconds
      
      // 0s to 3.5s mapped to 0 -> 1 progress with easeOutCubic curve
      const p = Math.min(elapsed / 3.5, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      
      setAnimProgress(eased);

      if (p < 1) {
        animationFrameId = requestAnimationFrame(animateEntrance);
      }
    };

    animationFrameId = requestAnimationFrame(animateEntrance);

    return () => {
      clearTimeout(timer1);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="w-full h-full pointer-events-none transition-opacity duration-1000 ease-out"
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <LightingAndEnvironment />
        <Suspense fallback={null}>
          <IndustrialComponents
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            scrollProgress={scrollProgress}
            animProgress={animProgress}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
