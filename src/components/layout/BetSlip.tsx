'use client';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { PlacedBet } from '@/types';

export default function BetSlip() {
  const { state, dispatch } = useStore();
  const [stake, setStake] = useState('');
  const [betType, setBetType] = useState<'single' | 'accumulator'>('single');
  const [placing, setPlacing] = useState(false);
  const [activeTab, setActiveTab] = useState<'betslip' | 'openbets' | 'settled'>('betslip');

  if (!state.showBetSlip) return null;

  const totalOdds = state.betSlip.reduce((acc, b) => acc * b.odds, 1);
  const stakeNum = parseFloat(stake) || 0;
  const potentialWin = betType === 'accumulator' ? stakeNum * totalOdds : stakeNum * (state.betSlip[0]?.odds || 1);

  const handlePlaceBet = async () => {
    if (!state.isLoggedIn) {
      dispatch({ type: 'SHOW_AUTH', payload: { mode: 'login', action: 'place_bet' } });
      return;
    }
    if (!stakeNum || stakeNum <= 0) return;
    if (stakeNum > (state.user?.balance || 0)) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: 'Insufficient balance. Please deposit.', type: 'error' } });
      return;
    }
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1000));
    const bet: PlacedBet = {
      id: 'bet_' + Date.now(),
      items: state.betSlip,
      stake: stakeNum,
      potentialWin,
      type: betType,
      status: 'open',
      placedAt: new Date().toISOString(),
      cashoutValue: potentialWin * 0.85,
    };
    dispatch({ type: 'PLACE_BET', payload: bet });
    dispatch({ type: 'UPDATE_BALANCE', payload: (state.user?.balance || 0) - stakeNum });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: `Bet placed! Potential win: ৳${potentialWin.toFixed(2)}`, type: 'success' } });
    setStake('');
    setPlacing(false);
  };

  const quickStakes = [100, 200, 500, 1000];

  return (
    <div className="betslip-panel" style={{ position: 'fixed', right: 0, top: 0, height: '100vh', width: 320, background: '#1a1f2e', borderLeft: '1px solid #2e3347', zIndex: 200, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ background: '#0f1320', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2e3347', position: 'sticky', top: 0, zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <i className="fa fa-receipt" style={{ color: '#00b050' }}></i>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Bet Slip</span>
          {state.betSlip.length > 0 && (
            <span style={{ background: '#00b050', color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{state.betSlip.length}</span>
          )}
        </div>
        <button onClick={() => dispatch({ type: 'TOGGLE_BETSLIP' })} style={{ background: 'none', border: 'none', color: '#9aa0b4', cursor: 'pointer', fontSize: 18 }}>✕</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #2e3347' }}>
        {[
          { key: 'betslip', label: 'Bet Slip' },
          { key: 'openbets', label: `Open (${state.placedBets.filter(b => b.status === 'open').length})` },
          { key: 'settled', label: 'Settled' },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key as any)}
            style={{ flex: 1, padding: '10px 4px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: activeTab === t.key ? '#00b050' : '#9aa0b4', borderBottom: activeTab === t.key ? '2px solid #00b050' : '2px solid transparent' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'betslip' && (
          <>
            {state.betSlip.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#9aa0b4' }}>
                <i className="fa fa-receipt" style={{ fontSize: 40, marginBottom: 12, display: 'block', opacity: 0.3 }}></i>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Your bet slip is empty</div>
                <div style={{ fontSize: 13 }}>Click on any odds to add selections</div>
              </div>
            ) : (
              <div style={{ padding: 12 }}>
                {/* Bet type toggle */}
                {state.betSlip.length > 1 && (
                  <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                    {(['single', 'accumulator'] as const).map(t => (
                      <button key={t} onClick={() => setBetType(t)}
                        style={{ flex: 1, padding: '7px', background: betType === t ? '#00b050' : '#242938', border: `1px solid ${betType === t ? '#00b050' : '#2e3347'}`, borderRadius: 6, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                        {t}
                      </button>
                    ))}
                  </div>
                )}

                {/* Selections */}
                {state.betSlip.map(item => (
                  <div key={item.selectionId} style={{ background: '#242938', borderRadius: 8, padding: 12, marginBottom: 8, position: 'relative' }}>
                    <button onClick={() => dispatch({ type: 'REMOVE_FROM_BETSLIP', payload: item.selectionId })}
                      style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#9aa0b4', cursor: 'pointer', fontSize: 14 }}>✕</button>
                    <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 4 }}>{item.sportName} · {item.status === 'live' ? '🔴 LIVE' : ''}</div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, paddingRight: 20 }}>{item.matchName}</div>
                    <div style={{ fontSize: 12, color: '#9aa0b4', marginBottom: 6 }}>{item.marketName}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#cdd0db' }}>{item.selectionName}</span>
                      <span style={{ background: '#00b050', color: '#fff', padding: '3px 10px', borderRadius: 5, fontWeight: 700, fontSize: 14 }}>{item.odds.toFixed(2)}</span>
                    </div>
                  </div>
                ))}

                {/* Accumulator info */}
                {state.betSlip.length > 1 && betType === 'accumulator' && (
                  <div style={{ background: '#1e2d1e', border: '1px solid #2a4a2a', borderRadius: 8, padding: 10, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: '#9aa0b4' }}>{state.betSlip.length}-Fold Acca</span>
                      <span style={{ color: '#00b050', fontWeight: 700 }}>{totalOdds.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Stake input */}
                <div style={{ marginBottom: 10 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#9aa0b4', marginBottom: 6 }}>Stake (৳)</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, overflow: 'hidden' }}>
                    <span style={{ padding: '0 12px', color: '#9aa0b4', fontSize: 16, fontWeight: 700 }}>৳</span>
                    <input type="number" value={stake} onChange={e => setStake(e.target.value)} placeholder="0.00" min="0"
                      style={{ flex: 1, background: 'none', border: 'none', padding: '11px 0', color: '#fff', fontSize: 16, fontWeight: 700, outline: 'none' }} />
                    {stake && <button onClick={() => setStake('')} style={{ padding: '0 12px', background: 'none', border: 'none', color: '#9aa0b4', cursor: 'pointer' }}>✕</button>}
                  </div>
                </div>

                {/* Quick stakes */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  {quickStakes.map(q => (
                    <button key={q} onClick={() => setStake(String((stakeNum || 0) + q))}
                      style={{ flex: 1, padding: '6px 4px', background: '#242938', border: '1px solid #2e3347', borderRadius: 6, color: '#cdd0db', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
                      +{q}
                    </button>
                  ))}
                </div>

                {/* Potential win */}
                <div style={{ background: '#0f1320', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                    <span style={{ color: '#9aa0b4' }}>Stake</span>
                    <span>৳{stakeNum.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#9aa0b4' }}>Potential Win</span>
                    <span style={{ color: '#00b050', fontWeight: 700, fontSize: 15 }}>৳{potentialWin.toFixed(2)}</span>
                  </div>
                </div>

                {/* Balance warning */}
                {state.isLoggedIn && stakeNum > (state.user?.balance || 0) && (
                  <div style={{ background: '#2d1515', border: '1px solid #e63946', borderRadius: 8, padding: '8px 12px', marginBottom: 10, fontSize: 12, color: '#e63946' }}>
                    ⚠️ Insufficient balance. Please deposit.
                  </div>
                )}

                <button onClick={handlePlaceBet} disabled={placing || (!stakeNum && state.isLoggedIn)}
                  style={{ width: '100%', padding: '13px', background: placing ? '#005530' : '#00b050', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                  {placing ? '⏳ Placing Bet...' : state.isLoggedIn ? `Place Bet · ৳${stakeNum.toFixed(2)}` : '🔒 Log In to Place Bet'}
                </button>

                <button onClick={() => dispatch({ type: 'CLEAR_BETSLIP' })}
                  style={{ width: '100%', marginTop: 8, padding: '9px', background: 'none', border: '1px solid #2e3347', color: '#9aa0b4', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                  Clear All
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === 'openbets' && (
          <div style={{ padding: 12 }}>
            {state.placedBets.filter(b => b.status === 'open').length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#9aa0b4' }}>
                <i className="fa fa-list-check" style={{ fontSize: 36, marginBottom: 12, display: 'block', opacity: 0.3 }}></i>
                <div>No open bets</div>
              </div>
            ) : (
              state.placedBets.filter(b => b.status === 'open').map(bet => (
                <div key={bet.id} style={{ background: '#242938', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: '#9aa0b4' }}>{new Date(bet.placedAt).toLocaleDateString()}</span>
                    <span style={{ background: '#1e3d1e', color: '#00b050', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>OPEN</span>
                  </div>
                  {bet.items.map(item => (
                    <div key={item.selectionId} style={{ marginBottom: 6 }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{item.selectionName}</div>
                      <div style={{ fontSize: 11, color: '#9aa0b4' }}>{item.matchName}</div>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #2e3347', paddingTop: 8, marginTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#9aa0b4' }}>Stake</span>
                      <span>৳{bet.stake}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: '#9aa0b4' }}>Potential Win</span>
                      <span style={{ color: '#00b050', fontWeight: 700 }}>৳{bet.potentialWin.toFixed(2)}</span>
                    </div>
                    {bet.cashoutValue && (
                      <button style={{ width: '100%', marginTop: 8, padding: '8px', background: '#f5c518', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 13, color: '#0a0d18', cursor: 'pointer' }}>
                        Cash Out · ৳{bet.cashoutValue.toFixed(2)}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'settled' && (
          <div style={{ padding: 12 }}>
            {state.placedBets.filter(b => b.status !== 'open').length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#9aa0b4' }}>
                <div>No settled bets</div>
              </div>
            ) : (
              state.placedBets.filter(b => b.status !== 'open').map(bet => (
                <div key={bet.id} style={{ background: '#242938', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12 }}>{bet.items[0]?.selectionName}</span>
                    <span style={{ color: bet.status === 'won' ? '#00b050' : '#e63946', fontWeight: 700, fontSize: 13 }}>
                      {bet.status === 'won' ? `+৳${bet.potentialWin.toFixed(2)}` : `-৳${bet.stake}`}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
