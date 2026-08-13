'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IconRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function IconReveal({ children, delay = 0, className = '' }: IconRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.6,
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
