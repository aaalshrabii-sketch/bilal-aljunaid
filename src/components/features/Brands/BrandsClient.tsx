'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { LayoutGrid, List } from 'lucide-react';
import { Container } from '@/components/shared/Container/Container';
import { cn } from '@/lib/utils';

export interface BrandItem {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  logo: string;
  description: string;
  descriptionEn: string;
  website: string;
}

interface BrandsClientProps {
  brands: BrandItem[];
  locale: string;
}

export function BrandsClient({ brands, locale }: BrandsClientProps) {
  const t = useTranslations('brands');
  const isArabic = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', label: isArabic ? 'الكل' : 'All' },
    { id: 'spare-parts', label: isArabic ? 'قطع الغيار' : 'Spare Parts' },
    { id: 'oils', label: isArabic ? 'زيوت' : 'Oils' },
    { id: 'filters', label: isArabic ? 'فلاتر' : 'Filters' },
    { id: 'air-compressors', label: isArabic ? 'كمبريشنات الهواء' : 'Air Compressors' },
  ];

  const filteredBrands =
    activeCategory === 'all'
      ? brands
      : brands.filter((brand) => brand.category === activeCategory);

  return (
    <Container>
      {/* Control Bar: Categories Filter & Grid/List View Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-cards/60 p-4 md:p-6 rounded-2xl border border-border/50">
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm cursor-pointer',
                activeCategory === category.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/25 scale-105'
                  : 'bg-cards text-text/80 hover:bg-border/60 hover:text-text border border-border/50'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle Buttons (Matches UI image design) */}
        <div className="flex items-center gap-2 bg-cards p-1.5 rounded-2xl border border-border/60 shadow-sm self-center md:self-auto">
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-3 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer',
              viewMode === 'list'
                ? 'bg-accent text-white shadow-md'
                : 'bg-transparent text-text/60 hover:text-text hover:bg-white/5'
            )}
            title={isArabic ? 'عرض قائمة' : 'List View'}
            aria-label="List View"
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-3 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer',
              viewMode === 'grid'
                ? 'bg-accent text-white shadow-md'
                : 'bg-transparent text-text/60 hover:text-text hover:bg-white/5'
            )}
            title={isArabic ? 'عرض شبكي' : 'Grid View'}
            aria-label="Grid View"
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      {/* Brand Cards Grid / List Display */}
      <motion.div
        layout
        className={cn(
          'grid gap-6',
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredBrands.map((brand) => (
            <motion.div
              key={brand.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'bg-cards border border-border/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/40 group',
                viewMode === 'list'
                  ? 'flex flex-col md:flex-row items-center text-center md:text-start gap-6'
                  : 'flex flex-col items-center text-center'
              )}
            >
              {/* Logo Container */}
              <div
                className={cn(
                  'relative bg-white rounded-xl p-4 flex items-center justify-center shadow-inner group-hover:bg-white/95 transition-all shrink-0',
                  viewMode === 'list' ? 'w-44 h-32' : 'w-full h-36 mb-4'
                )}
              >
                <Image
                  src={brand.logo}
                  alt={isArabic ? brand.name : brand.nameEn}
                  width={140}
                  height={140}
                  className="object-scale-down w-auto h-auto max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 120px, 140px"
                  onError={(e) => {
                    e.currentTarget.src = '/images/brands/placeholder.svg';
                  }}
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col flex-grow w-full">
                <div
                  className={cn(
                    'flex flex-col',
                    viewMode === 'list' ? 'items-center md:items-start mb-2' : 'items-center mb-2'
                  )}
                >
                  <h3 className="text-xl font-bold text-text">
                    {isArabic ? brand.name : brand.nameEn}
                  </h3>
                  <span className="text-xs font-semibold text-accent/80 mt-0.5">
                    {isArabic ? brand.categoryEn : brand.category}
                  </span>
                </div>
                <p
                  className={cn(
                    'text-sm text-text/70 mb-4 flex-grow',
                    viewMode === 'list' ? 'line-clamp-3' : 'line-clamp-2'
                  )}
                >
                  {isArabic ? brand.description : brand.descriptionEn}
                </p>

                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center text-xs font-semibold text-accent hover:underline gap-1 mt-auto',
                      viewMode === 'list' ? 'self-center md:self-start' : 'self-center'
                    )}
                  >
                    {isArabic ? 'زيارة الموقع الرسمي' : 'Visit Official Website'} &rarr;
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredBrands.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text/70">{t('noBrands')}</p>
        </div>
      )}
    </Container>
  );
}
