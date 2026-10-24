# ⚡ BetPro — Sports Betting & Live Casino Platform

A full-featured betting platform built with **Next.js 14**, inspired by Bet365 and jeta7vip.

## 🚀 Features

- **Sports Betting** — Football, Cricket, Basketball, Tennis + 30 more sports
- **Live Betting** — Real-time odds updates, live scores, cash out
- **Live Casino** — Roulette, Baccarat, Blackjack, Crash games
- **Bet Slip** — Single & accumulator bets, quick stakes, cash out
- **Wallet** — Deposit/Withdraw via bKash, Nagad, Rocket, Visa, Crypto
- **Promotions** — Welcome bonus, free bet, acca boost, cashback
- **My Bets** — Open bets, settled bets, cash out management
- **Admin Panel** — Users, matches, odds manager, transaction approval
- **Auth Gate** — Browse freely; login only required to place bets or access wallet
- **Fully Responsive** — Mobile-first design

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS |
| State | React Context + useReducer |
| Icons | Font Awesome 6 CDN |
| Fonts | Inter (Google Fonts) |
| Deploy | Vercel |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── (main)/
│   │   ├── sports/           # Sports betting page
│   │   ├── live/             # Live betting page
│   │   ├── casino/           # Casino games page
│   │   ├── promotions/       # Bonuses & offers
│   │   └── account/          # User account, wallet, bets
│   └── admin/                # Admin dashboard
├── components/
│   ├── layout/               # Header, Sidebar, BetSlip, HeroBanner
│   ├── sports/               # MatchCard
│   ├── casino/               # GameCard
│   ├── auth/                 # AuthModal (login/register)
│   └── ui/                   # Notifications
├── store/                    # Global state (useStore)
├── data/                     # Mock data (matches, games, promos)
├── types/                    # TypeScript interfaces
└── lib/                      # Utility functions
```

## ⚙️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Click **Deploy** — done in ~2 minutes!

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Homepage — live matches, casino, promotions |
| `/sports` | All sports with filters |
| `/live` | Live betting with real-time odds |
| `/casino` | Casino games grid |
| `/promotions` | Bonuses & offers |
| `/account` | User profile |
| `/account/wallet` | Deposit & withdraw |
| `/account/bets` | My bets + cash out |
| `/admin` | Admin dashboard |

## ⚠️ Disclaimer

This project is for **educational/demonstration purposes** only.
Real-money gambling requires proper licensing in your jurisdiction.
Always gamble responsibly. 18+ only.
