import Head from 'next/head';
import { site, serviceAreas } from '@/data/site';

/** Service JSON-LD for individual service pages. */
export default function ServiceSchema({ service }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@type': 'LocalBusiness',
      name: site.siteName,
      telephone: site.phoneHref.replace('tel:', ''),
      url: site.siteUrl,
    },
    areaServed: [
      { '@type': 'City', name: site.city },
      ...serviceAreas.map((area) => ({ '@type': 'Place', name: area })),
    ],
    description: service.overview,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: service.startingPrice,
      description: `${service.name} starting at ₹${service.startingPrice}`,
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}
