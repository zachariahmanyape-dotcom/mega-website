import { useState, useRef } from 'react';

const STAGES = ['Onboarding', 'Adjustment', 'Skill Adoption', 'Independent\nExecution', 'High-Value\nPerformer'];
const withMEGA = [0.08, 0.28, 0.55, 0.78, 0.95];
const withoutMEGA = [0.06, 0.14, 0.28, 0.46, 0.65];

function lerp(a, b, t) { return a + (b - a) * t; }

export default function MegaAbout() {
  const [scrubX, setScrubX] = useState(null);
  const [hovered, setHovered] = useState(false);
  const svgRef = useRef(null);

  const W = 520, H = 260, PAD_L = 20, PAD_R = 20, PAD_T = 24, PAD_B = 48;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;
  const n = STAGES.length;

  const getX = (i) => PAD_L + i / (n - 1) * chartW;
  const getY = (v) => PAD_T + (1 - v) * chartH;

  const megaPts = withMEGA.map((v, i) => [getX(i), getY(v)]);
  const nonePts = withoutMEGA.map((v, i) => [getX(i), getY(v)]);

  const toPath = (pts) => {
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i - 1][0] + pts[i][0]) / 2;
      d += ` C ${cpx} ${pts[i - 1][1]}, ${cpx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`;
    }
    return d;
  };

  const scrub = scrubX !== null ? Math.max(0, Math.min(1, scrubX)) : 0.5;
  const scrubPxX = PAD_L + scrub * chartW;
  const posInSegments = scrub * (n - 1);
  const seg = Math.floor(posInSegments);
  const t = posInSegments - seg;
  const cSeg = Math.min(seg, n - 2);
  const megaY = lerp(withMEGA[cSeg], withMEGA[Math.min(cSeg + 1, n - 1)], t);
  const noneY = lerp(withoutMEGA[cSeg], withoutMEGA[Math.min(cSeg + 1, n - 1)], t);

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setScrubX((x - PAD_L) / chartW);
  };

  const metrics = [
    '50% faster time to productivity',
    '50–60% better retention',
    '+24% higher profit margin',
    '3–5x cost to replace vs. retain',
  ];

  return (
    <section id="about" className="section-pad" style={{ background: '#111111', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px',
        display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'start' }}
        className="about-grid inner-container">

        <div>
          <div style={{ fontFamily: "'Fira Sans Extra Condensed', sans-serif", fontSize: 13,
            color: '#0F52BA', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20, fontWeight: 600 }}>
            About MEGA
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(36px, 4vw, 54px)',
            color: '#fff', lineHeight: 1.05, letterSpacing: 1, marginBottom: 28 }}>
            Most people are capable. Few are guided.{'\n'}MEGA changes that.
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15,
            color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 0 }}>
            MEGA was built for exactly this moment and exactly this region. The Middle East is one of the
            youngest, fastest-growing regions in the world, yet its youth are entering adulthood without
            the guidance, soft skills, or career clarity they need to compete. MEGA closes that gap.
          </p>
        </div>

        <div>
          <div style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: '28px 24px 20px', userSelect: 'none' }}>
            <div style={{ fontFamily: "'Fira Sans Extra Condensed', sans-serif", fontSize: 13,
              color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
              Performance Maturity Curve
            </div>

            <svg ref={svgRef} width="100%" viewBox={`0 0 ${W} ${H}`}
              style={{ cursor: 'crosshair', display: 'block' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => { setHovered(false); setScrubX(null); }}>

              {[0.25, 0.5, 0.75, 1].map((v) => (
                <line key={v} x1={PAD_L} y1={getY(v)} x2={PAD_L + chartW} y2={getY(v)}
                  stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}

              <path d={toPath(nonePts)} fill="none" stroke="rgba(255,255,255,0.25)"
                strokeWidth="2" strokeDasharray="6 4" />

              <path d={toPath(megaPts)} fill="none" stroke="#0F52BA" strokeWidth="2.5" />

              <path d={toPath(megaPts) + ` L ${getX(n - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`}
                fill="#0F52BA" fillOpacity="0.07" />

              {(hovered || true) && (
                <line x1={scrubPxX} y1={PAD_T} x2={scrubPxX} y2={PAD_T + chartH}
                  stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3" />
              )}

              <circle cx={scrubPxX} cy={getY(megaY)} r="5" fill="#0F52BA" />
              <circle cx={scrubPxX} cy={getY(noneY)} r="5" fill="rgba(255,255,255,0.4)" />

              {(() => {
                const bx = scrubPxX;
                const by = getY((megaY + noneY) / 2) - 14;
                return (
                  <g>
                    <rect x={bx - 44} y={by - 12} width="88" height="22" rx="11"
                      fill="#FF6B6B" fillOpacity="0.9" />
                    <text x={bx} y={by + 5} textAnchor="middle"
                      fontFamily="'Montserrat', sans-serif" fontSize="10" fontWeight="700"
                      fill="#fff">~50% faster</text>
                  </g>
                );
              })()}

              {STAGES.map((label, i) => {
                const lines = label.split('\n');
                return lines.map((line, li) => (
                  <text key={`${i}-${li}`} x={getX(i)} y={PAD_T + chartH + 16 + li * 13}
                    textAnchor="middle" fontFamily="'Montserrat', sans-serif"
                    fontSize="9.5" fill="rgba(255,255,255,0.4)" fontWeight="500">
                    {line}
                  </text>
                ));
              })}

              <line x1={PAD_L} y1={14} x2={PAD_L + 20} y2={14} stroke="#0F52BA" strokeWidth="2.5" />
              <text x={PAD_L + 26} y={18} fontFamily="'Montserrat', sans-serif" fontSize="10"
                fill="rgba(255,255,255,0.7)" fontWeight="600">With MEGA</text>
              <line x1={PAD_L + 105} y1={14} x2={PAD_L + 125} y2={14}
                stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5 3" />
              <text x={PAD_L + 131} y={18} fontFamily="'Montserrat', sans-serif" fontSize="10"
                fill="rgba(255,255,255,0.4)">Without structured readiness</text>
            </svg>

            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10,
              color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 4 }}>
              ← Drag or hover to explore each stage
            </div>
          </div>

          <div className="about-metrics" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
            {metrics.map((m) => (
              <div key={m} style={{
                background: 'rgba(15,82,186,0.1)', border: '1px solid rgba(15,82,186,0.25)',
                borderRadius: 10, padding: '10px 14px',
                fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                color: 'rgba(255,255,255,0.8)', fontWeight: 600, lineHeight: 1.4,
              }}>{m}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
