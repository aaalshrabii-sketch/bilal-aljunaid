'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className, variant }: LogoProps) {
  const locale = useLocale();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // تحديد الخلفية حسب الوضع
  const getBgColor = () => {
    if (!mounted) return 'bg-white';
    const currentTheme = variant || resolvedTheme || theme || 'light';
    return currentTheme === 'dark' ? 'bg-[#0B1120]' : 'bg-white';
  };

  // تحديد لون الإطار حسب الوضع
  const getBorderColor = () => {
    if (!mounted) return 'border-gray-200';
    const currentTheme = variant || resolvedTheme || theme || 'light';
    return currentTheme === 'dark' ? 'border-[#1E293B]' : 'border-gray-200';
  };

  return (
    <Link href={`/${locale}`} className={cn('flex items-center gap-3', className)}>
      <div className={cn(
        'relative w-12 h-12 flex-shrink-0 rounded-xl p-1.5 border transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden',
        getBgColor(),
        getBorderColor()
      )}>
        <Image
          src="/images/logo/logo.jpg"
          alt="بلال الجنيد للاستيراد"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold text-text">
          بلال الجنيد
        </span>
        <span className="text-xs text-text-muted -mt-0.5">
          للاستيراد
        </span>
      </div>
    </Link>
  );
}

export default Logo;
