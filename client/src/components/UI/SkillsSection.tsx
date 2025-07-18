import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function SkillsSection() {
  useEffect(() => {
    // Animate skill bars
    gsap.fromTo('.skill-bar-fill',
      { width: 0 },
      { width: '100%', duration: 1.5, stagger: 0.1, ease: 'power2.out' }
    );

    // Animate content
    gsap.fromTo('.skills-content > *',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }
    );
  }, []);

  const skills = [
    { name: 'Penetration Testing', level: 95, category: 'offensive' },
    { name: 'Network Security', level: 90, category: 'defensive' },
    { name: 'Incident Response', level: 88, category: 'defensive' },
    { name: 'Malware Analysis', level: 85, category: 'analysis' },
    { name: 'Security Architecture', level: 92, category: 'design' },
    { name: 'Threat Hunting', level: 87, category: 'analysis' },
    { name: 'Cloud Security', level: 83, category: 'cloud' },
    { name: 'Forensics', level: 80, category: 'analysis' }
  ];

  const tools = [
    'Metasploit', 'Nmap', 'Wireshark', 'Burp Suite', 'OWASP ZAP',
    'Splunk', 'ELK Stack', 'Nessus', 'OpenVAS', 'Kali Linux',
    'PowerShell', 'Python', 'Bash', 'YARA', 'Volatility'
  ];

  const certifications = [
    'CISSP', 'CEH', 'OSCP', 'CISM', 'Security+',
    'CySA+', 'GIAC GPEN', 'CISSP', 'CISA'
  ];

  return (
    <div className="skills-content">
      <div className="section-header">
        <h1>SKILL_MATRIX</h1>
        <div className="header-line"></div>
      </div>

      <div className="skills-grid">
        <div className="skills-section">
          <h2>CORE_COMPETENCIES</h2>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-bar-fill" 
                    style={{ width: `${skill.level}%` }}
                    data-category={skill.category}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tools-section">
          <h2>ARSENAL_TOOLS</h2>
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <div key={index} className="tool-badge">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="certifications-section">
        <h2>CERTIFICATION_PROTOCOLS</h2>
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card">
              <div className="cert-icon">🛡️</div>
              <div className="cert-name">{cert}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="specializations">
        <h2>SPECIALIZATION_DOMAINS</h2>
        <div className="spec-grid">
          <div className="spec-card offensive">
            <h3>OFFENSIVE_SECURITY</h3>
            <ul>
              <li>Web Application Testing</li>
              <li>Network Penetration</li>
              <li>Social Engineering</li>
              <li>Red Team Operations</li>
            </ul>
          </div>

          <div className="spec-card defensive">
            <h3>DEFENSIVE_SECURITY</h3>
            <ul>
              <li>SOC Operations</li>
              <li>SIEM Management</li>
              <li>Threat Detection</li>
              <li>Incident Response</li>
            </ul>
          </div>

          <div className="spec-card analysis">
            <h3>SECURITY_ANALYSIS</h3>
            <ul>
              <li>Malware Reverse Engineering</li>
              <li>Digital Forensics</li>
              <li>Threat Intelligence</li>
              <li>Risk Assessment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
