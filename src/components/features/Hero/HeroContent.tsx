'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface HeroContentProps {
  locale: string;
}

export function HeroContent({ locale }: HeroContentProps) {
  const isArabic = locale === 'ar';

  const part1 = isArabic ? 'قطع غيار معدات الديزل' : 'Diesel Equipment Parts';
  const part2 = isArabic ? '- فلاتر - زيوت محركات' : '- Filters - Engine Oils';

  const subheadline = isArabic
    ? 'كل شحنة هي بداية فصل جديد من الإنجاز'
    : 'Every shipment is the beginning of a new chapter of achievement';

  const primaryBtn = isArabic ? 'استكشف المنتجات' : 'Explore Products';
  const secondaryBtn = isArabic ? 'تواصل معنا' : 'Contact Us';

  return (
    <div className="relative z-10 max-w-3xl">
      {/* ✅ إصلاح: animation واحد على h1 كاملاً بدلاً من 43 motion.span فردي */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-text mb-6"
      >
        <span className="text-gradient inline-block">{part1}</span>
        <br />
        <span className="inline-block">{part2}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl"
      >
        {subheadline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link href={`/${locale}/products`}>
          <Button size="lg" className="shadow-glow bg-accent hover:bg-accent-light text-white border-0">
            {primaryBtn}
          </Button>
        </Link>
        <Link href={`/${locale}/contact`}>
          <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
            {secondaryBtn}
          </Button>
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 hidden md:block cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
        }}
      >
        <ChevronDown className="text-accent hover:text-accent-light transition-colors" size={32} />
      </motion.div>
    </div>
  );
}
