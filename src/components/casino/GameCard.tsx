'use client';
import { CasinoGame } from '@/types';
import { useStore } from '@/store/useStore';

const gameColors: Record<string, string> = {
  roulette: 'linear-gradient(135deg, #1a0a00, #c43000)',
  crazytime: 'linear-gradient(135deg, #0a001a, #6c00b0)',
  sweetbonanza: 'linear-gradient(135deg, #1a0028, #d4006c)',
  olympus: 'linear-gradient(135deg, #001428, #0070c0)',
  aviator: 'linear-gradient(135deg, #1a0000, #c40000)',
  baccarat: 'linear-gradient(135deg, #001a0a, #007a38)',
  blackjack: 'linear-gradient(135deg, #0a0a00, #7a7a00)',
  bookofdead: 'linear-gradient(135deg, #1a1000, #8b6000)',
  bigbass: 'linear-gradient(135deg, #00141a, #006070)',
  monopoly: 'linear-gradient(135deg, #0a001a, #4a00c0)',
  mines: 'linear-gradient(135deg, #001a00, #005500)',
  starburst: 'linear-gradient(135deg, #0a0028, #7a00c0)',
};

const typeIcons: Record<string, string> = {
  live: '🎥',
  slot: '🎰',
  crash: '✈️',
  table: '🃏',
  virtual: '💻',
};

interface Props {
  game: CasinoGame;
  size?: 'small' | 'normal';
}

export default function GameCard({ game, size = 'normal' }: Props) {
  const { state, dispatch } = useStore();

  const handlePlay = () => {
    if (!state.isLoggedIn) {
      dispatch({ type: 'SHOW_AUTH', payload: { mode: 'login', action: 'play_game' } });
      return;
    }
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: `Loading ${game.name}...`, type: 'info' } });
  };

  const bg = gameColors[game.thumbnail] || 'linear-gradient(135deg, #1a1f2e, #2a3045)';

  return (
    <div
      style={{ borderRadius: 10, overflow: 'hidden', position: 'relative', cursor: 'pointer', transition: 'transform 0.2s', background: bg }}
      onMouseEnter={e => { (e.currentTarget.style.transform = 'translateY(-3px)'); e.currentTarget.querySelector('.play-overlay')!.setAttribute('style', 'opacity:1'); }}
      onMouseLeave={e => { (e.currentTarget.style.transform = 'translateY(0)'); e.currentTarget.querySelector('.play-overlay')!.setAttribute('style', 'opacity:0'); }}
      onClick={handlePlay}>

      {/* Game visual placeholder */}
      <div style={{ height: size === 'small' ? 100 : 140, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ fontSize: size === 'small' ? 36 : 50, opacity: 0.6 }}>{typeIcons[game.type] || '🎮'}</div>
        <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
          {game.playerCount && (
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ width: 6, height: 6, background: '#00b050', borderRadius: '50%', display: 'inline-block' }}></span>
              {game.playerCount.toLocaleString()} playing
            </div>
          )}
        </div>

        {/* Badges */}
        <div style={{ position: 'absolute', top: 6, left: 6, display: 'flex', gap: 4 }}>
          {game.isHot && <span style={{ background: '#e63946', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>HOT</span>}
          {game.isNew && <span style={{ background: '#f5c518', color: '#0a0d18', fontSize: 9, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>NEW</span>}
        </div>

        {/* Play overlay */}
        <div className="play-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }}>
          <div style={{ background: '#00b050', color: '#fff', padding: '8px 20px', borderRadius: 20, fontWeight: 700, fontSize: 13 }}>
            {state.isLoggedIn ? 'Play Now' : '🔒 Log In'}
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: size === 'small' ? '6px 8px' : '10px 12px', background: '#1e2435' }}>
        <div style={{ fontWeight: 600, fontSize: size === 'small' ? 12 : 13, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#9aa0b4' }}>{game.provider}</span>
          {game.rtp && <span style={{ fontSize: 10, color: '#9aa0b4' }}>RTP {game.rtp}%</span>}
        </div>
      </div>
    </div>
  );
}
