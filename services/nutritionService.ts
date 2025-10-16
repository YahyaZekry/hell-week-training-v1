import AsyncStorage from '@react-native-async-storage/async-storage';

import { appData } from '../data/data';

// Type definitions for nutrition service
export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  hydration: number;
  meals: number;
}

export interface MealLog {
  id: string;
  date: string;
  mealType?: string;
  food?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  hydration?: number;
  timestamp: number;
  updatedAt?: number;
}

export interface DailyTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  hydration: number;
  meals: number;
}

export interface NutritionProgress {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  hydration: number;
  meals: number;
}

export interface MealSuggestion {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface HydrationTracking {
  consumed: number;
  goal: number;
  percentage: number;
  remaining: number;
}

export interface DailyNutritionData {
  date: string;
  totals: DailyTotals;
  progress: NutritionProgress | null;
  goal: NutritionGoals | null;
}

export interface NutritionAnalytics {
  dailyData: DailyNutritionData[];
  averages: DailyTotals;
  goals: NutritionGoals | null;
}

export interface ExportedNutritionData {
  exportDate: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  meals: MealLog[];
  summary: {
    totalMeals: number;
    averages: DailyTotals;
    goals: NutritionGoals | null;
  };
}

export interface ServiceStatus {
  isInitialized: boolean;
  totalMealsLogged: number;
  hasNutritionGoals: boolean;
  lastLogDate: Date | null;
}

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class NutritionService {
  private mealLogs: MealLog[] = [];
  private nutritionGoals: NutritionGoals | null = null;
  private isInitialized: boolean = false;

  // Initialize nutrition service
  async initialize(): Promise<boolean> {
    try {
      await this.loadMealLogs();
      await this.loadNutritionGoals();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize nutrition service:', error);
      return false;
    }
  }

  // Load meal logs from storage
  private async loadMealLogs(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('mealLogs');
      if (stored) {
        this.mealLogs = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load meal logs:', error);
      this.mealLogs = [];
    }
  }

  // Save meal logs to storage
  private async saveMealLogs(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('mealLogs', JSON.stringify(this.mealLogs));
      return true;
    } catch (error) {
      console.error('Failed to save meal logs:', error);
      return false;
    }
  }

  // Load nutrition goals
  private async loadNutritionGoals(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('nutritionGoals');
      if (stored) {
        this.nutritionGoals = JSON.parse(stored);
      } else {
        // Set default goals based on Hell Week requirements
        this.nutritionGoals = {
          calories: 4000, // High calorie for intense training
          protein: 200,   // grams
          carbs: 500,     // grams
          fat: 150,       // grams
          hydration: 128, // ounces (1 gallon)
          meals: 5        // meals per day
        };
        await this.saveNutritionGoals();
      }
    } catch (error) {
      console.error('Failed to load nutrition goals:', error);
    }
  }

  // Save nutrition goals
  private async saveNutritionGoals(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('nutritionGoals', JSON.stringify(this.nutritionGoals));
      return true;
    } catch (error) {
      console.error('Failed to save nutrition goals:', error);
      return false;
    }
  }

  // Get nutrition plan for current week
  getNutritionPlan(week: number = 1): any[] {
    const planData = appData.nutrition_plan;
    return planData || [];
  }

  // Log a meal
  async logMeal(mealData: Partial<MealLog>): Promise<ServiceResponse<MealLog>> {
    try {
      const meal: MealLog = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...mealData,
        timestamp: Date.now()
      } as MealLog;

      this.mealLogs.push(meal);
      await this.saveMealLogs();
      return { success: true, data: meal };
    } catch (error) {
      console.error('Failed to log meal:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Get meals for a specific date
  getMealsForDate(date: string | Date): MealLog[] {
    const targetDate = new Date(date).toDateString();
    return this.mealLogs.filter(meal => 
      new Date(meal.date).toDateString() === targetDate
    );
  }

  // Get meals for date range
  getMealsForDateRange(startDate: string | Date, endDate: string | Date): MealLog[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.mealLogs.filter(meal => {
      const mealDate = new Date(meal.date);
      return mealDate >= start && mealDate <= end;
    });
  }

  // Calculate daily nutrition totals
  calculateDailyTotals(date: string | Date): DailyTotals {
    const meals = this.getMealsForDate(date);
    
    const totals: DailyTotals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      hydration: 0,
      meals: meals.length
    };

    meals.forEach(meal => {
      totals.calories += meal.calories || 0;
      totals.protein += meal.protein || 0;
      totals.carbs += meal.carbs || 0;
      totals.fat += meal.fat || 0;
      totals.hydration += meal.hydration || 0;
    });

    return totals;
  }

  // Calculate weekly nutrition averages
  calculateWeeklyAverages(weekStart: string | Date): DailyTotals {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const meals = this.getMealsForDateRange(weekStart, weekEnd);
    const days = Math.ceil((weekEnd.getTime() - new Date(weekStart).getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    if (meals.length === 0) {
      return {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        hydration: 0,
        meals: 0
      };
    }

    const totals = meals.reduce((acc, meal) => ({
      calories: acc.calories + (meal.calories || 0),
      protein: acc.protein + (meal.protein || 0),
      carbs: acc.carbs + (meal.carbs || 0),
      fat: acc.fat + (meal.fat || 0),
      hydration: acc.hydration + (meal.hydration || 0),
      meals: acc.meals + 1
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, hydration: 0, meals: 0 });

    return {
      calories: Math.round(totals.calories / days),
      protein: Math.round(totals.protein / days),
      carbs: Math.round(totals.carbs / days),
      fat: Math.round(totals.fat / days),
      hydration: Math.round(totals.hydration / days),
      meals: Math.round(totals.meals / days)
    };
  }

  // Get nutrition goals
  getNutritionGoals(): NutritionGoals | null {
    return this.nutritionGoals;
  }

  // Update nutrition goals
  async updateNutritionGoals(newGoals: Partial<NutritionGoals>): Promise<ServiceResponse<NutritionGoals>> {
    try {
      if (!this.nutritionGoals) {
        return { success: false, error: 'Nutrition goals not initialized' };
      }
      
      this.nutritionGoals = { ...this.nutritionGoals, ...newGoals };
      await this.saveNutritionGoals();
      return { success: true, data: this.nutritionGoals };
    } catch (error) {
      console.error('Failed to update nutrition goals:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Get nutrition progress percentage
  getNutritionProgress(date: string | Date): NutritionProgress | null {
    const totals = this.calculateDailyTotals(date);
    const goals = this.nutritionGoals;
    
    if (!goals) return null;

    return {
      calories: Math.min(100, Math.round((totals.calories / goals.calories) * 100)),
      protein: Math.min(100, Math.round((totals.protein / goals.protein) * 100)),
      carbs: Math.min(100, Math.round((totals.carbs / goals.carbs) * 100)),
      fat: Math.min(100, Math.round((totals.fat / goals.fat) * 100)),
      hydration: Math.min(100, Math.round((totals.hydration / goals.hydration) * 100)),
      meals: Math.min(100, Math.round((totals.meals / goals.meals) * 100))
    };
  }

  // Delete a meal log
  async deleteMeal(mealId: string): Promise<ServiceResponse> {
    try {
      this.mealLogs = this.mealLogs.filter(meal => meal.id !== mealId);
      await this.saveMealLogs();
      return { success: true };
    } catch (error) {
      console.error('Failed to delete meal:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Update a meal log
  async updateMeal(mealId: string, updates: Partial<MealLog>): Promise<ServiceResponse<MealLog>> {
    try {
      const mealIndex = this.mealLogs.findIndex(meal => meal.id === mealId);
      if (mealIndex === -1) {
        return { success: false, error: 'Meal not found' };
      }

      this.mealLogs[mealIndex] = {
        ...this.mealLogs[mealIndex],
        ...updates,
        updatedAt: Date.now()
      };

      await this.saveMealLogs();
      return { success: true, data: this.mealLogs[mealIndex] };
    } catch (error) {
      console.error('Failed to update meal:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Get meal suggestions based on nutrition plan
  getMealSuggestions(mealType: string, week: number = 1): MealSuggestion[] {
    const nutritionPlan = this.getNutritionPlan(week);
    const suggestions: MealSuggestion[] = [];

    nutritionPlan.forEach(plan => {
      if (plan.Meals?.[mealType]) {
        suggestions.push({
          name: plan.Meals[mealType],
          calories: this.estimateCalories(mealType, plan),
          protein: this.estimateProtein(mealType, plan),
          carbs: this.estimateCarbs(mealType, plan),
          fat: this.estimateFat(mealType, plan)
        });
      }
    });

    return suggestions;
  }

  // Estimate calories for meal type
  private estimateCalories(mealType: string, plan: any): number {
    const baseCalories: Record<string, number> = {
      Breakfast: 800,
      Lunch: 1000,
      Dinner: 1200,
      Snacks: 500
    };
    return baseCalories[mealType] || 600;
  }

  // Estimate protein for meal type
  private estimateProtein(mealType: string, plan: any): number {
    const baseProtein: Record<string, number> = {
      Breakfast: 30,
      Lunch: 40,
      Dinner: 50,
      Snacks: 20
    };
    return baseProtein[mealType] || 25;
  }

  // Estimate carbs for meal type
  private estimateCarbs(mealType: string, plan: any): number {
    const baseCarbs: Record<string, number> = {
      Breakfast: 100,
      Lunch: 125,
      Dinner: 150,
      Snacks: 75
    };
    return baseCarbs[mealType] || 100;
  }

  // Estimate fat for meal type
  private estimateFat(mealType: string, plan: any): number {
    const baseFat: Record<string, number> = {
      Breakfast: 25,
      Lunch: 35,
      Dinner: 40,
      Snacks: 20
    };
    return baseFat[mealType] || 30;
  }

  // Get hydration tracking
  getHydrationTracking(date: string | Date): HydrationTracking {
    const meals = this.getMealsForDate(date);
    const totalHydration = meals.reduce((total, meal) => total + (meal.hydration || 0), 0);
    const goal = this.nutritionGoals?.hydration || 128;
    
    return {
      consumed: totalHydration,
      goal: goal,
      percentage: Math.min(100, Math.round((totalHydration / goal) * 100)),
      remaining: Math.max(0, goal - totalHydration)
    };
  }

  // Log water intake
  async logWaterIntake(amount: number): Promise<ServiceResponse<MealLog>> {
    try {
      const waterLog: MealLog = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type: 'water',
        hydration: amount,
        timestamp: Date.now()
      } as any;

      this.mealLogs.push(waterLog);
      await this.saveMealLogs();
      return { success: true, data: waterLog };
    } catch (error) {
      console.error('Failed to log water intake:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Get nutrition analytics
  getNutritionAnalytics(days: number = 7): NutritionAnalytics {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);

    const dailyData: DailyNutritionData[] = [];
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const totals = this.calculateDailyTotals(currentDate);
      const progress = this.getNutritionProgress(currentDate);
      
      dailyData.push({
        date: currentDate.toISOString().split('T')[0],
        totals,
        progress,
        goal: this.nutritionGoals
      });
    }

    return {
      dailyData,
      averages: this.calculateWeeklyAverages(startDate),
      goals: this.nutritionGoals
    };
  }

  // Clean up old data (optional)
  async cleanupOldData(daysToKeep: number = 30): Promise<ServiceResponse> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      
      this.mealLogs = this.mealLogs.filter(meal => 
        new Date(meal.date) >= cutoffDate
      );
      
      await this.saveMealLogs();
      return { success: true };
    } catch (error) {
      console.error('Failed to cleanup old data:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Export nutrition data
  exportNutritionData(startDate: string | Date, endDate: string | Date): ExportedNutritionData {
    const meals = this.getMealsForDateRange(startDate, endDate);
    
    return {
      exportDate: new Date().toISOString(),
      dateRange: { 
        startDate: startDate.toString(), 
        endDate: endDate.toString() 
      },
      meals,
      summary: {
        totalMeals: meals.length,
        averages: this.calculateWeeklyAverages(startDate),
        goals: this.nutritionGoals
      }
    };
  }

  // Get all nutrition logs (for analytics)
  getNutritionLogs(): MealLog[] {
    return this.mealLogs;
  }

  // Get service status
  getServiceStatus(): ServiceStatus {
    return {
      isInitialized: this.isInitialized,
      totalMealsLogged: this.mealLogs.length,
      hasNutritionGoals: !!this.nutritionGoals,
      lastLogDate: this.mealLogs.length > 0 ?
        new Date(Math.max(...this.mealLogs.map(m => m.timestamp))) : null
    };
  }
}

export default new NutritionService();