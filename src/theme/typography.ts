/**
 * Typography System for Navy Camouflage Theme
 * Hell Week Training App
 */

import { TypographySystem } from '../types/theme';

export const typographySystem: TypographySystem = {
  fontFamily: {
    primary: 'SF Pro Display', // iOS
    secondary: 'Roboto', // Android
    mono: 'SF Mono', // Monospace
  },

  fontSize: {
    xs: 12,    // Small text
    sm: 14,    // Body small
    base: 16,  // Body base
    lg: 18,    // Body large
    xl: 20,    // Heading small
    '2xl': 24, // Heading medium
    '3xl': 30, // Heading large
    '4xl': 36, // Heading extra large
    '5xl': 48, // Display
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Typography styles for different text elements
export const textStyles = {
  // Heading styles
  h1: {
    fontSize: typographySystem.fontSize['3xl'],
    fontWeight: typographySystem.fontWeight.bold,
    lineHeight: typographySystem.lineHeight.tight,
    letterSpacing: typographySystem.letterSpacing.tight,
  },
  
  h2: {
    fontSize: typographySystem.fontSize['2xl'],
    fontWeight: typographySystem.fontWeight.bold,
    lineHeight: typographySystem.lineHeight.tight,
    letterSpacing: typographySystem.letterSpacing.tight,
  },
  
  h3: {
    fontSize: typographySystem.fontSize.xl,
    fontWeight: typographySystem.fontWeight.semibold,
    lineHeight: typographySystem.lineHeight.tight,
    letterSpacing: typographySystem.letterSpacing.normal,
  },
  
  h4: {
    fontSize: typographySystem.fontSize.lg,
    fontWeight: typographySystem.fontWeight.semibold,
    lineHeight: typographySystem.lineHeight.normal,
    letterSpacing: typographySystem.letterSpacing.normal,
  },
  
  // Body text styles
  body1: {
    fontSize: typographySystem.fontSize.base,
    fontWeight: typographySystem.fontWeight.normal,
    lineHeight: typographySystem.lineHeight.normal,
    letterSpacing: typographySystem.letterSpacing.normal,
  },
  
  body2: {
    fontSize: typographySystem.fontSize.sm,
    fontWeight: typographySystem.fontWeight.normal,
    lineHeight: typographySystem.lineHeight.normal,
    letterSpacing: typographySystem.letterSpacing.normal,
  },
  
  // Special text styles
  caption: {
    fontSize: typographySystem.fontSize.xs,
    fontWeight: typographySystem.fontWeight.normal,
    lineHeight: typographySystem.lineHeight.normal,
    letterSpacing: typographySystem.letterSpacing.normal,
  },
  
  overline: {
    fontSize: typographySystem.fontSize.xs,
    fontWeight: typographySystem.fontWeight.medium,
    lineHeight: typographySystem.lineHeight.tight,
    letterSpacing: typographySystem.letterSpacing.wide,
    textTransform: 'uppercase' as const,
  },
  
  // Button text styles
  button: {
    fontSize: typographySystem.fontSize.base,
    fontWeight: typographySystem.fontWeight.semibold,
    lineHeight: typographySystem.lineHeight.tight,
    letterSpacing: typographySystem.letterSpacing.normal,
  },
  
  buttonSmall: {
    fontSize: typographySystem.fontSize.sm,
    fontWeight: typographySystem.fontWeight.semibold,
    lineHeight: typographySystem.lineHeight.tight,
    letterSpacing: typographySystem.letterSpacing.normal,
  },
  
  // Navigation text styles
  tabLabel: {
    fontSize: typographySystem.fontSize.xs,
    fontWeight: typographySystem.fontWeight.semibold,
    lineHeight: typographySystem.lineHeight.tight,
    letterSpacing: typographySystem.letterSpacing.normal,
  },
  
  // Input text styles
  input: {
    fontSize: typographySystem.fontSize.base,
    fontWeight: typographySystem.fontWeight.normal,
    lineHeight: typographySystem.lineHeight.normal,
    letterSpacing: typographySystem.letterSpacing.normal,
  },
  
  label: {
    fontSize: typographySystem.fontSize.sm,
    fontWeight: typographySystem.fontWeight.medium,
    lineHeight: typographySystem.lineHeight.normal,
    letterSpacing: typographySystem.letterSpacing.normal,
  },
};

// Platform-specific font adjustments
export const platformFonts = {
  ios: {
    ...typographySystem.fontFamily,
    primary: 'SF Pro Display',
    secondary: 'SF Pro Text',
    mono: 'SF Mono',
  },
  
  android: {
    ...typographySystem.fontFamily,
    primary: 'Roboto',
    secondary: 'Roboto',
    mono: 'Roboto Mono',
  },
  
  web: {
    ...typographySystem.fontFamily,
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    secondary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'SF Mono, Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", monospace',
  },
};

// Responsive font sizes
export const responsiveFontSizes = {
  h1: {
    xs: typographySystem.fontSize['2xl'],
    sm: typographySystem.fontSize['3xl'],
    md: typographySystem.fontSize['4xl'],
    lg: typographySystem.fontSize['4xl'],
    xl: typographySystem.fontSize['5xl'],
  },
  
  h2: {
    xs: typographySystem.fontSize.xl,
    sm: typographySystem.fontSize['2xl'],
    md: typographySystem.fontSize['2xl'],
    lg: typographySystem.fontSize['3xl'],
    xl: typographySystem.fontSize['3xl'],
  },
  
  h3: {
    xs: typographySystem.fontSize.lg,
    sm: typographySystem.fontSize.xl,
    md: typographySystem.fontSize.xl,
    lg: typographySystem.fontSize['2xl'],
    xl: typographySystem.fontSize['2xl'],
  },
  
  body1: {
    xs: typographySystem.fontSize.sm,
    sm: typographySystem.fontSize.base,
    md: typographySystem.fontSize.base,
    lg: typographySystem.fontSize.lg,
    xl: typographySystem.fontSize.lg,
  },
  
  body2: {
    xs: typographySystem.fontSize.xs,
    sm: typographySystem.fontSize.sm,
    md: typographySystem.fontSize.sm,
    lg: typographySystem.fontSize.base,
    xl: typographySystem.fontSize.base,
  },
};