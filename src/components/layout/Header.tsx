'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';

const navLinks = [
  { href: '/',           label: 'Home',    live: false },
  { href: '/sports',     label: 'Sports',  live: false },
  { href: '/live',       label: 'Live',    live: true  },
  { href: '/casino',     label: 'Casino',  live: false },
  { href: '/promotions', label: 'Promos',  live: false },
];

export default function Header() {
  const { state, dispatch } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const pathname = usePathname();
  const user = state.user;

  return (
    <header style={{ background: '#0f1320', borderBottom: '1px solid #2e3347', position: 'sticky', top: 0, zIndex: 100 }}>

      {/* Top promo bar — desktop only */}
      <div className="header-promo-bar">
        <div style={{ display: 'flex', gap: 16 }}>
          <span>🏆 Best Odds Guaranteed</span>
          <span>⚡ Live Streaming</span>
          <span>💳 Instant Withdrawal</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="#" style={{ color: '#9aa0b4', textDecoration: 'none' }}>Help</a>
          <span>|</span>
          <a href="#" style={{ color: '#9aa0b4', textDecoration: 'none' }}>Responsible Gambling</a>
          <span>|</span><span>18+</span>
        </div>
      </div>

      {/* Main bar */}
      <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', height: 56, gap: 8 }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#00b050,#007a38)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#fff' }}>B</div>
            <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: '-0.5px' }}>Bet<span style={{ color: '#00b050' }}>Pro</span></span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="header-desktop-nav">
          {navLinks.map(link => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '6px 12px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  color: active ? '#00b050' : link.live ? '#e63946' : '#cdd0db',
                  background: active ? 'rgba(0,176,80,.1)' : 'transparent',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  {link.live && <span className="live-dot" style={{ width: 7, height: 7, background: '#e63946', borderRadius: '50%', display: 'inline-block' }} />}
                  {link.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div style={{ flex: 1 }} />

        {/* Desktop search */}
        <div className="header-desktop-search">
          <span style={{ position: 'absolute', left: 10, color: '#9aa0b4', fontSize: 12 }}>🔍</span>
          <input placeholder="Search…" style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 20, padding: '6px 12px 6px 30px', color: '#fff', fontSize: 12, width: 180, outline: 'none' }} />
        </div>

        {/* Bet slip — always visible */}
        <button onClick={() => dispatch({ type: 'TOGGLE_BETSLIP' })}
          style={{ position: 'relative', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', color: '#fff', flexShrink: 0 }}>
          🎟️
          {state.betSlip.length > 0 && (
            <span style={{ position: 'absolute', top: -5, right: -5, background: '#00b050', color: '#fff', borderRadius: '50%', width: 17, height: 17, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {state.betSlip.length}
            </span>
          )}
        </button>

        {/* Desktop auth / user */}
        {user ? (
          <div className="header-desktop-auth">
            <Link href="/account/wallet" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '5px 12px', cursor: 'pointer' }}>
                <div style={{ fontSize: 9, color: '#9aa0b4' }}>Balance</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#00b050' }}>৳{user.balance.toLocaleString()}</div>
              </div>
            </Link>
            <Link href="/account/wallet" style={{ textDecoration: 'none' }}>
              <button style={{ background: '#f5c518', color: '#0a0d18', border: 'none', borderRadius: 8, padding: '7px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>+ Deposit</button>
            </Link>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setUserMenu(!userMenu)}
                style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                <div style={{ width: 26, height: 26, background: '#00b050', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>
                  {user.name[0].toUpperCase()}
                </div>
                <span style={{ fontSize: 12 }}>{user.name.split(' ')[0]}</span>
                <span style={{ fontSize: 9, color: '#9aa0b4' }}>▼</span>
              </button>
              {userMenu && (
                <div className="anim-slideDown" style={{ position: 'absolute', right: 0, top: 'calc(100% + 6px)', background: '#1e2435', border: '1px solid #2e3347', borderRadius: 10, minWidth: 180, zIndex: 200, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid #2e3347', background: '#242938' }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{user.name}</div>
                    <div style={{ fontSize: 11, color: '#9aa0b4' }}>{user.email}</div>
                  </div>
                  {[
                    { href: '/account',        label: '👤 My Account' },
                    { href: '/account/bets',   label: '🎯 My Bets' },
                    { href: '/account/wallet', label: '💳 Wallet' },
                  ].map(item => (
                    <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }} onClick={() => setUserMenu(false)}>
                      <div style={{ padding: '9px 14px', fontSize: 13, color: '#cdd0db', cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#2a3045')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        {item.label}
                      </div>
                    </Link>
                  ))}
                  <button onClick={() => { dispatch({ type: 'LOGOUT' }); setUserMenu(false); }}
                    style={{ width: '100%', padding: '9px 14px', background: 'none', border: 'none', color: '#e63946', cursor: 'pointer', textAlign: 'left', fontSize: 13, borderTop: '1px solid #2e3347' }}>
                    🚪 Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="header-desktop-auth">
            <button onClick={() => dispatch({ type: 'SHOW_AUTH', payload: { mode: 'login' } })}
              style={{ background: 'none', border: '1px solid #2e3347', color: '#fff', borderRadius: 8, padding: '7px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
              Log In
            </button>
            <button onClick={() => dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } })}
              style={{ background: '#00b050', border: 'none', color: '#fff', borderRadius: 8, padding: '7px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              Register
            </button>
          </div>
        )}

        {/* Mobile: compact login OR avatar */}
        <div className="header-mobile-auth" style={{ alignItems: 'center', gap: 6 }}>
          {user ? (
            <Link href="/account" style={{ textDecoration: 'none' }}>
              <div style={{ width: 32, height: 32, background: '#00b050', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>
                {user.name[0].toUpperCase()}
              </div>
            </Link>
          ) : (
            <button onClick={() => dispatch({ type: 'SHOW_AUTH', payload: { mode: 'login' } })}
              style={{ background: '#00b050', border: 'none', color: '#fff', borderRadius: 8, padding: '7px 12px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
              Login
            </button>
          )}
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', padding: '2px 4px', lineHeight: 1 }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="anim-slideDown" style={{ background: '#0f1320', borderTop: '1px solid #2e3347' }}>
          <div style={{ padding: '10px 12px' }}>
            <input placeholder="Search sports, teams…" style={{ width: '100%', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none' }} />
          </div>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              <div style={{ padding: '13px 16px', color: link.live ? '#e63946' : '#cdd0db', fontSize: 15, display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid #2e3347' }}>
                {link.label}
                {link.live && <span style={{ background: '#e63946', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>LIVE</span>}
              </div>
            </Link>
          ))}
          {user && (
            <div style={{ borderTop: '1px solid #2e3347', padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ flex: 1, background: '#242938', borderRadius: 8, padding: '8px 12px' }}>
                <div style={{ fontSize: 10, color: '#9aa0b4' }}>Balance</div>
                <div style={{ fontWeight: 700, color: '#00b050' }}>৳{user.balance.toLocaleString()}</div>
              </div>
              <Link href="/account/wallet" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                <button style={{ background: '#f5c518', color: '#0a0d18', border: 'none', borderRadius: 8, padding: '10px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>+ Deposit</button>
              </Link>
            </div>
          )}
          <div style={{ height: 8 }} />
        </div>
      )}
    </header>
  );
}
