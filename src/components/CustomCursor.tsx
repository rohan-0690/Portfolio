import { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  id: number;
}

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const updatePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('.project-card') !== null ||
        target.closest('.experiment-card') !== null
      );
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      createClickParticles(mouseX, mouseY);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    const createClickParticles = (x: number, y: number) => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const speed = 2 + Math.random() * 2;
        newParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          id: particleIdRef.current++
        });
      }
      setParticles(prev => [...prev, ...newParticles]);
    };

    // Smooth cursor follow with lag
    const animateCursor = () => {
      setCursorPos(prev => ({
        x: prev.x + (mouseX - prev.x) * 0.25,
        y: prev.y + (mouseY - prev.y) * 0.25
      }));

      setTrailPos(prev => ({
        x: prev.x + (mouseX - prev.x) * 0.12,
        y: prev.y + (mouseY - prev.y) * 0.12
      }));

      // Update particles
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx * 0.95,
            vy: p.vy * 0.95,
            life: p.life - 0.02
          }))
          .filter(p => p.life > 0)
      );

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    const animation = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <>
      <div
        className={`custom-cursor ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />
      <div
        className="cursor-trail"
        style={{
          left: `${trailPos.x}px`,
          top: `${trailPos.y}px`,
        }}
      />
      {particles.map(particle => (
        <div
          key={particle.id}
          className="cursor-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.life,
            transform: `translate(-50%, -50%) scale(${particle.life})`
          }}
        />
      ))}
    </>
  );
}
