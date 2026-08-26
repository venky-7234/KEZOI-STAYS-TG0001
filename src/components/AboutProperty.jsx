import React from 'react';

export default function AboutProperty({ description }) {
  return (
    <section className="about-section">
      <div className="container about-grid">
        <div>
          <h2 className="about-heading animate-fade-up">A Stay Designed Around Comfort.</h2>
        </div>
        <div className="about-text animate-fade-up delay-1">
          {description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}