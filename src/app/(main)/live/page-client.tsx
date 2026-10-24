'use client';
import { useState, useEffect } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BetSlip from '@/components/layout/BetSlip';
import BottomNav from '@/components/layout/BottomNav';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import MatchCard from '@/components/sports/MatchCard';
import { liveMatches } from '@/data/mockData';
import { Match } from '@/types';

function LiveContent() {
  const { state } = useStore();
  const [matches, setMatches] = useState<Match[]>(liveMatches);
  const [activeSport, setActiveSport] = useState('all');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(liveMatches[0]);
  const [showDetail, setShowDetail] = useState(false); // mobile toggle

  useEffect(() => {
    const t = setInterval(() => {
      setMatches(prev => prev.map(m => ({
        ...m,
        minute: m.minute ? Math.min(m.minute + 1, 90) : m.minute,
        markets: m.markets.map(mkt => ({
          ...mkt,
          selections: mkt.selections.map(sel => ({
            ...sel,
            previousOdds: sel.odds,
            odds: parseFloat((sel.odds + (Math.random() - 0.5) * 0.05).toFixed(2)),
          })),
        })),
      })));
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const sportIds = ['all', ...Array.from(new Set(matches.map(m => m.sportId)))];
  const filtered = activeSport === 'all' ? matches : matches.filter(m => m.sportId === activeSport);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#1a1f2e' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, minWidth: 0, paddingBottom: 80, paddingRight: state.showBetSlip ? 320 : 0, transition: 'padding-right .25s' }}>

          {/* Live header */}
          <div style={{ background: 'linear-gradient(135deg,#1a0000,#2d0f0f)', borderBottom: '1px solid #3a1515', padding: '14px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span className="live-dot" style={{ width: 10, height: 10, background: '#e63946', borderRadius: '50%', display: 'inline-block' }} />
              <h1 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Live Betting</h1>
              <span style={{ background: '#e63946', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>{matches.length} LIVE</span>
            </div>
            {/* Sport filter chips */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
              {sportIds.map(s => (
                <button key={s} onClick={() => setActiveSport(s)}
                  style={{ padding: '5px 12px', background: activeSport === s ? '#e63946' : '#242938', border: `1px solid ${activeSport === s ? '#e63946' : '#2e3347'}`, borderRadius: 16, color: '#fff', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeSport === s ? 700 : 400, flexShrink: 0, textTransform: 'capitalize' }}>
                  {s === 'all' ? 'All' : s}
                </button>
              ))}
            </div>
          </div>

          {/* Two-panel layout — stack on mobile */}
          <div style={{ display: 'flex', flexDirection: 'column' }} className="md:flex-row">

            {/* Match list */}
            <div style={{ borderBottom: '1px solid #2e3347' }} className="md:w-96 md:border-b-0 md:border-r md:border-r-[#2e3347] md:overflow-y-auto md:h-[calc(100vh-160px)]">
              {filtered.map(match => (
                <div key={match.id}
                  onClick={() => { setSelectedMatch(match); setShowDetail(true); }}
                  style={{
                    padding: '12px 14px', borderBottom: '1px solid #2e3347', cursor: 'pointer',
                    background: selectedMatch?.id === match.id ? '#242938' : 'transparent',
                    transition: 'background .15s',
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="live-dot" style={{ width: 7, height: 7, background: '#e63946', borderRadius: '50%', display: 'inline-block' }} />
                      <span style={{ fontSize: 11, color: '#e63946', fontWeight: 700 }}>{match.minute}&apos;</span>
                      <span style={{ fontSize: 11, color: '#9aa0b4' }}>{match.leagueName}</span>
                    </div>
                    {match.streamAvailable && <span style={{ fontSize: 10, color: '#00b050' }}>▶ LIVE</span>}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{match.homeTeam.name} <span style={{ color: '#f5c518', fontWeight: 800 }}>{match.homeTeam.score}</span></div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{match.awayTeam.name} <span style={{ color: '#f5c518', fontWeight: 800 }}>{match.awayTeam.score}</span></div>
                    </div>
                    <span style={{ fontSize: 11, color: '#9aa0b4' }}>{match.markets.length} markets</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail panel */}
            {/* Mobile: shows as overlay when match tapped */}
            {showDetail && selectedMatch && (
              <div className="md:hidden" style={{ position: 'fixed', inset: 0, zIndex: 80, background: '#1a1f2e', overflowY: 'auto' }}>
                <div style={{ background: '#0f1320', padding: '12px 14px', borderBottom: '1px solid #2e3347', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => setShowDetail(false)}
                    style={{ background: '#242938', border: 'none', color: '#fff', borderRadius: 8, padding: '7px 12px', cursor: 'pointer', fontSize: 13 }}>
                    ← Back
                  </button>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{selectedMatch.homeTeam.name} vs {selectedMatch.awayTeam.name}</span>
                </div>
                <div style={{ padding: 14 }}>
                  <MatchDetailContent match={selectedMatch} />
                </div>
              </div>
            )}

            {/* Desktop detail panel */}
            <div className="hidden md:block" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
              {selectedMatch
                ? <MatchDetailContent match={selectedMatch} />
                : <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9aa0b4' }}>
                    <div style={{ fontSize: 40, marginBottom: 12, opacity: .2 }}>⚽</div>
                    <div>Select a match to see markets</div>
                  </div>
              }
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

function MatchDetailContent({ match }: { match: Match }) {
  return (
    <>
      <div style={{ background: '#1e2435', borderRadius: 12, padding: 16, marginBottom: 14, border: '1px solid #2e3347' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: '#9aa0b4' }}>{match.leagueName}</span>
          <span style={{ background: '#2d0f0f', color: '#e63946', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
            🔴 LIVE {match.minute}&apos;
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '12px 0' }}>
          <div style={{ textAlign: 'right', flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{match.homeTeam.name}</div>
            <div style={{ fontSize: 12, color: '#9aa0b4' }}>Home</div>
          </div>
          <div style={{ textAlign: 'center', padding: '6px 16px', background: '#0f1320', borderRadius: 8 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#f5c518', letterSpacing: 6 }}>{match.homeTeam.score} - {match.awayTeam.score}</div>
            <div style={{ fontSize: 10, color: '#e63946', fontWeight: 700 }}>{match.minute}&apos;</div>
          </div>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{match.awayTeam.name}</div>
            <div style={{ fontSize: 12, color: '#9aa0b4' }}>Away</div>
          </div>
        </div>
      </div>
      <MatchCard match={match} />
    </>
  );
}

export default function LivePage() { return <StoreProvider><LiveContent /></StoreProvider>; }
