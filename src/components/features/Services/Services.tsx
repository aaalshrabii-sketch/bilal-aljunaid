'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/shared/Container/Container';
import { ServiceCard } from './ServiceCard';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function Services() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const title = isArabic ? "خدماتنا" : "Our Services";
  const buttonText = isArabic ? "عرض جميع الخدمات" : "View All Services";

  const services = [
    {
      icon: "Settings",
      title: isArabic ? "قطع غيار" : "Spare Parts",
      description: isArabic 
        ? "نوفر قطع الغيار الأصلية للمولدات والمحركات الديزل لضمان أطول فترة عمل ممكنة."
        : "We provide genuine spare parts for generators and diesel engines to ensure maximum uptime."
    },
    {
      icon: "Droplets",
      title: isArabic ? "زيوت محركات" : "Engine Oils",
      description: isArabic
        ? "أفضل أنواع زيوت المحركات التي تحافظ على أداء محركك في أقصى الظروف."
        : "The best types of engine oils that maintain your engine's performance under extreme conditions."
    },
    {
      icon: "Filter",
      title: isArabic ? "فلاتر" : "Filters",
      description: isArabic
        ? "مجموعة متكاملة من فلاتر الزيت، الهواء، والوقود للحفاظ على نقاء الأجزاء الداخلية."
        : "A complete range of oil, air, and fuel filters to maintain the purity of internal parts."
    },
    {
      icon: "Wrench",
      title: isArabic ? "صيانة وإصلاح" : "Maintenance & Repair",
      description: isArabic
        ? "فريق متخصص في صيانة المولدات وتقديم استشارات فنية وحلول متكاملة."
        : "A specialized team in generator maintenance providing technical consultations and integrated solutions."
    }
  ];

  return (
    <section className="py-24 bg-cards/50 border-y border-border/30">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">{title}</h2>
            <div className="h-1 w-20 bg-accent rounded-full" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button variant="outline">{buttonText}</Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              iconName={service.icon as any}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
