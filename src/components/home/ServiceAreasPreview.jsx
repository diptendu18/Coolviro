import Link from 'next/link';
import { serviceAreas, site } from '@/data/site';
import { MapPinIcon } from '@/components/ui/Icons';

export default function ServiceAreasPreview() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Where We Serve</span>
          <h2>Our Service Areas</h2>
          <p>
            Coolviro Services provides doorstep appliance repair across {site.city}
            , including the following areas.
          </p>
        </div>
        <ul className="areas-list">
          {serviceAreas.map((area) => (
            <li key={area}>
              <MapPinIcon /> {area}
            </li>
          ))}
        </ul>
        <div className="areas-cta">
          <Link href="/areas" className="btn btn-secondary">
            View All Service Areas
          </Link>
        </div>
      </div>
      <style jsx>{`
        .areas-list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          justify-content: center;
          margin-bottom: var(--space-6);
        }
        .areas-list li {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          background: var(--color-bg-section);
          color: var(--color-text);
          font-weight: 600;
          padding: var(--space-3) var(--space-5);
          border-radius: var(--radius-full);
        }
        .areas-list :global(svg) {
          color: var(--color-primary);
        }
        .areas-cta {
          text-align: center;
        }
      `}</style>
    </section>
  );
}
