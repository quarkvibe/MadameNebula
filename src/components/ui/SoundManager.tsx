import { Howl } from 'howler';
import { create } from 'zustand';

interface SoundState {
  isMuted: boolean;
  volume: number;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
}

const useSoundStore = create<SoundState>((set) => ({
  isMuted: false,
  volume: 0.5,
  setMuted: (muted) => set({ isMuted: muted }),
  setVolume: (volume) => set({ volume: volume })
}));

class SoundManager {
  private static instance: SoundManager;
  private sounds: Record<string, Howl> = {};
  
  private constructor() {
    this.initializeSounds();
  }
  
  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }
  
  private initializeSounds() {
    this.sounds = {
      tentEnter: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2588/2588-preview.mp3'],
        volume: 0.4,
      }),
      crystalHum: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3'],
        volume: 0.2,
        loop: true,
      }),
      cardFlip: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2594/2594-preview.mp3'],
        volume: 0.3,
      }),
      chimes: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3'],
        volume: 0.3,
      }),
      mysticalSuccess: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2435/2435-preview.mp3'],
        volume: 0.4,
      }),
    };
  }
  
  public play(soundId: keyof typeof this.sounds) {
    const { isMuted, volume } = useSoundStore.getState();
    if (!isMuted && this.sounds[soundId]) {
      this.sounds[soundId].volume(volume);
      this.sounds[soundId].play();
    }
  }
  
  public stop(soundId: keyof typeof this.sounds) {
    if (this.sounds[soundId]) {
      this.sounds[soundId].stop();
    }
  }
  
  public stopAll() {
    Object.values(this.sounds).forEach(sound => sound.stop());
  }
}

export const soundManager = SoundManager.getInstance();
export { useSoundStore };