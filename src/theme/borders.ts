/**
 * Border System for Navy Camouflage Theme
 * Hell Week Training App
 */

import { BorderSystem } from '../types/theme';

export const borderSystem: BorderSystem = {
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999, // Very large value for circular borders
  },

  borderWidth: {
    none: 0,
    thin: 1,
    normal: 2,
    thick: 3,
  },
};

// Border presets for common components
export const borderPresets = {
  // Card border
  card: {
    borderRadius: borderSystem.borderRadius.lg,
    borderWidth: borderSystem.borderWidth.none,
  },

  // Button border
  button: {
    borderRadius: borderSystem.borderRadius.md,
    borderWidth: borderSystem.borderWidth.none,
  },

  // Button outline border
  buttonOutline: {
    borderRadius: borderSystem.borderRadius.md,
    borderWidth: borderSystem.borderWidth.thin,
  },

  // Input border
  input: {
    borderRadius: borderSystem.borderRadius.md,
    borderWidth: borderSystem.borderWidth.thin,
  },

  // Input focused border
  inputFocused: {
    borderRadius: borderSystem.borderRadius.md,
    borderWidth: borderSystem.borderWidth.normal,
  },

  // Modal border
  modal: {
    borderRadius: borderSystem.borderRadius.lg,
    borderWidth: borderSystem.borderWidth.none,
  },

  // Chip border
  chip: {
    borderRadius: borderSystem.borderRadius.xl,
    borderWidth: borderSystem.borderWidth.thin,
  },

  // Avatar border
  avatar: {
    borderRadius: borderSystem.borderRadius.full,
    borderWidth: borderSystem.borderWidth.thin,
  },

  // Tab border
  tab: {
    borderRadius: borderSystem.borderRadius.sm,
    borderWidth: borderSystem.borderWidth.none,
  },

  // Navigation bar border
  navigationBar: {
    borderRadius: borderSystem.borderRadius.none,
    borderWidth: borderSystem.borderWidth.thin,
  },

  // List item border
  listItem: {
    borderRadius: borderSystem.borderRadius.md,
    borderWidth: borderSystem.borderWidth.none,
  },

  // Badge border
  badge: {
    borderRadius: borderSystem.borderRadius.full,
    borderWidth: borderSystem.borderWidth.none,
  },

  // Divider border
  divider: {
    borderRadius: borderSystem.borderRadius.none,
    borderWidth: borderSystem.borderWidth.thin,
  },
};

// Responsive border radius
export const responsiveBorderRadius = {
  xs: borderSystem.borderRadius.sm,
  sm: borderSystem.borderRadius.md,
  md: borderSystem.borderRadius.lg,
  lg: borderSystem.borderRadius.xl,
  xl: borderSystem.borderRadius.full,
};

// Border utility functions
export const getBorderRadius = (size: keyof typeof borderSystem.borderRadius): number => {
  return borderSystem.borderRadius[size] || borderSystem.borderRadius.md;
};

export const getBorderWidth = (size: keyof typeof borderSystem.borderWidth): number => {
  return borderSystem.borderWidth[size] || borderSystem.borderWidth.thin;
};

export const getResponsiveBorderRadius = (
  size: keyof typeof responsiveBorderRadius,
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
): number => {
  return responsiveBorderRadius[breakpoint] || borderSystem.borderRadius.md;
};