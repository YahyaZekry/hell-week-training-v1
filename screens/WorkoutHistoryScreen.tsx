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
  FlatList,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

import workoutTrackingService from '../services/workoutTrackingService';
import {
  WorkoutSession,
  WorkoutStats,
  PersonalBests
} from '../types';

const { width } = Dimensions.get('window');

interface CalendarData {
  workouts: { [key: number]: WorkoutSession[] };
  stats: {
    totalWorkouts: number;
    totalDuration: number;
    totalCalories: number;
  };
}

interface WorkoutDetailsModalProps {
  workout: WorkoutSession | null;
  visible: boolean;
  onClose: () => void;
}

type ViewMode = 'calendar' | 'stats';

const WorkoutHistoryScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateWorkouts, setSelectedDateWorkouts] = useState<WorkoutSession[]>([]);
  const [showWorkoutDetailsModal, setShowWorkoutDetailsModal] = useState<boolean>(false);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutSession | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats | null>(null);
  const [personalBests, setPersonalBests] = useState<PersonalBests | null>(null);
  
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    initializeData();
  }, [selectedMonth]);

  const initializeData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await workoutTrackingService.initialize();
      await loadCalendarData();
      await loadWorkoutStats();
      await loadPersonalBests();
    } catch (error) {
      console.error('Failed to initialize workout history screen:', error);
      Alert.alert('Error', 'Failed to load workout history');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCalendarData = async (): Promise<void> => {
    try {
      const year = selectedMonth.getFullYear();
      const month = selectedMonth.getMonth();
      const calendar = workoutTrackingService.getWorkoutCalendar(year, month + 1);
      setCalendarData(calendar);
    } catch (error) {
      console.error('Failed to load calendar data:', error);
    }
  };

  const loadWorkoutStats = async (): Promise<void> => {
    try {
      const stats = workoutTrackingService.getWorkoutStats(30);
      setWorkoutStats(stats);
    } catch (error) {
      console.error('Failed to load workout stats:', error);
    }
  };

  const loadPersonalBests = async (): Promise<void> => {
    try {
      const bests = workoutTrackingService.getPersonalBests();
      setPersonalBests(bests);
    } catch (error) {
      console.error('Failed to load personal bests:', error);
    }
  };

  const handleDatePress = (day: number): void => {
    const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
    setSelectedDate(date);
    
    if (calendarData?.workouts[day]) {
      setSelectedDateWorkouts(calendarData.workouts[day]);
    } else {
      setSelectedDateWorkouts([]);
    }
  };

  const handleWorkoutPress = (workout: WorkoutSession): void => {
    setSelectedWorkout(workout);
    setShowWorkoutDetailsModal(true);
  };

  const navigateMonth = (direction: 'prev' | 'next'): void => {
    const newMonth = new Date(selectedMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setSelectedMonth(newMonth);
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const renderCalendar = (): React.ReactElement | null => {
    if (!calendarData) return null;

    const daysInMonth = getDaysInMonth(selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedMonth);
    const days: React.ReactElement[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasWorkout = calendarData.workouts[day]?.length > 0;
      const workoutCount = calendarData.workouts[day]?.length || 0;
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            styles.calendarDayActive,
            hasWorkout && styles.calendarDayWithWorkout,
            selectedDate?.getDate() === day && styles.calendarDaySelected,
          ]}
          onPress={() => handleDatePress(day)}
        >
          <Text style={[
            styles.calendarDayText,
            hasWorkout && styles.calendarDayTextWithWorkout,
            selectedDate?.getDate() === day && styles.calendarDayTextSelected,
          ]}>
            {day}
          </Text>
          {hasWorkout && (
            <View style={styles.workoutIndicator}>
              <Text style={styles.workoutIndicatorText}>{workoutCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => navigateMonth('prev')}>
            <Text style={styles.navigationButton}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.calendarTitle}>
            {selectedMonth.toLocaleDateString('en', { month: 'long', year: 'numeric' })}
          </Text>
          <TouchableOpacity onPress={() => navigateMonth('next')}>
            <Text style={styles.navigationButton}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.weekdays}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Text key={day} style={styles.weekdayText}>{day}</Text>
          ))}
        </View>
        
        <View style={styles.calendarGrid}>
          {days}
        </View>
      </View>
    );
  };

  const renderSelectedDateWorkouts = (): React.ReactElement => {
    if (!selectedDate || selectedDateWorkouts.length === 0) {
      return (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateTitle}>
            {selectedDate ? selectedDate.toLocaleDateString('en', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Select a date'}
          </Text>
          <Text style={styles.noWorkoutsText}>
            {selectedDate ? 'No workouts on this date' : 'Select a date to view workouts'}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateTitle}>
          {selectedDate.toLocaleDateString('en', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
        <Text style={styles.workoutCount}>
          {selectedDateWorkouts.length} workout{selectedDateWorkouts.length !== 1 ? 's' : ''}
        </Text>
        
        {selectedDateWorkouts.map((workout, index) => (
          <TouchableOpacity
            key={index}
            style={styles.workoutItem}
            onPress={() => handleWorkoutPress(workout)}
          >
            <View style={styles.workoutHeader}>
              <Text style={styles.workoutName}>{workout.workoutName}</Text>
              <Text style={styles.workoutDuration}>
                {formatDuration(workout.duration)}
              </Text>
            </View>
            
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutType}>{workout.workoutType}</Text>
              <Text style={styles.workoutExercises}>
                {typeof workout.completedExercises === 'number' ? workout.completedExercises : workout.completedExercises?.length || 0} exercises
              </Text>
            </View>
            
            {(workout.caloriesBurned || 0) > 0 && (
              <Text style={styles.workoutCalories}>
                🔥 {workout.caloriesBurned} cal
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderWorkoutStats = (): React.ReactElement | null => {
    if (!workoutStats) return null;

    const weeklyData = Object.entries(workoutStats.weeklyBreakdown)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-8);

    const chartData = {
      labels: weeklyData.map(([week]) => {
        const date = new Date(week);
        return `W${Math.ceil((date.getDate()) / 7)}`;
      }),
      datasets: [{
        data: weeklyData.map(([, count]) => count),
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2,
      }],
    };

    return (
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>30-Day Statistics</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{workoutStats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{formatDuration(workoutStats.totalDuration)}</Text>
            <Text style={styles.statLabel}>Total Time</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{workoutStats.totalCalories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{workoutStats.completionRate}%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Weekly Workout Frequency</Text>
          <LineChart
            data={chartData}
            width={width - 40}
            height={200}
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
      </View>
    );
  };

  const renderPersonalBests = (): React.ReactElement | null => {
    if (!personalBests) return null;

    return (
      <View style={styles.pbestsContainer}>
        <Text style={styles.pbestsTitle}>Personal Bests</Text>
        
        <View style={styles.pbestsGrid}>
          <View style={styles.pbestItem}>
            <Text style={styles.pbestIcon}>⏱️</Text>
            <Text style={styles.pbestValue}>{formatDuration(personalBests.longestWorkout)}</Text>
            <Text style={styles.pbestLabel}>Longest Workout</Text>
          </View>
          
          <View style={styles.pbestItem}>
            <Text style={styles.pbestIcon}>🔥</Text>
            <Text style={styles.pbestValue}>{personalBests.mostCalories}</Text>
            <Text style={styles.pbestLabel}>Most Calories</Text>
          </View>
          
          <View style={styles.pbestItem}>
            <Text style={styles.pbestIcon}>💪</Text>
            <Text style={styles.pbestValue}>{personalBests.mostExercises}</Text>
            <Text style={styles.pbestLabel}>Most Exercises</Text>
          </View>
          
          <View style={styles.pbestItem}>
            <Text style={styles.pbestIcon}>⭐</Text>
            <Text style={styles.pbestValue}>{personalBests.highestRated}/5</Text>
            <Text style={styles.pbestLabel}>Highest Rating</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderWorkoutDetailsModal = (): React.ReactElement | null => {
    if (!selectedWorkout) return null;

    return (
      <Modal
        visible={showWorkoutDetailsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Workout Details</Text>
            <TouchableOpacity onPress={() => setShowWorkoutDetailsModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.workoutDetailHeader}>
              <Text style={styles.workoutDetailName}>{selectedWorkout.workoutName}</Text>
              <Text style={styles.workoutDetailDate}>
                {new Date(selectedWorkout.startTime || '').toLocaleDateString('en', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>

            <View style={styles.workoutDetailStats}>
              <View style={styles.detailStat}>
                <Text style={styles.detailStatLabel}>Duration</Text>
                <Text style={styles.detailStatValue}>
                  {formatDuration(selectedWorkout.duration)}
                </Text>
              </View>
              
              <View style={styles.detailStat}>
                <Text style={styles.detailStatLabel}>Exercises</Text>
                <Text style={styles.detailStatValue}>
                  {typeof selectedWorkout.completedExercises === 'number' ? selectedWorkout.completedExercises : selectedWorkout.completedExercises?.length || 0}/{selectedWorkout.totalExercises || 0}
                </Text>
              </View>
              
              <View style={styles.detailStat}>
                <Text style={styles.detailStatLabel}>Calories</Text>
                <Text style={styles.detailStatValue}>
                  {selectedWorkout.caloriesBurned || 0}
                </Text>
              </View>
              
              <View style={styles.detailStat}>
                <Text style={styles.detailStatLabel}>Rating</Text>
                <Text style={styles.detailStatValue}>
                  {selectedWorkout.overallRating || 'N/A'}/5
                </Text>
              </View>
            </View>

            <View style={styles.workoutTimes}>
              <Text style={styles.workoutTimesTitle}>Workout Times</Text>
              <Text style={styles.workoutTime}>
                Started: {new Date(selectedWorkout.startTime || '').toLocaleTimeString()}
              </Text>
              {selectedWorkout.endTime && (
                <Text style={styles.workoutTime}>
                  Ended: {new Date(selectedWorkout.endTime).toLocaleTimeString()}
                </Text>
              )}
            </View>

            {selectedWorkout.notes && (
              <View style={styles.workoutNotes}>
                <Text style={styles.workoutNotesTitle}>Notes</Text>
                <Text style={styles.workoutNotesText}>{selectedWorkout.notes}</Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading workout history...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.screenTitle}>Workout History</Text>
      
      <View style={styles.viewModeSelector}>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === 'calendar' && styles.viewModeButtonActive,
          ]}
          onPress={() => setViewMode('calendar')}
        >
          <Text style={[
            styles.viewModeButtonText,
            viewMode === 'calendar' && styles.viewModeButtonTextActive,
          ]}>
            📅 Calendar
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === 'stats' && styles.viewModeButtonActive,
          ]}
          onPress={() => setViewMode('stats')}
        >
          <Text style={[
            styles.viewModeButtonText,
            viewMode === 'stats' && styles.viewModeButtonTextActive,
          ]}>
            📊 Statistics
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'calendar' ? (
        <>
          {renderCalendar()}
          {renderSelectedDateWorkouts()}
        </>
      ) : (
        <>
          {renderWorkoutStats()}
          {renderPersonalBests()}
        </>
      )}

      {renderWorkoutDetailsModal()}
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
  viewModeSelector: {
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
  viewModeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewModeButtonActive: {
    backgroundColor: '#2196F3',
  },
  viewModeButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  viewModeButtonTextActive: {
    color: '#fff',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navigationButton: {
    fontSize: 24,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  weekdays: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: (width - 60) / 7,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  calendarDayActive: {
    backgroundColor: '#f8f9fa',
  },
  calendarDayWithWorkout: {
    backgroundColor: '#e3f2fd',
  },
  calendarDaySelected: {
    backgroundColor: '#2196F3',
  },
  calendarDayText: {
    fontSize: 14,
    color: '#333',
  },
  calendarDayTextWithWorkout: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  calendarDayTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  workoutIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutIndicatorText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedDateContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedDateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  workoutCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  noWorkoutsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  workoutItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#666',
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  workoutType: {
    fontSize: 12,
    color: '#2196F3',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  workoutExercises: {
    fontSize: 12,
    color: '#666',
  },
  workoutCalories: {
    fontSize: 12,
    color: '#FF5722',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  chartContainer: {
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  pbestsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pbestsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  pbestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pbestItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  pbestIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  pbestValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  pbestLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
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
  workoutDetailHeader: {
    marginBottom: 20,
  },
  workoutDetailName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  workoutDetailDate: {
    fontSize: 14,
    color: '#666',
  },
  workoutDetailStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailStat: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  detailStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  detailStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutTimes: {
    marginBottom: 20,
  },
  workoutTimesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  workoutTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  workoutNotes: {
    marginBottom: 20,
  },
  workoutNotesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  workoutNotesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default WorkoutHistoryScreen;