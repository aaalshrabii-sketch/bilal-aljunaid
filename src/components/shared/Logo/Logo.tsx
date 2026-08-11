'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

export interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className }: LogoProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <Link href={`/${locale}`} className={cn('flex items-center gap-3', className)}>
      <div className="relative w-12 h-12 flex-shrink-0 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <Image
          src="/images/logo/2.jpg"
          alt={isArabic ? 'بلال الجنيد للتجارة والاستيراد' : 'Bilal Al-Junaid Trading & Import'}
          fill
          className="object-cover"
          priority
          sizes="48px"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold text-text">
          {isArabic ? 'بلال الجنيد' : 'Bilal Al-Junaid'}
        </span>
        <span className="text-xs text-text-muted -mt-0.5">
          {isArabic ? 'للتجارة والاستيراد' : 'Trading & Import'}
        </span>
      </div>
    </Link>
  );
}

export default Logo;

