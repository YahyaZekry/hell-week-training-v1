// Core application types for Hell Week Training App

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
  type: string;
  priority: string;
  title: string;
  description: string;
  action: string;
}

export interface WorkoutExportData {
  exportDate: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  sessions: any[];
  completedWorkouts: any[];
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

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  soundEnabled: boolean;
  hapticFeedback: boolean;
  darkMode: boolean;
  units: 'metric' | 'imperial';
  language: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: WorkoutCategory;
  type?: string;
  exercises: Exercise[];
  completed: boolean;
  completedAt?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDuration?: number;
  settings?: any;
}

// Active workout interface for workout timer
export interface ActiveWorkout {
  id: string;
  name: string;
  description?: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: WorkoutCategory;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  // Active workout specific properties
  currentExerciseIndex: number;
  currentSet: number;
  timeRemaining: number;
  isResting: boolean;
  isPaused: boolean;
  completed: boolean;
  completedCount: number;
  totalExercises: number;
}

export interface WorkoutCallback {
  (workout: ActiveWorkout): void;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  type: ExerciseType;
  duration?: number; // in seconds
  reps?: number;
  sets?: number;
  weight?: number; // in kg or lbs
  restTime?: number; // in seconds
  instructions: string[];
  tips?: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  workoutName?: string;
  workoutType?: string;
  userId?: string;
  startedAt?: Date;
  completedAt?: Date;
  date?: string;
  startTime?: string;
  endTime?: string;
  duration: number; // in minutes
  exercises: ExerciseSession[] | Exercise[];
  notes?: string;
  rating?: number; // 1-5 scale
  status?: string;
  currentExerciseIndex?: number;
  completedExercises?: ExerciseLog[] | number;
  totalExercises?: number;
  estimatedDuration?: number;
  difficulty?: string;
  caloriesBurned?: number;
  heartRateData?: any[];
  settings?: any;
  pauseTime?: string | null;
  totalPausedTime?: number;
  overallRating?: number;
  cancellationReason?: string;
}

export interface ExerciseSession {
  exerciseId: string;
  completed: boolean;
  duration?: number; // actual time taken
  reps?: number; // actual reps completed
  sets?: number; // actual sets completed
  weight?: number; // actual weight used
  notes?: string;
}

export interface NutritionEntry {
  id: string;
  userId: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  water: number; // in ml
  notes?: string;
  createdAt: Date;
}

export interface RecoveryActivity {
  id: string;
  userId: string;
  type: RecoveryType;
  duration: number; // in minutes
  intensity: 'low' | 'medium' | 'high';
  date: Date;
  notes?: string;
  createdAt: Date;
}

export interface MentalFitnessSession {
  id: string;
  userId: string;
  type: MentalFitnessType;
  duration: number; // in minutes
  completed: boolean;
  date: Date;
  notes?: string;
  createdAt: Date;
}

export interface Progress {
  id: string;
  userId: string;
  date: Date;
  weight?: number; // in kg or lbs
  bodyFat?: number; // percentage
  measurements?: BodyMeasurements;
  photos?: ProgressPhoto[];
  notes?: string;
  createdAt: Date;
}

export interface BodyMeasurements {
  chest?: number; // in cm
  waist?: number; // in cm
  arms?: number; // in cm
  thighs?: number; // in cm
  calves?: number; // in cm
}

export interface ProgressPhoto {
  id: string;
  url: string;
  angle: 'front' | 'side' | 'back';
  takenAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  criteria: AchievementCriteria;
  points: number;
  unlockedAt?: Date;
}

export interface AchievementCriteria {
  type: 'workouts_completed' | 'streak_days' | 'total_minutes' | 'weight_lost' | 'custom';
  value: number;
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'all_time';
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  category: ChecklistCategory;
  items: ChecklistItem[];
  isCompleted: boolean;
  completedAt?: Date;
  userId: string;
  createdAt: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  completedAt?: Date;
}

export interface Schedule {
  id: string;
  userId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  workouts: ScheduledWorkout[];
  isActive: boolean;
  createdAt: Date;
}

export interface ScheduledWorkout {
  workoutId: string;
  scheduledDate: Date;
  completed: boolean;
  completedAt?: Date;
}

export interface Analytics {
  userId: string;
  period: AnalyticsPeriod;
  workoutsCompleted: number;
  totalMinutes: number;
  caloriesBurned: number;
  averageRating: number;
  streakDays: number;
  personalRecords: PersonalRecord[];
  progressTrends: ProgressTrend[];
}

export interface PersonalRecord {
  id: string;
  exercise: string;
  value: number;
  unit: string;
  achievedAt: Date;
}

export interface ProgressTrend {
  metric: string;
  value: number;
  date: Date;
}

export interface Settings {
  userId: string;
  profile: ProfileSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  workout: WorkoutSettings;
  nutrition: NutritionSettings;
  recovery: RecoverySettings;
}

export interface ProfileSettings {
  displayName: string;
  photoURL?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number; // in cm
  weight?: number; // in kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  fitnessGoals: string[];
}

export interface NotificationSettings {
  workoutReminders: boolean;
  achievementAlerts: boolean;
  progressUpdates: boolean;
  socialUpdates: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  progressSharing: boolean;
  achievementsVisible: boolean;
  dataCollection: boolean;
}

export interface WorkoutSettings {
  defaultDuration: number;
  restTime: number;
  autoAdvance: boolean;
  soundEnabled: boolean;
  hapticFeedback: boolean;
}

export interface NutritionSettings {
  calorieGoal: number;
  macroTargets: MacroTargets;
  waterGoal: number;
  mealReminders: boolean;
}

export interface MacroTargets {
  protein: number; // percentage
  carbs: number; // percentage
  fat: number; // percentage
}

export interface RecoverySettings {
  reminderFrequency: 'daily' | 'weekly' | 'custom';
  defaultDuration: number;
  activityPreferences: RecoveryType[];
}

// App Settings for the settings screen
export interface AppSettings {
  trainingStyle: string;
  voiceGender: string;
  voiceEnabled: boolean;
  soundEffects: boolean;
  backgroundMusic: boolean;
  countdownWarnings: boolean;
  volume: {
    voice: number;
    effects: number;
    music: number;
  };
  visualEffects: boolean;
  pulseEffects: boolean;
  transitionAnimations: boolean;
  hapticFeedback: boolean;
  hapticIntensity: 'light' | 'medium' | 'heavy';
}

// Enums and Union Types
export type WorkoutCategory = 
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'balance'
  | 'endurance'
  | 'hiit'
  | 'crossfit'
  | 'yoga'
  | 'pilates'
  | 'sports';

export type ExerciseType = 
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'balance'
  | 'warmup'
  | 'cooldown'
  | 'recovery';

export type RecoveryType = 
  | 'stretching'
  | 'foam_rolling'
  | 'massage'
  | 'cold_therapy'
  | 'heat_therapy'
  | 'meditation'
  | 'breathing'
  | 'sleep';

export type MentalFitnessType = 
  | 'meditation'
  | 'breathing_exercise'
  | 'visualization'
  | 'affirmations'
  | 'journaling'
  | 'goal_setting'
  | 'stress_management'
  | 'mindfulness';

export type AchievementCategory = 
  | 'workout'
  | 'consistency'
  | 'progress'
  | 'milestone'
  | 'social'
  | 'special';

export type ChecklistCategory = 
  | 'preparation'
  | 'equipment'
  | 'nutrition'
  | 'recovery'
  | 'mental'
  | 'safety';

export type AnalyticsPeriod = 
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'all_time';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export interface WorkoutForm {
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: WorkoutCategory;
  exercises: Exercise[];
}

export interface NutritionForm {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  notes?: string;
}

export interface ProgressForm {
  weight?: number;
  bodyFat?: number;
  measurements?: BodyMeasurements;
  notes?: string;
}

// Component Props Types
export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

export interface WorkoutCardProps {
  workout: Workout;
  onPress: (workout: Workout) => void;
  showProgress?: boolean;
}

export interface ProgressChartProps {
  data: ProgressTrend[];
  metric: string;
  period: AnalyticsPeriod;
}

export interface ExerciseTimerProps {
  exercise: Exercise;
  onComplete: () => void;
  onPause: () => void;
  onResume: () => void;
}

// Navigation Types (will be expanded in navigation.ts)
export interface RootStackParamList {
  Today: undefined;
  Training: undefined;
  Progress: undefined;
  Nutrition: undefined;
  Recovery: undefined;
  Mental: undefined;
  Analytics: undefined;
  Settings: undefined;
  ExerciseForm: undefined;
  WorkoutHistory: undefined;
  Checklists: undefined;
  Schedule: undefined;
  Preparation: undefined;
  About: undefined;
  Auth: undefined;
}

export interface TrainingStackParamList {
  Workouts: undefined;
  Schedule: undefined;
  Checklists: undefined;
}

// Context Types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export interface WorkoutContextType {
  currentWorkout: Workout | null;
  currentSession: WorkoutSession | null;
  startWorkout: (workout: Workout) => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  completeWorkout: () => void;
  updateExercise: (exerciseId: string, data: Partial<ExerciseSession>) => void;
}

export interface NutritionContextType {
  entries: NutritionEntry[];
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
  };
  addEntry: (entry: Omit<NutritionEntry, 'id' | 'createdAt'>) => Promise<void>;
  updateEntry: (id: string, data: Partial<NutritionEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getDailyTotals: (date: Date) => Promise<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
  }>;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationError extends AppError {
  field: string;
}

export interface NetworkError extends AppError {
  statusCode?: number;
}

// Constants
export const WORKOUT_CATEGORIES: WorkoutCategory[] = [
  'strength',
  'cardio',
  'flexibility',
  'balance',
  'endurance',
  'hiit',
  'crossfit',
  'yoga',
  'pilates',
  'sports'
];

export const EXERCISE_TYPES: ExerciseType[] = [
  'strength',
  'cardio',
  'flexibility',
  'balance',
  'warmup',
  'cooldown',
  'recovery'
];

export const RECOVERY_TYPES: RecoveryType[] = [
  'stretching',
  'foam_rolling',
  'massage',
  'cold_therapy',
  'heat_therapy',
  'meditation',
  'breathing',
  'sleep'
];

export const MENTAL_FITNESS_TYPES: MentalFitnessType[] = [
  'meditation',
  'breathing_exercise',
  'visualization',
  'affirmations',
  'journaling',
  'goal_setting',
  'stress_management',
  'mindfulness'
];

export const ACHIEVEMENT_CATEGORIES: AchievementCategory[] = [
  'workout',
  'consistency',
  'progress',
  'milestone',
  'social',
  'special'
];

export const CHECKLIST_CATEGORIES: ChecklistCategory[] = [
  'preparation',
  'equipment',
  'nutrition',
  'recovery',
  'mental',
  'safety'
];

// Recovery Types
export interface RecoveryData {
  sleepHours: number;
  sleepQuality: number;
  restingHeartRate?: number;
  muscleSoreness?: number;
  energyLevel?: number;
  stressLevel?: number;
  hydration?: number;
  stretchingMinutes?: number;
  meditationMinutes?: number;
  notes?: string;
  date: string;
  userId: string;
}

export interface RecoveryGoals {
  sleepHours: number;
  sleepQuality: number;
  restingHeartRate?: number;
  hydrationGoal?: number;
  stretchingMinutes?: number;
  meditationMinutes?: number;
}

export interface RecoveryScore {
  score: number;
  factors: {
    sleep: number;
    energy: number;
    soreness: number;
    stress: number;
    hydration: number;
  };
  recommendations: string[];
}

export interface RecoveryAnalytics {
  logs: RecoveryData[];
  averages: {
    sleepHours: number;
    sleepQuality: number;
    restingHeartRate: number;
    muscleSoreness: number;
    energyLevel: number;
    stressLevel: number;
    hydration: number;
    stretchingMinutes: number;
    meditationMinutes: number;
  };
  trends: {
    sleepHours: string;
    sleepQuality: string;
    muscleSoreness: string;
    energyLevel: string;
    stressLevel: string;
    overallRecovery: string;
  };
  insights: string[];
}

export interface RecoveryRecommendation {
  id: string;
  title: string;
  description: string;
  action: string;
  priority: 'low' | 'medium' | 'high';
  category: 'sleep' | 'nutrition' | 'exercise' | 'mental' | 'general';
}

// Analytics Types
export interface AnalyticsData {
  overall: OverallAnalytics;
  workout: WorkoutAnalytics;
  nutrition: NutritionAnalytics;
  recovery: RecoveryAnalyticsData;
}

export interface OverallAnalytics {
  overallScore: number;
  trends: {
    workoutTrend: {
      trend: string;
      improvement: number;
    };
    nutritionTrend: {
      trend: string;
      change: number;
    };
    recoveryTrend: {
      trend: string;
      change: number;
    };
  };
  insights: {
    title: string;
    description: string;
    value: string;
  }[];
  recommendations: Recommendation[];
}

export interface WorkoutAnalytics {
  summary: {
    totalWorkouts: number;
    averageDuration: number;
    completionRate: number;
    currentStreak: number;
  };
  trends: {
    weekly: {
      labels: string[];
      frequency: number[];
    };
    consistency: number;
  };
  patterns: {
    bestDay: {
      day: string;
      count: number;
      percentage: number;
    };
    bestTime: {
      timeRange: string;
      count: number;
      percentage: number;
    };
    preferredType: {
      type: string;
      count: number;
      percentage: number;
    };
  };
  performance: {
    improvementRate: number;
    averagePerformance: number;
  };
}

export interface NutritionAnalytics {
  summary: {
    totalMeals: number;
    averageCalories: number;
    averageProtein: number;
    averageCarbs: number;
    averageFat: number;
    hydrationAverage: number;
  };
  trends: {
    labels: string[];
    calories: number[];
  };
  patterns: {
    bestMealTime: {
      timeRange: string;
      count: number;
    };
  };
  recommendations: Recommendation[];
}

export interface RecoveryAnalyticsData {
  summary: {
    averageSleepHours: number;
    averageSleepQuality: number;
    averageEnergyLevel: number;
    averageRecoveryScore: number;
  };
  trends: {
    labels: string[];
    sleepHours: number[];
    sleepQuality: number[];
    recoveryScores: number[];
  };
  patterns: {
    bestSleepDay: {
      day: string;
      averageHours: number;
    };
  };
  recommendations: Recommendation[];
}

export interface Recommendation {
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

// Type aliases for compatibility
export type WorkoutData = WorkoutAnalytics;
export type NutritionData = NutritionAnalytics;
export type RecoveryDataExtended = RecoveryAnalyticsData;

// Progress Screen Types
export interface ProgressData {
  workoutStats: {
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
  };
  nutritionStats: {
    totalMeals: number;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    averageCalories: number;
    averageProtein: number;
    averageCarbs: number;
    averageFat: number;
    dailyBreakdown: Record<string, {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }>;
  };
  recoveryStats: {
    totalRecoveryLogs: number;
    averageSleepHours: number;
    averageSleepQuality: number;
    averageRestingHeartRate: number;
    averageEnergyLevel: number;
    averageStressLevel: number;
    dailyBreakdown: Record<string, {
      sleepHours: number;
      energyLevel: number;
      stressLevel: number;
    }>;
  };
  trends: {
    workoutFrequency: string;
    workoutDuration: string;
    calorieBurn: string;
    nutrition: string;
    recovery: string;
  };
  achievements: ProgressAchievement[];
  personalRecords: ProgressPersonalRecord[];
}

export interface ProgressAchievement extends Achievement {
  unlocked: boolean;
}

export interface ProgressPersonalRecord {
  id: string;
  type: string;
  value: number;
  unit: string;
  date?: string;
}