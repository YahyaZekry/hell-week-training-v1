import AsyncStorage from '@react-native-async-storage/async-storage';

// Type definitions for settings service
export interface VolumeSettings {
  master: number;
  voice: number;
  effects: number;
  music: number;
}

export interface AppSettings {
  // Training Style Settings
  trainingStyle: 'navy_seal' | 'elite_fitness' | 'hybrid';
  voiceGender: 'male' | 'female';
  voiceEnabled: boolean;
  
  // Audio Settings
  soundEffects: boolean;
  backgroundMusic: boolean;
  motivationalAudio: boolean;
  breathingGuides: boolean;
  volume: VolumeSettings;
  
  // Visual Settings
  animations: boolean;
  visualEffects: boolean;
  pulseEffects: boolean;
  transitionAnimations: boolean;
  celebrationAnimations: boolean;
  
  // Haptic Settings
  hapticFeedback: boolean;
  hapticIntensity: 'low' | 'medium' | 'high';
  
  // Timer Settings
  countdownWarnings: boolean;
  warningTimes: number[];
  autoProgress: boolean;
  
  // Motivation Settings
  encouragementLevel: 'low' | 'medium' | 'high';
  achievementCelebrations: boolean;
  progressReminders: boolean;
}

export interface TrainingStyleConfig {
  name: string;
  description: string;
  voiceType: string;
  commands: {
    start: string[];
    encouragement: string[];
    warning: string[];
    completion: string[];
    rest: string[];
  };
  soundEffects: {
    start: string;
    transition: string;
    completion: string;
    warning: string;
  };
  visualTheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  animationStyle: string;
  voiceGender: string;
  voiceEnabled: boolean;
  soundEffectsEnabled: boolean;
  animationsEnabled: boolean;
  hapticEnabled: boolean;
}

export interface TrainingStyleOption {
  id: string;
  name: string;
  description: string;
  previewVoice: string;
}

export interface VoiceOption {
  gender: 'male' | 'female';
  name: string;
  description: string;
}

export const COLORS = {
  primary: '#4F46E5',
  secondary: '#059669',
  accent: '#D97706',
  background: '#1E293B',
  card: '#334155',
  text: '#FFFFFF',
  textSecondary: '#94A3B8',
  error: '#DC2626',
  warning: '#F59E0B',
  success: '#10B981',
};

class SettingsService {
  private defaultSettings: AppSettings = {
    // Training Style Settings
    trainingStyle: 'navy_seal', // navy_seal, elite_fitness, hybrid
    voiceGender: 'male', // male, female
    voiceEnabled: true,
    
    // Audio Settings
    soundEffects: true,
    backgroundMusic: true,
    motivationalAudio: true,
    breathingGuides: true,
    volume: {
      master: 0.8,
      voice: 0.9,
      effects: 0.7,
      music: 0.6,
    },
    
    // Visual Settings
    animations: true,
    visualEffects: true,
    pulseEffects: true,
    transitionAnimations: true,
    celebrationAnimations: true,
    
    // Haptic Settings
    hapticFeedback: true,
    hapticIntensity: 'medium', // low, medium, high
    
    // Timer Settings
    countdownWarnings: true,
    warningTimes: [10, 5, 3, 2, 1], // seconds
    autoProgress: true,
    
    // Motivation Settings
    encouragementLevel: 'high', // low, medium, high
    achievementCelebrations: true,
    progressReminders: true,
  };
  
  private currentSettings: AppSettings = { ...this.defaultSettings };

  // Initialize settings service
  async initialize(): Promise<boolean> {
    try {
      const storedSettings = await AsyncStorage.getItem('appSettings');
      if (storedSettings) {
        this.currentSettings = { ...this.defaultSettings, ...JSON.parse(storedSettings) };
      }
      return true;
    } catch (error) {
      console.error('Failed to initialize settings service:', error);
      return false;
    }
  }

  // Get current settings
  getSettings(): AppSettings {
    return { ...this.currentSettings };
  }

  // Update specific setting
  async updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]): Promise<boolean> {
    try {
      this.currentSettings[key] = value;
      await this.saveSettings();
      return true;
    } catch (error) {
      console.error('Failed to update setting:', error);
      return false;
    }
  }

  // Update multiple settings
  async updateSettings(settings: Partial<AppSettings>): Promise<boolean> {
    try {
      this.currentSettings = { ...this.currentSettings, ...settings };
      await this.saveSettings();
      return true;
    } catch (error) {
      console.error('Failed to update settings:', error);
      return false;
    }
  }

  // Save settings to storage
  private async saveSettings(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('appSettings', JSON.stringify(this.currentSettings));
      return true;
    } catch (error) {
      console.error('Failed to save settings:', error);
      return false;
    }
  }

  // Reset settings to default
  async resetSettings(): Promise<boolean> {
    try {
      this.currentSettings = { ...this.defaultSettings };
      await this.saveSettings();
      return true;
    } catch (error) {
      console.error('Failed to reset settings:', error);
      return false;
    }
  }

  // Get training style configuration
  getTrainingStyleConfig(): TrainingStyleConfig {
    const style = this.currentSettings.trainingStyle;
    const voiceGender = this.currentSettings.voiceGender;
    
    const configs: { [key in AppSettings['trainingStyle']]: TrainingStyleConfig } = {
      navy_seal: {
        name: 'Navy SEAL Boot Camp',
        description: 'Intense military-style training with drill sergeant commands',
        voiceType: 'drill_sergeant',
        commands: {
          start: [
            'GET MOVING RECRUIT!',
            'LOCK IT ON!',
            'ENGAGE!',
            'MOVE OUT!',
          ],
          encouragement: [
            'PAIN IS WEAKNESS LEAVING THE BODY!',
            'EMBRACE THE SUCK!',
            'THE ONLY EASY DAY WAS YESTERDAY!',
            'LOOK GOOD, FEEL GOOD, BE GOOD!',
          ],
          warning: [
            'PUSH THROUGH THE PAIN!',
            'DON\'T YOU DARE QUIT!',
            'DIG DEEP!',
            'FINISH STRONG!',
          ],
          completion: [
            'MISSION ACCOMPLISHED!',
            'OUTSTANDING PERFORMANCE!',
            'YOU EARNED YOUR PLACE HERE!',
            'DISMISSED!',
          ],
          rest: [
            'CATCH YOUR BREATH WARRIOR!',
            'RECOVER AND RELOAD!',
            'BRIEF REST ONLY!',
            'PREPARE FOR NEXT EVOLUTION!',
          ],
        },
        soundEffects: {
          start: 'explosion',
          transition: 'whistle',
          completion: 'trumpet',
          warning: 'bell',
        },
        visualTheme: {
          primary: '#1E3A8A',
          secondary: '#DC2626',
          accent: '#F59E0B',
          background: '#0F172A',
        },
        animationStyle: 'sharp_military',
        voiceGender,
        voiceEnabled: this.currentSettings.voiceEnabled,
        soundEffectsEnabled: this.currentSettings.soundEffects,
        animationsEnabled: this.currentSettings.animations,
        hapticEnabled: this.currentSettings.hapticFeedback,
      },
      
      elite_fitness: {
        name: 'Elite Fitness Training',
        description: 'Professional coaching with high-energy motivation',
        voiceType: 'professional_coach',
        commands: {
          start: [
            'LET\'S CRUSH THIS WORKOUT!',
            'TIME TO EXCEL!',
            'UNLEASH YOUR POTENTIAL!',
            'BEGIN TRAINING!',
          ],
          encouragement: [
            'YOU\'RE STRONGER THAN YOU THINK!',
            'EXCELLENT FORM, KEEP GOING!',
            'PUSH YOUR LIMITS!',
            'CHAMPION MENTALITY!',
          ],
          warning: [
            'FINISH STRONG!',
            'ALMOST THERE!',
            'DIG DEEP!',
            'LAST PUSH!',
          ],
          completion: [
            'OUTSTANDING WORK!',
            'GOAL ACHIEVED!',
            'PERFECT EXECUTION!',
            'TRAINING COMPLETE!',
          ],
          rest: [
            'ACTIVE RECOVERY!',
            'RECHARGE AND REFOCUS!',
            'BRIEF RECOVERY!',
            'PREPARE FOR NEXT SET!',
          ],
        },
        soundEffects: {
          start: 'energetic_beep',
          transition: 'swoosh',
          completion: 'success_chime',
          warning: 'gentle_bell',
        },
        visualTheme: {
          primary: '#10B981',
          secondary: '#3B82F6',
          accent: '#F59E0B',
          background: '#064E3B',
        },
        animationStyle: 'smooth_athletic',
        voiceGender,
        voiceEnabled: this.currentSettings.voiceEnabled,
        soundEffectsEnabled: this.currentSettings.soundEffects,
        animationsEnabled: this.currentSettings.animations,
        hapticEnabled: this.currentSettings.hapticFeedback,
      },
      
      hybrid: {
        name: 'Hybrid Military-Fitness',
        description: 'Balanced discipline with modern motivation',
        voiceType: 'motivational_trainer',
        commands: {
          start: [
            'READY TO EXCEL? LET\'S GO!',
            'FOCUS AND EXECUTE!',
            'TIME TO BUILD STRENGTH!',
            'BEGIN YOUR MISSION!',
          ],
          encouragement: [
            'DISCIPLINE EQUALS FREEDOM!',
            'STAY STRONG, STAY FOCUSED!',
            'YOU\'VE GOT THIS!',
            'EXCELLENCE THROUGH EFFORT!',
          ],
          warning: [
            'PUSH THROUGH THIS CHALLENGE!',
            'STAY COMMITTED!',
            'ALMOST AT THE FINISH!',
            'MAINTAIN YOUR FORM!',
          ],
          completion: [
            'MISSION COMPLETE, WELL DONE!',
            'EXCELLENT DEDICATION!',
            'STRENGTH BUILT TODAY!',
            'GREAT ACHIEVEMENT!',
          ],
          rest: [
            'RECOVER AND REFOCUS!',
            'BRIEF RECOVERY BREAK!',
            'PREPARE FOR NEXT CHALLENGE!',
            'RECHARGE YOUR ENERGY!',
          ],
        },
        soundEffects: {
          start: 'motivational_tone',
          transition: 'soft_whistle',
          completion: 'achievement_chime',
          warning: 'soft_bell',
        },
        visualTheme: {
          primary: '#4F46E5',
          secondary: '#059669',
          accent: '#D97706',
          background: '#1E293B',
        },
        animationStyle: 'balanced_dynamic',
        voiceGender,
        voiceEnabled: this.currentSettings.voiceEnabled,
        soundEffectsEnabled: this.currentSettings.soundEffects,
        animationsEnabled: this.currentSettings.animations,
        hapticEnabled: this.currentSettings.hapticFeedback,
      },
    };
    
    return configs[style];
  }

  // Get available training styles
  getAvailableTrainingStyles(): TrainingStyleOption[] {
    return [
      {
        id: 'navy_seal',
        name: 'Navy SEAL Boot Camp',
        description: 'Intense military-style training with drill sergeant commands',
        previewVoice: 'drill_sergeant',
      },
      {
        id: 'elite_fitness',
        name: 'Elite Fitness Training',
        description: 'Professional coaching with high-energy motivation',
        previewVoice: 'professional_coach',
      },
      {
        id: 'hybrid',
        name: 'Hybrid Military-Fitness',
        description: 'Balanced discipline with modern motivation',
        previewVoice: 'motivational_trainer',
      },
    ];
  }

  // Get available voice options
  getAvailableVoices(): VoiceOption[] {
    return [
      {
        gender: 'male',
        name: 'Male Voice',
        description: 'Deep, commanding male voice',
      },
      {
        gender: 'female',
        name: 'Female Voice',
        description: 'Clear, motivating female voice',
      },
    ];
  }

  // Get volume levels
  getVolumeLevels(): VolumeSettings {
    return { ...this.currentSettings.volume };
  }

  // Update volume levels
  async updateVolumeLevels(volumeLevels: Partial<VolumeSettings>): Promise<boolean> {
    try {
      this.currentSettings.volume = { ...this.currentSettings.volume, ...volumeLevels };
      await this.saveSettings();
      return true;
    } catch (error) {
      console.error('Failed to update volume levels:', error);
      return false;
    }
  }

  // Check if feature is enabled
  isFeatureEnabled<K extends keyof AppSettings>(feature: K): boolean {
    return !!this.currentSettings[feature];
  }

  // Get haptic intensity level
  getHapticIntensity(): AppSettings['hapticIntensity'] {
    return this.currentSettings.hapticIntensity;
  }
}

export default new SettingsService();