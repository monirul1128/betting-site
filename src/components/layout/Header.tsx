'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

export default function Header() {
  const { state, dispatch } = useStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: 'fa-house' },
    { href: '/sports', label: 'Sports', icon: 'fa-futbol' },
    { href: '/live', label: 'Live', icon: 'fa-circle', live: true },
    { href: '/casino', label: 'Casino', icon: 'fa-dice' },
    { href: '/promotions', label: 'Promotions', icon: 'fa-gift' },
  ];

  return (
    <header style={{ background: '#0f1320', borderBottom: '1px solid #2e3347', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top bar */}
      <div style={{ background: '#0a0d18', padding: '6px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#9aa0b4' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>🏆 Best Odds Guaranteed</span>
          <span>⚡ Live Streaming</span>
          <span>💳 Instant Withdrawal</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="#" style={{ color: '#9aa0b4', textDecoration: 'none' }}>Help</a>
          <span>|</span>
          <a href="#" style={{ color: '#9aa0b4', textDecoration: 'none' }}>Responsible Gambling</a>
          <span>|</span>
          <span>18+</span>
        </div>
      </div>

      {/* Main header */}
      <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center', height: 58, gap: 16 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #00b050, #007a38)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#fff' }}>B</div>
            <span style={{ fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.5px' }}>Bet<span style={{ color: '#00b050' }}>Pro</span></span>
          </div>
        </Link>

        {/* Nav - desktop */}
        <nav style={{ display: 'flex', gap: 2, marginLeft: 8 }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '6px 14px', borderRadius: 6, color: link.live ? '#e63946' : '#cdd0db', fontWeight: 500, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1e2435')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                {link.live && <span className="live-dot" style={{ width: 8, height: 8, background: '#e63946', borderRadius: '50%', display: 'inline-block' }}></span>}
                {link.label}
              </div>
            </Link>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <i className="fa fa-search" style={{ position: 'absolute', left: 10, color: '#9aa0b4', fontSize: 13 }}></i>
          <input placeholder="Search sports, teams..."
            style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 20, padding: '7px 14px 7px 32px', color: '#fff', fontSize: 13, width: 200, outline: 'none' }} />
        </div>

        {/* Auth buttons */}
        {state.isLoggedIn && state.user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Balance */}
            <Link href="/account/wallet" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '6px 14px', cursor: 'pointer' }}>
                <div style={{ fontSize: 10, color: '#9aa0b4' }}>Balance</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#00b050' }}>{state.user.currency}{state.user.balance.toLocaleString()}</div>
              </div>
            </Link>

            {/* Deposit button */}
            <Link href="/account/wallet" style={{ textDecoration: 'none' }}>
              <button style={{ background: '#f5c518', color: '#0a0d18', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                + Deposit
              </button>
            </Link>

            {/* Bet slip */}
            <button onClick={() => dispatch({ type: 'TOGGLE_BETSLIP' })}
              style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', position: 'relative', color: '#fff' }}>
              <i className="fa fa-receipt" style={{ fontSize: 16 }}></i>
              {state.betSlip.length > 0 && (
                <span style={{ position: 'absolute', top: -6, right: -6, background: '#00b050', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {state.betSlip.length}
                </span>
              )}
            </button>

            {/* User menu */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '7px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
                <div style={{ width: 28, height: 28, background: '#00b050', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                  {state.user.name[0].toUpperCase()}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{state.user.name}</span>
                <i className="fa fa-chevron-down" style={{ fontSize: 10, color: '#9aa0b4' }}></i>
              </button>

              {showUserMenu && (
                <div className="animate-slideDown" style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: '#1e2435', border: '1px solid #2e3347', borderRadius: 10, minWidth: 200, zIndex: 200, overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #2e3347', background: '#242938' }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{state.user.name}</div>
                    <div style={{ fontSize: 12, color: '#9aa0b4' }}>{state.user.email}</div>
                  </div>
                  {[
                    { href: '/account', label: 'My Account', icon: 'fa-user' },
                    { href: '/account/bets', label: 'My Bets', icon: 'fa-list-check' },
                    { href: '/account/wallet', label: 'Wallet', icon: 'fa-wallet' },
                    { href: '/promotions', label: 'Bonuses', icon: 'fa-gift' },
                  ].map(item => (
                    <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }} onClick={() => setShowUserMenu(false)}>
                      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, color: '#cdd0db', fontSize: 13, cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#2a3045')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <i className={`fa ${item.icon}`} style={{ width: 16, color: '#9aa0b4' }}></i>
                        {item.label}
                      </div>
                    </Link>
                  ))}
                  <div style={{ borderTop: '1px solid #2e3347' }}>
                    <button onClick={() => { dispatch({ type: 'LOGOUT' }); setShowUserMenu(false); }}
                      style={{ width: '100%', padding: '10px 16px', background: 'none', border: 'none', color: '#e63946', cursor: 'pointer', textAlign: 'left', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <i className="fa fa-arrow-right-from-bracket" style={{ width: 16 }}></i>
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => dispatch({ type: 'SHOW_AUTH', payload: { mode: 'login' } })}
              style={{ background: 'none', border: '1px solid #2e3347', color: '#fff', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              Log In
            </button>
            <button onClick={() => dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } })}
              style={{ background: '#00b050', border: 'none', color: '#fff', borderRadius: 8, padding: '8px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Register
            </button>
            {/* Bet slip for guests */}
            <button onClick={() => dispatch({ type: 'TOGGLE_BETSLIP' })}
              style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', position: 'relative', color: '#fff' }}>
              <i className="fa fa-receipt" style={{ fontSize: 16 }}></i>
              {state.betSlip.length > 0 && (
                <span style={{ position: 'absolute', top: -6, right: -6, background: '#00b050', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {state.betSlip.length}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button onClick={() => setShowMobileNav(!showMobileNav)}
          style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}
          className="mobile-menu-btn">
          <i className={`fa ${showMobileNav ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile nav */}
      {showMobileNav && (
        <div style={{ background: '#0f1320', borderTop: '1px solid #2e3347', padding: '8px 0' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }} onClick={() => setShowMobileNav(false)}>
              <div style={{ padding: '12px 20px', color: link.live ? '#e63946' : '#cdd0db', fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10 }}>
                <i className={`fa ${link.icon}`} style={{ width: 20, color: '#9aa0b4' }}></i>
                {link.label}
                {link.live && <span style={{ background: '#e63946', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>LIVE</span>}
              </div>
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
