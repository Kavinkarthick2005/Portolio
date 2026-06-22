import React from 'react';
import './MissionComplete.css';

const MISSION_FILES = [
  { name: 'RESUME', url: `${import.meta.env.BASE_URL}resume.pdf` },
  { name: 'GITHUB', url: 'https://github.com/Kavinkarthick2005/' },
  { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/kavinkarthick/' },
  { name: 'EMAIL', url: 'mailto:kavinkarthick2005@gmail.com' },
];

export default function MissionFiles() {
  return (
    <div className="mission-files-wrapper">
      <h3 className="mf-title">MISSION FILES</h3>
      <div className="mf-list">
        {MISSION_FILES.map(file => (
          <a key={file.name} href={file.url} target="_blank" rel="noopener noreferrer" className="mf-link">
            {file.name}
          </a>
        ))}
      </div>
    </div>
  );
}
