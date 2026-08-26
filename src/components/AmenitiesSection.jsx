import React, { useState } from 'react';
import { 
  Wifi, Wind, Tv, Droplet, 
  Refrigerator, Coffee, Microwave, Utensils, 
  Bed, BookOpen, Briefcase, Sparkles, 
  ArrowUpToLine, Car, Shield, Zap,
  Shirt, Gift
} from 'lucide-react';

const iconMap = {
  'Wifi': Wifi, 'Wind': Wind, 'Tv': Tv, 'Droplet': Droplet,
  'Refrigerator': Refrigerator, 'Coffee': Coffee, 'Microwave': Microwave, 'Utensils': Utensils,
  'Bed': Bed, 'BookOpen': BookOpen, 'Briefcase': Briefcase, 'Sparkles': Sparkles,
  'ArrowUpToLine': ArrowUpToLine, 'Car': Car, 'Shield': Shield, 'Zap': Zap,
  'Shirt': Shirt, 'Gift': Gift
};

import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AmenitiesSection({ amenities }) {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  if (!amenities || amenities.length === 0) return null;

  return (
    <section ref={ref} className={`amenities-section ${isVisible ? 'animate-fade-up' : 'pre-animate'}`}>
      <div className="container">
        <h2 className="section-title">Amenities</h2>
        
        <div className="amenities-tabs-wrapper">
          <div className="amenities-tabs">
            {amenities.map((category, idx) => (
              <button 
                key={idx} 
                className={`amenity-tab-btn ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        <div className="amenities-content animate-fade-in" key={activeTab}>
          <div className="amenity-list-grid">
            {amenities[activeTab].items.map((item, i) => {
              const Icon = iconMap[item.icon] || Wifi;
              return (
                <div key={i} className="amenity-item-card">
                  <Icon className="amenity-icon-large" size={32} strokeWidth={1.5} /> 
                  <span className="amenity-name">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}