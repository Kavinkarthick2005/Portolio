import { useState, useEffect, useCallback, useRef } from 'react';
import './TerminalBoot.css';

/* ─── Constants ─── */
const BOOT_LINES = [
  { text: 'INITIALIZING SYSTEM...', delay: 0 },
  { text: 'ESTABLISHING SECURE CHANNEL...', delay: 0 },
  { text: 'AUTHENTICATING TERMINAL...', delay: 0 },
  { text: 'CLEARANCE VERIFIED — LEVEL 5', delay: 0 },
  { text: '> ACCESS GRANTED', delay: 200, className: 'access-granted' },
];

const DOSSIER_FIELDS = [
  { label: 'NAME', value: 'KAVIN KARTHICK R' },
  { label: 'CODENAME', value: 'GHOST' },
  { label: 'EDUCATION', value: 'B.TECH AI — SRM IST' },
  { label: 'LOCATION', value: 'CHENNAI, INDIA' },
  { label: 'SPECIALIZATION', value: 'AI SYSTEMS · AGENTIC WORKFLOWS · FULL-STACK' },
  { label: 'STATUS', value: 'AVAILABLE FOR OPPORTUNITY' },
];

const DIR_LISTING = [
  { name: 'EXPERIENCE.dat', meta: '[3 ENTRIES]' },
  { name: 'PROJECTS.dat', meta: '[4 ENTRIES]' },
  { name: 'REPOSITORIES.dat', meta: '[LINKED]' },
  { name: 'SKILLS.dat', meta: '[CLASSIFIED]' },
];

const TYPING_SPEED = 30; // ms per character
const DOSSIER_ROW_DELAY = 350; // ms between row reveals
const DIR_LINE_DELAY = 300; // ms between dir line reveals

const SCREEN_B_DURATION = 3000;
const SCREEN_C_DURATION = 3500;

const NAME_CHARS = 'KAVIN KARTHICK R'.split('');

/* Check reduced motion preference */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Component ─── */
export default function TerminalBoot({ onComplete }) {
  const [screen, setScreen] = useState('A');
  const [skipRequested, setSkipRequested] = useState(false);
  const skipRef = useRef(false);

  // Screen A state
  const [bootLineIndex, setBootLineIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);

  // Screen B state
  const [revealedRows, setRevealedRows] = useState(0);

  // Screen C state
  const [missionRevealed, setMissionRevealed] = useState(false);
  const [revealedDirLines, setRevealedDirLines] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  // Hack-out bridge state
  const [bridge, setBridge] = useState('none'); // 'none' | 'glitch-out' | 'blackout' | 'name-reveal' | 'final-glitch' | 'done'
  const [nameCharsRevealed, setNameCharsRevealed] = useState(0);

  const timeoutsRef = useRef([]);

  /* ─── Helpers ─── */
  const addTimeout = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  /* ─── Skip Handler ─── */
  const handleSkip = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    setSkipRequested(true);
    clearAllTimeouts();
    onComplete();
  }, [clearAllTimeouts, onComplete]);

  // Keyboard listener for X key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'x' || e.key === 'X') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleSkip]);

  // Cleanup
  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  /* ─── Reduced Motion: Skip everything ─── */
  // useEffect(() => {
  //   if (prefersReducedMotion()) {
  //     // Show final state briefly then advance
  //     addTimeout(() => onComplete(), 500);
  //   }
  // }, [onComplete, addTimeout]);

  /* ─── Screen A: Sequential Typing Effect ─── */
  useEffect(() => {
    if (screen !== 'A' || skipRef.current) return;

    if (bootLineIndex >= BOOT_LINES.length) {
      // All lines typed, advance to screen B
      addTimeout(() => {
        if (!skipRef.current) setScreen('B');
      }, 600);
      return;
    }

    const currentLine = BOOT_LINES[bootLineIndex];
    const totalChars = currentLine.text.length;

    if (typedChars < totalChars) {
      const id = addTimeout(() => {
        if (!skipRef.current) setTypedChars((c) => c + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(id);
    } else {
      // Line complete — move to next
      setCompletedLines((prev) => [...prev, bootLineIndex]);
      const nextDelay = BOOT_LINES[bootLineIndex + 1]?.delay ?? 300;
      addTimeout(() => {
        if (!skipRef.current) {
          setBootLineIndex((i) => i + 1);
          setTypedChars(0);
        }
      }, nextDelay + 200);
    }
  }, [screen, bootLineIndex, typedChars, addTimeout]);

  /* ─── Screen B: Row-by-row Reveal ─── */
  useEffect(() => {
    if (screen !== 'B' || skipRef.current) return;

    if (revealedRows < DOSSIER_FIELDS.length) {
      const id = addTimeout(() => {
        if (!skipRef.current) setRevealedRows((r) => r + 1);
      }, DOSSIER_ROW_DELAY);
      return () => clearTimeout(id);
    } else {
      // All rows revealed, wait then advance
      addTimeout(() => {
        if (!skipRef.current) setScreen('C');
      }, SCREEN_B_DURATION - DOSSIER_FIELDS.length * DOSSIER_ROW_DELAY);
    }
  }, [screen, revealedRows, addTimeout]);

  /* ─── Screen C: Mission + Dir Reveal ─── */
  useEffect(() => {
    if (screen !== 'C' || skipRef.current) return;

    // Reveal mission first
    addTimeout(() => {
      if (!skipRef.current) {
        setMissionRevealed(true);
        setGlitchActive(true);
        // Turn off glitch effect after animation
        addTimeout(() => setGlitchActive(false), 600);
      }
    }, 200);

    // Then reveal dir lines one by one
    DIR_LISTING.forEach((_, i) => {
      addTimeout(() => {
        if (!skipRef.current) setRevealedDirLines((n) => Math.max(n, i + 1));
      }, 900 + i * DIR_LINE_DELAY);
    });

    // After everything is revealed, start hack-out bridge
    addTimeout(() => {
      if (!skipRef.current) startBridge();
    }, SCREEN_C_DURATION);
  }, [screen, addTimeout]);

  /* ─── Hack-Out Bridge ─── */
  const startBridge = useCallback(() => {
    if (skipRef.current) return;

    // Phase 1: Glitch out screen C
    setBridge('glitch-out');

    // Phase 2: Blackout
    addTimeout(() => {
      if (skipRef.current) return;
      setBridge('blackout');

      // Phase 3: Name reveal
      addTimeout(() => {
        if (skipRef.current) return;
        setBridge('name-reveal');

        // Reveal name characters one by one
        NAME_CHARS.forEach((_, i) => {
          addTimeout(() => {
            if (!skipRef.current) setNameCharsRevealed((n) => Math.max(n, i + 1));
          }, i * 60);
        });

        // Phase 4: Final glitch
        addTimeout(() => {
          if (skipRef.current) return;
          setBridge('final-glitch');

          // Complete
          addTimeout(() => {
            if (!skipRef.current) onComplete();
          }, 400);
        }, NAME_CHARS.length * 60 + 300);
      }, 200);
    }, 500);
  }, [addTimeout, onComplete]);

  /* ─── Render: Exit Button ─── */
  const renderExitButton = () => (
    <button className="terminal-exit" onClick={handleSkip} id="terminal-exit-btn">
      <kbd>X</kbd> PRESS TO EXIT
    </button>
  );

  /* ─── Render: Screen A ─── */
  const renderScreenA = () => (
    <div className="screen-a">
      <div className="boot-log">
        {BOOT_LINES.map((line, i) => {
          const isCompleted = completedLines.includes(i);
          const isTyping = i === bootLineIndex && !isCompleted;
          const displayText = isCompleted
            ? line.text
            : isTyping
              ? line.text.slice(0, typedChars)
              : '';

          if (!isCompleted && !isTyping) return null;

          return (
            <div
              key={i}
              className={`boot-line ${isCompleted ? 'visible' : ''} ${isTyping ? 'typing' : ''} ${line.className || ''}`}
            >
              {displayText}
              {isTyping && <span className="boot-cursor" />}
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ─── Render: Screen B ─── */
  const renderScreenB = () => {
    const now = new Date();
    const fileId = `GH-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-0042`;
    const timestamp = now.toISOString().slice(0, 19).replace('T', ' ') + ' UTC';

    return (
      <div className="screen-b">
        <div className="crt-monitor">
          <div className="crt-header">
            <span className="crt-header-title">█ PERSONNEL DOSSIER</span>
            <span className="crt-file-id">FILE-ID: {fileId}</span>
          </div>

          <div className="dossier-fields">
            {DOSSIER_FIELDS.map((field, i) => (
              <div
                key={field.label}
                className={`dossier-row ${i < revealedRows ? 'revealed' : ''}`}
              >
                <span className="dossier-label">{field.label}:</span>
                <span className="dossier-value">{field.value}</span>
              </div>
            ))}
          </div>

          <div className="dossier-footer">
            <div className="clearance-badge">
              <span className="dot" />
              CLEARANCE: LEVEL 5 — ACTIVE
            </div>
            <span className="timestamp-stamp">{timestamp}</span>
          </div>
        </div>
      </div>
    );
  };

  /* ─── Render: Screen C ─── */
  const renderScreenC = () => (
    <div className={`screen-c ${bridge === 'glitch-out' ? 'glitching-out' : ''}`}>
      {/* Mission Objective Box */}
      <div className={`glitch-box ${missionRevealed ? 'revealed glitch-in' : ''}`}>
        <div className={`glitch-text ${glitchActive ? 'active' : ''}`} data-text="MISSION OBJECTIVE">
          <div className="mission-label">MISSION OBJECTIVE</div>
        </div>
        <p className="mission-text">
          BUILDING INTELLIGENT SYSTEMS THAT BRIDGE RAW MODELS AND REAL PRODUCTS
          THROUGH RL AGENTS AND FULL-STACK AI APPLICATIONS.
        </p>
      </div>

      {/* Directory Listing Box */}
      <div className={`glitch-box ${revealedDirLines > 0 ? 'revealed glitch-in' : ''}`}>
        <div className="dir-header">$ dir</div>
        {DIR_LISTING.map((item, i) => (
          <div
            key={item.name}
            className={`dir-line ${i < revealedDirLines ? 'revealed' : ''}`}
          >
            <span className="dir-arrow">{'>'}</span>
            <span className="dir-name">{item.name}</span>
            <span className="dir-meta">{item.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── Render: Hack-Out Bridge ─── */
  const renderBridge = () => {
    if (bridge === 'none' || bridge === 'glitch-out') return null;

    if (bridge === 'blackout') {
      return <div className="hack-out-overlay" />;
    }

    return (
      <div className="hack-out-overlay">
        <div className={`name-reveal ${bridge === 'final-glitch' ? 'final-glitch' : ''}`}>
          {NAME_CHARS.map((char, i) => {
            if (i >= nameCharsRevealed) return null;
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 60;
            return (
              <span
                key={i}
                className={`name-char ${char === ' ' ? 'space' : ''}`}
                style={{
                  animationDelay: '0ms',
                  '--offset-x': `${offsetX}px`,
                  '--offset-y': `${offsetY}px`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  if (skipRequested) return null;

  return (
    <div className="terminal-boot">
      {screen === 'A' && renderScreenA()}
      {screen === 'B' && renderScreenB()}
      {screen === 'C' && renderScreenC()}
      {renderBridge()}
      {renderExitButton()}
    </div>
  );
}
