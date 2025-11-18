import { useState } from 'react';
import './Lab.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ExperimentDetail from './ExperimentDetail';

const experiments = [
  { 
    id: 1,
    title: '3D Particle System', 
    type: 'WebGL', 
    description: 'Interactive 3D particle system with physics simulation and mouse interaction',
    tech: ['Three.js', 'WebGL', 'GLSL Shaders'],
    features: [
      'Real-time particle physics',
      'Mouse-based interaction',
      'Custom shader effects',
      'Performance optimized for 10k+ particles'
    ],
    demoUrl: 'https://codepen.io/rohan/pen/particle-system',
    codeUrl: 'https://github.com/rohan/3d-particle-system'
  },
  { 
    id: 2,
    title: 'AI Chat Widget', 
    type: 'Machine Learning', 
    description: 'Lightweight chatbot widget with natural language processing',
    tech: ['TensorFlow.js', 'NLP', 'React'],
    features: [
      'Intent recognition',
      'Context-aware responses',
      'Customizable UI themes',
      'Easy integration API'
    ],
    demoUrl: 'https://ai-chat-widget-demo.vercel.app',
    codeUrl: 'https://github.com/rohan/ai-chat-widget'
  },
  { 
    id: 3,
    title: 'Smart Home Dashboard', 
    type: 'IoT', 
    description: 'Real-time IoT dashboard for monitoring and controlling smart devices',
    tech: ['MQTT', 'WebSocket', 'React', 'Node.js'],
    features: [
      'Real-time device monitoring',
      'Voice control integration',
      'Energy usage analytics',
      'Automation rules engine'
    ],
    demoUrl: 'https://smart-home-dashboard.netlify.app',
    codeUrl: 'https://github.com/rohan/smart-home-dashboard'
  },
  { 
    id: 4,
    title: 'Generative Art Studio', 
    type: 'Creative Coding', 
    description: 'Algorithm-based art generator with customizable parameters',
    tech: ['Canvas API', 'P5.js', 'SVG'],
    features: [
      'Multiple algorithm presets',
      'Real-time parameter tweaking',
      'Export to SVG/PNG',
      'Color palette generator'
    ],
    demoUrl: 'https://codepen.io/rohan/pen/generative-art',
    codeUrl: 'https://github.com/rohan/generative-art-studio'
  },
  { 
    id: 5,
    title: 'Code Snippet Manager', 
    type: 'Developer Tools', 
    description: 'Browser extension for saving and organizing code snippets',
    tech: ['Chrome Extension API', 'IndexedDB', 'Monaco Editor'],
    features: [
      'Syntax highlighting',
      'Tag-based organization',
      'Quick search',
      'Cloud sync support'
    ],
    demoUrl: 'https://chrome.google.com/webstore/detail/snippet-manager',
    codeUrl: 'https://github.com/rohan/code-snippet-manager'
  },
  { 
    id: 6,
    title: 'Motion Graphics Library', 
    type: 'Animation', 
    description: 'Lightweight animation library for smooth web animations',
    tech: ['JavaScript', 'CSS', 'GSAP'],
    features: [
      'Declarative API',
      'Timeline control',
      'Easing functions',
      'Performance optimized'
    ],
    demoUrl: 'https://motion-lib-demo.vercel.app',
    codeUrl: 'https://github.com/rohan/motion-graphics-lib'
  }
];

export default function Lab() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedExperiment, setSelectedExperiment] = useState<typeof experiments[0] | null>(null);

  const handleExperimentClick = (exp: typeof experiments[0], e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    card.classList.add('loading');

    setTimeout(() => {
      setSelectedExperiment(exp);
      card.classList.remove('loading');
    }, 800);
  };

  return (
    <section ref={ref} className={`lab ${isVisible ? 'visible' : ''}`} id="lab">
      <h2 className="section-title">Lab / Experiments</h2>
      <div className="experiments-grid">
        {experiments.map((exp, index) => (
          <div 
            key={index} 
            className="experiment-card"
            onClick={(e) => handleExperimentClick(exp, e)}
          >
            <div className="experiment-type">{exp.type}</div>
            <h3 className="experiment-title">{exp.title}</h3>
            <p className="experiment-description">{exp.description}</p>
            <button className="experiment-link">
              <span>View Details</span>
              <span>→</span>
            </button>
          </div>
        ))}
      </div>
      {selectedExperiment && (
        <ExperimentDetail 
          experiment={selectedExperiment} 
          onClose={() => setSelectedExperiment(null)} 
        />
      )}
    </section>
  );
}
