import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const Ico = ({ d, vb = "0 0 24 24" }) => (
  <svg viewBox={vb} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d.map((p, i) => React.createElement(p[0], { key: i, ...p[1] }))}
  </svg>
);

const icons = {
  bin: [['polyline', { points: "3 6 5 6 21 6" }], ['path', { d: "M19 6l-1 14H6L5 6" }], ['path', { d: "M10 11v6" }], ['path', { d: "M14 11v6" }], ['path', { d: "M9 6V4h6v2" }]],
  clock: [['circle', { cx: "12", cy: "12", r: "10" }], ['polyline', { points: "12 6 12 12 16 14" }]],
  map: [['polygon', { points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" }], ['line', { x1: "9", y1: "3", x2: "9", y2: "18" }], ['line', { x1: "15", y1: "6", x2: "15", y2: "21" }]],
  alert: [['path', { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }], ['line', { x1: "12", y1: "9", x2: "12", y2: "13" }], ['line', { x1: "12", y1: "17", x2: "12.01", y2: "17" }]],
  user: [['path', { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }], ['circle', { cx: "12", cy: "7", r: "4" }]],
  settings: [['circle', { cx: "12", cy: "12", r: "3" }], ['path', { d: "M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" }]],
  truck: [['rect', { x: "1", y: "3", width: "15", height: "13" }], ['polygon', { points: "16 8 20 8 23 11 23 16 16 16 16 8" }], ['circle', { cx: "5.5", cy: "18.5", r: "2.5" }], ['circle', { cx: "18.5", cy: "18.5", r: "2.5" }]],
  sync: [['polyline', { points: "23 4 23 10 17 10" }], ['polyline', { points: "1 20 1 14 7 14" }], ['path', { d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" }]],
  leaf: [['path', { d: "M17 8C8 10 5.9 16.17 3.82 19.07A2 2 0 0 0 5.5 22c2.28 0 5.5-2.14 5.5-4" }], ['path', { d: "M22 2c0 0-3.1 2-8 4a20 20 0 0 1 0 8 20 20 0 0 1-4 4 12 12 0 0 1 0 4" }]],
  bolt: [['polygon', { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }]],
  chart: [['line', { x1: "18", y1: "20", x2: "18", y2: "10" }], ['line', { x1: "12", y1: "20", x2: "12", y2: "4" }], ['line', { x1: "6", y1: "20", x2: "6", y2: "14" }], ['line', { x1: "2", y1: "20", x2: "22", y2: "20" }]],
  recycle: [['path', { d: "M13 20l-3 3 3 3" }], ['path', { d: "M10 23h8a6 6 0 0 0 0-12h-2" }], ['path', { d: "M23 16l3-3-3-3" }], ['path', { d: "M26 13h-8a6 6 0 0 0 0 12h2" }]],
};

const HeroArt = () => (
  <svg viewBox="0 0 620 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bdd4a2" /><stop offset="100%" stopColor="#dceec8" />
      </linearGradient>
      <linearGradient id="bG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a9e38" /><stop offset="100%" stopColor="#2d4a1e" />
      </linearGradient>
      <radialGradient id="glo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8bc34a" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#8bc34a" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="620" height="700" fill="url(#sky)" />
    <circle cx="530" cy="95" r="64" fill="#d5ecb4" opacity="0.5" />
    <circle cx="530" cy="95" r="40" fill="#c8e4a4" opacity="0.65" />
    {/* Big tree */}
    <rect x="68" y="330" width="22" height="270" rx="8" fill="#3d2b1a" />
    <circle cx="79" cy="276" r="82" fill="#2d4a1e" opacity="0.92" />
    <circle cx="52" cy="302" r="60" fill="#3a6b22" />
    <circle cx="106" cy="290" r="68" fill="#4a7c2f" />
    <circle cx="79" cy="252" r="70" fill="#5a9e38" />
    <circle cx="63" cy="234" r="28" fill="#8bc34a" opacity="0.3" />
    {/* Mid tree */}
    <rect x="238" y="370" width="16" height="230" rx="6" fill="#3d2b1a" />
    <circle cx="246" cy="325" r="64" fill="#2d4a1e" opacity="0.95" />
    <circle cx="225" cy="345" r="48" fill="#3a6b22" />
    <circle cx="267" cy="336" r="54" fill="#4a7c2f" />
    <circle cx="246" cy="306" r="58" fill="#5a9e38" />
    <circle cx="232" cy="288" r="21" fill="#8bc34a" opacity="0.28" />
    {/* Back tree */}
    <rect x="440" y="390" width="14" height="210" rx="5" fill="#3d2b1a" opacity="0.55" />
    <circle cx="447" cy="358" r="52" fill="#3a6b22" opacity="0.55" />
    <circle cx="447" cy="336" r="46" fill="#4a7c2f" opacity="0.5" />
    {/* Platform */}
    <ellipse cx="306" cy="510" rx="205" ry="44" fill="#7a9060" opacity="0.48" />
    <rect x="128" y="478" width="350" height="50" rx="18" fill="#8a9e72" opacity="0.52" />
    <ellipse cx="200" cy="478" rx="54" ry="14" fill="#6aa84f" opacity="0.78" />
    <ellipse cx="316" cy="474" rx="38" ry="11" fill="#8bc34a" opacity="0.68" />
    <ellipse cx="408" cy="478" rx="32" ry="10" fill="#6aa84f" opacity="0.62" />
    {/* Smart bin */}
    <rect x="348" y="386" width="66" height="92" rx="13" fill="url(#bG)" />
    <rect x="342" y="376" width="78" height="16" rx="7" fill="#3a6b22" />
    <rect x="358" y="404" width="46" height="30" rx="5" fill="#1a2c14" />
    <text x="381" y="423" textAnchor="middle" fontSize="11" fill="#8bc34a" fontFamily="DM Sans,sans-serif" fontWeight="500">78%</text>
    <circle cx="362" cy="480" r="7" fill="#2d4a1e" />
    <circle cx="400" cy="480" r="7" fill="#2d4a1e" />
    <path d="M372 364 Q381 353 390 364" stroke="#8bc34a" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.75" />
    <path d="M368 358 Q381 343 394 358" stroke="#8bc34a" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.5" />
    <circle cx="381" cy="364" r="3" fill="#8bc34a" opacity="0.9" />
    <ellipse cx="381" cy="488" rx="36" ry="9" fill="url(#glo)" />
    {/* Ground */}
    <rect x="0" y="540" width="620" height="160" fill="#4a7c2f" opacity="0.42" rx="8" />
    <ellipse cx="310" cy="545" rx="305" ry="30" fill="#5a8e38" opacity="0.28" />
    {/* Leaves */}
    <ellipse cx="432" cy="285" rx="17" ry="10" fill="#8bc34a" opacity="0.52" transform="rotate(-35 432 285)" />
    <ellipse cx="148" cy="428" rx="14" ry="8" fill="#6aa84f" opacity="0.42" transform="rotate(22 148 428)" />
    <ellipse cx="494" cy="368" rx="11" ry="7" fill="#8bc34a" opacity="0.38" transform="rotate(-18 494 368)" />
    {/* Birds */}
    <path d="M462 178 Q472 170 482 178" stroke="#3a6b22" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M498 162 Q508 154 518 162" stroke="#3a6b22" strokeWidth="1.8" fill="none" strokeLinecap="round" />
  </svg>
);

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const problems = [
    { k: 'bin', title: 'Overflowing Bins', desc: 'Bins fill faster than scheduled pickups, creating hazards and unsanitary conditions in neighbourhoods.' },
    { k: 'clock', title: 'Delayed Collection', desc: 'No real-time visibility means trucks arrive too late or miss full bins on their fixed daily routes.' },
    { k: 'map', title: 'No Route Tracking', desc: 'Without GPS monitoring, managers cannot verify where workers are or whether jobs were completed.' },
    { k: 'alert', title: 'Citizen Complaints', desc: 'No direct reporting channel means complaints get lost in emails, leading to unresolved issues for weeks.' },
  ];

  const features = [
    { num: '01', title: 'Smart Bin Tracking', desc: 'IoT sensors monitor fill levels 24/7 and push automated alerts to staff when action is needed.' },
    { num: '02', title: 'Complaint Reporting', desc: 'Citizens submit issues with photo and GPS location directly from a mobile browser — no app install needed.' },
    { num: '03', title: 'Worker Assignment', desc: 'Admin dashboard assigns the nearest available sanitation worker to a complaint in one click.' },
    { num: '04', title: 'Data Monitoring', desc: 'Live analytics show collection rates, response times, and bin status across every city zone.' },
  ];

  const steps = [
    { k: 'user', title: 'User Reports Issue', desc: 'Resident submits a complaint with photo and GPS location via the citizen portal.' },
    { k: 'settings', title: 'Admin Assigns Worker', desc: 'Admin is alerted and assigns the nearest available worker from the dashboard.' },
    { k: 'truck', title: 'Worker Collects Waste', desc: 'Worker gets notified, navigates to the location, and completes the collection.' },
    { k: 'sync', title: 'Status Updated', desc: 'System marks the issue resolved and the citizen receives a confirmation notification.' },
  ];

  const benefits = [
    { k: 'leaf', title: 'Cleaner Environment', desc: 'Proactive monitoring stops overflow before it happens, keeping streets clean.' },
    { k: 'bolt', title: 'Faster Response', desc: 'Automated alerts cut average response time from days to under two hours.' },
    { k: 'chart', title: 'Better Management', desc: 'Data-driven insights help authorities optimise routes and allocate resources efficiently.' },
  ];

  const bars = [
    { label: 'Collection Efficiency', pct: 94 },
    { label: 'Complaint Resolution', pct: 88 },
    { label: 'Route Optimisation', pct: 76 },
    { label: 'Citizen Satisfaction', pct: 91 },
  ];

  const handleGetStarted = () => navigate('/login');

  return (
    <div className="landing-page">
      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo">
          <svg viewBox="0 0 36 36" fill="none" width="28" height="28">
            <circle cx="18" cy="18" r="16" fill="#edf5e4" />
            <path d="M13 20l-3 3 3 3" stroke="#3a6b22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 23h8a6 6 0 0 0 0-12h-2" stroke="#3a6b22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 16l3-3-3-3" stroke="#8bc34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 13h-8a6 6 0 0 0 0 12h2" stroke="#8bc34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          WasteWise
        </a>
        <ul className="nav-links">
          <li><a href="#problems">Problems</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#stats">Stats</a></li>
          <li><a href="#benefits">Benefits</a></li>
        </ul>
        <button className="nav-btn" onClick={handleGetStarted}>Get Started <span className="plus">+</span></button>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-img"><HeroArt /></div>
        <div className="hero-content">
          <div className="eyebrow anim">
            <span className="eyebrow-dot" /><span className="eyebrow-txt">Smart Waste Management</span>
          </div>
          <h1 className="h1 anim" style={{ animationDelay: '.1s' }}>
            Smart Waste<br /><em>Management</em><br />for a Cleaner City.
          </h1>
          <p className="hero-sub anim" style={{ animationDelay: '.18s' }}>
            Connecting citizens, sanitation workers, and city administrators through real-time data for smarter, faster waste collection.
          </p>
          <div className="hero-btns anim" style={{ animationDelay: '.26s' }}>
            <button className="btn-p" onClick={handleGetStarted}>Get Started <span className="c">+</span></button>
            <button className="btn-o" onClick={handleGetStarted}>Report Issue</button>
          </div>
        </div>
      </div>

      {/* PROBLEMS */}
      <section className="problem" id="problems">
        <div className="stag" data-aos="fade-up">The Challenge</div>
        <h2 className="sh2" data-aos="fade-up" data-aos-delay="100">Why cities <em>struggle</em><br />with waste today</h2>
        <p className="ssub" data-aos="fade-up" data-aos-delay="200">Traditional waste management relies on fixed schedules and manual reporting — leading to inefficiency, delays, and frustrated residents.</p>
        <div className="prob-grid">
          {problems.map((p, i) => (
            <div className="prob-card" key={i} data-aos="fade-up" data-aos-delay={300 + i * 100}>
              <div className="picon"><Ico d={icons[p.k]} /></div>
              <div className="ptitle">{p.title}</div>
              <div className="pdesc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="abt-layout">
          <div data-aos="fade-right">
            <div className="stag">About the System</div>
            <h2 className="sh2">Built to make<br /><em>cities cleaner</em></h2>
            <p className="ssub">WasteWise connects IoT-enabled smart bins, a citizen complaint portal, worker mobile app, and an admin dashboard into one unified platform — giving every stakeholder real-time visibility into city-wide waste operations.</p>
            <div className="abt-stats">
              {[['94%', 'Collection Rate'], ['1.2k', 'Smart Bins'], ['38%', 'Cost Saved']].map(([n, l], i) => (
                <div key={i}><div className="abt-snum">{n}</div><div className="abt-slbl">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="abt-vis" data-aos="fade-left">
            {bars.map((b, i) => (
              <div className="bar-row" key={i}>
                <div className="bar-lbl">{b.label}</div>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${b.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="stag" data-aos="fade-up">Platform Features</div>
        <h2 className="sh2" data-aos="fade-up" data-aos-delay="100">Everything you need<br />to <em>manage waste</em> smarter</h2>
        <p className="ssub" data-aos="fade-up" data-aos-delay="200">Four core modules that automate, monitor, and optimise city-wide waste collection end-to-end.</p>
        <div className="feat-grid">
          {features.map((f, i) => (
            <div className="feat-card" key={i} data-aos="fade-up" data-aos-delay={300 + i * 100}>
              <div className="feat-num">{f.num}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <div className="stag" data-aos="fade-up">Process</div>
        <h2 className="sh2" data-aos="fade-up" data-aos-delay="100">How it <em>works</em></h2>
        <p className="ssub" data-aos="fade-up" data-aos-delay="200">A four-step loop that closes the gap between a citizen spotting an issue and seeing it resolved.</p>
        <div className="how-steps">
          {steps.map((s, i) => (
            <div className="how-step" key={i} data-aos="fade-up" data-aos-delay={300 + i * 100}>
              <div className="step-circle">
                <Ico d={icons[s.k]} />
                <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats" id="stats">
        <div className="stag" data-aos="fade-up">Impact in Numbers</div>
        <h2 className="sh2" data-aos="fade-up" data-aos-delay="100">Results that <em>speak</em></h2>
        <p className="ssub" data-aos="fade-up" data-aos-delay="200">Pilot deployments across 12 cities have shown measurable improvement across every key performance metric.</p>
        <div className="stats-grid">
          <div className="stat-card" data-aos="zoom-in" data-aos-delay="100"><div className="stat-n">1.2<span>k</span></div><div className="stat-lbl">Total Bins Managed</div></div>
          <div className="stat-card" data-aos="zoom-in" data-aos-delay="200"><div className="stat-n">8.4<span>k</span></div><div className="stat-lbl">Complaints Resolved</div></div>
          <div className="stat-card" data-aos="zoom-in" data-aos-delay="300"><div className="stat-n">240</div><div className="stat-lbl">Active Workers</div></div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits" id="benefits">
        <div className="ben-layout">
          <div data-aos="fade-right">
            <div className="stag">Why WasteWise</div>
            <h2 className="sh2">The <em>benefits</em><br />for your city</h2>
            <p className="ssub">WasteWise isn't just software — it's a cleaner, more responsive city for everyone living in it.</p>
            <div className="ben-list">
              {benefits.map((b, i) => (
                <div className="ben-item" key={i} data-aos="fade-up" data-aos-delay={100 + i * 100}>
                  <div className="ben-dot"><Ico d={icons[b.k]} /></div>
                  <div><div className="ben-title">{b.title}</div><div className="ben-desc">{b.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="ben-vis" data-aos="fade-left" data-aos-delay="200">
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', marginBottom: 16, border: '1px solid rgba(90,158,56,0.12)' }}>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mu)', marginBottom: 14 }}>Today's Overview</div>
              <div style={{ display: 'flex', gap: 14 }}>
                {[['12', 'Reports'], ['8', 'Resolved'], ['4', 'Pending']].map(([n, l], i) => (
                  <div key={i} style={{ flex: 1, background: 'var(--gp2)', borderRadius: 10, padding: '14px' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 34, fontWeight: 300, color: 'var(--gd)', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 10, color: 'var(--mu)', marginTop: 5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', border: '1px solid rgba(90,158,56,0.12)' }}>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mu)', marginBottom: 14 }}>Bin Fill Levels</div>
              {[['Sector A – Zone 3', '78%', 'var(--ga)'], ['Sector B – Zone 1', '45%', 'var(--gm)'], ['Sector C – Zone 5', '92%', '#d64e2a']].map(([lbl, pct, col], i) => (
                <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--mu)', marginBottom: 6 }}>
                    <span>{lbl}</span><span style={{ color: col, fontWeight: 500 }}>{pct}</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--gr2)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: pct, height: '100%', background: col, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="stag" data-aos="fade-up">Join the Movement</div>
        <div className="cta-h2" data-aos="fade-up" data-aos-delay="100">Ready to build a<br /><em>cleaner city?</em></div>
        <p className="cta-sub" data-aos="fade-up" data-aos-delay="200">Join municipalities already using WasteWise to make waste management smarter, faster, and more transparent for everyone.</p>
        <div className="cta-btns" data-aos="fade-up" data-aos-delay="300">
          <button className="btn-g" onClick={handleGetStarted}>Login</button>
          <button className="btn-wo" onClick={handleGetStarted}>Sign Up</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="flogo">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#5a9e38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 8C8 10 5.9 16.17 3.82 19.07A2 2 0 0 0 5.5 22c2.28 0 5.5-2.14 5.5-4" />
            <path d="M22 2c0 0-3.1 2-8 4a20 20 0 0 1 0 8 20 20 0 0 1-4 4 12 12 0 0 1 0 4" />
          </svg>
          WasteWise
        </div>
        <ul className="flinks">
          <li><a href="#">Home</a></li>
          <li><a href="#problems">Problems</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#stats">Statistics</a></li>
          <li><a href="#benefits">Benefits</a></li>
        </ul>
        <div className="fcopy">© 2026 WasteWise. All rights reserved.</div>
      </footer>
    </div>
  );
}
