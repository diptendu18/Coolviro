import Image from 'next/image';

// Official Coolviro Services logo, cropped from the brand artwork supplied
// by the client (public/images/brand/coolviro-brand-artwork-source.png) —
// see that file for the untouched original. This crop keeps only the
// logo mark itself (crescent, wave, snowflake, "Coolviro Services"
// wordmark); the technician photo and marketing copy from the source
// artwork are intentionally excluded from anything rendered on the site.
const LOGO_SRC = '/images/brand/coolviro-logo.png';
const LOGO_WIDTH = 850;
const LOGO_HEIGHT = 340;

/**
 * `size` sets the logo's rendered height in px at desktop width; it scales
 * down automatically on narrower screens while width is always derived
 * from the image's real aspect ratio, so it can never stretch or distort.
 */
export default function Logo({ size = 40, className = '', priority = false }) {
  return (
    <span className={className} style={{ '--logo-h': `${size}px` }}>
      <Image
        src={LOGO_SRC}
        alt="Coolviro Services - Home Appliance Repair & Service"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        className="brand-logo-img"
      />
      <style jsx>{`
        span {
          display: inline-flex;
          align-items: center;
        }
        span :global(.brand-logo-img) {
          height: var(--logo-h);
          width: auto;
          max-width: 100%;
          object-fit: contain;
          display: block;
        }
        @media (max-width: 640px) {
          span {
            --logo-h: calc(${size}px * 0.8);
          }
        }
      `}</style>
    </span>
  );
}
