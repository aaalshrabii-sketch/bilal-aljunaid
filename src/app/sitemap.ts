import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aljunaidtrade.com';
  const locales = ['ar', 'en'];
  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: 'about', priority: 0.8, changeFrequency: 'monthly' },
    { path: 'services', priority: 0.8, changeFrequency: 'monthly' },
    { path: 'products', priority: 0.8, changeFrequency: 'weekly' },
    { path: 'brands', priority: 0.7, changeFrequency: 'monthly' },
    { path: 'contact', priority: 0.9, changeFrequency: 'monthly' },
  ];
  
  const sitemap: MetadataRoute.Sitemap = [];
  
  for (const locale of locales) {
    for (const page of pages) {
      const localeSegment = locale === 'ar' ? '' : '/en';
      const pageSegment = page.path ? `/${page.path}` : '';
      const fullUrl = `${baseUrl}${localeSegment}${pageSegment}` || baseUrl;

      sitemap.push({
        url: fullUrl,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency as 'weekly' | 'monthly',
        priority: page.priority,
      });
    }
  }
  
  return sitemap;
}

