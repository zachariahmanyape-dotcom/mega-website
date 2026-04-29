import { useState } from 'react';

function PricingCard({ badge, badgeColor, title, price, subPrice, features, ctaLabel, ctaStyle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      background: hovered ? '#181828' : '#111',
      border: hovered ? '1px solid #0F52BA' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20, padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 0,
      position: 'relative',
      boxShadow: hovered
        ? '0 0 18px rgba(15,82,186,0.22), 0 12px 40px rgba(0,0,0,0.5)'
        : '0 8px 32px rgba(0,0,0,0.3)',
      transition: 'all 0.2s ease',
      cursor: 'default',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div style={{ display: 'inline-block', background: `${badgeColor}22`,
        border: `1px solid ${badgeColor}55`, borderRadius: 6, padding: '4px 12px',
        fontFamily: "'Fira Sans Extra Condensed', sans-serif", fontSize: 13, fontWeight: 700,
        color: badgeColor, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20, alignSelf: 'flex-start' }}>
        {badge}
      </div>

      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26, color: '#fff',
        letterSpacing: 1, marginBottom: 8 }}>{title}</div>

      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 44, color: '#fff',
        letterSpacing: 1, lineHeight: 1, marginBottom: subPrice ? 6 : 24 }}>{price}</div>

      {subPrice && (
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13,
          color: 'rgba(255,255,255,0.45)', marginBottom: 24, lineHeight: 1.5 }}>{subPrice}</div>
      )}

      <div style={{ flex: 1, marginBottom: 32 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10,
            marginBottom: 12, fontFamily: "'Montserrat', sans-serif",
            fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
            <span style={{ color: '#0F52BA', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
            {f}
          </div>
        ))}
      </div>

      <a href="https://tally.so/r/MEGA" target="_blank" rel="noopener noreferrer" style={{
        display: 'block', textAlign: 'center', borderRadius: 999,
        padding: '14px 28px', fontFamily: "'Montserrat', sans-serif",
        fontWeight: 700, fontSize: 14, textDecoration: 'none', letterSpacing: 0.5,
        transition: 'all 0.2s',
        ...(ctaStyle === 'cobalt'
          ? { background: '#0F52BA', color: '#fff' }
          : { background: 'transparent', color: '#A3E4DB', border: '1px solid #A3E4DB' }),
      }}
        onMouseEnter={e => {
          e.stopPropagation();
          if (ctaStyle === 'cobalt') { e.currentTarget.style.boxShadow = '0 0 24px 6px #0F52BA66'; e.currentTarget.style.filter = 'brightness(1.2)'; }
          else { e.currentTarget.style.background = 'rgba(163,228,219,0.1)'; }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.filter = 'none';
          if (ctaStyle !== 'cobalt') e.currentTarget.style.background = 'transparent';
        }}>
        {ctaLabel}
      </a>
    </div>
  );
}

export default function MegaPricing() {
  return (
    <section id="pricing" style={{ background: '#111', padding: '100px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(32px,4vw,54px)',
          color: '#fff', textAlign: 'center', letterSpacing: 2, marginBottom: 16 }}>
          SIMPLE PRICING. SERIOUS RESULTS.
        </div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16,
          color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 72 }}>
          Choose the plan that fits where you are.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, alignItems: 'start' }}
          className="pricing-grid">
          <PricingCard
            badge="Foundations" badgeColor="#FF6B6B"
            title="MEGA Mentorship Foundations"
            price="AED 500 / month"
            features={[
              'Weekly Town Halls',
              'Access to Vantage (Coursework & Resources)',
              'Habit Tracking Tools',
              'Goal-Setting Frameworks',
              'Community Support',
              'Focus Timer & Progress Dashboard',
            ]}
            ctaLabel="Get Started" ctaStyle="cobalt"
          />
          <PricingCard
            badge="Breakthrough" badgeColor="#0F52BA"
            title="MEGA Mentorship Breakthrough"
            price="AED 1,000 / month"
            features={[
              'Everything in Foundations, plus:',
              'Weekly 1:1 Mentorship Calls',
              'Personalized Growth Roadmap',
              'Personal Feedback & Accountability',
              'Career, Academic & Life Coaching',
            ]}
            ctaLabel="Get Started" ctaStyle="cobalt"
          />
          <PricingCard
            badge="Management" badgeColor="#A3E4DB"
            title="MEGA Management"
            price="Custom Pricing"
            subPrice="Contact us to discuss your team's needs."
            features={[
              'Corporate Mindset & Professional Expectations',
              'Cross-Functional Communication',
              'Real-World Task Simulations',
              'Feedback Training',
              'Pilot (4 wks) or Standard Program (8 wks)',
              'Twice-weekly 90-min live sessions',
              'Cohort intake assessment',
              'Mid-point check-in',
              'Closing assessment & full performance report',
              'Leadership debrief call',
            ]}
            ctaLabel="Get in Touch" ctaStyle="teal"
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: 40,
          fontFamily: "'Montserrat', sans-serif", fontSize: 12,
          color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
          All plans include a pre-program intake assessment.<br />
          MEGA Management programs support a minimum of 6 employees per cohort.
        </div>
      </div>
    </section>
  );
}
