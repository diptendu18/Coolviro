/**
 * Placeholder appliance illustrations used on service cards and service
 * page heroes. These are clean, on-brand vector graphics — not photographs
 * — so the site never presents an image as something it isn't.
 *
 * To replace with real photography later: drop optimized WebP/AVIF files
 * into /public/images/services/ (e.g. ac-service.webp) and swap the
 * <ApplianceArt type="ac" /> usage for a Next <Image> pointing at the file.
 * See README.md "Image Replacement" for full instructions.
 */

const PALETTE = {
  bg: '#eaf5ff',
  body: '#ffffff',
  line: '#0a2472',
  accent: '#0066ff',
  accent2: '#00c2ff',
};

function Frame({ children, label }) {
  return (
    <svg
      viewBox="0 0 200 150"
      width="100%"
      height="100%"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="200" height="150" rx="18" fill={PALETTE.bg} />
      {children}
    </svg>
  );
}

function ACArt() {
  return (
    <Frame label="Split air conditioner illustration">
      <rect x="40" y="48" width="120" height="34" rx="10" fill={PALETTE.body} stroke={PALETTE.line} strokeWidth="2" />
      <rect x="52" y="58" width="96" height="4" rx="2" fill={PALETTE.accent2} />
      <rect x="52" y="67" width="96" height="4" rx="2" fill={PALETTE.accent2} opacity="0.6" />
      <circle cx="146" cy="56" r="3" fill={PALETTE.accent} />
      <path d="M70 88c4 10 4 18 0 26M100 88c4 12 4 20 0 30M130 88c4 10 4 18 0 26" stroke={PALETTE.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <g transform="translate(150,102)" stroke={PALETTE.accent} strokeWidth="1.6" strokeLinecap="round">
        <path d="M0 -7v14M-6 -3.5 6 3.5M6 -3.5 -6 3.5" />
      </g>
    </Frame>
  );
}

function FridgeArt() {
  return (
    <Frame label="Refrigerator illustration">
      <rect x="72" y="18" width="56" height="112" rx="10" fill={PALETTE.body} stroke={PALETTE.line} strokeWidth="2" />
      <line x1="72" y1="58" x2="128" y2="58" stroke={PALETTE.line} strokeWidth="2" />
      <rect x="118" y="30" width="4" height="18" rx="2" fill={PALETTE.accent} />
      <rect x="118" y="68" width="4" height="26" rx="2" fill={PALETTE.accent} />
      <circle cx="100" cy="43" r="2.4" fill={PALETTE.accent2} />
    </Frame>
  );
}

function GeyserArt() {
  return (
    <Frame label="Water geyser illustration">
      <rect x="78" y="16" width="44" height="112" rx="20" fill={PALETTE.body} stroke={PALETTE.line} strokeWidth="2" />
      <rect x="86" y="34" width="28" height="6" rx="3" fill={PALETTE.accent2} />
      <circle cx="100" cy="56" r="7" fill="none" stroke={PALETTE.accent} strokeWidth="2" />
      <path d="M100 96c6 0 10 4.5 10 9.5S106 116 100 116s-10-5-10-10.5S94 96 100 96Z" fill={PALETTE.accent2} opacity="0.85" />
    </Frame>
  );
}

function MicrowaveArt() {
  return (
    <Frame label="Microwave oven illustration">
      <rect x="36" y="44" width="128" height="62" rx="10" fill={PALETTE.body} stroke={PALETTE.line} strokeWidth="2" />
      <rect x="46" y="54" width="80" height="42" rx="6" fill="#eaf5ff" stroke={PALETTE.line} strokeWidth="1.6" />
      <line x1="70" y1="54" x2="70" y2="96" stroke={PALETTE.line} strokeWidth="1.2" opacity="0.3" />
      <line x1="94" y1="54" x2="94" y2="96" stroke={PALETTE.line} strokeWidth="1.2" opacity="0.3" />
      <rect x="134" y="58" width="20" height="10" rx="2" fill={PALETTE.accent2} />
      <circle cx="144" cy="82" r="7" fill="none" stroke={PALETTE.accent} strokeWidth="2" />
    </Frame>
  );
}

function WashingMachineArt() {
  return (
    <Frame label="Washing machine illustration">
      <rect x="58" y="14" width="84" height="112" rx="12" fill={PALETTE.body} stroke={PALETTE.line} strokeWidth="2" />
      <rect x="68" y="22" width="64" height="10" rx="4" fill="#eaf5ff" stroke={PALETTE.line} strokeWidth="1.4" />
      <circle cx="76" cy="27" r="2" fill={PALETTE.accent2} />
      <circle cx="100" cy="76" r="30" fill="#eaf5ff" stroke={PALETTE.line} strokeWidth="2" />
      <circle cx="100" cy="76" r="21" fill="none" stroke={PALETTE.accent} strokeWidth="2.4" />
      <path d="M88 76a12 12 0 0 1 20-9" fill="none" stroke={PALETTE.accent2} strokeWidth="2.4" strokeLinecap="round" />
    </Frame>
  );
}

const ART_MAP = {
  ac: ACArt,
  fridge: FridgeArt,
  geyser: GeyserArt,
  microwave: MicrowaveArt,
  washingMachine: WashingMachineArt,
};

export default function ApplianceArt({ type, className = '' }) {
  const Art = ART_MAP[type];
  if (!Art) return null;
  return (
    <div className={className} style={{ aspectRatio: '4 / 3', width: '100%' }}>
      <Art />
    </div>
  );
}
