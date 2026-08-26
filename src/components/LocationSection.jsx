import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function LocationSection({ location, nearbyPlaces }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`location-section ${isVisible ? 'animate-fade-up' : 'pre-animate'}`}>
      <div className="container location-grid">
        <div className="map-wrapper">
          <iframe 
            src="https://maps.google.com/maps?q=Vishnu+Vistara,+Madhapur,+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
            Nestled in the vibrant heart of Madhapur, this property offers a premium stay just 
            steps away from Hyderabad's bustling IT corridors, acclaimed dining spots, and 
            top-tier entertainment hubs like Durgam Cheruvu.
          </p>
          
          <div className="location-actions">
            <a href="https://maps.app.goo.gl/K815NgUL4tebGGoJ6?g_st=aw" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-small">
              <MapPin size={16} /> Open in Maps
            </a>
            <a href="https://maps.app.goo.gl/K815NgUL4tebGGoJ6?g_st=aw" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-small">
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