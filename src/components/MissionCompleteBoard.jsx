import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './MissionComplete.css';

const PROJECTS = [
  { id: 'us', name: 'US', status: 'DEPLOYED', x: 20, y: 15, rot: -4 },
  { id: 'carbon', name: 'Carbon AQI', status: 'DEPLOYED', x: 75, y: 10, rot: 3 },
  { id: 'career', name: 'CareerPro', status: 'DEPLOYED', x: 80, y: 50, rot: 6 },
  { id: 'vr', name: 'VR Rehab', status: 'DEPLOYED', x: 45, y: 55, rot: -5 },
  { id: 'flow', name: 'FlowState RL', status: 'DEPLOYED', x: 50, y: 85, rot: 2 },
  { id: 'whisper', name: 'WhisperFlow CRM', status: 'DEPLOYED', x: 15, y: 75, rot: -7 },
  { id: 'future', name: 'FUTURE_OBJECTIVES', status: '[REDACTED]', x: 85, y: 85, rot: 9, isRedacted: true }
];

export default function MissionCompleteBoard() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          // Animate lines drawing
          gsap.fromTo('.constellation-line', 
            { strokeDashoffset: 1000 },
            { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', stagger: 0.1 }
          );

          // Animate node pulsing
          gsap.to('.constellation-node-circle', {
            scale: 1.08,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.2,
            transformOrigin: 'center center'
          });
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mc-board-container" ref={containerRef}>
      {/* DESKTOP BOARD */}
      <div className="mc-desktop-board">
        <svg className="mc-constellation-svg" ref={svgRef} preserveAspectRatio="none">
          {/* Define connections */}
          <g className="mc-connections">
            {PROJECTS.map((p1, i) => 
              PROJECTS.slice(i + 1).map((p2, j) => {
                // Connect some nodes randomly or strategically to look like a network
                const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (distance < 50) {
                  const isHighlighted = hoveredNode === p1.id || hoveredNode === p2.id;
                  const isFaded = hoveredNode && !isHighlighted;
                  return (
                    <line 
                      key={`${p1.id}-${p2.id}`}
                      x1={`${p1.x}%`} y1={`${p1.y}%`}
                      x2={`${p2.x}%`} y2={`${p2.y}%`}
                      className={`constellation-line ${isHighlighted ? 'highlight' : ''} ${isFaded ? 'faded' : ''}`}
                      strokeDasharray="1000"
                      strokeDashoffset="0"
                    />
                  );
                }
                return null;
              })
            )}
          </g>

          {/* Define nodes */}
          <g className="mc-nodes">
            {PROJECTS.map(p => (
              <g 
                key={`node-${p.id}`} 
                className={`constellation-node ${hoveredNode === p.id ? 'highlight' : ''}`}
                transform={`translate(0, 0)`}
                style={{ transformOrigin: `${p.x}% ${p.y}%` }}
              >
                <circle cx={`${p.x}%`} cy={`${p.y}%`} r="4" className="constellation-node-circle" />
                <text x={`${p.x}%`} y={`${p.y + 3}%`} textAnchor="middle" className="constellation-node-text">
                  {p.name}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* Pinned Cards */}
        {PROJECTS.map((p) => (
          <div 
            key={p.id}
            className={`mc-pinned-card ${p.isRedacted ? 'is-redacted' : ''}`}
            style={{ 
              left: `${p.x}%`, 
              top: `${p.y}%`, 
              '--rot': `${p.rot}deg` 
            }}
            onMouseEnter={() => setHoveredNode(p.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="mc-pin-dot" />
            <div className="mc-classified-tape">CLASSIFIED</div>
            <div className="mc-card-image-placeholder">
              {p.isRedacted ? '[REDACTED]' : 'PLACEHOLDER'}
            </div>
            <div className="mc-card-details">
              <div className="mc-card-title">{p.name}</div>
              <div className="mc-card-status">{p.isRedacted ? '[REDACTED]' : 'OBJECTIVE COMPLETE'}</div>
              <a href="#" className="mc-card-link" onClick={e => e.preventDefault()}>
                {p.isRedacted ? 'ACCESS DENIED' : 'VIEW FILE →'}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE LIST */}
      <div className="mc-mobile-list">
        {PROJECTS.map((p) => (
          <div key={`mobile-${p.id}`} className="mc-mobile-item">
            <span className="mc-mobile-name">// {p.name}</span>
            <span className={`mc-mobile-status ${p.isRedacted ? 'redacted' : ''}`}>
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
