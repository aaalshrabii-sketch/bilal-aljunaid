'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // e.g. -50 to 50
  className?: string;
}

export default function Parallax({ children, speed = -30, className = '' }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 4]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
