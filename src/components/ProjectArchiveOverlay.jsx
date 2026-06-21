import { useState, useEffect, useRef } from 'react';
import './ProjectArchiveOverlay.css';

const ARCHIVE_PROJECTS = [
  {
    id: 'whisperflow',
    title: 'WHISPERFLOW',
    lines: [
      'The CRM built to simplify',
      'customer interaction.',
      'Turns natural language into execution.'
    ],
    screenshot: './crm-project-ss.png',
    link: 'https://crm-theta-ashen-29.vercel.app/login',
    bgGradient: 'radial-gradient(circle at center, rgba(10, 50, 100, 0.4), #0a0a0a 70%)',
    hotspots: [
      { top: '35%', left: '20%', title: 'Campaign Builder', desc: 'Turns natural language into executable campaigns.\nSupports segmentation, automation and workflow generation.' },
      { top: '50%', left: '75%', title: 'Agent Memory', desc: 'Maintains deep context across all multi-agent client interactions.' }
    ]
  },
  {
    id: 'us',
    title: 'US',
    lines: [
      'The AI companion app',
      'designed for couples.',
      'Preserves shared memories and context.'
    ],
    screenshot: './us-project-ss.png',
    link: 'https://us-nu-three.vercel.app/',
    bgGradient: 'radial-gradient(circle at center, rgba(150, 20, 100, 0.3), #0a0a0a 70%)',
    hotspots: [
      { top: '25%', left: '30%', title: 'The "Us" Space', desc: 'A shared neutral ground where AI mediates and preserves joint memories.' },
      { top: '55%', left: '70%', title: 'Emotional Memory', desc: 'Vector database storing conversational context.' }
    ]
  },
  {
    id: 'careerpro',
    title: 'CAREERPRO',
    lines: [
      'Democratizing career guidance',
      'at a national scale.',
      'Built for extreme traffic conditions.'
    ],
    screenshot: './careerpro-project-ss.png',
    link: 'https://careerpro01.vercel.app/dashboard',
    bgGradient: 'radial-gradient(circle at center, rgba(20, 100, 150, 0.3), #0a0a0a 70%)',
    hotspots: [
      { top: '40%', left: '30%', title: 'Prediction Engine', desc: 'Machine learning pipeline generating personalized roadmaps.' },
      { top: '60%', left: '60%', title: 'Azure Load Balancer', desc: 'Auto-scaling infrastructure for intense traffic.' }
    ]
  },
  {
    id: 'carbon_aqi',
    title: 'CARBON AQI',
    lines: [
      'Live Air Quality Command Center.',
      'Predicts PM2.5 with XGBoost.',
      'Mitigates with RL Agents.'
    ],
    screenshot: './carbon_aqi.png', // User must copy generated image here
    link: null,
    bgGradient: 'radial-gradient(circle at center, rgba(20, 150, 80, 0.3), #0a0a0a 70%)',
    hotspots: [
      { top: '30%', left: '20%', title: 'XGBoost Predictor', desc: 'Real-time forecasting of PM2.5 and AQI levels.' },
      { top: '65%', left: '75%', title: 'PPO Mitigation', desc: 'RL model actively suggesting optimal policy changes.' }
    ]
  },
  {
    id: 'rehab_vr',
    title: 'REHABILITATION SYSTEM',
    lines: [
      'VR environment for stroke therapy.',
      'Precision kinematic hand tracking.',
      'Dynamic difficulty adjustment.'
    ],
    screenshot: './rehab_vr.png', // User must copy generated image here
    link: null,
    bgGradient: 'radial-gradient(circle at center, rgba(100, 20, 150, 0.3), #0a0a0a 70%)',
    hotspots: [
      { top: '40%', left: '25%', title: 'Hand Tracking', desc: 'Precision kinematic tracking for motor control recovery.' },
      { top: '50%', left: '80%', title: 'Dynamic Difficulty', desc: 'Adjusts parameters based on patient fatigue.' }
    ]
  }
];

const TOTAL_SCENES = ARCHIVE_PROJECTS.length + 1; // 5 projects + 1 exit scene
const SCENE_VH = 120;
const TOTAL_VH = TOTAL_SCENES * SCENE_VH; // ~720vh

export default function ProjectArchiveOverlay({ onClose }) {
  const scrollRef = useRef(null);
  const [rawProgress, setRawProgress] = useState(0);
  const [returning, setReturning] = useState(false);
  const [hotspotHover, setHotspotHover] = useState(null);

  // Custom Cursor
  const cursorRef = useRef(null);
  useEffect(() => {
    const handleMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Scroll Engine
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollableHeight = (TOTAL_VH - 100) * (window.innerHeight / 100);
      const scrolled = el.scrollTop;
      const progressNormalized = Math.min(1, Math.max(0, scrolled / scrollableHeight));

      // Map 0-1 to 0-(TOTAL_SCENES - 1)
      setRawProgress(progressNormalized * (TOTAL_SCENES - 1));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReturnClick = () => {
    if (returning) return;
    setReturning('collapse');
    setTimeout(() => setReturning('glitch'), 400);
    setTimeout(() => setReturning('black'), 700);
    setTimeout(() => {
      if (onClose) onClose();
    }, 850);
  };

  return (
    <div
      className={`pa-overlay ${returning ? `pa-overlay--${returning}` : ''} ${hotspotHover ? 'pa-cursor-radar' : ''}`}
      ref={scrollRef}
    >
      <div className="pa-custom-cursor" ref={cursorRef} />

      {/* Scroll Rig */}
      <div className="pa-scroll-track" style={{ height: `${TOTAL_VH}vh` }}>
        <div className="pa-sticky-stage">

          {/* Project Layers */}
          {ARCHIVE_PROJECTS.map((p, i) => {
            // Distance from current scroll position to this project's peak (i)
            const dist = rawProgress - i;
            const absDist = Math.abs(dist);

            // Fades in/out over 1 "scene unit"
            const opacity = Math.max(0, 1 - absDist);
            const blur = absDist * 20; // Blurs up to 20px as it fades out

            // Subtle parallax Y translate: moves down slightly as it fades in, moves up as it fades out
            const translateY = dist * -50;

            // Background Dimming (Dims if hotspot hovered OR if we are far away)
            let dimOpacity = absDist * 0.5; // Base dimming
            if (hotspotHover && hotspotHover.projectId === p.id) {
              dimOpacity = 0.5;
            }

            // Text Animations (Sequence based on arrival)
            // When dist is near 0 (peak), text is visible.
            // Text fades in slightly *after* the image arrives.
            const titleOpacity = Math.max(0, 1 - (absDist * 1.5));
            const titleY = dist > 0 ? dist * 20 : Math.max(0, -dist - 0.2) * 40;

            return (
              <div
                key={p.id}
                className="pa-project-layer"
                style={{
                  opacity: opacity,
                  pointerEvents: opacity > 0.8 ? 'auto' : 'none',
                  zIndex: opacity > 0.5 ? 10 : 1
                }}
              >
                {/* Background Gradient */}
                <div
                  className="pa-bg-gradient"
                  style={{ background: p.bgGradient, opacity: opacity }}
                />

                {/* Main Screenshot Stage */}
                <div
                  className="pa-hero-container"
                  style={{ transform: `translateY(${translateY}px) scale(${1 - absDist * 0.05})` }}
                >
                  <img
                    src={p.screenshot}
                    alt={p.title}
                    className="pa-hero-img"
                    style={{ filter: `blur(${blur}px)` }}
                  />
                  <div className="pa-hero-scrim" style={{ opacity: dimOpacity }} />

                  {/* Hotspots */}
                  {p.hotspots.map((hs, idx) => (
                    <div
                      key={idx}
                      className="pa-hotspot-ring"
                      style={{ top: hs.top, left: hs.left }}
                      onMouseEnter={() => setHotspotHover({ ...hs, projectId: p.id })}
                      onMouseLeave={() => setHotspotHover(null)}
                    >
                      <div className="pa-hotspot-core" />
                      <div className="pa-hotspot-pulse" />
                    </div>
                  ))}

                  {/* Hotspot Hover Card */}
                  <div className={`pa-hotspot-card ${hotspotHover && hotspotHover.projectId === p.id ? 'visible' : ''}`}>
                    {hotspotHover && hotspotHover.projectId === p.id && (
                      <>
                        <h4 className="pa-hc-title">{hotspotHover.title}</h4>
                        <p className="pa-hc-desc">{hotspotHover.desc}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Marban-Style Typography Reveal */}
                <div className="pa-text-container" style={{ transform: `translateY(${titleY}px)`, opacity: titleOpacity }}>
                  <h1 className="pa-project-title">{p.title}</h1>
                  <div className="pa-project-lines">
                    {p.lines.map((line, l_idx) => {
                      // Stagger lines: Line 0 requires less progress than Line 1
                      const lineOffset = 0.1 + (l_idx * 0.15);
                      // As dist goes from -0.5 to 0 (arriving), lineOpacity goes 0 to 1
                      let lineOp = 0;
                      if (dist <= 0) { // arriving or peak
                        const localP = (1 - absDist) - (1 - lineOffset); // Math trick
                        lineOp = Math.max(0, Math.min(1, (1 - absDist) / (1 - lineOffset)));
                      } else { // leaving
                        lineOp = 1 - absDist;
                      }

                      return (
                        <p
                          key={l_idx}
                          className="pa-project-line"
                          style={{
                            opacity: lineOp,
                            transform: `translateY(${10 * (1 - lineOp)}px)`
                          }}
                        >
                          {line}
                        </p>
                      );
                    })}

                    {/* Launch CTA */}
                    {p.link && (() => {
                      const linkOffset = 0.1 + (p.lines.length * 0.15);
                      let linkOp = 0;
                      if (dist <= 0) {
                        linkOp = Math.max(0, Math.min(1, (1 - absDist) / (1 - linkOffset)));
                      } else {
                        linkOp = 1 - absDist;
                      }

                      return (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pa-project-link"
                          style={{
                            opacity: linkOp,
                            transform: `translateY(${10 * (1 - linkOp)}px)`
                          }}
                        >
                          LAUNCH PROJECT
                          <svg viewBox="0 0 14 14" fill="none" className="pa-link-arrow">
                            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      );
                    })()}
                  </div>
                </div>

              </div>
            );
          })}

          {/* FINAL SCENE: Exit */}
          {(() => {
            const exitIndex = TOTAL_SCENES - 1;
            const dist = rawProgress - exitIndex;
            const absDist = Math.abs(dist);
            const opacity = Math.max(0, 1 - absDist);

            return (
              <div
                className="pa-exit-layer"
                style={{
                  opacity: opacity,
                  pointerEvents: opacity > 0.5 ? 'auto' : 'none',
                  zIndex: opacity > 0.5 ? 20 : 1
                }}
              >
                <div className="pa-exit-content">
                  <h2 className="pa-exit-heading">PROJECT ARCHIVE COMPLETE</h2>
                  <button className="pa-exit-btn" onClick={handleReturnClick}>
                    RETURN TO HUB
                  </button>
                </div>
              </div>
            );
          })()}

        </div>
      </div>

      {/* Glitch Overlay Elements */}
      <div className="pa-black-overlay" />
    </div>
  );
}
