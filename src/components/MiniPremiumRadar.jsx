import React, { useEffect, useRef } from 'react';
import './MiniPremiumRadar.css';

export default function MiniPremiumRadar() {
  const radarContainerRef = useRef(null);

  return (
    <div className="mini-radar-container">
      <div className="mr-bloom"></div>
      
      {/* Corner Brackets */}
      <div className="mr-corner top-left"></div>
      <div className="mr-corner top-right"></div>
      <div className="mr-corner bottom-left"></div>
      <div className="mr-corner bottom-right"></div>
      
      <div className="mr-core" ref={radarContainerRef}>
        <div className="mr-grid">
          <div className="mr-ring mr-ring-1" />
          <div className="mr-ring mr-ring-2" />
          <div className="mr-ring mr-ring-3" />
          <div className="mr-crosshair mr-cross-x" />
          <div className="mr-crosshair mr-cross-y" />
        </div>
        
        <div className="mr-sweep" />
        
        {/* Simplified glowing nodes layout */}
        <div className="mr-nodes">
          <div className="mr-node" style={{ top: '25%', left: '40%' }}></div>
          <div className="mr-node" style={{ top: '65%', left: '75%' }}></div>
          <div className="mr-node" style={{ top: '75%', left: '30%' }}></div>
          <div className="mr-node" style={{ top: '40%', left: '80%' }}></div>
          <div className="mr-node active" style={{ top: '45%', left: '55%' }}></div>
          <div className="mr-center-pulse"></div>
        </div>
      </div>
    </div>
  );
}
