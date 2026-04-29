import { useState } from 'react';
import { Tag } from './VantageShared';

export default function ViewTasks() {
  const subTasks = [
    { name: 'Write a 3-sentence role summary', done: true },
    { name: 'Identify top 3 value contributions', done: true },
    { name: 'Record a 60-second practice run', done: true },
    { name: 'Refine with mentor feedback', done: false },
    { name: 'Deliver to cohort in town hall', done: false },
  ];
  const collapsed = [
    { title: 'Weekly reflection journal — Week 14', tag: 'Growth Mindset', tagColor: 'teal', xp: '+60 XP' },
    { title: 'Refactor CV — results-first formatting', tag: 'CV Development', tagColor: 'cobalt', xp: '+180 XP' },
    { title: 'Complete Time Blocking module', tag: 'Time Management', tagColor: 'grey', xp: '+90 XP' },
  ];

  return (
    <div style={{ padding: '16px 18px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 20, color: '#fff', letterSpacing: 1, marginBottom: 3 }}>SHIP THE WORK.</div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          Small, checkable, accountable. Each task has an effort-impact score so you can pick the highest-leverage thing next.
        </div>
      </div>

      <div style={{ background: '#151530', border: '1px solid rgba(15,82,186,0.35)', borderRadius: 10, padding: '12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div style={{ flex: 1, paddingRight: 10 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 5 }}>
              Draft elevator pitch for your current role
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <Tag label="Personal Branding" color="coral" />
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>Due Tomorrow 6:00 PM</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: '#0F52BA', fontWeight: 700 }}>+120 XP</span>
            </div>
          </div>
          <div style={{ width: 52, height: 52, background: '#0d0d20', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', right: 10, top: 8, width: 7, height: 7, borderRadius: '50%', background: '#0F52BA' }} />
            <div style={{ position: 'absolute', left: 2, bottom: 2, fontFamily: "'Montserrat', sans-serif", fontSize: 5.5, color: 'rgba(255,255,255,0.25)' }}>Effort →</div>
          </div>
        </div>

        <div style={{ marginBottom: 4, fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>
          3 / 5 SUBTASKS
        </div>
        {subTasks.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, flexShrink: 0,
              background: s.done ? '#0F52BA' : 'transparent',
              border: s.done ? '1px solid #0F52BA' : '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {s.done && <span style={{ color: '#fff', fontSize: 8, lineHeight: 1 }}>✓</span>}
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9.5,
              color: s.done ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.7)',
              textDecoration: s.done ? 'line-through' : 'none' }}>{s.name}</div>
          </div>
        ))}
      </div>

      {collapsed.map((t, i) => (
        <div key={i} style={{ background: '#151530', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10,
          padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10.5, fontWeight: 600, color: '#fff', marginBottom: 4, lineHeight: 1.3 }}>{t.title}</div>
            <Tag label={t.tag} color={t.tagColor} />
          </div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: '#0F52BA', fontWeight: 700, flexShrink: 0 }}>{t.xp}</div>
        </div>
      ))}
    </div>
  );
}
