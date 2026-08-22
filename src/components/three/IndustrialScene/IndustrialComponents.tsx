'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useTheme } from 'next-themes';

interface IndustrialComponentsProps {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
  animProgress: number; // 0 to 1 entrance assembly timeline
  isMobile: boolean;
}

export function IndustrialComponents({
  mouseX,
  mouseY,
  scrollProgress,
  animProgress,
  isMobile,
}: IndustrialComponentsProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Refs for primary 3D elements (3 to 5 primary elements max)
  const gear1Ref = useRef<Group>(null);
  const gear2Ref = useRef<Group>(null);
  const pistonRef = useRef<Group>(null);
  const bearingRingRef = useRef<Group>(null);
  const filterRef = useRef<Group>(null);
  const particlesRef = useRef<Group>(null);

  // Materials color configuration adhering to 70% Metal / 20% Dark Gray / 10% Gold ratio
  const matColors = useMemo(() => {
    return {
      darkMetal: isDark ? '#1E293B' : '#64748B',
      graphite: isDark ? '#0F172A' : '#475569',
      silverMetal: isDark ? '#334155' : '#94A3B8',
      goldAccent: '#D4A017',
      goldBright: '#FBBF24',
      matteBody: isDark ? '#111827' : '#334155',
    };
  }, [isDark]);

  // Particle positions generation (subtle atmospheric dust)
  const particleCount = isMobile ? 30 : 70;
  const particlesData = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8 - 2;
      const scale = Math.random() * 0.04 + 0.015;
      const speed = Math.random() * 0.2 + 0.1;
      temp.push({ x, y, z, scale, speed });
    }
    return temp;
  }, [particleCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Primary Precision Gear (Right side, mid-depth)
    if (gear1Ref.current) {
      gear1Ref.current.rotation.z = time * 0.15;
      // Parallax 4% (0.04) + Scroll shift
      const targetX = 3.8 + mouseX * 0.4 + scrollProgress * 1.2;
      const targetY = 0.2 + mouseY * 0.3 - scrollProgress * 0.8;
      const targetZ = -1.0 + (1 - animProgress) * -8;
      
      gear1Ref.current.position.x += (targetX - gear1Ref.current.position.x) * 0.08;
      gear1Ref.current.position.y += (targetY - gear1Ref.current.position.y) * 0.08;
      gear1Ref.current.position.z += (targetZ - gear1Ref.current.position.z) * 0.08;
    }

    // 2. Secondary Interlocking Gear (Behind primary gear)
    if (gear2Ref.current) {
      gear2Ref.current.rotation.z = -time * 0.25;
      const targetX = 4.7 + mouseX * 0.3;
      const targetY = -1.1 + mouseY * 0.2;
      const targetZ = -2.2 + (1 - animProgress) * -10;

      gear2Ref.current.position.x += (targetX - gear2Ref.current.position.x) * 0.08;
      gear2Ref.current.position.y += (targetY - gear2Ref.current.position.y) * 0.08;
      gear2Ref.current.position.z += (targetZ - gear2Ref.current.position.z) * 0.08;
    }

    // 3. Mechanical Piston Assembly (Left side, lower depth)
    if (pistonRef.current) {
      // Subtle mechanical up-down motion
      const pistonCycle = Math.sin(time * 1.2) * 0.18;
      const targetX = -4.2 + mouseX * 0.3 - scrollProgress * 1.5;
      const targetY = -0.5 + pistonCycle + mouseY * 0.25;
      const targetZ = -1.5 + (1 - animProgress) * -9;

      pistonRef.current.position.x += (targetX - pistonRef.current.position.x) * 0.08;
      pistonRef.current.position.y += (targetY - pistonRef.current.position.y) * 0.08;
      pistonRef.current.position.z += (targetZ - pistonRef.current.position.z) * 0.08;
      pistonRef.current.rotation.y = Math.sin(time * 0.3) * 0.15;
    }

    // 4. Concentric Bearing Ring (Center-Left background)
    if (bearingRingRef.current) {
      bearingRingRef.current.rotation.x = time * 0.2;
      bearingRingRef.current.rotation.y = time * 0.1;
      const targetX = -3.2 + mouseX * 0.2;
      const targetY = 1.6 + mouseY * 0.2;
      const targetZ = -3.0 + (1 - animProgress) * -12;

      bearingRingRef.current.position.x += (targetX - bearingRingRef.current.position.x) * 0.08;
      bearingRingRef.current.position.y += (targetY - bearingRingRef.current.position.y) * 0.08;
      bearingRingRef.current.position.z += (targetZ - bearingRingRef.current.position.z) * 0.08;
    }

    // 5. Heavy Diesel Oil Filter / Cylinder (Far right background depth)
    if (filterRef.current) {
      filterRef.current.rotation.y = time * 0.12;
      const targetX = 2.5 + mouseX * 0.2;
      const targetY = 2.1 + mouseY * 0.15;
      const targetZ = -3.8 + (1 - animProgress) * -14;

      filterRef.current.position.x += (targetX - filterRef.current.position.x) * 0.08;
      filterRef.current.position.y += (targetY - filterRef.current.position.y) * 0.08;
      filterRef.current.position.z += (targetZ - filterRef.current.position.z) * 0.08;
    }

    // Particles Drift (Layer 3 - 3% Parallax)
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02;
      particlesRef.current.position.x = mouseX * 0.3;
      particlesRef.current.position.y = mouseY * 0.3;
    }
  });

  return (
    <group>
      {/* ========================================================= */}
      {/* 1. PRIMARY GEAR ASSEMBLY (Right Side)                      */}
      {/* ========================================================= */}
      <group ref={gear1Ref} position={[3.8, 0.2, -1]}>
        {/* Main Outer Gear Body (Graphite Metal) */}
        <mesh>
          <cylinderGeometry args={[1.5, 1.5, 0.25, 24]} />
          <meshStandardMaterial
            color={matColors.darkMetal}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Gear Teeth Ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.52, Math.sin(angle) * 1.52, 0]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.18, 0.22, 0.25]} />
              <meshStandardMaterial
                color={matColors.graphite}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          );
        })}

        {/* Inner Gold Accent Ring (10% Gold constraint) */}
        <mesh position={[0, 0, 0.01]}>
          <ringGeometry args={[0.8, 0.9, 32]} />
          <meshStandardMaterial
            color={matColors.goldAccent}
            metalness={0.95}
            roughness={0.15}
            emissive={matColors.goldAccent}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Center Shaft Hub */}
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.32, 16]} />
          <meshStandardMaterial
            color={matColors.silverMetal}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 2. SECONDARY INTERLOCKING GEAR                            */}
      {/* ========================================================= */}
      <group ref={gear2Ref} position={[4.7, -1.1, -2.2]}>
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.2, 18]} />
          <meshStandardMaterial
            color={matColors.graphite}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.92, Math.sin(angle) * 0.92, 0]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.16, 0.18, 0.2]} />
              <meshStandardMaterial
                color={matColors.silverMetal}
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>
          );
        })}
      </group>

      {/* ========================================================= */}
      {/* 3. MECHANICAL PISTON & CYLINDER (Left Side)               */}
      {/* ========================================================= */}
      <group ref={pistonRef} position={[-4.2, -0.5, -1.5]} rotation={[0.2, 0.4, -0.1]}>
        {/* Outer Cylinder Sleeve */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 1.8, 24, 1, true]} />
          <meshStandardMaterial
            color={matColors.matteBody}
            metalness={0.75}
            roughness={0.35}
            side={2}
          />
        </mesh>

        {/* Sliding Piston Shaft (Silver Metal) */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 1.2, 24]} />
          <meshStandardMaterial
            color={matColors.silverMetal}
            metalness={0.92}
            roughness={0.1}
          />
        </mesh>

        {/* Piston Ring Gold Highlight (Subtle 10% Gold Accent) */}
        <mesh position={[0, 0.75, 0]}>
          <torusGeometry args={[0.63, 0.025, 12, 32]} />
          <meshStandardMaterial
            color={matColors.goldAccent}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 4. CONCENTRIC BEARING RING (Upper Left Depth)             */}
      {/* ========================================================= */}
      <group ref={bearingRingRef} position={[-3.2, 1.6, -3]}>
        <mesh>
          <torusGeometry args={[1.1, 0.08, 16, 48]} />
          <meshStandardMaterial
            color={matColors.silverMetal}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.85, 0.04, 12, 36]} />
          <meshStandardMaterial
            color={matColors.goldAccent}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 5. DIESEL OIL FILTER (Upper Right Depth)                  */}
      {/* ========================================================= */}
      <group ref={filterRef} position={[2.5, 2.1, -3.8]} rotation={[0.4, 0, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.55, 0.55, 1.4, 20]} />
          <meshStandardMaterial
            color={matColors.graphite}
            metalness={0.7}
            roughness={0.4}
          />
        </mesh>
        {/* Subtle Gold Filter Band */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.56, 0.56, 0.15, 20]} />
          <meshStandardMaterial
            color={matColors.goldAccent}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* FLOATING ATMOSPHERIC DUST PARTICLES                        */}
      {/* ========================================================= */}
      <group ref={particlesRef}>
        {particlesData.map((p, idx) => (
          <mesh key={idx} position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[p.scale, 8, 8]} />
            <meshStandardMaterial
              color={idx % 4 === 0 ? matColors.goldBright : matColors.silverMetal}
              metalness={0.9}
              roughness={0.2}
              transparent
              opacity={isDark ? 0.7 : 0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
