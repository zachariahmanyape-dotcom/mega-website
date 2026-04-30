import { useState, useEffect, useRef } from 'react';

const FAQS = [
  {
    q: 'Who is MEGA Mentorship for?',
    a: "MEGA Mentorship is designed for students, recent graduates, and young professionals who want to build the skills, habits, and clarity to accelerate their careers. Whether you're in university or just starting out, MEGA gives you the structure and support most people never get.",
  },
  {
    q: 'What makes MEGA different from other mentorship programs?',
    a: "MEGA isn't just about advice. It's a structured, accountable system combining real mentorship, practical skills training, and the Vantage platform, built specifically for the UAE and MENA context.",
  },
  {
    q: 'How does MEGA Management work?',
    a: 'MEGA Management is delivered as a structured 4 or 8-week program in which our team works with your cohort twice a week in 90-minute live sessions. We cover professional mindset, communication, execution habits, and real-world task simulations, then hand you a full performance report at the end.',
  },
  {
    q: 'What is Vantage?',
    a: "Vantage is MEGA's proprietary web platform. Members use it to access sessions, track habits and streaks, complete coursework, manage tasks, and stay connected with their mentor and peers, all in one place.",
  },
  {
    q: 'How do I sign up?',
    a: 'Simply click any Get Started button on this page and fill out our short inquiry form. Our team will follow up within 24 hours to discuss your goals and find the right fit.',
  },
  {
    q: 'Does MEGA work with schools and universities?',
    a: 'Yes. MEGA partners with academic institutions to bring structured career readiness directly to students, positioning the institution as a competitive differentiator for graduate outcomes.',
  },
];

function FAQItem({ item, index, isOpen, onToggle }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const fromLeft = index % 2 === 0;

  return (
    <div ref={ref} style={{
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      opacity: visible ? 1 : 0,
      transform: visible
        ? 'translateX(0) translateY(0)'
        : `translateX(${fromLeft ? '-80px' : '80px'}) translateY(10px)`,
      transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s cubic-bezier(0.34,1.3,0.64,1) ${index * 0.07}s`,
    }}>
      <div onClick={onToggle} style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 0', cursor: 'pointer',
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 600,
          color: '#fff', paddingRight: 32, lineHeight: 1.4,
        }}>{item.q}</div>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          border: `1px solid ${isOpen ? '#0F52BA' : 'rgba(255,255,255,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: isOpen ? '#0F52BA' : 'rgba(255,255,255,0.5)',
          transform: isOpen ? 'rotate(45deg)' : 'none',
          transition: 'all 0.3s ease', flexShrink: 0,
        }}>+</div>
      </div>
      <div style={{
        maxHeight: isOpen ? 300 : 0, overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div className="faq-answer" style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 14,
          color: 'rgba(255,255,255,0.6)', lineHeight: 1.8,
          paddingBottom: 24, paddingRight: 48,
        }}>{item.a}</div>
      </div>
    </div>
  );
}

export default function MegaFAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i);

  return (
    <section id="faq" className="faq-section" style={{ background: '#111', padding: '100px 0 0', position: 'relative' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px' }} className="inner-container">
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(32px,4vw,54px)',
          color: '#fff', textAlign: 'center', letterSpacing: 2, marginBottom: 16 }}>
          FREQUENTLY ASKED QUESTIONS.
        </div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16,
          color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 60 }}>
          Everything you need to know before getting started.
        </div>

        <div>
          {FAQS.map((item, i) => (
            <FAQItem key={i} item={item} index={i}
              isOpen={openIdx === i} onToggle={() => toggle(i)} />
          ))}
        </div>
      </div>

      <div style={{
        height: 160, marginTop: 60,
        background: 'linear-gradient(to bottom, #111 0%, #0A0A0A 100%)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
