import { useState, useEffect, useRef, useCallback } from 'react';
import './IntroPage.css';

/* ─── Cycling Word Pairs ─── */
const WORD_PAIRS = [
  { word1: 'Developer', word2: 'Designer' },
  { word1: 'Full-Stack', word2: 'Engineer' },
  { word1: 'Agentic', word2: 'AI Builder' },
];

const CYCLE_INTERVAL = 3000;
const TRANSITION_DURATION = 600;

/* ─── Social Links ─── */
const SOCIALS = [
  {
    name: 'GitHub',
    url: 'https://github.com/Kavinkarthick2005/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/kavinkarthick',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/kavin_karthick10/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

/* ─── Hub Cards with preview content ─── */
const HUB_CARDS = [
  {
    index: '01',
    title: 'EXPERIENCE',
    href: '#experience',
    preview: 'AI Engineering Intern @ TII · Murugappa Group · Building production ML pipelines and agentic workflows.',
    tag: 'Internship',
  },
  {
    index: '02',
    title: 'PROJECTS',
    href: '#projects',
    preview: 'RiskLoom · AML Monitor · Carbon AQI System · Us — AI companion app deployed on Vercel.',
    tag: '6+ shipped',
  },
  {
    index: '03',
    title: 'REPOSITORIES',
    href: '#repos',
    preview: 'Open source work on GitHub — from multi-agent payment systems to full-stack mobile apps.',
    tag: 'GitHub',
  },
  {
    index: '04',
    title: 'SKILLS',
    href: '#skills',
    preview: 'Python · React · Node.js · LangChain · ML/DL · Agentic AI · Full-Stack · System Design.',
    tag: 'Stack',
  },
];

/* ─── Custom Cursor ─── */
function CustomCursor() {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
          }
          rafRef.current = null;
        });
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />;
}

/* ─── Component ─── */
export default function IntroPage() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const [phase, setPhase] = useState('idle');
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  // Scroll refs
  const bioRef1 = useRef(null);
  const bioRef2 = useRef(null);
  const bioRef3 = useRef(null);
  const bioRef4 = useRef(null);
  const bioSectionRef = useRef(null);
  const hubRef = useRef(null);
  const coverRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const triggerTransition = useCallback(() => {
    setCurrent((c) => {
      const n = (c + 1) % WORD_PAIRS.length;
      setNext(n);
      setPhase('exiting');
      timerRef.current = setTimeout(() => {
        setCurrent(n);
        setNext(null);
        setPhase('idle');
      }, TRANSITION_DURATION);
      return c;
    });
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(triggerTransition, CYCLE_INTERVAL);
    return () => {
      clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [triggerTransition]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      /* ── BIO SECTION ──
         Wrapper starts at 100vh, total scroll range = 350vh
         We want text to be dim at start/end, bright in middle.
         Each span brightens then dims as we scroll through.
      */
      const bioStart = vh * 1.0;   // when bio section begins
      const bioEnd   = vh * 4.0;   // when bio section ends (100 + 300)

      // Total bio scroll range divided by 4 spans
      // Each span gets 0.7vh to brighten, holds bright, then dims before next
      const range = bioEnd - bioStart;
      const seg = range / 4;

      const getSpanOpacity = (spanIndex) => {
        const spanStart = bioStart + spanIndex * seg;
        const spanPeak  = spanStart + seg * 0.35;
        const spanEnd   = spanStart + seg;

        if (y < spanStart) return 0.15;
        if (y < spanPeak)  return 0.15 + 0.85 * ((y - spanStart) / (spanPeak - spanStart));
        if (y < spanEnd)   return 1 - 0.75 * ((y - spanPeak) / (spanEnd - spanPeak));
        return 0.25;
      };

      // Last span stays bright through bio→hub transition
      const span4Opacity = () => {
        const spanStart = bioStart + 3 * seg;
        const spanPeak  = spanStart + seg * 0.35;
        if (y < spanStart) return 0.15;
        if (y < spanPeak)  return 0.15 + 0.85 * ((y - spanStart) / (spanPeak - spanStart));
        return 1; // stays fully bright — fades with bio section naturally
      };

      if (bioRef1.current) bioRef1.current.style.opacity = getSpanOpacity(0);
      if (bioRef2.current) bioRef2.current.style.opacity = getSpanOpacity(1);
      if (bioRef3.current) bioRef3.current.style.opacity = getSpanOpacity(2);
      if (bioRef4.current) bioRef4.current.style.opacity = span4Opacity();

      /* Bio section overall — fades out as we leave it toward hub */
      if (bioSectionRef.current) {
        // Bio sticky content fades out in last 0.5vh of its scroll range
        const fadeOutStart = vh * 3.6;
        const fadeOutEnd   = vh * 4.0;
        let bioOverallOpacity = 1;
        if (y > fadeOutStart) {
          bioOverallOpacity = 1 - Math.min(1, (y - fadeOutStart) / (fadeOutEnd - fadeOutStart));
        }
        if (y < bioStart) bioOverallOpacity = 0;
        else if (y < bioStart + vh * 0.1) {
          bioOverallOpacity = (y - bioStart) / (vh * 0.1);
        }
        bioSectionRef.current.style.opacity = bioOverallOpacity;
      }

      /* ── HUB SECTION ──
         Wrapper starts at 400vh, height = 250vh
         Single card → 4 cards explosion
      */
      const hubStart = vh * 4.2;
      const hubEnd   = vh * 5.5;

      let hubProgress = 0;
      if (y > hubStart && y < hubEnd) {
        hubProgress = (y - hubStart) / (hubEnd - hubStart);
      } else if (y >= hubEnd) {
        hubProgress = 1;
      }

      // Ease the progress with cubic-bezier feel
      const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const ep = ease(Math.min(1, hubProgress));

      if (hubRef.current) {
        hubRef.current.style.setProperty('--explode-progress', ep);
      }

      // Cover card fades out fast at start of explosion
      if (coverRef.current) {
        const coverOpacity = ep < 0.15 ? 1 - (ep / 0.15) : 0;
        coverRef.current.style.opacity = coverOpacity;
        coverRef.current.style.pointerEvents = coverOpacity > 0.1 ? 'auto' : 'none';
      }

      // Cards fade in right after cover starts fading
      if (cardsContainerRef.current) {
        const cardsOpacity = ep > 0.08 ? Math.min(1, (ep - 0.08) / 0.25) : 0;
        cardsContainerRef.current.style.opacity = cardsOpacity;
      }

      // Hub section fades in from below
      if (hubRef.current) {
        const hubFadeInStart = vh * 3.9;
        const hubFadeInEnd   = vh * 4.3;
        let hubSectionOpacity = 1;
        if (y < hubFadeInStart) {
          hubSectionOpacity = 0;
        } else if (y < hubFadeInEnd) {
          hubSectionOpacity = (y - hubFadeInStart) / (hubFadeInEnd - hubFadeInStart);
        }
        // Apply to wrapper opacity
        const hubWrapper = hubRef.current.closest('.hub-sticky-content');
        if (hubWrapper) hubWrapper.style.opacity = hubSectionOpacity;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="custom-cursor-root intro-page" id="intro-page">
      <CustomCursor />
      <div className="intro-bg-glow" />

      {/* Header */}
      <header className="intro-header" id="intro-header">
        <div className="intro-logo" id="intro-logo">
          kavin<span className="logo-dot">.</span>dev
        </div>
        <a href="mailto:kavinkarthick2005@gmail.com" className="intro-email" id="intro-email">
          kavinkarthick2005@gmail.com
        </a>
        <nav className="intro-nav" id="intro-nav">
          <a href="#about" id="nav-about">ABOUT</a>
          <a href="#work" id="nav-work">WORK</a>
          <a href="#contact" id="nav-contact">CONTACT</a>
        </nav>
      </header>

      {/* 1. Hero / Intro */}
      <main className="intro-main" id="intro-main">
        <div className="intro-left" id="intro-left">
          <p className="intro-greeting">Hello! I'm</p>
          <h1 className="intro-name">
            KAVIN<br />
            KARTHICK R
          </h1>
        </div>

        <div className="intro-center" id="intro-center">
          <div className="character-placeholder">
            <div className="placeholder-orb" />
            <span className="placeholder-particle" />
            <span className="placeholder-particle" />
            <span className="placeholder-particle" />
            <span className="placeholder-particle" />
            <span className="placeholder-particle" />
            <span className="placeholder-particle" />
          </div>
        </div>

        <div className="intro-right" id="intro-right">
          <span className="creative-label">A Creative</span>
          <div className="cycling-words" aria-live="polite" aria-atomic="true">
            <div
              className={`cycling-pair cycling-pair--current ${phase === 'exiting' ? 'cycling-pair--exit' : ''}`}
              aria-hidden={phase === 'exiting'}
            >
              <span className="cycle-word cycle-word-1">{WORD_PAIRS[current].word1}</span>
              <span className="cycle-word cycle-word-2">{WORD_PAIRS[current].word2}</span>
            </div>
            {next !== null && (
              <div
                className={`cycling-pair cycling-pair--next ${phase === 'exiting' ? 'cycling-pair--enter' : ''}`}
              >
                <span className="cycle-word cycle-word-1">{WORD_PAIRS[next].word1}</span>
                <span className="cycle-word cycle-word-2">{WORD_PAIRS[next].word2}</span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 2. Bio Scroll Section */}
      <section className="bio-scroll-wrapper">
        <div className="bio-sticky-content" ref={bioSectionRef}>
          <p className="bio-text">
            <span ref={bioRef1}>I'm Kavin Karthick, an Artificial Intelligence student at SRMIST. </span>
            <span ref={bioRef2}>I love building games and visually striking websites, full-stack, agentic AI, multi-agent systems, anything that creates an immersive experience. </span>
            <span ref={bioRef3}>I've built full-stack mobile apps end-to-end, mostly by teaching myself along the way, owning a product from idea to shipped. </span>
            <span ref={bioRef4}>Outside of code: music, HIT gym, and trys gambling and trading too *wink*.</span>
          </p>
        </div>
      </section>

      {/* 3. Hub Scroll Section */}
      <section className="hub-scroll-wrapper">
        <div className="hub-sticky-content">
          <div className="hub-container" ref={hubRef}>

            {/* Single cover card — morphs/explodes into 4 */}
            <div className="hub-cover-card" ref={coverRef}>
              <span className="hub-cover-label">EXPLORE</span>
              <span className="hub-cover-sub">scroll to discover</span>
            </div>

            {/* 4 cards — slide out from center */}
            <div className="hub-cards" ref={cardsContainerRef}>
              {HUB_CARDS.map((card) => (
                <div key={card.title} className={`hub-card-wrapper hub-card-wrapper--${card.index}`}>
                  <a href={card.href} className="hub-card-inner">
                    {/* Preview overlay on hover */}
                    <div className="hub-card-preview">
                      <span className="hub-preview-tag">{card.tag}</span>
                      <p className="hub-preview-text">{card.preview}</p>
                    </div>
                    {/* Default card content */}
                    <div className="hub-card-default">
                      <span className="hub-card-index">{card.index}</span>
                      <h3 className="hub-card-title">{card.title}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Socials */}
      <div className="intro-socials" id="intro-socials">
        {SOCIALS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            id={`social-${social.name.toLowerCase()}`}
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
