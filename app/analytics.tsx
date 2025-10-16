import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';

const AnalyticsLayout: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Analytics',
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AnalyticsLayout;