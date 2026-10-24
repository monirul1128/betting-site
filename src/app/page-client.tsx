'use client';
import { Suspense } from 'react';
import { StoreProvider } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BetSlip from '@/components/layout/BetSlip';
import HeroBanner from '@/components/layout/HeroBanner';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import MatchCard from '@/components/sports/MatchCard';
import GameCard from '@/components/casino/GameCard';
import { liveMatches, upcomingMatches, casinoGames, promotions } from '@/data/mockData';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

function HomeContent() {
  const { state, dispatch } = useStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '20px 20px', overflowY: 'auto', paddingRight: state.showBetSlip ? 340 : 20 }}>

          {/* Hero Banner */}
          <HeroBanner />

          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
            {[
              { icon: '🔴', label: 'Live Events', value: '47', color: '#e63946' },
              { icon: '⚽', label: 'Sports', value: '35+', color: '#00b050' },
              { icon: '🎰', label: 'Casino Games', value: '2000+', color: '#6c00b0' },
              { icon: '⚡', label: 'Instant Payout', value: '24/7', color: '#f5c518' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{stat.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: '#9aa0b4' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Matches */}
          <section style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="live-dot" style={{ width: 10, height: 10, background: '#e63946', borderRadius: '50%', display: 'inline-block' }}></span>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Live Now</h2>
                <span style={{ background: '#e63946', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>{liveMatches.length}</span>
              </div>
              <Link href="/live" style={{ textDecoration: 'none', fontSize: 13, color: '#00b050', fontWeight: 600 }}>View All →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
              {liveMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>

          {/* Popular Upcoming */}
          <section style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>🔥</span>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Popular Events</h2>
              </div>
              <Link href="/sports" style={{ textDecoration: 'none', fontSize: 13, color: '#00b050', fontWeight: 600 }}>View All →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
              {upcomingMatches.slice(0, 4).map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>

          {/* Casino section */}
          <section style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>🎰</span>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Casino</h2>
              </div>
              <Link href="/casino" style={{ textDecoration: 'none', fontSize: 13, color: '#00b050', fontWeight: 600 }}>View All →</Link>
            </div>
            {/* Casino tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {[
                { label: '🔥 Popular', active: true },
                { label: '🎥 Live Casino', active: false },
                { label: '🎰 Slots', active: false },
                { label: '✈️ Crash Games', active: false },
              ].map(tab => (
                <button key={tab.label}
                  style={{ padding: '7px 14px', background: tab.active ? '#00b050' : '#242938', border: `1px solid ${tab.active ? '#00b050' : '#2e3347'}`, borderRadius: 20, color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: tab.active ? 600 : 400 }}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {casinoGames.slice(0, 8).map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>

          {/* Promotions */}
          <section style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>🎁</span>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Promotions</h2>
              </div>
              <Link href="/promotions" style={{ textDecoration: 'none', fontSize: 13, color: '#00b050', fontWeight: 600 }}>View All →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {promotions.slice(0, 3).map(promo => (
                <div key={promo.id} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #2e3347' }}>
                  <div style={{ background: `linear-gradient(135deg, ${promo.color.replace('from-', '').replace(' to-', ', ')})`, padding: '20px 20px', minHeight: 80, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ fontSize: 36 }}>{promo.type === 'welcome' ? '🎁' : promo.type === 'freeBet' ? '🆓' : promo.type === 'acca' ? '🚀' : promo.type === 'cashback' ? '💰' : '♻️'}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 2 }}>{promo.title}</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: '#f5c518' }}>{promo.bonus}</div>
                    </div>
                  </div>
                  <div style={{ background: '#1e2435', padding: '14px 20px' }}>
                    <p style={{ fontSize: 13, color: '#9aa0b4', marginBottom: 12, lineHeight: 1.5 }}>{promo.description}</p>
                    <button
                      onClick={() => !state.isLoggedIn && dispatch({ type: 'SHOW_AUTH', payload: { mode: 'register' } })}
                      style={{ background: '#00b050', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', width: '100%' }}>
                      {state.isLoggedIn ? 'Claim Bonus' : 'Register & Claim'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* App Download Banner */}
          <section style={{ marginBottom: 28 }}>
            <div style={{ background: 'linear-gradient(135deg, #0f1320, #1e2435)', border: '1px solid #2e3347', borderRadius: 12, padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: '#00b050', fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>📱 MOBILE APP</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>Download the BetPro App</h3>
                <p style={{ color: '#9aa0b4', fontSize: 14, margin: '0 0 16px', maxWidth: 400 }}>
                  Live scores, real-time odds updates, one-tap login & instant withdrawals. Available for Android & iOS.
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={{ background: '#fff', color: '#0a0d18', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i className="fa fa-android" style={{ fontSize: 16 }}></i> Download APK
                  </button>
                  <button style={{ background: '#242938', color: '#fff', border: '1px solid #2e3347', borderRadius: 8, padding: '10px 20px', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i className="fa fa-apple" style={{ fontSize: 16 }}></i> App Store
                  </button>
                </div>
              </div>
              <div style={{ fontSize: 80, opacity: 0.2 }}>📱</div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ borderTop: '1px solid #2e3347', paddingTop: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 24 }}>
              {[
                { title: 'Sports', links: ['Football', 'Cricket', 'Basketball', 'Tennis', 'Esports'] },
                { title: 'Casino', links: ['Slots', 'Live Casino', 'Crash Games', 'Table Games', 'Virtual Sports'] },
                { title: 'Account', links: ['Register', 'Login', 'My Bets', 'Wallet', 'Promotions'] },
                { title: 'Help', links: ['FAQ', 'Contact Us', 'Responsible Gambling', 'Terms & Conditions', 'Privacy Policy'] },
              ].map(col => (
                <div key={col.title}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: '#fff' }}>{col.title}</div>
                  {col.links.map(link => (
                    <div key={link} style={{ fontSize: 12, color: '#9aa0b4', marginBottom: 6, cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#00b050')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9aa0b4')}>{link}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div style={{ borderTop: '1px solid #2e3347', paddingTop: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#9aa0b4', marginBottom: 10 }}>Payment Methods</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['bKash', 'Nagad', 'Rocket', 'Visa', 'MasterCard', 'Crypto'].map(p => (
                  <div key={p} style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: '#9aa0b4' }}>{p}</div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#9aa0b4' }}>
              <div>© 2026 BetPro. All rights reserved. 18+ only. Gamble responsibly.</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ background: '#e63946', color: '#fff', padding: '4px 8px', borderRadius: 4, fontWeight: 700, fontSize: 11 }}>18+</span>
                <span style={{ background: '#242938', padding: '4px 8px', borderRadius: 4 }}>🔒 SSL Secured</span>
              </div>
            </div>
          </footer>
        </main>
        <BetSlip />
      </div>
      <AuthModal />
      <Notifications />
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <HomeContent />
    </StoreProvider>
  );
}
