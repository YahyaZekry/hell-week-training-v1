/**
 * Spacing System for Navy Camouflage Theme
 * Hell Week Training App
 */

import { SpacingSystem } from '../types/theme';

export const spacingSystem: SpacingSystem = {
  // Base spacing unit (4px)
  unit: 4,

  // Spacing scale based on 4px grid
  spacing: {
    0: 0,      // 0px
    1: 4,      // 4px
    2: 8,      // 8px
    3: 12,     // 12px
    4: 16,     // 16px
    5: 20,     // 20px
    6: 24,     // 24px
    8: 32,     // 32px
    10: 40,    // 40px
    12: 48,    // 48px
    16: 64,    // 64px
    20: 80,    // 80px
    24: 96,    // 96px
  },

  // Component-specific padding
  padding: {
    xs: 8,     // 8px
    sm: 12,    // 12px
    md: 16,    // 16px
    lg: 24,    // 24px
    xl: 32,    // 32px
  },

  // Component-specific margin
  margin: {
    xs: 4,     // 4px
    sm: 8,     // 8px
    md: 16,    // 16px
    lg: 24,    // 24px
    xl: 32,    // 32px
  },
};

// Common spacing combinations
export const spacingCombinations = {
  // Card spacing
  card: {
    padding: spacingSystem.padding.md,
    margin: spacingSystem.margin.sm,
  },

  // Button spacing
  button: {
    paddingHorizontal: spacingSystem.spacing[6],
    paddingVertical: spacingSystem.spacing[3],
    margin: spacingSystem.margin.xs,
  },

  // Button small spacing
  buttonSmall: {
    paddingHorizontal: spacingSystem.spacing[4],
    paddingVertical: spacingSystem.spacing[2],
    margin: spacingSystem.margin.xs,
  },

  // Input spacing
  input: {
    paddingHorizontal: spacingSystem.spacing[4],
    paddingVertical: spacingSystem.spacing[3],
    margin: spacingSystem.margin.xs,
  },

  // Section spacing
  section: {
    padding: spacingSystem.padding.lg,
    margin: spacingSystem.margin.md,
  },

  // Container spacing
  container: {
    padding: spacingSystem.padding.md,
    margin: spacingSystem.margin.xs,
  },

  // List item spacing
  listItem: {
    padding: spacingSystem.padding.md,
    margin: spacingSystem.margin.xs,
  },

  // Tab bar spacing
  tabBar: {
    paddingVertical: spacingSystem.spacing[2],
    paddingHorizontal: spacingSystem.spacing[4],
  },

  // Header spacing
  header: {
    padding: spacingSystem.padding.lg,
    margin: spacingSystem.margin.xs,
  },

  // Modal spacing
  modal: {
    padding: spacingSystem.padding.lg,
    margin: spacingSystem.margin.md,
  },

  // Form spacing
  form: {
    padding: spacingSystem.padding.md,
    margin: spacingSystem.margin.sm,
  },

  // Form field spacing
  formField: {
    marginBottom: spacingSystem.spacing[4],
  },

  // Grid spacing
  grid: {
    gap: spacingSystem.spacing[4],
    padding: spacingSystem.padding.sm,
  },

  // Navigation spacing
  navigation: {
    padding: spacingSystem.padding.sm,
    margin: spacingSystem.margin.xs,
  },
};

// Responsive spacing utilities
export const responsiveSpacing = {
  // Padding that adjusts based on screen size
  responsivePadding: {
    xs: spacingSystem.padding.xs,
    sm: spacingSystem.padding.sm,
    md: spacingSystem.padding.md,
    lg: spacingSystem.padding.lg,
    xl: spacingSystem.padding.xl,
  },

  // Margin that adjusts based on screen size
  responsiveMargin: {
    xs: spacingSystem.margin.xs,
    sm: spacingSystem.margin.sm,
    md: spacingSystem.margin.md,
    lg: spacingSystem.margin.lg,
    xl: spacingSystem.margin.xl,
  },

  // Gap that adjusts based on screen size
  responsiveGap: {
    xs: spacingSystem.spacing[2],
    sm: spacingSystem.spacing[3],
    md: spacingSystem.spacing[4],
    lg: spacingSystem.spacing[6],
    xl: spacingSystem.spacing[8],
  },
};

// Spacing utility functions
export const getSpacing = (value: number | keyof typeof spacingSystem.spacing): number => {
  if (typeof value === 'number') {
    return value;
  }
  return spacingSystem.spacing[value] || 0;
};

export const getPadding = (size: keyof typeof spacingSystem.padding): number => {
  return spacingSystem.padding[size] || spacingSystem.padding.md;
};

export const getMargin = (size: keyof typeof spacingSystem.margin): number => {
  return spacingSystem.margin[size] || spacingSystem.margin.md;
};

export const getResponsiveSpacing = (
  size: keyof typeof responsiveSpacing.responsivePadding,
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
): number => {
  const spacingMap = responsiveSpacing.responsivePadding;
  return spacingMap[breakpoint] || spacingMap.md;
};

// Spacing constants for common patterns
export const SPACING_PATTERNS = {
  // Tight spacing for compact layouts
  tight: {
    padding: spacingSystem.padding.xs,
    margin: spacingSystem.margin.xs,
    gap: spacingSystem.spacing[2],
  },

  // Normal spacing for standard layouts
  normal: {
    padding: spacingSystem.padding.md,
    margin: spacingSystem.margin.sm,
    gap: spacingSystem.spacing[4],
  },

  // Loose spacing for spacious layouts
  loose: {
    padding: spacingSystem.padding.lg,
    margin: spacingSystem.margin.md,
    gap: spacingSystem.spacing[6],
  },

  // Extra loose spacing for very spacious layouts
  extraLoose: {
    padding: spacingSystem.padding.xl,
    margin: spacingSystem.margin.lg,
    gap: spacingSystem.spacing[8],
  },
};

// Component-specific spacing presets
export const COMPONENT_SPACING = {
  // Card component spacing
  card: {
    container: spacingCombinations.card,
    header: {
      padding: spacingSystem.padding.sm,
      margin: spacingSystem.margin.xs,
    },
    content: {
      padding: spacingSystem.padding.md,
      margin: spacingSystem.margin.xs,
    },
    footer: {
      padding: spacingSystem.padding.sm,
      margin: spacingSystem.margin.xs,
    },
  },

  // Button component spacing
  button: {
    container: spacingCombinations.button,
    icon: {
      marginRight: spacingSystem.spacing[2],
    },
    text: {
      paddingHorizontal: spacingSystem.spacing[2],
    },
  },

  // Input component spacing
  input: {
    container: spacingCombinations.input,
    label: {
      marginBottom: spacingSystem.spacing[2],
    },
    input: {
      padding: spacingSystem.spacing[3],
    },
    error: {
      marginTop: spacingSystem.spacing[1],
    },
  },

  // List component spacing
  list: {
    container: {
      padding: spacingSystem.padding.sm,
    },
    item: spacingCombinations.listItem,
    section: {
      marginBottom: spacingSystem.spacing[6],
    },
  },

  // Modal component spacing
  modal: {
    container: spacingCombinations.modal,
    header: {
      padding: spacingSystem.padding.md,
      marginBottom: spacingSystem.spacing[4],
    },
    content: {
      padding: spacingSystem.padding.md,
    },
    footer: {
      padding: spacingSystem.padding.md,
      marginTop: spacingSystem.spacing[4],
    },
  },
};