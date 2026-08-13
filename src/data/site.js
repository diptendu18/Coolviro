// Central source of truth for verified business information.
// Do not add unverified facts (address, ratings, awards, certifications, etc.)

export const site = {
  businessName: 'Coolviro',
  siteName: 'Coolviro Services',
  tagline: 'Fast, Reliable & Professional Home Appliance Repair',
  city: 'Kolkata',
  region: 'West Bengal',
  country: 'India',

  phoneDisplay: '+91 82401 06770',
  phoneHref: 'tel:+918240106770',
  whatsappDisplay: '+91 82401 06770',
  whatsappHref: 'https://wa.me/918240106770',
  whatsappHrefWithText: (text) =>
    `https://wa.me/918240106770${text ? `?text=${encodeURIComponent(text)}` : ''}`,

  workingHours: '10:00 AM – 8:00 PM',
  workingDaysNote: 'Open all week, 10:00 AM – 8:00 PM',

  experienceHighlight: '10 Years Experienced Technicians',
  customersHighlight: '500+ Customers Served',
  warrantyHighlight: '1 Year Service Warranty',

  // NOTE: production domain is not purchased yet. Set SITE_URL in your
  // environment before deploying — see README.md and .env.example.
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    'https://your-production-domain-example.com',

  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',

  // Base URL of the PHP review backend (hosted on Hostinger, not this
  // Next.js app) — e.g. "https://coolviroservices.com/reviews-backend".
  // No trailing slash. Left unset, the review system is simply hidden:
  // the homepage falls back to its "Your Feedback Matters to Us" message
  // and the review submission page explains reviews aren't open yet.
  // See reviews-backend/README.md for full setup instructions.
  reviewsApiUrl: (process.env.NEXT_PUBLIC_REVIEWS_API_URL || '').replace(/\/$/, ''),
};

export const serviceAreas = [
  'Salt Lake',
  'New Town',
  'Kasba',
  'Park Street',
  'Belgharia',
  'Ballygunge',
  'Jadavpur',
  'Dum Dum',
  'Barasat',
  'Barrackpore',
];

export const mainNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Brands', href: '/brands' },
  { label: 'Service Areas', href: '/areas' },
  { label: 'Contact Us', href: '/contact' },
];

export const footerNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Brands', href: '/brands' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Write a Review', href: '/write-a-review' },
];

export const footerLegalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
  { label: 'Service Policy', href: '/service-policy' },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Book Service',
    description: 'Fill out the online booking form or call/WhatsApp us with your appliance issue and address.',
  },
  {
    step: '02',
    title: 'Technician Visit',
    description: 'A technician visits your doorstep in Kolkata at the scheduled time.',
  },
  {
    step: '03',
    title: 'Diagnosis',
    description: 'We inspect your appliance and identify the issue accurately.',
  },
  {
    step: '04',
    title: 'Repair',
    description: 'We repair your appliance using genuine parts and the right tools.',
  },
  {
    step: '05',
    title: 'Service Complete',
    description: 'Your appliance is fully working again, backed by our 1 Year Service Warranty.',
  },
];

export const trustHighlights = [
  { title: '10 Years', subtitle: 'Experienced Technicians', icon: 'experience' },
  { title: '500+', subtitle: 'Customers Served', icon: 'customers' },
  { title: 'Doorstep', subtitle: 'Service', icon: 'doorstep' },
  { title: 'Genuine', subtitle: 'Parts Guaranteed', icon: 'parts' },
  { title: '1 Year', subtitle: 'Service Warranty', icon: 'warranty' },
  { title: 'Affordable', subtitle: 'Pricing', icon: 'pricing' },
];

// Service-information blocks shown in the Contact / Service Information
// section immediately before the footer (see QuickInfoBar.jsx).
export const quickInfo = [
  {
    icon: 'areas',
    title: 'Service Areas',
    description: `We provide our services all over ${site.city} and nearby areas.`,
    linkLabel: 'View Areas',
    linkHref: '/areas',
  },
  {
    icon: 'hours',
    title: 'Working Hours',
    description: `Open every day, ${site.workingHours}.`,
  },
  {
    icon: 'help',
    title: 'Need Help?',
    description: 'Call or WhatsApp us anytime for booking or any queries.',
    linkLabel: site.phoneDisplay,
    linkHref: site.phoneHref,
    whatsappHref: site.whatsappHref,
  },
  {
    icon: 'book',
    title: 'Book Your Service',
    description: 'Quick & easy online booking — our technician will reach you soon.',
    linkLabel: 'Book Now',
    linkHref: '/booking',
  },
];
