import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SparklesIcon } from '@/components/ui/Icons';
import { BookButton } from '@/components/ui/CTAButtons';
import { site } from '@/data/site';

function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!site.reviewsApiUrl) {
      setLoaded(true);
      return;
    }

    let cancelled = false;

    fetch(`${site.reviewsApiUrl}/api/get_reviews.php?limit=9`)
      .then((res) => (res.ok ? res.json() : { success: false }))
      .then((data) => {
        if (!cancelled && data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {
        // Silently fall back to the placeholder state — a broken/offline
        // review backend should never break the homepage.
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const hasReviews = loaded && reviews.length > 0;

  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Customer Reviews</span>
          <h2>What Our Customers Say</h2>
        </div>

        {hasReviews ? (
          <>
            <div className="grid grid-3 reviews-grid">
              {reviews.map((review) => (
                <div className="card review-card" key={review.id}>
                  <Stars rating={review.rating} />
                  <p className="review-text">&ldquo;{review.reviewText}&rdquo;</p>
                  {review.photoUrl && (
                    <div className="review-photo-wrap">
                      <Image
                        src={review.photoUrl}
                        alt={`Photo shared by ${review.customerName} with their review`}
                        width={400}
                        height={280}
                        loading="lazy"
                        unoptimized
                        sizes="(max-width: 640px) 90vw, 300px"
                      />
                    </div>
                  )}
                  <div className="review-footer">
                    <span className="review-name">{review.customerName}</span>
                    <span className="review-service">{review.serviceUsed}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="reviews-cta">
              <Link href="/write-a-review" className="btn btn-secondary">
                Write a Review
              </Link>
            </div>
          </>
        ) : (
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
            <div className="reviews-placeholder-ctas">
              <Link href="/write-a-review" className="btn btn-secondary">
                Write a Review
              </Link>
              <BookButton label="Book Your First Service" />
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .reviews-grid {
          margin-bottom: var(--space-6);
        }
        .review-card {
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          min-width: 0;
        }
        .stars {
          color: #f59e0b;
          letter-spacing: 2px;
          font-size: 1.1rem;
        }
        .review-text {
          margin: 0;
          flex-grow: 1;
        }
        .review-photo-wrap {
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 4 / 3;
        }
        .review-photo-wrap :global(img) {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: var(--color-bg-section);
        }
        .review-footer {
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-top: 1px solid var(--color-border);
          padding-top: var(--space-3);
        }
        .review-name {
          font-weight: 700;
          color: var(--color-text);
        }
        .review-service {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .reviews-cta {
          text-align: center;
        }
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
        .reviews-placeholder-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
