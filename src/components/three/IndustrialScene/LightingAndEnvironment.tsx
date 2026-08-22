'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function LightingAndEnvironment() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === 'dark';

  return (
    <>
      {/* Dynamic Background Fog for atmospheric depth */}
      <fog
        attach="fog"
        args={[isDark ? '#0B1120' : '#F8FAFC', 5, 22]}
      />

      {/* Primary Ambient Lighting (Soft, non-glare) */}
      <ambientLight intensity={isDark ? 0.6 : 0.95} color={isDark ? '#94A3B8' : '#FFFFFF'} />

      {/* Main Directional Key Light (Top-Right Angle) */}
      <directionalLight
        position={[8, 12, 6]}
        intensity={isDark ? 1.4 : 1.1}
        color={isDark ? '#E2E8F0' : '#475569'}
      />

      {/* Gold Rim Light 1 (Subtle Accent - 10% Gold ratio constraint) */}
      <pointLight
        position={[-6, 4, 3]}
        intensity={isDark ? 2.5 : 1.8}
        color="#D4A017"
        distance={18}
        decay={2}
      />

      {/* Gold Rim Light 2 (Warm Highlights) */}
      <pointLight
        position={[6, -4, 2]}
        intensity={isDark ? 1.8 : 1.2}
        color="#FBBF24"
        distance={15}
        decay={2}
      />

      {/* Subtle Fill Light from bottom left */}
      <directionalLight
        position={[-8, -6, -4]}
        intensity={isDark ? 0.4 : 0.3}
        color={isDark ? '#1E293B' : '#CBD5E1'}
      />
    </>
  );
}
