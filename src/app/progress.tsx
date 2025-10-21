import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../providers';

const ProgressScreen: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();

  // Mock data for progress tracking
  const progressData = {
    weeklyGoal: 5,
    weeklyCompleted: 3,
    monthlyGoal: 20,
    monthlyCompleted: 12,
    totalWorkouts: 47,
    streak: 3,
  };

  const recentAchievements = [
    { id: 1, title: 'First Week Complete', date: '2024-01-07', icon: 'trophy' },
    { id: 2, title: '10 Workouts Milestone', date: '2024-01-14', icon: 'star' },
    { id: 3, title: 'Perfect Week', date: '2024-01-21', icon: 'flame' },
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: false },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: false },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: false },
  ];

  const ProgressCard: React.FC<{
    title: string;
    value: string;
    subtitle?: string;
  }> = ({ title, value, subtitle }) => (
    <View
      style={[styles.progressCard, { backgroundColor: theme.colors.surface }]}
    >
      <Text
        style={[styles.progressTitle, { color: theme.colors.text.primary }]}
      >
        {title}
      </Text>
      <Text
        style={[styles.progressValue, { color: theme.colors.primary[500] }]}
      >
        {value}
      </Text>
      {subtitle && (
        <Text
          style={[
            styles.progressSubtitle,
            { color: theme.colors.text.secondary },
          ]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );

  const AchievementItem: React.FC<{
    title: string;
    date: string;
    icon: keyof typeof Ionicons.glyphMap;
  }> = ({ title, date, icon }) => (
    <View
      style={[
        styles.achievementItem,
        { backgroundColor: theme.colors.surface },
      ]}
    >
      <View
        style={[
          styles.achievementIcon,
          { backgroundColor: theme.colors.primary[100] },
        ]}
      >
        <Ionicons name={icon} size={24} color={theme.colors.primary[500]} />
      </View>
      <View style={styles.achievementContent}>
        <Text
          style={[
            styles.achievementTitle,
            { color: theme.colors.text.primary },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.achievementDate,
            { color: theme.colors.text.secondary },
          ]}
        >
          {date}
        </Text>
      </View>
    </View>
  );

  const DayIndicator: React.FC<{ day: string; completed: boolean }> = ({
    day,
    completed,
  }) => (
    <View style={styles.dayContainer}>
      <Text style={[styles.dayText, { color: theme.colors.text.primary }]}>
        {day}
      </Text>
      <View
        style={[
          styles.dayIndicator,
          {
            backgroundColor: completed
              ? theme.colors.primary[500]
              : theme.colors.text.secondary + '30',
            borderColor: theme.colors.text.secondary,
          },
        ]}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: 'transparent' }]}
      edges={['top']}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Your Progress
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.text.secondary }]}
          >
            Track your fitness journey
          </Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <ProgressCard
            title="Weekly Progress"
            value={`${progressData.weeklyCompleted}/${progressData.weeklyGoal}`}
            subtitle="workouts completed"
          />
          <ProgressCard
            title="Current Streak"
            value={`${progressData.streak} days`}
            subtitle="keep it up!"
          />
        </View>

        <View style={styles.statsContainer}>
          <ProgressCard
            title="Monthly Progress"
            value={`${progressData.monthlyCompleted}/${progressData.monthlyGoal}`}
            subtitle="workouts completed"
          />
          <ProgressCard
            title="Total Workouts"
            value={`${progressData.totalWorkouts}`}
            subtitle="all time"
          />
        </View>

        {/* Weekly Progress */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            This Week
          </Text>
          <View
            style={[
              styles.weeklyProgress,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            {weeklyProgress.map((day, index) => (
              <DayIndicator
                key={index}
                day={day.day}
                completed={day.completed}
              />
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Recent Achievements
          </Text>
          {recentAchievements.map(achievement => (
            <AchievementItem
              key={achievement.id}
              title={achievement.title}
              date={achievement.date}
              icon={achievement.icon as keyof typeof Ionicons.glyphMap}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Quick Actions
          </Text>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.primary[500] },
            ]}
            onPress={() => router.push('/more/workout-history')}
            accessibilityLabel="View detailed workout history"
            accessibilityHint="Navigate to workout history screen"
          >
            <Ionicons name="bar-chart" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>View Detailed History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.actionButtonOutline,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.primary[500],
              },
            ]}
            onPress={() => router.push('/more/analytics')}
            accessibilityLabel="View performance analytics"
            accessibilityHint="Navigate to analytics screen"
          >
            <Ionicons
              name="stats-chart"
              size={20}
              color={theme.colors.primary[500]}
            />
            <Text
              style={[
                styles.actionButtonText,
                { color: theme.colors.primary[500] },
              ]}
            >
              Performance Analytics
            </Text>
          </TouchableOpacity>

          <View style={styles.quickLinksGrid}>
            <TouchableOpacity
              style={[
                styles.quickLinkCard,
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={() => router.push('/more/analytics')}
            >
              <Ionicons
                name="analytics"
                size={24}
                color={theme.colors.primary[500]}
              />
              <Text
                style={[
                  styles.quickLinkText,
                  { color: theme.colors.text.primary },
                ]}
              >
                Analytics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickLinkCard,
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={() => router.push('/more/workout-history')}
            >
              <Ionicons
                name="time"
                size={24}
                color={theme.colors.primary[500]}
              />
              <Text
                style={[
                  styles.quickLinkText,
                  { color: theme.colors.text.primary },
                ]}
              >
                History
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickLinkCard,
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={() => router.push('/more/mental')}
            >
              <Ionicons
                name="heart"
                size={24}
                color={theme.colors.primary[500]}
              />
              <Text
                style={[
                  styles.quickLinkText,
                  { color: theme.colors.text.primary },
                ]}
              >
                Mental Fitness
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickLinkCard,
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={() => router.push('/more/recovery')}
            >
              <Ionicons
                name="walk"
                size={24}
                color={theme.colors.primary[500]}
              />
              <Text
                style={[
                  styles.quickLinkText,
                  { color: theme.colors.text.primary },
                ]}
              >
                Recovery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickLinkCard,
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={() => router.push('/more/exercise-form')}
            >
              <Ionicons
                name="play-circle"
                size={24}
                color={theme.colors.primary[500]}
              />
              <Text
                style={[
                  styles.quickLinkText,
                  { color: theme.colors.text.primary },
                ]}
              >
                Exercise Form
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickLinkCard,
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={() => router.push('/more/settings')}
            >
              <Ionicons
                name="settings"
                size={24}
                color={theme.colors.primary[500]}
              />
              <Text
                style={[
                  styles.quickLinkText,
                  { color: theme.colors.text.primary },
                ]}
              >
                Progress Settings
              </Text>
            </TouchableOpacity>
          </View>
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
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  progressCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 12,
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
  weeklyProgress: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 16,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayContainer: {
    alignItems: 'center',
    gap: 8,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dayIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 14,
    fontWeight: '400',
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
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quickLinkCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickLinkText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ProgressScreen;
