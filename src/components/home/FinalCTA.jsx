import Image from 'next/image';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <div className="final-cta-media">
          <Image
            src="/images/cta/cta-technician.webp"
            alt="Coolviro Services technician ready to help with appliance repair"
            width={756}
            height={420}
            loading="lazy"
            sizes="(max-width: 900px) 60vw, 220px"
          />
        </div>
        <div className="final-cta-copy">
          <h2>Need Appliance Repair? We&apos;re Ready to Help.</h2>
          <p>Fast service, expert technicians, doorstep convenience across Kolkata.</p>
        </div>
        <div className="final-cta-buttons">
          <CallButton />
          <WhatsappButton />
          <BookButton label="Book Service" />
        </div>
      </div>
      <style jsx>{`
        .final-cta {
          background: var(--gradient-primary);
          padding: var(--space-6) 0;
          color: #fff;
        }
        .final-cta-inner {
          display: flex;
          align-items: center;
          gap: var(--space-6);
        }
        .final-cta-media {
          flex-shrink: 0;
          width: 200px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        }
        .final-cta-media :global(img) {
          display: block;
          width: 100%;
          height: auto;
        }
        .final-cta-copy {
          flex: 1;
          min-width: 0;
        }
        .final-cta h2 {
          color: #fff;
          font-size: 1.5rem;
          margin-bottom: var(--space-1);
        }
        .final-cta p {
          color: #e0f2ff;
          margin: 0;
        }
        .final-cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          flex-shrink: 0;
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
            text-align: center;
          }
          .final-cta-media {
            width: 100%;
            max-width: 320px;
          }
          .final-cta-buttons {
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .final-cta-buttons {
            flex-direction: column;
            width: 100%;
          }
          .final-cta-buttons :global(.btn) {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
