import { useState } from 'react';

export default function MegaVerticals() {
  const [active, setActive] = useState('mentorship');
  const [transitioning, setTransitioning] = useState(false);

  const switchTo = (val) => {
    if (val === active) return;
    setTransitioning(true);
    setTimeout(() => { setActive(val); setTransitioning(false); }, 250);
  };

  const mentorshipCols = [
    { title: 'Structured Mentorship', body: 'Weekly 1:1 sessions with experienced mentors focused entirely on your goals and next steps.' },
    { title: 'Real-World Skills', body: '15 subject areas covering everything from professional communication to personal financial management.' },
    { title: 'Accountability Systems', body: 'Habit tracking, goal setting frameworks, and personalized growth roadmaps that create consistent progress.' },
  ];
  const managementCols = [
    { title: 'Corporate Readiness', body: 'Close the gap between academic education and day-one workplace performance through structured mindset and skills development.' },
    { title: 'Structured Program', body: 'Twice-weekly 90-minute live sessions over 4 or 8 weeks, building professional habits, communication, and execution skills.' },
    { title: 'Measurable Output', body: 'Cohort intake assessments, real-world task simulations, mid-point check-ins, and a full closing report with leadership debrief.' },
  ];

  const isMentorship = active === 'mentorship';
  const cols = isMentorship ? mentorshipCols : managementCols;
  const accentColor = isMentorship ? '#A3E4DB' : '#FF6B6B';

  return (
    <section id="verticals" className="section-pad" style={{ background: '#0A0A0A', padding: '100px 0',
      borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }} className="inner-container">

        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(28px, 4vw, 44px)',
          color: '#fff', textAlign: 'center', letterSpacing: 2, marginBottom: 48 }}>
          TWO VERTICALS. ONE MISSION.
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 64 }}>
          <div className="verticals-tab-container" style={{
            background: '#111', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 999, padding: 5, display: 'flex', gap: 0,
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)', position: 'relative',
          }}>
            {['mentorship', 'management'].map(tab => {
              const isActive = active === tab;
              return (
                <button key={tab} onClick={() => switchTo(tab)}
                  className="verticals-tab"
                  style={{
                    background: isActive ? '#0F52BA' : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                    border: 'none', borderRadius: 999,
                    padding: '14px 36px', cursor: 'pointer',
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 22, letterSpacing: 2,
                    transition: 'all 0.3s ease',
                    position: 'relative', overflow: 'hidden',
                  }}>
                  MEGA {tab === 'mentorship' ? 'Mentorship' : 'Management'}
                  {!isActive && (
                    <span style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      fontSize: 10, fontFamily: "'Montserrat', sans-serif",
                      color: 'rgba(255,255,255,0.3)', fontWeight: 600,
                      animation: 'pulse 2s infinite',
                    }}>TAP →</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(10px)' : 'translateY(0)',
          transition: 'all 0.25s ease' }}>
          <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: '#fff', textAlign: 'center', lineHeight: 1.1, letterSpacing: 1.5,
            marginBottom: 48, maxWidth: 800, margin: '0 auto 48px' }}>
            {isMentorship
              ? 'BUILT FOR STUDENTS AND YOUNG PROFESSIONALS WHO ARE READY TO GROW.'
              : 'BUILT FOR ORGANIZATIONS THAT NEED THEIR PEOPLE PERFORMING FROM DAY ONE.'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}
            className="verticals-cols">
            {cols.map(col => (
              <div key={col.title} style={{
                background: '#111', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, padding: '32px 28px',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ width: 40, height: 2, background: accentColor, marginBottom: 20 }} />
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, color: '#fff',
                  letterSpacing: 1, marginBottom: 14 }}>{col.title}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14,
                  color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{col.body}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
            <a href="https://tally.so/r/MEGA" target="_blank" rel="noopener noreferrer" style={{
              background: '#0F52BA', color: '#fff', borderRadius: 999, padding: '14px 40px',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14,
              textDecoration: 'none', letterSpacing: 0.5, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px 6px #0F52BA66'; e.currentTarget.style.filter = 'brightness(1.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.filter = 'none'; }}>
              {isMentorship ? 'Explore Mentorship' : 'Explore Management'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
