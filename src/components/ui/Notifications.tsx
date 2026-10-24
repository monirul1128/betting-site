'use client';
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function Notifications() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    state.notifications.forEach(n => {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: n.id });
      }, 4000);
      return () => clearTimeout(timer);
    });
  }, [state.notifications]);

  if (state.notifications.length === 0) return null;

  const colors: Record<string, string> = {
    success: '#00b050',
    error: '#e63946',
    info: '#3b82f6',
    warning: '#f5c518',
  };
  const icons: Record<string, string> = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation',
  };

  return (
    <div style={{ position: 'fixed', top: 80, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {state.notifications.map(n => (
        <div key={n.id} className="animate-slideDown"
          style={{ background: '#1e2435', border: `1px solid ${colors[n.type]}`, borderLeft: `4px solid ${colors[n.type]}`, borderRadius: 8, padding: '12px 16px', minWidth: 280, maxWidth: 360, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          <i className={`fa ${icons[n.type]}`} style={{ color: colors[n.type], fontSize: 18, flexShrink: 0 }}></i>
          <span style={{ fontSize: 13, color: '#fff', flex: 1 }}>{n.message}</span>
          <button onClick={() => dispatch({ type: 'REMOVE_NOTIFICATION', payload: n.id })}
            style={{ background: 'none', border: 'none', color: '#9aa0b4', cursor: 'pointer', fontSize: 14 }}>✕</button>
        </div>
      ))}
    </div>
  );
}
