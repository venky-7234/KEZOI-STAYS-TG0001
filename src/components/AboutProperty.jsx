import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import StaggeredText from './StaggeredText';

export default function AboutProperty({ description }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`about-section ${isVisible ? 'animate-fade-up' : 'pre-animate'}`}>
      <div className="container about-grid">
        <div>
          <h2 className="about-heading">A Stay Designed Around Comfort.</h2>
        </div>
        <div className="about-text delay-1">
          {description.map((paragraph, index) => (
            <StaggeredText key={index} text={paragraph} baseDelay={0.2} />
          ))}
        </div>
      </div>
    </section>
  );
}