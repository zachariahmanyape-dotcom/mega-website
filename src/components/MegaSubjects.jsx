import { useState, useEffect, useRef } from 'react';

const SUBJECTS = [
  'Professional Communication', 'Time Management', 'Growth Mindset',
  'Early Career Development', 'Personal Branding', 'CV Development',
  'Project Management', 'Public Speaking', 'Presentation Skills',
  'Presentational Aptitude', 'Habit Tracking', 'Personal Financial Management',
  'Data Management', 'Strategic Sales', 'Consulting Fundamentals',
];

export default function MegaSubjects() {
  const [paused, setPaused] = useState(false);
  const stripRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const doubled = [...SUBJECTS, ...SUBJECTS];

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const speed = 0.5;

    const animate = () => {
      if (!paused) {
        posRef.current += speed;
        const half = el.scrollWidth / 2;
        if (posRef.current >= half) posRef.current -= half;
        el.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  return (
    <section id="subject-areas" style={{ background: '#161616', padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', marginBottom: 56 }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(32px,4vw,54px)',
          color: '#fff', textAlign: 'center', letterSpacing: 2, marginBottom: 16 }}>
          WHAT YOU'LL LEARN.
        </div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16,
          color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
          15 subject areas. Real-world skills. Applied from day one.
        </div>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden', padding: '8px 0' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>

        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
          background: 'linear-gradient(to right, #161616, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
          background: 'linear-gradient(to left, #161616, transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div ref={stripRef} style={{ display: 'flex', gap: 24, width: 'max-content', willChange: 'transform' }}>
          {doubled.map((subject, i) => (
            <div key={i} style={{
              background: '#0f0f0f', border: '1px solid rgba(15,82,186,0.3)',
              borderRadius: 12, padding: '20px 28px',
              display: 'flex', flexDirection: 'column', gap: 10,
              minWidth: 'max-content', cursor: 'default',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0F52BA'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,82,186,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,82,186,0.3)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 20,
                color: '#fff', letterSpacing: 1, whiteSpace: 'nowrap' }}>
                {subject}
              </div>
              <div style={{ height: 2, background: '#0F52BA', borderRadius: 1 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
