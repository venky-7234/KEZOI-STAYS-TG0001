import React from 'react';
import { Menu } from 'lucide-react';

export default function MicrositeHeader({ propertyCode, isScrolled }) {
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="header-logo">
          <img src="/logo.png" alt="Kezoi Stays" className="logo-img" />
          <span className="property-code">{propertyCode}</span>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary btn-small desktop-only">Book Now</button>
          <button className="menu-toggle" aria-label="Menu">
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}