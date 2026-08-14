import Image from 'next/image';
import { CallButton, BookButton } from '@/components/ui/CTAButtons';
import { ShieldCheckIcon, DoorstepIcon, ToolboxIcon, BadgeCheckIcon } from '@/components/ui/Icons';

const trustPoints = [
  { icon: ShieldCheckIcon, label: 'Skilled Technicians' },
  { icon: DoorstepIcon, label: 'Doorstep Service' },
  { icon: ToolboxIcon, label: 'Genuine Parts' },
  { icon: BadgeCheckIcon, label: '1 Year Service Warranty' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy animate-in">
          <span className="hero-pill">Fast. Reliable. Affordable.</span>
          <h1>
            Expert Care for Your <span className="hero-highlight">Home Appliances</span>
          </h1>
          <p className="hero-subtitle">
            Coolviro Services provides professional repair and maintenance for
            all types of home appliances. We ensure quality service and
            doorstep convenience across Kolkata.
          </p>
          <div className="hero-trust-grid">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div className="hero-trust-item" key={label}>
                <span className="hero-trust-icon">
                  <Icon width="20" height="20" />
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="hero-ctas">
            <BookButton size="lg" label="Book Your Service" />
            <CallButton variant="secondary" size="lg" />
          </div>
        </div>
        <div className="hero-media">
          <Image
            src="/images/hero/hero-technician.webp"
            alt="Coolviro Services technician with AC, refrigerator, geyser, microwave and washing machine"
            width={736}
            height={1024}
            priority
            sizes="(max-width: 900px) 85vw, 500px"
          />
        </div>
      </div>
      <style jsx>{`
        .hero {
          background: var(--gradient-hero);
          color: #fff;
          padding: var(--space-8) 0;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.15), transparent 55%);
        }
        .hero-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-7);
        }
        .hero-copy {
          max-width: 560px;
        }
        .hero-pill {
          display: inline-block;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          font-weight: 700;
          font-size: 0.85rem;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-4);
        }
        .hero h1 {
          color: #fff;
          margin-bottom: var(--space-4);
        }
        .hero-highlight {
          color: #bfe3ff;
        }
        .hero-subtitle {
          color: #e0f2ff;
          font-size: 1.05rem;
          max-width: 56ch;
          margin-bottom: var(--space-5);
        }
        .hero-trust-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-3);
          margin-bottom: var(--space-6);
        }
        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: var(--space-3);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.85rem;
        }
        .hero-trust-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.16);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        .hero-ctas :global(.btn-secondary) {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.5);
        }
        .hero-ctas :global(.btn-secondary:hover) {
          background: rgba(255, 255, 255, 0.18);
        }
        .hero-media {
          flex-shrink: 0;
          width: 460px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        }
        .hero-media :global(img) {
          display: block;
          width: 100%;
          height: auto;
        }
        @media (max-width: 1150px) {
          .hero-media {
            width: 380px;
          }
        }
        /*
         * Below 900px the hero switches from a fixed-width image column to
         * a percentage split (content ~60% / image ~40%) so the photo
         * stays beside the text instead of dropping to a new row. Sizes
         * shrink at each narrower tier instead of restructuring further.
         */
        @media (max-width: 900px) {
          .hero-inner {
            flex-direction: row;
            align-items: center;
            gap: var(--space-4);
          }
          .hero-copy {
            max-width: none;
            flex: 1 1 60%;
            min-width: 0;
          }
          .hero-pill {
            font-size: 0.72rem;
            padding: 6px var(--space-3);
            margin-bottom: var(--space-3);
          }
          .hero h1 {
            font-size: 1.5rem;
            margin-bottom: var(--space-3);
          }
          .hero-subtitle {
            font-size: 0.85rem;
            margin-bottom: var(--space-4);
          }
          .hero-trust-grid {
            grid-template-columns: 1fr;
            gap: var(--space-2);
            margin-bottom: var(--space-4);
          }
          .hero-trust-item {
            padding: var(--space-2);
            font-size: 0.75rem;
            gap: 6px;
          }
          .hero-trust-icon {
            width: 26px;
            height: 26px;
          }
          .hero-ctas {
            flex-direction: column;
            gap: var(--space-2);
          }
          .hero-ctas :global(.btn) {
            width: 100%;
            padding: 0.8rem 1.1rem;
            font-size: 0.9rem;
          }
          .hero-media {
            flex: 0 0 38%;
            width: 38%;
            max-width: none;
            margin: 0;
          }
        }
        @media (max-width: 640px) {
          .hero {
            padding: var(--space-6) 0;
          }
        }
        @media (max-width: 480px) {
          .hero-inner {
            gap: var(--space-3);
          }
          .hero-pill {
            font-size: 0.65rem;
            padding: 5px var(--space-2);
          }
          .hero h1 {
            font-size: 1.2rem;
          }
          .hero-subtitle {
            font-size: 0.78rem;
            margin-bottom: var(--space-3);
          }
          .hero-trust-item {
            font-size: 0.68rem;
            padding: 6px;
          }
          .hero-trust-icon {
            width: 22px;
            height: 22px;
          }
          .hero-ctas :global(.btn) {
            padding: 0.68rem 0.9rem;
            font-size: 0.82rem;
          }
          .hero-media {
            flex-basis: 36%;
            width: 36%;
          }
        }
      `}</style>
    </section>
  );
}
