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

  const part1 = isArabic ? "قطع غيار معدات الديزل" : "Diesel Equipment Parts";
  const part2 = isArabic ? "- فلاتر - زيوت محركات" : "- Filters - Engine Oils";
    
  const subheadline = isArabic
    ? "كل شحنة هي بداية فصل جديد من الإنجاز"
    : "Every shipment is the beginning of a new chapter of achievement";
    
  const primaryBtn = isArabic ? "استكشف المنتجات" : "Explore Products";
  const secondaryBtn = isArabic ? "تواصل معنا" : "Contact Us";

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.03, duration: 0.2 },
    }),
  };

  return (
    <div className="relative z-10 max-w-3xl">
      <motion.h1 
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-text mb-6"
      >
        <span className="text-gradient inline-block">
          {part1.split("").map((char, index) => (
            <motion.span key={index} custom={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </span>
        <br />
        <span className="inline-block">
          {part2.split("").map((char, index) => (
            <motion.span key={index} custom={part1.length + index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl"
      >
        {subheadline}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
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
