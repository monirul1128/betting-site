'use client';
import { useState } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import BetSlip from '@/components/layout/BetSlip';
import BottomNav from '@/components/layout/BottomNav';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';

function BetsContent() {
  const { state, dispatch } = useStore();
  const [activeTab, setActiveTab] = useState<'open'|'settled'>('open');

  if (!state.isLoggedIn) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#1a1f2e' }}>
        <Header />
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:56, marginBottom:14 }}>🔒</div>
            <h2 style={{ fontSize:20, fontWeight:800, marginBottom:8 }}>Login Required</h2>
            <button onClick={() => dispatch({ type:'SHOW_AUTH', payload:{ mode:'login' } })}
              style={{ background:'#00b050', color:'#fff', border:'none', borderRadius:8, padding:'12px 28px', fontWeight:700, fontSize:15, cursor:'pointer' }}>
              Log In
            </button>
          </div>
        </div>
        <AuthModal /><Notifications />
      </div>
    );
  }

  const openBets    = state.placedBets.filter(b => b.status === 'open');
  const settledBets = state.placedBets.filter(b => b.status !== 'open');

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#1a1f2e' }}>
      <Header />
      <main style={{ flex:1, minWidth:0, paddingBottom:80, paddingRight:state.showBetSlip?320:0, transition:'padding-right .25s' }}>
        <div style={{ padding:'14px 12px', maxWidth:800, margin:'0 auto' }}>
          <h1 style={{ fontSize:20, fontWeight:800, marginBottom:16 }}>🎯 My Bets</h1>

          {/* Summary cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:20 }} className="sm:grid-cols-4">
            {[
              { label:'Open Bets',    value:openBets.length,                                              color:'#00b050' },
              { label:'Total Staked', value:`৳${state.placedBets.reduce((a,b)=>a+b.stake,0).toFixed(0)}`, color:'#f5c518' },
              { label:'Total Won',    value:`৳${settledBets.filter(b=>b.status==='won').reduce((a,b)=>a+b.potentialWin,0).toFixed(0)}`, color:'#00b050' },
              { label:'Potential',    value:`৳${openBets.reduce((a,b)=>a+b.potentialWin,0).toFixed(0)}`,  color:'#3b82f6' },
            ].map(c => (
              <div key={c.label} style={{ background:'#1e2435', border:'1px solid #2e3347', borderRadius:10, padding:'12px 14px' }}>
                <div style={{ fontSize:11, color:'#9aa0b4', marginBottom:4 }}>{c.label}</div>
                <div style={{ fontSize:18, fontWeight:900, color:c.color }}>{c.value}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', borderBottom:'1px solid #2e3347', marginBottom:16 }}>
            {[{ key:'open', label:`Open (${openBets.length})` },{ key:'settled', label:`Settled (${settledBets.length})` }].map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)}
                style={{ flex:1, padding:'12px', background:'none', border:'none', cursor:'pointer', fontSize:14, fontWeight:600,
                  color:activeTab===t.key?'#00b050':'#9aa0b4',
                  borderBottom:activeTab===t.key?'2px solid #00b050':'2px solid transparent' }}>
                {t.label}
              </button>
            ))}
          </div>

          {activeTab==='open' && (
            openBets.length===0 ? (
              <div style={{ textAlign:'center', padding:'48px 20px', color:'#9aa0b4' }}>
                <div style={{ fontSize:40, marginBottom:12, opacity:.2 }}>🎟️</div>
                <div style={{ fontWeight:600, marginBottom:4 }}>No open bets</div>
                <div style={{ fontSize:13 }}>Browse sports and place a bet</div>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {openBets.map(bet => (
                  <div key={bet.id} style={{ background:'#1e2435', border:'1px solid #2e3347', borderRadius:12, padding:16 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ background:'#1e3d1e', color:'#00b050', fontSize:10, padding:'2px 8px', borderRadius:6, fontWeight:700 }}>OPEN</span>
                        <span style={{ fontSize:12, color:'#9aa0b4' }}>{bet.type==='accumulator'?`${bet.items.length}-Fold Acca`:'Single'}</span>
                      </div>
                      <span style={{ fontSize:11, color:'#9aa0b4' }}>{new Date(bet.placedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</span>
                    </div>
                    {bet.items.map(item => (
                      <div key={item.selectionId} style={{ padding:'9px 12px', background:'#242938', borderRadius:8, marginBottom:6 }}>
                        <div style={{ fontSize:11, color:'#9aa0b4', marginBottom:2 }}>{item.sportName} · {item.marketName}</div>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <div>
                            <div style={{ fontSize:13, fontWeight:600 }}>{item.matchName}</div>
                            <div style={{ fontSize:12, color:'#cdd0db' }}>{item.selectionName}</div>
                          </div>
                          <span style={{ background:'#00b050', color:'#fff', padding:'3px 9px', borderRadius:5, fontWeight:700, fontSize:13 }}>{item.odds.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:10, borderTop:'1px solid #2e3347' }}>
                      <div style={{ display:'flex', gap:20 }}>
                        <div>
                          <div style={{ fontSize:11, color:'#9aa0b4' }}>Stake</div>
                          <div style={{ fontWeight:700, fontSize:14 }}>৳{bet.stake}</div>
                        </div>
                        <div>
                          <div style={{ fontSize:11, color:'#9aa0b4' }}>Potential Win</div>
                          <div style={{ fontWeight:700, fontSize:14, color:'#00b050' }}>৳{bet.potentialWin.toFixed(2)}</div>
                        </div>
                      </div>
                      {bet.cashoutValue && (
                        <button onClick={() => {
                            dispatch({ type:'UPDATE_BALANCE', payload:(state.user?.balance||0)+bet.cashoutValue! });
                            dispatch({ type:'ADD_NOTIFICATION', payload:{ id:Date.now().toString(), message:`Cashed out ৳${bet.cashoutValue?.toFixed(2)}`, type:'success' } });
                          }}
                          style={{ background:'#f5c518', color:'#0a0d18', border:'none', borderRadius:8, padding:'9px 14px', fontWeight:700, fontSize:12, cursor:'pointer' }}>
                          💰 Cash Out<br/>৳{bet.cashoutValue.toFixed(0)}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab==='settled' && (
            settledBets.length===0 ? (
              <div style={{ textAlign:'center', padding:'48px 20px', color:'#9aa0b4' }}>
                <div style={{ fontWeight:600 }}>No settled bets yet</div>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {settledBets.map(bet => (
                  <div key={bet.id} style={{ background:'#1e2435', border:`1px solid ${bet.status==='won'?'#2a4a2a':'#3a1515'}`, borderRadius:12, padding:14, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                      <span style={{ background:bet.status==='won'?'#1e3d1e':'#2d1515', color:bet.status==='won'?'#00b050':'#e63946', fontSize:10, padding:'2px 8px', borderRadius:6, fontWeight:700, textTransform:'uppercase' }}>{bet.status}</span>
                      <div style={{ fontSize:13, marginTop:6 }}>{bet.items[0]?.selectionName}</div>
                      <div style={{ fontSize:11, color:'#9aa0b4' }}>{bet.items[0]?.matchName}</div>
                    </div>
                    <div style={{ color:bet.status==='won'?'#00b050':'#e63946', fontWeight:700, fontSize:16, textAlign:'right' }}>
                      {bet.status==='won'?`+৳${bet.potentialWin.toFixed(0)}`:`-৳${bet.stake}`}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </main>
      <BetSlip />
      <BottomNav />
      <AuthModal />
      <Notifications />
    </div>
  );
}
export default function BetsPage() { return <StoreProvider><BetsContent /></StoreProvider>; }
