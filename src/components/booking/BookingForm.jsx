import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { serviceNameOptions, applianceTypesByServiceName, brandsByServiceName } from '@/data/services';
import { validateBookingForm, OTHER_BRAND_VALUE } from '@/utils/validation';
import { AlertIcon, CheckIcon } from '@/components/ui/Icons';

const EMPTY_FORM = {
  name: '',
  mobile: '',
  service: '',
  brand: '',
  brandOther: '',
  applianceType: '',
  address: '',
  pincode: '',
  company: '', // honeypot — must stay empty
};

export default function BookingForm() {
  const router = useRouter();
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');
  const liveRegionRef = useRef(null);

  useEffect(() => {
    const presetService = router.query.service;
    const presetBrand = router.query.brand;
    if (typeof presetService === 'string' && serviceNameOptions.includes(presetService)) {
      setValues((v) => {
        const next = { ...v, service: presetService };
        const allowedBrands = brandsByServiceName[presetService] || [];
        if (typeof presetBrand === 'string' && allowedBrands.includes(presetBrand)) {
          next.brand = presetBrand;
        }
        return next;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.service, router.query.brand]);

  const applianceOptions = applianceTypesByServiceName[values.service] || [];
  const brandOptions = brandsByServiceName[values.service] || [];

  function handleChange(field, value) {
    const nextValues = { ...values, [field]: value };
    if (field === 'service') {
      nextValues.applianceType = '';
      nextValues.brand = '';
      nextValues.brandOther = '';
    }
    if (field === 'brand' && value !== OTHER_BRAND_VALUE) {
      nextValues.brandOther = '';
    }
    setValues(nextValues);

    // Re-validate immediately so a previously-shown error clears as soon as
    // the field becomes valid, even if the field never receives a blur
    // event (e.g. choosing a <select> option with a mouse).
    setErrors((e) => {
      const touchesDependents =
        (field === 'service' && ('applianceType' in e || 'brand' in e || 'brandOther' in e)) ||
        (field === 'brand' && 'brandOther' in e);
      if (!(field in e) && !touchesDependents) return e;
      const fieldErrors = validateBookingForm(nextValues, {
        serviceOptions: serviceNameOptions,
        applianceTypesByServiceName,
        brandsByServiceName,
      });
      const nextErrors = { ...e, [field]: fieldErrors[field] };
      if (field === 'service') {
        nextErrors.applianceType = fieldErrors.applianceType;
        nextErrors.brand = fieldErrors.brand;
        nextErrors.brandOther = fieldErrors.brandOther;
      }
      if (field === 'brand') {
        nextErrors.brandOther = fieldErrors.brandOther;
      }
      return nextErrors;
    });
  }

  function handleBlur(field) {
    setTouched((t) => ({ ...t, [field]: true }));
    const fieldErrors = validateBookingForm(values, {
      serviceOptions: serviceNameOptions,
      applianceTypesByServiceName,
      brandsByServiceName,
    });
    setErrors((e) => ({ ...e, [field]: fieldErrors[field] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');

    if (values.company) {
      // Honeypot triggered — silently no-op as if it succeeded.
      setStatus('success');
      return;
    }

    const fieldErrors = validateBookingForm(values, {
      serviceOptions: serviceNameOptions,
      applianceTypesByServiceName,
      brandsByServiceName,
    });
    setErrors(fieldErrors);
    setTouched({
      name: true,
      mobile: true,
      service: true,
      brand: true,
      brandOther: true,
      applianceType: true,
      address: true,
      pincode: true,
    });

    if (Object.keys(fieldErrors).length > 0) {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = 'There are errors in the form. Please review the highlighted fields.';
      }
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setStatus('error');
        setServerError(
          data.message ||
            'We could not submit your request right now. Please call or WhatsApp us directly.'
        );
        return;
      }

      setStatus('success');
      setValues(EMPTY_FORM);
      setErrors({});
      setTouched({});
    } catch (err) {
      setStatus('error');
      setServerError(
        'We could not submit your request right now. Please check your connection or call/WhatsApp us directly.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="booking-success" role="status">
        <div className="booking-success-icon">
          <CheckIcon width="28" height="28" />
        </div>
        <h3>Booking Request Submitted</h3>
        <p>Booking request submitted successfully. We will contact you shortly.</p>
        <button type="button" className="btn btn-secondary" onClick={() => setStatus('idle')}>
          Book Another Service
        </button>
        <style jsx>{`
          .booking-success {
            text-align: center;
            padding: var(--space-7) var(--space-5);
          }
          .booking-success-icon {
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
          .booking-success p {
            max-width: 42ch;
            margin: 0 auto var(--space-5);
          }
        `}</style>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <div className="visually-hidden" aria-live="polite" ref={liveRegionRef} />

      {/* Honeypot field — hidden from real users, bots often fill every field */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => handleChange('company', e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="name">Customer Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          required
        />
        {touched.name && errors.name && (
          <p className="field-error" id="name-error">
            <AlertIcon /> {errors.name}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="mobile">Mobile Number</label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit mobile number"
          value={values.mobile}
          onChange={(e) => handleChange('mobile', e.target.value)}
          onBlur={() => handleBlur('mobile')}
          aria-invalid={touched.mobile && !!errors.mobile}
          aria-describedby={errors.mobile ? 'mobile-error' : undefined}
          required
        />
        {touched.mobile && errors.mobile && (
          <p className="field-error" id="mobile-error">
            <AlertIcon /> {errors.mobile}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="service">Select Service</label>
        <select
          id="service"
          name="service"
          value={values.service}
          onChange={(e) => handleChange('service', e.target.value)}
          onBlur={() => handleBlur('service')}
          aria-invalid={touched.service && !!errors.service}
          aria-describedby={errors.service ? 'service-error' : undefined}
          required
        >
          <option value="">Select a service</option>
          {serviceNameOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {touched.service && errors.service && (
          <p className="field-error" id="service-error">
            <AlertIcon /> {errors.service}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="brand">Select Brand</label>
        <select
          id="brand"
          name="brand"
          value={values.brand}
          onChange={(e) => handleChange('brand', e.target.value)}
          onBlur={() => handleBlur('brand')}
          aria-invalid={touched.brand && !!errors.brand}
          aria-describedby={errors.brand ? 'brand-error' : undefined}
          disabled={!values.service}
          required
        >
          <option value="">
            {values.service ? 'Select a brand' : 'Select a service first'}
          </option>
          {brandOptions.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
          {values.service && <option value={OTHER_BRAND_VALUE}>Other</option>}
        </select>
        {touched.brand && errors.brand && (
          <p className="field-error" id="brand-error">
            <AlertIcon /> {errors.brand}
          </p>
        )}
      </div>

      {values.brand === OTHER_BRAND_VALUE && (
        <div className="form-field">
          <label htmlFor="brandOther">Enter Brand Name</label>
          <input
            id="brandOther"
            name="brandOther"
            type="text"
            autoComplete="off"
            placeholder="Type the brand name"
            value={values.brandOther}
            onChange={(e) => handleChange('brandOther', e.target.value)}
            onBlur={() => handleBlur('brandOther')}
            aria-invalid={touched.brandOther && !!errors.brandOther}
            aria-describedby={errors.brandOther ? 'brandOther-error' : undefined}
            required
          />
          {touched.brandOther && errors.brandOther && (
            <p className="field-error" id="brandOther-error">
              <AlertIcon /> {errors.brandOther}
            </p>
          )}
        </div>
      )}

      <div className="form-field">
        <label htmlFor="applianceType">Appliance Type / Model</label>
        <select
          id="applianceType"
          name="applianceType"
          value={values.applianceType}
          onChange={(e) => handleChange('applianceType', e.target.value)}
          onBlur={() => handleBlur('applianceType')}
          aria-invalid={touched.applianceType && !!errors.applianceType}
          aria-describedby={errors.applianceType ? 'applianceType-error' : undefined}
          disabled={!values.service}
          required
        >
          <option value="">
            {values.service ? 'Select appliance type' : 'Select a service first'}
          </option>
          {applianceOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {touched.applianceType && errors.applianceType && (
          <p className="field-error" id="applianceType-error">
            <AlertIcon /> {errors.applianceType}
          </p>
        )}
      </div>

      <div className="form-field form-field-full">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          rows={3}
          autoComplete="street-address"
          value={values.address}
          onChange={(e) => handleChange('address', e.target.value)}
          onBlur={() => handleBlur('address')}
          aria-invalid={touched.address && !!errors.address}
          aria-describedby={errors.address ? 'address-error' : undefined}
          required
        />
        {touched.address && errors.address && (
          <p className="field-error" id="address-error">
            <AlertIcon /> {errors.address}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="pincode">PIN Code</label>
        <input
          id="pincode"
          name="pincode"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="6-digit pincode"
          value={values.pincode}
          onChange={(e) => handleChange('pincode', e.target.value)}
          onBlur={() => handleBlur('pincode')}
          aria-invalid={touched.pincode && !!errors.pincode}
          aria-describedby={errors.pincode ? 'pincode-error' : undefined}
          required
        />
        {touched.pincode && errors.pincode && (
          <p className="field-error" id="pincode-error">
            <AlertIcon /> {errors.pincode}
          </p>
        )}
      </div>

      {status === 'error' && serverError && (
        <div className="form-field-full form-server-error" role="alert">
          <AlertIcon /> {serverError}
        </div>
      )}

      <div className="form-field-full">
        <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting…' : 'Submit Booking'}
        </button>
      </div>

      <style jsx>{`
        .booking-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
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
        .form-field-full {
          grid-column: 1 / -1;
        }
        label {
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
        select:disabled {
          background: var(--color-bg-section);
          cursor: not-allowed;
        }
        textarea {
          resize: vertical;
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
        @media (max-width: 640px) {
          .booking-form {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </form>
  );
}
