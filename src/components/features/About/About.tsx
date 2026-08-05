'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/shared/Container/Container';
import { AboutStats } from './AboutStats';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function About() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const title = isArabic ? "من نحن" : "About Us";
  const description = isArabic 
    ? "نحن شركة بلال الجنيد للتجارة والاستيراد، متخصصون في توفير حلول الديزل المتكاملة. نقدم مجموعة شاملة من قطع غيار المولدات والمحركات الديزل مع إمكانية التخصيص حسب الطلب للماركات العالمية."
    : "We are Bilal Al-Junaid Trading & Import, specializing in integrated diesel solutions. We offer a comprehensive range of diesel engine and generator spare parts with customization capabilities for global brands.";

  const stats = [
    { value: "15+", label: { ar: "سنوات خبرة", en: "Years Experience" } },
    { value: "500+", label: { ar: "عميل", en: "Clients" } },
    { value: "2000+", label: { ar: "منتج", en: "Products" } },
    { value: "20+", label: { ar: "ماركة", en: "Brands" } },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
              {title}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              {description}
            </p>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
              {isArabic ? "اعرف أكثر" : "Learn More"}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent mix-blend-overlay z-10" />
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000" 
                alt="About us"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10" />
          </motion.div>

        </div>

        <AboutStats stats={stats} locale={locale} />
      </Container>
    </section>
  );
}
