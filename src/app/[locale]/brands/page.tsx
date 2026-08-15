import { Container } from '@/components/shared/Container/Container';
import brandsData from '@/data/brands.json';
import { generateMetadata as getSiteMetadata } from '../metadata';
import { BrandsClient, BrandItem } from '@/components/features/Brands/BrandsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const base = getSiteMetadata(locale);
  return {
    ...base,
    title: isArabic
      ? 'الماركات العالمية | بلال الجنيد للتجارة والاستيراد'
      : 'Global Brands | Bilal Al-Junaid Trading & Import',
    description: isArabic
      ? 'نستورد ونوزع أفضل الماركات العالمية لقطع غيار الديزل والزيوت والفلاتر وكمبريشنات الهواء'
      : 'Importer and distributor of top global brands for diesel spare parts, oils, filters, and air compressors',
  };
}

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isArabic = locale === 'ar';

  const title = isArabic ? 'الماركات العالمية' : 'Global Brands';
  const desc = isArabic
    ? 'نحن نوفر أفضل الماركات العالمية في مجال قطع غيار الديزل والزيوت والفلاتر ومعدات الهواء'
    : 'Authorized distributor and importer for leading global brands in spare parts, oils, filters, and compressors';

  const brands = brandsData as BrandItem[];

  return (
    <main className="min-h-screen bg-background text-text pb-28">
      {/* Hero Header */}
      <section className="bg-hero pt-32 pb-20 px-4 relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent" />
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">{desc}</p>
        </Container>
      </section>

      {/* Brands Client Filter Component */}
      <BrandsClient brands={brands} locale={locale} />
    </main>
  );
}
