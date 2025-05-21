import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  delay = 0,
  speed = 30 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setIsComplete(false);
    setShowCursor(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Initial delay before starting to type
    const initialDelay = setTimeout(() => {
      let currentIndex = 0;
      
      // Function to type characters one by one
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(prevText => prevText + text.charAt(currentIndex));
          currentIndex++;
          timeoutRef.current = setTimeout(typeNextChar, speed);
        } else {
          setIsComplete(true);
          
          // Blink cursor for a while after typing is complete
          setTimeout(() => {
            const blinkInterval = setInterval(() => {
              setShowCursor(show => !show);
            }, 500);
            
            // Stop blinking after a few seconds
            setTimeout(() => {
              clearInterval(blinkInterval);
              setShowCursor(false);
            }, 3000);
          }, 500);
        }
      };
      
      timeoutRef.current = setTimeout(typeNextChar, speed);
    }, delay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      clearTimeout(initialDelay);
    };
  }, [text, delay, speed]);
  
  // Handle multi-line text by replacing newlines with <br> elements
  const formattedText = displayedText.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < displayedText.split('\n').length - 1 && <br />}
    </span>
  ));
  
  return (
    <motion.div 
      className="font-reading text-cosmic-text leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {formattedText}
      {showCursor && (
        <span className="inline-block w-2 h-5 bg-cosmic-accent ml-0.5 animate-pulse" />
      )}
    </motion.div>
  );
};

export default TypewriterText;