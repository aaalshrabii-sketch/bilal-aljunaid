import { Container } from '@/components/shared/Container/Container';
import { Button } from '@/components/ui/Button';
import productsData from '@/data/products.json';
import { notFound } from 'next/navigation';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

export default function ProductDetailsPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const resolvedParams = use(params);
  const locale = resolvedParams.locale;
  const id = resolvedParams.id;
  const isArabic = locale === 'ar';

  const product = productsData.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const name = isArabic ? product.name.ar : product.name.en;
  const desc = isArabic ? product.description.ar : product.description.en;

  const features = isArabic
    ? ["ضمان لمدة عام كامل", "صناعة عالية الجودة", "توصيل سريع لكافة المناطق", "دعم فني بعد البيع"]
    : ["1 Year Full Warranty", "High Quality Manufacturing", "Fast Delivery to all regions", "After Sales Technical Support"];

  const specs = [
    { label: isArabic ? "التصنيف" : "Category", value: product.category },
    { label: isArabic ? "رقم القطعة" : "Part Number", value: `PN-${product.id}00${product.id}` },
    { label: isArabic ? "حالة التوفر" : "Availability", value: isArabic ? "متوفر بالمخزون" : "In Stock" },
  ];

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="bg-cards rounded-3xl p-6 md:p-12 border border-border/50 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-border/50">
                <img 
                  src={product.image} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="w-24 h-24 rounded-lg overflow-hidden border-2 border-border/50 hover:border-accent cursor-pointer opacity-70 hover:opacity-100 transition-all">
                      <img src={product.image} alt={`${name} ${i}`} className="w-full h-full object-cover" />
                   </div>
                 ))}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold w-max mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
                {name}
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                {desc}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-text mb-4">
                  {isArabic ? "المواصفات التقنية" : "Technical Specifications"}
                </h3>
                <div className="border border-border/50 rounded-xl overflow-hidden">
                  {specs.map((spec, i) => (
                    <div key={i} className={`flex justify-between p-4 ${i % 2 === 0 ? 'bg-slate-50 dark:bg-slate-900/50' : 'bg-cards'}`}>
                      <span className="text-text-secondary font-medium">{spec.label}</span>
                      <span className="text-text font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold text-text mb-4">
                  {isArabic ? "المميزات" : "Features"}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-text font-medium text-sm">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Button size="lg" className="w-full md:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white flex gap-2 shadow-glow">
                  <MessageCircle className="w-5 h-5" />
                  {isArabic ? "اطلب الآن عبر واتساب" : "Order via WhatsApp"}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}
