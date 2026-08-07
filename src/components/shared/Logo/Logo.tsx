'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const locale = useLocale();

  return (
    <Link href={`/${locale}`} className={cn('flex items-center gap-3', className)}>
      <div className="relative w-11 h-11 flex-shrink-0 bg-white rounded-lg p-1 overflow-hidden shadow-sm border border-border/40">
        <Image
          src="/images/logo/logo.jpg"
          alt="بلال الجنيد للاستيراد"
          fill
          className="object-contain"
          priority
          sizes="44px"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-base font-bold text-text">
          بلال الجنيد
        </span>
        <span className="text-[10px] text-text-secondary -mt-0.5">
          للاستيراد
        </span>
      </div>
    </Link>
  );
}

export default Logo;
