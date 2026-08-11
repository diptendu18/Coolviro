import { howItWorks } from '@/data/site';

export default function HowItWorks() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Simple Process</span>
          <h2>How It Works</h2>
        </div>
        <div className="grid grid-4 how-grid">
          {howItWorks.map((step) => (
            <div className="how-step card" key={step.step}>
              <span className="how-step-number">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .how-grid {
          align-items: stretch;
        }
        .how-step {
          padding: var(--space-6) var(--space-5);
        }
        .how-step-number {
          display: inline-block;
          font-weight: 800;
          font-size: 1.6rem;
          color: var(--color-secondary);
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: var(--space-3);
        }
        .how-step h3 {
          margin-bottom: var(--space-2);
        }
        .how-step p {
          margin: 0;
          font-size: 0.92rem;
        }
      `}</style>
    </section>
  );
}
