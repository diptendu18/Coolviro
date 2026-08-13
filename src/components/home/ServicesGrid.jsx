import { services } from '@/data/services';
import ServiceCard from '@/components/ui/ServiceCard';

export default function ServicesGrid() {
  return (
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
  );
}
