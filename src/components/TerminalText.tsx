
import React, { useState, useEffect } from 'react';

interface TerminalTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const TerminalText: React.FC<TerminalTextProps> = ({ 
  text, 
  speed = 50, 
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  useEffect(() => {
    // After typing is complete, blink cursor for a while then remove it
    if (index >= text.length) {
      const timeout = setTimeout(() => {
        setShowCursor(false);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [index, text.length]);

  return (
    <div className="font-mono text-terminal-green">
      {displayedText}
      {showCursor && <span className="terminal-cursor"></span>}
    </div>
  );
};

export default TerminalText;
