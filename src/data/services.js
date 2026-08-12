// Central source of truth for all service offerings.
// Pricing shown is a starting price only — actual cost depends on the
// appliance issue, parts required, and inspection. Do not add facts
// (certifications, brand authorization, exact response times) beyond
// what has been verified.

export const services = [
  {
    slug: 'ac-service',
    name: 'AC Service & Repair',
    shortName: 'AC',
    icon: 'ac',
    startingPrice: 499,
    priceDisplay: 'Starting at ₹499',
    metaTitle: 'AC Repair & Service in Kolkata | Coolviro Services',
    metaDescription:
      'Professional AC service and repair in Kolkata & nearby areas — Split and Window ACs, all major brands, doorstep service, 1 Year Service Warranty. Book online or call now.',
    heroSubtitle:
      'Doorstep AC service and repair for Split and Window ACs across Kolkata, backed by a 1 Year Service Warranty.',
    cardDescription:
      'Split & window AC service, repair, gas issues and cooling problems — doorstep service across Kolkata.',
    overview:
      'Coolviro Services provides professional AC service and repair at your doorstep in Kolkata and nearby areas. Our technicians work on Split and Window air conditioners, helping with cooling issues, servicing and general repairs, so your AC runs reliably through the season.',
    types: ['Split', 'Window'],
    brands: [
      'Daikin',
      'LG',
      'Samsung',
      'Voltas',
      'Blue Star',
      'Carrier',
      'Hitachi',
      'Panasonic',
      'Godrej',
      'Lloyd',
    ],
    // Optional: only AC has real per-brand product images. When present,
    // ServicePageTemplate renders an image-card grid for "Supported
    // Brands" instead of the plain text-chip list used by every other
    // service (which has no images and is intentionally unaffected).
    brandLogos: [
      { name: 'Daikin', image: '/images/brand/daikin-ac.webp' },
      { name: 'LG', image: '/images/brand/lg-ac.webp' },
      { name: 'Samsung', image: '/images/brand/samsung-ac.webp' },
      { name: 'Voltas', image: '/images/brand/voltas-ac.webp' },
      { name: 'Blue Star', image: '/images/brand/blue-star-ac.webp' },
      { name: 'Carrier', image: '/images/brand/carrier-ac.webp' },
      { name: 'Hitachi', image: '/images/brand/hitachi-ac.webp' },
      { name: 'Panasonic', image: '/images/brand/panasonic-ac.webp' },
      { name: 'Godrej', image: '/images/brand/godrej-ac.webp' },
      { name: 'Lloyd', image: '/images/brand/lloyd-ac.webp' },
    ],
    faqs: [
      {
        q: 'Which types of AC do you service?',
        a: 'We service both Split AC and Window AC units.',
      },
      {
        q: 'Which AC brands do you support?',
        a: 'We service a wide range of leading AC brands including Daikin, LG, Samsung, Voltas, Blue Star, Carrier, Hitachi, Panasonic, Godrej and Lloyd.',
      },
      {
        q: 'How much does AC service cost?',
        a: 'AC service starts at ₹499. The final cost depends on the specific issue, parts required and inspection findings.',
      },
      {
        q: 'Do you provide a warranty on AC repair?',
        a: 'Yes, our AC service and repair work is covered by a 1 Year Service Warranty.',
      },
      {
        q: 'How do I book an AC service in Kolkata?',
        a: 'You can book online using our booking form, or simply call or WhatsApp us at +91 82401 06770.',
      },
    ],
  },
  {
    slug: 'refrigerator-service',
    name: 'Refrigerator Service & Repair',
    shortName: 'Refrigerator',
    icon: 'fridge',
    startingPrice: 699,
    priceDisplay: 'Starting at ₹699',
    metaTitle: 'Refrigerator & Fridge Repair in Kolkata | Coolviro Services',
    metaDescription:
      'Reliable refrigerator and fridge repair in Kolkata — Single Door, Double Door and Side-by-Side, all major brands, doorstep service, 1 Year Service Warranty.',
    heroSubtitle:
      'Doorstep refrigerator service and repair for Single Door, Double Door and Side-by-Side fridges across Kolkata.',
    cardDescription:
      'Single door, double door & side-by-side fridge repair and service — doorstep service across Kolkata.',
    overview:
      'Coolviro Services offers professional refrigerator service and repair at your doorstep in Kolkata and nearby areas. Our technicians work on Single Door, Double Door and Side-by-Side refrigerators to help resolve cooling and performance issues.',
    types: ['Single Door', 'Double Door', 'Side-by-Side'],
    brands: [
      'LG',
      'Samsung',
      'Whirlpool',
      'Godrej',
      'Haier',
      'Panasonic',
      'Voltas Beko',
      'IFB',
      'Bosch',
      'Lloyd',
    ],
    faqs: [
      {
        q: 'Which types of refrigerators do you service?',
        a: 'We service Single Door, Double Door and Side-by-Side refrigerators.',
      },
      {
        q: 'Which refrigerator brands do you support?',
        a: 'We service a wide range of leading refrigerator brands including LG, Samsung, Whirlpool, Godrej, Haier, Panasonic, Voltas Beko, IFB, Bosch and Lloyd.',
      },
      {
        q: 'How much does refrigerator service cost?',
        a: 'Refrigerator service starts at ₹699. The final cost depends on the specific issue, parts required and inspection findings.',
      },
      {
        q: 'Do you provide a warranty on refrigerator repair?',
        a: 'Yes, our refrigerator service and repair work is covered by a 1 Year Service Warranty.',
      },
      {
        q: 'How do I book a refrigerator repair in Kolkata?',
        a: 'You can book online using our booking form, or simply call or WhatsApp us at +91 82401 06770.',
      },
    ],
  },
  {
    slug: 'geyser-service',
    name: 'Geyser Service & Repair',
    shortName: 'Geyser',
    icon: 'geyser',
    startingPrice: 599,
    priceDisplay: 'Starting at ₹599',
    metaTitle: 'Geyser Repair & Service in Kolkata | Coolviro Services',
    metaDescription:
      'Trusted geyser repair and service in Kolkata — Storage and Instant geysers, all major brands, doorstep service, 1 Year Service Warranty. Book online or call now.',
    heroSubtitle:
      'Doorstep geyser service and repair for Storage and Instant geysers across Kolkata.',
    cardDescription:
      'Storage & instant geyser service and repair — doorstep service across Kolkata.',
    overview:
      'Coolviro Services provides professional geyser service and repair at your doorstep in Kolkata and nearby areas. Our technicians work on Storage and Instant geysers to help resolve heating and performance issues.',
    types: ['Storage', 'Instant'],
    brands: [
      'AO Smith',
      'Racold',
      'Havells',
      'Bajaj',
      'V-Guard',
      'Crompton',
      'Orient Electric',
      'Usha',
      'Hindware',
      'Venus',
    ],
    faqs: [
      {
        q: 'Which types of geysers do you service?',
        a: 'We service both Storage geysers and Instant geysers.',
      },
      {
        q: 'Which geyser brands do you support?',
        a: 'We service a wide range of leading geyser brands including AO Smith, Racold, Havells, Bajaj, V-Guard, Crompton, Orient Electric, Usha, Hindware and Venus.',
      },
      {
        q: 'How much does geyser service cost?',
        a: 'Geyser service starts at ₹599. The final cost depends on the specific issue, parts required and inspection findings.',
      },
      {
        q: 'Do you provide a warranty on geyser repair?',
        a: 'Yes, our geyser service and repair work is covered by a 1 Year Service Warranty.',
      },
      {
        q: 'How do I book a geyser repair in Kolkata?',
        a: 'You can book online using our booking form, or simply call or WhatsApp us at +91 82401 06770.',
      },
    ],
  },
  {
    slug: 'microwave-oven-service',
    name: 'Microwave Oven Service & Repair',
    shortName: 'Microwave Oven',
    icon: 'microwave',
    startingPrice: 499,
    priceDisplay: 'Starting at ₹499',
    metaTitle: 'Microwave Oven Repair in Kolkata | Coolviro Services',
    metaDescription:
      'Professional microwave oven repair and service in Kolkata — Solo, Grill and Convection ovens, all major brands, doorstep service, 1 Year Service Warranty.',
    heroSubtitle:
      'Doorstep microwave oven service and repair for Solo, Grill and Convection ovens across Kolkata.',
    cardDescription:
      'Solo, grill & convection microwave oven repair and service — doorstep service across Kolkata.',
    overview:
      'Coolviro Services offers professional microwave oven service and repair at your doorstep in Kolkata and nearby areas. Our technicians work on Solo, Grill and Convection microwave ovens to help resolve heating and performance issues.',
    types: ['Solo', 'Grill', 'Convection'],
    brands: [
      'LG',
      'Samsung',
      'IFB',
      'Panasonic',
      'Godrej',
      'Whirlpool',
      'Haier',
      'Bajaj',
      'Morphy Richards',
      'Bosch',
    ],
    faqs: [
      {
        q: 'Which types of microwave ovens do you service?',
        a: 'We service Solo, Grill and Convection microwave ovens.',
      },
      {
        q: 'Which microwave oven brands do you support?',
        a: 'We service a wide range of leading microwave oven brands including LG, Samsung, IFB, Panasonic, Godrej, Whirlpool, Haier, Bajaj, Morphy Richards and Bosch.',
      },
      {
        q: 'How much does microwave oven service cost?',
        a: 'Microwave oven service starts at ₹499. The final cost depends on the specific issue, parts required and inspection findings.',
      },
      {
        q: 'Do you provide a warranty on microwave oven repair?',
        a: 'Yes, our microwave oven service and repair work is covered by a 1 Year Service Warranty.',
      },
      {
        q: 'How do I book a microwave oven repair in Kolkata?',
        a: 'You can book online using our booking form, or simply call or WhatsApp us at +91 82401 06770.',
      },
    ],
  },
  {
    slug: 'washing-machine-service',
    name: 'Washing Machine Service & Repair',
    shortName: 'Washing Machine',
    icon: 'washingMachine',
    startingPrice: 699,
    priceDisplay: 'Starting at ₹699',
    metaTitle: 'Washing Machine Repair in Kolkata | Coolviro Services',
    metaDescription:
      'Expert washing machine repair and service in Kolkata — Front Load, Top Load, Semi & Fully Automatic, all major brands, doorstep service, 1 Year Service Warranty.',
    heroSubtitle:
      'Doorstep washing machine service and repair for Front Load, Top Load, Semi Automatic and Fully Automatic machines across Kolkata.',
    cardDescription:
      'Front load, top load, semi & fully automatic washing machine repair — doorstep service across Kolkata.',
    overview:
      'Coolviro Services provides professional washing machine service and repair at your doorstep in Kolkata and nearby areas. Our technicians work on Front Load, Top Load, Semi Automatic and Fully Automatic washing machines to help resolve performance issues.',
    types: ['Front Load', 'Top Load', 'Semi Automatic', 'Fully Automatic'],
    brands: [
      'LG',
      'Samsung',
      'Whirlpool',
      'IFB',
      'Bosch',
      'Haier',
      'Panasonic',
      'Godrej',
      'Voltas Beko',
      'Lloyd',
    ],
    faqs: [
      {
        q: 'Which types of washing machines do you service?',
        a: 'We service Front Load, Top Load, Semi Automatic and Fully Automatic washing machines.',
      },
      {
        q: 'Which washing machine brands do you support?',
        a: 'We service a wide range of leading washing machine brands including LG, Samsung, Whirlpool, IFB, Bosch, Haier, Panasonic, Godrej, Voltas Beko and Lloyd.',
      },
      {
        q: 'How much does washing machine service cost?',
        a: 'Washing machine service starts at ₹699. The final cost depends on the specific issue, parts required and inspection findings.',
      },
      {
        q: 'Do you provide a warranty on washing machine repair?',
        a: 'Yes, our washing machine service and repair work is covered by a 1 Year Service Warranty.',
      },
      {
        q: 'How do I book a washing machine repair in Kolkata?',
        a: 'You can book online using our booking form, or simply call or WhatsApp us at +91 82401 06770.',
      },
    ],
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);

export const applianceTypesByServiceName = services.reduce((acc, s) => {
  acc[s.name] = s.types;
  return acc;
}, {});

export const serviceNameOptions = services.map((s) => s.name);

export const brandDisclaimer =
  'We service appliances from a wide range of leading brands. Coolviro Services is an independent appliance repair service and is not an authorized service center or official partner of any brand named above.';
