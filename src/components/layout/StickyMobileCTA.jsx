import { site } from '@/data/site';
import { PhoneIcon, WhatsappIcon, CalendarCheckIcon } from '@/components/ui/Icons';
import Link from 'next/link';

export default function StickyMobileCTA() {
  return (
    <div className="sticky-cta" role="navigation" aria-label="Quick contact">
      <a href={site.phoneHref} className="sticky-cta-item">
        <PhoneIcon />
        <span>Call</span>
      </a>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-cta-item"
      >
        <WhatsappIcon />
        <span>WhatsApp</span>
      </a>
      <Link href="/#booking" className="sticky-cta-item sticky-cta-primary">
        <CalendarCheckIcon width="20" height="20" />
        <span>Book</span>
      </Link>
      <style jsx>{`
        .sticky-cta {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 90;
          background: #fff;
          border-top: 1px solid var(--color-border);
          box-shadow: 0 -4px 16px rgba(15, 23, 42, 0.08);
          padding: var(--space-2) var(--space-3);
          padding-bottom: max(var(--space-2), env(safe-area-inset-bottom));
          gap: var(--space-2);
        }
        .sticky-cta-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: var(--space-2);
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-text);
        }
        .sticky-cta-item:hover {
          background: var(--color-bg-section);
        }
        .sticky-cta-primary {
          background: var(--gradient-primary);
          color: #fff;
        }
        .sticky-cta-primary:hover {
          background: var(--gradient-primary);
          opacity: 0.92;
        }
        @media (max-width: 720px) {
          .sticky-cta {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
