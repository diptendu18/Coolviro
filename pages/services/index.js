import SEO from '@/components/seo/SEO';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ServiceCard from '@/components/ui/ServiceCard';
import BookingSection from '@/components/booking/BookingSection';
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
      <BookingSection />
    </>
  );
}
