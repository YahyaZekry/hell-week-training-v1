/**
 * Theme Provider with Context-based State Management
 * Hell Week Training App
 * Navy Camouflage Theme System
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Appearance, useColorScheme } from 'react-native';

import {
  Theme,
  ThemeContextType,
  ThemeProviderProps,
  ThemeName,
  ConsolidatedThemeName,
  BackgroundState,
  themes,
  themeConfig,
  getTheme,
  isDarkTheme,
  getThemeName,
  consolidatedThemes,
  getConsolidatedTheme,
  defaultConsolidatedTheme,
  consolidatedThemeMetadata,
} from '../theme/index';
import { themeEvents } from '../utils/themeEvents';

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme persistence utilities
const ThemePersistence = {
  getTheme: async (): Promise<ThemeName | null> => {
    try {
      const storedTheme = await AsyncStorage.getItem(
        themeConfig.persistenceKey
      );
      return storedTheme as ThemeName | null;
    } catch (error) {
      console.error('Failed to get theme from storage:', error);
      return null;
    }
  },

  setTheme: async (themeName: ThemeName): Promise<void> => {
    try {
      await AsyncStorage.setItem(themeConfig.persistenceKey, themeName);
    } catch (error) {
      console.error('Failed to save theme to storage:', error);
    }
  },

  getConsolidatedTheme: async (): Promise<ConsolidatedThemeName | null> => {
    try {
      const storedTheme = await AsyncStorage.getItem(
        'consolidated-' + themeConfig.persistenceKey
      );
      return storedTheme as ConsolidatedThemeName | null;
    } catch (error) {
      console.error('Failed to get consolidated theme from storage:', error);
      return null;
    }
  },

  setConsolidatedTheme: async (
    themeName: ConsolidatedThemeName
  ): Promise<void> => {
    try {
      await AsyncStorage.setItem(
        'consolidated-' + themeConfig.persistenceKey,
        themeName
      );
    } catch (error) {
      console.error('Failed to save consolidated theme to storage:', error);
    }
  },

  getSystemTheme: (): ThemeName => {
    const colorScheme = Appearance.getColorScheme();
    return colorScheme === 'dark' ? 'dark' : 'light';
  },

  clearTheme: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(themeConfig.persistenceKey);
      await AsyncStorage.removeItem(
        'consolidated-' + themeConfig.persistenceKey
      );
    } catch (error) {
      console.error('Failed to clear theme from storage:', error);
    }
  },
};

// Theme Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeName, setThemeNameState] = useState<ThemeName>('dark');
  const [consolidatedThemeName, setConsolidatedThemeName] =
    useState<ConsolidatedThemeName>(defaultConsolidatedTheme);
  const [isLoading, setIsLoading] = useState(true);
  const [isSystemTheme, setIsSystemTheme] = useState(false);
  const [useConsolidatedSystem, setUseConsolidatedSystem] = useState(true);

  // Background state management
  const [backgroundState, setBackgroundStateState] = useState<BackgroundState>({
    pattern: 'camouflage',
    colors: ['#1a3d1a', '#2d5a2d', '#4a7c4a', '#669966'],
    opacity: 0.8,
    isVisible: true,
  });

  // Check if current theme is dark
  const isDark = useMemo(() => {
    if (useConsolidatedSystem) {
      return systemColorScheme === 'dark';
    }
    const theme = getTheme(themeName);
    return isDarkTheme(theme);
  }, [systemColorScheme, themeName, useConsolidatedSystem]);

  // Get current theme
  const theme = useMemo(() => {
    if (useConsolidatedSystem) {
      return getConsolidatedTheme(consolidatedThemeName, isDark);
    }
    return getTheme(themeName);
  }, [consolidatedThemeName, isDark, themeName, useConsolidatedSystem]);

  // Set theme function
  const setTheme = useCallback(async (newThemeName: ThemeName) => {
    setThemeNameState(newThemeName);
    setIsSystemTheme(false);
    setUseConsolidatedSystem(false);

    if (themeConfig.enablePersistence) {
      await ThemePersistence.setTheme(newThemeName);
    }

    // Emit theme change event
    themeEvents.emitThemeChange({
      themeName: newThemeName,
      consolidatedThemeName: undefined,
      isDark: isDarkTheme(getTheme(newThemeName)),
    });
  }, []);

  // Set consolidated theme function
  const setConsolidatedTheme = useCallback(
    async (newThemeName: ConsolidatedThemeName) => {
      setConsolidatedThemeName(newThemeName);
      setIsSystemTheme(false);
      setUseConsolidatedSystem(true);

      if (themeConfig.enablePersistence) {
        await ThemePersistence.setConsolidatedTheme(newThemeName);
      }

      // Emit theme change event
      themeEvents.emitThemeChange({
        themeName: undefined,
        consolidatedThemeName: newThemeName,
        isDark: systemColorScheme === 'dark',
      });
    },
    [systemColorScheme]
  );

  // Background state management functions
  const setBackgroundState = useCallback(
    (newState: Partial<BackgroundState>) => {
      setBackgroundStateState((prev: BackgroundState) => {
        const updatedState = { ...prev, ...newState };

        // Emit background change event
        themeEvents.emitBackgroundChange({
          backgroundState: updatedState,
        });

        return updatedState;
      });
    },
    []
  );

  const refreshBackground = useCallback(() => {
    // Force background refresh by updating state
    setBackgroundStateState((prev: BackgroundState) => ({
      ...prev,
      isVisible: false,
    }));

    // Trigger re-render with slight delay for smooth transition
    setTimeout(() => {
      setBackgroundStateState((prev: BackgroundState) => {
        const updatedState = { ...prev, isVisible: true };

        // Emit background refresh event
        themeEvents.emitBackgroundChange({
          backgroundState: updatedState,
        });

        return updatedState;
      });
    }, 50);
  }, []);

  // Update background when theme changes
  useEffect(() => {
    if (useConsolidatedSystem && consolidatedThemeName) {
      const metadata = consolidatedThemeMetadata[consolidatedThemeName];
      if (metadata?.pattern) {
        const newBackgroundState = {
          pattern: metadata.pattern.type,
          colors: metadata.pattern.colors,
          opacity: isDark ? 0.9 : 0.8,
          isVisible: true,
        };

        setBackgroundStateState((prev: BackgroundState) => {
          const updatedState = { ...prev, ...newBackgroundState };

          // Emit background change event
          themeEvents.emitBackgroundChange({
            backgroundState: updatedState,
          });

          return updatedState;
        });
      }
    }
  }, [consolidatedThemeName, isDark, useConsolidatedSystem]);

  // Toggle theme function
  const toggleTheme = useCallback(async () => {
    if (useConsolidatedSystem) {
      // Toggle between light/dark for consolidated themes
      // This is handled automatically by system detection
      setIsSystemTheme(!isSystemTheme);

      // Emit system theme change event
      themeEvents.emitSystemThemeChange({
        isDark: !isDark,
      });
    } else {
      const newThemeName: ThemeName = isDark ? 'light' : 'dark';
      await setTheme(newThemeName);
    }
  }, [isDark, setTheme, isSystemTheme, useConsolidatedSystem]);

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        // Default to camouflage theme
        setConsolidatedThemeName('navyCamouflage' as ConsolidatedThemeName);
        setUseConsolidatedSystem(true);
        setIsSystemTheme(false); // Don't use system preference

        if (themeConfig.enablePersistence) {
          // Try to get stored consolidated theme first
          const storedConsolidatedTheme =
            await ThemePersistence.getConsolidatedTheme();

          if (
            storedConsolidatedTheme &&
            consolidatedThemes[storedConsolidatedTheme]
          ) {
            setConsolidatedThemeName(storedConsolidatedTheme);
            setUseConsolidatedSystem(true);
            setIsSystemTheme(false); // Don't use system preference
          } else {
            // Fallback to legacy theme system
            const storedTheme = await ThemePersistence.getTheme();

            if (storedTheme && themes[storedTheme]) {
              setThemeNameState(storedTheme);
              setUseConsolidatedSystem(false);
              setIsSystemTheme(false);
            } else {
              // Default to camouflage theme
              setConsolidatedThemeName(
                'navyCamouflage' as ConsolidatedThemeName
              );
              setUseConsolidatedSystem(true);
              setIsSystemTheme(false);
            }
          }
        }
      } catch (error) {
        console.error('Failed to initialize theme:', error);
        // Default to camouflage theme
        setConsolidatedThemeName('navyCamouflage' as ConsolidatedThemeName);
        setUseConsolidatedSystem(true);
        setIsSystemTheme(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (themeConfig.enableSystemPreference && isSystemTheme) {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        const newThemeName: ThemeName =
          colorScheme === 'dark' ? 'dark' : 'light';
        setThemeNameState(newThemeName);
      });

      return () => subscription.remove();
    }
  }, [isSystemTheme]);

  // Listen for system color scheme changes
  useEffect(() => {
    if (
      themeConfig.enableSystemPreference &&
      isSystemTheme &&
      systemColorScheme
    ) {
      const newThemeName: ThemeName =
        systemColorScheme === 'dark' ? 'dark' : 'light';
      setThemeNameState(newThemeName);

      // Emit system theme change event
      themeEvents.emitSystemThemeChange({
        themeName: newThemeName,
        isDark: systemColorScheme === 'dark',
      });
    }
  }, [systemColorScheme, isSystemTheme]);

  // Context value
  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme,
      themeName,
      setTheme,
      toggleTheme,
      isDark,
      consolidatedThemeName,
      setConsolidatedTheme,
      useConsolidatedSystem,
      backgroundState,
      setBackgroundState,
      refreshBackground,
    }),
    [
      theme,
      themeName,
      setTheme,
      toggleTheme,
      isDark,
      consolidatedThemeName,
      setConsolidatedTheme,
      useConsolidatedSystem,
      backgroundState.pattern,
      backgroundState.colors,
      backgroundState.opacity,
      backgroundState.isVisible,
      refreshBackground,
    ]
  );

  // Show loading state if initializing
  if (isLoading) {
    return (
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// useTheme hook
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Higher-order component for theme access
export const withTheme = <P extends object>(
  Component: React.ComponentType<
    P & { theme: Theme; themeName: ThemeName; isDark: boolean }
  >
) => {
  const WithThemeComponent = (props: P) => {
    const { theme, themeName, isDark } = useTheme();
    return (
      <Component
        {...props}
        theme={theme}
        themeName={themeName}
        isDark={isDark}
      />
    );
  };

  WithThemeComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  return WithThemeComponent;
};

// Theme utilities
export const themeUtils = {
  // Get theme by name
  getThemeByName: getTheme,

  // Check if theme is dark
  isThemeDark: isDarkTheme,

  // Get theme name from theme object
  getThemeNameFromTheme: getThemeName,

  // Get available themes
  getAvailableThemes: () => Object.keys(themes) as ThemeName[],

  // Validate theme name
  isValidThemeName: (name: string): name is ThemeName => {
    return name in themes;
  },

  // Get theme metadata
  getThemeMetadata: (themeName: ThemeName) => {
    return {
      name: themeName,
      isDark: isDarkTheme(themes[themeName]),
      colors: themes[themeName].colors,
      fonts: themes[themeName].typography.fontFamily,
    };
  },

  // Clear stored theme
  clearStoredTheme: ThemePersistence.clearTheme,

  // Get system theme preference
  getSystemThemePreference: ThemePersistence.getSystemTheme,
};

// Theme debugging utilities
export const themeDebug = {
  // Log current theme info
  logThemeInfo: (themeContext: ThemeContextType) => {
    console.log('Theme Info:', {
      name: themeContext.themeName,
      isDark: themeContext.isDark,
      primaryColor: themeContext.theme.colors.primary[500],
      backgroundColor: themeContext.theme.colors.background,
      textColor: themeContext.theme.colors.text.primary,
    });
  },

  // Log all available themes
  logAllThemes: () => {
    console.log('Available Themes:', Object.keys(themes));
    Object.entries(themes).forEach(([name, theme]) => {
      console.log(`${name}:`, {
        primary: theme.colors.primary[500],
        background: theme.colors.background,
        isDark: isDarkTheme(theme),
      });
    });
  },

  // Validate theme structure
  validateThemeStructure: (theme: Theme) => {
    const requiredProperties = [
      'colors',
      'typography',
      'spacing',
      'shadows',
      'borders',
      'animations',
      'breakpoints',
    ];
    const missingProperties = requiredProperties.filter(
      prop => !(prop in theme)
    );

    if (missingProperties.length > 0) {
      console.error('Missing theme properties:', missingProperties);
      return false;
    }

    console.log('Theme structure is valid');
    return true;
  },
};

export default ThemeProvider;
