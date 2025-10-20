/**
 * Breakpoint System for Navy Camouflage Theme
 * Hell Week Training App
 */

import { BreakpointSystem } from '../types/theme';

export const breakpointSystem: BreakpointSystem = {
  xs: 0,      // Extra small devices (phones)
  sm: 576,    // Small devices (large phones)
  md: 768,    // Medium devices (tablets)
  lg: 992,    // Large devices (desktops)
  xl: 1200,   // Extra large devices (large desktops)
};

// Breakpoint utilities
export const breakpointNames = Object.keys(breakpointSystem) as (keyof BreakpointSystem)[];

// Media query utilities for responsive design
export const mediaQueries = {
  // Extra small devices (phones)
  xs: `@media (min-width: ${breakpointSystem.xs}px)`,
  
  // Small devices (large phones)
  sm: `@media (min-width: ${breakpointSystem.sm}px)`,
  
  // Medium devices (tablets)
  md: `@media (min-width: ${breakpointSystem.md}px)`,
  
  // Large devices (desktops)
  lg: `@media (min-width: ${breakpointSystem.lg}px)`,
  
  // Extra large devices (large desktops)
  xl: `@media (min-width: ${breakpointSystem.xl}px)`,
  
  // Max-width media queries
  xsMax: `@media (max-width: ${breakpointSystem.sm - 1}px)`,
  smMax: `@media (max-width: ${breakpointSystem.md - 1}px)`,
  mdMax: `@media (max-width: ${breakpointSystem.lg - 1}px)`,
  lgMax: `@media (max-width: ${breakpointSystem.xl - 1}px)`,
  
  // Range media queries
  smOnly: `@media (min-width: ${breakpointSystem.sm}px) and (max-width: ${breakpointSystem.md - 1}px)`,
  mdOnly: `@media (min-width: ${breakpointSystem.md}px) and (max-width: ${breakpointSystem.lg - 1}px)`,
  lgOnly: `@media (min-width: ${breakpointSystem.lg}px) and (max-width: ${breakpointSystem.xl - 1}px)`,
};

// Device type detection
export const deviceTypes = {
  // Phone detection
  isPhone: (width: number) => width < breakpointSystem.sm,
  
  // Tablet detection
  isTablet: (width: number) => width >= breakpointSystem.sm && width < breakpointSystem.lg,
  
  // Desktop detection
  isDesktop: (width: number) => width >= breakpointSystem.lg,
  
  // Large desktop detection
  isLargeDesktop: (width: number) => width >= breakpointSystem.xl,
};

// Responsive value utilities
export const responsiveValues = {
  // Get value based on current breakpoint
  getValue: <T>(values: Partial<Record<keyof BreakpointSystem, T>>, currentWidth: number, defaultValue: T): T => {
    if (currentWidth >= breakpointSystem.xl && values.xl !== undefined) return values.xl;
    if (currentWidth >= breakpointSystem.lg && values.lg !== undefined) return values.lg;
    if (currentWidth >= breakpointSystem.md && values.md !== undefined) return values.md;
    if (currentWidth >= breakpointSystem.sm && values.sm !== undefined) return values.sm;
    if (values.xs !== undefined) return values.xs;
    return defaultValue;
  },
  
  // Get breakpoint name from width
  getBreakpoint: (width: number): keyof BreakpointSystem => {
    if (width >= breakpointSystem.xl) return 'xl';
    if (width >= breakpointSystem.lg) return 'lg';
    if (width >= breakpointSystem.md) return 'md';
    if (width >= breakpointSystem.sm) return 'sm';
    return 'xs';
  },
};

// Layout configurations for different breakpoints
export const layoutConfigs = {
  // Container max widths
  containerMaxWidths: {
    xs: '100%',
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
  },
  
  // Grid columns
  gridColumns: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  
  // Spacing multipliers
  spacingMultipliers: {
    xs: 0.75,
    sm: 0.875,
    md: 1,
    lg: 1.125,
    xl: 1.25,
  },
  
  // Font size multipliers
  fontSizeMultipliers: {
    xs: 0.875,
    sm: 0.925,
    md: 1,
    lg: 1.075,
    xl: 1.15,
  },
};

// Component-specific responsive configurations
export const componentResponsiveConfigs = {
  // Navigation bar
  navigationBar: {
    height: {
      xs: 56,
      sm: 56,
      md: 64,
      lg: 64,
      xl: 64,
    },
    padding: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
    },
  },
  
  // Tab bar
  tabBar: {
    height: {
      xs: 60,
      sm: 60,
      md: 64,
      lg: 64,
      xl: 64,
    },
    iconSize: {
      xs: 20,
      sm: 22,
      md: 24,
      lg: 24,
      xl: 24,
    },
  },
  
  // Cards
  card: {
    padding: {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 24,
    },
    borderRadius: {
      xs: 8,
      sm: 8,
      md: 12,
      lg: 12,
      xl: 16,
    },
  },
  
  // Buttons
  button: {
    height: {
      xs: 40,
      sm: 44,
      md: 48,
      lg: 48,
      xl: 52,
    },
    padding: {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 20,
      xl: 24,
    },
  },
  
  // Inputs
  input: {
    height: {
      xs: 40,
      sm: 44,
      md: 48,
      lg: 48,
      xl: 52,
    },
    padding: {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 20,
      xl: 24,
    },
  },
  
  // Modals
  modal: {
    width: {
      xs: '95%',
      sm: '90%',
      md: '80%',
      lg: '70%',
      xl: '60%',
    },
    maxWidth: {
      xs: 320,
      sm: 400,
      md: 500,
      lg: 600,
      xl: 700,
    },
  },
  
  // Lists
  list: {
    itemHeight: {
      xs: 56,
      sm: 60,
      md: 64,
      lg: 64,
      xl: 72,
    },
    padding: {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 20,
      xl: 24,
    },
  },
};

// Responsive utility functions
export const getBreakpointValue = <T>(
  values: Partial<Record<keyof BreakpointSystem, T>>,
  breakpoint: keyof BreakpointSystem,
  defaultValue: T
): T => {
  return values[breakpoint] || defaultValue;
};

export const getResponsiveConfig = <T>(
  config: Partial<Record<keyof BreakpointSystem, T>>,
  width: number,
  defaultValue: T
): T => {
  const currentBreakpoint = responsiveValues.getBreakpoint(width);
  return getBreakpointValue(config, currentBreakpoint, defaultValue);
};

export const isBreakpointActive = (
  breakpoint: keyof BreakpointSystem,
  width: number
): boolean => {
  return width >= breakpointSystem[breakpoint];
};

export const isBetweenBreakpoints = (
  minBreakpoint: keyof BreakpointSystem,
  maxBreakpoint: keyof BreakpointSystem,
  width: number
): boolean => {
  return width >= breakpointSystem[minBreakpoint] && width < breakpointSystem[maxBreakpoint];
};

// Orientation-specific configurations
export const orientationConfigs = {
  // Portrait mode
  portrait: {
    maxAspectRatio: 1,
    adjustments: {
      navigationBar: { height: 56 },
      tabBar: { height: 60 },
    },
  },
  
  // Landscape mode
  landscape: {
    minAspectRatio: 1,
    adjustments: {
      navigationBar: { height: 48 },
      tabBar: { height: 48 },
    },
  },
};

// Platform-specific breakpoint adjustments
export const platformBreakpoints = {
  // iOS adjustments
  ios: {
    statusBarHeight: 44,
    homeIndicatorHeight: 34,
    safeAreaInsets: {
      top: 44,
      bottom: 34,
      left: 0,
      right: 0,
    },
  },
  
  // Android adjustments
  android: {
    statusBarHeight: 24,
    navigationBarHeight: 48,
    safeAreaInsets: {
      top: 24,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  
  // Web adjustments
  web: {
    scrollbarWidth: 16,
    safeAreaInsets: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
};