import React from 'react';

const buildLogo = (abbr, subline = 'VENTURERS 2026') => {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 400" role="img" aria-label="${abbr} logo">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#0a2d52"/>
        <stop offset="100%" stop-color="#041327"/>
      </linearGradient>
      <linearGradient id="ring" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#ffd44d"/>
        <stop offset="100%" stop-color="#4aa1ff"/>
      </linearGradient>
    </defs>
    <rect width="560" height="400" fill="url(#bg)"/>
    <circle cx="280" cy="182" r="105" fill="none" stroke="url(#ring)" stroke-width="12"/>
    <circle cx="280" cy="182" r="72" fill="rgba(255,255,255,0.04)" stroke="#4aa1ff" stroke-opacity="0.35" stroke-width="2"/>
    <text x="280" y="198" text-anchor="middle" fill="#ffd44d" font-family="Bebas Neue, Arial, sans-serif" font-size="78" letter-spacing="3">${abbr}</text>
    <text x="280" y="300" text-anchor="middle" fill="#d7e9ff" font-family="Manrope, Arial, sans-serif" font-size="22" letter-spacing="4">${subline}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const eventsImages = [
  { img: buildLogo('VR'), fallback: 'V', label: 'Venturers 2026' },
  { img: buildLogo('ST'), fallback: 'ST', label: 'Shark Tank' },
  { img: buildLogo('Z1'), fallback: 'Z1', label: 'Zero to One' },
  { img: buildLogo('CP'), fallback: 'CP', label: 'Chai Pe Charcha' },
  { img: buildLogo('GB'), fallback: 'GB', label: 'Game of Brands' },
  { img: buildLogo('CA'), fallback: 'CA', label: 'Cric Auction' },
  { img: buildLogo('WS'), fallback: 'WS', label: 'Wolf of Wall Street' },
  { img: buildLogo('SS'), fallback: 'SS', label: 'Speaker Session' },
  { img: buildLogo('EDC'), fallback: 'E', label: 'EDC 2026' }
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
