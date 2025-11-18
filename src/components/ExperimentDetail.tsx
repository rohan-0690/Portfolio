import './ExperimentDetail.css';

interface Experiment {
  id: number;
  title: string;
  type: string;
  description: string;
  tech: string[];
  features: string[];
  demoUrl: string;
  codeUrl: string;
}

interface ExperimentDetailProps {
  experiment: Experiment;
  onClose: () => void;
}

export default function ExperimentDetail({ experiment, onClose }: ExperimentDetailProps) {
  return (
    <div className="experiment-modal" onClick={onClose}>
      <div className="experiment-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="experiment-modal-header">
          <div>
            <span className="experiment-modal-type">{experiment.type}</span>
            <h2 className="experiment-modal-title">{experiment.title}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="experiment-modal-body">
          <div className="experiment-section">
            <h3>Overview</h3>
            <p className="experiment-overview">{experiment.description}</p>
          </div>

          <div className="experiment-section">
            <h3>Technologies Used</h3>
            <div className="tech-tags">
              {experiment.tech.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="experiment-section">
            <h3>Key Features</h3>
            <ul className="features-list">
              {experiment.features.map((feature, index) => (
                <li key={index}>
                  <span className="feature-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="experiment-section">
            <h3>Implementation Details</h3>
            <div className="implementation-box">
              <pre><code>{getImplementationCode(experiment.id)}</code></pre>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

function getImplementationCode(id: number): string {
  const codes: Record<number, string> = {
    1: `// 3D Particle System Core
class ParticleSystem {
  constructor(count = 10000) {
    this.particles = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);
    this.initParticles();
  }

  initParticles() {
    for (let i = 0; i < this.particles.length; i += 3) {
      this.particles[i] = (Math.random() - 0.5) * 10;
      this.particles[i + 1] = (Math.random() - 0.5) * 10;
      this.particles[i + 2] = (Math.random() - 0.5) * 10;
    }
  }

  update(mousePos) {
    for (let i = 0; i < this.particles.length; i += 3) {
      const dx = mousePos.x - this.particles[i];
      const dy = mousePos.y - this.particles[i + 1];
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 2) {
        this.velocities[i] += dx * 0.01;
        this.velocities[i + 1] += dy * 0.01;
      }
      
      this.particles[i] += this.velocities[i];
      this.particles[i + 1] += this.velocities[i + 1];
      this.velocities[i] *= 0.95;
      this.velocities[i + 1] *= 0.95;
    }
  }
}`,
    2: `// AI Chat Widget Implementation
class ChatWidget {
  constructor(config) {
    this.model = await tf.loadLayersModel('model.json');
    this.context = [];
    this.intents = this.loadIntents();
  }

  async processMessage(message) {
    const tokens = this.tokenize(message);
    const embedding = await this.getEmbedding(tokens);
    const intent = await this.classifyIntent(embedding);
    
    const response = this.generateResponse(intent, this.context);
    this.context.push({ message, response, intent });
    
    return response;
  }

  classifyIntent(embedding) {
    const prediction = this.model.predict(embedding);
    const intentIndex = prediction.argMax(-1).dataSync()[0];
    return this.intents[intentIndex];
  }

  generateResponse(intent, context) {
    const templates = this.intents[intent].responses;
    const contextAware = this.applyContext(templates, context);
    return this.selectBestResponse(contextAware);
  }
}`,
    3: `// Smart Home Dashboard
class IoTDashboard {
  constructor() {
    this.mqtt = mqtt.connect('wss://broker.example.com');
    this.devices = new Map();
    this.setupListeners();
  }

  setupListeners() {
    this.mqtt.on('message', (topic, message) => {
      const data = JSON.parse(message.toString());
      this.updateDevice(topic, data);
      this.emit('deviceUpdate', { topic, data });
    });
  }

  subscribeToDevice(deviceId) {
    this.mqtt.subscribe(\`home/\${deviceId}/#\`);
  }

  controlDevice(deviceId, command, value) {
    const topic = \`home/\${deviceId}/control\`;
    const payload = JSON.stringify({ command, value });
    this.mqtt.publish(topic, payload);
  }

  getDeviceStatus(deviceId) {
    return this.devices.get(deviceId);
  }

  createAutomation(rule) {
    this.automations.push(rule);
    this.evaluateAutomations();
  }
}`,
    4: `// Generative Art Studio
class ArtGenerator {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.params = this.getDefaultParams();
  }

  generate(algorithm) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    switch(algorithm) {
      case 'flow-field':
        this.generateFlowField();
        break;
      case 'fractal':
        this.generateFractal();
        break;
      case 'circles':
        this.generateCirclePacking();
        break;
    }
  }

  generateFlowField() {
    const particles = 5000;
    for (let i = 0; i < particles; i++) {
      let x = Math.random() * this.width;
      let y = Math.random() * this.height;
      
      for (let j = 0; j < 100; j++) {
        const angle = this.noise(x, y) * Math.PI * 2;
        x += Math.cos(angle) * this.params.step;
        y += Math.sin(angle) * this.params.step;
        
        this.ctx.fillStyle = this.getColor(x, y);
        this.ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}`,
    5: `// Code Snippet Manager
class SnippetManager {
  constructor() {
    this.db = null;
    this.initDB();
  }

  async initDB() {
    this.db = await openDB('snippets', 1, {
      upgrade(db) {
        const store = db.createObjectStore('snippets', {
          keyPath: 'id',
          autoIncrement: true
        });
        store.createIndex('tags', 'tags', { multiEntry: true });
        store.createIndex('language', 'language');
      }
    });
  }

  async saveSnippet(snippet) {
    return await this.db.add('snippets', {
      ...snippet,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  async searchSnippets(query) {
    const allSnippets = await this.db.getAll('snippets');
    return allSnippets.filter(snippet => 
      snippet.title.includes(query) ||
      snippet.code.includes(query) ||
      snippet.tags.some(tag => tag.includes(query))
    );
  }

  async syncToCloud() {
    const snippets = await this.db.getAll('snippets');
    await fetch('/api/sync', {
      method: 'POST',
      body: JSON.stringify(snippets)
    });
  }
}`,
    6: `// Motion Graphics Library
class MotionLib {
  constructor() {
    this.animations = new Map();
    this.timeline = [];
  }

  animate(element, properties, options = {}) {
    const animation = {
      element,
      properties,
      duration: options.duration || 1000,
      easing: options.easing || 'easeInOut',
      delay: options.delay || 0,
      onComplete: options.onComplete
    };

    const id = this.generateId();
    this.animations.set(id, animation);
    this.startAnimation(id);
    
    return id;
  }

  startAnimation(id) {
    const anim = this.animations.get(id);
    const startTime = performance.now() + anim.delay;
    const startValues = this.getStartValues(anim.element, anim.properties);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / anim.duration, 1);
      const easedProgress = this.ease(progress, anim.easing);

      this.applyProperties(anim.element, anim.properties, 
                          startValues, easedProgress);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        anim.onComplete?.();
      }
    };

    requestAnimationFrame(update);
  }
}`
  };
  
  return codes[id] || '// Code implementation coming soon...';
}
