import AsyncStorage from '@react-native-async-storage/async-storage';

import { appData } from '../data/data';

// Type definitions
export interface ExerciseData {
  id: string;
  name: string;
  type?: string;
  sets?: any[];
  reps?: number;
  weight?: number;
  duration?: number;
  calories?: number;
  formRating?: number;
  notes?: string;
  restTime?: number;
}

export interface ExerciseLog {
  id: string;
  sessionId: string;
  exerciseId: string;
  exerciseName: string;
  completedAt: string;
  sets: any[];
  reps: number;
  weight: number;
  duration: number;
  calories: number;
  formRating: number;
  notes: string;
  restTime: number;
}

export interface WorkoutData {
  id: string;
  name: string;
  type?: string;
  exercises?: ExerciseData[];
  estimatedDuration?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  settings?: Record<string, any>;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  workoutName: string;
  workoutType: string;
  startTime: string;
  endTime?: string;
  duration: number;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  exercises: ExerciseData[];
  currentExerciseIndex: number;
  completedExercises: ExerciseLog[];
  totalExercises: number;
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  notes: string;
  caloriesBurned: number;
  heartRateData: any[];
  settings: Record<string, any>;
  pauseTime?: string;
  totalPausedTime?: number;
  overallRating?: number;
  completedAt?: string;
  cancellationReason?: string;
}

export interface WorkoutSessionSummary {
  id: string;
  workoutId: string;
  workoutName: string;
  workoutType: string;
  date: string;
  startTime: string;
  endTime?: string;
  duration: number;
  completedExercises: number;
  totalExercises: number;
  caloriesBurned: number;
  overallRating: number;
  difficulty: string;
  notes: string;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  averageDuration: number;
  totalCalories: number;
  averageCalories: number;
  completionRate: number;
  workoutTypes: Record<string, number>;
  weeklyBreakdown: Record<string, number>;
  difficultyBreakdown: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  averageRating: number;
}

export interface PersonalBests {
  longestWorkout: number;
  mostCalories: number;
  mostExercises: number;
  highestRated: number;
}

export interface WorkoutRecommendation {
  type: 'frequency' | 'duration' | 'completion' | 'enjoyment';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
}

export interface ExportData {
  exportDate: string;
  dateRange: { startDate: string; endDate: string };
  sessions: WorkoutSessionSummary[];
  completedWorkouts: WorkoutSession[];
  exerciseLogs: ExerciseLog[];
  summary: {
    totalWorkouts: number;
    totalDuration: number;
    totalCalories: number;
    averageRating: number;
    completionRate: number;
  };
}

export interface ServiceStatus {
  isInitialized: boolean;
  activeWorkouts: number;
  completedWorkouts: number;
  totalSessions: number;
  totalExerciseLogs: number;
  currentStreak: number;
}

export type ServiceResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

class WorkoutTrackingService {
  private activeWorkouts: WorkoutSession[];
  private completedWorkouts: WorkoutSession[];
  private workoutSessions: WorkoutSessionSummary[];
  private exerciseLogs: ExerciseLog[];
  private isInitialized: boolean;

  constructor() {
    this.activeWorkouts = [];
    this.completedWorkouts = [];
    this.workoutSessions = [];
    this.exerciseLogs = [];
    this.isInitialized = false;
  }

  // Initialize workout tracking service
  async initialize(): Promise<boolean> {
    try {
      await this.loadActiveWorkouts();
      await this.loadCompletedWorkouts();
      await this.loadWorkoutSessions();
      await this.loadExerciseLogs();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize workout tracking service:', error);
      return false;
    }
  }

  // Load active workouts from storage
  private async loadActiveWorkouts(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('activeWorkouts');
      if (stored) {
        this.activeWorkouts = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load active workouts:', error);
      this.activeWorkouts = [];
    }
  }

  // Save active workouts to storage
  private async saveActiveWorkouts(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('activeWorkouts', JSON.stringify(this.activeWorkouts));
      return true;
    } catch (error) {
      console.error('Failed to save active workouts:', error);
      return false;
    }
  }

  // Load completed workouts from storage
  private async loadCompletedWorkouts(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('completedWorkouts');
      if (stored) {
        this.completedWorkouts = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load completed workouts:', error);
      this.completedWorkouts = [];
    }
  }

  // Save completed workouts to storage
  private async saveCompletedWorkouts(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('completedWorkouts', JSON.stringify(this.completedWorkouts));
      return true;
    } catch (error) {
      console.error('Failed to save completed workouts:', error);
      return false;
    }
  }

  // Load workout sessions from storage
  private async loadWorkoutSessions(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('workoutSessions');
      if (stored) {
        this.workoutSessions = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load workout sessions:', error);
      this.workoutSessions = [];
    }
  }

  // Save workout sessions to storage
  private async saveWorkoutSessions(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('workoutSessions', JSON.stringify(this.workoutSessions));
      return true;
    } catch (error) {
      console.error('Failed to save workout sessions:', error);
      return false;
    }
  }

  // Load exercise logs from storage
  private async loadExerciseLogs(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('exerciseLogs');
      if (stored) {
        this.exerciseLogs = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load exercise logs:', error);
      this.exerciseLogs = [];
    }
  }

  // Save exercise logs to storage
  private async saveExerciseLogs(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('exerciseLogs', JSON.stringify(this.exerciseLogs));
      return true;
    } catch (error) {
      console.error('Failed to save exercise logs:', error);
      return false;
    }
  }

  // Start a new workout session
  async startWorkout(workoutData: WorkoutData): Promise<ServiceResponse<WorkoutSession>> {
    try {
      const session: WorkoutSession = {
        id: Date.now().toString(),
        workoutId: workoutData.id,
        workoutName: workoutData.name,
        workoutType: workoutData.type || 'custom',
        startTime: new Date().toISOString(),
        endTime: undefined,
        duration: 0,
        status: 'active',
        exercises: workoutData.exercises || [],
        currentExerciseIndex: 0,
        completedExercises: [],
        totalExercises: workoutData.exercises?.length || 0,
        estimatedDuration: workoutData.estimatedDuration || 0,
        difficulty: workoutData.difficulty || 'intermediate',
        notes: '',
        caloriesBurned: 0,
        heartRateData: [],
        settings: workoutData.settings || {},
      };

      this.activeWorkouts.push(session);
      await this.saveActiveWorkouts();
      
      return { success: true, data: session };
    } catch (error) {
      console.error('Failed to start workout:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Pause a workout session
  async pauseWorkout(sessionId: string): Promise<ServiceResponse<WorkoutSession>> {
    try {
      const sessionIndex = this.activeWorkouts.findIndex(s => s.id === sessionId);
      if (sessionIndex === -1) {
        return { success: false, error: 'Workout session not found' };
      }

      const session = this.activeWorkouts[sessionIndex];
      session.status = 'paused';
      session.pauseTime = new Date().toISOString();
      
      await this.saveActiveWorkouts();
      return { success: true, data: session };
    } catch (error) {
      console.error('Failed to pause workout:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Resume a workout session
  async resumeWorkout(sessionId: string): Promise<ServiceResponse<WorkoutSession>> {
    try {
      const sessionIndex = this.activeWorkouts.findIndex(s => s.id === sessionId);
      if (sessionIndex === -1) {
        return { success: false, error: 'Workout session not found' };
      }

      const session = this.activeWorkouts[sessionIndex];
      session.status = 'active';
      
      // Calculate paused duration
      if (session.pauseTime) {
        const pauseDuration = new Date().getTime() - new Date(session.pauseTime).getTime();
        session.totalPausedTime = (session.totalPausedTime || 0) + pauseDuration;
        session.pauseTime = undefined;
      }
      
      await this.saveActiveWorkouts();
      return { success: true, data: session };
    } catch (error) {
      console.error('Failed to resume workout:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Complete an exercise within a workout
  async completeExercise(sessionId: string, exerciseData: ExerciseData): Promise<ServiceResponse<ExerciseLog>> {
    try {
      const session = this.activeWorkouts.find(s => s.id === sessionId);
      if (!session) {
        return { success: false, error: 'Workout session not found' };
      }

      const exerciseLog: ExerciseLog = {
        id: Date.now().toString(),
        sessionId: sessionId,
        exerciseId: exerciseData.id,
        exerciseName: exerciseData.name,
        completedAt: new Date().toISOString(),
        sets: exerciseData.sets || [],
        reps: exerciseData.reps || 0,
        weight: exerciseData.weight || 0,
        duration: exerciseData.duration || 0,
        calories: exerciseData.calories || 0,
        formRating: exerciseData.formRating || 5,
        notes: exerciseData.notes || '',
        restTime: exerciseData.restTime || 0,
      };

      this.exerciseLogs.push(exerciseLog);
      session.completedExercises.push(exerciseLog);
      session.currentExerciseIndex++;

      await this.saveExerciseLogs();
      await this.saveActiveWorkouts();
      
      return { success: true, data: exerciseLog };
    } catch (error) {
      console.error('Failed to complete exercise:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Complete a workout session
  async completeWorkout(sessionId: string, completionData: Partial<WorkoutSession> = {}): Promise<ServiceResponse<WorkoutSessionSummary>> {
    try {
      const sessionIndex = this.activeWorkouts.findIndex(s => s.id === sessionId);
      if (sessionIndex === -1) {
        return { success: false, error: 'Workout session not found' };
      }

      const session = this.activeWorkouts[sessionIndex];
      const endTime = new Date();
      
      // Update session with completion data
      session.endTime = endTime.toISOString();
      session.status = 'completed';
      session.duration = Math.floor((endTime.getTime() - new Date(session.startTime).getTime()) / 1000); // in seconds
      session.notes = completionData.notes || session.notes;
      session.caloriesBurned = completionData.caloriesBurned || this.calculateCaloriesBurned(session);
      session.overallRating = completionData.overallRating || 5;
      session.completedAt = endTime.toISOString();

      // Move to completed workouts
      this.completedWorkouts.push(session);
      this.activeWorkouts.splice(sessionIndex, 1);

      // Create workout session summary
      const sessionSummary: WorkoutSessionSummary = {
        id: session.id,
        workoutId: session.workoutId,
        workoutName: session.workoutName,
        workoutType: session.workoutType,
        date: session.startTime.split('T')[0],
        startTime: session.startTime,
        endTime: session.endTime,
        duration: session.duration,
        completedExercises: session.completedExercises.length,
        totalExercises: session.totalExercises,
        caloriesBurned: session.caloriesBurned,
        overallRating: session.overallRating || 5,
        difficulty: session.difficulty,
        notes: session.notes,
      };

      this.workoutSessions.push(sessionSummary);

      await this.saveActiveWorkouts();
      await this.saveCompletedWorkouts();
      await this.saveWorkoutSessions();
      
      return { success: true, data: sessionSummary };
    } catch (error) {
      console.error('Failed to complete workout:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Cancel a workout session
  async cancelWorkout(sessionId: string, reason = ''): Promise<ServiceResponse<WorkoutSession>> {
    try {
      const sessionIndex = this.activeWorkouts.findIndex(s => s.id === sessionId);
      if (sessionIndex === -1) {
        return { success: false, error: 'Workout session not found' };
      }

      const session = this.activeWorkouts[sessionIndex];
      session.status = 'cancelled';
      session.endTime = new Date().toISOString();
      session.cancellationReason = reason;
      session.duration = Math.floor((new Date().getTime() - new Date(session.startTime).getTime()) / 1000);

      // Move to completed workouts with cancelled status
      this.completedWorkouts.push(session);
      this.activeWorkouts.splice(sessionIndex, 1);

      await this.saveActiveWorkouts();
      await this.saveCompletedWorkouts();
      
      return { success: true, data: session };
    } catch (error) {
      console.error('Failed to cancel workout:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Get active workout session
  getActiveWorkout(sessionId?: string | null): WorkoutSession | null {
    if (sessionId) {
      return this.activeWorkouts.find(s => s.id === sessionId) || null;
    }
    return this.activeWorkouts[0] || null; // Return first active workout
  }

  // Get all active workouts
  getAllActiveWorkouts(): WorkoutSession[] {
    return this.activeWorkouts;
  }

  // Get completed workouts (for analytics or date range)
  getCompletedWorkouts(startDate?: string, endDate?: string): WorkoutSession[] {
    // If no parameters provided, return all completed workouts
    if (!startDate && !endDate) {
      return this.completedWorkouts.filter(workout => workout.status === 'completed');
    }
    
    // If date range provided, filter by date
    const start = new Date(startDate || '');
    const end = new Date(endDate || '');
    
    return this.completedWorkouts.filter(workout => {
      const workoutDate = new Date(workout.startTime);
      return workoutDate >= start && workoutDate <= end;
    });
  }

  // Get workout sessions for date range
  getWorkoutSessions(startDate: string, endDate: string): WorkoutSessionSummary[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.workoutSessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      return sessionDate >= start && sessionDate <= end;
    });
  }

  // Get all workout sessions (for analytics)
  getAllWorkoutSessions(): WorkoutSessionSummary[] {
    return this.workoutSessions;
  }

  // Get exercise logs for workout session
  getExerciseLogs(sessionId: string): ExerciseLog[] {
    return this.exerciseLogs.filter(log => log.sessionId === sessionId);
  }

  // Calculate calories burned for a workout
  calculateCaloriesBurned(session: WorkoutSession): number {
    // Simple calculation based on duration and intensity
    const baseCaloriesPerMinute: Record<string, number> = {
      beginner: 5,
      intermediate: 8,
      advanced: 12,
    };

    const intensity = session.difficulty || 'intermediate';
    const durationMinutes = Math.floor((new Date().getTime() - new Date(session.startTime).getTime()) / 60000);
    
    return Math.round(durationMinutes * (baseCaloriesPerMinute[intensity] || 8));
  }

  // Get workout statistics
  getWorkoutStats(days: number = 30): WorkoutStats {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);

    const sessions = this.getWorkoutSessions(startDate.toISOString(), endDate.toISOString());
    const completedWorkouts = this.getCompletedWorkouts(startDate.toISOString(), endDate.toISOString());
    
    const stats: WorkoutStats = {
      totalWorkouts: sessions.length,
      totalDuration: sessions.reduce((sum, session) => sum + session.duration, 0),
      averageDuration: 0,
      totalCalories: sessions.reduce((sum, session) => sum + (session.caloriesBurned || 0), 0),
      averageCalories: 0,
      completionRate: 0,
      workoutTypes: {},
      weeklyBreakdown: {},
      difficultyBreakdown: {
        beginner: 0,
        intermediate: 0,
        advanced: 0,
      },
      averageRating: 0,
    };

    if (sessions.length > 0) {
      stats.averageDuration = Math.round(stats.totalDuration / sessions.length);
      stats.averageCalories = Math.round(stats.totalCalories / sessions.length);
      
      const totalRating = sessions.reduce((sum, session) => sum + (session.overallRating || 0), 0);
      const ratedSessions = sessions.filter(s => s.overallRating).length;
      stats.averageRating = ratedSessions > 0 ? parseFloat((totalRating / ratedSessions).toFixed(1)) : 0;
    }

    // Calculate completion rate
    const totalStarted = completedWorkouts.length + this.activeWorkouts.length;
    const totalCompleted = completedWorkouts.filter(w => w.status === 'completed').length;
    stats.completionRate = totalStarted > 0 ? Math.round((totalCompleted / totalStarted) * 100) : 0;

    // Workout types breakdown
    sessions.forEach(session => {
      const type = session.workoutType || 'unknown';
      stats.workoutTypes[type] = (stats.workoutTypes[type] || 0) + 1;
    });

    // Weekly breakdown
    sessions.forEach(session => {
      const weekStart = new Date(session.startTime);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      stats.weeklyBreakdown[weekKey] = (stats.weeklyBreakdown[weekKey] || 0) + 1;
    });

    // Difficulty breakdown
    sessions.forEach(session => {
      const difficulty = session.difficulty || 'intermediate';
      if (difficulty in stats.difficultyBreakdown) {
        stats.difficultyBreakdown[difficulty]++;
      }
    });

    return stats;
  }

  // Get current streak
  getCurrentStreak(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    const currentDate = new Date(today);
    
    while (true) {
      const dayStart = new Date(currentDate);
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);
      
      const hasWorkout = this.workoutSessions.some(session => {
        const sessionDate = new Date(session.startTime);
        return sessionDate >= dayStart && sessionDate <= dayEnd;
      });
      
      if (hasWorkout) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  }

  // Get personal bests
  getPersonalBests(): PersonalBests {
    const bests: PersonalBests = {
      longestWorkout: 0,
      mostCalories: 0,
      mostExercises: 0,
      highestRated: 0,
    };

    this.workoutSessions.forEach(session => {
      if (session.duration > bests.longestWorkout) {
        bests.longestWorkout = session.duration;
      }
      if (session.caloriesBurned > bests.mostCalories) {
        bests.mostCalories = session.caloriesBurned;
      }
      if (session.completedExercises > bests.mostExercises) {
        bests.mostExercises = session.completedExercises;
      }
      if (session.overallRating > bests.highestRated) {
        bests.highestRated = session.overallRating;
      }
    });

    return bests;
  }

  // Get workout recommendations
  getWorkoutRecommendations(): WorkoutRecommendation[] {
    const stats = this.getWorkoutStats(7); // Last 7 days
    const recommendations: WorkoutRecommendation[] = [];

    if (stats.totalWorkouts < 3) {
      recommendations.push({
        type: 'frequency',
        priority: 'high',
        title: 'Increase Workout Frequency',
        description: `You've only worked out ${stats.totalWorkouts} times this week. Aim for 3-5 workouts.`,
        action: 'Schedule your next workout today.',
      });
    }

    if (stats.averageDuration < 30) {
      recommendations.push({
        type: 'duration',
        priority: 'medium',
        title: 'Increase Workout Duration',
        description: `Your average workout is ${stats.averageDuration} minutes. Try for 30-45 minutes.`,
        action: 'Add 5-10 minutes to your next workout.',
      });
    }

    if (stats.completionRate < 80) {
      recommendations.push({
        type: 'completion',
        priority: 'high',
        title: 'Improve Workout Completion',
        description: `Your completion rate is ${stats.completionRate}%. Focus on finishing what you start.`,
        action: 'Choose shorter workouts or break them into smaller sessions.',
      });
    }

    if (stats.averageRating < 4) {
      recommendations.push({
        type: 'enjoyment',
        priority: 'medium',
        title: 'Find More Enjoyable Workouts',
        description: `Your average workout rating is ${stats.averageRating}/5. Try different types.`,
        action: 'Explore new workout categories or difficulty levels.',
      });
    }

    return recommendations;
  }

  // Export workout data
  exportWorkoutData(startDate: string, endDate: string): ExportData {
    const sessions = this.getWorkoutSessions(startDate, endDate);
    const completedWorkouts = this.getCompletedWorkouts(startDate, endDate);
    const exerciseLogs = this.exerciseLogs.filter(log => {
      const session = this.workoutSessions.find(s => s.id === log.sessionId);
      if (!session) return false;
      const sessionDate = new Date(session.startTime);
      return sessionDate >= new Date(startDate) && sessionDate <= new Date(endDate);
    });

    return {
      exportDate: new Date().toISOString(),
      dateRange: { startDate, endDate },
      sessions,
      completedWorkouts,
      exerciseLogs,
      summary: {
        totalWorkouts: sessions.length,
        totalDuration: sessions.reduce((sum, s) => sum + s.duration, 0),
        totalCalories: sessions.reduce((sum, s) => sum + (s.caloriesBurned || 0), 0),
        averageRating: sessions.reduce((sum, s) => sum + (s.overallRating || 0), 0) / sessions.length,
        completionRate: (completedWorkouts.filter(w => w.status === 'completed').length / completedWorkouts.length) * 100,
      }
    };
  }

  // Clean up old data
  async cleanupOldData(daysToKeep: number = 90): Promise<ServiceResponse> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      
      this.completedWorkouts = this.completedWorkouts.filter(workout => 
        new Date(workout.startTime) >= cutoffDate
      );
      
      this.workoutSessions = this.workoutSessions.filter(session => 
        new Date(session.startTime) >= cutoffDate
      );
      
      this.exerciseLogs = this.exerciseLogs.filter(log => {
        const session = this.workoutSessions.find(s => s.id === log.sessionId);
        return session && new Date(session.startTime) >= cutoffDate;
      });
      
      await Promise.all([
        this.saveCompletedWorkouts(),
        this.saveWorkoutSessions(),
        this.saveExerciseLogs(),
      ]);
      
      return { success: true };
    } catch (error) {
      console.error('Failed to cleanup old workout data:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Get service status
  getServiceStatus(): ServiceStatus {
    return {
      isInitialized: this.isInitialized,
      activeWorkouts: this.activeWorkouts.length,
      completedWorkouts: this.completedWorkouts.length,
      totalSessions: this.workoutSessions.length,
      totalExerciseLogs: this.exerciseLogs.length,
      currentStreak: this.getCurrentStreak(),
    };
  }
}

export default new WorkoutTrackingService();