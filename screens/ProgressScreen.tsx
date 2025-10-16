import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';

import progressService from '../services/progressService';
import type { ProgressData, ProgressAchievement, ProgressPersonalRecord } from '../types';

const { width } = Dimensions.get('window');

interface ProgressScreenProps {
  navigation: any;
}

type TrendType = 'improving' | 'declining' | 'stable';

const ProgressScreen: React.FC<ProgressScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(30); // days
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState<boolean>(false);
  const [showRecordsModal, setShowRecordsModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('overview');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    initializeData();
  }, [selectedPeriod]);

  const initializeData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await progressService.initialize();
      const data = progressService.getProgressData(selectedPeriod);
      setProgressData(data);
    } catch (error) {
      console.error('Failed to initialize progress screen:', error);
      Alert.alert('Error', 'Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (trend: TrendType): string => {
    switch (trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: TrendType): string => {
    switch (trend) {
      case 'improving': return '#4CAF50';
      case 'declining': return '#F44336';
      default: return '#FF9800';
    }
  };

  const renderOverviewCard = () => {
    if (!progressData) return null;

    const { workoutStats, nutritionStats, recoveryStats, trends } = progressData;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progress Overview</Text>
        
        <View style={styles.overviewGrid}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewNumber}>{workoutStats.totalWorkouts}</Text>
            <Text style={styles.overviewLabel}>Workouts</Text>
            <View style={styles.trendContainer}>
              <Text style={styles.trendIcon}>{getTrendIcon(trends.workoutFrequency as TrendType)}</Text>
              <Text style={[styles.trendText, { color: getTrendColor(trends.workoutFrequency as TrendType) }]}>
                {trends.workoutFrequency}
              </Text>
            </View>
          </View>

          <View style={styles.overviewItem}>
            <Text style={styles.overviewNumber}>{Math.round(workoutStats.totalDuration / 60)}h</Text>
            <Text style={styles.overviewLabel}>Total Time</Text>
            <View style={styles.trendContainer}>
              <Text style={styles.trendIcon}>{getTrendIcon(trends.workoutDuration as TrendType)}</Text>
              <Text style={[styles.trendText, { color: getTrendColor(trends.workoutDuration as TrendType) }]}>
                {trends.workoutDuration}
              </Text>
            </View>
          </View>

          <View style={styles.overviewItem}>
            <Text style={styles.overviewNumber}>{workoutStats.totalCalories}</Text>
            <Text style={styles.overviewLabel}>Calories Burned</Text>
            <View style={styles.trendContainer}>
              <Text style={styles.trendIcon}>{getTrendIcon(trends.calorieBurn as TrendType)}</Text>
              <Text style={[styles.trendText, { color: getTrendColor(trends.calorieBurn as TrendType) }]}>
                {trends.calorieBurn}
              </Text>
            </View>
          </View>

          <View style={styles.overviewItem}>
            <Text style={styles.overviewNumber}>{nutritionStats.averageCalories}</Text>
            <Text style={styles.overviewLabel}>Avg Calories</Text>
            <Text style={styles.overviewSublabel}>per day</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton} 
            onPress={() => setShowAchievementsModal(true)}
          >
            <Text style={styles.quickActionIcon}>🏆</Text>
            <Text style={styles.quickActionLabel}>Achievements</Text>
            <Text style={styles.quickActionValue}>
              {progressData.achievements.filter((a: ProgressAchievement) => a.unlocked).length}/{progressData.achievements.length}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionButton} 
            onPress={() => setShowRecordsModal(true)}
          >
            <Text style={styles.quickActionIcon}>🎯</Text>
            <Text style={styles.quickActionLabel}>Personal Records</Text>
            <Text style={styles.quickActionValue}>{progressData.personalRecords.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionButton} 
            onPress={() => setShowDetailsModal(true)}
          >
            <Text style={styles.quickActionIcon}>📊</Text>
            <Text style={styles.quickActionLabel}>Detailed Stats</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderWorkoutChart = () => {
    if (!progressData?.workoutStats) return null;

    const { workoutStats } = progressData;
    const weeklyData = Object.entries(workoutStats.weeklyBreakdown)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-8); // Last 8 weeks

    const chartData = {
      labels: weeklyData.map(([week]) => {
        const date = new Date(week);
        return `W${Math.ceil((date.getDate()) / 7)}`;
      }),
      datasets: [{
        data: weeklyData.map(([, count]) => count as number),
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2,
      }],
    };

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Workout Frequency</Text>
        <Text style={styles.chartSubtitle}>Workouts per week (last 8 weeks)</Text>
        
        <LineChart
          data={chartData}
          width={width - 40}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '4', strokeWidth: '2', stroke: '#2196F3' },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    );
  };

  const renderNutritionChart = () => {
    if (!progressData?.nutritionStats) return null;

    const { nutritionStats } = progressData;
    const dailyData = Object.entries(nutritionStats.dailyBreakdown)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-7); // Last 7 days

    const chartData = {
      labels: dailyData.map(([date]) => {
        const d = new Date(date);
        return d.toLocaleDateString('en', { weekday: 'short' });
      }),
      datasets: [
        {
          data: dailyData.map(([, data]) => (data as any).calories),
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: dailyData.map(([, data]) => (data as any).protein * 4), // Convert protein to calories
          color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: dailyData.map(([, data]) => (data as any).carbs * 4), // Convert carbs to calories
          color: (opacity = 1) => `rgba(255, 206, 86, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ['Total Calories', 'Protein (cal)', 'Carbs (cal)'],
    };

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nutrition Trends</Text>
        <Text style={styles.chartSubtitle}>Daily calories and macronutrients (last 7 days)</Text>
        
        <LineChart
          data={chartData}
          width={width - 40}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '3', strokeWidth: '1', stroke: '#fff' },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    );
  };

  const renderRecoveryChart = () => {
    if (!progressData?.recoveryStats) return null;

    const { recoveryStats } = progressData;
    const dailyData = Object.entries(recoveryStats.dailyBreakdown)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-7); // Last 7 days

    const chartData = {
      labels: dailyData.map(([date]) => {
        const d = new Date(date);
        return d.toLocaleDateString('en', { weekday: 'short' });
      }),
      datasets: [
        {
          data: dailyData.map(([, data]) => (data as any).sleepHours),
          color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: dailyData.map(([, data]) => (data as any).energyLevel),
          color: (opacity = 1) => `rgba(255, 159, 64, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: dailyData.map(([, data]) => 10 - (data as any).stressLevel), // Invert stress
          color: (opacity = 1) => `rgba(153, 102, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ['Sleep Hours', 'Energy Level', 'Low Stress'],
    };

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recovery Metrics</Text>
        <Text style={styles.chartSubtitle}>Sleep, energy, and stress levels (last 7 days)</Text>
        
        <LineChart
          data={chartData}
          width={width - 40}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '3', strokeWidth: '1', stroke: '#fff' },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    );
  };

  const renderWorkoutTypes = () => {
    if (!progressData?.workoutStats) return null;

    const { workoutStats } = progressData;
    const types = Object.entries(workoutStats.workoutTypes);
    
    if (types.length === 0) return null;

    const chartData = {
      labels: types.map(([type]) => type.replace('_', ' ')),
      datasets: [{
        data: types.map(([, count]) => count),
      }],
    };

    const colors = ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'];

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Workout Types</Text>
        
        <PieChart
          data={chartData.labels.map((label, index) => ({
            name: label,
            population: chartData.datasets[0].data[index],
            color: colors[index % colors.length],
            legendFontColor: '#333',
            legendFontSize: 12,
          }))}
          width={width - 40}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 10]}
          absolute
        />
      </View>
    );
  };

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      <TouchableOpacity 
        style={[styles.periodButton, selectedPeriod === 7 && styles.periodButtonActive]}
        onPress={() => setSelectedPeriod(7)}
      >
        <Text style={[styles.periodButtonText, selectedPeriod === 7 && styles.periodButtonTextActive]}>
          7 Days
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.periodButton, selectedPeriod === 30 && styles.periodButtonActive]}
        onPress={() => setSelectedPeriod(30)}
      >
        <Text style={[styles.periodButtonText, selectedPeriod === 30 && styles.periodButtonTextActive]}>
          30 Days
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.periodButton, selectedPeriod === 90 && styles.periodButtonActive]}
        onPress={() => setSelectedPeriod(90)}
      >
        <Text style={[styles.periodButtonText, selectedPeriod === 90 && styles.periodButtonTextActive]}>
          90 Days
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderAchievementsModal = () => {
    if (!progressData) return null;

    const unlockedCount = progressData.achievements.filter((a: ProgressAchievement) => a.unlocked).length;

    return (
      <Modal
        visible={showAchievementsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Achievements</Text>
            <TouchableOpacity onPress={() => setShowAchievementsModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.achievementSummary}>
              <Text style={styles.achievementSummaryText}>
                {unlockedCount} of {progressData.achievements.length} unlocked
              </Text>
            </View>
            
            {progressData.achievements.map((achievement: ProgressAchievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementItem,
                  achievement.unlocked && styles.achievementUnlocked
                ]}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <Text style={styles.achievementDate}>
                      Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </Text>
                  )}
                </View>
                {achievement.unlocked && (
                  <Text style={styles.achievementCheck}>✓</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderRecordsModal = () => {
    if (!progressData) return null;

    return (
      <Modal
        visible={showRecordsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Personal Records</Text>
            <TouchableOpacity onPress={() => setShowRecordsModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {progressData.personalRecords.map((record: ProgressPersonalRecord) => (
              <View key={record.id} style={styles.recordItem}>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordType}>
                    {record.type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </Text>
                  <Text style={styles.recordValue}>
                    {record.value} {record.unit}
                  </Text>
                </View>
                {record.date && (
                  <Text style={styles.recordDate}>
                    Set: {new Date(record.date).toLocaleDateString()}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderDetailsModal = () => {
    if (!progressData) return null;

    const { workoutStats, nutritionStats, recoveryStats } = progressData;

    return (
      <Modal
        visible={showDetailsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Detailed Statistics</Text>
            <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.detailsSection}>
              <Text style={styles.detailsSectionTitle}>Workout Statistics</Text>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Total Workouts</Text>
                <Text style={styles.detailValue}>{workoutStats.totalWorkouts}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Total Duration</Text>
                <Text style={styles.detailValue}>{Math.round(workoutStats.totalDuration / 60)}h {workoutStats.totalDuration % 60}m</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Duration</Text>
                <Text style={styles.detailValue}>{workoutStats.averageDuration} minutes</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Total Calories Burned</Text>
                <Text style={styles.detailValue}>{workoutStats.totalCalories}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Calories Per Workout</Text>
                <Text style={styles.detailValue}>{workoutStats.averageCalories}</Text>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <Text style={styles.detailsSectionTitle}>Nutrition Statistics</Text>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Total Meals Logged</Text>
                <Text style={styles.detailValue}>{nutritionStats.totalMeals}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Daily Calories</Text>
                <Text style={styles.detailValue}>{Math.round(nutritionStats.totalCalories / selectedPeriod)}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Daily Protein</Text>
                <Text style={styles.detailValue}>{Math.round(nutritionStats.totalProtein / selectedPeriod)}g</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Daily Carbs</Text>
                <Text style={styles.detailValue}>{Math.round(nutritionStats.totalCarbs / selectedPeriod)}g</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Daily Fat</Text>
                <Text style={styles.detailValue}>{Math.round(nutritionStats.totalFat / selectedPeriod)}g</Text>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <Text style={styles.detailsSectionTitle}>Recovery Statistics</Text>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Recovery Logs</Text>
                <Text style={styles.detailValue}>{recoveryStats.totalRecoveryLogs}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Sleep Hours</Text>
                <Text style={styles.detailValue}>{recoveryStats.averageSleepHours.toFixed(1)} hours</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Sleep Quality</Text>
                <Text style={styles.detailValue}>{recoveryStats.averageSleepQuality.toFixed(1)}/10</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Resting Heart Rate</Text>
                <Text style={styles.detailValue}>{recoveryStats.averageRestingHeartRate} bpm</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Energy Level</Text>
                <Text style={styles.detailValue}>{recoveryStats.averageEnergyLevel.toFixed(1)}/10</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Average Stress Level</Text>
                <Text style={styles.detailValue}>{recoveryStats.averageStressLevel.toFixed(1)}/10</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading progress data...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.screenTitle}>Progress Tracking</Text>
      
      {renderPeriodSelector()}
      {renderOverviewCard()}
      
      {/* Additional Tools Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Additional Tools</Text>
        <View style={styles.toolsGrid}>
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => navigation.navigate('Recovery')}
          >
            <Text style={styles.toolIcon}>🩺</Text>
            <Text style={styles.toolButtonText}>Recovery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => navigation.navigate('Mental')}
          >
            <Text style={styles.toolIcon}>🧠</Text>
            <Text style={styles.toolButtonText}>Mental Fitness</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => navigation.navigate('Analytics')}
          >
            <Text style={styles.toolIcon}>📊</Text>
            <Text style={styles.toolButtonText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {renderWorkoutChart()}
      {renderNutritionChart()}
      {renderRecoveryChart()}
      {renderWorkoutTypes()}

      {renderAchievementsModal()}
      {renderRecordsModal()}
      {renderDetailsModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#2196F3',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  overviewItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  overviewNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  overviewLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  overviewSublabel: {
    fontSize: 10,
    color: '#999',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  trendIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  quickActionIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  quickActionLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
  quickActionValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  achievementSummary: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  achievementSummaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    opacity: 0.6,
  },
  achievementUnlocked: {
    opacity: 1,
    backgroundColor: '#e8f5e8',
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  achievementDate: {
    fontSize: 12,
    color: '#2196F3',
    marginTop: 2,
  },
  achievementCheck: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  recordItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordInfo: {
    flex: 1,
  },
  recordType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recordValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 2,
  },
  recordDate: {
    fontSize: 12,
    color: '#666',
  },
  detailsSection: {
    marginBottom: 30,
  },
  detailsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  toolsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  toolButton: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: '30%',
  },
  toolIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  toolButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
});

export default ProgressScreen;