import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { SimpleBackground } from '../components/ui/SimpleBackground';
import { ThemeProvider, useTheme } from '../providers';

function TabLayoutContent() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border.light,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 88 : 68,
          shadowColor: theme.colors.text.primary,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        sceneStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
              accessibilityRole="image"
              accessibilityLabel={
                focused ? 'Home tab, currently active' : 'Home tab'
              }
              accessibilityHint="Navigate to the home screen with overview and quick actions. Double tap to activate."
            />
          ),
          sceneStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      {/* Training Tab */}
      <Tabs.Screen
        name="training"
        options={{
          title: 'Training',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'fitness' : 'fitness-outline'}
              size={24}
              color={color}
              accessibilityRole="image"
              accessibilityLabel={
                focused ? 'Training tab, currently active' : 'Training tab'
              }
              accessibilityHint="Navigate to training programs and workouts. Double tap to activate."
            />
          ),
          sceneStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      {/* Progress Tab */}
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              size={24}
              color={color}
              accessibilityRole="image"
              accessibilityLabel={
                focused ? 'Progress tab, currently active' : 'Progress tab'
              }
              accessibilityHint="Navigate to track your fitness progress and achievements. Double tap to activate."
            />
          ),
          sceneStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      {/* Nutrition Tab */}
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'restaurant' : 'restaurant-outline'}
              size={24}
              color={color}
              accessibilityRole="image"
              accessibilityLabel={
                focused ? 'Nutrition tab, currently active' : 'Nutrition tab'
              }
              accessibilityHint="Navigate to meal planning and nutrition tracking. Double tap to activate."
            />
          ),
          sceneStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      {/* More Tab */}
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'apps' : 'apps-outline'}
              size={24}
              color={color}
              accessibilityRole="image"
              accessibilityLabel={
                focused ? 'More tab, currently active' : 'More tab'
              }
              accessibilityHint="Navigate to additional features including analytics, recovery, and settings. Double tap to activate."
            />
          ),
          sceneStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <ThemeProvider>
      <SimpleBackground>
        <TabLayoutContent />
      </SimpleBackground>
    </ThemeProvider>
  );
}
