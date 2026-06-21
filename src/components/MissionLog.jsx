import { useEffect, useRef } from 'react';
import './MissionLog.css';

/* ─── Mission Data ─── */
const MISSIONS = [
  {
    index: '01',
    code: 'FIRST CONTACT',
    title: 'Everything, Everywhere',
    body: 'School years. Games, motion graphics, Blender, After Effects. Hit a ball with an element to match its atomic number. Built a game for Apollo Tyres. Interned at Marlion Games. Worked on a team RPG styled after League of Legends. Wide-open exploration — no specialization yet, just making things.',
    tags: ['Unity', 'Blender', 'After Effects', 'Photoshop'],
    status: 'CLASSIFIED — SCHOOL ERA',
    variant: '',
  },
  {
    index: '02',
    code: 'MISSION FAILED',
    title: 'Scope Exceeded',
    body: 'Attempted a full open-world AAA-style shooter. Built the environment — terrain, lighting, world design. Stalled completely on core mechanics and character animation. The skills gap was real. Project shelved, never revisited. Taught more about realistic scoping than anything before it.',
    tags: ['Unity', 'AAA ambition', 'shelved'],
    status: 'STATUS: ABORTED — LESSON FILED',
    variant: 'failed',
  },
  {
    index: '03',
    code: 'FIRST DEPLOYMENT',
    title: 'Real Stakes, Real Teams',
    body: 'Second year at SRM (2024–25). Brainwaves internship: built a VR rehabilitation game for neuro recovery. Parallel: CareerPro — cloud-native career guidance platform (Azure, FastAPI, ML, PostgreSQL) for Smart India Hackathon, placing Top 50 nationally. First real internship + first national-level team build.',
    tags: ['VR', 'Azure', 'FastAPI', 'ML', 'SIH Top 50'],
    status: 'DEPLOYED — 2024–25',
    variant: '',
  },
  {
    index: '04',
    code: 'GOING SOLO',
    title: 'Full Ownership',
    body: 'Carbon AQI — first solo AI/RL project. Real-time air quality platform tracking 10 Indian cities: XGBoost prediction, PPO reinforcement learning agent for mitigation recs, multilingual chatbot in 5 languages. Full-stack alone: Next.js, FastAPI, PostgreSQL, Docker. First time owning an ML system end-to-end.',
    tags: ['RL/PPO', 'XGBoost', 'Next.js', 'Docker', 'FastAPI'],
    status: 'COMPLETED — SOLO',
    variant: '',
  },
  {
    index: '05',
    code: 'BUILDING FOR KEEPS',
    title: 'Production Grade',
    body: '"Us" — AI couple companion app (Flutter, Supabase, Groq/Llama 3, Firebase) with a He/She/Us three-space architecture, built for Play Store. RiskLoom — fintech risk platform (Next.js, FastAPI, Celery, Redis, Docker) with real financial modeling: VaR, Sharpe Ratio, Bollinger Bands, AI narrative reports. Not coursework. Built to ship.',
    tags: ['Flutter', 'Groq', 'Fintech', 'Redis', 'VaR'],
    status: 'SHIPPED',
    variant: '',
  },
  {
    index: '06',
    code: 'CURRENT MISSION',
    title: 'Still Moving',
    body: 'CRM project — just completed, still in motion. The timeline doesn\'t stop here. This is the most recent entry, not the last one.',
    tags: ['CRM', 'In progress'],
    status: '▸ ONGOING',
    variant: 'ongoing',
  },
];

const n = MISSIONS.length;

/* ─── Easing ─── */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const smoothstep = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function MissionLog() {
  const stickyRef      = useRef(null);
  const railFillRef    = useRef(null);
  const checkpointRefs = useRef([]);
  const cardRefs       = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const y  = window.scrollY;
      const vh = window.innerHeight;

      /* ── Scroll range ──────────────────────────────────────────────────
         The timeline dynamically starts when the wrapper reaches the top
         of the viewport.
      ─────────────────────────────────────────────────────────────────── */
      const wrapper = stickyRef.current?.parentElement;
      const timelineStart = wrapper ? wrapper.offsetTop : vh * 5.0;
      const timelineEnd   = timelineStart + vh * 4.8;
      const totalRange    = timelineEnd - timelineStart;
      const entryRange    = totalRange / n;

      const rawP = (y - timelineStart) / totalRange;
      const tP   = Math.max(0, Math.min(n - 0.001, rawP * n)); // 0 → 5.999 — prevents last entry resetting

      /* ── Section opacity: fade in fast, stay, never fade out ── */
      if (stickyRef.current) {
        const sectionOp = rawP < 0 ? 0 : rawP < 0.015 ? rawP / 0.015 : 1;
        stickyRef.current.style.opacity = Math.max(0, Math.min(1, sectionOp));
      }

      /* ── Rail fill ── */
      if (railFillRef.current) {
        const fillP = Math.max(0, Math.min(1, rawP));
        railFillRef.current.style.height = `${fillP * 100}%`;
      }

      /* ── Active entry ── */
      const activeIndex = Math.min(n - 1, Math.floor(tP));
      const entryP      = tP - Math.floor(tP); // 0→1 within active entry

      /* ── Checkpoints (left spine) ── */
      checkpointRefs.current.forEach((el, i) => {
        if (!el) return;

        /* State */
        const state = i < activeIndex ? 'past' : i === activeIndex ? 'active' : 'future';
        el.dataset.state = state;

        /* Brightness: entries close to active are brightest */
        const dist = Math.abs(i - tP + 0.5);
        const baseOp = i === activeIndex ? 1 : Math.max(0.18, 1 - dist * 0.28);
        el.style.opacity = baseOp;
      });

      /* ── Mission cards (right panel) ── */
      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        let cardOp = 0;
        let cardY  = 0;

        if (i === activeIndex) {
          /* Fade in: first 18% of entry window */
          if (entryP < 0.18) {
            const p = easeOutCubic(entryP / 0.18);
            cardOp = p;
            cardY  = 36 * (1 - p);
          /* Hold: 18%–82% */
          } else if (entryP < 0.82) {
            cardOp = 1;
            cardY  = 0;
          /* Fade out: last 18% — EXCEPT last entry stays visible */
          } else if (i === n - 1) {
            cardOp = 1;
            cardY  = 0;
          } else {
            const p = smoothstep(0.82, 1, entryP);
            cardOp = 1 - p;
            cardY  = -28 * p;
          }
        } else {
          /* Not active: position offscreen */
          cardOp = 0;
          cardY  = i < activeIndex ? -28 : 36;
        }

        el.style.opacity   = cardOp;
        el.style.transform = `translateY(${cardY}px)`;
        el.style.pointerEvents = cardOp > 0.4 ? 'auto' : 'none';
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="ml-wrapper" id="mission-log">
      <div className="ml-sticky" ref={stickyRef}>

        {/* Header bar */}
        <div className="ml-header">
          <span className="ml-header-label">// MISSION_LOG.TXT</span>
          <div className="ml-header-rule" aria-hidden="true" />
          <span className="ml-header-count">01 – 06 / CHRONOLOGICAL</span>
        </div>

        {/* Two-column layout */}
        <div className="ml-columns">

          {/* ── Left: checkpoint spine ── */}
          <nav className="ml-spine" aria-label="Mission timeline navigation">
            <div className="ml-rail" aria-hidden="true">
              <div className="ml-rail-fill" ref={railFillRef} />
            </div>

            {MISSIONS.map((m, i) => (
              <div
                key={m.index}
                className={`ml-checkpoint${m.variant ? ` ml-checkpoint--${m.variant}` : ''}`}
                ref={(el) => (checkpointRefs.current[i] = el)}
                data-state="future"
                aria-label={`Mission ${m.index}: ${m.code}`}
                onClick={() => {
                  const wrapper = stickyRef.current?.parentElement;
                  const vh = window.innerHeight;
                  const timelineStart = wrapper ? wrapper.offsetTop : vh * 5.50; // Dynamic timeline start based on DOM position
                  const totalRange = vh * 4.80; // Total scroll range for the mission log
                  const entryRange = totalRange / n;
                  const scrollTarget = timelineStart + (i * entryRange) + (entryRange * 0.1);
                  window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                }}
              >
                <div className="ml-node-wrap">
                  <div className="ml-node">
                    <span className="ml-node-num">{m.index}</span>
                  </div>
                </div>
                <div className="ml-cp-info">
                  <span className="ml-cp-code">{m.code}</span>
                </div>
              </div>
            ))}
          </nav>

          {/* ── Right: mission cards ── */}
          <div className="ml-cards-area" aria-live="polite" aria-atomic="true">
            {MISSIONS.map((m, i) => (
              <article
                key={m.index}
                className={`ml-card${m.variant ? ` ml-card--${m.variant}` : ''}`}
                ref={(el) => (cardRefs.current[i] = el)}
                aria-label={`Mission ${m.index}: ${m.title}`}
              >
                <div className="ml-card-inner">
                  {/* Eyebrow */}
                  <div className="ml-card-eyebrow">
                    <span className="ml-card-log-id">LOG_{m.index}</span>
                    <span className="ml-card-eyebrow-sep" aria-hidden="true">—</span>
                    <span className="ml-card-eyebrow-code">{m.code}</span>
                  </div>

                  {/* Title */}
                  <h2 className="ml-card-title">{m.title}</h2>

                  {/* Body */}
                  <p className="ml-card-body">{m.body}</p>

                  {/* Tags */}
                  <div className="ml-card-tags" aria-label="Technologies">
                    {m.tags.map((tag) => (
                      <span key={tag} className="ml-card-tag">{tag}</span>
                    ))}
                  </div>

                  {/* Status */}
                  <div className={`ml-card-status${m.variant ? ` ml-card-status--${m.variant}` : ''}`}>
                    <span className="ml-status-pip" aria-hidden="true" />
                    {m.status}
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
