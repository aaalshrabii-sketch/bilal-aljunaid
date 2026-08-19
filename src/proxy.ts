import createMiddleware from 'next-intl/middleware';

export const proxy = createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'never', // يخفي جميع اللغات من الرابط
  localeDetection: true, // يتعرف على لغة المتصفح تلقائياً
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

