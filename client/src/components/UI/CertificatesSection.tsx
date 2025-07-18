import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  useEffect(() => {
    // Animate certificates on mount
    gsap.fromTo('.cert-item',
      { opacity: 0, scale: 0.8, rotationY: 180 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 0.8, stagger: 0.1 }
    );
  }, []);

  const certificates = [
    {
      id: 1,
      name: 'Certified Information Systems Security Professional',
      acronym: 'CISSP',
      issuer: '(ISC)² - International Information System Security Certification Consortium',
      date: '2023',
      status: 'Active',
      description: 'Advanced certification covering security and risk management, asset security, security architecture, and more.',
      color: '#00ff00'
    },
    {
      id: 2,
      name: 'Certified Ethical Hacker',
      acronym: 'CEH',
      issuer: 'EC-Council',
      date: '2022',
      status: 'Active',
      description: 'Comprehensive penetration testing and ethical hacking certification program.',
      color: '#0066ff'
    },
    {
      id: 3,
      name: 'Offensive Security Certified Professional',
      acronym: 'OSCP',
      issuer: 'Offensive Security',
      date: '2023',
      status: 'Active',
      description: 'Hands-on penetration testing certification requiring demonstration of practical skills.',
      color: '#ff0066'
    },
    {
      id: 4,
      name: 'Certified Information Security Manager',
      acronym: 'CISM',
      issuer: 'ISACA',
      date: '2022',
      status: 'Active',
      description: 'Management-level certification focusing on information security strategy and governance.',
      color: '#ff6600'
    },
    {
      id: 5,
      name: 'CompTIA Security+',
      acronym: 'Security+',
      issuer: 'CompTIA',
      date: '2021',
      status: 'Active',
      description: 'Foundation-level certification covering core security concepts and practices.',
      color: '#6600ff'
    },
    {
      id: 6,
      name: 'CompTIA CySA+',
      acronym: 'CySA+',
      issuer: 'CompTIA',
      date: '2022',
      status: 'Active',
      description: 'Cybersecurity analyst certification focusing on threat detection and analysis.',
      color: '#00ffff'
    }
  ];

  const handleCertClick = (certId: number) => {
    setSelectedCert(selectedCert === certId ? null : certId);
    
    // Animate selection
    gsap.to(`.cert-item-${certId}`, {
      scale: selectedCert === certId ? 1 : 1.05,
      duration: 0.3
    });
  };

  return (
    <div className="certificates-content">
      <div className="section-header">
        <h1>CERTIFICATION_VAULT</h1>
        <div className="header-line"></div>
      </div>

      <div className="cert-stats">
        <div className="stat">
          <span className="stat-number">{certificates.length}</span>
          <span className="stat-label">ACTIVE_CERTIFICATIONS</span>
        </div>
        <div className="stat">
          <span className="stat-number">2023</span>
          <span className="stat-label">LATEST_CERTIFICATION</span>
        </div>
        <div className="stat">
          <span className="stat-number">100%</span>
          <span className="stat-label">MAINTENANCE_RATE</span>
        </div>
      </div>

      <div className="certificates-grid">
        {certificates.map((cert, index) => (
          <div 
            key={cert.id}
            className={`cert-item cert-item-${cert.id}`}
            onClick={() => handleCertClick(cert.id)}
            style={{ '--cert-color': cert.color } as React.CSSProperties}
          >
            <div className="cert-front">
              <div className="cert-header">
                <div className="cert-badge">
                  <span className="cert-acronym">{cert.acronym}</span>
                </div>
                <div className="cert-status" data-status={cert.status.toLowerCase()}>
                  {cert.status}
                </div>
              </div>
              
              <div className="cert-body">
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <div className="cert-date">ISSUED: {cert.date}</div>
              </div>

              <div className="cert-glow"></div>
            </div>

            {selectedCert === cert.id && (
              <div className="cert-details">
                <div className="cert-description">
                  <h4>CERTIFICATION_DETAILS:</h4>
                  <p>{cert.description}</p>
                </div>
                
                <div className="cert-verification">
                  <button className="verify-btn">
                    VERIFY_CREDENTIAL
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="cert-legend">
        <h3>CERTIFICATION_CATEGORIES:</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#00ff00' }}></div>
            <span>Management & Governance</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#0066ff' }}></div>
            <span>Ethical Hacking & Penetration Testing</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ff0066' }}></div>
            <span>Advanced Security</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ff6600' }}></div>
            <span>Security Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
