import { Metadata } from 'next';

export const siteMetadata = {
  title: 'بلال الجنيد للتجارة والاستيراد | حلول الديزل المتكاملة',
  titleEn: 'Bilal Al-Junaid Trading & Import | Diesel Solutions',
  description: 'شركة رائدة في توفير قطع غيار الديزل، الزيوت، الفلاتر، وفواصل الهواء في اليمن',
  descriptionEn: 'A leading company in diesel spare parts, oils, filters, and air separators in Yemen',
  keywords: 'قطع غيار ديزل، زيوت محركات، فلاتر، فواصل هواء، بلال الجنيد',
  keywordsEn: 'diesel spare parts, motor oils, filters, air compressors, Bilal Al-Junaid',
  author: 'بلال الجنيد للتجارة والاستيراد',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://bilalaljunaid.com',
};

export function generateMetadata(locale: string): Metadata {
  const isArabic = locale === 'ar';
  return {
    title: isArabic ? siteMetadata.title : siteMetadata.titleEn,
    description: isArabic ? siteMetadata.description : siteMetadata.descriptionEn,
    keywords: isArabic ? siteMetadata.keywords : siteMetadata.keywordsEn,
    authors: [{ name: siteMetadata.author }],
    metadataBase: new URL(siteMetadata.siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'ar': '/ar',
        'en': '/en',
      },
    },
    openGraph: {
      title: isArabic ? siteMetadata.title : siteMetadata.titleEn,
      description: isArabic ? siteMetadata.description : siteMetadata.descriptionEn,
      url: siteMetadata.siteUrl,
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
