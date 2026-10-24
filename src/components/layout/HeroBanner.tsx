'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

const slides = [
  { id: 1, badge: '🎁 NEW MEMBER', title: 'Welcome Bonus', subtitle: '100% up to ৳10,000', desc: 'First deposit bonus. Min ৳500. 5x rollover.', cta: 'Claim Now', action: 'register', bg: 'linear-gradient(135deg,#003d1a,#00b050)', icon: '⚽' },
  { id: 2, badge: '🔴 LIVE NOW',   title: 'Live Cricket',  subtitle: 'BPL & International', desc: 'Ball-by-ball odds. Toss, runs, wickets.', cta: 'Bet Live', action: 'live', bg: 'linear-gradient(135deg,#1a0a00,#c45200)', icon: '🏏' },
  { id: 3, badge: '🎰 CASINO',     title: 'Live Casino',   subtitle: 'Roulette & Baccarat', desc: 'Professional dealers, 24/7 tables.', cta: 'Play Now', action: 'casino', bg: 'linear-gradient(135deg,#0d0028,#6c00b0)', icon: '🎲' },
  { id: 4, badge: '🚀 BOOST',      title: 'Acca Boost',   subtitle: 'Up to 70% Extra', desc: '4+ selections. Boost on winnings only.', cta: 'Build Acca', action: 'sports', bg: 'linear-gradient(135deg,#1a0a00,#c47a00)', icon: '🏆' },
];

export default function HeroBanner() {
  const { dispatch } = useStore();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ background: slide.bg, padding: '20px 18px', minHeight: 160, transition: 'background .5s', position: 'relative' }}>

        {/* Big icon — decorative, behind text */}
        <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 80, opacity: .15, userSelect: 'none', pointerEvents: 'none' }}>
          {slide.icon}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 340 }}>
          <span style={{ background: 'rgba(255,255,255,.18)', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, letterSpacing: .8, display: 'inline-block', marginBottom: 8 }}>
            {slide.badge}
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 4px', lineHeight: 1.1 }}>{slide.title}</h2>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#f5c518', marginBottom: 6 }}>{slide.subtitle}</div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.75)', marginBottom: 14, lineHeight: 1.5 }}>{slide.desc}</p>
          <button
            onClick={() => slide.action === 'register' && dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } })}
            style={{ background: '#fff', color: '#0a0d18', padding: '10px 22px', borderRadius: 8, fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer' }}>
            {slide.cta} →
          </button>
        </div>
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{ width: i === current ? 18 : 7, height: 7, borderRadius: 4, background: i === current ? '#fff' : 'rgba(255,255,255,.4)', border: 'none', cursor: 'pointer', transition: 'all .3s', padding: 0 }} />
        ))}
      </div>

      {/* Prev / Next */}
      {['‹', '›'].map((arrow, idx) => (
        <button key={arrow} onClick={() => setCurrent(c => idx === 0 ? (c - 1 + slides.length) % slides.length : (c + 1) % slides.length)}
          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [idx === 0 ? 'left' : 'right']: 8, background: 'rgba(0,0,0,.4)', border: 'none', color: '#fff', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {arrow}
        </button>
      ))}
    </div>
  );
}
