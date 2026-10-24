'use client';
import { useState } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import BetSlip from '@/components/layout/BetSlip';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';

function BetsContent() {
  const { state, dispatch } = useStore();
  const [activeTab, setActiveTab] = useState<'open' | 'settled' | 'cashout'>('open');

  if (!state.isLoggedIn) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🔒</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Login Required</h2>
            <p style={{ color: '#9aa0b4', marginBottom: 20 }}>Please log in to view your bets.</p>
            <button onClick={() => dispatch({ type: 'SHOW_AUTH', payload: { mode: 'login' } })}
              style={{ background: '#00b050', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Log In
            </button>
          </div>
        </div>
        <AuthModal />
      </div>
    );
  }

  const openBets = state.placedBets.filter(b => b.status === 'open');
  const settledBets = state.placedBets.filter(b => b.status !== 'open');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <main style={{ flex: 1, overflow: 'auto', paddingRight: state.showBetSlip ? 320 : 0 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>🎯 My Bets</h1>

            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
              {[
                { label: 'Open Bets', value: openBets.length, color: '#00b050', icon: '🟢' },
                { label: 'Total Staked', value: `৳${state.placedBets.reduce((a, b) => a + b.stake, 0).toFixed(0)}`, color: '#f5c518', icon: '💰' },
                { label: 'Total Won', value: `৳${settledBets.filter(b => b.status === 'won').reduce((a, b) => a + b.potentialWin, 0).toFixed(0)}`, color: '#00b050', icon: '🏆' },
                { label: 'Potential Win', value: `৳${openBets.reduce((a, b) => a + b.potentialWin, 0).toFixed(0)}`, color: '#3b82f6', icon: '⭐' },
              ].map(card => (
                <div key={card.label} style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, padding: '16px 18px' }}>
                  <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 6 }}>{card.icon} {card.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: card.color }}>{card.value}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #2e3347', marginBottom: 20 }}>
              {[
                { key: 'open', label: `Open Bets (${openBets.length})` },
                { key: 'settled', label: `Settled (${settledBets.length})` },
                { key: 'cashout', label: 'Cash Out Available' },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key as any)}
                  style={{ padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: activeTab === t.key ? '#00b050' : '#9aa0b4', borderBottom: activeTab === t.key ? '2px solid #00b050' : '2px solid transparent' }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Open bets */}
            {activeTab === 'open' && (
              openBets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, color: '#9aa0b4' }}>
                  <i className="fa fa-receipt" style={{ fontSize: 48, marginBottom: 16, display: 'block', opacity: 0.2 }}></i>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>No open bets</div>
                  <div style={{ fontSize: 13 }}>Browse sports and place a bet to see it here</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {openBets.map(bet => (
                    <div key={bet.id} style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, padding: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <div>
                          <span style={{ background: '#1e3d1e', color: '#00b050', fontSize: 11, padding: '3px 10px', borderRadius: 6, fontWeight: 700 }}>OPEN</span>
                          <span style={{ marginLeft: 10, fontSize: 12, color: '#9aa0b4' }}>
                            {bet.type === 'accumulator' ? `${bet.items.length}-fold Acca` : 'Single'}
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: '#9aa0b4' }}>
                          {new Date(bet.placedAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      {bet.items.map(item => (
                        <div key={item.selectionId} style={{ padding: '10px 12px', background: '#242938', borderRadius: 8, marginBottom: 8 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 3 }}>{item.sportName} · {item.marketName}</div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{item.matchName}</div>
                              <div style={{ fontSize: 12, color: '#cdd0db', marginTop: 2 }}>{item.selectionName}</div>
                            </div>
                            <div style={{ background: '#00b050', color: '#fff', padding: '4px 10px', borderRadius: 6, fontWeight: 700, fontSize: 14 }}>{item.odds.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #2e3347' }}>
                        <div style={{ display: 'flex', gap: 24 }}>
                          <div>
                            <div style={{ fontSize: 11, color: '#9aa0b4' }}>Stake</div>
                            <div style={{ fontWeight: 700, fontSize: 15 }}>৳{bet.stake.toFixed(2)}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 11, color: '#9aa0b4' }}>Potential Win</div>
                            <div style={{ fontWeight: 700, fontSize: 15, color: '#00b050' }}>৳{bet.potentialWin.toFixed(2)}</div>
                          </div>
                        </div>
                        {bet.cashoutValue && (
                          <button onClick={() => {
                            dispatch({ type: 'UPDATE_BALANCE', payload: (state.user?.balance || 0) + bet.cashoutValue! });
                            dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: `Cashed out ৳${bet.cashoutValue?.toFixed(2)}`, type: 'success' } });
                          }}
                            style={{ background: '#f5c518', color: '#0a0d18', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                            Cash Out · ৳{bet.cashoutValue.toFixed(2)}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'settled' && (
              settledBets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, color: '#9aa0b4' }}>
                  <div style={{ fontWeight: 600 }}>No settled bets yet</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {settledBets.map(bet => (
                    <div key={bet.id} style={{ background: '#1e2435', border: `1px solid ${bet.status === 'won' ? '#2a4a2a' : '#3a1515'}`, borderRadius: 12, padding: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ background: bet.status === 'won' ? '#1e3d1e' : '#2d1515', color: bet.status === 'won' ? '#00b050' : '#e63946', fontSize: 11, padding: '3px 10px', borderRadius: 6, fontWeight: 700, textTransform: 'uppercase' }}>{bet.status}</span>
                        <span style={{ color: bet.status === 'won' ? '#00b050' : '#e63946', fontWeight: 700, fontSize: 16 }}>
                          {bet.status === 'won' ? `+৳${bet.potentialWin.toFixed(2)}` : `-৳${bet.stake.toFixed(2)}`}
                        </span>
                      </div>
                      {bet.items.map(item => (
                        <div key={item.selectionId} style={{ marginTop: 10, fontSize: 13, color: '#9aa0b4' }}>{item.matchName} · {item.selectionName}</div>
                      ))}
                    </div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'cashout' && (
              <div style={{ textAlign: 'center', padding: 60, color: '#9aa0b4' }}>
                <div style={{ fontSize: 13 }}>Cash out is available for open bets. Go to the Open Bets tab.</div>
              </div>
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

export default function BetsPage() {
  return <StoreProvider><BetsContent /></StoreProvider>;
}
