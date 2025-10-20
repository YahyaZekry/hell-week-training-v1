/**
 * Consolidated Theme Definitions with Dynamic Light/Dark Switching
 * Hell Week Training App
 */


import { Theme } from '../types/theme';

import { animationSystem } from './animations';
import { borderSystem } from './borders';
import { breakpointSystem } from './breakpoints';
import {
  navyCamouflageColors,
  darkNavyCamouflageColors,
  tacticalColors,
  darkTacticalColors,
  stealthColors,
  darkStealthColors,
  desertColors,
  darkDesertColors,
  forestColors,
  darkForestColors,
} from './colors';
import { shadowSystem, darkModeShadows } from './shadows';
import { spacingSystem } from './spacing';
import { typographySystem } from './typography';

// Consolidated theme definitions with dynamic light/dark switching
export const createConsolidatedTheme = (
  lightColors: any,
  darkColors: any,
  _metadata: any
): ((isDark: boolean) => Theme) => {
  return (isDark: boolean): Theme => ({
    colors: isDark ? darkColors : lightColors,
    typography: typographySystem,
    spacing: spacingSystem,
    shadows: isDark ? darkModeShadows : shadowSystem,
    borders: borderSystem,
    animations: animationSystem,
    breakpoints: breakpointSystem,
  });
};

// Navy Camouflage Theme (military category)
export const navyCamouflageTheme = createConsolidatedTheme(
  navyCamouflageColors,
  darkNavyCamouflageColors,
  {
    name: 'Navy Camouflage',
    description: 'Navy blue and camouflage military theme',
    version: '2.0.0',
    author: 'Hell Week Training Team',
    category: 'military',
    backgroundImage: {
      light: 'pattern-camouflage-light.png',
      dark: 'pattern-camouflage-dark.png',
    },
    pattern: {
      type: 'camouflage',
      colors: ['#1E6EE7', '#475569', '#22C55E', '#F59E0B'],
    },
  }
);

// Tactical Theme (tactical category)
export const tacticalTheme = createConsolidatedTheme(
  tacticalColors,
  darkTacticalColors,
  {
    name: 'Tactical',
    description: 'Gray and orange tactical theme',
    version: '2.0.0',
    author: 'Hell Week Training Team',
    category: 'tactical',
    backgroundImage: {
      light: 'pattern-tactical-light.png',
      dark: 'pattern-tactical-dark.png',
    },
    pattern: {
      type: 'tactical',
      colors: ['#374151', '#F97316', '#6B7280', '#EA580C'],
    },
  }
);

// Stealth Theme (stealth category)
export const stealthTheme = createConsolidatedTheme(
  stealthColors,
  darkStealthColors,
  {
    name: 'Stealth',
    description: 'Black and green stealth theme',
    version: '2.0.0',
    author: 'Hell Week Training Team',
    category: 'stealth',
    backgroundImage: {
      light: 'pattern-stealth-light.png',
      dark: 'pattern-stealth-dark.png',
    },
    pattern: {
      type: 'stealth',
      colors: ['#000000', '#22C55E', '#111827', '#16A34A'],
    },
  }
);

// Desert Theme (desert category)
export const desertTheme = createConsolidatedTheme(
  desertColors,
  darkDesertColors,
  {
    name: 'Desert',
    description: 'Tan and brown desert theme',
    version: '2.0.0',
    author: 'Hell Week Training Team',
    category: 'desert',
    backgroundImage: {
      light: 'pattern-desert-light.png',
      dark: 'pattern-desert-dark.png',
    },
    pattern: {
      type: 'desert',
      colors: ['#EAB308', '#EA580C', '#F59E0B', '#D97706'],
    },
  }
);

// Forest Theme (forest category)
export const forestTheme = createConsolidatedTheme(
  forestColors,
  darkForestColors,
  {
    name: 'Forest',
    description: 'Green and brown forest theme',
    version: '2.0.0',
    author: 'Hell Week Training Team',
    category: 'forest',
    backgroundImage: {
      light: 'pattern-forest-light.png',
      dark: 'pattern-forest-dark.png',
    },
    pattern: {
      type: 'forest',
      colors: ['#22C55E', '#EA580C', '#16A34A', '#C2410C'],
    },
  }
);

// Consolidated theme mapping
export const consolidatedThemes = {
  navyCamouflage: navyCamouflageTheme,
  tactical: tacticalTheme,
  stealth: stealthTheme,
  desert: desertTheme,
  forest: forestTheme,
};

// New theme type (consolidated)
export type ConsolidatedThemeName = keyof typeof consolidatedThemes;

// Default theme
export const defaultConsolidatedTheme: ConsolidatedThemeName = 'navyCamouflage';

// Theme utility functions
export const getConsolidatedTheme = (
  themeName: ConsolidatedThemeName,
  isDark: boolean = false
): Theme => {
  const themeFactory = consolidatedThemes[themeName];
  return themeFactory ? themeFactory(isDark) : navyCamouflageTheme(isDark);
};

// Legacy utility functions for backward compatibility
export const getTheme = (themeName: ThemeName): Theme => {
  return themes[themeName];
};

export const getThemeName = (theme: Theme): ThemeName => {
  // Check if it's a dark theme
  if (isDarkTheme(theme)) {
    if (theme.colors.primary[500] === '#4B8AED') return 'dark';
    if (theme.colors.primary[500] === '#FB923C') return 'darkTactical';
    if (theme.colors.primary[500] === '#4ADE80') return 'darkStealth';
    if (theme.colors.primary[500] === '#FACC15') return 'darkDesert';
    if (theme.colors.primary[500] === '#4ADE80') return 'darkForest';
  } else {
    if (theme.colors.primary[500] === '#1E6EE7') return 'light';
    if (theme.colors.primary[500] === '#374151') return 'tactical';
    if (theme.colors.primary[500] === '#6B7280') return 'stealth';
    if (theme.colors.primary[500] === '#EAB308') return 'desert';
    if (theme.colors.primary[500] === '#22C55E') return 'forest';
  }
  return 'light';
};

// Legacy theme metadata for backward compatibility
export const themeMetadata = {
  light: {
    name: 'Navy Camouflage Light',
    description: 'Navy blue and camouflage theme',
    category: 'military',
  },
  dark: {
    name: 'Navy Camouflage Dark',
    description: 'Navy blue and camouflage dark theme',
    category: 'military',
  },
  tactical: {
    name: 'Tactical Light',
    description: 'Gray and orange tactical theme',
    category: 'tactical',
  },
  darkTactical: {
    name: 'Tactical Dark',
    description: 'Gray and orange tactical dark theme',
    category: 'tactical',
  },
  stealth: {
    name: 'Stealth Light',
    description: 'Black and green stealth theme',
    category: 'stealth',
  },
  darkStealth: {
    name: 'Stealth Dark',
    description: 'Black and green stealth dark theme',
    category: 'stealth',
  },
  desert: {
    name: 'Desert Light',
    description: 'Tan and brown desert theme',
    category: 'desert',
  },
  darkDesert: {
    name: 'Desert Dark',
    description: 'Tan and brown desert dark theme',
    category: 'desert',
  },
  forest: {
    name: 'Forest Light',
    description: 'Green and brown forest theme',
    category: 'forest',
  },
  darkForest: {
    name: 'Forest Dark',
    description: 'Green and brown forest dark theme',
    category: 'forest',
  },
};

// Legacy theme preview colors for backward compatibility
export const themePreviewColors = {
  light: ['#1E6EE7', '#475569', '#FFFFFF', '#F8FAFC'],
  dark: ['#4B8AED', '#64748B', '#000000', '#111827'],
  tactical: ['#374151', '#F97316', '#FFFFFF', '#F9FAFB'],
  darkTactical: ['#6B7280', '#FB923C', '#000000', '#111827'],
  stealth: ['#6B7280', '#22C55E', '#FFFFFF', '#F8FAFC'],
  darkStealth: ['#9CA3AF', '#4ADE80', '#000000', '#0A0A0A'],
  desert: ['#EAB308', '#EA580C', '#FFFBEB', '#FEF9C3'],
  darkDesert: ['#FACC15', '#F97316', '#1A1A1A', '#2D2D2D'],
  forest: ['#22C55E', '#EA580C', '#F0FDF4', '#DCFCE7'],
  darkForest: ['#4ADE80', '#F97316', '#0D1F0D', '#1A2E1A'],
};

export const isDarkTheme = (theme: Theme): boolean => {
  return theme.colors.background === '#000000' || 
         theme.colors.background === '#0A0A0A' || 
         theme.colors.background === '#1A1A1A' ||
         theme.colors.background === '#0D1F0D';
};

// Theme metadata for all consolidated themes
export const consolidatedThemeMetadata = {
  navyCamouflage: {
    name: 'Navy Camouflage',
    description: 'Navy blue and camouflage military theme',
    category: 'military',
    icon: 'military-tactical',
    previewColors: {
      primary: '#1E6EE7',
      secondary: '#475569',
      background: '#FFFFFF',
      surface: '#F8FAFC',
    },
    pattern: {
      type: 'camouflage',
      colors: ['#1E6EE7', '#475569', '#22C55E', '#F59E0B'],
    },
  },
  tactical: {
    name: 'Tactical',
    description: 'Gray and orange tactical theme',
    category: 'tactical',
    icon: 'tactical',
    previewColors: {
      primary: '#374151',
      secondary: '#F97316',
      background: '#FFFFFF',
      surface: '#F9FAFB',
    },
    pattern: {
      type: 'tactical',
      colors: ['#374151', '#F97316', '#6B7280', '#EA580C'],
    },
  },
  stealth: {
    name: 'Stealth',
    description: 'Black and green stealth theme',
    category: 'stealth',
    icon: 'stealth',
    previewColors: {
      primary: '#6B7280',
      secondary: '#22C55E',
      background: '#FFFFFF',
      surface: '#F8FAFC',
    },
    pattern: {
      type: 'stealth',
      colors: ['#000000', '#22C55E', '#111827', '#16A34A'],
    },
  },
  desert: {
    name: 'Desert',
    description: 'Tan and brown desert theme',
    category: 'desert',
    icon: 'desert',
    previewColors: {
      primary: '#EAB308',
      secondary: '#EA580C',
      background: '#FFFBEB',
      surface: '#FEF9C3',
    },
    pattern: {
      type: 'desert',
      colors: ['#EAB308', '#EA580C', '#F59E0B', '#D97706'],
    },
  },
  forest: {
    name: 'Forest',
    description: 'Green and brown forest theme',
    category: 'forest',
    icon: 'forest',
    previewColors: {
      primary: '#22C55E',
      secondary: '#EA580C',
      background: '#F0FDF4',
      surface: '#DCFCE7',
    },
    pattern: {
      type: 'forest',
      colors: ['#22C55E', '#EA580C', '#16A34A', '#C2410C'],
    },
  },
};

// Theme categories for better organization
export const themeCategories = {
  military: {
    name: 'Military',
    description: 'Professional military-grade themes',
    themes: ['navyCamouflage'],
  },
  tactical: {
    name: 'Tactical',
    description: 'Strategic tactical themes',
    themes: ['tactical'],
  },
  stealth: {
    name: 'Stealth',
    description: 'Covert operation themes',
    themes: ['stealth'],
  },
  desert: {
    name: 'Desert',
    description: 'Desert warfare themes',
    themes: ['desert'],
  },
  forest: {
    name: 'Forest',
    description: 'Forest operation themes',
    themes: ['forest'],
  },
};

// Theme constants
export const THEME_STORAGE_KEY = 'hell-week-training-theme';
export const THEME_PERSISTENCE_KEY = 'theme-preference';
export const SYSTEM_THEME_PREFERENCE_KEY = 'system-theme-preference';

// Theme configuration
export const themeConfig = {
  defaultTheme: defaultConsolidatedTheme,
  storageKey: THEME_STORAGE_KEY,
  persistenceKey: THEME_PERSISTENCE_KEY,
  systemPreferenceKey: SYSTEM_THEME_PREFERENCE_KEY,
  enableSystemPreference: true,
  enablePersistence: true,
  enableAutoSwitch: true, // Enable automatic light/dark switching
};

// Legacy exports for backward compatibility
export const themes = {
  light: navyCamouflageTheme(false),
  dark: navyCamouflageTheme(true),
  tactical: tacticalTheme(false),
  darkTactical: tacticalTheme(true),
  stealth: stealthTheme(false),
  darkStealth: stealthTheme(true),
  desert: desertTheme(false),
  darkDesert: desertTheme(true),
  forest: forestTheme(false),
  darkForest: forestTheme(true),
};

export type ThemeName = keyof typeof themes;
export const defaultTheme: ThemeName = 'light';