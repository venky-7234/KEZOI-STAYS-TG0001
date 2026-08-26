import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function LocationSection({ location, nearbyPlaces }) {
  return (
    <section className="location-section">
      <div className="container location-grid">
        <div className="map-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
            alt={`Map view of ${location}`} 
            className="map-img" 
          />
        </div>
        
        <div className="location-content">
          <h2 className="location-title">{location}</h2>
          <p className="location-desc">
            Situated in one of the city's most exclusive neighborhoods, this property 
            offers a serene escape just minutes away from major corporate hubs, 
            fine dining, and premium shopping destinations.
          </p>
          
          <div className="location-actions">
            <button className="btn btn-outline btn-small">
              <MapPin size={16} /> Open in Maps
            </button>
            <button className="btn btn-outline btn-small">
              <Navigation size={16} /> Get Directions
            </button>
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