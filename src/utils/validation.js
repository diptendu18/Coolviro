// Shared validation used by both the client-side booking form and the
// server-side API route. Keep this file dependency-free so it can be
// imported from pages/api without pulling in browser-only code.

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const INDIAN_PINCODE_REGEX = /^[1-9]\d{5}$/;

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

// Brand is optional — not every booking (or every appliance category) has
// a specific brand chosen. When a value is present it must be one of the
// brands offered for the selected service.
export function validateBrand(value, allowedBrands) {
  if (!value) return '';
  if (!allowedBrands || !allowedBrands.includes(value)) {
    return 'Please select a valid brand.';
  }
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

  const pincodeError = validatePincode(values.pincode);
  if (pincodeError) errors.pincode = pincodeError;

  const addressError = validateAddress(values.address);
  if (addressError) errors.address = addressError;

  return errors;
}
