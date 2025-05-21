import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AstrologyReading } from '../types';
import { History, X, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface ReadingHistoryProps {
  readings: AstrologyReading[];
  onSelectReading: (reading: AstrologyReading) => void;
  onClose: () => void;
}

const ReadingHistory: React.FC<ReadingHistoryProps> = ({ 
  readings, 
  onSelectReading,
  onClose 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-20">
      {/* History Toggle Button */}
      <motion.button
        className="w-12 h-12 rounded-full bg-cosmic-purple flex items-center justify-center shadow-cosmic hover:bg-cosmic-deepPurple transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-cosmic-text" />
        ) : (
          <History className="h-5 w-5 text-cosmic-text" />
        )}
      </motion.button>
      
      {/* History Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-14 right-0 w-80 max-h-[70vh] overflow-y-auto cosmic-card"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-display text-cosmic-accent">Past Readings</h3>
              <button 
                onClick={onClose}
                className="p-1 text-cosmic-textDim hover:text-cosmic-text transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            {readings.length === 0 ? (
              <p className="text-cosmic-textDim italic text-sm p-4 text-center">
                No previous readings found in the cosmic archives.
              </p>
            ) : (
              <ul className="space-y-2">
                {readings.map((reading) => (
                  <motion.li 
                    key={reading.id}
                    whileHover={{ x: 5 }}
                    className="border-b border-cosmic-purple/30 last:border-b-0"
                  >
                    <button
                      className="w-full text-left p-3 hover:bg-cosmic-purple/10 transition-colors flex justify-between items-center"
                      onClick={() => {
                        onSelectReading(reading);
                        setIsOpen(false);
                      }}
                    >
                      <div>
                        <p className="text-sm font-medium text-cosmic-text">
                          {reading.userDetails.birthLocation}
                        </p>
                        <p className="text-xs text-cosmic-textDim">
                          {reading.userDetails.birthDate && 
                            format(new Date(reading.timestamp), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <ChevronRight size={16} className="text-cosmic-accent" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReadingHistory;