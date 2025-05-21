import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Consulting the stars..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <div className="relative h-28 w-28">
        {/* Crystal ball */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-purple/30 to-cosmic-purple/10 backdrop-blur-md border border-cosmic-purple/50 shadow-glow"
          animate={{ 
            boxShadow: ["0 0 15px rgba(255, 215, 0, 0.2)", "0 0 25px rgba(255, 215, 0, 0.6)", "0 0 15px rgba(255, 215, 0, 0.2)"] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Spinning stars */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "linear" 
          }}
        >
          <Sparkles className="h-12 w-12 text-cosmic-accent opacity-70" />
        </motion.div>
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cosmic-accent/60"
            initial={{ 
              x: Math.random() * 80 - 40, 
              y: Math.random() * 80 - 40,
              opacity: 0.2
            }}
            animate={{ 
              y: [Math.random() * -20, Math.random() * 20, Math.random() * -20], 
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <motion.p 
        className="text-cosmic-text font-reading text-lg italic text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {message}
      </motion.p>
      
      <motion.div 
        className="w-40 h-1 rounded-full overflow-hidden bg-cosmic-purple/30"
      >
        <motion.div 
          className="h-full bg-cosmic-accent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;