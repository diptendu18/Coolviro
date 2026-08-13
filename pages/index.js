import SEO from '@/components/seo/SEO';
import Hero from '@/components/home/Hero';
import ServicesGrid from '@/components/home/ServicesGrid';
import HowItWorks from '@/components/home/HowItWorks';
import TrustSection from '@/components/home/TrustSection';
import ServiceAreasPreview from '@/components/home/ServiceAreasPreview';
import QuickInfoBar from '@/components/home/QuickInfoBar';
import ReviewsSection from '@/components/home/ReviewsSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home Appliance Repair & Service in Kolkata"
        description="Coolviro Services offers professional AC, refrigerator, geyser, microwave oven & washing machine repair at your doorstep in Kolkata. 1 Year Service Warranty. Book online, call or WhatsApp."
        path="/"
      />
      <Hero />
      <ServicesGrid />
      <HowItWorks />
      <TrustSection />
      <ServiceAreasPreview />
      <ReviewsSection />
      <FinalCTA />
      <QuickInfoBar />
    </>
  );
}
