import Link from 'next/link';
import { quickInfo } from '@/data/site';
import { MapPinIcon, ClockIcon, PhoneIcon, CalendarCheckIcon } from '@/components/ui/Icons';

const ICONS = {
  areas: MapPinIcon,
  hours: ClockIcon,
  help: PhoneIcon,
  book: CalendarCheckIcon,
};

export default function QuickInfoBar() {
  return (
    <section className="quick-info" aria-label="Quick information">
      <div className="container quick-info-grid">
        {quickInfo.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div className="quick-info-item" key={item.title}>
              <span className="quick-info-icon">
                <Icon width="22" height="22" />
              </span>
              <div className="quick-info-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.linkHref && (
                  <Link href={item.linkHref} className="quick-info-link">
                    {item.linkLabel}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .quick-info {
          background: var(--color-primary-dark);
          color: #fff;
          padding: var(--space-6) 0;
        }
        .quick-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-6);
        }
        .quick-info-item {
          display: flex;
          gap: var(--space-3);
        }
        .quick-info-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .quick-info-body h3 {
          color: #fff;
          font-size: 0.95rem;
          margin: 0 0 4px;
        }
        .quick-info-body p {
          color: #bfdcff;
          font-size: 0.85rem;
          margin: 0 0 6px;
        }
        .quick-info-link {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
          text-decoration: underline;
          text-underline-offset: 3px;
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
