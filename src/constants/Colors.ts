export const Colors = {
  light: {
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#FF9500',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    selected: '#F0F8FF',
    text: '#000000',
    textSecondary: '#3C3C43',
    border: '#C6C6C8',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    accent: '#FF9F0A',
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    background: '#000000',
    surface: '#1C1C1E',
    selected: '#F0F8FF',
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    border: '#38383A',
    shadow: 'rgba(255, 255, 255, 0.1)',
  },
};

export type ColorScheme = typeof Colors.light;
export type ThemeColors = typeof Colors.light | typeof Colors.dark;

export default Colors;