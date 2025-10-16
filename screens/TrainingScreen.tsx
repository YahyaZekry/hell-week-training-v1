import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';

import workoutService from '../services/workoutService';
import { Workout, WorkoutSession } from '../types';


interface Props {
  navigation: NavigationProp<any>;
}

interface WorkoutStats {
  totalWorkouts: number;
  workoutsThisWeek: number;
  averageWorkoutDuration: number;
}

const TrainingScreen: React.FC<Props> = ({ navigation }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats | null>(null);
  const [currentWorkout, setCurrentWorkout] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadData();
    
    // Check for active workout
    const activeWorkout = workoutService.getCurrentWorkout();
    if (activeWorkout) {
      setCurrentWorkout(activeWorkout);
    }
  }, []);

  const loadData = async (): Promise<void> => {
    try {
      await workoutService.initialize();
      const predefinedWorkouts = workoutService.getPredefinedWorkouts();
      const stats = workoutService.getWorkoutStats();
      
      setWorkouts(predefinedWorkouts as any[]);
      setWorkoutStats(stats);
    } catch (error) {
      console.error('Failed to load workout data:', error);
      Alert.alert('Error', 'Failed to load workout data');
    }
  };

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleStartWorkout = (workoutId: string): void => {
    // Check if there's already an active workout
    if (currentWorkout) {
      Alert.alert(
        'Active Workout',
        'You already have a workout in progress. Do you want to continue it?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Continue',
            onPress: () => navigation.navigate('WorkoutTimer'),
          },
          {
            text: 'Start New',
            style: 'destructive',
            onPress: () => {
              workoutService.cleanup();
              navigation.navigate('WorkoutTimer', { workoutId });
            },
          },
        ]
      );
    } else {
      navigation.navigate('WorkoutTimer', { workoutId });
    }
  };

  const handleContinueWorkout = (): void => {
    if (currentWorkout) {
      navigation.navigate('WorkoutTimer');
    }
  };

  const getWorkoutIcon = (type: string): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'strength':
        return 'fitness';
      case 'cardio':
        return 'pulse';
      case 'core':
        return 'body';
      case 'mental':
        return 'headset' as keyof typeof Ionicons.glyphMap;
      default:
        return 'fitness';
    }
  };

  const getWorkoutColor = (type: string): string => {
    switch (type) {
      case 'strength':
        return '#4CAF50';
      case 'cardio':
        return '#F44336';
      case 'core':
        return '#2196F3';
      case 'mental':
        return '#9C27B0';
      default:
        return '#4CAF50';
    }
  };

  const formatDuration = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
    return `${minutes}m`;
  };

  const renderWorkoutCard = (workout: Workout) => {
    const exerciseTypes = [...new Set(workout.exercises.map(ex => ex.type))];
    
    return (
      <TouchableOpacity
        key={workout.id}
        style={styles.workoutCard}
        onPress={() => handleStartWorkout(workout.id)}
      >
        <View style={styles.workoutHeader}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <View style={styles.workoutDuration}>
            <Ionicons name="time" size={16} color="#FFFFFF" />
            <Text style={styles.durationText}>{formatDuration(workout.duration)}</Text>
          </View>
        </View>
        
        <Text style={styles.workoutDescription}>{workout.description}</Text>
        
        <View style={styles.exerciseTypes}>
          {exerciseTypes.map((type, index) => (
            <View key={index} style={[styles.typeTag, { backgroundColor: getWorkoutColor(type) }]}>
              <Ionicons name={getWorkoutIcon(type)} size={14} color="#FFFFFF" />
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.workoutFooter}>
          <View style={styles.exerciseCount}>
            <Ionicons name="list" size={16} color="#FFFFFF" />
            <Text style={styles.countText}>{workout.exercises.length} exercises</Text>
          </View>
          
          <TouchableOpacity style={styles.startButton}>
            <Ionicons name="play" size={16} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Training</Text>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Active Workout Banner */}
        {currentWorkout && (
          <View style={styles.activeWorkoutBanner}>
            <View style={styles.activeWorkoutContent}>
              <View style={styles.activeWorkoutInfo}>
                <Text style={styles.activeWorkoutTitle}>Workout in Progress</Text>
                <Text style={styles.activeWorkoutName}>{currentWorkout.workoutName}</Text>
                <Text style={styles.activeWorkoutProgress}>
                  Exercise {currentWorkout.currentExerciseIndex ? currentWorkout.currentExerciseIndex + 1 : 1} of {currentWorkout.totalExercises || 0}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={handleContinueWorkout}
              >
                <Ionicons name="play" size={20} color="#FFFFFF" />
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Stats Cards */}
        {workoutStats && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{workoutStats.totalWorkouts}</Text>
              <Text style={styles.statLabel}>Total Workouts</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{workoutStats.workoutsThisWeek}</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{formatDuration(workoutStats.averageWorkoutDuration)}</Text>
              <Text style={styles.statLabel}>Avg Duration</Text>
            </View>
          </View>
        )}

        {/* Workouts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Workouts</Text>
          {workouts.map(renderWorkoutCard)}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('WorkoutHistory')}
          >
            <Ionicons name="time" size={24} color="#4CAF50" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Workout History</Text>
              <Text style={styles.actionDescription}>View your past workouts</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('Progress')}
          >
            <Ionicons name="stats-chart" size={24} color="#2196F3" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Progress Tracking</Text>
              <Text style={styles.actionDescription}>Monitor your fitness progress</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  refreshButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  activeWorkoutBanner: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  activeWorkoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeWorkoutInfo: {
    flex: 1,
  },
  activeWorkoutTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  activeWorkoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  activeWorkoutProgress: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  workoutCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  workoutDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  workoutDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 15,
  },
  exerciseTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 5,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 5,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  quickActions: {
    marginBottom: 20,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  actionContent: {
    flex: 1,
    marginLeft: 15,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  actionDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default TrainingScreen;