'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Cylinder, Box } from '@react-three/drei';
import { Group } from 'three';

export default function DieselEngine() {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={[0.9, 0.9, 0.9]}>
      {/* Engine main block */}
      <Box args={[2, 1.2, 1.5]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#D4A017"
          metalness={0.8}
          roughness={0.2}
          distort={0.08}
          speed={0.5}
        />
      </Box>

      {/* Engine cylinders */}
      {[-0.7, 0, 0.7].map((x, i) => (
        <Cylinder
          key={i}
          args={[0.35, 0.35, 0.7, 16]}
          position={[x, 0.85, 0]}
        >
          <meshStandardMaterial
            color="#0F172A"
            metalness={0.9}
            roughness={0.2}
          />
        </Cylinder>
      ))}

      {/* Front pulley gear */}
      <Sphere args={[0.42, 32, 32]} position={[0, -0.6, 0.85]}>
        <MeshDistortMaterial
          color="#FBBF24"
          metalness={0.9}
          roughness={0.1}
          distort={0.15}
          speed={1}
        />
      </Sphere>

      {/* Side manifolds */}
      <Box args={[2.2, 0.3, 0.4]} position={[0, 0.2, 0.9]}>
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </Box>
    </group>
  );
}
