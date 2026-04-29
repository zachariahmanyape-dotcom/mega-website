import { Tag, SectionLabel } from './VantageShared';

export default function ViewCommunity() {
  const channels = [
    { name: 'MEGA Mentorship', members: 214, unread: 3, active: true },
    { name: 'Breakthrough Circle', members: 87, unread: 0, active: false },
  ];
  const companyChannels = [
    { name: 'Orion Group' },
    { name: 'Meridian Co.' },
    { name: 'Atlas Partners' },
  ];
  const messages = [
    { initials: 'FM', name: 'Founder, MEGA', role: 'Founder', badge: 'Pinned', badgeColor: '#FF6B6B', time: '9:00 AM',
      body: '📌 April Town Hall is this Thursday at 7PM GST. We have a guest speaker joining — details in the event card. Mark your calendars.' },
    { initials: 'SK', name: 'Sara K.', role: 'Breakthrough member', badge: null, time: '9:14 AM',
      body: "Can't wait — been looking forward to this all month 🙌" },
    { initials: 'AR', name: 'Ahmed R.', role: 'Foundations member', badge: null, time: '9:22 AM',
      body: 'Just hit my 14-day streak as well. Feeling the momentum 🔥' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ width: 148, borderRight: '1px solid rgba(255,255,255,0.06)', padding: '12px 10px', overflowY: 'auto', flexShrink: 0 }}>
        <SectionLabel>Your Channels</SectionLabel>
        {channels.map(ch => (
          <div key={ch.name} style={{
            padding: '8px 8px', borderRadius: 7, marginBottom: 3, cursor: 'pointer',
            background: ch.active ? 'rgba(15,82,186,0.2)' : 'transparent',
            border: ch.active ? '1px solid rgba(15,82,186,0.3)' : '1px solid transparent',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10.5,
                color: ch.active ? '#fff' : 'rgba(255,255,255,0.55)', fontWeight: ch.active ? 700 : 400 }}>
                # {ch.name}
              </div>
              {ch.unread > 0 && (
                <div style={{ background: '#0F52BA', borderRadius: 99, width: 16, height: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Montserrat', sans-serif", fontSize: 8, fontWeight: 700, color: '#fff' }}>
                  {ch.unread}
                </div>
              )}
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8.5, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>
              {ch.members} members
            </div>
          </div>
        ))}

        <div style={{ marginTop: 16 }}>
          <SectionLabel>Company Channels</SectionLabel>
          {companyChannels.map(ch => (
            <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: 5,
              padding: '7px 8px', borderRadius: 7, marginBottom: 3, opacity: 0.45 }}>
              <span style={{ fontSize: 9 }}>🔒</span>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{ch.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          fontFamily: "'Bebas Neue', cursive", fontSize: 15, color: '#A3E4DB', letterSpacing: 1 }}>
          # MEGA MENTORSHIP
        </div>
        <div style={{ flex: 1, padding: '10px 14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: i === 0 ? 'rgba(255,107,107,0.25)' : 'rgba(15,82,186,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700,
                color: i === 0 ? '#ff9a9a' : '#7aaef5' }}>
                {m.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 3, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, color: '#fff' }}>{m.name}</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{m.role}</span>
                  {m.badge && <Tag label={m.badge} color="coral" />}
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.25)', marginLeft: 'auto' }}>{m.time}</span>
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{m.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: '#151530', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7,
            padding: '8px 12px', fontFamily: "'Montserrat', sans-serif", fontSize: 10.5, color: 'rgba(255,255,255,0.25)' }}>
            Message #MEGA Mentorship
          </div>
          <div style={{ background: '#0F52BA', borderRadius: 7, padding: '8px 14px',
            fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            Send
          </div>
        </div>
      </div>
    </div>
  );
}
