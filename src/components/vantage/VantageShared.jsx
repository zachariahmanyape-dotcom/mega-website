export function Tag({ label, color }) {
  const palettes = {
    cobalt: { bg: 'rgba(15,82,186,0.18)', border: 'rgba(15,82,186,0.5)', text: '#7aaef5' },
    coral:  { bg: 'rgba(255,107,107,0.18)', border: 'rgba(255,107,107,0.5)', text: '#ff9a9a' },
    teal:   { bg: 'rgba(163,228,219,0.18)', border: 'rgba(163,228,219,0.5)', text: '#a3e4db' },
    grey:   { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', text: 'rgba(255,255,255,0.4)' },
  };
  const p = palettes[color] || palettes.cobalt;
  return (
    <span style={{
      display: 'inline-block', background: p.bg, border: `1px solid ${p.border}`,
      borderRadius: 4, padding: '2px 8px',
      fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 700,
      color: p.text, letterSpacing: 0.8, textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}

export function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9.5,
      color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
      {children}
    </div>
  );
}

export function Sidebar({ activeView, onSelect }) {
  const icons = [
    { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
    { id: 'tasks',     icon: '✓', label: 'Tasks' },
    { id: 'sessions',  icon: '📅', label: 'Sessions' },
    { id: 'resources', icon: '📚', label: 'Resources' },
    { id: 'community', icon: '💬', label: 'Community' },
    { id: 'profile',   icon: '👤', label: 'Profile' },
  ];
  return (
    <div style={{ width: 52, background: '#07071a', borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0', gap: 4, flexShrink: 0 }}>
      <div style={{ marginBottom: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
          <circle cx="7" cy="11" r="6" fill="#0F52BA" fillOpacity="0.85" />
          <circle cx="15" cy="11" r="6" fill="#0F52BA" fillOpacity="0.5" />
          <circle cx="11" cy="6" r="6" fill="#0F52BA" fillOpacity="0.35" />
        </svg>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 8.5, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5 }}>VANTAGE</div>
      </div>
      {icons.map(({ id, icon, label }) => {
        const isActive = activeView === id;
        return (
          <div key={id} title={label} onClick={() => onSelect(id)} style={{
            width: 36, height: 36, borderRadius: 8, cursor: 'pointer',
            background: isActive ? 'rgba(15,82,186,0.28)' : 'transparent',
            border: isActive ? '1px solid rgba(15,82,186,0.5)' : '1px solid transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, transition: 'all 0.15s',
            color: isActive ? '#fff' : 'rgba(255,255,255,0.3)',
          }}
            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; } }}
            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; } }}>
            {icon}
          </div>
        );
      })}
    </div>
  );
}
