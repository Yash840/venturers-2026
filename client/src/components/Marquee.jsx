import React from 'react';

const eventsImages = [
  { img: './images/events/venturers-2026.jpg', fallback: 'V', label: 'Venturers 2026' },
  { img: './images/events/shark-tank.jpg', fallback: 'ST', label: 'Shark Tank' },
  { img: './images/events/zero-to-one.jpg', fallback: 'Z', label: 'Zero to One' },
  { img: './images/events/chai-pe-charcha.jpg', fallback: 'CP', label: 'Chai Pe Charcha' },
  { img: './images/events/game-of-brands.jpg', fallback: 'GB', label: 'Game of Brands' },
  { img: './images/events/cric-auction.jpg', fallback: 'CA', label: 'Cric Auction' },
  { img: './images/events/wall-street.jpg', fallback: 'TW', label: 'Thrones of Wall Street' },
  { img: './images/events/guest-session.jpg', fallback: 'GS', label: 'Guest Session' },
  { img: './images/events/edc-pvg.jpg', fallback: 'E', label: 'EDC 2026' }
];

export default function Marquee() {
  return (
    <div className="gallery-strip" aria-label="Event highlights marquee">
      <div className="gallery-inner" id="galleryInner">
        <div className="gallery-seq">
          {eventsImages.map((e, i) => (
            <div key={`seq1-${i}`} className="gallery-event-card">
              <div className="gallery-event-media">
                <img src={e.img} alt="" loading="lazy" decoding="async" width="560" height="400" onError={(e) => { e.target.style.opacity = '0' }} />
                <div className="gallery-event-fallback">{e.fallback}</div>
              </div>
              <div className="gallery-event-label">{e.label}</div>
            </div>
          ))}
        </div>
        <div className="gallery-seq" aria-hidden="true">
          {eventsImages.map((e, i) => (
            <div key={`seq2-${i}`} className="gallery-event-card">
              <div className="gallery-event-media">
                <img src={e.img} alt="" loading="lazy" decoding="async" width="560" height="400" onError={(e) => { e.target.style.opacity = '0' }} />
                <div className="gallery-event-fallback">{e.fallback}</div>
              </div>
              <div className="gallery-event-label">{e.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
