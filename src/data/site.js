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
  { label: 'Services', href: '/services' },
  { label: 'Areas', href: '/areas' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Areas', href: '/areas' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerLegalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
  { label: 'Service Policy', href: '/service-policy' },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Book a Service',
    description: 'Fill out the online booking form or call/WhatsApp us with your appliance issue and address.',
  },
  {
    step: '02',
    title: 'Booking Confirmation',
    description: 'We review your request and confirm your service booking details.',
  },
  {
    step: '03',
    title: 'Technician Visit',
    description: 'A technician visits your doorstep in Kolkata to inspect and service your appliance.',
  },
  {
    step: '04',
    title: 'Service Completed',
    description: 'Your appliance is repaired and serviced, backed by our 1 Year Service Warranty.',
  },
];

export const trustHighlights = [
  { label: '10 Years Experienced Technicians', icon: 'experience' },
  { label: '500+ Customers Served', icon: 'customers' },
  { label: '1 Year Service Warranty', icon: 'warranty' },
  { label: 'Doorstep Service', icon: 'doorstep' },
];
