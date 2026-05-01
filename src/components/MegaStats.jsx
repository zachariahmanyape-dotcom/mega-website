const statCards = [
  { num: '83%', desc: 'of UAE workers would resign for better career development', src: 'LinkedIn Workforce Report' },
  { num: '+218%', desc: 'higher revenue per employee in companies with strong training programs', src: 'ATD Research' },
  { num: '92%', desc: 'of professionals say soft skills matter as much as technical skills', src: 'LinkedIn Global Talent' },
  { num: '75%', desc: 'of HR leaders say graduates are not workplace-ready', src: 'McKinsey & Company' },
  { num: '60%', desc: "of UAE's population is under 30", src: 'UAE Federal Competitiveness Authority' },
  { num: '25%', desc: 'average annual employee turnover in UAE businesses', src: 'Mercer UAE Study' },
];

export default function MegaStats() {
  return (
    <section id="statistics" className="section-pad" style={{ background: '#111', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }} className="inner-container">
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(32px, 4vw, 54px)',
          color: '#fff', textAlign: 'center', letterSpacing: 2, marginBottom: 16 }}>
          THE NUMBERS DON'T LIE
        </div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16,
          color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 64 }}>
          Why structured development isn't optional in the UAE.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
          className="stats-grid">
          {statCards.map((card, i) => (
            <div key={i} className="stats-card" style={{
              background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: '36px 32px',
              transition: 'all 0.2s ease', cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(15,82,186,0.2)'; e.currentTarget.style.borderColor = 'rgba(15,82,186,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 60,
                color: '#0F52BA', lineHeight: 1, marginBottom: 14, letterSpacing: 1 }}>
                {card.num}
              </div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14,
                color: '#fff', lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>
                {card.desc}
              </div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11,
                color: 'rgba(255,255,255,0.3)' }}>
                Source: {card.src}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
