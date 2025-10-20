/**
 * Navy Camouflage Theme Color Definitions
 * Hell Week Training App
 */

import { ColorPalette } from '../types/theme';

// Navy Camouflage Color Palette
export const navyCamouflageColors: ColorPalette = {
  // Primary Navy Colors
  primary: {
    50: '#E8F0FE',   // Lightest Navy
    100: '#D1E3FC',  // Very Light Navy
    200: '#A9C7F8',  // Light Navy
    300: '#7AA7F2',  // Medium Light Navy
    400: '#4B8AED',  // Medium Navy
    500: '#1E6EE7',  // Primary Navy
    600: '#1A5CD4',  // Medium Dark Navy
    700: '#1649B0',  // Dark Navy
    800: '#12378C',  // Very Dark Navy
    900: '#0E2568',  // Darkest Navy
  },

  // Secondary Camouflage Colors
  secondary: {
    50: '#F0F4F8',   // Lightest Camo Gray
    100: '#E2E8F0',  // Very Light Camo Gray
    200: '#CBD5E1',  // Light Camo Gray
    300: '#94A3B8',  // Medium Light Camo Gray
    400: '#64748B',  // Medium Camo Gray
    500: '#475569',  // Primary Camo Gray
    600: '#334155',  // Medium Dark Camo Gray
    700: '#1E293B',  // Dark Camo Gray
    800: '#0F172A',  // Very Dark Camo Gray
    900: '#020617',  // Darkest Camo Gray
  },

  // Success Colors (Forest Green)
  success: {
    50: '#F0FDF4',   // Lightest Green
    100: '#DCFCE7',  // Very Light Green
    200: '#BBF7D0',  // Light Green
    300: '#86EFAC',  // Medium Light Green
    400: '#4ADE80',  // Medium Green
    500: '#22C55E',  // Primary Green
    600: '#16A34A',  // Medium Dark Green
    700: '#15803D',  // Dark Green
    800: '#166534',  // Very Dark Green
    900: '#14532D',  // Darkest Green
  },

  // Warning Colors (Desert Tan)
  warning: {
    50: '#FFFBEB',   // Lightest Tan
    100: '#FEF3C7',  // Very Light Tan
    200: '#FDE68A',  // Light Tan
    300: '#FCD34D',  // Medium Light Tan
    400: '#FBBF24',  // Medium Tan
    500: '#F59E0B',  // Primary Tan
    600: '#D97706',  // Medium Dark Tan
    700: '#B45309',  // Dark Tan
    800: '#92400E',  // Very Dark Tan
    900: '#78350F',  // Darkest Tan
  },

  // Error Colors (Alert Red)
  error: {
    50: '#FEF2F2',   // Lightest Red
    100: '#FEE2E2',  // Very Light Red
    200: '#FECACA',  // Light Red
    300: '#FCA5A5',  // Medium Light Red
    400: '#F87171',  // Medium Red
    500: '#EF4444',  // Primary Red
    600: '#DC2626',  // Medium Dark Red
    700: '#B91C1C',  // Dark Red
    800: '#991B1B',  // Very Dark Red
    900: '#7F1D1D',  // Darkest Red
  },

  // Info Colors (Sky Blue)
  info: {
    50: '#EFF6FF',   // Lightest Blue
    100: '#DBEAFE',  // Very Light Blue
    200: '#BFDBFE',  // Light Blue
    300: '#93C5FD',  // Medium Light Blue
    400: '#60A5FA',  // Medium Blue
    500: '#3B82F6',  // Primary Blue
    600: '#2563EB',  // Medium Dark Blue
    700: '#1D4ED8',  // Dark Blue
    800: '#1E40AF',  // Very Dark Blue
    900: '#1E3A8A',  // Darkest Blue
  },

  // Neutral Gray Colors
  gray: {
    50: '#F9FAFB',   // Lightest Gray
    100: '#F3F4F6',  // Very Light Gray
    200: '#E5E7EB',  // Light Gray
    300: '#D1D5DB',  // Medium Light Gray
    400: '#9CA3AF',  // Medium Gray
    500: '#6B7280',  // Primary Gray
    600: '#4B5563',  // Medium Dark Gray
    700: '#374151',  // Dark Gray
    800: '#1F2937',  // Very Dark Gray
    900: '#111827',  // Darkest Gray
  },

  // Surface Colors
  background: '#FFFFFF',
  surface: '#F8FAFC',
  card: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text Colors
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // Border Colors
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
    focus: '#3B82F6',
  },

  // Interactive Colors
  interactive: {
    hover: 'rgba(30, 110, 231, 0.1)',
    pressed: 'rgba(30, 110, 231, 0.2)',
    disabled: '#E5E7EB',
    selected: '#EFF6FF',
  },
};

// Dark Navy Camouflage Theme
export const darkNavyCamouflageColors: ColorPalette = {
  // Primary Navy Colors (inverted for dark mode)
  primary: {
    50: '#0E2568',   // Darkest Navy
    100: '#12378C',  // Very Dark Navy
    200: '#1649B0',  // Dark Navy
    300: '#1A5CD4',  // Medium Dark Navy
    400: '#1E6EE7',  // Medium Navy
    500: '#4B8AED',  // Primary Navy (lighter for dark mode)
    600: '#7AA7F2',  // Medium Light Navy
    700: '#A9C7F8',  // Light Navy
    800: '#D1E3FC',  // Very Light Navy
    900: '#E8F0FE',  // Lightest Navy
  },

  // Secondary Camouflage Colors (inverted for dark mode)
  secondary: {
    50: '#020617',   // Darkest Camo Gray
    100: '#0F172A',  // Very Dark Camo Gray
    200: '#1E293B',  // Dark Camo Gray
    300: '#334155',  // Medium Dark Camo Gray
    400: '#475569',  // Medium Camo Gray
    500: '#64748B',  // Primary Camo Gray (lighter for dark mode)
    600: '#94A3B8',  // Medium Light Camo Gray
    700: '#CBD5E1',  // Light Camo Gray
    800: '#E2E8F0',  // Very Light Camo Gray
    900: '#F0F4F8',  // Lightest Camo Gray
  },

  // Success Colors (adjusted for dark mode)
  success: {
    50: '#14532D',   // Darkest Green
    100: '#166534',  // Very Dark Green
    200: '#15803D',  // Dark Green
    300: '#16A34A',  // Medium Dark Green
    400: '#22C55E',  // Medium Green
    500: '#4ADE80',  // Primary Green (lighter for dark mode)
    600: '#86EFAC',  // Medium Light Green
    700: '#BBF7D0',  // Light Green
    800: '#DCFCE7',  // Very Light Green
    900: '#F0FDF4',  // Lightest Green
  },

  // Warning Colors (adjusted for dark mode)
  warning: {
    50: '#78350F',   // Darkest Tan
    100: '#92400E',  // Very Dark Tan
    200: '#B45309',  // Dark Tan
    300: '#D97706',  // Medium Dark Tan
    400: '#F59E0B',  // Medium Tan
    500: '#FBBF24',  // Primary Tan (lighter for dark mode)
    600: '#FCD34D',  // Medium Light Tan
    700: '#FDE68A',  // Light Tan
    800: '#FEF3C7',  // Very Light Tan
    900: '#FFFBEB',  // Lightest Tan
  },

  // Error Colors (adjusted for dark mode)
  error: {
    50: '#7F1D1D',   // Darkest Red
    100: '#991B1B',  // Very Dark Red
    200: '#B91C1C',  // Dark Red
    300: '#DC2626',  // Medium Dark Red
    400: '#EF4444',  // Medium Red
    500: '#F87171',  // Primary Red (lighter for dark mode)
    600: '#FCA5A5',  // Medium Light Red
    700: '#FECACA',  // Light Red
    800: '#FEE2E2',  // Very Light Red
    900: '#FEF2F2',  // Lightest Red
  },

  // Info Colors (adjusted for dark mode)
  info: {
    50: '#1E3A8A',   // Darkest Blue
    100: '#1E40AF',  // Very Dark Blue
    200: '#1D4ED8',  // Dark Blue
    300: '#2563EB',  // Medium Dark Blue
    400: '#3B82F6',  // Medium Blue
    500: '#60A5FA',  // Primary Blue (lighter for dark mode)
    600: '#93C5FD',  // Medium Light Blue
    700: '#BFDBFE',  // Light Blue
    800: '#DBEAFE',  // Very Light Blue
    900: '#EFF6FF',  // Lightest Blue
  },

  // Neutral Gray Colors (inverted for dark mode)
  gray: {
    50: '#111827',   // Darkest Gray
    100: '#1F2937',  // Very Dark Gray
    200: '#374151',  // Dark Gray
    300: '#4B5563',  // Medium Dark Gray
    400: '#6B7280',  // Medium Gray
    500: '#9CA3AF',  // Primary Gray (lighter for dark mode)
    600: '#D1D5DB',  // Medium Light Gray
    700: '#E5E7EB',  // Light Gray
    800: '#F3F4F6',  // Very Light Gray
    900: '#F9FAFB',  // Lightest Gray
  },

  // Surface Colors (dark mode)
  background: '#000000',
  surface: '#111827',
  card: '#1F2937',
  overlay: 'rgba(255, 255, 255, 0.1)',

  // Text Colors (dark mode)
  text: {
    primary: '#F9FAFB',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
    inverse: '#111827',
  },

  // Border Colors (dark mode)
  border: {
    light: '#374151',
    medium: '#4B5563',
    dark: '#6B7280',
    focus: '#60A5FA',
  },

  // Interactive Colors (dark mode)
  interactive: {
    hover: 'rgba(96, 165, 250, 0.1)',
    pressed: 'rgba(96, 165, 250, 0.2)',
    disabled: '#374151',
    selected: '#1E3A8A',
  },
};

// Tactical Theme - Dark Gray and Orange accents
export const tacticalColors: ColorPalette = {
  primary: {
    50: '#F3F4F6',   // Lightest Gray
    100: '#E5E7EB',  // Very Light Gray
    200: '#D1D5DB',  // Light Gray
    300: '#9CA3AF',  // Medium Light Gray
    400: '#6B7280',  // Medium Gray
    500: '#374151',  // Primary Tactical Gray
    600: '#1F2937',  // Medium Dark Gray
    700: '#111827',  // Dark Gray
    800: '#030712',  // Very Dark Gray
    900: '#000000',  // Darkest Gray
  },

  secondary: {
    50: '#FFF7ED',   // Lightest Orange
    100: '#FFEDD5',  // Very Light Orange
    200: '#FED7AA',  // Light Orange
    300: '#FDBA74',  // Medium Light Orange
    400: '#FB923C',  // Medium Orange
    500: '#F97316',  // Primary Tactical Orange
    600: '#EA580C',  // Medium Dark Orange
    700: '#C2410C',  // Dark Orange
    800: '#9A3412',  // Very Dark Orange
    900: '#7C2D12',  // Darkest Orange
  },

  success: {
    50: '#F0FDF4',   // Lightest Green
    100: '#DCFCE7',  // Very Light Green
    200: '#BBF7D0',  // Light Green
    300: '#86EFAC',  // Medium Light Green
    400: '#4ADE80',  // Medium Green
    500: '#22C55E',  // Primary Green
    600: '#16A34A',  // Medium Dark Green
    700: '#15803D',  // Dark Green
    800: '#166534',  // Very Dark Green
    900: '#14532D',  // Darkest Green
  },

  warning: {
    50: '#FEF3C7',   // Lightest Yellow
    100: '#FDE68A',  // Very Light Yellow
    200: '#FCD34D',  // Light Yellow
    300: '#FBBF24',  // Medium Light Yellow
    400: '#F59E0B',  // Medium Yellow
    500: '#F59E0B',  // Primary Yellow
    600: '#D97706',  // Medium Dark Yellow
    700: '#B45309',  // Dark Yellow
    800: '#92400E',  // Very Dark Yellow
    900: '#78350F',  // Darkest Yellow
  },

  error: {
    50: '#FEF2F2',   // Lightest Red
    100: '#FEE2E2',  // Very Light Red
    200: '#FECACA',  // Light Red
    300: '#FCA5A5',  // Medium Light Red
    400: '#F87171',  // Medium Red
    500: '#EF4444',  // Primary Red
    600: '#DC2626',  // Medium Dark Red
    700: '#B91C1C',  // Dark Red
    800: '#991B1B',  // Very Dark Red
    900: '#7F1D1D',  // Darkest Red
  },

  info: {
    50: '#EFF6FF',   // Lightest Blue
    100: '#DBEAFE',  // Very Light Blue
    200: '#BFDBFE',  // Light Blue
    300: '#93C5FD',  // Medium Light Blue
    400: '#60A5FA',  // Medium Blue
    500: '#3B82F6',  // Primary Blue
    600: '#2563EB',  // Medium Dark Blue
    700: '#1D4ED8',  // Dark Blue
    800: '#1E40AF',  // Very Dark Blue
    900: '#1E3A8A',  // Darkest Blue
  },

  gray: {
    50: '#F9FAFB',   // Lightest Gray
    100: '#F3F4F6',  // Very Light Gray
    200: '#E5E7EB',  // Light Gray
    300: '#D1D5DB',  // Medium Light Gray
    400: '#9CA3AF',  // Medium Gray
    500: '#6B7280',  // Primary Gray
    600: '#4B5563',  // Medium Dark Gray
    700: '#374151',  // Dark Gray
    800: '#1F2937',  // Very Dark Gray
    900: '#111827',  // Darkest Gray
  },

  background: '#FFFFFF',
  surface: '#F9FAFB',
  card: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
    focus: '#F97316',
  },

  interactive: {
    hover: 'rgba(249, 115, 22, 0.1)',
    pressed: 'rgba(249, 115, 22, 0.2)',
    disabled: '#E5E7EB',
    selected: '#FFF7ED',
  },
};

// Dark Tactical Theme
export const darkTacticalColors: ColorPalette = {
  primary: {
    50: '#000000',   // Darkest Gray
    100: '#030712',  // Very Dark Gray
    200: '#111827',  // Dark Gray
    300: '#1F2937',  // Medium Dark Gray
    400: '#374151',  // Medium Gray
    500: '#6B7280',  // Primary Tactical Gray (lighter for dark mode)
    600: '#9CA3AF',  // Medium Light Gray
    700: '#D1D5DB',  // Light Gray
    800: '#E5E7EB',  // Very Light Gray
    900: '#F3F4F6',  // Lightest Gray
  },

  secondary: {
    50: '#7C2D12',   // Darkest Orange
    100: '#9A3412',  // Very Dark Orange
    200: '#C2410C',  // Dark Orange
    300: '#EA580C',  // Medium Dark Orange
    400: '#F97316',  // Medium Orange
    500: '#FB923C',  // Primary Tactical Orange (lighter for dark mode)
    600: '#FDBA74',  // Medium Light Orange
    700: '#FED7AA',  // Light Orange
    800: '#FFEDD5',  // Very Light Orange
    900: '#FFF7ED',  // Lightest Orange
  },

  success: {
    50: '#14532D',   // Darkest Green
    100: '#166534',  // Very Dark Green
    200: '#15803D',  // Dark Green
    300: '#16A34A',  // Medium Dark Green
    400: '#22C55E',  // Medium Green
    500: '#4ADE80',  // Primary Green (lighter for dark mode)
    600: '#86EFAC',  // Medium Light Green
    700: '#BBF7D0',  // Light Green
    800: '#DCFCE7',  // Very Light Green
    900: '#F0FDF4',  // Lightest Green
  },

  warning: {
    50: '#78350F',   // Darkest Yellow
    100: '#92400E',  // Very Dark Yellow
    200: '#B45309',  // Dark Yellow
    300: '#D97706',  // Medium Dark Yellow
    400: '#F59E0B',  // Medium Yellow
    500: '#FBBF24',  // Primary Yellow (lighter for dark mode)
    600: '#FCD34D',  // Medium Light Yellow
    700: '#FDE68A',  // Light Yellow
    800: '#FEF3C7',  // Very Light Yellow
    900: '#FEF9C3',  // Lightest Yellow
  },

  error: {
    50: '#7F1D1D',   // Darkest Red
    100: '#991B1B',  // Very Dark Red
    200: '#B91C1C',  // Dark Red
    300: '#DC2626',  // Medium Dark Red
    400: '#EF4444',  // Medium Red
    500: '#F87171',  // Primary Red (lighter for dark mode)
    600: '#FCA5A5',  // Medium Light Red
    700: '#FECACA',  // Light Red
    800: '#FEE2E2',  // Very Light Red
    900: '#FEF2F2',  // Lightest Red
  },

  info: {
    50: '#1E3A8A',   // Darkest Blue
    100: '#1E40AF',  // Very Dark Blue
    200: '#1D4ED8',  // Dark Blue
    300: '#2563EB',  // Medium Dark Blue
    400: '#3B82F6',  // Medium Blue
    500: '#60A5FA',  // Primary Blue (lighter for dark mode)
    600: '#93C5FD',  // Medium Light Blue
    700: '#BFDBFE',  // Light Blue
    800: '#DBEAFE',  // Very Light Blue
    900: '#EFF6FF',  // Lightest Blue
  },

  gray: {
    50: '#111827',   // Darkest Gray
    100: '#1F2937',  // Very Dark Gray
    200: '#374151',  // Dark Gray
    300: '#4B5563',  // Medium Dark Gray
    400: '#6B7280',  // Medium Gray
    500: '#9CA3AF',  // Primary Gray (lighter for dark mode)
    600: '#D1D5DB',  // Medium Light Gray
    700: '#E5E7EB',  // Light Gray
    800: '#F3F4F6',  // Very Light Gray
    900: '#F9FAFB',  // Lightest Gray
  },

  background: '#000000',
  surface: '#111827',
  card: '#1F2937',
  overlay: 'rgba(255, 255, 255, 0.1)',

  text: {
    primary: '#F9FAFB',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
    inverse: '#111827',
  },

  border: {
    light: '#374151',
    medium: '#4B5563',
    dark: '#6B7280',
    focus: '#FB923C',
  },

  interactive: {
    hover: 'rgba(251, 146, 60, 0.1)',
    pressed: 'rgba(251, 146, 60, 0.2)',
    disabled: '#374151',
    selected: '#7C2D12',
  },
};

// Stealth Theme - Black and Green accents
export const stealthColors: ColorPalette = {
  primary: {
    50: '#F9FAFB',   // Lightest Gray
    100: '#F3F4F6',  // Very Light Gray
    200: '#E5E7EB',  // Light Gray
    300: '#D1D5DB',  // Medium Light Gray
    400: '#9CA3AF',  // Medium Gray
    500: '#6B7280',  // Primary Stealth Gray
    600: '#4B5563',  // Medium Dark Gray
    700: '#374151',  // Dark Gray
    800: '#1F2937',  // Very Dark Gray
    900: '#111827',  // Darkest Gray
  },

  secondary: {
    50: '#F0FDF4',   // Lightest Green
    100: '#DCFCE7',  // Very Light Green
    200: '#BBF7D0',  // Light Green
    300: '#86EFAC',  // Medium Light Green
    400: '#4ADE80',  // Medium Green
    500: '#22C55E',  // Primary Stealth Green
    600: '#16A34A',  // Medium Dark Green
    700: '#15803D',  // Dark Green
    800: '#166534',  // Very Dark Green
    900: '#14532D',  // Darkest Green
  },

  success: {
    50: '#F0FDF4',   // Lightest Green
    100: '#DCFCE7',  // Very Light Green
    200: '#BBF7D0',  // Light Green
    300: '#86EFAC',  // Medium Light Green
    400: '#4ADE80',  // Medium Green
    500: '#22C55E',  // Primary Green
    600: '#16A34A',  // Medium Dark Green
    700: '#15803D',  // Dark Green
    800: '#166534',  // Very Dark Green
    900: '#14532D',  // Darkest Green
  },

  warning: {
    50: '#FEF3C7',   // Lightest Yellow
    100: '#FDE68A',  // Very Light Yellow
    200: '#FCD34D',  // Light Yellow
    300: '#FBBF24',  // Medium Light Yellow
    400: '#F59E0B',  // Medium Yellow
    500: '#F59E0B',  // Primary Yellow
    600: '#D97706',  // Medium Dark Yellow
    700: '#B45309',  // Dark Yellow
    800: '#92400E',  // Very Dark Yellow
    900: '#78350F',  // Darkest Yellow
  },

  error: {
    50: '#FEF2F2',   // Lightest Red
    100: '#FEE2E2',  // Very Light Red
    200: '#FECACA',  // Light Red
    300: '#FCA5A5',  // Medium Light Red
    400: '#F87171',  // Medium Red
    500: '#EF4444',  // Primary Red
    600: '#DC2626',  // Medium Dark Red
    700: '#B91C1C',  // Dark Red
    800: '#991B1B',  // Very Dark Red
    900: '#7F1D1D',  // Darkest Red
  },

  info: {
    50: '#EFF6FF',   // Lightest Blue
    100: '#DBEAFE',  // Very Light Blue
    200: '#BFDBFE',  // Light Blue
    300: '#93C5FD',  // Medium Light Blue
    400: '#60A5FA',  // Medium Blue
    500: '#3B82F6',  // Primary Blue
    600: '#2563EB',  // Medium Dark Blue
    700: '#1D4ED8',  // Dark Blue
    800: '#1E40AF',  // Very Dark Blue
    900: '#1E3A8A',  // Darkest Blue
  },

  gray: {
    50: '#F9FAFB',   // Lightest Gray
    100: '#F3F4F6',  // Very Light Gray
    200: '#E5E7EB',  // Light Gray
    300: '#D1D5DB',  // Medium Light Gray
    400: '#9CA3AF',  // Medium Gray
    500: '#6B7280',  // Primary Gray
    600: '#4B5563',  // Medium Dark Gray
    700: '#374151',  // Dark Gray
    800: '#1F2937',  // Very Dark Gray
    900: '#111827',  // Darkest Gray
  },

  background: '#FFFFFF',
  surface: '#F8FAFC',
  card: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
    focus: '#22C55E',
  },

  interactive: {
    hover: 'rgba(34, 197, 94, 0.1)',
    pressed: 'rgba(34, 197, 94, 0.2)',
    disabled: '#E5E7EB',
    selected: '#F0FDF4',
  },
};

// Dark Stealth Theme
export const darkStealthColors: ColorPalette = {
  primary: {
    50: '#111827',   // Darkest Gray
    100: '#1F2937',  // Very Dark Gray
    200: '#374151',  // Dark Gray
    300: '#4B5563',  // Medium Dark Gray
    400: '#6B7280',  // Medium Gray
    500: '#9CA3AF',  // Primary Stealth Gray (lighter for dark mode)
    600: '#D1D5DB',  // Medium Light Gray
    700: '#E5E7EB',  // Light Gray
    800: '#F3F4F6',  // Very Light Gray
    900: '#F9FAFB',  // Lightest Gray
  },

  secondary: {
    50: '#14532D',   // Darkest Green
    100: '#166534',  // Very Dark Green
    200: '#15803D',  // Dark Green
    300: '#16A34A',  // Medium Dark Green
    400: '#22C55E',  // Medium Green
    500: '#4ADE80',  // Primary Stealth Green (lighter for dark mode)
    600: '#86EFAC',  // Medium Light Green
    700: '#BBF7D0',  // Light Green
    800: '#DCFCE7',  // Very Light Green
    900: '#F0FDF4',  // Lightest Green
  },

  success: {
    50: '#14532D',   // Darkest Green
    100: '#166534',  // Very Dark Green
    200: '#15803D',  // Dark Green
    300: '#16A34A',  // Medium Dark Green
    400: '#22C55E',  // Medium Green
    500: '#4ADE80',  // Primary Green (lighter for dark mode)
    600: '#86EFAC',  // Medium Light Green
    700: '#BBF7D0',  // Light Green
    800: '#DCFCE7',  // Very Light Green
    900: '#F0FDF4',  // Lightest Green
  },

  warning: {
    50: '#78350F',   // Darkest Yellow
    100: '#92400E',  // Very Dark Yellow
    200: '#B45309',  // Dark Yellow
    300: '#D97706',  // Medium Dark Yellow
    400: '#F59E0B',  // Medium Yellow
    500: '#FBBF24',  // Primary Yellow (lighter for dark mode)
    600: '#FCD34D',  // Medium Light Yellow
    700: '#FDE68A',  // Light Yellow
    800: '#FEF3C7',  // Very Light Yellow
    900: '#FEF9C3',  // Lightest Yellow
  },

  error: {
    50: '#7F1D1D',   // Darkest Red
    100: '#991B1B',  // Very Dark Red
    200: '#B91C1C',  // Dark Red
    300: '#DC2626',  // Medium Dark Red
    400: '#EF4444',  // Medium Red
    500: '#F87171',  // Primary Red (lighter for dark mode)
    600: '#FCA5A5',  // Medium Light Red
    700: '#FECACA',  // Light Red
    800: '#FEE2E2',  // Very Light Red
    900: '#FEF2F2',  // Lightest Red
  },

  info: {
    50: '#1E3A8A',   // Darkest Blue
    100: '#1E40AF',  // Very Dark Blue
    200: '#1D4ED8',  // Dark Blue
    300: '#2563EB',  // Medium Dark Blue
    400: '#3B82F6',  // Medium Blue
    500: '#60A5FA',  // Primary Blue (lighter for dark mode)
    600: '#93C5FD',  // Medium Light Blue
    700: '#BFDBFE',  // Light Blue
    800: '#DBEAFE',  // Very Light Blue
    900: '#EFF6FF',  // Lightest Blue
  },

  gray: {
    50: '#111827',   // Darkest Gray
    100: '#1F2937',  // Very Dark Gray
    200: '#374151',  // Dark Gray
    300: '#4B5563',  // Medium Dark Gray
    400: '#6B7280',  // Medium Gray
    500: '#9CA3AF',  // Primary Gray (lighter for dark mode)
    600: '#D1D5DB',  // Medium Light Gray
    700: '#E5E7EB',  // Light Gray
    800: '#F3F4F6',  // Very Light Gray
    900: '#F9FAFB',  // Lightest Gray
  },

  background: '#000000',
  surface: '#0A0A0A',
  card: '#111827',
  overlay: 'rgba(255, 255, 255, 0.05)',

  text: {
    primary: '#F9FAFB',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
    inverse: '#111827',
  },

  border: {
    light: '#1F2937',
    medium: '#374151',
    dark: '#4B5563',
    focus: '#4ADE80',
  },

  interactive: {
    hover: 'rgba(74, 222, 128, 0.1)',
    pressed: 'rgba(74, 222, 128, 0.2)',
    disabled: '#1F2937',
    selected: '#14532D',
  },
};

// Desert Theme - Tan and Brown accents
export const desertColors: ColorPalette = {
  primary: {
    50: '#FEFCE8',   // Lightest Cream
    100: '#FEF9C3',  // Very Light Cream
    200: '#FEF08A',  // Light Cream
    300: '#FDE047',  // Medium Light Cream
    400: '#FACC15',  // Medium Cream
    500: '#EAB308',  // Primary Desert Gold
    600: '#CA8A04',  // Medium Dark Gold
    700: '#A16207',  // Dark Gold
    800: '#854D0E',  // Very Dark Gold
    900: '#713F12',  // Darkest Gold
  },

  secondary: {
    50: '#FEF7ED',   // Lightest Brown
    100: '#FED7AA',  // Very Light Brown
    200: '#FDBA74',  // Light Brown
    300: '#FB923C',  // Medium Light Brown
    400: '#F97316',  // Medium Brown
    500: '#EA580C',  // Primary Desert Brown
    600: '#C2410C',  // Medium Dark Brown
    700: '#9A3412',  // Dark Brown
    800: '#7C2D12',  // Very Dark Brown
    900: '#92400E',  // Darkest Brown
  },

  success: {
    50: '#F0FDF4',   // Lightest Green
    100: '#DCFCE7',  // Very Light Green
    200: '#BBF7D0',  // Light Green
    300: '#86EFAC',  // Medium Light Green
    400: '#4ADE80',  // Medium Green
    500: '#22C55E',  // Primary Green
    600: '#16A34A',  // Medium Dark Green
    700: '#15803D',  // Dark Green
    800: '#166534',  // Very Dark Green
    900: '#14532D',  // Darkest Green
  },

  warning: {
    50: '#FFFBEB',   // Lightest Orange
    100: '#FEF3C7',  // Very Light Orange
    200: '#FDE68A',  // Light Orange
    300: '#FCD34D',  // Medium Light Orange
    400: '#FBBF24',  // Medium Orange
    500: '#F59E0B',  // Primary Orange
    600: '#D97706',  // Medium Dark Orange
    700: '#B45309',  // Dark Orange
    800: '#92400E',  // Very Dark Orange
    900: '#78350F',  // Darkest Orange
  },

  error: {
    50: '#FEF2F2',   // Lightest Red
    100: '#FEE2E2',  // Very Light Red
    200: '#FECACA',  // Light Red
    300: '#FCA5A5',  // Medium Light Red
    400: '#F87171',  // Medium Red
    500: '#EF4444',  // Primary Red
    600: '#DC2626',  // Medium Dark Red
    700: '#B91C1C',  // Dark Red
    800: '#991B1B',  // Very Dark Red
    900: '#7F1D1D',  // Darkest Red
  },

  info: {
    50: '#EFF6FF',   // Lightest Blue
    100: '#DBEAFE',  // Very Light Blue
    200: '#BFDBFE',  // Light Blue
    300: '#93C5FD',  // Medium Light Blue
    400: '#60A5FA',  // Medium Blue
    500: '#3B82F6',  // Primary Blue
    600: '#2563EB',  // Medium Dark Blue
    700: '#1D4ED8',  // Dark Blue
    800: '#1E40AF',  // Very Dark Blue
    900: '#1E3A8A',  // Darkest Blue
  },

  gray: {
    50: '#FFFBEB',   // Lightest Sand
    100: '#FEF3C7',  // Very Light Sand
    200: '#FDE68A',  // Light Sand
    300: '#FCD34D',  // Medium Light Sand
    400: '#FBBF24',  // Medium Sand
    500: '#F59E0B',  // Primary Sand
    600: '#D97706',  // Medium Dark Sand
    700: '#B45309',  // Dark Sand
    800: '#92400E',  // Very Dark Sand
    900: '#78350F',  // Darkest Sand
  },

  background: '#FFFBEB',
  surface: '#FEF9C3',
  card: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  text: {
    primary: '#78350F',
    secondary: '#92400E',
    tertiary: '#B45309',
    inverse: '#FFFFFF',
  },

  border: {
    light: '#FDE68A',
    medium: '#FCD34D',
    dark: '#FBBF24',
    focus: '#EAB308',
  },

  interactive: {
    hover: 'rgba(234, 179, 8, 0.1)',
    pressed: 'rgba(234, 179, 8, 0.2)',
    disabled: '#FDE68A',
    selected: '#FEFCE8',
  },
};

// Dark Desert Theme
export const darkDesertColors: ColorPalette = {
  primary: {
    50: '#713F12',   // Darkest Gold
    100: '#854D0E',  // Very Dark Gold
    200: '#A16207',  // Dark Gold
    300: '#CA8A04',  // Medium Dark Gold
    400: '#EAB308',  // Medium Gold
    500: '#FACC15',  // Primary Desert Gold (lighter for dark mode)
    600: '#FDE047',  // Medium Light Gold
    700: '#FEF08A',  // Light Gold
    800: '#FEF9C3',  // Very Light Gold
    900: '#FEFCE8',  // Lightest Gold
  },

  secondary: {
    50: '#92400E',   // Darkest Brown
    100: '#7C2D12',  // Very Dark Brown
    200: '#9A3412',  // Dark Brown
    300: '#C2410C',  // Medium Dark Brown
    400: '#EA580C',  // Medium Brown
    500: '#F97316',  // Primary Desert Brown (lighter for dark mode)
    600: '#FB923C',  // Medium Light Brown
    700: '#FDBA74',  // Light Brown
    800: '#FED7AA',  // Very Light Brown
    900: '#FEF7ED',  // Lightest Brown
  },

  success: {
    50: '#14532D',   // Darkest Green
    100: '#166534',  // Very Dark Green
    200: '#15803D',  // Dark Green
    300: '#16A34A',  // Medium Dark Green
    400: '#22C55E',  // Medium Green
    500: '#4ADE80',  // Primary Green (lighter for dark mode)
    600: '#86EFAC',  // Medium Light Green
    700: '#BBF7D0',  // Light Green
    800: '#DCFCE7',  // Very Light Green
    900: '#F0FDF4',  // Lightest Green
  },

  warning: {
    50: '#78350F',   // Darkest Orange
    100: '#92400E',  // Very Dark Orange
    200: '#B45309',  // Dark Orange
    300: '#D97706',  // Medium Dark Orange
    400: '#F59E0B',  // Medium Orange
    500: '#FBBF24',  // Primary Orange (lighter for dark mode)
    600: '#FCD34D',  // Medium Light Orange
    700: '#FDE68A',  // Light Orange
    800: '#FEF3C7',  // Very Light Orange
    900: '#FFFBEB',  // Lightest Orange
  },

  error: {
    50: '#7F1D1D',   // Darkest Red
    100: '#991B1B',  // Very Dark Red
    200: '#B91C1C',  // Dark Red
    300: '#DC2626',  // Medium Dark Red
    400: '#EF4444',  // Medium Red
    500: '#F87171',  // Primary Red (lighter for dark mode)
    600: '#FCA5A5',  // Medium Light Red
    700: '#FECACA',  // Light Red
    800: '#FEE2E2',  // Very Light Red
    900: '#FEF2F2',  // Lightest Red
  },

  info: {
    50: '#1E3A8A',   // Darkest Blue
    100: '#1E40AF',  // Very Dark Blue
    200: '#1D4ED8',  // Dark Blue
    300: '#2563EB',  // Medium Dark Blue
    400: '#3B82F6',  // Medium Blue
    500: '#60A5FA',  // Primary Blue (lighter for dark mode)
    600: '#93C5FD',  // Medium Light Blue
    700: '#BFDBFE',  // Light Blue
    800: '#DBEAFE',  // Very Light Blue
    900: '#EFF6FF',  // Lightest Blue
  },

  gray: {
    50: '#78350F',   // Darkest Sand
    100: '#92400E',  // Very Dark Sand
    200: '#B45309',  // Dark Sand
    300: '#D97706',  // Medium Dark Sand
    400: '#F59E0B',  // Medium Sand
    500: '#FBBF24',  // Primary Sand (lighter for dark mode)
    600: '#FCD34D',  // Medium Light Sand
    700: '#FDE68A',  // Light Sand
    800: '#FEF3C7',  // Very Light Sand
    900: '#FFFBEB',  // Lightest Sand
  },

  background: '#1A1A1A',
  surface: '#2D2D2D',
  card: '#404040',
  overlay: 'rgba(255, 255, 255, 0.1)',

  text: {
    primary: '#FEFCE8',
    secondary: '#FEF9C3',
    tertiary: '#FDE68A',
    inverse: '#1A1A1A',
  },

  border: {
    light: '#404040',
    medium: '#525252',
    dark: '#737373',
    focus: '#FACC15',
  },

  interactive: {
    hover: 'rgba(250, 204, 21, 0.1)',
    pressed: 'rgba(250, 204, 21, 0.2)',
    disabled: '#404040',
    selected: '#713F12',
  },
};

// Forest Theme - Green and Brown accents
export const forestColors: ColorPalette = {
  primary: {
    50: '#F0FDF4',   // Lightest Green
    100: '#DCFCE7',  // Very Light Green
    200: '#BBF7D0',  // Light Green
    300: '#86EFAC',  // Medium Light Green
    400: '#4ADE80',  // Medium Green
    500: '#22C55E',  // Primary Forest Green
    600: '#16A34A',  // Medium Dark Green
    700: '#15803D',  // Dark Green
    800: '#166534',  // Very Dark Green
    900: '#14532D',  // Darkest Green
  },

  secondary: {
    50: '#FEF7ED',   // Lightest Brown
    100: '#FED7AA',  // Very Light Brown
    200: '#FDBA74',  // Light Brown
    300: '#FB923C',  // Medium Light Brown
    400: '#F97316',  // Medium Brown
    500: '#EA580C',  // Primary Forest Brown
    600: '#C2410C',  // Medium Dark Brown
    700: '#9A3412',  // Dark Brown
    800: '#7C2D12',  // Very Dark Brown
    900: '#92400E',  // Darkest Brown
  },

  success: {
    50: '#F0FDF4',   // Lightest Green
    100: '#DCFCE7',  // Very Light Green
    200: '#BBF7D0',  // Light Green
    300: '#86EFAC',  // Medium Light Green
    400: '#4ADE80',  // Medium Green
    500: '#22C55E',  // Primary Green
    600: '#16A34A',  // Medium Dark Green
    700: '#15803D',  // Dark Green
    800: '#166534',  // Very Dark Green
    900: '#14532D',  // Darkest Green
  },

  warning: {
    50: '#FEF3C7',   // Lightest Yellow
    100: '#FDE68A',  // Very Light Yellow
    200: '#FCD34D',  // Light Yellow
    300: '#FBBF24',  // Medium Light Yellow
    400: '#F59E0B',  // Medium Yellow
    500: '#F59E0B',  // Primary Yellow
    600: '#D97706',  // Medium Dark Yellow
    700: '#B45309',  // Dark Yellow
    800: '#92400E',  // Very Dark Yellow
    900: '#78350F',  // Darkest Yellow
  },

  error: {
    50: '#FEF2F2',   // Lightest Red
    100: '#FEE2E2',  // Very Light Red
    200: '#FECACA',  // Light Red
    300: '#FCA5A5',  // Medium Light Red
    400: '#F87171',  // Medium Red
    500: '#EF4444',  // Primary Red
    600: '#DC2626',  // Medium Dark Red
    700: '#B91C1C',  // Dark Red
    800: '#991B1B',  // Very Dark Red
    900: '#7F1D1D',  // Darkest Red
  },

  info: {
    50: '#EFF6FF',   // Lightest Blue
    100: '#DBEAFE',  // Very Light Blue
    200: '#BFDBFE',  // Light Blue
    300: '#93C5FD',  // Medium Light Blue
    400: '#60A5FA',  // Medium Blue
    500: '#3B82F6',  // Primary Blue
    600: '#2563EB',  // Medium Dark Blue
    700: '#1D4ED8',  // Dark Blue
    800: '#1E40AF',  // Very Dark Blue
    900: '#1E3A8A',  // Darkest Blue
  },

  gray: {
    50: '#F0FDF4',   // Lightest Forest Gray
    100: '#DCFCE7',  // Very Light Forest Gray
    200: '#BBF7D0',  // Light Forest Gray
    300: '#86EFAC',  // Medium Light Forest Gray
    400: '#4ADE80',  // Medium Forest Gray
    500: '#22C55E',  // Primary Forest Gray
    600: '#16A34A',  // Medium Dark Forest Gray
    700: '#15803D',  // Dark Forest Gray
    800: '#166534',  // Very Dark Forest Gray
    900: '#14532D',  // Darkest Forest Gray
  },

  background: '#F0FDF4',
  surface: '#DCFCE7',
  card: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  text: {
    primary: '#14532D',
    secondary: '#166534',
    tertiary: '#15803D',
    inverse: '#FFFFFF',
  },

  border: {
    light: '#BBF7D0',
    medium: '#86EFAC',
    dark: '#4ADE80',
    focus: '#22C55E',
  },

  interactive: {
    hover: 'rgba(34, 197, 94, 0.1)',
    pressed: 'rgba(34, 197, 94, 0.2)',
    disabled: '#BBF7D0',
    selected: '#F0FDF4',
  },
};

// Dark Forest Theme
export const darkForestColors: ColorPalette = {
  primary: {
    50: '#14532D',   // Darkest Green
    100: '#166534',  // Very Dark Green
    200: '#15803D',  // Dark Green
    300: '#16A34A',  // Medium Dark Green
    400: '#22C55E',  // Medium Green
    500: '#4ADE80',  // Primary Forest Green (lighter for dark mode)
    600: '#86EFAC',  // Medium Light Green
    700: '#BBF7D0',  // Light Green
    800: '#DCFCE7',  // Very Light Green
    900: '#F0FDF4',  // Lightest Green
  },

  secondary: {
    50: '#92400E',   // Darkest Brown
    100: '#7C2D12',  // Very Dark Brown
    200: '#9A3412',  // Dark Brown
    300: '#C2410C',  // Medium Dark Brown
    400: '#EA580C',  // Medium Brown
    500: '#F97316',  // Primary Forest Brown (lighter for dark mode)
    600: '#FB923C',  // Medium Light Brown
    700: '#FDBA74',  // Light Brown
    800: '#FED7AA',  // Very Light Brown
    900: '#FEF7ED',  // Lightest Brown
  },

  success: {
    50: '#14532D',   // Darkest Green
    100: '#166534',  // Very Dark Green
    200: '#15803D',  // Dark Green
    300: '#16A34A',  // Medium Dark Green
    400: '#22C55E',  // Medium Green
    500: '#4ADE80',  // Primary Green (lighter for dark mode)
    600: '#86EFAC',  // Medium Light Green
    700: '#BBF7D0',  // Light Green
    800: '#DCFCE7',  // Very Light Green
    900: '#F0FDF4',  // Lightest Green
  },

  warning: {
    50: '#78350F',   // Darkest Yellow
    100: '#92400E',  // Very Dark Yellow
    200: '#B45309',  // Dark Yellow
    300: '#D97706',  // Medium Dark Yellow
    400: '#F59E0B',  // Medium Yellow
    500: '#FBBF24',  // Primary Yellow (lighter for dark mode)
    600: '#FCD34D',  // Medium Light Yellow
    700: '#FDE68A',  // Light Yellow
    800: '#FEF3C7',  // Very Light Yellow
    900: '#FEF9C3',  // Lightest Yellow
  },

  error: {
    50: '#7F1D1D',   // Darkest Red
    100: '#991B1B',  // Very Dark Red
    200: '#B91C1C',  // Dark Red
    300: '#DC2626',  // Medium Dark Red
    400: '#EF4444',  // Medium Red
    500: '#F87171',  // Primary Red (lighter for dark mode)
    600: '#FCA5A5',  // Medium Light Red
    700: '#FECACA',  // Light Red
    800: '#FEE2E2',  // Very Light Red
    900: '#FEF2F2',  // Lightest Red
  },

  info: {
    50: '#1E3A8A',   // Darkest Blue
    100: '#1E40AF',  // Very Dark Blue
    200: '#1D4ED8',  // Dark Blue
    300: '#2563EB',  // Medium Dark Blue
    400: '#3B82F6',  // Medium Blue
    500: '#60A5FA',  // Primary Blue (lighter for dark mode)
    600: '#93C5FD',  // Medium Light Blue
    700: '#BFDBFE',  // Light Blue
    800: '#DBEAFE',  // Very Light Blue
    900: '#EFF6FF',  // Lightest Blue
  },

  gray: {
    50: '#14532D',   // Darkest Forest Gray
    100: '#166534',  // Very Dark Forest Gray
    200: '#15803D',  // Dark Forest Gray
    300: '#16A34A',  // Medium Dark Forest Gray
    400: '#22C55E',  // Medium Forest Gray
    500: '#4ADE80',  // Primary Forest Gray (lighter for dark mode)
    600: '#86EFAC',  // Medium Light Forest Gray
    700: '#BBF7D0',  // Light Forest Gray
    800: '#DCFCE7',  // Very Light Forest Gray
    900: '#F0FDF4',  // Lightest Forest Gray
  },

  background: '#0D1F0D',
  surface: '#1A2E1A',
  card: '#2D4A2D',
  overlay: 'rgba(255, 255, 255, 0.1)',

  text: {
    primary: '#F0FDF4',
    secondary: '#DCFCE7',
    tertiary: '#BBF7D0',
    inverse: '#0D1F0D',
  },

  border: {
    light: '#2D4A2D',
    medium: '#4A7C4A',
    dark: '#6B8E6B',
    focus: '#4ADE80',
  },

  interactive: {
    hover: 'rgba(74, 222, 128, 0.1)',
    pressed: 'rgba(74, 222, 128, 0.2)',
    disabled: '#2D4A2D',
    selected: '#14532D',
  },
};

// Color utility functions
export const getColorWithOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

export const lightenColor = (color: string, amount: number): string => {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
    const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
    const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  return color;
};

export const darkenColor = (color: string, amount: number): string => {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = Math.max(0, parseInt(hex.substring(0, 2), 16) - amount);
    const g = Math.max(0, parseInt(hex.substring(2, 4), 16) - amount);
    const b = Math.max(0, parseInt(hex.substring(4, 6), 16) - amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  return color;
};

export const getContrastColor = (backgroundColor: string): string => {
  if (backgroundColor.startsWith('#')) {
    const hex = backgroundColor.slice(1);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }
  return '#000000';
};