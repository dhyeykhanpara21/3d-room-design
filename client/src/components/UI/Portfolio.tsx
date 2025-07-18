import { usePortfolio } from '../../hooks/usePortfolio';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import CertificatesSection from './CertificatesSection';
import ProjectsSection from './ProjectsSection';
import ContactForm from './ContactForm';

export default function Portfolio() {
  const { activeSection, setActiveSection } = usePortfolio();

  const closeSection = () => {
    setActiveSection(null);
  };

  return (
    <div className="portfolio-overlay">
      <div className="portfolio-container">
        <button className="close-btn" onClick={closeSection}>
          <span>×</span>
        </button>

        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'skills' && <SkillsSection />}
        {activeSection === 'certificates' && <CertificatesSection />}
        {activeSection === 'projects' && <ProjectsSection />}
        {activeSection === 'contact' && <ContactForm />}
      </div>
    </div>
  );
}
