import SEO from '@/components/seo/SEO';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ReviewForm from '@/components/reviews/ReviewForm';

export default function WriteAReviewPage() {
  return (
    <>
      <SEO
        title="Write a Review"
        description="Share your genuine experience with Coolviro Services home appliance repair in Kolkata. Reviews are checked by our team before appearing on the site."
        path="/write-a-review"
      />
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Write a Review', href: '/write-a-review' }]} />
      </div>

      <section className="section--tight">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Share Your Experience</span>
            <h1>Write a Review</h1>
            <p>
              Tell other customers about your experience with Coolviro
              Services. We only publish genuine reviews from real customers —
              yours will be checked by our team before it appears on the
              site.
            </p>
          </div>

          <div className="card review-form-card">
            <ReviewForm />
          </div>
        </div>
      </section>

      <style jsx>{`
        .review-form-card {
          max-width: 640px;
          margin: 0 auto;
          padding: var(--space-6);
        }
        @media (max-width: 640px) {
          .review-form-card {
            padding: var(--space-5) var(--space-4);
          }
        }
      `}</style>
    </>
  );
}
