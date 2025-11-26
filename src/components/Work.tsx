import { useState } from 'react';
import './Work.css';
import Pseudocode from './Pseudocode';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const projects = [
  {
    title: 'Trading Signal',
    description: 'An intelligent stock analysis platform that provides real-time trading signals and price targets. Features technical analysis, trend prediction, and risk assessment to help traders make informed decisions.',
    tags: ['React', 'Financial Analysis', 'Real-time Data', 'Machine Learning'],
    demo: 'https://example.com',
    code: 'https://github.com/rohan/trading-signal'
  },
  {
    title: 'ARIA',
    description: 'A JARVIS-like AI assistant with voice recognition, natural language processing, and smart automation capabilities. Features real-time responses and seamless integration with various services.',
    tags: ['Python', 'AI/ML', 'NLP', 'Voice Recognition'],
    demo: 'https://example.com',
    code: 'https://github.com/rohan/aria'
  },
  {
    title: 'Band Studio',
    description: 'A comprehensive music production platform featuring high-quality voice recording, an interactive drum machine, and a powerful audio editor for mixing and mastering tracks.',
    tags: ['Web Audio API', 'React', 'Audio Processing', 'Music Production'],
    demo: 'https://example.com',
    code: 'https://github.com/rohan/band-studio'
  },
  {
    title: 'AttendEase',
    description: 'A smart employee attendance tracking system with GPS-based location verification, allowing employees to check in from anywhere. Features real-time monitoring, analytics dashboard, and automated reporting.',
    tags: ['React Native', 'Geolocation', 'Firebase', 'Node.js'],
    demo: 'https://example.com',
    code: 'https://github.com/rohan/attendease'
  }
];

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const handlePseudocodeClick = (projectTitle: string, e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    button.classList.add('loading');

    setTimeout(() => {
      setSelectedProject(projectTitle);
      button.classList.remove('loading');
    }, 800);
  };

  return (
    <section ref={ref} className={`work ${isVisible ? 'visible' : ''}`} id="work">
      <h2 className="section-title">Selected Work</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            <div className="project-links">
              <button 
                className="project-link pseudocode-btn" 
                onClick={(e) => handlePseudocodeClick(project.title, e)}
              >
                <span>Pseudocode</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && (
        <Pseudocode 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
