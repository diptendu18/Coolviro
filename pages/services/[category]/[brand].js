import BrandServicePageTemplate from '@/components/services/BrandServicePageTemplate';
import { getBrandPage, getOtherBrandsInCategory, getAllBrandPagePaths } from '@/data/brandPages';

export default function BrandServicePage({ brandPage }) {
  return <BrandServicePageTemplate brandPage={brandPage} />;
}

export function getStaticPaths() {
  return {
    paths: getAllBrandPagePaths(),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const entry = getBrandPage(params.category, params.brand);
  if (!entry) {
    return { notFound: true };
  }

  const otherBrands = getOtherBrandsInCategory(params.category, params.brand).map((b) => ({
    brand: b.brand,
    brandSlug: b.brandSlug,
  }));

  return {
    props: {
      brandPage: {
        service: entry.service,
        brand: entry.brand,
        brandSlug: entry.brandSlug,
        image: entry.image,
        otherBrands,
      },
    },
  };
}
