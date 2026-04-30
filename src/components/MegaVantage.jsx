import { useState } from 'react';
import { Sidebar } from './vantage/VantageShared';
import ViewDashboard from './vantage/ViewDashboard';
import ViewSessions from './vantage/ViewSessions';
import ViewTasks from './vantage/ViewTasks';
import ViewResources from './vantage/ViewResources';
import ViewCommunity from './vantage/ViewCommunity';
import ViewProfile from './vantage/ViewProfile';

const VANTAGE_FEATURES = [
  { id: 'dashboard', name: 'Personal Dashboard', sidebarView: 'dashboard',
    desc: 'Your command center. Upcoming sessions, weekly activity, streaks, skill level, and tasks all in one view the moment you log in.' },
  { id: 'sessions', name: 'Session Scheduling', sidebarView: 'sessions',
    desc: 'Book, view, and join your 1:1 mentorship sessions and town halls directly from Vantage. Every session, one place.' },
  { id: 'tasks', name: 'Tasks & Goals', sidebarView: 'tasks',
    desc: 'Break your growth roadmap into weekly tasks with subtasks, deadlines, and XP rewards. Every action moves you forward.' },
  { id: 'resources', name: 'Resources Library', sidebarView: 'resources',
    desc: 'Templates, frameworks, guides, and tools curated by MEGA mentors — organized, searchable, always available.' },
  { id: 'community', name: 'Community Channel', sidebarView: 'community',
    desc: 'Stay connected with your cohort, receive mentor announcements, and access company channels in one place.' },
  { id: 'profile', name: 'Profile & Achievements', sidebarView: 'profile',
    desc: 'Your full learning record: badges, streaks, stats, and personal info — all on one page.' },
];

function renderView(viewId) {
  switch (viewId) {
    case 'sessions':  return <ViewSessions />;
    case 'tasks':     return <ViewTasks />;
    case 'resources': return <ViewResources />;
    case 'community': return <ViewCommunity />;
    case 'profile':   return <ViewProfile />;
    default:          return <ViewDashboard />;
  }
}

export default function MegaVantage() {
  const [activeId, setActiveId] = useState('dashboard');
  const [openId, setOpenId] = useState('dashboard');
  const [fading, setFading] = useState(false);

  const activeFeature = VANTAGE_FEATURES.find(f => f.id === activeId);

  const switchTo = (id) => {
    if (id === activeId) { setOpenId(prev => prev === id ? null : id); return; }
    setFading(true);
    setTimeout(() => { setActiveId(id); setOpenId(id); setFading(false); }, 200);
  };

  return (
    <section id="vantage" className="section-pad" style={{ background: '#0A0A0A', padding: '100px 0',
      borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }} className="inner-container">

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 64, alignItems: 'start' }}
          className="vantage-grid">

          {/* Left — feature accordion */}
          <div>
            <div style={{ fontFamily: "'Fira Sans Extra Condensed', sans-serif", fontSize: 13,
              color: '#A3E4DB', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>
              Meet Vantage.
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(32px,4vw,48px)',
              color: '#fff', lineHeight: 1.05, letterSpacing: 1.5, marginBottom: 36 }}>
              THE PLATFORM THAT POWERS YOUR GROWTH.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {VANTAGE_FEATURES.map((f, i) => {
                const isActive = activeId === f.id;
                const isOpen = openId === f.id;
                return (
                  <div key={f.id} onClick={() => switchTo(f.id)} style={{
                    borderBottom: i < VANTAGE_FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    padding: '14px 0', cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 600,
                        color: isActive ? '#0F52BA' : 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}>
                        {f.name}
                      </div>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        border: `1px solid ${isActive ? '#0F52BA' : 'rgba(255,255,255,0.2)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, color: isActive ? '#0F52BA' : 'rgba(255,255,255,0.4)',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        transition: 'all 0.25s', flexShrink: 0,
                      }}>+</div>
                    </div>
                    <div style={{ maxHeight: isOpen ? 80 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13,
                        color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, paddingTop: 8, paddingRight: 28 }}>
                        {f.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — browser frame (hidden on mobile via CSS) */}
          <div className="vantage-browser-frame">
            <div style={{
              background: '#1a1a2e', borderRadius: 12,
              boxShadow: '0 36px 90px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              {/* Title bar */}
              <div style={{ height: 36, background: '#12121e', borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
                <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                  {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 5, padding: '3px 14px', maxWidth: 240,
                    fontFamily: "'Montserrat', sans-serif", fontSize: 10.5,
                    color: 'rgba(255,255,255,0.35)', letterSpacing: 0.3, textAlign: 'center',
                  }}>
                    vantage.mega-mentorship.com
                  </div>
                </div>
                <div style={{ width: 50 }} />
              </div>

              {/* App content */}
              <div style={{ display: 'flex', height: 490 }}>
                <Sidebar activeView={activeId} onSelect={(v) => {
                  const feat = VANTAGE_FEATURES.find(f => f.sidebarView === v);
                  if (feat) switchTo(feat.id);
                }} />
                <div style={{
                  flex: 1, overflow: 'hidden',
                  opacity: fading ? 0 : 1,
                  transform: fading ? 'scale(0.98)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                }}>
                  {renderView(activeFeature?.sidebarView || 'dashboard')}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 14,
              fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
              Click a feature on the left to explore Vantage
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 64 }}>
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
