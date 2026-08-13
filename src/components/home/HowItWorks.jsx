import Image from 'next/image';

export default function HowItWorks() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Simple Process</span>
          <h2>How It Works</h2>
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
        .how-it-works-media {
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
