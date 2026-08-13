import Image from 'next/image';
import { howItWorks } from '@/data/site';

export default function HowItWorks() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Simple Process</span>
          <h2>How It Works</h2>
        </div>
        <div className="grid grid-5 how-grid">
          {howItWorks.map((step) => (
            <div className="how-step card" key={step.step}>
              <span className="how-step-number">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
        <div className="how-it-works-media">
          <Image
            src="/images/how-it-works/how-it-works-process.webp"
            alt="Coolviro Services process: book service, technician visit, diagnosis, repair, service complete"
            width={1717}
            height={726}
            sizes="(max-width: 900px) 100vw, 1100px"
          />
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
        .how-it-works-media {
          margin-top: var(--space-7);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md, 0 10px 30px rgba(0, 0, 0, 0.08));
        }
        .how-it-works-media :global(img) {
          display: block;
          width: 100%;
          height: auto;
        }
      `}</style>
    </section>
  );
}
