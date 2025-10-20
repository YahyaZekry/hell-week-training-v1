/**
 * Theme Events React Hook
 * Hell Week Training App
 * Provides React components with access to theme change events
 */

import { useEffect, useCallback, useRef } from 'react';

import { useTheme } from '../providers/ThemeProvider';
import { themeEvents, ThemeChangeEvent } from '../utils/themeEvents';

export interface UseThemeEventsOptions {
  onThemeChange?: (event: ThemeChangeEvent) => void;
  onBackgroundChange?: (event: ThemeChangeEvent) => void;
  onSystemThemeChange?: (event: ThemeChangeEvent) => void;
  onAnyThemeEvent?: (event: ThemeChangeEvent) => void;
  enabled?: boolean;
}

export const useThemeEvents = (options: UseThemeEventsOptions = {}) => {
  const {
    onThemeChange,
    onBackgroundChange,
    onSystemThemeChange,
    onAnyThemeEvent,
    enabled = true,
  } = options;
  
  const { theme, themeName, consolidatedThemeName, isDark, backgroundState } = useTheme();
  const listenersRef = useRef<{
    themeChange?: () => void;
    backgroundChange?: () => void;
    systemThemeChange?: () => void;
    anyThemeEvent?: () => void;
  }>({});
  
  // Memoized event handlers
  const handleThemeChange = useCallback((event: ThemeChangeEvent) => {
    if (onThemeChange) {
      onThemeChange(event);
    }
  }, [onThemeChange]);
  
  const handleBackgroundChange = useCallback((event: ThemeChangeEvent) => {
    if (onBackgroundChange) {
      onBackgroundChange(event);
    }
  }, [onBackgroundChange]);
  
  const handleSystemThemeChange = useCallback((event: ThemeChangeEvent) => {
    if (onSystemThemeChange) {
      onSystemThemeChange(event);
    }
  }, [onSystemThemeChange]);
  
  const handleAnyThemeEvent = useCallback((event: ThemeChangeEvent) => {
    if (onAnyThemeEvent) {
      onAnyThemeEvent(event);
    }
  }, [onAnyThemeEvent]);
  
  // Set up event listeners
  useEffect(() => {
    if (!enabled) {
      return;
    }
    
    // Subscribe to theme events
    listenersRef.current.themeChange = themeEvents.onThemeChange(handleThemeChange);
    listenersRef.current.backgroundChange = themeEvents.onBackgroundChange(handleBackgroundChange);
    listenersRef.current.systemThemeChange = themeEvents.onSystemThemeChange(handleSystemThemeChange);
    listenersRef.current.anyThemeEvent = themeEvents.onAnyThemeEvent(handleAnyThemeEvent);
    
    // Cleanup function
    return () => {
      // Unsubscribe from all events
      Object.values(listenersRef.current).forEach(unsubscribe => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
      listenersRef.current = {};
    };
  }, [enabled, handleThemeChange, handleBackgroundChange, handleSystemThemeChange, handleAnyThemeEvent]);
  
  // Utility functions for manual event emission
  const emitThemeChange = useCallback((data: Omit<ThemeChangeEvent['data'], 'timestamp'>) => {
    themeEvents.emitThemeChange(data);
  }, []);
  
  const emitBackgroundChange = useCallback((data: Omit<ThemeChangeEvent['data'], 'timestamp'>) => {
    themeEvents.emitBackgroundChange(data);
  }, []);
  
  const emitSystemThemeChange = useCallback((data: Omit<ThemeChangeEvent['data'], 'timestamp'>) => {
    themeEvents.emitSystemThemeChange(data);
  }, []);
  
  return {
    // Current theme state
    theme,
    themeName,
    consolidatedThemeName,
    isDark,
    backgroundState,
    
    // Event emission functions
    emitThemeChange,
    emitBackgroundChange,
    emitSystemThemeChange,
    
    // Force refresh functions
    forceThemeUpdate: useCallback(() => {
      emitThemeChange({
        themeName,
        consolidatedThemeName,
        isDark,
      });
    }, [themeName, consolidatedThemeName, isDark, emitThemeChange]),
    
    forceBackgroundUpdate: useCallback(() => {
      emitBackgroundChange({
        backgroundState,
      });
    }, [backgroundState, emitBackgroundChange]),
  };
};

export default useThemeEvents;