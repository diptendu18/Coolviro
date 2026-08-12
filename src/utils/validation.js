// Shared validation used by both the client-side booking form and the
// server-side API route. Keep this file dependency-free so it can be
// imported from pages/api without pulling in browser-only code.

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const INDIAN_PINCODE_REGEX = /^[1-9]\d{5}$/;

// Sentinel value for the "Other" option in the Select Brand dropdown —
// picking it reveals a free-text "Enter Brand Name" field.
export const OTHER_BRAND_VALUE = 'Other';

export function normalizeMobile(value) {
  const digits = (value || '').replace(/[\s-]/g, '');
  // Only strip a country code when its presence is unambiguous (either a
  // literal "+91" prefix, or exactly 12 digits i.e. "91" + a 10-digit
  // number) — otherwise a valid 10-digit number that happens to start
  // with "91" (e.g. 9123456780) would be incorrectly mangled.
  if (digits.startsWith('+91') && digits.length === 13) {
    return digits.slice(3);
  }
  if (digits.startsWith('91') && digits.length === 12) {
    return digits.slice(2);
  }
  return digits;
}

export function validateName(value) {
  const v = (value || '').trim();
  if (!v) return 'Please enter your name.';
  if (v.length < 2) return 'Please enter your full name.';
  if (v.length > 60) return 'Name is too long.';
  if (!/^[a-zA-Z .'-]+$/.test(v)) return 'Name can only contain letters and spaces.';
  return '';
}

export function validateMobile(value) {
  const v = normalizeMobile(value);
  if (!v) return 'Please enter your mobile number.';
  if (!INDIAN_MOBILE_REGEX.test(v)) {
    return 'Please enter a valid 10-digit Indian mobile number.';
  }
  return '';
}

export function validateService(value, serviceOptions) {
  if (!value) return 'Please select a service.';
  if (!serviceOptions.includes(value)) return 'Please select a valid service.';
  return '';
}

export function validateApplianceType(value, allowedTypes) {
  if (!value) return 'Please select the appliance type.';
  if (!allowedTypes || !allowedTypes.includes(value)) {
    return 'Please select a valid appliance type.';
  }
  return '';
}

export function validateBrand(value, allowedBrands) {
  if (!value) return 'Please select the brand.';
  if (value === OTHER_BRAND_VALUE) return '';
  if (!allowedBrands || !allowedBrands.includes(value)) {
    return 'Please select a valid brand.';
  }
  return '';
}

// Only required when the customer picked "Other" in the Select Brand
// dropdown — otherwise this field isn't shown at all.
export function validateBrandOther(brandValue, brandOtherValue) {
  if (brandValue !== OTHER_BRAND_VALUE) return '';
  const v = (brandOtherValue || '').trim();
  if (!v) return 'Please enter the brand name.';
  if (v.length < 2) return 'Please enter a valid brand name.';
  if (v.length > 60) return 'Brand name is too long.';
  return '';
}

export function validatePincode(value) {
  const v = (value || '').trim();
  if (!v) return 'Please enter your pincode.';
  if (!INDIAN_PINCODE_REGEX.test(v)) return 'Please enter a valid 6-digit pincode.';
  return '';
}

export function validateAddress(value) {
  const v = (value || '').trim();
  if (!v) return 'Please enter your address.';
  if (v.length < 10) return 'Please enter your complete address (at least 10 characters).';
  if (v.length > 300) return 'Address is too long.';
  return '';
}

export function validateProblemDescription(value) {
  const v = (value || '').trim();
  if (!v) return 'Please describe the problem or service you need.';
  if (v.length < 5) return 'Please provide a little more detail (at least 5 characters).';
  if (v.length > 300) return 'This is too long (maximum 300 characters).';
  return '';
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function validatePreferredDate(value) {
  const v = (value || '').trim();
  if (!v) return 'Please select a preferred date.';
  if (!DATE_REGEX.test(v)) return 'Please select a valid date.';
  const selected = new Date(`${v}T00:00:00`);
  if (Number.isNaN(selected.getTime())) return 'Please select a valid date.';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selected < today) return 'Preferred date cannot be in the past.';
  return '';
}

// Two-hour appointment windows within the site's working hours
// (10:00 AM - 8:00 PM) — shown in the Preferred Time <select>.
export const TIME_SLOTS = [
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM',
];

export function validatePreferredTime(value) {
  if (!value) return 'Please select a preferred time.';
  if (!TIME_SLOTS.includes(value)) return 'Please select a valid time slot.';
  return '';
}

export function validateAdditionalMessage(value) {
  const v = (value || '').trim();
  if (v.length > 300) return 'This is too long (maximum 300 characters).';
  return '';
}

export function validateBookingForm(
  values,
  { serviceOptions, applianceTypesByServiceName, brandsByServiceName = {} }
) {
  const errors = {};

  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;

  const mobileError = validateMobile(values.mobile);
  if (mobileError) errors.mobile = mobileError;

  const serviceError = validateService(values.service, serviceOptions);
  if (serviceError) errors.service = serviceError;

  const allowedTypes = applianceTypesByServiceName[values.service] || [];
  const applianceError = validateApplianceType(values.applianceType, allowedTypes);
  if (applianceError) errors.applianceType = applianceError;

  const allowedBrands = brandsByServiceName[values.service] || [];
  const brandError = validateBrand(values.brand, allowedBrands);
  if (brandError) errors.brand = brandError;

  const brandOtherError = validateBrandOther(values.brand, values.brandOther);
  if (brandOtherError) errors.brandOther = brandOtherError;

  const pincodeError = validatePincode(values.pincode);
  if (pincodeError) errors.pincode = pincodeError;

  const addressError = validateAddress(values.address);
  if (addressError) errors.address = addressError;

  const problemError = validateProblemDescription(values.problemDescription);
  if (problemError) errors.problemDescription = problemError;

  const preferredDateError = validatePreferredDate(values.preferredDate);
  if (preferredDateError) errors.preferredDate = preferredDateError;

  const preferredTimeError = validatePreferredTime(values.preferredTime);
  if (preferredTimeError) errors.preferredTime = preferredTimeError;

  const additionalMessageError = validateAdditionalMessage(values.additionalMessage);
  if (additionalMessageError) errors.additionalMessage = additionalMessageError;

  return errors;
}
