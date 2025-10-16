import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import Colors, { ColorScheme } from '../constants/Colors';
import Typography, { Spacing, BorderRadius } from '../constants/Typography';
import { appData } from '../data/data';
import authService from '../services/authService';
import dataService, { UserProfile as DataServiceUserProfile, TrainingProgress } from '../services/dataService';
import { User } from '../types';

interface DashboardScreenProps {
  route: {
    params?: {
      user?: User;
    };
  };
  navigation: any;
}

interface DashboardUserProfile {
  totalWorkouts?: number;
  totalHours?: number;
  currentStreak?: number;
  longestStreak?: number;
  completionRate?: number;
  currentWeek?: number;
}

interface TrainingProgressData {
  Week: number;
  Weekly_Miles: number;
  Swim_Hours: number;
  Strength_Sessions: number;
  Mental_Training_Hours: number;
}

interface PreparationWeek {
  Week: number;
  Miles: number;
  Swim: number;
  Strength: number;
  Mental: number;
}

interface UserStats {
  totalWorkouts: number;
  totalHours: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ route, navigation }) => {
  const { user } = route.params || {};
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedMetric, setSelectedMetric] = useState<string>('Weekly_Miles');
  const [userProfile, setUserProfile] = useState<DashboardUserProfile | null>(null);
  const [trainingProgress, setTrainingProgress] = useState<TrainingProgressData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const isFocused = useIsFocused();
  
  const colors = Colors.light; // For now, we'll use light theme. In a real app, this would be dynamic
  const styles = createStyles(colors);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % appData.seal_quotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isFocused && user) {
      loadDashboardData();
    }
  }, [isFocused, user]);

  const loadDashboardData = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Load user profile
      const profileResult = await dataService.getUserProfile(user!.id);
      if (profileResult.success && profileResult.data) {
        setUserProfile(profileResult.data);
        if (profileResult.data.currentWeek) {
          setSelectedWeek(profileResult.data.currentWeek);
        }
      }

      // Load training progress
      const progressResult = await dataService.getAllTrainingProgress(user!.id);
      if (progressResult.success && progressResult.data) {
        // Convert TrainingProgress to TrainingProgressData format
        const convertedData: TrainingProgressData[] = progressResult.data.map(item => ({
          Week: item.weekNumber,
          Weekly_Miles: item.completedWorkouts || 0,
          Swim_Hours: (item.totalTime || 0) / 60, // Convert minutes to hours
          Strength_Sessions: item.completedExercises || 0,
          Mental_Training_Hours: (item.totalTime || 0) / 60 // Convert minutes to hours
        }));
        setTrainingProgress(convertedData);
      }

      // Load selected week from local storage
      const storedWeek = await AsyncStorage.getItem('selectedWeek');
      if (storedWeek !== null) {
        setSelectedWeek(parseInt(storedWeek, 10));
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = (): void => {
    setRefreshing(true);
    loadDashboardData();
  };

  const saveSelectedWeek = async (week: number): Promise<void> => {
    try {
      setSelectedWeek(week);
      await AsyncStorage.setItem('selectedWeek', week.toString());
      
      // Update user profile with new week
      if (user) {
        await dataService.updateUserProfile(user!.id, { currentWeek: week });
      }
    } catch (error) {
      console.error('Error saving selected week:', error);
    }
  };

  const getChartData = () => {
    const data = trainingProgress.length > 0 ? trainingProgress : appData.training_progression_data;
    
    return {
      labels: data.map((d) => `W${d.Week}`),
      datasets: [
        {
          data: data.map((d) => d[selectedMetric as keyof TrainingProgressData]),
          color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: [selectedMetric.replace('_', ' ')],
    };
  };

  const selectedWeekData = appData.preparation_weeks.find((w: PreparationWeek) => w.Week === selectedWeek);

  const getUserStats = (): UserStats | null => {
    if (!userProfile) return null;
    
    return {
      totalWorkouts: userProfile.totalWorkouts || 0,
      totalHours: userProfile.totalHours || 0,
      currentStreak: userProfile.currentStreak || 0,
      longestStreak: userProfile.longestStreak || 0,
      completionRate: userProfile.completionRate || 0,
    };
  };

  const userStats = getUserStats();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffd700" />
        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor="#ffd700"
          colors={['#ffd700']}
        />
      }
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>NAVY SEAL HELL WEEK</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings" size={24} color="#ffd700" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Forging Elite Warriors Through Ultimate Endurance</Text>
        {user && (
          <Text style={styles.userGreeting}>Welcome, {user.displayName || 'Warrior'}</Text>
        )}
      </View>

      <View style={styles.quoteBanner}>
        <Text style={styles.quoteText}>{appData.seal_quotes[currentQuoteIndex]}</Text>
      </View>

      {/* User Stats Section */}
      {userStats && (
        <View style={styles.dashboardGrid}>
          <View style={styles.dashboardCard}>
            <Text style={styles.cardTitle}>Your Progress</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.totalWorkouts}</Text>
                <Text style={styles.statLabel}>Total Workouts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.totalHours}h</Text>
                <Text style={styles.statLabel}>Total Hours</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.currentStreak}</Text>
                <Text style={styles.statLabel}>Current Streak</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.completionRate}%</Text>
                <Text style={styles.statLabel}>Completion Rate</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View style={styles.dashboardGrid}>
        <View style={styles.dashboardCard}>
          <Text style={styles.cardTitle}>Training Progress - Week {selectedWeek}</Text>
          
          {/* Week Selector */}
          <View style={styles.weekSelector}>
            <Text style={styles.weekSelectorLabel}>Select Week:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {appData.preparation_weeks.map((week: PreparationWeek) => (
                <TouchableOpacity
                  key={week.Week}
                  style={[
                    styles.weekButton,
                    selectedWeek === week.Week && styles.selectedWeekButton
                  ]}
                  onPress={() => saveSelectedWeek(week.Week)}
                >
                  <Text style={[
                    styles.weekButtonText,
                    selectedWeek === week.Week && styles.selectedWeekButtonText
                  ]}>
                    W{week.Week}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {selectedWeekData && (
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{selectedWeekData.Miles}</Text>
                <Text style={styles.statLabel}>Miles</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{selectedWeekData.Swim}</Text>
                <Text style={styles.statLabel}>Swim Hours</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{selectedWeekData.Strength}</Text>
                <Text style={styles.statLabel}>Strength Sessions</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{selectedWeekData.Mental}</Text>
                <Text style={styles.statLabel}>Mental Hours</Text>
              </View>
            </View>
          )}
          
          <View style={styles.metricPicker}>
            <TouchableOpacity 
              style={[styles.metricButton, selectedMetric === 'Weekly_Miles' && styles.selectedMetricButton]} 
              onPress={() => setSelectedMetric('Weekly_Miles')}
            >
              <Text style={styles.metricButtonText}>Miles</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.metricButton, selectedMetric === 'Swim_Hours' && styles.selectedMetricButton]} 
              onPress={() => setSelectedMetric('Swim_Hours')}
            >
              <Text style={styles.metricButtonText}>Swim</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.metricButton, selectedMetric === 'Strength_Sessions' && styles.selectedMetricButton]} 
              onPress={() => setSelectedMetric('Strength_Sessions')}
            >
              <Text style={styles.metricButtonText}>Strength</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.metricButton, selectedMetric === 'Mental_Training_Hours' && styles.selectedMetricButton]} 
              onPress={() => setSelectedMetric('Mental_Training_Hours')}
            >
              <Text style={styles.metricButtonText}>Mental</Text>
            </TouchableOpacity>
          </View>
          
          <LineChart
            data={getChartData()}
            width={Dimensions.get('window').width - 64}
            height={220}
            chartConfig={{
              backgroundColor: '#1a1a1a',
              backgroundGradientFrom: '#1a1a1a',
              backgroundGradientTo: '#1a1a1a',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffd700',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>

      {/* Additional Tools Section */}
      <View style={styles.dashboardGrid}>
        <View style={styles.dashboardCard}>
          <Text style={styles.cardTitle}>Additional Tools</Text>
          <View style={styles.toolsGrid}>
            <TouchableOpacity
              style={styles.toolButton}
              onPress={() => navigation.navigate('Recovery')}
            >
              <Ionicons name="medkit" size={24} color="#4CAF50" />
              <Text style={styles.toolButtonText}>Recovery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.toolButton}
              onPress={() => navigation.navigate('Mental')}
            >
              <Ionicons name="headset" size={24} color="#9C27B0" />
              <Text style={styles.toolButtonText}>Mental Fitness</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.toolButton}
              onPress={() => navigation.navigate('Analytics')}
            >
              <Ionicons name="analytics" size={24} color="#2196F3" />
              <Text style={styles.toolButtonText}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.primary,
    ...Typography.bodyLarge,
    marginTop: Spacing.md,
  },
  header: {
    backgroundColor: colors.surface,
    padding: Spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  settingsButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.round,
    backgroundColor: `${colors.primary}20`,
  },
  headerTitle: {
    ...Typography.headerLarge,
    color: colors.primary,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...Typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  userGreeting: {
    ...Typography.bodyLarge,
    color: colors.primary,
    textAlign: 'center',
    marginTop: Spacing.md,
    fontWeight: 'bold',
  },
  quoteBanner: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginHorizontal: Spacing.md,
  },
  quoteText: {
    ...Typography.bodyLarge,
    fontStyle: 'italic',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  dashboardGrid: {
    padding: Spacing.md,
  },
  dashboardCard: {
    backgroundColor: colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    color: colors.primary,
    ...Typography.titleLarge,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  weekSelector: {
    marginBottom: Spacing.lg,
  },
  weekSelectorLabel: {
    color: colors.textSecondary,
    ...Typography.bodyLarge,
    marginBottom: Spacing.sm,
    fontWeight: 'bold',
  },
  weekButton: {
    backgroundColor: colors.secondary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.round,
    marginRight: Spacing.sm,
  },
  selectedWeekButton: {
    backgroundColor: colors.primary,
  },
  weekButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  selectedWeekButtonText: {
    color: '#000000',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: `${colors.secondary}20`,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: colors.secondary,
    width: '48%',
    marginBottom: Spacing.md,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: Spacing.sm,
  },
  statLabel: {
    ...Typography.labelSmall,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  metricPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
  },
  metricButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.round,
    backgroundColor: colors.secondary,
  },
  selectedMetricButton: {
    backgroundColor: colors.primary,
  },
  metricButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  toolsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  toolButton: {
    alignItems: 'center',
    backgroundColor: `${colors.secondary}20`,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: colors.secondary,
    width: '30%',
  },
  toolButtonText: {
    color: colors.textSecondary,
    ...Typography.labelSmall,
    fontWeight: 'bold',
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});

export default DashboardScreen;