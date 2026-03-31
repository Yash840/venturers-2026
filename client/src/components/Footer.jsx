import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">VENTURERS</div>
      <div className="footer-sub">PVG's COET&amp;M · Entrepreneurship Development Cell · April 10–11, 2026</div>

      <div className="footer-grid">
        <section>
          <h4 className="footer-heading">Navigate</h4>
          <ul className="footer-nav">
            <li><a href="#about">About</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#schedule">Schedule</a></li>
            {/* 
            <li><a href="#speakers">Speakers</a></li>
            <li><a href="#sponsors-partners">Partners</a></li>
            <li><a href="#faq">FAQ</a></li>
            */}
            
            <li><a href="#register">Register</a></li>
          </ul>
        </section>

        <section>
          <h4 className="footer-heading">For Organization</h4>
          <ul className="footer-nav">
            <li>
              <Link to="/admin" className="footer-route-link">Dashboard</Link>
            </li>
          </ul>
        </section>

        <section>
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-nav">
            <li>Manish Divate: +91 87674 27161</li>
            <li>Atharv Joshi: +91 91720 46569</li>
            <li>Email: pvgedc@gmail.com</li>
          </ul>
        </section>
      </div>

      <div className="footer-rule"></div>
      <p className="footer-copy">
        © <span id="yr">{new Date().getFullYear()}</span> PVG's COET&amp;M Entrepreneurship Development Cell<br />
        All rights reserved &nbsp;·&nbsp; <em style={{ color: 'rgba(90,90,114,.35)' }}>Igniting Innovation, Fuelling the Entrepreneurial Spirit</em>
      </p>
    </footer>
  );
}
