'use client';
import { useState } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BetSlip from '@/components/layout/BetSlip';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import GameCard from '@/components/casino/GameCard';
import { casinoGames } from '@/data/mockData';

const categories = [
  { id: 'all', label: '🎮 All Games' },
  { id: 'live', label: '🎥 Live Casino' },
  { id: 'slot', label: '🎰 Slots' },
  { id: 'crash', label: '✈️ Crash Games' },
  { id: 'table', label: '🃏 Table Games' },
];

const providers = ['All', 'Evolution', 'Pragmatic Play', 'Spribe', 'NetEnt', 'Play\'n GO'];

function CasinoContent() {
  const { state, dispatch } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProvider, setActiveProvider] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = casinoGames.filter(g => {
    if (activeCategory !== 'all' && g.type !== activeCategory) return false;
    if (activeProvider !== 'All' && g.provider !== activeProvider) return false;
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'auto', paddingRight: state.showBetSlip ? 320 : 0 }}>

          {/* Casino Hero */}
          <div style={{ background: 'linear-gradient(135deg, #0d0028, #2d0870, #0d0028)', padding: '32px 24px', borderBottom: '1px solid #2e3347' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: '#9aa0b4', fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>🎰 LIVE CASINO & SLOTS</div>
                <h1 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 8px' }}>Casino Games</h1>
                <p style={{ color: '#9aa0b4', fontSize: 14, margin: 0 }}>2000+ games · Live dealers · Instant play</p>
              </div>
              {!state.isLoggedIn && (
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#f5c518', marginBottom: 4 }}>50 Free Spins</div>
                  <div style={{ fontSize: 13, color: '#9aa0b4', marginBottom: 12 }}>On your first deposit</div>
                  <button onClick={() => dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } })}
                    style={{ background: '#f5c518', color: '#0a0d18', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                    Claim Now
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: '20px 24px' }}>
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  style={{ padding: '9px 18px', background: activeCategory === cat.id ? '#6c00b0' : '#242938', border: `1px solid ${activeCategory === cat.id ? '#6c00b0' : '#2e3347'}`, borderRadius: 20, color: '#fff', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeCategory === cat.id ? 700 : 400 }}>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Filters row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
              {/* Provider filter */}
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
                {providers.map(p => (
                  <button key={p} onClick={() => setActiveProvider(p)}
                    style={{ padding: '5px 12px', background: activeProvider === p ? '#1e3d1e' : 'transparent', border: `1px solid ${activeProvider === p ? '#00b050' : '#2e3347'}`, borderRadius: 6, color: activeProvider === p ? '#00b050' : '#9aa0b4', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    {p}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div style={{ position: 'relative' }}>
                <i className="fa fa-search" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9aa0b4', fontSize: 12 }}></i>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search games..."
                  style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '8px 14px 8px 32px', color: '#fff', fontSize: 13, outline: 'none', width: 200 }} />
              </div>
            </div>

            {/* Live Casino Feature */}
            {activeCategory === 'all' && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ width: 10, height: 10, background: '#e63946', borderRadius: '50%', display: 'inline-block' }} className="live-dot"></span>
                  <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>Live Casino</h2>
                  <span style={{ background: '#e63946', color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>LIVE NOW</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
                  {casinoGames.filter(g => g.type === 'live').map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            )}

            {/* Crash Games Feature */}
            {activeCategory === 'all' && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 18 }}>✈️</span>
                  <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>Crash Games</h2>
                  <span style={{ background: '#f5c518', color: '#0a0d18', fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>HOT</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
                  {casinoGames.filter(g => g.type === 'crash').map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            )}

            {/* All / Filtered Games */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>
                  {activeCategory === 'all' ? '🎮 All Slots' : categories.find(c => c.id === activeCategory)?.label}
                  <span style={{ fontSize: 13, fontWeight: 400, color: '#9aa0b4', marginLeft: 8 }}>{filtered.length} games</span>
                </h2>
                <select style={{ background: '#242938', border: '1px solid #2e3347', color: '#fff', borderRadius: 8, padding: '6px 12px', fontSize: 13, outline: 'none' }}>
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Highest RTP</option>
                  <option>A-Z</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
                {(activeCategory === 'all' ? casinoGames.filter(g => g.type === 'slot') : filtered).map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>

            {/* Responsible gambling */}
            <div style={{ marginTop: 32, background: '#1e2435', border: '1px solid #2e3347', borderRadius: 10, padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 28 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Play Responsibly</div>
                <div style={{ fontSize: 12, color: '#9aa0b4' }}>
                  Casino games are for entertainment. Set deposit limits and take breaks. 18+ only.
                  <a href="#" style={{ color: '#00b050', marginLeft: 6 }}>Learn more →</a>
                </div>
              </div>
              <div style={{ background: '#e63946', color: '#fff', padding: '6px 12px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}>18+</div>
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

export default function CasinoPage() {
  return <StoreProvider><CasinoContent /></StoreProvider>;
}
