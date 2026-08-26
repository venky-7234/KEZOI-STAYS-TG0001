import React from 'react';
import logo from '../assets/kezoi_logo-01.svg';

export default function MicrositeFooter() {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <div className="footer-brand">
          <img src={logo} alt="Kezoi Stays" className="footer-logo-img" />
          <p className="footer-tagline">Premium stays. Effortless living.</p>
        </div>
        <div className="footer-links">
          <a href="#">Website</a>
          <a href="#">Instagram</a>
          <a href="#">WhatsApp</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Kezoi Stays. All rights reserved.
        </div>
      </div>
    </footer>
  );
}