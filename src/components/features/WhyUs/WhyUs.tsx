'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/shared/Container/Container';
import { WhyUsCard } from './WhyUsCard';
import { motion } from 'framer-motion';

export function WhyUs() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const title = isArabic ? "لماذا نحن" : "Why Choose Us";
  
  const reasons = [
    {
      icon: "Clock",
      title: isArabic ? "سرعة التسليم" : "Fast Delivery",
      description: isArabic 
        ? "نلتزم بأعلى معايير السرعة في تلبية الطلبات وتوصيلها بأمان."
        : "We commit to the highest standards of speed in fulfilling and delivering orders safely."
    },
    {
      icon: "TrendingUp",
      title: isArabic ? "زيادة الكفاءة" : "Increased Efficiency",
      description: isArabic
        ? "منتجاتنا مصممة لرفع كفاءة معداتك وتقليل فترات التوقف."
        : "Our products are designed to increase equipment efficiency and reduce downtime."
    },
    {
      icon: "Wallet",
      title: isArabic ? "توفير التكاليف" : "Cost Savings",
      description: isArabic
        ? "أسعار تنافسية وحلول اقتصادية تضمن لك أفضل قيمة مقابل السعر."
        : "Competitive prices and economical solutions ensure you get the best value for money."
    },
    {
      icon: "Handshake",
      title: isArabic ? "علاقات موثوقة" : "Trusted Relationships",
      description: isArabic
        ? "نبني شراكات طويلة الأمد مبنية على الثقة والشفافية مع عملائنا."
        : "We build long-term partnerships based on trust and transparency with our clients."
    },
    {
      icon: "Headphones",
      title: isArabic ? "دعم فني مستمر" : "Continuous Support",
      description: isArabic
        ? "فريق دعم فني متخصص متاح دائماً للرد على استفساراتكم وحل مشاكلكم."
        : "A dedicated technical support team always available to answer your queries and solve issues."
    }
  ];

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
