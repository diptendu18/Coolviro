import SEO from '@/components/seo/SEO';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { MapPinIcon } from '@/components/ui/Icons';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';
import { serviceAreas, site } from '@/data/site';
import { services } from '@/data/services';
import Link from 'next/link';

export default function AreasPage() {
  return (
    <>
      <SEO
        title="Service Areas in Kolkata"
        description="Coolviro Services offers doorstep home appliance repair across Salt Lake, New Town, Kasba, Park Street, Belgharia, Ballygunge, Jadavpur, Dum Dum, Barasat and Barrackpore, Kolkata."
        path="/areas"
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Areas', href: '/areas' }]} />
      </div>

      <section className="section--tight">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Where We Serve</span>
            <h1>Our Service Areas</h1>
            <p>
              Coolviro Services provides professional home appliance repair
              and service at your doorstep across {site.city}, including the
              following areas.
            </p>
          </div>

          <div className="grid grid-3">
            {serviceAreas.map((area) => (
              <div className="area-card card" key={area}>
                <span className="area-icon">
                  <MapPinIcon />
                </span>
                <h2>{area}</h2>
                <p>
                  Doorstep AC, refrigerator, geyser, microwave oven and
                  washing machine repair in {area}, {site.city}.
                </p>
                <Link href="/booking" className="area-link">
                  Book a service in {area} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Explore</span>
            <h2>Popular Services in Your Area</h2>
          </div>
          <ul className="area-services-list">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <h2>Book a Service in Your Area Today</h2>
          <p>Fast, reliable doorstep appliance service across {site.city}.</p>
          <div className="final-cta-buttons">
            <BookButton size="lg" />
            <CallButton size="lg" />
            <WhatsappButton size="lg" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .area-card {
          padding: var(--space-6);
        }
        .area-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--color-bg-section);
          color: var(--color-primary);
          margin-bottom: var(--space-3);
        }
        .area-card h2 {
          font-size: 1.2rem;
          margin-bottom: var(--space-2);
        }
        .area-card p {
          font-size: 0.92rem;
        }
        .area-link {
          font-weight: 700;
          color: var(--color-primary);
        }
        .area-link:hover {
          text-decoration: underline;
        }
        .area-services-list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-3);
        }
        .area-services-list a {
          display: inline-block;
          background: #fff;
          border: 1px solid var(--color-border);
          padding: var(--space-3) var(--space-5);
          border-radius: var(--radius-full);
          font-weight: 600;
        }
        .area-services-list a:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
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
