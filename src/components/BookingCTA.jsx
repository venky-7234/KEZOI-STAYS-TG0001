import React from 'react';

export default function BookingCTA() {
  return (
    <section className="cta-section">
      <div className="container cta-content animate-fade-up">
        <h2 className="cta-title">Loved Your Stay?</h2>
        <p className="cta-desc">Book your next Kezoi stay directly with us for the best experience.</p>
        <div className="cta-actions">
          <button className="btn btn-primary">Book This Property</button>
          <button className="btn btn-outline">Explore Other Kezoi Stays</button>
        </div>
      </div>
    </section>
  );
}