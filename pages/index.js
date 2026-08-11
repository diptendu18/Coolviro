import SEO from '@/components/seo/SEO';
import Hero from '@/components/home/Hero';
import TrustSection from '@/components/home/TrustSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import HowItWorks from '@/components/home/HowItWorks';
import ServiceAreasPreview from '@/components/home/ServiceAreasPreview';
import ReviewsSection from '@/components/home/ReviewsSection';
import BookingSection from '@/components/booking/BookingSection';
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
      <TrustSection />
      <ServicesGrid />
      <HowItWorks />
      <ServiceAreasPreview />
      <ReviewsSection />
      <BookingSection />
      <FinalCTA />
    </>
  );
}
