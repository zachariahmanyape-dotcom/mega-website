import { Tag } from './VantageShared';

export default function ViewSessions() {
  const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const startDay = 3;
  const totalDays = 30;
  const events = {
    7:  { label: '1:1 — Brand Kickoff',      color: '#0F52BA' },
    14: { label: '1:1 — Positioning Review', color: '#0F52BA' },
    16: { label: 'April Town Hall',           color: '#FF6B6B' },
    22: { label: '1:1 — Career Check-in',    color: '#0F52BA' },
  };
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  return (
    <div style={{ padding: '16px 18px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 20, color: '#fff', letterSpacing: 1, marginBottom: 3 }}>YOUR CALENDAR.</div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          Every 1:1 and town hall in one place. Reminders fire 90 minutes before you start.
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <Tag label="1:1" color="cobalt" />
          <Tag label="Town Hall" color="coral" />
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Calendar','List'].map((v, i) => (
            <div key={v} style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 700,
              padding: '4px 10px', borderRadius: 5, cursor: 'pointer',
              background: i === 0 ? 'rgba(15,82,186,0.3)' : 'rgba(255,255,255,0.06)',
              color: i === 0 ? '#fff' : 'rgba(255,255,255,0.4)',
              border: i === 0 ? '1px solid rgba(15,82,186,0.5)' : '1px solid rgba(255,255,255,0.1)',
            }}>{v}</div>
          ))}
        </div>
      </div>

      <div style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
          <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 13, color: '#fff', letterSpacing: 1 }}>APRIL 2026</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
          {days.map(d => (
            <div key={d} style={{ textAlign: 'center', fontFamily: "'Montserrat', sans-serif",
              fontSize: 8, color: 'rgba(255,255,255,0.3)', fontWeight: 700, paddingBottom: 4 }}>{d}</div>
          ))}
          {cells.map((d, i) => {
            const ev = d && events[d];
            return (
              <div key={i} style={{
                height: 30, borderRadius: 4, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'flex-start', padding: '3px 2px',
                background: ev ? `${ev.color}22` : d === 28 ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: d === 28 ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
              }}>
                {d && <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8,
                  color: ev ? ev.color : 'rgba(255,255,255,0.5)', fontWeight: ev ? 700 : 400 }}>{d}</div>}
                {ev && <div style={{ width: '80%', height: 3, borderRadius: 2, background: ev.color, marginTop: 2 }} />}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.45)',
        padding: '8px 12px', background: '#151530', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ color: '#7aaef5' }}>3 1:1s — 3h 0m</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 8px' }}>/</span>
        <span style={{ color: '#ff9a9a' }}>1 Town Hall — 1h 15m</span>
      </div>
    </div>
  );
}
