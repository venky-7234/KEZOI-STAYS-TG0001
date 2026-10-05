import React from 'react';
import { Globe, Phone, Shield, FileText } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';
import logo from '../assets/kezoi_logo-01.svg';

export default function MicrositeFooter() {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <button
          type="button"
          className="footer-brand" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to the top"
        >
          <img src={logo} alt="Kezoi Stays" className="footer-logo-img" />
          <p className="footer-tagline">Premium stays. Effortless living.</p>
        </button>
        <div className="footer-divider" aria-hidden="true"><span /></div>
        <nav className="footer-links" aria-label="Contact and information links">
          <a href="https://www.kezoistays.com" target="_blank" rel="noopener noreferrer" aria-label="Website" title="Website"><Globe size={24} /></a>
          <a href="https://instagram.com/kezoistays" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
            <InstagramIcon size={24} />
          </a>
          <a href="https://wa.me/919052688188" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp"><WhatsAppIcon size={24} /></a>
          <a href="tel:+919052688188" aria-label="Contact" title="Contact"><Phone size={24} /></a>
          <a href="#" aria-label="Privacy Policy" title="Privacy Policy"><Shield size={24} /></a>
          <a href="#" aria-label="Terms of Service" title="Terms of Service"><FileText size={24} /></a>
        </nav>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Kezoi Stays. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
