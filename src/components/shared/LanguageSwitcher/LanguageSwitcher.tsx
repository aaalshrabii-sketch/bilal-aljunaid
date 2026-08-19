'use client';

import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';

interface LanguageSwitcherProps {
  isTransparent?: boolean;
}

export function LanguageSwitcher({ isTransparent = false }: LanguageSwitcherProps) {
  const currentLocale = useLocale();

  const toggleLanguage = () => {
    const nextLocale = currentLocale === 'ar' ? 'en' : 'ar';
    // حفظ اللغة في الـ Cookie
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    // إعادة تحميل الصفحة لتطبيق اللغة الجديدة
    window.location.reload();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={`font-medium min-w-[80px] rounded-full transition-all ${
        isTransparent
          ? 'border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white'
          : 'border-border text-text hover:border-accent hover:text-accent hover:bg-transparent'
      }`}
      onClick={toggleLanguage}
    >
      {currentLocale === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
}

export default LanguageSwitcher;
