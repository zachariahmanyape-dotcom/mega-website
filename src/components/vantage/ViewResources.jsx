import { Tag, SectionLabel } from './VantageShared';

export default function ViewResources() {
  const recentCards = [
    { title: 'Time Blocking System', tag: 'Time Management', tagColor: 'cobalt', folder: 'Foundations / Time Management' },
    { title: 'CV Results-First Template', tag: 'CV Development', tagColor: 'teal', folder: 'Breakthrough / CV Development' },
    { title: 'Personal Brand Framework', tag: 'Personal Branding', tagColor: 'coral', folder: 'Breakthrough / Personal Branding' },
  ];
  const folders = [
    { name: 'All Resources', count: 48 },
    { name: 'Foundations', count: 18 },
    { name: 'Breakthrough', count: 12 },
    { name: 'Management', count: 9 },
    { name: 'Habit Systems', count: 6 },
    { name: 'Life / Money', count: 3 },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ width: 130, borderRight: '1px solid rgba(255,255,255,0.06)', padding: '14px 10px', overflowY: 'auto', flexShrink: 0 }}>
        <SectionLabel>Folders</SectionLabel>
        {folders.map((f, i) => (
          <div key={f.name} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '6px 8px', borderRadius: 6, marginBottom: 2, cursor: 'pointer',
            background: i === 0 ? 'rgba(15,82,186,0.2)' : 'transparent',
          }}
            onMouseEnter={e => { if (i !== 0) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { if (i !== 0) e.currentTarget.style.background = 'transparent'; }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10,
              color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: i === 0 ? 600 : 400 }}>{f.name}</span>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9,
              color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.06)',
              borderRadius: 4, padding: '1px 5px' }}>{f.count}</span>
          </div>
        ))}
        <div style={{ marginTop: 12 }}>
          <SectionLabel>Subject Areas</SectionLabel>
          {['Communication','Time Mgmt','CV Dev','Branding','Finance'].map(t => (
            <div key={t} style={{ marginBottom: 4 }}><Tag label={t} color="grey" /></div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '14px 14px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 18, color: '#fff', letterSpacing: 1 }}>RESOURCES.</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4, maxWidth: 260 }}>
              Everything your mentor has ever shared, organized.
            </div>
          </div>
          <div style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
            padding: '5px 10px', fontFamily: "'Montserrat', sans-serif", fontSize: 9.5, color: 'rgba(255,255,255,0.35)' }}>
            Search…
          </div>
        </div>

        <SectionLabel>Recently Added</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          {recentCards.map((c, i) => (
            <div key={i} style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(15,82,186,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
              <div style={{ height: 60, background: '#0d0d1e', position: 'relative', overflow: 'hidden' }}>
                {[...Array(6)].map((_, j) => (
                  <div key={j} style={{
                    position: 'absolute', width: 1, height: 200,
                    background: 'rgba(255,255,255,0.04)',
                    transform: `rotate(45deg) translateX(${j * 18 - 20}px)`,
                    top: -50,
                  }} />
                ))}
                <div style={{ position: 'absolute', bottom: 6, left: 8 }}>
                  <Tag label={c.tag} color={c.tagColor} />
                </div>
              </div>
              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, color: '#fff', marginBottom: 3, lineHeight: 1.3 }}>{c.title}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8.5, color: 'rgba(255,255,255,0.3)' }}>{c.folder}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
