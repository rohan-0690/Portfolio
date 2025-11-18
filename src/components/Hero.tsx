import { useState, useEffect } from 'react';
import './Hero.css';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-content" style={{ opacity: 1 - scrollY / 500 }}>
        <h1 className="hero-title">
          Hi, I'm <span className="accent">Rohan</span>
        </h1>
        <p className="hero-tagline">I design and develop things</p>
        <a href="#work" className="scroll-cue">
          <span>Explore my work</span>
          <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
