'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: {
    id: string;
    name: { ar: string; en: string };
    description: { ar: string; en: string };
    image: string;
    category?: string;
  };
  locale?: string;
  index?: number;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, locale = 'ar', index = 0, viewMode = 'grid' }: ProductCardProps) {
  const isArabic = locale === 'ar';
  const isList = viewMode === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Card
        variant="elevated"
        className={`group h-full flex overflow-hidden border border-border/50 hover:border-accent/50 bg-cards transition-all duration-300 ${
          isList ? 'flex-col sm:flex-row items-center' : 'flex-col'
        }`}
      >
        <div className={`relative overflow-hidden bg-background shrink-0 ${
          isList ? 'w-full sm:w-48 h-48 sm:h-full' : 'w-full h-56'
        }`}>
          <img 
            src={product.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"} 
            alt={isArabic ? product.name.ar : product.name.en} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 flex flex-col justify-between flex-grow w-full">
          <div>
            <h3 className="font-bold text-xl text-text mb-2 line-clamp-1 group-hover:text-accent transition-colors">
              {isArabic ? product.name.ar : product.name.en}
            </h3>
            <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
              {isArabic ? product.description.ar : product.description.en}
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full group-hover:bg-accent group-hover:text-white group-hover:border-accent font-medium transition-all"
            >
              {isArabic ? "التفاصيل" : "Details"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default ProductCard;
