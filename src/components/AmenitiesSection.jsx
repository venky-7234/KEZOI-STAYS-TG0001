import React from 'react';
import { 
  Wifi, Wind, Tv, Droplet, 
  Refrigerator, Coffee, Microwave, Utensils, 
  Bed, BookOpen, Briefcase, Sparkles, 
  ArrowUpToLine, Car, Shield, Zap 
} from 'lucide-react';

const iconMap = {
  'Wifi': Wifi, 'Wind': Wind, 'Tv': Tv, 'Droplet': Droplet,
  'Refrigerator': Refrigerator, 'Coffee': Coffee, 'Microwave': Microwave, 'Utensils': Utensils,
  'Bed': Bed, 'BookOpen': BookOpen, 'Briefcase': Briefcase, 'Sparkles': Sparkles,
  'ArrowUpToLine': ArrowUpToLine, 'Car': Car, 'Shield': Shield, 'Zap': Zap
};

export default function AmenitiesSection({ amenities }) {
  return (
    <section className="amenities-section">
      <div className="container">
        <h2 className="section-title">Amenities</h2>
        <div className="amenities-grid">
          {amenities.map((category, idx) => (
            <div key={idx} className="amenity-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="amenity-list">
                {category.items.map((item, i) => {
                  const Icon = iconMap[item.icon] || Wifi;
                  return (
                    <div key={i} className="amenity-item">
                      <Icon className="amenity-icon" size={24} strokeWidth={1.5} /> 
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}