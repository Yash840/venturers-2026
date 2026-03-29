import React, { useState } from 'react';

const speakersData = {
  speakers: [
    { id: 'f', avatar: 'F', title: 'Founder Panel', sub: 'Startup founders sharing real journeys and lessons from the field.', tba: 'TBA' },
    { id: 'k', avatar: 'K', title: 'Keynote Spotlight', sub: 'One headline session — vision, grit, and what it takes to build.', tba: 'TBA' },
    { id: 'p', avatar: 'P', title: 'Pitch & Q&A', sub: 'Live audience Q&A after flagship competitions.', tba: 'TBA' },
  ],
  judges: [
    { id: 'j', avatar: 'J', title: 'Shark Tank Panel', sub: 'Evaluating pitches with investor-grade scrutiny.', tba: 'TBA' },
    { id: 'd', avatar: 'D', title: 'Demo Day Judges', sub: 'Zero to One finals — product, traction, and storytelling.', tba: 'TBA' },
    { id: 's', avatar: 'S', title: 'Strategy & Finance', sub: 'Wall Street, Cric Auction, and brand-war verdicts.', tba: 'TBA' },
  ],
  mentors: [
    { id: 'i', avatar: 'I', title: 'Industry Mentor', sub: 'Product, growth, and GTM — office-hours style guidance.', tba: 'TBA' },
    { id: 'n', avatar: 'N', title: 'Networking Mentors', sub: 'Chai Pe Charcha — quick feedback and warm intros.', tba: 'TBA' },
    { id: 'c', avatar: 'C', title: 'Investor Connect', sub: 'Pitch feedback and how to speak the language of capital.', tba: 'TBA' },
  ],
};

export default function Speakers() {
  const [tab, setTab] = useState('speakers');

  return (
    <section id="speakers">
      <div className="speakers-inner">
        <p className="s-label reveal">Voices &amp; Mentors</p>
        <h2 className="s-title reveal gradient-title-anim" style={{ transitionDelay: '.06s' }}>Speakers &amp; judges</h2>
        <div className="s-rule reveal" style={{ transitionDelay: '.1s' }}></div>
        <p className="about-desc reveal" style={{ transitionDelay: '.14s', maxWidth: '640px' }}>Founders, mentors, and sharp minds — names will be revealed closer to the fest. Stay tuned.</p>
        <div className="sp-tabs-wrap reveal" style={{ transitionDelay: '.18s', marginTop: '36px' }}>
          <div className="sp-tabs" role="tablist" aria-label="Speakers categories">
            <button type="button" className={`sp-tab ${tab === 'speakers' ? 'active' : ''}`} role="tab" aria-selected={tab === 'speakers'} onClick={() => setTab('speakers')}>Speakers</button>
            <button type="button" className={`sp-tab ${tab === 'judges' ? 'active' : ''}`} role="tab" aria-selected={tab === 'judges'} onClick={() => setTab('judges')}>Judges</button>
            <button type="button" className={`sp-tab ${tab === 'mentors' ? 'active' : ''}`} role="tab" aria-selected={tab === 'mentors'} onClick={() => setTab('mentors')}>Mentors</button>
          </div>
        </div>
        <div className="sp-panels-stack reveal" style={{ transitionDelay: '.22s', marginTop: '8px' }}>
          <div className={`sp-panel ${tab === 'speakers' ? 'active' : ''}`} role="tabpanel" aria-hidden={tab !== 'speakers'}>
            <div className="sp-cards-grid">
              {speakersData.speakers.map(item => (
                <div key={item.id} className="g-border-wrap">
                  <div className="g-border-inner">
                    <div className="sp-avatar">{item.avatar}</div>
                    <div className="sp-card-title">{item.title}</div>
                    <div className="sp-card-sub">{item.sub}</div>
                    <div className="sp-card-tba">{item.tba}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`sp-panel ${tab === 'judges' ? 'active' : ''}`} role="tabpanel" aria-hidden={tab !== 'judges'}>
            <div className="sp-cards-grid">
              {speakersData.judges.map(item => (
                <div key={item.id} className="g-border-wrap">
                  <div className="g-border-inner">
                    <div className="sp-avatar">{item.avatar}</div>
                    <div className="sp-card-title">{item.title}</div>
                    <div className="sp-card-sub">{item.sub}</div>
                    <div className="sp-card-tba">{item.tba}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`sp-panel ${tab === 'mentors' ? 'active' : ''}`} role="tabpanel" aria-hidden={tab !== 'mentors'}>
            <div className="sp-cards-grid">
              {speakersData.mentors.map(item => (
                <div key={item.id} className="g-border-wrap">
                  <div className="g-border-inner">
                    <div className="sp-avatar">{item.avatar}</div>
                    <div className="sp-card-title">{item.title}</div>
                    <div className="sp-card-sub">{item.sub}</div>
                    <div className="sp-card-tba">{item.tba}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
