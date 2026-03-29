import React, { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      const aboutBg = document.getElementById('aboutBg');
      if (aboutBg) aboutBg.style.transform = `translate(${dx * 20}px, ${dy * 20}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="about" className="parallax-section">
      <div className="parallax-bg" id="aboutBg"></div>
      <div className="about-inner">
        <div className="about-left">
          <p className="s-label reveal">Who We Are</p>
          <h2 className="s-title reveal" style={{ transitionDelay: '.1s' }}>Empowering the Next Generation of Builders</h2>
          <div className="s-rule reveal" style={{ transitionDelay: '.15s' }}></div>
          <p className="about-desc reveal" style={{ transitionDelay: '.2s' }}>
            The Entrepreneurship Development Cell (EDC) at PVG's College of Engineering, Technology &amp; Management is a student-driven powerhouse dedicated to nurturing the entrepreneurial mindset in every aspiring innovator.
          </p>
          <p className="about-desc reveal" style={{ transitionDelay: '.25s' }}>
            We believe every great company starts with a bold idea. <strong>VENTURERS</strong> is our flagship annual event — a celebration of ideas, innovation, and the indomitable spirit to build something from nothing. Spread across <strong>two power-packed days</strong> in April 2026.
          </p>
          <a href="#events" className="btn-g reveal" style={{ marginTop: '16px', transitionDelay: '.3s', display: 'inline-block', maxWidth: 'max-content' }}>Explore Events</a>
        </div>
        <div className="about-right">
          <div className="stat-card reveal-right" style={{ transitionDelay: '.1s' }}>
            <div className="stat-num">500+</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: '17px', color: 'var(--cream)', marginBottom: '4px' }}>Participants Expected</div>
              <div className="stat-label">From across Pune</div>
            </div>
          </div>
          <div className="stat-card reveal-right" style={{ transitionDelay: '.18s' }}>
            <div className="stat-num">7</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: '17px', color: 'var(--cream)', marginBottom: '4px' }}>Unique Events</div>
              <div className="stat-label">Pitching · Finance · Strategy · More</div>
            </div>
          </div>
          <div className="stat-card reveal-right" style={{ transitionDelay: '.26s' }}>
            <div className="stat-num">₹10K</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: '17px', color: 'var(--cream)', marginBottom: '4px' }}>Prize Pool</div>
              <div className="stat-label">Cash prizes &amp; awards</div>
            </div>
          </div>
          <div className="stat-card reveal-right" style={{ transitionDelay: '.34s' }}>
            <div className="stat-num">2</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: '17px', color: 'var(--cream)', marginBottom: '4px' }}>Days of Innovation</div>
              <div className="stat-label">April 13 – 14, 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
