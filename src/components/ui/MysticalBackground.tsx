import { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const MysticalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const smokeParticlesRef = useRef<Path2D[]>([]);
  
  const [{ xy }, api] = useSpring(() => ({ xy: [0, 0] }));
  
  const bind = useDrag(({ movement: [mx, my] }) => {
    api.start({ xy: [mx, my] });
  });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize stars
    const starCount = 150;
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.25,
      speed: Math.random() * 0.5 + 0.1
    }));
    
    // Create smoke particle paths
    smokeParticlesRef.current = Array.from({ length: 20 }, () => {
      const path = new Path2D();
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      
      path.moveTo(x, y);
      for (let i = 0; i < 5; i++) {
        path.quadraticCurveTo(
          x + Math.random() * 100 - 50,
          y + Math.random() * 100 - 50,
          x + Math.random() * 200 - 100,
          y + Math.random() * 200 - 100
        );
      }
      return path;
    });
    
    let frame: number;
    let smokeOpacity = 0;
    let smokeDirection = 0.005;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      starsRef.current.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${star.opacity})`;
        ctx.fill();
        
        star.y -= star.speed;
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.x = Math.random() * canvas.width;
        }
      });
      
      // Draw smoke effect
      smokeOpacity += smokeDirection;
      if (smokeOpacity > 0.3 || smokeOpacity < 0) smokeDirection *= -1;
      
      ctx.globalAlpha = smokeOpacity;
      smokeParticlesRef.current.forEach(path => {
        ctx.fillStyle = 'rgba(58, 31, 93, 0.1)';
        ctx.fill(path);
      });
      ctx.globalAlpha = 1;
      
      frame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: 'screen' }}
      />
      <animated.div
        {...bind()}
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(58, 31, 93, 0.2) 0%, transparent 70%)',
          transform: xy.to((x, y) => `translate3d(${x}px,${y}px,0)`)
        }}
      />
    </>
  );
};

export default MysticalBackground;