import { Container } from '@/components/shared/Container/Container';
import { AboutStats } from '@/components/features/About/AboutStats';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import companyData from '@/data/company.json';
import { generateMetadata as getSiteMetadata } from '../metadata';
import { ShieldCheck, Award, Zap, HeartHandshake, Eye, Sparkles, Building2 } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const base = getSiteMetadata(locale);
  return {
    ...base,
    title: isArabic ? 'من نحن | بلال الجنيد للتجارة والاستيراد' : 'About Us | Bilal Al-Junaid Trading & Import',
    description: isArabic ? companyData.description.ar : companyData.description.en,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  const isArabic = locale === 'ar';

  const title = isArabic ? "من نحن" : "About Us";
  const desc = companyData.slogan[locale];

  const stats = [
    { value: "18+", label: { ar: "سنوات من الخبرة (منذ 2007)", en: "Years of Experience (Since 2007)" } },
    { value: "500+", label: { ar: "عميل يثق بنا", en: "Trusted Clients" } },
    { value: "2000+", label: { ar: "منتج متوفر", en: "Available Products" } },
    { value: "20+", label: { ar: "ماركة عالمية", en: "Global Brands" } },
  ];

  const valuesIcons = [<Sparkles key="1" className="w-6 h-6 text-accent" />, <Zap key="2" className="w-6 h-6 text-accent" />, <ShieldCheck key="3" className="w-6 h-6 text-accent" />, <Award key="4" className="w-6 h-6 text-accent" />];

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-hero pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent" />
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-white/80 text-xl font-medium max-w-3xl mx-auto">{desc}</p>
        </Container>
      </section>

      {/* Story & Establishment */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-3 text-accent font-semibold mb-2">
                  <Building2 className="w-5 h-5" />
                  <span>{isArabic ? "قصة التميز" : "Story of Excellence"}</span>
                </div>
                <h2 className="text-3xl font-bold text-text mb-4">
                  {isArabic ? "قصة شركتنا" : "Our Story"}
                </h2>
                <p className="text-text-secondary leading-relaxed text-lg">
                  {companyData.description[locale]}
                </p>
              </div>

              <div className="bg-cards/60 p-6 rounded-2xl border border-border/60">
                <h3 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent inline-block" />
                  {isArabic ? "نشأة الشركة" : "Establishment"}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {companyData.establishment[locale]}
                </p>
              </div>
            </div>

            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-border/40">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Story"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="py-16 bg-cards/40 border-y border-border/40">
        <Container>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-2">
              <Eye className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-bold text-text">{isArabic ? "الرؤية" : "Our Vision"}</h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
              {companyData.vision[locale]}
            </p>
          </div>
        </Container>
      </section>

      {/* Goals */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">{isArabic ? "أهدافنا" : "Our Goals"}</h2>
            <div className="h-1 w-20 bg-accent rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyData.goals[locale].map((goal, idx) => (
              <div key={idx} className="bg-cards p-8 rounded-2xl border border-border/50 shadow-sm flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-text">{goal.title}</h3>
                <p className="text-text-secondary leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values & Features */}
      <section className="py-20 bg-cards/30">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">{isArabic ? "القيم والمميزات" : "Values & Features"}</h2>
            <div className="h-1 w-20 bg-accent rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyData.values[locale].map((val, idx) => (
              <div key={idx} className="bg-cards p-8 rounded-2xl border border-border/50 shadow-sm flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                  {valuesIcons[idx] || <Award className="w-6 h-6 text-accent" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text mb-2">{val.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Company Message */}
      <section className="py-16">
        <Container>
          <div className="bg-gradient-to-r from-accent/15 via-accent/5 to-transparent border border-accent/20 rounded-3xl p-10 md:p-14 text-center max-w-4xl mx-auto flex flex-col items-center gap-6 shadow-md">
            <HeartHandshake className="w-12 h-12 text-accent" />
            <h3 className="text-2xl md:text-3xl font-bold text-text">{isArabic ? "رسالة الشركة" : "Company Message"}</h3>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl">
              "{companyData.message[locale]}"
            </p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16">
        <Container>
           <AboutStats stats={stats} locale={locale} />
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12">
        <Container className="text-center">
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="bg-accent hover:bg-accent-light text-white px-12 text-lg font-semibold">
              {isArabic ? "تواصل معنا الان" : "Contact Us Now"}
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}

