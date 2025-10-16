import { Animated, Easing, ViewStyle } from 'react-native';

import settingsService from './settingsService';

// Type definitions
export interface AnimationConfig {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: string;
  intensity: 'low' | 'medium' | 'high';
}

export interface EffectsConfig {
  pulse: boolean;
  shake: boolean;
  glow: boolean;
  militaryStyle: boolean;
}

export interface ColorConfig {
  primary: string;
  secondary: string;
  accent: string;
  warning: string;
  success: string;
  text: string;
}

export interface VisualStyleConfig {
  colors: ColorConfig;
  animations: AnimationConfig;
  effects: EffectsConfig;
}

export interface AnimationValues {
  pulse: Animated.Value;
  shake: Animated.Value;
  fadeIn: Animated.Value;
  slideIn: Animated.Value;
  rotate: Animated.Value;
  scale: Animated.Value;
  countdown: Animated.Value;
  progress: Animated.Value;
  breathing: Animated.Value;
}

export type AnimationIntensity = 'fast' | 'normal' | 'slow';
export type SlideDirection = 'left' | 'right' | 'top';

class VisualEffectsService {
  private animations: AnimationValues;
  private isInitialized: boolean;
  private currentStyle: string;

  constructor() {
    this.animations = {} as AnimationValues;
    this.isInitialized = false;
    this.currentStyle = 'navy_seal';
  }

  // Initialize visual effects service
  async initialize(): Promise<boolean> {
    try {
      // Initialize animation values
      this.animations = {
        pulse: new Animated.Value(1),
        shake: new Animated.Value(0),
        fadeIn: new Animated.Value(0),
        slideIn: new Animated.Value(0),
        rotate: new Animated.Value(0),
        scale: new Animated.Value(1),
        countdown: new Animated.Value(1),
        progress: new Animated.Value(0),
        breathing: new Animated.Value(1),
      };

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize visual effects service:', error);
      return false;
    }
  }

  // Get visual style configuration based on training style
  getVisualStyleConfig(): VisualStyleConfig {
    const style = settingsService.getSettings().trainingStyle;
    
    const visualStyles: Record<string, VisualStyleConfig> = {
      navy_seal: {
        colors: {
          primary: '#1a1a1a',
          secondary: '#2c2c2c',
          accent: '#ff4444',
          warning: '#ff8800',
          success: '#00ff00',
          text: '#ffffff',
        },
        animations: {
          duration: {
            fast: 200,
            normal: 400,
            slow: 800,
          },
          easing: 'easeInEaseOut',
          intensity: 'high',
        },
        effects: {
          pulse: true,
          shake: true,
          glow: true,
          militaryStyle: true,
        },
      },
      elite_fitness: {
        colors: {
          primary: '#0066cc',
          secondary: '#004499',
          accent: '#00ccff',
          warning: '#ff9900',
          success: '#00ff88',
          text: '#ffffff',
        },
        animations: {
          duration: {
            fast: 150,
            normal: 300,
            slow: 600,
          },
          easing: 'easeOut',
          intensity: 'medium',
        },
        effects: {
          pulse: true,
          shake: false,
          glow: true,
          militaryStyle: false,
        },
      },
      hybrid: {
        colors: {
          primary: '#2d3748',
          secondary: '#4a5568',
          accent: '#805ad5',
          warning: '#ed8936',
          success: '#48bb78',
          text: '#ffffff',
        },
        animations: {
          duration: {
            fast: 250,
            normal: 500,
            slow: 1000,
          },
          easing: 'easeInOut',
          intensity: 'medium',
        },
        effects: {
          pulse: true,
          shake: true,
          glow: true,
          militaryStyle: false,
        },
      },
    };

    return visualStyles[style] || visualStyles.hybrid;
  }

  // Create pulse animation
  createPulseAnimation(intensity: AnimationIntensity = 'normal'): Animated.CompositeAnimation {
    const config = this.getVisualStyleConfig();
    const duration = config.animations.duration[intensity] || config.animations.duration.normal;
    
    return Animated.loop(
      Animated.sequence([
        Animated.timing(this.animations.pulse, {
          toValue: 1.1,
          duration: duration / 2,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(this.animations.pulse, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
  }

  // Create shake animation
  createShakeAnimation(intensity: AnimationIntensity = 'normal'): Animated.CompositeAnimation {
    const config = this.getVisualStyleConfig();
    const duration = config.animations.duration[intensity] || config.animations.duration.normal;
    
    return Animated.sequence([
      Animated.timing(this.animations.shake, {
        toValue: 10,
        duration: duration / 4,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(this.animations.shake, {
        toValue: -10,
        duration: duration / 4,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(this.animations.shake, {
        toValue: 10,
        duration: duration / 4,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(this.animations.shake, {
        toValue: 0,
        duration: duration / 4,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);
  }

  // Create fade in animation
  createFadeInAnimation(intensity: AnimationIntensity = 'normal', delay: number = 0): Animated.CompositeAnimation {
    const config = this.getVisualStyleConfig();
    const duration = config.animations.duration[intensity] || config.animations.duration.normal;
    
    return Animated.timing(this.animations.fadeIn, {
      toValue: 1,
      duration: duration,
      delay: delay,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    });
  }

  // Create slide in animation
  createSlideInAnimation(direction: SlideDirection = 'left', intensity: AnimationIntensity = 'normal'): Animated.CompositeAnimation {
    const config = this.getVisualStyleConfig();
    const duration = config.animations.duration[intensity] || config.animations.duration.normal;
    const initialValue = direction === 'left' ? -100 : direction === 'right' ? 100 : 50;
    
    return Animated.timing(this.animations.slideIn, {
      toValue: 0,
      duration: duration,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true,
    });
  }

  // Create countdown animation
  createCountdownAnimation(seconds: number): Animated.CompositeAnimation {
    const config = this.getVisualStyleConfig();
    const duration = 1000; // 1 second per count
    
    return Animated.timing(this.animations.countdown, {
      toValue: 0,
      duration: duration * seconds,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  }

  // Create progress animation
  createProgressAnimation(targetValue: number, duration: number = 1000): Animated.CompositeAnimation {
    return Animated.timing(this.animations.progress, {
      toValue: targetValue,
      duration: duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    });
  }

  // Create breathing animation
  createBreathingAnimation(cycles: number = 5): Animated.CompositeAnimation {
    const config = this.getVisualStyleConfig();
    const cycleDuration = config.animations.duration.slow;
    
    return Animated.loop(
      Animated.sequence([
        // Inhale
        Animated.timing(this.animations.breathing, {
          toValue: 1.3,
          duration: cycleDuration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        // Hold
        Animated.timing(this.animations.breathing, {
          toValue: 1.3,
          duration: cycleDuration / 4,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Exhale
        Animated.timing(this.animations.breathing, {
          toValue: 1,
          duration: cycleDuration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        // Hold
        Animated.timing(this.animations.breathing, {
          toValue: 1,
          duration: cycleDuration / 4,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      { iterations: cycles }
    );
  }

  // Create achievement celebration animation
  createAchievementAnimation(): Animated.CompositeAnimation {
    return Animated.parallel([
      // Scale up and down
      Animated.sequence([
        Animated.timing(this.animations.scale, {
          toValue: 1.2,
          duration: 200,
          easing: Easing.out(Easing.back(2)),
          useNativeDriver: true,
        }),
        Animated.timing(this.animations.scale, {
          toValue: 1,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      // Rotate
      Animated.timing(this.animations.rotate, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);
  }

  // Get animated style for pulse effect
  getPulseStyle(baseStyle: ViewStyle = {}): Animated.WithAnimatedObject<ViewStyle> {
    return {
      ...baseStyle,
      transform: [{ scale: this.animations.pulse }],
    };
  }

  // Get animated style for shake effect
  getShakeStyle(baseStyle: ViewStyle = {}): Animated.WithAnimatedObject<ViewStyle> {
    return {
      ...baseStyle,
      transform: [{ translateX: this.animations.shake }],
    };
  }

  // Get animated style for fade effect
  getFadeStyle(baseStyle: ViewStyle = {}): Animated.WithAnimatedObject<ViewStyle> {
    return {
      ...baseStyle,
      opacity: this.animations.fadeIn,
    };
  }

  // Get animated style for slide effect
  getSlideStyle(baseStyle: ViewStyle = {}): Animated.WithAnimatedObject<ViewStyle> {
    return {
      ...baseStyle,
      transform: [{ translateY: this.animations.slideIn }],
    };
  }

  // Get animated style for countdown
  getCountdownStyle(baseStyle: ViewStyle = {}): Animated.WithAnimatedObject<ViewStyle> {
    return {
      ...baseStyle,
      transform: [{ scale: this.animations.countdown }],
      opacity: this.animations.countdown,
    };
  }

  // Get animated style for progress
  getProgressStyle(baseStyle: ViewStyle = {}): Animated.WithAnimatedObject<ViewStyle> {
    return {
      ...baseStyle,
      transform: [{ scaleX: this.animations.progress }],
    };
  }

  // Get animated style for breathing
  getBreathingStyle(baseStyle: ViewStyle = {}): Animated.WithAnimatedObject<ViewStyle> {
    return {
      ...baseStyle,
      transform: [{ scale: this.animations.breathing }],
    };
  }

  // Get animated style for achievement
  getAchievementStyle(baseStyle: ViewStyle = {}): Animated.WithAnimatedObject<ViewStyle> {
    return {
      ...baseStyle,
      transform: [
        { scale: this.animations.scale },
        { rotate: this.animations.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        })},
      ],
    };
  }

  // Reset all animations
  resetAnimations(): void {
    Object.values(this.animations).forEach(animation => {
      animation.setValue(0);
    });
    this.animations.pulse.setValue(1);
    this.animations.scale.setValue(1);
    this.animations.breathing.setValue(1);
  }

  // Stop all animations
  stopAnimations(): void {
    Object.values(this.animations).forEach(animation => {
      animation.stopAnimation();
    });
  }

  // Get current style colors
  getStyleColors(): ColorConfig {
    return this.getVisualStyleConfig().colors;
  }

  // Check if effects are enabled
  areEffectsEnabled(): boolean {
    const settings = settingsService.getSettings();
    return settings.visualEffects && this.isInitialized;
  }

  // Clean up visual effects service
  async cleanup(): Promise<boolean> {
    try {
      this.stopAnimations();
      this.resetAnimations();
      this.isInitialized = false;
      return true;
    } catch (error) {
      console.error('Failed to cleanup visual effects service:', error);
      return false;
    }
  }
}

export default new VisualEffectsService();