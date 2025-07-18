import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING CYBERVAULT...');

  useEffect(() => {
    const loadingMessages = [
      'INITIALIZING CYBERVAULT...',
      'LOADING SECURITY PROTOCOLS...',
      'ESTABLISHING ENCRYPTED CONNECTION...',
      'ACTIVATING NEURAL INTERFACES...',
      'SYNCHRONIZING HOLOGRAPHIC DISPLAYS...',
      'CYBERVAULT READY FOR ACCESS'
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Update loading message based on progress
        const expectedMessageIndex = Math.floor((newProgress / 100) * loadingMessages.length);
        if (expectedMessageIndex > messageIndex && expectedMessageIndex < loadingMessages.length) {
          messageIndex = expectedMessageIndex;
          setLoadingText(loadingMessages[messageIndex]);
        }
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate loading bar
    gsap.to('.loading-bar-fill', {
      width: `${progress}%`,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [progress]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="cyber-logo">
          <div className="logo-text">CYBERVAULT</div>
          <div className="logo-subtitle">INTERACTIVE PORTFOLIO SYSTEM</div>
        </div>

        <div className="loading-bar">
          <div className="loading-bar-fill"></div>
          <div className="loading-bar-glow"></div>
        </div>

        <div className="loading-progress">{Math.round(progress)}%</div>
        <div className="loading-text">{loadingText}</div>

        {/* Animated background elements */}
        <div className="loading-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
