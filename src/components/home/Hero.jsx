import Image from 'next/image';
import { CallButton, BookButton, WhatsappButton } from '@/components/ui/CTAButtons';
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
        <div className="hero-copy">
          <div className="hero-copy-top animate-in">
            <span className="hero-pill">Fast. Reliable. Affordable.</span>
            <h1>
              Expert Care for Your <span className="hero-highlight">Home Appliances</span>
            </h1>
            <p className="hero-subtitle">
              Coolviro Services provides professional repair and maintenance for
              all types of home appliances. We ensure quality service and
              doorstep convenience across Kolkata.
            </p>
          </div>
          <div className="hero-trust-list animate-in">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div className="hero-trust-item" key={label}>
                <span className="hero-trust-icon">
                  <Icon width="18" height="18" />
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="hero-ctas animate-in">
            <BookButton size="lg" label="Book Your Service" />
            <CallButton size="lg" />
            <WhatsappButton size="lg" />
          </div>
        </div>
        <div className="hero-media">
          <Image
            src="/images/hero/hero-technician.webp"
            alt="Coolviro Services technician with AC, refrigerator, geyser, microwave and washing machine"
            fill
            priority
            sizes="(max-width: 900px) 42vw, 48vw"
          />
          <div className="hero-media-fade" aria-hidden="true" />
        </div>
      </div>
      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #eef6ff 0%, #e3f0fd 100%);
          padding: var(--space-9) 0 var(--space-8);
        }
        .hero-inner {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 560px;
        }
        .hero-copy {
          position: relative;
          z-index: 1;
          max-width: 52%;
          padding-right: var(--space-5);
        }
        .hero-pill {
          display: inline-block;
          background: #fff;
          border: 1px solid var(--color-border);
          color: var(--color-primary);
          font-weight: 700;
          font-size: 0.85rem;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-4);
          box-shadow: var(--shadow-sm);
        }
        .hero h1 {
          color: var(--color-text);
          margin-bottom: var(--space-4);
        }
        .hero-highlight {
          color: var(--color-primary);
        }
        .hero-subtitle {
          color: var(--color-text-muted);
          font-size: 1.05rem;
          max-width: 56ch;
          margin-bottom: var(--space-5);
        }
        .hero-trust-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
        }
        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          background: #fff;
          border: 1px solid var(--color-border);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--color-text);
          box-shadow: var(--shadow-sm);
        }
        .hero-trust-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--color-bg-section);
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        .hero-media {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 48%;
        }
        .hero-media :global(img) {
          display: block;
          object-fit: cover;
          object-position: center 15%;
        }
        .hero-media-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #eef6ff 0%, rgba(238, 246, 255, 0) 12%);
          pointer-events: none;
        }
        @media (max-width: 1100px) {
          .hero-copy {
            max-width: 56%;
          }
          .hero-media {
            width: 44%;
          }
        }
        @media (max-width: 900px) {
          /* A fixed-shape image can never fill the height of the full copy
             column (badge + heading + subtitle + 4 trust items + 3 CTA
             buttons) — forcing it to match that height crops the photo
             down to almost nothing, while sizing it by its own aspect
             ratio leaves a large gap underneath it next to the taller
             text, making the image look stranded off to the side.

             Fix: place the image beside only the TOP of the copy (badge +
             heading + subtitle), which is naturally close to the photo's
             own height, via CSS grid — hero-copy becomes display:contents
             so its children act as direct grid items instead of one tall
             flex column. The trust list and CTA buttons then span the
             full width in their own row below both columns, so there's
             no leftover empty space beside them either. */
          .hero-inner {
            display: grid;
            grid-template-columns: 55% 45%;
            grid-template-areas:
              'top image'
              'trust trust'
              'ctas ctas';
            column-gap: var(--space-4);
            row-gap: var(--space-4);
            align-items: start;
            min-height: 0;
          }
          .hero-copy {
            display: contents;
          }
          .hero-copy-top {
            grid-area: top;
            min-width: 0;
          }
          .hero-pill {
            font-size: 0.72rem;
            padding: 6px var(--space-3);
            margin-bottom: var(--space-3);
          }
          .hero h1 {
            font-size: 1.4rem;
            margin-bottom: var(--space-3);
          }
          .hero-subtitle {
            font-size: 0.82rem;
            margin-bottom: 0;
          }
          .hero-trust-list {
            grid-area: trust;
          }
          .hero-trust-item {
            padding: var(--space-2) var(--space-3);
            font-size: 0.78rem;
            gap: 8px;
          }
          .hero-trust-icon {
            width: 26px;
            height: 26px;
          }
          .hero-ctas {
            grid-area: ctas;
            flex-direction: column;
            gap: var(--space-2);
          }
          .hero-ctas :global(.btn) {
            width: 100%;
            padding: 0.8rem 1.1rem;
            font-size: 0.9rem;
          }
          .hero-media {
            grid-area: image;
            position: relative;
            top: auto;
            bottom: auto;
            right: auto;
            width: 100%;
            /* The full, uncropped photo ratio — matched against just the
               badge+heading+subtitle block instead of the whole copy
               column, this is close enough in height that object-fit:
               contain shows the complete image with no meaningful gap. */
            aspect-ratio: 736 / 1024;
            height: auto;
            border-radius: var(--radius-lg);
            overflow: hidden;
          }
          .hero-media :global(img) {
            object-fit: contain;
            object-position: center top;
          }
          .hero-media-fade {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .hero {
            padding: var(--space-6) 0;
          }
        }
        @media (max-width: 480px) {
          .hero-inner {
            gap: var(--space-3);
          }
          .hero-pill {
            font-size: 0.65rem;
            padding: 5px var(--space-2);
          }
          .hero h1 {
            font-size: 1.2rem;
          }
          .hero-subtitle {
            font-size: 0.78rem;
            margin-bottom: 0;
          }
          .hero-trust-item {
            font-size: 0.7rem;
            padding: 6px var(--space-2);
          }
          .hero-trust-icon {
            width: 22px;
            height: 22px;
          }
          .hero-ctas :global(.btn) {
            padding: 0.68rem 0.6rem;
            font-size: 0.8rem;
            gap: 6px;
          }
        }
      `}</style>
    </section>
  );
}
