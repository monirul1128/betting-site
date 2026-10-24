'use client';
import { useState } from 'react';
import { StoreProvider, useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import BetSlip from '@/components/layout/BetSlip';
import AuthModal from '@/components/auth/AuthModal';
import Notifications from '@/components/ui/Notifications';

const depositMethods = [
  { id: 'bkash', name: 'bKash', icon: '📱', color: '#e2136e', min: 100, max: 50000 },
  { id: 'nagad', name: 'Nagad', icon: '💳', color: '#f7941d', min: 100, max: 50000 },
  { id: 'rocket', name: 'Rocket', icon: '🚀', color: '#8b1a8b', min: 100, max: 50000 },
  { id: 'visa', name: 'Visa/Mastercard', icon: '💰', color: '#1a56c4', min: 500, max: 100000 },
  { id: 'crypto', name: 'Crypto (USDT)', icon: '₿', color: '#f5c518', min: 10, max: 999999 },
];

function WalletContent() {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState<'deposit' | 'withdraw' | 'history'>('deposit');
  const [selectedMethod, setSelectedMethod] = useState(depositMethods[0]);
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  if (!state.isLoggedIn) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🔒</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Login Required</h2>
            <p style={{ color: '#9aa0b4', marginBottom: 20 }}>Please log in to access your wallet.</p>
            <button onClick={() => dispatch({ type: 'SHOW_AUTH', payload: { mode: 'login' } })}
              style={{ background: '#00b050', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Log In
            </button>
          </div>
        </div>
        <AuthModal />
        <Notifications />
      </div>
    );
  }

  const handleDeposit = async () => {
    if (step === 'form') { setStep('confirm'); return; }
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    const amt = parseFloat(amount);
    dispatch({ type: 'UPDATE_BALANCE', payload: (state.user?.balance || 0) + amt });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: `৳${amt.toLocaleString()} deposited successfully!`, type: 'success' } });
    setStep('success');
    setProcessing(false);
  };

  const handleWithdraw = async () => {
    if (step === 'form') { setStep('confirm'); return; }
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    const amt = parseFloat(amount);
    if (amt > (state.user?.balance || 0)) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: 'Insufficient balance', type: 'error' } });
      setProcessing(false); setStep('form'); return;
    }
    dispatch({ type: 'UPDATE_BALANCE', payload: (state.user?.balance || 0) - amt });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: `Withdrawal of ৳${amt.toLocaleString()} submitted!`, type: 'success' } });
    setStep('success');
    setProcessing(false);
  };

  const mockTransactions = [
    { id: 't1', type: 'deposit', amount: 5000, status: 'completed', method: 'bKash', date: new Date(Date.now() - 3600000).toISOString() },
    { id: 't2', type: 'bet', amount: -500, status: 'completed', method: 'Bet placed', date: new Date(Date.now() - 7200000).toISOString() },
    { id: 't3', type: 'win', amount: 1200, status: 'completed', method: 'Bet won', date: new Date(Date.now() - 86400000).toISOString() },
    { id: 't4', type: 'withdraw', amount: -2000, status: 'completed', method: 'Nagad', date: new Date(Date.now() - 172800000).toISOString() },
    { id: 't5', type: 'bonus', amount: 500, status: 'completed', method: 'Welcome Bonus', date: new Date(Date.now() - 259200000).toISOString() },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <main style={{ flex: 1, overflow: 'auto', paddingRight: state.showBetSlip ? 320 : 0 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>💳 My Wallet</h1>

            {/* Balance cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
              {[
                { label: 'Main Balance', value: `৳${(state.user?.balance || 0).toLocaleString()}`, icon: '💰', color: '#00b050' },
                { label: 'Bonus Balance', value: `৳${(state.user?.bonusBalance || 0).toLocaleString()}`, icon: '🎁', color: '#f5c518' },
                { label: 'Total Value', value: `৳${((state.user?.balance || 0) + (state.user?.bonusBalance || 0)).toLocaleString()}`, icon: '📊', color: '#3b82f6' },
              ].map(card => (
                <div key={card.label} style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, color: '#9aa0b4', marginBottom: 8, fontWeight: 600 }}>{card.icon} {card.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: card.color }}>{card.value}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #2e3347', marginBottom: 24 }}>
              {[
                { key: 'deposit', label: '⬇️ Deposit' },
                { key: 'withdraw', label: '⬆️ Withdraw' },
                { key: 'history', label: '📋 History' },
              ].map(t => (
                <button key={t.key} onClick={() => { setTab(t.key as any); setStep('form'); setAmount(''); }}
                  style={{ padding: '12px 24px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: tab === t.key ? '#00b050' : '#9aa0b4', borderBottom: tab === t.key ? '2px solid #00b050' : '2px solid transparent' }}>
                  {t.label}
                </button>
              ))}
            </div>

            {(tab === 'deposit' || tab === 'withdraw') && step === 'success' ? (
              <div style={{ textAlign: 'center', padding: 48 }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{tab === 'deposit' ? 'Deposit Successful!' : 'Withdrawal Submitted!'}</h2>
                <p style={{ color: '#9aa0b4', marginBottom: 24 }}>
                  {tab === 'deposit' ? `৳${amount} has been added to your account.` : `Your withdrawal of ৳${amount} is being processed.`}
                </p>
                <button onClick={() => { setStep('form'); setAmount(''); }}
                  style={{ background: '#00b050', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                  Back to Wallet
                </button>
              </div>
            ) : (tab === 'deposit' || tab === 'withdraw') && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  {/* Method selection */}
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                    {tab === 'deposit' ? 'Select Deposit Method' : 'Select Withdrawal Method'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                    {depositMethods.map(method => (
                      <button key={method.id} onClick={() => setSelectedMethod(method)}
                        style={{ background: selectedMethod.id === method.id ? '#1e3d1e' : '#242938', border: `1px solid ${selectedMethod.id === method.id ? '#00b050' : '#2e3347'}`, borderRadius: 10, padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                        <span style={{ fontSize: 24 }}>{method.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{method.name}</div>
                          <div style={{ fontSize: 12, color: '#9aa0b4' }}>Min ৳{method.min} · Max ৳{method.max.toLocaleString()}</div>
                        </div>
                        {selectedMethod.id === method.id && <i className="fa fa-circle-check" style={{ marginLeft: 'auto', color: '#00b050' }}></i>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  {step === 'form' ? (
                    <>
                      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Enter Amount</h3>
                      <div style={{ background: '#242938', border: '1px solid #2e3347', borderRadius: 10, padding: '12px 16px', marginBottom: 14, display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: 20, fontWeight: 700, color: '#9aa0b4', marginRight: 8 }}>৳</span>
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"
                          style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: 22, fontWeight: 700, outline: 'none' }} />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
                        {quickAmounts.slice(0, 6).map(q => (
                          <button key={q} onClick={() => setAmount(String(q))}
                            style={{ padding: '8px', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, color: '#cdd0db', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
                            ৳{q.toLocaleString()}
                          </button>
                        ))}
                      </div>

                      {/* Summary box */}
                      {amount && (
                        <div style={{ background: '#0f1320', borderRadius: 10, padding: '14px 16px', marginBottom: 16 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                            <span style={{ color: '#9aa0b4' }}>Amount</span>
                            <span>৳{parseFloat(amount || '0').toLocaleString()}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                            <span style={{ color: '#9aa0b4' }}>Method</span>
                            <span>{selectedMethod.name}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                            <span style={{ color: '#9aa0b4' }}>Processing time</span>
                            <span style={{ color: '#00b050' }}>Instant</span>
                          </div>
                          {tab === 'deposit' && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderTop: '1px solid #2e3347', paddingTop: 8, marginTop: 4 }}>
                              <span style={{ color: '#9aa0b4' }}>New Balance</span>
                              <span style={{ color: '#00b050', fontWeight: 700 }}>৳{((state.user?.balance || 0) + parseFloat(amount || '0')).toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <button onClick={tab === 'deposit' ? handleDeposit : handleWithdraw}
                        disabled={!amount || parseFloat(amount) < selectedMethod.min}
                        style={{ width: '100%', padding: '14px', background: !amount || parseFloat(amount) < selectedMethod.min ? '#1a2d1a' : '#00b050', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                        {tab === 'deposit' ? `Continue to Deposit` : `Continue to Withdraw`}
                      </button>
                    </>
                  ) : (
                    <div style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, padding: 24 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Confirm {tab === 'deposit' ? 'Deposit' : 'Withdrawal'}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                        {[
                          { label: 'Amount', value: `৳${parseFloat(amount).toLocaleString()}` },
                          { label: 'Method', value: selectedMethod.name },
                          { label: 'Account', value: state.user?.phone || '01XXXXXXXX' },
                          { label: 'Reference', value: `REF${Date.now().toString().slice(-8)}` },
                        ].map(row => (
                          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                            <span style={{ color: '#9aa0b4' }}>{row.label}</span>
                            <span style={{ fontWeight: 600 }}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => setStep('form')} style={{ flex: 1, padding: '12px', background: '#242938', border: '1px solid #2e3347', color: '#fff', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Back</button>
                        <button onClick={tab === 'deposit' ? handleDeposit : handleWithdraw} disabled={processing}
                          style={{ flex: 2, padding: '12px', background: processing ? '#005530' : '#00b050', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                          {processing ? '⏳ Processing...' : `Confirm ${tab === 'deposit' ? 'Deposit' : 'Withdrawal'}`}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {tab === 'history' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Transaction History</h3>
                  <select style={{ background: '#242938', border: '1px solid #2e3347', color: '#9aa0b4', borderRadius: 8, padding: '6px 12px', fontSize: 13, outline: 'none' }}>
                    <option>All Transactions</option>
                    <option>Deposits</option>
                    <option>Withdrawals</option>
                    <option>Bets</option>
                  </select>
                </div>
                <div style={{ background: '#1e2435', border: '1px solid #2e3347', borderRadius: 12, overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#242938', borderBottom: '1px solid #2e3347' }}>
                        {['Type', 'Amount', 'Method', 'Status', 'Date'].map(h => (
                          <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#9aa0b4' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map(tx => (
                        <tr key={tx.id} style={{ borderBottom: '1px solid #2e3347' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ fontSize: 13, fontWeight: 600, textTransform: 'capitalize', color: tx.type === 'deposit' || tx.type === 'win' || tx.type === 'bonus' ? '#00b050' : '#e63946' }}>
                              {tx.type === 'deposit' ? '⬇️' : tx.type === 'win' ? '🏆' : tx.type === 'bonus' ? '🎁' : tx.type === 'bet' ? '🎯' : '⬆️'} {tx.type}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', fontWeight: 700, color: tx.amount > 0 ? '#00b050' : '#e63946', fontSize: 14 }}>
                            {tx.amount > 0 ? '+' : ''}৳{Math.abs(tx.amount).toLocaleString()}
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: 13, color: '#9aa0b4' }}>{tx.method}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ background: '#1e3d1e', color: '#00b050', fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>{tx.status}</span>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: 12, color: '#9aa0b4' }}>
                            {new Date(tx.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
        <BetSlip />
      </div>
      <AuthModal />
      <Notifications />
    </div>
  );
}

export default function WalletPage() {
  return <StoreProvider><WalletContent /></StoreProvider>;
}
