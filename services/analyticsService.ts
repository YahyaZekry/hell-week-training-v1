import AsyncStorage from '@react-native-async-storage/async-storage';

// Type definitions for analytics service
export interface WorkoutSession {
  id: string;
  startTime: string;
  duration: number;
  caloriesBurned?: number;
  overallRating?: number;
  status: 'completed' | 'incomplete' | 'skipped';
  workoutType?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  totalExercises?: number;
  completedExercises?: number;
}

export interface NutritionLog {
  id: string;
  date: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  hydration?: number;
  type?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface RecoveryLog {
  id: string;
  date: string;
  sleepHours?: number;
  sleepQuality?: number; // 1-10 scale
  restingHeartRate?: number;
  muscleSoreness?: number; // 1-10 scale
  energyLevel?: number; // 1-10 scale
  stressLevel?: number; // 1-10 scale
}

export interface WorkoutAnalytics {
  summary: WorkoutSummary;
  trends: WorkoutTrends;
  patterns: WorkoutPatterns;
  performance: WorkoutPerformance;
  predictions: WorkoutPredictions;
}

export interface WorkoutSummary {
  totalWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  averageDuration: number;
  averageCalories: number;
  completionRate: number;
  averageRating: number;
  longestStreak: number;
  currentStreak: number;
}

export interface WorkoutTrends {
  weekly: {
    frequency: number[];
    duration: number[];
    calories: number[];
    labels: string[];
  };
  monthly: {
    frequency: number[];
    duration: number[];
    calories: number[];
    labels: string[];
  };
  progression: {
    trend: 'improving' | 'declining' | 'stable';
    improvement: number;
  };
  consistency: number;
}

export interface WorkoutPatterns {
  bestDay: {
    day: string;
    count: number;
    percentage: number;
  };
  bestTime: {
    hour: number;
    count: number;
    timeRange: string;
    percentage: number;
  };
  preferredType: {
    type: string;
    count: number;
    percentage: number;
  };
  seasonality: {
    preferredSeason: string;
    counts: Record<string, number>;
    percentages: Record<string, number>;
  };
  monthlyPattern: Record<string, number>;
  weeklyPattern: Record<string, number>;
}

export interface WorkoutPerformance {
  improvementRate: number;
  peakPerformance: WorkoutSession | null;
  averagePerformance: number;
  performanceByType: Record<string, {
    average: number;
    best: number;
    worst: number;
    count: number;
  }>;
  performanceByDifficulty: Record<string, {
    average: number;
    best: number;
    count: number;
  }>;
  personalRecords: {
    longestDuration: number;
    mostCalories: number;
    mostExercises: number;
    highestRated: number;
    longestStreak: number;
  };
}

export interface WorkoutPredictions {
  nextWeekWorkouts: number;
  nextMonthWorkouts: number;
  goalAchievementProbability: number;
  recommendedAdjustments: Recommendation[];
}

export interface NutritionAnalytics {
  summary: NutritionSummary;
  trends: NutritionTrends;
  patterns: NutritionPatterns;
  recommendations: Recommendation[];
}

export interface NutritionSummary {
  totalMeals: number;
  totalCalories: number;
  averageCalories: number;
  totalProtein: number;
  averageProtein: number;
  totalCarbs: number;
  averageCarbs: number;
  totalFat: number;
  averageFat: number;
  hydrationAverage: number;
}

export interface NutritionTrends {
  calories: number[];
  protein: number[];
  carbs: number[];
  fat: number[];
  labels: string[];
}

export interface NutritionPatterns {
  bestMealTime: {
    hour: number;
    count: number;
    timeRange: string;
  };
  preferredMealTypes: {
    type: string;
    count: number;
  }[];
  weeklyPatterns: Record<string, number>;
}

export interface RecoveryAnalytics {
  summary: RecoverySummary;
  trends: RecoveryTrends;
  patterns: RecoveryPatterns;
  recommendations: Recommendation[];
}

export interface RecoverySummary {
  totalLogs: number;
  averageSleepHours: string;
  averageSleepQuality: string;
  averageRestingHeartRate: number;
  averageMuscleSoreness: string;
  averageEnergyLevel: string;
  averageStressLevel: string;
  averageRecoveryScore: number;
}

export interface RecoveryTrends {
  sleepHours: number[];
  sleepQuality: number[];
  energyLevel: number[];
  stressLevel: number[];
  recoveryScores: number[];
  labels: string[];
}

export interface RecoveryPatterns {
  bestSleepDay: {
    day: string;
    averageHours: string;
  };
  sleepPatterns: {
    weekdayAverage: number;
    weekendAverage: number;
    bestNight: {
      date: string;
      hours: number;
    } | null;
    worstNight: {
      date: string;
      hours: number;
    } | null;
  };
  stressPatterns: {
    average: string;
    trend: 'increasing' | 'decreasing' | 'stable';
    highest: {
      date: string;
      level: number;
    };
    lowest: {
      date: string;
      level: number;
    };
  };
  energyPatterns: {
    average: string;
    trend: 'increasing' | 'decreasing' | 'stable';
    peak: {
      date: string;
      level: number;
    };
    lowest: {
      date: string;
      level: number;
    };
  };
}

export interface Recommendation {
  type: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
}

export interface OverallAnalytics {
  overallScore: number;
  trends: {
    workoutTrend: {
      trend: 'improving' | 'declining' | 'stable';
      improvement: number;
    };
    nutritionTrend: {
      trend: 'improving' | 'declining' | 'stable';
      change: number;
    };
    recoveryTrend: {
      trend: 'improving' | 'declining' | 'stable';
      change: number;
    };
  };
  recommendations: Recommendation[];
  insights: {
    type: string;
    title: string;
    description: string;
    value: string;
  }[];
}

export interface AnalyticsDashboard {
  workout: WorkoutAnalytics;
  nutrition: NutritionAnalytics;
  recovery: RecoveryAnalytics;
  overall: OverallAnalytics;
}

export interface AnalyticsData {
  lastUpdated: string;
  cachedData: Record<string, any>;
}

export interface ServiceStatus {
  isInitialized: boolean;
  lastUpdated?: string;
  cachedDataKeys: string[];
}

class AnalyticsService {
  private isInitialized: boolean = false;
  private analyticsData: AnalyticsData | null = null;
  private chartData: Record<string, any> = {};

  // Initialize analytics service
  async initialize(): Promise<boolean> {
    try {
      await this.loadAnalyticsData();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize analytics service:', error);
      return false;
    }
  }

  // Load analytics data from storage
  private async loadAnalyticsData(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('analyticsData');
      if (stored) {
        this.analyticsData = JSON.parse(stored);
      } else {
        this.analyticsData = {
          lastUpdated: new Date().toISOString(),
          cachedData: {},
        };
        await this.saveAnalyticsData();
      }
    } catch (error) {
      console.error('Failed to load analytics data:', error);
      this.analyticsData = {
        lastUpdated: new Date().toISOString(),
        cachedData: {},
      };
    }
  }

  // Save analytics data to storage
  private async saveAnalyticsData(): Promise<boolean> {
    try {
      if (this.analyticsData) {
        this.analyticsData.lastUpdated = new Date().toISOString();
        await AsyncStorage.setItem('analyticsData', JSON.stringify(this.analyticsData));
      }
      return true;
    } catch (error) {
      console.error('Failed to save analytics data:', error);
      return false;
    }
  }

  // Generate comprehensive workout analytics
  generateWorkoutAnalytics(workoutSessions: WorkoutSession[], days: number = 30): WorkoutAnalytics {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);

    const filteredSessions = workoutSessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      return sessionDate >= startDate && sessionDate <= endDate;
    });

    return {
      summary: this.generateWorkoutSummary(filteredSessions),
      trends: this.generateWorkoutTrends(filteredSessions),
      patterns: this.generateWorkoutPatterns(filteredSessions),
      performance: this.generateWorkoutPerformance(filteredSessions),
      predictions: this.generateWorkoutPredictions(filteredSessions),
    };
  }

  // Generate workout summary
  private generateWorkoutSummary(sessions: WorkoutSession[]): WorkoutSummary {
    if (sessions.length === 0) {
      return {
        totalWorkouts: 0,
        totalDuration: 0,
        totalCalories: 0,
        averageDuration: 0,
        averageCalories: 0,
        completionRate: 0,
        averageRating: 0,
        longestStreak: 0,
        currentStreak: 0,
      };
    }

    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalCalories = sessions.reduce((sum, s) => sum + (s.caloriesBurned || 0), 0);
    const ratedSessions = sessions.filter(s => s.overallRating);
    const totalRating = ratedSessions.reduce((sum, s) => sum + (s.overallRating || 0), 0);

    return {
      totalWorkouts: sessions.length,
      totalDuration,
      totalCalories,
      averageDuration: Math.round(totalDuration / sessions.length),
      averageCalories: Math.round(totalCalories / sessions.length),
      completionRate: this.calculateCompletionRate(sessions),
      averageRating: ratedSessions.length > 0 ? parseFloat((totalRating / ratedSessions.length).toFixed(1)) : 0,
      longestStreak: this.calculateLongestStreak(sessions),
      currentStreak: this.calculateCurrentStreak(sessions),
    };
  }

  // Generate workout trends
  private generateWorkoutTrends(sessions: WorkoutSession[]): WorkoutTrends {
    const weeklyData = this.groupSessionsByWeek(sessions);
    const monthlyData = this.groupSessionsByMonth(sessions);

    return {
      weekly: {
        frequency: weeklyData.map(week => week.sessions.length),
        duration: weeklyData.map(week => week.averageDuration),
        calories: weeklyData.map(week => week.averageCalories),
        labels: weeklyData.map(week => week.label),
      },
      monthly: {
        frequency: monthlyData.map(month => month.sessions.length),
        duration: monthlyData.map(month => month.averageDuration),
        calories: monthlyData.map(month => month.averageCalories),
        labels: monthlyData.map(month => month.label),
      },
      progression: this.calculateProgression(sessions),
      consistency: this.calculateConsistency(sessions),
    };
  }

  // Generate workout patterns
  private generateWorkoutPatterns(sessions: WorkoutSession[]): WorkoutPatterns {
    return {
      bestDay: this.findBestWorkoutDay(sessions),
      bestTime: this.findBestWorkoutTime(sessions),
      preferredType: this.findPreferredWorkoutType(sessions),
      seasonality: this.analyzeSeasonality(sessions),
      monthlyPattern: this.analyzeMonthlyPattern(sessions),
      weeklyPattern: this.analyzeWeeklyPattern(sessions),
    };
  }

  // Generate workout performance metrics
  private generateWorkoutPerformance(sessions: WorkoutSession[]): WorkoutPerformance {
    return {
      improvementRate: this.calculateImprovementRate(sessions),
      peakPerformance: this.findPeakPerformance(sessions),
      averagePerformance: this.calculateAveragePerformance(sessions),
      performanceByType: this.analyzePerformanceByType(sessions),
      performanceByDifficulty: this.analyzePerformanceByDifficulty(sessions),
      personalRecords: this.identifyPersonalRecords(sessions),
    };
  }

  // Generate workout predictions
  private generateWorkoutPredictions(sessions: WorkoutSession[]): WorkoutPredictions {
    if (sessions.length < 5) {
      return {
        nextWeekWorkouts: 0,
        nextMonthWorkouts: 0,
        goalAchievementProbability: 0,
        recommendedAdjustments: [],
      };
    }

    return {
      nextWeekWorkouts: this.predictNextWeekWorkouts(sessions),
      nextMonthWorkouts: this.predictNextMonthWorkouts(sessions),
      goalAchievementProbability: this.calculateGoalAchievementProbability(sessions),
      recommendedAdjustments: this.generateRecommendations(sessions),
    };
  }

  // Group sessions by week
  private groupSessionsByWeek(sessions: WorkoutSession[]): {
    sessions: WorkoutSession[];
    totalDuration: number;
    totalCalories: number;
    label: string;
    averageDuration: number;
    averageCalories: number;
  }[] {
    const weeks: Record<string, {
      sessions: WorkoutSession[];
      totalDuration: number;
      totalCalories: number;
      label: string;
    }> = {};
    
    sessions.forEach(session => {
      const date = new Date(session.startTime);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!weeks[weekKey]) {
        weeks[weekKey] = {
          sessions: [],
          totalDuration: 0,
          totalCalories: 0,
          label: `W${Math.ceil((date.getDate()) / 7)}`,
        };
      }
      
      weeks[weekKey].sessions.push(session);
      weeks[weekKey].totalDuration += session.duration;
      weeks[weekKey].totalCalories += session.caloriesBurned || 0;
    });

    return Object.values(weeks).map(week => ({
      ...week,
      averageDuration: week.sessions.length > 0 ? Math.round(week.totalDuration / week.sessions.length) : 0,
      averageCalories: week.sessions.length > 0 ? Math.round(week.totalCalories / week.sessions.length) : 0,
    }));
  }

  // Group sessions by month
  private groupSessionsByMonth(sessions: WorkoutSession[]): {
    sessions: WorkoutSession[];
    totalDuration: number;
    totalCalories: number;
    label: string;
    averageDuration: number;
    averageCalories: number;
  }[] {
    const months: Record<string, {
      sessions: WorkoutSession[];
      totalDuration: number;
      totalCalories: number;
      label: string;
    }> = {};
    
    sessions.forEach(session => {
      const date = new Date(session.startTime);
      const monthKey = date.toISOString().substring(0, 7); // YYYY-MM
      
      if (!months[monthKey]) {
        months[monthKey] = {
          sessions: [],
          totalDuration: 0,
          totalCalories: 0,
          label: date.toLocaleDateString('en', { month: 'short' }),
        };
      }
      
      months[monthKey].sessions.push(session);
      months[monthKey].totalDuration += session.duration;
      months[monthKey].totalCalories += session.caloriesBurned || 0;
    });

    return Object.values(months).map(month => ({
      ...month,
      averageDuration: month.sessions.length > 0 ? Math.round(month.totalDuration / month.sessions.length) : 0,
      averageCalories: month.sessions.length > 0 ? Math.round(month.totalCalories / month.sessions.length) : 0,
    }));
  }

  // Calculate completion rate
  private calculateCompletionRate(sessions: WorkoutSession[]): number {
    if (sessions.length === 0) return 0;
    const completedSessions = sessions.filter(s => s.status === 'completed').length;
    return Math.round((completedSessions / sessions.length) * 100);
  }

  // Calculate longest streak
  private calculateLongestStreak(sessions: WorkoutSession[]): number {
    if (sessions.length === 0) return 0;

    const sortedSessions = sessions.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    let longestStreak = 0;
    let currentStreak = 0;
    let lastDate: Date | null = null;

    sortedSessions.forEach(session => {
      const sessionDate = new Date(session.startTime);
      sessionDate.setHours(0, 0, 0, 0);

      if (lastDate) {
        const dayDiff = Math.floor((sessionDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (dayDiff === 1) {
          currentStreak++;
        } else if (dayDiff > 1) {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      longestStreak = Math.max(longestStreak, currentStreak);
      lastDate = sessionDate;
    });

    return longestStreak;
  }

  // Calculate current streak
  private calculateCurrentStreak(sessions: WorkoutSession[]): number {
    if (sessions.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sortedSessions = sessions.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    let currentStreak = 0;
    const checkDate = new Date(today);

    while (currentStreak < sortedSessions.length) {
      const hasWorkoutOnDate = sortedSessions.some(session => {
        const sessionDate = new Date(session.startTime);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === checkDate.getTime();
      });

      if (hasWorkoutOnDate) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return currentStreak;
  }

  // Calculate progression
  private calculateProgression(sessions: WorkoutSession[]): { trend: 'improving' | 'declining' | 'stable'; improvement: number } {
    if (sessions.length < 2) return { trend: 'stable', improvement: 0 };

    const sortedSessions = sessions.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    const firstHalf = sortedSessions.slice(0, Math.floor(sortedSessions.length / 2));
    const secondHalf = sortedSessions.slice(Math.floor(sortedSessions.length / 2));

    const firstAvgDuration = firstHalf.reduce((sum, s) => sum + s.duration, 0) / firstHalf.length;
    const secondAvgDuration = secondHalf.reduce((sum, s) => sum + s.duration, 0) / secondHalf.length;

    const improvement = ((secondAvgDuration - firstAvgDuration) / firstAvgDuration) * 100;
    
    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (improvement > 10) trend = 'improving';
    else if (improvement < -10) trend = 'declining';

    return { trend, improvement: Math.round(improvement) };
  }

  // Calculate consistency
  private calculateConsistency(sessions: WorkoutSession[]): number {
    if (sessions.length === 0) return 0;

    const weeklyFrequency = this.groupSessionsByWeek(sessions);
    const frequencies = weeklyFrequency.map(week => week.sessions.length);
    
    const average = frequencies.reduce((sum, f) => sum + f, 0) / frequencies.length;
    const variance = frequencies.reduce((sum, f) => sum + Math.pow(f - average, 2), 0) / frequencies.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Consistency score: lower standard deviation = higher consistency
    const maxPossibleStd = Math.max(average, 1);
    const consistencyScore = Math.max(0, Math.round((1 - (standardDeviation / maxPossibleStd)) * 100));
    
    return consistencyScore;
  }

  // Find best workout day
  private findBestWorkoutDay(sessions: WorkoutSession[]): { day: string; count: number; percentage: number } {
    const dayCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }; // Sunday = 0
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    sessions.forEach(session => {
      const day = new Date(session.startTime).getDay();
      dayCounts[day]++;
    });

    const maxCount = Math.max(...Object.values(dayCounts));
    const bestDayKey = Object.keys(dayCounts).find(day => dayCounts[parseInt(day)] === maxCount);

    return {
      day: dayNames[parseInt(bestDayKey || '0')],
      count: maxCount,
      percentage: Math.round((maxCount / sessions.length) * 100),
    };
  }

  // Find best workout time
  private findBestWorkoutTime(sessions: WorkoutSession[]): { hour: number; count: number; timeRange: string; percentage: number } {
    const hourCounts: Record<number, number> = {};
    
    sessions.forEach(session => {
      const hour = new Date(session.startTime).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(hourCounts));
    const bestHour = Object.keys(hourCounts).find(hour => hourCounts[parseInt(hour)] === maxCount);

    return {
      hour: parseInt(bestHour || '0'),
      count: maxCount,
      timeRange: this.getTimeRange(parseInt(bestHour || '0')),
      percentage: Math.round((maxCount / sessions.length) * 100),
    };
  }

  // Get time range label
  private getTimeRange(hour: number): string {
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  }

  // Find preferred workout type
  private findPreferredWorkoutType(sessions: WorkoutSession[]): { type: string; count: number; percentage: number } {
    const typeCounts: Record<string, number> = {};
    
    sessions.forEach(session => {
      const type = session.workoutType || 'unknown';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(typeCounts));
    const preferredType = Object.keys(typeCounts).find(type => typeCounts[type] === maxCount);

    return {
      type: preferredType || 'unknown',
      count: maxCount,
      percentage: Math.round((maxCount / sessions.length) * 100),
    };
  }

  // Analyze seasonality
  private analyzeSeasonality(sessions: WorkoutSession[]): {
    preferredSeason: string;
    counts: Record<string, number>;
    percentages: Record<string, number>;
  } {
    const seasonCounts: Record<string, number> = { Spring: 0, Summer: 0, Fall: 0, Winter: 0 };
    
    sessions.forEach(session => {
      const month = new Date(session.startTime).getMonth();
      let season: string;
      if (month >= 2 && month <= 4) season = 'Spring';
      else if (month >= 5 && month <= 7) season = 'Summer';
      else if (month >= 8 && month <= 10) season = 'Fall';
      else season = 'Winter';
      
      seasonCounts[season]++;
    });

    const maxCount = Math.max(...Object.values(seasonCounts));
    const preferredSeason = Object.keys(seasonCounts).find(season => seasonCounts[season] === maxCount) || 'Spring';

    return {
      preferredSeason,
      counts: seasonCounts,
      percentages: Object.fromEntries(
        Object.entries(seasonCounts).map(([season, count]) => [
          season,
          Math.round((count / sessions.length) * 100),
        ])
      ),
    };
  }

  // Analyze monthly pattern
  private analyzeMonthlyPattern(sessions: WorkoutSession[]): Record<string, number> {
    const monthCounts: Record<string, number> = {};
    
    sessions.forEach(session => {
      const month = new Date(session.startTime).getMonth();
      const monthName = new Date(2000, month, 1).toLocaleDateString('en', { month: 'long' });
      monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
    });

    return monthCounts;
  }

  // Analyze weekly pattern
  private analyzeWeeklyPattern(sessions: WorkoutSession[]): Record<string, number> {
    const dayCounts: Record<string, number> = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 };
    
    sessions.forEach(session => {
      const dayName = new Date(session.startTime).toLocaleDateString('en', { weekday: 'long' });
      dayCounts[dayName]++;
    });

    return dayCounts;
  }

  // Calculate improvement rate
  private calculateImprovementRate(sessions: WorkoutSession[]): number {
    if (sessions.length < 4) return 0;

    const sortedSessions = sessions.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    const recentSessions = sortedSessions.slice(-4);
    const earlierSessions = sortedSessions.slice(-8, -4);

    if (earlierSessions.length === 0) return 0;

    const recentAvg = recentSessions.reduce((sum, s) => sum + s.duration, 0) / recentSessions.length;
    const earlierAvg = earlierSessions.reduce((sum, s) => sum + s.duration, 0) / earlierSessions.length;

    return Math.round(((recentAvg - earlierAvg) / earlierAvg) * 100);
  }

  // Find peak performance
  private findPeakPerformance(sessions: WorkoutSession[]): WorkoutSession | null {
    if (sessions.length === 0) return null;

    return sessions.reduce((peak, session) => {
      const sessionScore = this.calculatePerformanceScore(session);
      const peakScore = this.calculatePerformanceScore(peak);
      return sessionScore > peakScore ? session : peak;
    });
  }

  // Calculate average performance
  private calculateAveragePerformance(sessions: WorkoutSession[]): number {
    if (sessions.length === 0) return 0;

    const totalScore = sessions.reduce((sum, session) => sum + this.calculatePerformanceScore(session), 0);
    return Math.round(totalScore / sessions.length);
  }

  // Calculate performance score for a session
  private calculatePerformanceScore(session: WorkoutSession): number {
    let score = 0;
    
    // Duration score (0-30 points)
    score += Math.min(30, session.duration / 60);
    
    // Exercise completion score (0-30 points)
    if (session.totalExercises && session.totalExercises > 0) {
      score += (session.completedExercises || 0) / session.totalExercises * 30;
    }
    
    // Rating score (0-20 points)
    if (session.overallRating) {
      score += (session.overallRating / 5) * 20;
    }
    
    // Calories score (0-20 points)
    score += Math.min(20, (session.caloriesBurned || 0) / 10);
    
    return Math.round(score);
  }

  // Analyze performance by type
  private analyzePerformanceByType(sessions: WorkoutSession[]): Record<string, {
    average: number;
    best: number;
    worst: number;
    count: number;
  }> {
    const typePerformance: Record<string, number[]> = {};
    
    sessions.forEach(session => {
      const type = session.workoutType || 'unknown';
      if (!typePerformance[type]) {
        typePerformance[type] = [];
      }
      typePerformance[type].push(this.calculatePerformanceScore(session));
    });

    return Object.fromEntries(
      Object.entries(typePerformance).map(([type, scores]) => [
        type,
        {
          average: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
          best: Math.max(...scores),
          worst: Math.min(...scores),
          count: scores.length,
        },
      ])
    );
  }

  // Analyze performance by difficulty
  private analyzePerformanceByDifficulty(sessions: WorkoutSession[]): Record<string, {
    average: number;
    best: number;
    count: number;
  }> {
    const difficultyPerformance: Record<string, number[]> = { beginner: [], intermediate: [], advanced: [] };
    
    sessions.forEach(session => {
      const difficulty = session.difficulty || 'intermediate';
      if (difficultyPerformance[difficulty]) {
        difficultyPerformance[difficulty].push(this.calculatePerformanceScore(session));
      }
    });

    return Object.fromEntries(
      Object.entries(difficultyPerformance).map(([difficulty, scores]) => [
        difficulty,
        {
          average: scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0,
          best: scores.length > 0 ? Math.max(...scores) : 0,
          count: scores.length,
        },
      ])
    );
  }

  // Identify personal records
  private identifyPersonalRecords(sessions: WorkoutSession[]): {
    longestDuration: number;
    mostCalories: number;
    mostExercises: number;
    highestRated: number;
    longestStreak: number;
  } {
    if (sessions.length === 0) {
      return {
        longestDuration: 0,
        mostCalories: 0,
        mostExercises: 0,
        highestRated: 0,
        longestStreak: 0,
      };
    }

    return {
      longestDuration: Math.max(...sessions.map(s => s.duration)),
      mostCalories: Math.max(...sessions.map(s => s.caloriesBurned || 0)),
      mostExercises: Math.max(...sessions.map(s => s.completedExercises || 0)),
      highestRated: Math.max(...sessions.map(s => s.overallRating || 0)),
      longestStreak: this.calculateLongestStreak(sessions),
    };
  }

  // Predict next week workouts
  private predictNextWeekWorkouts(sessions: WorkoutSession[]): number {
    const weeklyAverage = this.calculateWeeklyAverage(sessions);
    const trend = this.calculateProgression(sessions);
    
    let prediction = weeklyAverage;
    if (trend.trend === 'improving') {
      prediction += 0.5;
    } else if (trend.trend === 'declining') {
      prediction -= 0.5;
    }
    
    return Math.max(0, Math.round(prediction));
  }

  // Predict next month workouts
  private predictNextMonthWorkouts(sessions: WorkoutSession[]): number {
    const monthlyAverage = this.calculateMonthlyAverage(sessions);
    const trend = this.calculateProgression(sessions);
    
    let prediction = monthlyAverage;
    if (trend.trend === 'improving') {
      prediction *= 1.1;
    } else if (trend.trend === 'declining') {
      prediction *= 0.9;
    }
    
    return Math.max(0, Math.round(prediction));
  }

  // Calculate weekly average
  private calculateWeeklyAverage(sessions: WorkoutSession[]): number {
    if (sessions.length === 0) return 0;
    return sessions.length / 4; // Approximate 4 weeks
  }

  // Calculate monthly average
  private calculateMonthlyAverage(sessions: WorkoutSession[]): number {
    if (sessions.length === 0) return 0;
    return sessions.length;
  }

  // Calculate goal achievement probability
  private calculateGoalAchievementProbability(sessions: WorkoutSession[]): number {
    const consistency = this.calculateConsistency(sessions);
    const improvement = this.calculateImprovementRate(sessions);
    const completionRate = this.calculateCompletionRate(sessions);
    
    // Weighted score calculation
    const score = (consistency * 0.4) + (Math.max(0, Math.min(100, improvement)) * 0.3) + (completionRate * 0.3);
    
    return Math.round(score);
  }

  // Generate recommendations
  private generateRecommendations(sessions: WorkoutSession[]): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const consistency = this.calculateConsistency(sessions);
    const patterns = this.generateWorkoutPatterns(sessions);
    const performance = this.generateWorkoutPerformance(sessions);

    if (consistency < 50) {
      recommendations.push({
        type: 'consistency',
        priority: 'high',
        title: 'Improve Workout Consistency',
        description: 'Your workout consistency is below 50%. Try to establish a regular routine.',
        action: 'Set specific workout days and times, and use reminders.',
      });
    }

    if (performance.improvementRate < 0) {
      recommendations.push({
        type: 'performance',
        priority: 'medium',
        title: 'Focus on Progressive Overload',
        description: 'Your performance has been declining. Consider increasing intensity gradually.',
        action: 'Add 5-10% more weight, reps, or duration each week.',
      });
    }

    if (patterns.bestDay.count < sessions.length * 0.3) {
      recommendations.push({
        type: 'scheduling',
        priority: 'medium',
        title: 'Optimize Workout Schedule',
        description: 'You don\'t have a clear preferred workout day. Establish a routine.',
        action: 'Try working out on the same days each week for better consistency.',
      });
    }

    return recommendations;
  }

  // Generate nutrition analytics
  generateNutritionAnalytics(nutritionLogs: NutritionLog[], days: number = 30): NutritionAnalytics {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);

    const filteredLogs = nutritionLogs.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });

    return {
      summary: this.generateNutritionSummary(filteredLogs),
      trends: this.generateNutritionTrends(filteredLogs),
      patterns: this.generateNutritionPatterns(filteredLogs),
      recommendations: this.generateNutritionRecommendations(filteredLogs),
    };
  }

  // Generate nutrition summary
  private generateNutritionSummary(logs: NutritionLog[]): NutritionSummary {
    if (logs.length === 0) {
      return {
        totalMeals: 0,
        totalCalories: 0,
        averageCalories: 0,
        totalProtein: 0,
        averageProtein: 0,
        totalCarbs: 0,
        averageCarbs: 0,
        totalFat: 0,
        averageFat: 0,
        hydrationAverage: 0,
      };
    }

    const totals = logs.reduce((acc, log) => ({
      calories: acc.calories + (log.calories || 0),
      protein: acc.protein + (log.protein || 0),
      carbs: acc.carbs + (log.carbs || 0),
      fat: acc.fat + (log.fat || 0),
      hydration: acc.hydration + (log.hydration || 0),
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, hydration: 0 });

    return {
      totalMeals: logs.length,
      totalCalories: totals.calories,
      averageCalories: Math.round(totals.calories / logs.length),
      totalProtein: totals.protein,
      averageProtein: Math.round(totals.protein / logs.length),
      totalCarbs: totals.carbs,
      averageCarbs: Math.round(totals.carbs / logs.length),
      totalFat: totals.fat,
      averageFat: Math.round(totals.fat / logs.length),
      hydrationAverage: Math.round(totals.hydration / logs.length),
    };
  }

  // Generate nutrition trends
  private generateNutritionTrends(logs: NutritionLog[]): NutritionTrends {
    const dailyData = this.groupNutritionByDay(logs);
    
    return {
      calories: dailyData.map(day => day.calories),
      protein: dailyData.map(day => day.protein),
      carbs: dailyData.map(day => day.carbs),
      fat: dailyData.map(day => day.fat),
      labels: dailyData.map(day => day.label),
    };
  }

  // Generate nutrition patterns
  private generateNutritionPatterns(logs: NutritionLog[]): NutritionPatterns {
    return {
      bestMealTime: this.findBestMealTime(logs),
      preferredMealTypes: this.findPreferredMealTypes(logs),
      weeklyPatterns: this.analyzeNutritionWeeklyPatterns(logs),
    };
  }

  // Generate nutrition recommendations
  private generateNutritionRecommendations(logs: NutritionLog[]): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const summary = this.generateNutritionSummary(logs);

    if (summary.averageCalories < 1500) {
      recommendations.push({
        type: 'calories',
        priority: 'high',
        title: 'Increase Calorie Intake',
        description: 'Your average calorie intake is quite low. Consider eating more.',
        action: 'Add healthy snacks or increase portion sizes.',
      });
    }

    if (summary.averageProtein < 50) {
      recommendations.push({
        type: 'protein',
        priority: 'medium',
        title: 'Increase Protein Intake',
        description: 'Your protein intake may be insufficient for muscle recovery.',
        action: 'Include lean protein sources in each meal.',
      });
    }

    if (summary.hydrationAverage < 64) {
      recommendations.push({
        type: 'hydration',
        priority: 'medium',
        title: 'Increase Water Intake',
        description: 'You may not be drinking enough water for optimal performance.',
        action: 'Aim for at least 64 ounces of water daily.',
      });
    }

    return recommendations;
  }

  // Group nutrition logs by day
  private groupNutritionByDay(logs: NutritionLog[]): {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    hydration: number;
    label: string;
  }[] {
    const dailyData: Record<string, {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      hydration: number;
      label: string;
    }> = {};
    
    logs.forEach(log => {
      const date = log.date.split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          hydration: 0,
          label: new Date(date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
        };
      }
      
      dailyData[date].calories += log.calories || 0;
      dailyData[date].protein += log.protein || 0;
      dailyData[date].carbs += log.carbs || 0;
      dailyData[date].fat += log.fat || 0;
      dailyData[date].hydration += log.hydration || 0;
    });

    return Object.values(dailyData);
  }

  // Find best meal time
  private findBestMealTime(logs: NutritionLog[]): { hour: number; count: number; timeRange: string } {
    const hourCounts: Record<number, number> = {};
    
    logs.forEach(log => {
      const hour = new Date(log.date).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(hourCounts));
    const bestHour = Object.keys(hourCounts).find(hour => hourCounts[parseInt(hour)] === maxCount);

    return {
      hour: parseInt(bestHour || '0'),
      count: maxCount,
      timeRange: this.getTimeRange(parseInt(bestHour || '0')),
    };
  }

  // Find preferred meal types
  private findPreferredMealTypes(logs: NutritionLog[]): { type: string; count: number }[] {
    const typeCounts: Record<string, number> = {};
    
    logs.forEach(log => {
      const type = log.type || 'unknown';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    return Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([type, count]) => ({ type, count }));
  }

  // Analyze nutrition weekly patterns
  private analyzeNutritionWeeklyPatterns(logs: NutritionLog[]): Record<string, number> {
    const dayCounts: Record<string, number> = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 };
    
    logs.forEach(log => {
      const dayName = new Date(log.date).toLocaleDateString('en', { weekday: 'long' });
      dayCounts[dayName]++;
    });

    return dayCounts;
  }

  // Generate recovery analytics
  generateRecoveryAnalytics(recoveryLogs: RecoveryLog[], days: number = 30): RecoveryAnalytics {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);

    const filteredLogs = recoveryLogs.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });

    return {
      summary: this.generateRecoverySummary(filteredLogs),
      trends: this.generateRecoveryTrends(filteredLogs),
      patterns: this.generateRecoveryPatterns(filteredLogs),
      recommendations: this.generateRecoveryRecommendations(filteredLogs),
    };
  }

  // Generate recovery summary
  private generateRecoverySummary(logs: RecoveryLog[]): RecoverySummary {
    if (logs.length === 0) {
      return {
        totalLogs: 0,
        averageSleepHours: '0',
        averageSleepQuality: '0',
        averageRestingHeartRate: 0,
        averageMuscleSoreness: '0',
        averageEnergyLevel: '0',
        averageStressLevel: '0',
        averageRecoveryScore: 0,
      };
    }

    const totals = logs.reduce((acc, log) => ({
      sleepHours: acc.sleepHours + (log.sleepHours || 0),
      sleepQuality: acc.sleepQuality + (log.sleepQuality || 0),
      restingHeartRate: acc.restingHeartRate + (log.restingHeartRate || 0),
      muscleSoreness: acc.muscleSoreness + (log.muscleSoreness || 0),
      energyLevel: acc.energyLevel + (log.energyLevel || 0),
      stressLevel: acc.stressLevel + (log.stressLevel || 0),
    }), { sleepHours: 0, sleepQuality: 0, restingHeartRate: 0, muscleSoreness: 0, energyLevel: 0, stressLevel: 0 });

    const count = logs.length;
    return {
      totalLogs: count,
      averageSleepHours: (totals.sleepHours / count).toFixed(1),
      averageSleepQuality: (totals.sleepQuality / count).toFixed(1),
      averageRestingHeartRate: Math.round(totals.restingHeartRate / count),
      averageMuscleSoreness: (totals.muscleSoreness / count).toFixed(1),
      averageEnergyLevel: (totals.energyLevel / count).toFixed(1),
      averageStressLevel: (totals.stressLevel / count).toFixed(1),
      averageRecoveryScore: this.calculateAverageRecoveryScore(logs),
    };
  }

  // Generate recovery trends
  private generateRecoveryTrends(logs: RecoveryLog[]): RecoveryTrends {
    const dailyData = this.groupRecoveryByDay(logs);
    
    return {
      sleepHours: dailyData.map(day => day.sleepHours),
      sleepQuality: dailyData.map(day => day.sleepQuality),
      energyLevel: dailyData.map(day => day.energyLevel),
      stressLevel: dailyData.map(day => day.stressLevel),
      recoveryScores: dailyData.map(day => day.recoveryScore),
      labels: dailyData.map(day => day.label),
    };
  }

  // Generate recovery patterns
  private generateRecoveryPatterns(logs: RecoveryLog[]): RecoveryPatterns {
    return {
      bestSleepDay: this.findBestSleepDay(logs),
      sleepPatterns: this.analyzeSleepPatterns(logs),
      stressPatterns: this.analyzeStressPatterns(logs),
      energyPatterns: this.analyzeEnergyPatterns(logs),
    };
  }

  // Generate recovery recommendations
  private generateRecoveryRecommendations(logs: RecoveryLog[]): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const summary = this.generateRecoverySummary(logs);

    if (parseFloat(summary.averageSleepHours) < 7) {
      recommendations.push({
        type: 'sleep',
        priority: 'high',
        title: 'Increase Sleep Duration',
        description: 'You\'re averaging less than 7 hours of sleep per night.',
        action: 'Aim for 7-9 hours of sleep for optimal recovery.',
      });
    }

    if (parseFloat(summary.averageSleepQuality) < 7) {
      recommendations.push({
        type: 'sleep_quality',
        priority: 'medium',
        title: 'Improve Sleep Quality',
        description: 'Your sleep quality could be better.',
        action: 'Try maintaining a consistent sleep schedule and optimizing your sleep environment.',
      });
    }

    if (parseFloat(summary.averageStressLevel) > 6) {
      recommendations.push({
        type: 'stress',
        priority: 'high',
        title: 'Manage Stress Levels',
        description: 'Your average stress level is quite high.',
        action: 'Consider stress management techniques like meditation or deep breathing.',
      });
    }

    return recommendations;
  }

  // Group recovery logs by day
  private groupRecoveryByDay(logs: RecoveryLog[]): {
    sleepHours: number;
    sleepQuality: number;
    energyLevel: number;
    stressLevel: number;
    recoveryScore: number;
    label: string;
  }[] {
    const dailyData: Record<string, {
      sleepHours: number;
      sleepQuality: number;
      energyLevel: number;
      stressLevel: number;
      recoveryScore: number;
      label: string;
      count: number;
    }> = {};
    
    logs.forEach(log => {
      const date = log.date.split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          sleepHours: 0,
          sleepQuality: 0,
          energyLevel: 0,
          stressLevel: 0,
          recoveryScore: 0,
          label: new Date(date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
          count: 0,
        };
      }
      
      dailyData[date].sleepHours += log.sleepHours || 0;
      dailyData[date].sleepQuality += log.sleepQuality || 0;
      dailyData[date].energyLevel += log.energyLevel || 0;
      dailyData[date].stressLevel += log.stressLevel || 0;
      dailyData[date].recoveryScore += this.calculateRecoveryScore(log);
      dailyData[date].count++;
    });

    return Object.values(dailyData).map(day => ({
      sleepHours: day.sleepHours / day.count,
      sleepQuality: day.sleepQuality / day.count,
      energyLevel: day.energyLevel / day.count,
      stressLevel: day.stressLevel / day.count,
      recoveryScore: day.recoveryScore / day.count,
      label: day.label,
    }));
  }

  // Find best sleep day
  private findBestSleepDay(logs: RecoveryLog[]): { day: string; averageHours: string } {
    const daySleep: Record<string, number[]> = { Sunday: [], Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [] };
    
    logs.forEach(log => {
      const dayName = new Date(log.date).toLocaleDateString('en', { weekday: 'long' });
      if (log.sleepHours) {
        daySleep[dayName].push(log.sleepHours);
      }
    });

    const dayAverages = Object.fromEntries(
      Object.entries(daySleep).map(([day, hours]) => [
        day,
        hours.length > 0 ? hours.reduce((sum, h) => sum + h, 0) / hours.length : 0,
      ])
    );

    const bestDay = Object.keys(dayAverages).reduce((best, day) => 
      dayAverages[day] > dayAverages[best] ? day : best
    );

    return {
      day: bestDay,
      averageHours: dayAverages[bestDay].toFixed(1),
    };
  }

  // Analyze sleep patterns
  private analyzeSleepPatterns(logs: RecoveryLog[]): {
    weekdayAverage: number;
    weekendAverage: number;
    bestNight: { date: string; hours: number } | null;
    worstNight: { date: string; hours: number } | null;
  } {
    const patterns = {
      weekdayAverage: 0,
      weekendAverage: 0,
      bestNight: null as { date: string; hours: number } | null,
      worstNight: null as { date: string; hours: number } | null,
    };

    const weekdayLogs = logs.filter(log => {
      const day = new Date(log.date).getDay();
      return day >= 1 && day <= 5; // Monday to Friday
    });

    const weekendLogs = logs.filter(log => {
      const day = new Date(log.date).getDay();
      return day === 0 || day === 6; // Sunday or Saturday
    });

    if (weekdayLogs.length > 0) {
      patterns.weekdayAverage = weekdayLogs.reduce((sum, log) => sum + (log.sleepHours || 0), 0) / weekdayLogs.length;
    }

    if (weekendLogs.length > 0) {
      patterns.weekendAverage = weekendLogs.reduce((sum, log) => sum + (log.sleepHours || 0), 0) / weekendLogs.length;
    }

    const sleepLogs = logs.filter(log => log.sleepHours);
    if (sleepLogs.length > 0) {
      const bestSleep = sleepLogs.reduce((best, log) => 
        (log.sleepHours || 0) > (best.sleepHours || 0) ? log : best
      );
      const worstSleep = sleepLogs.reduce((worst, log) => 
        (log.sleepHours || 0) < (worst.sleepHours || Infinity) ? log : worst
      );

      patterns.bestNight = {
        date: bestSleep.date,
        hours: bestSleep.sleepHours || 0,
      };
      patterns.worstNight = {
        date: worstSleep.date,
        hours: worstSleep.sleepHours || 0,
      };
    }

    return patterns;
  }

  // Analyze stress patterns
  private analyzeStressPatterns(logs: RecoveryLog[]): {
    average: string;
    trend: 'increasing' | 'decreasing' | 'stable';
    highest: { date: string; level: number };
    lowest: { date: string; level: number };
  } {
    const stressLogs = logs.filter(log => log.stressLevel);
    
    if (stressLogs.length === 0) {
      return { average: '0', trend: 'stable', highest: { date: '', level: 0 }, lowest: { date: '', level: 0 } };
    }

    const average = stressLogs.reduce((sum, log) => sum + (log.stressLevel || 0), 0) / stressLogs.length;
    
    const sortedLogs = stressLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const firstHalf = sortedLogs.slice(0, Math.floor(sortedLogs.length / 2));
    const secondHalf = sortedLogs.slice(Math.floor(sortedLogs.length / 2));

    const firstAvg = firstHalf.reduce((sum, log) => sum + (log.stressLevel || 0), 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, log) => sum + (log.stressLevel || 0), 0) / secondHalf.length;

    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (secondAvg > firstAvg + 0.5) trend = 'increasing';
    else if (secondAvg < firstAvg - 0.5) trend = 'decreasing';

    const highest = stressLogs.reduce((highest, log) => 
      (log.stressLevel || 0) > (highest.stressLevel || 0) ? log : highest
    );
    const lowest = stressLogs.reduce((lowest, log) => 
      (log.stressLevel || Infinity) < (lowest.stressLevel || Infinity) ? log : lowest
    );

    return {
      average: average.toFixed(1),
      trend,
      highest: { date: highest.date, level: highest.stressLevel || 0 },
      lowest: { date: lowest.date, level: lowest.stressLevel || 0 },
    };
  }

  // Analyze energy patterns
  private analyzeEnergyPatterns(logs: RecoveryLog[]): {
    average: string;
    trend: 'increasing' | 'decreasing' | 'stable';
    peak: { date: string; level: number };
    lowest: { date: string; level: number };
  } {
    const energyLogs = logs.filter(log => log.energyLevel);
    
    if (energyLogs.length === 0) {
      return { average: '0', trend: 'stable', peak: { date: '', level: 0 }, lowest: { date: '', level: 0 } };
    }

    const average = energyLogs.reduce((sum, log) => sum + (log.energyLevel || 0), 0) / energyLogs.length;
    
    const sortedLogs = energyLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const firstHalf = sortedLogs.slice(0, Math.floor(sortedLogs.length / 2));
    const secondHalf = sortedLogs.slice(Math.floor(sortedLogs.length / 2));

    const firstAvg = firstHalf.reduce((sum, log) => sum + (log.energyLevel || 0), 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, log) => sum + (log.energyLevel || 0), 0) / secondHalf.length;

    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (secondAvg > firstAvg + 0.5) trend = 'increasing';
    else if (secondAvg < firstAvg - 0.5) trend = 'decreasing';

    const peak = energyLogs.reduce((peak, log) => 
      (log.energyLevel || 0) > (peak.energyLevel || 0) ? log : peak
    );
    const lowest = energyLogs.reduce((lowest, log) => 
      (log.energyLevel || Infinity) < (lowest.energyLevel || Infinity) ? log : lowest
    );

    return {
      average: average.toFixed(1),
      trend,
      peak: { date: peak.date, level: peak.energyLevel || 0 },
      lowest: { date: lowest.date, level: lowest.energyLevel || 0 },
    };
  }

  // Calculate recovery score for a single log
  private calculateRecoveryScore(log: RecoveryLog): number {
    let score = 0;
    let factors = 0;

    if (log.sleepQuality) {
      score += (log.sleepQuality / 10) * 25;
      factors++;
    }

    if (log.sleepHours) {
      score += Math.min(1, log.sleepHours / 8) * 25;
      factors++;
    }

    if (log.energyLevel) {
      score += (log.energyLevel / 10) * 25;
      factors++;
    }

    if (log.stressLevel) {
      score += ((10 - log.stressLevel) / 10) * 25;
      factors++;
    }

    return factors > 0 ? score : 0;
  }

  // Calculate average recovery score
  private calculateAverageRecoveryScore(logs: RecoveryLog[]): number {
    if (logs.length === 0) return 0;
    
    const totalScore = logs.reduce((sum, log) => sum + this.calculateRecoveryScore(log), 0);
    return Math.round(totalScore / logs.length);
  }

  // Generate comprehensive analytics dashboard
  generateAnalyticsDashboard(
    workoutSessions: WorkoutSession[], 
    nutritionLogs: NutritionLog[], 
    recoveryLogs: RecoveryLog[], 
    days: number = 30
  ): AnalyticsDashboard {
    return {
      workout: this.generateWorkoutAnalytics(workoutSessions, days),
      nutrition: this.generateNutritionAnalytics(nutritionLogs, days),
      recovery: this.generateRecoveryAnalytics(recoveryLogs, days),
      overall: this.generateOverallAnalytics(workoutSessions, nutritionLogs, recoveryLogs, days),
    };
  }

  // Generate overall analytics
  private generateOverallAnalytics(
    workoutSessions: WorkoutSession[], 
    nutritionLogs: NutritionLog[], 
    recoveryLogs: RecoveryLog[], 
    days: number
  ): OverallAnalytics {
    return {
      overallScore: this.calculateOverallScore(workoutSessions, nutritionLogs, recoveryLogs),
      trends: this.calculateOverallTrends(workoutSessions, nutritionLogs, recoveryLogs),
      recommendations: this.generateOverallRecommendations(workoutSessions, nutritionLogs, recoveryLogs),
      insights: this.generateInsights(workoutSessions, nutritionLogs, recoveryLogs),
    };
  }

  // Calculate overall score
  private calculateOverallScore(
    workoutSessions: WorkoutSession[], 
    nutritionLogs: NutritionLog[], 
    recoveryLogs: RecoveryLog[]
  ): number {
    let workoutScore = 0;
    let nutritionScore = 0;
    let recoveryScore = 0;

    if (workoutSessions.length > 0) {
      const workoutAnalytics = this.generateWorkoutAnalytics(workoutSessions);
      workoutScore = (
        (workoutAnalytics.summary.completionRate * 0.3) +
        (this.calculateConsistency(workoutSessions) * 0.4) +
        (workoutAnalytics.summary.averageRating * 20 * 0.3)
      );
    }

    if (nutritionLogs.length > 0) {
      const nutritionAnalytics = this.generateNutritionAnalytics(nutritionLogs);
      nutritionScore = (
        (Math.min(100, nutritionAnalytics.summary.averageCalories / 20) * 0.4) +
        (Math.min(100, nutritionAnalytics.summary.averageProtein * 2) * 0.3) +
        (Math.min(100, nutritionAnalytics.summary.hydrationAverage / 100 * 100) * 0.3)
      );
    }

    if (recoveryLogs.length > 0) {
      const recoveryAnalytics = this.generateRecoveryAnalytics(recoveryLogs);
      recoveryScore = parseFloat(recoveryAnalytics.summary.averageRecoveryScore.toString());
    }

    const totalWeight = (workoutSessions.length > 0 ? 1 : 0) + 
                       (nutritionLogs.length > 0 ? 1 : 0) + 
                       (recoveryLogs.length > 0 ? 1 : 0);

    if (totalWeight === 0) return 0;

    return Math.round((workoutScore + nutritionScore + recoveryScore) / totalWeight);
  }

  // Calculate overall trends
  private calculateOverallTrends(
    workoutSessions: WorkoutSession[], 
    nutritionLogs: NutritionLog[], 
    recoveryLogs: RecoveryLog[]
  ): OverallAnalytics['trends'] {
    return {
      workoutTrend: this.calculateProgression(workoutSessions),
      nutritionTrend: this.calculateNutritionTrend(nutritionLogs),
      recoveryTrend: this.calculateRecoveryTrend(recoveryLogs),
    };
  }

  // Calculate nutrition trend
  private calculateNutritionTrend(nutritionLogs: NutritionLog[]): { trend: 'improving' | 'declining' | 'stable'; change: number } {
    if (nutritionLogs.length < 4) return { trend: 'stable', change: 0 };

    const sortedLogs = nutritionLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const recentLogs = sortedLogs.slice(-4);
    const earlierLogs = sortedLogs.slice(-8, -4);

    if (earlierLogs.length === 0) return { trend: 'stable', change: 0 };

    const recentAvg = recentLogs.reduce((sum, log) => sum + (log.calories || 0), 0) / recentLogs.length;
    const earlierAvg = earlierLogs.reduce((sum, log) => sum + (log.calories || 0), 0) / earlierLogs.length;

    const change = ((recentAvg - earlierAvg) / earlierAvg) * 100;
    
    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (change > 5) trend = 'improving';
    else if (change < -5) trend = 'declining';

    return { trend, change: Math.round(change) };
  }

  // Calculate recovery trend
  private calculateRecoveryTrend(recoveryLogs: RecoveryLog[]): { trend: 'improving' | 'declining' | 'stable'; change: number } {
    if (recoveryLogs.length < 4) return { trend: 'stable', change: 0 };

    const sortedLogs = recoveryLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const recentLogs = sortedLogs.slice(-4);
    const earlierLogs = sortedLogs.slice(-8, -4);

    if (earlierLogs.length === 0) return { trend: 'stable', change: 0 };

    const recentAvg = recentLogs.reduce((sum, log) => sum + this.calculateRecoveryScore(log), 0) / recentLogs.length;
    const earlierAvg = earlierLogs.reduce((sum, log) => sum + this.calculateRecoveryScore(log), 0) / earlierLogs.length;

    const change = ((recentAvg - earlierAvg) / earlierAvg) * 100;
    
    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (change > 5) trend = 'improving';
    else if (change < -5) trend = 'declining';

    return { trend, change: Math.round(change) };
  }

  // Generate overall recommendations
  private generateOverallRecommendations(
    workoutSessions: WorkoutSession[], 
    nutritionLogs: NutritionLog[], 
    recoveryLogs: RecoveryLog[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];
    
    const workoutAnalytics = this.generateWorkoutAnalytics(workoutSessions);
    const nutritionAnalytics = this.generateNutritionAnalytics(nutritionLogs);
    const recoveryAnalytics = this.generateRecoveryAnalytics(recoveryLogs);

    recommendations.push(...workoutAnalytics.predictions.recommendedAdjustments);
    recommendations.push(...nutritionAnalytics.recommendations);
    recommendations.push(...recoveryAnalytics.recommendations);

    // Remove duplicates and sort by priority
    const uniqueRecommendations = recommendations.filter((rec, index, self) =>
      index === self.findIndex(r => r.type === rec.type)
    );

    return uniqueRecommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Generate insights
  private generateInsights(
    workoutSessions: WorkoutSession[], 
    nutritionLogs: NutritionLog[], 
    recoveryLogs: RecoveryLog[]
  ): {
    type: string;
    title: string;
    description: string;
    value: string;
  }[] {
    const insights: {
      type: string;
      title: string;
      description: string;
      value: string;
    }[] = [];

    // Workout insights
    if (workoutSessions.length > 0) {
      const patterns = this.generateWorkoutPatterns(workoutSessions);
      insights.push({
        type: 'workout_pattern',
        title: 'Preferred Workout Time',
        description: `You work out best in the ${patterns.bestTime.timeRange}`,
        value: `${patterns.bestTime.count} workouts (${patterns.bestTime.percentage}%)`,
      });

      if (patterns.preferredType.count > 0) {
        insights.push({
          type: 'workout_preference',
          title: 'Favorite Workout Type',
          description: `You prefer ${patterns.preferredType.type} workouts`,
          value: `${patterns.preferredType.count} workouts (${patterns.preferredType.percentage}%)`,
        });
      }
    }

    // Nutrition insights
    if (nutritionLogs.length > 0) {
      const patterns = this.generateNutritionPatterns(nutritionLogs);
      insights.push({
        type: 'nutrition_timing',
        title: 'Best Meal Time',
        description: `You eat most consistently in the ${patterns.bestMealTime.timeRange}`,
        value: `${patterns.bestMealTime.count} meals`,
      });
    }

    // Recovery insights
    if (recoveryLogs.length > 0) {
      const patterns = this.generateRecoveryPatterns(recoveryLogs);
      insights.push({
        type: 'sleep_pattern',
        title: 'Best Sleep Day',
        description: `You get the most sleep on ${patterns.bestSleepDay.day}`,
        value: `${patterns.bestSleepDay.averageHours} hours average`,
      });
    }

    return insights;
  }

  // Get service status
  getServiceStatus(): ServiceStatus {
    return {
      isInitialized: this.isInitialized,
      lastUpdated: this.analyticsData?.lastUpdated,
      cachedDataKeys: Object.keys(this.analyticsData?.cachedData || {}),
    };
  }
}

// Export singleton instance
const analyticsService = new AnalyticsService();
export default analyticsService;