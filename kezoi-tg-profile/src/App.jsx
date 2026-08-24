import React from 'react';
import { Globe, Map, MessageCircle, Phone, Mail } from 'lucide-react';

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header animate-fade-in">
        <div className="logo-text">Kezoi</div>
      </header>

      {/* Hero Image */}
      <div className="hero animate-fade-in">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Premium Kezoi Stay" 
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Main Content */}
      <main className="content">
        <h1 className="title animate-fade-in delay-1">
          Stay Different. <span>Stay Kezoi.</span>
        </h1>
        
        <p className="intro animate-fade-in delay-2">
          Welcome to your curated luxury experience. 
          Everything you need for an unforgettable stay is just a tap away.
        </p>

        {/* Action Buttons Grid */}
        <div className="actions-grid animate-fade-in delay-3">
          <a href="#" className="btn btn-primary">
            <Globe size={20} />
            Visit Website
          </a>
          
          <a href="#" className="btn btn-secondary">
            <Map size={20} />
            Explore Stays
          </a>

          <div className="actions-row">
            <a href="#" className="btn btn-outline">
              <MessageCircle size={20} />
              WhatsApp
            </a>
            <a href="#" className="btn btn-outline">
              <Phone size={20} />
              Call
            </a>
          </div>
          
          <div className="social-row">
            <a href="#" className="social-icon" aria-label="Email Us">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer animate-fade-in delay-4">
        &copy; {new Date().getFullYear()} Kezoi Stays. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
