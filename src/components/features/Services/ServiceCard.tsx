'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import * as LucideIcons from 'lucide-react';

interface ServiceCardProps {
  iconName: keyof typeof LucideIcons;
  title: string;
  description: string;
  index: number;
}

export function ServiceCard({ iconName, title, description, index }: ServiceCardProps) {
  const iconsMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = iconsMap[iconName as string] || LucideIcons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card variant="elevated" className="h-full p-6 group cursor-pointer border-transparent hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300">
        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
          <IconComponent className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-text mb-3">{title}</h3>
        <p className="text-text-secondary leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}
