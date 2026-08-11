import { Container } from '@/components/shared/Container/Container';
import { Card } from '@/components/ui/Card';
import { ExternalLink } from 'lucide-react';
import { generateMetadata as getSiteMetadata } from '../metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const base = getSiteMetadata(locale);
  return {
    ...base,
    title: isArabic ? 'الماركات | بلال الجنيد للتجارة والاستيراد' : 'Brands | Bilal Al-Junaid Trading & Import',
    description: isArabic ? 'نحن الوكيل والموزع المعتمد لأكبر الماركات العالمية في مجال قطع غيار الديزل' : 'Authorized distributor for top global brands in diesel spare parts',
  };
}

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isArabic = locale === 'ar';

  const title = isArabic ? "الماركات العالمية" : "Global Brands";
  const desc = isArabic ? "نحن الوكيل والموزع المعتمد لأكبر الماركات العالمية في مجالنا" : "We are the authorized dealer and distributor for the biggest global brands in our field";

  const brands = [
    {
      name: "Caterpillar",
      description: isArabic ? "الشركة الرائدة في مجال المعدات الثقيلة والمولدات." : "The leading company in heavy equipment and generators.",
      url: "https://www.caterpillar.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Caterpillar_logo.svg"
    },
    {
      name: "Perkins",
      description: isArabic ? "محركات الديزل ذات الموثوقية العالية والأداء القوي." : "Highly reliable and high-performance diesel engines.",
      url: "https://www.perkins.com",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Perkins_Engines_logo.svg/1200px-Perkins_Engines_logo.svg.png"
    },
    {
      name: "Cummins",
      description: isArabic ? "حلول الطاقة المتطورة التي تدعم استمرار الأعمال." : "Advanced power solutions that support business continuity.",
      url: "https://www.cummins.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Cummins_logo.svg"
    },
    {
      name: "Volvo Penta",
      description: isArabic ? "محركات وحلول طاقة بحرية وصناعية عالية الجودة." : "High-quality marine and industrial engines and power solutions.",
      url: "https://www.volvopenta.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Volvo_Logo.svg/2560px-Volvo_Logo.svg.png"
    },
    {
      name: "John Deere",
      description: isArabic ? "معدات زراعية وصناعية ومحركات ديزل موثوقة." : "Reliable agricultural and industrial equipment and diesel engines.",
      url: "https://www.deere.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/John_Deere_logo.svg/2560px-John_Deere_logo.svg.png"
    },
    {
      name: "Fleetguard",
      description: isArabic ? "أنظمة الفلترة المتطورة للمحركات الشاقة." : "Advanced filtration systems for heavy duty engines.",
      url: "https://www.fleetguard.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Fleetguard.svg/2560px-Fleetguard.svg.png"
    },
    {
      name: "Donaldson",
      description: isArabic ? "حلول الترشيح وإدارة الهواء للمعدات الصناعية." : "Filtration and air management solutions for industrial equipment.",
      url: "https://www.donaldson.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Donaldson_Company_logo.svg/2560px-Donaldson_Company_logo.svg.png"
    }
  ];

  return (
    <div className="pb-24">
      <section className="bg-hero pt-32 pb-20 px-4 relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent" />
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{desc}</p>
        </Container>
      </section>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brands.map((brand, i) => (
            <Card key={i} variant="elevated" className="flex flex-col sm:flex-row overflow-hidden group">
              <div className="w-full sm:w-1/3 bg-cards/80 dark:bg-background/50 p-8 flex items-center justify-center border-b sm:border-b-0 sm:border-e border-border">
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="max-h-20 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <div className="w-full sm:w-2/3 p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-text mb-3">{brand.name}</h2>
                <p className="text-text-secondary mb-4">{brand.description}</p>
                <a 
                  href={brand.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-light transition-colors mt-auto w-max"
                >
                  {isArabic ? "زيارة الموقع" : "Visit Website"}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
