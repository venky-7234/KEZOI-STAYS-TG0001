import React from 'react';
import { Globe, MessageCircle, Phone, Shield, FileText } from 'lucide-react';
import logo from '../assets/kezoi_logo-01.svg';

const InstagramIcon = ({ size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function MicrositeFooter() {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <div 
          className="footer-brand" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
        >
          <img src={logo} alt="Kezoi Stays" className="footer-logo-img" />
          <p className="footer-tagline">Premium stays. Effortless living.</p>
        </div>
        <div className="footer-links" style={{ gap: '2.5rem' }}>
          <a href="https://www.kezoistays.com" target="_blank" rel="noopener noreferrer" aria-label="Website" title="Website"><Globe size={24} /></a>
          <a href="https://instagram.com/kezoistays" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
            <InstagramIcon size={24} />
          </a>
          <a href="https://wa.me/919052688188" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp"><MessageCircle size={24} /></a>
          <a href="tel:+919052688188" aria-label="Contact" title="Contact"><Phone size={24} /></a>
          <a href="#" aria-label="Privacy Policy" title="Privacy Policy"><Shield size={24} /></a>
          <a href="#" aria-label="Terms of Service" title="Terms of Service"><FileText size={24} /></a>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Kezoi Stays. All rights reserved.
        </div>
      </div>
    </footer>
  );
}