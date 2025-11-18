import { useEffect, useState } from 'react';
import './PageTransition.css';

interface PageTransitionProps {
  isActive: boolean;
}

export default function PageTransition({ isActive }: PageTransitionProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShow(true);
      setTimeout(() => setShow(false), 1000);
    }
  }, [isActive]);

  if (!show) return null;

  return (
    <div className="page-transition">
      <div className="transition-layer layer-1"></div>
      <div className="transition-layer layer-2"></div>
      <div className="transition-layer layer-3"></div>
      <div className="glitch-text">LOADING</div>
    </div>
  );
}
