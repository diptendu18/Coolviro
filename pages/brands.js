import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/seo/SEO';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';
import { services } from '@/data/services';
import { brandPages } from '@/data/brandPages';

export default function BrandsPage() {
  return (
    <>
      <SEO
        title="Appliance Brands We Service"
        description="Coolviro Services repairs all major home appliance brands in Kolkata — AC, refrigerator, geyser, microwave oven and washing machine brands including LG, Samsung, Whirlpool, Godrej, Panasonic, Voltas and more."
        path="/brands"
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Brands', href: '/brands' }]} />
      </div>

      <section className="section--tight">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Supported Brands</span>
            <h1>Appliance Brands We Service</h1>
            <p>
              Coolviro Services provides doorstep repair and service for all
              major home appliance brands across Kolkata. Select your
              appliance brand below to see service details and book online.
            </p>
          </div>

          {services.map((service) => {
            const entries = brandPages.filter((entry) => entry.service.slug === service.slug);
            return (
              <div className="brand-category" key={service.slug}>
                <h2>{service.name}</h2>
                <div className="grid grid-5 brand-grid">
                  {entries.map((entry) => (
                    <Link
                      href={`/services/${service.urlSegment}/${entry.brandSlug}`}
                      className="brand-card card"
                      key={entry.brandSlug}
                    >
                      {entry.image ? (
                        <span className="brand-card-logo">
                          <Image
                            src={entry.image}
                            alt={`${entry.brand} ${service.shortName} repair`}
                            width={120}
                            height={80}
                            sizes="120px"
                          />
                        </span>
                      ) : null}
                      <span className="brand-card-name">{entry.brand}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <h2>Don&apos;t See Your Brand?</h2>
          <p>We service most major home appliance brands — call or WhatsApp us to check.</p>
          <div className="final-cta-buttons">
            <BookButton size="lg" />
            <CallButton size="lg" />
            <WhatsappButton size="lg" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .brand-category {
          margin-bottom: var(--space-8);
        }
        .brand-category:last-child {
          margin-bottom: 0;
        }
        .brand-category h2 {
          font-size: 1.3rem;
          margin-bottom: var(--space-5);
        }
        .brand-grid {
          gap: var(--space-4);
        }
        .brand-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: var(--space-2);
          padding: var(--space-4);
          color: var(--color-text);
        }
        .brand-card:hover {
          border-color: var(--color-primary);
        }
        .brand-card-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 60px;
        }
        .brand-card-logo :global(img) {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .brand-card-name {
          font-weight: 700;
          font-size: 0.9rem;
        }
        @media (max-width: 900px) {
          .brand-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 560px) {
          .brand-grid {
            grid-template-columns: repeat(2, 1fr);
          }
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
