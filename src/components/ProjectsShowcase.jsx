import React from 'react';
import './ProjectsShowcase.css';

const PROJECTS = [
  {
    index: '01',
    id: 'WHISPERFLOW',
    category: 'AI VOICE WORKSPACE',
    title: 'WhisperFlow CRM',
    description: 'An automated voice pipeline and workspace optimizing customer relationship flows with smart audio transcriber routing.',
    tags: ['Next.js', 'FastAPI', 'Groq Llama 3', 'Whisper API'],
    screenshot: './whisperflow.png',
    url: 'https://crm-theta-ashen-29.vercel.app/login'
  },
  {
    index: '02',
    id: 'CAREERPRO',
    category: 'CLOUD-NATIVE AI DASHBOARD',
    title: 'CareerPro Guidance',
    description: 'A cloud-native career recommendations platform helping students outline career roadmaps utilizing PostgreSQL and predictive analytics.',
    tags: ['React', 'FastAPI', 'Azure Cloud', 'PostgreSQL'],
    screenshot: './careerpro.png',
    url: 'https://careerpro01.vercel.app/dashboard'
  },
  {
    index: '03',
    id: 'US_APP',
    category: 'MOBILE COUPLE ENGINE',
    title: 'Us Companion App',
    description: 'A shared mobile-first environment featuringsupa-coupled three-space sync databases and contextually customized Groq AI partners.',
    tags: ['Flutter', 'Supabase', 'Groq', 'Firebase'],
    screenshot: './us.png',
    url: 'https://us-nu-three.vercel.app/'
  }
];

export default function ProjectsShowcase() {
  return (
    <section className="ps-section" id="curated-projects">
      <div className="ps-container">
        
        {/* Section Header */}
        <div className="ps-header">
          <div className="ps-header-left">
            <span className="ps-eyebrow">// CURATED_PROJECTS.DB</span>
            <h2 className="ps-title">SELECTED WORK</h2>
          </div>
          <div className="ps-header-right">
            <span className="ps-meta-info">03 CURATED SPECIMENS</span>
          </div>
        </div>

        {/* Project Grid / Cards */}
        <div className="ps-grid">
          {PROJECTS.map((proj) => (
            <article key={proj.id} className="ps-card">
              <a 
                href={proj.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ps-card-link"
                id={`project-showcase-${proj.id.toLowerCase()}`}
              >
                
                {/* Visual Screenshot Frame */}
                <div className="ps-image-frame">
                  <img 
                    src={proj.screenshot} 
                    alt={`${proj.title} Screenshot`} 
                    className="ps-image"
                    loading="lazy"
                  />
                  {/* Subtle terminal-like overlay screen lines */}
                  <div className="ps-scanlines" />
                  
                  {/* Category Pill */}
                  <div className="ps-category-badge">
                    {proj.category}
                  </div>
                </div>

                {/* Project Metadata Info */}
                <div className="ps-info">
                  <div className="ps-info-header">
                    <span className="ps-index">{proj.index}</span>
                    <h3 className="ps-project-title">{proj.title}</h3>
                  </div>
                  
                  <p className="ps-description">{proj.description}</p>
                  
                  {/* Tags */}
                  <div className="ps-tags">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="ps-tag">{tag}</span>
                    ))}
                  </div>

                  {/* Operational Launch Indicator */}
                  <div className="ps-launch-action">
                    <span className="ps-launch-txt">LAUNCH OPERATIONAL DEMO</span>
                    <svg className="ps-arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

              </a>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
