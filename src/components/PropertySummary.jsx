import React from 'react';
import { Users, Bed, Bath, Coffee, Wifi, Car } from 'lucide-react';

export default function PropertySummary({ property }) {
  return (
    <section className="property-summary-section">
      <div className="container">
        <div className="summary-strip">
          <div className="summary-item">
            <Users className="summary-icon" size={28} strokeWidth={1.5} />
            <span className="summary-label">{property.guests} Guests</span>
          </div>
          <div className="summary-item">
            <Bed className="summary-icon" size={28} strokeWidth={1.5} />
            <span className="summary-label">{property.bedrooms} Bedrooms</span>
          </div>
          <div className="summary-item">
            <Bed className="summary-icon" size={28} strokeWidth={1.5} />
            <span className="summary-label">{property.beds} Beds</span>
          </div>
          <div className="summary-item">
            <Bath className="summary-icon" size={28} strokeWidth={1.5} />
            <span className="summary-label">{property.bathrooms} Bathrooms</span>
          </div>
          <div className="summary-item">
            <Coffee className="summary-icon" size={28} strokeWidth={1.5} />
            <span className="summary-label">Full Kitchen</span>
          </div>
          <div className="summary-item">
            <Wifi className="summary-icon" size={28} strokeWidth={1.5} />
            <span className="summary-label">Fast Wi-Fi</span>
          </div>
          <div className="summary-item">
            <Car className="summary-icon" size={28} strokeWidth={1.5} />
            <span className="summary-label">Free Parking</span>
          </div>
        </div>
      </div>
    </section>
  );
}