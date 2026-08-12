import { validateBookingForm } from '@/utils/validation';
import { serviceNameOptions, applianceTypesByServiceName, brandsByServiceName } from '@/data/services';
import { isEmailConfigured, sendBookingEmail } from '@/utils/email';

// Best-effort in-memory rate limiting. This resets whenever the serverless
// function cold-starts, so it is a light deterrent (not a hard guarantee)
// against automated spam — sufficient for a small local business site with
// no other backend.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = requestLog.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    requestLog.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

const MAX_FIELD_LENGTH = 300;

function sanitizeString(value) {
  if (typeof value !== 'string') return '';
  return value.slice(0, MAX_FIELD_LENGTH).trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again shortly, or call/WhatsApp us directly.',
    });
  }

  const body = req.body || {};

  // Honeypot: real users never populate this hidden field. Silently accept.
  if (body.company) {
    return res.status(200).json({ success: true });
  }

  const values = {
    name: sanitizeString(body.name),
    mobile: sanitizeString(body.mobile),
    service: sanitizeString(body.service),
    applianceType: sanitizeString(body.applianceType),
    brand: sanitizeString(body.brand),
    brandOther: sanitizeString(body.brandOther),
    problemDescription: sanitizeString(body.problemDescription),
    pincode: sanitizeString(body.pincode),
    address: sanitizeString(body.address),
    preferredDate: sanitizeString(body.preferredDate),
    preferredTime: sanitizeString(body.preferredTime),
    additionalMessage: sanitizeString(body.additionalMessage),
  };

  const errors = validateBookingForm(values, {
    serviceOptions: serviceNameOptions,
    applianceTypesByServiceName,
    brandsByServiceName,
  });

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted fields and try again.',
      errors,
    });
  }

  try {
    if (isEmailConfigured()) {
      await sendBookingEmail(values);
    } else {
      // Development mode: no SMTP credentials configured yet. Log the
      // booking server-side instead of silently pretending an email was
      // sent. See README.md "Booking Email Setup".
      // eslint-disable-next-line no-console
      console.log('[Coolviro booking - DEV MODE, email not sent]', {
        ...values,
        receivedAt: new Date().toISOString(),
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Booking email failed to send:', err.message);
    return res.status(500).json({
      success: false,
      message:
        'We received your request but could not send the confirmation email. Please call or WhatsApp us directly to confirm your booking.',
    });
  }
}
