import SEO from '@/components/seo/SEO';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ServiceCard from '@/components/ui/ServiceCard';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';
import { services } from '@/data/services';
import { site } from '@/data/site';

export default function ServicesIndexPage() {
  return (
    <>
      <SEO
        title="Our Services"
        description="Explore Coolviro Services' home appliance repair offerings in Kolkata — AC, refrigerator, geyser, microwave oven and washing machine service, with a 1 Year Service Warranty."
        path="/services"
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }]} />
      </div>
      <section className="section--tight">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">What We Repair</span>
            <h1>Our Services</h1>
            <p>
              Professional home appliance repair and service at your doorstep
              across {site.city}, backed by a 1 Year Service Warranty.
            </p>
          </div>
          <div className="grid grid-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <h2>Ready to Book a Service?</h2>
          <p>Fast, reliable doorstep appliance service across {site.city}.</p>
          <div className="final-cta-buttons">
            <BookButton size="lg" />
            <CallButton size="lg" />
            <WhatsappButton size="lg" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .final-cta {
          background: var(--gradient-primary);
          padding: var(--space-8) 0;
          color: #fff;
        }
        .final-cta-inner {
          text-align: center;
          max-width: 640px;
          margin: 0 auto;
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
    </>
  );
}
