import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity , useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../../constants/Colors';

const TrainingScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const trainingModules = [
    {
      title: 'Training Schedule',
      description: 'View your weekly training plan',
      icon: '📅',
      route: '/training/schedule',
    },
    {
      title: 'Preparation',
      description: 'Get ready for your workouts',
      icon: '🎯',
      route: '/training/preparation',
    },
    {
      title: 'Checklists',
      description: 'Track your training progress',
      icon: '✅',
      route: '/training/checklists',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Training</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Build your strength and endurance
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.modulesContainer}>
          {trainingModules.map((module, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.moduleCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  shadowColor: colors.shadow,
                },
              ]}
              onPress={() => router.push(module.route as any)}
            >
              <Text style={styles.moduleIcon}>{module.icon}</Text>
              <Text style={[styles.moduleTitle, { color: colors.text }]}>
                {module.title}
              </Text>
              <Text style={[styles.moduleDescription, { color: colors.textSecondary }]}>
                {module.description}
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
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  modulesContainer: {
    paddingBottom: 20,
  },
  moduleCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moduleIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  moduleDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default TrainingScreen;