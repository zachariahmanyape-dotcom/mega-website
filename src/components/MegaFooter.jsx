export default function MegaFooter() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <footer id="footer" style={{ background: '#0A0A0A', padding: '80px 0 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1.5fr', gap: 48, marginBottom: 80 }}
          className="footer-grid">

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <svg width="32" height="32" viewBox="0 0 22 22" fill="none">
                <circle cx="7" cy="11" r="7" fill="#0F52BA" fillOpacity="0.85" />
                <circle cx="15" cy="11" r="7" fill="#0F52BA" fillOpacity="0.55" />
                <circle cx="11" cy="6" r="7" fill="#0F52BA" fillOpacity="0.4" />
              </svg>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: '#fff', letterSpacing: 3, lineHeight: 1 }}>MEGA</span>
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14,
              color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 260 }}>
              Close the distance between you and your potential.
            </p>
          </div>

          <div>
            <div style={{ fontFamily: "'Fira Sans Extra Condensed', sans-serif", fontSize: 14,
              color: 'rgba(255,255,255,0.9)', letterSpacing: 2, textTransform: 'uppercase',
              marginBottom: 20, fontWeight: 600 }}>Company</div>
            {[['about', 'About'], ['verticals', 'Verticals'], ['pricing', 'Pricing'], ['faq', 'FAQ']].map(([id, label]) => (
              <div key={id} onClick={() => scrollTo(id)} style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 14,
                color: 'rgba(255,255,255,0.45)', marginBottom: 12, cursor: 'pointer',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                {label}
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: "'Fira Sans Extra Condensed', sans-serif", fontSize: 14,
              color: 'rgba(255,255,255,0.9)', letterSpacing: 2, textTransform: 'uppercase',
              marginBottom: 20, fontWeight: 600 }}>Contact</div>
            {[
              { label: 'contact@mega-mentorship.com', href: 'mailto:contact@mega-mentorship.com' },
              { label: '+971 58 648 9288', href: 'tel:+971586489288' },
            ].map(item => (
              <a key={item.label} href={item.href} style={{
                display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: 14,
                color: 'rgba(255,255,255,0.45)', marginBottom: 12, textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                {item.label}
              </a>
            ))}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: "'Montserrat', sans-serif", fontSize: 14,
              color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
              transition: 'color 0.2s', marginTop: 4,
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </div>

          <div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28,
              color: '#fff', letterSpacing: 1.5, lineHeight: 1.1, marginBottom: 14 }}>
              Ready to close the gap?
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14,
              color: 'rgba(255,255,255,0.45)', marginBottom: 24 }}>
              Take the first step today.
            </div>
            <a href="https://tally.so/r/MEGA" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block', background: '#0F52BA', color: '#fff',
              borderRadius: 999, padding: '12px 28px',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14,
              textDecoration: 'none', letterSpacing: 0.5, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px 6px #0F52BA66'; e.currentTarget.style.filter = 'brightness(1.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.filter = 'none'; }}>
              Get Started
            </a>
          </div>
        </div>
      </div>

      <div style={{ overflow: 'hidden', lineHeight: 0.85, textAlign: 'center', padding: '0 0 0' }}>
        <div style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(100px, 22vw, 300px)',
          color: 'rgba(255,255,255,0.06)',
          letterSpacing: '0.05em', lineHeight: 0.85,
          userSelect: 'none', pointerEvents: 'none',
          display: 'block',
        }}>MEGA</div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13,
          color: 'rgba(255,255,255,0.25)', letterSpacing: 3, textTransform: 'uppercase',
          marginTop: -8, marginBottom: 32 }}>
          Middle East Growth Academy
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 40px',
        display: 'flex', justifyContent: 'center' }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12,
          color: 'rgba(255,255,255,0.25)' }}>
          © 2026 MEGA. All rights reserved. mega-mentorship.com
        </div>
      </div>
    </footer>
  );
}
