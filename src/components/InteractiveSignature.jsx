import React, { useState } from 'react';
import './MissionComplete.css';

export default function InteractiveSignature() {
  const [isLocked, setIsLocked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const [isDiagramLocked, setIsDiagramLocked] = useState(false);
  const [isDiagramHovered, setIsDiagramHovered] = useState(false);

  const showDigital = isLocked || isHovered;
  const showDigitalDiagram = isDiagramLocked || isDiagramHovered;

  return (
    <div className="interactive-signature-wrapper" id="final-signature-zone">
      <div 
        className={`is-image-container ${showDigital ? 'show-digital' : ''}`}
        onClick={() => setIsLocked(!isLocked)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Default pencil sketch */}
        <img src={`${import.meta.env.BASE_URL}sign.png`} alt="Signature Base" className="is-base" />
        
        {/* Authenticated phosphor version */}
        <img src={`${import.meta.env.BASE_URL}sign.png`} alt="Signature Scanned" className="is-scanned" />
        
        {/* Optional scan line effect for transition */}
        <div className="is-scan-line"></div>
      </div>
      
      <div className="is-caption-group">
        <div className="is-name">KAVIN KARTHICK</div>
        <div className="is-status">
          MISSION STATUS: ACTIVE <span className="is-status-dot"></span>
        </div>
      </div>
    </div>
  );
}
