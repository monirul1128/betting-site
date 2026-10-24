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
  const potentialWin = betType === 'accumulator'
    ? stakeNum * totalOdds
    : stakeNum * (state.betSlip[0]?.odds || 1);

  const handlePlaceBet = async () => {
    if (!state.isLoggedIn) {
      dispatch({ type: 'SHOW_AUTH', payload: { mode: 'login', action: 'place_bet' } });
      return;
    }
    if (!stakeNum || stakeNum <= 0) return;
    if (stakeNum > (state.user?.balance || 0)) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: 'Insufficient balance.', type: 'error' } });
      return;
    }
    setPlacing(true);
    await new Promise(r => setTimeout(r, 900));
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
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: `Bet placed! Win: ৳${potentialWin.toFixed(2)}`, type: 'success' } });
    setStake('');
    setPlacing(false);
  };

  const PanelInner = () => (
    <>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #2e3347', background: '#0f1320', flexShrink: 0 }}>
        {[
          { key: 'betslip',  label: `Slip${state.betSlip.length > 0 ? ` (${state.betSlip.length})` : ''}` },
          { key: 'openbets', label: `Open (${state.placedBets.filter(b => b.status === 'open').length})` },
          { key: 'settled',  label: 'Settled' },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)}
            style={{ flex: 1, padding: '11px 4px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
              color: activeTab === t.key ? '#00b050' : '#9aa0b4',
              borderBottom: activeTab === t.key ? '2px solid #00b050' : '2px solid transparent' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'betslip' && (
          state.betSlip.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: '#9aa0b4' }}>
              <div style={{ fontSize: 40, marginBottom: 10, opacity: .3 }}>🎟️</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Your bet slip is empty</div>
              <div style={{ fontSize: 12 }}>Click any odds to add a selection</div>
            </div>
          ) : (
            <div style={{ padding: 12 }}>
              {state.betSlip.length > 1 && (
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  {(['single', 'accumulator'] as const).map(t => (
                    <button key={t} onClick={() => setBetType(t)}
                      style={{ flex: 1, padding: 7, background: betType === t ? '#00b050' : '#242938', border: `1px solid ${betType === t ? '#00b050' : '#2e3347'}`, borderRadius: 6, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                      {t}
                    </button>
                  ))}
                </div>
              )}

              {state.betSlip.map(item => (
                <div key={item.selectionId} style={{ background: '#242938', borderRadius: 8, padding: 10, marginBottom: 8, position: 'relative' }}>
                  <button onClick={() => dispatch({ type: 'REMOVE_FROM_BETSLIP', payload: item.selectionId })}
                    style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#9aa0b4', cursor: 'pointer', fontSize: 14 }}>✕</button>
                  <div style={{ fontSize: 10, color: '#9aa0b4', marginBottom: 2 }}>{item.sportName}{item.status === 'live' ? ' · 🔴 LIVE' : ''}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2, paddingRight: 20 }}>{item.matchName}</div>
                  <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 6 }}>{item.marketName}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{item.selectionName}</span>
                    <span style={{ background: '#00b050', color: '#fff', padding: '3px 10px', borderRadius: 5, fontWeight: 700, fontSize: 14 }}>{item.odds.toFixed(2)}</span>
                  </div>
                </div>
              ))}

              {state.betSlip.length > 1 && betType === 'accumulator' && (
                <div style={{ background: '#1e2d1e', border: '1px solid #2a4a2a', borderRadius: 8, padding: '8px 12px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#9aa0b4' }}>{state.betSlip.length}-Fold Acca</span>
                  <span style={{ color: '#00b050', fontWeight: 700 }}>{totalOdds.toFixed(2)}</span>
                </div>
              )}

              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', fontSize: 11, color: '#9aa0b4', marginBottom: 5 }}>Stake (৳)</label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, overflow: 'hidden' }}>
                  <span style={{ padding: '0 10px', color: '#9aa0b4', fontWeight: 700, fontSize: 16 }}>৳</span>
                  <input type="number" value={stake} onChange={e => setStake(e.target.value)} placeholder="0.00" min="0"
                    style={{ flex: 1, background: 'none', border: 'none', padding: '11px 0', color: '#fff', fontSize: 16, fontWeight: 700, outline: 'none' }} />
                  {stake && <button onClick={() => setStake('')} style={{ padding: '0 10px', background: 'none', border: 'none', color: '#9aa0b4', cursor: 'pointer' }}>✕</button>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5, marginBottom: 10 }}>
                {[100, 200, 500, 1000].map(q => (
                  <button key={q} onClick={() => setStake(String((stakeNum || 0) + q))}
                    style={{ padding: 7, background: '#242938', border: '1px solid #2e3347', borderRadius: 6, color: '#cdd0db', fontSize: 11, cursor: 'pointer' }}>
                    +{q}
                  </button>
                ))}
              </div>

              <div style={{ background: '#0f1320', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#9aa0b4' }}>Stake</span><span>৳{stakeNum.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#9aa0b4' }}>Potential Win</span>
                  <span style={{ color: '#00b050', fontWeight: 700 }}>৳{potentialWin.toFixed(2)}</span>
                </div>
              </div>

              {state.isLoggedIn && stakeNum > (state.user?.balance || 0) && (
                <div style={{ background: '#2d1515', border: '1px solid #e63946', borderRadius: 8, padding: '8px 12px', marginBottom: 8, fontSize: 12, color: '#e63946' }}>
                  ⚠️ Insufficient balance.
                </div>
              )}

              <button onClick={handlePlaceBet} disabled={placing || (state.isLoggedIn && !stakeNum)}
                style={{ width: '100%', padding: 13, background: placing ? '#005530' : '#00b050', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                {placing ? '⏳ Placing…' : state.isLoggedIn ? `Place Bet · ৳${stakeNum.toFixed(2)}` : '🔒 Log In to Bet'}
              </button>
              <button onClick={() => dispatch({ type: 'CLEAR_BETSLIP' })}
                style={{ width: '100%', marginTop: 6, padding: 9, background: 'none', border: '1px solid #2e3347', color: '#9aa0b4', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                Clear All
              </button>
            </div>
          )
        )}

        {activeTab === 'openbets' && (
          <div style={{ padding: 10 }}>
            {state.placedBets.filter(b => b.status === 'open').length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#9aa0b4', fontSize: 13 }}>No open bets</div>
            ) : state.placedBets.filter(b => b.status === 'open').map(bet => (
              <div key={bet.id} style={{ background: '#242938', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ background: '#1e3d1e', color: '#00b050', fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700 }}>OPEN</span>
                  <span style={{ fontSize: 11, color: '#9aa0b4' }}>{new Date(bet.placedAt).toLocaleDateString()}</span>
                </div>
                {bet.items.map(item => (
                  <div key={item.selectionId} style={{ marginBottom: 4 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{item.selectionName}</div>
                    <div style={{ fontSize: 11, color: '#9aa0b4' }}>{item.matchName}</div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #2e3347', paddingTop: 8, marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#9aa0b4' }}>Win: <span style={{ color: '#00b050', fontWeight: 700 }}>৳{bet.potentialWin.toFixed(2)}</span></span>
                  {bet.cashoutValue && (
                    <button style={{ background: '#f5c518', color: '#0a0d18', border: 'none', borderRadius: 6, padding: '5px 10px', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                      Cash Out ৳{bet.cashoutValue.toFixed(0)}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settled' && (
          <div style={{ padding: 10 }}>
            {state.placedBets.filter(b => b.status !== 'open').length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#9aa0b4', fontSize: 13 }}>No settled bets</div>
            ) : state.placedBets.filter(b => b.status !== 'open').map(bet => (
              <div key={bet.id} style={{ background: '#242938', borderRadius: 8, padding: 10, marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12 }}>{bet.items[0]?.selectionName}</span>
                <span style={{ color: bet.status === 'won' ? '#00b050' : '#e63946', fontWeight: 700 }}>
                  {bet.status === 'won' ? `+৳${bet.potentialWin.toFixed(0)}` : `-৳${bet.stake}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile bottom drawer */}
      <div className="betslip-mobile-drawer" style={{ position: 'fixed', inset: 0, zIndex: 150 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.65)' }}
          onClick={() => dispatch({ type: 'TOGGLE_BETSLIP' })} />
        <div className="anim-slideUp" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: '#1a1f2e', borderRadius: '16px 16px 0 0',
          maxHeight: '88vh', display: 'flex', flexDirection: 'column',
          border: '1px solid #2e3347', borderBottom: 'none',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
            <div style={{ width: 36, height: 4, background: '#2e3347', borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 10px', borderBottom: '1px solid #2e3347' }}>
            <span style={{ fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              🎟️ Bet Slip
              {state.betSlip.length > 0 && <span style={{ background: '#00b050', color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{state.betSlip.length}</span>}
            </span>
            <button onClick={() => dispatch({ type: 'TOGGLE_BETSLIP' })}
              style={{ background: '#242938', border: 'none', color: '#fff', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: 16 }}>✕</button>
          </div>
          <PanelInner />
        </div>
      </div>

      {/* Desktop right panel */}
      <div className="betslip-desktop-panel">
        <div style={{ background: '#0f1320', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2e3347', flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
            🎟️ Bet Slip
            {state.betSlip.length > 0 && <span style={{ background: '#00b050', color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{state.betSlip.length}</span>}
          </span>
          <button onClick={() => dispatch({ type: 'TOGGLE_BETSLIP' })}
            style={{ background: 'none', border: 'none', color: '#9aa0b4', cursor: 'pointer', fontSize: 18 }}>✕</button>
        </div>
        <PanelInner />
      </div>
    </>
  );
}
