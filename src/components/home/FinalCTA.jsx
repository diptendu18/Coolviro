import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <h2>Need Your Appliance Fixed Today?</h2>
        <p>Book a service online, or reach out directly — we&apos;re ready to help.</p>
        <div className="final-cta-buttons">
          <BookButton size="lg" />
          <CallButton size="lg" />
          <WhatsappButton size="lg" />
        </div>
      </div>
      <style jsx>{`
        .final-cta {
          background: var(--gradient-primary);
          padding: var(--space-8) 0;
          color: #fff;
        }
        .final-cta-inner {
          text-align: center;
          max-width: 640px;
        }
        .final-cta h2 {
          color: #fff;
        }
        .final-cta p {
          color: #e0f2ff;
          margin-bottom: var(--space-6);
        }
        .final-cta-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        .final-cta-buttons :global(.btn-secondary) {
          background: #fff;
        }
        .final-cta-buttons :global(.btn-primary) {
          background: #fff;
          color: var(--color-primary);
          box-shadow: none;
        }
        @media (max-width: 640px) {
          .final-cta-buttons {
            flex-direction: column;
          }
          .final-cta-buttons :global(.btn) {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
