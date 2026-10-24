'use client';
import { useState } from 'react';
import { StoreProvider } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BetSlip from '@/components/layout/BetSlip';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import MatchCard from '@/components/sports/MatchCard';
import { liveMatches, upcomingMatches, sports } from '@/data/mockData';
import { useStore } from '@/store/useStore';

const leagues = [
  { id: 'all', name: 'All', icon: '🌍' },
  { id: 'pl', name: 'Premier League', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'bpl', name: 'BPL Cricket', icon: '🇧🇩' },
  { id: 'cl', name: 'Champions League', icon: '⭐' },
  { id: 'nba', name: 'NBA', icon: '🏀' },
  { id: 'laliga', name: 'La Liga', icon: '🇪🇸' },
  { id: 'icc', name: 'ICC T20', icon: '🏆' },
  { id: 'atp', name: 'ATP Tennis', icon: '🎾' },
];

function SportsContent() {
  const { state } = useStore();
  const [activeSport, setActiveSport] = useState('all');
  const [activeLeague, setActiveLeague] = useState('all');
  const [sortBy, setSortBy] = useState<'time' | 'league' | 'popular'>('time');
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const allMatches = [...liveMatches, ...upcomingMatches];
  const filtered = allMatches.filter(m => {
    if (activeSport !== 'all' && m.sportId !== activeSport) return false;
    if (showLiveOnly && m.status !== 'live') return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'auto', paddingRight: state.showBetSlip ? 320 : 0 }}>

          {/* Page header */}
          <div style={{ background: '#0f1320', borderBottom: '1px solid #2e3347', padding: '16px 20px' }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 12px' }}>⚽ Sports Betting</h1>

            {/* Sport filter chips */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              <button onClick={() => setActiveSport('all')}
                style={{ padding: '7px 16px', background: activeSport === 'all' ? '#00b050' : '#242938', border: `1px solid ${activeSport === 'all' ? '#00b050' : '#2e3347'}`, borderRadius: 20, color: '#fff', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeSport === 'all' ? 700 : 400 }}>
                All Sports
              </button>
              {sports.slice(0, 8).map(sport => (
                <button key={sport.id} onClick={() => setActiveSport(sport.id)}
                  style={{ padding: '7px 16px', background: activeSport === sport.id ? '#00b050' : '#242938', border: `1px solid ${activeSport === sport.id ? '#00b050' : '#2e3347'}`, borderRadius: 20, color: '#fff', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeSport === sport.id ? 700 : 400 }}>
                  <i className={`fa ${sport.icon}`} style={{ marginRight: 6, fontSize: 11 }}></i>
                  {sport.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '16px 20px' }}>
            {/* League filter */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
              {leagues.map(l => (
                <button key={l.id} onClick={() => setActiveLeague(l.id)}
                  style={{ padding: '6px 14px', background: activeLeague === l.id ? '#1e3d1e' : 'transparent', border: `1px solid ${activeLeague === l.id ? '#00b050' : '#2e3347'}`, borderRadius: 8, color: activeLeague === l.id ? '#00b050' : '#9aa0b4', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeLeague === l.id ? 700 : 400 }}>
                  {l.icon} {l.name}
                </button>
              ))}
            </div>

            {/* Controls row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#9aa0b4' }}>
                  <div onClick={() => setShowLiveOnly(!showLiveOnly)}
                    style={{ width: 36, height: 20, background: showLiveOnly ? '#e63946' : '#2e3347', borderRadius: 10, position: 'relative', transition: 'background 0.2s', cursor: 'pointer' }}>
                    <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, left: showLiveOnly ? 18 : 2, transition: 'left 0.2s' }}></div>
                  </div>
                  Live Only
                </label>
                <span style={{ color: '#9aa0b4', fontSize: 13 }}>{filtered.length} events</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ fontSize: 13, color: '#9aa0b4', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Sort:
                  {(['time', 'league', 'popular'] as const).map(s => (
                    <button key={s} onClick={() => setSortBy(s)}
                      style={{ padding: '4px 10px', background: sortBy === s ? '#242938' : 'transparent', border: `1px solid ${sortBy === s ? '#3a4060' : 'transparent'}`, borderRadius: 6, color: sortBy === s ? '#fff' : '#9aa0b4', fontSize: 12, cursor: 'pointer', textTransform: 'capitalize' }}>
                      {s}
                    </button>
                  ))}
                </span>
              </div>
            </div>

            {/* Matches */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#9aa0b4' }}>
                <i className="fa fa-futbol" style={{ fontSize: 48, marginBottom: 16, display: 'block', opacity: 0.2 }}></i>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>No matches found</div>
                <div style={{ fontSize: 13 }}>Try adjusting your filters</div>
              </div>
            ) : (
              <>
                {/* Live section */}
                {filtered.filter(m => m.status === 'live').length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 12px', background: '#2d0f0f', borderRadius: 8, borderLeft: '3px solid #e63946' }}>
                      <span className="live-dot" style={{ width: 8, height: 8, background: '#e63946', borderRadius: '50%', display: 'inline-block' }}></span>
                      <span style={{ fontWeight: 700, color: '#e63946', fontSize: 13 }}>LIVE</span>
                      <span style={{ fontSize: 13, color: '#9aa0b4' }}>{filtered.filter(m => m.status === 'live').length} matches</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                      {filtered.filter(m => m.status === 'live').map(match => (
                        <MatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming section */}
                {filtered.filter(m => m.status === 'upcoming').length > 0 && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 12px', background: '#1e2435', borderRadius: 8, borderLeft: '3px solid #00b050' }}>
                      <i className="fa fa-clock" style={{ color: '#00b050', fontSize: 13 }}></i>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>Upcoming</span>
                      <span style={{ fontSize: 13, color: '#9aa0b4' }}>{filtered.filter(m => m.status === 'upcoming').length} matches</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                      {filtered.filter(m => m.status === 'upcoming').map(match => (
                        <MatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
        <BetSlip />
      </div>
      <AuthModal />
      <Notifications />
    </div>
  );
}

export default function SportsPage() {
  return <StoreProvider><SportsContent /></StoreProvider>;
}
