import React, { useState, useEffect } from 'react';
import './SkillsPage.css';
import SkillsPageRadar from './SkillsPageRadar';

const ECOSYSTEM_CLUSTERS = [
  {
    name: 'AI',
    techs: [
      { name: 'Python', used: ['Carbon AQI', 'WhisperFlow', 'CareerPro'], purpose: 'Backend APIs, ML pipelines, agent orchestration and RL systems.' },
      { name: 'PyTorch', used: ['Carbon AQI'], purpose: 'Deep learning model training and inference.' },
      { name: 'PPO', used: ['Carbon AQI', 'Flow State'], purpose: 'Reinforcement learning algorithms.' },
      { name: 'LangChain', used: ['Agentic Scout', 'US Companion'], purpose: 'Agentic workflows and LLM orchestration.' }
    ]
  },
  {
    name: 'FULL STACK',
    techs: [
      { name: 'React', used: ['Carbon AQI', 'RiskLoom', 'WhisperFlow'], purpose: 'Component-based UI development and state management.' },
      { name: 'Next.js', used: ['Carbon AQI', 'RiskLoom', 'WhisperFlow'], purpose: 'Full-stack web applications and server-side rendering.' },
      { name: 'FastAPI', used: ['WhisperFlow', 'Carbon AQI', 'CareerPro'], purpose: 'Backend services and API architecture.' },
      { name: 'PostgreSQL', used: ['WhisperFlow', 'Carbon AQI', 'RiskLoom'], purpose: 'Relational database schema and structured data storage.' }
    ]
  },
  {
    name: 'XR',
    techs: [
      { name: 'Unity', used: ['VR Rehab', 'Flow State'], purpose: 'VR game development and stroke rehabilitation systems.' },
      { name: 'C#', used: ['VR Rehab', 'Flow State'], purpose: 'Game logic and object-oriented scripting.' },
      { name: 'Quest 3', used: ['VR Rehab'], purpose: 'Standalone VR deployment target.' }
    ]
  },
  {
    name: 'CLOUD',
    techs: [
      { name: 'Docker', used: ['CareerPro', 'Carbon AQI'], purpose: 'Containerization and reproducible deployment environments.' },
      { name: 'Azure', used: ['CareerPro'], purpose: 'Cloud-native app services and scalable infrastructure.' },
      { name: 'Vercel', used: ['US Companion', 'RiskLoom', 'WhisperFlow'], purpose: 'Frontend deployment and serverless edge functions.' }
    ]
  }
];

const IMPACT = [
  { num: '07', label: 'PROJECTS SHIPPED' },
  { num: '03', label: 'AI SYSTEMS' },
  { num: '05+', label: 'DEPLOYMENTS' },
  { num: '02', label: 'MOBILE APPLICATIONS' },
  { num: '01', label: 'VR REHABILITATION PLATFORM' },
  { num: '100%', label: 'SELF BUILT' }
];

const TIMELINE = [
  { phase: 'FOUNDATIONS', year: '2023', techs: ['C', 'C++', 'Python', 'HTML', 'CSS'] },
  { phase: 'FULL STACK', year: '2024', techs: ['React', 'Next.js', 'FastAPI', 'PostgreSQL'] },
  { phase: 'AI SYSTEMS', year: '2025', techs: ['Machine Learning', 'XGBoost', 'RL', 'PPO'] },
  { phase: 'AGENTIC COMPUTING', year: '2026', techs: ['LangChain', 'Multi-Agent Systems', 'Groq', 'Production AI'] }
];

const EXPLORING = [
  { status: 'ACTIVE', title: 'Multi-Agent Systems' },
  { status: 'ACTIVE', title: 'Agent Memory Systems' },
  { status: 'RESEARCH', title: 'Long-Term Context Architectures' },
  { status: 'EXPERIMENTING', title: 'VR Rehabilitation Systems' },
  { status: 'BUILDING', title: 'AI Portfolio OS' }
];

export default function SkillsPage({ onClose }) {
  const [returningPhase, setReturningPhase] = useState(null);

  // Intersection Observer for cinematic section transitions
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sp-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.sp-cinematic-fade').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleReturnClick = () => {
    if (returningPhase) return;
    
    setReturningPhase('converge');
    
    setTimeout(() => {
      setReturningPhase('crt-collapse');
    }, 400);
    
    setTimeout(() => {
      setReturningPhase('black');
    }, 700);
    
    setTimeout(() => {
      if (onClose) onClose();
    }, 850);
  };

  return (
    <div className={`skills-page ${returningPhase ? 'is-exiting skills-page--' + returningPhase : ''}`}>
      <div className="sp-atmospheric-glow" />
      
      <div className="skills-page-inner">
        
        {/* ================= SECTION 1: RADAR PROTAGONIST ================= */}
        <section className="sp-section sp-radar-hero">
          <SkillsPageRadar isPaused={returningPhase !== null} />
        </section>


        {/* ================= SECTION 2: TECH ECOSYSTEM ================= */}
        <section className="sp-section sp-ecosystem sp-cinematic-fade">
          <h2 className="sp-section-heading">TECH ECOSYSTEM</h2>
          <div className="ecosystem-flows">
            <div className="eco-flow-row">
              <span className="eco-flow-node">Python</span>
              <span className="eco-flow-arrow">→</span>
              <span className="eco-flow-node">FastAPI</span>
              <span className="eco-flow-arrow">→</span>
              <span className="eco-flow-node">PostgreSQL</span>
              <span className="eco-flow-desc">// Backend Architecture</span>
            </div>
            
            <div className="eco-flow-row">
              <span className="eco-flow-node">Flutter</span>
              <span className="eco-flow-arrow">→</span>
              <span className="eco-flow-node">Supabase</span>
              <span className="eco-flow-arrow">→</span>
              <span className="eco-flow-node">Notifications</span>
              <span className="eco-flow-desc">// Mobile Delivery</span>
            </div>

            <div className="eco-flow-row">
              <span className="eco-flow-node">LangChain</span>
              <span className="eco-flow-arrow">→</span>
              <span className="eco-flow-node">Groq</span>
              <span className="eco-flow-arrow">→</span>
              <span className="eco-flow-node">Multi-Agent</span>
              <span className="eco-flow-desc">// AI Orchestration</span>
            </div>

            <div className="eco-flow-row">
              <span className="eco-flow-node">Unity</span>
              <span className="eco-flow-arrow">→</span>
              <span className="eco-flow-node">Meta Quest</span>
              <span className="eco-flow-arrow">→</span>
              <span className="eco-flow-node">VR Rehab</span>
              <span className="eco-flow-desc">// Spatial Computing</span>
            </div>
          </div>
        </section>


        {/* ================= SECTION 3: REAL WORLD IMPACT ================= */}
        <section className="sp-section sp-impact sp-cinematic-fade">
          <h2 className="sp-section-heading">REAL WORLD IMPACT</h2>
          <div className="impact-story-grid">
            <div className="impact-story-item">
              <span className="impact-story-num">07</span>
              <span className="impact-story-label">Projects<br/>Shipped</span>
            </div>
            <div className="impact-story-item">
              <span className="impact-story-num">03</span>
              <span className="impact-story-label">AI Systems<br/>Built</span>
            </div>
            <div className="impact-story-item">
              <span className="impact-story-num">01</span>
              <span className="impact-story-label">VR Rehab<br/>Platform</span>
            </div>
            <div className="impact-story-item">
              <span className="impact-story-num">100%</span>
              <span className="impact-story-label">Self<br/>Built</span>
            </div>
          </div>
        </section>


        {/* ================= SECTION 4: EVOLUTION ================= */}
        <section className="sp-section sp-evolution sp-cinematic-fade">
          <h2 className="sp-section-heading">EVOLUTION OF MY STACK</h2>
          <div className="evolution-flow">
            <div className="evo-step">
              <div className="evo-year">2023</div>
              <div className="evo-phase">FOUNDATIONS</div>
              <div className="evo-techs">Python • C • DSA</div>
            </div>
            <div className="evo-arrow">↓</div>
            <div className="evo-step">
              <div className="evo-year">2024</div>
              <div className="evo-phase">FULL STACK</div>
              <div className="evo-techs">Flutter • FastAPI • PostgreSQL</div>
            </div>
            <div className="evo-arrow">↓</div>
            <div className="evo-step">
              <div className="evo-year">2025</div>
              <div className="evo-phase">AI SYSTEMS</div>
              <div className="evo-techs">RL • ML • Computer Vision</div>
            </div>
            <div className="evo-arrow">↓</div>
            <div className="evo-step">
              <div className="evo-year">2026</div>
              <div className="evo-phase">AGENTIC SYSTEMS</div>
              <div className="evo-techs">LangChain • Groq • Multi-Agent</div>
            </div>
          </div>
        </section>


        {/* ================= SECTION 5: CURRENTLY EXPLORING ================= */}
        <section className="sp-section sp-exploring sp-cinematic-fade">
          <h2 className="sp-section-heading">CURRENTLY EXPLORING</h2>
          <div className="exploring-flows">
            <div className="explore-line">
              <span className="explore-tag active">[ ACTIVE ]</span>
              <span className="explore-text">Multi-Agent Systems</span>
            </div>
            <div className="explore-line">
              <span className="explore-tag building">[ BUILDING ]</span>
              <span className="explore-text">AI Portfolio Operating System</span>
            </div>
            <div className="explore-line">
              <span className="explore-tag experimenting">[ EXPERIMENTING ]</span>
              <span className="explore-text">VR Rehabilitation Systems</span>
            </div>
            <div className="explore-line">
              <span className="explore-tag research">[ RESEARCH ]</span>
              <span className="explore-text">Long-Term Memory Architectures</span>
            </div>
          </div>
        </section>


        {/* ================= SECTION 6: FINAL SIGNATURE ================= */}
        <section className="sp-section sp-signature sp-cinematic-fade">
          <div className="signature-content">
            <p className="signature-emotional">
              I don't collect technologies.<br/>
              I use them to build systems.<br/><br/>
              Every project changed how I build.<br/>
              Every technology changed how I think.<br/><br/>
              And I'm still exploring.
            </p>
            <button className="skills-return-btn" onClick={handleReturnClick}>
              &larr; BACK TO HUB
            </button>
          </div>
        </section>

      </div>
      
      {/* Radar power-down black screen mask */}
      <div className="skills-black-overlay" />
    </div>
  );
}
