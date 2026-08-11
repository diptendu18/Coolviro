import Link from 'next/link';
import SEO from '@/components/seo/SEO';
import LegalLayout from '@/components/legal/LegalLayout';
import { site } from '@/data/site';

export default function TermsConditionsPage() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Terms & Conditions for using the Coolviro Services website and booking home appliance repair services in Kolkata."
        path="/terms-conditions"
      />
      <LegalLayout title="Terms & Conditions" breadcrumbLabel="Terms & Conditions" path="/terms-conditions">
        <p>
          These Terms &amp; Conditions govern your use of the {site.siteName}{' '}
          website and the booking of home appliance repair services from
          Coolviro. By using this website or submitting a booking, you agree
          to these terms.
        </p>

        <h2>Booking Requests</h2>
        <p>
          Submitting the booking form or contacting us by phone or WhatsApp
          is a request for service, not a guaranteed appointment until we
          confirm your booking with you.
        </p>

        <h2>Pricing</h2>
        <p>
          Prices shown on this website (e.g. &quot;Starting at ₹499&quot;) are
          starting prices only. The final cost of a repair depends on the
          specific issue, parts required and on-site inspection, and will be
          communicated to you before work is completed.
        </p>

        <h2>Service Warranty</h2>
        <p>
          Repairs and services completed by Coolviro Services are covered by
          a 1 Year Service Warranty on the work performed.
        </p>

        <h2>No Online Payments</h2>
        <p>
          This website does not process online payments. Any payment for
          completed services is arranged directly between the customer and
          Coolviro Services.
        </p>

        <h2>Service Areas</h2>
        <p>
          We currently provide doorstep service across the areas listed on
          our{' '}
          <Link href="/areas" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            Service Areas page
          </Link>
          . Availability outside these areas may vary.
        </p>

        <h2>Website Use</h2>
        <p>
          You agree to use this website for lawful purposes and to provide
          accurate information when submitting a booking request.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          While we aim to provide reliable and professional service, Coolviro
          Services is not liable for indirect or incidental issues arising
          from appliance use outside the scope of the service performed.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these Terms &amp; Conditions from time to time.
          Continued use of the website after changes constitutes acceptance
          of the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these terms, contact us by phone or WhatsApp at{' '}
          {site.phoneDisplay}.
        </p>
      </LegalLayout>
    </>
  );
}
