import React, { ReactNode, useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, TextStyle, ViewStyle, ActivityIndicator } from 'react-native';

import { useTheme } from '../../providers';

interface ThemedButtonProps {
  children: ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size: _size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const buttonStyle = useMemo(() => [
    styles.button,
    {
      backgroundColor: getBackgroundColor(theme, variant, disabled),
      borderColor: getBorderColor(theme, variant, disabled),
      borderWidth: variant === 'outline' ? 1 : 0,
    },
    disabled && styles.disabled,
    style,
  ], [theme, variant, disabled, style]);

  const buttonTextStyle = useMemo(() => [
    styles.text,
    {
      color: getTextColor(theme, variant, disabled),
    },
    disabled && styles.disabledText,
    textStyle,
  ], [theme, variant, disabled, textStyle]);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={getTextColor(theme, variant, disabled)} 
        />
      ) : (
        <Text style={buttonTextStyle}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const getBackgroundColor = (theme: any, variant: string, disabled: boolean) => {
  if (disabled) return theme.colors.interactive.disabled;
  
  switch (variant) {
    case 'primary':
      return theme.colors.primary[500];
    case 'secondary':
      return theme.colors.secondary[500];
    case 'outline':
      return 'transparent';
    default:
      return theme.colors.primary[500];
  }
};

const getBorderColor = (theme: any, variant: string, disabled: boolean) => {
  if (disabled) return theme.colors.interactive.disabled;
  
  switch (variant) {
    case 'primary':
      return theme.colors.primary[500];
    case 'secondary':
      return theme.colors.secondary[500];
    case 'outline':
      return theme.colors.primary[500];
    default:
      return theme.colors.primary[500];
  }
};

const getTextColor = (theme: any, variant: string, disabled: boolean) => {
  if (disabled) return theme.colors.text.secondary;
  
  switch (variant) {
    case 'primary':
    case 'secondary':
      return theme.colors.text.inverse;
    case 'outline':
      return theme.colors.primary[500];
    default:
      return theme.colors.text.inverse;
  }
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledText: {},
});