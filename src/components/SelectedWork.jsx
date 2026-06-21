import { useState, useEffect, useRef } from 'react';
import './SelectedWork.css';
import ProjectArchiveOverlay from './ProjectArchiveOverlay';

const PROJECTS = [
  {
    id: 'whisperflow',
    index: '01',
    name: 'WhisperFlow',
    tag: 'AI-Native CRM',
    description:
      'An AI-powered mini CRM — intelligent contact management, conversation memory, and deal tracking.',
    stack: ['FastAPI', 'PostgreSQL', 'Groq API', 'React'],
    link: 'https://crm-theta-ashen-29.vercel.app/login',
    image: '/whisperflow.png',
    frame: 'browser',
  },
  {
    id: 'careerpro',
    index: '02',
    name: 'CareerPro',
    tag: 'Smart India Hackathon · Top 50',
    description:
      'A cloud-native career guidance platform serving 1,000+ concurrent users — built under national competition pressure.',
    stack: ['Azure', 'FastAPI', 'ML Models', 'PostgreSQL'],
    link: 'https://careerpro01.vercel.app/dashboard',
    image: '/careerpro.png',
    frame: 'browser',
  },
  {
    id: 'us',
    index: '03',
    name: 'Us',
    tag: 'AI Companion App',
    description:
      'A production-grade couple companion app — He/She/Us architecture, AI chat, shared memory, and a full custom design system built for Play Store launch.',
    stack: ['Flutter', 'Supabase', 'Groq/Llama 3', 'Firebase'],
    link: 'https://us-nu-three.vercel.app/',
    image: '/us-mobile.jpeg',
    frame: 'phone',
  },
];

const n = PROJECTS.length;

export default function SelectedWork() {
  const wrapperRef = useRef(null);
  const [active, setActive] = useState(0);
  const [imgLoaded, setImgLoaded] = useState([false, false, false]);

  const [archiveOpen, setArchiveOpen] = useState(null); // 'glitch' -> 'black' -> 'open'

  // Listen for the custom event from the Hub
  useEffect(() => {
    const handleOpenFromHub = () => {
      setArchiveOpen('glitch');
      setTimeout(() => setArchiveOpen('black'), 300);
      setTimeout(() => setArchiveOpen('open'), 450);
    };
    window.addEventListener('open-project-archive', handleOpenFromHub);
    return () => window.removeEventListener('open-project-archive', handleOpenFromHub);
  }, []);

  // Preload all images on mount to prevent flicker
  useEffect(() => {
    PROJECTS.forEach((p, i) => {
      const img = new Image();
      img.src = p.image;
      img.onload = () =>
        setImgLoaded((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
    });
  }, []);

  // Scroll-driven active index
  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const { top, height } = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;

      // scrollable budget = wrapper height - 1 sticky viewport
      const budget = height - vh;
      // how far we've scrolled into the wrapper (0 → budget)
      const scrolled = Math.max(0, -top);
      const raw = scrolled / budget; // 0 → 1

      // Map 0–1 into 0–(n-1) with equal segments
      const idx = Math.min(n - 1, Math.floor(raw * n));
      setActive(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const project = PROJECTS[active];

  const handleLaunchArchive = () => {
    setArchiveOpen('glitch');
    setTimeout(() => setArchiveOpen('black'), 300);
    setTimeout(() => setArchiveOpen('open'), 450);
  };

  const handleCloseArchive = () => {
    setArchiveOpen(null);
  };

  return (
    <>
      <section
        className="sw-section"
        id="selected-work"
        ref={wrapperRef}
        style={{ height: `${n * 100}vh` }}  /* 300vh total so each project gets 100vh scroll */
      >
        {/* Sticky container — always visible, no black screen */}
        <div className="sw-sticky">
          <div className="sw-inner">

            {/* ── Left: label column ── */}
            <aside className="sw-left">
              <div className="sw-eyebrow">
                <span className="sw-eyebrow-slash">// </span>CURATED_PROJECTS
              </div>
              <h2 className="sw-heading">SELECTED<br />WORK</h2>

              <nav className="sw-list" aria-label="Project list">
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    className={`sw-item${i === active ? ' sw-item--active' : ''}`}
                    onClick={() => {
                      // Manual click: scroll to that project's scroll position
                      const wrapper = wrapperRef.current;
                      if (!wrapper) return;
                      const { top: wTop } = wrapper.getBoundingClientRect();
                      const budget = wrapper.offsetHeight - window.innerHeight;
                      const target = window.scrollY + wTop + (budget * i) / (n - 1);
                      window.scrollTo({ top: target, behavior: 'smooth' });
                    }}
                    aria-current={i === active ? 'true' : undefined}
                    id={`sw-item-${p.id}`}
                  >
                    <span className="sw-item-index">{p.index}</span>
                    <span className="sw-item-name">{p.name}</span>
                    <span className="sw-item-line" aria-hidden="true" />
                  </button>
                ))}
              </nav>

              {/* Meta — updates with active project */}
              <div className="sw-meta" key={project.id}>
                <div className="sw-meta-tag">{project.tag}</div>
                <p className="sw-meta-desc">{project.description}</p>
                <div className="sw-meta-stack">
                  {project.stack.map((t) => (
                    <span key={t} className="sw-chip">{t}</span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sw-launch"
                  id={`sw-launch-${project.id}`}
                >
                  LAUNCH
                  <svg viewBox="0 0 14 14" fill="none" className="sw-launch-arrow">
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Scroll progress + dots */}
              <div className="sw-controls">
                <div className="sw-progress-rail">
                  <div
                    className="sw-progress-fill"
                    style={{ width: `${((active + 1) / n) * 100}%` }}
                  />
                </div>
                <div className="sw-dots" role="tablist">
                  {PROJECTS.map((p, i) => (
                    <button
                      key={p.id}
                      className={`sw-dot${i === active ? ' sw-dot--active' : ''}`}
                      onClick={() => {
                        const wrapper = wrapperRef.current;
                        if (!wrapper) return;
                        const { top: wTop } = wrapper.getBoundingClientRect();
                        const budget = wrapper.offsetHeight - window.innerHeight;
                        const target = window.scrollY + wTop + (budget * i) / (n - 1);
                        window.scrollTo({ top: target, behavior: 'smooth' });
                      }}
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`Go to ${p.name}`}
                      id={`sw-dot-${p.id}`}
                    />
                  ))}
                </div>
                <span className="sw-counter">
                  {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </span>
              </div>

              {/* New CTA to launch the Project Archive Overlay */}
              <div className="sw-cta-container">
                <button className="sw-archive-btn" onClick={handleLaunchArchive}>
                  VIEW ALL PROJECTS <span className="sw-archive-arrow">→</span>
                </button>
              </div>
            </aside>

            {/* ── Right: card stack ── */}
            <div className="sw-right">
              {PROJECTS.map((p, i) => (
                <div
                  key={p.id}
                  className={`sw-card ${i === active ? 'sw-card--active' : i < active ? 'sw-card--past' : 'sw-card--upcoming'}`}
                  aria-hidden={i !== active}
                >
                  {p.frame === 'browser' ? (
                    <div className="sw-frame sw-frame--browser">
                      <div className="sw-browser-chrome">
                        <span className="sw-browser-dot" />
                        <span className="sw-browser-dot" />
                        <span className="sw-browser-dot" />
                        <span className="sw-browser-bar">{p.link.replace('https://', '')}</span>
                      </div>
                      <div className="sw-frame-screen">
                        <img
                          src={p.image}
                          alt={`${p.name} screenshot`}
                          className="sw-frame-img"
                          draggable="false"
                          loading="eager"
                        />
                        <div className="sw-card-scrim">
                          <span className="sw-card-name">{p.name}</span>
                          <span className="sw-card-tag">{p.tag}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="sw-frame sw-frame--phone">
                      <div className="sw-phone-chrome">
                        <div className="sw-phone-notch" />
                      </div>
                      <div className="sw-frame-screen sw-frame-screen--phone">
                        <img
                          src={p.image}
                          alt={`${p.name} screenshot`}
                          className="sw-frame-img"
                          draggable="false"
                          loading="eager"
                        />
                        <div className="sw-card-scrim">
                          <span className="sw-card-name">{p.name}</span>
                          <span className="sw-card-tag">{p.tag}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Entry Transition Overlays */}
      {archiveOpen && archiveOpen !== 'open' && (
        <div className="sw-transition-wrapper">
          {archiveOpen === 'glitch' && <div className="sw-glitch-layer" />}
          {archiveOpen === 'black' && <div className="sw-black-layer" />}
        </div>
      )}

      {/* The Marban-Style Overlay */}
      {archiveOpen === 'open' && (
        <ProjectArchiveOverlay onClose={handleCloseArchive} />
      )}
    </>
  );
}
