import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

import { appData } from '../data/data';
import nutritionService from '../services/nutritionService';

const { width } = Dimensions.get('window');

interface Props {
  route: any;
  navigation: NavigationProp<any>;
}

interface NewMeal {
  type: string;
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  hydration: string;
}

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  hydration: number;
  meals: number;
}

const NutritionScreen: React.FC<Props> = ({ route, navigation }) => {
  const { user } = route.params || {};
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedMetric, setSelectedMetric] = useState<string>('Calories');
  const [showMealModal, setShowMealModal] = useState<boolean>(false);
  const [showGoalsModal, setShowGoalsModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [mealLogs, setMealLogs] = useState<any[]>([]);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);
  const [dailyTotals, setDailyTotals] = useState<any>(null);
  const [nutritionProgress, setNutritionProgress] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newMeal, setNewMeal] = useState<NewMeal>({
    type: 'Breakfast',
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    hydration: '',
  });

  useEffect(() => {
    initializeNutrition();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadDailyData();
    }
  }, [selectedDate]);

  const initializeNutrition = async (): Promise<void> => {
    try {
      await nutritionService.initialize();
      loadNutritionGoals();
      loadDailyData();
      setLoading(false);
    } catch (error) {
      console.error('Failed to initialize nutrition:', error);
      setLoading(false);
    }
  };

  const loadNutritionGoals = (): void => {
    const goals = nutritionService.getNutritionGoals();
    setNutritionGoals(goals);
  };

  const loadDailyData = (): void => {
    const meals = nutritionService.getMealsForDate(selectedDate);
    const totals = nutritionService.calculateDailyTotals(selectedDate);
    const progress = nutritionService.getNutritionProgress(selectedDate);
    
    setMealLogs(meals);
    setDailyTotals(totals);
    setNutritionProgress(progress);
  };

  const handleLogMeal = async (): Promise<void> => {
    if (!newMeal.name || !newMeal.calories) {
      Alert.alert('Error', 'Please enter meal name and calories');
      return;
    }

    try {
      const mealData = {
        type: newMeal.type,
        name: newMeal.name,
        calories: parseInt(newMeal.calories) || 0,
        protein: parseInt(newMeal.protein) || 0,
        carbs: parseInt(newMeal.carbs) || 0,
        fat: parseInt(newMeal.fat) || 0,
        hydration: parseInt(newMeal.hydration) || 0,
      };

      const result = await nutritionService.logMeal(mealData);
      if (result.success) {
        setShowMealModal(false);
        setNewMeal({
          type: 'Breakfast',
          name: '',
          calories: '',
          protein: '',
          carbs: '',
          fat: '',
          hydration: '',
        });
        loadDailyData();
        Alert.alert('Success', 'Meal logged successfully');
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to log meal');
    }
  };

  const handleUpdateGoals = async (): Promise<void> => {
    try {
      const result = await nutritionService.updateNutritionGoals(nutritionGoals || {});
      if (result.success) {
        setShowGoalsModal(false);
        loadDailyData();
        Alert.alert('Success', 'Nutrition goals updated');
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update goals');
    }
  };

  const handleDeleteMeal = async (mealId: string): Promise<void> => {
    Alert.alert(
      'Delete Meal',
      'Are you sure you want to delete this meal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const result = await nutritionService.deleteMeal(mealId);
            if (result.success) {
              loadDailyData();
              Alert.alert('Success', 'Meal deleted');
            } else {
              Alert.alert('Error', result.error);
            }
          },
        },
      ]
    );
  };

  const handleLogWater = async (amount: number): Promise<void> => {
    try {
      const result = await nutritionService.logWaterIntake(amount);
      if (result.success) {
        loadDailyData();
        Alert.alert('Success', `Logged ${amount}oz of water`);
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to log water intake');
    }
  };

  const getNutritionData = () => {
    const data = (appData as any).hell_week_nutrition_plan?.filter(
      (plan: any) => plan.Week === selectedWeek
    ) || [];
    
    return {
      labels: data.map((d: any) => `Day ${d.Day}`),
      datasets: [
        {
          data: data.map((d: any) => d[selectedMetric] || 0),
          color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: [selectedMetric],
    };
  };

  const getProgressData = () => {
    if (!nutritionProgress) return null;
    
    return {
      labels: ['Calories', 'Protein', 'Carbs', 'Fat', 'Hydration', 'Meals'],
      datasets: [
        {
          data: [
            nutritionProgress.calories,
            nutritionProgress.protein,
            nutritionProgress.carbs,
            nutritionProgress.fat,
            nutritionProgress.hydration,
            nutritionProgress.meals,
          ],
          color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
        },
      ],
    };
  };

  const selectedWeekData = (appData as any).hell_week_nutrition_plan?.find(
    (plan: any) => plan.Week === selectedWeek
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffd700" />
        <Text style={styles.loadingText}>Loading nutrition data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NUTRITION</Text>
        <Text style={styles.headerSubtitle}>Fuel Your Hell Week Performance</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => setShowGoalsModal(true)}
        >
          <Ionicons name="settings" size={24} color="#ffd700" />
        </TouchableOpacity>
      </View>

      {/* Daily Progress Section */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        {nutritionProgress && (
          <View style={styles.progressGrid}>
            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>{nutritionProgress.calories}%</Text>
              <Text style={styles.progressLabel}>Calories</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>{nutritionProgress.protein}%</Text>
              <Text style={styles.progressLabel}>Protein</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>{nutritionProgress.hydration}%</Text>
              <Text style={styles.progressLabel}>Hydration</Text>
            </View>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setShowMealModal(true)}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Log Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLogWater(8)}
        >
          <Ionicons name="water" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>+8oz Water</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLogWater(16)}
        >
          <Ionicons name="water" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>+16oz Water</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Meals */}
      <View style={styles.mealsSection}>
        <View style={styles.mealsHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MealHistory')}>
            <Ionicons name="calendar" size={24} color="#ffd700" />
          </TouchableOpacity>
        </View>
        
        {mealLogs.length === 0 ? (
          <Text style={styles.noMealsText}>No meals logged today</Text>
        ) : (
          mealLogs.map((meal) => (
            <View key={meal.id} style={styles.mealCard}>
              <View style={styles.mealCardHeader}>
                <Text style={styles.mealType}>{meal.type}</Text>
                <TouchableOpacity onPress={() => handleDeleteMeal(meal.id)}>
                  <Ionicons name="trash" size={20} color="#ff4444" />
                </TouchableOpacity>
              </View>
              <Text style={styles.mealName}>{meal.name}</Text>
              <View style={styles.mealStats}>
                <Text style={styles.mealStat}>{meal.calories} cal</Text>
                <Text style={styles.mealStat}>P: {meal.protein}g</Text>
                <Text style={styles.mealStat}>C: {meal.carbs}g</Text>
                <Text style={styles.mealStat}>F: {meal.fat}g</Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Weekly Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>
          {selectedMetric} - Week {selectedWeek}
        </Text>
        <LineChart
          data={getNutritionData()}
          width={width - 40}
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

      <View style={styles.metricPicker}>
        <TouchableOpacity
          style={[
            styles.metricButton,
            selectedMetric === 'Calories' && styles.selectedMetricButton,
          ]}
          onPress={() => setSelectedMetric('Calories')}
        >
          <Text style={styles.metricButtonText}>Calories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.metricButton,
            selectedMetric === 'Protein' && styles.selectedMetricButton,
          ]}
          onPress={() => setSelectedMetric('Protein')}
        >
          <Text style={styles.metricButtonText}>Protein</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.metricButton,
            selectedMetric === 'Carbs' && styles.selectedMetricButton,
          ]}
          onPress={() => setSelectedMetric('Carbs')}
        >
          <Text style={styles.metricButtonText}>Carbs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.metricButton,
            selectedMetric === 'Fat' && styles.selectedMetricButton,
          ]}
          onPress={() => setSelectedMetric('Fat')}
        >
          <Text style={styles.metricButtonText}>Fat</Text>
        </TouchableOpacity>
      </View>

      {/* Meal Logging Modal */}
      <Modal
        visible={showMealModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowMealModal(false)}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Log Meal</Text>
            <TouchableOpacity onPress={handleLogMeal}>
              <Ionicons name="checkmark" size={24} color="#ffd700" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Meal Type</Text>
              <View style={styles.mealTypeSelector}>
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.mealTypeButton,
                      newMeal.type === type && styles.selectedMealTypeButton,
                    ]}
                    onPress={() => setNewMeal({ ...newMeal, type })}
                  >
                    <Text
                      style={[
                        styles.mealTypeButtonText,
                        newMeal.type === type && styles.selectedMealTypeButtonText,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Meal Name</Text>
              <TextInput
                style={styles.textInput}
                value={newMeal.name}
                onChangeText={(text) => setNewMeal({ ...newMeal, name: text })}
                placeholder="Enter meal name"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Calories</Text>
                <TextInput
                  style={styles.textInput}
                  value={newMeal.calories}
                  onChangeText={(text) => setNewMeal({ ...newMeal, calories: text })}
                  placeholder="0"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.inputLabel}>Protein (g)</Text>
                <TextInput
                  style={styles.textInput}
                  value={newMeal.protein}
                  onChangeText={(text) => setNewMeal({ ...newMeal, protein: text })}
                  placeholder="0"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Carbs (g)</Text>
                <TextInput
                  style={styles.textInput}
                  value={newMeal.carbs}
                  onChangeText={(text) => setNewMeal({ ...newMeal, carbs: text })}
                  placeholder="0"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.inputLabel}>Fat (g)</Text>
                <TextInput
                  style={styles.textInput}
                  value={newMeal.fat}
                  onChangeText={(text) => setNewMeal({ ...newMeal, fat: text })}
                  placeholder="0"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Hydration (oz)</Text>
              <TextInput
                style={styles.textInput}
                value={newMeal.hydration}
                onChangeText={(text) => setNewMeal({ ...newMeal, hydration: text })}
                placeholder="0"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>
          </ScrollView>
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
            <TouchableOpacity onPress={() => setShowGoalsModal(false)}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nutrition Goals</Text>
            <TouchableOpacity onPress={handleUpdateGoals}>
              <Ionicons name="checkmark" size={24} color="#ffd700" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {nutritionGoals && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Daily Calories</Text>
                  <TextInput
                    style={styles.textInput}
                    value={nutritionGoals.calories.toString()}
                    onChangeText={(text) => setNutritionGoals({ ...nutritionGoals, calories: parseInt(text) || 0 })}
                    placeholder="0"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Protein (g)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={nutritionGoals.protein.toString()}
                      onChangeText={(text) => setNutritionGoals({ ...nutritionGoals, protein: parseInt(text) || 0 })}
                      placeholder="0"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                    <Text style={styles.inputLabel}>Carbs (g)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={nutritionGoals.carbs.toString()}
                      onChangeText={(text) => setNutritionGoals({ ...nutritionGoals, carbs: parseInt(text) || 0 })}
                      placeholder="0"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Fat (g)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={nutritionGoals.fat.toString()}
                      onChangeText={(text) => setNutritionGoals({ ...nutritionGoals, fat: parseInt(text) || 0 })}
                      placeholder="0"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                    <Text style={styles.inputLabel}>Hydration (oz)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={nutritionGoals.hydration.toString()}
                      onChangeText={(text) => setNutritionGoals({ ...nutritionGoals, hydration: parseInt(text) || 0 })}
                      placeholder="0"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Meals per Day</Text>
                  <TextInput
                    style={styles.textInput}
                    value={nutritionGoals.meals.toString()}
                    onChangeText={(text) => setNutritionGoals({ ...nutritionGoals, meals: parseInt(text) || 0 })}
                    placeholder="0"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  loadingText: {
    color: '#ffd700',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#001f3f',
    padding: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#c0c0c0',
    textAlign: 'center',
    marginTop: 4,
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  progressSection: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 88, 102, 0.2)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 16,
  },
  progressGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  progressLabel: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#2c5aa0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  mealsSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  mealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  noMealsText: {
    color: '#a0a0a0',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  mealCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 88, 102, 0.2)',
  },
  mealCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  mealName: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  mealStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealStat: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  chartContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 16,
    textAlign: 'center',
  },
  metricPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  metricButton: {
    backgroundColor: '#2c5aa0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  selectedMetricButton: {
    backgroundColor: '#ffd700',
  },
  metricButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#001f3f',
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    color: '#fff',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(76, 88, 102, 0.2)',
  },
  inputRow: {
    flexDirection: 'row',
  },
  mealTypeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mealTypeButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(76, 88, 102, 0.2)',
    minWidth: '48%',
  },
  selectedMealTypeButton: {
    backgroundColor: '#2c5aa0',
    borderColor: '#ffd700',
  },
  mealTypeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedMealTypeButtonText: {
    color: '#ffd700',
  },
});

export default NutritionScreen;