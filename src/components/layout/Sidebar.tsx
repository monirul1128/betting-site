'use client';
import Link from 'next/link';
import { sports } from '@/data/mockData';
import { useState } from 'react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="app-sidebar" style={{ width: collapsed ? 52 : 220 }}>
      {/* Collapse toggle */}
      <div style={{ padding: '10px 12px', borderBottom: '1px solid #2e3347', display: 'flex', justifyContent: collapsed ? 'center' : 'space-between', alignItems: 'center' }}>
        {!collapsed && <span style={{ fontSize: 11, fontWeight: 700, color: '#9aa0b4', textTransform: 'uppercase', letterSpacing: 1 }}>Sports</span>}
        <button onClick={() => setCollapsed(!collapsed)}
          style={{ background: 'none', border: 'none', color: '#9aa0b4', cursor: 'pointer', fontSize: 16, padding: 4, lineHeight: 1 }}>
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* Quick links */}
      {!collapsed && (
        <div style={{ padding: '8px 0', borderBottom: '1px solid #2e3347' }}>
          {[
            { href: '/live',   label: 'Live Now',  badge: '12', color: '#e63946' },
            { href: '/sports', label: 'All Sports', badge: '',   color: '#9aa0b4' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', color: '#cdd0db' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#242938')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ fontSize: 13, color: item.color }}>●</span>
                <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ background: '#e63946', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>{item.badge}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Sports list */}
      <div style={{ padding: '8px 0', flex: 1, overflowY: 'auto' }}>
        {sports.map(sport => (
          <Link key={sport.id} href={`/sports?sport=${sport.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ padding: collapsed ? '10px' : '8px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', color: '#cdd0db', justifyContent: collapsed ? 'center' : 'flex-start' }}
              title={collapsed ? sport.name : undefined}
              onMouseEnter={e => (e.currentTarget.style.background = '#242938')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <i className={`fa ${sport.icon}`} style={{ width: 16, fontSize: 12, color: sport.isPopular ? '#f5c518' : '#9aa0b4', flexShrink: 0 }} />
              {!collapsed && (
                <>
                  <span style={{ fontSize: 13, flex: 1 }}>{sport.name}</span>
                  <span style={{ fontSize: 11, color: '#9aa0b4' }}>{sport.count}</span>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* App download */}
      {!collapsed && (
        <div style={{ margin: 10, background: 'linear-gradient(135deg,#007a38,#004d22)', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>📱 Get the App</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>Live odds & fast login</div>
          <button style={{ width: '100%', background: '#fff', color: '#007a38', border: 'none', borderRadius: 6, padding: 7, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            Download APK
          </button>
        </div>
      )}
    </aside>
  );
}
