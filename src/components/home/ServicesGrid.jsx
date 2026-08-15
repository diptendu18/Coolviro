import { services } from '@/data/services';
import ServiceCard from '@/components/ui/ServiceCard';
import Button from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/Icons';

export default function ServicesGrid() {
  return (
    <>
      <section className="section" id="services">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Our Services</span>
            <h2>We Repair &amp; Service All Major Home Appliances</h2>
            <p>
              Doorstep repair and service for the appliances Kolkata households
              rely on every day — backed by a 1 Year Service Warranty.
            </p>
          </div>
          <div className="grid grid-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-help-banner">
        <div className="container services-help-banner-inner">
          <h2>Need Help With a Different Appliance Problem?</h2>
          <p>
            Don&apos;t see the service you need? Contact Coolviro Services and
            our team will be happy to assist you with other home appliance
            repair and service requirements.
          </p>
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            icon={<ArrowRightIcon />}
            ariaLabel="Contact Coolviro Services"
          >
            Contact Us
          </Button>
        </div>
        <style jsx>{`
          .services-help-banner {
            background: var(--gradient-primary);
            padding: var(--space-8) 0;
          }
          .services-help-banner-inner {
            max-width: 640px;
            margin: 0 auto;
            text-align: center;
          }
          .services-help-banner h2 {
            color: #fff;
            margin-bottom: var(--space-2);
          }
          .services-help-banner p {
            color: #e0f2ff;
            margin-bottom: var(--space-6);
          }
          @media (max-width: 640px) {
            .services-help-banner {
              padding: var(--space-6) 0;
            }
            .services-help-banner-inner :global(.btn) {
              width: 100%;
            }
          }
        `}</style>
      </section>
    </>
  );
}
