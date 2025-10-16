import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';

import audioService from '../services/audioService';
import hapticService from '../services/hapticService';
import settingsService from '../services/settingsService';
import visualEffectsService from '../services/visualEffectsService';
import workoutService, { ActiveWorkout, WorkoutCallback, Exercise } from '../services/workoutService';
import { Workout } from '../types';

const { width, height } = Dimensions.get('window');

type WorkoutTimerScreenProps = NativeStackScreenProps<any, 'WorkoutTimer'>;

interface DynamicStyles {
  container: { backgroundColor: string };
  headerTitle: { color: string };
  timerText: { color: string };
  timerLabel: { color: string };
  exerciseName: { color: string };
  exerciseType: { color: string };
  detailText: { color: string };
  progressText: { color: string };
}

const WorkoutTimerScreen: React.FC<WorkoutTimerScreenProps> = ({ route, navigation }) => {
  const { workoutId } = route.params || {};
  const [workout, setWorkout] = useState<ActiveWorkout | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);
  const [completedWorkout, setCompletedWorkout] = useState<any>(null);
  const [servicesInitialized, setServicesInitialized] = useState<boolean>(false);
  
  // Animation values
  const progressAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const countdownAnim = useRef(new Animated.Value(1)).current;
  const achievementAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    initializeServices();
    return () => {
      cleanupServices();
    };
  }, []);

  useEffect(() => {
    if (servicesInitialized) {
      initializeWorkout();
    }
  }, [servicesInitialized]);

  useEffect(() => {
    if (workout && !workout.completed && servicesInitialized) {
      updateAnimations();
      handleWorkoutEvents();
    }
  }, [workout, servicesInitialized]);

  const initializeServices = async (): Promise<void> => {
    try {
      // Initialize all immersive services
      await audioService.initialize();
      await visualEffectsService.initialize();
      
      setServicesInitialized(true);
    } catch (error) {
      console.error('Failed to initialize services:', error);
    }
  };

  const cleanupServices = async (): Promise<void> => {
    try {
      await audioService.cleanup();
      await visualEffectsService.cleanup();
      workoutService.cleanup();
    } catch (error) {
      console.error('Failed to cleanup services:', error);
    }
  };

  const initializeWorkout = async (): Promise<void> => {
    try {
      await workoutService.initialize();
      
      if (workoutId) {
        const startedWorkout = await workoutService.startWorkout(workoutId, (updatedWorkout: ActiveWorkout) => {
          setWorkout({ ...updatedWorkout });
        });
        setWorkout(startedWorkout);
        setIsInitialized(true);
        
        // Start background music
        await audioService.startBackgroundMusic('motivational');
        
        // Play workout start voice command
        await audioService.playVoiceCommand('workout_start');
        await hapticService.triggerHaptic('success');
      }
    } catch (error) {
      console.error('Failed to initialize workout:', error);
      Alert.alert('Error', 'Failed to start workout. Please try again.');
      navigation.goBack();
    }
  };

  const updateAnimations = (): void => {
    if (!workout || !visualEffectsService.areEffectsEnabled()) return;

    const settings = settingsService.getSettings();
    
    // Progress animation
    const currentExercise = workout.exercises[workout.currentExerciseIndex];
    const totalTime = workout.isResting ? currentExercise.restTime : currentExercise.duration;
    if (!totalTime) return;
    const progress = workout.timeRemaining / totalTime;
    
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Enhanced pulse animation for rest periods
    if (workout.isResting && settings.pulseEffects) {
      const pulseAnimation = visualEffectsService.createPulseAnimation('normal');
      pulseAnimation.start();
    } else {
      pulseAnim.setValue(1);
    }

    // Countdown animation for last 10 seconds
    if (workout.timeRemaining <= 10 && workout.timeRemaining > 0) {
      // Countdown animation handled by visual effects service
      visualEffectsService.createCountdownAnimation(workout.timeRemaining);
    }
  };

  const handleWorkoutEvents = async (): Promise<void> => {
    if (!workout) return;

    const currentExercise = getCurrentExercise();
    const previousExercise = workout.exercises[workout.currentExerciseIndex - 1];
    
    // Handle exercise transitions
    if (previousExercise && currentExercise) {
      await handleExerciseTransition(previousExercise, currentExercise);
    }

    // Handle countdown warnings
    if (workout.timeRemaining <= 10 && workout.timeRemaining > 0) {
      await handleCountdownWarning(workout.timeRemaining);
    }

    // Handle exercise completion
    if (workout.timeRemaining === 0) {
      await handleExerciseCompletion(currentExercise);
    }
  };

  const handleExerciseTransition = async (previousExercise: any, currentExercise: any): Promise<void> => {
    const settings = settingsService.getSettings();
    
    if (workout && workout.isResting) {
      // Starting exercise after rest
      await audioService.playVoiceCommand('exercise_start');
      await hapticService.triggerHaptic('notification');
      
      if (settings.transitionAnimations) {
        // Slide animation handled by visual effects service
        visualEffectsService.createSlideInAnimation();
      }
    } else {
      // Starting rest period
      await audioService.playVoiceCommand('rest_start');
      await hapticService.triggerHaptic('impactLight');
      
      if (settings.transitionAnimations) {
        const fadeAnimation = visualEffectsService.createFadeInAnimation('normal');
        fadeAnimation.start();
      }
    }
  };

  const handleCountdownWarning = async (seconds: number): Promise<void> => {
    const settings = settingsService.getSettings();
    
    if (settings.countdownWarnings && seconds <= 5) {
      await audioService.playVoiceCommand('warning', `${seconds}!`);
      await hapticService.triggerHaptic('impactLight');
      
      if (settings.visualEffects) {
        const shakeAnimation = visualEffectsService.createShakeAnimation('fast');
        shakeAnimation.start();
      }
    }
  };

  const handleExerciseCompletion = async (exercise: Exercise | null): Promise<void> => {
    if (!exercise) return;
    
    await audioService.playVoiceCommand('exercise_complete');
    await hapticService.triggerHaptic('notification');
    
    if (settingsService.getSettings().visualEffects) {
      const achievementAnimation = visualEffectsService.createAchievementAnimation();
      achievementAnimation.start();
    }
  };

  const handlePauseResume = async (): Promise<void> => {
    if (workout && workout.isPaused) {
      await workoutService.resumeWorkout();
      await audioService.playVoiceCommand('workout_resume');
      await hapticService.triggerHaptic('notification');
    } else {
      await workoutService.pauseWorkout();
      await audioService.playVoiceCommand('workout_pause');
      await hapticService.triggerHaptic('impactLight');
    }
  };

  const handleSkip = (): void => {
    Alert.alert(
      'Skip Exercise',
      'Are you sure you want to skip this exercise?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: async () => {
            await audioService.playVoiceCommand('exercise_skip');
            await hapticService.triggerHaptic('notification');
            workoutService.skipExercise();
          },
        },
      ]
    );
  };

  const handleStop = (): void => {
    Alert.alert(
      'Stop Workout',
      'Are you sure you want to stop this workout? Your progress will be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Stop',
          style: 'destructive',
          onPress: async () => {
            const completed = await workoutService.completeWorkout();
            handleWorkoutComplete(completed);
          },
        },
      ]
    );
  };

  const handleWorkoutComplete = async (completed: any): Promise<void> => {
    // Play completion celebration
    await audioService.playVoiceCommand('workout_complete');
    await audioService.playSoundEffect('completion');
    await hapticService.triggerHaptic('notification');
    
    // Show achievement animation
    if (settingsService.getSettings().visualEffects) {
      const achievementAnimation = visualEffectsService.createAchievementAnimation();
      achievementAnimation.start();
    }
    
    setCompletedWorkout(completed);
    setShowCompleteModal(true);
  };

  const handleCloseCompleteModal = (): void => {
    setShowCompleteModal(false);
    navigation.navigate('Training');
  };

  const getCurrentExercise = (): any => {
    if (!workout || workout.currentExerciseIndex >= workout.exercises.length) {
      return null;
    }
    return workout.exercises[workout.currentExerciseIndex];
  };

  const formatTime = (seconds: number): string => {
    return workoutService.formatTime(seconds);
  };

  const getProgressColor = (): string => {
    const colors = visualEffectsService.getStyleColors();
    if (!workout) return colors.success;
    if (workout.isResting) return colors.warning;
    if (workout.timeRemaining <= 10) return colors.accent;
    return colors.success;
  };

  const getProgressWidth = (): string => {
    if (!workout) return '100%';
    const currentExercise = getCurrentExercise();
    if (!currentExercise) return '100%';
    
    const totalTime = workout.isResting ? currentExercise.restTime : currentExercise.duration;
    if (!totalTime) return '0%';
    const progress = ((totalTime - workout.timeRemaining) / totalTime) * 100;
    return `${progress}%`;
  };

  if (!isInitialized || !workout) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading workout...</Text>
      </View>
    );
  }

  const currentExercise = getCurrentExercise();
  const isRestPeriod = workout.isResting;

  // Get dynamic styles based on training style
  const getDynamicStyles = (): DynamicStyles => {
    const colors = visualEffectsService.getStyleColors();
    return {
      container: { backgroundColor: colors.primary },
      headerTitle: { color: colors.text },
      timerText: { color: colors.text },
      timerLabel: { color: colors.text },
      exerciseName: { color: colors.text },
      exerciseType: { color: colors.accent },
      detailText: { color: colors.text },
      progressText: { color: colors.text },
    };
  };

  const dynamicStyles = getDynamicStyles();

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={dynamicStyles.headerTitle.color} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{workout.name}</Text>
        <TouchableOpacity onPress={handleStop} style={styles.stopButton}>
          <Ionicons name="stop" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              {
                width: parseInt(getProgressWidth()),
                backgroundColor: getProgressColor()
              }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Exercise {workout.currentExerciseIndex + 1} of {workout.exercises.length}
          {currentExercise && ` • Set ${workout.currentSet} of ${currentExercise.sets}`}
        </Text>
      </View>

      {/* Main Timer Display */}
      <View style={styles.timerContainer}>
        <Animated.View style={[
          styles.timerCircle,
          { transform: [{ scale: pulseAnim }] }
        ]}>
          <Animated.View style={[
            styles.timerInner,
            { borderColor: getProgressColor() }
          ]}>
            <Animated.Text style={[
              styles.timerText,
              dynamicStyles.timerText
            ]}>
              {formatTime(workout.timeRemaining)}
            </Animated.Text>
            <Text style={[styles.timerLabel, dynamicStyles.timerLabel]}>
              {isRestPeriod ? 'REST' : currentExercise?.name?.toUpperCase()}
            </Text>
          </Animated.View>
        </Animated.View>
      </View>

      {/* Exercise Info */}
      <ScrollView style={styles.exerciseInfo} showsVerticalScrollIndicator={false}>
        <Animated.View style={styles.exerciseCard}>
          <Text style={[styles.exerciseName, dynamicStyles.exerciseName]}>
            {currentExercise?.name}
          </Text>
          <Text style={[styles.exerciseType, dynamicStyles.exerciseType]}>
            {currentExercise?.type?.toUpperCase()}
          </Text>
          
          <View style={styles.exerciseDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="repeat" size={20} color={visualEffectsService.getStyleColors().success} />
              <Text style={[styles.detailText, dynamicStyles.detailText]}>
                {isRestPeriod
                  ? `Rest: ${formatTime(currentExercise?.restTime || 0)}`
                  : currentExercise?.reps || 'max'
                }
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Ionicons name="layers" size={20} color={visualEffectsService.getStyleColors().accent} />
              <Text style={[styles.detailText, dynamicStyles.detailText]}>
                Set {workout.currentSet} of {currentExercise?.sets}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Ionicons name="time" size={20} color={visualEffectsService.getStyleColors().warning} />
              <Text style={[styles.detailText, dynamicStyles.detailText]}>
                Duration: {formatTime(currentExercise?.duration || 0)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.instructionsButton}
            onPress={() => setShowInstructions(true)}
          >
            <Ionicons name="information-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.instructionsButtonText}>View Instructions</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Control Buttons */}
        <Animated.View style={styles.controlButtons}>
          <TouchableOpacity
            style={[styles.controlButton, styles.pauseButton]}
            onPress={handlePauseResume}
          >
            <Ionicons
              name={workout.isPaused ? "play" : "pause"}
              size={30}
              color="#FFFFFF"
            />
            <Text style={styles.controlButtonText}>
              {workout.isPaused ? 'RESUME' : 'PAUSE'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.skipButton]}
            onPress={handleSkip}
          >
            <Ionicons name="play-forward" size={30} color="#FFFFFF" />
            <Text style={styles.controlButtonText}>SKIP</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Instructions Modal */}
      <Modal
        visible={showInstructions}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowInstructions(false)}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Exercise Instructions</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalExerciseName}>{currentExercise?.name}</Text>
            <Text style={styles.modalInstructions}>
              {currentExercise?.instructions || 'No instructions available.'}
            </Text>
          </ScrollView>
        </View>
      </Modal>

      {/* Workout Complete Modal */}
      <Modal
        visible={showCompleteModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.completeModalOverlay}>
          <Animated.View style={styles.completeModal}>
            <Ionicons name="trophy" size={60} color="#FFD700" />
            <Text style={styles.completeTitle}>Workout Complete!</Text>
            
            {completedWorkout && (
              <View style={styles.completeStats}>
                <Text style={styles.completeStat}>
                  Duration: {formatTime(completedWorkout.duration)}
                </Text>
                <Text style={styles.completeStat}>
                  Exercises: {completedWorkout.completedCount}/{completedWorkout.totalExercises}
                </Text>
              </View>
            )}
            
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleCloseCompleteModal}
            >
              <Text style={styles.completeButtonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
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
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stopButton: {
    padding: 10,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.35,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timerLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  exerciseInfo: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exerciseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  exerciseType: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 15,
  },
  exerciseDetails: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  instructionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 15,
  },
  instructionsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 20,
    minWidth: 120,
  },
  pauseButton: {
    backgroundColor: '#4CAF50',
  },
  skipButton: {
    backgroundColor: '#FF9800',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalExerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  modalInstructions: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
  },
  completeModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeModal: {
    backgroundColor: '#1E2A47',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    minWidth: 300,
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 20,
  },
  completeStats: {
    alignItems: 'center',
    marginBottom: 30,
  },
  completeStat: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 15,
    minWidth: 150,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkoutTimerScreen;