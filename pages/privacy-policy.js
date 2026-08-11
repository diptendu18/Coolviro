import SEO from '@/components/seo/SEO';
import LegalLayout from '@/components/legal/LegalLayout';
import { site } from '@/data/site';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Coolviro Services — how we collect and use information submitted through our website booking form."
        path="/privacy-policy"
      />
      <LegalLayout title="Privacy Policy" breadcrumbLabel="Privacy Policy" path="/privacy-policy">
        <p>
          This Privacy Policy explains how {site.siteName} (&quot;Coolviro&quot;,
          &quot;we&quot;, &quot;us&quot;) handles information collected through this
          website.
        </p>

        <h2>Information We Collect</h2>
        <p>When you submit our booking form, we collect the following information:</p>
        <ul>
          <li>Customer name</li>
          <li>Mobile number</li>
          <li>Selected service and appliance type</li>
          <li>Pincode and address</li>
        </ul>
        <p>
          We do not ask for or collect your email address, payment details, or
          any other information through the booking form.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          Booking details you submit are sent securely to our team so that we
          can contact you regarding your service request. We use this
          information solely to fulfil and manage your booking — we do not
          sell or rent your personal information to third parties.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Booking submissions are delivered using a third-party email
          delivery service. If Google Analytics is enabled on this website,
          it may collect anonymous usage data (such as pages visited) to help
          us understand website traffic; this only occurs if a valid
          Analytics configuration is present.
        </p>

        <h2>Data Storage</h2>
        <p>
          This website does not maintain a customer database or admin
          system. Booking submissions are transmitted by email and are not
          stored on the website itself.
        </p>

        <h2>Online Payments</h2>
        <p>
          This website does not collect payment information or process
          online payments of any kind.
        </p>

        <h2>Your Choices</h2>
        <p>
          If you have questions about how your information is handled, or
          would like it removed from our records, please contact us by phone
          or WhatsApp at {site.phoneDisplay}.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will
          be posted on this page.
        </p>
      </LegalLayout>
    </>
  );
}
