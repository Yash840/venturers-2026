import React, { useState, useEffect } from 'react';

const day1Schedule = [
  { time: '09:00 AM', title: 'Registration & Welcome Desk', desc: 'Check-in opens. Collect your kits, find your teams, and soak in the atmosphere.', delay: '0s' },
  { time: '10:00 AM', title: 'Inaugural Ceremony', desc: 'Opening address by the Principal, EDC faculty advisor, and the Guest Speaker from the startup ecosystem.', delay: '.08s' },
  { time: '10:30 AM', title: 'Guest Session — Keynote Address', desc: 'Live keynote by an industry founder. Insights, stories, and interactive Q&A with the audience.', delay: '.12s' },
  { time: '11:30 AM', title: 'Chai Pe Charcha!', desc: 'Founder networking session. One-on-one conversations, idea pitches, and mentorship over chai.', delay: '.16s' },
  { time: '12:30 PM', title: 'Lunch Break', desc: 'Recharge and connect with fellow participants, mentors, and industry professionals.', delay: '.20s' },
  { time: '01:30 PM', title: 'Shark Tank Pitches Begin', desc: 'Teams pitch their startups to the panel of Sharks. 7 minutes each, full energy.', delay: '.24s' },
  { time: '03:30 PM', title: 'Zero to One — Round 1 & 2', desc: 'Blueprint submissions reviewed. Beta User simulation rounds run in parallel.', delay: '.28s' },
  { time: '05:30 PM', title: 'Day 1 Wrap & Announcements', desc: 'End-of-day summary. Advancing teams announced. Networking continues.', delay: '.32s' }
];

const day2Schedule = [
  { time: '09:30 AM', title: 'Day 2 Check-In', desc: 'Day two begins. Finalists for Zero to One confirmed. All other events briefed.', delay: '0s' },
  { time: '10:00 AM', title: 'Game of Brands — Prelims', desc: 'Brand War kicks off. Teams face off in preliminary rounds with audience voting.', delay: '.06s' },
  { time: '11:00 AM', title: 'Cric Auction & Thrones of Wall Street', desc: 'IPL auction strategy game and live stock market simulation running in parallel tracks.', delay: '.10s' },
  { time: '12:30 PM', title: 'Lunch Break', desc: 'Midday recharge. Final round prep for all competing teams.', delay: '.14s' },
  { time: '01:30 PM', title: 'Finals — All Events', desc: 'Zero to One Demo Day, Game of Brands Grand Final, Shark Tank Shark\'s Choice deliberation.', delay: '.18s' },
  { time: '04:30 PM', title: 'Judging & Deliberation', desc: 'All judges and sharks deliberate. Results compiled. Award ceremony prepared.', delay: '.22s' },
  { time: '06:00 PM', title: 'Prize Distribution & Closing', desc: 'Award ceremony, Shark\'s Choice Award, closing remarks, and the official end of VENTURERS 2026.', delay: '.26s' }
];

export default function Schedule() {
  const [day, setDay] = useState('day1');

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      const schedBg = document.getElementById('schedBg');
      if (schedBg) schedBg.style.transform = `translate(${dx * 15}px, ${dy * 15}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const items = day === 'day1' ? day1Schedule : day2Schedule;

  return (
    <section id="schedule" className="parallax-section">
      <div className="parallax-bg" id="schedBg"></div>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="s-label reveal" style={{ justifyContent: 'center', display: 'flex' }}>Two Days at a Glance</p>
          <h2 className="s-title reveal" style={{ transitionDelay: '.1s' }}>Event Schedule</h2>
          <div className="s-rule reveal" style={{ marginLeft: 'auto', marginRight: 'auto', transitionDelay: '.15s' }}></div>
          <div className="day-tabs reveal" style={{ margin: '0 auto', transitionDelay: '.2s' }}>
            <button className={`day-tab ${day === 'day1' ? 'active' : ''}`} onClick={() => setDay('day1')}>Day 1 — Apr 13</button>
            <button className={`day-tab ${day === 'day2' ? 'active' : ''}`} onClick={() => setDay('day2')}>Day 2 — Apr 14</button>
          </div>
        </div>
        <div className="sched-grid">
          <div className="sched-sticky">
            <p className="s-label reveal">Venue</p>
            <div className="reveal" style={{ fontFamily: "'Playfair Display'", fontSize: '22px', color: 'var(--cream)', marginBottom: '6px', transitionDelay: '.1s' }}>PVG's COET&M</div>
            <div className="reveal" style={{ fontSize: '13px', color: 'var(--muted)', transitionDelay: '.12s' }}>Pune, Maharashtra</div>
            <div className="reveal" style={{ marginTop: '36px', transitionDelay: '.15s' }}>
              <div style={{ fontFamily: "'Space Mono'", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '10px' }}>Event Dates</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: '18px', color: 'var(--cream)' }}>April 13 – 14, 2026</div>
            </div>
            <div className="reveal" style={{ marginTop: '32px', transitionDelay: '.2s' }}>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.8 }}>Two power-packed days of competitions, keynotes, networking, and pure entrepreneurial energy.</p>
            </div>
          </div>
          <div className="timeline">
            {items.map((item, idx) => (
              <div key={idx} className="t-item reveal" style={{ transitionDelay: item.delay }}>
                <div className="t-time">{item.time}</div>
                <div className="t-title">{item.title}</div>
                <div className="t-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
