import { Container } from '@/components/shared/Container/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { generateMetadata as getSiteMetadata } from '../metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const base = getSiteMetadata(locale);
  return {
    ...base,
    title: isArabic ? 'خدماتنا | بلال الجنيد للتجارة والاستيراد' : 'Our Services | Bilal Al-Junaid Trading & Import',
    description: isArabic ? 'نقدم خدمات متكاملة في قطع غيار الديزل، الزيوت، الفلاتر، والصيانة' : 'We provide integrated services in diesel spare parts, oils, filters, and maintenance',
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isArabic = locale === 'ar';

  const title = isArabic ? "خدماتنا" : "Our Services";
  const desc = isArabic ? "نقدم مجموعة شاملة من الحلول المتكاملة لتلبية جميع احتياجاتك" : "We offer a comprehensive range of integrated solutions to meet all your needs";

  const services = [
    {
      icon: "Settings",
      title: isArabic ? "توفير قطع الغيار الأصلية" : "Genuine Spare Parts",
      description: isArabic 
        ? "نوفر قطع الغيار الأصلية للمولدات والمحركات الديزل لضمان أطول فترة عمل ممكنة. نعمل مع كبرى الماركات العالمية لتأمين احتياجاتكم بسرعة وموثوقية."
        : "We provide genuine spare parts for generators and diesel engines to ensure maximum uptime. We work with major global brands to secure your needs quickly and reliably.",
      features: isArabic 
        ? ["ضمان الجودة", "توصيل سريع", "تطابق مع المواصفات العالمية"] 
        : ["Quality Guarantee", "Fast Delivery", "Compliance with Global Standards"]
    },
    {
      icon: "Droplets",
      title: isArabic ? "توريد زيوت المحركات" : "Engine Oils Supply",
      description: isArabic
        ? "أفضل أنواع زيوت المحركات التي تحافظ على أداء محركك في أقصى الظروف. منتجاتنا تضمن لك تقليل الاحتكاك وحماية الأجزاء الداخلية من التآكل."
        : "The best types of engine oils that maintain your engine's performance under extreme conditions. Our products ensure reduced friction and protect internal parts from wear.",
      features: isArabic
        ? ["زيوت للخدمة الشاقة", "مقاومة للحرارة العالية", "إطالة عمر المحرك"]
        : ["Heavy Duty Oils", "High Heat Resistance", "Extend Engine Life"]
    },
    {
      icon: "Filter",
      title: isArabic ? "فلاتر متنوعة وعالية الجودة" : "Various High-Quality Filters",
      description: isArabic
        ? "مجموعة متكاملة من فلاتر الزيت، الهواء، والوقود للحفاظ على نقاء الأجزاء الداخلية ومنع تسلل الشوائب التي قد تعيق كفاءة عمل المعدات."
        : "A complete range of oil, air, and fuel filters to maintain the purity of internal parts and prevent impurities that may hinder equipment efficiency.",
      features: isArabic
        ? ["فلاتر هواء", "فلاتر زيت", "فلاتر ديزل/وقود"]
        : ["Air Filters", "Oil Filters", "Diesel/Fuel Filters"]
    },
    {
      icon: "Wrench",
      title: isArabic ? "صيانة وتقديم استشارات فنية" : "Maintenance & Technical Consultations",
      description: isArabic
        ? "فريق متخصص في صيانة المولدات وتقديم استشارات فنية وحلول متكاملة تساعدك على اختيار المنتجات المناسبة لتقليل فترات التوقف غير المجدولة."
        : "A specialized team in generator maintenance providing technical consultations and integrated solutions to help you choose the right products and reduce unscheduled downtime.",
      features: isArabic
        ? ["دعم فني متخصص", "استشارات مجانية", "زيارات ميدانية"]
        : ["Specialized Technical Support", "Free Consultations", "Field Visits"]
    }
  ];

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-hero pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent" />
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{desc}</p>
        </Container>
      </section>

      {/* Services List */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col gap-12">
            {services.map((service, index) => {
              const iconsMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
              const IconComponent = iconsMap[service.icon] || LucideIcons.HelpCircle;
              return (
                <Card key={index} variant="elevated" className="flex flex-col lg:flex-row overflow-hidden group">
                  <div className="bg-background/50 p-10 lg:w-1/3 flex items-center justify-center border-b lg:border-b-0 lg:border-e border-border">
                     <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                        <IconComponent className="w-12 h-12 text-accent group-hover:text-white transition-colors duration-300" />
                     </div>
                  </div>
                  <div className="p-10 lg:w-2/3 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-text mb-4">{service.title}</h2>
                    <p className="text-text-secondary leading-relaxed mb-6">{service.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature, i) => (
                         <li key={i} className="flex items-center gap-2 text-text font-medium text-sm">
                           <LucideIcons.CheckCircle2 className="w-5 h-5 text-accent" />
                           {feature}
                         </li>
                      ))}
                    </ul>
                    <div>
                      <Link href={`/${locale}/contact`}>
                        <Button className="bg-primary hover:bg-primary-light">
                          {isArabic ? "اطلب الخدمة" : "Request Service"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
