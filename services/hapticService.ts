import * as Haptics from 'expo-haptics';

import settingsService from './settingsService';

// Type definitions for haptic service
export type HapticIntensity = 'low' | 'medium' | 'high';
export type HapticType = 'start' | 'completion' | 'transition' | 'warning' | 'countdown' | 'achievement' | 'button' | 'error' | 'success';

export interface HapticPattern {
  type: HapticType;
  delay?: number;
}

export interface HapticServiceStatus {
  isInitialized: boolean;
  isEnabled: boolean;
  intensity: HapticIntensity;
}

class HapticService {
  private isInitialized: boolean = false;
  private intensityMap: { [key in HapticIntensity]: string } = {
    low: 'light',
    medium: 'medium',
    high: 'heavy',
  };

  // Initialize haptic service
  async initialize(): Promise<boolean> {
    try {
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize haptic service:', error);
      return false;
    }
  }

  // Get haptic intensity setting
  getIntensity(): HapticIntensity {
    const settings = settingsService.getSettings();
    return (settings.hapticIntensity as HapticIntensity) || 'medium';
  }

  // Check if haptic feedback is enabled
  isEnabled(): boolean {
    const settings = settingsService.getSettings();
    return settings.hapticFeedback && this.isInitialized;
  }

  // Play haptic feedback based on type
  async trigger(type: HapticType, customIntensity: HapticIntensity | null = null): Promise<void> {
    try {
      if (!this.isEnabled()) {
        return;
      }

      const intensity = customIntensity || this.getIntensity();
      const hapticType = this.intensityMap[intensity] || 'medium';

      switch (type) {
        case 'start':
          await this.startWorkoutHaptic();
          break;
        case 'completion':
          await this.completionHaptic();
          break;
        case 'transition':
          await this.transitionHaptic();
          break;
        case 'warning':
          await this.warningHaptic();
          break;
        case 'countdown':
          await this.countdownHaptic();
          break;
        case 'achievement':
          await this.achievementHaptic();
          break;
        case 'button':
          await this.buttonHaptic();
          break;
        case 'error':
          await this.errorHaptic();
          break;
        case 'success':
          await this.successHaptic();
          break;
        default:
          await this.defaultHaptic(hapticType as any);
          break;
      }
    } catch (error) {
      console.error('Failed to trigger haptic feedback:', error);
    }
  }

  // Start workout haptic - strong impact
  private async startWorkoutHaptic(): Promise<void> {
    const intensity = this.getIntensity();
    
    if (intensity === 'high') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await new Promise(resolve => setTimeout(resolve, 100));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else if (intensity === 'medium') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await new Promise(resolve => setTimeout(resolve, 100));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }

  // Workout completion haptic - celebration pattern
  private async completionHaptic(): Promise<void> {
    const intensity = this.getIntensity();
    
    if (intensity === 'high') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await new Promise(resolve => setTimeout(resolve, 200));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      await new Promise(resolve => setTimeout(resolve, 200));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      await new Promise(resolve => setTimeout(resolve, 200));
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (intensity === 'medium') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await new Promise(resolve => setTimeout(resolve, 150));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await new Promise(resolve => setTimeout(resolve, 150));
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await new Promise(resolve => setTimeout(resolve, 100));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }

  // Exercise transition haptic
  private async transitionHaptic(): Promise<void> {
    const intensity = this.getIntensity();
    
    if (intensity === 'high') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await new Promise(resolve => setTimeout(resolve, 50));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (intensity === 'medium') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }

  // Warning haptic - attention grabbing
  private async warningHaptic(): Promise<void> {
    const intensity = this.getIntensity();
    
    if (intensity === 'high') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      await new Promise(resolve => setTimeout(resolve, 100));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (intensity === 'medium') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }

  // Countdown haptic - rhythmic ticks
  private async countdownHaptic(): Promise<void> {
    const intensity = this.getIntensity();
    
    if (intensity === 'high') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (intensity === 'medium') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }

  // Achievement haptic - celebration
  private async achievementHaptic(): Promise<void> {
    const intensity = this.getIntensity();
    
    if (intensity === 'high') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await new Promise(resolve => setTimeout(resolve, 100));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      await new Promise(resolve => setTimeout(resolve, 100));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (intensity === 'medium') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await new Promise(resolve => setTimeout(resolve, 100));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }

  // Button press haptic
  private async buttonHaptic(): Promise<void> {
    const intensity = this.getIntensity();
    
    if (intensity === 'high') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (intensity === 'medium') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }

  // Error haptic
  private async errorHaptic(): Promise<void> {
    const intensity = this.getIntensity();
    
    if (intensity === 'high') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      await new Promise(resolve => setTimeout(resolve, 100));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else if (intensity === 'medium') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }

  // Success haptic
  private async successHaptic(): Promise<void> {
    const intensity = this.getIntensity();
    
    if (intensity === 'high') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await new Promise(resolve => setTimeout(resolve, 100));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (intensity === 'medium') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }

  // Default haptic based on intensity
  private async defaultHaptic(intensity: 'heavy' | 'medium' | 'light' = 'medium'): Promise<void> {
    try {
      switch (intensity) {
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        default:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
      }
    } catch (error) {
      console.error('Failed to trigger default haptic:', error);
    }
  }

  // Custom haptic pattern
  async customPattern(pattern: HapticPattern[]): Promise<void> {
    try {
      if (!this.isEnabled()) {
        return;
      }

      for (const { type, delay } of pattern) {
        await this.trigger(type);
        if (delay) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    } catch (error) {
      console.error('Failed to play custom haptic pattern:', error);
    }
  }

  // Navy SEAL specific haptic patterns
  async navySealPattern(event: string): Promise<void> {
    const patterns: { [key: string]: HapticPattern[] } = {
      drill_command: [
        { type: 'start', delay: 0 },
        { type: 'warning', delay: 200 },
      ],
      exercise_complete: [
        { type: 'success', delay: 0 },
        { type: 'transition', delay: 150 },
        { type: 'button', delay: 100 },
      ],
      hell_week_complete: [
        { type: 'completion', delay: 0 },
        { type: 'achievement', delay: 300 },
        { type: 'success', delay: 200 },
      ],
      countdown_final: [
        { type: 'countdown', delay: 0 },
        { type: 'countdown', delay: 500 },
        { type: 'countdown', delay: 500 },
        { type: 'warning', delay: 500 },
      ],
    };

    const pattern = patterns[event];
    if (pattern) {
      await this.customPattern(pattern);
    }
  }

  // Elite fitness specific haptic patterns
  async eliteFitnessPattern(event: string): Promise<void> {
    const patterns: { [key: string]: HapticPattern[] } = {
      workout_start: [
        { type: 'start', delay: 0 },
        { type: 'success', delay: 200 },
      ],
      personal_record: [
        { type: 'achievement', delay: 0 },
        { type: 'completion', delay: 300 },
      ],
      set_complete: [
        { type: 'transition', delay: 0 },
      ],
      workout_complete: [
        { type: 'completion', delay: 0 },
        { type: 'success', delay: 200 },
      ],
    };

    const pattern = patterns[event];
    if (pattern) {
      await this.customPattern(pattern);
    }
  }

  // Hybrid specific haptic patterns
  async hybridPattern(event: string): Promise<void> {
    const patterns: { [key: string]: HapticPattern[] } = {
      mission_start: [
        { type: 'start', delay: 0 },
        { type: 'button', delay: 150 },
      ],
      milestone_reached: [
        { type: 'achievement', delay: 0 },
      ],
      exercise_transition: [
        { type: 'transition', delay: 0 },
      ],
      mission_complete: [
        { type: 'completion', delay: 0 },
        { type: 'success', delay: 200 },
      ],
    };

    const pattern = patterns[event];
    if (pattern) {
      await this.customPattern(pattern);
    }
  }

  // Get haptic service status
  getStatus(): HapticServiceStatus {
    return {
      isInitialized: this.isInitialized,
      isEnabled: this.isEnabled(),
      intensity: this.getIntensity(),
    };
  }

  // Test haptic feedback
  async testFeedback(): Promise<boolean> {
    try {
      await this.trigger('button');
      await new Promise(resolve => setTimeout(resolve, 500));
      await this.trigger('success');
      await new Promise(resolve => setTimeout(resolve, 500));
      await this.trigger('completion');
      return true;
    } catch (error) {
      console.error('Failed to test haptic feedback:', error);
      return false;
    }
  }
}

export default new HapticService();