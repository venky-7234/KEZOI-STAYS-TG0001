export const formatMoney = (value, currency = 'INR') => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(Number(value || 0));

export const quoteInputKey = ({ propertyId, checkIn, checkOut, adults, children, infants, pets = 0 }) =>
  [propertyId, checkIn, checkOut, adults, children, infants, pets].join('|');

export const hasGstSnapshot = quote => Boolean(quote) && [
  'taxable_amount', 'gst_rate', 'cgst_amount', 'sgst_amount', 'igst_amount',
  'gst_amount', 'total_amount', 'currency', 'price_includes_gst',
].every(field => quote[field] !== null && quote[field] !== undefined);

export const validateIdentityFile = file => {
  if (!file) return 'Please choose an identity document.';
  if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) return 'Upload a JPG, PNG, or PDF identity document.';
  if (file.size > 5 * 1024 * 1024) return 'Identity document must be 5 MB or smaller.';
  return '';
};

export const identityUploadError = status => ({
  400: 'The document or document type is invalid. Please check the file and try again.',
  401: 'This secure upload link has expired or is invalid. Please request a new link.',
  403: 'This upload link does not belong to the specified enquiry.',
  409: 'A document has already been uploaded, or this enquiry is no longer available.',
  413: 'The selected file exceeds the 5 MB limit.',
}[status] || 'A temporary error prevented the upload. Please try again safely.');
