import companyData from '@/data/company.json';

export function SchemaMarkup() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aljunaidtrade.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyData.name.ar,
    alternateName: companyData.name.en,
    description: companyData.description.ar,
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: companyData.name.ar,
    url: baseUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export default SchemaMarkup;

