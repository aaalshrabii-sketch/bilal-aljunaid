'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { Container } from '@/components/shared/Container/Container';
import { ProductCard } from './ProductCard';
import { ProductFilter } from './ProductFilter';
import { Button } from '@/components/ui/Button';
import productsData from '@/data/products.json';
import { motion, AnimatePresence } from 'framer-motion';

export function Products() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const [activeCategory, setActiveCategory] = React.useState('all');

  const title = isArabic ? "منتجاتنا" : "Our Products";
  const buttonText = isArabic ? "عرض جميع المنتجات" : "View All Products";

  const categories = [
    { id: 'all', label: { ar: "الكل", en: "All" } },
    { id: 'spare_parts', label: { ar: "قطع غيار", en: "Spare Parts" } },
    { id: 'oils', label: { ar: "زيوت", en: "Oils" } },
    { id: 'filters', label: { ar: "فلاتر", en: "Filters" } },
    { id: 'compressors', label: { ar: "كمبريشنات هواء", en: "Air Compressors" } }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="text-center mb-12">
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

        <ProductFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
          locale={locale} 
        />

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center">
          <Button size="lg" className="px-12 bg-primary hover:bg-primary-light">
            {buttonText}
          </Button>
        </div>
      </Container>
    </section>
  );
}
