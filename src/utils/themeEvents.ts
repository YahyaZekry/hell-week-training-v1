/**
 * Theme Events System
 * Hell Week Training App
 * Provides event-driven theme change notifications
 */

import { EventEmitter } from 'events';

export interface ThemeChangeEvent {
  type: 'theme-change' | 'background-change' | 'system-theme-change';
  data: {
    themeName?: string;
    consolidatedThemeName?: string;
    isDark?: boolean;
    backgroundState?: any;
    timestamp: number;
  };
}

export interface ThemeEventListener {
  (event: ThemeChangeEvent): void;
}

class ThemeEventManager extends EventEmitter {
  private static instance: ThemeEventManager;
  
  private constructor() {
    super();
    this.setMaxListeners(50); // Allow many listeners
  }
  
  public static getInstance(): ThemeEventManager {
    if (!ThemeEventManager.instance) {
      ThemeEventManager.instance = new ThemeEventManager();
    }
    return ThemeEventManager.instance;
  }
  
  // Emit theme change events
  public emitThemeChange(data: Omit<ThemeChangeEvent['data'], 'timestamp'>): void {
    const event: ThemeChangeEvent = {
      type: 'theme-change',
      data: {
        ...data,
        timestamp: Date.now(),
      },
    };
    
    this.emit('theme-change', event);
    this.emit('any-theme-event', event);
  }
  
  // Emit background change events
  public emitBackgroundChange(data: Omit<ThemeChangeEvent['data'], 'timestamp'>): void {
    const event: ThemeChangeEvent = {
      type: 'background-change',
      data: {
        ...data,
        timestamp: Date.now(),
      },
    };
    
    this.emit('background-change', event);
    this.emit('any-theme-event', event);
  }
  
  // Emit system theme change events
  public emitSystemThemeChange(data: Omit<ThemeChangeEvent['data'], 'timestamp'>): void {
    const event: ThemeChangeEvent = {
      type: 'system-theme-change',
      data: {
        ...data,
        timestamp: Date.now(),
      },
    };
    
    this.emit('system-theme-change', event);
    this.emit('any-theme-event', event);
  }
  
  // Add event listeners
  public onThemeChange(listener: ThemeEventListener): () => void {
    this.on('theme-change', listener);
    return () => this.off('theme-change', listener);
  }
  
  public onBackgroundChange(listener: ThemeEventListener): () => void {
    this.on('background-change', listener);
    return () => this.off('background-change', listener);
  }
  
  public onSystemThemeChange(listener: ThemeEventListener): () => void {
    this.on('system-theme-change', listener);
    return () => this.off('system-theme-change', listener);
  }
  
  public onAnyThemeEvent(listener: ThemeEventListener): () => void {
    this.on('any-theme-event', listener);
    return () => this.off('any-theme-event', listener);
  }
  
  // Utility methods
  public getLastEvent(_type?: ThemeChangeEvent['type']): ThemeChangeEvent | null {
    // Note: This is a simplified implementation
    // In a real app, you might want to store the last event
    return null;
  }
  
  public clearAllListeners(): void {
    this.removeAllListeners();
  }
}

// Export singleton instance
export const themeEvents = ThemeEventManager.getInstance();

// Export convenience hooks for React components
export const useThemeEvents = () => {
  const addThemeChangeListener = (listener: ThemeEventListener) => {
    return themeEvents.onThemeChange(listener);
  };
  
  const addBackgroundChangeListener = (listener: ThemeEventListener) => {
    return themeEvents.onBackgroundChange(listener);
  };
  
  const addSystemThemeChangeListener = (listener: ThemeEventListener) => {
    return themeEvents.onSystemThemeChange(listener);
  };
  
  const addAnyThemeEventListener = (listener: ThemeEventListener) => {
    return themeEvents.onAnyThemeEvent(listener);
  };
  
  return {
    addThemeChangeListener,
    addBackgroundChangeListener,
    addSystemThemeChangeListener,
    addAnyThemeEventListener,
    emitThemeChange: themeEvents.emitThemeChange.bind(themeEvents),
    emitBackgroundChange: themeEvents.emitBackgroundChange.bind(themeEvents),
    emitSystemThemeChange: themeEvents.emitSystemThemeChange.bind(themeEvents),
  };
};

export default themeEvents;