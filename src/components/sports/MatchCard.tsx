'use client';
import { useState, useEffect } from 'react';
import { Match, BetSlipItem } from '@/types';
import { useStore } from '@/store/useStore';

interface Props {
  match: Match;
  compact?: boolean;
}

function getCountdown(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  if (diff <= 0) return 'Starting soon';
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (hours > 24)
    return (
      date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) +
      ' ' +
      date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    );
  if (hours > 0) return `Today ${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
  return `In ${mins}m`;
}

export default function MatchCard({ match, compact }: Props) {
  const { state, dispatch } = useStore();
  // Start with null to avoid SSR/client mismatch — populate only after mount
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    if (match.status !== 'upcoming') return;
    setCountdown(getCountdown(match.startTime));
    const t = setInterval(() => setCountdown(getCountdown(match.startTime)), 30000);
    return () => clearInterval(t);
  }, [match.startTime, match.status]);

  const isSelected = (selectionId: string) =>
    state.betSlip.some(b => b.selectionId === selectionId);

  const handleOddsClick = (
    selectionId: string,
    selectionName: string,
    odds: number,
    marketName: string,
  ) => {
    const item: BetSlipItem = {
      matchId: match.id,
      matchName: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      marketName,
      selectionId,
      selectionName,
      odds,
      sportName: match.sportName,
      startTime: match.startTime,
      status: match.status,
    };
    dispatch({ type: 'ADD_TO_BETSLIP', payload: item });
  };

  const mainMarket = match.markets[0];
  const overUnderMarket = match.markets.find(m => m.type === 'over_under');

  return (
    <div
      style={{
        background: '#1e2435',
        border: '1px solid #2e3347',
        borderRadius: 10,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#3a4060')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#2e3347')}
    >
      {/* Match header */}
      <div
        style={{
          padding: compact ? '8px 12px' : '10px 14px',
          background: '#242938',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {match.status === 'live' && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                color: '#e63946',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              <span
                className="live-dot"
                style={{
                  width: 7,
                  height: 7,
                  background: '#e63946',
                  borderRadius: '50%',
                  display: 'inline-block',
                }}
              />
              LIVE {match.minute ? `${match.minute}'` : ''}
            </span>
          )}
          <span style={{ fontSize: 11, color: '#9aa0b4' }}>{match.leagueName}</span>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* countdown only renders after hydration to avoid mismatch */}
          {match.status === 'upcoming' && countdown !== null && (
            <span style={{ fontSize: 11, color: '#9aa0b4' }}>{countdown}</span>
          )}
          {match.streamAvailable && (
            <span
              style={{
                fontSize: 10,
                background: '#1a3a1a',
                color: '#00b050',
                padding: '2px 6px',
                borderRadius: 4,
                fontWeight: 600,
              }}
            >
              ▶ STREAM
            </span>
          )}
          <span style={{ fontSize: 11, color: '#9aa0b4' }}>
            {mainMarket?.selections.length > 2
              ? `+${match.markets.length * 3} markets`
              : `${match.markets.length} markets`}
          </span>
        </div>
      </div>

      {/* Teams & scores */}
      <div style={{ padding: compact ? '10px 12px' : '12px 14px' }}>
        <div style={{ marginBottom: 10 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <span style={{ fontWeight: 600, fontSize: compact ? 13 : 14 }}>
              {match.homeTeam.name}
            </span>
            {match.status === 'live' && (
              <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', minWidth: 24, textAlign: 'center' }}>
                {match.homeTeam.score ?? 0}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: compact ? 13 : 14 }}>
              {match.awayTeam.name}
            </span>
            {match.status === 'live' && (
              <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', minWidth: 24, textAlign: 'center' }}>
                {match.awayTeam.score ?? 0}
              </span>
            )}
          </div>
        </div>

        {/* Odds */}
        {mainMarket && (
          <div>
            <div
              style={{
                fontSize: 11,
                color: '#9aa0b4',
                marginBottom: 6,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{mainMarket.name}</span>
              {mainMarket.selections.length === 3 && (
                <div style={{ display: 'flex', gap: 4, fontSize: 10, color: '#9aa0b4' }}>
                  <span style={{ minWidth: 60, textAlign: 'center' }}>1</span>
                  <span style={{ minWidth: 60, textAlign: 'center' }}>X</span>
                  <span style={{ minWidth: 60, textAlign: 'center' }}>2</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              {mainMarket.selections.map(sel => (
                <button
                  key={sel.id}
                  onClick={() => handleOddsClick(sel.id, sel.name, sel.odds, mainMarket.name)}
                  className={[
                    'odds-btn',
                    isSelected(sel.id) ? 'selected' : '',
                    sel.previousOdds && sel.odds > sel.previousOdds ? 'increased' : '',
                    sel.previousOdds && sel.odds < sel.previousOdds ? 'decreased' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: isSelected(sel.id) ? 'rgba(255,255,255,0.8)' : '#9aa0b4',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {sel.name}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>
                    {sel.previousOdds && sel.odds !== sel.previousOdds && (
                      <span style={{ fontSize: 9, marginRight: 2 }}>
                        {sel.odds > sel.previousOdds ? '▲' : '▼'}
                      </span>
                    )}
                    {sel.odds.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>

            {/* Over/Under row */}
            {overUnderMarket && !compact && (
              <div style={{ marginTop: 8, display: 'flex', gap: 6, alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: 11,
                    color: '#9aa0b4',
                    whiteSpace: 'nowrap',
                    marginRight: 4,
                  }}
                >
                  O/U 2.5
                </span>
                {overUnderMarket.selections.map(sel => (
                  <button
                    key={sel.id}
                    onClick={() => handleOddsClick(sel.id, sel.name, sel.odds, overUnderMarket.name)}
                    className={['odds-btn', isSelected(sel.id) ? 'selected' : ''].filter(Boolean).join(' ')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '5px 10px',
                    }}
                  >
                    <span style={{ fontSize: 11, color: isSelected(sel.id) ? 'rgba(255,255,255,0.8)' : '#9aa0b4' }}>
                      {sel.name}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{sel.odds.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
