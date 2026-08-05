'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <Link href={`/${locale}`} className={cn('flex items-center gap-2 group', className)}>
      <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-white shadow-glow overflow-hidden">
        <span className="font-bold text-xl z-10">B</span>
        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-tight text-text">
          {isArabic ? 'بلال الجنيد' : 'Bilal Al-Junaid'}
        </span>
        <span className="text-xs text-text-secondary">
          {isArabic ? 'للتجارة والاستيراد' : 'Trading & Import'}
        </span>
      </div>
    </Link>
  );
}
