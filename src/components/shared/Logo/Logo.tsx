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
      <Image
        src="/images/logo/logo.jpg"
        alt="بلال الجنيد للاستيراد"
        width={45}
        height={45}
        className="w-11 h-11 object-contain rounded-lg"
        priority
      />
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold text-text">
          بلال الجنيد
        </span>
        <span className="text-xs text-text-muted">
          للاستيراد
        </span>
      </div>
    </Link>
  );
}

export default Logo;
