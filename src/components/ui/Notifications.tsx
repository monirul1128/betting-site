'use client';
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

const colors: Record<string, string> = { success:'#00b050', error:'#e63946', info:'#3b82f6', warning:'#f5c518' };
const icons:  Record<string, string> = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };

export default function Notifications() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    state.notifications.forEach(n => {
      const t = setTimeout(() => dispatch({ type:'REMOVE_NOTIFICATION', payload: n.id }), 4000);
      return () => clearTimeout(t);
    });
  }, [state.notifications, dispatch]);

  if (state.notifications.length === 0) return null;

  return (
    <div className="notif-stack">
      {state.notifications.map(n => (
        <div key={n.id} className="anim-slideDown"
          style={{
            background: '#1e2435',
            border: `1px solid ${colors[n.type]}`,
            borderLeft: `4px solid ${colors[n.type]}`,
            borderRadius: 8,
            padding: '11px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 4px 20px rgba(0,0,0,.4)',
            pointerEvents: 'auto',
          }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>{icons[n.type]}</span>
          <span style={{ fontSize: 13, color: '#fff', flex: 1 }}>{n.message}</span>
          <button onClick={() => dispatch({ type:'REMOVE_NOTIFICATION', payload: n.id })}
            style={{ background:'none', border:'none', color:'#9aa0b4', cursor:'pointer', fontSize:14, flexShrink:0 }}>✕</button>
        </div>
      ))}
    </div>
  );
}
