import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Critical layout CSS, inlined directly into the HTML document rather than
 * the external stylesheet Next.js generates. This is deliberately
 * redundant with src/styles/globals.css.
 *
 * Why: the production stylesheet is a separate, content-hashed file
 * (/_next/static/css/*.css) fetched over the network. If that request is
 * ever slow, blocked, or — critically — stale-cached HTML from a previous
 * deploy references a chunk hash that no longer exists after a new
 * deploy, the browser renders raw unstyled HTML: the header nav and the
 * off-canvas mobile menu (both hidden purely via CSS) become visible in
 * their natural document position, producing exactly a "content confined
 * to part of the screen with nav text floating in blank space" failure.
 * Inlining the handful of rules that prevent that failure mode means the
 * page can never render in that broken state, regardless of whether the
 * external stylesheet loads at all.
 */
const CRITICAL_CSS = `
  html,body{margin:0;padding:0;max-width:100%;overflow-x:hidden}
  *,*::before,*::after{box-sizing:border-box}
  .mobile-menu{position:fixed;inset:0;visibility:hidden;pointer-events:none;overflow:hidden}
  .mobile-menu.is-open{visibility:visible;pointer-events:auto}
  @media (max-width:960px){
    .site-header-nav,.site-header-ctas{display:none}
  }
`;

export default function Document() {
  return (
    <Html lang="en-IN">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0066FF" />
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
