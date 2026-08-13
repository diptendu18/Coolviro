import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { PhoneIcon, WhatsappIcon, ClockIcon, MapPinIcon } from '@/components/ui/Icons';
import { site, footerNavLinks, footerLegalLinks, serviceAreas } from '@/data/site';
import { services } from '@/data/services';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <div className="site-footer-brand">
          <Link href="/" aria-label="Coolviro Services — Home" className="site-footer-logo-badge">
            <Logo size={32} />
          </Link>
          <p>
            Coolviro Services provides professional home appliance repair and
            service at your doorstep across Kolkata — AC, refrigerator,
            geyser, microwave oven and washing machine.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h3>Quick Links</h3>
          <ul>
            {footerNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Our services">
          <h3>Services</h3>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Service areas">
          <h3>Service Areas</h3>
          <ul>
            {serviceAreas.slice(0, 5).map((area) => (
              <li key={area}>
                <Link href="/areas">
                  <MapPinIcon width="14" height="14" /> {area}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" className="site-footer-areas-more">
                View All Areas →
              </Link>
            </li>
          </ul>
        </nav>

        <div className="site-footer-contact-col">
          <h3>Contact Us</h3>
          <ul className="site-footer-contact">
            <li>
              <a href={site.phoneHref}>
                <PhoneIcon /> {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon /> WhatsApp Us
              </a>
            </li>
            <li>
              <span>
                <ClockIcon /> {site.workingHours}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container site-footer-bottom">
        <p>
          &copy; {year} {site.siteName}. All rights reserved. Serving {site.city} and
          nearby areas.
        </p>
        <ul className="site-footer-legal">
          {footerLegalLinks.map((link, i) => (
            <li key={link.href}>
              {i > 0 && <span aria-hidden="true">|</span>}
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .site-footer {
          background: #0a1637;
          color: #cbd5e1;
          padding: var(--space-8) 0 var(--space-5);
        }
        .site-footer-grid {
          display: grid;
          grid-template-columns: 1.4fr repeat(4, 1fr);
          gap: var(--space-6);
        }
        .site-footer-logo-badge {
          display: inline-flex;
          background: #fff;
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
        }
        .site-footer-brand p {
          color: #94a3b8;
          margin: var(--space-4) 0;
          font-size: 0.92rem;
          max-width: 34ch;
        }
        .site-footer-contact {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .site-footer-contact li a,
        .site-footer-contact li span {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          color: #e2e8f0;
          font-weight: 600;
          font-size: 0.92rem;
        }
        .site-footer-contact li a:hover {
          color: var(--color-secondary);
        }
        .site-footer h3 {
          color: #fff;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          margin-bottom: var(--space-4);
        }
        .site-footer nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .site-footer nav a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #94a3b8;
          font-size: 0.92rem;
        }
        .site-footer nav a:hover {
          color: var(--color-secondary);
        }
        .site-footer-areas-more {
          font-weight: 700;
          color: var(--color-secondary) !important;
        }
        .site-footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: var(--space-7);
          padding-top: var(--space-5);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-3);
        }
        .site-footer-bottom p {
          color: #64748b;
          font-size: 0.82rem;
          margin: 0;
        }
        .site-footer-legal {
          list-style: none;
          display: flex;
          gap: var(--space-2);
          margin: 0;
        }
        .site-footer-legal li {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
        }
        .site-footer-legal a {
          color: #94a3b8;
          font-size: 0.82rem;
        }
        .site-footer-legal a:hover {
          color: var(--color-secondary);
        }
        .site-footer-legal span {
          color: #475569;
        }
        @media (max-width: 1024px) {
          .site-footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .site-footer-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 560px) {
          .site-footer-grid {
            grid-template-columns: 1fr;
          }
          .site-footer-brand {
            grid-column: auto;
          }
        }
      `}</style>
    </footer>
  );
}
