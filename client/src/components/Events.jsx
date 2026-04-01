import React from 'react';

const eventsList = [
  { 
    id: 'sharktank', day: 'day1', dayLabel: 'Day 1 — Apr 10', num: '01', tag: 'Flagship', title: 'Shark Tank', 
    desc: 'Pitch your startup to a panel of real Sharks. Convince investors and industry experts. Bring your deck, own the room.', 
    fee: 'Registration: ₹100  ·  Prize: ₹700 + Trophy', delay: '0s',
    icon: <svg viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg> 
  },
  { 
    id: 'wallst', day: 'day2', dayLabel: 'Day 1 — Apr 10', num: '02', tag: 'Finance', title: 'Wolf of Wall Street', 
    desc: 'Live stock market simulation. Buy, sell, react to market events — build the strongest portfolio and claim the throne.', 
    fee: 'Registration: ₹150  ·  Prize Pool: ₹1,500', delay: '.30s',
    icon: <svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> 
  },
  { 
    id: 'chai', day: 'day1', dayLabel: 'Day 1 — Apr 10', num: '03', tag: 'Networking', title: 'Chai Pe Charcha!', 
    desc: 'Intimate founder networking over chai. Meet real entrepreneurs, spark mentorships and collabs.', 
    fee: 'Free · Open to All', delay: '.12s',
    icon: <svg viewBox="0 0 24 24"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg> 
  },
  { 
    id: 'guest', day: 'day1', dayLabel: 'Day 1 — Apr 10', num: '04', tag: 'Keynote', title: 'Speaker Session', 
    desc: 'Inspiring keynote from a leading entrepreneur — real journey, failures, scaling strategies, and live Q&A with students.', 
    fee: 'Free · Open to All', delay: '.36s',
    icon: <svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg> 
  },
  { 
    id: 'zerotone', day: 'day1', dayLabel: 'Day 2 — Apr 11', num: '05', tag: 'Makeathon', title: 'Zero to One', 
    desc: 'Build a viable startup concept across 3 elimination rounds — Blueprint, Beta Users, and a live Demo Day inspired by Y Combinator.', 
    fee: 'Registration: ₹200  ·  Prize Pool: ₹5,000', delay: '.06s',
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2.5 2.5L16 9"/></svg> 
  },
  { 
    id: 'cric', day: 'day2', dayLabel: 'Day 2 — Apr 11', num: '06', tag: 'Strategy', title: 'Cric Auction', 
    desc: 'IPL-inspired bidding game. Use your budget to build a dream team from real IPL stats — strategy, intuition, and nerve win the day.', 
    fee: 'Registration: ₹200  ·  Prize: ₹700', delay: '.24s',
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> 
  },
  { 
    id: 'gob', day: 'day2', dayLabel: 'Day 2 — Apr 11', num: '07', tag: 'Debate', title: 'Game of Brands', 
    desc: 'Teams of three defend their secret brand in a high-stakes Brand War. Audience votes in prelims; judges crown the champions.', 
    fee: 'Registration: ₹150  ·  Prize Pool: ₹1,800', delay: '.18s',
    icon: <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 
  }
];

export default function Events({ openModal, addToCart, cart }) {
  return (
    <section id="events">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="s-label" style={{ justifyContent: 'center', display: 'flex' }}>What's Inside</p>
          <h2 className="s-title">Event Highlights</h2>
          <div className="s-rule" style={{ marginLeft: 'auto', marginRight: 'auto' }}></div>
        </div>
        
        <div className="events-grid">
          {eventsList.map(ev => {
            const inCart = cart.find(c => c.id === ev.id);

            return (
              <div key={ev.id} className="ev-card reveal" style={{ transitionDelay: ev.delay }}>
                <div className="ev-day-badge">{ev.dayLabel}</div>
                <div className="ev-num">{ev.num}</div>
                <div className="ev-icon">{ev.icon}</div>
                <div className="ev-tag">{ev.tag}</div>
                <h3>{ev.title}</h3>
                <p>{ev.desc}</p>
                <div className="ev-fee">{ev.fee}</div>
                <div className="ev-actions">
                  <button className="ev-more" onClick={() => openModal(ev.id)}>Learn More <span>→</span></button>
                  <button 
                    className={`ev-add-cart ${inCart ? 'added' : ''}`} 
                    onClick={() => !inCart && addToCart(ev.id, ev.title, ev.dayLabel)}
                  >
                    {inCart ? '✓ Added' : '+ Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}