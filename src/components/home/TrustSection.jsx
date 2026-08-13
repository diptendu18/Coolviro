import {
  ShieldCheckIcon,
  UsersIcon,
  BadgeCheckIcon,
  DoorstepIcon,
  ToolboxIcon,
  RupeeIcon,
} from '@/components/ui/Icons';
import { trustHighlights } from '@/data/site';

const ICONS = {
  experience: ShieldCheckIcon,
  customers: UsersIcon,
  warranty: BadgeCheckIcon,
  doorstep: DoorstepIcon,
  parts: ToolboxIcon,
  pricing: RupeeIcon,
};

export default function TrustSection() {
  return (
    <section className="section trust-section" id="why-choose-us">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Why Choose Coolviro</span>
          <h2>We Are Committed to Provide Quality Service</h2>
        </div>
        <div className="trust-grid">
          {trustHighlights.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div className="trust-item card" key={item.subtitle}>
                <span className="trust-icon">
                  <Icon />
                </span>
                <span className="trust-text">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .trust-section {
          background: var(--color-bg-section);
        }
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--space-4);
        }
        .trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-3);
          padding: var(--space-5) var(--space-3);
        }
        .trust-icon {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: var(--radius-full);
          background: var(--color-bg-section);
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .trust-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .trust-text strong {
          font-size: 1rem;
          color: var(--color-text);
        }
        .trust-text span {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }
        @media (max-width: 900px) {
          .trust-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 520px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
