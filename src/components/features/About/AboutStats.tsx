'use client';

import * as React from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface AboutStatsProps {
  stats: {
    value: string;
    label: { ar: string; en: string };
  }[];
  locale: string;
}

function AnimatedCounter({ value, isInView }: { value: string; isInView: boolean }) {
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (isInView && numericPart > 0) {
      const controls = animate(0, numericPart, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(current) {
          setDisplayValue(Math.floor(current));
        },
      });
      return () => controls.stop();
    }
    return undefined;
  }, [isInView, numericPart]);

  return (
    <span className="text-3xl md:text-4xl font-bold text-accent mb-2">
      {displayValue}
      {suffix}
    </span>
  );
}

export function AboutStats({ stats, locale }: AboutStatsProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={item}
          whileHover={{ scale: 1.03, y: -6 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center p-6 bg-cards rounded-2xl shadow-sm border border-border/50 hover:shadow-glow transition-all duration-300"
        >
          <AnimatedCounter value={stat.value} isInView={isInView} />
          <span className="text-sm text-text-secondary text-center font-medium">
            {locale === 'ar' ? stat.label.ar : stat.label.en}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
