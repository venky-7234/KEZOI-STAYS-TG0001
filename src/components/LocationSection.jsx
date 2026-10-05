import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function LocationSection({ 
  location, 
  nearbyPlaces, 
  mapsLink = "https://maps.app.goo.gl/yzzJ91W1RFjDeWfi9", 
  embedMapUrl = "https://maps.google.com/maps?q=17.4048101,78.3643339&t=&z=16&ie=UTF8&iwloc=&output=embed",
  onOpenBooking
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`location-section ${isVisible ? 'animate-fade-up' : 'pre-animate'}`}>
      <div className="container location-grid">
        <div className="map-wrapper">
          <iframe 
            src={embedMapUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0, pointerEvents: 'auto' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map view of ${location}`}
          ></iframe>
        </div>
        
        <div className="location-content">
          <h2 className="location-title">{location}</h2>
          <p className="location-desc">
            Nestled in the prime locality of Puppalaguda near the Financial District, this property offers a premium stay just 
            minutes away from Hyderabad's major IT corridors, Khajaguda Hills, top healthcare facilities, and 
            acclaimed dining and shopping destinations.
          </p>
          
          <div className="location-actions" style={{ flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-small" onClick={onOpenBooking}>
              Book This Stay
            </button>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-small">
              <MapPin size={16} /> Open in Maps
            </a>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-small">
              <Navigation size={16} /> Get Directions
            </a>
          </div>

          <h3 className="nearby-title">Nearby Places</h3>
          <div className="nearby-list">
            {nearbyPlaces.map((place, idx) => (
              <div key={idx} className="nearby-item">
                <span className="nearby-name">{place.name}</span>
                <span className="nearby-time">{place.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}