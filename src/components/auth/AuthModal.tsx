'use client';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { User } from '@/types';

export default function AuthModal() {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState<'login' | 'register'>(state.authMode);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  if (!state.showAuthModal) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (!form.email || !form.password) { setError('Please fill all fields'); setLoading(false); return; }
    const user: User = {
      id: 'u_' + Date.now(),
      name: form.email.split('@')[0],
      email: form.email,
      phone: form.phone || '01700000000',
      balance: 5000,
      bonusBalance: 500,
      currency: '৳',
      isVerified: true,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'LOGIN', payload: user });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: `Welcome back, ${user.name}!`, type: 'success' } });
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const user: User = {
      id: 'u_' + Date.now(),
      name: form.name || form.email.split('@')[0],
      email: form.email,
      phone: form.phone,
      balance: 0,
      bonusBalance: 0,
      currency: '৳',
      isVerified: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'LOGIN', payload: user });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: 'Account created! Welcome to BetPro 🎉', type: 'success' } });
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) dispatch({ type: 'HIDE_AUTH' }); }}>
      <div className="animate-slideDown" style={{ background: '#1e2435', borderRadius: 12, width: '100%', maxWidth: 420, padding: 0, overflow: 'hidden', border: '1px solid #2e3347' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #00b050, #007a38)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>⚡ BetPro</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Sports Betting & Live Casino</div>
          </div>
          <button onClick={() => dispatch({ type: 'HIDE_AUTH' })} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', fontSize: 16 }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #2e3347' }}>
          {(['login', 'register'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setError(''); }}
              style={{ flex: 1, padding: '14px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, color: tab === t ? '#00b050' : '#9aa0b4', borderBottom: tab === t ? '2px solid #00b050' : '2px solid transparent', transition: 'all 0.2s' }}>
              {t === 'login' ? 'Log In' : 'Register'}
            </button>
          ))}
        </div>

        <div style={{ padding: '24px' }}>
          {error && <div style={{ background: '#2d1515', border: '1px solid #e63946', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#e63946', fontSize: 13 }}>⚠️ {error}</div>}

          {tab === 'login' ? (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#9aa0b4' }}>Email or Phone</label>
                <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="Enter email or phone" type="text" required
                  style={{ width: '100%', padding: '11px 14px', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#9aa0b4' }}>Password</label>
                <input value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Enter password" type="password" required
                  style={{ width: '100%', padding: '11px 14px', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }} />
                <div style={{ textAlign: 'right', marginTop: 6 }}>
                  <a href="#" style={{ fontSize: 12, color: '#00b050', textDecoration: 'none' }}>Forgot password?</a>
                </div>
              </div>
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px', background: loading ? '#005530' : '#00b050', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
                {loading ? '⏳ Logging in...' : 'Log In'}
              </button>
              <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#9aa0b4' }}>
                Don't have an account?{' '}
                <button type="button" onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: '#00b050', cursor: 'pointer', fontWeight: 600 }}>Register now</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#9aa0b4' }}>Full Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your full name" type="text"
                  style={{ width: '100%', padding: '11px 14px', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#9aa0b4' }}>Email Address</label>
                <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com" type="email" required
                  style={{ width: '100%', padding: '11px 14px', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#9aa0b4' }}>Phone Number</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="01XXXXXXXXX" type="tel" required
                  style={{ width: '100%', padding: '11px 14px', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#9aa0b4' }}>Password</label>
                <input value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Min 6 characters" type="password" required
                  style={{ width: '100%', padding: '11px 14px', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#9aa0b4' }}>Confirm Password</label>
                <input value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  placeholder="Repeat password" type="password" required
                  style={{ width: '100%', padding: '11px 14px', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }} />
              </div>
              <div style={{ marginBottom: 16, fontSize: 12, color: '#9aa0b4', lineHeight: 1.5 }}>
                By registering, you confirm you are 18+ and agree to our <a href="#" style={{ color: '#00b050' }}>Terms</a> and <a href="#" style={{ color: '#00b050' }}>Privacy Policy</a>.
              </div>
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px', background: loading ? '#005530' : '#00b050', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? '⏳ Creating account...' : 'Create Account'}
              </button>
              <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#9aa0b4' }}>
                Already have an account?{' '}
                <button type="button" onClick={() => setTab('login')} style={{ background: 'none', border: 'none', color: '#00b050', cursor: 'pointer', fontWeight: 600 }}>Log in</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
