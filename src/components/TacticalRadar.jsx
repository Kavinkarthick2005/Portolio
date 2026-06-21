import React, { useState, useEffect, useRef } from 'react';
import './TacticalRadar.css';

export const RADAR_DATA = {
  'Python': { projects: ['Carbon AQI', 'RiskLoom', 'CareerPro', 'PPO Agent'], role: 'Core AI + backend language', confidence: 'ADVANCED' },
  'FastAPI': { projects: ['WhisperFlow', 'Carbon AQI', 'CareerPro'], role: 'Backend architecture', confidence: 'ADVANCED' },
  'PostgreSQL': { projects: ['WhisperFlow', 'RiskLoom', 'Carbon AQI'], role: 'Relational data', confidence: 'ADVANCED' },
  'React': { projects: ['WhisperFlow', 'Carbon AQI', 'RiskLoom'], role: 'Frontend UI', confidence: 'ADVANCED' },
  'Next.js': { projects: ['WhisperFlow', 'Carbon AQI'], role: 'Full-stack SSR', confidence: 'ADVANCED' },
  'Docker': { projects: ['CareerPro', 'Carbon AQI'], role: 'Containerization', confidence: 'INTERMEDIATE' },
  'Azure': { projects: ['CareerPro'], role: 'Cloud infrastructure', confidence: 'INTERMEDIATE' },
  'PyTorch': { projects: ['Carbon AQI'], role: 'Deep learning models', confidence: 'ADVANCED' },
  'PPO': { projects: ['Carbon AQI', 'Flow State'], role: 'Reinforcement learning', confidence: 'ADVANCED' },
  'LangChain': { projects: ['Agentic Scout', 'US Companion'], role: 'LLM orchestration', confidence: 'ADVANCED' },
  'Unity': { projects: ['VR Rehab', 'Flow State'], role: 'XR & Game Engine', confidence: 'ADVANCED' },
  'C#': { projects: ['VR Rehab', 'Flow State'], role: 'Game logic', confidence: 'ADVANCED' },
  'Flutter': { projects: ['US Companion'], role: 'Mobile development', confidence: 'ADVANCED' },
  'Supabase': { projects: ['US Companion'], role: 'Real-time database', confidence: 'INTERMEDIATE' },
  'Groq': { projects: ['US Companion', 'Agentic Scout'], role: 'High-speed inference', confidence: 'ADVANCED' }
};

export const RADAR_ITEMS = Object.keys(RADAR_DATA);

export default function TacticalRadar({ isPaused = false }) {
  const [targetLock, setTargetLock] = useState(null);
  
  const radarContainerRef = useRef(null);
  const blipsRef = useRef([]);

  // Radar sphere math
  useEffect(() => {
    if (isPaused) return;

    let animationFrameId;
    let rotation = 0;
    const n = RADAR_ITEMS.length;
    
    // Distribute points using fibonacci sphere
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
        
        const radius = 160;
        const posX = xRot * radius;
        const posY = finalY * radius;

        blip.style.transform = `translate(-50%, -50%) translate(${posX}px, ${posY}px) scale(${scale})`;
        blip.style.opacity = opacity;
        blip.style.zIndex = Math.floor(finalZ * 100);
      });

      animationFrameId = requestAnimationFrame(updateBlips);
    };

    updateBlips();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div className="radar-layout-wrapper">
      <div className="radar-container" ref={radarContainerRef}>
        <div className="radar-grid">
          <div className="radar-ring ring-1" />
          <div className="radar-ring ring-2" />
          <div className="radar-ring ring-3" />
          <div className="radar-ring ring-4" />
          <div className="radar-crosshair cross-x" />
          <div className="radar-crosshair cross-y" />
        </div>
        
        <div className="radar-sweep" />
        
        <div className="radar-blips">
          {RADAR_ITEMS.map((item, i) => (
            <div 
              key={item} 
              className="radar-blip-wrapper"
              ref={el => blipsRef.current[i] = el}
              onMouseEnter={(e) => {
                e.currentTarget.dataset.hovered = 'true';
                setTargetLock(item);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.dataset.hovered = 'false';
                setTargetLock(null);
              }}
            >
              <div className="blip-inner">
                <div className="blip-dot" />
                <span className="blip-label">{item}</span>
                <div className="blip-tether" />
              </div>
            </div>
          ))}
          <div className="radar-converge-point" />
        </div>
      </div>

      {/* Target Lock Panel */}
      <div className={`target-lock-panel ${targetLock ? 'is-active' : ''}`}>
        {targetLock && (
          <>
            <div className="tl-header">TARGET LOCK</div>
            <h2 className="tl-tech">{targetLock}</h2>
            
            <div className="tl-section">
              <span className="tl-label">Projects:</span>
              <ul className="tl-list">
                {RADAR_DATA[targetLock].projects.map(p => <li key={p}>• {p}</li>)}
              </ul>
            </div>
            
            <div className="tl-section">
              <span className="tl-label">Role:</span>
              <p className="tl-desc">{RADAR_DATA[targetLock].role}</p>
            </div>
            
            <div className="tl-section">
              <span className="tl-label">Confidence:</span>
              <p className="tl-confidence">{RADAR_DATA[targetLock].confidence}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
