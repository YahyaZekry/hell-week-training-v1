import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';

interface WorkoutHistoryItem {
  id: string;
  date: string;
  type: string;
  duration: number;
  calories: number;
  exercises: number;
  intensity: 'low' | 'medium' | 'high';
}

const WorkoutHistoryScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const workoutHistory: WorkoutHistoryItem[] = [
    {
      id: '1',
      date: '2024-01-21',
      type: 'Strength Training',
      duration: 45,
      calories: 320,
      exercises: 8,
      intensity: 'high',
    },
    {
      id: '2',
      date: '2024-01-20',
      type: 'Cardio',
      duration: 30,
      calories: 250,
      exercises: 1,
      intensity: 'medium',
    },
    {
      id: '3',
      date: '2024-01-19',
      type: 'HIIT',
      duration: 25,
      calories: 280,
      exercises: 6,
      intensity: 'high',
    },
    {
      id: '4',
      date: '2024-01-18',
      type: 'Yoga & Stretching',
      duration: 40,
      calories: 150,
      exercises: 12,
      intensity: 'low',
    },
    {
      id: '5',
      date: '2024-01-17',
      type: 'Strength Training',
      duration: 50,
      calories: 350,
      exercises: 9,
      intensity: 'high',
    },
  ];

  const stats = {
    totalWorkouts: workoutHistory.length,
    totalDuration: workoutHistory.reduce((sum, workout) => sum + workout.duration, 0),
    totalCalories: workoutHistory.reduce((sum, workout) => sum + workout.calories, 0),
    averageIntensity: workoutHistory.filter(w => w.intensity === 'high').length,
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return colors.error;
      case 'medium': return colors.accent;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getIntensityIcon = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'flame';
      case 'medium': return 'flash';
      case 'low': return 'leaf';
      default: return 'help';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const WorkoutHistoryCard: React.FC<{ workout: WorkoutHistoryItem }> = ({ workout }) => (
    <View style={[
      styles.workoutCard, 
      { 
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }
    ]}>
      <View style={styles.workoutHeader}>
        <View style={styles.workoutDateContainer}>
          <Text style={[styles.workoutDate, { color: colors.text }]}>
            {formatDate(workout.date)}
          </Text>
          <Text style={[styles.workoutType, { color: colors.textSecondary }]}>
            {workout.type}
          </Text>
        </View>
        <View style={[
          styles.intensityBadge, 
          { backgroundColor: getIntensityColor(workout.intensity) + '20' }
        ]}>
          <Ionicons 
            name={getIntensityIcon(workout.intensity) as keyof typeof Ionicons.glyphMap} 
            size={16} 
            color={getIntensityColor(workout.intensity)} 
          />
          <Text style={[
            styles.intensityText, 
            { color: getIntensityColor(workout.intensity) }
          ]}>
            {workout.intensity.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <View style={styles.workoutStats}>
        <View style={styles.statItem}>
          <Ionicons name="time" size={16} color={colors.textSecondary} />
          <Text style={[styles.statText, { color: colors.text }]}>
            {workout.duration} min
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="flash" size={16} color={colors.textSecondary} />
          <Text style={[styles.statText, { color: colors.text }]}>
            {workout.calories} cal
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="fitness" size={16} color={colors.textSecondary} />
          <Text style={[styles.statText, { color: colors.text }]}>
            {workout.exercises} ex
          </Text>
        </View>
      </View>
    </View>
  );

  const StatCard: React.FC<{ 
    title: string; 
    value: string | number; 
    icon: keyof typeof Ionicons.glyphMap;
  }> = ({ title, value, icon }) => (
    <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
      <Ionicons name={icon} size={24} color={colors.primary} />
      <Text style={[styles.statTitle, { color: colors.textSecondary }]}>{title}</Text>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Workout History</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Track your training journey
          </Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard 
              title="Total Workouts" 
              value={stats.totalWorkouts} 
              icon="fitness"
            />
            <StatCard 
              title="Total Duration" 
              value={`${stats.totalDuration} min`} 
              icon="time"
            />
            <StatCard 
              title="Calories Burned" 
              value={stats.totalCalories.toLocaleString()} 
              icon="flash"
            />
            <StatCard 
              title="High Intensity" 
              value={`${stats.averageIntensity} workouts`} 
              icon="flame"
            />
          </View>
        </View>

        {/* Workout History List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Workouts</Text>
          {workoutHistory.map((workout) => (
            <WorkoutHistoryCard key={workout.id} workout={workout} />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Filter workout history"
            accessibilityHint="Filter workouts by type or date"
          >
            <Ionicons name="filter" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Filter Workouts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonOutline, { backgroundColor: colors.surface, borderColor: colors.primary }]}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Export workout data"
            accessibilityHint="Download your workout history"
          >
            <Ionicons name="download" size={20} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>Export Data</Text>
          </TouchableOpacity>
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
  },
  workoutCard: {
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
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutDateContainer: {
    flex: 1,
  },
  workoutDate: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  workoutType: {
    fontSize: 14,
    fontWeight: '400',
  },
  intensityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  intensityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  actionButtonOutline: {
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default WorkoutHistoryScreen;