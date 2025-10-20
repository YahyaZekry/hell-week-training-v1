/**
 * Theme System Exports
 * Hell Week Training App - Navy Camouflage Theme
 */

// Theme types and definitions
export type {
  Theme,
  ThemeContextType,
  ThemeProviderProps,
  BackgroundState,
} from '../types/theme';

export {
  // New consolidated theme system
  navyCamouflageTheme,
  tacticalTheme,
  stealthTheme,
  desertTheme,
  forestTheme,
  consolidatedThemes,
  consolidatedThemeMetadata,
  themeCategories,
  getConsolidatedTheme,
  isDarkTheme,
  themeConfig,
  defaultConsolidatedTheme,
  
  // Legacy exports for backward compatibility
  themes,
  defaultTheme,
  getTheme,
  getThemeName,
  themeMetadata,
  themePreviewColors,
} from './themes';

// Re-export ThemeName from types
export type { ThemeName, ConsolidatedThemeName } from '../types/theme';

// Color system
export {
  navyCamouflageColors,
  darkNavyCamouflageColors,
  getColorWithOpacity,
  lightenColor,
  darkenColor,
  getContrastColor,
} from './colors';

// Typography system
export {
  typographySystem,
  textStyles,
  platformFonts,
  responsiveFontSizes,
} from './typography';

// Spacing system
export {
  spacingSystem,
  spacingCombinations,
  responsiveSpacing,
  getSpacing,
  getPadding,
  getMargin,
} from './spacing';

// Shadow system
export {
  shadowSystem,
  coloredShadows,
  shadowPresets,
  darkModeShadows,
} from './shadows';

// Border system
export {
  borderSystem,
  borderPresets,
  responsiveBorderRadius,
  getBorderRadius,
  getBorderWidth,
} from './borders';

// Animation system
export {
  animationSystem,
  animationPresets,
  reactNativeAnimations,
  loadingAnimations,
  transitionAnimations,
} from './animations';

// Breakpoint system
export {
  breakpointSystem,
  mediaQueries,
  deviceTypes,
  responsiveValues,
  layoutConfigs,
} from './breakpoints';