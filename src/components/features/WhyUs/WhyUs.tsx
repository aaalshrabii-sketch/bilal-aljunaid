'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/shared/Container/Container';
import { WhyUsCard } from './WhyUsCard';
import { motion } from 'framer-motion';

import companyData from '@/data/company.json';

export function WhyUs() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const title = isArabic ? "لماذا نحن" : "Why Choose Us";
  
  const icons = ["Clock", "TrendingUp", "Wallet", "Handshake", "Headphones"];
  const whyUsData = (companyData.whyUs?.[locale as 'ar' | 'en'] || companyData.whyUs?.ar || []);

  const reasons = whyUsData.map((item, idx) => ({
    icon: icons[idx] || "Clock",
    title: item.title,
    description: item.desc
  }));

  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text mb-4"
          >
            {title}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-1 w-20 bg-accent rounded-full mx-auto" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className={index === reasons.length - 1 && reasons.length % 3 !== 0 ? 'lg:col-span-2 xl:col-span-1' : ''}>
              <WhyUsCard
                index={index}
                iconName={reason.icon as any}
                title={reason.title}
                description={reason.description}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
