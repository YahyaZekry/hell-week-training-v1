import AsyncStorage from '@react-native-async-storage/async-storage';

import { appData } from '../data/data';

// Type definitions for progress service
export interface ProgressEntry {
  id: string;
  date: string;
  week: number;
  day: number;
  type: 'workout' | 'nutrition' | 'mental' | 'recovery' | 'assessment';
  activity: string;
  duration?: number;
  distance?: number;
  reps?: number;
  weight?: number;
  sets?: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  hydration?: number;
  sleep?: number;
  heartRate?: number;
  mood?: number;
  energy?: number;
  soreness?: number;
  stress?: number;
  focus?: number;
  notes?: string;
  completed: boolean;
  timestamp: number;
  updatedAt?: number;
}

export interface WeeklyProgress {
  week: number;
  startDate: string;
  endDate: string;
  totalWorkouts: number;
  completedWorkouts: number;
  totalDistance: number;
  totalTime: number;
  totalCalories: number;
  averageHeartRate: number;
  averageSleep: number;
  averageMood: number;
  averageEnergy: number;
  completionRate: number;
  goals: WeeklyGoals;
  achievements: Achievement[];
}

export interface WeeklyGoals {
  miles: number;
  swimHours: number;
  strengthSessions: number;
  mentalTrainingHours: number;
  calories: number;
  hydration: number;
  sleep: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'physical' | 'mental' | 'nutrition' | 'recovery';
  icon: string;
  points: number;
}

export interface ProgressSummary {
  totalWeeks: number;
  currentWeek: number;
  totalWorkouts: number;
  completedWorkouts: number;
  totalDistance: number;
  totalTime: number;
  totalCalories: number;
  averageCompletionRate: number;
  personalRecords: PersonalRecord[];
  streaks: StreakData;
  trends: ProgressTrends;
}

export interface PersonalRecord {
  id: string;
  activity: string;
  value: number;
  unit: string;
  date: string;
  previousRecord?: number;
}

export interface StreakData {
  currentWorkoutStreak: number;
  longestWorkoutStreak: number;
  currentNutritionStreak: number;
  longestNutritionStreak: number;
  currentMentalStreak: number;
  longestMentalStreak: number;
}

export interface ProgressTrends {
  fitness: 'improving' | 'stable' | 'declining';
  nutrition: 'improving' | 'stable' | 'declining';
  mental: 'improving' | 'stable' | 'declining';
  recovery: 'improving' | 'stable' | 'declining';
  overall: 'improving' | 'stable' | 'declining';
}

export interface ProgressAnalytics {
  weeklyProgress: WeeklyProgress[];
  summary: ProgressSummary;
  recentEntries: ProgressEntry[];
  upcomingGoals: WeeklyGoals;
  recommendations: string[];
}

export interface ServiceStatus {
  isInitialized: boolean;
  totalEntries: number;
  currentWeek: number;
  lastEntryDate: Date | null;
}

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class ProgressService {
  private progressEntries: ProgressEntry[] = [];
  private achievements: Achievement[] = [];
  private personalRecords: PersonalRecord[] = [];
  private isInitialized: boolean = false;
  private currentWeek: number = 1;

  // Initialize progress service
  async initialize(): Promise<boolean> {
    try {
      await this.loadProgressEntries();
      await this.loadAchievements();
      await this.loadPersonalRecords();
      await this.determineCurrentWeek();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize progress service:', error);
      return false;
    }
  }

  // Load progress entries from storage
  private async loadProgressEntries(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('progressEntries');
      if (stored) {
        this.progressEntries = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load progress entries:', error);
      this.progressEntries = [];
    }
  }

  // Save progress entries to storage
  private async saveProgressEntries(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('progressEntries', JSON.stringify(this.progressEntries));
      return true;
    } catch (error) {
      console.error('Failed to save progress entries:', error);
      return false;
    }
  }

  // Load achievements from storage
  private async loadAchievements(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('achievements');
      if (stored) {
        this.achievements = JSON.parse(stored);
      } else {
        // Initialize with default achievements
        this.achievements = [
          {
            id: 'first_workout',
            title: 'First Workout',
            description: 'Completed your first workout',
            date: '',
            category: 'physical',
            icon: '🏃',
            points: 10
          },
          {
            id: 'week_complete',
            title: 'Week Complete',
            description: 'Completed all workouts for a week',
            date: '',
            category: 'physical',
            icon: '📅',
            points: 50
          },
          {
            id: 'mental_master',
            title: 'Mental Master',
            description: 'Completed 7 days of mental training',
            date: '',
            category: 'mental',
            icon: '🧠',
            points: 30
          }
        ];
        await this.saveAchievements();
      }
    } catch (error) {
      console.error('Failed to load achievements:', error);
      this.achievements = [];
    }
  }

  // Save achievements to storage
  private async saveAchievements(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('achievements', JSON.stringify(this.achievements));
      return true;
    } catch (error) {
      console.error('Failed to save achievements:', error);
      return false;
    }
  }

  // Load personal records from storage
  private async loadPersonalRecords(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('personalRecords');
      if (stored) {
        this.personalRecords = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load personal records:', error);
      this.personalRecords = [];
    }
  }

  // Save personal records to storage
  private async savePersonalRecords(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('personalRecords', JSON.stringify(this.personalRecords));
      return true;
    } catch (error) {
      console.error('Failed to save personal records:', error);
      return false;
    }
  }

  // Determine current week based on start date
  private async determineCurrentWeek(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('trainingStartDate');
      if (stored) {
        const startDate = new Date(stored);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        this.currentWeek = Math.min(Math.max(1, Math.floor(daysDiff / 7) + 1), 12);
      } else {
        this.currentWeek = 1;
      }
    } catch (error) {
      console.error('Failed to determine current week:', error);
      this.currentWeek = 1;
    }
  }

  // Set training start date
  async setTrainingStartDate(date: Date): Promise<ServiceResponse> {
    try {
      await AsyncStorage.setItem('trainingStartDate', date.toISOString());
      await this.determineCurrentWeek();
      return { success: true };
    } catch (error) {
      console.error('Failed to set training start date:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Add progress entry
  async addProgressEntry(entry: Omit<ProgressEntry, 'id' | 'timestamp'>): Promise<ServiceResponse<ProgressEntry>> {
    try {
      const newEntry: ProgressEntry = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        ...entry
      };

      this.progressEntries.push(newEntry);
      await this.saveProgressEntries();
      
      // Check for achievements and personal records
      await this.checkAchievements(newEntry);
      await this.checkPersonalRecords(newEntry);
      
      return { success: true, data: newEntry };
    } catch (error) {
      console.error('Failed to add progress entry:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Update progress entry
  async updateProgressEntry(entryId: string, updates: Partial<ProgressEntry>): Promise<ServiceResponse<ProgressEntry>> {
    try {
      const entryIndex = this.progressEntries.findIndex(entry => entry.id === entryId);
      if (entryIndex === -1) {
        return { success: false, error: 'Progress entry not found' };
      }

      this.progressEntries[entryIndex] = {
        ...this.progressEntries[entryIndex],
        ...updates,
        updatedAt: Date.now()
      };

      await this.saveProgressEntries();
      return { success: true, data: this.progressEntries[entryIndex] };
    } catch (error) {
      console.error('Failed to update progress entry:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Delete progress entry
  async deleteProgressEntry(entryId: string): Promise<ServiceResponse> {
    try {
      this.progressEntries = this.progressEntries.filter(entry => entry.id !== entryId);
      await this.saveProgressEntries();
      return { success: true };
    } catch (error) {
      console.error('Failed to delete progress entry:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Get progress entries for date range
  getProgressEntries(startDate?: Date, endDate?: Date): ProgressEntry[] {
    let entries = [...this.progressEntries];
    
    if (startDate) {
      entries = entries.filter(entry => new Date(entry.date) >= startDate);
    }
    
    if (endDate) {
      entries = entries.filter(entry => new Date(entry.date) <= endDate);
    }
    
    return entries.sort((a, b) => b.timestamp - a.timestamp);
  }

  // Get progress entries for specific week
  getProgressEntriesForWeek(week: number): ProgressEntry[] {
    return this.progressEntries.filter(entry => entry.week === week);
  }

  // Get weekly progress
  getWeeklyProgress(week: number): WeeklyProgress | null {
    const entries = this.getProgressEntriesForWeek(week);
    if (entries.length === 0) return null;

    const weekData = appData.preparation_weeks.find((w: any) => w.Week === week);
    const goals: WeeklyGoals = {
      miles: weekData?.Miles || 0,
      swimHours: weekData?.Swim || 0,
      strengthSessions: weekData?.Strength || 0,
      mentalTrainingHours: weekData?.Mental || 0,
      calories: 4000,
      hydration: 128,
      sleep: 8
    };

    const completedWorkouts = entries.filter(e => e.type === 'workout' && e.completed).length;
    const totalWorkouts = entries.filter(e => e.type === 'workout').length;
    const totalDistance = entries.reduce((sum, e) => sum + (e.distance || 0), 0);
    const totalTime = entries.reduce((sum, e) => sum + (e.duration || 0), 0);
    const totalCalories = entries.reduce((sum, e) => sum + (e.calories || 0), 0);
    
    const heartRates = entries.filter(e => e.heartRate).map(e => e.heartRate!);
    const averageHeartRate = heartRates.length > 0 ? 
      heartRates.reduce((sum, hr) => sum + hr, 0) / heartRates.length : 0;
    
    const sleepValues = entries.filter(e => e.sleep).map(e => e.sleep!);
    const averageSleep = sleepValues.length > 0 ? 
      sleepValues.reduce((sum, sleep) => sum + sleep, 0) / sleepValues.length : 0;
    
    const moods = entries.filter(e => e.mood).map(e => e.mood!);
    const averageMood = moods.length > 0 ? 
      moods.reduce((sum, mood) => sum + mood, 0) / moods.length : 0;
    
    const energies = entries.filter(e => e.energy).map(e => e.energy!);
    const averageEnergy = energies.length > 0 ? 
      energies.reduce((sum, energy) => sum + energy, 0) / energies.length : 0;

    const completionRate = totalWorkouts > 0 ? (completedWorkouts / totalWorkouts) * 100 : 0;

    // Get achievements for this week
    const weekAchievements = this.achievements.filter(a => {
      const achievementDate = new Date(a.date);
      const weekStart = new Date(entries[0]?.date || new Date());
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return achievementDate >= weekStart && achievementDate <= weekEnd;
    });

    return {
      week,
      startDate: entries[0]?.date || '',
      endDate: entries[entries.length - 1]?.date || '',
      totalWorkouts,
      completedWorkouts,
      totalDistance,
      totalTime,
      totalCalories,
      averageHeartRate,
      averageSleep,
      averageMood,
      averageEnergy,
      completionRate,
      goals,
      achievements: weekAchievements
    };
  }

  // Get progress summary
  getProgressSummary(): ProgressSummary {
    const totalWeeks = Math.max(...this.progressEntries.map(e => e.week), 0);
    const totalWorkouts = this.progressEntries.filter(e => e.type === 'workout').length;
    const completedWorkouts = this.progressEntries.filter(e => 
      e.type === 'workout' && e.completed).length;
    const totalDistance = this.progressEntries.reduce((sum, e) => sum + (e.distance || 0), 0);
    const totalTime = this.progressEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
    const totalCalories = this.progressEntries.reduce((sum, e) => sum + (e.calories || 0), 0);
    
    const weeklyCompletionRates: number[] = [];
    for (let week = 1; week <= totalWeeks; week++) {
      const weekProgress = this.getWeeklyProgress(week);
      if (weekProgress) {
        weeklyCompletionRates.push(weekProgress.completionRate);
      }
    }
    
    const averageCompletionRate = weeklyCompletionRates.length > 0 ?
      weeklyCompletionRates.reduce((sum, rate) => sum + rate, 0) / weeklyCompletionRates.length : 0;

    return {
      totalWeeks,
      currentWeek: this.currentWeek,
      totalWorkouts,
      completedWorkouts,
      totalDistance,
      totalTime,
      totalCalories,
      averageCompletionRate,
      personalRecords: this.personalRecords,
      streaks: this.calculateStreaks(),
      trends: this.calculateTrends()
    };
  }

  // Calculate streaks
  private calculateStreaks(): StreakData {
    const workoutEntries = this.progressEntries.filter(e => e.type === 'workout' && e.completed);
    const nutritionEntries = this.progressEntries.filter(e => e.type === 'nutrition');
    const mentalEntries = this.progressEntries.filter(e => e.type === 'mental');

    return {
      currentWorkoutStreak: this.calculateCurrentStreak(workoutEntries),
      longestWorkoutStreak: this.calculateLongestStreak(workoutEntries),
      currentNutritionStreak: this.calculateCurrentStreak(nutritionEntries),
      longestNutritionStreak: this.calculateLongestStreak(nutritionEntries),
      currentMentalStreak: this.calculateCurrentStreak(mentalEntries),
      longestMentalStreak: this.calculateLongestStreak(mentalEntries)
    };
  }

  // Calculate current streak
  private calculateCurrentStreak(entries: ProgressEntry[]): number {
    if (entries.length === 0) return 0;
    
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      entryDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  // Calculate longest streak
  private calculateLongestStreak(entries: ProgressEntry[]): number {
    if (entries.length === 0) return 0;
    
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let longestStreak = 0;
    let currentStreak = 1;
    
    for (let i = 1; i < sortedEntries.length; i++) {
      const prevDate = new Date(sortedEntries[i - 1].date);
      const currDate = new Date(sortedEntries[i].date);
      
      const daysDiff = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }
    
    return Math.max(longestStreak, currentStreak);
  }

  // Calculate trends
  private calculateTrends(): ProgressTrends {
    const recentEntries = this.getProgressEntries(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      new Date()
    );
    
    const olderEntries = this.getProgressEntries(
      new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 7-14 days ago
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    
    const calculateTrend = (recent: number, older: number): 'improving' | 'stable' | 'declining' => {
      if (recent > older * 1.1) return 'improving';
      if (recent < older * 0.9) return 'declining';
      return 'stable';
    };
    
    const recentWorkoutRate = recentEntries.filter(e => e.type === 'workout' && e.completed).length;
    const olderWorkoutRate = olderEntries.filter(e => e.type === 'workout' && e.completed).length;
    
    const recentNutritionRate = recentEntries.filter(e => e.type === 'nutrition').length;
    const olderNutritionRate = olderEntries.filter(e => e.type === 'nutrition').length;
    
    const recentMentalRate = recentEntries.filter(e => e.type === 'mental').length;
    const olderMentalRate = olderEntries.filter(e => e.type === 'mental').length;
    
    const recentRecoveryRate = recentEntries.filter(e => e.type === 'recovery').length;
    const olderRecoveryRate = olderEntries.filter(e => e.type === 'recovery').length;
    
    return {
      fitness: calculateTrend(recentWorkoutRate, olderWorkoutRate),
      nutrition: calculateTrend(recentNutritionRate, olderNutritionRate),
      mental: calculateTrend(recentMentalRate, olderMentalRate),
      recovery: calculateTrend(recentRecoveryRate, olderRecoveryRate),
      overall: 'stable' // Would need more complex logic for overall trend
    };
  }

  // Check for achievements
  private async checkAchievements(entry: ProgressEntry): Promise<void> {
    const workoutEntries = this.progressEntries.filter(e => e.type === 'workout' && e.completed);
    
    // First workout achievement
    if (workoutEntries.length === 1) {
      const achievement = this.achievements.find(a => a.id === 'first_workout');
      if (achievement && !achievement.date) {
        achievement.date = entry.date;
        await this.saveAchievements();
      }
    }
    
    // Week complete achievement
    const weekProgress = this.getWeeklyProgress(entry.week);
    if (weekProgress?.completionRate === 100) {
      const achievement = this.achievements.find(a => a.id === 'week_complete');
      if (achievement && !achievement.date) {
        achievement.date = entry.date;
        await this.saveAchievements();
      }
    }
    
    // Mental master achievement
    const mentalEntries = this.progressEntries.filter(e => e.type === 'mental');
    if (mentalEntries.length >= 7) {
      const achievement = this.achievements.find(a => a.id === 'mental_master');
      if (achievement && !achievement.date) {
        achievement.date = entry.date;
        await this.saveAchievements();
      }
    }
  }

  // Check for personal records
  private async checkPersonalRecords(entry: ProgressEntry): Promise<void> {
    if (entry.type !== 'workout' || !entry.completed) return;
    
    const activities = ['run', 'swim', 'pushups', 'pullups', 'situps'];
    const activityFields: Record<string, keyof ProgressEntry> = {
      run: 'distance',
      swim: 'distance',
      pushups: 'reps',
      pullups: 'reps',
      situps: 'reps'
    };
    
    for (const activity of activities) {
      if (entry.activity && entry.activity.toLowerCase().includes(activity)) {
        const field = activityFields[activity];
        const value = entry[field] as number;
        
        if (value && value > 0) {
          const existingRecord = this.personalRecords.find(r => 
            r.activity.toLowerCase().includes(activity));
          
          if (!existingRecord || value > existingRecord.value) {
            const newRecord: PersonalRecord = {
              id: Date.now().toString(),
              activity: entry.activity,
              value,
              unit: activity === 'run' || activity === 'swim' ? 'miles' : 'reps',
              date: entry.date,
              previousRecord: existingRecord?.value
            };
            
            if (existingRecord) {
              // Update existing record
              Object.assign(existingRecord, newRecord);
            } else {
              // Add new record
              this.personalRecords.push(newRecord);
            }
            
            await this.savePersonalRecords();
          }
        }
      }
    }
  }

  // Get progress analytics
  getProgressAnalytics(): ProgressAnalytics {
    const weeklyProgress: WeeklyProgress[] = [];
    for (let week = 1; week <= this.currentWeek; week++) {
      const progress = this.getWeeklyProgress(week);
      if (progress) {
        weeklyProgress.push(progress);
      }
    }
    
    const summary = this.getProgressSummary();
    const recentEntries = this.getProgressEntries(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      new Date()
    );
    
    const weekData = appData.preparation_weeks.find((w: any) => w.Week === this.currentWeek);
    const upcomingGoals: WeeklyGoals = {
      miles: weekData?.Miles || 0,
      swimHours: weekData?.Swim || 0,
      strengthSessions: weekData?.Strength || 0,
      mentalTrainingHours: weekData?.Mental || 0,
      calories: 4000,
      hydration: 128,
      sleep: 8
    };
    
    const recommendations = this.generateRecommendations(summary, recentEntries);
    
    return {
      weeklyProgress,
      summary,
      recentEntries,
      upcomingGoals,
      recommendations
    };
  }

  // Generate recommendations
  private generateRecommendations(summary: ProgressSummary, recentEntries: ProgressEntry[]): string[] {
    const recommendations: string[] = [];
    
    if (summary.averageCompletionRate < 80) {
      recommendations.push('Focus on consistency - try to complete at least 80% of your workouts');
    }
    
    if (summary.streaks.currentWorkoutStreak < 3) {
      recommendations.push('Build a workout streak - aim for at least 3 consecutive days');
    }
    
    const recentSleep = recentEntries.filter(e => e.sleep).map(e => e.sleep!);
    if (recentSleep.length > 0) {
      const avgSleep = recentSleep.reduce((sum, sleep) => sum + sleep, 0) / recentSleep.length;
      if (avgSleep < 7) {
        recommendations.push('Prioritize sleep - aim for at least 7-8 hours per night');
      }
    }
    
    const recentNutrition = recentEntries.filter(e => e.type === 'nutrition');
    if (recentNutrition.length < 5) {
      recommendations.push('Track your nutrition more consistently - log at least 5 meals per day');
    }
    
    const recentMental = recentEntries.filter(e => e.type === 'mental');
    if (recentMental.length < 3) {
      recommendations.push('Don\'t skip mental training - it\'s crucial for Hell Week success');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Great progress! Keep up the excellent work');
    }
    
    return recommendations;
  }

  // Get current week
  getCurrentWeek(): number {
    return this.currentWeek;
  }

  // Get achievements
  getAchievements(): Achievement[] {
    return this.achievements;
  }

  // Get personal records
  getPersonalRecords(): PersonalRecord[] {
    return this.personalRecords;
  }

  // Get progress data for ProgressScreen
  getProgressData(period: number): any {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - period);
    
    const entries = this.getProgressEntries(startDate, endDate);
    
    // Calculate workout stats
    const workoutEntries = entries.filter(e => e.type === 'workout');
    const completedWorkouts = workoutEntries.filter(e => e.completed);
    const totalWorkouts = workoutEntries.length;
    const totalDuration = workoutEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
    const totalCalories = workoutEntries.reduce((sum, e) => sum + (e.calories || 0), 0);
    const averageDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0;
    const averageCalories = totalWorkouts > 0 ? totalCalories / totalWorkouts : 0;
    const completionRate = totalWorkouts > 0 ? (completedWorkouts.length / totalWorkouts) * 100 : 0;
    
    // Workout types breakdown
    const workoutTypes: Record<string, number> = {};
    workoutEntries.forEach(entry => {
      const type = entry.activity || 'unknown';
      workoutTypes[type] = (workoutTypes[type] || 0) + 1;
    });
    
    // Weekly breakdown
    const weeklyBreakdown: Record<string, number> = {};
    for (let i = 0; i < period; i += 7) {
      const weekStart = new Date(startDate);
      weekStart.setDate(startDate.getDate() + i);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const weekEntries = workoutEntries.filter(e => {
        const entryDate = new Date(e.date);
        return entryDate >= weekStart && entryDate <= weekEnd;
      });
      
      weeklyBreakdown[weekStart.toISOString().split('T')[0]] = weekEntries.length;
    }
    
    // Calculate nutrition stats
    const nutritionEntries = entries.filter(e => e.type === 'nutrition');
    const totalMeals = nutritionEntries.length;
    const totalProtein = nutritionEntries.reduce((sum, e) => sum + (e.protein || 0), 0);
    const totalCarbs = nutritionEntries.reduce((sum, e) => sum + (e.carbs || 0), 0);
    const totalFat = nutritionEntries.reduce((sum, e) => sum + (e.fat || 0), 0);
    const totalNutritionCalories = nutritionEntries.reduce((sum, e) => sum + (e.calories || 0), 0);
    
    // Daily nutrition breakdown
    const dailyBreakdown: Record<string, any> = {};
    for (let i = 0; i < period; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayEntries = nutritionEntries.filter(e => e.date === dateStr);
      dailyBreakdown[dateStr] = {
        calories: dayEntries.reduce((sum, e) => sum + (e.calories || 0), 0),
        protein: dayEntries.reduce((sum, e) => sum + (e.protein || 0), 0),
        carbs: dayEntries.reduce((sum, e) => sum + (e.carbs || 0), 0),
        fat: dayEntries.reduce((sum, e) => sum + (e.fat || 0), 0),
      };
    }
    
    // Calculate recovery stats
    const recoveryEntries = entries.filter(e => e.type === 'recovery');
    const totalRecoveryLogs = recoveryEntries.length;
    const sleepEntries = recoveryEntries.filter(e => e.sleep);
    const averageSleepHours = sleepEntries.length > 0 ?
      sleepEntries.reduce((sum, e) => sum + (e.sleep || 0), 0) / sleepEntries.length : 0;
    const averageSleepQuality = sleepEntries.length > 0 ?
      sleepEntries.reduce((sum, e) => sum + (e.mood || 0), 0) / sleepEntries.length : 0;
    const averageRestingHeartRate = recoveryEntries.length > 0 ?
      recoveryEntries.reduce((sum, e) => sum + (e.heartRate || 0), 0) / recoveryEntries.length : 0;
    const averageEnergyLevel = recoveryEntries.length > 0 ?
      recoveryEntries.reduce((sum, e) => sum + (e.energy || 0), 0) / recoveryEntries.length : 0;
    const averageStressLevel = recoveryEntries.length > 0 ?
      recoveryEntries.reduce((sum, e) => sum + (e.stress || 0), 0) / recoveryEntries.length : 0;
    
    // Daily recovery breakdown
    const dailyRecoveryBreakdown: Record<string, any> = {};
    for (let i = 0; i < period; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayEntries = recoveryEntries.filter(e => e.date === dateStr);
      dailyRecoveryBreakdown[dateStr] = {
        sleepHours: dayEntries.reduce((sum, e) => sum + (e.sleep || 0), 0),
        energyLevel: dayEntries.reduce((sum, e) => sum + (e.energy || 0), 0),
        stressLevel: dayEntries.reduce((sum, e) => sum + (e.stress || 0), 0),
      };
    }
    
    // Calculate trends
    const trends = this.calculateTrends();
    
    // Prepare achievements with unlocked status
    const achievements = this.achievements.map(achievement => ({
      ...achievement,
      unlocked: achievement.date !== '',
      unlockedAt: achievement.date || undefined
    }));
    
    // Prepare personal records
    const personalRecords = this.personalRecords.map(record => ({
      id: record.id,
      type: record.activity.toLowerCase().replace(/\s+/g, '_'),
      value: record.value,
      unit: record.unit,
      date: record.date
    }));
    
    return {
      workoutStats: {
        totalWorkouts,
        totalDuration,
        averageDuration,
        totalCalories,
        averageCalories,
        completionRate,
        workoutTypes,
        weeklyBreakdown,
        difficultyBreakdown: {
          beginner: 0,
          intermediate: 0,
          advanced: 0
        },
        averageRating: 0
      },
      nutritionStats: {
        totalMeals,
        totalCalories: totalNutritionCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        averageCalories: totalMeals > 0 ? totalNutritionCalories / totalMeals : 0,
        averageProtein: totalMeals > 0 ? totalProtein / totalMeals : 0,
        averageCarbs: totalMeals > 0 ? totalCarbs / totalMeals : 0,
        averageFat: totalMeals > 0 ? totalFat / totalMeals : 0,
        dailyBreakdown
      },
      recoveryStats: {
        totalRecoveryLogs,
        averageSleepHours,
        averageSleepQuality,
        averageRestingHeartRate,
        averageEnergyLevel,
        averageStressLevel,
        dailyBreakdown: dailyRecoveryBreakdown
      },
      trends: {
        workoutFrequency: trends.fitness,
        workoutDuration: trends.fitness,
        calorieBurn: trends.fitness,
        nutrition: trends.nutrition,
        recovery: trends.recovery
      },
      achievements,
      personalRecords
    };
  }

  // Get service status
  getServiceStatus(): ServiceStatus {
    return {
      isInitialized: this.isInitialized,
      totalEntries: this.progressEntries.length,
      currentWeek: this.currentWeek,
      lastEntryDate: this.progressEntries.length > 0 ?
        new Date(Math.max(...this.progressEntries.map(e => e.timestamp))) : null
    };
  }
}

export default new ProgressService();