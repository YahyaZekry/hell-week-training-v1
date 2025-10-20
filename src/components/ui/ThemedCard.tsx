import React, { ReactNode, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../providers';

interface ThemedCardProps {
  children: ReactNode;
  style?: ViewStyle;
  shadow?: boolean;
  bordered?: boolean;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  style,
  shadow = true,
  bordered = true,
}) => {
  const { theme } = useTheme();

  const cardStyle = useMemo(() => [
    styles.card,
    {
      backgroundColor: theme.colors.surface,
      borderColor: bordered ? theme.colors.border.light : 'transparent',
      borderWidth: bordered ? 1 : 0,
      shadowColor: shadow ? theme.colors.text.primary : 'transparent',
      shadowOffset: shadow ? { width: 0, height: 2 } : { width: 0, height: 0 },
      shadowOpacity: shadow ? 0.1 : 0,
      shadowRadius: shadow ? 4 : 0,
      elevation: shadow ? 3 : 0,
    },
    style,
  ], [theme, shadow, bordered, style]);

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
  },
});