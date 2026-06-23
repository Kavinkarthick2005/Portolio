import React, { useState } from 'react';
import './MissionComplete.css';
import MissionCompleteBoard from './MissionCompleteBoard';
import MissionStats from './MissionStats';

export default function MissionComplete() {
  const [isDigitalToggled, setIsDigitalToggled] = useState(false);
  const [isDigitalHovered, setIsDigitalHovered] = useState(false);

  const handleReturnToOrbit = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const flash = document.createElement('div');
    flash.className = 'system-reboot-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);
  };

  return (
    <section className="mission-complete-final" id="contact">
      {/* Zone 0: Ticker */}
      <div className="mc-ticker-zone">
        <div className="mc-ticker-content">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mc-ticker-item">@ KAVIN <span className="mc-ticker-star">✦</span></span>
          ))}
        </div>
        {/* Duplicate for seamless marquee */}
        <div className="mc-ticker-content" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <span key={`dup-${i}`} className="mc-ticker-item">@ KAVIN <span className="mc-ticker-star">✦</span></span>
          ))}
        </div>
      </div>

      <div className="mc-final-container">
        {/* Zone 1: Headline */}
        <div className="mc-headline-zone">
          <div className="mc-eyebrow">MISSION COMPLETED</div>
          <h2 className="mc-display-text">
            The mission ends here.<br />
            The Exploration doesn't.
          </h2>
        </div>

        {/* Zone 2: Archive Board */}
        <div className="mc-board-zone">
          <MissionCompleteBoard />
        </div>

        {/* Zone 3: Bottom Bar */}
        <div className="mc-bottom-bar">

          <div className="mc-bottom-left">
            <div className="mc-signature-wrapper">
              <img src={`${import.meta.env.BASE_URL}sign1.png`} alt="Signature" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left center', filter: 'invert(1)' }} />
            </div>

            <div className="mc-mission-files">
              <div className="mc-files-label">MISSION FILES</div>
              <div className="mc-files-grid">
                <div className="mc-files-col">
                  <a href="https://github.com/Kavinkarthick2005" target="_blank" rel="noreferrer" className="mc-file-link">→ GITHUB</a>
                  <a href="https://linkedin.com/in/kavinkarthickr" target="_blank" rel="noreferrer" className="mc-file-link">→ LinkedIn</a>
                </div>
                <div className="mc-files-col">
                  <a href="mailto:kavinkarthick2005@gmail.com" className="mc-file-link">→ Email</a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="mc-file-link">→ Instagram</a>
                </div>
              </div>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer" className="mc-file-link mc-resume-link">→ RESUME</a>
            </div>

            <div className="mc-stats-wrapper">
              <MissionStats />
            </div>
          </div>

          <div className="mc-bottom-right">
            <div className="mc-outcome-label">MISSION OUTCOME/</div>

            <div
              className={`mc-sketch-card ${isDigitalToggled ? 'is-toggled' : ''} ${isDigitalHovered ? 'is-hovered' : ''}`}
              onMouseEnter={() => setIsDigitalHovered(true)}
              onMouseLeave={() => setIsDigitalHovered(false)}
              onClick={() => setIsDigitalToggled(!isDigitalToggled)}
            >
              {/* Primary Sketch Layer */}
              <div className="mc-sketch-layer mc-sketch-primary">
                <img src={`${import.meta.env.BASE_URL}digital_c.png`} alt="Sketch" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Digital Reconstruct Layer (revealed via sweep) */}
              <div className="mc-sketch-layer mc-sketch-digital">
                <img src={`${import.meta.env.BASE_URL}digital_g.png`} alt="Digital" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div className="mc-radar-sweep"></div>
            </div>

            <div className="mc-commander-info">
              <div className="mc-commander-name">KAVIN KARTHICK</div>
              <div className="mc-commander-status">
                MISSION STATUS: ACTIVE <span className="mc-status-dot"></span>
              </div>
              <div className="mc-memory-fragment">
                MEMORY_FRAGMENT_01<br />
                "Some systems are built with code. Some are built with people."
              </div>
            </div>

            <div className="mc-action-buttons">
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer" className="mc-resume-btn">→ RESUME</a>
              <button className="mc-up-arrow-btn" onClick={handleReturnToOrbit}>↑</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
