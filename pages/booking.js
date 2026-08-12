import SEO from '@/components/seo/SEO';
import Breadcrumb from '@/components/ui/Breadcrumb';
import BookingForm from '@/components/booking/BookingForm';
import { CallButton, WhatsappButton } from '@/components/ui/CTAButtons';

export default function BookingPage() {
  return (
    <>
      <SEO
        title="Book a Service"
        description="Book AC, refrigerator, geyser, microwave oven or washing machine repair with Coolviro Services in Kolkata. Fill in your details and we'll contact you shortly to confirm your service."
        path="/booking"
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Book a Service', href: '/booking' }]} />
      </div>

      <section className="booking-page-section">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Coolviro Services</span>
            <h1>Book a Service</h1>
            <p>Fill in your details and we&apos;ll contact you shortly to confirm your service.</p>
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
      </section>

      <style jsx>{`
        .booking-page-section {
          padding: var(--space-7) 0 var(--space-9);
        }
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
          .booking-page-section {
            padding: var(--space-6) 0 var(--space-8);
          }
          .booking-card {
            padding: var(--space-5) var(--space-4);
          }
        }
      `}</style>
    </>
  );
}
