'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: RevealProps) {
  const directions = {
    up:    { y: 40, opacity: 0, x: 0 },
    down:  { y: -40, opacity: 0, x: 0 },
    left:  { x: -40, opacity: 0, y: 0 },
    right: { x: 40, opacity: 0, y: 0 },
    none:  { opacity: 0, x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={directions[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
