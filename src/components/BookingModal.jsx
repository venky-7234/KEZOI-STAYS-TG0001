import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, Check, ChevronLeft, ChevronRight, FileCheck2, Minus, Plus, RefreshCw, UploadCloud, X } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isBlockedCalendarDate, toLocalDateKey } from '../utils/dates.js';
import { API_BASE_URL, getProperties, getQuote, getUnavailableDates } from '../utils/api.js';
import { formatMoney, hasGstSnapshot, quoteInputKey, validateIdentityFile } from '../utils/quote.js';

const asDate = s => s ? new Date(`${s}T00:00:00`) : null;
const today = () => toLocalDateKey(new Date());
const dateLabel = s => asDate(s)?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) || 'Select date';

function Month({ value, start, end, blocked, mode, onSelect }) {
  const first = new Date(value.getFullYear(), value.getMonth(), 1);
  const count = new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();
  const cells = [...Array(first.getDay()).fill(null), ...Array.from({ length: count }, (_, i) => new Date(value.getFullYear(), value.getMonth(), i + 1))];
  return <div className="booking-month"><h5>{value.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</h5><div className="booking-weekdays">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(x => <span key={x}>{x}</span>)}</div><div className="booking-days">{cells.map((d, i) => {
    if (!d) return <span key={`blank-${i}`} />;
    const day = toLocalDateKey(d), booked = isBlockedCalendarDate(d, blocked), selected = day === start || day === end;
    const disabled = day < today() || booked || (mode === 'checkout' && (!start || day <= start));
    return <button type="button" key={day} title={booked ? 'Booked' : undefined} aria-label={`${d.toLocaleDateString('en-IN')}${booked ? ', Booked' : ''}`} aria-pressed={selected} disabled={disabled} className={`${selected ? 'selected' : ''} ${start && end && day > start && day < end ? 'in-range' : ''} ${booked ? 'booked' : ''}`} onClick={() => onSelect(d)}>{d.getDate()}</button>;
  })}</div></div>;
}

function Counter({ title, hint, value, min, max, onChange }) {
  return <div className="guest-counter"><div><strong>{title}</strong><span>{hint}</span></div><div className="counter-controls"><button type="button" disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`Remove ${title}`}><Minus size={15} /></button><output>{value}</output><button type="button" disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`Add ${title}`}><Plus size={15} /></button></div></div>;
}

function Price({ quote }) {
  if (!quote) return <p className="quote-placeholder">Choose valid dates to see the backend-calculated price.</p>;
  if (!hasGstSnapshot(quote)) return <div className="booking-error" role="alert"><span>A complete GST quote could not be loaded. Please retry before submitting.</span></div>;
  const currency = quote.currency || 'INR';
  return <div className="price-card gst-price-card">
    <div><span>Number of nights</span><span>{quote.nights}</span></div>
    <div><span>Base accommodation</span><span>{formatMoney(quote.base_amount, currency)}</span></div>
    <div><span>Extra guest charges{Number(quote.extra_guests) > 0 ? ` (${quote.extra_guests})` : ''}</span><span>{formatMoney(quote.extra_guest_amount, currency)}</span></div>
    {quote.discount_amount != null && <div><span>Discount</span><span className="discount-amount">−{formatMoney(quote.discount_amount, currency)}</span></div>}
    <div><span>Taxable amount</span><span>{formatMoney(quote.taxable_amount, currency)}</span></div>
    <div><span>CGST ({Number(quote.cgst_rate ?? Number(quote.gst_rate) / 2)}%)</span><span>{formatMoney(quote.cgst_amount, currency)}</span></div>
    <div><span>SGST ({Number(quote.sgst_rate ?? Number(quote.gst_rate) / 2)}%)</span><span>{formatMoney(quote.sgst_amount, currency)}</span></div>
    {Number(quote.igst_amount) > 0 && <div><span>IGST ({Number(quote.igst_rate ?? quote.gst_rate)}%)</span><span>{formatMoney(quote.igst_amount, currency)}</span></div>}
    <div><span>Total GST ({Number(quote.gst_rate)}%)</span><span>{formatMoney(quote.gst_amount, currency)}</span></div>
    <div className="price-total"><strong>Grand total</strong><strong>{formatMoney(quote.total_amount, currency)}</strong></div>
    <div><span>Currency</span><span>{currency}</span></div>
    <div><span>Price basis</span><strong>{quote.price_includes_gst ? 'GST inclusive' : 'GST exclusive'}</strong></div>
    <p className="quote-reservation-note">This quotation does not reserve or hold the property.</p>
  </div>;
}

export default function BookingModal({ isOpen, onClose, property }) {
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [picker, setPicker] = useState(null);
  const pickerRef = useRef(null);
  const [form, setForm] = useState({ checkIn: '', checkOut: '', adults: 2, children: 0, infants: 0, fullName: '', email: '', phone: '', phoneCountry: 'IN', hearAbout: '', referralName: '', referralMobile: '', referralCountry: 'IN', idType: 'AADHAAR_CARD', idFile: null, message: '' });
  const [inventory, setInventory] = useState(null);
  const [propertyId, setPropertyId] = useState('');
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');
  const [quote, setQuote] = useState(null);
  const [quoteKey, setQuoteKey] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState('');
  const [formError, setFormError] = useState('');
  const [referralError, setReferralError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState('');
  const [dragging, setDragging] = useState(false);
  const [requestKey] = useState(() => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const blocked = useMemo(() => new Set(inventory?.blockedDates || []), [inventory]);
  const maxGuests = Number(inventory?.maxGuests || property.guests || 1);

  const loadAvailability = async () => {
    setAvailabilityLoading(true); setAvailabilityError(''); setInventory(null); setQuote(null);
    try {
      const propertyData = await getProperties();
      const selected = propertyData.properties?.find(item => String(item.id) === '1' || item.property_code?.toUpperCase() === property.code.toUpperCase());
      if (!selected) throw Error('This property is not available for applications.');
      setPropertyId(String(selected.id));
      const response = await getUnavailableDates(selected.id);
      if (!Array.isArray(response.blocked_dates)) throw Error('Availability could not be loaded.');
      const blockedDateSet = new Set(response.blocked_dates);
      setInventory({ blockedDates: [...blockedDateSet], maxGuests: selected.max_guests });
      setForm(v => ({ ...v, checkIn: '', checkOut: '' }));
    } catch (error) {
      if (import.meta.env.DEV) console.error('Unable to load property availability:', error);
      setAvailabilityError('We couldn’t load availability. Please retry.');
    } finally { setAvailabilityLoading(false); }
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const timer = setTimeout(loadAvailability, 0);
    return () => clearTimeout(timer);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isOpen) return undefined;
    const close = e => {
      if (e.key === 'Escape') {
        if (picker) setPicker(null);
        else onClose();
      }
      if (picker && pickerRef.current && !pickerRef.current.contains(e.target)) setPicker(null);
    };
    document.addEventListener('keydown', close); document.addEventListener('mousedown', close);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('mousedown', close); };
  }, [isOpen, onClose, picker]);

  const rangeIsClear = (start, end) => {
    for (let d = asDate(start); toLocalDateKey(d) <= end; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) if (blocked.has(toLocalDateKey(d))) return false;
    return true;
  };
  const selectDate = calendarDate => {
    const selected = toLocalDateKey(calendarDate);
    setFormError(''); setQuote(null);
    if (picker === 'checkin') { setForm(v => ({ ...v, checkIn: selected, checkOut: v.checkOut > selected && rangeIsClear(selected, v.checkOut) ? v.checkOut : '' })); setPicker('checkout'); return; }
    if (!form.checkIn || selected <= form.checkIn) return setFormError('Check-out must be later than check-in.');
    if (!rangeIsClear(form.checkIn, selected)) return setFormError('That stay overlaps a booked date. Please choose another range.');
    setForm(v => ({ ...v, checkOut: selected })); setPicker(null);
  };

  useEffect(() => {
    if (!form.checkIn || !form.checkOut || !inventory || !propertyId) return undefined;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setQuoteLoading(true); setQuoteError('');
      try {
        const input = { propertyId, checkIn: form.checkIn, checkOut: form.checkOut, adults: form.adults, children: form.children, infants: form.infants, pets: 0 };
        const data = await getQuote(propertyId, input, { signal: controller.signal });
        if (!data.quote || !hasGstSnapshot(data.quote)) throw Error('The backend returned an incomplete GST quotation.');
        setQuote(data.quote);
        setQuoteKey(quoteInputKey(input));
      } catch (error) { if (error.name !== 'AbortError') setQuoteError(error.message); }
      finally { if (!controller.signal.aborted) setQuoteLoading(false); }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [form.checkIn, form.checkOut, form.adults, form.children, form.infants, inventory, propertyId]);

  if (!isOpen) return null;
  const changeGuests = (key, n) => { setQuote(null); setForm(v => ({ ...v, [key]: Math.max(key === 'adults' ? 1 : 0, Math.min(n, maxGuests - (key === 'adults' ? v.children : v.adults))) })); };
  const acceptFile = file => {
    setFormError(''); if (!file) return;
    const error = validateIdentityFile(file);
    if (error) return setFormError(error);
    setForm(v => ({ ...v, idFile: file }));
  };
  const submit = async e => {
    e.preventDefault();
    if (submitting) return;
    setFormError(''); setReferralError('');
    const isReferral = form.hearAbout === 'REFERRAL';
    const referralName = isReferral ? form.referralName.trim() : '';
    const referralMobile = isReferral ? form.referralMobile : '';
    if (!inventory || availabilityError) return setFormError('Availability must be loaded before submitting.');
    if (!form.checkIn || !form.checkOut || !rangeIsClear(form.checkIn, form.checkOut)) return setFormError('Please choose available stay dates.');
    const currentQuoteKey = quoteInputKey({ propertyId, checkIn: form.checkIn, checkOut: form.checkOut, adults: form.adults, children: form.children, infants: form.infants, pets: 0 });
    if (!quote || quoteKey !== currentQuoteKey || !hasGstSnapshot(quote)) return setFormError('Please wait for a current price and GST quote before submitting.');
    if (!form.phone || !isValidPhoneNumber(form.phone)) return setFormError('Please enter a valid mobile number');
    if (referralName && !referralMobile) { setReferralError('Please enter the reference mobile number.'); return; }
    if (referralMobile && !referralName) { setReferralError('Please enter the reference name.'); return; }
    if (referralMobile && !isValidPhoneNumber(referralMobile)) { setReferralError('Please enter a valid reference mobile number.'); return; }
    const fileError = validateIdentityFile(form.idFile);
    if (fileError) return setFormError(fileError);
    setSubmitting(true);
    try {
      const latest = await getQuote(propertyId, { checkIn: form.checkIn, checkOut: form.checkOut, adults: form.adults, children: form.children, infants: form.infants, pets: 0 });
      if (!latest.quote || !hasGstSnapshot(latest.quote)) throw Error('The latest price could not be verified. Please try again.');
      setQuote(latest.quote);
      const payload = new FormData();
      Object.entries({ property_id: propertyId, application_source: 'TG-0001', check_in: form.checkIn, check_out: form.checkOut, adults: form.adults, children: form.children, infants: form.infants, pets: 0, full_name: form.fullName.trim(), email: form.email.trim(), whatsapp_number: form.phone, phone_country_code: form.phoneCountry, document_type: form.idType, guest_message: form.message.trim() }).forEach(([key, value]) => payload.append(key, value));
      if (form.hearAbout) payload.append('discovery_source', form.hearAbout);
      if (referralName && referralMobile) {
        payload.append('referral_name', referralName);
        payload.append('referral_mobile', parsePhoneNumber(referralMobile)?.number || referralMobile);
      }
      payload.append('identity_document', form.idFile);
      const response = await fetch(`${API_BASE_URL}/api/applications/submit`, { method: 'POST', headers: { 'Idempotency-Key': requestKey }, body: payload });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success || !data.application) {
        if (response.status === 400 && !/referral/i.test(`${data.message || ''} ${data.error || ''}`) && /mobile|phone|whatsapp/i.test(`${data.message || ''} ${data.error || ''}`)) throw Error('Please enter a valid mobile number');
        throw Error(data.error ? `${data.message || 'Unable to submit application'}: ${data.error}` : data.message || 'Your request could not be saved. Please try again.');
      }
      setReference(String(data.application.id));
    } catch (error) { setFormError(error.message); } finally { setSubmitting(false); }
  };

  const calendar = picker && <div className="calendar-popover" ref={pickerRef} role="dialog" aria-label={`Choose ${picker} date`}><div className="calendar-nav"><button type="button" aria-label="Previous month" disabled={month.getFullYear() === new Date().getFullYear() && month.getMonth() === new Date().getMonth()} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft /></button><strong>{picker === 'checkin' ? 'Select check-in' : 'Select check-out'}</strong><button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight /></button></div><Month value={month} start={form.checkIn} end={form.checkOut} blocked={blocked} mode={picker} onSelect={selectDate} /><div className="calendar-legend"><span><i className="available" /> Available</span><span><i className="booked" /> Booked</span></div></div>;
  const title = (icon, name, text) => <div className="section-title">{icon}<div><h3>{name}</h3><p>{text}</p></div></div>;
  const currentQuoteKey = quoteInputKey({ propertyId, checkIn: form.checkIn, checkOut: form.checkOut, adults: form.adults, children: form.children, infants: form.infants, pets: 0 });
  const currentQuote = quoteKey === currentQuoteKey ? quote : null;

  return <div className="booking-modal-overlay" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className="booking-modal-card" role="dialog" aria-modal="true" aria-labelledby="booking-title"><header className="booking-header"><div><span>Kezoi Stays · {property.code}</span><h2 id="booking-title">{reference ? 'Application received' : 'Apply for your stay'}</h2></div><button type="button" onClick={onClose} aria-label="Close application form"><X /></button></header>
    {reference ? <div className="booking-success"><i><Check /></i><h3>Application submitted successfully</h3><p>Our team will review your request and contact you. Your stay is not confirmed until approval.</p><div><span>Application reference</span><strong>{reference}</strong></div><button className="booking-primary" onClick={onClose}>Done</button></div> : <form onSubmit={submit}><main className="booking-body">
      <section className="form-section">{title(<CalendarDays />, 'Stay dates and guest counts', 'Availability is checked live for this property.')}{availabilityLoading ? <div className="booking-status"><span className="spinner" /> Loading availability…</div> : availabilityError ? <div className="booking-error" role="alert"><span>{availabilityError}</span><button type="button" onClick={loadAvailability}><RefreshCw size={14} /> Retry</button></div> : <><div className="date-picker-wrap"><div className="date-fields"><button type="button" className="date-field" onClick={() => setPicker(picker === 'checkin' ? null : 'checkin')} aria-expanded={picker === 'checkin'}><span>Check-in</span><strong>{dateLabel(form.checkIn)}</strong></button><button type="button" className="date-field" onClick={() => setPicker(picker === 'checkout' ? null : 'checkout')} aria-expanded={picker === 'checkout'} disabled={!form.checkIn}><span>Check-out</span><strong>{dateLabel(form.checkOut)}</strong></button></div>{calendar}</div><div className="guests-card"><Counter title="Adults" hint="Age 13+" value={form.adults} min={1} max={maxGuests - form.children} onChange={n => changeGuests('adults', n)} /><Counter title="Children" hint="Age 2–12" value={form.children} min={0} max={maxGuests - form.adults} onChange={n => changeGuests('children', n)} /><Counter title="Infants" hint="Under 2" value={form.infants} min={0} max={5} onChange={n => { setQuote(null); setForm(v => ({ ...v, infants: n })); }} /><small>Maximum {maxGuests} guests, excluding infants</small></div></>}</section>
      <section className="form-section">{title(null, 'Guest contact information', 'Details for the lead guest')}<div className="booking-fields"><label>Full name <b>*</b><input required autoComplete="name" value={form.fullName} onChange={e => setForm(v => ({ ...v, fullName: e.target.value }))} /></label><label>Email <b>*</b><input required type="email" autoComplete="email" value={form.email} onChange={e => setForm(v => ({ ...v, email: e.target.value }))} /></label><label className="phone-field">Mobile / WhatsApp number <b>*</b><PhoneInput international defaultCountry="IN" countryCallingCodeEditable={false} value={form.phone} onCountryChange={country => setForm(v => ({ ...v, phoneCountry: country || 'IN' }))} onChange={phone => setForm(v => ({ ...v, phone: phone || '' }))} /></label></div></section>
      <section className="form-section">{title(<FileCheck2 />, 'Identity-document upload', 'One valid document for the lead guest')}<div className="identity-grid"><label className="identity-type">Document type <b>*</b><select required value={form.idType} onChange={e => setForm(v => ({ ...v, idType: e.target.value }))}><option value="AADHAAR_CARD">Aadhaar card</option><option value="PASSPORT">Passport</option><option value="DRIVING_LICENSE">Driving License</option></select></label><label className={`identity-dropzone ${dragging ? 'is-dragging' : ''} ${form.idFile ? 'has-file' : ''}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); acceptFile(e.dataTransfer.files[0]); }}><input required type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => acceptFile(e.target.files[0])} />{form.idFile ? <><FileCheck2 size={25} /><strong>{form.idFile.name}</strong><span>Click or drop a file to replace it</span></> : <><UploadCloud size={27} /><strong>Upload identity document *</strong><span>JPG, PNG or PDF · Max 5 MB</span></>}</label></div><p className="identity-note">Your document is used only for booking verification.</p></section>
      <section className="form-section referral-section">{title(null, 'How did you hear about Kezoi Stays?', 'Optional')}<label className="discovery-source" htmlFor="discovery-source">Select a source<select id="discovery-source" value={form.hearAbout} onChange={e => { setReferralError(''); setForm(v => ({ ...v, hearAbout: e.target.value })); }}><option value="">Choose an option</option><option value="INSTAGRAM">Instagram</option><option value="FACEBOOK">Facebook</option><option value="X">X</option><option value="YOUTUBE">YouTube</option><option value="REFERRAL">Friend or referral</option><option value="OTHER">Other</option></select></label>{form.hearAbout === 'REFERRAL' && <><p className="referral-helper">Enter the details of the person who referred you.</p><div className="booking-fields"><label htmlFor="referral-name">Reference name <b>*</b><input required id="referral-name" type="text" autoComplete="name" placeholder="Enter the referrer’s name" value={form.referralName} onChange={e => { setReferralError(''); setForm(v => ({ ...v, referralName: e.target.value })); }} /></label><label className="phone-field" htmlFor="referral-mobile">Reference mobile number <b>*</b><PhoneInput id="referral-mobile" international defaultCountry="IN" countryCallingCodeEditable={false} placeholder="Enter the referrer’s mobile number" value={form.referralMobile} onCountryChange={country => setForm(v => ({ ...v, referralCountry: country || 'IN' }))} onChange={phone => { setReferralError(''); setForm(v => ({ ...v, referralMobile: phone || '' })); }} /></label></div></>}{referralError && <div className="booking-error" role="alert"><span>{referralError}</span></div>}</section>
      <section className="form-section">{title(null, 'Price & GST breakdown', 'Pricing and taxes are calculated by Kezoi Stays.')}{quoteLoading ? <div className="booking-status"><span className="spinner" /> Calculating price…</div> : quoteError ? <div className="booking-error" role="alert"><span>{quoteError}</span></div> : <Price quote={currentQuote} />}</section>
      <section className="form-section">{title(null, 'Message and submission', 'Add an optional request before submitting.')}{form.hearAbout === 'REFERRAL' && form.referralName.trim() && form.referralMobile && <div className="referral-review"><span>Referral details</span><strong>{form.referralName.trim()}</strong><small>{form.referralMobile}</small></div>}<label className="message-field">Message or special request <span>(optional)</span><textarea rows="3" value={form.message} onChange={e => setForm(v => ({ ...v, message: e.target.value }))} /></label>{formError && <div className="booking-error" role="alert"><span>{formError}</span></div>}<p className="payment-note">You won’t be charged now. Payment is requested after approval.</p><button type="submit" className="booking-primary submit-application" disabled={submitting || availabilityLoading || quoteLoading || !inventory || !currentQuote}>{submitting ? <><span className="spinner dark" /> Sending application…</> : 'Submit application'}</button></section>
    </main></form>}
  </section></div>;
}
