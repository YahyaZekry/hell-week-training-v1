import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';

const AnalyticsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const analyticsData = {
    totalWorkouts: 47,
    averageWorkoutDuration: 45,
    caloriesBurned: 12450,
    personalRecords: 8,
    currentStreak: 3,
    longestStreak: 12,
  };

  const performanceMetrics = [
    { label: 'Strength', value: 78, trend: 'up' },
    { label: 'Endurance', value: 65, trend: 'up' },
    { label: 'Flexibility', value: 82, trend: 'stable' },
    { label: 'Speed', value: 71, trend: 'down' },
  ];

  const weeklyProgress = [
    { day: 'Mon', workouts: 1, duration: 45 },
    { day: 'Tue', workouts: 0, duration: 0 },
    { day: 'Wed', workouts: 1, duration: 60 },
    { day: 'Thu', workouts: 1, duration: 30 },
    { day: 'Fri', workouts: 0, duration: 0 },
    { day: 'Sat', workouts: 1, duration: 50 },
    { day: 'Sun', workouts: 0, duration: 0 },
  ];

  const MetricCard: React.FC<{ 
    title: string; 
    value: string | number; 
    subtitle?: string;
    icon?: keyof typeof Ionicons.glyphMap;
  }> = ({ title, value, subtitle, icon }) => (
    <View style={[styles.metricCard, { backgroundColor: colors.surface }]}>
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
          <Ionicons name={icon} size={24} color={colors.primary} />
        </View>
      )}
      <Text style={[styles.metricTitle, { color: colors.textSecondary }]}>{title}</Text>
      <Text style={[styles.metricValue, { color: colors.text }]}>{value}</Text>
      {subtitle && (
        <Text style={[styles.metricSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      )}
    </View>
  );

  const PerformanceBar: React.FC<{ 
    label: string; 
    value: number; 
    trend: 'up' | 'down' | 'stable' 
  }> = ({ label, value, trend }) => (
    <View style={styles.performanceItem}>
      <Text style={[styles.performanceLabel, { color: colors.text }]}>{label}</Text>
      <View style={styles.performanceBar}>
        <View 
          style={[
            styles.performanceFill, 
            {
              width: `${value}%`,
              backgroundColor: trend === 'up' ? colors.success : trend === 'down' ? colors.error : colors.primary
            }
          ]} 
        />
      </View>
      <Text style={[styles.performanceValue, { color: colors.text }]}>{value}%</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Analytics</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Track your performance and progress
          </Text>
        </View>

        {/* Overview Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
          <View style={styles.metricsGrid}>
            <MetricCard 
              title="Total Workouts" 
              value={analyticsData.totalWorkouts} 
              icon="fitness"
            />
            <MetricCard 
              title="Current Streak" 
              value={`${analyticsData.currentStreak} days`}
              icon="flame"
            />
            <MetricCard 
              title="Calories Burned" 
              value={analyticsData.caloriesBurned.toLocaleString()}
              icon="flash"
            />
            <MetricCard 
              title="Personal Records" 
              value={analyticsData.personalRecords}
              icon="trophy"
            />
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance Metrics</Text>
          <View style={[styles.performanceContainer, { backgroundColor: colors.surface }]}>
            {performanceMetrics.map((metric, index) => (
              <PerformanceBar
                key={index}
                label={metric.label}
                value={metric.value}
                trend={metric.trend as 'up' | 'down' | 'stable'}
              />
            ))}
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Activity</Text>
          <View style={[styles.weeklyContainer, { backgroundColor: colors.surface }]}>
            {weeklyProgress.map((day, index) => (
              <View key={index} style={styles.dayItem}>
                <Text style={[styles.dayLabel, { color: colors.textSecondary }]}>{day.day}</Text>
                <View style={[
                  styles.dayIndicator, 
                  { 
                    backgroundColor: day.workouts > 0 ? colors.primary : colors.textSecondary + '30',
                    borderColor: colors.textSecondary
                  }
                ]} />
                <Text style={[styles.dayDuration, { color: colors.textSecondary }]}>
                  {day.duration > 0 ? `${day.duration}m` : '-'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Export analytics data"
            accessibilityHint="Download your performance data"
          >
            <Ionicons name="download" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Export Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.actionButtonOutline, { backgroundColor: colors.surface, borderColor: colors.primary }]}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Share progress"
            accessibilityHint="Share your achievements with others"
          >
            <Ionicons name="share" size={20} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>Share Progress</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 11,
    fontWeight: '400',
  },
  performanceContainer: {
    padding: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  performanceLabel: {
    width: 80,
    fontSize: 14,
    fontWeight: '500',
  },
  performanceBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  performanceFill: {
    height: '100%',
    borderRadius: 4,
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  weeklyContainer: {
    padding: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayLabel: {
    width: 40,
    fontSize: 14,
    fontWeight: '500',
  },
  dayIndicator: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
    borderWidth: 1,
  },
  dayDuration: {
    fontSize: 12,
    fontWeight: '400',
    width: 40,
    textAlign: 'right',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  actionButtonOutline: {
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default AnalyticsScreen;