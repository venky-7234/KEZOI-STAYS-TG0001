import React from 'react';
import { MessageCircle, Phone, AlertCircle } from 'lucide-react';

export default function GuestSupport() {
  return (
    <section className="support-section">
      <div className="container">
        <div className="support-card animate-fade-up">
          <h2 className="support-title">Need Anything During Your Stay?</h2>
          <p className="support-desc">Our dedicated concierge is available 24/7 to ensure your stay is flawless.</p>
          
          <div className="support-actions">
            <a href="https://wa.me/919052688188" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle size={18} /> WhatsApp Kezoi
            </a>
            <a href="tel:+919052688188" className="btn btn-outline">
              <Phone size={18} /> Call Support
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}