/**
 * Theme system type definitions for Hell Week Training App
 */

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ColorPalette {
  // Primary Colors (Navy Camouflage Base)
  primary: ColorScale;
  
  // Secondary Colors (Camouflage Accents)
  secondary: ColorScale;
  
  // Semantic Colors
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  
  // Neutral Colors (Grayscale)
  gray: ColorScale;
  
  // Surface Colors
  background: string;
  surface: string;
  card: string;
  overlay: string;
  
  // Text Colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  
  // Border Colors
  border: {
    light: string;
    medium: string;
    dark: string;
    focus: string;
  };
  
  // Interactive Colors
  interactive: {
    hover: string;
    pressed: string;
    disabled: string;
    selected: string;
  };
}

export interface TypographySystem {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
    '5xl': number;
  };
  
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
  
  letterSpacing: {
    tight: number;
    normal: number;
    wide: number;
  };
}

export interface SpacingSystem {
  // Base spacing unit (4px)
  unit: number;
  
  // Spacing scale
  spacing: {
    0: number;
    1: number;  // 4px
    2: number;  // 8px
    3: number;  // 12px
    4: number;  // 16px
    5: number;  // 20px
    6: number;  // 24px
    8: number;  // 32px
    10: number; // 40px
    12: number; // 48px
    16: number; // 64px
    20: number; // 80px
    24: number; // 96px
  };
  
  // Component-specific spacing
  padding: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  
  margin: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export interface ShadowSystem {
  none: {
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  
  sm: {
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  
  md: {
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  
  lg: {
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  
  xl: {
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

export interface BorderSystem {
  borderRadius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  
  borderWidth: {
    none: number;
    thin: number;
    normal: number;
    thick: number;
  };
}

export interface AnimationSystem {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

export interface BreakpointSystem {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Theme {
  colors: ColorPalette;
  typography: TypographySystem;
  spacing: SpacingSystem;
  shadows: ShadowSystem;
  borders: BorderSystem;
  animations: AnimationSystem;
  breakpoints: BreakpointSystem;
}

export interface BackgroundState {
  pattern: string;
  colors: string[];
  opacity: number;
  isVisible: boolean;
}

export interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => Promise<void>;
  toggleTheme: () => Promise<void>;
  isDark: boolean;
  // New consolidated theme properties
  consolidatedThemeName?: ConsolidatedThemeName;
  setConsolidatedTheme?: (themeName: ConsolidatedThemeName) => Promise<void>;
  useConsolidatedSystem?: boolean;
  // Background state management
  backgroundState: BackgroundState;
  setBackgroundState: (state: Partial<BackgroundState>) => void;
  refreshBackground: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
}

// Theme utility types
export type ThemeColor = keyof ColorPalette;
export type ThemeFontSize = keyof TypographySystem['fontSize'];
export type ThemeFontWeight = keyof TypographySystem['fontWeight'];
export type ThemeSpacing = keyof SpacingSystem['spacing'];
export type ThemeBorderRadius = keyof BorderSystem['borderRadius'];

// Component variant types
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Style utility types
export type ThemeStyle = {
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  padding?: number;
  margin?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
};

// Responsive style types
export type ResponsiveStyle<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

// Theme hook return type
export type UseThemeReturn = ThemeContextType;

// Theme mode type
export type ThemeMode = 'light' | 'dark' | 'system';

// Theme name type (will be imported from themes)
export type ThemeName = 'light' | 'dark' | 'tactical' | 'darkTactical' | 'stealth' | 'darkStealth' | 'desert' | 'darkDesert' | 'forest' | 'darkForest';

// Consolidated theme name type
export type ConsolidatedThemeName = 'navyCamouflage' | 'tactical' | 'stealth' | 'desert' | 'forest';

// Theme persistence types
export interface ThemePersistenceConfig {
  storageKey: string;
  defaultTheme: ThemeMode;
}

// Component theme props
export interface ThemedComponentProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
}

// Navigation theme types
export interface NavigationTheme {
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  
  fonts: {
    regular: {
      fontFamily: string;
      fontWeight: string;
    };
    medium: {
      fontFamily: string;
      fontWeight: string;
    };
    bold: {
      fontFamily: string;
      fontWeight: string;
    };
  };
}