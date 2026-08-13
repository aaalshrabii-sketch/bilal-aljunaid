import { Container } from '@/components/shared/Container/Container';
import brandsData from '@/data/brands.json';
import { generateMetadata as getSiteMetadata } from '../metadata';
import { Layers, Droplet, Filter, Wind } from 'lucide-react';

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

interface BrandItem {
  id: string;
  name: string;
  category: string;
  logo: string;
}

// Brand display config: custom font weights & colors per brand for premium look
const brandStyles: Record<string, { weight: string; tracking: string; size: string }> = {
  perkins: { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-xl' },
  volvo: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-2xl' },
  cat: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-3xl' },
  mtu: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-2xl' },
  man: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-3xl' },
  'john-deere': { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-xl' },
  deutz: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-2xl' },
  doosan: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-xl' },
  iveco: { weight: 'font-extrabold', tracking: 'tracking-widest', size: 'text-2xl' },
  kubota: { weight: 'font-black', tracking: 'tracking-wide', size: 'text-xl' },
  mahle: { weight: 'font-extrabold', tracking: 'tracking-widest', size: 'text-2xl' },
  ucb: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-3xl' },
  bosch: { weight: 'font-black', tracking: 'tracking-wide', size: 'text-2xl' },
  zf: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-4xl' },
  skf: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-2xl' },
  fag: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-3xl' },
  goetze: { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-xl' },
  shell: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-2xl' },
  eni: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-3xl' },
  castrol: { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-xl' },
  petromin: { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-xl' },
  fleetguard: { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-lg' },
  baldwin: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-xl' },
  wix: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-3xl' },
  'mann-filter': { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-lg' },
  hengst: { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-xl' },
  sampiyon: { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-lg' },
  'atlas-copco': { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-base' },
  kaeser: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-xl' },
  compair: { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-xl' },
  betico: { weight: 'font-extrabold', tracking: 'tracking-widest', size: 'text-xl' },
  'ingersoll-rand': { weight: 'font-extrabold', tracking: 'tracking-wide', size: 'text-sm' },
  sullair: { weight: 'font-black', tracking: 'tracking-widest', size: 'text-xl' },
};

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isArabic = locale === 'ar';

  const title = isArabic ? 'الماركات العالمية' : 'Global Brands';
  const desc = isArabic
    ? 'نحن الوكيل والموزع المعتمد لأكبر الماركات العالمية في مجال قطع غيار الديزل والزيوت والفلاتر ومعدات الهواء'
    : 'Authorized distributor and importer for leading global brands in spare parts, oils, filters, and compressors';

  // Group brands by category
  const groups = {
    spare_parts: (brandsData as BrandItem[]).filter((b) => b.category === 'spare_parts'),
    filters: (brandsData as BrandItem[]).filter((b) => b.category === 'filters'),
    oils: (brandsData as BrandItem[]).filter((b) => b.category === 'oils'),
    'air-compressors': (brandsData as BrandItem[]).filter(
      (b) => b.category === 'air-compressors' || b.category === 'compressors'
    ),
  };

  const sections = [
    {
      id: 'spare_parts',
      title: isArabic ? 'قطع غيار المحركات والمعدات' : 'Engine & Equipment Spare Parts',
      brands: groups.spare_parts,
      icon: Layers,
      containerBorder: 'border border-border/80 hover:border-accent/50',
      bgColor: 'bg-cards',
      titleColor: 'text-text font-bold',
      badgeBg: 'bg-accent/10 text-accent border border-accent/20',
      brandTextColor: 'text-text font-bold',
      brandHoverColor: 'hover:text-accent',
      dividerColor: 'border-border/60',
    },
    {
      id: 'filters',
      title: isArabic ? 'أنظمة الفلاتر والتنقية' : 'Filtration Systems & Filters',
      brands: groups.filters,
      icon: Filter,
      containerBorder: 'border border-border/80 hover:border-accent/50',
      bgColor: 'bg-cards',
      titleColor: 'text-text font-bold',
      badgeBg: 'bg-accent/10 text-accent border border-accent/20',
      brandTextColor: 'text-text font-bold',
      brandHoverColor: 'hover:text-accent',
      dividerColor: 'border-border/60',
    },
    {
      id: 'oils',
      title: isArabic ? 'زيوت وشحوم المحركات' : 'Motor Oils & Lubricants',
      brands: groups.oils,
      icon: Droplet,
      containerBorder: 'border border-border/80 hover:border-accent/50',
      bgColor: 'bg-cards',
      titleColor: 'text-text font-bold',
      badgeBg: 'bg-accent/10 text-accent border border-accent/20',
      brandTextColor: 'text-text font-bold',
      brandHoverColor: 'hover:text-accent',
      dividerColor: 'border-border/60',
    },
    {
      id: 'air-compressors',
      title: isArabic ? 'كمبريشنات وفواصل الهواء' : 'Air Compressors & Separators',
      brands: groups['air-compressors'],
      icon: Wind,
      containerBorder: 'border border-border/80 hover:border-accent/50',
      bgColor: 'bg-cards',
      titleColor: 'text-text font-bold',
      badgeBg: 'bg-accent/10 text-accent border border-accent/20',
      brandTextColor: 'text-text font-bold',
      brandHoverColor: 'hover:text-accent',
      dividerColor: 'border-border/60',
    },
  ];

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

      <Container>
        <div className="space-y-10">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section
                key={section.id}
                className={`rounded-2xl overflow-hidden shadow-lg ${section.containerBorder} ${section.bgColor} backdrop-blur-sm`}
              >
                {/* Section Header */}
                <div className={`flex items-center gap-3 px-6 md:px-10 py-5 border-b ${section.dividerColor}`}>
                  <div className={`p-2 rounded-xl ${section.badgeBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className={`text-xl md:text-2xl font-bold ${section.titleColor}`}>
                    {section.title}
                  </h2>
                  <span className={`ms-auto text-sm font-medium px-3 py-1 rounded-full ${section.badgeBg}`}>
                    {section.brands.length} {isArabic ? 'ماركة' : 'brands'}
                  </span>
                </div>

                {/* Brand Text Logos Grid */}
                <div className="px-6 md:px-10 py-8">
                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 sm:gap-y-8 md:gap-x-14 md:gap-y-10">
                    {section.brands.map((brand) => {
                      const style = brandStyles[brand.id] ?? {
                        weight: 'font-extrabold',
                        tracking: 'tracking-wide',
                        size: 'text-xl',
                      };

                      return (
                        <div
                          key={brand.id}
                          className="group flex flex-col items-center gap-2 cursor-default transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                        >
                          {/* Brand Name as premium typography */}
                          <span
                            className={`
                              ${style.size} ${style.weight} ${style.tracking} uppercase
                              ${section.brandTextColor} ${section.brandHoverColor}
                              transition-colors duration-300 select-none leading-none
                            `}
                          >
                            {brand.name}
                          </span>
                          {/* Subtle underline accent on hover */}
                          <span
                            className={`block h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full ${
                              section.id === 'spare_parts' || section.id === 'filters'
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
