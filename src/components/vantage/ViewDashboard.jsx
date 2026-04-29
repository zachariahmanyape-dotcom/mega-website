import { SectionLabel } from './VantageShared';

export default function ViewDashboard() {
  const days = ['M','T','W','T','F','S','S'];
  const bars = [35, 60, 85, 50, 100, 70, 40];
  const skillLevels = ['Beginner','Rising','Skilled','Advanced','Elite'];
  const tasks = [
    { name: 'Draft elevator pitch', xp: '+120 XP' },
    { name: 'Weekly reflection journal', xp: '+60 XP' },
    { name: 'Complete Time Blocking module', xp: '+40 XP' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '16px 14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 20, color: '#fff', letterSpacing: 1 }}>
          HELLO, <span style={{ color: '#0F52BA' }}>AMIRA.</span>
        </div>

        <div style={{ background: '#151530', border: '1px solid rgba(15,82,186,0.3)', borderRadius: 10, padding: '10px 12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <div>
            <SectionLabel>Upcoming 1:1</SectionLabel>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
              1:1 — CAREER DIRECTION CHECK-IN
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9.5, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>
              Tomorrow · 4:00 PM GST
            </div>
          </div>
          <div style={{ background: '#0F52BA', borderRadius: 6, padding: '6px 12px', flexShrink: 0,
            fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
            Join Session
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
          {[['11','1:1 Sessions'],['23','Modules'],['6','Habits'],['4','Town Halls']].map(([n, l]) => (
            <div key={l} style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 24, color: '#0F52BA', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 3, lineHeight: 1.3 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 12px' }}>
          <SectionLabel>Weekly Activity</SectionLabel>
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 44 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: '100%', height: `${h * 0.4}px`, minHeight: 3,
                  background: i === 4 ? '#0F52BA' : 'rgba(15,82,186,0.28)', borderRadius: '3px 3px 0 0' }} />
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8, color: i === 4 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)' }}>{days[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: 155, borderLeft: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', flexShrink: 0 }}>

        <div style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px' }}>
          <SectionLabel>Streak</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 20 }}>🔥</span>
            <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 30, color: '#fff' }}>14</span>
          </div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8.5, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>days in a row</div>
        </div>

        <div style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px' }}>
          <SectionLabel>Skill Level</SectionLabel>
          {skillLevels.map((lv, i) => {
            const pct = i === 0 ? 100 : i === 1 ? 100 : i === 2 ? 60 : 0;
            const isActive = i === 2;
            return (
              <div key={lv} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? '#0F52BA' : pct > 0 ? '#0F52BA88' : 'transparent', borderRadius: 2 }} />
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8.5, minWidth: 44,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.3)', fontWeight: isActive ? 700 : 400 }}>{lv}</div>
              </div>
            );
          })}
        </div>

        <div style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
          <SectionLabel>Focus Timer</SectionLabel>
          <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: '#fff', letterSpacing: 2 }}>25:00</div>
          <div style={{ background: '#0F52BA', borderRadius: 6, padding: '5px 0', marginTop: 6,
            fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Start Focus</div>
        </div>

        <div style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px', flex: 1 }}>
          <SectionLabel>Up Next</SectionLabel>
          {tasks.map((t, i) => (
            <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: i < tasks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, marginBottom: 2 }}>{t.name}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: '#0F52BA', fontWeight: 700 }}>{t.xp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
