'use client';
import { useState } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import BetSlip from '@/components/layout/BetSlip';
import BottomNav from '@/components/layout/BottomNav';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';

const methods = [
  { id: 'bkash',  name: 'bKash',         icon: '📱', min: 100,  max: 50000 },
  { id: 'nagad',  name: 'Nagad',          icon: '💳', min: 100,  max: 50000 },
  { id: 'rocket', name: 'Rocket',         icon: '🚀', min: 100,  max: 50000 },
  { id: 'visa',   name: 'Visa/Mastercard',icon: '💰', min: 500,  max: 100000 },
  { id: 'crypto', name: 'USDT Crypto',    icon: '₿',  min: 10,   max: 999999 },
];

const mockTx = [
  { id: 't1', type: 'deposit',  amount:  5000, method: 'bKash',  status: 'completed', date: new Date(Date.now()-3600000).toISOString() },
  { id: 't2', type: 'bet',      amount:  -500, method: 'Bet',    status: 'completed', date: new Date(Date.now()-7200000).toISOString() },
  { id: 't3', type: 'win',      amount:  1200, method: 'Win',    status: 'completed', date: new Date(Date.now()-86400000).toISOString() },
  { id: 't4', type: 'withdraw', amount: -2000, method: 'Nagad',  status: 'completed', date: new Date(Date.now()-172800000).toISOString() },
  { id: 't5', type: 'bonus',    amount:   500, method: 'Bonus',  status: 'completed', date: new Date(Date.now()-259200000).toISOString() },
];

function WalletContent() {
  const { state, dispatch } = useStore();
  const [tab, setTab]       = useState<'deposit'|'withdraw'|'history'>('deposit');
  const [method, setMethod] = useState(methods[0]);
  const [amount, setAmount] = useState('');
  const [step, setStep]     = useState<'form'|'confirm'|'success'>('form');
  const [processing, setProcessing] = useState(false);

  if (!state.isLoggedIn) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#1a1f2e' }}>
        <Header />
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:56, marginBottom:14 }}>🔒</div>
            <h2 style={{ fontSize:20, fontWeight:800, marginBottom:8 }}>Login Required</h2>
            <p style={{ color:'#9aa0b4', marginBottom:20, fontSize:14 }}>Please log in to access your wallet.</p>
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

  const doAction = async () => {
    if (step === 'form') { setStep('confirm'); return; }
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1400));
    const amt = parseFloat(amount);
    if (tab === 'deposit') {
      dispatch({ type:'UPDATE_BALANCE', payload:(state.user?.balance||0)+amt });
      dispatch({ type:'ADD_NOTIFICATION', payload:{ id:Date.now().toString(), message:`৳${amt.toLocaleString()} deposited!`, type:'success' } });
    } else {
      if (amt > (state.user?.balance||0)) {
        dispatch({ type:'ADD_NOTIFICATION', payload:{ id:Date.now().toString(), message:'Insufficient balance', type:'error' } });
        setProcessing(false); setStep('form'); return;
      }
      dispatch({ type:'UPDATE_BALANCE', payload:(state.user?.balance||0)-amt });
      dispatch({ type:'ADD_NOTIFICATION', payload:{ id:Date.now().toString(), message:`Withdrawal of ৳${amt.toLocaleString()} submitted!`, type:'success' } });
    }
    setStep('success'); setProcessing(false);
  };

  const quickAmounts = [500,1000,2000,5000];

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#1a1f2e' }}>
      <Header />
      <div style={{ display:'flex', flex:1 }}>
        <main style={{ flex:1, minWidth:0, paddingBottom:80, paddingRight:state.showBetSlip?320:0, transition:'padding-right .25s' }}>
          <div style={{ padding:'14px 12px', maxWidth:800, margin:'0 auto' }}>
            <h1 style={{ fontSize:20, fontWeight:800, marginBottom:16 }}>💳 My Wallet</h1>

            {/* Balance cards — 1 row on mobile */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:20 }}>
              {[
                { label:'Balance',       value:`৳${(state.user?.balance||0).toLocaleString()}`, color:'#00b050' },
                { label:'Bonus',         value:`৳${(state.user?.bonusBalance||0).toLocaleString()}`, color:'#f5c518' },
                { label:'Total',         value:`৳${((state.user?.balance||0)+(state.user?.bonusBalance||0)).toLocaleString()}`, color:'#3b82f6' },
              ].map(c => (
                <div key={c.label} style={{ background:'#1e2435', border:'1px solid #2e3347', borderRadius:10, padding:'12px 10px', textAlign:'center' }}>
                  <div style={{ fontSize:10, color:'#9aa0b4', marginBottom:4 }}>{c.label}</div>
                  <div style={{ fontSize:16, fontWeight:900, color:c.color }}>{c.value}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display:'flex', borderBottom:'1px solid #2e3347', marginBottom:20 }}>
              {[{ key:'deposit',label:'⬇️ Deposit' },{ key:'withdraw',label:'⬆️ Withdraw' },{ key:'history',label:'📋 History' }].map(t => (
                <button key={t.key} onClick={() => { setTab(t.key as typeof tab); setStep('form'); setAmount(''); }}
                  style={{ flex:1, padding:'12px 4px', background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight:600,
                    color:tab===t.key?'#00b050':'#9aa0b4',
                    borderBottom:tab===t.key?'2px solid #00b050':'2px solid transparent' }}>
                  {t.label}
                </button>
              ))}
            </div>

            {(tab==='deposit'||tab==='withdraw') && step==='success' ? (
              <div style={{ textAlign:'center', padding:'40px 20px' }}>
                <div style={{ fontSize:56, marginBottom:14 }}>✅</div>
                <h2 style={{ fontSize:20, fontWeight:800, marginBottom:8 }}>{tab==='deposit'?'Deposit Successful!':'Withdrawal Submitted!'}</h2>
                <p style={{ color:'#9aa0b4', marginBottom:20, fontSize:14 }}>৳{amount} {tab==='deposit'?'added to your account.':'is being processed.'}</p>
                <button onClick={() => { setStep('form'); setAmount(''); }}
                  style={{ background:'#00b050', color:'#fff', border:'none', borderRadius:8, padding:'12px 28px', fontWeight:700, fontSize:15, cursor:'pointer' }}>
                  Back to Wallet
                </button>
              </div>
            ) : (tab==='deposit'||tab==='withdraw') && (
              <>
                {/* Method list */}
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:13, fontWeight:700, marginBottom:10, color:'#9aa0b4' }}>Select Method</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {methods.map(m => (
                      <button key={m.id} onClick={() => setMethod(m)}
                        style={{ background:method.id===m.id?'#1e3d1e':'#242938', border:`1px solid ${method.id===m.id?'#00b050':'#2e3347'}`, borderRadius:10, padding:'11px 14px', cursor:'pointer', display:'flex', alignItems:'center', gap:12, textAlign:'left' }}>
                        <span style={{ fontSize:22 }}>{m.icon}</span>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:600, fontSize:14, color:'#fff' }}>{m.name}</div>
                          <div style={{ fontSize:11, color:'#9aa0b4' }}>Min ৳{m.min} · Max ৳{m.max.toLocaleString()}</div>
                        </div>
                        {method.id===m.id && <span style={{ color:'#00b050', fontSize:18 }}>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {step==='form' ? (
                  <>
                    <div style={{ marginBottom:10 }}>
                      <div style={{ fontSize:13, fontWeight:700, marginBottom:8, color:'#9aa0b4' }}>Enter Amount</div>
                      <div style={{ display:'flex', alignItems:'center', background:'#242938', border:'1px solid #2e3347', borderRadius:10, overflow:'hidden' }}>
                        <span style={{ padding:'0 12px', fontWeight:700, fontSize:18, color:'#9aa0b4' }}>৳</span>
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" min="0"
                          style={{ flex:1, background:'none', border:'none', padding:'13px 0', color:'#fff', fontSize:20, fontWeight:700, outline:'none' }} />
                      </div>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:16 }}>
                      {quickAmounts.map(q => (
                        <button key={q} onClick={() => setAmount(String((parseFloat(amount)||0)+q))}
                          style={{ padding:'9px 4px', background:'#242938', border:'1px solid #2e3347', borderRadius:8, color:'#cdd0db', fontSize:13, cursor:'pointer', fontWeight:500 }}>
                          +{q}
                        </button>
                      ))}
                    </div>
                    <button onClick={doAction} disabled={!amount||parseFloat(amount)<method.min}
                      style={{ width:'100%', padding:'14px', background:!amount||parseFloat(amount)<method.min?'#1a2d1a':'#00b050', color:'#fff', border:'none', borderRadius:10, fontWeight:700, fontSize:15, cursor:'pointer' }}>
                      Continue →
                    </button>
                  </>
                ) : (
                  <div style={{ background:'#1e2435', border:'1px solid #2e3347', borderRadius:12, padding:20 }}>
                    <h3 style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>Confirm {tab==='deposit'?'Deposit':'Withdrawal'}</h3>
                    {[
                      { label:'Amount',  value:`৳${parseFloat(amount).toLocaleString()}` },
                      { label:'Method',  value:method.name },
                      { label:'Account', value:state.user?.phone||'01XXXXXXXX' },
                      { label:'Speed',   value:'Instant' },
                    ].map(r => (
                      <div key={r.label} style={{ display:'flex', justifyContent:'space-between', fontSize:14, marginBottom:10 }}>
                        <span style={{ color:'#9aa0b4' }}>{r.label}</span>
                        <span style={{ fontWeight:600 }}>{r.value}</span>
                      </div>
                    ))}
                    <div style={{ display:'flex', gap:10, marginTop:16 }}>
                      <button onClick={() => setStep('form')} style={{ flex:1, padding:'12px', background:'#242938', border:'1px solid #2e3347', color:'#fff', borderRadius:8, fontWeight:600, cursor:'pointer' }}>Back</button>
                      <button onClick={doAction} disabled={processing}
                        style={{ flex:2, padding:'12px', background:processing?'#005530':'#00b050', color:'#fff', border:'none', borderRadius:8, fontWeight:700, fontSize:15, cursor:'pointer' }}>
                        {processing?'⏳ Processing…':`Confirm ${tab==='deposit'?'Deposit':'Withdrawal'}`}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {tab==='history' && (
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {mockTx.map(tx => (
                  <div key={tx.id} style={{ background:'#1e2435', border:'1px solid #2e3347', borderRadius:10, padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, textTransform:'capitalize', color:tx.amount>0?'#00b050':'#e63946' }}>
                        {tx.type==='deposit'?'⬇️':tx.type==='win'?'🏆':tx.type==='bonus'?'🎁':tx.type==='bet'?'🎯':'⬆️'} {tx.type}
                      </div>
                      <div style={{ fontSize:11, color:'#9aa0b4', marginTop:2 }}>{tx.method}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontWeight:700, fontSize:15, color:tx.amount>0?'#00b050':'#e63946' }}>
                        {tx.amount>0?'+':''}৳{Math.abs(tx.amount).toLocaleString()}
                      </div>
                      <div style={{ fontSize:11, color:'#9aa0b4', marginTop:2 }}>
                        {new Date(tx.date).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
export default function WalletPage() { return <StoreProvider><WalletContent /></StoreProvider>; }
