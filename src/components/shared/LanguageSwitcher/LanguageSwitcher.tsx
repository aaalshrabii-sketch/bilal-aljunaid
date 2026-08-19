'use client';

import { useLocale } from 'next-intl';

interface LanguageSwitcherProps {
  isTransparent?: boolean;
}

export function LanguageSwitcher({ isTransparent = false }: LanguageSwitcherProps) {
  const currentLocale = useLocale();

  const switchLanguage = (locale: string) => {
    // حفظ اللغة في الـ Cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
    // إعادة تحميل الصفحة لتطبيق اللغة الجديدة
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLanguage('ar')}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          currentLocale === 'ar'
            ? 'text-accent font-bold'
            : isTransparent
            ? 'text-white/60 hover:text-white'
            : 'text-text-muted hover:text-text'
        }`}
      >
        ع
      </button>
      <span className={isTransparent ? 'text-white/40' : 'text-text-muted'}>|</span>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          currentLocale === 'en'
            ? 'text-accent font-bold'
            : isTransparent
            ? 'text-white/60 hover:text-white'
            : 'text-text-muted hover:text-text'
        }`}
      >
        E
      </button>
    </div>
  );
}

export default LanguageSwitcher;
