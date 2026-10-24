'use client';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BetSlip from '@/components/layout/BetSlip';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import { promotions } from '@/data/mockData';
import { useState } from 'react';

const promoIcons: Record<string, string> = {
  welcome: '🎁', freeBet: '🆓', acca: '🚀', cashback: '💰', reload: '♻️'
};
const promoColors: Record<string, string> = {
  welcome: 'linear-gradient(135deg, #003d1a, #00b050)',
  freeBet: 'linear-gradient(135deg, #001428, #0070c0)',
  acca: 'linear-gradient(135deg, #1a0a00, #c47a00)',
  cashback: 'linear-gradient(135deg, #0d0028, #6c00b0)',
  reload: 'linear-gradient(135deg, #1a0000, #c40000)',
};

function PromoContent() {
  const { state, dispatch } = useStore();
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedTerms, setExpandedTerms] = useState<string | null>(null);

  const filters = [
    { id: 'all', label: 'All Offers' },
    { id: 'sports', label: '⚽ Sports' },
    { id: 'casino', label: '🎰 Casino' },
    { id: 'new', label: '🆕 New Members' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'auto', paddingRight: state.showBetSlip ? 320 : 0 }}>

          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #1a0a00, #8b3a00)', padding: '32px 24px', borderBottom: '1px solid #2e3347' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>🎁 BONUSES & OFFERS</div>
            <h1 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 8px' }}>Promotions</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0 }}>
              Exclusive bonuses for new and existing members. Claim your offers below.
            </p>
          </div>

          <div style={{ padding: '20px 24px' }}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {filters.map(f => (
                <button key={f.id} onClick={() => setActiveFilter(f.id)}
                  style={{ padding: '8px 18px', background: activeFilter === f.id ? '#f5c518' : '#242938', border: `1px solid ${activeFilter === f.id ? '#f5c518' : '#2e3347'}`, borderRadius: 20, color: activeFilter === f.id ? '#0a0d18' : '#fff', fontSize: 13, cursor: 'pointer', fontWeight: activeFilter === f.id ? 700 : 400 }}>
                  {f.label}
                </button>
              ))}
            </div>

            {/* Welcome bonus featured */}
            <div style={{ background: promoColors.welcome, borderRadius: 16, padding: '28px 32px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', right: -20, top: -20, fontSize: 140, opacity: 0.08 }}>🎁</div>
              <div style={{ maxWidth: 480, position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-block', background: '#f5c518', color: '#0a0d18', fontSize: 11, padding: '4px 10px', borderRadius: 20, fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>
                  ⭐ FEATURED OFFER
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 6px' }}>Welcome Bonus</h2>
                <div style={{ fontSize: 36, fontWeight: 900, color: '#f5c518', marginBottom: 10 }}>100% up to ৳10,000</div>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
                  New members get 100% bonus on their first deposit. Deposit ৳500 and play with ৳1,000!
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } })}
                    style={{ background: '#fff', color: '#007a38', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
                    {state.isLoggedIn ? 'Claim Bonus' : 'Register & Claim'}
                  </button>
                  <button onClick={() => setExpandedTerms(expandedTerms === 'p1' ? null : 'p1')}
                    style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 10, padding: '12px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                    T&Cs
                  </button>
                </div>
                {expandedTerms === 'p1' && (
                  <div style={{ marginTop: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    Min deposit ৳500. 5x rollover required. Valid for 30 days. Sports bets at min odds 1.50 count towards rollover.
                  </div>
                )}
              </div>
            </div>

            {/* All promos grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
              {promotions.slice(1).map(promo => (
                <div key={promo.id} style={{ background: '#1e2435', borderRadius: 14, overflow: 'hidden', border: '1px solid #2e3347', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>

                  {/* Promo header */}
                  <div style={{ background: promoColors[promo.type], padding: '20px 20px', minHeight: 90, display: 'flex', alignItems: 'center', gap: 16, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 80, opacity: 0.1 }}>{promoIcons[promo.type]}</div>
                    <div style={{ fontSize: 36 }}>{promoIcons[promo.type]}</div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 2 }}>{promo.title}</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: '#f5c518' }}>{promo.bonus}</div>
                    </div>
                  </div>

                  {/* Promo body */}
                  <div style={{ padding: '16px 20px' }}>
                    <p style={{ fontSize: 13, color: '#9aa0b4', marginBottom: 14, lineHeight: 1.6 }}>{promo.description}</p>

                    {/* Terms toggle */}
                    <button onClick={() => setExpandedTerms(expandedTerms === promo.id ? null : promo.id)}
                      style={{ background: 'none', border: 'none', color: '#9aa0b4', cursor: 'pointer', fontSize: 12, marginBottom: 12, padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <i className={`fa fa-chevron-${expandedTerms === promo.id ? 'up' : 'down'}`} style={{ fontSize: 10 }}></i>
                      Terms & Conditions
                    </button>

                    {expandedTerms === promo.id && (
                      <div style={{ background: '#0f1320', borderRadius: 8, padding: '10px 12px', marginBottom: 12, fontSize: 12, color: '#9aa0b4', lineHeight: 1.6 }}>
                        {promo.terms}
                      </div>
                    )}

                    {promo.expiresAt && (
                      <div style={{ fontSize: 12, color: '#9aa0b4', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <i className="fa fa-clock" style={{ color: '#f5c518' }}></i>
                        Expires: {new Date(promo.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    )}

                    <button onClick={() => !state.isLoggedIn && dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } })}
                      style={{ width: '100%', padding: '11px', background: '#00b050', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                      {state.isLoggedIn ? 'Claim Offer' : 'Register to Claim'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Responsible gambling notice */}
            <div style={{ marginTop: 28, background: '#1e2435', border: '1px solid #2e3347', borderRadius: 10, padding: '16px 20px', fontSize: 13, color: '#9aa0b4', lineHeight: 1.6 }}>
              <strong style={{ color: '#fff' }}>⚠️ Responsible Gambling:</strong> All bonuses have wagering requirements. Please read full T&Cs before claiming.
              Gambling is for entertainment. Please play within your means. 18+ only.
              <a href="#" style={{ color: '#00b050', marginLeft: 8 }}>Gambling help →</a>
            </div>
          </div>
        </main>
        <BetSlip />
      </div>
      <AuthModal />
      <Notifications />
    </div>
  );
}

export default function PromotionsPage() {
  return <StoreProvider><PromoContent /></StoreProvider>;
}
