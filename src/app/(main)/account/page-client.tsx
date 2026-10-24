'use client';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import BetSlip from '@/components/layout/BetSlip';
import BottomNav from '@/components/layout/BottomNav';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import Link from 'next/link';

function AccountContent() {
  const { state, dispatch } = useStore();

  if (!state.isLoggedIn || !state.user) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#1a1f2e' }}>
        <Header />
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:56, marginBottom:14 }}>🔒</div>
            <h2 style={{ fontSize:20, fontWeight:800, marginBottom:8 }}>Login Required</h2>
            <p style={{ color:'#9aa0b4', marginBottom:20, fontSize:14 }}>Log in to access your account.</p>
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

  const { user } = state;

  const menuItems = [
    { href:'/account/bets',   icon:'🎯', label:'My Bets',    desc:'Open & settled bets',                      color:'#00b050' },
    { href:'/account/wallet', icon:'💳', label:'Wallet',     desc:`Balance: ৳${user.balance.toLocaleString()}`, color:'#f5c518' },
    { href:'/promotions',     icon:'🎁', label:'Bonuses',    desc:`Bonus: ৳${user.bonusBalance.toLocaleString()}`,color:'#6c00b0' },
    { href:'#',               icon:'🔒', label:'Security',   desc:'Password & 2FA',                            color:'#3b82f6' },
    { href:'#',               icon:'📋', label:'Bet History',desc:'Full betting history',                       color:'#9aa0b4' },
    { href:'#',               icon:'⚠️', label:'Responsible',desc:'Limits & self-exclusion',                   color:'#e63946' },
  ];

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#1a1f2e' }}>
      <Header />
      <main style={{ flex:1, minWidth:0, paddingBottom:80, paddingRight:state.showBetSlip?320:0, transition:'padding-right .25s' }}>
        <div style={{ padding:'14px 12px', maxWidth:700, margin:'0 auto' }}>

          {/* Profile card */}
          <div style={{ background:'linear-gradient(135deg,#1a2d1a,#0f1d0f)', border:'1px solid #2a4a2a', borderRadius:14, padding:'20px 18px', marginBottom:20 }}>
            <div style={{ display:'flex', gap:14, alignItems:'center' }}>
              <div style={{ width:60, height:60, background:'#00b050', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:24, flexShrink:0 }}>
                {user.name[0].toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:18, fontWeight:800, marginBottom:2 }}>{user.name}</div>
                <div style={{ fontSize:12, color:'#9aa0b4', marginBottom:8, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.email}</div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <span style={{ background:user.isVerified?'#1e3d1e':'#2d1515', color:user.isVerified?'#00b050':'#e63946', fontSize:10, padding:'2px 8px', borderRadius:6, fontWeight:700 }}>
                    {user.isVerified?'✓ Verified':'⚠ Unverified'}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ marginTop:14, display:'flex', gap:10, alignItems:'center' }}>
              <div style={{ flex:1, background:'rgba(0,0,0,.2)', borderRadius:8, padding:'10px 12px' }}>
                <div style={{ fontSize:10, color:'#9aa0b4' }}>Total Balance</div>
                <div style={{ fontSize:20, fontWeight:900, color:'#00b050' }}>৳{(user.balance + user.bonusBalance).toLocaleString()}</div>
              </div>
              <Link href="/account/wallet" style={{ textDecoration:'none' }}>
                <button style={{ background:'#f5c518', color:'#0a0d18', border:'none', borderRadius:8, padding:'12px 16px', fontWeight:700, fontSize:14, cursor:'pointer' }}>
                  + Deposit
                </button>
              </Link>
            </div>
          </div>

          {/* Menu grid — 2 cols on mobile, 3 on desktop */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:20 }}
            className="sm:grid-cols-3">
            {menuItems.map(item => (
              <Link key={item.href} href={item.href} style={{ textDecoration:'none' }}>
                <div style={{ background:'#1e2435', border:'1px solid #2e3347', borderRadius:12, padding:'14px 14px', cursor:'pointer', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2e3347'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>{item.icon}</div>
                  <div style={{ fontWeight:700, fontSize:14, marginBottom:3 }}>{item.label}</div>
                  <div style={{ fontSize:11, color:'#9aa0b4', lineHeight:1.4 }}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Responsible gambling */}
          <div style={{ background:'#1e2435', border:'1px solid #2e3347', borderRadius:12, padding:'16px 18px', marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>⚠️ Responsible Gambling</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {[
                { label:'Daily Limit',   value:'Not set' },
                { label:'Weekly Limit',  value:'Not set' },
                { label:'Session Timer', value:'Off'     },
                { label:'Self-Exclusion',value:'Active'  },
              ].map(item => (
                <div key={item.label} style={{ background:'#242938', borderRadius:8, padding:'10px 12px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:8 }}>
                  <div>
                    <div style={{ fontSize:11, color:'#9aa0b4', marginBottom:1 }}>{item.label}</div>
                    <div style={{ fontSize:12, fontWeight:600 }}>{item.value}</div>
                  </div>
                  <button style={{ background:'none', border:'1px solid #3a4060', color:'#9aa0b4', borderRadius:6, padding:'4px 8px', fontSize:11, cursor:'pointer', flexShrink:0 }}>Set</button>
                </div>
              ))}
            </div>
          </div>

          {/* Logout */}
          <button onClick={() => dispatch({ type:'LOGOUT' })}
            style={{ width:'100%', padding:'14px', background:'none', border:'1px solid #e63946', color:'#e63946', borderRadius:10, fontWeight:700, fontSize:15, cursor:'pointer' }}>
            🚪 Log Out
          </button>
        </div>
      </main>
      <BetSlip />
      <BottomNav />
      <AuthModal />
      <Notifications />
    </div>
  );
}
export default function AccountPage() { return <StoreProvider><AccountContent /></StoreProvider>; }
