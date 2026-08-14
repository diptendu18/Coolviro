import Image from 'next/image';
import { topBrandLogos } from '@/data/site';

// Homepage-only placement of the "We Repair All Major Brands" strip,
// positioned between Hero and ServicesGrid. Same data, logos, and visual
// treatment (background, label, logo sizing/padding) as the equivalent
// strip Header.jsx still renders inside the topbar on every other page —
// this is the homepage's one and only instance, not a second copy.
export default function BrandLogosStrip() {
  return (
    <section className="brand-logos-strip" aria-label="Brands we service">
      <div className="container brand-logos-strip-inner">
        <span className="brand-logos-strip-label">We Repair All Major Brands</span>
        <ul className="brand-logos-strip-list">
          {topBrandLogos.map((brand) => (
            <li key={brand.name} className="brand-logos-strip-logo">
              <Image
                src={brand.image}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                sizes="80px"
              />
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .brand-logos-strip {
          background: var(--gradient-hero);
          color: #fff;
          font-size: 0.78rem;
          font-weight: 600;
        }
        .brand-logos-strip-inner {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-2) var(--space-3);
          padding: var(--space-4) var(--space-5);
        }
        .brand-logos-strip-label {
          color: #fff;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .brand-logos-strip-list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          margin: 0;
          padding: 0;
        }
        .brand-logos-strip-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          height: 24px;
          padding: 3px 8px;
          flex-shrink: 0;
        }
        .brand-logos-strip-logo :global(img) {
          display: block;
          height: 100%;
          width: auto;
          object-fit: contain;
        }
        @media (max-width: 640px) {
          .brand-logos-strip-inner {
            justify-content: center;
          }
          .brand-logos-strip-label {
            width: 100%;
            text-align: center;
          }
          .brand-logos-strip-list {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
