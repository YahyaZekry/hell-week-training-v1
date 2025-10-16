import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { appData } from '../data/data';

interface ScheduleItem {
  Day: string;
  Time: string;
  Activity: string;
  Duration: string;
  Focus: string;
  Intensity: string;
}

const ScheduleScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hell Week Schedule</Text>
      </View>
      <View style={styles.timelineContainer}>
        {appData.hell_week_schedule.map((item: ScheduleItem, index: number) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>{`${item.Day} ${item.Time}`}</Text>
            <View style={styles.activityContainer}>
              <Text style={styles.activityTitle}>{item.Activity}</Text>
              <Text style={styles.activityFocus}>{item.Focus}</Text>
            </View>
            <View 
              style={[
                styles.intensityBadge, 
                styles[`intensity${item.Intensity.toLowerCase()}` as keyof typeof styles] as any
              ]}
            >
              <Text style={styles.intensityText}>{item.Intensity}</Text>
            </View>
          </View>
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
  timelineContainer: {
    padding: 16,
  },
  scheduleItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2c5aa0',
  },
  scheduleTime: {
    color: '#ffd700',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  activityContainer: {
    marginBottom: 8,
  },
  activityTitle: {
    color: '#e0e0e0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityFocus: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  intensityBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  intensityText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  intensitymaximum: {
    backgroundColor: '#ff4757',
  },
  intensityhigh: {
    backgroundColor: '#ff6b35',
  },
  intensityrest: {
    backgroundColor: '#00d4aa',
  },
  intensitylow: {
    backgroundColor: '#4c5866',
  },
  intensitycomplete: {
    backgroundColor: '#ffd700',
  },
});

export default ScheduleScreen;