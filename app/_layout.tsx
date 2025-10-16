import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme, Platform } from 'react-native';

import Colors from '../constants/Colors';

const TabLayout: React.FC = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // Handle tab press with haptic feedback
  const handleTabPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          let tabTitle: string;

          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
            tabTitle = 'Home';
          } else if (route.name === 'training') {
            iconName = focused ? 'barbell' : 'barbell-outline';
            tabTitle = 'Training';
          } else if (route.name === 'progress') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
            tabTitle = 'Progress';
          } else if (route.name === 'nutrition') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
            tabTitle = 'Nutrition';
          } else {
            iconName = 'ellipse';
            tabTitle = 'Tab';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              accessibilityLabel={`${tabTitle} tab`}
              accessibilityHint={focused ? `Currently on ${tabTitle} screen` : `Navigate to ${tabTitle}`}
              accessibilityRole="tab"
            />
          );
        },
        tabBarActiveTintColor: colors.tabIconActive,
        tabBarInactiveTintColor: colors.tabIcon,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: Platform.select({
            ios: 88,
            android: 80,
            default: 80
          }),
          paddingBottom: Platform.select({
            ios: 20,
            android: 10,
            default: 10
          }),
          paddingTop: 8,
          borderTopWidth: 1,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
          textAlign: 'center',
        },
        headerShown: false,
        // Add tab press listener for haptic feedback
        tabPress: () => {
          handleTabPress();
        },
      })}
    >
      {/* Main 4 tabs */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home'
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Training'
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress'
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition'
        }}
      />
      
      {/* Hidden tabs - accessible but not shown in tab bar */}
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarButton: () => null,
          href: '/analytics',
        }}
      />
      <Tabs.Screen
        name="exercise-form"
        options={{
          title: 'Exercise Form',
          tabBarButton: () => null,
          href: '/exercise-form',
        }}
      />
      <Tabs.Screen
        name="mental"
        options={{
          title: 'Mental Fitness',
          tabBarButton: () => null,
          href: '/mental',
        }}
      />
      <Tabs.Screen
        name="recovery"
        options={{
          title: 'Recovery',
          tabBarButton: () => null,
          href: '/recovery',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarButton: () => null,
          href: '/settings',
        }}
      />
      <Tabs.Screen
        name="workout-history"
        options={{
          title: 'Workout History',
          tabBarButton: () => null,
          href: '/workout-history',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;