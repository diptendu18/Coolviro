import Link from 'next/link';
import Head from 'next/head';
import { site } from '@/data/site';

/**
 * Accessible breadcrumb nav. Also emits BreadcrumbList JSON-LD so search
 * engines can render breadcrumbs in results.
 * `items` = [{ label, href }] — last item is treated as the current page.
 */
export default function Breadcrumb({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${site.siteUrl}${item.href}`,
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
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href}>
                {isLast ? (
                  <span aria-current="page">{item.label}</span>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
                {!isLast && <span className="breadcrumb-sep" aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <style jsx>{`
        .breadcrumb {
          padding: var(--space-4) 0;
        }
        .breadcrumb ol {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }
        .breadcrumb li {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
        }
        .breadcrumb :global(a) {
          color: var(--color-text-muted);
        }
        .breadcrumb :global(a:hover) {
          color: var(--color-primary);
          text-decoration: underline;
        }
        .breadcrumb span[aria-current] {
          color: var(--color-text);
          font-weight: 600;
        }
        .breadcrumb-sep {
          color: var(--color-border);
        }
      `}</style>
    </>
  );
}
