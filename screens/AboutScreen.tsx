import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About Hell Week</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.dashboardCard}>
          <Text style={styles.cardTitle}>Hell Week Overview</Text>
          <View style={styles.warningNotice}>
            <Text style={styles.warningText}>EXTREME TRAINING WARNING</Text>
            <Text style={styles.warningSubText}>Hell Week is an extreme military training program designed for elite Navy SEAL candidates. This training involves severe physical and mental stress and should only be attempted by individuals with proper medical clearance and under professional supervision.</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5.5</Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>132</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Hours Sleep</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8000</Text>
              <Text style={styles.statLabel}>Daily Calories</Text>
            </View>
          </View>
        </View>
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
  warningNotice: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderWidth: 1,
    borderColor: '#ff6b35',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  warningText: {
    color: '#ff6b35',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  warningSubText: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(44, 90, 160, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2c5aa0',
    width: '48%',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#a0a0a0',
    textTransform: 'uppercase',
  },
});

export default AboutScreen;