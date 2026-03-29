import React from 'react';

const sponsors = [
  'partner-01.png', 'partner-02.png', 'partner-03.png', 'partner-04.png',
  'partner-05.png', 'partner-06.png', 'partner-07.png', 'partner-08.png'
];

export default function Sponsors() {
  return (
    <section id="sponsors-partners" aria-label="Sponsors and partners">
      <div className="sponsors-head">
        <p className="s-label" style={{ display: 'block', marginBottom: '10px' }}>Backed By</p>
        <h2 className="s-title" style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}>Sponsors &amp; Partners</h2>
        <div className="s-rule" style={{ margin: '16px auto 0', maxWidth: '40px' }}></div>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '20px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.7' }}>
          Thank you to every brand that believes in student builders. Their logos scroll below once you add the image files.
        </p>
      </div>
      <div className="sponsors-marquee-mask">
        <div className="sponsors-marquee-track" id="sponsorMarqueeTrack">
          <div className="sponsor-marquee-seq">
            {sponsors.map((img, i) => (
              <div key={`s1-${i}`} className="sponsor-marquee-slot">
                <div className="sponsor-logo-inner">
                  <img src={`./images/sponsors/${img}`} alt={`Sponsor ${i + 1}`} loading="lazy" decoding="async" width="200" height="80" onError={(e) => { e.target.classList.add('is-hidden'); e.target.nextElementSibling.classList.add('is-visible'); }} />
                  <span className="sponsor-logo-fallback">{img}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="sponsor-marquee-seq" aria-hidden="true">
            {sponsors.map((img, i) => (
              <div key={`s2-${i}`} className="sponsor-marquee-slot">
                <div className="sponsor-logo-inner">
                  <img src={`./images/sponsors/${img}`} alt="" loading="lazy" decoding="async" width="200" height="80" onError={(e) => { e.target.classList.add('is-hidden'); e.target.nextElementSibling.classList.add('is-visible'); }} />
                  <span className="sponsor-logo-fallback">{img}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
