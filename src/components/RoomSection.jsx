import React from 'react';

export default function RoomSection({ rooms }) {
  return (
    <section className="rooms-section">
      <div className="container">
        <h2 className="section-title">Rooms & Spaces</h2>
        
        {rooms.map((room, index) => (
          <div key={index} className={`room-block ${index % 2 !== 0 ? 'reverse' : ''}`}>
            <div className="room-image-wrapper">
              <img src={room.image} alt={room.title} className="room-image animate-slow-zoom" />
            </div>
            <div className="room-content animate-fade-up delay-1">
              <h3 className="room-title">{room.title}</h3>
              <ul className="room-features">
                {room.features.map((feature, fIndex) => (
                  <li key={fIndex} className="room-feature-item">
                    <span className="feature-bullet"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}