import { Container } from '@/components/shared/Container/Container';
import { AboutStats } from '@/components/features/About/AboutStats';
import { Button } from '@/components/ui/Button';
import companyData from '@/data/company.json';
import { generateMetadata as getSiteMetadata } from '../metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const base = getSiteMetadata(locale);
  return {
    ...base,
    title: isArabic ? 'من نحن | بلال الجنيد للتجارة والاستيراد' : 'About Us | Bilal Al-Junaid Trading & Import',
    description: isArabic ? 'تعرف على شركة بلال الجنيد للتجارة والاستيراد، خبرة 15+ سنة في سوق الديزل' : 'Learn about Bilal Al-Junaid Trading & Import, 15+ years of experience in the diesel market',
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isArabic = locale === 'ar';

  const title = isArabic ? "من نحن" : "About Us";
  const desc = isArabic ? "تعرف على قصتنا ورؤيتنا في عالم الاستيراد" : "Learn our story and vision in the world of import";

  const stats = [
    { value: "15+", label: { ar: "سنوات من الخبرة", en: "Years of Experience" } },
    { value: "500+", label: { ar: "عميل يثق بنا", en: "Trusted Clients" } },
    { value: "2000+", label: { ar: "منتج متوفر", en: "Available Products" } },
    { value: "20+", label: { ar: "ماركة عالمية", en: "Global Brands" } },
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

      {/* Story */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text mb-6">
                {isArabic ? "قصة شركتنا" : "Our Story"}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                {companyData.slogan[locale as 'ar' | 'en']}
                <br /><br />
                {isArabic 
                  ? "بدأنا رحلتنا في عالم التجارة والاستيراد برؤية واضحة لتلبية احتياجات السوق من قطع غيار المعدات الثقيلة والديزل بأسعار تنافسية وجودة لا يعلى عليها. مع مرور السنوات، استطعنا بناء شبكة قوية من الموردين العالميين والعملاء المحليين الذين يعتمدون علينا كشريك نجاح استراتيجي."
                  : "We started our journey in the world of trade and import with a clear vision to meet the market's needs for heavy equipment and diesel spare parts with competitive prices and unmatched quality. Over the years, we have built a strong network of global suppliers and local clients who rely on us as a strategic success partner."}
              </p>
            </div>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
               <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000" 
                  alt="Our Story"
                  className="object-cover w-full h-full"
                />
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-cards/50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-cards p-10 rounded-2xl border border-border/50 shadow-sm">
              <h3 className="text-2xl font-bold text-text mb-4 text-accent">{isArabic ? "رؤيتنا" : "Our Vision"}</h3>
              <p className="text-text-secondary leading-relaxed">
                {isArabic 
                  ? "أن نكون الخيار الأول والأكثر موثوقية في تقديم حلول الديزل المتكاملة وقطع الغيار الأصلية في المنطقة، وأن نساهم في بناء مستقبل صناعي مستدام."
                  : "To be the first and most trusted choice in providing integrated diesel solutions and genuine spare parts in the region, and to contribute to building a sustainable industrial future."}
              </p>
            </div>
            <div className="bg-cards p-10 rounded-2xl border border-border/50 shadow-sm">
              <h3 className="text-2xl font-bold text-text mb-4 text-accent">{isArabic ? "رسالتنا" : "Our Mission"}</h3>
              <p className="text-text-secondary leading-relaxed">
                {isArabic 
                  ? "توفير أحدث وأفضل المنتجات التي ترتقي بمستوى أداء معدات عملائنا، مع الالتزام التام بالشفافية والسرعة وخدمات الدعم الفني المستمرة."
                  : "To provide the latest and best products that elevate the performance of our clients' equipment, with full commitment to transparency, speed, and continuous technical support services."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-20">
        <Container>
           <AboutStats stats={stats} locale={locale} />
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12">
        <Container className="text-center">
          <Button size="lg" className="bg-accent hover:bg-accent-light text-white px-12">
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </Button>
        </Container>
      </section>
    </div>
  );
}
