import React from 'react';

export default function CheckInInfo({ property }) {
  return (
    <div className="policy-block">
      <h2 className="policy-block-title">Check-In details</h2>
      
      <div className="checkin-times">
        <div className="time-box">
          <span className="time-label">Check-In</span>
          <span className="time-value">{property.checkIn}</span>
        </div>
        <div className="time-box">
          <span className="time-label">Check-Out</span>
          <span className="time-value">{property.checkOut}</span>
        </div>
      </div>

      <div className="policy-info-grid">
        <div className="policy-info-item">
          <span className="policy-info-label">Check-in method</span>
          <span className="policy-info-value">Smart lock with unique access code.</span>
        </div>
        <div className="policy-info-item">
          <span className="policy-info-label">Guest ID verification</span>
          <span className="policy-info-value">Government-issued ID required prior to arrival.</span>
        </div>
        <div className="policy-info-item">
          <span className="policy-info-label">Early check-in</span>
          <span className="policy-info-value">Subject to availability. Please request in advance.</span>
        </div>
        <div className="policy-info-item">
          <span className="policy-info-label">Late checkout</span>
          <span className="policy-info-value">Additional charges apply after {property.checkOut}.</span>
        </div>
      </div>
    </div>
  );
}