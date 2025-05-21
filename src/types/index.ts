export interface UserDetails {
  birthDate: Date | null;
  birthTime: string;
  birthLocation: string;
  readingType: ReadingType;
}

export enum ReadingType {
  QUICK = "quick",
  FULL = "full",
  DEEP_DIVE = "deep-dive",
  COMPATIBILITY = "compatibility"
}

export interface ReadingSection {
  title: string;
  content: string;
}

export interface AstrologyReading {
  id: string;
  timestamp: number;
  userDetails: UserDetails;
  sections: ReadingSection[];
  rawResponse?: string;
}