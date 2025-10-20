/**
 * Animation System for Navy Camouflage Theme
 * Hell Week Training App
 */

import { AnimationSystem } from '../types/theme';

export const animationSystem: AnimationSystem = {
  duration: {
    fast: 150,    // 0.15s
    normal: 300,  // 0.3s
    slow: 500,    // 0.5s
  },

  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// Animation presets for common interactions
export const animationPresets = {
  // Button press animation
  buttonPress: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeOut,
  },

  // Modal appearance animation
  modalAppear: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeOut,
  },

  // Tab switch animation
  tabSwitch: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeInOut,
  },

  // Screen transition animation
  screenTransition: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeInOut,
  },

  // Loading animation
  loading: {
    duration: animationSystem.duration.slow,
    easing: animationSystem.easing.easeInOut,
  },

  // Hover animation
  hover: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeOut,
  },

  // Focus animation
  focus: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeOut,
  },

  // Success animation
  success: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeOut,
  },

  // Error animation
  error: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeIn,
  },

  // Tooltip appearance animation
  tooltipAppear: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeOut,
  },

  // Dropdown animation
  dropdownAppear: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeOut,
  },

  // Slide animation
  slide: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeInOut,
  },

  // Fade animation
  fade: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeInOut,
  },

  // Scale animation
  scale: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeOut,
  },
};

// React Native animation configurations
export const reactNativeAnimations = {
  // Spring animation for natural movement
  spring: {
    tension: 100,
    friction: 8,
  },

  // Timing animation for precise control
  timing: {
    duration: animationSystem.duration.normal,
    easing: 'easeOut',
  },

  // Decay animation for momentum
  decay: {
    velocity: 1,
    deceleration: 0.997,
  },
};

// Gesture animation configurations
export const gestureAnimations = {
  // Pan gesture animation
  pan: {
    tension: 100,
    friction: 8,
  },

  // Pinch gesture animation
  pinch: {
    tension: 100,
    friction: 8,
  },

  // Rotation gesture animation
  rotation: {
    tension: 100,
    friction: 8,
  },

  // Swipe gesture animation
  swipe: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeOut,
  },
};

// Loading animation configurations
export const loadingAnimations = {
  // Spinner animation
  spinner: {
    duration: 1000,
    easing: 'linear',
  },

  // Pulse animation
  pulse: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeInOut,
  },

  // Skeleton loading animation
  skeleton: {
    duration: animationSystem.duration.slow,
    easing: animationSystem.easing.easeInOut,
  },

  // Shimmer animation
  shimmer: {
    duration: animationSystem.duration.slow,
    easing: animationSystem.easing.easeInOut,
  },
};

// Transition animation configurations
export const transitionAnimations = {
  // Fade in transition
  fadeIn: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeIn,
  },

  // Fade out transition
  fadeOut: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeOut,
  },

  // Slide in from right
  slideInRight: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeOut,
  },

  // Slide in from left
  slideInLeft: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeOut,
  },

  // Slide in from top
  slideInTop: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeOut,
  },

  // Slide in from bottom
  slideInBottom: {
    duration: animationSystem.duration.normal,
    easing: animationSystem.easing.easeOut,
  },

  // Scale in transition
  scaleIn: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeOut,
  },

  // Scale out transition
  scaleOut: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeIn,
  },
};

// Animation utility functions
export const getAnimationDuration = (speed: keyof typeof animationSystem.duration): number => {
  return animationSystem.duration[speed] || animationSystem.duration.normal;
};

export const getAnimationEasing = (type: keyof typeof animationSystem.easing): string => {
  return animationSystem.easing[type] || animationSystem.easing.ease;
};

export const getAnimationConfig = (preset: keyof typeof animationPresets) => {
  return animationPresets[preset] || animationPresets.fade;
};

// Performance optimization configurations
export const performanceOptimizations = {
  // Use native driver for better performance
  useNativeDriver: true,

  // Reduce motion for accessibility
  reduceMotion: false,

  // Enable hardware acceleration
  hardwareAcceleration: true,

  // Animation frame rate
  frameRate: 60,
};

// Accessibility animation configurations
export const accessibilityAnimations = {
  // Respect reduced motion preference
  reducedMotion: {
    duration: 0,
    easing: 'linear',
  },

  // High contrast mode animations
  highContrast: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeOut,
  },

  // Screen reader friendly animations
  screenReader: {
    duration: animationSystem.duration.fast,
    easing: animationSystem.easing.easeOut,
  },
};