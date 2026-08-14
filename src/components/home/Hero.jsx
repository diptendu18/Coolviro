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
          <div className="hero-trust-list">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div className="hero-trust-item" key={label}>
                <span className="hero-trust-icon">
                  <Icon width="18" height="18" />
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="hero-ctas">
            <BookButton size="lg" label="Book Your Service" />
            <CallButton size="lg" />
          </div>
        </div>
        <div className="hero-media">
          <Image
            src="/images/hero/hero-technician.webp"
            alt="Coolviro Services technician with AC, refrigerator, geyser, microwave and washing machine"
            fill
            priority
            sizes="(max-width: 900px) 42vw, 48vw"
            style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
          />
          <div className="hero-media-fade" aria-hidden="true" />
        </div>
      </div>
      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #eef6ff 0%, #e3f0fd 100%);
          padding: var(--space-9) 0 var(--space-8);
        }
        .hero-inner {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 560px;
        }
        .hero-copy {
          position: relative;
          z-index: 1;
          max-width: 52%;
          padding-right: var(--space-5);
        }
        .hero-pill {
          display: inline-block;
          background: #fff;
          border: 1px solid var(--color-border);
          color: var(--color-primary);
          font-weight: 700;
          font-size: 0.85rem;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-4);
          box-shadow: var(--shadow-sm);
        }
        .hero h1 {
          color: var(--color-text);
          margin-bottom: var(--space-4);
        }
        .hero-highlight {
          color: var(--color-primary);
        }
        .hero-subtitle {
          color: var(--color-text-muted);
          font-size: 1.05rem;
          max-width: 56ch;
          margin-bottom: var(--space-5);
        }
        .hero-trust-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
        }
        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          background: #fff;
          border: 1px solid var(--color-border);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--color-text);
          box-shadow: var(--shadow-sm);
        }
        .hero-trust-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--color-bg-section);
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        .hero-media {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 48%;
        }
        .hero-media :global(img) {
          display: block;
        }
        .hero-media-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #eef6ff 0%, rgba(238, 246, 255, 0) 12%);
          pointer-events: none;
        }
        @media (max-width: 1100px) {
          .hero-copy {
            max-width: 56%;
          }
          .hero-media {
            width: 44%;
          }
        }
        @media (max-width: 900px) {
          .hero-inner {
            min-height: 0;
            align-items: stretch;
            gap: var(--space-4);
          }
          .hero-copy {
            position: static;
            max-width: none;
            flex: 1 1 58%;
            min-width: 0;
            padding-right: 0;
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
          .hero-trust-item {
            padding: var(--space-2) var(--space-3);
            font-size: 0.78rem;
            gap: 8px;
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
            position: relative;
            top: auto;
            bottom: auto;
            right: auto;
            flex: 0 0 40%;
            width: 40%;
            border-radius: var(--radius-lg);
            overflow: hidden;
          }
          .hero-media-fade {
            display: none;
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
            font-size: 0.7rem;
            padding: 6px var(--space-2);
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
            flex-basis: 38%;
            width: 38%;
          }
        }
      `}</style>
    </section>
  );
}
