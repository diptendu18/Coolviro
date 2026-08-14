// Builds the pre-filled WhatsApp message for a booking form submission.
// Kept separate from BookingForm.jsx so the exact message format is easy
// to find/verify independently of the form's UI logic.

import { OTHER_BRAND_VALUE } from './validation';

export function buildBookingWhatsAppMessage(values) {
  const brand = values.brand === OTHER_BRAND_VALUE ? values.brandOther : values.brand;

  const lines = [
    'New Service Booking – Coolviro Services',
    '',
    `Customer Name: ${values.name}`,
    `Phone Number: ${values.mobile}`,
    `Service: ${values.service}`,
    `Appliance Type: ${values.applianceType}`,
    `Brand: ${brand}`,
    `Address: ${values.address}`,
    `Pincode: ${values.pincode}`,
    '',
    'Please contact the customer regarding this booking.',
  ];

  return lines.join('\n');
}
