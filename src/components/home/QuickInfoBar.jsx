import Link from 'next/link';
import { quickInfo } from '@/data/site';
import { MapPinIcon, ClockIcon, PhoneIcon, CalendarCheckIcon, WhatsappIcon } from '@/components/ui/Icons';

const ICONS = {
  areas: MapPinIcon,
  hours: ClockIcon,
  help: PhoneIcon,
  book: CalendarCheckIcon,
};

function isInternal(href = '') {
  return href.startsWith('/') && !href.startsWith('//');
}

function ItemLink({ href, children }) {
  if (isInternal(href)) {
    return (
      <Link href={href} className="quick-info-link">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className="quick-info-link"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

export default function QuickInfoBar() {
  return (
    <section className="quick-info" aria-label="Contact and service information">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Get In Touch</span>
          <h2>Service Information</h2>
        </div>
        <div className="quick-info-grid">
          {quickInfo.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div className="quick-info-item card" key={item.title}>
                <span className="quick-info-icon">
                  <Icon width="24" height="24" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="quick-info-actions">
                  {item.linkHref && <ItemLink href={item.linkHref}>{item.linkLabel}</ItemLink>}
                  {item.whatsappHref && (
                    <a
                      href={item.whatsappHref}
                      className="quick-info-icon-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat with Coolviro Services on WhatsApp"
                    >
                      <WhatsappIcon width="18" height="18" />
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .quick-info {
          background: #fff;
        }
        .quick-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-5);
        }
        .quick-info-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--space-6) var(--space-5);
        }
        .quick-info-icon {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: var(--radius-full);
          background: var(--color-bg-section);
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-4);
        }
        .quick-info-item h3 {
          font-size: 1rem;
          margin-bottom: var(--space-2);
        }
        .quick-info-item p {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          margin: 0 0 var(--space-4);
        }
        .quick-info-actions {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
        }
        .quick-info-link {
          display: inline-block;
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .quick-info-link:hover {
          text-decoration: underline;
        }
        .quick-info-icon-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #16a34a;
        }
        .quick-info-icon-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .quick-info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .quick-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
