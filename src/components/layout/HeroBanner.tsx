'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

const slides = [
  {
    id: 1,
    title: 'Welcome Bonus',
    subtitle: '100% up to ৳10,000',
    description: 'On your first deposit. Min ৳500. 5x rollover.',
    cta: 'Claim Now',
    action: 'register',
    bg: 'linear-gradient(135deg, #003d1a 0%, #00b050 50%, #007a38 100%)',
    badge: '🎁 NEW MEMBER',
    icon: '⚽',
  },
  {
    id: 2,
    title: 'Live Cricket Betting',
    subtitle: 'BPL & International',
    description: 'Toss, runs, wickets & player markets. Live odds updated ball by ball.',
    cta: 'Bet Live',
    action: 'live',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #c45200 50%, #8b3a00 100%)',
    badge: '🔴 LIVE NOW',
    icon: '🏏',
  },
  {
    id: 3,
    title: 'Live Casino',
    subtitle: 'Roulette, Baccarat & More',
    description: 'Professional live dealers, 24/7. Join thousands of players.',
    cta: 'Play Now',
    action: 'casino',
    bg: 'linear-gradient(135deg, #0d0028 0%, #6c00b0 50%, #3d0070 100%)',
    badge: '🎰 CASINO',
    icon: '🎲',
  },
  {
    id: 4,
    title: 'Acca Boost',
    subtitle: 'Up to 70% Extra Winnings',
    description: 'Build your accumulator with 4+ selections and earn more.',
    cta: 'Build Acca',
    action: 'sports',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #c47a00 50%, #8b5a00 100%)',
    badge: '🚀 BOOST',
    icon: '🏆',
  },
];

export default function HeroBanner() {
  const { dispatch } = useStore();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  const handleCta = (action: string) => {
    if (action === 'register') dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } });
  };

  return (
    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
      <div style={{ background: slide.bg, padding: '32px 36px', minHeight: 200, transition: 'background 0.5s ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Content */}
        <div style={{ maxWidth: 420 }}>
          <div style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '4px 10px', borderRadius: 20, marginBottom: 10, letterSpacing: 1 }}>
            {slide.badge}
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 900, margin: '0 0 8px', lineHeight: 1.1 }}>{slide.title}</h2>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#f5c518', marginBottom: 10 }}>{slide.subtitle}</div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20, lineHeight: 1.5 }}>{slide.description}</p>
          <button
            onClick={() => handleCta(slide.action)}
            style={{ background: '#fff', color: '#0a0d18', padding: '12px 28px', borderRadius: 8, fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'transform 0.1s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            {slide.cta} →
          </button>
        </div>

        {/* Icon */}
        <div style={{ fontSize: 90, opacity: 0.25, position: 'absolute', right: 36, top: '50%', transform: 'translateY(-50%)', userSelect: 'none' }}>
          {slide.icon}
        </div>
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{ width: i === current ? 20 : 8, height: 8, borderRadius: 4, background: i === current ? '#fff' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
        style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 14 }}>
        ‹
      </button>
      <button onClick={() => setCurrent(c => (c + 1) % slides.length)}
        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 14 }}>
        ›
      </button>
    </div>
  );
}
