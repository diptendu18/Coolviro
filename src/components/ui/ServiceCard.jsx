import Link from 'next/link';
import Image from 'next/image';
import ApplianceArt from './ApplianceArt';
import { ChevronRightIcon } from './Icons';

export default function ServiceCard({ service }) {
  return (
    <article className="service-card card">
      <div className="service-card-art">
        {service.cardImage ? (
          <Image
            src={service.cardImage}
            alt={service.name}
            width={700}
            height={467}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        ) : (
          <ApplianceArt type={service.icon} />
        )}
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
        .service-card-art :global(img) {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 700 / 467;
          object-fit: cover;
          border-radius: var(--radius-md);
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
        :global(.service-card-link) {
          margin-top: var(--space-2);
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--color-primary);
          background: var(--color-bg-section);
          padding: 0.6rem 1.1rem;
          border-radius: var(--radius-full);
          transition: background-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
        }
        :global(.service-card-link:hover) {
          background: #dceeff;
          box-shadow: 0 6px 16px rgba(0, 102, 255, 0.15);
          transform: translateY(-1px);
        }
      `}</style>
    </article>
  );
}
