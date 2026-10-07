import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ImagePlus, Images, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

function Photo({ room, src, index, hook = false, onClick }) {
  const label = room.extraPhotoLabel && index === room.images.length - 1 ? room.extraPhotoLabel : index === 0 ? 'Hook photo' : `Supporting photo ${index}`;
  return <button type="button" className={`room-photo-slot ${hook ? 'hook' : ''} ${room.naturalAspect ? 'natural-aspect' : ''} ${room.adaptiveAspect ? 'adaptive-aspect' : ''} ${src ? '' : 'placeholder'}`} onClick={onClick} aria-label={`${src ? 'Enlarge' : 'Photo slot for'} ${room.title}, ${label}`}>
    {src ? <img src={src} alt={`${room.title} — ${label}`} loading="lazy" /> : <><ImagePlus aria-hidden="true" /><span>{label}</span><small>{room.title}</small></>}
  </button>;
}

export default function PropertyGallery({ rooms }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const touchStartX = useRef(null);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
  const displayRooms = rooms;
  const preview = useMemo(() => {
    const previewRoomTitles = ['Living room', 'Dining', 'Bedroom 1', 'Bedroom 2', 'Bedroom 3'];
    return previewRoomTitles.map(title => {
      const room = displayRooms.find(item => item.title === title);
      return room ? { room, src: room.images[0], index: 0 } : null;
    }).filter(Boolean);
  }, [displayRooms]);

  useEffect(() => {
    if (!galleryOpen && !activePhoto) return undefined;
    const close = event => {
      if (event.key !== 'Escape') return;
      if (activePhoto) setActivePhoto(null);
      else setGalleryOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', close);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', close); };
  }, [galleryOpen, activePhoto]);

  if (!rooms?.length) return null;
  const activeImages = activePhoto?.room.images.filter(Boolean) || [];
  const showAdjacentPhoto = direction => {
    if (activeImages.length < 2) return;
    const currentIndex = activeImages.indexOf(activePhoto.src);
    const nextIndex = (currentIndex + direction + activeImages.length) % activeImages.length;
    setActivePhoto({ room: activePhoto.room, src: activeImages[nextIndex], index: nextIndex });
  };
  return <section ref={ref} className={`gallery-section landing-gallery ${isVisible ? 'animate-fade-up' : 'pre-animate'}`}>
    <div className="container"><div className="gallery-heading"><div><span>Take a closer look</span><h2>Property Gallery</h2></div><p>Explore every room and the three balconies connected to the living and bedroom spaces.</p></div>
      <div className="landing-gallery-grid"><Photo {...preview[0]} hook onClick={() => preview[0]?.src && setActivePhoto(preview[0])} /><div className="landing-gallery-supporting">{preview.slice(1, 5).map(photo => <Photo key={`${photo.room.title}-${photo.index}`} {...photo} onClick={() => photo.src && setActivePhoto(photo)} />)}</div></div>
      <button type="button" className="gallery-explore-cta" onClick={() => setGalleryOpen(true)}><Images size={19} /><span>Explore full gallery</span><ArrowRight size={18} /></button>
    </div>
    {galleryOpen && createPortal(<div className="full-gallery-overlay" role="dialog" aria-modal="true" aria-labelledby="full-gallery-title"><header><div><span>Kezoi Stays · TG-0001</span><h2 id="full-gallery-title">Explore the residence</h2></div><button type="button" aria-label="Close full gallery" onClick={() => setGalleryOpen(false)}><X /></button></header><main>{displayRooms.map(room => <article className="full-gallery-room" key={room.title}><div className="full-gallery-room-copy"><span>Inside the residence</span><h3>{room.title}</h3><p>{room.description}</p>{room.includes && <strong>{room.includes}</strong>}</div><div className={`room-photo-grid ${room.images.length === 6 && room.images.every(Boolean) ? 'six-cards' : ''} ${room.images.length === 3 && room.images.every(Boolean) ? 'three-cards' : ''}`}>{room.images.map((src, index) => { const photo = { room, src, index }; return <Photo key={index} {...photo} hook={index === 0} onClick={() => src && setActivePhoto(photo)} />; })}</div></article>)}</main></div>, document.body)}
    {activePhoto && createPortal(<div className="lightbox room-lightbox" role="dialog" aria-modal="true" aria-label={`${activePhoto.room.title} enlarged photo`} onClick={() => setActivePhoto(null)} onTouchStart={event => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={event => { if (touchStartX.current == null) return; const distance = event.changedTouches[0].clientX - touchStartX.current; touchStartX.current = null; if (Math.abs(distance) > 45) showAdjacentPhoto(distance < 0 ? 1 : -1); }}><button type="button" className="lightbox-close" aria-label="Close enlarged photo" onClick={() => setActivePhoto(null)}><X /></button>{activeImages.length > 1 && <><button type="button" className="room-lightbox-arrow previous" aria-label="Previous photo" onClick={event => { event.stopPropagation(); showAdjacentPhoto(-1); }}><ChevronLeft /></button><button type="button" className="room-lightbox-arrow next" aria-label="Next photo" onClick={event => { event.stopPropagation(); showAdjacentPhoto(1); }}><ChevronRight /></button></>}<figure onClick={event => event.stopPropagation()}><img src={activePhoto.src} alt={`${activePhoto.room.title} — enlarged photo`} /><figcaption>{activePhoto.room.title}</figcaption><div className="room-lightbox-dots" aria-label={`${activePhoto.room.title} photo navigation`}>{activeImages.map((src, index) => <button type="button" key={src} className={src === activePhoto.src ? 'active' : ''} aria-label={`View ${activePhoto.room.title} photo ${index + 1}`} aria-current={src === activePhoto.src ? 'true' : undefined} onClick={() => setActivePhoto({ room: activePhoto.room, src, index })} />)}</div></figure></div>, document.body)}
  </section>;
}
