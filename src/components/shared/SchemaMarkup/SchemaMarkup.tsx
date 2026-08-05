import companyData from '@/data/company.json';

export function SchemaMarkup() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyData.name.ar,
    alternateName: companyData.name.en,
    description: companyData.description.ar,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bilalaljunaid.com',
    logo: 'https://bilalaljunaid.com/images/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'صنعاء',
      addressCountry: 'YE',
      streetAddress: companyData.contact.address.ar,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyData.contact.phone,
      contactType: 'sales',
      availableLanguage: ['Arabic', 'English'],
    },
    sameAs: [
      `https://wa.me/${companyData.contact.whatsapp}`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

export default SchemaMarkup;
