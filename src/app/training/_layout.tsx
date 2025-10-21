import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from '../../constants/Colors';
import navigationAnimationService from '../../services/navigationAnimationService';

const TrainingLayout: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Get animation configurations
  const trainingStackConfig =
    navigationAnimationService.getTrainingStackConfig();
  const preparationToChecklistConfig =
    navigationAnimationService.getPreparationToChecklistConfig();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: 'transparent',
        },
        // Enhanced animation configuration
        gestureEnabled: true,
        animation: 'slide_from_right',
        animationDuration:
          trainingStackConfig.transitionSpec.open.config.duration,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Training',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="schedule"
        options={{
          title: 'Training Schedule',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="preparation"
        options={{
          title: 'Preparation',
          headerShown: true,
          ...trainingStackConfig,
        }}
      />
      <Stack.Screen
        name="checklists"
        options={{
          title: 'Checklists',
          headerShown: true,
          ...preparationToChecklistConfig,
        }}
      />
    </Stack>
  );
};

export default TrainingLayout;
