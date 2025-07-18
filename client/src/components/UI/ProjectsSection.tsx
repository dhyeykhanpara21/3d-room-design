import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Animate projects on mount
    gsap.fromTo('.project-card',
      { opacity: 0, y: 50, rotationX: 45 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.1 }
    );
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Neural Threat Detection System',
      category: 'ai',
      status: 'completed',
      technologies: ['Python', 'TensorFlow', 'Elasticsearch', 'Docker'],
      description: 'AI-powered threat detection system using machine learning to identify anomalous network behavior and potential security threats in real-time.',
      features: [
        'Real-time network traffic analysis',
        'Machine learning anomaly detection',
        'Automated threat classification',
        'Integration with SIEM systems'
      ],
      impact: '95% reduction in false positives, 40% faster threat detection',
      github: 'https://github.com/cyberpro/neural-threat-detection',
      demo: 'https://demo.neural-threat.com'
    },
    {
      id: 2,
      title: 'Quantum Encryption Protocol',
      category: 'cryptography',
      status: 'in-progress',
      technologies: ['C++', 'Quantum Computing', 'OpenSSL', 'Python'],
      description: 'Next-generation encryption protocol leveraging quantum computing principles for unbreakable data protection.',
      features: [
        'Quantum key distribution',
        'Post-quantum cryptography',
        'Hardware security module integration',
        'Zero-knowledge proof systems'
      ],
      impact: 'Theoretically unbreakable encryption for critical infrastructure',
      github: 'https://github.com/cyberpro/quantum-encryption',
      demo: null
    },
    {
      id: 3,
      title: 'Cyber Range Simulator',
      category: 'training',
      status: 'completed',
      technologies: ['React', 'Node.js', 'Docker', 'Kubernetes', 'AWS'],
      description: 'Comprehensive cybersecurity training platform with realistic attack scenarios and hands-on learning modules.',
      features: [
        'Interactive attack simulations',
        'Progressive skill assessment',
        'Multi-user collaborative exercises',
        'Real-world scenario modeling'
      ],
      impact: 'Trained 500+ security professionals, 85% certification pass rate',
      github: 'https://github.com/cyberpro/cyber-range',
      demo: 'https://cyber-range.training'
    },
    {
      id: 4,
      title: 'Blockchain Security Audit Framework',
      category: 'blockchain',
      status: 'completed',
      technologies: ['Solidity', 'Web3.js', 'Python', 'Mythril', 'Slither'],
      description: 'Automated smart contract security auditing framework for identifying vulnerabilities in blockchain applications.',
      features: [
        'Automated vulnerability scanning',
        'Smart contract analysis',
        'Gas optimization recommendations',
        'Compliance checking'
      ],
      impact: 'Identified 200+ vulnerabilities across 50+ smart contracts',
      github: 'https://github.com/cyberpro/blockchain-audit',
      demo: 'https://audit.blockchain-sec.com'
    },
    {
      id: 5,
      title: 'Zero-Trust Network Architecture',
      category: 'architecture',
      status: 'completed',
      technologies: ['Kubernetes', 'Istio', 'Envoy', 'OPA', 'SPIFFE/SPIRE'],
      description: 'Complete zero-trust network implementation with micro-segmentation, identity verification, and continuous monitoring.',
      features: [
        'Micro-segmentation enforcement',
        'Identity-based access control',
        'Continuous security monitoring',
        'Automated policy enforcement'
      ],
      impact: '90% reduction in lateral movement attacks, improved compliance',
      github: 'https://github.com/cyberpro/zero-trust-arch',
      demo: null
    },
    {
      id: 6,
      title: 'IoT Security Scanner',
      category: 'iot',
      status: 'in-progress',
      technologies: ['Python', 'Nmap', 'Scapy', 'MQTT', 'CoAP'],
      description: 'Specialized security scanner for IoT devices and networks, identifying vulnerabilities specific to connected devices.',
      features: [
        'Device fingerprinting',
        'Protocol-specific testing',
        'Firmware analysis',
        'Network topology mapping'
      ],
      impact: 'Scanned 10,000+ IoT devices, discovered 1,500+ vulnerabilities',
      github: 'https://github.com/cyberpro/iot-scanner',
      demo: null
    }
  ];

  const categories = [
    { id: 'all', name: 'ALL_PROJECTS', color: '#00ff00' },
    { id: 'ai', name: 'AI/ML_SECURITY', color: '#0066ff' },
    { id: 'cryptography', name: 'CRYPTOGRAPHY', color: '#ff0066' },
    { id: 'training', name: 'TRAINING_PLATFORMS', color: '#ff6600' },
    { id: 'blockchain', name: 'BLOCKCHAIN_SECURITY', color: '#6600ff' },
    { id: 'architecture', name: 'SECURITY_ARCHITECTURE', color: '#00ffff' },
    { id: 'iot', name: 'IOT_SECURITY', color: '#ffff00' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    
    // Animate filter change
    gsap.to('.project-card', {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        gsap.to('.project-card', {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1
        });
      }
    });
  };

  return (
    <div className="projects-content">
      <div className="section-header">
        <h1>PROJECT_REPOSITORY</h1>
        <div className="header-line"></div>
      </div>

      <div className="project-stats">
        <div className="stat">
          <span className="stat-number">{projects.length}</span>
          <span className="stat-label">TOTAL_PROJECTS</span>
        </div>
        <div className="stat">
          <span className="stat-number">{projects.filter(p => p.status === 'completed').length}</span>
          <span className="stat-label">COMPLETED</span>
        </div>
        <div className="stat">
          <span className="stat-number">{projects.filter(p => p.status === 'in-progress').length}</span>
          <span className="stat-label">IN_PROGRESS</span>
        </div>
      </div>

      <div className="project-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${filter === category.id ? 'active' : ''}`}
            onClick={() => handleFilterChange(category.id)}
            style={{ '--filter-color': category.color } as React.CSSProperties}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div 
            key={project.id}
            className={`project-card ${selectedProject === project.id ? 'selected' : ''}`}
            onClick={() => handleProjectClick(project.id)}
            data-category={project.category}
          >
            <div className="project-header">
              <h3 className="project-title">{project.title}</h3>
              <div className={`project-status ${project.status}`}>
                {project.status.toUpperCase()}
              </div>
            </div>

            <div className="project-description">
              <p>{project.description}</p>
            </div>

            <div className="project-tech">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>

            {selectedProject === project.id && (
              <div className="project-details">
                <div className="project-features">
                  <h4>KEY_FEATURES:</h4>
                  <ul>
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-impact">
                  <h4>IMPACT:</h4>
                  <p>{project.impact}</p>
                </div>

                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link github">
                    VIEW_SOURCE
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo">
                      LIVE_DEMO
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="project-glow"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
