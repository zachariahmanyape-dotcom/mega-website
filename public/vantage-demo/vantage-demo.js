/* Vantage Platform Demo — vanilla JS, self-contained.
   Exposes window.mountVantageDemo(containerId). */
(function () {
  if (window.__vantageDemoLoaded) return;
  window.__vantageDemoLoaded = true;

  // ── Design tokens ─────────────────────────────────────────────────────────
  var T = {
    bg: '#0D0F1A',
    card: '#151827',
    cardHi: '#1C2035',
    sapphire: '#1A3FA5',
    sapphireSoft: 'rgba(26,63,165,0.18)',
    coral: '#FF6B6B',
    teal: '#4FB7A6',
    gold: '#E0B25C',
    border: 'rgba(255,255,255,0.07)',
    body: 'rgba(255,255,255,0.87)',
    muted: 'rgba(255,255,255,0.45)',
    dim: 'rgba(255,255,255,0.3)'
  };

  // ── Font loader ──────────────────────────────────────────────────────────
  function ensureFonts() {
    if (document.getElementById('vd-fonts')) return;
    var link = document.createElement('link');
    link.id = 'vd-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }

  // ── Scoped CSS ───────────────────────────────────────────────────────────
  function ensureStyles() {
    if (document.getElementById('vd-styles')) return;
    var s = document.createElement('style');
    s.id = 'vd-styles';
    s.textContent = [
      '.vd-root, .vd-root *, .vd-root *::before, .vd-root *::after { box-sizing: border-box; }',
      '.vd-root { font-family: "Montserrat", system-ui, sans-serif; color: ' + T.body + '; line-height: 1.4; font-size: 13px; }',
      '.vd-root button { font-family: inherit; cursor: pointer; border: 0; color: inherit; }',
      '.vd-h { font-family: "Bebas Neue", sans-serif; letter-spacing: 1.2px; color: #fff; }',
      '.vd-frame { max-width: 1080px; margin: 0 auto; background: ' + T.bg + '; border-radius: 16px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 0 1px ' + T.border + '; }',
      '.vd-caption { max-width: 880px; margin: 20px auto 0; text-align: center; color: ' + T.muted + '; font-size: 13px; line-height: 1.55; padding: 0 16px; transition: opacity .2s; }',
      '.vd-caption strong { color: #fff; font-weight: 600; margin-right: 4px; }',
      '.vd-chrome { display:flex; align-items:center; gap:8px; padding:9px 14px; background:#0a0c14; border-bottom:1px solid ' + T.border + '; }',
      '.vd-dot { width:11px; height:11px; border-radius:50%; }',
      '.vd-url { flex:1; text-align:center; font-size:11px; color:' + T.muted + '; background:rgba(255,255,255,.04); border:1px solid ' + T.border + '; border-radius:6px; padding:3px 12px; max-width:340px; margin:0 auto; }',
      '.vd-body { display:flex; height:620px; }',
      '.vd-sidebar { width:200px; background:#0a0c14; border-right:1px solid ' + T.border + '; display:flex; flex-direction:column; padding:18px 12px 12px; gap:2px; flex-shrink:0; }',
      '.vd-logo { display:flex; align-items:center; gap:10px; padding:0 6px 18px; }',
      '.vd-logo-mark { width:32px; height:32px; background:#fff; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#0D0F1A; font-family:"Bebas Neue",sans-serif; font-size:18px; font-weight:700; }',
      '.vd-logo-name { font-family:"Bebas Neue",sans-serif; font-size:18px; letter-spacing:1.5px; color:#fff; line-height:1; }',
      '.vd-logo-sub { font-size:9px; color:' + T.muted + '; letter-spacing:1.2px; margin-top:2px; }',
      '.vd-sb-label { font-size:9px; color:' + T.dim + '; letter-spacing:1.5px; text-transform:uppercase; padding:6px 8px 4px; }',
      '.vd-navbtn { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:8px; background:transparent; color:' + T.muted + '; font-size:13px; font-weight:500; text-align:left; width:100%; transition:all .15s; }',
      '.vd-navbtn:hover { background:rgba(255,255,255,.04); color:#fff; }',
      '.vd-navbtn.active { background:' + T.sapphire + '; color:#fff; }',
      '.vd-navbtn .vd-svg { color:inherit; }',
      '.vd-sb-foot { margin-top:auto; padding:10px; background:rgba(255,255,255,.03); border-radius:10px; display:flex; align-items:center; gap:10px; }',
      '.vd-main { flex:1; overflow-y:auto; padding:22px 26px; }',
      '.vd-tabbar { display:none; }',
      '.vd-topbar { display:flex; align-items:center; gap:8px; justify-content:flex-end; margin-bottom:14px; }',
      '.vd-iconbtn { width:32px; height:32px; min-height:32px; min-width:32px; background:rgba(255,255,255,.04); border:1px solid ' + T.border + '; border-radius:8px; display:flex; align-items:center; justify-content:center; color:' + T.muted + '; }',
      '.vd-chip { display:inline-flex; align-items:center; gap:6px; background:' + T.card + '; border:1px solid ' + T.border + '; border-radius:6px; padding:4px 9px; font-size:11px; color:' + T.body + '; }',
      '.vd-chip.coral { color:' + T.coral + '; border-color:rgba(255,107,107,.3); background:rgba(255,107,107,.08); }',
      '.vd-chip.sapphire { color:#A9C0F0; border-color:rgba(26,63,165,.4); background:rgba(26,63,165,.15); }',
      '.vd-chip.teal { color:' + T.teal + '; border-color:rgba(79,183,166,.3); background:rgba(79,183,166,.1); }',
      '.vd-chip.dot::before { content:""; width:6px; height:6px; border-radius:50%; background:currentColor; }',
      '.vd-card { background:' + T.card + '; border:1px solid ' + T.border + '; border-radius:12px; padding:14px 16px; }',
      '.vd-card.hi { background:' + T.cardHi + '; }',
      '.vd-btn { background:' + T.sapphire + '; color:#fff; border-radius:8px; padding:9px 16px; font-weight:600; font-size:12px; min-height:36px; display:inline-flex; align-items:center; gap:6px; justify-content:center; }',
      '.vd-btn.ghost { background:transparent; border:1px solid ' + T.border + '; color:' + T.body + '; }',
      '.vd-btn.coral { background:' + T.coral + '; }',
      '.vd-pill { display:inline-block; font-size:9px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; padding:3px 8px; border-radius:6px; }',
      '.vd-pill.sapphire { background:rgba(26,63,165,.2); color:#A9C0F0; }',
      '.vd-pill.teal { background:rgba(79,183,166,.15); color:' + T.teal + '; }',
      '.vd-pill.coral { background:rgba(255,107,107,.15); color:' + T.coral + '; }',
      '.vd-pill.muted { background:rgba(255,255,255,.06); color:' + T.muted + '; }',
      '.vd-pill.dot::before { content:""; display:inline-block; width:6px; height:6px; border-radius:50%; background:currentColor; margin-right:5px; vertical-align:middle; }',
      '.vd-eyebrow { font-size:10px; color:' + T.muted + '; letter-spacing:2px; text-transform:uppercase; margin-bottom:6px; }',
      '.vd-greeting { font-family:"Bebas Neue", sans-serif; font-size:30px; letter-spacing:1.5px; color:#fff; margin-bottom:6px; }',
      '.vd-greeting .name { color:' + T.coral + '; }',
      '.vd-pagetitle { font-family:"Bebas Neue", sans-serif; font-size:30px; letter-spacing:1.5px; color:#fff; margin-bottom:6px; }',
      '.vd-sub { color:' + T.muted + '; font-size:12px; margin-bottom:18px; max-width:560px; line-height:1.5; }',
      '.vd-grid { display:grid; gap:12px; }',
      '.vd-bar { width:100%; height:6px; border-radius:3px; background:rgba(255,255,255,.06); overflow:hidden; }',
      '.vd-bar > div { height:100%; background:' + T.sapphire + '; border-radius:3px; }',
      '.vd-row { display:flex; align-items:center; gap:12px; padding:10px 12px; border-radius:8px; transition:background .15s; }',
      '.vd-row:hover { background:rgba(255,255,255,.03); }',
      '.vd-check { width:18px; height:18px; min-width:18px; border:1.5px solid ' + T.muted + '; border-radius:5px; display:flex; align-items:center; justify-content:center; background:transparent; transition:all .15s; font-size:11px; color:#fff; padding:0; }',
      '.vd-check.checked { background:' + T.sapphire + '; border-color:' + T.sapphire + '; }',
      '.vd-row.done .vd-task-title { text-decoration:line-through; color:' + T.muted + '; }',
      '.vd-subtab { padding:7px 14px; font-size:12px; font-weight:600; color:' + T.muted + '; border-radius:8px; background:transparent; min-height:32px; }',
      '.vd-subtab.active { background:' + T.cardHi + '; color:#fff; }',
      '.vd-modal { position:fixed; inset:0; background:rgba(0,0,0,.75); display:flex; align-items:center; justify-content:center; z-index:9999; padding:20px; }',
      '.vd-modal-card { background:' + T.card + '; border-radius:12px; padding:22px; max-width:720px; width:100%; max-height:85vh; overflow-y:auto; border:1px solid ' + T.border + '; }',
      '.vd-modal-close { float:right; background:transparent; color:' + T.muted + '; font-size:18px; padding:0; width:30px; height:30px; }',
      '.vd-tooltip { position:fixed; background:#000; color:#fff; padding:5px 9px; font-size:11px; border-radius:6px; pointer-events:none; z-index:10000; opacity:0; transition:opacity .15s; }',
      '.vd-tooltip.show { opacity:1; }',
      '.vd-svg { width:16px; height:16px; flex-shrink:0; }',
      '.vd-avatar { width:32px; height:32px; min-width:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; color:#fff; }',
      '.vd-avatar.sm { width:26px; height:26px; min-width:26px; font-size:10px; }',
      '.vd-avatar.lg { width:56px; height:56px; min-width:56px; font-size:18px; }',
      '.vd-badge { aspect-ratio:1; border-radius:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; padding:8px 6px; text-align:center; font-size:10px; font-weight:600; line-height:1.3; background:' + T.cardHi + '; }',
      '.vd-badge .ic { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; background:linear-gradient(135deg, #FF6B6B, #C44BD9); }',
      '.vd-badge.locked .ic { background:rgba(255,255,255,.06); color:' + T.muted + '; }',
      '.vd-badge.locked { color:' + T.muted + '; }',
      '@media (max-width: 768px) {',
      '  .vd-frame { border-radius: 12px; }',
      '  .vd-url { font-size:10px; max-width:200px; padding:3px 8px; }',
      '  .vd-dot { width:9px; height:9px; }',
      '  .vd-body { display:block; height:auto; min-height:560px; }',
      '  .vd-sidebar { display:none; }',
      '  .vd-tabbar { display:flex; position:sticky; bottom:0; background:#0a0c14; border-top:1px solid ' + T.border + '; padding:6px 4px; justify-content:space-around; z-index:5; overflow-x:auto; }',
      '  .vd-tabbar .vd-navbtn { width:44px; height:44px; min-width:44px; padding:0; justify-content:center; flex-shrink:0; gap:0; }',
      '  .vd-tabbar .vd-navbtn span { display:none; }',
      '  .vd-main { padding:16px 14px; }',
      '  .vd-greeting, .vd-pagetitle { font-size:24px; }',
      '  .vd-grid.cols-4 { grid-template-columns: 1fr 1fr !important; }',
      '  .vd-grid.cols-3 { grid-template-columns: 1fr !important; }',
      '  .vd-grid.split { grid-template-columns: 1fr !important; }',
      '  .vd-grid.cols-badges { grid-template-columns: repeat(3,1fr) !important; }',
      '}'
    ].join('\n');
    document.head.appendChild(s);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'style') n.style.cssText = attrs[k];
      else if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k.indexOf('on') === 0) n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    }
    if (children != null) {
      if (!Array.isArray(children)) children = [children];
      children.forEach(function (c) {
        if (c == null || c === false) return;
        n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      });
    }
    return n;
  }
  function svg(path, w) {
    w = w || 16;
    return '<svg class="vd-svg" width="' + w + '" height="' + w + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  }
  var ICONS = {
    dashboard: svg('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'),
    tasks: svg('<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'),
    sessions: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
    roadmap: svg('<polyline points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>'),
    wins: svg('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>'),
    resources: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),
    chat: svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    profile: svg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
    search: svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    bell: svg('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>'),
    sliders: svg('<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>'),
    sun: svg('<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>'),
    play: svg('<polygon points="5 3 19 12 5 21 5 3"/>'),
    flame: svg('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>'),
    cal: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>'),
    users: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    target: svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
    lock: svg('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
    star: svg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),
    check: svg('<polyline points="20 6 9 17 4 12"/>'),
    chevron: svg('<polyline points="6 9 12 15 18 9"/>')
  };

  function avatarColor(seed) {
    var colors = ['#1A3FA5','#FF6B6B','#4FB7A6','#7C5BD9','#E0B25C','#3BA88A'];
    var sum = 0; for (var i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
    return colors[sum % colors.length];
  }

  function greeting() {
    var h = new Date().getHours();
    if (h < 12) return 'GOOD MORNING';
    if (h < 18) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  }
  function todayLong() {
    var d = new Date();
    var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate();
  }

  function createState() {
    return {
      view: 'dashboard',
      taskSubTab: 'tasks',
      taskFilter: 'today',
      pastSessionsOpen: false,
      tasks: [
        { id: 't1', dueBucket: 'today', title: 'Draft elevator pitch', subject: 'Personal Branding', priority: 'Important', due: 'Today · 6:00 PM', xp: 120, done: false, expanded: false,
          desc: 'Write a 60-second pitch covering who you are, what you do, and what you want next.',
          subs: [
            { title: 'Outline 3 key value propositions', done: true, ai: false },
            { title: 'Generate hook variants with AI', done: false, ai: true },
            { title: 'Record a practice run on video', done: false, ai: false }
          ]},
        { id: 't2', dueBucket: 'today', title: 'Weekly reflection journal', subject: 'Growth Mindset', priority: 'Routine', due: 'Today · 9:00 PM', xp: 80, done: false, expanded: false,
          desc: 'Capture wins, friction points, and one intention for next week.',
          subs: [
            { title: 'Three wins of the week', done: false, ai: false },
            { title: 'Two friction points', done: false, ai: false },
            { title: 'One clear intention for next week', done: false, ai: false }
          ]},
        { id: 't3', dueBucket: 'tomorrow', title: 'Complete LinkedIn profile', subject: 'Career Dev', priority: 'Important', due: 'Tomorrow · 5:00 PM', xp: 60, done: false, expanded: false,
          desc: 'Polish your headline, featured section, and About summary.',
          subs: [
            { title: 'Update headline & banner', done: true, ai: false },
            { title: 'Add 2 featured projects', done: false, ai: false },
            { title: 'AI-rewrite About section', done: false, ai: true }
          ]},
        { id: 't4', dueBucket: 'week', title: 'Prepare interview talking points', subject: 'Career Dev', priority: 'Important', due: 'Thu · 3:00 PM', xp: 100, done: false, expanded: false,
          desc: 'Build a one-pager covering background, results, and the 3 questions you want to ask.',
          subs: [
            { title: 'List 3 strongest result stories', done: false, ai: false },
            { title: 'Draft 3 questions to ask the hiring manager', done: false, ai: false },
            { title: 'Mock interview with mentor', done: false, ai: false }
          ]},
        { id: 't5', dueBucket: 'week', title: 'Outreach to 5 alumni', subject: 'Networking', priority: 'Routine', due: 'Fri · End of day', xp: 70, done: false, expanded: false,
          desc: 'Send 5 personalised messages to alumni working in marketing in the UAE.',
          subs: [
            { title: 'Shortlist 5 alumni from LinkedIn', done: true, ai: false },
            { title: 'Personalise opening line for each', done: false, ai: true },
            { title: 'Send and log responses', done: false, ai: false }
          ]},
        { id: 't6', dueBucket: 'later', title: 'Update portfolio site', subject: 'Personal Branding', priority: 'Routine', due: 'Next Wed', xp: 90, done: false, expanded: false,
          desc: 'Refresh the homepage with the latest 2 case studies and a new About blurb.',
          subs: [
            { title: 'Write fresh About paragraph', done: false, ai: false },
            { title: 'Add 2 most recent case studies', done: false, ai: false },
            { title: 'Compress images and re-deploy', done: false, ai: false }
          ]},
        { id: 't7', dueBucket: 'later', title: 'Plan Q3 OKRs', subject: 'Strategy', priority: 'Important', due: 'Next Fri', xp: 110, done: false, expanded: false,
          desc: 'Define 1 objective and 3 measurable key results for the next quarter.',
          subs: [
            { title: 'Pick one focus objective', done: false, ai: false },
            { title: 'Write 3 measurable key results', done: false, ai: false },
            { title: 'Share draft with mentor for feedback', done: false, ai: false }
          ]}
      ],
      wins: [
        { author: 'Leilani K.', role: 'Foundations · member · 1,820 XP', plan: null, time: '2h ago', text: 'Landed my first freelance client today! The outreach scripts actually work — sent 12 messages, got 3 replies, signed one. 🎉', tag: 'Career Dev', reactions: { up: 14, fire: 9, clap: 6, star: 4 } },
        { author: 'Rami A.', role: 'Foundations · member · 1,150 XP', plan: null, time: '6h ago', text: 'Hit a 14-day focus streak today. Consistency is starting to feel automatic, not forced.', tag: 'Habit Tracking', reactions: { up: 8, fire: 17, clap: 4, star: 2 } },
        { author: 'Zach', role: 'Founder, MEGA', plan: 'MEGA', time: '1d ago', text: 'Just shipped the new Pomodoro + focus metrics on the dashboard. Try it out and tell me what to fix 👇', tag: null, reactions: { up: 22, fire: 15, clap: 11, star: 7 } },
        { author: 'Amira Malik', role: 'Foundations · member · 2,340 XP', plan: null, time: '2d ago', text: 'Booked an interview at a Dubai marketing agency for next Tuesday 🙌 The CV template + last week\'s 1:1 review made the difference.', tag: 'Career Dev', reactions: { up: 19, fire: 12, clap: 8, star: 5 } },
        { author: 'Yusuf O.', role: 'Foundations · member · 980 XP', plan: null, time: '3d ago', text: 'Finished the Time Blocking module. Already getting 3 deep-work hours in before noon and it feels unreal.', tag: 'Time Management', reactions: { up: 11, fire: 6, clap: 4, star: 2 } },
        { author: 'Sara K.', role: 'Foundations · member · 1,560 XP', plan: null, time: '4d ago', text: 'First public speaking attempt at uni this morning — terrified the whole time but I did it. Rewatching the recording with mentor next session.', tag: 'Communication', reactions: { up: 16, fire: 9, clap: 13, star: 4 } }
      ],
      timer: { seconds: 25 * 60, running: false, interval: null },
      badgeModalOpen: false,
      resourceFolder: 'foundations',
      roadmap: [
        { phase: 'Foundation', title: 'Stop Building, Start Converting', open: true,
          tasks: [
            { title: 'Audit your existing LinkedIn connections for warm leads', desc: 'Go through students and early-career pros you already know and flag anyone who engaged recently.', done: true },
            { title: 'Write one honest, direct outreach message template', desc: 'Draft a message that names exactly who MEGA is for, what month one looks like, and what it costs.', done: false },
            { title: 'Define your exact offer and price for this sprint', desc: 'Write the offer in plain language: what they get in month one, what success looks like.', done: false },
            { title: 'Send 10 personalised messages today', desc: 'Goal is replies, not impressions. Track responses in a simple sheet.', done: false }
          ]
        },
        { phase: 'Breakthrough', title: 'Build the Demand Engine', open: false,
          tasks: [
            { title: 'Map a 30-day content calendar', desc: 'Three pillars: case studies, frameworks, behind-the-build.', done: false },
            { title: 'Set up a lightweight CRM', desc: 'Notion or Airtable — track lead → conversation → close.', done: false },
            { title: 'Launch a 1:1 retention loop', desc: 'Make sure no member goes a week without a touchpoint.', done: false }
          ]
        },
        { phase: 'Scale', title: 'Operationalise the Wins', open: false,
          tasks: [
            { title: 'Document the best onboarding moments', desc: 'Turn what works into a repeatable playbook.', done: false },
            { title: 'Hire first part-time mentor', desc: 'Profile, sourcing, trial structure.', done: false }
          ]
        }
      ]
    };
  }

  // ── Mount ────────────────────────────────────────────────────────────────
  function mountVantageDemo(containerId) {
    ensureFonts();
    ensureStyles();
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    var state = createState();
    var root = el('div', { class: 'vd-root' });
    var frame = el('div', { class: 'vd-frame' });
    var caption = el('div', { class: 'vd-caption' });
    root.appendChild(frame);
    root.appendChild(caption);
    container.appendChild(root);

    frame.appendChild(el('div', { class: 'vd-chrome' }, [
      el('div', { class: 'vd-dot', style: 'background:#FF5F57' }),
      el('div', { class: 'vd-dot', style: 'background:#FEBC2E' }),
      el('div', { class: 'vd-dot', style: 'background:#28C840' }),
      el('div', { class: 'vd-url' }, 'vantage.mega-mentorship.com')
    ]));

    var body = el('div', { class: 'vd-body' });
    frame.appendChild(body);

    var sidebar = el('div', { class: 'vd-sidebar' });
    var mainArea = el('div', { class: 'vd-main' });
    var tabbar = el('div', { class: 'vd-tabbar' });
    body.appendChild(sidebar);
    body.appendChild(mainArea);
    body.appendChild(tabbar);

    var navItems = [
      { id: 'dashboard', icon: ICONS.dashboard, label: 'Dashboard' },
      { id: 'tasks', icon: ICONS.tasks, label: 'Tasks & Goals' },
      { id: 'sessions', icon: ICONS.sessions, label: 'Sessions' },
      { id: 'roadmap', icon: ICONS.roadmap, label: 'Roadmap' },
      { id: 'wins', icon: ICONS.wins, label: 'Wins Board' },
      { id: 'resources', icon: ICONS.resources, label: 'Resources' },
      { id: 'chat', icon: ICONS.chat, label: 'Chat' },
      { id: 'profile', icon: ICONS.profile, label: 'Profile' }
    ];

    var captions = {
      dashboard: ['Personal Dashboard', "Your command center for streaks, weekly activity, and what's due next — all in one view."],
      tasks: ['Tasks & Goals', 'Turn your growth plan into weekly tasks with priorities, due dates, and XP for every win.'],
      sessions: ['Sessions', 'Every 1:1 and town hall in one calendar — with reminders so you never miss a session.'],
      roadmap: ['Roadmap', 'A phase-by-phase plan toward your big goal, so you always know what to ship next.'],
      wins: ['Wins Board', 'Share your progress and celebrate others — momentum is contagious here.'],
      resources: ['Resource Library', 'Templates, frameworks, and guides curated by mentors — organised and always available.'],
      chat: ['Chat', 'Channels and direct messages with your cohort and mentors, in one place.'],
      profile: ['Profile & Achievements', 'Your full learning record: XP, streaks, badges, and milestones earned along the way.']
    };

    function renderNav() {
      sidebar.innerHTML = '';
      tabbar.innerHTML = '';

      sidebar.appendChild(el('div', { class: 'vd-logo' }, [
        el('div', { class: 'vd-logo-mark' }, 'Y'),
        el('div', null, [
          el('div', { class: 'vd-logo-name' }, 'VANTAGE'),
          el('div', { class: 'vd-logo-sub' }, 'BY MEGA')
        ])
      ]));
      sidebar.appendChild(el('div', { class: 'vd-sb-label' }, 'Workspace'));

      navItems.forEach(function (item) {
        var btn = el('button', {
          class: 'vd-navbtn' + (state.view === item.id ? ' active' : ''),
          title: item.label, 'aria-label': item.label,
          onclick: function () { state.view = item.id; renderAll(); }
        });
        btn.innerHTML = item.icon + '<span>' + item.label + '</span>';
        sidebar.appendChild(btn);

        var tb = el('button', {
          class: 'vd-navbtn' + (state.view === item.id ? ' active' : ''),
          title: item.label, 'aria-label': item.label,
          onclick: function () { state.view = item.id; renderAll(); }
        });
        tb.innerHTML = item.icon + '<span>' + item.label + '</span>';
        tabbar.appendChild(tb);
      });

      sidebar.appendChild(el('div', { class: 'vd-sb-foot' }, [
        el('div', { class: 'vd-avatar sm', style: 'background:#3BA88A;' }, 'AM'),
        el('div', { style: 'flex:1;min-width:0;' }, [
          el('div', { style: 'font-size:11px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' }, 'Amira Malik'),
          el('div', { style: 'font-size:9px;color:' + T.muted + ';' }, 'Foundations · 2.3K PTS')
        ])
      ]));
    }

    function topbar() {
      return el('div', { class: 'vd-topbar' }, [
        el('div', { class: 'vd-iconbtn', html: ICONS.search }),
        el('div', { class: 'vd-iconbtn', html: ICONS.bell }),
        el('div', { class: 'vd-iconbtn', html: ICONS.sun }),
        el('div', { class: 'vd-iconbtn', html: ICONS.sliders })
      ]);
    }

    function tooltip(target, msg) {
      var t = el('div', { class: 'vd-tooltip' }, msg);
      document.body.appendChild(t);
      var r = target.getBoundingClientRect();
      t.style.left = (r.left + r.width / 2 - 90) + 'px';
      t.style.top = (r.top - 30) + 'px';
      requestAnimationFrame(function () { t.classList.add('show'); });
      setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 200); }, 1400);
    }
    function unavailableBtn(label, opts) {
      opts = opts || {};
      return el('button', {
        class: 'vd-btn' + (opts.ghost ? ' ghost' : '') + (opts.coral ? ' coral' : ''),
        style: opts.style || '',
        onclick: function (e) { tooltip(e.currentTarget, 'Available in the live platform'); }
      }, label);
    }

    function fmtTime(s) {
      var m = Math.floor(s / 60), sec = s % 60;
      return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
    }
    function timerBtnLabel() {
      if (state.timer.running) return 'Pause';
      if (state.timer.seconds < 25 * 60 && state.timer.seconds > 0) return 'Resume';
      return 'Start focus';
    }
    function toggleTimer() {
      if (state.timer.running) {
        state.timer.running = false;
        clearInterval(state.timer.interval);
      } else {
        state.timer.running = true;
        state.timer.interval = setInterval(function () {
          if (state.timer.seconds > 0) {
            state.timer.seconds--;
            if (state.timer.onTick) state.timer.onTick();
          } else {
            state.timer.running = false;
            clearInterval(state.timer.interval);
            if (state.timer.onTick) state.timer.onTick();
          }
        }, 1000);
      }
      if (state.timer.onTick) state.timer.onTick();
    }

    // ── VIEW: Dashboard ───────────────────────────────────────────────────
    function viewDashboard() {
      var wrap = el('div');
      wrap.appendChild(topbar());

      wrap.appendChild(el('div', { class: 'vd-eyebrow' }, greeting() + ' · ' + todayLong()));
      wrap.appendChild(el('div', { class: 'vd-greeting' }, [
        document.createTextNode('HELLO, '),
        el('span', { class: 'name' }, 'AMIRA.')
      ]));
      wrap.appendChild(el('div', { class: 'vd-sub' }, "You have 2 tasks due today. Let's get moving."));

      var split = el('div', { class: 'vd-grid split', style: 'grid-template-columns: 1fr 280px;' });

      // left column
      var left = el('div', { style: 'display:flex;flex-direction:column;gap:12px;' });

      left.appendChild(el('div', { class: 'vd-card', style: 'display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;' }, [
        el('div', null, [
          el('div', { class: 'vd-eyebrow', style: 'margin-bottom:4px;' }, 'NEXT UP'),
          el('div', { class: 'vd-h', style: 'font-size:18px;' }, 'CAREER DIRECTION CHECK-IN'),
          el('div', { style: 'color:' + T.muted + ';font-size:12px;margin-top:3px;' }, 'Tomorrow · 4:00 PM GST · with Zach')
        ]),
        unavailableBtn('Join Session')
      ]));

      var stats = el('div', { class: 'vd-grid cols-4', style: 'grid-template-columns:repeat(4,1fr);' });
      [
        { label: 'FOCUS TIME', value: '4h 20m', sub: 'this week', color: T.sapphire },
        { label: 'TASKS', value: '12', sub: 'completed', color: T.teal },
        { label: 'GOALS', value: '2', sub: 'in progress', color: T.coral },
        { label: 'TOWN HALLS', value: '3', sub: 'attended', color: T.gold }
      ].forEach(function (s) {
        var c = el('div', { class: 'vd-card', style: 'padding:12px 14px;position:relative;overflow:hidden;' });
        c.appendChild(el('div', { style: 'font-size:9px;color:' + T.muted + ';letter-spacing:1.5px;margin-bottom:6px;' }, s.label));
        c.appendChild(el('div', { style: 'display:flex;align-items:baseline;gap:6px;' }, [
          el('div', { class: 'vd-h', style: 'font-size:22px;color:#fff;' }, s.value),
          el('div', { style: 'font-size:10px;color:' + T.muted + ';' }, s.sub)
        ]));
        c.appendChild(el('div', { style: 'position:absolute;left:14px;right:14px;bottom:0;height:2px;background:' + s.color + ';border-radius:2px;' }));
        stats.appendChild(c);
      });
      left.appendChild(stats);

      var actCard = el('div', { class: 'vd-card' });
      actCard.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;' }, [
        el('div', null, [
          el('div', { class: 'vd-eyebrow', style: 'margin-bottom:2px;' }, 'ACTIVITY THIS WEEK'),
          el('div', { style: 'font-size:11px;color:' + T.muted + ';' }, '307 min · +28% vs last week')
        ]),
        el('span', { class: 'vd-chip teal dot', style: 'font-size:10px;' }, 'On pace')
      ]));
      var days = ['M','T','W','T','F','S','S'];
      var heights = [38, 52, 88, 30, 76, 22, 16];
      var bars = el('div', { style: 'display:flex;gap:6px;align-items:flex-end;height:110px;' });
      days.forEach(function (d, i) {
        var hot = i === 2 || i === 4;
        bars.appendChild(el('div', { style: 'flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end;' }, [
          el('div', { style: 'width:100%;height:' + heights[i] + 'px;background:' + (hot ? T.sapphire : 'rgba(255,255,255,.08)') + ';border-radius:5px 5px 0 0;' }),
          el('div', { style: 'font-size:10px;color:' + (hot ? '#fff' : T.muted) + ';font-weight:' + (hot ? 600 : 400) + ';' }, d)
        ]));
      });
      actCard.appendChild(bars);
      left.appendChild(actCard);

      // Eisenhower matrix
      var eis = el('div', { class: 'vd-card' });
      eis.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;' }, [
        el('div', null, [
          el('div', { class: 'vd-eyebrow', style: 'margin-bottom:2px;' }, 'PRIORITY MATRIX'),
          el('div', { class: 'vd-h', style: 'font-size:14px;' }, 'EISENHOWER MATRIX')
        ]),
        unavailableBtn('Expand', { ghost: true, style: 'padding:6px 12px;min-height:30px;font-size:11px;' })
      ]));
      var grid = el('div', { class: 'vd-grid', style: 'grid-template-columns:1fr 1fr;gap:10px;' });
      [
        { label: 'Do Now', color: T.coral, icon: ICONS.flame, count: 2, sub: 'Urgent + Important' },
        { label: 'Do Next', color: T.sapphire, icon: ICONS.cal, count: 4, sub: 'Not Urgent + Important' },
        { label: 'Handle Soon', color: T.teal, icon: ICONS.users, count: 1, sub: 'Urgent + Lower Priority' },
        { label: 'Revisit Later', color: T.muted, icon: ICONS.target, count: 1, sub: 'Not Urgent + Lower Priority' }
      ].forEach(function (q) {
        grid.appendChild(el('div', { style: 'background:' + T.cardHi + ';border-radius:8px;padding:10px;' }, [
          el('div', { style: 'display:flex;align-items:center;gap:6px;color:' + q.color + ';font-size:11px;font-weight:700;margin-bottom:6px;', html: q.icon + '<span>' + q.label + '</span>' }),
          el('div', { class: 'vd-h', style: 'font-size:22px;color:#fff;margin-bottom:4px;' }, String(q.count)),
          el('div', { style: 'font-size:10px;color:' + T.muted + ';' }, q.sub)
        ]));
      });
      eis.appendChild(grid);
      left.appendChild(eis);

      split.appendChild(left);

      // right rail
      var right = el('div', { style: 'display:flex;flex-direction:column;gap:12px;' });

      right.appendChild(el('div', { class: 'vd-card', style: 'display:flex;align-items:center;gap:12px;' }, [
        el('div', { style: 'width:38px;height:38px;border-radius:10px;background:rgba(255,107,107,.15);display:flex;align-items:center;justify-content:center;color:' + T.coral + ';', html: ICONS.flame }),
        el('div', null, [
          el('div', { class: 'vd-eyebrow', style: 'margin-bottom:2px;' }, 'STREAK'),
          el('div', null, [
            el('span', { class: 'vd-h', style: 'font-size:22px;color:#fff;' }, '14'),
            el('span', { style: 'font-size:11px;color:' + T.muted + ';margin-left:6px;' }, 'weekdays')
          ])
        ])
      ]));

      var level = el('div', { class: 'vd-card' });
      level.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;' }, [
        el('div', { class: 'vd-eyebrow', style: 'margin:0;' }, 'LEVEL'),
        el('div', { style: 'font-size:10px;color:' + T.muted + ';' }, 'Tier 5 / 8')
      ]));
      level.appendChild(el('div', { class: 'vd-h', style: 'font-size:22px;color:#fff;margin-bottom:8px;' }, 'SKILLED'));
      level.appendChild(el('div', { style: 'display:flex;justify-content:space-between;font-size:10px;color:' + T.muted + ';margin-bottom:5px;' }, [
        el('div', null, '2,340 XP'),
        el('div', null, '2,660 to Pro')
      ]));
      var tierBar = el('div', { style: 'display:flex;gap:3px;' });
      for (var i = 0; i < 8; i++) {
        tierBar.appendChild(el('div', { style: 'flex:1;height:4px;border-radius:2px;background:' + (i < 5 ? T.sapphire : 'rgba(255,255,255,.08)') + ';' }));
      }
      level.appendChild(tierBar);
      right.appendChild(level);

      var timerCard = el('div', { class: 'vd-card' });
      timerCard.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;' }, [
        el('div', { class: 'vd-eyebrow', style: 'margin:0;' }, 'FOCUS TIMER'),
        el('div', { style: 'font-size:10px;color:' + T.muted + ';' }, '4h 20m this week')
      ]));
      var timeEl = el('div', { class: 'vd-h', style: 'font-size:36px;color:#fff;margin-bottom:10px;text-align:center;letter-spacing:2px;' }, fmtTime(state.timer.seconds));
      timerCard.appendChild(timeEl);
      timerCard.appendChild(el('div', { style: 'display:flex;align-items:center;justify-content:space-between;background:' + T.cardHi + ';border-radius:8px;padding:6px 10px;margin-bottom:8px;font-size:11px;' }, [
        el('button', { style: 'background:transparent;color:' + T.muted + ';padding:4px 8px;font-weight:600;' }, '−5'),
        el('div', { style: 'color:#fff;font-weight:600;' }, '25 min'),
        el('button', { style: 'background:transparent;color:' + T.muted + ';padding:4px 8px;font-weight:600;' }, '+5')
      ]));
      var timerBtn = el('button', { class: 'vd-btn', style: 'width:100%;', onclick: toggleTimer });
      timerBtn.innerHTML = ICONS.play + '<span>' + timerBtnLabel() + '</span>';
      state.timer.onTick = function () {
        timeEl.textContent = fmtTime(state.timer.seconds);
        timerBtn.innerHTML = ICONS.play + '<span>' + timerBtnLabel() + '</span>';
      };
      timerCard.appendChild(timerBtn);
      right.appendChild(timerCard);

      var upNext = el('div', { class: 'vd-card' });
      upNext.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;' }, [
        el('div', { class: 'vd-eyebrow', style: 'margin:0;' }, 'UP NEXT'),
        el('button', { class: 'vd-subtab', style: 'padding:0;font-size:10px;color:' + T.muted + ';min-height:0;', onclick: function () { state.view = 'tasks'; renderAll(); } }, 'All tasks →')
      ]));
      [['Draft elevator pitch', 120],['Weekly reflection', 80],['LinkedIn profile', 60]].forEach(function (t, i, arr) {
        upNext.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;padding:7px 0;' + (i < arr.length - 1 ? 'border-bottom:1px solid ' + T.border + ';' : '') }, [
          el('div', { style: 'font-size:12px;color:' + T.body + ';' }, t[0]),
          el('span', { style: 'font-size:10px;color:' + T.coral + ';font-weight:700;' }, '+' + t[1] + ' XP')
        ]));
      });
      right.appendChild(upNext);

      split.appendChild(right);
      wrap.appendChild(split);
      return wrap;
    }

    // ── VIEW: Tasks ───────────────────────────────────────────────────────
    function viewTasks() {
      var wrap = el('div');
      wrap.appendChild(topbar());
      wrap.appendChild(el('div', { class: 'vd-eyebrow' }, 'TASKS & GOALS'));
      wrap.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;' }, [
        el('div', null, [
          el('div', { class: 'vd-pagetitle' }, 'SHIP THE WORK.'),
          el('div', { class: 'vd-sub', style: 'margin:0;' }, 'Every task has a priority label and due date. Critical + due soon → Do First.')
        ]),
        el('div', { style: 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;' }, [
          el('div', { style: 'display:flex;gap:4px;background:' + T.card + ';padding:4px;border-radius:10px;' }, ['tasks','goals','metrics'].map(function (id) {
            var label = id === 'tasks' ? 'Tasks (' + state.tasks.length + ')' : id === 'goals' ? 'Goals (2)' : 'Focus Metrics';
            return el('button', {
              class: 'vd-subtab' + (state.taskSubTab === id ? ' active' : ''),
              onclick: function () { state.taskSubTab = id; renderAll(); }
            }, label);
          })),
          unavailableBtn('+ New')
        ])
      ]));

      if (state.taskSubTab === 'tasks') wrap.appendChild(renderTasksTab());
      else if (state.taskSubTab === 'goals') wrap.appendChild(renderGoalsTab());
      else wrap.appendChild(renderMetricsTab());
      return wrap;
    }
    function renderTasksTab() {
      var wrap = el('div');
      function matches(t, bucket) {
        if (bucket === 'all') return true;
        if (bucket === 'today') return t.dueBucket === 'today';
        if (bucket === 'tomorrow') return t.dueBucket === 'tomorrow';
        if (bucket === 'week') return ['today','tomorrow','week'].indexOf(t.dueBucket) >= 0;
        return true;
      }
      var counts = {
        today: state.tasks.filter(function (t) { return matches(t, 'today'); }).length,
        tomorrow: state.tasks.filter(function (t) { return matches(t, 'tomorrow'); }).length,
        week: state.tasks.filter(function (t) { return matches(t, 'week'); }).length,
        all: state.tasks.length
      };
      var filters = el('div', { style: 'display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;' });
      [['today','Today'],['tomorrow','Tomorrow'],['week','Next 7 days'],['all','All']].forEach(function (f) {
        filters.appendChild(el('button', {
          class: 'vd-subtab' + (state.taskFilter === f[0] ? ' active' : ''),
          onclick: function () { state.taskFilter = f[0]; renderAll(); }
        }, f[1] + ' (' + counts[f[0]] + ')'));
      });
      wrap.appendChild(filters);

      var visible = state.tasks.filter(function (t) { return matches(t, state.taskFilter); });
      if (visible.length === 0) {
        wrap.appendChild(el('div', { class: 'vd-card', style: 'text-align:center;padding:32px 16px;color:' + T.muted + ';font-size:12px;' }, 'No tasks in this bucket. Time to relax — or get ahead.'));
        return wrap;
      }
      visible.forEach(function (t) {
        var rowEl = el('div', { class: 'vd-card', style: 'padding:0;margin-bottom:8px;' });
        var row = el('div', {
          class: 'vd-row' + (t.done ? ' done' : ''),
          style: 'cursor:pointer;padding:12px 14px;',
          onclick: function (e) {
            if (e.target.closest('.vd-check')) return;
            t.expanded = !t.expanded;
            renderAll();
          }
        });
        var check = el('button', {
          class: 'vd-check' + (t.done ? ' checked' : ''),
          'aria-label': 'toggle task',
          onclick: function (e) { e.stopPropagation(); t.done = !t.done; renderAll(); }
        }, t.done ? '✓' : '');
        row.appendChild(check);
        row.appendChild(el('div', { style: 'flex:1;' }, [
          el('div', { class: 'vd-task-title', style: 'font-size:13px;font-weight:600;margin-bottom:3px;' }, t.title),
          el('div', { style: 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:10px;color:' + T.muted + ';' }, [
            el('span', { class: 'vd-pill ' + (t.priority === 'Important' ? 'coral' : 'teal') }, t.priority),
            el('span', { class: 'vd-pill muted' }, t.subject),
            document.createTextNode('· ' + t.due)
          ])
        ]));
        row.appendChild(el('span', { style: 'font-size:10px;color:' + T.coral + ';font-weight:700;' }, '+' + t.xp + ' XP'));
        var chev = el('div', { style: 'color:' + T.muted + ';' + (t.expanded ? 'transform:rotate(180deg);' : ''), html: ICONS.chevron });
        row.appendChild(chev);
        rowEl.appendChild(row);

        if (t.expanded) {
          var detail = el('div', { class: 'vd-grid split', style: 'padding:14px;border-top:1px solid ' + T.border + ';background:' + T.cardHi + ';grid-template-columns:1fr 200px;' });
          var dLeft = el('div');
          dLeft.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:5px;' }, 'Details'));
          dLeft.appendChild(el('div', { style: 'font-size:12px;color:' + T.body + ';margin-bottom:12px;line-height:1.5;' }, t.desc));
          dLeft.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:6px;' }, 'Subtasks'));
          t.subs.forEach(function (s) {
            var sRow = el('div', { style: 'display:flex;align-items:center;gap:9px;padding:6px 0;' });
            sRow.appendChild(el('button', {
              class: 'vd-check' + (s.done ? ' checked' : ''),
              onclick: function (e) { e.stopPropagation(); s.done = !s.done; renderAll(); }
            }, s.done ? '✓' : ''));
            sRow.appendChild(el('div', { style: 'flex:1;font-size:12px;' + (s.done ? 'text-decoration:line-through;color:' + T.muted + ';' : '') }, s.title));
            if (s.ai) sRow.appendChild(el('span', { class: 'vd-pill sapphire' }, 'AI'));
            dLeft.appendChild(sRow);
          });
          detail.appendChild(dLeft);

          var mini = el('div', { style: 'background:' + T.card + ';border-radius:8px;padding:12px;text-align:center;' });
          mini.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:6px;' }, 'Focus Timer'));
          var miniTime = el('div', { class: 'vd-h', style: 'font-size:26px;color:#fff;margin-bottom:8px;' }, fmtTime(state.timer.seconds));
          mini.appendChild(miniTime);
          var miniBtn = el('button', { class: 'vd-btn', style: 'width:100%;', onclick: toggleTimer });
          miniBtn.innerHTML = ICONS.play + '<span>' + timerBtnLabel() + '</span>';
          mini.appendChild(miniBtn);
          mini.appendChild(el('button', { class: 'vd-btn ghost', style: 'width:100%;margin-top:6px;font-size:11px;', onclick: function (e) { tooltip(e.currentTarget, 'Available in the live platform'); } }, '↻ Regenerate subtasks'));
          mini.appendChild(el('div', { style: 'font-size:10px;color:' + T.muted + ';margin-top:6px;' }, '3 regenerations left'));
          var prev = state.timer.onTick;
          state.timer.onTick = function () {
            if (prev) prev();
            miniTime.textContent = fmtTime(state.timer.seconds);
            miniBtn.innerHTML = ICONS.play + '<span>' + timerBtnLabel() + '</span>';
          };
          detail.appendChild(mini);
          rowEl.appendChild(detail);
        }
        wrap.appendChild(rowEl);
      });
      return wrap;
    }
    function renderGoalsTab() {
      var wrap = el('div');
      [
        { title: 'Land my first internship', pct: 60, date: 'Aug 2026', status: 'In Progress', tag: 'Career Dev' },
        { title: 'Build my personal brand', pct: 25, date: 'Dec 2026', status: 'In Progress', tag: 'Branding' }
      ].forEach(function (g) {
        wrap.appendChild(el('div', { class: 'vd-card', style: 'margin-bottom:10px;' }, [
          el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;' }, [
            el('div', null, [
              el('div', { style: 'font-size:14px;font-weight:600;margin-bottom:3px;' }, g.title),
              el('span', { class: 'vd-pill sapphire' }, g.tag)
            ]),
            el('span', { class: 'vd-chip teal' }, g.status)
          ]),
          (function () { var b = el('div', { class: 'vd-bar', style: 'margin-bottom:6px;' }); b.appendChild(el('div', { style: 'width:' + g.pct + '%;' })); return b; })(),
          el('div', { style: 'display:flex;justify-content:space-between;font-size:11px;color:' + T.muted + ';' }, [
            el('div', null, g.pct + '% complete'),
            el('div', null, 'Target: ' + g.date)
          ])
        ]));
      });
      return wrap;
    }
    function renderMetricsTab() {
      var wrap = el('div');

      // Top 4 stat tiles
      var topStats = el('div', { class: 'vd-grid cols-4', style: 'grid-template-columns:repeat(4,1fr);margin-bottom:14px;' });
      [
        { label: 'TODAY', value: '1h 45m', sub: '3 sessions' },
        { label: 'THIS WEEK', value: '4h 20m', sub: '6 sessions' },
        { label: 'TOTAL FOCUS', value: '87h 12m', sub: '' },
        { label: 'SESSIONS', value: '142', sub: 'all time' }
      ].forEach(function (s) {
        topStats.appendChild(el('div', { class: 'vd-card' }, [
          el('div', { class: 'vd-eyebrow', style: 'margin-bottom:6px;' }, s.label),
          el('div', { style: 'display:flex;align-items:baseline;gap:6px;' }, [
            el('div', { class: 'vd-h', style: 'font-size:24px;color:#fff;' }, s.value),
            s.sub ? el('div', { style: 'font-size:10px;color:' + T.muted + ';' }, s.sub) : null
          ])
        ]));
      });
      wrap.appendChild(topStats);

      // Last 7 days + By Subject split
      var row1 = el('div', { class: 'vd-grid split', style: 'grid-template-columns:1.4fr 1fr;margin-bottom:14px;' });

      var l7 = el('div', { class: 'vd-card' });
      l7.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:2px;' }, 'FOCUS · LAST 7 DAYS'));
      l7.appendChild(el('div', { style: 'font-size:11px;color:' + T.muted + ';margin-bottom:14px;' }, [
        document.createTextNode('Daily average '),
        el('span', { style: 'color:#fff;font-weight:700;' }, '37m')
      ]));
      var dLabels = ['S','M','T','W','T','F','S'];
      var dHeights = [40, 90, 55, 70, 30, 85, 50];
      var dBars = el('div', { style: 'display:flex;gap:8px;align-items:flex-end;height:130px;' });
      dLabels.forEach(function (d, i) {
        var isToday = i === 6;
        dBars.appendChild(el('div', { style: 'flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end;' }, [
          el('div', { style: 'width:100%;height:' + dHeights[i] + 'px;background:' + (isToday ? T.sapphire : 'rgba(26,63,165,.35)') + ';border-radius:5px 5px 0 0;' }),
          el('div', { style: 'font-size:10px;color:' + (isToday ? '#fff' : T.muted) + ';font-weight:' + (isToday ? 600 : 400) + ';' }, d)
        ]));
      });
      l7.appendChild(dBars);
      row1.appendChild(l7);

      var subj = el('div', { class: 'vd-card' });
      subj.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:12px;' }, 'BY SUBJECT · ALL TIME'));
      [
        { name: 'Personal Branding', hours: '22h 14m', pct: 100 },
        { name: 'Career Dev', hours: '18h 02m', pct: 81 },
        { name: 'Time Management', hours: '14h 30m', pct: 65 },
        { name: 'Communication', hours: '11h 45m', pct: 53 },
        { name: 'Growth Mindset', hours: '9h 18m', pct: 42 },
        { name: 'Strategy', hours: '6h 23m', pct: 29 }
      ].forEach(function (s) {
        subj.appendChild(el('div', { style: 'margin-bottom:10px;' }, [
          el('div', { style: 'display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;' }, [
            el('div', { style: 'color:#fff;font-weight:500;' }, s.name),
            el('div', { style: 'color:' + T.muted + ';' }, s.hours)
          ]),
          (function () { var b = el('div', { class: 'vd-bar' }); b.appendChild(el('div', { style: 'width:' + s.pct + '%;' })); return b; })()
        ]));
      });
      row1.appendChild(subj);
      wrap.appendChild(row1);

      // Most focused time of day + Weekly rhythm
      var row2 = el('div', { class: 'vd-grid split', style: 'grid-template-columns:1fr 1fr;margin-bottom:14px;' });

      var tod = el('div', { class: 'vd-card' });
      tod.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:14px;' }, 'MOST FOCUSED TIME OF DAY'));
      var todHeights = [4,3,2,2,3,4,8,18,42,68,82,90,76,64,88,72,56,38,28,22,14,10,6,4];
      var todMax = 90;
      var todBars = el('div', { style: 'display:flex;gap:1px;align-items:flex-end;height:120px;' });
      todHeights.forEach(function (h, i) {
        todBars.appendChild(el('div', { style: 'flex:1;height:' + (h / todMax * 100) + '%;background:' + (h > 60 ? T.sapphire : 'rgba(26,63,165,.45)') + ';border-radius:2px 2px 0 0;min-height:2px;' }));
      });
      tod.appendChild(todBars);
      tod.appendChild(el('div', { style: 'display:flex;justify-content:space-between;font-size:9px;color:' + T.muted + ';margin-top:6px;letter-spacing:.5px;' }, [
        el('div', null, '12 AM'),
        el('div', null, '6 AM'),
        el('div', null, '12 PM'),
        el('div', null, '6 PM'),
        el('div', null, '11 PM')
      ]));
      row2.appendChild(tod);

      var rhythm = el('div', { class: 'vd-card' });
      rhythm.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:10px;' }, 'WEEKLY RHYTHM'));
      var dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      var rhythmRows = el('div', { style: 'display:flex;flex-direction:column;gap:3px;' });
      // Realistic pattern: weekday mornings + early afternoons, lighter weekends
      var rhythmPatterns = {
        Mon: [0,0,0,0,0,0,0,0,.5,.8,.9,.7,.3,.6,.7,.4,.2,.1,0,0,0,0,0,0],
        Tue: [0,0,0,0,0,0,0,.2,.6,.9,.8,.6,.2,.5,.8,.5,.3,.1,0,0,0,0,0,0],
        Wed: [0,0,0,0,0,0,0,.1,.7,1,.9,.5,.2,.7,.9,.6,.2,0,0,0,0,0,0,0],
        Thu: [0,0,0,0,0,0,0,0,.4,.7,.6,.4,.1,.4,.7,.5,.2,.1,0,0,0,0,0,0],
        Fri: [0,0,0,0,0,0,0,.3,.8,.9,.7,.5,.2,.6,.8,.4,.1,0,0,0,0,0,0,0],
        Sat: [0,0,0,0,0,0,0,0,.1,.3,.5,.6,.4,.2,.1,0,0,0,0,0,0,0,0,0],
        Sun: [0,0,0,0,0,0,0,0,0,.2,.4,.3,.1,0,0,0,0,0,0,0,0,0,0,0]
      };
      dayNames.forEach(function (d) {
        var rRow = el('div', { style: 'display:flex;gap:2px;align-items:center;' });
        rRow.appendChild(el('div', { style: 'width:26px;font-size:9px;color:' + T.muted + ';' }, d));
        rhythmPatterns[d].forEach(function (v) {
          rRow.appendChild(el('div', { style: 'flex:1;aspect-ratio:1;border-radius:1px;background:' + (v > 0 ? 'rgba(26,63,165,' + (.25 + v * .75) + ')' : 'rgba(255,255,255,.04)') + ';' }));
        });
        rhythmRows.appendChild(rRow);
      });
      rhythm.appendChild(rhythmRows);
      rhythm.appendChild(el('div', { style: 'font-size:9px;color:' + T.muted + ';margin-top:6px;padding-left:30px;' }, '12 AM → 11 PM'));
      row2.appendChild(rhythm);
      wrap.appendChild(row2);

      // Focus in 2026 annual heatmap
      var ann = el('div', { class: 'vd-card', style: 'margin-bottom:14px;' });
      ann.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;' }, [
        el('div', { class: 'vd-eyebrow', style: 'margin:0;' }, 'FOCUS IN 2026'),
        el('div', { style: 'display:flex;gap:6px;align-items:center;font-size:10px;color:' + T.muted + ';' }, [
          document.createTextNode('Less'),
          el('div', { style: 'display:flex;gap:3px;' }, [
            el('div', { style: 'width:10px;height:10px;border-radius:2px;background:rgba(255,255,255,.05);' }),
            el('div', { style: 'width:10px;height:10px;border-radius:2px;background:rgba(26,63,165,.35);' }),
            el('div', { style: 'width:10px;height:10px;border-radius:2px;background:rgba(26,63,165,.6);' }),
            el('div', { style: 'width:10px;height:10px;border-radius:2px;background:rgba(26,63,165,.85);' }),
            el('div', { style: 'width:10px;height:10px;border-radius:2px;background:' + T.sapphire + ';' })
          ]),
          document.createTextNode('More')
        ])
      ]));
      var weeks = 52;
      var annGrid = el('div', { style: 'display:grid;grid-template-columns:repeat(' + weeks + ',1fr);grid-template-rows:repeat(7,1fr);gap:2px;grid-auto-flow:column;' });
      // Deterministic pseudo-random pattern with higher density in recent months
      function seedRand(n) { var x = Math.sin(n * 9301 + 49297) * 233280; return x - Math.floor(x); }
      for (var w = 0; w < weeks; w++) {
        for (var dd = 0; dd < 7; dd++) {
          var r = seedRand(w * 7 + dd);
          // weekends lighter
          var isWeekend = dd >= 5;
          // ramp up activity over the year
          var weekFactor = w / weeks;
          var intensity = r * (isWeekend ? 0.35 : 0.85) * (0.5 + weekFactor * 0.7);
          var color;
          if (intensity < 0.15) color = 'rgba(255,255,255,.05)';
          else if (intensity < 0.35) color = 'rgba(26,63,165,.35)';
          else if (intensity < 0.55) color = 'rgba(26,63,165,.6)';
          else if (intensity < 0.75) color = 'rgba(26,63,165,.85)';
          else color = T.sapphire;
          annGrid.appendChild(el('div', { style: 'aspect-ratio:1;border-radius:2px;background:' + color + ';' }));
        }
      }
      ann.appendChild(annGrid);
      wrap.appendChild(ann);

      // Focus records
      var rec = el('div', { class: 'vd-card' });
      rec.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:10px;' }, 'FOCUS RECORDS'));
      [
        { title: 'Draft elevator pitch', subject: 'Personal Branding', when: 'Today · 3:15 PM', dur: '50m' },
        { title: 'LinkedIn rewrite', subject: 'Career Dev', when: 'Today · 11:02 AM', dur: '35m' },
        { title: 'Reflection journal', subject: 'Growth Mindset', when: 'Yesterday · 9:40 PM', dur: '20m' },
        { title: 'Interview prep', subject: 'Career Dev', when: 'Yesterday · 4:20 PM', dur: '1h 10m' },
        { title: 'Time blocking review', subject: 'Time Management', when: '2 days ago · 8:15 AM', dur: '25m' }
      ].forEach(function (r, i, arr) {
        rec.appendChild(el('div', { style: 'display:flex;align-items:center;gap:12px;padding:9px 0;' + (i < arr.length-1 ? 'border-bottom:1px solid ' + T.border + ';' : '') }, [
          el('div', { style: 'width:30px;height:30px;border-radius:8px;background:' + T.sapphireSoft + ';display:flex;align-items:center;justify-content:center;color:#A9C0F0;flex-shrink:0;', html: ICONS.cal }),
          el('div', { style: 'flex:1;min-width:0;' }, [
            el('div', { style: 'font-size:12px;font-weight:600;color:#fff;margin-bottom:2px;' }, r.title),
            el('div', { style: 'font-size:10px;color:' + T.muted + ';' }, r.subject + ' · ' + r.when)
          ]),
          el('div', { style: 'font-size:12px;font-weight:700;color:#A9C0F0;' }, r.dur)
        ]));
      });
      wrap.appendChild(rec);

      return wrap;
    }

    // ── VIEW: Sessions ────────────────────────────────────────────────────
    function viewSessions() {
      var wrap = el('div');
      wrap.appendChild(topbar());
      wrap.appendChild(el('div', { class: 'vd-eyebrow' }, 'SESSIONS'));
      wrap.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;' }, [
        el('div', null, [
          el('div', { class: 'vd-pagetitle' }, 'YOUR CALENDAR'),
          el('div', { class: 'vd-sub', style: 'margin:0;' }, 'Every 1:1 and town hall in one place. Reminders fire 90 minutes before you start.')
        ]),
        el('div', { style: 'display:flex;gap:4px;background:' + T.card + ';padding:4px;border-radius:10px;' }, [
          el('button', { class: 'vd-subtab active' }, 'Calendar'),
          el('button', { class: 'vd-subtab', onclick: function (e) { tooltip(e.currentTarget, 'Available in the live platform'); } }, 'List')
        ])
      ]));

      wrap.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:10px;' }, [
        el('div', { style: 'display:flex;gap:6px;' }, [
          el('span', { class: 'vd-chip sapphire dot' }, '1:1'),
          el('span', { class: 'vd-chip coral dot' }, 'Town Hall')
        ]),
        el('div', { style: 'font-size:11px;color:' + T.muted + ';' }, [
          el('span', { style: 'color:#A9C0F0;font-weight:600;' }, '2 1:1s · 2h 0m'),
          document.createTextNode('  /  '),
          el('span', { style: 'color:' + T.coral + ';font-weight:600;' }, '1 Town Hall · 1h 15m')
        ])
      ]));

      var cal = el('div', { class: 'vd-card' });
      cal.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;' }, [
        el('div', { style: 'display:flex;gap:6px;align-items:center;' }, [
          el('button', { class: 'vd-btn ghost', style: 'padding:4px 10px;min-height:28px;font-size:11px;' }, 'Today'),
          el('button', { class: 'vd-iconbtn', style: 'width:26px;height:26px;min-width:26px;min-height:26px;font-size:11px;' }, '‹'),
          el('button', { class: 'vd-iconbtn', style: 'width:26px;height:26px;min-width:26px;min-height:26px;font-size:11px;' }, '›'),
          el('div', { class: 'vd-h', style: 'font-size:16px;margin-left:6px;' }, 'JUNE 2026')
        ]),
        el('div', { style: 'display:flex;gap:4px;background:rgba(255,255,255,.04);padding:3px;border-radius:8px;' }, ['Month','Week','Day'].map(function (v, i) {
          return el('button', { class: 'vd-subtab' + (i === 0 ? ' active' : ''), style: 'padding:4px 10px;font-size:10px;min-height:24px;' }, v);
        }))
      ]));
      var dayLabels = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
      var dGrid = el('div', { style: 'display:grid;grid-template-columns:repeat(7,1fr);gap:3px;font-size:10px;' });
      dayLabels.forEach(function (d) { dGrid.appendChild(el('div', { style: 'color:' + T.muted + ';padding:4px;text-align:center;letter-spacing:1px;' }, d)); });
      var events = { 3: { label: '1:1 Check-in', color: T.sapphire }, 7: { label: 'Town Hall', color: T.coral }, 10: { label: '1:1', color: T.sapphire }, 15: { label: '1:1', color: T.sapphire }, 24: { label: 'Pitch Review', color: T.sapphire } };
      var todayD = 4;
      for (var d = 1; d <= 30; d++) {
        var ev = events[d];
        var cell = el('div', { style: 'aspect-ratio:1.1;background:rgba(255,255,255,.02);border-radius:5px;padding:4px 5px;font-size:10px;display:flex;flex-direction:column;justify-content:space-between;' + (d === todayD ? 'background:' + T.sapphireSoft + ';border:1px solid ' + T.sapphire + ';' : '') });
        cell.appendChild(el('div', { style: 'color:' + (d === todayD ? '#fff' : T.body) + ';font-weight:' + (d === todayD ? 700 : 500) + ';' }, String(d)));
        if (ev) cell.appendChild(el('div', { style: 'font-size:8px;color:#fff;background:' + ev.color + ';padding:2px 4px;border-radius:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' }, ev.label));
        dGrid.appendChild(cell);
      }
      cal.appendChild(dGrid);
      wrap.appendChild(cal);

      wrap.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-top:16px;margin-bottom:8px;' }, 'Upcoming'));
      wrap.appendChild(el('div', { class: 'vd-card', style: 'border-left:3px solid ' + T.sapphire + ';margin-bottom:10px;' }, [
        el('span', { class: 'vd-pill sapphire' }, '1:1 Session'),
        el('div', { class: 'vd-h', style: 'font-size:18px;margin-top:6px;' }, 'CAREER DIRECTION CHECK-IN'),
        el('div', { style: 'color:' + T.muted + ';font-size:12px;margin-top:3px;' }, 'Tomorrow · 4:00 – 4:45 PM GST · with Zach'),
        el('ul', { style: 'margin:10px 0;padding-left:18px;color:' + T.muted + ';font-size:12px;' }, [
          el('li', null, 'LinkedIn profile review'),
          el('li', null, 'Goal setting for Q3')
        ]),
        el('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;' }, [
          unavailableBtn('Add to Calendar', { ghost: true }),
          unavailableBtn('Join Session')
        ])
      ]));
      wrap.appendChild(el('div', { class: 'vd-card', style: 'border-left:3px solid ' + T.coral + ';margin-bottom:10px;' }, [
        el('span', { class: 'vd-pill coral' }, 'Town Hall'),
        el('div', { class: 'vd-h', style: 'font-size:18px;margin-top:6px;' }, 'MEGA MONTHLY KICKOFF'),
        el('div', { style: 'color:' + T.muted + ';font-size:12px;margin-top:3px;' }, 'Sat 7 Jun · 6:00 PM GST · Open to all members'),
        el('div', { style: 'margin-top:10px;' }, unavailableBtn('Add to Calendar', { ghost: true }))
      ]));

      wrap.appendChild(el('button', {
        class: 'vd-btn ghost',
        onclick: function () { state.pastSessionsOpen = !state.pastSessionsOpen; renderAll(); }
      }, (state.pastSessionsOpen ? 'Hide' : 'Show') + ' past sessions'));
      if (state.pastSessionsOpen) {
        wrap.appendChild(el('div', { class: 'vd-card', style: 'margin-top:8px;opacity:.55;' }, [
          el('span', { class: 'vd-pill sapphire' }, '1:1 Session'),
          el('div', { class: 'vd-h', style: 'font-size:16px;margin-top:5px;' }, 'INTRO & ROADMAP'),
          el('div', { style: 'color:' + T.muted + ';font-size:11px;margin-top:3px;' }, '2 weeks ago · with Zach · Completed')
        ]));
      }
      return wrap;
    }

    // ── VIEW: Roadmap ─────────────────────────────────────────────────────
    function viewRoadmap() {
      var wrap = el('div');
      wrap.appendChild(topbar());
      wrap.appendChild(el('div', { class: 'vd-eyebrow' }, 'YOUR PLAN'));
      wrap.appendChild(el('div', { class: 'vd-pagetitle' }, 'ROADMAP'));
      wrap.appendChild(el('div', { class: 'vd-sub' }, 'I want to land my first internship and build a real personal brand by August 2026.'));

      var totalTasks = 0, doneTasks = 0;
      state.roadmap.forEach(function (p) { p.tasks.forEach(function (t) { totalTasks++; if (t.done) doneTasks++; }); });
      var pct = Math.round(doneTasks / totalTasks * 100);
      var prog = el('div', { class: 'vd-card', style: 'margin-bottom:14px;' });
      prog.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;' }, [
        el('div', { class: 'vd-eyebrow', style: 'margin:0;' }, 'Overall progress'),
        el('div', { style: 'font-size:11px;color:' + T.muted + ';' }, doneTasks + ' of ' + totalTasks + ' tasks complete')
      ]));
      var pbar = el('div', { class: 'vd-bar' });
      pbar.appendChild(el('div', { style: 'width:' + pct + '%;' }));
      prog.appendChild(pbar);
      wrap.appendChild(prog);

      state.roadmap.forEach(function (p) {
        var phaseDone = p.tasks.filter(function (t) { return t.done; }).length;
        var card = el('div', { class: 'vd-card', style: 'margin-bottom:10px;' });
        card.appendChild(el('div', {
          style: 'display:flex;justify-content:space-between;align-items:center;cursor:pointer;',
          onclick: function () { p.open = !p.open; renderAll(); }
        }, [
          el('div', null, [
            el('span', { class: 'vd-pill sapphire' }, p.phase),
            el('div', { style: 'font-size:14px;font-weight:600;margin-top:6px;' }, p.title)
          ]),
          el('div', { style: 'display:flex;align-items:center;gap:10px;' }, [
            el('div', { style: 'font-size:11px;color:' + T.muted + ';' }, phaseDone + '/' + p.tasks.length),
            el('div', { style: 'color:' + T.muted + ';' + (p.open ? 'transform:rotate(180deg);' : ''), html: ICONS.chevron })
          ])
        ]));
        if (p.open) {
          var tasksWrap = el('div', { style: 'margin-top:12px;display:flex;flex-direction:column;gap:8px;' });
          p.tasks.forEach(function (t) {
            tasksWrap.appendChild(el('div', { style: 'background:' + T.cardHi + ';border-radius:8px;padding:12px;' }, [
              el('div', { style: 'display:flex;align-items:flex-start;gap:10px;' }, [
                el('button', {
                  class: 'vd-check' + (t.done ? ' checked' : ''),
                  onclick: function () { t.done = !t.done; renderAll(); }
                }, t.done ? '✓' : ''),
                el('div', { style: 'flex:1;' }, [
                  el('div', { style: 'font-size:13px;font-weight:600;margin-bottom:4px;' + (t.done ? 'text-decoration:line-through;color:' + T.muted + ';' : '') }, t.title),
                  el('div', { style: 'font-size:11px;color:' + T.muted + ';line-height:1.5;' }, t.desc)
                ])
              ])
            ]));
          });
          card.appendChild(tasksWrap);
        }
        wrap.appendChild(card);
      });
      return wrap;
    }

    // ── VIEW: Wins Board ──────────────────────────────────────────────────
    function viewWins() {
      var wrap = el('div');
      wrap.appendChild(topbar());
      wrap.appendChild(el('div', { class: 'vd-eyebrow' }, 'COMMUNITY'));
      wrap.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;' }, [
        el('div', null, [
          el('div', { class: 'vd-pagetitle' }, 'WINS BOARD'),
          el('div', { class: 'vd-sub', style: 'margin:0;' }, 'Share your progress and celebrate others. Every win counts — big or small.')
        ]),
        unavailableBtn('+ Share a win')
      ]));

      var split = el('div', { class: 'vd-grid split', style: 'grid-template-columns:1fr 240px;' });

      var feed = el('div', { style: 'display:flex;flex-direction:column;gap:10px;' });
      state.wins.forEach(function (w) {
        var initials = w.author.split(' ').map(function (n) { return n[0]; }).slice(0,2).join('');
        var card = el('div', { class: 'vd-card' });
        card.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:8px;flex-wrap:wrap;' }, [
          el('div', { style: 'display:flex;gap:10px;align-items:center;' }, [
            el('div', { class: 'vd-avatar', style: 'background:' + avatarColor(w.author) + ';' }, initials),
            el('div', null, [
              el('div', { style: 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;' }, [
                el('span', { style: 'font-size:13px;font-weight:600;color:#fff;' }, w.author),
                w.plan ? el('span', { class: 'vd-pill sapphire' }, w.plan) : null,
                el('span', { style: 'font-size:10px;color:' + T.muted + ';' }, w.role)
              ]),
              el('div', { style: 'font-size:10px;color:' + T.muted + ';margin-top:2px;' }, w.time)
            ])
          ])
        ]));
        card.appendChild(el('div', { style: 'font-size:13px;color:' + T.body + ';line-height:1.55;margin-bottom:10px;' }, w.text));
        var bot = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;' });
        bot.appendChild(w.tag ? el('span', { class: 'vd-pill teal dot' }, w.tag) : el('div'));
        var rxRow = el('div', { style: 'display:flex;gap:6px;' });
        [['up','👍'],['fire','🔥'],['clap','👏'],['star','⭐']].forEach(function (r) {
          var rxBtn = el('button', {
            class: 'vd-chip',
            style: 'cursor:pointer;padding:4px 8px;font-size:11px;',
            onclick: function () { w.reactions[r[0]]++; rxBtn.querySelector('.cnt').textContent = w.reactions[r[0]]; }
          });
          rxBtn.innerHTML = r[1] + ' <span class="cnt" style="margin-left:3px;font-weight:600;">' + w.reactions[r[0]] + '</span>';
          rxRow.appendChild(rxBtn);
        });
        bot.appendChild(rxRow);
        card.appendChild(bot);
        feed.appendChild(card);
      });
      split.appendChild(feed);

      var right = el('div', { style: 'display:flex;flex-direction:column;gap:10px;' });
      var stats = el('div', { class: 'vd-card' });
      stats.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:8px;' }, 'On the board'));
      [['Wins shared', state.wins.length],['Subject areas', 5],['Community members', 214]].forEach(function (s, i, arr) {
        stats.appendChild(el('div', { style: 'display:flex;justify-content:space-between;padding:6px 0;' + (i < arr.length-1 ? 'border-bottom:1px solid ' + T.border + ';' : '') }, [
          el('div', { style: 'font-size:11px;color:' + T.muted + ';' }, s[0]),
          el('div', { style: 'font-size:13px;font-weight:600;color:#fff;' }, s[1])
        ]));
      });
      right.appendChild(stats);

      var recent = el('div', { class: 'vd-card' });
      recent.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:8px;' }, 'Recent wins'));
      state.wins.forEach(function (w) {
        var initials = w.author.split(' ').map(function (n) { return n[0]; }).slice(0,2).join('');
        recent.appendChild(el('div', { style: 'display:flex;gap:8px;align-items:center;padding:6px 0;' }, [
          el('div', { class: 'vd-avatar sm', style: 'background:' + avatarColor(w.author) + ';' }, initials),
          el('div', { style: 'min-width:0;flex:1;' }, [
            el('div', { style: 'font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' }, w.author),
            el('div', { style: 'font-size:10px;color:' + T.muted + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' }, w.text)
          ])
        ]));
      });
      right.appendChild(recent);
      split.appendChild(right);

      wrap.appendChild(split);
      return wrap;
    }

    // ── VIEW: Resources ───────────────────────────────────────────────────
    function viewResources() {
      var wrap = el('div');
      wrap.appendChild(topbar());
      wrap.appendChild(el('div', { style: 'margin-bottom:8px;' }, el('span', { class: 'vd-pill teal' }, 'Coming Soon · Currently in Beta')));
      wrap.appendChild(el('div', { class: 'vd-pagetitle' }, 'RESOURCE LIBRARY'));
      wrap.appendChild(el('div', { class: 'vd-sub' }, 'Templates, frameworks, and guides curated by your mentors — organized and always available.'));

      var tabs = el('div', { style: 'display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;' });
      [
        { id: 'foundations', label: 'Foundations' },
        { id: 'breakthrough', label: 'Breakthrough' },
        { id: 'management', label: 'MEGA Management', locked: true }
      ].forEach(function (f) {
        var b = el('button', {
          class: 'vd-subtab' + (state.resourceFolder === f.id ? ' active' : ''),
          style: 'display:inline-flex;align-items:center;gap:6px;' + (f.locked ? 'opacity:.55;' : ''),
          onclick: function () { if (!f.locked) { state.resourceFolder = f.id; renderAll(); } }
        });
        b.innerHTML = '<span>' + f.label + '</span>' + (f.locked ? ICONS.lock : '');
        tabs.appendChild(b);
      });
      wrap.appendChild(tabs);

      var foundationsCards = [
        { title: 'How to Write a Standout CV', subject: 'Career Dev', type: 'Template', dur: '15 min', color: T.sapphire },
        { title: 'Public Speaking Fundamentals', subject: 'Communication', type: 'Video', dur: '32 min', color: T.coral },
        { title: 'LinkedIn Optimization Guide', subject: 'Personal Branding', type: 'Article', dur: '8 min read', color: T.teal },
        { title: 'Time Blocking for Students', subject: 'Productivity', type: 'Template', dur: '10 min', color: T.gold }
      ];
      var breakthroughCards = [
        { title: 'Advanced Negotiation Tactics', subject: 'Career Growth', type: 'Video', dur: '48 min', color: T.coral, locked: true },
        { title: 'Building a Side Income', subject: 'Finance', type: 'Article', dur: '20 min read', color: T.teal, locked: false },
        { title: 'Executive Presence Playbook', subject: 'Leadership', type: 'Template', dur: '25 min', color: T.sapphire, locked: true }
      ];
      var cards = state.resourceFolder === 'foundations' ? foundationsCards : breakthroughCards;

      wrap.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:8px;' }, 'Recently added'));
      var rec = el('div', { style: 'display:flex;flex-direction:column;gap:6px;margin-bottom:18px;' });
      cards.slice(0, 2).forEach(function (c) {
        rec.appendChild(el('div', { class: 'vd-card', style: 'display:flex;align-items:center;gap:10px;padding:10px 12px;' }, [
          el('div', { style: 'width:30px;height:30px;background:' + c.color + '22;border-radius:6px;display:flex;align-items:center;justify-content:center;color:' + c.color + ';', html: ICONS.star }),
          el('div', { style: 'flex:1;' }, [
            el('div', { style: 'font-size:12px;font-weight:600;' }, c.title),
            el('div', { style: 'font-size:10px;color:' + T.muted + ';' }, c.subject + ' · ' + c.type)
          ]),
          el('div', { style: 'font-size:10px;color:' + T.muted + ';' }, c.dur)
        ]));
      });
      wrap.appendChild(rec);

      var grid = el('div', { class: 'vd-grid cols-4', style: 'grid-template-columns:repeat(' + (cards.length === 4 ? 4 : 3) + ',1fr);' });
      cards.forEach(function (c) {
        var card = el('div', { class: 'vd-card', style: 'padding:0;overflow:hidden;position:relative;' });
        card.appendChild(el('div', { style: 'background:linear-gradient(135deg,' + c.color + '33,' + c.color + '11);height:74px;display:flex;align-items:center;justify-content:center;color:' + c.color + ';', html: ICONS.star }));
        card.appendChild(el('div', { style: 'padding:12px;' }, [
          el('div', { style: 'font-size:12px;font-weight:600;margin-bottom:6px;line-height:1.35;' }, c.title),
          el('div', { style: 'display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px;' }, [
            el('span', { class: 'vd-pill muted' }, c.subject),
            el('span', { class: 'vd-pill sapphire' }, c.type)
          ]),
          el('div', { style: 'font-size:10px;color:' + T.muted + ';margin-bottom:8px;' }, c.dur),
          unavailableBtn('View', { coral: true, style: 'padding:6px 14px;min-height:30px;font-size:11px;' })
        ]));
        if (c.locked) {
          card.appendChild(el('div', {
            style: 'position:absolute;inset:0;background:rgba(13,15,26,.85);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#fff;font-size:12px;font-weight:600;text-align:center;padding:10px;',
            html: ICONS.lock + '<div style="margin-top:6px;">Unlocked with Breakthrough</div>'
          }));
        }
        grid.appendChild(card);
      });
      wrap.appendChild(grid);
      return wrap;
    }

    // ── VIEW: Chat ────────────────────────────────────────────────────────
    function viewChat() {
      var wrap = el('div');
      wrap.appendChild(topbar());
      wrap.appendChild(el('div', { class: 'vd-eyebrow' }, 'CHAT'));
      wrap.appendChild(el('div', { class: 'vd-pagetitle' }, 'COMMUNITY'));
      wrap.appendChild(el('div', { class: 'vd-sub' }, 'Channels and direct discussion for the MEGA Mentorship community.'));

      var split = el('div', { class: 'vd-grid split', style: 'grid-template-columns:200px 1fr;' });

      var sb = el('div', { class: 'vd-card', style: 'padding:10px;' });
      sb.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:6px;padding:4px 6px;' }, 'Channels'));
      sb.appendChild(el('div', { style: 'background:' + T.sapphire + ';border-radius:8px;padding:8px 10px;color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;gap:8px;' }, [
        el('div', { class: 'vd-avatar sm', style: 'background:rgba(255,255,255,.2);' }, 'MG'),
        el('div', null, [
          el('div', null, 'MEGA Mentorship'),
          el('div', { style: 'font-size:9px;font-weight:400;opacity:.7;' }, 'Everyone')
        ])
      ]));
      sb.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin:14px 0 6px;padding:0 6px;' }, [
        el('div', { class: 'vd-eyebrow', style: 'margin:0;' }, 'Direct messages'),
        el('button', { style: 'background:transparent;color:#A9C0F0;font-size:11px;font-weight:600;padding:0;', onclick: function (e) { tooltip(e.currentTarget, 'Available in the live platform'); } }, '+ New')
      ]));
      sb.appendChild(el('div', { style: 'padding:6px 8px;font-size:11px;color:' + T.muted + ';' }, 'Message Zach to start a DM.'));
      split.appendChild(sb);

      var chat = el('div', { class: 'vd-card', style: 'display:flex;flex-direction:column;padding:0;' });
      chat.appendChild(el('div', { style: 'padding:12px 14px;border-bottom:1px solid ' + T.border + ';display:flex;gap:10px;align-items:center;' }, [
        el('div', { class: 'vd-avatar sm', style: 'background:' + T.sapphire + ';' }, 'MG'),
        el('div', null, [
          el('div', { style: 'font-size:13px;font-weight:700;color:#fff;' }, '# MEGA Mentorship'),
          el('div', { style: 'font-size:11px;color:' + T.muted + ';' }, '214 members · Announcements and discussion for the whole community.')
        ])
      ]));
      var msgList = el('div', { style: 'padding:14px;display:flex;flex-direction:column;gap:14px;' });
      [
        { name: 'Zach', initials: 'ZA', plan: 'MEGA', role: 'Founder, MEGA', time: '2h ago', text: 'Welcome to the community channel! Drop your goals for this week below 👇' },
        { name: 'Amira Malik', initials: 'AM', xp: '2,340', role: 'Foundations · member', time: '1h ago', text: 'Landed an interview at a Dubai agency this morning! 🔥' },
        { name: 'Leilani K.', initials: 'LK', xp: '1,820', role: 'Foundations · member', time: '45m ago', text: 'Just finished my roadmap session — feeling so much clearer about next steps.' },
        { name: 'Rami A.', initials: 'RA', xp: '1,150', role: 'Foundations · member', time: '15m ago', text: 'Week 3 done. Consistency is actually starting to feel automatic.' }
      ].forEach(function (m) {
        msgList.appendChild(el('div', { style: 'display:flex;gap:10px;' }, [
          el('div', { class: 'vd-avatar', style: 'background:' + avatarColor(m.name) + ';' }, m.initials),
          el('div', { style: 'flex:1;min-width:0;' }, [
            el('div', { style: 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:3px;' }, [
              el('span', { style: 'font-size:12px;font-weight:700;color:#fff;' }, m.name),
              m.xp ? el('span', { style: 'font-size:10px;color:' + T.muted + ';' }, '· ' + m.xp + ' XP') : null,
              m.plan ? el('span', { class: 'vd-pill sapphire' }, m.plan) : null,
              el('span', { style: 'font-size:10px;color:' + T.muted + ';' }, m.role + ' · ' + m.time)
            ]),
            el('div', { style: 'font-size:12px;color:' + T.body + ';line-height:1.5;' }, m.text)
          ])
        ]));
      });
      chat.appendChild(msgList);
      chat.appendChild(el('div', { style: 'padding:10px 12px;border-top:1px solid ' + T.border + ';display:flex;gap:8px;align-items:center;' }, [
        el('div', { style: 'flex:1;background:' + T.cardHi + ';border-radius:8px;padding:8px 12px;font-size:11px;color:' + T.muted + ';' }, 'Message # MEGA Mentorship…'),
        unavailableBtn('Send')
      ]));
      split.appendChild(chat);

      wrap.appendChild(split);
      return wrap;
    }

    // ── VIEW: Profile ─────────────────────────────────────────────────────
    function viewProfile() {
      var wrap = el('div');
      wrap.appendChild(topbar());
      wrap.appendChild(el('div', { class: 'vd-eyebrow' }, 'PROFILE'));
      wrap.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;' }, [
        el('div', { class: 'vd-pagetitle' }, 'AMIRA MALIK'),
        unavailableBtn('✎ Edit profile', { ghost: true, style: 'padding:7px 14px;min-height:32px;font-size:11px;' })
      ]));

      wrap.appendChild(el('div', { class: 'vd-card', style: 'display:flex;gap:14px;align-items:center;margin-bottom:12px;flex-wrap:wrap;' }, [
        el('div', { class: 'vd-avatar lg', style: 'background:' + T.sapphire + ';' }, 'AM'),
        el('div', { style: 'flex:1;min-width:180px;' }, [
          el('div', { style: 'display:flex;gap:6px;margin-bottom:5px;flex-wrap:wrap;' }, [
            el('span', { class: 'vd-pill sapphire dot' }, 'Mentorship'),
            el('span', { class: 'vd-pill teal dot' }, 'Foundations')
          ]),
          el('div', { class: 'vd-h', style: 'font-size:18px;color:#fff;' }, 'AMIRA MALIK'),
          el('div', { style: 'font-size:11px;color:' + T.muted + ';margin-top:3px;' }, 'amira@example.com · Joined May 2026')
        ]),
        el('div', { style: 'display:flex;gap:18px;text-align:right;' }, [
          el('div', null, [
            el('div', { class: 'vd-h', style: 'font-size:26px;color:' + T.sapphire + ';' }, '2,340'),
            el('div', { style: 'font-size:10px;color:' + T.muted + ';letter-spacing:1.5px;' }, 'XP')
          ]),
          el('div', null, [
            el('div', { class: 'vd-h', style: 'font-size:26px;color:' + T.coral + ';' }, '14'),
            el('div', { style: 'font-size:10px;color:' + T.muted + ';letter-spacing:1.5px;' }, 'DAY STREAK')
          ])
        ])
      ]));

      var s3 = el('div', { class: 'vd-grid', style: 'grid-template-columns:repeat(3,1fr);margin-bottom:12px;' });
      [
        ['TOTAL LEARNING', '87h 12m'],
        ['SESSIONS', '8 done'],
        ['UPCOMING', '1 scheduled']
      ].forEach(function (s) {
        s3.appendChild(el('div', { class: 'vd-card' }, [
          el('div', { class: 'vd-eyebrow', style: 'margin-bottom:4px;' }, s[0]),
          el('div', { class: 'vd-h', style: 'font-size:20px;color:#fff;' }, s[1])
        ]));
      });
      wrap.appendChild(s3);

      // milestones timeline
      var ms = el('div', { class: 'vd-card', style: 'margin-bottom:12px;' });
      ms.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:4px;' }, 'Achievement story'));
      ms.appendChild(el('div', { class: 'vd-h', style: 'font-size:16px;margin-bottom:14px;' }, 'MILESTONES'));
      var milestones = [
        { name: 'Joined Vantage', date: 'May 23, 2026', desc: 'Mentorship · Foundations', color: T.sapphire },
        { name: 'First task completed', date: 'May 25, 2026', desc: 'LinkedIn headline updated', color: T.teal },
        { name: 'First focus session', date: 'May 26, 2026', desc: '25m focused', color: T.teal },
        { name: 'First session attended', date: 'May 27, 2026', desc: 'Intro & Roadmap with Zach', color: T.sapphire }
      ];
      var line = el('div', { style: 'display:flex;align-items:flex-start;gap:0;' });
      milestones.forEach(function (m, i) {
        line.appendChild(el('div', { style: 'flex:1;text-align:center;position:relative;padding:0 4px;' }, [
          el('div', { style: 'width:34px;height:34px;margin:0 auto 6px;border-radius:50%;border:2px solid ' + m.color + ';background:' + T.bg + ';display:flex;align-items:center;justify-content:center;color:' + m.color + ';position:relative;z-index:1;', html: ICONS.check }),
          el('div', { style: 'font-size:11px;font-weight:600;color:' + m.color + ';margin-bottom:3px;' }, m.name),
          el('div', { style: 'font-size:10px;color:' + T.muted + ';margin-bottom:3px;' }, m.date),
          el('div', { style: 'font-size:10px;color:' + T.dim + ';line-height:1.35;' }, m.desc),
          i < milestones.length - 1 ? el('div', { style: 'position:absolute;top:17px;left:calc(50% + 22px);right:calc(-50% + 22px);height:2px;background:' + T.border + ';' }) : null
        ]));
      });
      ms.appendChild(line);
      wrap.appendChild(ms);

      var bSplit = el('div', { class: 'vd-grid split', style: 'grid-template-columns:1fr 240px;' });
      var bCard = el('div', { class: 'vd-card' });
      bCard.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:8px;' }, [
        el('div', null, [
          el('div', { class: 'vd-eyebrow', style: 'margin-bottom:3px;' }, 'Achievements'),
          el('div', { class: 'vd-h', style: 'font-size:16px;' }, 'BADGE WALL')
        ]),
        el('div', { style: 'text-align:right;' }, [
          el('div', { style: 'font-size:11px;color:' + T.muted + ';' }, '10 of 58 earned'),
          el('button', {
            style: 'background:transparent;color:#A9C0F0;font-size:11px;font-weight:600;padding:0;margin-top:3px;',
            onclick: function () { state.badgeModalOpen = true; renderModal(); }
          }, 'View all →')
        ])
      ]));
      var unlocked = ['First Focus','First Task','Three Day Run','First Session','Goal Setter','Joined The Conversation','Day One','Early Bird'];
      var locked = ['Fortnight Focus','Goal Getter','Consistent','Marathon'];
      var bGrid = el('div', { class: 'vd-grid cols-badges', style: 'grid-template-columns:repeat(4,1fr);' });
      unlocked.forEach(function (n) {
        var b = el('div', { class: 'vd-badge' });
        var ic = el('div', { class: 'ic' }); ic.innerHTML = ICONS.star;
        b.appendChild(ic); b.appendChild(el('div', null, n));
        bGrid.appendChild(b);
      });
      locked.forEach(function (n) {
        var b = el('div', { class: 'vd-badge locked' });
        var ic = el('div', { class: 'ic' }); ic.innerHTML = ICONS.lock;
        b.appendChild(ic); b.appendChild(el('div', null, n));
        bGrid.appendChild(b);
      });
      bCard.appendChild(bGrid);
      bSplit.appendChild(bCard);

      var side = el('div', { style: 'display:flex;flex-direction:column;gap:10px;' });
      var info = el('div', { class: 'vd-card' });
      info.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:8px;' }, 'Personal info'));
      [
        ['Current role', 'Student'],
        ['Industry / Field', 'Marketing'],
        ['Growth focus', 'Personal Branding']
      ].forEach(function (p) {
        info.appendChild(el('div', { style: 'margin-bottom:8px;' }, [
          el('div', { style: 'font-size:9px;color:' + T.muted + ';letter-spacing:1.2px;text-transform:uppercase;margin-bottom:2px;' }, p[0]),
          el('div', { style: 'font-size:12px;color:#fff;font-weight:500;' }, p[1])
        ]));
      });
      info.appendChild(el('div', { style: 'border-top:1px solid ' + T.border + ';padding-top:10px;' }, [
        el('div', { class: 'vd-eyebrow', style: 'margin-bottom:6px;' }, 'Interests'),
        el('div', { style: 'display:flex;gap:5px;flex-wrap:wrap;' }, [
          el('span', { class: 'vd-pill muted' }, 'Strategy'),
          el('span', { class: 'vd-pill muted' }, 'Reading'),
          el('span', { class: 'vd-pill muted' }, 'Running')
        ])
      ]));
      side.appendChild(info);

      var appearance = el('div', { class: 'vd-card' });
      appearance.appendChild(el('div', { class: 'vd-eyebrow', style: 'margin-bottom:8px;' }, 'Appearance'));
      appearance.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;' }, [
        el('div', { style: 'font-size:12px;' }, 'Theme'),
        el('div', { style: 'display:flex;background:' + T.cardHi + ';border-radius:6px;padding:2px;' }, [
          el('button', { style: 'background:transparent;color:' + T.muted + ';padding:4px 10px;font-size:10px;font-weight:600;border-radius:4px;', onclick: function (e) { tooltip(e.currentTarget, 'Available in the live platform'); } }, 'Light'),
          el('button', { style: 'background:' + T.sapphire + ';color:#fff;padding:4px 10px;font-size:10px;font-weight:600;border-radius:4px;' }, 'Dark')
        ])
      ]));
      side.appendChild(appearance);

      bSplit.appendChild(side);
      wrap.appendChild(bSplit);
      return wrap;
    }

    // ── Modal ────────────────────────────────────────────────────────────
    var modalRoot = null;
    function renderModal() {
      if (modalRoot) { modalRoot.remove(); modalRoot = null; }
      if (!state.badgeModalOpen) return;
      modalRoot = el('div', {
        class: 'vd-modal vd-root',
        onclick: function (e) { if (e.target === modalRoot) { state.badgeModalOpen = false; renderModal(); } }
      });
      var card = el('div', { class: 'vd-modal-card' });
      card.appendChild(el('button', {
        class: 'vd-modal-close',
        onclick: function () { state.badgeModalOpen = false; renderModal(); }
      }, '✕'));
      card.appendChild(el('div', { class: 'vd-h', style: 'font-size:22px;margin-bottom:14px;color:#fff;' }, 'ALL BADGES'));
      var grid = el('div', { style: 'display:grid;grid-template-columns:repeat(4,1fr);gap:10px;' });
      var all = ['First Focus','First Task','Three Day Run','First Session','Goal Setter','Joined The Conversation','Day One','Early Bird','Fortnight Focus','Goal Getter','Consistent','Marathon','Community Pillar','Win Sharer','Roadmap Hero','Mentor Whisperer'];
      all.forEach(function (n, i) {
        var unlocked = i < 8;
        var b = el('div', { class: 'vd-badge' + (unlocked ? '' : ' locked') });
        var ic = el('div', { class: 'ic' });
        ic.innerHTML = unlocked ? ICONS.star : ICONS.lock;
        b.appendChild(ic);
        b.appendChild(el('div', null, n));
        grid.appendChild(b);
      });
      card.appendChild(grid);
      modalRoot.appendChild(card);
      document.body.appendChild(modalRoot);
    }

    // ── Render orchestrator ──────────────────────────────────────────────
    function renderAll() {
      state.timer.onTick = null;
      renderNav();
      mainArea.innerHTML = '';
      var view;
      switch (state.view) {
        case 'tasks': view = viewTasks(); break;
        case 'sessions': view = viewSessions(); break;
        case 'roadmap': view = viewRoadmap(); break;
        case 'wins': view = viewWins(); break;
        case 'resources': view = viewResources(); break;
        case 'chat': view = viewChat(); break;
        case 'profile': view = viewProfile(); break;
        default: view = viewDashboard();
      }
      mainArea.appendChild(view);
      mainArea.scrollTop = 0;

      var cap = captions[state.view] || captions.dashboard;
      caption.innerHTML = '<strong>' + cap[0] + ' —</strong>' + cap[1];
    }

    renderAll();
  }

  window.mountVantageDemo = mountVantageDemo;
})();
