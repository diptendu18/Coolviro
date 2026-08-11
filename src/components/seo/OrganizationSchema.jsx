import Head from 'next/head';
import { site, serviceAreas } from '@/data/site';

/**
 * Site-wide LocalBusiness JSON-LD. Only verified facts are included —
 * no address, no aggregate rating, no fabricated review data. Rendered
 * once in the root layout so it appears on every page.
 */
export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.siteUrl}/#business`,
    name: site.siteName,
    alternateName: site.businessName,
    url: site.siteUrl,
    telephone: site.phoneHref.replace('tel:', ''),
    image: `${site.siteUrl}/images/og-default.jpg`,
    description:
      'Coolviro Services provides professional home appliance repair and service at your doorstep in Kolkata, covering AC, refrigerator, geyser, microwave oven and washing machine repair.',
    areaServed: [
      { '@type': 'City', name: site.city },
      ...serviceAreas.map((area) => ({ '@type': 'Place', name: area })),
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '20:00',
      },
    ],
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
