import Breadcrumb from '@/components/ui/Breadcrumb';

export default function LegalLayout({ title, updated, breadcrumbLabel, path, children }) {
  return (
    <>
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: breadcrumbLabel, href: path }]} />
      </div>
      <section className="section--tight">
        <div className="container legal-container">
          <h1>{title}</h1>
          {updated && <p className="legal-updated">Last updated: {updated}</p>}
          <div className="legal-prose">{children}</div>
        </div>
      </section>
      <style jsx>{`
        .legal-container {
          max-width: 780px;
        }
        .legal-updated {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          margin-top: -1rem;
        }
        .legal-prose :global(h2) {
          margin-top: var(--space-7);
          font-size: 1.3rem;
        }
        .legal-prose :global(p),
        .legal-prose :global(li) {
          font-size: 0.98rem;
        }
        .legal-prose :global(ul) {
          list-style: disc;
          padding-left: 1.4rem;
          margin-bottom: var(--space-4);
        }
        .legal-prose :global(li) {
          margin-bottom: var(--space-2);
        }
      `}</style>
    </>
  );
}
