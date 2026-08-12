// Data-driven brand-page system: derives all 50 brand pages (5 appliance
// categories x 10 brands each) from `services.js` — no per-brand page
// components are hand-written. See pages/services/[category]/[brand].js,
// the single dynamic route that renders all of them via
// BrandServicePageTemplate.

import { services } from './services.js';

export function slugifyBrand(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

// Flat list of every brand page: { service, brand, brandSlug, image }
export const brandPages = services.flatMap((service) =>
  service.brands.map((brand) => {
    const brandSlug = slugifyBrand(brand);
    const logo = service.brandLogos?.find((b) => b.name === brand);
    return {
      service,
      brand,
      brandSlug,
      image: logo ? logo.image : null,
    };
  })
);

export function getBrandPage(urlSegment, brandSlug) {
  return brandPages.find(
    (entry) => entry.service.urlSegment === urlSegment && entry.brandSlug === brandSlug
  );
}

// Every other brand in the same appliance category — used for the
// "Other <Appliance> Brands We Service" cross-linking section.
export function getOtherBrandsInCategory(urlSegment, excludeBrandSlug) {
  return brandPages.filter(
    (entry) => entry.service.urlSegment === urlSegment && entry.brandSlug !== excludeBrandSlug
  );
}

export function getAllBrandPagePaths() {
  return brandPages.map((entry) => ({
    params: { category: entry.service.urlSegment, brand: entry.brandSlug },
  }));
}
