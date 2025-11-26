import './Contact.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const socials = [
  { name: 'GitHub', url: 'https://github.com/rohan-0690', icon: '⚡' },
  { name: 'Phone', url: 'tel:+919324248183', icon: '📱' },
  { name: 'YouTube', url: 'https://youtube.com/@yourchannel', icon: '🎥' },
  { name: 'Email', url: 'mailto:rohanvedak040@gmail.com', icon: '✉️' }
];

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className={`contact ${isVisible ? 'visible' : ''}`} id="contact">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-content">
        <p className="contact-text">
          I'm always open to new opportunities and collaborations.
          Feel free to reach out if you'd like to work together!
        </p>
        <div className="socials">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">{social.icon}</span>
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 Rohan. Made with React + TypeScript</p>
      </footer>
    </section>
  );
}
