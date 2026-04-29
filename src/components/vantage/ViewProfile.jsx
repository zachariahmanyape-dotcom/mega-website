import { useState } from 'react';
import { Tag, SectionLabel } from './VantageShared';

export default function ViewProfile() {
  const earnedBadges = [
    { name: 'First 1:1', desc: 'Completed first mentorship session' },
    { name: '7-Day Streak', desc: 'Seven consecutive active days' },
    { name: '14-Day Streak', desc: 'Two weeks of consistency' },
    { name: 'First Goal', desc: 'Set and completed your first goal' },
    { name: 'Comms Mastered', desc: 'Subject: Professional Communication' },
    { name: 'Town Hall Regular', desc: 'Attended 4+ town halls' },
  ];
  const lockedBadges = [
    '30-Day Streak', 'Subject: Time Mgmt', 'Public Speaker',
    "Mentor's Favourite", 'Elite Rank', 'Perfect Month',
  ];
  const [darkMode, setDarkMode] = useState(true);
  const [notifs, setNotifs] = useState(true);

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px' }}>
        <div style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12,
          padding: '16px', display: 'flex', gap: 14, alignItems: 'center', marginBottom: 10 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(15,82,186,0.3)',
            border: '2px solid rgba(15,82,186,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 700, color: '#0F52BA', flexShrink: 0 }}>AK</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 20, color: '#fff', letterSpacing: 1, marginBottom: 4 }}>AMIRA KHALED</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              <Tag label="Mentorship" color="cobalt" />
              <Tag label="Breakthrough" color="cobalt" />
              <Tag label="Skilled Tier 3" color="teal" />
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: '#0F52BA', lineHeight: 1 }}>4,260</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8.5, color: 'rgba(255,255,255,0.4)' }}>total points</div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 18, color: '#FF6B6B', lineHeight: 1, marginTop: 2 }}>14 🔥</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 10 }}>
          {[['87h 12m','Total Learning'],['11','Sessions done'],['23','Modules done'],['22 days','Longest Streak']].map(([n,l]) => (
            <div key={l} style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 17, color: '#0F52BA', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2, lineHeight: 1.3 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 14, color: '#fff', letterSpacing: 1, marginBottom: 8 }}>BADGE WALL</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 6 }}>
          {earnedBadges.map(b => (
            <div key={b.name} style={{ background: 'linear-gradient(135deg, #0f2d6e, #1a1a50)', border: '1px solid rgba(15,82,186,0.4)',
              borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>⭐</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8, fontWeight: 700, color: '#fff', marginBottom: 2, lineHeight: 1.3 }}>{b.name}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 7.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.3 }}>{b.desc}</div>
            </div>
          ))}
          {lockedBadges.map(b => (
            <div key={b} style={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.07)', opacity: 0.4,
              borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, marginBottom: 4, filter: 'grayscale(1)' }}>🔒</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.5)', lineHeight: 1.3 }}>{b}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: 150, borderLeft: '1px solid rgba(255,255,255,0.06)', padding: '14px 10px', overflowY: 'auto', flexShrink: 0 }}>
        <SectionLabel>Personal Info</SectionLabel>
        {[['Role','Analyst'],['Field','Consulting'],['Status','Working Pro'],['Focus','Pro. Comms']].map(([k,v]) => (
          <div key={k} style={{ marginBottom: 9 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8.5, color: 'rgba(255,255,255,0.35)' }}>{k}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, color: '#fff' }}>{v}</div>
          </div>
        ))}

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10, marginTop: 6 }}>
          <SectionLabel>Interests</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {['Strategy','Reading','Running','Travel'].map(t => <Tag key={t} label={t} color="grey" />)}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10, marginTop: 10 }}>
          <SectionLabel>Appearance</SectionLabel>
          {[['Dark Mode', darkMode, setDarkMode], ['Notifications', notifs, setNotifs]].map(([label, val, set]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9.5, color: 'rgba(255,255,255,0.6)' }}>{label}</div>
              <div onClick={() => set(!val)} style={{
                width: 28, height: 14, borderRadius: 7, cursor: 'pointer',
                background: val ? '#0F52BA' : 'rgba(255,255,255,0.15)',
                transition: 'background 0.2s', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: 2, left: val ? 16 : 2, width: 10, height: 10,
                  borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
