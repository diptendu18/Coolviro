import nodemailer from 'nodemailer';
import { OTHER_BRAND_VALUE } from './validation';

const PLACEHOLDER_PATTERN = /needs user input/i;

function isRealValue(value) {
  return Boolean(value) && !PLACEHOLDER_PATTERN.test(value);
}

/**
 * Returns true only when real SMTP credentials are present in the
 * environment. Used to decide between "send a real email" and
 * "log to console in development mode" — see pages/api/booking.js.
 */
export function isEmailConfigured() {
  return (
    isRealValue(process.env.SMTP_HOST) &&
    isRealValue(process.env.SMTP_USER) &&
    isRealValue(process.env.SMTP_PASS)
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailContent(booking) {
  const rows = [
    ['Customer Name', booking.name],
    ['Mobile Number', booking.mobile],
    ['Selected Service', booking.service],
    ['Appliance Type', booking.applianceType],
    ['Brand', booking.brand],
    ...(booking.brand === OTHER_BRAND_VALUE && booking.brandOther
      ? [['Brand Name', booking.brandOther]]
      : []),
    ['Pincode', booking.pincode],
    ['Address', booking.address],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#0066FF;margin-bottom:4px;">New Booking Request</h2>
      <p style="color:#475569;margin-top:0;">Coolviro Services — website booking form</p>
      <table style="width:100%;border-collapse:collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f0f9ff;font-weight:bold;width:40%;">${escapeHtml(
              label
            )}</td>
            <td style="padding:8px 12px;border:1px solid #e2e8f0;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join('')}
      </table>
    </div>
  `;

  return { text, html };
}

/**
 * Sends the booking notification email via SMTP (Nodemailer). Throws if
 * sending fails — callers should catch and return a safe error response.
 */
export async function sendBookingEmail(booking) {
  const { text, html } = buildEmailContent(booking);
  const emailTo = process.env.EMAIL_TO || 'suvojitroy188@gmail.com';
  const from = isRealValue(process.env.EMAIL_FROM)
    ? process.env.EMAIL_FROM
    : process.env.SMTP_USER;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Coolviro Services Website" <${from}>`,
    to: emailTo,
    replyTo: from,
    subject: `New Booking Request — ${booking.service} (${booking.name})`,
    text,
    html,
  });
}
