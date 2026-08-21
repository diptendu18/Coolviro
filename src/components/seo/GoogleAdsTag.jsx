import Script from 'next/script';

// Google Ads conversion tag (gtag.js) + phone conversion tracking
// (dynamic number insertion config), installed exactly as provided by
// Google Ads. Loaded globally (via _app.js) so it's present on every page.
// Do not modify the tag ID, conversion label, phone number, script URL,
// or function names below — Google Ads validates this snippet verbatim.
//
// The phone conversion gtag('config', ...) call is intentionally appended
// to this SAME inline script, reusing the one dataLayer/gtag() defined
// above it, rather than added as a second script block — this is the base
// tag and the phone conversion config for that one tag, not two separate
// tags. It runs once per page load (same as the base config call), so it
// never fires more than once per page view.
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

          gtag('config', 'AW-18398224929/B7HBCIXsmeUcEKHE', {
            'phone_conversion_number': '7980349872'
          });
        `}
      </Script>
    </>
  );
}
