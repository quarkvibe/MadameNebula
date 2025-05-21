import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { Moon, Star, MapPin, Clock } from 'lucide-react';
import { ReadingType, UserDetails } from '../types';
import Select from 'react-select';

interface BirthDetailsFormProps {
  onSubmit: (details: UserDetails) => void;
  isLoading: boolean;
}

const ReadingTypeOptions = [
  { value: ReadingType.QUICK, label: 'Quick Glimpse (Free)' },
  { value: ReadingType.FULL, label: 'Full Chart Reading (Premium)' },
  { value: ReadingType.DEEP_DIVE, label: 'Cosmic Deep Dive (Premium)' },
  { value: ReadingType.COMPATIBILITY, label: 'Compatibility Reading (Premium)' }
];

const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#1A1A2E',
    borderColor: '#3A1F5D',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#FFD700'
    },
    padding: '0.25rem',
    borderRadius: '0.375rem'
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#1A1A2E',
    border: '1px solid #3A1F5D',
    borderRadius: '0.375rem',
    boxShadow: '0 4px 20px rgba(26, 26, 46, 0.8)'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#3A1F5D' 
      : state.isFocused 
        ? '#2C1745' 
        : '#1A1A2E',
    color: state.isSelected ? '#FFD700' : '#E0E0FF',
    '&:hover': {
      backgroundColor: '#2C1745'
    },
    padding: '0.75rem 1rem'
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#E0E0FF'
  }),
  input: (provided: any) => ({
    ...provided,
    color: '#E0E0FF'
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#AAAACC'
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: '#3A1F5D'
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: '#AAAACC',
    '&:hover': {
      color: '#E0E0FF'
    }
  })
};

const BirthDetailsForm: React.FC<BirthDetailsFormProps> = ({ onSubmit, isLoading }) => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState<string>('12:00');
  const [birthLocation, setBirthLocation] = useState<string>('');
  const [selectedReadingType, setSelectedReadingType] = useState<ReadingType>(ReadingType.QUICK);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (birthDate && birthTime && birthLocation) {
      onSubmit({
        birthDate,
        birthTime,
        birthLocation,
        readingType: selectedReadingType
      });
    }
  };
  
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.form 
      className="cosmic-card max-w-xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={formVariants}
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl md:text-3xl font-display text-cosmic-accent mb-6 text-center">
        Reveal Your Cosmic Path
      </h2>
      
      <motion.div className="mb-5" variants={itemVariants}>
        <label className="flex items-center mb-2 text-cosmic-text font-medium">
          <Star className="w-4 h-4 text-cosmic-accent mr-2" />
          Birth Date
        </label>
        <DatePicker
          selected={birthDate}
          onChange={(date) => setBirthDate(date)}
          className="w-full cosmic-input"
          placeholderText="Select your birth date"
          dateFormat="MMMM d, yyyy"
          required
          calendarClassName="cosmic-calendar"
          wrapperClassName="w-full"
        />
      </motion.div>
      
      <motion.div className="mb-5" variants={itemVariants}>
        <label className="flex items-center mb-2 text-cosmic-text font-medium">
          <Clock className="w-4 h-4 text-cosmic-accent mr-2" />
          Birth Time
        </label>
        <input
          type="time"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
          className="w-full cosmic-input"
          required
        />
      </motion.div>
      
      <motion.div className="mb-5" variants={itemVariants}>
        <label className="flex items-center mb-2 text-cosmic-text font-medium">
          <MapPin className="w-4 h-4 text-cosmic-accent mr-2" />
          Birth Location
        </label>
        <input
          type="text"
          value={birthLocation}
          onChange={(e) => setBirthLocation(e.target.value)}
          placeholder="City, Country"
          className="w-full cosmic-input"
          required
        />
      </motion.div>
      
      <motion.div className="mb-6" variants={itemVariants}>
        <label className="flex items-center mb-2 text-cosmic-text font-medium">
          <Moon className="w-4 h-4 text-cosmic-accent mr-2" />
          Reading Type
        </label>
        <Select
          options={ReadingTypeOptions}
          defaultValue={ReadingTypeOptions[0]}
          onChange={(option) => option && setSelectedReadingType(option.value)}
          styles={customSelectStyles}
          className="cosmic-select"
          isSearchable={false}
        />
      </motion.div>
      
      <motion.div className="flex justify-center" variants={itemVariants}>
        <button
          type="submit"
          className="cosmic-button min-w-40 flex items-center justify-center"
          disabled={!birthDate || !birthTime || !birthLocation || isLoading}
        >
          {isLoading ? (
            <>
              <span className="mr-2">Reading the stars</span>
              <div className="w-5 h-5 border-2 border-cosmic-accent border-t-transparent rounded-full animate-spin" />
            </>
          ) : (
            "Consult Madame Nebula"
          )}
        </button>
      </motion.div>
      
      {selectedReadingType !== ReadingType.QUICK && (
        <motion.div 
          className="mt-4 text-center text-sm text-cosmic-textDim italic"
          variants={itemVariants}
        >
          Note: Premium readings require a subscription or credits
        </motion.div>
      )}
    </motion.form>
  );
};

export default BirthDetailsForm;