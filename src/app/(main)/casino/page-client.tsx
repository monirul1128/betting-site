'use client';
import { useState } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BetSlip from '@/components/layout/BetSlip';
import BottomNav from '@/components/layout/BottomNav';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import GameCard from '@/components/casino/GameCard';
import { casinoGames } from '@/data/mockData';

const categories = [
  { id: 'all',   label: '🎮 All' },
  { id: 'live',  label: '🎥 Live' },
  { id: 'slot',  label: '🎰 Slots' },
  { id: 'crash', label: '✈️ Crash' },
  { id: 'table', label: '🃏 Table' },
];

function CasinoContent() {
  const { state, dispatch } = useStore();
  const [cat, setCat]       = useState('all');
  const [search, setSearch] = useState('');

  const filtered = casinoGames.filter(g => {
    if (cat !== 'all' && g.type !== cat) return false;
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1a1f2e' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, minWidth: 0, paddingBottom: 80, paddingRight: state.showBetSlip ? 320 : 0, transition: 'padding-right .25s' }}>

          {/* Casino hero */}
          <div style={{ background: 'linear-gradient(135deg,#0d0028,#2d0870)', padding: '20px 14px', borderBottom: '1px solid #2e3347' }}>
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 4px' }}>🎰 Casino Games</h1>
            <p style={{ color: '#9aa0b4', fontSize: 13, margin: 0 }}>2000+ games · Live dealers · Instant play</p>
            {!state.isLoggedIn && (
              <div style={{ marginTop: 12, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 10, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#f5c518' }}>50 Free Spins</div>
                  <div style={{ fontSize: 12, color: '#9aa0b4' }}>On first deposit</div>
                </div>
                <button onClick={() => dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } })}
                  style={{ background: '#f5c518', color: '#0a0d18', border: 'none', borderRadius: 8, padding: '9px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  Claim
                </button>
              </div>
            )}
          </div>

          <div style={{ padding: '12px 12px' }}>
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 12 }}>
              {categories.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)}
                  style={{ padding: '7px 14px', background: cat === c.id ? '#6c00b0' : '#242938', border: `1px solid ${cat === c.id ? '#6c00b0' : '#2e3347'}`, borderRadius: 20, color: '#fff', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: cat === c.id ? 700 : 400, flexShrink: 0 }}>
                  {c.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9aa0b4', fontSize: 14 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search games…"
                style={{ width: '100%', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '10px 14px 10px 34px', color: '#fff', fontSize: 14, outline: 'none' }} />
            </div>

            {/* Game grid — 2 cols mobile → 5 cols on xl */}
            <div style={{ display: 'grid', gap: 10,
              gridTemplateColumns: 'repeat(2,1fr)',
            }} className="sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {filtered.map(g => <GameCard key={g.id} game={g} />)}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: '#9aa0b4' }}>
                <div style={{ fontSize: 40, marginBottom: 12, opacity: .2 }}>🎮</div>
                <div>No games found</div>
              </div>
            )}

            {/* Responsible gambling */}
            <div style={{ marginTop: 24, background: '#1e2435', border: '1px solid #2e3347', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>⚠️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>Play Responsibly</div>
                <div style={{ fontSize: 12, color: '#9aa0b4', lineHeight: 1.6 }}>
                  Casino games are for entertainment only. Set limits and take breaks. 18+ only.
                </div>
              </div>
              <span style={{ background: '#e63946', color: '#fff', padding: '4px 8px', borderRadius: 6, fontWeight: 700, fontSize: 12, flexShrink: 0 }}>18+</span>
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
export default function CasinoPage() { return <StoreProvider><CasinoContent /></StoreProvider>; }
