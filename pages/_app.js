import Head from 'next/head';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import Analytics from '@/components/seo/Analytics';
import GoogleAdsTag from '@/components/seo/GoogleAdsTag';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Analytics />
        <GoogleAdsTag />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
