import './About.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className={`about ${isVisible ? 'visible' : ''}`} id="about">
      <h2 className="section-title">About</h2>
      <div className="about-content">
        <div className="code-block">
          <pre>
            <code>{`class Developer {
  constructor() {
    this.name = "Rohan";
    this.location = "Mumbai";
    this.role = "Full Stack Developer & Designer";
  }

  workExperience() {
    return [
      {
        company: "Freelancing",
        role: "Developer",
        period: "2022 - Present",
        description: "Building scalable web applications and games"
      },
      {
        company: "Freelancing",
        role: "Web Developer",
        period: "2020 - 2022",
        description: "Frontend development and UI/UX"
      }
    ];
  }

  education() {
    return {
      degree: "Information Technology",
      year: "2025"
    };
  }

  skills() {
    return {
      languages: ["JavaScript", "TypeScript", "Python"],
      frameworks: ["React", "Vue", "Node.js"],
      design: ["Figma", "Adobe XD", "Sketch"],
      tools: ["Git", "Docker", "AWS"]
    };
  }
}`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
