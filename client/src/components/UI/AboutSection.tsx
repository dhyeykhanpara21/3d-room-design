import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function AboutSection() {
  useEffect(() => {
    // Animate content on mount
    gsap.fromTo('.about-content > *', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );
  }, []);

  return (
    <div className="about-content">
      <div className="section-header">
        <h1>PROFILE_ANALYSIS</h1>
        <div className="header-line"></div>
      </div>

      <div className="bio-section">
        <div className="profile-header">
          <div className="profile-image">
            <div className="avatar-placeholder">
              <span>CX</span>
            </div>
            <div className="status-indicator">
              <span className="status-dot"></span>
              ONLINE - SECURE MODE
            </div>
          </div>

          <div className="bio-text">
            <h2>CYBER_GUARDIAN</h2>
            <h3>Senior Cybersecurity Specialist</h3>
            
            <p>
              Dedicated cybersecurity professional with 8+ years of experience in digital fortress 
              construction and threat neutralization. Specialized in penetration testing, incident 
              response, and security architecture design.
            </p>

            <p>
              My mission is to protect digital assets and ensure cyber resilience through innovative 
              security solutions and proactive threat hunting. I believe in the power of knowledge 
              sharing and continuous learning in the ever-evolving landscape of cybersecurity.
            </p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">500+</div>
          <div className="stat-label">VULNERABILITIES_PATCHED</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <div className="stat-label">SECURITY_AUDITS</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">8</div>
          <div className="stat-label">YEARS_EXPERIENCE</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">15+</div>
          <div className="stat-label">CERTIFICATIONS</div>
        </div>
      </div>

      <div className="experience-timeline">
        <h3>CAREER_TRAJECTORY</h3>
        
        <div className="timeline-item">
          <div className="timeline-date">2023 - PRESENT</div>
          <div className="timeline-content">
            <h4>Senior Security Architect</h4>
            <p>CyberShield Corporation</p>
            <p>Leading security initiatives and designing enterprise-level security frameworks.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-date">2020 - 2023</div>
          <div className="timeline-content">
            <h4>Penetration Tester</h4>
            <p>SecureNet Solutions</p>
            <p>Conducted comprehensive security assessments and vulnerability testing.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-date">2018 - 2020</div>
          <div className="timeline-content">
            <h4>Security Analyst</h4>
            <p>Digital Defense Inc.</p>
            <p>Monitored security incidents and implemented defensive measures.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
