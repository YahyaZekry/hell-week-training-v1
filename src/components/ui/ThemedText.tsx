import React, { useMemo } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

import { useTheme } from '../../providers';

interface ThemedTextProps {
  children: React.ReactNode;
  variant?: 'heading1' | 'heading2' | 'heading3' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'success' | 'warning' | 'error';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: TextStyle;
  numberOfLines?: number;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  align = 'auto',
  style,
  numberOfLines,
}) => {
  const { theme } = useTheme();

  const textStyle = useMemo(() => [
    styles.text,
    styles[variant],
    {
      color: getTextColor(theme, color),
      fontWeight: getFontWeight(weight),
      textAlign: align,
    },
    style,
  ], [theme, variant, color, weight, align, style]);

  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

const getTextColor = (theme: any, color: string) => {
  switch (color) {
    case 'primary':
      return theme.colors.text.primary;
    case 'secondary':
      return theme.colors.text.secondary;
    case 'tertiary':
      return theme.colors.text.tertiary;
    case 'inverse':
      return theme.colors.text.inverse;
    case 'success':
      return theme.colors.success[500];
    case 'warning':
      return theme.colors.warning[500];
    case 'error':
      return theme.colors.error[500];
    default:
      return theme.colors.text.primary;
  }
};

const getFontWeight = (weight: string) => {
  switch (weight) {
    case 'light':
      return '300';
    case 'normal':
      return '400';
    case 'medium':
      return '500';
    case 'semibold':
      return '600';
    case 'bold':
      return '700';
    default:
      return '400';
  }
};

const styles = StyleSheet.create({
  text: {
    // Base text styles
  },
  // eslint-disable-next-line react-native/no-unused-styles
  heading1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  heading2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  heading3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});