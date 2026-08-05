'use client';

import { motion } from 'framer-motion';

interface BrandSliderProps {
  brands: string[];
}

export function BrandSlider({ brands }: BrandSliderProps) {
  // Duplicate brands array to create seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden flex items-center py-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex items-center gap-16 md:gap-24 pl-16 md:pl-24 w-max"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <div 
            key={index} 
            className="text-2xl md:text-3xl font-bold text-text-secondary/50 dark:text-text-secondary/30 whitespace-nowrap hover:text-accent transition-colors duration-300"
          >
            {brand}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
