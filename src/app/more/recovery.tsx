import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';

interface RecoveryTechnique {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'stretching' | 'breathing' | 'massage' | 'rest';
  difficulty: 'easy' | 'moderate' | 'intense';
}

const RecoveryScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const recoveryTechniques: RecoveryTechnique[] = [
    {
      id: '1',
      title: 'Full Body Stretch',
      description: 'Gentle stretching to release muscle tension',
      duration: '10 min',
      type: 'stretching',
      difficulty: 'easy',
    },
    {
      id: '2',
      title: 'Deep Breathing Recovery',
      description: 'Controlled breathing to reduce stress and muscle soreness',
      duration: '5 min',
      type: 'breathing',
      difficulty: 'easy',
    },
    {
      id: '3',
      title: 'Foam Rolling Routine',
      description: 'Self-massage technique for muscle recovery',
      duration: '15 min',
      type: 'massage',
      difficulty: 'moderate',
    },
    {
      id: '4',
      title: 'Active Recovery',
      description: 'Light movement to promote blood flow',
      duration: '20 min',
      type: 'rest',
      difficulty: 'moderate',
    },
    {
      id: '5',
      title: 'Progressive Muscle Relaxation',
      description: 'Systematic tension and release of muscle groups',
      duration: '12 min',
      type: 'rest',
      difficulty: 'easy',
    },
    {
      id: '6',
      title: 'Cold Therapy Guide',
      description: 'Ice bath and cold shower techniques',
      duration: '8 min',
      type: 'rest',
      difficulty: 'intense',
    },
  ];

  const recoveryStats = {
    recoveryScore: 85,
    lastRecoverySession: '2 days ago',
    totalRecoveryTime: 120,
    recommendedRestDays: 2,
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stretching': return colors.primary;
      case 'breathing': return colors.success;
      case 'massage': return colors.accent;
      case 'rest': return colors.secondary;
      default: return colors.textSecondary;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return colors.success;
      case 'moderate': return colors.accent;
      case 'intense': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const RecoveryTechniqueCard: React.FC<{ technique: RecoveryTechnique }> = ({ technique }) => (
    <TouchableOpacity
      style={[
        styles.techniqueCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }
      ]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Start ${technique.title}`}
      accessibilityHint={`${technique.duration} recovery session`}
    >
      <View style={styles.techniqueHeader}>
        <View style={[
          styles.typeIndicator,
          { backgroundColor: getTypeColor(technique.type) }
        ]} />
        <View style={styles.techniqueInfo}>
          <Text style={[styles.techniqueTitle, { color: colors.text }]}>
            {technique.title}
          </Text>
          <Text style={[styles.techniqueDescription, { color: colors.textSecondary }]}>
            {technique.description}
          </Text>
        </View>
        <View style={[
          styles.difficultyBadge,
          { backgroundColor: getDifficultyColor(technique.difficulty) + '20' }
        ]}>
          <Text style={[
            styles.difficultyText,
            { color: getDifficultyColor(technique.difficulty) }
          ]}>
            {technique.difficulty.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <View style={styles.techniqueFooter}>
        <View style={styles.techniqueMeta}>
          <Text style={[styles.techniqueDuration, { color: colors.textSecondary }]}>
            ⏱ {technique.duration}
          </Text>
          <Text style={[styles.techniqueType, { color: getTypeColor(technique.type) }]}>
            {technique.type.charAt(0).toUpperCase() + technique.type.slice(1)}
          </Text>
        </View>
        <Text style={[styles.startButton, { color: colors.primary }]}>
          Start →
        </Text>
      </View>
    </TouchableOpacity>
  );

  const StatCard: React.FC<{ 
    title: string; 
    value: string | number; 
    subtitle?: string;
    color?: string;
  }> = ({ title, value, subtitle, color }) => (
    <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
      <Text style={[styles.statTitle, { color: colors.textSecondary }]}>{title}</Text>
      <Text style={[styles.statValue, { color: color || colors.text }]}>{value}</Text>
      {subtitle && (
        <Text style={[styles.statSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Recovery</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Optimize your recovery and prevent injury
          </Text>
        </View>

        {/* Recovery Score */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Recovery Status</Text>
          <View style={styles.recoveryScoreContainer}>
            <View style={[
              styles.scoreCircle,
              { backgroundColor: colors.surface, borderColor: colors.primary }
            ]}>
              <Text style={[styles.scoreText, { color: colors.primary }]}>
                {recoveryStats.recoveryScore}
              </Text>
              <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>
                Recovery Score
              </Text>
            </View>
            <View style={styles.scoreDetails}>
              <Text style={[styles.scoreDetail, { color: colors.text }]}>
                Last session: {recoveryStats.lastRecoverySession}
              </Text>
              <Text style={[styles.scoreDetail, { color: colors.text }]}>
                Total time: {recoveryStats.totalRecoveryTime} min this week
              </Text>
              <Text style={[styles.scoreDetail, { color: colors.text }]}>
                Recommended rest: {recoveryStats.recommendedRestDays} days
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <View style={styles.statsGrid}>
            <StatCard 
              title="Recovery Score" 
              value={`${recoveryStats.recoveryScore}%`} 
              subtitle="Good"
              color={colors.success}
            />
            <StatCard 
              title="Weekly Total" 
              value={`${recoveryStats.totalRecoveryTime} min`} 
              subtitle="Recovery time"
            />
            <StatCard 
              title="Rest Days" 
              value={recoveryStats.recommendedRestDays} 
              subtitle="Recommended"
            />
            <StatCard 
              title="Last Session" 
              value={recoveryStats.lastRecoverySession} 
              subtitle="Keep it up!"
            />
          </View>
        </View>

        {/* Today&apos;s Recommendation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today&apos;s Recommendation</Text>
          <View style={[
            styles.recommendationCard,
            styles.recommendationCardSuccess,
            { backgroundColor: colors.success + '20', borderColor: colors.success }
          ]}>
            <Text style={[styles.recommendationTitle, { color: colors.text }]}>
              Gentle Stretching Routine
            </Text>
            <Text style={[styles.recommendationDescription, { color: colors.textSecondary }]}>
              Based on your recent training intensity, a 10-minute full body stretch session is recommended to aid muscle recovery.
            </Text>
            <TouchableOpacity 
              style={[styles.recommendationButton, { backgroundColor: colors.success }]}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Start recommended recovery session"
            >
              <Text style={styles.recommendationButtonText}>Start Recovery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recovery Techniques */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recovery Techniques</Text>
          {recoveryTechniques.map((technique) => (
            <RecoveryTechniqueCard key={technique.id} technique={technique} />
          ))}
        </View>

        {/* Recovery Tips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recovery Tips</Text>
          <View style={[styles.tipsContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.tipText, { color: colors.text }]}>
              💧 Stay hydrated - Drink plenty of water throughout the day to aid muscle recovery.
            </Text>
            <Text style={[styles.tipText, { color: colors.text }]}>
              😴 Quality sleep - Aim for 7-9 hours of sleep for optimal recovery.
            </Text>
            <Text style={[styles.tipText, { color: colors.text }]}>
              🥗 Proper nutrition - Fuel your body with protein and nutrients to repair muscles.
            </Text>
            <Text style={[styles.tipText, { color: colors.text }]}>
              🎯 Listen to your body - Rest when you feel fatigued or experience pain.
            </Text>
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
  recoveryScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  scoreDetails: {
    flex: 1,
  },
  scoreDetail: {
    fontSize: 14,
    marginBottom: 4,
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
  statTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 10,
    fontWeight: '400',
  },
  recommendationCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  recommendationCardSuccess: {
    backgroundColor: '#34C75920',
    borderColor: '#34C759',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  recommendationDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  recommendationButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  recommendationButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  techniqueCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  techniqueHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  typeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  techniqueInfo: {
    flex: 1,
  },
  techniqueTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  techniqueDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
  },
  techniqueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  techniqueMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  techniqueDuration: {
    fontSize: 12,
    fontWeight: '500',
  },
  techniqueType: {
    fontSize: 12,
    fontWeight: '600',
  },
  startButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  tipsContainer: {
    padding: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default RecoveryScreen;