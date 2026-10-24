import { Match, CasinoGame, Promotion, Sport } from '@/types';

export const sports: Sport[] = [
  { id: 'football', name: 'Football', icon: 'fa-futbol', count: 342, isPopular: true },
  { id: 'cricket', name: 'Cricket', icon: 'fa-cricket-bat-ball', count: 28, isPopular: true },
  { id: 'basketball', name: 'Basketball', icon: 'fa-basketball', count: 87, isPopular: true },
  { id: 'tennis', name: 'Tennis', icon: 'fa-baseball', count: 64 },
  { id: 'baseball', name: 'Baseball', icon: 'fa-baseball', count: 22 },
  { id: 'americanfootball', name: 'American Football', icon: 'fa-football', count: 18 },
  { id: 'boxing', name: 'Boxing', icon: 'fa-boxing-glove', count: 6 },
  { id: 'mma', name: 'MMA', icon: 'fa-fist-raised', count: 8 },
  { id: 'volleyball', name: 'Volleyball', icon: 'fa-volleyball', count: 31 },
  { id: 'rugby', name: 'Rugby', icon: 'fa-football', count: 14 },
  { id: 'golf', name: 'Golf', icon: 'fa-golf-ball-tee', count: 5 },
  { id: 'esports', name: 'Esports', icon: 'fa-gamepad', count: 43 },
];

export const liveMatches: Match[] = [
  {
    id: 'l1',
    sportId: 'football',
    sportName: 'Football',
    leagueName: 'Premier League',
    homeTeam: { id: 'mci', name: 'Manchester City', shortName: 'MCI', score: 2 },
    awayTeam: { id: 'ars', name: 'Arsenal', shortName: 'ARS', score: 1 },
    startTime: new Date().toISOString(),
    status: 'live',
    minute: 67,
    streamAvailable: true,
    markets: [
      {
        id: 'm1', name: 'Match Winner', type: '1x2',
        selections: [
          { id: 's1', name: 'Man City', odds: 1.45, previousOdds: 1.52, isActive: true },
          { id: 's2', name: 'Draw', odds: 4.20, previousOdds: 4.10, isActive: true },
          { id: 's3', name: 'Arsenal', odds: 7.50, previousOdds: 6.80, isActive: true },
        ]
      }
    ]
  },
  {
    id: 'l2',
    sportId: 'cricket',
    sportName: 'Cricket',
    leagueName: 'ICC T20 World Cup',
    homeTeam: { id: 'ind', name: 'India', shortName: 'IND', score: 189 },
    awayTeam: { id: 'pak', name: 'Pakistan', shortName: 'PAK', score: 143 },
    startTime: new Date().toISOString(),
    status: 'live',
    minute: 18,
    streamAvailable: true,
    markets: [
      {
        id: 'm2', name: 'Match Winner', type: '1x2',
        selections: [
          { id: 's4', name: 'India', odds: 1.28, previousOdds: 1.35, isActive: true },
          { id: 's5', name: 'Pakistan', odds: 3.75, previousOdds: 3.20, isActive: true },
        ]
      }
    ]
  },
  {
    id: 'l3',
    sportId: 'basketball',
    sportName: 'Basketball',
    leagueName: 'NBA',
    homeTeam: { id: 'lal', name: 'LA Lakers', shortName: 'LAL', score: 87 },
    awayTeam: { id: 'gsw', name: 'Golden State Warriors', shortName: 'GSW', score: 92 },
    startTime: new Date().toISOString(),
    status: 'live',
    minute: 34,
    markets: [
      {
        id: 'm3', name: 'Match Winner', type: '1x2',
        selections: [
          { id: 's6', name: 'LA Lakers', odds: 2.10, previousOdds: 1.95, isActive: true },
          { id: 's7', name: 'Golden State', odds: 1.75, previousOdds: 1.85, isActive: true },
        ]
      }
    ]
  },
  {
    id: 'l4',
    sportId: 'football',
    sportName: 'Football',
    leagueName: 'La Liga',
    homeTeam: { id: 'bar', name: 'Barcelona', shortName: 'BAR', score: 1 },
    awayTeam: { id: 'rm', name: 'Real Madrid', shortName: 'RM', score: 1 },
    startTime: new Date().toISOString(),
    status: 'live',
    minute: 82,
    streamAvailable: true,
    markets: [
      {
        id: 'm4', name: 'Match Winner', type: '1x2',
        selections: [
          { id: 's8', name: 'Barcelona', odds: 2.60, previousOdds: 2.80, isActive: true },
          { id: 's9', name: 'Draw', odds: 3.40, previousOdds: 3.20, isActive: true },
          { id: 's10', name: 'Real Madrid', odds: 2.85, previousOdds: 2.70, isActive: true },
        ]
      }
    ]
  },
];

export const upcomingMatches: Match[] = [
  {
    id: 'u1',
    sportId: 'football',
    sportName: 'Football',
    leagueName: 'Premier League',
    homeTeam: { id: 'liv', name: 'Liverpool', shortName: 'LIV' },
    awayTeam: { id: 'che', name: 'Chelsea', shortName: 'CHE' },
    startTime: new Date(Date.now() + 3600000).toISOString(),
    status: 'upcoming',
    popular: true,
    markets: [
      {
        id: 'm5', name: 'Match Winner', type: '1x2',
        selections: [
          { id: 's11', name: 'Liverpool', odds: 1.85, isActive: true },
          { id: 's12', name: 'Draw', odds: 3.60, isActive: true },
          { id: 's13', name: 'Chelsea', odds: 4.20, isActive: true },
        ]
      },
      {
        id: 'm6', name: 'Over/Under 2.5', type: 'over_under',
        selections: [
          { id: 's14', name: 'Over 2.5', odds: 1.90, isActive: true },
          { id: 's15', name: 'Under 2.5', odds: 1.95, isActive: true },
        ]
      }
    ]
  },
  {
    id: 'u2',
    sportId: 'cricket',
    sportName: 'Cricket',
    leagueName: 'Bangladesh Premier League',
    homeTeam: { id: 'dha', name: 'Dhaka Dominators', shortName: 'DD' },
    awayTeam: { id: 'chi', name: 'Chattogram Challengers', shortName: 'CC' },
    startTime: new Date(Date.now() + 7200000).toISOString(),
    status: 'upcoming',
    popular: true,
    markets: [
      {
        id: 'm7', name: 'Match Winner', type: '1x2',
        selections: [
          { id: 's16', name: 'Dhaka', odds: 1.75, isActive: true },
          { id: 's17', name: 'Chattogram', odds: 2.10, isActive: true },
        ]
      }
    ]
  },
  {
    id: 'u3',
    sportId: 'football',
    sportName: 'Football',
    leagueName: 'Champions League',
    homeTeam: { id: 'psg', name: 'PSG', shortName: 'PSG' },
    awayTeam: { id: 'byv', name: 'Bayern Munich', shortName: 'BAY' },
    startTime: new Date(Date.now() + 10800000).toISOString(),
    status: 'upcoming',
    markets: [
      {
        id: 'm8', name: 'Match Winner', type: '1x2',
        selections: [
          { id: 's18', name: 'PSG', odds: 2.30, isActive: true },
          { id: 's19', name: 'Draw', odds: 3.40, isActive: true },
          { id: 's20', name: 'Bayern Munich', odds: 2.70, isActive: true },
        ]
      }
    ]
  },
  {
    id: 'u4',
    sportId: 'tennis',
    sportName: 'Tennis',
    leagueName: 'ATP Masters',
    homeTeam: { id: 'djk', name: 'Djokovic', shortName: 'DJK' },
    awayTeam: { id: 'alc', name: 'Alcaraz', shortName: 'ALC' },
    startTime: new Date(Date.now() + 14400000).toISOString(),
    status: 'upcoming',
    markets: [
      {
        id: 'm9', name: 'Match Winner', type: '1x2',
        selections: [
          { id: 's21', name: 'Djokovic', odds: 1.65, isActive: true },
          { id: 's22', name: 'Alcaraz', odds: 2.25, isActive: true },
        ]
      }
    ]
  },
  {
    id: 'u5',
    sportId: 'basketball',
    sportName: 'Basketball',
    leagueName: 'NBA',
    homeTeam: { id: 'bos', name: 'Boston Celtics', shortName: 'BOS' },
    awayTeam: { id: 'mia', name: 'Miami Heat', shortName: 'MIA' },
    startTime: new Date(Date.now() + 18000000).toISOString(),
    status: 'upcoming',
    markets: [
      {
        id: 'm10', name: 'Match Winner', type: '1x2',
        selections: [
          { id: 's23', name: 'Boston', odds: 1.55, isActive: true },
          { id: 's24', name: 'Miami', odds: 2.50, isActive: true },
        ]
      }
    ]
  },
  {
    id: 'u6',
    sportId: 'football',
    sportName: 'Football',
    leagueName: 'Serie A',
    homeTeam: { id: 'juv', name: 'Juventus', shortName: 'JUV' },
    awayTeam: { id: 'acm', name: 'AC Milan', shortName: 'ACM' },
    startTime: new Date(Date.now() + 21600000).toISOString(),
    status: 'upcoming',
    markets: [
      {
        id: 'm11', name: 'Match Winner', type: '1x2',
        selections: [
          { id: 's25', name: 'Juventus', odds: 2.05, isActive: true },
          { id: 's26', name: 'Draw', odds: 3.20, isActive: true },
          { id: 's27', name: 'AC Milan', odds: 3.60, isActive: true },
        ]
      }
    ]
  },
];

export const casinoGames: CasinoGame[] = [
  { id: 'g1', name: 'Lightning Roulette', provider: 'Evolution', type: 'live', thumbnail: 'roulette', rtp: 97.3, minBet: 0.20, isHot: true, playerCount: 342 },
  { id: 'g2', name: 'Crazy Time', provider: 'Evolution', type: 'live', thumbnail: 'crazytime', rtp: 96.08, minBet: 0.10, isHot: true, playerCount: 1205 },
  { id: 'g3', name: 'Sweet Bonanza', provider: 'Pragmatic Play', type: 'slot', thumbnail: 'sweetbonanza', rtp: 96.51, minBet: 0.20, isNew: false, playerCount: 89 },
  { id: 'g4', name: 'Gates of Olympus', provider: 'Pragmatic Play', type: 'slot', thumbnail: 'olympus', rtp: 96.5, minBet: 0.20, isHot: true, playerCount: 234 },
  { id: 'g5', name: 'Aviator', provider: 'Spribe', type: 'crash', thumbnail: 'aviator', rtp: 97.0, minBet: 0.10, isHot: true, playerCount: 891 },
  { id: 'g6', name: 'Speed Baccarat', provider: 'Evolution', type: 'live', thumbnail: 'baccarat', rtp: 98.76, minBet: 1.00, playerCount: 156 },
  { id: 'g7', name: 'Blackjack VIP', provider: 'Evolution', type: 'live', thumbnail: 'blackjack', rtp: 99.29, minBet: 5.00, playerCount: 45 },
  { id: 'g8', name: 'Book of Dead', provider: 'Play\'n GO', type: 'slot', thumbnail: 'bookofdead', rtp: 96.21, minBet: 0.10 },
  { id: 'g9', name: 'Big Bass Splash', provider: 'Pragmatic Play', type: 'slot', thumbnail: 'bigbass', rtp: 96.71, minBet: 0.10, isNew: true },
  { id: 'g10', name: 'Monopoly Live', provider: 'Evolution', type: 'live', thumbnail: 'monopoly', rtp: 96.23, minBet: 0.10, playerCount: 287 },
  { id: 'g11', name: 'Mines', provider: 'Spribe', type: 'crash', thumbnail: 'mines', rtp: 97.0, minBet: 0.10, playerCount: 445 },
  { id: 'g12', name: 'Starburst', provider: 'NetEnt', type: 'slot', thumbnail: 'starburst', rtp: 96.09, minBet: 0.10 },
];

export const promotions: Promotion[] = [
  {
    id: 'p1',
    title: 'Welcome Bonus',
    description: 'Get 100% bonus on your first deposit up to ৳10,000',
    bonus: '100% up to ৳10,000',
    type: 'welcome',
    terms: 'Min deposit ৳500. 5x rollover required. Valid for 30 days.',
    image: 'welcome',
    color: 'from-green-600 to-green-800',
    expiresAt: new Date(Date.now() + 30 * 24 * 3600000).toISOString(),
  },
  {
    id: 'p2',
    title: 'Free Bet Friday',
    description: 'Place 3 bets and get a ৳500 free bet every Friday',
    bonus: '৳500 Free Bet',
    type: 'freeBet',
    terms: 'Min bet ৳200 each. Free bet credited by Saturday. Single bets only.',
    image: 'freebet',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'p3',
    title: 'Acca Boost',
    description: 'Boost your accumulator winnings by up to 70%',
    bonus: 'Up to 70% Boost',
    type: 'acca',
    terms: 'Min 4 selections. Min odds 1.20 per selection. Boosts on winnings only.',
    image: 'acca',
    color: 'from-yellow-600 to-orange-700',
  },
  {
    id: 'p4',
    title: 'Casino Cashback',
    description: 'Get 10% cashback on casino losses every week',
    bonus: '10% Weekly Cashback',
    type: 'cashback',
    terms: 'Max cashback ৳5,000. Credited every Monday. Slots and live casino only.',
    image: 'cashback',
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 'p5',
    title: 'Reload Bonus',
    description: 'Get 50% bonus on every deposit on weekends',
    bonus: '50% up to ৳5,000',
    type: 'reload',
    terms: 'Min deposit ৳500. 3x rollover. Saturday & Sunday only.',
    image: 'reload',
    color: 'from-red-600 to-red-800',
  },
];
