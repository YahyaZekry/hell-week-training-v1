/**
 * Shadow System for Navy Camouflage Theme
 * Hell Week Training App
 */

import { ShadowSystem } from '../types/theme';

export const shadowSystem: ShadowSystem = {
  none: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  md: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  lg: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  xl: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};

// Colored shadows for different elements
export const coloredShadows = {
  // Primary color shadow
  primary: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    shadowColor: '#1E6EE7',
  },

  // Success color shadow
  success: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    shadowColor: '#22C55E',
  },

  // Warning color shadow
  warning: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    shadowColor: '#F59E0B',
  },

  // Error color shadow
  error: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    shadowColor: '#EF4444',
  },
};

// Shadow presets for common components
export const shadowPresets = {
  // Card shadow
  card: shadowSystem.md,

  // Button shadow
  button: shadowSystem.sm,

  // Button pressed shadow
  buttonPressed: shadowSystem.none,

  // Modal shadow
  modal: shadowSystem.xl,

  // Navigation bar shadow
  navigationBar: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Tab bar shadow
  tabBar: {
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },

  // Floating action button shadow
  fab: shadowSystem.lg,

  // Input shadow
  input: shadowSystem.sm,

  // Input focused shadow
  inputFocused: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  // List item shadow
  listItem: shadowSystem.sm,

  // Chip shadow
  chip: shadowSystem.sm,
};

// Dark mode shadow adjustments
export const darkModeShadows = {
  ...shadowSystem,
  md: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
};