import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PropertyGallery({ rooms }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  if (!rooms || rooms.length === 0) return null;

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
  };

  const currentRoom = rooms[currentImageIndex];

  return (
    <section 
      ref={ref} 
      className={`gallery-section ${isVisible ? 'animate-fade-up' : 'pre-animate'}`}
    >
      <div className="container">
        <h2 className="section-title">Property Gallery</h2>
        <div className="gallery-layout">
          {/* Hook Image */}
          <div 
            className="gallery-hook-item"
            onClick={() => openLightbox(0)}
          >
            <img src={rooms[0].image} alt={rooms[0].title} />
            <div className="gallery-overlay-hint">
              <span className="view-all-text">View Gallery</span>
            </div>
          </div>

          {/* Grid of remaining images */}
          <div className="gallery-grid-remaining">
            {rooms.slice(1, 5).map((room, index) => {
              const actualIndex = index + 1;
              return (
                <div 
                  key={actualIndex} 
                  className="gallery-grid-item"
                  onClick={() => openLightbox(actualIndex)}
                >
                  <img src={room.image} alt={room.title} />
                  {index === 3 && rooms.length > 5 && (
                    <div className="gallery-overlay">
                      <span className="view-all-text">+{rooms.length - 5} Photos</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={32} strokeWidth={1.5} />
          </button>
          
          <div className="lightbox-content-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            
            <div className="lightbox-inner">
              <div className="lightbox-image-container">
                <img 
                  src={currentRoom.image} 
                  alt={currentRoom.title} 
                  className="lightbox-img" 
                />
              </div>
              
              <div className="lightbox-description">
                <h3 className="lightbox-title">{currentRoom.title}</h3>
                <ul className="lightbox-features">
                  {currentRoom.features.map((feature, fIndex) => (
                    <li key={fIndex} className="lightbox-feature-item">
                      <span className="feature-bullet"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button className="lightbox-nav lightbox-next" onClick={nextImage}>
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}