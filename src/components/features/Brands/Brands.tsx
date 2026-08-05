'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/shared/Container/Container';
import { BrandSlider } from './BrandSlider';
import { motion } from 'framer-motion';

export function Brands() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const title = isArabic ? "الماركات التي نعمل معها" : "Brands We Work With";

  const brands = [
    "Caterpillar",
    "Perkins",
    "Cummins",
    "Volvo Penta",
    "John Deere",
    "Fleetguard",
    "Donaldson"
  ];

  return (
    <section className="py-20 bg-cards/50 border-y border-border/50">
      <Container>
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-text mb-4"
          >
            {title}
          </motion.h2>
        </div>

        <BrandSlider brands={brands} />
      </Container>
    </section>
  );
}
