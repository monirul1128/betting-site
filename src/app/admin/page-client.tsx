'use client';
import { useState, useEffect } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';
import { liveMatches, upcomingMatches, casinoGames } from '@/data/mockData';

const mockUsers = [
  { id: 'u1', name: 'Rahim Uddin', email: 'rahim@email.com', balance: 12500, status: 'active', joined: '2026-01-15', bets: 34 },
  { id: 'u2', name: 'Karim Ahmed', email: 'karim@email.com', balance: 3200, status: 'active', joined: '2026-02-20', bets: 12 },
  { id: 'u3', name: 'Fatema Begum', email: 'fatema@email.com', balance: 0, status: 'suspended', joined: '2026-03-05', bets: 5 },
  { id: 'u4', name: 'Nasir Islam', email: 'nasir@email.com', balance: 45000, status: 'active', joined: '2025-12-01', bets: 87 },
  { id: 'u5', name: 'Salma Khatun', email: 'salma@email.com', balance: 8900, status: 'active', joined: '2026-04-10', bets: 22 },
];

const mockTransactions = [
  { id: 't1', user: 'Rahim Uddin', type: 'deposit', amount: 5000, method: 'bKash', status: 'pending', time: '2 min ago' },
  { id: 't2', user: 'Karim Ahmed', type: 'withdraw', amount: 2000, method: 'Nagad', status: 'pending', time: '5 min ago' },
  { id: 't3', user: 'Nasir Islam', type: 'deposit', amount: 20000, method: 'Rocket', status: 'completed', time: '12 min ago' },
  { id: 't4', user: 'Salma Khatun', type: 'withdraw', amount: 3500, method: 'bKash', status: 'completed', time: '25 min ago' },
];

function AdminContent() {
  const { state, dispatch } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'matches' | 'transactions' | 'odds'>('dashboard');
  const [userSearch, setUserSearch] = useState('');
  const [clockStr, setClockStr] = useState('');

  useEffect(() => {
    const update = () =>
      setClockStr(
        new Date().toLocaleString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          day: 'numeric',
          month: 'short',
        }),
      );
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: '👥', color: '#3b82f6' },
    { label: 'Active Today', value: '342', change: '+8%', icon: '🟢', color: '#00b050' },
    { label: 'Revenue Today', value: '৳45,230', change: '+23%', icon: '💰', color: '#f5c518' },
    { label: 'Open Bets', value: '1,204', change: '+5%', icon: '🎯', color: '#6c00b0' },
    { label: 'Pending Deposits', value: '34', change: '', icon: '⬇️', color: '#f5c518' },
    { label: 'Pending Withdrawals', value: '12', change: '', icon: '⬆️', color: '#e63946' },
    { label: 'Casino Players', value: '567', change: '+18%', icon: '🎰', color: '#6c00b0' },
    { label: 'Live Events', value: '47', change: '', icon: '🔴', color: '#e63946' },
  ];

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'fa-gauge' },
    { key: 'users', label: 'Users', icon: 'fa-users' },
    { key: 'matches', label: 'Matches', icon: 'fa-futbol' },
    { key: 'transactions', label: 'Transactions', icon: 'fa-money-bill-transfer' },
    { key: 'odds', label: 'Odds Manager', icon: 'fa-sliders' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0d18' }}>
      {/* Admin sidebar */}
      <aside style={{ width: 220, background: '#0f1320', borderRight: '1px solid #2e3347', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 16px', borderBottom: '1px solid #2e3347' }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>⚡ BetPro</div>
          <div style={{ fontSize: 11, color: '#e63946', fontWeight: 700, marginTop: 2 }}>ADMIN PANEL</div>
        </div>
        <nav style={{ padding: '8px 0', flex: 1 }}>
          {navItems.map(item => (
            <button key={item.key} onClick={() => setActiveTab(item.key as any)}
              style={{ width: '100%', padding: '11px 16px', background: activeTab === item.key ? '#1e2d1e' : 'none', border: 'none', borderLeft: activeTab === item.key ? '3px solid #00b050' : '3px solid transparent', color: activeTab === item.key ? '#00b050' : '#9aa0b4', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: activeTab === item.key ? 700 : 400 }}>
              <i className={`fa ${item.icon}`} style={{ width: 16 }}></i>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #2e3347', fontSize: 12, color: '#9aa0b4' }}>
          Logged in as Admin
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ background: '#0f1320', borderBottom: '1px solid #2e3347', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, margin: 0, textTransform: 'capitalize' }}>{activeTab}</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#9aa0b4', background: '#1a1f2e', padding: '6px 12px', borderRadius: 6 }}>
              🟢 System Healthy
            </span>
            <span style={{ fontSize: 12, color: '#9aa0b4', background: '#1a1f2e', padding: '6px 12px', borderRadius: 6 }}>
              {clockStr}
            </span>
          </div>
        </div>

        <div style={{ padding: '24px' }}>

          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
                {stats.map(stat => (
                  <div key={stat.label} style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, padding: '16px 18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: '#9aa0b4', fontWeight: 600 }}>{stat.label}</div>
                      <span style={{ fontSize: 18 }}>{stat.icon}</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                    {stat.change && <div style={{ fontSize: 11, color: stat.change.startsWith('+') ? '#00b050' : '#e63946' }}>{stat.change} vs yesterday</div>}
                  </div>
                ))}
              </div>

              {/* Recent transactions */}
              <div style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #2e3347', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>Pending Transactions</span>
                  <span style={{ fontSize: 13, color: '#00b050', cursor: 'pointer' }}>View all →</span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#242938' }}>
                      {['User', 'Type', 'Amount', 'Method', 'Status', 'Time', 'Action'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#9aa0b4' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map(tx => (
                      <tr key={tx.id} style={{ borderBottom: '1px solid #2e3347' }}>
                        <td style={{ padding: '12px 16px', fontSize: 13 }}>{tx.user}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ color: tx.type === 'deposit' ? '#00b050' : '#e63946', fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>{tx.type}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: 14 }}>৳{tx.amount.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#9aa0b4' }}>{tx.method}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: tx.status === 'pending' ? '#2d2000' : '#1e3d1e', color: tx.status === 'pending' ? '#f5c518' : '#00b050', fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase' }}>{tx.status}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#9aa0b4' }}>{tx.time}</td>
                        <td style={{ padding: '12px 16px' }}>
                          {tx.status === 'pending' && (
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button style={{ background: '#1e3d1e', color: '#00b050', border: '1px solid #00b050', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 700 }}>Approve</button>
                              <button style={{ background: '#2d1515', color: '#e63946', border: '1px solid #e63946', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 700 }}>Reject</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Live matches overview */}
              <div style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #2e3347', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>Live Events</span>
                  <span style={{ background: '#e63946', color: '#fff', fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>{liveMatches.length} LIVE</span>
                </div>
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {liveMatches.map(match => (
                    <div key={match.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#242938', borderRadius: 8 }}>
                      <div>
                        <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 3 }}>{match.leagueName}</div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{match.homeTeam.name} {match.homeTeam.score} - {match.awayTeam.score} {match.awayTeam.name}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: '#e63946', fontWeight: 700 }}>{match.minute}'</span>
                        <button style={{ background: '#242938', border: '1px solid #2e3347', color: '#9aa0b4', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>Manage</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Users tab */}
          {activeTab === 'users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ position: 'relative' }}>
                  <i className="fa fa-search" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9aa0b4', fontSize: 13 }}></i>
                  <input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Search users..."
                    style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 8, padding: '9px 14px 9px 34px', color: '#fff', fontSize: 13, outline: 'none', width: 260 }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <select style={{ background: '#242938', border: '1px solid #2e3347', color: '#9aa0b4', borderRadius: 8, padding: '8px 12px', fontSize: 13, outline: 'none' }}>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Suspended</option>
                  </select>
                  <button style={{ background: '#00b050', border: 'none', color: '#fff', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                    + Add User
                  </button>
                </div>
              </div>
              <div style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#242938' }}>
                      {['User', 'Email', 'Balance', 'Bets', 'Status', 'Joined', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#9aa0b4' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.filter(u => !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())).map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid #2e3347' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 32, height: 32, background: '#00b050', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>{user.name[0]}</div>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#9aa0b4' }}>{user.email}</td>
                        <td style={{ padding: '12px 16px', fontWeight: 700, color: '#00b050' }}>৳{user.balance.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', fontSize: 13 }}>{user.bets}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: user.status === 'active' ? '#1e3d1e' : '#2d1515', color: user.status === 'active' ? '#00b050' : '#e63946', fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>{user.status}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#9aa0b4' }}>{user.joined}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button style={{ background: '#242938', border: '1px solid #2e3347', color: '#9aa0b4', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>View</button>
                            <button style={{ background: user.status === 'active' ? '#2d1515' : '#1e3d1e', color: user.status === 'active' ? '#e63946' : '#00b050', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>
                              {user.status === 'active' ? 'Suspend' : 'Activate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Matches tab */}
          {activeTab === 'matches' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>All Matches ({liveMatches.length + upcomingMatches.length})</h2>
                <button style={{ background: '#00b050', border: 'none', color: '#fff', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>+ Add Match</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[...liveMatches, ...upcomingMatches].map(match => (
                  <div key={match.id} style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 4 }}>{match.sportName} · {match.leagueName}</div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{match.homeTeam.name} vs {match.awayTeam.name}</div>
                      {match.status === 'live' && <div style={{ fontSize: 12, color: '#00b050', marginTop: 4 }}>Score: {match.homeTeam.score} - {match.awayTeam.score}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ background: match.status === 'live' ? '#2d0f0f' : '#1e2435', color: match.status === 'live' ? '#e63946' : '#9aa0b4', fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase' }}>{match.status}</span>
                      <button style={{ background: '#242938', border: '1px solid #2e3347', color: '#9aa0b4', borderRadius: 6, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}>Edit Odds</button>
                      <button style={{ background: '#2d1515', color: '#e63946', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}>Suspend</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transactions tab */}
          {activeTab === 'transactions' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
                {[
                  { label: 'Deposits Today', value: '৳125,400', color: '#00b050' },
                  { label: 'Withdrawals Today', value: '৳67,200', color: '#e63946' },
                  { label: 'Pending Deposits', value: '34', color: '#f5c518' },
                  { label: 'Pending Withdrawals', value: '12', color: '#f5c518' },
                ].map(s => (
                  <div key={s.label} style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, padding: '16px 18px' }}>
                    <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 8 }}>{s.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #2e3347', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700 }}>All Transactions</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['All', 'Pending', 'Deposits', 'Withdrawals'].map(f => (
                      <button key={f} style={{ padding: '5px 12px', background: f === 'All' ? '#00b050' : '#242938', border: `1px solid ${f === 'All' ? '#00b050' : '#2e3347'}`, borderRadius: 6, color: '#fff', fontSize: 12, cursor: 'pointer' }}>{f}</button>
                    ))}
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#242938' }}>
                      {['User', 'Type', 'Amount', 'Method', 'Status', 'Time', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#9aa0b4' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map(tx => (
                      <tr key={tx.id} style={{ borderBottom: '1px solid #2e3347' }}>
                        <td style={{ padding: '12px 16px', fontSize: 13 }}>{tx.user}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ color: tx.type === 'deposit' ? '#00b050' : '#e63946', fontSize: 12, fontWeight: 700, textTransform: 'capitalize' }}>{tx.type}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 700 }}>৳{tx.amount.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#9aa0b4' }}>{tx.method}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: tx.status === 'pending' ? '#2d2000' : '#1e3d1e', color: tx.status === 'pending' ? '#f5c518' : '#00b050', fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>{tx.status}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#9aa0b4' }}>{tx.time}</td>
                        <td style={{ padding: '12px 16px' }}>
                          {tx.status === 'pending' && (
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button style={{ background: '#1e3d1e', color: '#00b050', border: '1px solid #00b050', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 700 }}>✓ Approve</button>
                              <button style={{ background: '#2d1515', color: '#e63946', border: '1px solid #e63946', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 700 }}>✕ Reject</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Odds Manager */}
          {activeTab === 'odds' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Odds Manager</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ background: '#e63946', border: 'none', color: '#fff', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Suspend All</button>
                  <button style={{ background: '#00b050', border: 'none', color: '#fff', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Resume All</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {liveMatches.map(match => (
                  <div key={match.id} style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, padding: '16px 18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 11, color: '#9aa0b4' }}>{match.leagueName} · LIVE {match.minute}'</div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{match.homeTeam.name} vs {match.awayTeam.name}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={{ background: '#2d0f0f', color: '#e63946', border: '1px solid #e63946', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>Suspend Market</button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {match.markets[0].selections.map(sel => (
                        <div key={sel.id} style={{ flex: 1, background: '#242938', borderRadius: 8, padding: '10px 12px' }}>
                          <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 6 }}>{sel.name}</div>
                          <input type="number" defaultValue={sel.odds.toFixed(2)} step="0.01" min="1.01"
                            style={{ width: '100%', background: '#0f1320', border: '1px solid #3a4060', borderRadius: 6, padding: '6px 10px', color: '#f5c518', fontSize: 14, fontWeight: 700, outline: 'none' }} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'flex-end' }}>
                      <button style={{ background: '#00b050', border: 'none', color: '#fff', borderRadius: 6, padding: '6px 16px', fontSize: 12, cursor: 'pointer', fontWeight: 700 }}>Update Odds</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <AuthModal />
      <Notifications />
    </div>
  );
}

export default function AdminPage() {
  return <StoreProvider><AdminContent /></StoreProvider>;
}
