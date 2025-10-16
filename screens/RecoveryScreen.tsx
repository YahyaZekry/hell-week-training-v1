import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Switch,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';

import recoveryService from '../services/recoveryService';
import { RecoveryData, RecoveryGoals, RecoveryAnalytics, RecoveryRecommendation } from '../types';

const { width } = Dimensions.get('window');

interface NewRecovery {
  sleepHours: string;
  sleepQuality: string;
  restingHeartRate: string;
  muscleSoreness: string;
  energyLevel: string;
  stressLevel: string;
  hydration: string;
  stretchingMinutes: string;
  meditationMinutes: string;
  notes: string;
}

const RecoveryScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todayRecovery, setTodayRecovery] = useState<RecoveryData | null>(null);
  const [recoveryGoals, setRecoveryGoals] = useState<RecoveryGoals | null>(null);
  const [recoveryScore, setRecoveryScore] = useState<number | null>(null);
  const [weeklyData, setWeeklyData] = useState<RecoveryAnalytics | null>(null);
  const [recommendations, setRecommendations] = useState<RecoveryRecommendation[]>([]);
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [showGoalsModal, setShowGoalsModal] = useState<boolean>(false);
  const [showTrendsModal, setShowTrendsModal] = useState<boolean>(false);
  
  const [newRecovery, setNewRecovery] = useState<NewRecovery>({
    sleepHours: '',
    sleepQuality: '',
    restingHeartRate: '',
    muscleSoreness: '',
    energyLevel: '',
    stressLevel: '',
    hydration: '',
    stretchingMinutes: '',
    meditationMinutes: '',
    notes: '',
  });

  const [tempGoals, setTempGoals] = useState<Partial<RecoveryGoals>>({});
  
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await recoveryService.initialize();
      await loadDailyData();
      await loadWeeklyData();
    } catch (error) {
      console.error('Failed to initialize recovery screen:', error);
      Alert.alert('Error', 'Failed to load recovery data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDailyData = async (): Promise<void> => {
    const today = new Date().toISOString().split('T')[0];
    const todayData = (recoveryService as any).getRecoveryForDate?.(today);
    const goals = recoveryService.getRecoveryGoals();
    const score = (recoveryService as any).calculateRecoveryScore?.(today);
    const recs = (recoveryService as any).getRecoveryRecommendations?.(today);

    setTodayRecovery(todayData);
    setRecoveryGoals(goals);
    setRecoveryScore(score?.score || null);
    setRecommendations(recs || []);
    setTempGoals(goals || {});
  };

  const loadWeeklyData = async (): Promise<void> => {
    try {
      const analytics = (recoveryService as any).getRecoveryAnalytics?.(7);
      setWeeklyData(analytics);
    } catch (error) {
      console.error('Failed to load weekly data:', error);
    }
  };

  const handleLogRecovery = async (): Promise<void> => {
    if (!newRecovery.sleepHours || !newRecovery.sleepQuality) {
      Alert.alert('Error', 'Please enter sleep hours and quality');
      return;
    }

    try {
      const recoveryData: RecoveryData = {
        sleepHours: parseFloat(newRecovery.sleepHours),
        sleepQuality: parseInt(newRecovery.sleepQuality),
        restingHeartRate: newRecovery.restingHeartRate ? parseInt(newRecovery.restingHeartRate) : undefined,
        muscleSoreness: newRecovery.muscleSoreness ? parseInt(newRecovery.muscleSoreness) : undefined,
        energyLevel: newRecovery.energyLevel ? parseInt(newRecovery.energyLevel) : undefined,
        stressLevel: newRecovery.stressLevel ? parseInt(newRecovery.stressLevel) : undefined,
        hydration: newRecovery.hydration ? parseFloat(newRecovery.hydration) : undefined,
        stretchingMinutes: newRecovery.stretchingMinutes ? parseInt(newRecovery.stretchingMinutes) : undefined,
        meditationMinutes: newRecovery.meditationMinutes ? parseInt(newRecovery.meditationMinutes) : undefined,
        notes: newRecovery.notes,
        date: new Date().toISOString().split('T')[0],
        userId: 'current-user', // This should come from auth context
      };

      const result = await (recoveryService as any).logRecovery?.(recoveryData);
      
      if (result.success) {
        setShowLogModal(false);
        setNewRecovery({
          sleepHours: '',
          sleepQuality: '',
          restingHeartRate: '',
          muscleSoreness: '',
          energyLevel: '',
          stressLevel: '',
          hydration: '',
          stretchingMinutes: '',
          meditationMinutes: '',
          notes: '',
        });
        
        await loadDailyData();
        await loadWeeklyData();
        
        Alert.alert('Success', 'Recovery data logged successfully');
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      console.error('Failed to log recovery:', error);
      Alert.alert('Error', 'Failed to log recovery data');
    }
  };

  const handleUpdateGoals = async (): Promise<void> => {
    try {
      const result = await recoveryService.updateRecoveryGoals(tempGoals);
      
      if (result.success) {
        setShowGoalsModal(false);
        setRecoveryGoals(result.data || null);
        await loadDailyData();
        Alert.alert('Success', 'Recovery goals updated successfully');
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      console.error('Failed to update goals:', error);
      Alert.alert('Error', 'Failed to update recovery goals');
    }
  };

  const getRecoveryScoreColor = (score: number): string => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const getRecoveryScoreLabel = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const getTrendIcon = (trend: string): string => {
    switch (trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      default: return '➡️';
    }
  };

  const renderRecoveryScore = (): React.ReactElement => {
    if (recoveryScore === null) {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today&apos;s Recovery Score</Text>
          <Text style={styles.noDataText}>Log your recovery data to see your score</Text>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => setShowLogModal(true)}
          >
            <Text style={styles.buttonText}>Log Recovery</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today&apos;s Recovery Score</Text>
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreText, { color: getRecoveryScoreColor(recoveryScore) }]}>
            {recoveryScore}
          </Text>
          <Text style={styles.scoreLabel}>{getRecoveryScoreLabel(recoveryScore)}</Text>
        </View>
        
        {todayRecovery && (
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Sleep</Text>
              <Text style={styles.statValue}>{todayRecovery.sleepHours}h</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Quality</Text>
              <Text style={styles.statValue}>{todayRecovery.sleepQuality}/10</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Energy</Text>
              <Text style={styles.statValue}>{todayRecovery.energyLevel || '--'}/10</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Soreness</Text>
              <Text style={styles.statValue}>{todayRecovery.muscleSoreness || '--'}/10</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderWeeklyChart = (): React.ReactElement => {
    if (!weeklyData?.averages) {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Recovery Trends</Text>
          <Text style={styles.noDataText}>No data available for the past week</Text>
        </View>
      );
    }

    const chartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: weeklyData.logs.map((log: any) => log.sleepHours || 0),
          color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: weeklyData.logs.map((log: any) => log.sleepQuality || 0),
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ['Sleep Hours', 'Sleep Quality'],
    };

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Recovery Trends</Text>
        <LineChart
          data={chartData}
          width={width - 40}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '4', strokeWidth: '2', stroke: '#fff' },
          }}
          bezier
          style={styles.chart}
        />
        
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => setShowTrendsModal(true)}
        >
          <Text style={styles.buttonText}>View Detailed Trends</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRecommendations = (): React.ReactElement => {
    if (recommendations.length === 0) {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recovery Recommendations</Text>
          <Text style={styles.noDataText}>Great job! No specific recommendations at this time.</Text>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recovery Recommendations</Text>
        {recommendations.map((rec, index) => (
          <View key={index} style={[
            styles.recommendationItem,
            rec.priority === 'high' && styles.highPriority,
            rec.priority === 'medium' && styles.mediumPriority,
          ]}>
            <View style={styles.recHeader}>
              <Text style={styles.recTitle}>{rec.title}</Text>
              <Text style={styles.recPriority}>{rec.priority.toUpperCase()}</Text>
            </View>
            <Text style={styles.recDescription}>{rec.description}</Text>
            <Text style={styles.recAction}>💡 {rec.action}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderQuickActions = (): React.ReactElement => (
    <View style={styles.quickActions}>
      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={() => setShowLogModal(true)}
      >
        <Text style={styles.actionIcon}>📝</Text>
        <Text style={styles.actionLabel}>Log Recovery</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={() => setShowGoalsModal(true)}
      >
        <Text style={styles.actionIcon}>🎯</Text>
        <Text style={styles.actionLabel}>Set Goals</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={() => setShowTrendsModal(true)}
      >
        <Text style={styles.actionIcon}>📊</Text>
        <Text style={styles.actionLabel}>View Trends</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading recovery data...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.screenTitle}>Recovery Monitoring</Text>
      
      {renderQuickActions()}
      {renderRecoveryScore()}
      {renderWeeklyChart()}
      {renderRecommendations()}

      {/* Log Recovery Modal */}
      <Modal
        visible={showLogModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Log Recovery Data</Text>
            <TouchableOpacity onPress={() => setShowLogModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Sleep Hours *</Text>
              <TextInput
                style={styles.input}
                value={newRecovery.sleepHours}
                onChangeText={(text) => setNewRecovery({...newRecovery, sleepHours: text})}
                placeholder="Hours of sleep"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Sleep Quality (1-10) *</Text>
              <TextInput
                style={styles.input}
                value={newRecovery.sleepQuality}
                onChangeText={(text) => setNewRecovery({...newRecovery, sleepQuality: text})}
                placeholder="Sleep quality rating"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Resting Heart Rate (bpm)</Text>
              <TextInput
                style={styles.input}
                value={newRecovery.restingHeartRate}
                onChangeText={(text) => setNewRecovery({...newRecovery, restingHeartRate: text})}
                placeholder="Resting heart rate"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Muscle Soreness (1-10)</Text>
              <TextInput
                style={styles.input}
                value={newRecovery.muscleSoreness}
                onChangeText={(text) => setNewRecovery({...newRecovery, muscleSoreness: text})}
                placeholder="Muscle soreness level"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Energy Level (1-10)</Text>
              <TextInput
                style={styles.input}
                value={newRecovery.energyLevel}
                onChangeText={(text) => setNewRecovery({...newRecovery, energyLevel: text})}
                placeholder="Energy level"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Stress Level (1-10)</Text>
              <TextInput
                style={styles.input}
                value={newRecovery.stressLevel}
                onChangeText={(text) => setNewRecovery({...newRecovery, stressLevel: text})}
                placeholder="Stress level"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Hydration (oz)</Text>
              <TextInput
                style={styles.input}
                value={newRecovery.hydration}
                onChangeText={(text) => setNewRecovery({...newRecovery, hydration: text})}
                placeholder="Water intake"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Stretching (minutes)</Text>
              <TextInput
                style={styles.input}
                value={newRecovery.stretchingMinutes}
                onChangeText={(text) => setNewRecovery({...newRecovery, stretchingMinutes: text})}
                placeholder="Stretching duration"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Meditation (minutes)</Text>
              <TextInput
                style={styles.input}
                value={newRecovery.meditationMinutes}
                onChangeText={(text) => setNewRecovery({...newRecovery, meditationMinutes: text})}
                placeholder="Meditation duration"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newRecovery.notes}
                onChangeText={(text) => setNewRecovery({...newRecovery, notes: text})}
                placeholder="Additional notes about your recovery"
                multiline
                numberOfLines={3}
              />
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={() => setShowLogModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={handleLogRecovery}
            >
              <Text style={styles.buttonText}>Save Recovery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Goals Modal */}
      <Modal
        visible={showGoalsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Recovery Goals</Text>
            <TouchableOpacity onPress={() => setShowGoalsModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Sleep Hours Goal</Text>
              <TextInput
                style={styles.input}
                value={tempGoals.sleepHours?.toString()}
                onChangeText={(text) => setTempGoals({...tempGoals, sleepHours: parseInt(text) || 0})}
                placeholder="Target sleep hours"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Sleep Quality Goal (1-10)</Text>
              <TextInput
                style={styles.input}
                value={tempGoals.sleepQuality?.toString()}
                onChangeText={(text) => setTempGoals({...tempGoals, sleepQuality: parseInt(text) || 0})}
                placeholder="Target sleep quality"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Resting Heart Rate Goal (bpm)</Text>
              <TextInput
                style={styles.input}
                value={tempGoals.restingHeartRate?.toString()}
                onChangeText={(text) => setTempGoals({...tempGoals, restingHeartRate: parseInt(text) || 0})}
                placeholder="Target resting heart rate"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Hydration Goal (oz)</Text>
              <TextInput
                style={styles.input}
                value={tempGoals.hydrationGoal?.toString()}
                onChangeText={(text) => setTempGoals({...tempGoals, hydrationGoal: parseInt(text) || 0})}
                placeholder="Daily hydration goal"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Stretching Goal (minutes)</Text>
              <TextInput
                style={styles.input}
                value={tempGoals.stretchingMinutes?.toString()}
                onChangeText={(text) => setTempGoals({...tempGoals, stretchingMinutes: parseInt(text) || 0})}
                placeholder="Daily stretching goal"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Meditation Goal (minutes)</Text>
              <TextInput
                style={styles.input}
                value={tempGoals.meditationMinutes?.toString()}
                onChangeText={(text) => setTempGoals({...tempGoals, meditationMinutes: parseInt(text) || 0})}
                placeholder="Daily meditation goal"
                keyboardType="numeric"
              />
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={() => setShowGoalsModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={handleUpdateGoals}
            >
              <Text style={styles.buttonText}>Save Goals</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Trends Modal */}
      <Modal
        visible={showTrendsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Recovery Trends</Text>
            <TouchableOpacity onPress={() => setShowTrendsModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {weeklyData?.trends && (
              <View style={styles.trendsContainer}>
                <Text style={styles.sectionTitle}>7-Day Trends</Text>
                
                <View style={styles.trendItem}>
                  <Text style={styles.trendLabel}>Sleep Hours</Text>
                  <Text style={styles.trendValue}>
                    {getTrendIcon(weeklyData.trends.sleepHours)} {weeklyData.trends.sleepHours}
                  </Text>
                </View>

                <View style={styles.trendItem}>
                  <Text style={styles.trendLabel}>Sleep Quality</Text>
                  <Text style={styles.trendValue}>
                    {getTrendIcon(weeklyData.trends.sleepQuality)} {weeklyData.trends.sleepQuality}
                  </Text>
                </View>

                <View style={styles.trendItem}>
                  <Text style={styles.trendLabel}>Muscle Soreness</Text>
                  <Text style={styles.trendValue}>
                    {getTrendIcon(weeklyData.trends.muscleSoreness)} {weeklyData.trends.muscleSoreness}
                  </Text>
                </View>

                <View style={styles.trendItem}>
                  <Text style={styles.trendLabel}>Energy Level</Text>
                  <Text style={styles.trendValue}>
                    {getTrendIcon(weeklyData.trends.energyLevel)} {weeklyData.trends.energyLevel}
                  </Text>
                </View>

                <View style={styles.trendItem}>
                  <Text style={styles.trendLabel}>Stress Level</Text>
                  <Text style={styles.trendValue}>
                    {getTrendIcon(weeklyData.trends.stressLevel)} {weeklyData.trends.stressLevel}
                  </Text>
                </View>

                <View style={styles.trendItem}>
                  <Text style={styles.trendLabel}>Overall Recovery</Text>
                  <Text style={styles.trendValue}>
                    {getTrendIcon(weeklyData.trends.overallRecovery)} {weeklyData.trends.overallRecovery}
                  </Text>
                </View>
              </View>
            )}

            {weeklyData?.averages && (
              <View style={styles.averagesContainer}>
                <Text style={styles.sectionTitle}>Weekly Averages</Text>
                
                <View style={styles.averageItem}>
                  <Text style={styles.averageLabel}>Sleep Hours</Text>
                  <Text style={styles.averageValue}>{weeklyData.averages.sleepHours}h</Text>
                </View>

                <View style={styles.averageItem}>
                  <Text style={styles.averageLabel}>Sleep Quality</Text>
                  <Text style={styles.averageValue}>{weeklyData.averages.sleepQuality}/10</Text>
                </View>

                <View style={styles.averageItem}>
                  <Text style={styles.averageLabel}>Resting Heart Rate</Text>
                  <Text style={styles.averageValue}>{weeklyData.averages.restingHeartRate} bpm</Text>
                </View>

                <View style={styles.averageItem}>
                  <Text style={styles.averageLabel}>Muscle Soreness</Text>
                  <Text style={styles.averageValue}>{weeklyData.averages.muscleSoreness}/10</Text>
                </View>

                <View style={styles.averageItem}>
                  <Text style={styles.averageLabel}>Energy Level</Text>
                  <Text style={styles.averageValue}>{weeklyData.averages.energyLevel}/10</Text>
                </View>

                <View style={styles.averageItem}>
                  <Text style={styles.averageLabel}>Stress Level</Text>
                  <Text style={styles.averageValue}>{weeklyData.averages.stressLevel}/10</Text>
                </View>

                <View style={styles.averageItem}>
                  <Text style={styles.averageLabel}>Hydration</Text>
                  <Text style={styles.averageValue}>{weeklyData.averages.hydration} oz</Text>
                </View>

                <View style={styles.averageItem}>
                  <Text style={styles.averageLabel}>Stretching</Text>
                  <Text style={styles.averageValue}>{weeklyData.averages.stretchingMinutes} min</Text>
                </View>

                <View style={styles.averageItem}>
                  <Text style={styles.averageLabel}>Meditation</Text>
                  <Text style={styles.averageValue}>{weeklyData.averages.meditationMinutes} min</Text>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={() => setShowTrendsModal(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  actionLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
  noDataText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendationItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  highPriority: {
    borderLeftColor: '#F44336',
    backgroundColor: '#ffebee',
  },
  mediumPriority: {
    borderLeftColor: '#FF9800',
    backgroundColor: '#fff3e0',
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  recPriority: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  recAction: {
    fontSize: 13,
    color: '#2196F3',
    fontStyle: 'italic',
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
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  trendsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  trendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  trendLabel: {
    fontSize: 16,
    color: '#333',
  },
  trendValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  averagesContainer: {
    marginBottom: 30,
  },
  averageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  averageLabel: {
    fontSize: 16,
    color: '#333',
  },
  averageValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default RecoveryScreen;