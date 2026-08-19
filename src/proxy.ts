import createMiddleware from 'next-intl/middleware';

export const proxy = createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'never',
  localeDetection: false,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

