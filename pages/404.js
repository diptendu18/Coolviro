import Link from 'next/link';
import SEO from '@/components/seo/SEO';
import { BookButton } from '@/components/ui/CTAButtons';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for could not be found." path="/404" noindex />
      <section className="section not-found">
        <div className="container not-found-inner">
          <span className="not-found-code">404</span>
          <h1>Page Not Found</h1>
          <p>
            Sorry, we couldn&apos;t find the page you were looking for. It may
            have been moved or no longer exists.
          </p>
          <div className="not-found-buttons">
            <Link href="/" className="btn btn-primary">
              Go Home
            </Link>
            <Link href="/services" className="btn btn-secondary">
              View Services
            </Link>
            <BookButton variant="whatsapp" href="/#booking" />
          </div>
        </div>
      </section>
      <style jsx>{`
        .not-found {
          min-height: 60vh;
          display: flex;
          align-items: center;
        }
        .not-found-inner {
          text-align: center;
          max-width: 480px;
        }
        .not-found-code {
          display: block;
          font-size: 5rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .not-found-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          justify-content: center;
          margin-top: var(--space-5);
        }
        @media (max-width: 480px) {
          .not-found-buttons {
            flex-direction: column;
          }
          .not-found-buttons :global(.btn) {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
