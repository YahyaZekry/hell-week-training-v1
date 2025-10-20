import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity , useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';

type TrainingRouteType = '/training/schedule' | '/training/preparation' | '/training/checklists';

const TrainingScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const trainingModules = [
    {
      title: 'Training Schedule',
      description: 'View your weekly training plan',
      icon: '📅',
      route: '/training/schedule' as TrainingRouteType,
    },
    {
      title: 'Preparation',
      description: 'Get ready for your workouts',
      icon: '🎯',
      route: '/training/preparation' as TrainingRouteType,
    },
    {
      title: 'Checklists',
      description: 'Track your training progress',
      icon: '✅',
      route: '/training/checklists' as TrainingRouteType,
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
                },
              ]}
              onPress={() => router.push(module.route)}
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
        
        {/* Quick Links to More Tab Features */}
        <View style={styles.quickLinksSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Related Features
          </Text>
          <View style={styles.quickLinksGrid}>
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: colors.surface }]}
              onPress={() => router.push('/more/workout-history')}
            >
              <Text style={styles.quickLinkIcon}>📊</Text>
              <Text style={[styles.quickLinkText, { color: colors.text }]}>
                Workout History
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: colors.surface }]}
              onPress={() => router.push('/more/exercise-form')}
            >
              <Text style={styles.quickLinkIcon}>🎥</Text>
              <Text style={[styles.quickLinkText, { color: colors.text }]}>
                Exercise Form Guide
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: colors.surface }]}
              onPress={() => router.push('/more/analytics')}
            >
              <Text style={styles.quickLinkIcon}>📈</Text>
              <Text style={[styles.quickLinkText, { color: colors.text }]}>
                Performance Analytics
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: colors.surface }]}
              onPress={() => router.push('/more/recovery')}
            >
              <Text style={styles.quickLinkIcon}>💤</Text>
              <Text style={[styles.quickLinkText, { color: colors.text }]}>
                Recovery Techniques
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: colors.surface }]}
              onPress={() => router.push('/more/mental')}
            >
              <Text style={styles.quickLinkIcon}>🧠</Text>
              <Text style={[styles.quickLinkText, { color: colors.text }]}>
                Mental Fitness
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: colors.surface }]}
              onPress={() => router.push('/more/settings')}
            >
              <Text style={styles.quickLinkIcon}>⚙️</Text>
              <Text style={[styles.quickLinkText, { color: colors.text }]}>
                Training Settings
              </Text>
            </TouchableOpacity>
          </View>
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
    shadowColor: Colors.light.shadow,
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
  quickLinksSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickLinkCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: Colors.light.shadow,
    elevation: 3,
  },
  quickLinkIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickLinkText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default TrainingScreen;