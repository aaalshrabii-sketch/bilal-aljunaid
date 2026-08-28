import { Metadata } from 'next';

export const siteMetadata = {
  title: 'بلال الجنيد للتجارة والاستيراد | حلول الديزل المتكاملة',
  titleEn: 'Bilal Al-Junaid Trading & Import | Integrated Diesel Solutions',
  description: 'شركة بلال الجنيد للتجارة والاستيراد - حلول متكاملة لقطع غيار الديزل، الزيوت، الفلاتر، وكمبريشنات الهواء في اليمن.',
  descriptionEn: 'Bilal Al-Junaid Trading & Import - Integrated solutions for diesel spare parts, engine oils, filters, and air compressors in Yemen.',
  keywords: 'قطع غيار ديزل، زيوت محركات، فلاتر، كمبريشنات هواء، بلال الجنيد، صنعاء',
  keywordsEn: 'diesel spare parts, engine oils, filters, air compressors, Bilal Al-Junaid, Sanaa',
  author: 'بلال الجنيد للتجارة والاستيراد',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aljunaidtrade.com',
};

export function generateMetadata(locale: string): Metadata {
  const isArabic = locale === 'ar';
  const baseUrl = siteMetadata.siteUrl;
  return {
    title: isArabic ? siteMetadata.title : siteMetadata.titleEn,
    description: isArabic ? siteMetadata.description : siteMetadata.descriptionEn,
    keywords: isArabic ? siteMetadata.keywords : siteMetadata.keywordsEn,
    authors: [{ name: siteMetadata.author }],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
      languages: {
        'ar': `${baseUrl}`,
        'en': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: isArabic ? siteMetadata.title : siteMetadata.titleEn,
      description: isArabic ? siteMetadata.description : siteMetadata.descriptionEn,
      url: baseUrl,
      siteName: 'بلال الجنيد للتجارة والاستيراد',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic ? siteMetadata.title : siteMetadata.titleEn,
      description: isArabic ? siteMetadata.description : siteMetadata.descriptionEn,
    },
  };
}

