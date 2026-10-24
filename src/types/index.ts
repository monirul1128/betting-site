export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  bonusBalance: number;
  currency: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Sport {
  id: string;
  name: string;
  icon: string;
  count: number;
  isPopular?: boolean;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  score?: number;
}

export interface Match {
  id: string;
  sportId: string;
  sportName: string;
  leagueName: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: string;
  status: 'upcoming' | 'live' | 'finished';
  minute?: number;
  markets: Market[];
  streamAvailable?: boolean;
  popular?: boolean;
}

export interface Market {
  id: string;
  name: string;
  type: '1x2' | 'over_under' | 'handicap' | 'both_teams_score' | 'dnb' | 'custom';
  selections: Selection[];
}

export interface Selection {
  id: string;
  name: string;
  odds: number;
  previousOdds?: number;
  isActive: boolean;
}

export interface BetSlipItem {
  matchId: string;
  matchName: string;
  marketName: string;
  selectionId: string;
  selectionName: string;
  odds: number;
  sportName: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'finished';
}

export interface PlacedBet {
  id: string;
  items: BetSlipItem[];
  stake: number;
  potentialWin: number;
  type: 'single' | 'accumulator';
  status: 'open' | 'won' | 'lost' | 'cashout' | 'void';
  placedAt: string;
  settledAt?: string;
  cashoutValue?: number;
}

export interface CasinoGame {
  id: string;
  name: string;
  provider: string;
  type: 'slot' | 'live' | 'crash' | 'table' | 'virtual';
  thumbnail: string;
  rtp?: number;
  minBet?: number;
  isHot?: boolean;
  isNew?: boolean;
  playerCount?: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  bonus: string;
  type: 'welcome' | 'reload' | 'cashback' | 'freeBet' | 'acca';
  terms: string;
  expiresAt?: string;
  image: string;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'bet' | 'win' | 'bonus' | 'cashout';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method?: string;
  reference?: string;
  createdAt: string;
}
