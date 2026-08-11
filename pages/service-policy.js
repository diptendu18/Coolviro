import Link from 'next/link';
import SEO from '@/components/seo/SEO';
import LegalLayout from '@/components/legal/LegalLayout';
import { site, howItWorks } from '@/data/site';

export default function ServicePolicyPage() {
  return (
    <>
      <SEO
        title="Service Policy"
        description="Service Policy for Coolviro Services — how booking, pricing, and our 1 Year Service Warranty work for home appliance repair in Kolkata."
        path="/service-policy"
      />
      <LegalLayout title="Service Policy" breadcrumbLabel="Service Policy" path="/service-policy">
        <p>
          This Service Policy explains how booking and service delivery works
          with {site.siteName}.
        </p>

        <h2>How Service Works</h2>
        <ul>
          {howItWorks.map((step) => (
            <li key={step.step}>
              <strong>{step.title}:</strong> {step.description}
            </li>
          ))}
        </ul>

        <h2>Pricing</h2>
        <p>
          Each service on our website is listed with a starting price (for
          example, AC Service &amp; Repair starts at ₹499). This reflects the
          minimum service charge — final pricing depends on the appliance
          issue, parts required, and inspection at your doorstep, and will be
          shared with you before work proceeds.
        </p>

        <h2>Service Warranty</h2>
        <p>
          All repair and service work completed by Coolviro Services is
          covered by a 1 Year Service Warranty on the work performed.
        </p>

        <h2>Rescheduling or Cancelling a Booking</h2>
        <p>
          If you need to reschedule or cancel a booking, please contact us as
          soon as possible by phone or WhatsApp at {site.phoneDisplay}.
        </p>

        <h2>Payment</h2>
        <p>
          This website does not process online payments. Payment for
          completed services is arranged directly with Coolviro Services.
        </p>

        <h2>Service Areas</h2>
        <p>
          We currently serve {site.city} and the areas listed on our{' '}
          <Link href="/areas" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            Service Areas page
          </Link>
          .
        </p>

        <h2>Questions</h2>
        <p>
          If you have any questions about our service policy, reach out to us
          by phone or WhatsApp at {site.phoneDisplay}, or through our{' '}
          <Link href="/contact" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            Contact page
          </Link>
          .
        </p>
      </LegalLayout>
    </>
  );
}
