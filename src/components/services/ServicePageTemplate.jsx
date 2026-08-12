import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/seo/SEO';
import ServiceSchema from '@/components/seo/ServiceSchema';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ApplianceArt from '@/components/ui/ApplianceArt';
import ServiceCard from '@/components/ui/ServiceCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';
import { CheckIcon, ShieldCheckIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { services, brandDisclaimer } from '@/data/services';
import { slugifyBrand } from '@/data/brandPages';
import { serviceAreas } from '@/data/site';

export default function ServicePageTemplate({ service }) {
  const related = services.filter((s) => s.slug !== service.slug);
  const bookHref = `/?service=${encodeURIComponent(service.name)}#booking`;

  return (
    <>
      <SEO title={service.metaTitle} description={service.metaDescription} path={`/services/${service.slug}`} />
      <ServiceSchema service={service} />

      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.name, href: `/services/${service.slug}` },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="service-hero">
        <div className="container service-hero-inner">
          <div className="service-hero-copy">
            <span className="eyebrow">Kolkata</span>
            <h1>{service.name}</h1>
            <p>{service.heroSubtitle}</p>
            <div className="service-hero-meta">
              <span className="service-price-badge">{service.priceDisplay}</span>
              <span className="service-warranty-badge">
                <ShieldCheckIcon width="18" height="18" /> 1 Year Service Warranty
              </span>
            </div>
            <div className="service-hero-ctas">
              <BookButton size="lg" href={bookHref} label="Book This Service" />
              <CallButton variant="secondary" size="lg" />
              <WhatsappButton size="lg" />
            </div>
          </div>
          <div className="service-hero-art">
            <ApplianceArt type={service.icon} />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section">
        <div className="container service-overview">
          <div className="section-heading">
            <span className="eyebrow">Overview</span>
            <h2>{service.name} in Kolkata</h2>
          </div>
          <p className="service-overview-text">{service.overview}</p>

          {service.brandLogos ? (
            <div className="card service-info-card service-info-grid">
              <h3>Appliance Types We Service</h3>
              <ul className="chip-list">
                {service.types.map((type) => (
                  <li key={type}>
                    <CheckIcon /> {type}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="grid grid-2 service-info-grid">
              <div className="card service-info-card">
                <h3>Appliance Types We Service</h3>
                <ul className="chip-list">
                  {service.types.map((type) => (
                    <li key={type}>
                      <CheckIcon /> {type}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card service-info-card">
                <h3>Supported Brands</h3>
                <ul className="chip-list chip-list--brands">
                  {service.brands.map((brand) => (
                    <li key={brand}>
                      <Link href={`/services/${service.urlSegment}/${slugifyBrand(brand)}`}>
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="brand-disclaimer">{brandDisclaimer}</p>
              </div>
            </div>
          )}

          {service.brandLogos && (
            <div className="card service-info-card brand-logo-section">
              <h3>Supported Brands</h3>
              <div className="brand-logo-grid">
                {service.brandLogos.map((brand) => (
                  <Link
                    href={`/services/${service.urlSegment}/${slugifyBrand(brand.name)}`}
                    className="brand-logo-card"
                    key={brand.name}
                  >
                    <div className="brand-logo-card-img">
                      <Image
                        src={brand.image}
                        alt={`${brand.name} ${service.shortName} — Coolviro Services repairs ${brand.name} ${service.applianceNounPlural} in Kolkata`}
                        width={700}
                        height={400}
                        loading="lazy"
                        sizes="(max-width: 640px) 45vw, (max-width: 960px) 200px, 180px"
                      />
                    </div>
                    <span className="brand-logo-card-name">{brand.name}</span>
                    <span className="brand-logo-card-cta">
                      View Services <ChevronRightIcon width="14" height="14" />
                    </span>
                  </Link>
                ))}
              </div>
              <p className="brand-disclaimer">{brandDisclaimer}</p>
            </div>
          )}

          <div className="card service-info-card service-areas-note">
            <h3>Service Area</h3>
            <p>
              We provide {service.name.toLowerCase()} across {serviceAreas.join(', ')} and
              nearby areas in Kolkata.{' '}
              <Link href="/areas">View all service areas →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="service-mid-cta">
        <div className="container service-mid-cta-inner">
          <div>
            <h2>Ready to Book Your {service.shortName} Service?</h2>
            <p>{service.priceDisplay} &middot; 1 Year Service Warranty &middot; Doorstep Service</p>
          </div>
          <BookButton size="lg" href={bookHref} label="Book This Service" />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container service-faq">
          <div className="section-heading">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <FAQAccordion items={service.faqs} idPrefix={service.slug} />
        </div>
      </section>

      {/* Related services */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Related</span>
            <h2>Other Services You May Need</h2>
          </div>
          <div className="grid grid-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container final-cta-inner">
          <h2>Book Your {service.name} Today</h2>
          <p>Fast, reliable doorstep service across Kolkata.</p>
          <div className="final-cta-buttons">
            <BookButton size="lg" href={bookHref} label="Book This Service" />
            <CallButton size="lg" />
            <WhatsappButton size="lg" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .service-hero {
          background: var(--color-bg-section);
          padding: var(--space-7) 0;
        }
        .service-hero-inner {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: var(--space-7);
          align-items: center;
        }
        .service-hero-copy p {
          font-size: 1.05rem;
          max-width: 52ch;
        }
        .service-hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-bottom: var(--space-5);
        }
        .service-price-badge {
          background: var(--gradient-primary);
          color: #fff;
          font-weight: 700;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-size: 0.92rem;
        }
        .service-warranty-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          color: var(--color-text);
          font-weight: 700;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-size: 0.92rem;
          border: 1px solid var(--color-border);
        }
        .service-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        .service-hero-art {
          max-width: 320px;
          margin: 0 auto;
        }
        .service-overview-text {
          font-size: 1.05rem;
          max-width: 72ch;
        }
        .service-info-grid {
          margin-top: var(--space-6);
        }
        .service-info-card {
          padding: var(--space-6);
        }
        .service-info-card h3 {
          margin-bottom: var(--space-4);
        }
        .chip-list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .chip-list li {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--color-bg-section);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.9rem;
        }
        .chip-list :global(svg) {
          color: var(--color-primary);
        }
        .chip-list--brands li {
          background: transparent;
          padding: 0;
        }
        .chip-list--brands li :global(a) {
          display: inline-flex;
          align-items: center;
          background: #f8fafc;
          border: 1px solid var(--color-border);
          color: var(--color-text);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.9rem;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .chip-list--brands li :global(a:hover) {
          border-color: var(--color-secondary);
          color: var(--color-primary);
        }
        .brand-disclaimer {
          margin: var(--space-4) 0 0;
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }
        .brand-logo-section {
          margin-top: var(--space-5);
        }
        .brand-logo-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--space-4);
        }
        .brand-logo-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          min-width: 0;
          padding: var(--space-4) var(--space-3);
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .brand-logo-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-secondary);
        }
        .brand-logo-card-img {
          width: 100%;
          aspect-ratio: 7 / 4;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-logo-card-img :global(img) {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .brand-logo-card-name {
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--color-text);
          text-align: center;
        }
        .brand-logo-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          font-weight: 700;
          font-size: 0.78rem;
          color: var(--color-primary);
        }
        .brand-logo-card-cta :global(svg) {
          transition: transform 0.2s ease;
        }
        .brand-logo-card:hover .brand-logo-card-cta :global(svg) {
          transform: translateX(2px);
        }
        @media (max-width: 1100px) {
          .brand-logo-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 860px) {
          .brand-logo-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .brand-logo-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-3);
          }
          .brand-logo-card {
            padding: var(--space-3) var(--space-2);
          }
        }
        .service-areas-note {
          margin-top: var(--space-5);
          padding: var(--space-6);
        }
        .service-areas-note :global(a) {
          color: var(--color-primary);
          font-weight: 700;
        }
        .service-mid-cta {
          background: #0a1637;
          color: #fff;
          padding: var(--space-6) 0;
        }
        .service-mid-cta-inner {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-5);
          align-items: center;
          justify-content: space-between;
        }
        .service-mid-cta-inner h2 {
          color: #fff;
          margin-bottom: var(--space-2);
          font-size: 1.5rem;
        }
        .service-mid-cta-inner p {
          color: #cbd5e1;
          margin: 0;
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
        @media (max-width: 860px) {
          .service-hero-inner {
            grid-template-columns: 1fr;
          }
          .service-hero-art {
            max-width: 260px;
            order: -1;
          }
        }
        @media (max-width: 640px) {
          .service-hero-ctas,
          .final-cta-buttons {
            flex-direction: column;
          }
          .service-hero-ctas :global(.btn),
          .final-cta-buttons :global(.btn) {
            width: 100%;
          }
          .service-mid-cta-inner {
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
