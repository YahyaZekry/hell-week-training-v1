import { Stack } from 'expo-router';
import React from 'react';

const SettingsLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;