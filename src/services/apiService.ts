import { AstrologyReading, ReadingType, UserDetails } from '../types';

// In a real implementation, this would be replaced with actual API calls to Claude
export const getAstrologicalReading = async (userDetails: UserDetails): Promise<AstrologyReading> => {
  // This is a mock function - in a real implementation, we would call the Claude API
  console.log('Fetching reading for: ', userDetails);

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // For development/demo purposes, we'll return a mock response
  // In production, this would be an actual call to Claude's API
  const mockReading: AstrologyReading = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    userDetails,
    sections: generateMockReadingSections(userDetails)
  };

  // Save reading to localStorage
  saveReadingToHistory(mockReading);

  return mockReading;
};

export const saveReadingToHistory = (reading: AstrologyReading): void => {
  try {
    const history = getReadingHistory();
    history.unshift(reading);
    
    // Only keep the 10 most recent readings
    const trimmedHistory = history.slice(0, 10);
    
    localStorage.setItem('cosmicWhispersHistory', JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Failed to save reading to history:', error);
  }
};

export const getReadingHistory = (): AstrologyReading[] => {
  try {
    const history = localStorage.getItem('cosmicWhispersHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to retrieve reading history:', error);
    return [];
  }
};

// Helper function to generate mock reading sections based on reading type
const generateMockReadingSections = (userDetails: UserDetails): ReadingSection[] => {
  const { readingType, birthDate } = userDetails;
  const zodiacSign = getZodiacSign(birthDate);
  
  // Base sections that all readings have
  const baseSections = [
    {
      title: "Overall Energy",
      content: `The cosmic energies surrounding you, dear ${zodiacSign}, are in a state of mystical flux. The Dark Carnival's tents shimmer with anticipation as your celestial blueprint unfolds before Madame Nebula's eyes. The stars whisper of transformation and hidden potential waiting to be discovered.`
    }
  ];
  
  // Additional sections based on reading type
  switch(readingType) {
    case ReadingType.QUICK:
      return [
        ...baseSections,
        {
          title: "Key Insight",
          content: "The alignment of Mars with your natal Jupiter suggests a period of expansion and growth. However, the carnival whispers warnings of impulsivity. Fortune favors the bold, but not the reckless. Consider your next moves with both courage and caution."
        }
      ];
    case ReadingType.FULL:
      return [
        ...baseSections,
        {
          title: "Celestial Influences",
          content: "Venus casts her glow upon your seventh house, illuminating matters of partnership and harmony. Saturn's stern gaze brings structure to your ambitions, while Mercury's dance brings messages from beyond the veil. The Dark Carnival's mirror reflects these planetary energies in the tapestry of your daily life."
        },
        {
          title: "Dark Carnival Warning",
          content: "Beware the shadow of Neptune's illusion in your financial sector. The carnival's House of Mirrors reveals distortions in how you perceive value. Not all that glitters in the cosmic vault is gold, and some opportunities may be mirages designed to lead you astray."
        },
        {
          title: "Future Alignment",
          content: "When the moon enters your sign next week, a door will open that has long been sealed. The Carnival's Wheel of Fortune spins in your favor, but only if you recognize the opportunity disguised as an ordinary moment. Look for signs in unexpected places, particularly from those born under fire signs."
        }
      ];
    case ReadingType.DEEP_DIVE:
      return [
        ...baseSections,
        {
          title: "Celestial Influences",
          content: "Venus casts her glow upon your seventh house, illuminating matters of partnership and harmony. Saturn's stern gaze brings structure to your ambitions, while Mercury's dance brings messages from beyond the veil. The Dark Carnival's mirror reflects these planetary energies in the tapestry of your daily life."
        },
        {
          title: "Sun Sign Analysis",
          content: `As a ${zodiacSign}, your essence is characterized by ${getZodiacDescription(zodiacSign)}. The carnival's endless night sky amplifies these traits, bringing them into sharper focus during this celestial cycle.`
        },
        {
          title: "Planetary Alignments",
          content: "The current transit of Jupiter through your tenth house heralds professional opportunities that may seem too good to be true. The Carnival's Oracle confirms these are genuine, but warns of hidden costs. Mars in retrograde suggests inner conflicts that must be resolved before external success can be fully embraced."
        },
        {
          title: "Dark Carnival Warning",
          content: "Beware the shadow of Neptune's illusion in your financial sector. The carnival's House of Mirrors reveals distortions in how you perceive value. Not all that glitters in the cosmic vault is gold, and some opportunities may be mirages designed to lead you astray."
        },
        {
          title: "Future Alignment",
          content: "When the moon enters your sign next week, a door will open that has long been sealed. The Carnival's Wheel of Fortune spins in your favor, but only if you recognize the opportunity disguised as an ordinary moment. Look for signs in unexpected places, particularly from those born under fire signs."
        }
      ];
    case ReadingType.COMPATIBILITY:
      return [
        ...baseSections,
        {
          title: "Compatibility Energies",
          content: "The cosmic dance between your charts reveals a fascinating interplay of elements. Your earth meets their water, creating a nurturing environment for growth, yet also risking erosion if boundaries aren't maintained. The Carnival's Mirror of Relationships reflects both potential harmony and necessary challenges."
        },
        {
          title: "Strengths",
          content: "Your Venus harmoniously aspects their Mars, creating passionate creative energy and mutual attraction that transcends the physical. The Carnival's Tent of Union glows brightly when your Mercury and their Jupiter connect, facilitating deep understanding and intellectual growth between you."
        },
        {
          title: "Challenges",
          content: "Saturn's position indicates potential power struggles when responsibilities are divided. The Dark Carnival warns that unspoken expectations may create phantom tensions. Address these shadows directly before they manifest as real obstacles between you."
        },
        {
          title: "Cosmic Pathway Forward",
          content: "The North Node suggests your souls have met in previous carnival cycles. Your connection serves a greater purpose in both your evolutionary journeys. Nurture communication during Mercury retrograde periods, and use full moons to renew your shared intentions."
        }
      ];
    default:
      return baseSections;
  }
};

// Helper function to determine zodiac sign based on birth date
const getZodiacSign = (birthDate: Date | null): string => {
  if (!birthDate) return "Seeker";
  
  const month = birthDate.getMonth() + 1; // JavaScript months are 0-indexed
  const day = birthDate.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
};

// Helper function for zodiac descriptions
const getZodiacDescription = (sign: string): string => {
  const descriptions: Record<string, string> = {
    "Aries": "fiery independence and pioneering spirit",
    "Taurus": "grounded determination and sensual appreciation",
    "Gemini": "curious intellect and adaptable communication",
    "Cancer": "nurturing sensitivity and emotional depth",
    "Leo": "radiant creativity and generous leadership",
    "Virgo": "analytical precision and practical service",
    "Libra": "harmonious balance and diplomatic grace",
    "Scorpio": "intense passion and transformative power",
    "Sagittarius": "expansive vision and philosophical wisdom",
    "Capricorn": "disciplined ambition and patient persistence",
    "Aquarius": "innovative brilliance and humanitarian vision",
    "Pisces": "compassionate empathy and mystical intuition",
    "Seeker": "unique cosmic blueprint and spiritual potential"
  };
  
  return descriptions[sign] || descriptions["Seeker"];
};