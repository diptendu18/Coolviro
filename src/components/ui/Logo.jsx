/**
 * Placeholder brand mark for Coolviro Services.
 *
 * No official logo file was found in the project assets, so this is a
 * clean SVG wordmark built from the brand colors, used consistently across
 * the header, mobile menu, and footer. Replace the <IconMark>/wordmark
 * markup below with an <img src="/images/brand/logo.svg" /> pointing at
 * the official logo once it is added to /public/images/brand/.
 */
function IconMark({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="coolviro-icon-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0066FF" />
          <stop offset="1" stopColor="#00C2FF" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#coolviro-icon-g)" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="30"
        fill="#ffffff"
      >
        C
      </text>
      <path
        d="M47 15 L47 21 M44 18 L50 18 M45.3 16.3 L48.7 19.7 M48.7 16.3 L45.3 19.7"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ variant = 'full', size = 40, className = '' }) {
  if (variant === 'icon') {
    return (
      <span className={className}>
        <IconMark size={size} />
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
    >
      <IconMark size={size} />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontWeight: 800, fontSize: `${size * 0.5}px`, letterSpacing: '-0.01em' }}>
          <span style={{ color: '#0a2472' }}>Cool</span>
          <span style={{ color: 'var(--color-primary, #0066FF)' }}>viro</span>
        </span>
        <span
          style={{
            fontWeight: 700,
            fontSize: `${size * 0.19}px`,
            letterSpacing: '0.22em',
            color: 'var(--color-text-muted, #475569)',
            marginTop: '2px',
          }}
        >
          SERVICES
        </span>
      </span>
    </span>
  );
}
