import { type OutputFormat } from '@/lib/format-utils';

interface StructuredDataProps {
  type?: 'WebApplication' | 'Organization' | 'WebSite';
  format?: OutputFormat;
}

export function StructuredData({ type = 'WebApplication', format }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const getWebApplicationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Upixora',
    description: 'Free online image converter tool. Convert images between JPG, PNG, WEBP, AVIF and TIFF formats.',
    url: baseUrl,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Convert JPG to PNG',
      'Convert PNG to JPG',
      'Convert WEBP to JPG',
      'Convert PNG to WEBP',
      'Convert to AVIF',
      'Batch image conversion',
      'Adjustable quality settings',
      'Resize images',
    ],
  });

  const getOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Upixora',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [],
  });

  const getWebSiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Upixora',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  });

  let schema;
  switch (type) {
    case 'Organization':
      schema = getOrganizationSchema();
      break;
    case 'WebSite':
      schema = getWebSiteSchema();
      break;
    default:
      schema = getWebApplicationSchema();
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
