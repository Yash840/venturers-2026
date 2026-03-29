import React, { useState, useEffect } from 'react';

export default function Nav({ cartCount, openCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* MOBILE NAV */}
      <div className={`mob-nav ${navOpen ? 'on' : ''}`} id="mobNav">
        <button className="mob-close" onClick={() => setNavOpen(false)}>✕</button>
        <a href="#about" onClick={() => setNavOpen(false)}>About</a>
        <a href="#events" onClick={() => setNavOpen(false)}>Events</a>
        <a href="#schedule" onClick={() => setNavOpen(false)}>Schedule</a>
        <a href="#speakers" onClick={() => setNavOpen(false)}>Speakers</a>
        <a href="#sponsors-partners" onClick={() => setNavOpen(false)}>Partners</a>
        <a href="#faq" onClick={() => setNavOpen(false)}>FAQ</a>
        <a href="#register" onClick={() => setNavOpen(false)}>Register</a>
      </div>

      {/* NAV */}
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <a className="nav-brand" href="#">
          <div className="nav-brand-mark">
            <img src="./logo.png" alt="EDC Logo" className="nav-logo" />
          </div>
          <div className="nav-brand-text">
            <span className="t1">PVG's COET&M</span>
            <span className="t2">Entrepreneurship Development Cell</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#speakers">Speakers</a></li>
          <li><a href="#sponsors-partners">Partners</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#register">Register</a></li>
        </ul>
        <div className="nav-right">
          <button type="button" className="cart-btn" onClick={openCart} aria-label="Open cart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span className="cart-btn-label">Cart</span>
            <span className={`cart-count ${cartCount > 0 ? 'show' : ''}`} id="cartCount">{cartCount}</span>
          </button>
          <button className="nav-register" onClick={() => document.getElementById('register')?.scrollIntoView({behavior:'smooth'})}>Register Now</button>
        </div>
        <div className="ham" onClick={() => setNavOpen(true)}><span></span><span></span><span></span></div>
      </nav>
    </>
  );
}
