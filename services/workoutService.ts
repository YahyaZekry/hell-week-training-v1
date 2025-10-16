import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Type definitions
export interface Exercise {
  id: string;
  name: string;
  type: 'strength' | 'core' | 'cardio' | 'mental';
  duration: number; // seconds
  restTime: number; // seconds
  sets: number;
  reps: string;
  instructions: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  exercises: Exercise[];
}

export interface CompletedExercise extends Exercise {
  completedAt: string;
  set: number;
  skipped?: boolean;
}

export interface ActiveWorkout extends Workout {
  startTime: string;
  currentExerciseIndex: number;
  currentSet: number;
  isResting: boolean;
  isPaused: boolean;
  timeRemaining: number;
  completedExercises: CompletedExercise[];
  totalElapsedTime: number;
  endTime?: string;
  completed?: boolean;
}

export interface WorkoutRecord {
  id: string;
  workoutId: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: number; // seconds
  completedExercises: CompletedExercise[];
  totalExercises: number;
  completedCount: number;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  totalExercises: number;
  workoutsThisWeek: number;
  averageWorkoutDuration: number;
}

export type TimerCallback = (workout: ActiveWorkout) => void;

class WorkoutService {
  private currentWorkout: ActiveWorkout | null;
  private timer: number | null;
  private timerCallback: TimerCallback | null;
  private workoutHistory: WorkoutRecord[];

  constructor() {
    this.currentWorkout = null;
    this.timer = null;
    this.timerCallback = null;
    this.workoutHistory = [];
  }

  // Initialize workout service
  async initialize(): Promise<boolean> {
    try {
      const history = await AsyncStorage.getItem('workoutHistory');
      if (history) {
        this.workoutHistory = JSON.parse(history);
      }
      return true;
    } catch (error) {
      console.error('Failed to initialize workout service:', error);
      return false;
    }
  }

  // Get predefined workouts based on Hell Week training
  getPredefinedWorkouts(): Workout[] {
    return [
      {
        id: 'hell-week-prep',
        name: 'Hell Week Preparation',
        description: 'Intense preparation for Hell Week',
        duration: 45, // minutes
        exercises: [
          {
            id: 'pushups',
            name: 'Push-ups',
            type: 'strength',
            duration: 60, // seconds
            restTime: 30,
            sets: 3,
            reps: 'max',
            instructions: 'Perform maximum push-ups with proper form. Keep your body straight and lower until chest touches ground.'
          },
          {
            id: 'situps',
            name: 'Sit-ups',
            type: 'core',
            duration: 60,
            restTime: 30,
            sets: 3,
            reps: 'max',
            instructions: 'Perform maximum sit-ups. Anchor feet and keep hands behind head or across chest.'
          },
          {
            id: 'pullups',
            name: 'Pull-ups',
            type: 'strength',
            duration: 60,
            restTime: 45,
            sets: 3,
            reps: 'max',
            instructions: 'Perform maximum pull-ups. Use full range of motion from dead hang to chin over bar.'
          },
          {
            id: 'flutter-kicks',
            name: 'Flutter Kicks',
            type: 'core',
            duration: 60,
            restTime: 30,
            sets: 3,
            reps: 'max',
            instructions: 'Lie on back, hands under glutes, and perform flutter kicks with straight legs.'
          },
          {
            id: 'burpees',
            name: 'Burpees',
            type: 'cardio',
            duration: 60,
            restTime: 45,
            sets: 3,
            reps: 'max',
            instructions: 'Perform burpees with push-up and jump. Keep continuous motion.'
          }
        ]
      },
      {
        id: 'endurance-test',
        name: 'Endurance Test',
        description: 'Test your physical limits',
        duration: 30,
        exercises: [
          {
            id: 'running',
            name: '4-Mile Run',
            type: 'cardio',
            duration: 1800, // 30 minutes
            restTime: 0,
            sets: 1,
            reps: '4 miles',
            instructions: 'Complete 4-mile run in best time possible. Maintain steady pace.'
          }
        ]
      },
      {
        id: 'obstacle-course',
        name: 'Obstacle Course Training',
        description: 'Simulate obstacle course challenges',
        duration: 60,
        exercises: [
          {
            id: 'monkey-bars',
            name: 'Monkey Bars',
            type: 'strength',
            duration: 120,
            restTime: 60,
            sets: 3,
            reps: 'across and back',
            instructions: 'Traverse monkey bars across and back. Focus on grip strength.'
          },
          {
            id: 'rope-climb',
            name: 'Rope Climb',
            type: 'strength',
            duration: 90,
            restTime: 60,
            sets: 3,
            reps: 'to top',
            instructions: 'Climb rope using legs and arms. Focus on technique over speed.'
          },
          {
            id: 'wall-climb',
            name: 'Wall Climb',
            type: 'strength',
            duration: 60,
            restTime: 45,
            sets: 3,
            reps: 'over wall',
            instructions: 'Climb over wall using proper technique. Use legs for power.'
          }
        ]
      },
      {
        id: 'cold-water-training',
        name: 'Cold Water Training',
        description: 'Mental toughness and cold exposure',
        duration: 20,
        exercises: [
          {
            id: 'cold-immersion',
            name: 'Cold Water Immersion',
            type: 'mental',
            duration: 300, // 5 minutes
            restTime: 120,
            sets: 3,
            reps: '5 minutes',
            instructions: 'Sit in cold water (50-59°F) for 5 minutes. Focus on breathing and mental control.'
          },
          {
            id: 'breathing-exercise',
            name: 'Controlled Breathing',
            type: 'mental',
            duration: 180,
            restTime: 60,
            sets: 3,
            reps: '3 minutes',
            instructions: 'Practice box breathing: 4 seconds in, 4 hold, 4 out, 4 hold.'
          }
        ]
      }
    ];
  }

  // Start a workout
  async startWorkout(workoutId: string, customCallback?: TimerCallback): Promise<ActiveWorkout> {
    try {
      const workouts = this.getPredefinedWorkouts();
      const workout = workouts.find(w => w.id === workoutId);
      
      if (!workout) {
        throw new Error('Workout not found');
      }

      this.currentWorkout = {
        ...workout,
        startTime: new Date().toISOString(),
        currentExerciseIndex: 0,
        currentSet: 1,
        isResting: false,
        isPaused: false,
        timeRemaining: 0,
        completedExercises: [],
        totalElapsedTime: 0
      };

      // Initialize first exercise
      const firstExercise = this.currentWorkout.exercises[0];
      this.currentWorkout.timeRemaining = firstExercise.duration;

      this.timerCallback = customCallback || null;
      
      // Start the timer
      this.startTimer();
      
      return this.currentWorkout;
    } catch (error) {
      console.error('Failed to start workout:', error);
      throw error;
    }
  }

  // Start timer
  private startTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      if (!this.currentWorkout || this.currentWorkout.isPaused) {
        return;
      }

      this.currentWorkout.timeRemaining--;
      this.currentWorkout.totalElapsedTime++;

      // Check if exercise/rest is complete
      if (this.currentWorkout.timeRemaining <= 0) {
        this.handleExerciseComplete();
      }

      // Call callback if provided
      if (this.timerCallback) {
        this.timerCallback(this.currentWorkout);
      }
    }, 1000);
  }

  // Handle exercise completion
  private handleExerciseComplete(): void {
    if (!this.currentWorkout) return;
    
    const currentExercise = this.currentWorkout.exercises[this.currentWorkout.currentExerciseIndex];
    
    if (!this.currentWorkout.isResting) {
      // Exercise just completed, start rest
      this.currentWorkout.completedExercises.push({
        ...currentExercise,
        completedAt: new Date().toISOString(),
        set: this.currentWorkout.currentSet
      });

      if (this.currentWorkout.currentSet < currentExercise.sets) {
        // More sets to do, start rest
        this.currentWorkout.isResting = true;
        this.currentWorkout.timeRemaining = currentExercise.restTime;
      } else {
        // All sets complete, move to next exercise
        this.currentWorkout.currentSet = 1;
        this.currentWorkout.currentExerciseIndex++;
        
        if (this.currentWorkout.currentExerciseIndex < this.currentWorkout.exercises.length) {
          // Start rest before next exercise
          this.currentWorkout.isResting = true;
          this.currentWorkout.timeRemaining = currentExercise.restTime;
        } else {
          // Workout complete
          this.completeWorkout();
        }
      }
    } else {
      // Rest just completed, start next exercise or set
      this.currentWorkout.isResting = false;
      
      if (this.currentWorkout.currentExerciseIndex < this.currentWorkout.exercises.length) {
        const nextExercise = this.currentWorkout.exercises[this.currentWorkout.currentExerciseIndex];
        this.currentWorkout.timeRemaining = nextExercise.duration;
      } else {
        // Workout complete
        this.completeWorkout();
      }
    }
  }

  // Pause workout
  pauseWorkout(): void {
    if (this.currentWorkout) {
      this.currentWorkout.isPaused = true;
    }
  }

  // Resume workout
  resumeWorkout(): void {
    if (this.currentWorkout) {
      this.currentWorkout.isPaused = false;
    }
  }

  // Skip current exercise
  skipExercise(): void {
    if (!this.currentWorkout) return;

    const currentExercise = this.currentWorkout.exercises[this.currentWorkout.currentExerciseIndex];
    
    // Mark as skipped
    this.currentWorkout.completedExercises.push({
      ...currentExercise,
      completedAt: new Date().toISOString(),
      set: this.currentWorkout.currentSet,
      skipped: true
    });

    // Move to next exercise
    this.currentWorkout.currentExerciseIndex++;
    this.currentWorkout.currentSet = 1;
    this.currentWorkout.isResting = false;

    if (this.currentWorkout.currentExerciseIndex < this.currentWorkout.exercises.length) {
      const nextExercise = this.currentWorkout.exercises[this.currentWorkout.currentExerciseIndex];
      this.currentWorkout.timeRemaining = nextExercise.duration;
    } else {
      this.completeWorkout();
    }
  }

  // Complete workout
  async completeWorkout(): Promise<ActiveWorkout | null> {
    if (!this.currentWorkout) return null;

    // Stop timer
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // Mark workout as complete
    this.currentWorkout.endTime = new Date().toISOString();
    this.currentWorkout.completed = true;

    // Save to history
    const workoutRecord: WorkoutRecord = {
      id: Date.now().toString(),
      workoutId: this.currentWorkout.id,
      name: this.currentWorkout.name,
      startTime: this.currentWorkout.startTime,
      endTime: this.currentWorkout.endTime,
      duration: this.currentWorkout.totalElapsedTime,
      completedExercises: this.currentWorkout.completedExercises,
      totalExercises: this.currentWorkout.exercises.length,
      completedCount: this.currentWorkout.completedExercises.filter(e => !e.skipped).length
    };

    this.workoutHistory.unshift(workoutRecord);
    
    // Keep only last 100 workouts
    if (this.workoutHistory.length > 100) {
      this.workoutHistory = this.workoutHistory.slice(0, 100);
    }

    // Save to storage
    try {
      await AsyncStorage.setItem('workoutHistory', JSON.stringify(this.workoutHistory));
    } catch (error) {
      console.error('Failed to save workout history:', error);
    }

    // Clear current workout
    const completedWorkout = this.currentWorkout;
    this.currentWorkout = null;

    return completedWorkout;
  }

  // Get current workout
  getCurrentWorkout(): ActiveWorkout | null {
    return this.currentWorkout;
  }

  // Get workout history
  getWorkoutHistory(): WorkoutRecord[] {
    return this.workoutHistory;
  }

  // Get workout stats
  getWorkoutStats(): WorkoutStats {
    const totalWorkouts = this.workoutHistory.length;
    const totalDuration = this.workoutHistory.reduce((sum, workout) => sum + workout.duration, 0);
    const totalExercises = this.workoutHistory.reduce((sum, workout) => sum + workout.completedCount, 0);
    
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const workoutsThisWeek = this.workoutHistory.filter(
      workout => new Date(workout.startTime) > lastWeek
    ).length;

    return {
      totalWorkouts,
      totalDuration,
      totalExercises,
      workoutsThisWeek,
      averageWorkoutDuration: totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0
    };
  }

  // Format time for display
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Clean up
  cleanup(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.currentWorkout = null;
    this.timerCallback = null;
  }
}

export default new WorkoutService();