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
        @media (max-width: 900px) {
          .hero-inner {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-copy {
            max-width: none;
          }
          .hero-media {
            width: 100%;
            max-width: 340px;
            margin: 0 auto;
          }
        }
        @media (max-width: 640px) {
          .hero {
            padding: var(--space-7) 0;
          }
          .hero-trust-grid {
            grid-template-columns: 1fr 1fr;
          }
          .hero-ctas {
            flex-direction: column;
          }
          .hero-ctas :global(.btn) {
            width: 100%;
          }
        }
        @media (max-width: 380px) {
          .hero-trust-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
