import { useState, useEffect } from 'react';

const QUESTIONS = [
  { dim: 'Career Clarity', q: 'I have a clear idea of the career path I want to pursue.' },
  { dim: 'Career Clarity', q: 'I know the specific steps I need to take in the next 12 months to move toward my goals.' },
  { dim: 'Self-Awareness', q: 'I can clearly describe my top three professional strengths.' },
  { dim: 'Self-Awareness', q: 'I understand which of my habits or behaviors might be holding me back.' },
  { dim: 'Professional Habits', q: 'I consistently follow through on commitments I make to myself.' },
  { dim: 'Professional Habits', q: 'I have a routine that actively supports my personal and professional growth.' },
  { dim: 'Readiness Confidence', q: 'I feel confident walking into a professional setting like an interview or meeting.' },
  { dim: 'Readiness Confidence', q: 'I know how to present myself and communicate my value to someone I have just met.' },
  { dim: 'Readiness Confidence', q: 'I have at least one person in my life who gives me honest, structured career guidance.' },
  { dim: 'Readiness Confidence', q: 'I feel ready for the next chapter of my professional journey.' },
];

const PROFILES = [
  {
    range: [10, 16],
    name: 'The Uncharted Achiever',
    desc: "You have the drive but lack the direction and structure to channel it. You're not behind — you're just without a map. MEGA Foundations was built for exactly this stage.",
    cta: 'Start with MEGA Foundations →',
  },
  {
    range: [17, 23],
    name: 'The Capable Drifter',
    desc: "You have real instincts and some clarity, but consistency and confidence gaps are slowing your progress. You're close — you just need the right structure around you.",
    cta: 'See which tier fits you →',
  },
  {
    range: [24, 30],
    name: 'The Focused Performer',
    desc: "You're self-aware, directional, and building good habits. The next level is accountability that turns your clarity into real outcomes. MEGA Breakthrough is your match.",
    cta: 'Explore MEGA Breakthrough →',
  },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
}

function CalcIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <rect x="7" y="5" width="10" height="3" rx="1" fill="currentColor" fillOpacity="0.5" stroke="none" />
      <circle cx="8.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function CloseBtn({ onClose }) {
  return (
    <button
      onClick={onClose}
      style={{
        position: 'absolute', top: 16, right: 16,
        width: 32, height: 32, borderRadius: '50%',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 15, lineHeight: 1,
        transition: 'background 0.2s, color 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
    >✕</button>
  );
}

function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'toolFadeIn 0.22s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: '36px 32px',
          width: '100%', maxWidth: 520,
          maxHeight: '90vh', overflowY: 'auto',
          position: 'relative',
          animation: 'toolModalIn 0.22s ease-out',
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function CalculatorModal({ onClose }) {
  const [hires, setHires] = useState(20);
  const [salary, setSalary] = useState(120000);
  const [turnover, setTurnover] = useState(25);

  const atRisk = Math.round(hires * (turnover / 100));
  const total = Math.round((atRisk * salary * 1.5) + (salary * 0.3 * hires));
  const totalFormatted = 'AED ' + total.toLocaleString('en-US');

  const labelStyle = {
    display: 'block',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 12, fontWeight: 600, letterSpacing: 0.3,
    color: 'rgba(255,255,255,0.5)', marginBottom: 6,
  };
  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, padding: '12px 14px',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif", fontSize: 15,
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <>
      <CloseBtn onClose={onClose} />

      <div style={{
        display: 'inline-block',
        background: 'rgba(15,82,186,0.15)', border: '1px solid rgba(15,82,186,0.4)',
        borderRadius: 6, padding: '3px 12px',
        fontFamily: "'Fira Sans Extra Condensed', sans-serif",
        fontSize: 12, fontWeight: 700, letterSpacing: 2,
        color: '#0F52BA', textTransform: 'uppercase', marginBottom: 16,
      }}>MEGA Management</div>

      <h3 style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: 28, letterSpacing: 1, color: '#fff', marginBottom: 10,
      }}>New Hire Readiness Gap Calculator</h3>

      <p style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 28,
      }}>Enter your numbers to see what unpreparedness is costing your organization each year.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
        <div>
          <label style={labelStyle}>New hires per year</label>
          <input
            type="number" min="1" value={hires} style={inputStyle}
            onChange={e => setHires(Math.max(1, parseInt(e.target.value) || 1))}
            onFocus={e => e.target.style.borderColor = '#0F52BA'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
          />
        </div>
        <div>
          <label style={labelStyle}>Average annual salary (AED)</label>
          <input
            type="number" min="0" value={salary} style={inputStyle}
            onChange={e => setSalary(Math.max(0, parseInt(e.target.value) || 0))}
            onFocus={e => e.target.style.borderColor = '#0F52BA'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
          />
        </div>
        <div>
          <label style={labelStyle}>Annual turnover rate (%)</label>
          <input
            type="number" min="0" max="100" value={turnover} style={inputStyle}
            onChange={e => setTurnover(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
            onFocus={e => e.target.style.borderColor = '#0F52BA'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
          />
        </div>
      </div>

      <div style={{
        background: 'rgba(15,82,186,0.08)', border: '1px solid rgba(15,82,186,0.25)',
        borderRadius: 14, padding: '24px 20px', marginBottom: 20,
      }}>
        <div style={{
          fontFamily: "'Fira Sans Extra Condensed', sans-serif",
          fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 2,
          textTransform: 'uppercase', marginBottom: 8,
        }}>Estimated annual cost of unpreparedness</div>
        <div style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 44, color: '#0F52BA', letterSpacing: 1, lineHeight: 1, marginBottom: 12,
        }}>{totalFormatted}</div>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0,
        }}>
          Based on {atRisk} at-risk hires and a 12-month productivity lag across your full cohort. This is a conservative estimate.
        </p>
      </div>

      <button
        onClick={() => { onClose(); setTimeout(() => scrollToSection('pricing'), 300); }}
        style={{
          display: 'block', width: '100%', textAlign: 'center',
          background: '#0F52BA', color: '#fff', borderRadius: 999,
          padding: '14px 28px', border: 'none', cursor: 'pointer',
          fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14,
          letterSpacing: 0.5, transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px 6px #0F52BA55'; e.currentTarget.style.filter = 'brightness(1.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.filter = 'none'; }}
      >Book a free strategy call →</button>
    </>
  );
}

function QuizModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [animKey, setAnimKey] = useState(0);

  const done = step >= QUESTIONS.length;
  const score = answers.reduce((s, a) => s + a, 0);
  const profile = done ? PROFILES.find(p => score >= p.range[0] && score <= p.range[1]) : null;

  const answer = (val) => {
    setAnswers(prev => [...prev, val]);
    setAnimKey(k => k + 1);
    setStep(s => s + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setAnimKey(k => k + 1);
  };

  const tagStyle = {
    display: 'inline-block',
    background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.4)',
    borderRadius: 6, padding: '3px 12px',
    fontFamily: "'Fira Sans Extra Condensed', sans-serif",
    fontSize: 12, fontWeight: 700, letterSpacing: 2,
    color: '#FF6B6B', textTransform: 'uppercase', marginBottom: 20,
  };

  if (done && profile) {
    return (
      <>
        <CloseBtn onClose={onClose} />
        <div style={tagStyle}>Your Result</div>
        <div style={{ width: 36, height: 2, background: '#FF6B6B', marginBottom: 16 }} />
        <div style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 32, color: '#fff', letterSpacing: 1, lineHeight: 1.1, marginBottom: 16,
        }}>{profile.name}</div>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 28,
        }}>{profile.desc}</p>
        <button
          onClick={() => { onClose(); setTimeout(() => scrollToSection('pricing'), 300); }}
          style={{
            display: 'block', width: '100%', textAlign: 'center',
            background: '#FF6B6B', color: '#fff', borderRadius: 999,
            padding: '14px 28px', border: 'none', cursor: 'pointer',
            fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14,
            letterSpacing: 0.5, transition: 'all 0.2s', marginBottom: 12,
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px 6px #FF6B6B44'; e.currentTarget.style.filter = 'brightness(1.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.filter = 'none'; }}
        >{profile.cta}</button>
        <button
          onClick={reset}
          style={{
            display: 'block', width: '100%', textAlign: 'center',
            background: 'transparent', color: 'rgba(255,255,255,0.4)',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999,
            padding: '12px 28px', cursor: 'pointer',
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 13,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
        >Retake quiz</button>
      </>
    );
  }

  const q = QUESTIONS[step];

  return (
    <>
      <CloseBtn onClose={onClose} />
      <div style={tagStyle}>MEGA Mentorship</div>
      <h3 style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: 28, letterSpacing: 1, color: '#fff', marginBottom: 10,
      }}>Career Clarity Quiz</h3>
      <p style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 24,
      }}>10 questions. Find out where you are on the clarity-to-readiness spectrum.</p>

      <div style={{ display: 'flex', gap: 5, marginBottom: 28 }}>
        {QUESTIONS.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 999,
            background: i < step ? '#FF6B6B' : 'rgba(255,255,255,0.1)',
            transition: 'background 0.3s ease',
          }} />
        ))}
      </div>

      <div key={animKey} style={{ animation: 'toolModalIn 0.22s ease-out' }}>
        <div style={{
          fontFamily: "'Fira Sans Extra Condensed', sans-serif",
          fontSize: 11, color: '#FF6B6B', letterSpacing: 2.5,
          textTransform: 'uppercase', fontWeight: 700, marginBottom: 10,
        }}>{q.dim}</div>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 16, color: '#fff', lineHeight: 1.6,
          fontWeight: 500, marginBottom: 24, minHeight: 56,
        }}>{q.q}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {[['Not at all', 1], ['Somewhat', 2], ['Definitely', 3]].map(([label, val]) => (
            <button
              key={label}
              onClick={() => answer(val)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12, padding: '14px 20px',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 600,
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                width: '100%',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,107,107,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,107,107,0.4)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              }}
            >{label}</button>
          ))}
        </div>

        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center',
        }}>Question {step + 1} of {QUESTIONS.length}</div>
      </div>
    </>
  );
}

export default function MegaTools() {
  const [modal, setModal] = useState(null);

  const btnBase = {
    display: 'flex', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    gap: 16, padding: '28px 24px', borderRadius: 16,
    cursor: 'pointer', transition: 'all 0.2s ease',
    width: '100%', border: '1px solid',
    background: 'none',
  };

  return (
    <section id="tools" className="section-pad" style={{ background: '#111', padding: '100px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }} className="inner-container">

        <div style={{
          fontFamily: "'Fira Sans Extra Condensed', sans-serif",
          fontSize: 13, color: '#0F52BA', letterSpacing: 3,
          textTransform: 'uppercase', marginBottom: 20, fontWeight: 600, textAlign: 'center',
        }}>Free Tools</div>

        <div style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(32px, 4vw, 54px)',
          color: '#fff', textAlign: 'center', letterSpacing: 2, marginBottom: 16,
        }}>See where the gap is — before it costs you</div>

        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 16, color: 'rgba(255,255,255,0.5)',
          textAlign: 'center', marginBottom: 56,
        }}>Two interactive tools. One for organizations, one for individuals. Both free.</div>

        <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          <button
            className="tool-btn"
            onClick={() => setModal('calculator')}
            style={{ ...btnBase, background: 'rgba(15,82,186,0.08)', borderColor: 'rgba(15,82,186,0.25)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(15,82,186,0.15)';
              e.currentTarget.style.borderColor = 'rgba(15,82,186,0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(15,82,186,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(15,82,186,0.08)';
              e.currentTarget.style.borderColor = 'rgba(15,82,186,0.25)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              color: '#0F52BA', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 52, height: 52, borderRadius: 14, background: 'rgba(15,82,186,0.15)',
            }}>
              <CalcIcon />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <div style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 700,
                color: '#fff', lineHeight: 1.3, textAlign: 'center',
              }}>New hire readiness calculator</div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                color: 'rgba(255,255,255,0.45)', fontWeight: 500, textAlign: 'center',
              }}>For HR, People &amp; Operations leaders</div>
            </div>
          </button>

          <button
            className="tool-btn"
            onClick={() => setModal('quiz')}
            style={{ ...btnBase, background: 'rgba(255,107,107,0.07)', borderColor: 'rgba(255,107,107,0.22)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,107,107,0.14)';
              e.currentTarget.style.borderColor = 'rgba(255,107,107,0.45)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,107,107,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,107,107,0.07)';
              e.currentTarget.style.borderColor = 'rgba(255,107,107,0.22)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              color: '#FF6B6B', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 52, height: 52, borderRadius: 14, background: 'rgba(255,107,107,0.12)',
            }}>
              <TargetIcon />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <div style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 700,
                color: '#fff', lineHeight: 1.3, textAlign: 'center',
              }}>Career clarity quiz</div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                color: 'rgba(255,255,255,0.45)', fontWeight: 500, textAlign: 'center',
              }}>For students &amp; young professionals</div>
            </div>
          </button>

        </div>
      </div>

      <Modal open={modal === 'calculator'} onClose={() => setModal(null)}>
        <CalculatorModal onClose={() => setModal(null)} />
      </Modal>
      <Modal open={modal === 'quiz'} onClose={() => setModal(null)}>
        <QuizModal onClose={() => setModal(null)} />
      </Modal>
    </section>
  );
}
