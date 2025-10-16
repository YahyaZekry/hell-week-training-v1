import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Type definitions for notification service
export interface NotificationSettings {
  enabled: boolean;
  workoutReminders: boolean;
  achievementNotifications: boolean;
  progressUpdates: boolean;
  recoveryReminders: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  reminderTime: string;
  reminderDays: string[];
}

export interface ScheduledNotificationInfo {
  id: string;
  type: string;
  day?: string;
  time?: string;
  trigger?: Date;
}

export interface AchievementData {
  id: string;
  name: string;
}

export interface WorkoutData {
  id: string;
  workoutName: string;
  duration: number;
}

export interface MilestoneData {
  id: string;
  message: string;
}

export interface NotificationHistoryEntry {
  id?: string;
  title: string;
  body: string;
  data?: any;
  timestamp: string;
}

export interface ServiceStatusResponse {
  isInitialized: boolean;
  permissionStatus: string;
  settings: NotificationSettings | null;
  scheduledNotifications: number;
  workoutReminders: number;
  quietHoursActive: boolean;
}

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class NotificationService {
  private isInitialized: boolean = false;
  private notificationSettings: NotificationSettings | null = null;
  private scheduledNotifications: ScheduledNotificationInfo[] = [];
  private workoutReminders: any[] = [];

  // Initialize notification service
  async initialize(): Promise<boolean> {
    try {
      // Request permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permissions not granted');
        return false;
      }

      // Set notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });

      await this.loadNotificationSettings();
      await this.loadWorkoutReminders();
      await this.loadScheduledNotifications();
      
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize notification service:', error);
      return false;
    }
  }

  // Load notification settings from storage
  private async loadNotificationSettings(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('notificationSettings');
      if (stored) {
        this.notificationSettings = JSON.parse(stored);
      } else {
        // Set default settings
        this.notificationSettings = {
          enabled: true,
          workoutReminders: true,
          achievementNotifications: true,
          progressUpdates: true,
          recoveryReminders: true,
          soundEnabled: true,
          vibrationEnabled: true,
          quietHoursEnabled: false,
          quietHoursStart: '22:00',
          quietHoursEnd: '07:00',
          reminderTime: '08:00',
          reminderDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        };
        await this.saveNotificationSettings();
      }
    } catch (error) {
      console.error('Failed to load notification settings:', error);
    }
  }

  // Save notification settings to storage
  private async saveNotificationSettings(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(this.notificationSettings));
      return true;
    } catch (error) {
      console.error('Failed to save notification settings:', error);
      return false;
    }
  }

  // Load workout reminders from storage
  private async loadWorkoutReminders(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('workoutReminders');
      if (stored) {
        this.workoutReminders = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load workout reminders:', error);
      this.workoutReminders = [];
    }
  }

  // Save workout reminders to storage
  private async saveWorkoutReminders(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('workoutReminders', JSON.stringify(this.workoutReminders));
      return true;
    } catch (error) {
      console.error('Failed to save workout reminders:', error);
      return false;
    }
  }

  // Load scheduled notifications from storage
  private async loadScheduledNotifications(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('scheduledNotifications');
      if (stored) {
        this.scheduledNotifications = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load scheduled notifications:', error);
      this.scheduledNotifications = [];
    }
  }

  // Save scheduled notifications to storage
  private async saveScheduledNotifications(): Promise<boolean> {
    try {
      await AsyncStorage.setItem('scheduledNotifications', JSON.stringify(this.scheduledNotifications));
      return true;
    } catch (error) {
      console.error('Failed to save scheduled notifications:', error);
      return false;
    }
  }

  // Get notification settings
  getNotificationSettings(): NotificationSettings | null {
    return this.notificationSettings;
  }

  // Update notification settings
  async updateNotificationSettings(newSettings: Partial<NotificationSettings>): Promise<ServiceResponse<NotificationSettings>> {
    try {
      if (!this.notificationSettings) {
        return { success: false, error: 'Notification settings not initialized' };
      }

      this.notificationSettings = { ...this.notificationSettings, ...newSettings };
      await this.saveNotificationSettings();
      
      // Re-schedule notifications if settings changed
      if (newSettings.workoutReminders !== undefined || 
          newSettings.reminderTime !== undefined || 
          newSettings.reminderDays !== undefined) {
        await this.scheduleWorkoutReminders();
      }
      
      return { success: true, data: this.notificationSettings };
    } catch (error) {
      console.error('Failed to update notification settings:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Schedule workout reminders
  async scheduleWorkoutReminders(): Promise<ServiceResponse> {
    try {
      // Cancel existing workout reminders
      await this.cancelWorkoutReminders();

      if (!this.notificationSettings?.workoutReminders || !this.notificationSettings.enabled) {
        return { success: true };
      }

      const [hours, minutes] = this.notificationSettings.reminderTime.split(':').map(Number);
      const reminderDays = this.notificationSettings.reminderDays;

      for (const day of reminderDays) {
        const trigger = this.getNextTriggerDate(day, hours, minutes);
        
        if (trigger) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: '💪 Workout Reminder',
              body: 'Time to crush your workout! You\'ve got this!',
              data: { type: 'workout_reminder' },
              sound: this.notificationSettings.soundEnabled ? 'default' : undefined,
            },
            trigger: trigger as any,
          });

          this.scheduledNotifications.push({
            id: `workout_reminder_${day}`,
            type: 'workout_reminder',
            day,
            time: this.notificationSettings.reminderTime,
            trigger,
          });
        }
      }

      await this.saveScheduledNotifications();
      return { success: true };
    } catch (error) {
      console.error('Failed to schedule workout reminders:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Get next trigger date for a specific day and time
  private getNextTriggerDate(day: string, hours: number, minutes: number): Date | null {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDay = daysOfWeek.indexOf(day);
    
    const now = new Date();
    const currentDay = now.getDay();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    
    let daysUntilTarget = (targetDay - currentDay + 7) % 7;
    
    // If today is the target day and the time has passed, schedule for next week
    if (daysUntilTarget === 0 && (currentHours > hours || (currentHours === hours && currentMinutes >= minutes))) {
      daysUntilTarget = 7;
    }
    
    const triggerDate = new Date(now);
    triggerDate.setDate(now.getDate() + daysUntilTarget);
    triggerDate.setHours(hours, minutes, 0, 0);
    
    return triggerDate;
  }

  // Cancel workout reminders
  private async cancelWorkoutReminders(): Promise<ServiceResponse> {
    try {
      const workoutReminders = this.scheduledNotifications.filter(n => n.type === 'workout_reminder');
      
      for (const reminder of workoutReminders) {
        await Notifications.cancelScheduledNotificationAsync(reminder.id);
      }
      
      this.scheduledNotifications = this.scheduledNotifications.filter(n => n.type !== 'workout_reminders');
      await this.saveScheduledNotifications();
      
      return { success: true };
    } catch (error) {
      console.error('Failed to cancel workout reminders:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Schedule a one-time notification
  async scheduleNotification(title: string, body: string, data: any = {}, trigger: Date | null = null): Promise<ServiceResponse<{ notificationId: string }>> {
    try {
      if (!this.notificationSettings?.enabled) {
        return { success: false, error: 'Notifications are disabled' };
      }

      // Check if within quiet hours
      if (this.notificationSettings.quietHoursEnabled && this.isQuietHours()) {
        return { success: false, error: 'Quiet hours are active' };
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: this.notificationSettings.soundEnabled ? 'default' : undefined,
        },
        trigger: (trigger || null) as any, // null for immediate notification
      });

      return { success: true, data: { notificationId } };
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Send immediate notification
  async sendNotification(title: string, body: string, data: any = {}): Promise<ServiceResponse<{ notificationId: string }>> {
    return await this.scheduleNotification(title, body, data);
  }

  // Schedule achievement notification
  async sendAchievementNotification(achievement: AchievementData): Promise<ServiceResponse<{ notificationId: string }>> {
    const title = '🏆 Achievement Unlocked!';
    const body = `Congratulations! You've earned: ${achievement.name}`;
    
    return await this.sendNotification(title, body, { 
      type: 'achievement', 
      achievementId: achievement.id 
    });
  }

  // Schedule workout completion notification
  async sendWorkoutCompletionNotification(workout: WorkoutData): Promise<ServiceResponse<{ notificationId: string }>> {
    const title = '✅ Workout Complete!';
    const body = `Great job! You completed ${workout.workoutName} in ${this.formatDuration(workout.duration)}`;
    
    return await this.sendNotification(title, body, { 
      type: 'workout_complete', 
      workoutId: workout.id 
    });
  }

  // Schedule progress milestone notification
  async sendProgressNotification(milestone: MilestoneData): Promise<ServiceResponse<{ notificationId: string }>> {
    const title = '📈 Progress Milestone!';
    const body = milestone.message;
    
    return await this.sendNotification(title, body, { 
      type: 'progress_milestone', 
      milestoneId: milestone.id 
    });
  }

  // Schedule recovery reminder
  async scheduleRecoveryReminder(hours: number = 24): Promise<ServiceResponse<{ notificationId: string }>> {
    const trigger = new Date();
    trigger.setHours(trigger.getHours() + hours);
    
    return await this.scheduleNotification(
      '🧘 Recovery Reminder',
      'Don\'t forget to log your recovery data and get enough rest!',
      { type: 'recovery_reminder' },
      trigger
    );
  }

  // Check if current time is within quiet hours
  private isQuietHours(): boolean {
    if (!this.notificationSettings?.quietHoursEnabled) {
      return false;
    }

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [startHours, startMinutes] = this.notificationSettings.quietHoursStart.split(':').map(Number);
    const [endHours, endMinutes] = this.notificationSettings.quietHoursEnd.split(':').map(Number);
    
    const startTime = startHours * 60 + startMinutes;
    const endTime = endHours * 60 + endMinutes;
    
    if (startTime < endTime) {
      // Same day quiet hours (e.g., 22:00 to 07:00)
      return currentTime >= startTime || currentTime < endTime;
    } else {
      // Overnight quiet hours (e.g., 22:00 to 07:00)
      return currentTime >= startTime || currentTime < endTime;
    }
  }

  // Format duration for notifications
  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  // Get scheduled notifications
  getScheduledNotifications(): ScheduledNotificationInfo[] {
    return this.scheduledNotifications;
  }

  // Cancel specific notification
  async cancelNotification(notificationId: string): Promise<ServiceResponse> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      this.scheduledNotifications = this.scheduledNotifications.filter(n => n.id !== notificationId);
      await this.saveScheduledNotifications();
      return { success: true };
    } catch (error) {
      console.error('Failed to cancel notification:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Cancel all notifications
  async cancelAllNotifications(): Promise<ServiceResponse> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      this.scheduledNotifications = [];
      await this.saveScheduledNotifications();
      return { success: true };
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Get notification permission status
  async getPermissionStatus(): Promise<string> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status;
    } catch (error) {
      console.error('Failed to get permission status:', error);
      return 'undetermined';
    }
  }

  // Request notification permissions
  async requestPermissions(): Promise<string> {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status;
    } catch (error) {
      console.error('Failed to request permissions:', error);
      return 'denied';
    }
  }

  // Get notification badge count
  async getBadgeCount(): Promise<number> {
    try {
      return await Notifications.getBadgeCountAsync();
    } catch (error) {
      console.error('Failed to get badge count:', error);
      return 0;
    }
  }

  // Set notification badge count
  async setBadgeCount(count: number): Promise<ServiceResponse> {
    try {
      await Notifications.setBadgeCountAsync(count);
      return { success: true };
    } catch (error) {
      console.error('Failed to set badge count:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Clear notification badge
  async clearBadge(): Promise<ServiceResponse> {
    return await this.setBadgeCount(0);
  }

  // Get notification history (limited implementation)
  async getNotificationHistory(): Promise<NotificationHistoryEntry[]> {
    try {
      // This is a simplified implementation
      // In a real app, you'd store notification history in a database
      const stored = await AsyncStorage.getItem('notificationHistory');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get notification history:', error);
      return [];
    }
  }

  // Add notification to history
  async addToHistory(notification: NotificationHistoryEntry): Promise<ServiceResponse> {
    try {
      const history = await this.getNotificationHistory();
      history.unshift({
        ...notification,
        timestamp: new Date().toISOString(),
      });
      
      // Keep only last 50 notifications
      const limitedHistory = history.slice(0, 50);
      
      await AsyncStorage.setItem('notificationHistory', JSON.stringify(limitedHistory));
      return { success: true };
    } catch (error) {
      console.error('Failed to add to notification history:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Test notification
  async sendTestNotification(): Promise<ServiceResponse<{ notificationId: string }>> {
    return await this.sendNotification(
      '🔔 Test Notification',
      'This is a test notification from Hell Week Training!',
      { type: 'test' }
    );
  }

  // Get service status
  async getServiceStatus(): Promise<ServiceStatusResponse> {
    return {
      isInitialized: this.isInitialized,
      permissionStatus: await this.getPermissionStatus(),
      settings: this.notificationSettings,
      scheduledNotifications: this.scheduledNotifications.length,
      workoutReminders: this.workoutReminders.length,
      quietHoursActive: this.isQuietHours(),
    };
  }
}

export default new NotificationService();