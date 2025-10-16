import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity , useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../constants/Colors';

const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const menuItems = [
    { 
      title: 'Training', 
      icon: '🏋️', 
      route: '/training',
      description: 'Workout plans and exercises'
    },
    { 
      title: 'Progress', 
      icon: '📊', 
      route: '/progress',
      description: 'Track your fitness journey'
    },
    { 
      title: 'Nutrition', 
      icon: '🥗', 
      route: '/nutrition',
      description: 'Meal plans and nutrition guide'
    },
    { 
      title: 'Analytics', 
      icon: '📈', 
      route: '/analytics',
      description: 'Performance analytics'
    },
    { 
      title: 'Mental Fitness', 
      icon: '🧠', 
      route: '/mental',
      description: 'Mental toughness training'
    },
    { 
      title: 'Recovery', 
      icon: '💤', 
      route: '/recovery',
      description: 'Recovery techniques and tips'
    },
    { 
      title: 'Settings', 
      icon: '⚙️', 
      route: '/settings',
      description: 'App settings and preferences'
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Hell Week Training
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Push Your Limits
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  shadowColor: colors.shadow
                }
              ]}
              onPress={() => router.push(item.route as any)}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={[styles.menuTitle, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.menuDescription, { color: colors.textSecondary }]}>
                {item.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
  menuItem: {
    width: '44%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    margin: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default HomeScreen;