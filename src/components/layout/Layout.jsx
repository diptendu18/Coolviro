import Header from './Header';
import Footer from './Footer';
import StickyMobileCTA from './StickyMobileCTA';
import OrganizationSchema from '@/components/seo/OrganizationSchema';

export default function Layout({ children }) {
  return (
    <>
      <OrganizationSchema />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <StickyMobileCTA />
      <style jsx>{`
        main {
          padding-bottom: 0;
        }
        @media (max-width: 720px) {
          main {
            padding-bottom: 72px;
          }
        }
      `}</style>
    </>
  );
}
