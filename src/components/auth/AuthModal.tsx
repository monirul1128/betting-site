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

  const close = () => dispatch({ type: 'HIDE_AUTH' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill all fields'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const user: User = {
      id: 'u_' + Date.now(), name: form.email.split('@')[0],
      email: form.email, phone: form.phone || '01700000000',
      balance: 5000, bonusBalance: 500, currency: '৳',
      isVerified: true, createdAt: new Date().toISOString(),
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
      id: 'u_' + Date.now(), name: form.name || form.email.split('@')[0],
      email: form.email, phone: form.phone, balance: 0, bonusBalance: 0,
      currency: '৳', isVerified: false, createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'LOGIN', payload: user });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), message: 'Account created! Welcome to BetPro 🎉', type: 'success' } });
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) close(); }}>
      {/* 
        Mobile: full-width sheet from bottom (modal-overlay aligns bottom on mobile)
        Desktop: centered modal (modal-overlay aligns center on sm+)
      */}
      <div className="anim-slideUp sm:anim-slideDown" style={{
        background: '#1e2435',
        width: '100%',
        maxWidth: 440,
        maxHeight: '95vh',
        overflowY: 'auto',
        borderRadius: '16px 16px 0 0',
        border: '1px solid #2e3347',
        borderBottom: 'none',
      }}>
        {/* sm+ — normal rounded corners */}
        <style>{`@media(min-width:640px){ .auth-sheet { border-radius:12px !important; border-bottom:1px solid #2e3347 !important; } }`}</style>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg,#00b050,#007a38)', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '16px 16px 0 0' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>⚡ BetPro</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.8)' }}>Sports Betting & Live Casino</div>
          </div>
          <button onClick={close} style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', fontSize: 16 }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #2e3347' }}>
          {(['login', 'register'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setError(''); }}
              style={{ flex: 1, padding: '14px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                color: tab === t ? '#00b050' : '#9aa0b4',
                borderBottom: tab === t ? '2px solid #00b050' : '2px solid transparent' }}>
              {t === 'login' ? 'Log In' : 'Register'}
            </button>
          ))}
        </div>

        <div style={{ padding: '20px 20px 24px' }}>
          {error && (
            <div style={{ background: '#2d1515', border: '1px solid #e63946', borderRadius: 8, padding: '10px 14px', marginBottom: 14, color: '#e63946', fontSize: 13 }}>
              ⚠️ {error}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin}>
              {[
                { label: 'Email or Phone', key: 'email', type: 'text',     placeholder: 'Enter email or phone' },
                { label: 'Password',       key: 'password', type: 'password', placeholder: 'Enter password' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', marginBottom: 5, fontSize: 13, color: '#9aa0b4' }}>{f.label}</label>
                  <input value={form[f.key as keyof typeof form]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder} type={f.type} required
                    style={{ width: '100%', padding: '12px 14px', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, color: '#fff', fontSize: 15, outline: 'none' }} />
                </div>
              ))}
              <div style={{ textAlign: 'right', marginTop: -8, marginBottom: 18 }}>
                <a href="#" style={{ fontSize: 12, color: '#00b050', textDecoration: 'none' }}>Forgot password?</a>
              </div>
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '14px', background: loading ? '#005530' : '#00b050', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? '⏳ Logging in…' : 'Log In'}
              </button>
              <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#9aa0b4' }}>
                No account?{' '}
                <button type="button" onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: '#00b050', cursor: 'pointer', fontWeight: 600 }}>Register now</button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              {[
                { label: 'Full Name',    key: 'name',     type: 'text',     placeholder: 'Your full name',   required: false },
                { label: 'Email',        key: 'email',    type: 'email',    placeholder: 'your@email.com',   required: true  },
                { label: 'Phone',        key: 'phone',    type: 'tel',      placeholder: '01XXXXXXXXX',      required: true  },
                { label: 'Password',     key: 'password', type: 'password', placeholder: 'Min 6 characters', required: true  },
                { label: 'Confirm',      key: 'confirm',  type: 'password', placeholder: 'Repeat password',  required: true  },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', marginBottom: 5, fontSize: 13, color: '#9aa0b4' }}>{f.label}</label>
                  <input value={form[f.key as keyof typeof form]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder} type={f.type} required={f.required}
                    style={{ width: '100%', padding: '12px 14px', background: '#242938', border: '1px solid #2e3347', borderRadius: 8, color: '#fff', fontSize: 15, outline: 'none' }} />
                </div>
              ))}
              <p style={{ fontSize: 11, color: '#9aa0b4', margin: '12px 0', lineHeight: 1.6 }}>
                By registering you confirm you are 18+ and agree to our{' '}
                <a href="#" style={{ color: '#00b050' }}>Terms</a> and{' '}
                <a href="#" style={{ color: '#00b050' }}>Privacy Policy</a>.
              </p>
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '14px', background: loading ? '#005530' : '#00b050', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? '⏳ Creating account…' : 'Create Account'}
              </button>
              <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: '#9aa0b4' }}>
                Have an account?{' '}
                <button type="button" onClick={() => setTab('login')} style={{ background: 'none', border: 'none', color: '#00b050', cursor: 'pointer', fontWeight: 600 }}>Log in</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
