'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';

const tabs = [
  { href: '/',           label: 'Home',   icon: '🏠' },
  { href: '/sports',     label: 'Sports', icon: '⚽' },
  { href: '/live',       label: 'Live',   icon: '🔴', live: true },
  { href: '/casino',     label: 'Casino', icon: '🎰' },
  { href: '/account',    label: 'Account',icon: '👤' },
];

export default function BottomNav() {
  const { state, dispatch } = useStore();
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        const active = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
        return (
          <Link key={tab.href} href={tab.href} style={{ textDecoration: 'none', flex: 1 }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '8px 0 6px', gap: 3,
              color: active ? '#00b050' : '#9aa0b4',
              borderTop: active ? '2px solid #00b050' : '2px solid transparent',
            }}>
              <span style={{ fontSize: 19, lineHeight: 1, position: 'relative' }}>
                {tab.icon}
                {tab.live && (
                  <span className="live-dot" style={{
                    position: 'absolute', top: 0, right: -4,
                    width: 7, height: 7, background: '#e63946',
                    borderRadius: '50%', display: 'inline-block',
                  }} />
                )}
              </span>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 400 }}>{tab.label}</span>
            </div>
          </Link>
        );
      })}

      {/* Bet slip tab */}
      <button onClick={() => dispatch({ type: 'TOGGLE_BETSLIP' })}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '8px 0 6px', gap: 3,
          background: 'none', border: 'none', cursor: 'pointer',
          color: state.betSlip.length > 0 ? '#00b050' : '#9aa0b4',
          borderTop: state.betSlip.length > 0 ? '2px solid #00b050' : '2px solid transparent',
        }}>
        <span style={{ fontSize: 19, lineHeight: 1, position: 'relative' }}>
          🎟️
          {state.betSlip.length > 0 && (
            <span style={{
              position: 'absolute', top: -4, right: -6,
              background: '#00b050', color: '#fff', borderRadius: '50%',
              width: 15, height: 15, fontSize: 9, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {state.betSlip.length}
            </span>
          )}
        </span>
        <span style={{ fontSize: 10, fontWeight: 400 }}>Bets</span>
      </button>
    </nav>
  );
}
