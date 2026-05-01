import { useState } from 'react';

const PERSONAS = [
  {
    group: 'For Individuals',
    items: [
      { id: 'students', label: 'Students', desc: "You're working hard but no one has shown you how to translate that into a career. MEGA gives you the structure, skills, and mentorship to bridge the gap between where you are and where you're capable of going." },
      { id: 'young-pros', label: 'Young Professionals', desc: "You're in the workforce but something feels like it's missing. MEGA helps you build the habits, communication, and professional clarity to stop drifting and start accelerating." },
      { id: 'graduates', label: 'Recent Graduates', desc: "You have the degree but not the roadmap. MEGA helps you navigate the real world of work with confidence, starting from day one." },
      { id: 'ambitious', label: 'Ambitious Professionals', desc: "You're driven but you're doing it alone. MEGA gives you the accountability, skills, and perspective to move faster and further than you would on your own." },
    ],
  },
  {
    group: 'For Organizations',
    items: [
      { id: 'ceos', label: 'CEOs & Founders', desc: "Your team has potential but too much of your time goes into teaching basics. MEGA closes the readiness gap so your people can contribute faster and your managers can lead." },
      { id: 'hr', label: 'HR Leaders', desc: "Turnover is expensive and onboarding takes too long. MEGA gives you a structured solution that measurably reduces both problems." },
      { id: 'ld', label: 'L&D Managers', desc: "You need development programs that actually change behavior, not just tick a training box. MEGA delivers structured, outcome-driven readiness." },
      { id: 'recruitment', label: 'Heads of Recruitment', desc: "You bring in great candidates but the gap between hired and high-performing is too wide. MEGA bridges it." },
      { id: 'universities', label: 'Universities & Schools', desc: "Your students need more than academic preparation. MEGA makes your institution a competitive differentiator by equipping graduates with the real-world skills employers actually want." },
    ],
  },
];

export default function MegaPersonas() {
  const [selected, setSelected] = useState('students');
  const [fading, setFading] = useState(false);

  const allItems = PERSONAS.flatMap(g => g.items);
  const activeItem = allItems.find(p => p.id === selected);

  const selectPersona = (id) => {
    if (id === selected) return;
    setFading(true);
    setTimeout(() => { setSelected(id); setFading(false); }, 200);
  };

  return (
    <section id="who-mega-is-for" className="section-pad" style={{ background: '#0A0A0A', padding: '100px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }} className="inner-container">
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(32px,4vw,54px)',
          color: '#fff', textAlign: 'center', letterSpacing: 2, marginBottom: 16 }}>
          MEGA IS BUILT FOR YOU
        </div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16,
          color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 56 }}>
          Whether you're starting your career or building your team.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}
          className="personas-grid">

          <div>
            {PERSONAS.map(group => (
              <div key={group.group} style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: "'Fira Sans Extra Condensed', sans-serif",
                  fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 3,
                  textTransform: 'uppercase', marginBottom: 14, fontWeight: 600 }}>
                  {group.group}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {group.items.map(item => {
                    const isActive = selected === item.id;
                    return (
                      <button key={item.id} onClick={() => selectPersona(item.id)}
                        className="persona-btn"
                        style={{
                          background: isActive ? '#0F52BA' : 'rgba(255,255,255,0.06)',
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                          border: isActive ? '1px solid #0F52BA' : '1px solid rgba(255,255,255,0.12)',
                          borderRadius: 999, padding: '10px 20px',
                          fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600,
                          cursor: 'pointer', transition: 'all 0.2s ease', letterSpacing: 0.3,
                        }}
                        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; } }}
                        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; } }}>
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="personas-content-card" style={{
            background: '#111', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, padding: '44px 40px',
            opacity: fading ? 0 : 1, transform: fading ? 'translateY(8px)' : 'translateY(0)',
            transition: 'all 0.2s ease', minHeight: 200,
          }}>
            <div style={{ width: 32, height: 2, background: '#0F52BA', marginBottom: 20 }} />
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26, color: '#fff',
              letterSpacing: 1, marginBottom: 20 }}>
              {activeItem?.label}
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15,
              color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: 0 }}>
              {activeItem?.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
