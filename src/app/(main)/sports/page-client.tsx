'use client';
import { useState } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BetSlip from '@/components/layout/BetSlip';
import BottomNav from '@/components/layout/BottomNav';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import MatchCard from '@/components/sports/MatchCard';
import { liveMatches, upcomingMatches, sports } from '@/data/mockData';

function SportsContent() {
  const { state } = useStore();
  const [activeSport, setActiveSport] = useState('all');
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const allMatches = [...liveMatches, ...upcomingMatches];
  const filtered = allMatches.filter(m => {
    if (activeSport !== 'all' && m.sportId !== activeSport) return false;
    if (showLiveOnly && m.status !== 'live') return false;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1a1f2e' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, minWidth: 0, paddingBottom: 80, paddingRight: state.showBetSlip ? 320 : 0, transition: 'padding-right .25s' }}>

          {/* Page header */}
          <div style={{ background: '#0f1320', borderBottom: '1px solid #2e3347', padding: '14px 12px' }}>
            <h1 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 12px' }}>⚽ Sports Betting</h1>
            {/* Sport chips — horizontal scroll */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              <button onClick={() => setActiveSport('all')}
                style={{ padding: '6px 14px', background: activeSport === 'all' ? '#00b050' : '#242938', border: `1px solid ${activeSport === 'all' ? '#00b050' : '#2e3347'}`, borderRadius: 20, color: '#fff', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeSport === 'all' ? 700 : 400, flexShrink: 0 }}>
                All
              </button>
              {sports.slice(0, 8).map(s => (
                <button key={s.id} onClick={() => setActiveSport(s.id)}
                  style={{ padding: '6px 14px', background: activeSport === s.id ? '#00b050' : '#242938', border: `1px solid ${activeSport === s.id ? '#00b050' : '#2e3347'}`, borderRadius: 20, color: '#fff', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeSport === s.id ? 700 : 400, flexShrink: 0 }}>
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '12px 12px' }}>
            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#9aa0b4' }}>
                <div onClick={() => setShowLiveOnly(!showLiveOnly)}
                  style={{ width: 38, height: 22, background: showLiveOnly ? '#e63946' : '#2e3347', borderRadius: 11, position: 'relative', transition: 'background .2s', cursor: 'pointer', flexShrink: 0 }}>
                  <div style={{ width: 18, height: 18, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, left: showLiveOnly ? 18 : 2, transition: 'left .2s' }} />
                </div>
                🔴 Live Only
              </label>
              <span style={{ fontSize: 12, color: '#9aa0b4' }}>{filtered.length} events</span>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: '#9aa0b4' }}>
                <div style={{ fontSize: 40, marginBottom: 12, opacity: .2 }}>⚽</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>No matches found</div>
                <div style={{ fontSize: 13 }}>Try adjusting your filters</div>
              </div>
            ) : (
              <>
                {filtered.filter(m => m.status === 'live').length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '7px 10px', background: '#2d0f0f', borderRadius: 8, borderLeft: '3px solid #e63946' }}>
                      <span className="live-dot" style={{ width: 8, height: 8, background: '#e63946', borderRadius: '50%', display: 'inline-block' }} />
                      <span style={{ fontWeight: 700, color: '#e63946', fontSize: 13 }}>LIVE — {filtered.filter(m => m.status === 'live').length} matches</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 10 }}>
                      {filtered.filter(m => m.status === 'live').map(m => <MatchCard key={m.id} match={m} />)}
                    </div>
                  </div>
                )}
                {filtered.filter(m => m.status === 'upcoming').length > 0 && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '7px 10px', background: '#1e2435', borderRadius: 8, borderLeft: '3px solid #00b050' }}>
                      <span style={{ color: '#00b050', fontSize: 13 }}>🕐</span>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>Upcoming — {filtered.filter(m => m.status === 'upcoming').length} matches</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 10 }}>
                      {filtered.filter(m => m.status === 'upcoming').map(m => <MatchCard key={m.id} match={m} />)}
                    </div>
                  </div>
                )}
              </>
            )}
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
export default function SportsPage() { return <StoreProvider><SportsContent /></StoreProvider>; }
