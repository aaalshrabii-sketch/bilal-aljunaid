import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bilalaljunaid.com';
  const locales = ['ar', 'en'];
  const pages = [
    { path: '', priority: 1.0 },
    { path: 'about', priority: 0.8 },
    { path: 'services', priority: 0.8 },
    { path: 'products', priority: 0.8 },
    { path: 'brands', priority: 0.7 },
    { path: 'contact', priority: 0.9 },
  ];
  
  const sitemap: MetadataRoute.Sitemap = [];
  
  for (const locale of locales) {
    for (const page of pages) {
      sitemap.push({
        url: `${baseUrl}/${locale}${page.path ? '/' + page.path : ''}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page.priority,
      });
    }
  }
  
  return sitemap;
}
