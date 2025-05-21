import { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { motion } from 'framer-motion';

interface CrystalBallProps {
  isActive?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const CrystalBall: React.FC<CrystalBallProps> = ({ 
  isActive = false, 
  onClick,
  size = 'md'
}) => {
  const ballRef = useRef<HTMLDivElement>(null);
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };
  
  const [{ xy }, api] = useSpring(() => ({ xy: [0, 0] }));
  
  const bind = useDrag(({ movement: [mx, my], down }) => {
    api.start({ xy: down ? [mx, my] : [0, 0], immediate: down });
  });
  
  useEffect(() => {
    if (!ballRef.current) return;
    
    const ball = ballRef.current;
    let frame: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ball.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      ball.style.setProperty('--x', `${x * 20}deg`);
      ball.style.setProperty('--y', `${y * 20}deg`);
    };
    
    ball.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      ball.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  
  return (
    <animated.div
      {...bind()}
      ref={ballRef}
      onClick={onClick}
      className={`relative ${sizeClasses[size]} cursor-pointer transform-gpu`}
      style={{
        transform: xy.to((x, y) => `translate3d(${x}px,${y}px,0) rotateX(var(--y)) rotateY(var(--x))`)
      }}
    >
      {/* Crystal ball base */}
      <motion.div
        className="absolute bottom-0 w-full h-4 bg-cosmic-purple rounded-full blur-sm"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Crystal ball sphere */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-purple/30 to-cosmic-purple/10 backdrop-blur-md border border-cosmic-purple/50">
        {/* Inner glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-cosmic-accent/10"
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Mystical symbols */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 text-cosmic-accent opacity-50"
              initial={{
                x: `${30 + i * 20}%`,
                y: `${40 + i * 10}%`,
                scale: 0.8
              }}
              animate={{
                y: [`${40 + i * 10}%`, `${30 + i * 10}%`, `${40 + i * 10}%`],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              ✧
            </motion.div>
          ))}
        </div>
        
        {/* Reflection overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
      </div>
      
      {/* Active state glow */}
      {isActive && (
        <motion.div
          className="absolute -inset-4 rounded-full"
          animate={{
            boxShadow: [
              "0 0 15px rgba(255, 215, 0, 0.3)",
              "0 0 25px rgba(255, 215, 0, 0.5)",
              "0 0 15px rgba(255, 215, 0, 0.3)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </animated.div>
  );
};

export default CrystalBall;