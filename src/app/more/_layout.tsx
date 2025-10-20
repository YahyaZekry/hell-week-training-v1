import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from '../../constants/Colors';
import navigationAnimationService from '../../services/navigationAnimationService';

export default function MoreLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get animation configurations
  const moreStackConfig = navigationAnimationService.getMoreStackConfig();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 17,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
        // Enhanced animation configuration
        gestureEnabled: true,
        animation: 'slide_from_right',
        animationDuration: moreStackConfig.transitionSpec.open.config.duration,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'More',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          headerShown: true,
          ...moreStackConfig,
        }}
      />
      <Stack.Screen
        name="workout-history"
        options={{
          title: 'Workout History',
          headerShown: true,
          ...moreStackConfig,
        }}
      />
      <Stack.Screen
        name="mental"
        options={{
          title: 'Mental Fitness',
          headerShown: true,
          ...moreStackConfig,
        }}
      />
      <Stack.Screen
        name="recovery"
        options={{
          title: 'Recovery',
          headerShown: true,
          ...moreStackConfig,
        }}
      />
      <Stack.Screen
        name="exercise-form"
        options={{
          title: 'Exercise Form',
          headerShown: true,
          ...moreStackConfig,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: true,
          ...moreStackConfig,
        }}
      />
    </Stack>
  );
}