import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';

interface MentalExercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'meditation' | 'breathing' | 'visualization' | 'focus';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const MentalFitnessScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const mentalExercises: MentalExercise[] = [
    {
      id: '1',
      title: 'Mindful Breathing',
      description: 'Focus on your breath to center yourself',
      duration: '5 min',
      type: 'breathing',
      difficulty: 'beginner',
    },
    {
      id: '2',
      title: 'Body Scan Meditation',
      description: 'Progressive relaxation through body awareness',
      duration: '10 min',
      type: 'meditation',
      difficulty: 'beginner',
    },
    {
      id: '3',
      title: 'Performance Visualization',
      description: 'Mental rehearsal of training success',
      duration: '15 min',
      type: 'visualization',
      difficulty: 'intermediate',
    },
    {
      id: '4',
      title: 'Concentration Training',
      description: 'Build mental focus and clarity',
      duration: '8 min',
      type: 'focus',
      difficulty: 'intermediate',
    },
    {
      id: '5',
      title: 'Stress Release Meditation',
      description: 'Release tension and anxiety',
      duration: '12 min',
      type: 'meditation',
      difficulty: 'beginner',
    },
    {
      id: '6',
      title: 'Goal Setting Visualization',
      description: 'Mentally prepare for challenges ahead',
      duration: '20 min',
      type: 'visualization',
      difficulty: 'advanced',
    },
  ];

  const stats = {
    totalSessions: 24,
    totalMinutes: 180,
    currentStreak: 5,
    favoriteExercise: 'Mindful Breathing',
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return colors.success;
      case 'intermediate': return colors.accent;
      case 'advanced': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const MentalExerciseCard: React.FC<{ exercise: MentalExercise }> = ({ exercise }) => (
    <TouchableOpacity
      style={[
        styles.exerciseCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }
      ]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Start ${exercise.title}`}
      accessibilityHint={`${exercise.duration} ${exercise.description}`}
    >
      <View style={styles.exerciseHeader}>
        <View style={[
          styles.exerciseIcon, 
          { backgroundColor: colors.primary + '20' }
        ]}>
          <Text style={[styles.exerciseIconText, { color: colors.primary }]}>
            {exercise.type.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.exerciseInfo}>
          <Text style={[styles.exerciseTitle, { color: colors.text }]}>
            {exercise.title}
          </Text>
          <Text style={[styles.exerciseDescription, { color: colors.textSecondary }]}>
            {exercise.description}
          </Text>
        </View>
        <View style={[
          styles.difficultyBadge,
          { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }
        ]}>
          <Text style={[
            styles.difficultyText,
            { color: getDifficultyColor(exercise.difficulty) }
          ]}>
            {exercise.difficulty.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>
      
      <View style={styles.exerciseFooter}>
        <View style={styles.exerciseMeta}>
          <Text style={[styles.exerciseDuration, { color: colors.textSecondary }]}>
            {exercise.duration}
          </Text>
          <Text style={[styles.exerciseType, { color: colors.textSecondary }]}>
            {exercise.type.charAt(0).toUpperCase() + exercise.type.slice(1)}
          </Text>
        </View>
        <Text style={[styles.startButton, { color: colors.primary }]}>
          Start →
        </Text>
      </View>
    </TouchableOpacity>
  );

  const StatCard: React.FC<{ 
    title: string; 
    value: string | number; 
    subtitle?: string;
  }> = ({ title, value, subtitle }) => (
    <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
      <Text style={[styles.statTitle, { color: colors.textSecondary }]}>{title}</Text>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      {subtitle && (
        <Text style={[styles.statSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Mental Fitness</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Strengthen your mind for peak performance
          </Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <StatCard 
              title="Total Sessions" 
              value={stats.totalSessions} 
              subtitle="This month"
            />
            <StatCard 
              title="Total Minutes" 
              value={stats.totalMinutes} 
              subtitle="Completed"
            />
            <StatCard 
              title="Current Streak" 
              value={`${stats.currentStreak} days`} 
              subtitle="Keep it up!"
            />
            <StatCard 
              title="Favorite" 
              value={stats.favoriteExercise} 
              subtitle="Most practiced"
            />
          </View>
        </View>

        {/* Daily Recommendation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today&apos;s Recommendation</Text>
          <View style={[
            styles.recommendationCard,
            { backgroundColor: colors.primary + '10', borderColor: colors.primary }
          ]}>
            <Text style={[styles.recommendationTitle, { color: colors.text }]}>
              Morning Mindfulness
            </Text>
            <Text style={[styles.recommendationDescription, { color: colors.textSecondary }]}>
              Start your day with 5 minutes of mindful breathing to enhance focus and reduce stress.
            </Text>
            <TouchableOpacity 
              style={[
                styles.recommendationButton,
                { backgroundColor: colors.primary }
              ]}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Start recommended exercise"
            >
              <Text style={styles.recommendationButtonText}>Start Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mental Exercises */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Mental Exercises</Text>
          {mentalExercises.map((exercise) => (
            <MentalExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </View>

        {/* Quick Tips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Tips</Text>
          <View style={[styles.tipsContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.tipText, { color: colors.text }]}>
              💡 Practice mental exercises at the same time each day to build consistency.
            </Text>
            <Text style={[styles.tipText, { color: colors.text }]}>
              🧠 Start with shorter sessions and gradually increase duration.
            </Text>
            <Text style={[styles.tipText, { color: colors.text }]}>
              🎯 Combine different exercise types for comprehensive mental training.
            </Text>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 10,
    fontWeight: '400',
  },
  recommendationCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  recommendationDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  recommendationButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  recommendationButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  exerciseCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  exerciseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseIconText: {
    fontSize: 16,
    fontWeight: '700',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  difficultyBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  exerciseDuration: {
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseType: {
    fontSize: 12,
    fontWeight: '500',
  },
  startButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  tipsContainer: {
    padding: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default MentalFitnessScreen;