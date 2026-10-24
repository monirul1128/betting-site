'use client';
import { CasinoGame } from '@/types';
import { useStore } from '@/store/useStore';

const gameBg: Record<string, string> = {
  roulette:   'linear-gradient(135deg,#1a0a00,#c43000)',
  crazytime:  'linear-gradient(135deg,#0a001a,#6c00b0)',
  sweetbonanza:'linear-gradient(135deg,#1a0028,#d4006c)',
  olympus:    'linear-gradient(135deg,#001428,#0070c0)',
  aviator:    'linear-gradient(135deg,#1a0000,#c40000)',
  baccarat:   'linear-gradient(135deg,#001a0a,#007a38)',
  blackjack:  'linear-gradient(135deg,#0a0a00,#7a7a00)',
  bookofdead: 'linear-gradient(135deg,#1a1000,#8b6000)',
  bigbass:    'linear-gradient(135deg,#00141a,#006070)',
  monopoly:   'linear-gradient(135deg,#0a001a,#4a00c0)',
  mines:      'linear-gradient(135deg,#001a00,#005500)',
  starburst:  'linear-gradient(135deg,#0a0028,#7a00c0)',
};
const typeIcon: Record<string, string> = {
  live:'🎥', slot:'🎰', crash:'✈️', table:'🃏', virtual:'💻',
};

export default function GameCard({ game }: { game: CasinoGame }) {
  const { state, dispatch } = useStore();

  const handlePlay = () => {
    if (!state.isLoggedIn) {
      dispatch({ type: 'SHOW_AUTH', payload: { mode: 'login', action: 'play_game' } });
      return;
    }
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: `Loading ${game.name}…`, type: 'info' } });
  };

  const bg = gameBg[game.thumbnail] || 'linear-gradient(135deg,#1a1f2e,#2a3045)';

  return (
    <div
      style={{ borderRadius: 10, overflow: 'hidden', cursor: 'pointer', background: bg, transition: 'transform .2s' }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
      onClick={handlePlay}
    >
      {/* Visual area */}
      <div style={{ paddingTop: '70%', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 36, opacity: .55 }}>{typeIcon[game.type] || '🎮'}</span>
        </div>

        {/* Badges */}
        <div style={{ position: 'absolute', top: 6, left: 6, display: 'flex', gap: 4 }}>
          {game.isHot && <span style={{ background: '#e63946', color: '#fff', fontSize: 9, padding: '2px 5px', borderRadius: 4, fontWeight: 700 }}>HOT</span>}
          {game.isNew && <span style={{ background: '#f5c518', color: '#0a0d18', fontSize: 9, padding: '2px 5px', borderRadius: 4, fontWeight: 700 }}>NEW</span>}
        </div>

        {/* Player count */}
        {game.playerCount && (
          <div style={{ position: 'absolute', bottom: 5, left: 6, fontSize: 10, color: 'rgba(255,255,255,.75)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 5, height: 5, background: '#00b050', borderRadius: '50%', display: 'inline-block' }} />
            {game.playerCount.toLocaleString()}
          </div>
        )}

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0, transition: 'opacity .2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
        >
          <div style={{ background: '#00b050', color: '#fff', padding: '7px 16px', borderRadius: 20, fontWeight: 700, fontSize: 13 }}>
            {state.isLoggedIn ? 'Play' : '🔒 Login'}
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '8px 10px', background: '#1e2435' }}>
        <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: '#9aa0b4' }}>{game.provider}</span>
          {game.rtp && <span style={{ fontSize: 10, color: '#9aa0b4' }}>{game.rtp}%</span>}
        </div>
      </div>
    </div>
  );
}
