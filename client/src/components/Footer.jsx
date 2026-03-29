import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">VENTURERS</div>
      <div className="footer-sub">PVG's COET&amp;M · Entrepreneurship Development Cell · April 13–14, 2026</div>
      <ul className="footer-nav">
        <li><a href="#about">About</a></li>
        <li><a href="#events">Events</a></li>
        <li><a href="#schedule">Schedule</a></li>
        <li><a href="#speakers">Speakers</a></li>
        <li><a href="#sponsors-partners">Partners</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#register">Register</a></li>
      </ul>
      <div className="footer-rule"></div>
      <p className="footer-copy">
        © <span id="yr">{new Date().getFullYear()}</span> PVG's COET&amp;M Entrepreneurship Development Cell<br />
        All rights reserved &nbsp;·&nbsp; <em style={{ color: 'rgba(90,90,114,.35)' }}>Igniting Innovation, Fuelling the Entrepreneurial Spirit</em>
      </p>
    </footer>
  );
}
