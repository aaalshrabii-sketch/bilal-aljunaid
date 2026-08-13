'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import * as LucideIcons from 'lucide-react';
import IconReveal from '@/components/animations/IconReveal/IconReveal';

interface WhyUsCardProps {
  iconName: keyof typeof LucideIcons;
  title: string;
  description: string;
  index: number;
}

export function WhyUsCard({ iconName, title, description, index }: WhyUsCardProps) {
  const iconsMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = iconsMap[iconName as string] || LucideIcons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Card
        hover
        className="p-8 h-full group transition-all duration-300 bg-cards border border-border/50 hover:border-accent/40"
      >
        <IconReveal delay={index * 0.1 + 0.2}>
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 group-hover:rotate-3 transition-all duration-400 text-accent group-hover:text-white shadow-sm group-hover:shadow-glow">
            <IconComponent className="w-7 h-7" />
          </div>
        </IconReveal>
        <h3 className="text-xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-secondary leading-relaxed text-sm">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}
