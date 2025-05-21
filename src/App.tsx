import React, { useState, useEffect } from 'react';
import BirthDetailsForm from './components/BirthDetailsForm';
import ReadingDisplay from './components/ReadingDisplay';
import TentEntrance from './components/TentEntrance';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ParticleBackground from './components/ui/ParticleBackground';
import ReadingHistory from './components/ReadingHistory';
import { UserDetails, AstrologyReading } from './types';
import { getAstrologicalReading, getReadingHistory } from './services/apiService';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [appState, setAppState] = useState<'entrance' | 'form' | 'reading'>('entrance');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentReading, setCurrentReading] = useState<AstrologyReading | null>(null);
  const [readingHistory, setReadingHistory] = useState<AstrologyReading[]>([]);
  
  // Load reading history on mount
  useEffect(() => {
    const history = getReadingHistory();
    setReadingHistory(history);
  }, []);
  
  const handleEnterTent = () => {
    setAppState('form');
  };
  
  const handleFormSubmit = async (userDetails: UserDetails) => {
    setIsLoading(true);
    try {
      const reading = await getAstrologicalReading(userDetails);
      setCurrentReading(reading);
      setAppState('reading');
      
      // Update reading history
      setReadingHistory(getReadingHistory());
    } catch (error) {
      console.error('Error getting reading:', error);
      // Handle error state here
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReturnToForm = () => {
    setAppState('form');
    setCurrentReading(null);
  };
  
  const handleSelectHistoryReading = (reading: AstrologyReading) => {
    setCurrentReading(reading);
    setAppState('reading');
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      <AnimatePresence mode="wait">
        {appState === 'entrance' && (
          <motion.div
            key="entrance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <TentEntrance onEnter={handleEnterTent} />
          </motion.div>
        )}
        
        {appState === 'form' && (
          <motion.div
            key="form"
            className="container mx-auto px-4 py-12 relative z-10 min-h-screen flex flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-3xl md:text-4xl font-display text-cosmic-accent text-center mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Madame Nebula's Astrology Tent
            </motion.h1>
            
            <motion.p 
              className="text-center text-cosmic-textDim font-reading italic mb-10 max-w-lg mx-auto text-lg"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              "The celestial bodies have been whispering your name. 
              Share your cosmic origins so I may divine your path through the stars."
            </motion.p>
            
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <BirthDetailsForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            )}
          </motion.div>
        )}
        
        {appState === 'reading' && currentReading && (
          <motion.div
            key="reading"
            className="relative z-10 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ReadingDisplay 
              reading={currentReading} 
              onClose={handleReturnToForm} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Reading History Component - Always visible but only functional after first reading */}
      {readingHistory.length > 0 && (
        <ReadingHistory 
          readings={readingHistory}
          onSelectReading={handleSelectHistoryReading}
          onClose={() => {}}
        />
      )}
    </div>
  );
}

export default App;