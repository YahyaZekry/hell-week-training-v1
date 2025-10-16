import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { appData } from '../data/data';

interface PreparationWeek {
  Week: number;
  Focus: string;
  Miles: number;
  Swim: number;
  Strength: number;
  Mental: number;
}

const PreparationScreen: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  useEffect(() => {
    loadSelectedWeek();
  }, []);

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

  const saveSelectedWeek = async (week: number): Promise<void> => {
    try {
      await AsyncStorage.setItem('selectedWeek', week.toString());
    } catch (e) {
      console.error("Failed to save selected week.");
    }
  };

  const handleSelectWeek = (week: number): void => {
    setSelectedWeek(week);
    saveSelectedWeek(week);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>12-Week Preparation Program</Text>
      </View>
      <View style={styles.gridContainer}>
        {appData.preparation_weeks.map((week: PreparationWeek, index: number) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => handleSelectWeek(week.Week)} 
            style={[
              styles.weekCard, 
              selectedWeek === week.Week && styles.selectedWeekCard
            ]}
          >
            <Text style={styles.weekTitle}>{`Week ${week.Week}`}</Text>
            <Text style={styles.weekFocus}>{week.Focus}</Text>
            <View style={styles.metricsContainer}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Running Miles</Text>
                <Text style={styles.metricValue}>{week.Miles}</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Swim Hours</Text>
                <Text style={styles.metricValue}>{week.Swim}</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Strength Sessions</Text>
                <Text style={styles.metricValue}>{week.Strength}</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Mental Training</Text>
                <Text style={styles.metricValue}>{`${week.Mental} hrs`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  gridContainer: {
    padding: 16,
  },
  weekCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(76, 88, 102, 0.2)',
  },
  selectedWeekCard: {
    borderColor: '#ffd700',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  weekTitle: {
    color: '#ffd700',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ffd700',
    paddingBottom: 8,
  },
  weekFocus: {
    color: '#2c5aa0',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    backgroundColor: 'rgba(44, 90, 160, 0.1)',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  metricLabel: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    color: '#ffd700',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PreparationScreen;