'use client';
import { useState, useEffect } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BetSlip from '@/components/layout/BetSlip';
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
  const [showStream, setShowStream] = useState(false);

  // Simulate live score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev => prev.map(m => ({
        ...m,
        minute: m.minute ? Math.min(m.minute + 1, 90) : m.minute,
        markets: m.markets.map(market => ({
          ...market,
          selections: market.selections.map(sel => ({
            ...sel,
            previousOdds: sel.odds,
            odds: parseFloat((sel.odds + (Math.random() - 0.5) * 0.05).toFixed(2)),
          }))
        }))
      })));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const sports = ['all', ...Array.from(new Set(matches.map(m => m.sportId)))];
  const filtered = activeSport === 'all' ? matches : matches.filter(m => m.sportId === activeSport);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'auto', paddingRight: state.showBetSlip ? 320 : 0 }}>

          {/* Live header */}
          <div style={{ background: 'linear-gradient(135deg, #1a0000, #2d0f0f)', borderBottom: '1px solid #3a1515', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span className="live-dot" style={{ width: 12, height: 12, background: '#e63946', borderRadius: '50%', display: 'inline-block' }}></span>
              <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#fff' }}>Live Betting</h1>
              <span style={{ background: '#e63946', color: '#fff', fontSize: 12, padding: '3px 10px', borderRadius: 10, fontWeight: 700 }}>{matches.length} LIVE</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Odds update in real-time. Cash out available on selected markets.</p>
          </div>

          <div style={{ display: 'flex', gap: 0 }}>
            {/* Left: match list */}
            <div style={{ width: 380, borderRight: '1px solid #2e3347', flexShrink: 0 }}>
              {/* Sport filter */}
              <div style={{ padding: '12px', borderBottom: '1px solid #2e3347', display: 'flex', gap: 6, overflowX: 'auto' }}>
                {sports.map(s => (
                  <button key={s} onClick={() => setActiveSport(s)}
                    style={{ padding: '5px 12px', background: activeSport === s ? '#e63946' : '#242938', border: `1px solid ${activeSport === s ? '#e63946' : '#2e3347'}`, borderRadius: 16, color: '#fff', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeSport === s ? 700 : 400, textTransform: 'capitalize' }}>
                    {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>

              <div style={{ overflowY: 'auto', height: 'calc(100vh - 220px)' }}>
                {filtered.map(match => (
                  <div key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    style={{ padding: '12px', borderBottom: '1px solid #2e3347', cursor: 'pointer', background: selectedMatch?.id === match.id ? '#242938' : 'transparent', transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (selectedMatch?.id !== match.id) e.currentTarget.style.background = '#1e2435'; }}
                    onMouseLeave={e => { if (selectedMatch?.id !== match.id) e.currentTarget.style.background = 'transparent'; }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className="live-dot" style={{ width: 7, height: 7, background: '#e63946', borderRadius: '50%', display: 'inline-block' }}></span>
                        <span style={{ fontSize: 11, color: '#e63946', fontWeight: 700 }}>{match.minute}'</span>
                        <span style={{ fontSize: 11, color: '#9aa0b4' }}>{match.leagueName}</span>
                      </div>
                      {match.streamAvailable && (
                        <span style={{ fontSize: 10, color: '#00b050', background: '#0f2d0f', padding: '2px 6px', borderRadius: 4 }}>
                          <i className="fa fa-play" style={{ marginRight: 3 }}></i>LIVE
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
                          {match.homeTeam.name}
                          <span style={{ marginLeft: 8, color: '#f5c518', fontWeight: 800 }}>{match.homeTeam.score}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                          {match.awayTeam.name}
                          <span style={{ marginLeft: 8, color: '#f5c518', fontWeight: 800 }}>{match.awayTeam.score}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 2 }}>{match.markets[0].selections.length} selections</div>
                        <div style={{ fontSize: 11, color: '#9aa0b4' }}>{match.markets.length} markets</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: selected match detail */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
              {selectedMatch ? (
                <>
                  {/* Match header */}
                  <div style={{ background: '#1e2435', borderRadius: 12, padding: '20px', marginBottom: 16, border: '1px solid #2e3347' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div style={{ fontSize: 12, color: '#9aa0b4' }}>{selectedMatch.leagueName}</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {selectedMatch.streamAvailable && (
                          <button onClick={() => setShowStream(!showStream)}
                            style={{ background: showStream ? '#00b050' : '#242938', border: `1px solid ${showStream ? '#00b050' : '#2e3347'}`, color: '#fff', padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                            <i className="fa fa-play" style={{ marginRight: 6 }}></i>{showStream ? 'Hide Stream' : 'Watch Live'}
                          </button>
                        )}
                        <span style={{ background: '#2d0f0f', color: '#e63946', padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span className="live-dot" style={{ width: 6, height: 6, background: '#e63946', borderRadius: '50%', display: 'inline-block' }}></span>
                          LIVE {selectedMatch.minute}'
                        </span>
                      </div>
                    </div>

                    {/* Stream placeholder */}
                    {showStream && (
                      <div style={{ background: '#0f1320', borderRadius: 8, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: '1px solid #2e3347' }}>
                        <div style={{ textAlign: 'center', color: '#9aa0b4' }}>
                          <i className="fa fa-play-circle" style={{ fontSize: 48, marginBottom: 8, display: 'block', color: '#00b050' }}></i>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>Live Stream</div>
                          <div style={{ fontSize: 12 }}>Connect your streaming provider</div>
                        </div>
                      </div>
                    )}

                    {/* Score */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '16px 0' }}>
                      <div style={{ textAlign: 'right', flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 18 }}>{selectedMatch.homeTeam.name}</div>
                        <div style={{ fontSize: 12, color: '#9aa0b4' }}>Home</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '8px 20px', background: '#0f1320', borderRadius: 8 }}>
                        <div style={{ fontSize: 32, fontWeight: 900, color: '#f5c518', letterSpacing: 8 }}>
                          {selectedMatch.homeTeam.score} - {selectedMatch.awayTeam.score}
                        </div>
                        <div style={{ fontSize: 11, color: '#e63946', fontWeight: 700 }}>{selectedMatch.minute}'</div>
                      </div>
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 18 }}>{selectedMatch.awayTeam.name}</div>
                        <div style={{ fontSize: 12, color: '#9aa0b4' }}>Away</div>
                      </div>
                    </div>
                  </div>

                  {/* Markets */}
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Betting Markets</h3>
                    {selectedMatch.markets.map(market => (
                      <div key={market.id} style={{ background: '#1e2435', borderRadius: 10, padding: 16, marginBottom: 12, border: '1px solid #2e3347' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#9aa0b4' }}>{market.name}</div>
                        <MatchCard match={selectedMatch} compact />
                      </div>
                    ))}

                    {/* Extra simulated markets */}
                    {[
                      { name: 'Next Goal', options: [{ name: selectedMatch.homeTeam.shortName, odds: 2.10 }, { name: 'No Goal', odds: 3.50 }, { name: selectedMatch.awayTeam.shortName, odds: 3.20 }] },
                      { name: 'Total Corners (Over/Under 9.5)', options: [{ name: 'Over 9.5', odds: 1.80 }, { name: 'Under 9.5', odds: 2.00 }] },
                    ].map(market => (
                      <div key={market.name} style={{ background: '#1e2435', borderRadius: 10, padding: 16, marginBottom: 12, border: '1px solid #2e3347' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#9aa0b4' }}>{market.name}</div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {market.options.map(opt => (
                            <button key={opt.name} className="odds-btn" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                              <span style={{ fontSize: 11, color: '#9aa0b4' }}>{opt.name}</span>
                              <span style={{ fontWeight: 700, fontSize: 15 }}>{opt.odds.toFixed(2)}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400, color: '#9aa0b4' }}>
                  <div style={{ textAlign: 'center' }}>
                    <i className="fa fa-futbol" style={{ fontSize: 48, marginBottom: 12, display: 'block', opacity: 0.2 }}></i>
                    <div>Select a match to see all markets</div>
                  </div>
                </div>
              )}
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

export default function LivePage() {
  return <StoreProvider><LiveContent /></StoreProvider>;
}
