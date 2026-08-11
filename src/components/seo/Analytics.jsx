import Script from 'next/script';
import { site } from '@/data/site';

/**
 * Loads GA4 only when a real Measurement ID is configured via
 * NEXT_PUBLIC_GA4_MEASUREMENT_ID. No analytics script is ever loaded
 * otherwise, per the project's performance/privacy requirements.
 */
export default function Analytics() {
  const id = site.ga4MeasurementId;
  if (!id || id.includes('NEEDS USER INPUT')) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
