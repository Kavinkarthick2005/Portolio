import React from 'react';
import './MissionComplete.css';

export default function InteractiveSignature() {
  return (
    <div className="commander-profile-raw">
      <div className="cp-header">COMMANDER PROFILE</div>

      <div className="cp-data-grid">
        <div className="cp-data-row">
          <div className="cp-label-zone">
            <span className="cp-green-bullet"></span>
            <span className="cp-label">NAME</span>
          </div>
          <span className="cp-value">KAVIN KARTHICK</span>
        </div>
        
        <div className="cp-data-row">
          <div className="cp-label-zone">
            <span className="cp-green-bullet"></span>
            <span className="cp-label">STATUS</span>
          </div>
          <span className="cp-value">ACTIVE</span>
        </div>
        
        <div className="cp-data-row">
          <div className="cp-label-zone">
            <span className="cp-green-bullet"></span>
            <span className="cp-label">ROLE</span>
          </div>
          <span className="cp-value">AI ENGINEER</span>
        </div>
        
        <div className="cp-data-row">
          <div className="cp-label-zone">
            <span className="cp-green-bullet"></span>
            <span className="cp-label">NEXT OBJECTIVE</span>
          </div>
          <span className="cp-value">BUILDING INTELLIGENT SYSTEMS</span>
        </div>
        
        <div className="cp-data-row">
          <div className="cp-label-zone">
            <span className="cp-green-bullet"></span>
            <span className="cp-label">LAST LOG</span>
          </div>
          <span className="cp-value">STILL EXPLORING</span>
        </div>
      </div>
    </div>
  );
}
