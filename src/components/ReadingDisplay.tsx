import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterText from './ui/TypewriterText';
import { AstrologyReading } from '../types';
import { Star, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ReadingDisplayProps {
  reading: AstrologyReading;
  onClose: () => void;
}

const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ reading, onClose }) => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const { sections, userDetails } = reading;
  
  // Format the timestamp to readable date
  const formattedDate = format(new Date(reading.timestamp), 'MMMM d, yyyy');
  
  // Handle navigation between reading sections
  const goToPreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };
  
  const goToNextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };
  
  useEffect(() => {
    // Reset to first section when reading changes
    setActiveSection(0);
  }, [reading.id]);
  
  return (
    <div className="h-full overflow-y-auto">
      <motion.div 
        className="relative max-w-4xl mx-auto px-4 py-8 md:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute right-4 top-2 text-cosmic-textDim text-xs flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>{formattedDate}</span>
        </div>
        
        <header className="text-center mb-8">
          <motion.h1 
            className="text-3xl md:text-4xl font-display text-cosmic-accent mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Madame Nebula's Reading
          </motion.h1>
          <motion.p 
            className="text-cosmic-textDim font-reading text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            For a soul born on {userDetails.birthDate ? format(userDetails.birthDate, 'MMMM d, yyyy') : 'the chosen date'} at {userDetails.birthTime} in {userDetails.birthLocation}
          </motion.p>
        </header>
        
        <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-cosmic-card border-2 border-cosmic-purple shadow-glow overflow-hidden"
            animate={{ boxShadow: ["0 0 15px rgba(255, 215, 0, 0.2)", "0 0 25px rgba(255, 215, 0, 0.5)", "0 0 15px rgba(255, 215, 0, 0.2)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-cosmic-purple/20" />
          </motion.div>
          
          {/* Madame Nebula Portrait */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.pexels.com/photos/3771139/pexels-photo-3771139.jpeg?auto=compress&cs=tinysrgb&w=800)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          {/* Floating stars decoration */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 text-cosmic-accent"
              initial={{ 
                x: (i - 1) * 30, 
                y: -20 - (i * 5),
                opacity: 0.5
              }}
              animate={{ 
                y: [-20 - (i * 5), -30 - (i * 5), -20 - (i * 5)],
                opacity: [0.5, 0.9, 0.5]
              }}
              transition={{ 
                duration: 3 + i, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              <Star fill="currentColor" size={16} />
            </motion.div>
          ))}
        </div>
        
        {/* Reading Section Navigation */}
        <nav className="flex justify-center mb-6 overflow-x-auto py-2 px-4 space-x-2">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap
                ${activeSection === index 
                  ? 'bg-cosmic-purple text-cosmic-accent border border-cosmic-accent' 
                  : 'bg-transparent border border-cosmic-purple/50 text-cosmic-textDim hover:border-cosmic-purple'}`}
            >
              {section.title}
            </button>
          ))}
        </nav>
        
        {/* Reading Content Card */}
        <div className="cosmic-card min-h-[300px] mb-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-6"
            >
              <h3 className="text-xl font-display text-cosmic-accent mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 animate-pulse-slow" fill="currentColor" />
                {sections[activeSection].title}
              </h3>
              
              <TypewriterText 
                text={sections[activeSection].content}
                delay={300}
                speed={20} 
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Controls */}
          <div className="flex justify-between mt-6">
            <button 
              onClick={goToPreviousSection}
              disabled={activeSection === 0}
              className={`p-2 rounded-full ${
                activeSection === 0 
                  ? 'text-cosmic-purple/40 cursor-not-allowed' 
                  : 'text-cosmic-purple hover:text-cosmic-accent hover:bg-cosmic-purple/20'
              } transition-colors`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={goToNextSection}
              disabled={activeSection === sections.length - 1}
              className={`p-2 rounded-full ${
                activeSection === sections.length - 1 
                  ? 'text-cosmic-purple/40 cursor-not-allowed' 
                  : 'text-cosmic-purple hover:text-cosmic-accent hover:bg-cosmic-purple/20'
              } transition-colors`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="cosmic-button bg-cosmic-card border-cosmic-purple hover:border-cosmic-accent"
          >
            Return to the Tent Entrance
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReadingDisplay;