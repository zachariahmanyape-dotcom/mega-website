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
    coral: '#FF6B6B',
    teal: '#4FB7A6',
    border: 'rgba(255,255,255,0.07)',
    body: 'rgba(255,255,255,0.87)',
    muted: 'rgba(255,255,255,0.45)'
  };

  // ── Font loader (only once) ───────────────────────────────────────────────
  function ensureFonts() {
    if (document.getElementById('vd-fonts')) return;
    var link = document.createElement('link');
    link.id = 'vd-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }

  // ── Scoped CSS (only once) ────────────────────────────────────────────────
  function ensureStyles() {
    if (document.getElementById('vd-styles')) return;
    var s = document.createElement('style');
    s.id = 'vd-styles';
    s.textContent = [
      '.vd-root, .vd-root *, .vd-root *::before, .vd-root *::after { box-sizing: border-box; }',
      '.vd-root { font-family: "Montserrat", system-ui, sans-serif; color: ' + T.body + '; line-height: 1.4; }',
      '.vd-root button { font-family: inherit; cursor: pointer; border: 0; }',
      '.vd-h { font-family: "Bebas Neue", sans-serif; letter-spacing: 1.5px; color: #fff; }',
      '.vd-frame { max-width: 1100px; margin: 0 auto; background: ' + T.bg + '; border-radius: 16px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 0 1px ' + T.border + '; }',
      '.vd-chrome { display:flex; align-items:center; gap:8px; padding:10px 14px; background:#0a0c14; border-bottom:1px solid ' + T.border + '; }',
      '.vd-dot { width:12px; height:12px; border-radius:50%; }',
      '.vd-url { flex:1; text-align:center; font-size:12px; color:' + T.muted + '; background:rgba(255,255,255,.04); border:1px solid ' + T.border + '; border-radius:6px; padding:4px 12px; max-width:360px; margin:0 auto; }',
      '.vd-body { display:flex; height:620px; }',
      '.vd-sidebar { width:60px; background:#0a0c14; border-right:1px solid ' + T.border + '; display:flex; flex-direction:column; align-items:center; padding:14px 0; gap:8px; flex-shrink:0; }',
      '.vd-navbtn { width:40px; height:40px; min-height:44px; min-width:44px; border-radius:10px; background:transparent; color:' + T.muted + '; display:flex; align-items:center; justify-content:center; transition:all .15s; }',
      '.vd-navbtn:hover { background:rgba(255,255,255,.05); color:#fff; }',
      '.vd-navbtn.active { background:' + T.sapphire + '; color:#fff; }',
      '.vd-main { flex:1; overflow-y:auto; padding:24px 28px; }',
      '.vd-tabbar { display:none; }',
      '.vd-chip { display:inline-flex; align-items:center; gap:6px; background:' + T.card + '; border:1px solid ' + T.border + '; border-radius:6px; padding:6px 10px; font-size:12px; color:' + T.body + '; }',
      '.vd-chip.coral { color:' + T.coral + '; border-color:rgba(255,107,107,.3); background:rgba(255,107,107,.08); }',
      '.vd-chip.sapphire { color:#A9C0F0; border-color:rgba(26,63,165,.4); background:rgba(26,63,165,.15); }',
      '.vd-chip.teal { color:' + T.teal + '; border-color:rgba(79,183,166,.3); background:rgba(79,183,166,.1); }',
      '.vd-card { background:' + T.card + '; border:1px solid ' + T.border + '; border-radius:12px; padding:18px; }',
      '.vd-card.hi { background:' + T.cardHi + '; }',
      '.vd-btn { background:' + T.sapphire + '; color:#fff; border-radius:8px; padding:10px 18px; font-weight:600; font-size:13px; min-height:44px; }',
      '.vd-btn.ghost { background:transparent; border:1px solid ' + T.border + '; color:' + T.body + '; }',
      '.vd-btn.coral { background:' + T.coral + '; }',
      '.vd-pill { display:inline-block; font-size:10px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; padding:4px 8px; border-radius:6px; }',
      '.vd-pill.sapphire { background:rgba(26,63,165,.2); color:#A9C0F0; }',
      '.vd-pill.teal { background:rgba(79,183,166,.15); color:' + T.teal + '; }',
      '.vd-pill.coral { background:rgba(255,107,107,.15); color:' + T.coral + '; }',
      '.vd-greeting { font-family:"Bebas Neue", sans-serif; font-size:38px; letter-spacing:2px; color:#fff; margin-bottom:8px; }',
      '.vd-greeting .name { color:' + T.coral + '; }',
      '.vd-sub { color:' + T.muted + '; font-size:14px; margin-bottom:24px; }',
      '.vd-grid { display:grid; gap:16px; }',
      '.vd-bar { width:100%; height:8px; border-radius:4px; background:rgba(255,255,255,.06); overflow:hidden; }',
      '.vd-bar > div { height:100%; background:' + T.sapphire + '; border-radius:4px; }',
      '.vd-row { display:flex; align-items:center; gap:12px; padding:12px; border-radius:8px; transition:background .15s; }',
      '.vd-row:hover { background:rgba(255,255,255,.03); }',
      '.vd-check { width:20px; height:20px; min-width:20px; border:2px solid ' + T.muted + '; border-radius:5px; display:flex; align-items:center; justify-content:center; background:transparent; transition:all .15s; }',
      '.vd-check.checked { background:' + T.sapphire + '; border-color:' + T.sapphire + '; }',
      '.vd-row.done .vd-task-title { text-decoration:line-through; color:' + T.muted + '; }',
      '.vd-subtab { padding:10px 18px; font-size:13px; font-weight:600; color:' + T.muted + '; border-radius:8px; background:transparent; }',
      '.vd-subtab.active { background:' + T.cardHi + '; color:#fff; }',
      '.vd-modal { position:fixed; inset:0; background:rgba(0,0,0,.75); display:flex; align-items:center; justify-content:center; z-index:9999; padding:20px; }',
      '.vd-modal-card { background:' + T.card + '; border-radius:12px; padding:24px; max-width:720px; width:100%; max-height:85vh; overflow-y:auto; border:1px solid ' + T.border + '; }',
      '.vd-modal-close { float:right; background:transparent; color:' + T.muted + '; font-size:20px; padding:0; width:32px; height:32px; }',
      '.vd-tooltip { position:fixed; background:#000; color:#fff; padding:6px 10px; font-size:11px; border-radius:6px; pointer-events:none; z-index:10000; opacity:0; transition:opacity .15s; }',
      '.vd-tooltip.show { opacity:1; }',
      '.vd-svg { width:20px; height:20px; }',
      '.vd-avatar { width:36px; height:36px; min-width:36px; border-radius:50%; background:' + T.sapphire + '; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; color:#fff; }',
      '.vd-heatcell { width:100%; aspect-ratio:1; border-radius:3px; background:rgba(255,255,255,.05); }',
      '.vd-badge { aspect-ratio:1; border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:10px; text-align:center; font-size:11px; font-weight:600; }',
      '.vd-badge.locked { background:rgba(255,255,255,.03); color:' + T.muted + '; }',
      '@media (max-width: 768px) {',
      '  .vd-frame { border-radius: 12px; }',
      '  .vd-url { font-size:10px; max-width:200px; padding:3px 8px; }',
      '  .vd-dot { width:10px; height:10px; }',
      '  .vd-body { display:block; height:auto; min-height:560px; }',
      '  .vd-sidebar { display:none; }',
      '  .vd-tabbar { display:flex; position:sticky; bottom:0; background:#0a0c14; border-top:1px solid ' + T.border + '; padding:6px 0; justify-content:space-around; z-index:5; }',
      '  .vd-tabbar .vd-navbtn { width:48px; height:48px; }',
      '  .vd-main { padding:18px 16px; }',
      '  .vd-greeting { font-size:28px; }',
      '  .vd-grid.cols-4 { grid-template-columns: 1fr 1fr !important; }',
      '  .vd-grid.cols-3 { grid-template-columns: 1fr !important; }',
      '  .vd-grid.cols-2-mobile-1 { grid-template-columns: 1fr !important; }',
      '  .vd-grid.cols-badges { grid-template-columns: repeat(3,1fr) !important; }',
      '}'
    ].join('\n');
    document.head.appendChild(s);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (k === 'style') n.style.cssText = attrs[k];
        else if (k === 'class') n.className = attrs[k];
        else if (k === 'html') n.innerHTML = attrs[k];
        else if (k.indexOf('on') === 0) n.addEventListener(k.slice(2), attrs[k]);
        else if (k === 'dataset') { for (var d in attrs[k]) n.dataset[d] = attrs[k][d]; }
        else n.setAttribute(k, attrs[k]);
      }
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

  // Inline SVG icons (24x24 viewBox)
  function svg(path, w) {
    w = w || 20;
    return '<svg class="vd-svg" width="' + w + '" height="' + w + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  }
  var ICONS = {
    dashboard: svg('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'),
    tasks: svg('<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'),
    sessions: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
    community: svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    resources: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),
    profile: svg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
    play: svg('<polygon points="5 3 19 12 5 21 5 3"/>', 16),
    lock: svg('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', 16),
    flame: svg('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>', 16),
    calIcon: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>', 16),
    timer: svg('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/>', 16),
    list: svg('<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>', 16),
    chatIcon: svg('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>', 16),
    video: svg('<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>', 16),
    article: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/>', 16),
    template: svg('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>', 16)
  };

  // ── State ─────────────────────────────────────────────────────────────────
  function createState() {
    return {
      view: 'dashboard',
      taskSubTab: 'tasks',
      communitySubTab: 'channels',
      pastSessionsOpen: false,
      tasks: [
        { id: 't1', title: 'Draft elevator pitch', subject: 'Personal Branding', priority: 'high', xp: 120, done: false, expanded: false,
          subs: [
            { title: 'Outline 3 key value props', done: true, ai: false },
            { title: 'Generate hook variants with AI', done: false, ai: true },
            { title: 'Practice run on video', done: false, ai: false }
          ]},
        { id: 't2', title: 'Weekly reflection journal', subject: 'Growth Mindset', priority: 'med', xp: 80, done: false, expanded: false,
          subs: [
            { title: 'Wins of the week', done: false, ai: false },
            { title: 'Friction points', done: false, ai: false },
            { title: 'Next week intention', done: false, ai: false }
          ]},
        { id: 't3', title: 'Complete LinkedIn profile', subject: 'Career Dev', priority: 'low', xp: 60, done: false, expanded: false,
          subs: [
            { title: 'Update headline', done: true, ai: false },
            { title: 'Add featured projects', done: false, ai: false },
            { title: 'AI-rewrite About section', done: false, ai: true }
          ]},
      ],
      reactions: { up: 6, fire: 4, star: 2 },
      timer: { seconds: 25 * 60, running: false, interval: null },
      badgeModalOpen: false,
      resourceFolder: 'foundations'
    };
  }

  function greeting() {
    var h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }

  // ── Mount ─────────────────────────────────────────────────────────────────
  function mountVantageDemo(containerId) {
    ensureFonts();
    ensureStyles();
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    var state = createState();
    var root = el('div', { class: 'vd-root' });
    var frame = el('div', { class: 'vd-frame' });
    root.appendChild(frame);
    container.appendChild(root);

    // chrome
    var chrome = el('div', { class: 'vd-chrome' }, [
      el('div', { class: 'vd-dot', style: 'background:#FF5F57' }),
      el('div', { class: 'vd-dot', style: 'background:#FEBC2E' }),
      el('div', { class: 'vd-dot', style: 'background:#28C840' }),
      el('div', { class: 'vd-url' }, 'vantage.mega-mentorship.com')
    ]);
    frame.appendChild(chrome);

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
      { id: 'community', icon: ICONS.community, label: 'Community' },
      { id: 'resources', icon: ICONS.resources, label: 'Resources' },
      { id: 'profile', icon: ICONS.profile, label: 'Profile' }
    ];

    function renderNav() {
      sidebar.innerHTML = '';
      tabbar.innerHTML = '';
      navItems.forEach(function (item) {
        function makeBtn() {
          var b = el('button', {
            class: 'vd-navbtn' + (state.view === item.id ? ' active' : ''),
            title: item.label,
            'aria-label': item.label,
            html: item.icon,
            onclick: function () { state.view = item.id; renderAll(); }
          });
          return b;
        }
        sidebar.appendChild(makeBtn());
        tabbar.appendChild(makeBtn());
      });
    }

    function tooltip(target, msg) {
      var t = el('div', { class: 'vd-tooltip' }, msg);
      document.body.appendChild(t);
      var r = target.getBoundingClientRect();
      t.style.left = (r.left + r.width / 2 - 60) + 'px';
      t.style.top = (r.top - 32) + 'px';
      requestAnimationFrame(function () { t.classList.add('show'); });
      setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 200); }, 1400);
    }

    function unavailableBtn(label, opts) {
      opts = opts || {};
      return el('button', {
        class: 'vd-btn' + (opts.ghost ? ' ghost' : '') + (opts.coral ? ' coral' : ''),
        onclick: function (e) { tooltip(e.currentTarget, 'Available in the live platform'); }
      }, label);
    }

    // ── VIEW: Dashboard ────────────────────────────────────────────────────
    function viewDashboard() {
      var wrap = el('div');
      wrap.appendChild(el('div', { class: 'vd-greeting' }, [
        document.createTextNode(greeting() + ', '),
        el('span', { class: 'name' }, 'Amira.')
      ]));
      wrap.appendChild(el('div', { class: 'vd-sub' }, "You have 2 tasks due today. Let's get moving."));

      // stat strip
      var stats = el('div', { class: 'vd-grid cols-4', style: 'grid-template-columns:repeat(4,1fr);margin-bottom:24px;' });
      [
        { label: 'Streak', value: '🔥 14 days' },
        { label: 'XP', value: '⚡ 2,340' },
        { label: 'Tier', value: 'Skilled' },
        { label: 'Plan', value: 'Breakthrough' }
      ].forEach(function (s) {
        stats.appendChild(el('div', { class: 'vd-card', style: 'padding:14px;' }, [
          el('div', { style: 'font-size:11px;color:' + T.muted + ';text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;' }, s.label),
          el('div', { style: 'font-size:16px;font-weight:600;color:#fff;' }, s.value)
        ]));
      });
      wrap.appendChild(stats);

      // upcoming 1:1
      var sess = el('div', { class: 'vd-card', style: 'border-left:3px solid ' + T.sapphire + ';margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;' }, [
        el('div', null, [
          el('span', { class: 'vd-pill sapphire' }, 'Upcoming 1:1'),
          el('div', { class: 'vd-h', style: 'font-size:22px;margin-top:8px;' }, 'CAREER DIRECTION CHECK-IN'),
          el('div', { style: 'color:' + T.muted + ';font-size:13px;margin-top:4px;' }, 'Tomorrow · 4:00 PM GST')
        ]),
        unavailableBtn('Join Session')
      ]);
      wrap.appendChild(sess);

      // two-col: chart + timer+upnext
      var twoCol = el('div', { class: 'vd-grid cols-2-mobile-1', style: 'grid-template-columns:1.4fr 1fr;' });

      var chartCard = el('div', { class: 'vd-card' });
      chartCard.appendChild(el('div', { style: 'font-size:13px;color:' + T.muted + ';margin-bottom:14px;' }, 'WEEKLY ACTIVITY'));
      var days = ['M','T','W','T','F','S','S'];
      var heights = [40, 55, 95, 35, 90, 30, 25];
      var bars = el('div', { style: 'display:flex;gap:8px;align-items:flex-end;height:140px;' });
      days.forEach(function (d, i) {
        var hot = i === 2 || i === 4;
        bars.appendChild(el('div', { style: 'flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end;' }, [
          el('div', { style: 'width:100%;height:' + heights[i] + 'px;background:' + (hot ? T.sapphire : 'rgba(255,255,255,.1)') + ';border-radius:6px 6px 0 0;' }),
          el('div', { style: 'font-size:11px;color:' + (hot ? '#fff' : T.muted) + ';font-weight:' + (hot ? 600 : 400) + ';' }, d)
        ]));
      });
      chartCard.appendChild(bars);
      twoCol.appendChild(chartCard);

      // right col: timer + up next
      var rightCol = el('div', { style: 'display:flex;flex-direction:column;gap:16px;' });

      var timerCard = el('div', { class: 'vd-card', style: 'text-align:center;' });
      timerCard.appendChild(el('div', { style: 'font-size:12px;color:' + T.muted + ';letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;' }, 'Focus Timer'));
      var timeEl = el('div', { class: 'vd-h', style: 'font-size:54px;color:#fff;margin-bottom:12px;' }, fmtTime(state.timer.seconds));
      timerCard.appendChild(timeEl);
      var timerBtn = el('button', { class: 'vd-btn', style: 'width:100%;', onclick: toggleTimer }, timerBtnLabel());
      timerCard.appendChild(timerBtn);
      state.timer.onTick = function () {
        timeEl.textContent = fmtTime(state.timer.seconds);
        timerBtn.textContent = timerBtnLabel();
      };
      rightCol.appendChild(timerCard);

      var upNext = el('div', { class: 'vd-card' });
      upNext.appendChild(el('div', { style: 'font-size:12px;color:' + T.muted + ';letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;' }, 'Up Next'));
      [
        ['Draft elevator pitch', 120],
        ['Weekly reflection journal', 80],
        ['Complete LinkedIn profile', 60]
      ].forEach(function (t) {
        upNext.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid ' + T.border + ';' }, [
          el('div', { style: 'font-size:13px;' }, t[0]),
          el('span', { class: 'vd-chip coral' }, '+' + t[1] + ' XP')
        ]));
      });
      rightCol.appendChild(upNext);

      twoCol.appendChild(rightCol);
      wrap.appendChild(twoCol);
      return wrap;
    }

    function fmtTime(s) {
      var m = Math.floor(s / 60), sec = s % 60;
      return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
    }
    function timerBtnLabel() {
      if (state.timer.running) return 'Pause';
      if (state.timer.seconds < 25 * 60 && state.timer.seconds > 0) return 'Resume';
      return 'Start Focus';
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

    // ── VIEW: Tasks & Goals ────────────────────────────────────────────────
    function viewTasks() {
      var wrap = el('div');
      wrap.appendChild(el('div', { class: 'vd-greeting' }, 'TASKS & GOALS'));

      var subTabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;' });
      ['tasks', 'goals', 'metrics'].forEach(function (id) {
        var label = id === 'tasks' ? 'Tasks' : id === 'goals' ? 'Goals' : 'Focus Metrics';
        subTabs.appendChild(el('button', {
          class: 'vd-subtab' + (state.taskSubTab === id ? ' active' : ''),
          onclick: function () { state.taskSubTab = id; renderAll(); }
        }, label));
      });
      wrap.appendChild(subTabs);

      if (state.taskSubTab === 'tasks') wrap.appendChild(renderTasksTab());
      else if (state.taskSubTab === 'goals') wrap.appendChild(renderGoalsTab());
      else wrap.appendChild(renderMetricsTab());

      // Eisenhower matrix
      var eis = el('div', { style: 'margin-top:28px;' });
      eis.appendChild(el('div', { style: 'font-size:13px;color:' + T.muted + ';margin-bottom:12px;text-transform:uppercase;letter-spacing:1.5px;' }, 'Priority Matrix'));
      var grid = el('div', { class: 'vd-grid', style: 'grid-template-columns:1fr 1fr;gap:12px;' });
      var quads = [
        { label: 'Do Now', color: T.coral, task: 'Draft elevator pitch' },
        { label: 'Do Next', color: T.sapphire, task: 'LinkedIn profile' },
        { label: 'Handle Soon', color: T.teal, task: 'Reflection journal' },
        { label: 'Revisit Later', color: T.muted, task: 'Old draft cleanup' }
      ];
      quads.forEach(function (q) {
        grid.appendChild(el('div', { class: 'vd-card', style: 'border-top:2px solid ' + q.color + ';' }, [
          el('div', { style: 'font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:' + q.color + ';margin-bottom:8px;' }, q.label),
          el('span', { class: 'vd-chip' }, q.task)
        ]));
      });
      eis.appendChild(grid);
      wrap.appendChild(eis);
      return wrap;
    }

    function renderTasksTab() {
      var wrap = el('div');
      wrap.appendChild(el('div', { style: 'font-size:11px;color:' + T.muted + ';text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;' }, 'Today'));

      state.tasks.forEach(function (t) {
        var rowEl = el('div', { class: 'vd-card', style: 'padding:0;margin-bottom:10px;' });
        var row = el('div', {
          class: 'vd-row' + (t.done ? ' done' : ''),
          style: 'cursor:pointer;padding:14px 16px;',
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
        row.appendChild(el('div', { class: 'vd-task-title', style: 'flex:1;font-size:14px;' }, t.title));
        row.appendChild(el('span', { class: 'vd-chip' }, t.subject));
        var pColor = t.priority === 'high' ? T.coral : t.priority === 'med' ? T.sapphire : T.teal;
        row.appendChild(el('div', { style: 'width:10px;height:10px;border-radius:50%;background:' + pColor + ';' }));
        rowEl.appendChild(row);

        if (t.expanded) {
          var detail = el('div', { style: 'padding:16px;border-top:1px solid ' + T.border + ';background:' + T.cardHi + ';border-radius:0 0 12px 12px;' });
          detail.appendChild(el('div', { style: 'font-size:13px;color:' + T.muted + ';margin-bottom:10px;' }, 'Subtasks'));
          t.subs.forEach(function (s, i) {
            var sRow = el('div', { style: 'display:flex;align-items:center;gap:10px;padding:8px 0;' });
            var sCheck = el('button', {
              class: 'vd-check' + (s.done ? ' checked' : ''),
              onclick: function (e) { e.stopPropagation(); s.done = !s.done; renderAll(); }
            }, s.done ? '✓' : '');
            sRow.appendChild(sCheck);
            sRow.appendChild(el('div', { style: 'flex:1;font-size:13px;' + (s.done ? 'text-decoration:line-through;color:' + T.muted + ';' : ''), }, s.title));
            if (s.ai) sRow.appendChild(el('span', { class: 'vd-chip sapphire', style: 'font-size:10px;padding:3px 7px;' }, 'AI'));
            detail.appendChild(sRow);
          });
          // mini timer
          var mini = el('div', { style: 'display:flex;align-items:center;gap:12px;margin-top:14px;padding-top:14px;border-top:1px solid ' + T.border + ';' });
          var miniTime = el('div', { class: 'vd-h', style: 'font-size:22px;' }, fmtTime(state.timer.seconds));
          var miniBtn = el('button', { class: 'vd-btn ghost', style: 'padding:6px 14px;min-height:36px;font-size:12px;', onclick: toggleTimer }, timerBtnLabel());
          mini.appendChild(el('div', { style: 'font-size:11px;color:' + T.muted + ';text-transform:uppercase;letter-spacing:1px;' }, 'Focus'));
          mini.appendChild(miniTime);
          mini.appendChild(miniBtn);
          // hook into shared tick
          var prev = state.timer.onTick;
          state.timer.onTick = function () {
            if (prev) prev();
            miniTime.textContent = fmtTime(state.timer.seconds);
            miniBtn.textContent = timerBtnLabel();
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
        { title: 'Land my first internship', pct: 60, date: 'Aug 2026', status: 'In Progress' },
        { title: 'Build my personal brand', pct: 25, date: 'Dec 2026', status: 'In Progress' }
      ].forEach(function (g) {
        var card = el('div', { class: 'vd-card', style: 'margin-bottom:14px;' }, [
          el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;' }, [
            el('div', { style: 'font-size:16px;font-weight:600;' }, g.title),
            el('span', { class: 'vd-chip sapphire' }, g.status)
          ]),
          (function () { var b = el('div', { class: 'vd-bar', style: 'margin-bottom:8px;' }); b.appendChild(el('div', { style: 'width:' + g.pct + '%;' })); return b; })(),
          el('div', { style: 'display:flex;justify-content:space-between;font-size:12px;color:' + T.muted + ';' }, [
            el('div', null, g.pct + '% complete'),
            el('div', null, 'Target: ' + g.date)
          ])
        ]);
        wrap.appendChild(card);
      });
      return wrap;
    }

    function renderMetricsTab() {
      var wrap = el('div');
      var stats = el('div', { class: 'vd-grid cols-3', style: 'grid-template-columns:repeat(3,1fr);margin-bottom:24px;' });
      [['Total Focus Time', '4h 20m'], ['Sessions This Week', '6'], ['Longest Streak', '3h']].forEach(function (s) {
        stats.appendChild(el('div', { class: 'vd-card', style: 'text-align:center;' }, [
          el('div', { style: 'font-size:11px;color:' + T.muted + ';text-transform:uppercase;letter-spacing:1.2px;margin-bottom:8px;' }, s[0]),
          el('div', { class: 'vd-h', style: 'font-size:32px;color:#fff;' }, s[1])
        ]));
      });
      wrap.appendChild(stats);
      wrap.appendChild(el('div', { style: 'font-size:13px;color:' + T.muted + ';margin-bottom:10px;text-transform:uppercase;letter-spacing:1.5px;' }, 'Activity heatmap'));
      var heat = el('div', { style: 'display:grid;grid-template-columns:repeat(7,1fr);gap:6px;max-width:340px;' });
      var pattern = [0.2, 0.6, 0.8, 0.3, 1, 0.5, 0.1, 0.4, 0.7, 0.9, 0.2, 0.6, 0.3, 0.5, 0.1, 0.8, 0.5, 0.3, 0.7, 0.2, 0.4, 0.6, 0.9, 0.5, 0.3, 0.7, 0.4, 0.2];
      pattern.forEach(function (p) {
        heat.appendChild(el('div', { class: 'vd-heatcell', style: 'background:rgba(26,63,165,' + p + ');' }));
      });
      wrap.appendChild(heat);
      return wrap;
    }

    // ── VIEW: Sessions ─────────────────────────────────────────────────────
    function viewSessions() {
      var wrap = el('div');
      wrap.appendChild(el('div', { class: 'vd-greeting' }, 'YOUR SESSIONS'));
      wrap.appendChild(el('div', { style: 'font-size:11px;color:' + T.muted + ';text-transform:uppercase;letter-spacing:1.5px;margin-bottom:14px;' }, 'Upcoming'));

      // Card 1
      var c1 = el('div', { class: 'vd-card', style: 'margin-bottom:14px;border-left:3px solid ' + T.sapphire + ';' }, [
        el('span', { class: 'vd-pill sapphire' }, '1:1 Session'),
        el('div', { class: 'vd-h', style: 'font-size:22px;margin-top:10px;' }, 'CAREER DIRECTION CHECK-IN'),
        el('div', { style: 'color:' + T.muted + ';font-size:13px;margin-top:4px;' }, 'Tomorrow · 4:00 PM–4:45 PM GST'),
        el('div', { style: 'color:' + T.body + ';font-size:13px;margin-top:6px;' }, 'with Zach'),
        el('ul', { style: 'margin:14px 0;padding-left:20px;color:' + T.muted + ';font-size:13px;' }, [
          el('li', null, 'LinkedIn profile review'),
          el('li', null, 'Goal setting for Q3')
        ]),
        el('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;' }, [
          unavailableBtn('Add to Calendar', { ghost: true }),
          unavailableBtn('Join Session')
        ])
      ]);
      wrap.appendChild(c1);

      // Card 2
      var c2 = el('div', { class: 'vd-card', style: 'margin-bottom:20px;border-left:3px solid ' + T.teal + ';' }, [
        el('span', { class: 'vd-pill teal' }, 'Town Hall'),
        el('div', { class: 'vd-h', style: 'font-size:22px;margin-top:10px;' }, 'MEGA MONTHLY KICKOFF'),
        el('div', { style: 'color:' + T.muted + ';font-size:13px;margin-top:4px;' }, 'Sat 7 Jun · 6:00 PM GST'),
        el('div', { style: 'color:' + T.body + ';font-size:13px;margin-top:6px;' }, 'Open to all members'),
        el('div', { style: 'margin-top:14px;' }, unavailableBtn('Add to Calendar', { ghost: true }))
      ]);
      wrap.appendChild(c2);

      var toggle = el('button', {
        class: 'vd-btn ghost',
        onclick: function () { state.pastSessionsOpen = !state.pastSessionsOpen; renderAll(); }
      }, (state.pastSessionsOpen ? 'Hide' : 'Show') + ' past sessions');
      wrap.appendChild(toggle);
      if (state.pastSessionsOpen) {
        wrap.appendChild(el('div', { class: 'vd-card', style: 'margin-top:12px;opacity:.55;' }, [
          el('span', { class: 'vd-pill sapphire' }, '1:1 Session'),
          el('div', { class: 'vd-h', style: 'font-size:18px;margin-top:8px;' }, 'INTRO & ROADMAP'),
          el('div', { style: 'color:' + T.muted + ';font-size:12px;margin-top:4px;' }, '2 weeks ago · with Zach · Completed')
        ]));
      }
      return wrap;
    }

    // ── VIEW: Community ────────────────────────────────────────────────────
    function viewCommunity() {
      var wrap = el('div');
      wrap.appendChild(el('div', { class: 'vd-greeting' }, 'COMMUNITY'));

      var tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:18px;' });
      [['channels', 'Channels'], ['dms', 'Direct Messages']].forEach(function (t) {
        tabs.appendChild(el('button', {
          class: 'vd-subtab' + (state.communitySubTab === t[0] ? ' active' : ''),
          onclick: function () { state.communitySubTab = t[0]; renderAll(); }
        }, t[1]));
      });
      wrap.appendChild(tabs);

      if (state.communitySubTab === 'channels') {
        var split = el('div', { class: 'vd-grid cols-2-mobile-1', style: 'grid-template-columns:200px 1fr;align-items:start;' });
        var chList = el('div', { class: 'vd-card', style: 'padding:10px;' });
        chList.appendChild(el('div', { style: 'font-size:11px;color:' + T.muted + ';padding:6px 8px;text-transform:uppercase;letter-spacing:1px;' }, 'Channels'));
        chList.appendChild(el('div', { style: 'padding:10px 12px;border-radius:8px;background:' + T.sapphire + ';color:#fff;font-size:13px;font-weight:600;' }, '#mega-mentorship'));
        split.appendChild(chList);

        var chatWrap = el('div', { class: 'vd-card' });
        var msgs = [
          { name: 'Zach', initials: 'ZA', xp: '8,200 XP', time: '9:14 AM', text: 'Welcome to the community channel! Drop your goals for this week below 👇' },
          { name: 'Amira', initials: 'AM', xp: '2,340 XP', time: '9:22 AM', text: 'Landed an interview at a Dubai agency this morning! 🔥' },
          { name: 'Leilani', initials: 'LE', xp: '1,820 XP', time: '9:40 AM', text: 'Just finished my roadmap session — feeling so much clearer about next steps' },
          { name: 'Rami', initials: 'RA', xp: '1,150 XP', time: '10:02 AM', text: 'Week 3 done. Consistency is actually working.' }
        ];
        msgs.forEach(function (m) {
          chatWrap.appendChild(el('div', { style: 'display:flex;gap:12px;margin-bottom:14px;' }, [
            el('div', { class: 'vd-avatar' }, m.initials),
            el('div', { style: 'flex:1;' }, [
              el('div', { style: 'display:flex;gap:8px;align-items:center;margin-bottom:4px;flex-wrap:wrap;' }, [
                el('strong', { style: 'font-size:13px;' }, m.name),
                el('span', { class: 'vd-chip', style: 'font-size:10px;padding:2px 6px;color:' + T.muted + ';' }, m.xp),
                el('span', { style: 'font-size:11px;color:' + T.muted + ';' }, m.time)
              ]),
              el('div', { style: 'font-size:14px;color:' + T.body + ';' }, m.text)
            ])
          ]));
        });
        chatWrap.appendChild(el('div', { style: 'margin-top:8px;background:' + T.cardHi + ';border-radius:8px;padding:10px 14px;color:' + T.muted + ';font-size:13px;' }, 'Message #mega-mentorship'));
        split.appendChild(chatWrap);
        wrap.appendChild(split);

        // Wins board
        var winsTitle = el('div', { class: 'vd-h', style: 'font-size:24px;margin:28px 0 12px;' }, 'WINS BOARD');
        wrap.appendChild(winsTitle);
        var winCard = el('div', { class: 'vd-card' }, [
          el('div', { style: 'display:flex;gap:12px;align-items:center;margin-bottom:12px;' }, [
            el('div', { class: 'vd-avatar' }, 'AM'),
            el('div', null, [
              el('div', { style: 'font-weight:600;font-size:14px;' }, 'Amira Malik'),
              el('div', { style: 'font-size:12px;color:' + T.muted + ';' }, 'Marketing Student')
            ])
          ]),
          el('div', { style: 'font-size:14px;margin-bottom:14px;' }, 'Got my first freelance client! Proof that the outreach scripts actually work 🎉'),
          (function () {
            var rxRow = el('div', { style: 'display:flex;gap:8px;' });
            [['up', '👍'], ['fire', '🔥'], ['star', '⭐']].forEach(function (r) {
              rxRow.appendChild(el('button', {
                class: 'vd-chip',
                style: 'cursor:pointer;',
                onclick: function (e) { state.reactions[r[0]]++; e.currentTarget.querySelector('.count').textContent = state.reactions[r[0]]; }
              }, [
                document.createTextNode(r[1] + ' '),
                el('span', { class: 'count', style: 'margin-left:4px;font-weight:600;' }, String(state.reactions[r[0]]))
              ]));
            });
            return rxRow;
          })()
        ]);
        wrap.appendChild(winCard);
      } else {
        var dm = el('div', { class: 'vd-card' }, [
          el('div', { style: 'display:flex;gap:12px;align-items:center;padding:8px 0;border-bottom:1px solid ' + T.border + ';' }, [
            el('div', { class: 'vd-avatar' }, 'ZA'),
            el('div', { style: 'flex:1;' }, [
              el('div', { style: 'font-weight:600;font-size:14px;' }, 'Zach (Founder)'),
              el('div', { style: 'font-size:13px;color:' + T.muted + ';' }, 'See you tomorrow at 4pm!')
            ]),
            el('div', { style: 'font-size:11px;color:' + T.muted + ';' }, '2h ago')
          ]),
          el('div', { style: 'padding:16px 0;' }, [
            el('div', { style: 'margin-bottom:10px;' }, [
              el('strong', { style: 'font-size:13px;' }, 'Zach: '),
              el('span', { style: 'font-size:14px;color:' + T.body + ';' }, "Hey Amira — ready for tomorrow's session?")
            ]),
            el('div', null, [
              el('strong', { style: 'font-size:13px;' }, 'Amira: '),
              el('span', { style: 'font-size:14px;color:' + T.body + ';' }, "Yes! Got my goals ready. See you tomorrow at 4pm!")
            ])
          ])
        ]);
        wrap.appendChild(dm);
      }
      return wrap;
    }

    // ── VIEW: Resources ────────────────────────────────────────────────────
    function viewResources() {
      var wrap = el('div');
      wrap.appendChild(el('span', { class: 'vd-pill teal' }, 'Coming Soon · Currently in Beta'));
      wrap.appendChild(el('div', { class: 'vd-greeting', style: 'margin-top:10px;' }, 'RESOURCE LIBRARY'));

      // folder tabs
      var tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;' });
      [
        { id: 'foundations', label: 'Foundations' },
        { id: 'breakthrough', label: 'Breakthrough' },
        { id: 'management', label: 'MEGA Management', locked: true }
      ].forEach(function (f) {
        tabs.appendChild(el('button', {
          class: 'vd-subtab' + (state.resourceFolder === f.id ? ' active' : ''),
          style: f.locked ? 'opacity:.55;' : '',
          onclick: function () {
            if (f.locked) return;
            state.resourceFolder = f.id; renderAll();
          },
          html: f.label + (f.locked ? ' ' + ICONS.lock : '')
        }));
      });
      wrap.appendChild(tabs);

      var foundationsCards = [
        { title: 'How to Write a Standout CV', subject: 'Career Development', type: 'Template', dur: '15 min', icon: ICONS.template },
        { title: 'Public Speaking Fundamentals', subject: 'Communication', type: 'Video', dur: '32 min', icon: ICONS.video },
        { title: 'LinkedIn Optimization Guide', subject: 'Personal Branding', type: 'Article', dur: '8 min read', icon: ICONS.article },
        { title: 'Time Blocking for Students', subject: 'Productivity', type: 'Template', dur: '10 min', icon: ICONS.template }
      ];
      var breakthroughCards = [
        { title: 'Advanced Negotiation Tactics', subject: 'Career Growth', type: 'Video', dur: '48 min', icon: ICONS.video, locked: true },
        { title: 'Building a Side Income', subject: 'Finance', type: 'Article', dur: '20 min read', icon: ICONS.article, locked: false },
        { title: 'Executive Presence Playbook', subject: 'Leadership', type: 'Template', dur: '25 min', icon: ICONS.template, locked: true }
      ];

      var cards = state.resourceFolder === 'foundations' ? foundationsCards : breakthroughCards;

      // recently added
      wrap.appendChild(el('div', { style: 'font-size:11px;color:' + T.muted + ';text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;' }, 'Recently Added'));
      var rec = el('div', { style: 'display:flex;flex-direction:column;gap:8px;margin-bottom:24px;' });
      cards.slice(0, 2).forEach(function (c) {
        rec.appendChild(el('div', { class: 'vd-card', style: 'display:flex;align-items:center;gap:12px;padding:12px 14px;' }, [
          el('div', { style: 'width:36px;height:36px;background:' + T.cardHi + ';border-radius:8px;display:flex;align-items:center;justify-content:center;color:' + T.sapphire + ';', html: c.icon }),
          el('div', { style: 'flex:1;' }, [
            el('div', { style: 'font-size:14px;font-weight:600;' }, c.title),
            el('div', { style: 'font-size:12px;color:' + T.muted + ';' }, c.subject + ' · ' + c.type)
          ]),
          el('div', { style: 'font-size:12px;color:' + T.muted + ';' }, c.dur)
        ]));
      });
      wrap.appendChild(rec);

      // grid
      var grid = el('div', { class: 'vd-grid cols-4', style: 'grid-template-columns:repeat(' + (cards.length === 4 ? 4 : 3) + ',1fr);' });
      cards.forEach(function (c) {
        var card = el('div', { class: 'vd-card', style: 'padding:0;overflow:hidden;position:relative;' });
        var thumb = el('div', { style: 'background:' + T.cardHi + ';height:90px;display:flex;align-items:center;justify-content:center;color:' + T.sapphire + ';', html: c.icon });
        card.appendChild(thumb);
        var bodyD = el('div', { style: 'padding:14px;' }, [
          el('div', { style: 'font-size:14px;font-weight:600;margin-bottom:8px;' }, c.title),
          el('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;' }, [
            el('span', { class: 'vd-chip', style: 'font-size:10px;padding:3px 7px;' }, c.subject),
            el('span', { class: 'vd-chip sapphire', style: 'font-size:10px;padding:3px 7px;' }, c.type)
          ]),
          el('div', { style: 'font-size:12px;color:' + T.muted + ';margin-bottom:10px;' }, c.dur),
          unavailableBtn('View', { coral: true })
        ]);
        card.appendChild(bodyD);
        if (c.locked) {
          card.appendChild(el('div', {
            style: 'position:absolute;inset:0;background:rgba(13,15,26,.85);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#fff;font-size:13px;font-weight:600;',
            html: ICONS.lock + '<div style="margin-top:8px;">Unlocked with Breakthrough</div>'
          }));
        }
        grid.appendChild(card);
      });
      wrap.appendChild(grid);
      return wrap;
    }

    // ── VIEW: Profile ──────────────────────────────────────────────────────
    function viewProfile() {
      var wrap = el('div');
      // member card
      var mem = el('div', { class: 'vd-card', style: 'display:flex;gap:16px;align-items:center;margin-bottom:18px;flex-wrap:wrap;' }, [
        el('div', { class: 'vd-avatar', style: 'width:64px;height:64px;font-size:22px;' }, 'AM'),
        el('div', { style: 'flex:1;min-width:180px;' }, [
          el('div', { class: 'vd-h', style: 'font-size:24px;' }, 'AMIRA MALIK'),
          el('div', { style: 'color:' + T.muted + ';font-size:13px;margin-top:4px;' }, 'Marketing Student · Dubai')
        ]),
        el('span', { class: 'vd-pill sapphire' }, 'Breakthrough')
      ]);
      wrap.appendChild(mem);

      // XP progress
      var xpCard = el('div', { class: 'vd-card', style: 'margin-bottom:18px;' });
      xpCard.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;' }, [
        el('div', { style: 'font-size:13px;font-weight:600;' }, 'Skilled'),
        el('div', { style: 'font-size:13px;color:' + T.muted + ';' }, 'Pro')
      ]));
      xpCard.appendChild(el('div', { class: 'vd-h', style: 'font-size:20px;margin-bottom:6px;' }, '2,340 XP'));
      var bar = el('div', { class: 'vd-bar' });
      bar.appendChild(el('div', { style: 'width:47%;' }));
      xpCard.appendChild(bar);
      xpCard.appendChild(el('div', { style: 'font-size:11px;color:' + T.muted + ';margin-top:6px;' }, '2,340 / 5,000 XP to Pro'));
      wrap.appendChild(xpCard);

      // tier strip
      var tiers = ['Rookie','Contender','Prospect','Hustler','Skilled','Pro','Elite','Icon'];
      var tierStrip = el('div', { style: 'display:flex;gap:6px;margin-bottom:18px;flex-wrap:wrap;' });
      tiers.forEach(function (t) {
        var isCur = t === 'Skilled';
        tierStrip.appendChild(el('span', {
          class: 'vd-chip',
          style: isCur ? 'background:' + T.sapphire + ';color:#fff;border-color:' + T.sapphire + ';font-weight:600;' : 'font-size:11px;color:' + T.muted + ';'
        }, t));
      });
      wrap.appendChild(tierStrip);

      // stats
      var stats = el('div', { class: 'vd-grid cols-4', style: 'grid-template-columns:repeat(4,1fr);margin-bottom:24px;' });
      [['Streak','14'],['Tasks Done','31'],['Sessions','8'],['Goals Active','2']].forEach(function (s) {
        stats.appendChild(el('div', { class: 'vd-card', style: 'text-align:center;padding:14px;' }, [
          el('div', { style: 'font-size:11px;color:' + T.muted + ';text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;' }, s[0]),
          el('div', { class: 'vd-h', style: 'font-size:24px;color:#fff;' }, s[1])
        ]));
      });
      wrap.appendChild(stats);

      // badges
      wrap.appendChild(el('div', { class: 'vd-h', style: 'font-size:22px;margin-bottom:12px;' }, 'ACHIEVEMENTS'));
      var unlocked = [
        { name: 'First Step', icon: '✓', color: T.teal },
        { name: 'Week Warrior', icon: '📅', color: T.sapphire },
        { name: 'On A Roll', icon: '🔥', color: T.coral },
        { name: 'Deep Focus', icon: '⏱', color: T.sapphire },
        { name: 'Task Machine', icon: '☑', color: T.teal },
        { name: 'Conversation Starter', icon: '💬', color: T.coral }
      ];
      var locked = ['Fortnight Focus','Goal Getter','Consistent','Marathon','Community Pillar','Win Sharer'];
      var bGrid = el('div', { class: 'vd-grid cols-badges', style: 'grid-template-columns:repeat(4,1fr);' });
      unlocked.forEach(function (b) {
        bGrid.appendChild(el('div', { class: 'vd-badge', style: 'background:' + b.color + '22;border:1px solid ' + b.color + '55;color:#fff;' }, [
          el('div', { style: 'font-size:24px;' }, b.icon),
          el('div', null, b.name)
        ]));
      });
      locked.forEach(function (n) {
        var node = el('div', { class: 'vd-badge locked' });
        node.innerHTML = '<div style="opacity:.4;">' + ICONS.lock + '</div><div>' + n + '</div>';
        bGrid.appendChild(node);
      });
      wrap.appendChild(bGrid);

      var viewAll = el('button', {
        class: 'vd-btn ghost',
        style: 'margin-top:16px;',
        onclick: function () { state.badgeModalOpen = true; renderModal(); }
      }, 'View All Badges');
      wrap.appendChild(viewAll);
      return wrap;
    }

    // ── Modal ──────────────────────────────────────────────────────────────
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
      card.appendChild(el('div', { class: 'vd-h', style: 'font-size:24px;margin-bottom:18px;color:#fff;' }, 'ALL BADGES'));
      var all = [
        ['First Step', T.teal], ['Week Warrior', T.sapphire], ['On A Roll', T.coral],
        ['Deep Focus', T.sapphire], ['Task Machine', T.teal], ['Conversation Starter', T.coral],
        ['Fortnight Focus', null], ['Goal Getter', null], ['Consistent', null],
        ['Marathon', null], ['Community Pillar', null], ['Win Sharer', null]
      ];
      var grid = el('div', { style: 'display:grid;grid-template-columns:repeat(4,1fr);gap:12px;' });
      all.forEach(function (b) {
        if (b[1]) {
          grid.appendChild(el('div', { class: 'vd-badge', style: 'background:' + b[1] + '22;border:1px solid ' + b[1] + '55;color:#fff;font-family:Montserrat;' }, [
            el('div', { style: 'font-size:24px;' }, '⭐'),
            el('div', null, b[0])
          ]));
        } else {
          var n = el('div', { class: 'vd-badge locked', style: 'font-family:Montserrat;' });
          n.innerHTML = '<div style="opacity:.4;">' + ICONS.lock + '</div><div>' + b[0] + '</div>';
          grid.appendChild(n);
        }
      });
      card.appendChild(grid);
      modalRoot.appendChild(card);
      document.body.appendChild(modalRoot);
    }

    // ── Render orchestrator ────────────────────────────────────────────────
    function renderAll() {
      // reset shared timer callback before per-view register
      state.timer.onTick = null;
      renderNav();
      mainArea.innerHTML = '';
      var view;
      switch (state.view) {
        case 'tasks': view = viewTasks(); break;
        case 'sessions': view = viewSessions(); break;
        case 'community': view = viewCommunity(); break;
        case 'resources': view = viewResources(); break;
        case 'profile': view = viewProfile(); break;
        default: view = viewDashboard();
      }
      mainArea.appendChild(view);
      mainArea.scrollTop = 0;
    }

    renderAll();
  }

  window.mountVantageDemo = mountVantageDemo;
})();
