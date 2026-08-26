import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/kezoi_logo-01.svg';
import watermarkIcon from '../assets/kezoi_icon-02.svg';

export default function MicrositeHeader({ propertyCode, isScrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Overview', id: 'overview' },
    { label: 'About', id: 'about' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Amenities', id: 'amenities' },
    { label: 'Location', id: 'location' },
    { label: 'Policies', id: 'policies' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div 
          className="header-logo" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
        >
          <img src={logo} alt="Kezoi Stays" className="logo-img" />
        </div>
        <div className="header-actions">
          <button className="btn btn-primary btn-small desktop-only">Book Now</button>
          
          <div className="header-dropdown" style={{ position: 'relative' }}>
            <button 
              className="menu-toggle" 
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
            
            {menuOpen && (
              <div 
                className="dropdown-menu animate-fade-in"
                style={{
                  backgroundImage: `url(${watermarkIcon})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '80%',
                  backgroundBlendMode: 'soft-light'
                }}
              >
                <a 
                  href="https://instagram.com/kezoistays" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="dropdown-item"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-charcoal)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  Instagram
                </a>
                {navLinks.map((link) => (
                  <button 
                    key={link.id} 
                    className="dropdown-item" 
                    onClick={() => scrollToSection(link.id)}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}