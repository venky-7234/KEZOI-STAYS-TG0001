import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PropertyGallery({ images }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="gallery-section">
      <div className="container">
        <h2 className="section-title">Property Gallery</h2>
        <div className="gallery-grid">
          {images.slice(0, 5).map((src, index) => (
            <div 
              key={index} 
              className={`gallery-item ${index === 0 ? 'gallery-item-1' : ''}`}
              onClick={() => openLightbox(index)}
            >
              <img src={src} alt={`Property view ${index + 1}`} />
              {index === 4 && images.length > 5 && (
                <div className="gallery-overlay">
                  <span className="view-all-text">View All Photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={32} strokeWidth={1.5} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            
            <img 
              src={images[currentImageIndex]} 
              alt="Fullscreen view" 
              className="lightbox-img" 
            />
            
            <button className="lightbox-nav lightbox-next" onClick={nextImage}>
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}