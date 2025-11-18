import { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import Work from './components/Work';
import Lab from './components/Lab';
import About from './components/About';
import Contact from './components/Contact';
import PageTransition from './components/PageTransition';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = e.currentTarget;
    
    // Add loading class
    target.classList.add('loading');
    setIsTransitioning(true);
    
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Remove loading class and reset transition after animation
      setTimeout(() => {
        target.classList.remove('loading');
        setIsTransitioning(false);
      }, 600);
    }, 400);
  };

  return (
    <div className="app">
      <CustomCursor />
      <PageTransition isActive={isTransitioning} />
      <nav className="nav">
        <div className="nav-logo">Rohan</div>
        <ul className="nav-links">
          <li><a href="#work" onClick={(e) => handleNavClick(e, '#work')}>Work</a></li>
          <li><a href="#lab" onClick={(e) => handleNavClick(e, '#lab')}>Lab</a></li>
          <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
        </ul>
      </nav>
      <Hero />
      <Work />
      <Lab />
      <About />
      <Contact />
    </div>
  );
}

export default App;
