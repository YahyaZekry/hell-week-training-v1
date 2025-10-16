import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';

import analyticsService from '../services/analyticsService';
import nutritionService from '../services/nutritionService';
import recoveryService from '../services/recoveryService';
import { COLORS } from '../services/settingsService';
import workoutTrackingService from '../services/workoutTrackingService';
import type {
  AnalyticsData,
  Recommendation,
  WorkoutData,
  NutritionData,
  RecoveryDataExtended
} from '../types';

const { width: screenWidth } = Dimensions.get('window');

interface AnalyticsScreenProps {
  navigation: any;
}

interface PeriodOption {
  label: string;
  value: number;
}

interface TabOption {
  key: string;
  label: string;
}

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(30); // days
  const [selectedTab, setSelectedTab] = useState<string>('overview'); // overview, workout, nutrition, recovery

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedPeriod]);

  const loadAnalyticsData = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Initialize services if needed
      await analyticsService.initialize();
      await workoutTrackingService.initialize();
      await nutritionService.initialize();
      await recoveryService.initialize();

      // Get data from all services
      const completedWorkouts = await workoutTrackingService.getCompletedWorkouts();
      const nutritionLogs = await nutritionService.getNutritionLogs();
      const recoveryLogs = recoveryService.getRecoveryEntries();

      // Generate comprehensive analytics
      const analytics = analyticsService.generateAnalyticsDashboard(
        completedWorkouts as any,
        nutritionLogs,
        recoveryLogs,
        selectedPeriod
      );

      setAnalyticsData(analytics as any);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
      Alert.alert('Error', 'Failed to load analytics data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAnalyticsData();
  }, [selectedPeriod]);

  const renderOverviewTab = () => {
    if (!analyticsData?.overall) return null;

    const { overall } = analyticsData;

    return (
      <View style={styles.tabContent}>
        {/* Overall Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>Overall Performance Score</Text>
          <Text style={styles.scoreValue}>{overall.overallScore}/100</Text>
          <View style={styles.scoreBar}>
            <View 
              style={[
                styles.scoreBarFill, 
                { width: `${overall.overallScore}%` }
              ]} 
            />
          </View>
        </View>

        {/* Trends Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trends</Text>
          <View style={styles.trendsGrid}>
            <TouchableOpacity style={styles.trendCard}>
              <Text style={styles.trendLabel}>Workout</Text>
              <Text style={styles.trendValue}>{overall.trends.workoutTrend.trend}</Text>
              <Text style={styles.trendChange}>
                {overall.trends.workoutTrend.improvement > 0 ? '+' : ''}
                {overall.trends.workoutTrend.improvement}%
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.trendCard}>
              <Text style={styles.trendLabel}>Nutrition</Text>
              <Text style={styles.trendValue}>{overall.trends.nutritionTrend.trend}</Text>
              <Text style={styles.trendChange}>
                {overall.trends.nutritionTrend.change > 0 ? '+' : ''}
                {overall.trends.nutritionTrend.change}%
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.trendCard}>
              <Text style={styles.trendLabel}>Recovery</Text>
              <Text style={styles.trendValue}>{overall.trends.recoveryTrend.trend}</Text>
              <Text style={styles.trendChange}>
                {overall.trends.recoveryTrend.change > 0 ? '+' : ''}
                {overall.trends.recoveryTrend.change}%
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Key Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Insights</Text>
          {overall.insights.map((insight: any, index: number) => (
            <View key={index} style={styles.insightCard}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightDescription}>{insight.description}</Text>
              <Text style={styles.insightValue}>{insight.value}</Text>
            </View>
          ))}
        </View>

        {/* Top Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Recommendations</Text>
          {overall.recommendations.slice(0, 3).map((rec: Recommendation, index: number) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.recommendationCard,
                rec.priority === 'high' && styles.highPriorityCard,
                rec.priority === 'medium' && styles.mediumPriorityCard,
              ]}
              onPress={() => showRecommendationDetails(rec)}
            >
              <View style={styles.recommendationHeader}>
                <Text style={styles.recommendationTitle}>{rec.title}</Text>
                <View style={[
                  styles.priorityBadge,
                  rec.priority === 'high' && styles.highPriorityBadge,
                  rec.priority === 'medium' && styles.mediumPriorityBadge,
                ]}>
                  <Text style={styles.priorityText}>{rec.priority}</Text>
                </View>
              </View>
              <Text style={styles.recommendationDescription}>{rec.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderWorkoutTab = () => {
    if (!analyticsData?.workout) return null;

    const { workout } = analyticsData;

    return (
      <View style={styles.tabContent}>
        {/* Workout Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{workout.summary.totalWorkouts}</Text>
              <Text style={styles.summaryLabel}>Total Workouts</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{workout.summary.averageDuration}m</Text>
              <Text style={styles.summaryLabel}>Avg Duration</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{workout.summary.completionRate}%</Text>
              <Text style={styles.summaryLabel}>Completion Rate</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{workout.summary.currentStreak}</Text>
              <Text style={styles.summaryLabel}>Current Streak</Text>
            </View>
          </View>
        </View>

        {/* Workout Frequency Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Frequency</Text>
          {workout.trends.weekly.frequency.length > 0 ? (
            <BarChart
              data={{
                labels: workout.trends.weekly.labels,
                datasets: [{
                  data: workout.trends.weekly.frequency,
                }],
              }}
              width={screenWidth - 40}
              height={200}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: COLORS.background,
                backgroundGradientFrom: COLORS.background,
                backgroundGradientTo: COLORS.background,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: COLORS.primary,
                },
              }}
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>No workout data available</Text>
          )}
        </View>

        {/* Workout Patterns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Patterns</Text>
          <View style={styles.patternsContainer}>
            <View style={styles.patternItem}>
              <Text style={styles.patternLabel}>Best Day</Text>
              <Text style={styles.patternValue}>{workout.patterns.bestDay.day}</Text>
              <Text style={styles.patternSubtext}>
                {workout.patterns.bestDay.count} workouts ({workout.patterns.bestDay.percentage}%)
              </Text>
            </View>
            <View style={styles.patternItem}>
              <Text style={styles.patternLabel}>Best Time</Text>
              <Text style={styles.patternValue}>{workout.patterns.bestTime.timeRange}</Text>
              <Text style={styles.patternSubtext}>
                {workout.patterns.bestTime.count} workouts ({workout.patterns.bestTime.percentage}%)
              </Text>
            </View>
            <View style={styles.patternItem}>
              <Text style={styles.patternLabel}>Preferred Type</Text>
              <Text style={styles.patternValue}>{workout.patterns.preferredType.type}</Text>
              <Text style={styles.patternSubtext}>
                {workout.patterns.preferredType.count} workouts ({workout.patterns.preferredType.percentage}%)
              </Text>
            </View>
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          <View style={styles.performanceGrid}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Improvement Rate</Text>
              <Text style={[
                styles.performanceValue,
                workout.performance.improvementRate > 0 ? styles.positiveValue : styles.negativeValue
              ]}>
                {workout.performance.improvementRate > 0 ? '+' : ''}{workout.performance.improvementRate}%
              </Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Average Performance</Text>
              <Text style={styles.performanceValue}>{workout.performance.averagePerformance}/100</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Consistency Score</Text>
              <Text style={styles.performanceValue}>{workout.trends.consistency}/100</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderNutritionTab = () => {
    if (!analyticsData?.nutrition) return null;

    const { nutrition } = analyticsData;

    return (
      <View style={styles.tabContent}>
        {/* Nutrition Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{nutrition.summary.totalMeals}</Text>
              <Text style={styles.summaryLabel}>Total Meals</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{nutrition.summary.averageCalories}</Text>
              <Text style={styles.summaryLabel}>Avg Calories</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{nutrition.summary.averageProtein}g</Text>
              <Text style={styles.summaryLabel}>Avg Protein</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{nutrition.summary.hydrationAverage}oz</Text>
              <Text style={styles.summaryLabel}>Avg Hydration</Text>
            </View>
          </View>
        </View>

        {/* Nutrition Trends Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calorie Trends</Text>
          {nutrition.trends.calories.length > 0 ? (
            <LineChart
              data={{
                labels: nutrition.trends.labels,
                datasets: [{
                  data: nutrition.trends.calories,
                  color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`,
                  strokeWidth: 2,
                }],
              }}
              width={screenWidth - 40}
              height={200}
              chartConfig={{
                backgroundColor: COLORS.background,
                backgroundGradientFrom: COLORS.background,
                backgroundGradientTo: COLORS.background,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: COLORS.accent,
                },
              }}
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>No nutrition data available</Text>
          )}
        </View>

        {/* Macronutrient Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Macronutrient Breakdown</Text>
          {nutrition.trends.calories.length > 0 ? (
            <PieChart
              data={[
                {
                  name: 'Protein',
                  population: nutrition.summary.averageProtein * 4, // 4 calories per gram
                  color: COLORS.primary,
                  legendFontColor: COLORS.text,
                  legendFontSize: 12,
                },
                {
                  name: 'Carbs',
                  population: nutrition.summary.averageCarbs * 4, // 4 calories per gram
                  color: COLORS.accent,
                  legendFontColor: COLORS.text,
                  legendFontSize: 12,
                },
                {
                  name: 'Fat',
                  population: nutrition.summary.averageFat * 9, // 9 calories per gram
                  color: COLORS.secondary,
                  legendFontColor: COLORS.text,
                  legendFontSize: 12,
                },
              ]}
              width={screenWidth - 40}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>No macronutrient data available</Text>
          )}
        </View>

        {/* Nutrition Patterns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition Patterns</Text>
          <View style={styles.patternsContainer}>
            <View style={styles.patternItem}>
              <Text style={styles.patternLabel}>Best Meal Time</Text>
              <Text style={styles.patternValue}>{nutrition.patterns.bestMealTime.timeRange}</Text>
              <Text style={styles.patternSubtext}>
                {nutrition.patterns.bestMealTime.count} meals
              </Text>
            </View>
          </View>
        </View>

        {/* Nutrition Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {nutrition.recommendations.map((rec: Recommendation, index: number) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.recommendationCard,
                rec.priority === 'high' && styles.highPriorityCard,
              ]}
              onPress={() => showRecommendationDetails(rec)}
            >
              <View style={styles.recommendationHeader}>
                <Text style={styles.recommendationTitle}>{rec.title}</Text>
                <View style={[
                  styles.priorityBadge,
                  rec.priority === 'high' && styles.highPriorityBadge,
                ]}>
                  <Text style={styles.priorityText}>{rec.priority}</Text>
                </View>
              </View>
              <Text style={styles.recommendationDescription}>{rec.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderRecoveryTab = () => {
    if (!analyticsData?.recovery) return null;

    const { recovery } = analyticsData;

    return (
      <View style={styles.tabContent}>
        {/* Recovery Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recovery Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{recovery.summary.averageSleepHours}h</Text>
              <Text style={styles.summaryLabel}>Avg Sleep</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{recovery.summary.averageSleepQuality}/10</Text>
              <Text style={styles.summaryLabel}>Sleep Quality</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{recovery.summary.averageEnergyLevel}/10</Text>
              <Text style={styles.summaryLabel}>Energy Level</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{recovery.summary.averageRecoveryScore}/100</Text>
              <Text style={styles.summaryLabel}>Recovery Score</Text>
            </View>
          </View>
        </View>

        {/* Sleep Trends Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sleep Trends</Text>
          {recovery.trends.sleepHours.length > 0 ? (
            <LineChart
              data={{
                labels: recovery.trends.labels,
                datasets: [
                  {
                    data: recovery.trends.sleepHours,
                    color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
                    strokeWidth: 2,
                  },
                  {
                    data: recovery.trends.sleepQuality,
                    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                    strokeWidth: 2,
                  },
                ],
                legend: ['Sleep Hours', 'Sleep Quality'],
              }}
              width={screenWidth - 40}
              height={200}
              chartConfig={{
                backgroundColor: COLORS.background,
                backgroundGradientFrom: COLORS.background,
                backgroundGradientTo: COLORS.background,
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                },
              }}
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>No recovery data available</Text>
          )}
        </View>

        {/* Recovery Score Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recovery Score Progress</Text>
          {recovery.trends.recoveryScores.length > 0 ? (
            <ProgressChart
              data={{
                labels: recovery.trends.labels.slice(-7), // Last 7 days
                data: recovery.trends.recoveryScores.slice(-7).map((score: number) => score / 100),
              }}
              width={screenWidth - 40}
              height={200}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundColor: COLORS.background,
                backgroundGradientFrom: COLORS.background,
                backgroundGradientTo: COLORS.background,
                color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>No recovery score data available</Text>
          )}
        </View>

        {/* Recovery Patterns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recovery Patterns</Text>
          <View style={styles.patternsContainer}>
            <View style={styles.patternItem}>
              <Text style={styles.patternLabel}>Best Sleep Day</Text>
              <Text style={styles.patternValue}>{recovery.patterns.bestSleepDay.day}</Text>
              <Text style={styles.patternSubtext}>
                {recovery.patterns.bestSleepDay.averageHours} hours average
              </Text>
            </View>
          </View>
        </View>

        {/* Recovery Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {recovery.recommendations.map((rec: Recommendation, index: number) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.recommendationCard,
                rec.priority === 'high' && styles.highPriorityCard,
              ]}
              onPress={() => showRecommendationDetails(rec)}
            >
              <View style={styles.recommendationHeader}>
                <Text style={styles.recommendationTitle}>{rec.title}</Text>
                <View style={[
                  styles.priorityBadge,
                  rec.priority === 'high' && styles.highPriorityBadge,
                ]}>
                  <Text style={styles.priorityText}>{rec.priority}</Text>
                </View>
              </View>
              <Text style={styles.recommendationDescription}>{rec.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const showRecommendationDetails = (recommendation: Recommendation): void => {
    Alert.alert(
      recommendation.title,
      `${recommendation.description}\n\n${recommendation.action}`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      {[
        { value: 7, label: '7D' },
        { value: 30, label: '30D' },
        { value: 90, label: '90D' },
      ].map((period: PeriodOption) => (
        <TouchableOpacity
          key={period.value}
          style={[
            styles.periodButton,
            selectedPeriod === period.value && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(period.value)}
        >
          <Text style={[
            styles.periodButtonText,
            selectedPeriod === period.value && styles.periodButtonTextActive,
          ]}>
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTabSelector = () => (
    <View style={styles.tabSelector}>
      {[
        { key: 'overview', label: 'Overview' },
        { key: 'workout', label: 'Workout' },
        { key: 'nutrition', label: 'Nutrition' },
        { key: 'recovery', label: 'Recovery' },
      ].map((tab: TabOption) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tabButton,
            selectedTab === tab.key && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab(tab.key)}
        >
          <Text style={[
            styles.tabButtonText,
            selectedTab === tab.key && styles.tabButtonTextActive,
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading analytics...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics</Text>
        {renderPeriodSelector()}
      </View>

      {/* Tab Selector */}
      {renderTabSelector()}

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {selectedTab === 'overview' && renderOverviewTab()}
        {selectedTab === 'workout' && renderWorkoutTab()}
        {selectedTab === 'nutrition' && renderNutritionTab()}
        {selectedTab === 'recovery' && renderRecoveryTab()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    color: COLORS.text,
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: COLORS.card,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodButtonText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  periodButtonTextActive: {
    color: COLORS.text,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: COLORS.primary,
  },
  tabButtonText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  scoreCard: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreTitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
  },
  scoreBar: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  trendsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  trendLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  trendValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  trendChange: {
    fontSize: 14,
    color: COLORS.accent,
  },
  insightCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  insightValue: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  recommendationCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  highPriorityCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  mediumPriorityCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  highPriorityBadge: {
    backgroundColor: COLORS.error,
  },
  mediumPriorityBadge: {
    backgroundColor: COLORS.warning,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  recommendationDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 16,
    padding: 20,
  },
  patternsContainer: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
  },
  patternItem: {
    marginBottom: 16,
  },
  patternLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  patternValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  patternSubtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  performanceGrid: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  performanceLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  positiveValue: {
    color: COLORS.accent,
  },
  negativeValue: {
    color: COLORS.error,
  },
});

export default AnalyticsScreen;