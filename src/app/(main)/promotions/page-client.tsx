'use client';
import { useState } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BetSlip from '@/components/layout/BetSlip';
import BottomNav from '@/components/layout/BottomNav';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import { promotions } from '@/data/mockData';

const bgMap: Record<string, string> = {
  welcome: 'linear-gradient(135deg,#003d1a,#00b050)',
  freeBet: 'linear-gradient(135deg,#001428,#0070c0)',
  acca:    'linear-gradient(135deg,#1a0a00,#c47a00)',
  cashback:'linear-gradient(135deg,#0d0028,#6c00b0)',
  reload:  'linear-gradient(135deg,#1a0000,#c40000)',
};
const emojiMap: Record<string, string> = { welcome:'🎁', freeBet:'🆓', acca:'🚀', cashback:'💰', reload:'♻️' };

function PromosContent() {
  const { state, dispatch } = useStore();
  const [expandedTerms, setExpandedTerms] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1a1f2e' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, minWidth: 0, paddingBottom: 80, paddingRight: state.showBetSlip ? 320 : 0, transition: 'padding-right .25s' }}>

          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#1a0a00,#8b3a00)', padding: '20px 14px', borderBottom: '1px solid #2e3347' }}>
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 4px' }}>🎁 Promotions</h1>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, margin: 0 }}>Exclusive bonuses for new and existing members.</p>
          </div>

          <div style={{ padding: '14px 12px' }}>
            {/* Featured — welcome bonus */}
            <div style={{ background: bgMap.welcome, borderRadius: 12, padding: '20px 18px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 100, opacity: .07, userSelect: 'none' }}>🎁</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ background: '#f5c518', color: '#0a0d18', fontSize: 10, padding: '3px 10px', borderRadius: 20, fontWeight: 700, letterSpacing: .8, display: 'inline-block', marginBottom: 8 }}>⭐ FEATURED</span>
                <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 4px' }}>Welcome Bonus</h2>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#f5c518', marginBottom: 8 }}>100% up to ৳10,000</div>
                <p style={{ color: 'rgba(255,255,255,.8)', fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
                  Deposit ৳500 and play with ৳1,000. First deposit only.
                </p>
                <button onClick={() => !state.isLoggedIn && dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } })}
                  style={{ width: '100%', background: '#fff', color: '#007a38', border: 'none', borderRadius: 10, padding: '13px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
                  {state.isLoggedIn ? 'Claim Bonus' : 'Register & Claim'}
                </button>
              </div>
            </div>

            {/* Other promos grid — 1 col mobile, 2 col desktop */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }} className="sm:grid-cols-2">
              {promotions.slice(1).map(promo => (
                <div key={promo.id} style={{ background: '#1e2435', borderRadius: 12, overflow: 'hidden', border: '1px solid #2e3347' }}>
                  <div style={{ background: bgMap[promo.type], padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 32 }}>{emojiMap[promo.type]}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{promo.title}</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: '#f5c518' }}>{promo.bonus}</div>
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ fontSize: 13, color: '#9aa0b4', marginBottom: 12, lineHeight: 1.5 }}>{promo.description}</p>
                    <button onClick={() => setExpandedTerms(expandedTerms === promo.id ? null : promo.id)}
                      style={{ background: 'none', border: 'none', color: '#9aa0b4', cursor: 'pointer', fontSize: 12, marginBottom: 10, padding: 0 }}>
                      {expandedTerms === promo.id ? '▲' : '▼'} Terms & Conditions
                    </button>
                    {expandedTerms === promo.id && (
                      <div style={{ background: '#0f1320', borderRadius: 8, padding: '10px 12px', marginBottom: 10, fontSize: 12, color: '#9aa0b4', lineHeight: 1.6 }}>
                        {promo.terms}
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

            <div style={{ marginTop: 20, background: '#1e2435', border: '1px solid #2e3347', borderRadius: 10, padding: '14px 16px', fontSize: 12, color: '#9aa0b4', lineHeight: 1.7 }}>
              <strong style={{ color: '#fff' }}>⚠️ Responsible Gambling: </strong>
              All bonuses have wagering requirements. Please read full T&Cs before claiming. 18+ only.
            </div>
          </div>
        </main>
      </div>
      <BetSlip />
      <BottomNav />
      <AuthModal />
      <Notifications />
    </div>
  );
}
export default function PromotionsPage() { return <StoreProvider><PromosContent /></StoreProvider>; }
