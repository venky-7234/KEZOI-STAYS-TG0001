import React, { useEffect, useState } from 'react';
import { Check, FileCheck2, UploadCloud } from 'lucide-react';
import { uploadIdentityDocument } from '../utils/api.js';
import { identityUploadError, validateIdentityFile } from '../utils/quote.js';

const readHandoff = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    enquiryId: params.get('enquiry_id') || params.get('enquiryId') || '',
    token: params.get('token') || params.get('upload_token') || '',
  };
};

export default function IdentityUploadPage() {
  const [{ enquiryId, token }] = useState(readHandoff);
  const [documentType, setDocumentType] = useState('AADHAAR_CARD');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!window.location.search) return;
    window.history.replaceState(null, '', window.location.pathname + window.location.hash);
  }, []);

  const chooseFile = selected => {
    const validationError = validateIdentityFile(selected);
    setError(validationError);
    setFile(validationError ? null : selected);
  };

  const submit = async event => {
    event.preventDefault();
    const validationError = validateIdentityFile(file);
    if (!enquiryId || !token) return setError('This secure upload link is incomplete or invalid. Please request a new link.');
    if (validationError) return setError(validationError);
    setSubmitting(true); setError('');
    try {
      await uploadIdentityDocument(enquiryId, token, documentType, file);
      setComplete(true);
    } catch (uploadError) {
      setError(identityUploadError(uploadError.status));
    } finally { setSubmitting(false); }
  };

  return <main className="identity-page">
    <section className="identity-page-card">
      <div className="identity-page-brand">Kezoi Stays</div>
      {complete ? <div className="identity-page-success"><i><Check /></i><h1>Document uploaded successfully</h1><p>Our team will review your identity document and enquiry. Your stay is not confirmed until staff approval.</p></div> : <>
        <FileCheck2 className="identity-page-icon" />
        <h1>Secure identity-document upload</h1>
        <p>Upload one valid document for booking verification. It is sent directly to Kezoi Stays and is not shared with automation services.</p>
        <form onSubmit={submit}>
          <label>Document type
            <select value={documentType} onChange={event => setDocumentType(event.target.value)}>
              <option value="AADHAAR_CARD">Aadhaar card</option>
              <option value="PASSPORT">Passport</option>
              <option value="DRIVING_LICENCE">Driving licence</option>
            </select>
          </label>
          <label className={`identity-dropzone ${file ? 'has-file' : ''}`}>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={event => chooseFile(event.target.files[0])} />
            <UploadCloud size={28} />
            <strong>{file ? file.name : 'Choose identity document'}</strong>
            <span>JPG, PNG or PDF · Maximum 5 MB</span>
          </label>
          {error && <div className="booking-error" role="alert"><span>{error}</span></div>}
          <button type="submit" className="booking-primary" disabled={submitting}>{submitting ? 'Uploading…' : 'Upload securely'}</button>
        </form>
      </>}
    </section>
  </main>;
}
