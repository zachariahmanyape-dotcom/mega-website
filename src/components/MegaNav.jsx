import { useState, useEffect } from 'react';

const COBALT = '#0F52BA';

export default function MegaNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['About', 'Verticals', 'Subject Areas', 'Vantage', 'Pricing', 'FAQ'];

  const scrollTo = (id) => {
    const idMap = {
      'About': 'about',
      'Verticals': 'verticals',
      'Vantage': 'vantage',
      'Subject Areas': 'subject-areas',
      'Pricing': 'pricing',
      'FAQ': 'faq',
    };
    const el = document.getElementById(idMap[id] || id.toLowerCase().replace(/\s+/g, '-'));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, width: 'min(1100px, calc(100vw - 32px))',
      background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.6)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 999, padding: scrolled ? '10px 24px' : '14px 24px',
      display: 'flex', alignItems: 'center', gap: 8,
      transition: 'all 0.3s ease', boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 'auto', cursor: 'pointer' }}
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="22" height="22">
          <defs>
            <clipPath id="cp1-nav"><circle cx="250" cy="181.4" r="140"/></clipPath>
            <clipPath id="cp12-nav" clipPathUnits="userSpaceOnUse"><circle cx="175" cy="311.3" r="140" clipPath="url(#cp1-nav)"/></clipPath>
            <clipPath id="cp123-nav" clipPathUnits="userSpaceOnUse"><circle cx="325" cy="311.3" r="140" clipPath="url(#cp12-nav)"/></clipPath>
          </defs>
          <rect x="0" y="0" width="500" height="500" fill="#FFFFFF" clipPath="url(#cp123-nav)"/>
          <circle cx="250" cy="181.4" r="140" fill="none" stroke="#FFFFFF" strokeWidth="9"/>
          <circle cx="175" cy="311.3" r="140" fill="none" stroke="#FFFFFF" strokeWidth="9"/>
          <circle cx="325" cy="311.3" r="140" fill="none" stroke="#FFFFFF" strokeWidth="9"/>
        </svg>
        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 24, color: '#fff', letterSpacing: 2, lineHeight: 1 }}>MEGA</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-links-desktop">
        {navLinks.map(link => (
          <button key={link} onClick={() => scrollTo(link)}
            style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.75)',
              fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 500,
              padding: '6px 12px', cursor: 'pointer', borderRadius: 999,
              transition: 'color 0.2s, background 0.2s', letterSpacing: 0.3,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.background = 'none'; }}>
            {link}
          </button>
        ))}
      </div>

      <a href="https://tally.so/r/MEGA" target="_blank" rel="noopener noreferrer"
        style={{
          background: COBALT, color: '#fff', borderRadius: 999,
          padding: '8px 20px', fontFamily: "'Montserrat', sans-serif",
          fontSize: 13, fontWeight: 700, textDecoration: 'none',
          letterSpacing: 0.5, transition: 'all 0.2s',
          boxShadow: `0 0 0 0 ${COBALT}44`, marginLeft: 8,
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 18px 4px ${COBALT}66`; e.currentTarget.style.filter = 'brightness(1.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 0 0 ${COBALT}44`; e.currentTarget.style.filter = 'none'; }}>
        Get Started
      </a>
    </nav>
  );
}
