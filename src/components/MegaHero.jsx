import { useState, useEffect, useRef } from 'react';

const heroStats = [
  { number: 'AED 9.9B', desc: 'annual cost of staff turnover to UAE businesses' },
  { number: '46%', desc: 'of new hires fail within 18 months, 89% due to attitude not skill' },
  { number: '1 in 5', desc: 'MENA students receive meaningful career guidance' },
  { number: '5x', desc: 'more likely to be promoted with a mentor' },
];

export default function MegaHero() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % heroStats.length);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: '100vh', background: '#0A0A0A',
      display: 'flex', alignItems: 'center', padding: '120px 0 80px',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
        className="hero-grid">

        {/* Left */}
        <div>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(32px, 3.2vw, 54px)',
            lineHeight: 0.95, letterSpacing: 2, margin: '0 0 28px', color: '#fff',
          }}>
            <span style={{ display: 'block', width: '700px', fontSize: '75px' }}>CLOSE THE DISTANCE</span>
            <span style={{ display: 'block', width: '700px', fontSize: '75px' }}>BETWEEN YOU AND</span>
            <span style={{ display: 'block', width: '700px', fontSize: '75px' }}>YOUR POTENTIAL<span style={{ color: '#0F52BA' }}>.</span></span>
          </h1>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
            MEGA (Middle East Growth Academy) exists to give people the foundation they need before
            stepping fully into the professional world. Most enter their first roles capable but
            underprepared, unsure how to communicate, manage their time, or meet the expectations
            of a modern workplace.
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
            We bridge that gap. Through structured mentorship and real-world skill development,
            members build the habits, confidence, and systems needed to operate professionally
            from day one.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="https://tally.so/r/MEGA" target="_blank" rel="noopener noreferrer" style={{
              background: '#0F52BA', color: '#fff', borderRadius: 999, padding: '14px 32px',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14,
              textDecoration: 'none', letterSpacing: 0.5, transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 24px 6px #0F52BA66'; e.currentTarget.style.filter = 'brightness(1.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.filter = 'none'; }}>
              Get Started
            </a>
            <button onClick={() => { const el = document.getElementById('about'); if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); }}
              style={{
                background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: 999, padding: '14px 32px',
                fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 14,
                cursor: 'pointer', letterSpacing: 0.5, transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}>
              Learn More
            </button>
          </div>
        </div>

        {/* Right — card stack with ambient glow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, position: 'relative' }}>
          <div style={{
            position: 'absolute', top: '-20%', right: '-10%',
            width: 420, height: 420, borderRadius: '50%', pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(15,82,186,0.16) 0%, transparent 70%)',
            filter: 'blur(40px)', zIndex: 0,
          }} />
          <div style={{
            position: 'absolute', top: '20%', right: '-20%',
            width: 360, height: 360, borderRadius: '50%', pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(163,228,219,0.10) 0%, transparent 70%)',
            filter: 'blur(50px)', zIndex: 0,
          }} />

          <div style={{ position: 'relative', width: '100%', maxWidth: 480, height: 280, zIndex: 1 }}>
            {heroStats.map((stat, i) => {
              const offset = (i - active + heroStats.length) % heroStats.length;
              const isActive = offset === 0;
              const isBehind1 = offset === 1;
              const isBehind2 = offset === 2;
              const isHidden = offset === 3;
              let transform = 'translateY(0) scale(1)';
              let opacity = 1;
              let zIndex = 10;
              if (isBehind1) { transform = 'translateY(20px) scale(0.96)'; opacity = 0.65; zIndex = 9; }
              if (isBehind2) { transform = 'translateY(38px) scale(0.92)'; opacity = 0.38; zIndex = 8; }
              if (isHidden) { transform = 'translateY(56px) scale(0.88)'; opacity = 0; zIndex = 7; }

              return (
                <div key={i} style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  background: 'rgba(10,14,35,0.68)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: `1px solid rgba(15,82,186,${isActive ? '0.48' : '0.28'})`,
                  borderRadius: 18,
                  padding: '44px 48px',
                  transform, opacity, zIndex,
                  transition: 'all 0.55s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: isActive
                    ? '0 24px 70px rgba(0,0,0,0.65), 0 0 40px rgba(15,82,186,0.18)'
                    : '0 12px 36px rgba(0,0,0,0.4), 0 0 24px rgba(15,82,186,0.10)',
                }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 'clamp(60px, 8vw, 80px)',
                    color: isActive ? '#0F52BA' : 'rgba(255,255,255,0.85)',
                    lineHeight: 1, marginBottom: 14, letterSpacing: 1,
                  }}>{stat.number}</div>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif", fontSize: 16,
                    color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, maxWidth: 300,
                  }}>{stat.desc}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 8, zIndex: 1 }}>
            {heroStats.map((_, i) => (
              <div key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 24 : 8, height: 8, borderRadius: 999,
                background: i === active ? '#0F52BA' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease', cursor: 'pointer',
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
