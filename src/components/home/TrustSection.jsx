import { ShieldCheckIcon, UsersIcon, BadgeCheckIcon, DoorstepIcon } from '@/components/ui/Icons';

const ICONS = {
  experience: ShieldCheckIcon,
  customers: UsersIcon,
  warranty: BadgeCheckIcon,
  doorstep: DoorstepIcon,
};

const items = [
  { icon: 'experience', label: '10 Years Experienced Technicians' },
  { icon: 'customers', label: '500+ Customers Served' },
  { icon: 'warranty', label: '1 Year Service Warranty' },
  { icon: 'doorstep', label: 'Doorstep Service' },
];

export default function TrustSection() {
  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-grid">
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div className="trust-item" key={item.label}>
                <span className="trust-icon">
                  <Icon />
                </span>
                <span className="trust-label">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .trust-section {
          padding: var(--space-6) 0;
          background: #fff;
          border-bottom: 1px solid var(--color-border);
        }
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-5);
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
        }
        .trust-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: var(--color-bg-section);
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .trust-label {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--color-text);
        }
        @media (max-width: 900px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .trust-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
