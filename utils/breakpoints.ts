/**
 * Breakpoint Utilities for Responsive Design
 * Hell Week Training App
 */

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const mediaQueries = {
  xs: '@media (max-width: 575px)',
  sm: '@media (min-width: 576px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)',
  xxl: '@media (min-width: 1400px)',
};

export const getResponsiveValue = <T>(
  values: Partial<Record<keyof typeof breakpoints, T>>,
  width: number,
  defaultValue: T
): T => {
  // Find the largest breakpoint that fits the current width
  const sortedBreakpoints = Object.entries(breakpoints)
    .sort(([, a], [, b]) => b - a) // Sort in descending order
    .filter(([, breakpoint]) => width >= breakpoint);

  if (sortedBreakpoints.length === 0) {
    return defaultValue;
  }

  const [breakpointName] = sortedBreakpoints[0];
  
  // Check if we have a value for this breakpoint
  if (breakpointName in values && values[breakpointName as keyof typeof breakpoints] !== undefined) {
    return values[breakpointName as keyof typeof breakpoints] as T;
  }

  // Fallback to smaller breakpoints
  for (const [name] of sortedBreakpoints.slice(1)) {
    if (name in values && values[name as keyof typeof breakpoints] !== undefined) {
      return values[name as keyof typeof breakpoints] as T;
    }
  }

  return defaultValue;
};

export const getSpacing = (width: number): number => {
  return getResponsiveValue(
    {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
    },
    width,
    16
  );
};

export const getFontSize = (width: number): { small: number; medium: number; large: number } => {
  const scale = getResponsiveValue(
    {
      xs: 0.85,
      sm: 0.9,
      md: 1,
      lg: 1.1,
      xl: 1.2,
    },
    width,
    1
  );

  return {
    small: 12 * scale,
    medium: 14 * scale,
    large: 16 * scale,
  };
};

export default breakpoints;