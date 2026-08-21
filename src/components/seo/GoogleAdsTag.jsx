import Script from 'next/script';

// Google Ads conversion tag (gtag.js), installed exactly as provided by
// Google Ads. Loaded globally (via _app.js) so it's present on every page.
// Do not modify the tag ID, script URL, or function names below — Google
// Ads validates this snippet verbatim.
export default function GoogleAdsTag() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-18398224929"
        strategy="afterInteractive"
      />
      <Script id="google-ads-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-18398224929');
        `}
      </Script>
    </>
  );
}
