import Link from 'next/link';

// Small, reusable "don't see what you need?" nudge for service-related
// pages that already have their own booking-focused CTA banner further
// down. Deliberately lightweight (plain text + link, not another button
// banner) so it doesn't compete with — or repeat — the full contact
// banner on the homepage.
export default function HelpContactNote() {
  return (
    <p className="help-contact-note">
      Looking for help with another appliance problem?{' '}
      <Link href="/contact">Contact us</Link>.
      <style jsx>{`
        .help-contact-note {
          text-align: center;
          font-size: 0.92rem;
          color: var(--color-text-muted);
          margin: var(--space-5) 0 0;
        }
        .help-contact-note :global(a) {
          color: var(--color-primary);
          font-weight: 700;
        }
        .help-contact-note :global(a:hover) {
          text-decoration: underline;
        }
      `}</style>
    </p>
  );
}
