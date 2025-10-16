import AsyncStorage from '@react-native-async-storage/async-storage';

// Type definitions for recovery service
export interface RecoveryEntry {
  id: string;
  date: string;
  type: 'sleep' | 'nutrition' | 'stretching' | 'foam_rolling' | 'ice_bath' | 'massage' | 'rest' | 'meditation';
  duration?: number;
  quality?: number;
  heartRate?: number;
  heartRateVariability?: number;
  restingHeartRate?: number;
  sleepHours?: number;
  sleepQuality?: number;
  remSleep?: number;
  deepSleep?: number;
  waterIntake?: number;
  proteinIntake?: number;
  calorieIntake?: number;
  soreness?: number;
  fatigue?: number;
  stress?: number;
  mood?: number;
  energy?: number;
  flexibility?: number;
  mobility?: number;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  notes?: string;
  completed: boolean;
  timestamp: number;
  updatedAt?: number;
}

export interface RecoveryGoals {
  sleepHours: number;
  sleepQuality: number;
  waterIntake: number;
  proteinIntake: number;
  calorieIntake: number;
  stretchingMinutes: number;
  foamRollingMinutes: number;
  restDays: number;
  meditationMinutes: number;
}

export interface RecoveryScore {
  overall: number;
  sleep: number;
  nutrition: number;
  physical: number;
  mental: number;
  trends: {
    sleep: 'improving' | 'stable' | 'declining';
    nutrition: 'improving' | 'stable' | 'declining';
    physical: 'improving' | 'stable' | 'declining';
    mental: 'improving' | 'stable' | 'declining';
  };
}

export interface RecoveryPlan {
  id: string;
  name: string;
  description: string;
  activities: RecoveryActivity[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focus: 'sleep' | 'nutrition' | 'physical' | 'mental' | 'comprehensive';
}

export interface RecoveryActivity {
  id: string;
  name: string;
  type: RecoveryEntry['type'];
  duration: number;
  instructions: string[];
  benefits: string[];
  equipment?: string[];
  intensity: 'low' | 'medium' | 'high';
}

export interface RecoveryAnalytics {
  weeklyData: WeeklyRecoveryData[];
  monthlyTrends: MonthlyTrends;
  recoveryScore: RecoveryScore;
  recommendations: string[];
  achievements: RecoveryAchievement[];
}

export interface WeeklyRecoveryData {
  week: number;
  startDate: string;
  endDate: string;
  averageSleep: number;
  averageSleepQuality: number;
  totalWaterIntake: number;
  averageProteinIntake: number;
  totalRecoveryTime: number;
  recoveryActivities: number;
  averageRecoveryScore: number;
  goals: RecoveryGoals;
  goalCompletion: number;
}

export interface MonthlyTrends {
  sleepTrend: 'improving' | 'stable' | 'declining';
  nutritionTrend: 'improving' | 'stable' | 'declining';
  physicalTrend: 'improving' | 'stable' | 'declining';
  mentalTrend: 'improving' | 'stable' | 'declining';
  overallTrend: 'improving' | 'stable' | 'declining';
}

export interface RecoveryAchievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'sleep' | 'nutrition' | 'physical' | 'mental';
  icon: string;
  points: number;
}

export interface ServiceStatus {
  isInitialized: boolean;
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  lastEntryDate: Date | null;
}

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class RecoveryService {
  private recoveryEntries: RecoveryEntry[] = [];
  private recoveryGoals: RecoveryGoals | null = null;
  private achievements: RecoveryAchievement[] = [];
  private isInitialized: boolean = false;

  // Initialize recovery service
  async initialize(): Promise<boolean> {
    try {
      await this.loadRecoveryEntries();
      await this.loadRecoveryGoals();
      await this.loadAchievements();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize recovery service:', error);
      return false;
    }
  }

  // Load recovery entries from storage
  private async loadRecoveryEntries(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('recoveryEntries');
      if (stored) {
        this.recoveryEntries = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load recovery entries:', error);
      this.recoveryEntries = [];
    }
  }

  // Save recovery entries to storage
  private async saveRecoveryEntries(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('recoveryEntries', JSON.stringify(this.recoveryEntries));
      return true;
    } catch (error) {
      console.error('Failed to save recovery entries:', error);
      return false;
    }
  }

  // Load recovery goals from storage
  private async loadRecoveryGoals(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('recoveryGoals');
      if (stored) {
        this.recoveryGoals = JSON.parse(stored);
      } else {
        // Set default goals for Hell Week training
        this.recoveryGoals = {
          sleepHours: 8,
          sleepQuality: 8,
          waterIntake: 128, // ounces (1 gallon)
          proteinIntake: 200, // grams
          calorieIntake: 4000,
          stretchingMinutes: 15,
          foamRollingMinutes: 10,
          restDays: 1,
          meditationMinutes: 10
        };
        await this.saveRecoveryGoals();
      }
    } catch (error) {
      console.error('Failed to load recovery goals:', error);
    }
  }

  // Save recovery goals to storage
  private async saveRecoveryGoals(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('recoveryGoals', JSON.stringify(this.recoveryGoals));
      return true;
    } catch (error) {
      console.error('Failed to save recovery goals:', error);
      return false;
    }
  }

  // Load achievements from storage
  private async loadAchievements(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('recoveryAchievements');
      if (stored) {
        this.achievements = JSON.parse(stored);
      } else {
        // Initialize with default achievements
        this.achievements = [
          {
            id: 'sleep_champion',
            title: 'Sleep Champion',
            description: 'Slept 8+ hours for 7 consecutive days',
            date: '',
            category: 'sleep',
            icon: '😴',
            points: 50
          },
          {
            id: 'hydration_hero',
            title: 'Hydration Hero',
            description: 'Drank 1 gallon of water for 7 consecutive days',
            date: '',
            category: 'nutrition',
            icon: '💧',
            points: 30
          },
          {
            id: 'recovery_master',
            title: 'Recovery Master',
            description: 'Completed all recovery activities for a week',
            date: '',
            category: 'physical',
            icon: '🧘',
            points: 40
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
      await AsyncStorage.setItem('recoveryAchievements', JSON.stringify(this.achievements));
      return true;
    } catch (error) {
      console.error('Failed to save achievements:', error);
      return false;
    }
  }

  // Add recovery entry
  async addRecoveryEntry(entry: Omit<RecoveryEntry, 'id' | 'timestamp'>): Promise<ServiceResponse<RecoveryEntry>> {
    try {
      const newEntry: RecoveryEntry = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        ...entry
      };

      this.recoveryEntries.push(newEntry);
      await this.saveRecoveryEntries();
      
      // Check for achievements
      await this.checkAchievements(newEntry);
      
      return { success: true, data: newEntry };
    } catch (error) {
      console.error('Failed to add recovery entry:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Update recovery entry
  async updateRecoveryEntry(entryId: string, updates: Partial<RecoveryEntry>): Promise<ServiceResponse<RecoveryEntry>> {
    try {
      const entryIndex = this.recoveryEntries.findIndex(entry => entry.id === entryId);
      if (entryIndex === -1) {
        return { success: false, error: 'Recovery entry not found' };
      }

      this.recoveryEntries[entryIndex] = {
        ...this.recoveryEntries[entryIndex],
        ...updates,
        updatedAt: Date.now()
      };

      await this.saveRecoveryEntries();
      return { success: true, data: this.recoveryEntries[entryIndex] };
    } catch (error) {
      console.error('Failed to update recovery entry:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Delete recovery entry
  async deleteRecoveryEntry(entryId: string): Promise<ServiceResponse> {
    try {
      this.recoveryEntries = this.recoveryEntries.filter(entry => entry.id !== entryId);
      await this.saveRecoveryEntries();
      return { success: true };
    } catch (error) {
      console.error('Failed to delete recovery entry:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Get recovery entries for date range
  getRecoveryEntries(startDate?: Date, endDate?: Date): RecoveryEntry[] {
    let entries = [...this.recoveryEntries];
    
    if (startDate) {
      entries = entries.filter(entry => new Date(entry.date) >= startDate);
    }
    
    if (endDate) {
      entries = entries.filter(entry => new Date(entry.date) <= endDate);
    }
    
    return entries.sort((a, b) => b.timestamp - a.timestamp);
  }

  // Get recovery entries for specific date
  getRecoveryEntriesForDate(date: string | Date): RecoveryEntry[] {
    const targetDate = new Date(date).toDateString();
    return this.recoveryEntries.filter(entry => 
      new Date(entry.date).toDateString() === targetDate
    );
  }

  // Get recovery goals
  getRecoveryGoals(): RecoveryGoals | null {
    return this.recoveryGoals;
  }

  // Update recovery goals
  async updateRecoveryGoals(newGoals: Partial<RecoveryGoals>): Promise<ServiceResponse<RecoveryGoals>> {
    try {
      if (!this.recoveryGoals) {
        return { success: false, error: 'Recovery goals not initialized' };
      }
      
      this.recoveryGoals = { ...this.recoveryGoals, ...newGoals };
      await this.saveRecoveryGoals();
      return { success: true, data: this.recoveryGoals };
    } catch (error) {
      console.error('Failed to update recovery goals:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Calculate recovery score for a specific date
  calculateRecoveryScore(date: string | Date): RecoveryScore | null {
    const entries = this.getRecoveryEntriesForDate(date);
    if (entries.length === 0) return null;

    const sleepEntries = entries.filter(e => e.type === 'sleep');
    const nutritionEntries = entries.filter(e => e.type === 'nutrition');
    const physicalEntries = entries.filter(e => 
      ['stretching', 'foam_rolling', 'ice_bath', 'massage', 'rest'].includes(e.type));
    const mentalEntries = entries.filter(e => e.type === 'meditation');

    // Calculate sleep score
    let sleepScore = 0;
    if (sleepEntries.length > 0) {
      const avgSleepHours = sleepEntries.reduce((sum, e) => sum + (e.sleepHours || 0), 0) / sleepEntries.length;
      const avgSleepQuality = sleepEntries.reduce((sum, e) => sum + (e.sleepQuality || 0), 0) / sleepEntries.length;
      sleepScore = ((avgSleepHours / (this.recoveryGoals?.sleepHours || 8)) * 50) + 
                   ((avgSleepQuality / 10) * 50);
    }

    // Calculate nutrition score
    let nutritionScore = 0;
    if (nutritionEntries.length > 0) {
      const totalWater = nutritionEntries.reduce((sum, e) => sum + (e.waterIntake || 0), 0);
      const totalProtein = nutritionEntries.reduce((sum, e) => sum + (e.proteinIntake || 0), 0);
      const totalCalories = nutritionEntries.reduce((sum, e) => sum + (e.calorieIntake || 0), 0);
      
      const waterScore = Math.min(100, (totalWater / (this.recoveryGoals?.waterIntake || 128)) * 100);
      const proteinScore = Math.min(100, (totalProtein / (this.recoveryGoals?.proteinIntake || 200)) * 100);
      const calorieScore = Math.min(100, (totalCalories / (this.recoveryGoals?.calorieIntake || 4000)) * 100);
      
      nutritionScore = (waterScore + proteinScore + calorieScore) / 3;
    }

    // Calculate physical score
    let physicalScore = 0;
    if (physicalEntries.length > 0) {
      const totalDuration = physicalEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
      const avgSoreness = physicalEntries.reduce((sum, e) => sum + (e.soreness || 0), 0) / physicalEntries.length;
      const avgFatigue = physicalEntries.reduce((sum, e) => sum + (e.fatigue || 0), 0) / physicalEntries.length;
      
      physicalScore = Math.min(100, (totalDuration / 60) * 20) + // Up to 20 points for 60+ minutes
                    ((10 - avgSoreness) / 10) * 40 + // Up to 40 points for low soreness
                    ((10 - avgFatigue) / 10) * 40; // Up to 40 points for low fatigue
    }

    // Calculate mental score
    let mentalScore = 0;
    if (mentalEntries.length > 0) {
      const totalDuration = mentalEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
      const avgStress = mentalEntries.reduce((sum, e) => sum + (e.stress || 0), 0) / mentalEntries.length;
      const avgMood = mentalEntries.reduce((sum, e) => sum + (e.mood || 0), 0) / mentalEntries.length;
      
      mentalScore = Math.min(100, (totalDuration / 20) * 30) + // Up to 30 points for 20+ minutes
                   ((10 - avgStress) / 10) * 35 + // Up to 35 points for low stress
                   (avgMood / 10) * 35; // Up to 35 points for good mood
    }

    // Calculate overall score
    const scores = [sleepScore, nutritionScore, physicalScore, mentalScore].filter(s => s > 0);
    const overallScore = scores.length > 0 ? scores.reduce((sum, s) => sum + s, 0) / scores.length : 0;

    // Calculate trends
    const trends = this.calculateTrends(date);

    return {
      overall: Math.round(overallScore),
      sleep: Math.round(sleepScore),
      nutrition: Math.round(nutritionScore),
      physical: Math.round(physicalScore),
      mental: Math.round(mentalScore),
      trends
    };
  }

  // Calculate trends
  private calculateTrends(date: string | Date): RecoveryScore['trends'] {
    const targetDate = new Date(date);
    const weekAgo = new Date(targetDate);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const currentScore = this.calculateRecoveryScore(targetDate);
    const previousScore = this.calculateRecoveryScore(weekAgo);
    
    if (!currentScore || !previousScore) {
      return {
        sleep: 'stable',
        nutrition: 'stable',
        physical: 'stable',
        mental: 'stable'
      };
    }

    const calculateTrend = (current: number, previous: number): 'improving' | 'stable' | 'declining' => {
      if (current > previous * 1.05) return 'improving';
      if (current < previous * 0.95) return 'declining';
      return 'stable';
    };

    return {
      sleep: calculateTrend(currentScore.sleep, previousScore.sleep),
      nutrition: calculateTrend(currentScore.nutrition, previousScore.nutrition),
      physical: calculateTrend(currentScore.physical, previousScore.physical),
      mental: calculateTrend(currentScore.mental, previousScore.mental)
    };
  }

  // Get weekly recovery data
  getWeeklyRecoveryData(weekStart: Date): WeeklyRecoveryData | null {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const entries = this.getRecoveryEntries(weekStart, weekEnd);
    if (entries.length === 0) return null;

    const sleepEntries = entries.filter(e => e.type === 'sleep');
    const nutritionEntries = entries.filter(e => e.type === 'nutrition');
    const recoveryActivities = entries.filter(e => 
      ['stretching', 'foam_rolling', 'ice_bath', 'massage', 'rest', 'meditation'].includes(e.type));

    const averageSleep = sleepEntries.length > 0 ? 
      sleepEntries.reduce((sum, e) => sum + (e.sleepHours || 0), 0) / sleepEntries.length : 0;
    
    const averageSleepQuality = sleepEntries.length > 0 ? 
      sleepEntries.reduce((sum, e) => sum + (e.sleepQuality || 0), 0) / sleepEntries.length : 0;
    
    const totalWaterIntake = nutritionEntries.reduce((sum, e) => sum + (e.waterIntake || 0), 0);
    const averageProteinIntake = nutritionEntries.length > 0 ? 
      nutritionEntries.reduce((sum, e) => sum + (e.proteinIntake || 0), 0) / nutritionEntries.length : 0;
    
    const totalRecoveryTime = recoveryActivities.reduce((sum, e) => sum + (e.duration || 0), 0);
    
    const dailyScores: number[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);
      const score = this.calculateRecoveryScore(currentDate);
      if (score) {
        dailyScores.push(score.overall);
      }
    }
    
    const averageRecoveryScore = dailyScores.length > 0 ? 
      dailyScores.reduce((sum, score) => sum + score, 0) / dailyScores.length : 0;

    const goals = this.recoveryGoals || {} as RecoveryGoals;
    const goalCompletion = this.calculateGoalCompletion(entries, goals);

    return {
      week: Math.floor(weekStart.getTime() / (1000 * 60 * 60 * 24 * 7)),
      startDate: weekStart.toISOString().split('T')[0],
      endDate: weekEnd.toISOString().split('T')[0],
      averageSleep,
      averageSleepQuality,
      totalWaterIntake,
      averageProteinIntake,
      totalRecoveryTime,
      recoveryActivities: recoveryActivities.length,
      averageRecoveryScore,
      goals,
      goalCompletion
    };
  }

  // Calculate goal completion percentage
  private calculateGoalCompletion(entries: RecoveryEntry[], goals: RecoveryGoals): number {
    const sleepEntries = entries.filter(e => e.type === 'sleep');
    const nutritionEntries = entries.filter(e => e.type === 'nutrition');
    const physicalEntries = entries.filter(e => 
      ['stretching', 'foam_rolling', 'ice_bath', 'massage', 'rest'].includes(e.type));

    let completionScore = 0;
    let totalGoals = 0;

    // Sleep goals
    if (sleepEntries.length > 0) {
      const avgSleep = sleepEntries.reduce((sum, e) => sum + (e.sleepHours || 0), 0) / sleepEntries.length;
      completionScore += Math.min(100, (avgSleep / goals.sleepHours) * 100);
      totalGoals++;
    }

    // Nutrition goals
    if (nutritionEntries.length > 0) {
      const totalWater = nutritionEntries.reduce((sum, e) => sum + (e.waterIntake || 0), 0);
      const totalProtein = nutritionEntries.reduce((sum, e) => sum + (e.proteinIntake || 0), 0);
      const totalCalories = nutritionEntries.reduce((sum, e) => sum + (e.calorieIntake || 0), 0);
      
      completionScore += Math.min(100, (totalWater / (goals.waterIntake * nutritionEntries.length)) * 100);
      completionScore += Math.min(100, (totalProtein / (goals.proteinIntake * nutritionEntries.length)) * 100);
      completionScore += Math.min(100, (totalCalories / (goals.calorieIntake * nutritionEntries.length)) * 100);
      totalGoals += 3;
    }

    // Physical recovery goals
    const totalPhysicalTime = physicalEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
    const expectedPhysicalTime = (goals.stretchingMinutes + goals.foamRollingMinutes) * 7; // Weekly
    completionScore += Math.min(100, (totalPhysicalTime / expectedPhysicalTime) * 100);
    totalGoals++;

    return totalGoals > 0 ? completionScore / totalGoals : 0;
  }

  // Get recovery analytics
  getRecoveryAnalytics(): RecoveryAnalytics {
    const weeklyData: WeeklyRecoveryData[] = [];
    const today = new Date();
    
    // Get last 4 weeks of data
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (i * 7) - today.getDay());
      const weekData = this.getWeeklyRecoveryData(weekStart);
      if (weekData) {
        weeklyData.push(weekData);
      }
    }

    const monthlyTrends = this.calculateMonthlyTrends(weeklyData);
    const currentScore = this.calculateRecoveryScore(today);
    const recoveryScore = currentScore || {
      overall: 0,
      sleep: 0,
      nutrition: 0,
      physical: 0,
      mental: 0,
      trends: {
        sleep: 'stable',
        nutrition: 'stable',
        physical: 'stable',
        mental: 'stable'
      }
    };

    const recommendations = this.generateRecommendations(recoveryScore, weeklyData);

    return {
      weeklyData,
      monthlyTrends,
      recoveryScore,
      recommendations,
      achievements: this.achievements.filter(a => a.date !== '')
    };
  }

  // Calculate monthly trends
  private calculateMonthlyTrends(weeklyData: WeeklyRecoveryData[]): MonthlyTrends {
    if (weeklyData.length < 2) {
      return {
        sleepTrend: 'stable',
        nutritionTrend: 'stable',
        physicalTrend: 'stable',
        mentalTrend: 'stable',
        overallTrend: 'stable'
      };
    }

    const recent = weeklyData.slice(-2);
    const older = weeklyData.slice(0, -2);

    const recentAvgSleep = recent.reduce((sum, w) => sum + w.averageSleep, 0) / recent.length;
    const olderAvgSleep = older.length > 0 ? older.reduce((sum, w) => sum + w.averageSleep, 0) / older.length : recentAvgSleep;

    const recentAvgNutrition = recent.reduce((sum, w) => sum + w.averageProteinIntake, 0) / recent.length;
    const olderAvgNutrition = older.length > 0 ? older.reduce((sum, w) => sum + w.averageProteinIntake, 0) / older.length : recentAvgNutrition;

    const recentAvgPhysical = recent.reduce((sum, w) => sum + w.totalRecoveryTime, 0) / recent.length;
    const olderAvgPhysical = older.length > 0 ? older.reduce((sum, w) => sum + w.totalRecoveryTime, 0) / older.length : recentAvgPhysical;

    const recentAvgOverall = recent.reduce((sum, w) => sum + w.averageRecoveryScore, 0) / recent.length;
    const olderAvgOverall = older.length > 0 ? older.reduce((sum, w) => sum + w.averageRecoveryScore, 0) / older.length : recentAvgOverall;

    const calculateTrend = (recent: number, older: number): 'improving' | 'stable' | 'declining' => {
      if (recent > older * 1.05) return 'improving';
      if (recent < older * 0.95) return 'declining';
      return 'stable';
    };

    return {
      sleepTrend: calculateTrend(recentAvgSleep, olderAvgSleep),
      nutritionTrend: calculateTrend(recentAvgNutrition, olderAvgNutrition),
      physicalTrend: calculateTrend(recentAvgPhysical, olderAvgPhysical),
      mentalTrend: 'stable', // Would need more specific mental data
      overallTrend: calculateTrend(recentAvgOverall, olderAvgOverall)
    };
  }

  // Generate recommendations
  private generateRecommendations(score: RecoveryScore, weeklyData: WeeklyRecoveryData[]): string[] {
    const recommendations: string[] = [];

    if (score.overall < 70) {
      recommendations.push('Focus on improving your overall recovery score');
    }

    if (score.sleep < 70) {
      recommendations.push('Prioritize sleep - aim for 8+ hours of quality sleep');
    }

    if (score.nutrition < 70) {
      recommendations.push('Improve nutrition focus - track water intake and protein consumption');
    }

    if (score.physical < 70) {
      recommendations.push('Increase physical recovery activities like stretching and foam rolling');
    }

    if (score.mental < 70) {
      recommendations.push('Practice mental recovery techniques like meditation');
    }

    // Check recent trends
    if (score.trends.sleep === 'declining') {
      recommendations.push('Your sleep quality is declining - establish a better bedtime routine');
    }

    if (score.trends.nutrition === 'declining') {
      recommendations.push('Nutrition tracking is slipping - set reminders for meals and hydration');
    }

    if (weeklyData.length > 0) {
      const latestWeek = weeklyData[weeklyData.length - 1];
      if (latestWeek.goalCompletion < 80) {
        recommendations.push('You\'re missing recovery goals - try setting daily reminders');
      }
    }

    if (recommendations.length === 0) {
      recommendations.push('Great recovery work! Keep maintaining your current routine');
    }

    return recommendations;
  }

  // Check for achievements
  private async checkAchievements(entry: RecoveryEntry): Promise<void> {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    // Sleep champion achievement
    const sleepEntries = this.recoveryEntries.filter(e => 
      e.type === 'sleep' && 
      new Date(e.date) >= weekAgo &&
      (e.sleepHours || 0) >= (this.recoveryGoals?.sleepHours || 8)
    );

    if (sleepEntries.length >= 7) {
      const achievement = this.achievements.find(a => a.id === 'sleep_champion');
      if (achievement && !achievement.date) {
        achievement.date = entry.date;
        await this.saveAchievements();
      }
    }

    // Hydration hero achievement
    const nutritionEntries = this.recoveryEntries.filter(e => 
      e.type === 'nutrition' && 
      new Date(e.date) >= weekAgo &&
      (e.waterIntake || 0) >= (this.recoveryGoals?.waterIntake || 128)
    );

    if (nutritionEntries.length >= 7) {
      const achievement = this.achievements.find(a => a.id === 'hydration_hero');
      if (achievement && !achievement.date) {
        achievement.date = entry.date;
        await this.saveAchievements();
      }
    }

    // Recovery master achievement
    const weekData = this.getWeeklyRecoveryData(weekAgo);
    if (weekData && weekData.goalCompletion >= 90) {
      const achievement = this.achievements.find(a => a.id === 'recovery_master');
      if (achievement && !achievement.date) {
        achievement.date = entry.date;
        await this.saveAchievements();
      }
    }
  }

  // Get achievements
  getAchievements(): RecoveryAchievement[] {
    return this.achievements;
  }

  // Get recovery plans (mock implementation)
  getRecoveryPlans(): RecoveryPlan[] {
    return [
      {
        id: 'hell_week_prep',
        name: 'Hell Week Preparation',
        description: 'Comprehensive recovery plan for Hell Week training',
        activities: [
          {
            id: 'morning_meditation',
            name: 'Morning Meditation',
            type: 'meditation',
            duration: 10,
            instructions: ['Sit comfortably', 'Focus on breathing', 'Visualize success'],
            benefits: ['Mental clarity', 'Stress reduction', 'Focus improvement'],
            intensity: 'low'
          },
          {
            id: 'evening_stretch',
            name: 'Full Body Stretch',
            type: 'stretching',
            duration: 15,
            instructions: ['Dynamic warm-up', 'Static stretches', 'Focus on tight areas'],
            benefits: ['Flexibility', 'Injury prevention', 'Recovery acceleration'],
            intensity: 'medium'
          }
        ],
        duration: 30,
        difficulty: 'intermediate',
        focus: 'comprehensive'
      }
    ];
  }

  // Get service status
  getServiceStatus(): ServiceStatus {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    const recentEntries = this.recoveryEntries.filter(e => new Date(e.date) >= weekAgo);
    const currentStreak = this.calculateCurrentStreak(recentEntries);
    const longestStreak = this.calculateLongestStreak();

    return {
      isInitialized: this.isInitialized,
      totalEntries: this.recoveryEntries.length,
      currentStreak,
      longestStreak,
      lastEntryDate: this.recoveryEntries.length > 0 ?
        new Date(Math.max(...this.recoveryEntries.map(e => e.timestamp))) : null
    };
  }

  // Calculate current streak
  private calculateCurrentStreak(entries: RecoveryEntry[]): number {
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
  private calculateLongestStreak(): number {
    if (this.recoveryEntries.length === 0) return 0;
    
    const sortedEntries = [...this.recoveryEntries].sort((a, b) => 
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
}

export default new RecoveryService();