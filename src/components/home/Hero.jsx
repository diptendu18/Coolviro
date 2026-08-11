import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';
import { ShieldCheckIcon } from '@/components/ui/Icons';
import { site } from '@/data/site';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy animate-in">
          <span className="eyebrow hero-eyebrow">Home Appliance Repair in Kolkata</span>
          <h1>Professional Home Appliance Repair &amp; Service at Your Doorstep</h1>
          <p className="hero-subtitle">
            Fast, Reliable &amp; Professional Repair Services for AC, Refrigerator,
            Geyser, Microwave Oven &amp; Washing Machine.
          </p>
          <div className="hero-ctas">
            <BookButton size="lg" />
            <CallButton variant="secondary" size="lg" />
            <WhatsappButton size="lg" />
          </div>
          <div className="hero-trust">
            <ShieldCheckIcon />
            <span>{site.warrantyHighlight} &middot; {site.experienceHighlight}</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero {
          background: var(--gradient-hero);
          color: #fff;
          padding: var(--space-9) 0 var(--space-8);
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
        }
        .hero-copy {
          max-width: 760px;
        }
        .hero-eyebrow {
          color: #bfe3ff;
        }
        .hero h1 {
          color: #fff;
          margin-bottom: var(--space-4);
        }
        .hero-subtitle {
          color: #e0f2ff;
          font-size: 1.15rem;
          max-width: 60ch;
          margin-bottom: var(--space-6);
        }
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-bottom: var(--space-6);
        }
        .hero-ctas :global(.btn-secondary) {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.5);
        }
        .hero-ctas :global(.btn-secondary:hover) {
          background: rgba(255, 255, 255, 0.18);
        }
        .hero-trust {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: var(--space-3) var(--space-5);
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.92rem;
        }
        @media (max-width: 640px) {
          .hero {
            padding: var(--space-8) 0 var(--space-7);
          }
          .hero-ctas {
            flex-direction: column;
          }
          .hero-ctas :global(.btn) {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
