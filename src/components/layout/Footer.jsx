import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { PhoneIcon, WhatsappIcon, ClockIcon } from '@/components/ui/Icons';
import { site, footerNavLinks, footerLegalLinks } from '@/data/site';
import { services } from '@/data/services';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <div className="site-footer-brand">
          <Logo size={36} />
          <p>
            Coolviro Services provides professional home appliance repair and
            service at your doorstep across Kolkata — AC, refrigerator,
            geyser, microwave oven and washing machine.
          </p>
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

        <nav aria-label="Footer navigation">
          <h3>Explore</h3>
          <ul>
            {footerNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Our services">
          <h3>Our Services</h3>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.shortName}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h3>Legal</h3>
          <ul>
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container site-footer-bottom">
        <p>
          &copy; {year} {site.siteName}. All rights reserved. Serving {site.city} and
          nearby areas.
        </p>
      </div>

      <style jsx>{`
        .site-footer {
          background: #0a1637;
          color: #cbd5e1;
          padding: var(--space-8) 0 var(--space-5);
        }
        .site-footer-grid {
          display: grid;
          grid-template-columns: 1.6fr repeat(3, 1fr);
          gap: var(--space-7);
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
          color: #94a3b8;
          font-size: 0.92rem;
        }
        .site-footer nav a:hover {
          color: var(--color-secondary);
        }
        .site-footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: var(--space-7);
          padding-top: var(--space-5);
        }
        .site-footer-bottom p {
          color: #64748b;
          font-size: 0.82rem;
          margin: 0;
        }
        @media (max-width: 900px) {
          .site-footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 560px) {
          .site-footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
