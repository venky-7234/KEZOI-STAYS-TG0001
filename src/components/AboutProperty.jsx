import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AboutProperty() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`about-section ${isVisible ? 'animate-fade-up' : 'pre-animate'}`}>
      <div className="container about-grid">
        <div>
          <span className="about-eyebrow">Kezoi Stays</span>
          <h2 className="about-heading">A Home Away From the Everyday.</h2>
        </div>
        <div className="about-text delay-1">
          <p className="about-lead">Some places are made for staying. Others make you want to slow down a little longer.</p>
          <p>Welcome to <em>Kezoi Stays, Hyderabad</em>, a thoughtfully designed 3-bedroom home spanning <strong>2,220 sq. ft.</strong>, where spacious interiors, private balconies, and little comforts come together to make every stay feel personal.</p>
          <p>Whether it's a family gathering, a work trip, or a few days away from the everyday, there's room here to unwind, reconnect, and feel at home.</p>
        </div>
      </div>
    </section>
  );
}
