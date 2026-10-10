export const API_BASE_URL = (import.meta.env?.VITE_KEZOI_API_BASE_URL || '').replace(/\/$/, '');

const readJson = async response => response.json().catch(() => ({}));

const requestJson = async (path, options = {}, fetchImpl = fetch) => {
  const response = await fetchImpl(`${API_BASE_URL}${path}`, options);
  const data = await readJson(response);
  if (!response.ok || data.success === false) {
    const error = new Error(data.message || data.error || 'The request could not be completed.');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

export const getProperties = (fetchImpl = fetch) =>
  requestJson('/api/applications/properties', {}, fetchImpl);

export const getUnavailableDates = (propertyId, fetchImpl = fetch) =>
  requestJson(`/api/applications/properties/${encodeURIComponent(propertyId)}/unavailable-dates`, {}, fetchImpl);

export const getQuote = (propertyId, input, { signal, fetchImpl = fetch } = {}) => {
  const params = new URLSearchParams({
    check_in: input.checkIn,
    check_out: input.checkOut,
    adults: String(input.adults),
    children: String(input.children),
    infants: String(input.infants),
    pets: String(input.pets || 0),
  });
  return requestJson(
    `/api/applications/properties/${encodeURIComponent(propertyId)}/quote?${params}`,
    { method: 'GET', signal },
    fetchImpl,
  );
};

export const uploadIdentityDocument = async (enquiryId, token, documentType, file, fetchImpl = fetch) => {
  const payload = new FormData();
  payload.append('identity_document', file);
  payload.append('document_type', documentType);
  const response = await fetchImpl(
    `${API_BASE_URL}/api/applications/enquiries/${encodeURIComponent(enquiryId)}/identity-document`,
    { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: payload },
  );
  const data = await readJson(response);
  if (!response.ok || data.success === false) {
    const error = new Error(data.message || data.error || 'The document could not be uploaded.');
    error.status = response.status;
    throw error;
  }
  return data;
};
