import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Check, ChevronLeft, ChevronRight, FileCheck2, Minus, Plus, RefreshCw, UploadCloud, X } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const API = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const asDate = s => s ? new Date(`${s}T00:00:00`) : null;
const today = () => iso(new Date());
const dateLabel = s => asDate(s)?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) || 'Select date';
const money = (n, c = 'INR') => new Intl.NumberFormat('en-IN', { style: 'currency', currency: c, maximumFractionDigits: 0 }).format(Number(n || 0));

function Month({ value, start, end, unavailable, onSelect }) {
  const first = new Date(value.getFullYear(), value.getMonth(), 1);
  const count = new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();
  const cells = [...Array(first.getDay()).fill(null), ...Array.from({ length: count }, (_, i) => new Date(value.getFullYear(), value.getMonth(), i + 1))];
  return <div className="booking-month">
    <h5>{value.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</h5>
    <div className="booking-weekdays">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(x => <span key={x}>{x}</span>)}</div>
    <div className="booking-days">{cells.map((d, i) => {
      if (!d) return <span key={`blank-${i}`} />;
      const day = iso(d), selected = day === start || day === end, inRange = start && end && day > start && day < end;
      return <button type="button" key={day} aria-label={d.toLocaleDateString('en-IN')} aria-pressed={selected} disabled={day < today() || unavailable.has(day)} className={`${selected ? 'selected' : ''} ${inRange ? 'in-range' : ''}`} onClick={() => onSelect(day)}>{d.getDate()}</button>;
    })}</div>
  </div>;
}

function Counter({ title, hint, value, min, max, onChange }) {
  return <div className="guest-counter"><div><strong>{title}</strong><span>{hint}</span></div><div className="counter-controls"><button type="button" disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`Remove ${title}`}><Minus size={15} /></button><output>{value}</output><button type="button" disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`Add ${title}`}><Plus size={15} /></button></div></div>;
}

function Price({ quote }) {
  if (!quote) return null;
  const rows = [[`${money(quote.nightlyRate, quote.currency)} × ${quote.nights} night${quote.nights === 1 ? '' : 's'}`, quote.accommodationSubtotal], quote.cleaningFee != null && ['Cleaning fee', quote.cleaningFee], quote.taxes != null && ['Taxes', quote.taxes], Number(quote.discountAmount) > 0 && ['Discount', -quote.discountAmount]].filter(Boolean);
  return <div className="price-card">{rows.map(([name, amount]) => <div key={name}><span>{name}</span><span>{amount < 0 ? `−${money(-amount, quote.currency)}` : money(amount, quote.currency)}</span></div>)}<div className="price-total"><strong>Estimated total</strong><strong>{money(quote.total, quote.currency)}</strong></div></div>;
}

export default function BookingModal({ isOpen, onClose, property }) {
  const [step, setStep] = useState(1);
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [form, setForm] = useState({ checkIn: '', checkOut: '', adults: 2, children: 0, infants: 0, fullName: '', email: '', phone: '', idType: 'AADHAAR_CARD', idFile: null, message: '', accepted: false });
  const [inventory, setInventory] = useState(null);
  const [quote, setQuote] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState('');
  const [dragging, setDragging] = useState(false);
  const [propertyId, setPropertyId] = useState('');
  const [verification, setVerification] = useState({ EMAIL: { code: '', token: '', sent: false } });
  const [requestKey] = useState(() => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const unavailable = useMemo(() => new Set(inventory?.unavailableDates || []), [inventory]);
  const maxGuests = Number(inventory?.property?.maxGuests || property.guests || 1);
  const cancellation = inventory?.property?.cancellationPolicy;

  const loadAvailability = async () => {
    setBusy(true); setError(''); setInventory(null); setQuote(null);
    try {
      const propertiesResponse = await fetch(`${API}/api/applications/properties`);
      const propertiesData = await propertiesResponse.json().catch(() => ({}));
      const selected = propertiesData.properties?.find(item => item.property_code?.toUpperCase() === property.code.toUpperCase());
      if (!propertiesResponse.ok || !propertiesData.success || !selected) throw Error('This property is not available for applications.');
      const response = await fetch(`${API}/api/applications/properties/${encodeURIComponent(selected.id)}/unavailable-dates`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success || !Array.isArray(data.unavailable_dates)) throw Error(data.message || 'Availability could not be loaded.');
      const blocked = new Set();
      data.unavailable_dates.forEach(({ start_date, end_date }) => {
        for (let day = asDate(String(start_date).slice(0, 10)); day < asDate(String(end_date).slice(0, 10)); day = new Date(day.getTime() + 864e5)) blocked.add(iso(day));
      });
      setPropertyId(selected.id);
      setInventory({ unavailableDates: [...blocked], property: { maxGuests: selected.max_guests, cancellationPolicy: 'Cancellation terms will be confirmed by our team before payment.' } });
    } catch (e) {
      setInventory({ unavailableDates: [], property: { maxGuests: property.guests, cancellationPolicy: 'Cancellation terms will be confirmed by our team before payment.' } });
      setError('Live availability is temporarily unavailable. You can still select dates and send a request.');
    } finally { setBusy(false); }
  };

  useEffect(() => { if (isOpen) loadAvailability(); }, [isOpen, month]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (!isOpen) return; const close = e => e.key === 'Escape' && onClose(); document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close); }, [isOpen, onClose]);

  const rangeIsClear = (start, end) => {
    for (let d = new Date(asDate(start).getTime() + 864e5); iso(d) < end; d = new Date(d.getTime() + 864e5)) if (unavailable.has(iso(d))) return false;
    return !unavailable.has(start);
  };
  const selectDate = selected => {
    setQuote(null); setError('');
    if (!form.checkIn || form.checkOut || selected <= form.checkIn) return setForm(v => ({ ...v, checkIn: selected, checkOut: '' }));
    if (!rangeIsClear(form.checkIn, selected)) return setError('That stay crosses an unavailable night. Please choose another range.');
    setForm(v => ({ ...v, checkOut: selected }));
  };

  useEffect(() => {
    if (!form.checkIn || !form.checkOut || !inventory) return setQuote(null);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setBusy(true); setError('');
      try {
        const response = await fetch(`${API}/api/applications/quote`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal, body: JSON.stringify({ property_id: propertyId, check_in: form.checkIn, check_out: form.checkOut, adults: form.adults, children: form.children, infants: form.infants, pets: 0 }) });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success || !data.quote) throw Error(data.message || 'A price could not be calculated for those dates.');
        setQuote({ nightlyRate: data.quote.base_price_per_night, nights: data.quote.nights, accommodationSubtotal: data.quote.base_amount, total: data.quote.total_amount, currency: 'INR' });
      } catch (e) { if (e.name !== 'AbortError') setError(e.message); } finally { if (!controller.signal.aborted) setBusy(false); }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [form.checkIn, form.checkOut, form.adults, form.children, form.infants, inventory, propertyId]);

  if (!isOpen) return null;
  const guestTotal = form.adults + form.children;
  const changeGuests = (key, value) => setForm(v => ({ ...v, [key]: Math.max(key === 'adults' ? 1 : 0, Math.min(value, maxGuests - (key === 'adults' ? v.children : v.adults))) }));
  const acceptFile = file => {
    setError('');
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) return setError('Upload a JPG, PNG, or PDF identity document.');
    if (file.size > 5 * 1024 * 1024) return setError('Identity document must be 5 MB or smaller.');
    setForm(v => ({ ...v, idFile: file }));
  };

  const verificationValue = () => form.email.trim();
  const requestCode = async channel => {
    setError('');
    try {
      const response = await fetch(`${API}/api/applications/verification/request`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ channel, value: verificationValue() }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) throw Error(data.message || 'Could not send the verification code.');
      setVerification(v => ({ ...v, [channel]: { code: '', token: '', sent: true } }));
    } catch (e) { setError(e.message); }
  };
  const confirmCode = async channel => {
    setError('');
    try {
      const response = await fetch(`${API}/api/applications/verification/confirm`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ channel, value: verificationValue(), code: verification[channel].code }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success || !data.verification_token) throw Error(data.message || 'Verification failed.');
      setVerification(v => ({ ...v, [channel]: { ...v[channel], token: data.verification_token } }));
    } catch (e) { setError(e.message); }
  };

  const submit = async event => {
    event.preventDefault(); setError('');
    if (!form.idFile) return setError('Please upload one identity document.');
    if (!form.accepted) return setError('Please accept the house rules before submitting.');
    setSubmitting(true);
    try {
      if (!verification.EMAIL.token) throw Error('Please verify your email address.');
      const payload = new FormData();
      Object.entries({ property_id: propertyId, application_source: property.code, check_in: form.checkIn, check_out: form.checkOut, adults: form.adults, children: form.children, infants: form.infants, pets: 0, full_name: form.fullName.trim(), email: form.email.trim(), whatsapp_number: form.phone, document_type: form.idType, guest_message: form.message.trim(), email_verification_token: verification.EMAIL.token }).forEach(([key, value]) => payload.append(key, value));
      payload.append('identity_document', form.idFile);
      const response = await fetch(`${API}/api/applications/submit`, { method: 'POST', headers: { 'Idempotency-Key': requestKey }, body: payload });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success || !data.application) throw Error(data.error ? `${data.message || 'Unable to submit application'}: ${data.error}` : data.message || 'Your request could not be saved. Please try again.');
      setReference(String(data.application.id));
    } catch (e) { setError(e.message); } finally { setSubmitting(false); }
  };

  const errorBox = error && <div className="booking-error" role="alert"><span>{error}</span>{step === 1 && <button type="button" onClick={loadAvailability}><RefreshCw size={14} /> Retry</button>}</div>;

  return <div className="booking-modal-overlay" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className="booking-modal-card" role="dialog" aria-modal="true" aria-labelledby="booking-title"><header className="booking-header"><div><span>Kezoi Stays · {property.code}</span><h2 id="booking-title">{reference ? 'Booking request received' : 'Reserve your stay'}</h2></div><button type="button" onClick={onClose} aria-label="Close reservation form"><X /></button></header>
    {reference ? <div className="booking-success"><i><Check /></i><h3>Booking request received</h3><p>Our team will review your request and contact you. Your booking is not confirmed until approval.</p><div><span>Request reference</span><strong>{reference}</strong></div><button className="booking-primary" onClick={onClose}>Done</button></div> : <form onSubmit={submit}><div className="booking-progress"><span className="active"><b>1</b> Stay</span><i /><span className={step === 2 ? 'active' : ''}><b>2</b> Guest & ID</span></div><main className="booking-body">
      {step === 1 ? <><div className="booking-section-heading"><h3>Choose your stay</h3><p>Select the property, mandatory dates, and who is coming.</p></div><div className="property-choice"><Building2 size={22} /><div><span>Selected property</span><strong>{property.name}</strong><small>{property.location}</small></div><Check size={18} /></div><div className="date-summary"><div><span>Check-in</span><strong>{dateLabel(form.checkIn)}</strong></div><div><span>Check-out</span><strong>{dateLabel(form.checkOut)}</strong></div></div><div className="calendar-card"><div className="calendar-nav"><button type="button" aria-label="Previous month" disabled={month.getFullYear() === new Date().getFullYear() && month.getMonth() === new Date().getMonth()} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft /></button><span>Check availability <em>Required</em></span><button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight /></button></div>{busy && !inventory ? <div className="booking-status">Loading availability…</div> : inventory ? <div className="months-grid"><Month value={month} start={form.checkIn} end={form.checkOut} unavailable={unavailable} onSelect={selectDate} /><Month value={new Date(month.getFullYear(), month.getMonth() + 1, 1)} start={form.checkIn} end={form.checkOut} unavailable={unavailable} onSelect={selectDate} /></div> : null}</div>{errorBox}<div className="guests-card"><Counter title="Adults" hint="Age 13+" value={form.adults} min={1} max={maxGuests - form.children} onChange={n => changeGuests('adults', n)} /><Counter title="Children" hint="Age 2–12" value={form.children} min={0} max={maxGuests - form.adults} onChange={n => changeGuests('children', n)} /><Counter title="Infants" hint="Under 2" value={form.infants} min={0} max={5} onChange={n => setForm(v => ({ ...v, infants: n }))} /><small>Maximum {maxGuests} guests, excluding infants</small></div>{busy && form.checkOut ? <div className="booking-status">Checking price…</div> : <Price quote={quote} />}</> : <><div className="booking-section-heading"><h3>Guest details & verification</h3><p>Enter the lead guest's details and upload one valid identity document.</p></div><div className="review-summary"><div><span>Property</span><strong>{property.name}</strong></div><div><span>Dates</span><strong>{dateLabel(form.checkIn)} – {dateLabel(form.checkOut)}</strong></div><div><span>Guests</span><strong>{guestTotal} guest{guestTotal === 1 ? '' : 's'}{form.infants ? ` + ${form.infants} infant${form.infants === 1 ? '' : 's'}` : ''}</strong></div></div><Price quote={quote} /><div className="booking-fields"><label>Full name <span className="required-star">*</span><input required autoComplete="name" value={form.fullName} onChange={e => setForm(v => ({ ...v, fullName: e.target.value }))} /></label><label>Email <span className="required-star">*</span><input required type="email" autoComplete="email" value={form.email} onChange={e => { setForm(v => ({ ...v, email: e.target.value })); setVerification(v => ({ ...v, EMAIL: { code: '', token: '', sent: false } })); }} /></label><div className="verification-row"><button type="button" onClick={() => requestCode('EMAIL')} disabled={!form.email || verification.EMAIL.token}>{verification.EMAIL.token ? 'Email verified' : verification.EMAIL.sent ? 'Resend email code' : 'Send email code'}</button>{verification.EMAIL.sent && !verification.EMAIL.token && <><input aria-label="Email verification code" inputMode="numeric" maxLength="6" placeholder="6-digit code" value={verification.EMAIL.code} onChange={e => setVerification(v => ({ ...v, EMAIL: { ...v.EMAIL, code: e.target.value.replace(/\D/g, '') } }))} /><button type="button" onClick={() => confirmCode('EMAIL')} disabled={verification.EMAIL.code.length !== 6}>Verify</button></>}</div><label>Mobile / WhatsApp number <span className="required-star">*</span><PhoneInput international defaultCountry="IN" countryCallingCodeEditable={false} value={form.phone} onChange={phone => setForm(v => ({ ...v, phone: phone || '' }))} /></label><label>Message or special request <span>(optional)</span><textarea rows="3" value={form.message} onChange={e => setForm(v => ({ ...v, message: e.target.value }))} /></label></div><div className="identity-card"><div className="identity-heading"><FileCheck2 size={21} /><div><h4>Identity verification</h4><p>Required for the lead guest</p></div></div><label className="identity-type">Document type <span className="required-star">*</span><select required value={form.idType} onChange={e => setForm(v => ({ ...v, idType: e.target.value }))}><option value="AADHAAR_CARD">Aadhaar card</option><option value="PAN_CARD">PAN card</option><option value="PASSPORT">Passport</option><option value="VOTER_ID">Voter ID</option></select></label><label className={`identity-dropzone ${dragging ? 'is-dragging' : ''} ${form.idFile ? 'has-file' : ''}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); acceptFile(e.dataTransfer.files[0]); }}><input required type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => acceptFile(e.target.files[0])} />{form.idFile ? <><FileCheck2 size={28} /><strong>{form.idFile.name}</strong><span>Click or drop another file to replace it</span></> : <><UploadCloud size={30} /><strong>Drag and drop your ID here <span className="required-star">*</span></strong><span>or click to browse · JPG, PNG or PDF · Max 5 MB</span></>}</label><p className="identity-note">Your document is requested only for booking verification.</p></div><div className="rules-card"><h4>House rules</h4><ul>{property.rules.map(rule => <li key={rule}>{rule}</li>)}</ul><h4>Cancellation policy</h4><p>{cancellation || 'The cancellation policy could not be loaded. Retry availability before submitting.'}</p><label><input required type="checkbox" checked={form.accepted} onChange={e => setForm(v => ({ ...v, accepted: e.target.checked }))} /> I have read and agree to the house rules. <span className="required-star">*</span></label></div>{errorBox}<p className="payment-note">You won’t be charged now. Payment is requested after approval.</p></>}
    </main><footer className="booking-footer">{step === 2 && <button type="button" className="booking-secondary" disabled={submitting} onClick={() => { setError(''); setStep(1); }}><ArrowLeft size={17} /> Back</button>}<button type={step === 1 ? 'button' : 'submit'} className="booking-primary" disabled={step === 1 ? !(form.checkIn && form.checkOut) : submitting || !form.idFile} onClick={step === 1 ? () => { setError(''); setStep(2); } : undefined}>{step === 1 ? <>Continue <ArrowRight size={17} /></> : submitting ? 'Sending request…' : 'Request to book'}</button></footer></form>}
  </section></div>;
}
