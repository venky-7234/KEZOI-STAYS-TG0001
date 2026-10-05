import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/kezoi_logo-01.svg';
import watermarkIcon from '../assets/kezoi_icon-02.svg';
import { InstagramIcon } from './BrandIcons';

export default function MicrositeHeader({ propertyCode, isScrolled, onOpenBooking }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    if (menuOpen && window.matchMedia('(max-width: 768px)').matches) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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
          <button className="btn btn-primary btn-small desktop-only" onClick={onOpenBooking}>Book Now</button>
          
          <div className="header-dropdown" style={{ position: 'relative' }}>
            <button 
              className="menu-toggle" 
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
            
              <div
                id="site-navigation"
                className={`dropdown-menu ${menuOpen ? 'is-open' : ''}`}
                aria-hidden={!menuOpen}
              >
                <button className="mobile-menu-close" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                  <X size={30} strokeWidth={1.5} />
                </button>
                <img 
                  src={watermarkIcon} 
                  alt="" 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50%',
                    opacity: 0.1,
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <button
                    className="dropdown-item"
                    onClick={() => { onOpenBooking(); setMenuOpen(false); }}
                    style={{ backgroundColor: 'var(--color-gold)', color: '#0f3d34', fontWeight: 'bold' }}
                  >
                    ✨ Book Now
                  </button>
                  <a 
                    href="https://instagram.com/kezoistays" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="dropdown-item"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-charcoal)' }}
                  >
                    <InstagramIcon size={18} />
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
              </div>
          </div>
        </div>
      </div>
    </header>
  );
}
