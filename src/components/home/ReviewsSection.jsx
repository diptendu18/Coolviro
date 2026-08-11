import { SparklesIcon } from '@/components/ui/Icons';
import { BookButton } from '@/components/ui/CTAButtons';

export default function ReviewsSection() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Customer Reviews</span>
          <h2>What Our Customers Say</h2>
        </div>
        <div className="reviews-placeholder card">
          <span className="reviews-icon">
            <SparklesIcon />
          </span>
          <h3>We&apos;re Just Getting Started</h3>
          <p>
            We&apos;re collecting genuine feedback from our customers. Real
            reviews will appear here as they come in — we don&apos;t publish
            invented testimonials or ratings.
          </p>
          <BookButton variant="secondary" label="Book Your First Service" />
        </div>
      </div>
      <style jsx>{`
        .reviews-placeholder {
          max-width: 620px;
          margin: 0 auto;
          text-align: center;
          padding: var(--space-7) var(--space-6);
        }
        .reviews-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--color-bg-section);
          color: var(--color-primary);
          margin-bottom: var(--space-4);
        }
        .reviews-placeholder p {
          margin-bottom: var(--space-5);
        }
      `}</style>
    </section>
  );
}
