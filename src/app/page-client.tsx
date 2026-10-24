'use client';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BetSlip from '@/components/layout/BetSlip';
import BottomNav from '@/components/layout/BottomNav';
import HeroBanner from '@/components/layout/HeroBanner';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import MatchCard from '@/components/sports/MatchCard';
import GameCard from '@/components/casino/GameCard';
import { liveMatches, upcomingMatches, casinoGames, promotions } from '@/data/mockData';
import Link from 'next/link';

function HomeContent() {
  const { state, dispatch } = useStore();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main className="page-main" style={{ paddingRight: state.showBetSlip ? 320 : 0 }}>
          <div style={{ padding: '14px 12px', maxWidth: 1200, margin: '0 auto' }}>

            <HeroBanner />

            {/* Stats */}
            <div className="grid-stats" style={{ marginBottom: 20 }}>
              {[
                { icon: '🔴', label: 'Live Events', value: '47',    color: '#e63946' },
                { icon: '⚽', label: 'Sports',      value: '35+',   color: '#00b050' },
                { icon: '🎰', label: 'Games',       value: '2000+', color: '#6c00b0' },
                { icon: '⚡', label: 'Payouts',     value: '24/7',  color: '#f5c518' },
              ].map(s => (
                <div key={s.label} style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: '#9aa0b4' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live */}
            <section style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="live-dot" style={{ width: 9, height: 9, background: '#e63946', borderRadius: '50%', display: 'inline-block' }} />
                  <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Live Now</h2>
                  <span style={{ background: '#e63946', color: '#fff', fontSize: 10, padding: '2px 7px', borderRadius: 10, fontWeight: 700 }}>{liveMatches.length}</span>
                </div>
                <Link href="/live" style={{ textDecoration: 'none', fontSize: 13, color: '#00b050', fontWeight: 600 }}>View All →</Link>
              </div>
              <div className="grid-matches">
                {liveMatches.map(m => <MatchCard key={m.id} match={m} />)}
              </div>
            </section>

            {/* Popular */}
            <section style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>🔥 Popular Events</h2>
                <Link href="/sports" style={{ textDecoration: 'none', fontSize: 13, color: '#00b050', fontWeight: 600 }}>View All →</Link>
              </div>
              <div className="grid-matches">
                {upcomingMatches.slice(0, 4).map(m => <MatchCard key={m.id} match={m} />)}
              </div>
            </section>

            {/* Casino */}
            <section style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>🎰 Casino</h2>
                <Link href="/casino" style={{ textDecoration: 'none', fontSize: 13, color: '#00b050', fontWeight: 600 }}>View All →</Link>
              </div>
              <div className="grid-games">
                {casinoGames.slice(0, 8).map(g => <GameCard key={g.id} game={g} />)}
              </div>
            </section>

            {/* Promos */}
            <section style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>🎁 Promotions</h2>
                <Link href="/promotions" style={{ textDecoration: 'none', fontSize: 13, color: '#00b050', fontWeight: 600 }}>View All →</Link>
              </div>
              <div className="grid-promos">
                {promotions.slice(0, 3).map(promo => (
                  <div key={promo.id} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #2e3347' }}>
                    <div style={{
                      background: promo.type === 'welcome' ? 'linear-gradient(135deg,#003d1a,#00b050)'
                        : promo.type === 'freeBet' ? 'linear-gradient(135deg,#001428,#0070c0)'
                        : promo.type === 'acca' ? 'linear-gradient(135deg,#1a0a00,#c47a00)'
                        : 'linear-gradient(135deg,#0d0028,#6c00b0)',
                      padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                      <span style={{ fontSize: 32 }}>{promo.type === 'welcome' ? '🎁' : promo.type === 'freeBet' ? '🆓' : promo.type === 'acca' ? '🚀' : '💰'}</span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 15 }}>{promo.title}</div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: '#f5c518' }}>{promo.bonus}</div>
                      </div>
                    </div>
                    <div style={{ background: '#1e2435', padding: '12px 16px' }}>
                      <p style={{ fontSize: 13, color: '#9aa0b4', marginBottom: 10, lineHeight: 1.5 }}>{promo.description}</p>
                      <button onClick={() => !state.isLoggedIn && dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } })}
                        style={{ width: '100%', background: '#00b050', color: '#fff', border: 'none', borderRadius: 8, padding: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                        {state.isLoggedIn ? 'Claim Bonus' : 'Register & Claim'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* App download */}
            <section style={{ marginBottom: 24 }}>
              <div className="app-banner" style={{ background: 'linear-gradient(135deg,#0f1320,#1e2435)', border: '1px solid #2e3347', borderRadius: 12, padding: '20px 18px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: '#00b050', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>📱 MOBILE APP</div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px' }}>Download BetPro App</h3>
                  <p style={{ color: '#9aa0b4', fontSize: 13, margin: '0 0 14px', lineHeight: 1.5 }}>Live scores, real-time odds, one-tap login & instant withdrawals.</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ flex: 1, background: '#fff', color: '#0a0d18', border: 'none', borderRadius: 8, padding: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>🤖 Android APK</button>
                    <button style={{ flex: 1, background: '#242938', color: '#fff', border: '1px solid #2e3347', borderRadius: 8, padding: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>🍎 App Store</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid #2e3347', paddingTop: 20 }}>
              <div className="grid-footer" style={{ marginBottom: 20 }}>
                {[
                  { title: 'Sports',  links: ['Football','Cricket','Basketball','Tennis'] },
                  { title: 'Casino',  links: ['Slots','Live Casino','Crash Games','Table'] },
                  { title: 'Account', links: ['Register','Login','My Bets','Wallet'] },
                  { title: 'Help',    links: ['FAQ','Contact','Responsible Gambling','Terms'] },
                ].map(col => (
                  <div key={col.title}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>{col.title}</div>
                    {col.links.map(l => <div key={l} style={{ fontSize: 12, color: '#9aa0b4', marginBottom: 5, cursor: 'pointer' }}>{l}</div>)}
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #2e3347', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['bKash','Nagad','Rocket','Visa','Crypto'].map(p => (
                    <div key={p} style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 6, padding: '5px 10px', fontSize: 11, color: '#9aa0b4' }}>{p}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: '#9aa0b4' }}>
                  <span style={{ background: '#e63946', color: '#fff', padding: '3px 7px', borderRadius: 4, fontWeight: 700 }}>18+</span>
                  <span>© 2026 BetPro</span>
                </div>
              </div>
            </footer>
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

export default function Home() {
  return <StoreProvider><HomeContent /></StoreProvider>;
}
