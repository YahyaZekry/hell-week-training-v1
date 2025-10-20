/**
 * Navigation System Type Definitions
 * Hell Week Training App - Comprehensive Navbar Types
 */

import { ViewStyle } from 'react-native';

export interface NavigationItem {
  /** Unique identifier for the navigation item */
  id: string;
  /** Display title for the navigation item */
  title: string;
  /** Navigation route/path */
  route: string;
  /** Icon configuration */
  icon: IconConfig;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Accessibility hint for screen readers */
  accessibilityHint?: string;
  /** Custom press handler */
  onPress?: () => void;
  /** Badge configuration */
  badge?: BadgeConfig;
  /** Disabled state */
  disabled?: boolean;
  /** External link flag */
  external?: boolean;
  /** Mobile-only flag */
  mobileOnly?: boolean;
  /** Desktop-only flag */
  desktopOnly?: boolean;
}

export interface IconConfig {
  /** Icon source type */
  source: 'emoji' | 'ionicons' | 'custom';
  /** Icon value (emoji string, icon name, or custom component) */
  value: string;
  /** Icon size in pixels */
  size?: number;
  /** Icon color */
  color?: string;
}

export interface BadgeConfig {
  /** Badge count or value */
  count: number;
  /** Badge display variant */
  variant?: 'dot' | 'count' | 'notification';
  /** Badge color */
  color?: string;
}

export interface NavBrandConfig {
  /** Brand text */
  text: string;
  /** Brand logo/icon */
  logo?: IconConfig;
  /** Brand display variant */
  variant?: 'text-only' | 'logo-only' | 'both';
  /** Press handler */
  onPress?: () => void;
  /** Brand size configuration */
  size?: 'small' | 'medium' | 'large';
}

export interface ViewportSize {
  /** Screen width in pixels */
  width: number;
  /** Screen height in pixels */
  height: number;
  /** Mobile viewport flag */
  isMobile: boolean;
  /** Tablet viewport flag */
  isTablet: boolean;
  /** Desktop viewport flag */
  isDesktop: boolean;
}

export interface NavigationContextType {
  /** Current active route */
  currentRoute: string;
  /** Navigation history */
  history: string[];
  /** Mobile menu visibility state */
  isMobileMenuOpen: boolean;
  /** Current viewport information */
  viewport: ViewportSize;
  /** Navigation actions */
  actions: {
    /** Navigate to a specific route */
    navigate: (route: string) => void;
    /** Go back in navigation history */
    goBack: () => void;
    /** Toggle mobile menu */
    toggleMobileMenu: () => void;
    /** Close mobile menu */
    closeMobileMenu: () => void;
    /** Set active route */
    setActiveRoute: (route: string) => void;
  };
}

export interface AnimationConfig {
  /** Animation type */
  type?: 'slide' | 'fade' | 'scale';
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation easing function */
  easing?: string;
  /** Spring configuration for physics-based animations */
  spring?: {
    damping: number;
    stiffness: number;
    mass: number;
  };
}

export interface OverlayConfig {
  /** Overlay opacity (0-1) */
  opacity?: number;
  /** Overlay color */
  color?: string;
  /** Close menu when overlay is pressed */
  closeOnPress?: boolean;
  /** Accessibility enabled */
  accessible?: boolean;
}

export interface LayoutConfig {
  /** Navbar height in pixels */
  navbarHeight: number;
  /** Brand size configuration */
  brandSize: 'small' | 'medium' | 'large';
  /** Navigation item spacing */
  navItemSpacing: 'compact' | 'comfortable' | 'spacious';
  /** Show text labels */
  showLabels: boolean;
  /** Enable horizontal scrolling */
  scrollable: boolean;
  /** Number of items per row */
  itemsPerRow: number;
}

export interface ThemeColors {
  /** Primary brand color */
  primary: string;
  /** Secondary color */
  secondary: string;
  /** Text color */
  text: string;
  /** Secondary text color */
  textSecondary: string;
  /** Background color */
  background: string;
  /** Surface color */
  surface: string;
  /** Border color */
  border: string;
  /** Success color */
  success: string;
  /** Warning color */
  warning: string;
  /** Error color */
  error: string;
}

export interface Theme {
  /** Color palette */
  colors: ThemeColors;
  /** Typography configuration */
  typography: {
    /** Font family */
    fontFamily: string;
    /** Font sizes */
    sizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    /** Font weights */
    weights: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
  /** Spacing configuration */
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  /** Border radius configuration */
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  /** Shadow configuration */
  shadows: {
    sm: {
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    md: {
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    lg: {
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
}

export interface HapticPattern {
  /** Selection feedback */
  selection: string;
  /** Impact feedback types */
  impact: {
    light: string;
    medium: string;
    heavy: string;
  };
  /** Notification feedback types */
  notification: {
    success: string;
    warning: string;
    error: string;
  };
}

// Component-specific prop types
export interface NavbarProps {
  /** Collection of navigation items */
  items?: NavigationItem[];
  /** Brand configuration */
  brand?: NavBrandConfig;
  /** Custom mobile menu button */
  mobileMenuButton?: React.ReactNode;
  /** Responsive behavior */
  responsive?: boolean;
  /** Fixed positioning */
  fixed?: boolean;
  /** Transparent background */
  transparent?: boolean;
  /** Visual variant */
  variant?: 'default' | 'compact' | 'minimal';
  /** Maximum width constraint */
  maxWidth?: number;
  /** Custom styling */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Additional class names */
  className?: string;
  /** Navigation change handler */
  onNavigationChange?: (route: string, item: NavigationItem) => void;
}

export interface NavLinkProps {
  /** Navigation item configuration */
  item: NavigationItem;
  /** Active state */
  isActive?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'default' | 'pill' | 'underline' | 'mobile';
  /** Custom press handler */
  onPress?: (item: NavigationItem) => void;
  /** Accessibility role */
  accessibilityRole?: string;
  /** Custom styling */
  style?: ViewStyle;
  /** Animation configuration */
  animation?: AnimationConfig;
}

export interface NavBrandProps {
  /** Brand configuration */
  brand: NavBrandConfig;
  /** Current viewport size */
  viewport: ViewportSize;
  /** Custom styling */
  style?: ViewStyle;
  /** Press handler */
  onPress?: () => void;
}

export interface MobileMenuProps {
  /** Navigation items */
  items: NavigationItem[];
  /** Visibility state */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Animation configuration */
  animation?: AnimationConfig;
  /** Overlay configuration */
  overlay?: OverlayConfig;
  /** Custom styling */
  style?: ViewStyle;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
}

export interface NavIconProps {
  /** Icon configuration */
  icon: IconConfig;
  /** Size override */
  size?: number;
  /** Color override */
  color?: string;
}

export interface BadgeProps extends BadgeConfig {
  /** Custom styling */
  style?: ViewStyle;
}

// Export type aliases for convenience
export type RouteType = string;
export type ColorValue = string;
export type SizeValue = number;
export type FontWeightValue = string;
export type EasingFunction = string;
export type SpringConfig = AnimationConfig['spring'];

// Root navigation parameter list for type safety
export type RootParamList = {
  '/': undefined;
  '/training': undefined;
  '/training/schedule': undefined;
  '/training/preparation': undefined;
  '/training/checklists': undefined;
  '/progress': undefined;
  '/nutrition': undefined;
  '/analytics': undefined;
  '/exercise-form': undefined;
  '/mental': undefined;
  '/recovery': undefined;
  '/settings': undefined;
  '/workout-history': undefined;
};