import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [cd, setCd] = useState({ d: '00', h: '00', m: '00', s: '00', over: false });

  useEffect(() => {
    const hgrid = document.getElementById('hgrid');
    const htitle = document.getElementById('htitle');
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (hgrid) hgrid.style.transform = `rotateX(55deg) translateY(${scrollY * 0.2}px)`;
      if (htitle) htitle.style.transform = `translateY(${scrollY * 0.18}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);

    const c = document.getElementById('starsCanvas');
    let requestRef;
    if (c && c.getContext) {
      const ctx = c.getContext('2d');
      let stars = [], w, h;

      const resize = () => {
        const hero = c.closest('.hero');
        if (!hero) return;
        w = c.width = hero.offsetWidth;
        h = c.height = hero.offsetHeight;
      };

      const spawn = () => {
        stars = [];
        const n = Math.min(140, Math.floor((w * h) / 9000));
        for (let i = 0; i < n; i++) {
          stars.push({
            x: Math.random() * w, y: Math.random() * h,
            r: Math.random() * 1.1 + 0.25,
            tw: Math.random() * Math.PI * 2,
            sp: 0.015 + Math.random() * 0.035,
            base: 0.12 + Math.random() * 0.35
          });
        }
      };

      const frame = () => {
        ctx.clearRect(0, 0, w, h);
        stars.forEach(s => {
          s.tw += s.sp;
          const a = s.base + Math.sin(s.tw) * 0.22;
          ctx.fillStyle = `rgba(255,212,77,${Math.max(0.06, Math.min(0.85, a))})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        });
        requestRef = requestAnimationFrame(frame);
      };

      resize();
      spawn();
      window.addEventListener('resize', resizeAndSpawn);
      function resizeAndSpawn() { resize(); spawn(); }
      requestRef = requestAnimationFrame(frame);

      const hp = document.getElementById('hparticles');
      if (hp && hp.childElementCount === 0) {
        for (let i = 0; i < 18; i++) {
          const s = document.createElement('span');
          const size = Math.random() * 3 + 1;
          s.style.cssText = `width:${size}px;height:${size}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;animation-delay:${Math.random() * 8}s;animation-duration:${6 + Math.random() * 6}s;opacity:${Math.random() * 0.5 + 0.1}`;
          hp.appendChild(s);
        }
      }

      return () => {
        window.removeEventListener('resize', resizeAndSpawn);
        cancelAnimationFrame(requestRef);
      };
    }
  }, []);

  useEffect(() => {
    const eventDate = new Date('2026-04-10T09:00:00');
    const updateCD = () => {
      const now = new Date();
      const diff = eventDate - now;
      if (diff <= 0) {
        setCd({ over: true });
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCd({
        d: String(d).padStart(2, '0'),
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0'),
        over: false
      });
    };
    
    updateCD();
    const cdInterval = setInterval(updateCD, 1000);
    return () => clearInterval(cdInterval);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <canvas className="stars-hero-canvas" id="starsCanvas" aria-hidden="true"></canvas>
      <div className="hero-grid-wrap"><div className="hero-grid" id="hgrid"></div></div>
      <div className="hero-noise"></div>
      <div className="hero-vignette"></div>
      <div className="hero-particles" id="hparticles"></div>
      <div className="hero-content">
        <h1 className="hero-title" id="htitle">VENTURERS</h1>
        <div className="hero-dates">April 10 – 11, 2026 · PVG's COET&M, Pune</div>
        <p className="hero-subtitle">— Igniting Innovation, Fuelling the Entrepreneurial Spirit —</p>
        <div className="hero-line"></div>
        <p className="hero-org">Presented by <span>PVG's COET&M · Entrepreneurship Development Cell</span></p>
        
        <div className="countdown-bar">
          {cd.over ? (
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', letterSpacing: '4px', color: 'var(--gold)' }}>VENTURERS 2026 IS LIVE!</div>
          ) : (
            <>
              <div className="cd-block"><span className="cd-num" id="cd-d">{cd.d}</span><span className="cd-label">Days</span></div>
              <div className="cd-sep">:</div>
              <div className="cd-block"><span className="cd-num" id="cd-h">{cd.h}</span><span className="cd-label">Hours</span></div>
              <div className="cd-sep">:</div>
              <div className="cd-block"><span className="cd-num" id="cd-m">{cd.m}</span><span className="cd-label">Minutes</span></div>
              <div className="cd-sep">:</div>
              <div className="cd-block"><span className="cd-num" id="cd-s">{cd.s}</span><span className="cd-label">Seconds</span></div>
            </>
          )}
        </div>
        
        <div className="hero-btns">
          <a href="#register" className="btn-g">Register Now</a>
          <a href="#events" className="btn-o">Explore Events</a>
        </div>
      </div>
      <div className="hero-scroll"><div className="scroll-track"></div><span>Scroll</span></div>
    </section>
  );
}
