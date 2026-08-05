'use client';

import * as React from 'react';
import { use } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, List } from 'lucide-react';
import { Container } from '@/components/shared/Container/Container';
import { ProductCard } from '@/components/features/Products/ProductCard';
import productsData from '@/data/products.json';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export default function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = use(params);
  const locale = resolvedParams?.locale || useLocale();
  const isArabic = locale === 'ar';

  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', label: { ar: 'الكل', en: 'All' } },
    { id: 'spare_parts', label: { ar: 'قطع غيار', en: 'Spare Parts' } },
    { id: 'oils', label: { ar: 'زيوت', en: 'Oils' } },
    { id: 'filters', label: { ar: 'فلاتر', en: 'Filters' } },
    { id: 'compressors', label: { ar: 'كمبريشنات هواء', en: 'Air Compressors' } },
  ];

  const filteredProducts = React.useMemo(() => {
    let products = productsData;

    if (activeFilter !== 'all') {
      products = products.filter((p) => p.category === activeFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      products = products.filter((p) => {
        const nameAr = p.name.ar.toLowerCase();
        const nameEn = p.name.en.toLowerCase();
        const descAr = p.description.ar.toLowerCase();
        const descEn = p.description.en.toLowerCase();
        return (
          nameAr.includes(term) ||
          nameEn.includes(term) ||
          descAr.includes(term) ||
          descEn.includes(term)
        );
      });
    }

    return products;
  }, [activeFilter, searchTerm]);

  return (
    <main className="min-h-screen bg-background text-text pb-24">
      {/* Hero قسم الهيرو بنفس ألوان باقي الصفحات الداكنة الموحدة */}
      <section className="bg-hero pt-32 pb-20 px-4 relative overflow-hidden mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent" />
        <Container className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {isArabic ? 'منتجاتنا' : 'Our Products'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            {isArabic
              ? 'تصفح أحدث قطع الغيار والزيوت والفلاتر وكمبريشنات الهواء ذات الجودة العالية'
              : 'Browse our latest high-quality spare parts, oils, filters, and air compressors'}
          </motion.p>
        </Container>
      </section>

      {/* أدوات البحث والتصفية وعرض الصور */}
      <section className="py-6 mb-8 border-y border-border/50 bg-cards/40">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* شريط البحث */}
            <div className="relative w-full md:w-80">
              <Search
                className={`absolute ${
                  isArabic ? 'right-3' : 'left-3'
                } top-1/2 transform -translate-y-1/2 text-text-secondary z-10`}
                size={18}
              />
              <input
                type="text"
                placeholder={isArabic ? 'ابحث عن منتج...' : 'Search product...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full h-11 rounded-xl bg-cards border border-border text-text ${
                  isArabic ? 'pr-10 pl-4' : 'pl-10 pr-4'
                } focus:outline-none focus:border-accent text-sm transition-colors`}
              />
            </div>

            {/* أزرار التصفية */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    activeFilter === cat.id
                      ? 'bg-accent text-white shadow-glow'
                      : 'bg-cards text-text-secondary border border-border hover:border-accent hover:text-accent'
                  )}
                >
                  {isArabic ? cat.label.ar : cat.label.en}
                </button>
              ))}
            </div>

            {/* تبديل طريقة العرض */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2.5 rounded-xl border border-border transition-all duration-300',
                  viewMode === 'grid'
                    ? 'bg-accent text-white border-accent'
                    : 'bg-cards text-text-secondary hover:text-text'
                )}
                aria-label="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2.5 rounded-xl border border-border transition-all duration-300',
                  viewMode === 'list'
                    ? 'bg-accent text-white border-accent'
                    : 'bg-cards text-text-secondary hover:text-text'
                )}
                aria-label="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* شبكة المنتجات */}
      <section className="py-6">
        <Container>
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-cards rounded-2xl border border-border/50"
              >
                <p className="text-text-secondary text-lg font-medium">
                  {isArabic ? 'لا توجد منتجات مطابقة للبحث حالياً.' : 'No matching products found.'}
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className={cn(
                  'grid gap-6',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                )}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 text-center text-text-secondary text-sm font-medium">
            {isArabic ? 'عرض' : 'Showing'} <span className="text-accent font-bold">{filteredProducts.length}</span> {isArabic ? 'منتج' : 'products'}
          </div>
        </Container>
      </section>
    </main>
  );
}
