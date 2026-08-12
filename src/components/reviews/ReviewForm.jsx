import { useRef, useState } from 'react';
import { serviceNameOptions } from '@/data/services';
import { site } from '@/data/site';
import { AlertIcon, CheckIcon } from '@/components/ui/Icons';

const EMPTY_FORM = {
  customerName: '',
  serviceUsed: '',
  rating: 0,
  reviewText: '',
  website: '', // honeypot — must stay empty
};

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function validate(values, photoError) {
  const errors = {};

  const name = values.customerName.trim();
  if (!name) errors.customerName = 'Please enter your name.';
  else if (name.length < 2) errors.customerName = 'Please enter your full name.';
  else if (!/^[a-zA-Z .'-]+$/.test(name)) errors.customerName = 'Name can only contain letters and spaces.';

  if (!serviceNameOptions.includes(values.serviceUsed)) {
    errors.serviceUsed = 'Please select the service you used.';
  }

  if (values.rating < 1 || values.rating > 5) {
    errors.rating = 'Please select a star rating.';
  }

  const text = values.reviewText.trim();
  if (!text) errors.reviewText = 'Please write your review.';
  else if (text.length < 10) errors.reviewText = 'Please write a little more about your experience (at least 10 characters).';
  else if (text.length > 1000) errors.reviewText = 'Review is too long (maximum 1000 characters).';

  if (photoError) errors.photo = photoError;

  return errors;
}

export default function ReviewForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');
  const fileInputRef = useRef(null);

  if (!site.reviewsApiUrl) {
    return (
      <div className="card review-form-unavailable">
        <p>
          Review submissions aren&apos;t open yet. Please check back soon, or
          share your feedback with us directly by phone or WhatsApp.
        </p>
        <style jsx>{`
          .review-form-unavailable {
            padding: var(--space-6);
            text-align: center;
            color: var(--color-text-muted);
          }
          .review-form-unavailable p {
            margin: 0;
          }
        `}</style>
      </div>
    );
  }

  function handleChange(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0] || null;
    setPhotoError('');

    if (!file) {
      setPhoto(null);
      return;
    }
    if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
      setPhotoError('Photo must be a JPEG, PNG or WebP image.');
      setPhoto(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError('Photo is too large (maximum 5 MB).');
      setPhoto(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setPhoto(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');

    if (values.website) {
      // Honeypot triggered — silently no-op as if it succeeded.
      setStatus('success');
      return;
    }

    const fieldErrors = validate(values, photoError);
    setErrors(fieldErrors);
    setTouched({ customerName: true, serviceUsed: true, rating: true, reviewText: true });

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    try {
      const formData = new FormData();
      formData.append('customer_name', values.customerName.trim());
      formData.append('service_used', values.serviceUsed);
      formData.append('rating', String(values.rating));
      formData.append('review_text', values.reviewText.trim());
      formData.append('website', values.website);
      if (photo) formData.append('photo', photo);

      const res = await fetch(`${site.reviewsApiUrl}/api/submit_review.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setStatus('error');
        setServerError(
          data.message || 'We could not submit your review right now. Please try again shortly.'
        );
        return;
      }

      setStatus('success');
      setValues(EMPTY_FORM);
      setPhoto(null);
      setErrors({});
      setTouched({});
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setStatus('error');
      setServerError('We could not submit your review right now. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="review-form-success" role="status">
        <div className="review-form-success-icon">
          <CheckIcon width="28" height="28" />
        </div>
        <h3>Thank You!</h3>
        <p>
          Your review has been submitted and will appear on our website once
          it&apos;s reviewed and approved by our team.
        </p>
        <button type="button" className="btn btn-secondary" onClick={() => setStatus('idle')}>
          Write Another Review
        </button>
        <style jsx>{`
          .review-form-success {
            text-align: center;
            padding: var(--space-7) var(--space-5);
          }
          .review-form-success-icon {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: #dcfce7;
            color: var(--color-success);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto var(--space-4);
          }
          .review-form-success p {
            max-width: 42ch;
            margin: 0 auto var(--space-5);
          }
        `}</style>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot field — hidden from real users, bots often fill every field */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="review-website">Website</label>
        <input
          type="text"
          id="review-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => handleChange('website', e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="review-name">Customer Name</label>
        <input
          id="review-name"
          type="text"
          autoComplete="name"
          value={values.customerName}
          onChange={(e) => handleChange('customerName', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, customerName: true }))}
          aria-invalid={touched.customerName && !!errors.customerName}
          aria-describedby={errors.customerName ? 'review-name-error' : undefined}
          required
        />
        {touched.customerName && errors.customerName && (
          <p className="field-error" id="review-name-error">
            <AlertIcon /> {errors.customerName}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="review-service">Service Used</label>
        <select
          id="review-service"
          value={values.serviceUsed}
          onChange={(e) => handleChange('serviceUsed', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, serviceUsed: true }))}
          aria-invalid={touched.serviceUsed && !!errors.serviceUsed}
          aria-describedby={errors.serviceUsed ? 'review-service-error' : undefined}
          required
        >
          <option value="">Select a service</option>
          {serviceNameOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {touched.serviceUsed && errors.serviceUsed && (
          <p className="field-error" id="review-service-error">
            <AlertIcon /> {errors.serviceUsed}
          </p>
        )}
      </div>

      <div className="form-field">
        <span className="star-label" id="review-rating-label">Star Rating</span>
        <div className="star-picker" role="radiogroup" aria-labelledby="review-rating-label">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={values.rating === n}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              className={`star-btn ${values.rating >= n ? 'is-filled' : ''}`}
              onClick={() => {
                handleChange('rating', n);
                setTouched((t) => ({ ...t, rating: true }));
              }}
            >
              ★
            </button>
          ))}
        </div>
        {touched.rating && errors.rating && (
          <p className="field-error" id="review-rating-error">
            <AlertIcon /> {errors.rating}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="review-text">Your Review</label>
        <textarea
          id="review-text"
          rows={4}
          maxLength={1000}
          value={values.reviewText}
          onChange={(e) => handleChange('reviewText', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, reviewText: true }))}
          aria-invalid={touched.reviewText && !!errors.reviewText}
          aria-describedby={errors.reviewText ? 'review-text-error' : undefined}
          required
        />
        {touched.reviewText && errors.reviewText && (
          <p className="field-error" id="review-text-error">
            <AlertIcon /> {errors.reviewText}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="review-photo">Photo (Optional)</label>
        <input
          id="review-photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          ref={fileInputRef}
          onChange={handlePhotoChange}
        />
        {photoError && (
          <p className="field-error">
            <AlertIcon /> {photoError}
          </p>
        )}
      </div>

      {status === 'error' && serverError && (
        <div className="form-server-error" role="alert">
          <AlertIcon /> {serverError}
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting…' : 'Submit Review'}
      </button>

      <p className="review-form-note">
        Reviews are checked by our team before they appear on the website —
        your review won&apos;t be visible immediately.
      </p>

      <style jsx>{`
        .review-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
          min-width: 0;
          max-width: 100%;
        }
        .hp-field {
          position: absolute;
          left: -9999px;
          top: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          min-width: 0;
        }
        label,
        .star-label {
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--color-text);
        }
        input,
        select,
        textarea {
          font: inherit;
          padding: 0.8rem 1rem;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--color-border);
          background: #fff;
          color: var(--color-text);
          width: 100%;
          min-width: 0;
          max-width: 100%;
        }
        input:focus,
        select:focus,
        textarea:focus {
          border-color: var(--color-primary);
        }
        input[aria-invalid='true'],
        select[aria-invalid='true'],
        textarea[aria-invalid='true'] {
          border-color: var(--color-error);
        }
        textarea {
          resize: vertical;
        }
        .star-picker {
          display: flex;
          gap: var(--space-2);
        }
        .star-btn {
          background: none;
          border: none;
          font-size: 2rem;
          line-height: 1;
          color: var(--color-border);
          cursor: pointer;
          padding: 0;
          min-width: 0;
        }
        .star-btn.is-filled {
          color: #f59e0b;
        }
        .field-error {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--color-error);
          font-size: 0.85rem;
          margin: 0;
        }
        .form-server-error {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: #fef2f2;
          color: var(--color-error);
          border: 1px solid #fecaca;
          border-radius: var(--radius-sm);
          padding: var(--space-3) var(--space-4);
          font-weight: 600;
          font-size: 0.92rem;
        }
        .review-form-note {
          margin: 0;
          font-size: 0.82rem;
          color: var(--color-text-muted);
          text-align: center;
        }
      `}</style>
    </form>
  );
}
