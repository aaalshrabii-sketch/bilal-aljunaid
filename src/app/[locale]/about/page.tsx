import { Container } from '@/components/shared/Container/Container';
import { AboutStats } from '@/components/features/About/AboutStats';
import Link from 'next/link';
import companyData from '@/data/company.json';
import { generateMetadata as getSiteMetadata } from '../metadata';
import { ShieldCheck, Award, Zap, HeartHandshake, Eye, Sparkles, Building2 } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal/ScrollReveal';
import { getTranslations } from 'next-intl/server';

import Image from 'next/image';

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
  const t = await getTranslations({ locale, namespace: 'about' });

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

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border/40">
              <Image 
                src="/images/about/company.jpg" 
                alt="Our Story"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
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

      {/* عملاؤنا */}
      <ScrollReveal type="slideUp">
        <section className="py-16 bg-cards/50 border-y border-border">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text mb-4">
                {t('clients.title')}
              </h2>
              <p className="text-text-muted text-lg">
                {t('clients.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* اتصالات */}
              <div className="bg-cards p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                  📡 {isArabic ? "اتصالات" : "Telecommunications"}
                </h3>
                <ul className="space-y-2 text-text-muted">
                  {isArabic ? (
                    <>
                      <li>• المؤسسة العامة للاتصالات</li>
                      <li>• شركة يمن موبايل</li>
                      <li>• شركة يو</li>
                      <li>• شركة سبافون</li>
                    </>
                  ) : (
                    <>
                      <li>• Public Telecommunication Corp</li>
                      <li>• Yemen Mobile Co.</li>
                      <li>• YOU Telecom</li>
                      <li>• Sabafon Telecom</li>
                    </>
                  )}
                </ul>
              </div>

              {/* حكومية */}
              <div className="bg-cards p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                  🏛️ {isArabic ? "حكومية" : "Governmental"}
                </h3>
                <ul className="space-y-2 text-text-muted">
                  {isArabic ? (
                    <>
                      <li>• الجمارك - إدارة العامة</li>
                      <li>• المؤسسة العامة للطرق والجسور</li>
                      <li>• المؤسسة العامة للكهرباء</li>
                    </>
                  ) : (
                    <>
                      <li>• Customs - General Authority</li>
                      <li>• Public Corp for Roads & Bridges</li>
                      <li>• Public Electricity Corp</li>
                    </>
                  )}
                </ul>
              </div>

              {/* إعلامية */}
              <div className="bg-cards p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                  📺 {isArabic ? "إعلامية" : "Media"}
                </h3>
                <ul className="space-y-2 text-text-muted">
                  {isArabic ? (
                    <li>• المؤسسة العامة للإذاعة والتلفزيون</li>
                  ) : (
                    <li>• Public Radio & TV Corporation</li>
                  )}
                </ul>
              </div>

              {/* طبية */}
              <div className="bg-cards p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                  💊 {isArabic ? "طبية" : "Medical"}
                </h3>
                <ul className="space-y-2 text-text-muted">
                  {isArabic ? (
                    <li>• شركة الأدوية</li>
                  ) : (
                    <li>• Medical & Pharma Corporation</li>
                  )}
                </ul>
              </div>

              {/* موانئ */}
              <div className="bg-cards p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                  🚢 {isArabic ? "موانئ" : "Ports"}
                </h3>
                <ul className="space-y-2 text-text-muted">
                  {isArabic ? (
                    <li>• ميناء الحديدة</li>
                  ) : (
                    <li>• Hodeidah Port</li>
                  )}
                </ul>
              </div>

              {/* مالية */}
              <div className="bg-cards p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                  💰 {isArabic ? "مالية" : "Financial"}
                </h3>
                <ul className="space-y-2 text-text-muted">
                  {isArabic ? (
                    <>
                      <li>• كام بنك</li>
                      <li>• بنك سبأ</li>
                    </>
                  ) : (
                    <>
                      <li>• CAC Bank</li>
                      <li>• Saba Bank</li>
                    </>
                  )}
                </ul>
              </div>

              {/* خاصة */}
              <div className="bg-cards p-6 rounded-xl border border-border md:col-span-2 lg:col-span-3">
                <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                  🏢 {isArabic ? "خاصة" : "Private Sector"}
                </h3>
                <ul className="space-y-2 text-text-muted">
                  {isArabic ? (
                    <li>• شركات ومقاولات خاصة أخرى</li>
                  ) : (
                    <li>• Other private companies & contracting firms</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-text-muted">
                {t('clients.more')}
              </p>
            </div>
          </Container>
        </section>
      </ScrollReveal>

      {/* زر التواصل */}
      <ScrollReveal type="slideUp">
        <section className="py-16 bg-gradient-to-r from-accent/10 to-transparent">
          <Container>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-text mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-text-muted mb-8">
                {t('contact.subtitle')}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block px-8 py-4 bg-accent text-primary rounded-xl font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/25"
              >
                {t('contact.button')}
              </Link>
            </div>
          </Container>
        </section>
      </ScrollReveal>
    </div>
  );
}


