import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/seo/SEO';
import ServiceSchema from '@/components/seo/ServiceSchema';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ApplianceArt from '@/components/ui/ApplianceArt';
import FAQAccordion from '@/components/ui/FAQAccordion';
import HelpContactNote from '@/components/ui/HelpContactNote';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';
import {
  CheckIcon,
  ShieldCheckIcon,
  UsersIcon,
  BadgeCheckIcon,
  DoorstepIcon,
} from '@/components/ui/Icons';
import { serviceAreas } from '@/data/site';

const TRUST_ITEMS = [
  { icon: ShieldCheckIcon, label: '10 Years Experienced Technicians' },
  { icon: UsersIcon, label: '500+ Customers Served' },
  { icon: BadgeCheckIcon, label: '1 Year Service Warranty' },
  { icon: DoorstepIcon, label: 'Doorstep Service in Kolkata' },
];

function buildFaqs(brand, service) {
  const shortLower = service.shortName.toLowerCase();
  return [
    {
      q: `Does Coolviro Services repair ${brand} ${service.shortName}?`,
      a: `Yes, Coolviro Services provides professional ${brand} ${shortLower} service and repair at your doorstep in Kolkata and nearby areas.`,
    },
    {
      q: `How much does ${brand} ${shortLower} service cost?`,
      a: `${brand} ${shortLower} service starts from ₹${service.startingPrice}. The final cost depends on the specific issue, parts required and inspection findings.`,
    },
    {
      q: `Do you provide a warranty on ${brand} ${shortLower} repair?`,
      a: 'Yes, our repair work is covered by a 1 Year Service Warranty.',
    },
    {
      q: `How do I book a ${brand} ${shortLower} service in Kolkata?`,
      a: 'You can book online using our booking form, or simply call or WhatsApp us at +91 79803 49872.',
    },
  ];
}

export default function BrandServicePageTemplate({ brandPage }) {
  const { service, brand, image, otherBrands } = brandPage;
  const shortLower = service.shortName.toLowerCase();
  const pageTitle = `${brand} ${service.shortName} Service & Repair in Kolkata`;
  const pageDescription = `${brand} ${shortLower} service and repair at your doorstep in Kolkata. Starting from ₹${service.startingPrice}, 1 Year Service Warranty. Book online, call or WhatsApp.`;
  const pagePath = `/services/${service.urlSegment}/${brandPage.brandSlug}`;
  const bookHref = `/booking?service=${encodeURIComponent(service.name)}&brand=${encodeURIComponent(brand)}`;
  const whatsappMessage = `Hello Coolviro Services, I need ${brand} ${shortLower} service in Kolkata.`;
  const faqs = buildFaqs(brand, service);
  const schemaService = {
    name: `${brand} ${service.name}`,
    overview: `Coolviro Services provides ${brand} ${shortLower} service and repair at your doorstep in Kolkata.`,
    startingPrice: service.startingPrice,
  };

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} path={pagePath} />
      <ServiceSchema service={schemaService} />

      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.name, href: `/services/${service.slug}` },
            { label: `${brand} ${service.shortName} Service`, href: pagePath },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="brand-hero">
        <div className="container brand-hero-inner">
          <div className="brand-hero-copy">
            <span className="eyebrow">Kolkata</span>
            <h1>
              {brand} {service.shortName} Service & Repair
            </h1>
            <p>
              Doorstep {brand} {shortLower} service and repair across Kolkata, backed by a 1 Year
              Service Warranty.
            </p>
            <div className="brand-hero-meta">
              <span className="service-price-badge">Starting from ₹{service.startingPrice}</span>
              <span className="service-warranty-badge">
                <ShieldCheckIcon width="18" height="18" /> 1 Year Service Warranty
              </span>
            </div>
            <div className="brand-hero-ctas">
              <BookButton size="lg" href={bookHref} label={`Book ${brand} ${service.shortName} Service`} />
              <CallButton variant="secondary" size="lg" />
              <WhatsappButton size="lg" message={whatsappMessage} />
            </div>
          </div>
          <div className="brand-hero-art">
            {image ? (
              <Image
                src={image}
                alt={`${brand} ${shortLower} service and repair in Kolkata`}
                width={700}
                height={400}
                priority
                sizes="(max-width: 860px) 260px, 320px"
              />
            ) : (
              <ApplianceArt type={service.icon} />
            )}
          </div>
        </div>
      </section>

      {/* Overview + types + services */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Overview</span>
            <h2>
              {brand} {service.shortName} Service in Kolkata
            </h2>
          </div>
          <p className="brand-overview-text">
            Coolviro Services provides professional {brand} {shortLower} service and repair at
            your doorstep in Kolkata and nearby areas. Our technicians handle a wide range of{' '}
            {brand} {shortLower} issues, backed by a 1 Year Service Warranty on all repair work.
          </p>

          <div className="grid grid-2 brand-info-grid">
            <div className="card brand-info-card">
              <h3>{service.shortName} Types We Service</h3>
              <ul className="chip-list">
                {service.types.map((type) => (
                  <li key={type}>
                    <CheckIcon /> {brand} {type}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card brand-info-card">
              <h3>Service Area</h3>
              <p>
                We provide {brand} {shortLower} service across {serviceAreas.join(', ')} and
                nearby areas in Kolkata.{' '}
                <Link href="/areas">View all service areas →</Link>
              </p>
            </div>
          </div>

          <div className="card brand-info-card brand-services-card">
            <h3>{brand} {service.shortName} Services We Offer</h3>
            <div className="brand-services-grid">
              {service.serviceOptions.map((option) => (
                <div className="brand-service-item" key={option}>
                  <CheckIcon width="20" height="20" />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card brand-info-card brand-pricing-card">
            <h3>{brand} {service.shortName} Service Pricing</h3>
            <p className="brand-pricing-amount">Starting from ₹{service.startingPrice}</p>
            <p>
              This is a starting price only. The final cost depends on the specific {brand}{' '}
              {shortLower} issue, parts required and inspection findings.
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="brand-trust-section">
        <div className="container brand-trust-grid">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div className="brand-trust-item" key={label}>
              <span className="brand-trust-icon">
                <Icon />
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mid CTA */}
      <section className="service-mid-cta">
        <div className="container service-mid-cta-inner">
          <div>
            <h2>
              Ready to Book Your {brand} {service.shortName} Service?
            </h2>
            <p>
              Starting from ₹{service.startingPrice} &middot; 1 Year Service Warranty &middot;
              Doorstep Service
            </p>
          </div>
          <BookButton size="lg" href={bookHref} label={`Book ${brand} ${service.shortName} Service`} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container service-faq">
          <div className="section-heading">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <FAQAccordion items={faqs} idPrefix={`${service.urlSegment}-${brandPage.brandSlug}`} />
        </div>
      </section>

      {/* Other brands in this category */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">More Brands</span>
            <h2>Other {service.shortName} Brands We Service</h2>
          </div>
          <div className="other-brands-grid">
            {otherBrands.map((entry) => (
              <Link
                key={entry.brandSlug}
                href={`/services/${service.urlSegment}/${entry.brandSlug}`}
                className="other-brand-pill"
              >
                {entry.brand} {service.shortName}
              </Link>
            ))}
          </div>
          <HelpContactNote />
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container final-cta-inner">
          <h2>
            Book Your {brand} {service.shortName} Service Today
          </h2>
          <p>Fast, reliable doorstep service across Kolkata.</p>
          <div className="final-cta-buttons">
            <BookButton size="lg" href={bookHref} label={`Book ${brand} ${service.shortName} Service`} />
            <CallButton size="lg" />
            <WhatsappButton size="lg" message={whatsappMessage} />
          </div>
        </div>
      </section>

      <style jsx>{`
        .brand-hero {
          background: var(--color-bg-section);
          padding: var(--space-7) 0;
        }
        .brand-hero-inner {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: var(--space-7);
          align-items: center;
        }
        .brand-hero-copy {
          min-width: 0;
        }
        .brand-hero-copy p {
          font-size: 1.05rem;
          max-width: 52ch;
        }
        .brand-hero-meta {
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
        .brand-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          min-width: 0;
        }
        .brand-hero-ctas :global(.btn) {
          min-width: 0;
          max-width: 100%;
        }
        .brand-hero-art {
          max-width: 320px;
          margin: 0 auto;
          min-width: 0;
        }
        .brand-hero-art :global(img) {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        .brand-overview-text {
          font-size: 1.05rem;
          max-width: 72ch;
        }
        .brand-info-grid {
          margin-top: var(--space-6);
        }
        .brand-info-card {
          padding: var(--space-6);
          min-width: 0;
        }
        .brand-info-card h3 {
          margin-bottom: var(--space-4);
        }
        .brand-info-card :global(a) {
          color: var(--color-primary);
          font-weight: 700;
        }
        .chip-list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin: 0;
          padding: 0;
        }
        .chip-list li {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          max-width: 100%;
          background: var(--color-bg-section);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.9rem;
        }
        .chip-list :global(svg) {
          color: var(--color-primary);
        }
        .brand-services-card {
          margin-top: var(--space-5);
        }
        .brand-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
        }
        .brand-services-grid {
          min-width: 0;
        }
        .brand-service-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          min-width: 0;
          word-break: break-word;
          padding: var(--space-3) var(--space-4);
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.92rem;
        }
        .brand-service-item :global(svg) {
          flex-shrink: 0;
          color: var(--color-primary);
        }
        .brand-pricing-card {
          margin-top: var(--space-5);
        }
        .brand-pricing-amount {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-primary);
          margin: 0 0 var(--space-3);
        }
        .brand-trust-section {
          padding: var(--space-6) 0;
          background: #fff;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .brand-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-5);
        }
        .brand-trust-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          min-width: 0;
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--color-text);
        }
        .brand-trust-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--color-bg-section);
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
        .other-brands-grid {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        :global(.other-brand-pill) {
          display: inline-flex;
          align-items: center;
          max-width: 100%;
          text-align: center;
          background: #fff;
          border: 1.5px solid var(--color-border);
          color: var(--color-text);
          font-weight: 700;
          font-size: 0.9rem;
          padding: var(--space-3) var(--space-5);
          border-radius: var(--radius-full);
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        :global(.other-brand-pill:hover) {
          border-color: var(--color-secondary);
          color: var(--color-primary);
          transform: translateY(-2px);
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
        @media (max-width: 960px) {
          .brand-trust-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .brand-services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 860px) {
          .brand-hero-inner {
            grid-template-columns: 1fr;
          }
          .brand-hero-art {
            max-width: 260px;
            order: -1;
          }
          .brand-info-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .brand-hero-ctas,
          .final-cta-buttons {
            flex-direction: column;
          }
          .brand-hero-ctas :global(.btn),
          .final-cta-buttons :global(.btn) {
            width: 100%;
          }
          .service-mid-cta-inner {
            text-align: center;
            justify-content: center;
          }
          .brand-trust-grid {
            grid-template-columns: 1fr;
          }
          .brand-services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
