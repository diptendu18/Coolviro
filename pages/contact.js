import SEO from '@/components/seo/SEO';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { PhoneIcon, WhatsappIcon, ClockIcon } from '@/components/ui/Icons';
import { CallButton, WhatsappButton, BookButton } from '@/components/ui/CTAButtons';
import { site } from '@/data/site';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact Coolviro Services for home appliance repair in Kolkata. Call or WhatsApp +91 79803 49872, or book a service online. Open 10:00 AM – 8:00 PM."
        path="/contact"
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]} />
      </div>

      <section className="section--tight">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Get In Touch</span>
            <h1>Contact Coolviro Services</h1>
            <p>Reach out to book a home appliance repair or ask a question — we&apos;re happy to help.</p>
          </div>

          <div className="grid grid-3 contact-grid">
            <div className="card contact-card">
              <span className="contact-icon">
                <PhoneIcon width="26" height="26" />
              </span>
              <h2>Call Us</h2>
              <p>{site.phoneDisplay}</p>
              <CallButton block />
            </div>
            <div className="card contact-card">
              <span className="contact-icon">
                <WhatsappIcon width="26" height="26" />
              </span>
              <h2>WhatsApp Us</h2>
              <p>{site.whatsappDisplay}</p>
              <WhatsappButton block />
            </div>
            <div className="card contact-card">
              <span className="contact-icon">
                <ClockIcon width="26" height="26" />
              </span>
              <h2>Working Hours</h2>
              <p>{site.workingHours}</p>
              <BookButton block variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-grid {
          max-width: 960px;
          margin: 0 auto;
        }
        .contact-card {
          padding: var(--space-7) var(--space-6);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
        }
        .contact-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--color-bg-section);
          color: var(--color-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-2);
        }
        .contact-card h2 {
          font-size: 1.15rem;
          margin-bottom: 0;
        }
        .contact-card p {
          font-weight: 700;
          color: var(--color-text);
          font-size: 1.05rem;
          margin-bottom: var(--space-3);
        }
        .contact-card :global(.btn) {
          width: 100%;
        }
      `}</style>
    </>
  );
}
