import React, { useState, useEffect, useRef } from 'react';
import './SkillsPageRadar.css';

export const RADAR_DATA = {
  'Python': { used: ['Carbon AQI', 'RiskLoom', 'CareerPro', 'PPO Agent'], purpose: 'Core AI + backend language', confidence: 'ADVANCED', pct: 90, related: ['FastAPI', 'PyTorch', 'LangChain'] },
  'FastAPI': { used: ['WhisperFlow', 'Carbon AQI', 'CareerPro'], purpose: 'Backend architecture', confidence: 'ADVANCED', pct: 85, related: ['Python', 'PostgreSQL', 'Docker'] },
  'PostgreSQL': { used: ['WhisperFlow', 'RiskLoom', 'Carbon AQI'], purpose: 'Relational data', confidence: 'ADVANCED', pct: 85, related: ['FastAPI', 'Supabase'] },
  'React': { used: ['WhisperFlow', 'Carbon AQI', 'RiskLoom'], purpose: 'Frontend UI', confidence: 'ADVANCED', pct: 90, related: ['Next.js', 'Vercel'] },
  'Next.js': { used: ['WhisperFlow', 'Carbon AQI'], purpose: 'Full-stack SSR', confidence: 'ADVANCED', pct: 85, related: ['React', 'Vercel'] },
  'Docker': { used: ['CareerPro', 'Carbon AQI'], purpose: 'Containerization', confidence: 'INTERMEDIATE', pct: 70, related: ['Azure', 'FastAPI'] },
  'Azure': { used: ['CareerPro'], purpose: 'Cloud infrastructure', confidence: 'INTERMEDIATE', pct: 65, related: ['Docker', 'Python'] },
  'PyTorch': { used: ['Carbon AQI'], purpose: 'Deep learning models', confidence: 'ADVANCED', pct: 80, related: ['Python', 'PPO'] },
  'PPO': { used: ['Carbon AQI', 'Flow State'], purpose: 'Reinforcement learning', confidence: 'ADVANCED', pct: 85, related: ['PyTorch', 'Unity'] },
  'LangChain': { used: ['Agentic Scout', 'US Companion'], purpose: 'LLM orchestration', confidence: 'ADVANCED', pct: 85, related: ['Groq', 'Python', 'FastAPI'] },
  'Unity': { used: ['VR Rehab', 'Flow State'], purpose: 'XR & Game Engine', confidence: 'ADVANCED', pct: 90, related: ['C#', 'Quest 3'] },
  'C#': { used: ['VR Rehab', 'Flow State'], purpose: 'Game logic', confidence: 'ADVANCED', pct: 85, related: ['Unity'] },
  'Flutter': { used: ['US Companion'], purpose: 'Mobile development', confidence: 'ADVANCED', pct: 80, related: ['Supabase'] },
  'Supabase': { used: ['US Companion'], purpose: 'Real-time database', confidence: 'INTERMEDIATE', pct: 75, related: ['Flutter', 'PostgreSQL'] },
  'Groq': { used: ['US Companion', 'Agentic Scout'], purpose: 'High-speed inference', confidence: 'ADVANCED', pct: 85, related: ['LangChain', 'Python'] }
};

export const RADAR_ITEMS = Object.keys(RADAR_DATA);

// Render the segmented confidence bar
const renderConfidenceBar = (pct) => {
  const filledSegments = Math.round(pct / 10);
  const totalSegments = 10;
  
  return (
    <div className="sr-tl-confidence-bar">
      <div className="sr-tl-bar-segments">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <div key={i} className={`sr-tl-segment ${i < filledSegments ? 'filled' : 'empty'}`}></div>
        ))}
      </div>
      <span className="sr-tl-pct">{pct}%</span>
    </div>
  );
};

export default function SkillsPageRadar({ isPaused = false, isMiniature = false, isPreview = false }) {
  const [targetLock, setTargetLock] = useState(null);
  const [bootPhase, setBootPhase] = useState(0);
  
  const radarContainerRef = useRef(null);
  const blipsRef = useRef([]);

  // Bind hover to parent card if miniature or preview
  useEffect(() => {
    if (!isMiniature && !isPreview) return;
    const triggerArea = isMiniature 
      ? radarContainerRef.current?.closest('.hub-card-inner') 
      : radarContainerRef.current?.closest('.intro-radar-section');
      
    if (!triggerArea) return;
    
    const handleEnter = () => setTargetLock('Python');
    const handleLeave = () => setTargetLock(null);
    
    triggerArea.addEventListener('mouseenter', handleEnter);
    triggerArea.addEventListener('mouseleave', handleLeave);
    
    return () => {
      triggerArea.removeEventListener('mouseenter', handleEnter);
      triggerArea.removeEventListener('mouseleave', handleLeave);
    };
  }, [isMiniature, isPreview]);

  // Boot Sequence
  useEffect(() => {
    const timeouts = [];
    timeouts.push(setTimeout(() => setBootPhase(1), 100)); // sweep & corners
    timeouts.push(setTimeout(() => setBootPhase(2), 300)); // rings & bloom
    timeouts.push(setTimeout(() => setBootPhase(3), 500)); // nodes
    timeouts.push(setTimeout(() => setBootPhase(4), 700)); // target lock ready
    timeouts.push(setTimeout(() => setBootPhase(5), 900)); // HUD labels
    
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Radar sphere math
  useEffect(() => {
    if (isPaused || bootPhase < 3) return;

    let animationFrameId;
    let rotation = 0;
    const n = RADAR_ITEMS.length;
    
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const items = RADAR_ITEMS.map((name, i) => {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / n);
      return {
        name,
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      };
    });

    const updateBlips = () => {
      rotation += 0.003; 
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);
      
      items.forEach((item, i) => {
        const blip = blipsRef.current[i];
        if (!blip) return;

        if (blip.dataset.hovered === 'true') return;

        const xRot = item.x * cosR - item.z * sinR;
        const zRot = item.x * sinR + item.z * cosR;
        const yRot = item.y; 
        
        const tilt = 0.2;
        const finalY = yRot * Math.cos(tilt) - zRot * Math.sin(tilt);
        const finalZ = yRot * Math.sin(tilt) + zRot * Math.cos(tilt);
        
        const scale = (finalZ + 2) / 3; 
        const opacity = Math.max(0.1, (finalZ + 1) / 2);
        
        // Use 12.5 multiplier so when multiplied by var(--r, 16px) it yields ~200px equivalent
        const radius = 12.5; 
        const posX = xRot * radius;
        const posY = finalY * radius;

        blip.style.transform = `translate(-50%, -50%) translate(calc(${posX} * var(--r)), calc(${posY} * var(--r))) scale(${scale})`;
        blip.style.opacity = opacity;
        blip.style.zIndex = Math.floor(finalZ * 100);

        // Dynamic node illumination based on sweep angle
        const nodeAngle = Math.atan2(posY, posX); // -PI to PI
        
        // Compute sweep angle
        const now = performance.now();
        const cycle = (now % 4000) / 4000;
        const sweepDeg = cycle * 360;
        
        // Sync CSS transform for sweep
        if (i === 0 && radarContainerRef.current) {
          const sweepEl = radarContainerRef.current.querySelector('.sr-radar-sweep');
          if (sweepEl) {
            sweepEl.style.transform = `rotate(${sweepDeg}deg)`;
          }
        }

        // Calculate leading edge angle
        // With full circle sweep, rotate(0deg) points straight UP (-PI/2 radians).
        let sweepAngle = (-Math.PI / 2) + (sweepDeg * Math.PI / 180);
        let normSweep = sweepAngle % (Math.PI * 2);
        if (normSweep > Math.PI) normSweep -= Math.PI * 2;

        let diff = normSweep - nodeAngle;
        if (diff > Math.PI) diff -= Math.PI * 2;
        if (diff < -Math.PI) diff += Math.PI * 2;

        // Sweep has a tail that trails behind it. 
        // Clockwise rotation means trailing tail is when diff is positive (sweep passed the node)
        // distance represents how far behind the leading edge the node is.
        const distance = diff; 
        if (distance > 0 && distance < 0.8) {
           const intensity = 1 - (distance / 0.8);
           blip.style.setProperty('--illum', intensity.toFixed(2));
        } else {
           blip.style.setProperty('--illum', '0');
        }
      });

      animationFrameId = requestAnimationFrame(updateBlips);
    };

    updateBlips();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, bootPhase]);

  // Construct cumulative boot classes to fix disappearing bug
  const bootClasses = [
    bootPhase >= 1 ? 'boot-1-up' : '',
    bootPhase >= 2 ? 'boot-2-up' : '',
    bootPhase >= 3 ? 'boot-3-up' : '',
    bootPhase >= 4 ? 'boot-4-up' : '',
    bootPhase >= 5 ? 'boot-5-up' : ''
  ].join(' ').trim();

  let modeClass = '';
  if (isMiniature) modeClass = 'is-miniature';
  if (isPreview) modeClass = 'is-preview';

  return (
    <div className={`skills-radar-composition ${bootClasses} ${modeClass} ${targetLock ? 'target-acquired' : ''}`}>
      
      {/* LEFT HUD: Header & Status */}
      <div className="sr-left-hud">
        <div className="sr-mono-label">SYSTEM.HUD.INITIALIZE()</div>
        <h1 className="sr-title">TACTICAL OVERVIEW</h1>
        <p className="sr-subtitle">TECHNOLOGIES BEHIND THE SYSTEMS I BUILD</p>
        
        <div className="sr-status-grid">
          <div className="sr-status-block">
            <span className="sr-status-label">SYSTEM STATUS</span>
            <span className="sr-status-value online"><span className="sr-dot"></span> ONLINE</span>
          </div>
          <div className="sr-status-block">
            <span className="sr-status-label">MODE</span>
            <span className="sr-status-value active-scan">ACTIVE SCAN</span>
          </div>
        </div>
      </div>

      {/* CENTER: Radar Core */}
      <div className="sr-center-radar">
        {/* Ambient Fog Bloom behind radar */}
        <div className="sr-radar-bloom"></div>

        {/* Framing Brackets */}
        <div className="sr-corner top-left"></div>
        <div className="sr-corner top-right"></div>
        <div className="sr-corner bottom-left"></div>
        <div className="sr-corner bottom-right"></div>
        
        <div className="sr-radar-core" ref={radarContainerRef}>
          <div className="sr-radar-grid">
            <div className="sr-radar-ring sr-ring-1" />
            <div className="sr-radar-ring sr-ring-2" />
            <div className="sr-radar-ring sr-ring-3" />
            <div className="sr-radar-ring sr-ring-4" />
            <div className="sr-radar-ring sr-ring-5" />
            <div className="sr-radar-crosshair sr-cross-x" />
            <div className="sr-radar-crosshair sr-cross-y" />
            
            {/* Hash marks outer ring */}
            <div className="sr-hash-marks"></div>
          </div>
          
          <div className="sr-radar-sweep" />
          
          <div className="sr-radar-blips">
            {RADAR_ITEMS.map((item, i) => (
              <div 
                key={item} 
                className="sr-blip-wrapper"
                ref={el => blipsRef.current[i] = el}
                onMouseEnter={(e) => {
                  if (bootPhase < 4) return;
                  e.currentTarget.dataset.hovered = 'true';
                  setTargetLock(item);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.dataset.hovered = 'false';
                  setTargetLock(null);
                }}
              >
                <div className="sr-blip-inner">
                  <div className="sr-blip-dot" />
                  <span className="sr-blip-label">{item}</span>
                  <div className="sr-blip-tether" />
                </div>
              </div>
            ))}
            <div className="sr-converge-point" />
          </div>
        </div>
        
        <div className="sr-radar-footer-text">
          <span className="sr-pulse-icon">⨀</span> EXPLORE NODES TO LOCK TARGET <span className="sr-pulse-icon">⨀</span>
        </div>
      </div>

      {/* RIGHT HUD: Target Lock Panel */}
      <div className="sr-right-hud">
        <div className={`sr-target-lock ${targetLock ? 'is-active' : ''}`}>
          {targetLock ? (
            <div className="sr-tl-content">
              <div className="sr-tl-header">
                <span className="sr-tl-status-dot"></span>
                TARGET LOCK
                <span className="sr-tl-icon-right">⎈</span>
              </div>
              <h2 className="sr-tl-tech">{targetLock}</h2>
              
              <div className="sr-tl-section">
                <span className="sr-tl-label">USED IN</span>
                <ul className="sr-tl-list sr-tl-bullets">
                  {RADAR_DATA[targetLock].used.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
              
              <div className="sr-tl-section">
                <span className="sr-tl-label">ROLE</span>
                <p className="sr-tl-desc">{RADAR_DATA[targetLock].purpose}</p>
              </div>
              
              <div className="sr-tl-section">
                <span className="sr-tl-label">CONFIDENCE</span>
                <p className="sr-tl-confidence-text">{RADAR_DATA[targetLock].confidence}</p>
                {renderConfidenceBar(RADAR_DATA[targetLock].pct)}
              </div>

              <div className="sr-tl-section sr-tl-footer">
                <span className="sr-tl-label">RELATED TECHNOLOGIES</span>
                <div className="sr-tl-related-chips">
                  {RADAR_DATA[targetLock].related.map(r => <span key={r} className="sr-tl-chip">{r}</span>)}
                </div>
              </div>
            </div>
          ) : (
            <div className="sr-tl-idle">
              <div className="sr-tl-idle-ring"></div>
              AWAITING TARGET
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
