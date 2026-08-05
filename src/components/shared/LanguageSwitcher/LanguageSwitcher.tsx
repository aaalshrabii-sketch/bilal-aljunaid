'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    // Replace the current locale in the pathname
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    // If the path doesn't start with locale (e.g. root '/'), prepend it
    const finalPath = newPath.startsWith(`/${nextLocale}`) ? newPath : `/${nextLocale}${pathname}`;
    
    // Changing direction is handled by the RootLayout server side,
    // but we can also set the cookie if needed. next-intl handles this.
    router.push(finalPath);
    router.refresh();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="font-medium min-w-[80px]"
      onClick={toggleLocale}
    >
      {locale === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
}
