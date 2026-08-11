import Head from 'next/head';
import { site } from '@/data/site';

/**
 * Per-page SEO metadata: title, description, canonical, Open Graph and
 * Twitter card tags. Every page that renders this must pass a unique
 * title + description.
 */
export default function SEO({
  title,
  description,
  path = '',
  image = '/images/og-default.jpg',
  noindex = false,
}) {
  const url = `${site.siteUrl}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${site.siteUrl}${image}`;
  const fullTitle = title.includes(site.siteName) ? title : `${title} | ${site.siteName}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {site.gscVerification ? (
        <meta name="google-site-verification" content={site.gscVerification} />
      ) : null}
    </Head>
  );
}
