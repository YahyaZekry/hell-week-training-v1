import { Easing, Platform } from 'react-native';

// Animation configuration types
export interface NavigationAnimationConfig {
  duration: number;
  easing: any;
  useNativeDriver: boolean;
}

export interface StackAnimationConfig {
  gestureEnabled: boolean;
  gestureDirection: 'horizontal' | 'vertical';
  transitionSpec: {
    open: any;
    close: any;
  };
  cardStyleInterpolator?: any;
  headerStyleInterpolator?: any;
}

// Navigation Animation Service
class NavigationAnimationService {
  private static instance: NavigationAnimationService;
  
  private constructor() {}
  
  static getInstance(): NavigationAnimationService {
    if (!NavigationAnimationService.instance) {
      NavigationAnimationService.instance = new NavigationAnimationService();
    }
    return NavigationAnimationService.instance;
  }
  
  // Get base animation configuration
  getBaseAnimationConfig(): NavigationAnimationConfig {
    return {
      duration: 300,
      easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
      useNativeDriver: true,
    };
  }
  
  // Get fast animation configuration
  getFastAnimationConfig(): NavigationAnimationConfig {
    return {
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    };
  }
  
  // Get slow animation configuration
  getSlowAnimationConfig(): NavigationAnimationConfig {
    return {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
  }
  
  // Get stack animation configuration for training screens
  getTrainingStackConfig(): StackAnimationConfig {
    const baseConfig = this.getBaseAnimationConfig();
    
    return {
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      transitionSpec: {
        open: {
          animation: 'timing',
          config: {
            duration: baseConfig.duration,
            easing: baseConfig.easing,
          },
        },
        close: {
          animation: 'timing',
          config: {
            duration: baseConfig.duration - 50,
            easing: Easing.in(Easing.cubic),
          },
        },
      },
    };
  }
  
  // Get stack animation configuration for more screens
  getMoreStackConfig(): StackAnimationConfig {
    const baseConfig = this.getBaseAnimationConfig();
    
    return {
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      transitionSpec: {
        open: {
          animation: 'timing',
          config: {
            duration: baseConfig.duration,
            easing: baseConfig.easing,
          },
        },
        close: {
          animation: 'timing',
          config: {
            duration: baseConfig.duration - 50,
            easing: Easing.in(Easing.cubic),
          },
        },
      },
    };
  }
  
  // Get platform-specific animation configuration
  getPlatformSpecificConfig() {
    return Platform.select({
      ios: {
        transitionSpec: {
          open: {
            animation: 'spring',
            config: {
              duration: 300,
              easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 250,
              easing: Easing.in(Easing.cubic),
            },
          },
        },
      },
      android: {
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 300,
              easing: Easing.out(Easing.cubic),
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 250,
              easing: Easing.in(Easing.cubic),
            },
          },
        },
      },
    });
  }
  
  // Get custom transition for preparation to checklists
  getPreparationToChecklistConfig(): StackAnimationConfig {
    return {
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      transitionSpec: {
        open: {
          animation: 'timing',
          config: {
            duration: 250,
            easing: Easing.bezier(0.33, 0.01, 0.66, 1),
          },
        },
        close: {
          animation: 'timing',
          config: {
            duration: 200,
            easing: Easing.bezier(0.33, 0.01, 0.66, 1),
          },
        },
      },
    };
  }
}

export default NavigationAnimationService.getInstance();