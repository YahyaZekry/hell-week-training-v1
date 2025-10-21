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

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const todayStats = {
    completedWorkouts: 1,
    plannedWorkouts: 2,
    caloriesBurned: 320,
    waterIntake: 6,
    sleepHours: 7.5,
  };

  const quickActions = [
    {
      title: 'Start Workout',
      icon: '🏋️',
      route: '/training',
      color: theme.colors.primary[500],
    },
    {
      title: 'Log Nutrition',
      icon: '🥗',
      route: '/nutrition',
      color: theme.colors.success[500],
    },
    {
      title: 'View Progress',
      icon: '📊',
      route: '/progress',
      color: theme.colors.info[500],
    },
    {
      title: 'Recovery',
      icon: '💤',
      route: '/more/recovery',
      color: theme.colors.secondary[500],
    },
  ];

  const secondaryQuickLinks = [
    {
      title: 'Workout History',
      icon: '📈',
      route: '/more/workout-history',
      color: theme.colors.primary[500],
    },
    {
      title: 'Analytics',
      icon: '📊',
      route: '/more/analytics',
      color: theme.colors.info[500],
    },
    {
      title: 'Exercise Form',
      icon: '🎥',
      route: '/more/exercise-form',
      color: theme.colors.success[500],
    },
    {
      title: 'Mental Fitness',
      icon: '🧠',
      route: '/more/mental',
      color: theme.colors.secondary[500],
    },
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    icon: string;
  }> = ({ title, value, subtitle, icon }) => (
    <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statTitle, { color: theme.colors.text.secondary }]}>
        {title}
      </Text>
      <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
        {value}
      </Text>
      {subtitle && (
        <Text
          style={[styles.statSubtitle, { color: theme.colors.text.secondary }]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );

  const QuickActionCard: React.FC<{
    title: string;
    icon: string;
    route: string;
    color: string;
  }> = ({ title, icon, route, color }) => (
    <TouchableOpacity
      style={[
        styles.quickActionCard,
        {
          backgroundColor: color + '20',
          borderColor: color,
        },
      ]}
      onPress={() => router.push(route as any)}
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={`Navigate to ${title}`}
    >
      <Text style={[styles.quickActionIcon, { color: color }]}>{icon}</Text>
      <Text
        style={[styles.quickActionTitle, { color: theme.colors.text.primary }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const SecondaryQuickLinkCard: React.FC<{
    title: string;
    icon: string;
    route: string;
    color: string;
  }> = ({ title, icon, route, color }) => (
    <TouchableOpacity
      style={[
        styles.secondaryQuickLinkCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border.light,
        },
      ]}
      onPress={() => router.push(route as any)}
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={`Navigate to ${title}`}
    >
      <Text style={[styles.secondaryQuickLinkIcon, { color: color }]}>
        {icon}
      </Text>
      <Text
        style={[
          styles.secondaryQuickLinkText,
          { color: theme.colors.text.primary },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
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
            Hell Week Training
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.text.secondary }]}
          >
            Push Your Limits
          </Text>
        </View>

        {/* Today&apos;s Overview */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Today&apos;s Overview
          </Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Workouts"
              value={`${todayStats.completedWorkouts}/${todayStats.plannedWorkouts}`}
              icon="🏋️"
            />
            <StatCard
              title="Calories"
              value={todayStats.caloriesBurned}
              subtitle="burned"
              icon="🔥"
            />
            <StatCard
              title="Water"
              value={`${todayStats.waterIntake} glasses`}
              icon="💧"
            />
            <StatCard
              title="Sleep"
              value={`${todayStats.sleepHours} hrs`}
              icon="😴"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                icon={action.icon}
                route={action.route}
                color={action.color}
              />
            ))}
          </View>
        </View>

        {/* Motivational Quote */}
        <View style={styles.section}>
          <View
            style={[
              styles.quoteCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.primary[500],
              },
            ]}
          >
            <Text
              style={[styles.quoteText, { color: theme.colors.text.primary }]}
            >
              &quot;The only bad workout is the one that didn&apos;t
              happen.&quot;
            </Text>
            <Text
              style={[
                styles.quoteAuthor,
                { color: theme.colors.text.secondary },
              ]}
            >
              - Unknown
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Recent Activity
          </Text>
          <View
            style={[
              styles.activityCard,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text
              style={[
                styles.activityTitle,
                { color: theme.colors.text.primary },
              ]}
            >
              Great job on this morning&apos;s workout! 💪
            </Text>
            <Text
              style={[
                styles.activityDescription,
                { color: theme.colors.text.secondary },
              ]}
            >
              Upper body strength training completed in 45 minutes
            </Text>
            <Text
              style={[
                styles.activityTime,
                { color: theme.colors.text.secondary },
              ]}
            >
              2 hours ago
            </Text>
          </View>
        </View>

        {/* Secondary Quick Links */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Explore More
          </Text>
          <View style={styles.secondaryQuickLinksGrid}>
            {secondaryQuickLinks.map((link, index) => (
              <SecondaryQuickLinkCard
                key={index}
                title={link.title}
                icon={link.icon}
                route={link.route}
                color={link.color}
              />
            ))}
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
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
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
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 10,
    fontWeight: '400',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryQuickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryQuickLinkCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowColor: 'transparent',
    elevation: 2,
  },
  secondaryQuickLinkIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  secondaryQuickLinkText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  quoteCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  activityCard: {
    padding: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  activityTime: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default HomeScreen;
