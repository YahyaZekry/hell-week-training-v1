import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { appData } from '../data/data';

interface TodayPlan {
  Day: string;
  Morning: string;
  Afternoon: string;
  Evening: string;
}

const TodayScreen: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [todayPlan, setTodayPlan] = useState<TodayPlan | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadSelectedWeek();
    }
  }, [isFocused]);

  useEffect(() => {
    if (selectedWeek) {
      const dayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday, ...
      const weekData = (appData.preparation_plan_detailed as any)[selectedWeek.toString()];
      if (weekData) {
        const dayData = weekData[dayOfWeek - 1]; // Adjust for 0-based index
        setTodayPlan(dayData);
      }
    }
  }, [selectedWeek]);

  const loadSelectedWeek = async (): Promise<void> => {
    try {
      const value = await AsyncStorage.getItem('selectedWeek');
      if (value !== null) {
        setSelectedWeek(parseInt(value, 10));
      }
    } catch (e) {
      console.error("Failed to load selected week.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Focus</Text>
      </View>

      <View style={styles.quoteBanner}>
        <Text style={styles.quoteText}>{appData.seal_quotes[new Date().getDay() % appData.seal_quotes.length]}</Text>
      </View>

      <View style={styles.contentContainer}>
        {todayPlan ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Training (Week {selectedWeek})</Text>
            <Text style={styles.dayTitle}>{todayPlan.Day}</Text>
            <View style={styles.trainingItem}>
              <Text style={styles.timeOfDay}>Morning</Text>
              <Text style={styles.trainingActivity}>{todayPlan.Morning}</Text>
            </View>
            <View style={styles.trainingItem}>
              <Text style={styles.timeOfDay}>Afternoon</Text>
              <Text style={styles.trainingActivity}>{todayPlan.Afternoon}</Text>
            </View>
            <View style={styles.trainingItem}>
              <Text style={styles.timeOfDay}>Evening</Text>
              <Text style={styles.trainingActivity}>{todayPlan.Evening}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>No Training Plan for Today</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    backgroundColor: '#001f3f',
    padding: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
  },
  quoteBanner: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffd700',
    marginHorizontal: 16,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#e0e0e0',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(76, 88, 102, 0.2)',
  },
  cardTitle: {
    color: '#ffd700',
    fontSize: 22,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
    paddingBottom: 8,
    marginBottom: 20,
  },
  dayTitle: {
    color: '#e0e0e0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  trainingItem: {
    marginBottom: 12,
  },
  timeOfDay: {
    color: '#ffd700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  trainingActivity: {
    color: '#a0a0a0',
    fontSize: 14,
  },
});

export default TodayScreen;