import Link from 'next/link';
import ApplianceArt from './ApplianceArt';
import { ChevronRightIcon } from './Icons';

export default function ServiceCard({ service }) {
  return (
    <article className="service-card card">
      <div className="service-card-art">
        <ApplianceArt type={service.icon} />
      </div>
      <div className="service-card-body">
        <h3>{service.name}</h3>
        <p>{service.cardDescription}</p>
        <p className="service-card-price">{service.priceDisplay}</p>
        <Link
          href={`/services/${service.slug}`}
          className="service-card-link"
          aria-label={`View ${service.name} details`}
        >
          View Services <ChevronRightIcon />
        </Link>
      </div>
      <style jsx>{`
        .service-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .service-card-art {
          padding: var(--space-4);
          padding-bottom: 0;
        }
        .service-card-body {
          padding: var(--space-5);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .service-card-body h3 {
          margin-bottom: 0;
        }
        .service-card-body p {
          margin: 0;
          font-size: 0.95rem;
        }
        .service-card-price {
          color: var(--color-primary) !important;
          font-weight: 700 !important;
          font-size: 1rem !important;
        }
        .service-card-link {
          margin-top: var(--space-2);
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          color: var(--color-primary);
        }
        .service-card-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </article>
  );
}
