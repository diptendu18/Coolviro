import Image from 'next/image';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <div className="final-cta-copy">
          <h2>Need Your Appliance Fixed Today?</h2>
          <p>Book a service online, or reach out directly — we&apos;re ready to help.</p>
          <div className="final-cta-buttons">
            <BookButton size="lg" />
            <CallButton size="lg" />
            <WhatsappButton size="lg" />
          </div>
        </div>
        <div className="final-cta-media">
          <Image
            src="/images/cta/cta-technician.webp"
            alt="Coolviro Services technician ready to help with appliance repair"
            width={756}
            height={420}
            sizes="(max-width: 900px) 90vw, 420px"
          />
        </div>
      </div>
      <style jsx>{`
        .final-cta {
          background: var(--gradient-primary);
          padding: var(--space-8) 0;
          color: #fff;
        }
        .final-cta-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-8);
        }
        .final-cta-copy {
          text-align: center;
          max-width: 560px;
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
        .final-cta-media {
          flex-shrink: 0;
          width: 380px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        }
        .final-cta-media :global(img) {
          display: block;
          width: 100%;
          height: auto;
        }
        .final-cta-buttons :global(.btn-secondary) {
          background: #fff;
        }
        .final-cta-buttons :global(.btn-primary) {
          background: #fff;
          color: var(--color-primary);
          box-shadow: none;
        }
        @media (max-width: 900px) {
          .final-cta-inner {
            flex-direction: column;
          }
          .final-cta-media {
            width: 100%;
            max-width: 420px;
          }
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
