import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface TentEntranceProps {
  onEnter: () => void;
}

const TentEntrance: React.FC<TentEntranceProps> = ({ onEnter }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-tent bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-darker via-cosmic-background/90 to-cosmic-darker" />
      
      <motion.div 
        className="relative z-10 text-center max-w-3xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div 
          className="mb-6 inline-block"
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="h-16 w-16 md:h-24 md:w-24 text-cosmic-accent mx-auto" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-display text-cosmic-accent mb-4"
          animate={{ 
            textShadow: ["0 0 7px rgba(255,215,0,0.3)", "0 0 10px rgba(255,215,0,0.6)", "0 0 7px rgba(255,215,0,0.3)"] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Cosmic Whispers
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl font-display text-cosmic-text mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Dark Carnival Astrologer
        </motion.p>
        
        <motion.p 
          className="mb-10 text-cosmic-textDim font-reading text-lg md:text-xl italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          "The stars have been awaiting your arrival, seeker. 
          The Dark Carnival's tents hold cosmic truths meant only for your eyes."
        </motion.p>
        
        <motion.button
          className="cosmic-button group relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <span className="relative z-10">Enter Madame Nebula's Tent</span>
          
          {/* Button shine effect */}
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-accent/20 to-transparent skew-x-12"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              repeat: Infinity, 
              repeatDelay: 3,
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          />
        </motion.button>
      </motion.div>
      
      {/* Floating Star Elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-cosmic-accent opacity-70"
          style={{ 
            top: `${10 + (i * 15)}%`, 
            left: `${5 + (i * 20)}%`,
            rotate: i * 30,
            scale: 0.5 + (i * 0.2)
          }}
          animate={{ 
            y: [-(5 + i * 2), (5 + i * 2), -(5 + i * 2)],
          }}
          transition={{ 
            duration: 3 + i, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        >
          <Sparkles size={24 + (i * 4)} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TentEntrance;