'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Ring } from '@react-three/drei';
import { Group } from 'three';

export default function Gear() {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.012;
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1.2, 0.2, 12, 24]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#D4A017" metalness={0.8} roughness={0.2} />
      </Torus>
      <Torus args={[0.8, 0.15, 12, 24]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.1} />
      </Torus>
      <Ring args={[0.4, 0.3, 12]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.3} />
      </Ring>
    </group>
  );
}
