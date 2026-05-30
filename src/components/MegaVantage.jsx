import { useEffect } from 'react';

export default function MegaVantage() {
  useEffect(() => {
    const SCRIPT_ID = 'vantage-demo-script';
    function mount() {
      if (typeof window.mountVantageDemo === 'function') {
        window.mountVantageDemo('vantage-demo-mount');
      }
    }
    if (window.mountVantageDemo) {
      mount();
      return;
    }
    let script = document.getElementById(SCRIPT_ID);
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = '/vantage-demo/vantage-demo.js?v=2';
      script.onload = mount;
      document.body.appendChild(script);
    } else {
      script.addEventListener('load', mount);
    }
  }, []);

  return (
    <section id="vantage" className="section-pad" style={{
      background: '#0A0A0A', padding: '100px 0',
      borderTop: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            fontFamily: "'Fira Sans Extra Condensed', sans-serif", fontSize: 13,
            color: '#A3E4DB', letterSpacing: 3, textTransform: 'uppercase',
            marginBottom: 16, fontWeight: 600
          }}>
            Meet Vantage.
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(32px,4vw,52px)',
            color: '#fff', lineHeight: 1.05, letterSpacing: 1.5, marginBottom: 14
          }}>
            THE PLATFORM THAT POWERS YOUR GROWTH.
          </h2>
          <div style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 15,
            color: 'rgba(255,255,255,0.45)'
          }}>
            Explore it yourself. No login required.
          </div>
        </div>

        <div id="vantage-demo-mount" style={{ width: '100%' }} />

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56 }}>
          <a href="https://tally.so/r/MEGA" target="_blank" rel="noopener noreferrer" style={{
            background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: 999, padding: '14px 40px',
            fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14,
            textDecoration: 'none', letterSpacing: 0.5, transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}>
            Learn More About Vantage
          </a>
        </div>
      </div>
    </section>
  );
}
