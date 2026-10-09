import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import desktopHeroLiving from '../assets/kezoi-desktop-hero.png';
import desktopHeroDining from '../assets/kezoi-desktop-hero-dining.png';
import desktopHeroBedroom1 from '../assets/kezoi-desktop-hero-bedroom-1.png';
import desktopHeroBedroom2 from '../assets/kezoi-desktop-hero-bedroom-2.png';
import desktopHeroBedroom3 from '../assets/kezoi-desktop-hero-bedroom-3.png';
import desktopHeroKitchen from '../assets/kezoi-desktop-hero-kitchen.png';
import mobileHeroKitchen from '../assets/kezoi-mobile-hero-kitchen-portrait.png';

const desktopHeroImages = [
  desktopHeroLiving,
  desktopHeroDining,
  desktopHeroBedroom1,
  desktopHeroBedroom2,
  desktopHeroBedroom3,
  desktopHeroKitchen,
];

const mobileHeroImages = [
  'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/living-room/IMG_6309.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-1/IMG_6285.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6166.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-3/IMG_6231.webp',
  mobileHeroKitchen,
  'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/bed-room-2/IMG_6188.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707476.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/kezoi/A+Kezoi_Updated/dining/A6707487.webp',
];

export default function PropertyHero({ property, onOpenBooking }) {
  const [activeHeroImage, setActiveHeroImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroImage((current) => current + 1);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-desktop-slideshow" aria-hidden="true">
        {desktopHeroImages.map((src, index) => (
          <img
            key={src}
            className={`hero-bg-desktop ${index === activeHeroImage % desktopHeroImages.length ? 'is-active' : ''}`}
            src={src}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
      <div className="hero-mobile-slideshow" aria-hidden="true">
        {mobileHeroImages.map((src, index) => (
          <img
            key={src}
            className={`hero-bg-mobile ${index === activeHeroImage % mobileHeroImages.length ? 'is-active' : ''}`}
            src={src}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <h1 className="hero-title animate-fade-in delay-1">
          <span className="hero-title-line">CURATED FOR</span>
          <span className="hero-title-line">ELEVATED LIVING</span>
        </h1>
        <div className="hero-actions animate-fade-in delay-2">
          <button className="btn btn-primary" onClick={onOpenBooking}>Book This Stay</button>
          <a href={property.mapsLink || "https://maps.app.goo.gl/yzzJ91W1RFjDeWfi9"} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <MapPin size={18} />
            View Location
          </a>
        </div>
      </div>
    </section>
  );
}
