import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

const TrainingLayout: React.FC = () => {
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
        }}
      />
      <Stack.Screen
        name="checklists"
        options={{
          title: 'Checklists',
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default TrainingLayout;