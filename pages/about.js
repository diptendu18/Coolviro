import Link from 'next/link';
import SEO from '@/components/seo/SEO';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { ShieldCheckIcon, UsersIcon, BadgeCheckIcon } from '@/components/ui/Icons';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';
import { site } from '@/data/site';
import { services } from '@/data/services';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Coolviro Services is a home appliance repair and service business in Kolkata with 10 years experienced technicians, 500+ customers served, and a 1 Year Service Warranty."
        path="/about"
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]} />
      </div>

      <section className="section--tight">
        <div className="container about-hero">
          <span className="eyebrow">About Coolviro Services</span>
          <h1>Home Appliance Repair &amp; Service in Kolkata</h1>
          <p>
            Coolviro Services is a home appliance repair and service business
            based in {site.city}. We help households across the city keep
            their AC, refrigerator, geyser, microwave oven and washing
            machine running reliably, with doorstep visits and a 1 Year
            Service Warranty on our work.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="grid grid-3">
            <div className="card about-stat">
              <ShieldCheckIcon width="30" height="30" />
              <h3>10 Years Experienced Technicians</h3>
              <p>A decade of hands-on appliance repair experience serving Kolkata households.</p>
            </div>
            <div className="card about-stat">
              <UsersIcon width="30" height="30" />
              <h3>500+ Customers Served</h3>
              <p>We&apos;ve helped hundreds of customers across Kolkata get their appliances working again.</p>
            </div>
            <div className="card about-stat">
              <BadgeCheckIcon width="30" height="30" />
              <h3>1 Year Service Warranty</h3>
              <p>Every service and repair we complete is backed by a 1 Year Service Warranty.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">What We Do</span>
            <h2>Our Services</h2>
            <p>We provide professional repair and service for the following home appliances:</p>
          </div>
          <ul className="about-services-list">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
                <span>{s.priceDisplay}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <h2>Ready to Book a Service?</h2>
          <p>Reach out to Coolviro Services today.</p>
          <div className="final-cta-buttons">
            <BookButton size="lg" />
            <CallButton size="lg" />
            <WhatsappButton size="lg" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-hero {
          max-width: 760px;
        }
        .about-hero p {
          font-size: 1.05rem;
        }
        .about-stat {
          padding: var(--space-6);
          text-align: center;
        }
        .about-stat :global(svg) {
          color: var(--color-primary);
          margin-bottom: var(--space-3);
        }
        .about-stat h3 {
          margin-bottom: var(--space-2);
        }
        .about-stat p {
          margin: 0;
          font-size: 0.92rem;
        }
        .about-services-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          max-width: 640px;
        }
        .about-services-list li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--space-4) var(--space-5);
        }
        .about-services-list a {
          font-weight: 700;
          color: var(--color-text);
        }
        .about-services-list a:hover {
          color: var(--color-primary);
        }
        .about-services-list span {
          color: var(--color-primary);
          font-weight: 700;
          font-size: 0.9rem;
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
          .about-services-list li {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-2);
          }
        }
      `}</style>
    </>
  );
}
