'use client';

interface ProductFilterProps {
  categories: { id: string; label: { ar: string; en: string } }[];
  activeCategory: string;
  onSelect: (category: string) => void;
  locale: string;
}

export function ProductFilter({ categories, activeCategory, onSelect, locale }: ProductFilterProps) {
  const isArabic = locale === 'ar';

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === cat.id
              ? 'bg-accent text-accent-foreground shadow-glow font-bold'
              : 'bg-cards text-text-secondary border border-border hover:border-accent hover:text-accent'
          }`}
        >
          {isArabic ? cat.label.ar : cat.label.en}
        </button>
      ))}
    </div>
  );
}
