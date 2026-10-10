import assert from 'node:assert/strict';
import test from 'node:test';
import { getQuote, uploadIdentityDocument } from '../src/utils/api.js';
import { formatMoney, hasGstSnapshot, identityUploadError, quoteInputKey, validateIdentityFile } from '../src/utils/quote.js';

const quote = {
  nights: 2,
  base_amount: 19998,
  extra_guests: 1,
  extra_guest_amount: 3056,
  discount_amount: 1000,
  taxable_amount: 22054,
  gst_rate: 18,
  cgst_amount: 1984.86,
  sgst_amount: 1984.86,
  igst_amount: 0,
  gst_amount: 3969.72,
  total_amount: 26023.72,
  currency: 'INR',
  price_includes_gst: false,
};

test('formats INR with Indian grouping and two decimals', () => {
  assert.equal(formatMoney(13601.86), '₹13,601.86');
  assert.equal(formatMoney(9999), '₹9,999.00');
});

test('recognises a GST-exclusive quote with extra guests and discount', () => {
  assert.equal(hasGstSnapshot(quote), true);
  assert.equal(quote.price_includes_gst, false);
  assert.equal(quote.extra_guest_amount, 3056);
  assert.equal(quote.taxable_amount, quote.base_amount + quote.extra_guest_amount - quote.discount_amount);
});

test('legacy records without stored GST snapshots are detected', () => {
  assert.equal(hasGstSnapshot({ base_amount: 9999, total_amount: 9999 }), false);
});

test('quote input key invalidates when dates or guest counts change', () => {
  const first = quoteInputKey({ propertyId: 1, checkIn: '2026-11-10', checkOut: '2026-11-12', adults: 2, children: 0, infants: 0 });
  const changedGuests = quoteInputKey({ propertyId: 1, checkIn: '2026-11-10', checkOut: '2026-11-12', adults: 3, children: 0, infants: 0 });
  const changedDates = quoteInputKey({ propertyId: 1, checkIn: '2026-11-11', checkOut: '2026-11-12', adults: 2, children: 0, infants: 0 });
  assert.notEqual(first, changedGuests);
  assert.notEqual(first, changedDates);
});

test('loads a live quote with GET query parameters', async () => {
  let requestUrl = '';
  const fetchImpl = async (url, options) => {
    requestUrl = url;
    assert.equal(options.method, 'GET');
    return new Response(JSON.stringify({ success: true, quote }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  const result = await getQuote('1', { checkIn: '2026-11-10', checkOut: '2026-11-12', adults: 2, children: 1, infants: 0, pets: 0 }, { fetchImpl });
  assert.equal(result.quote.total_amount, 26023.72);
  assert.match(requestUrl, /\/properties\/1\/quote\?/);
  assert.match(requestUrl, /check_in=2026-11-10/);
  assert.match(requestUrl, /children=1/);
});

test('surfaces quote API errors', async () => {
  const fetchImpl = async () => new Response(JSON.stringify({ success: false, message: 'Dates unavailable' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
  await assert.rejects(() => getQuote('1', { checkIn: '2026-11-10', checkOut: '2026-11-12', adults: 2, children: 0, infants: 0 }, { fetchImpl }), /Dates unavailable/);
});

test('validates secure identity files and maps handoff errors', () => {
  assert.equal(validateIdentityFile({ type: 'image/jpeg', size: 1024 }), '');
  assert.match(validateIdentityFile({ type: 'text/plain', size: 10 }), /JPG/);
  assert.match(validateIdentityFile({ type: 'application/pdf', size: 6 * 1024 * 1024 }), /5 MB/);
  assert.match(identityUploadError(401), /expired or is invalid/);
  assert.match(identityUploadError(409), /already been uploaded/);
});

test('secure upload sends bearer token and multipart data', async () => {
  const file = new Blob(['identity'], { type: 'application/pdf' });
  const fetchImpl = async (url, options) => {
    assert.match(url, /\/enquiries\/42\/identity-document$/);
    assert.equal(options.headers.Authorization, 'Bearer short-lived-token');
    assert.equal(options.method, 'POST');
    assert.equal(options.body.get('document_type'), 'PASSPORT');
    assert.ok(options.body.get('identity_document'));
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  await uploadIdentityDocument('42', 'short-lived-token', 'PASSPORT', file, fetchImpl);
});
