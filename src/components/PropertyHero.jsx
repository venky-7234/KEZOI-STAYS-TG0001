import React from 'react';
import { MapPin } from 'lucide-react';

export default function PropertyHero({ property }) {
  return (
    <section className="hero">
      <img 
        src={property.images[0]} 
        alt={property.name} 
        className="hero-bg animate-slow-zoom"
      />
      <div className="hero-overlay"></div>
      
      <div className="container hero-content">
        <h2 className="hero-subtitle animate-fade-in delay-1">{property.propertyType} • {property.location}</h2>
        <h1 className="hero-title animate-fade-in delay-1">{property.name}</h1>
        <p className="hero-meta animate-fade-in delay-2">
          {property.bedrooms} Bedrooms • {property.bathrooms} Bathrooms • {property.guests} Guests
        </p>
        <div className="hero-actions animate-fade-in delay-2">
          <button className="btn btn-primary">Book This Stay</button>
          <a href="https://maps.app.goo.gl/K815NgUL4tebGGoJ6?g_st=aw" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <MapPin size={18} />
            View Location
          </a>
        </div>
      </div>
    </section>
  );
}