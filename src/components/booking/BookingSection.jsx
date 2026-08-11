import BookingForm from './BookingForm';
import { CallButton, WhatsappButton } from '@/components/ui/CTAButtons';

export default function BookingSection() {
  return (
    <section id="booking" className="section section--alt booking-section">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Book a Service</span>
          <h2>Schedule Your Appliance Service</h2>
          <p>
            Fill in your details below and we&apos;ll get in touch to confirm
            your booking. Prefer to talk? Call or WhatsApp us directly.
          </p>
        </div>
        <div className="booking-card card">
          <BookingForm />
        </div>
        <div className="booking-alt-ctas">
          <span>Or reach us directly:</span>
          <div className="booking-alt-ctas-buttons">
            <CallButton variant="secondary" />
            <WhatsappButton />
          </div>
        </div>
      </div>
      <style jsx>{`
        .booking-card {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--space-6);
        }
        .booking-alt-ctas {
          max-width: 800px;
          margin: var(--space-6) auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        .booking-alt-ctas span {
          font-weight: 600;
          color: var(--color-text-muted);
        }
        .booking-alt-ctas-buttons {
          display: flex;
          gap: var(--space-3);
        }
        @media (max-width: 640px) {
          .booking-card {
            padding: var(--space-5) var(--space-4);
          }
        }
      `}</style>
    </section>
  );
}
