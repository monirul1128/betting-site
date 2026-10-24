'use client';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import BetSlip from '@/components/layout/BetSlip';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import Link from 'next/link';

function AccountContent() {
  const { state, dispatch } = useStore();

  if (!state.isLoggedIn || !state.user) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🔒</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Login Required</h2>
            <p style={{ color: '#9aa0b4', marginBottom: 20 }}>Please log in to access your account.</p>
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

  const menuItems = [
    { href: '/account/bets', icon: 'fa-list-check', label: 'My Bets', desc: 'Open & settled bets', color: '#00b050' },
    { href: '/account/wallet', icon: 'fa-wallet', label: 'Wallet', desc: `Balance: ৳${state.user.balance.toLocaleString()}`, color: '#f5c518' },
    { href: '/promotions', icon: 'fa-gift', label: 'Bonuses', desc: `Bonus: ৳${state.user.bonusBalance.toLocaleString()}`, color: '#6c00b0' },
    { href: '#', icon: 'fa-shield-halved', label: 'Security', desc: 'Password & 2FA', color: '#3b82f6' },
    { href: '#', icon: 'fa-clock-rotate-left', label: 'Bet History', desc: 'Full betting history', color: '#9aa0b4' },
    { href: '#', icon: 'fa-hand-holding-heart', label: 'Responsible Gambling', desc: 'Limits & self-exclusion', color: '#e63946' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <main style={{ flex: 1, overflow: 'auto', paddingRight: state.showBetSlip ? 320 : 0 }}>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 20px' }}>

            {/* Profile card */}
            <div style={{ background: 'linear-gradient(135deg, #1a2d1a, #0f1d0f)', border: '1px solid #2a4a2a', borderRadius: 16, padding: '28px 28px', marginBottom: 24, display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ width: 72, height: 72, background: '#00b050', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 28, flexShrink: 0 }}>
                {state.user.name[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{state.user.name}</div>
                <div style={{ fontSize: 14, color: '#9aa0b4', marginBottom: 8 }}>{state.user.email} · {state.user.phone}</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ background: state.user.isVerified ? '#1e3d1e' : '#2d1515', color: state.user.isVerified ? '#00b050' : '#e63946', fontSize: 11, padding: '3px 10px', borderRadius: 6, fontWeight: 700 }}>
                    {state.user.isVerified ? '✓ Verified' : '⚠ Unverified'}
                  </span>
                  <span style={{ background: '#1e2435', fontSize: 11, padding: '3px 10px', borderRadius: 6, color: '#9aa0b4' }}>
                    Member since {new Date(state.user.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 4 }}>Total Balance</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#00b050' }}>৳{(state.user.balance + state.user.bonusBalance).toLocaleString()}</div>
                <Link href="/account/wallet" style={{ textDecoration: 'none' }}>
                  <button style={{ background: '#f5c518', color: '#0a0d18', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer', marginTop: 8 }}>
                    + Deposit
                  </button>
                </Link>
              </div>
            </div>

            {/* Menu grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
              {menuItems.map(item => (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, padding: '18px 16px', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget.style.borderColor = item.color); (e.currentTarget.style.transform = 'translateY(-2px)'); }}
                    onMouseLeave={e => { (e.currentTarget.style.borderColor = '#2e3347'); (e.currentTarget.style.transform = 'translateY(0)'); }}>
                    <div style={{ width: 40, height: 40, background: `${item.color}22`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                      <i className={`fa ${item.icon}`} style={{ color: item.color, fontSize: 18 }}></i>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: '#9aa0b4' }}>{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Responsible gambling */}
            <div style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>⚠️ Responsible Gambling</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Daily Deposit Limit', value: 'Not set', action: 'Set Limit' },
                  { label: 'Weekly Deposit Limit', value: 'Not set', action: 'Set Limit' },
                  { label: 'Session Time Reminder', value: 'Off', action: 'Enable' },
                  { label: 'Self-Exclusion', value: 'Active', action: 'Manage' },
                ].map(item => (
                  <div key={item.label} style={{ background: '#242938', borderRadius: 8, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 12, color: '#9aa0b4', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</div>
                    </div>
                    <button style={{ background: 'none', border: '1px solid #3a4060', color: '#9aa0b4', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer' }}>{item.action}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Logout */}
            <button onClick={() => dispatch({ type: 'LOGOUT' })}
              style={{ width: '100%', padding: '13px', background: 'none', border: '1px solid #e63946', color: '#e63946', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(230,57,70,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
              <i className="fa fa-arrow-right-from-bracket" style={{ marginRight: 8 }}></i>
              Log Out
            </button>
          </div>
        </main>
        <BetSlip />
      </div>
      <AuthModal />
      <Notifications />
    </div>
  );
}

export default function AccountPage() {
  return <StoreProvider><AccountContent /></StoreProvider>;
}
