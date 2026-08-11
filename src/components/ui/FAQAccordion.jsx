import { useState } from 'react';
import Head from 'next/head';
import { ChevronDownIcon } from './Icons';

/**
 * Accessible accordion (disclosure pattern) for FAQs. Also emits FAQPage
 * JSON-LD built from the same `items` passed in, so structured data always
 * matches what's visibly on the page.
 */
export default function FAQAccordion({ items, idPrefix = 'faq' }) {
  const [openIndex, setOpenIndex] = useState(0);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <div className="faq-accordion">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const btnId = `${idPrefix}-btn-${i}`;
          const panelId = `${idPrefix}-panel-${i}`;
          return (
            <div className="faq-item" key={btnId}>
              <h3 className="faq-q">
                <button
                  id={btnId}
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <ChevronDownIcon className={`faq-chevron ${isOpen ? 'is-open' : ''}`} />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="faq-panel"
                hidden={!isOpen}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .faq-accordion {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .faq-item {
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .faq-q {
          margin: 0;
          font-size: 1rem;
        }
        .faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          background: transparent;
          border: none;
          text-align: left;
          padding: var(--space-4) var(--space-5);
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-text);
          cursor: pointer;
        }
        .faq-chevron {
          flex-shrink: 0;
          color: var(--color-primary);
          transition: transform 0.2s ease;
        }
        .faq-chevron.is-open {
          transform: rotate(180deg);
        }
        .faq-panel {
          padding: 0 var(--space-5) var(--space-5);
        }
        .faq-panel p {
          margin: 0;
        }
      `}</style>
    </>
  );
}
