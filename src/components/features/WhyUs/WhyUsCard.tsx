'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import * as LucideIcons from 'lucide-react';

interface WhyUsCardProps {
  iconName: keyof typeof LucideIcons;
  title: string;
  description: string;
  index: number;
}

export function WhyUsCard({ iconName, title, description, index }: WhyUsCardProps) {
  const Icon = LucideIcons[iconName] as React.ElementType;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="p-8 h-full group hover:shadow-glow dark:hover:shadow-glow transition-all duration-300 bg-cards border border-border/50 hover:border-accent">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300 text-accent">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-text mb-3">{title}</h3>
        <p className="text-text-secondary leading-relaxed text-sm">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}
