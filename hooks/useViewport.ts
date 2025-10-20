/**
 * Viewport Hook for Responsive Design
 * Hell Week Training App
 */

import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

import { breakpoints } from '../utils/breakpoints';

export interface ViewportSize {
  width: number;
  height: number;
}

export interface ViewportInfo extends ViewportSize {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isExtraLarge: boolean;
  orientation: 'portrait' | 'landscape';
}

export const useViewport = (): ViewportInfo => {
  const [dimensions, setDimensions] = useState<ViewportSize>(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  const orientation: 'portrait' | 'landscape' = 
    dimensions.height > dimensions.width ? 'portrait' : 'landscape';

  return {
    ...dimensions,
    isSmall: dimensions.width < breakpoints.md,
    isMedium: dimensions.width >= breakpoints.md && dimensions.width < breakpoints.lg,
    isLarge: dimensions.width >= breakpoints.lg && dimensions.width < breakpoints.xl,
    isExtraLarge: dimensions.width >= breakpoints.xl,
    orientation,
  };
};

export default useViewport;