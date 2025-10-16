import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import BreathingExerciseModal from '../components/BreathingExerciseModal';
import { appData } from '../data/data';

interface MentalToughnessProgram {
  Week: string;
  Focus: string;
  Techniques: string;
  Duration: string;
}

const MentalToughnessScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mental Toughness</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.dashboardCard}>
          <Text style={styles.cardTitle}>Mental Training Program</Text>
          {(appData.mental_toughness_program as any[]).map((item: MentalToughnessProgram, index: number) => (
            <View key={index} style={styles.programItem}>
              <Text style={styles.programWeek}>{`Week ${item.Week}`}</Text>
              <Text style={styles.programFocus}>{item.Focus}</Text>
              <Text style={styles.programTechniques}>{item.Techniques}</Text>
            </View>
          ))}
        </View>

        <View style={styles.dashboardCard}>
          <Text style={styles.cardTitle}>Breathing Exercise</Text>
          <Text style={styles.breathingDescription}>Practice this breathing exercise to calm your mind and control your heart rate under stress.</Text>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Start Breathing Exercise</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BreathingExerciseModal visible={modalVisible} onClose={() => setModalVisible(false)} />
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
  contentContainer: {
    padding: 16,
  },
  dashboardCard: {
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
  programItem: {
    marginBottom: 16,
  },
  programWeek: {
    color: '#ffd700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  programFocus: {
    color: '#e0e0e0',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  programTechniques: {
    color: '#a0a0a0',
  },
  breathingDescription: {
    color: '#a0a0a0',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2c5aa0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MentalToughnessScreen;