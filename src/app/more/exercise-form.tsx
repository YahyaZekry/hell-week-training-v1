import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';

interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'balance';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  hasVideo: boolean;
  keyPoints: string[];
}

const ExerciseFormScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Squat',
      category: 'strength',
      difficulty: 'beginner',
      duration: '3 min',
      hasVideo: true,
      keyPoints: [
        'Keep chest up and back straight',
        'Knees should not go past toes',
        'Go as low as comfortable',
        'Drive through heels to stand up'
      ]
    },
    {
      id: '2',
      name: 'Push-up',
      category: 'strength',
      difficulty: 'intermediate',
      duration: '4 min',
      hasVideo: true,
      keyPoints: [
        'Keep body in straight line',
        'Lower chest to ground',
        'Elbows at 45-degree angle',
        'Engage core throughout'
      ]
    },
    {
      id: '3',
      name: 'Plank',
      category: 'strength',
      difficulty: 'beginner',
      duration: '2 min',
      hasVideo: true,
      keyPoints: [
        'Straight line from head to heels',
        'Engage core and glutes',
        'Don\'t let hips sag',
        'Breathe normally'
      ]
    },
    {
      id: '4',
      name: 'Burpee',
      category: 'cardio',
      difficulty: 'advanced',
      duration: '5 min',
      hasVideo: true,
      keyPoints: [
        'Start with feet shoulder-width apart',
        'Drop to plank position',
        'Jump feet back to hands',
        'Jump up with arms overhead'
      ]
    },
    {
      id: '5',
      name: 'Lunge',
      category: 'strength',
      difficulty: 'beginner',
      duration: '3 min',
      hasVideo: true,
      keyPoints: [
        'Step forward, not sideways',
        'Back knee should nearly touch ground',
        'Front knee at 90-degree angle',
        'Keep torso upright'
      ]
    },
    {
      id: '6',
      name: 'Mountain Climber',
      category: 'cardio',
      difficulty: 'intermediate',
      duration: '4 min',
      hasVideo: true,
      keyPoints: [
        'Start in plank position',
        'Bring knees toward chest alternately',
        'Keep hips level',
        'Maintain steady breathing'
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return colors.primary;
      case 'cardio': return colors.error;
      case 'flexibility': return colors.success;
      case 'balance': return colors.accent;
      default: return colors.textSecondary;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return colors.success;
      case 'intermediate': return colors.accent;
      case 'advanced': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const ExerciseCard: React.FC<{ exercise: Exercise }> = ({ exercise }) => (
    <TouchableOpacity
      style={[
        styles.exerciseCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }
      ]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`View ${exercise.name} exercise form`}
      accessibilityHint={`${exercise.duration} tutorial with form guidance`}
    >
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseInfo}>
          <Text style={[styles.exerciseName, { color: colors.text }]}>
            {exercise.name}
          </Text>
          <View style={styles.exerciseMeta}>
            <View style={[
              styles.categoryBadge,
              { backgroundColor: getCategoryColor(exercise.category) + '20' }
            ]}>
              <Text style={[
                styles.categoryText,
                { color: getCategoryColor(exercise.category) }
              ]}>
                {exercise.category.toUpperCase()}
              </Text>
            </View>
            <View style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }
            ]}>
              <Text style={[
                styles.difficultyText,
                { color: getDifficultyColor(exercise.difficulty) }
              ]}>
                {exercise.difficulty.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.exerciseDuration}>
          <Text style={[styles.durationText, { color: colors.textSecondary }]}>
            {exercise.duration}
          </Text>
          {exercise.hasVideo && (
            <Text style={[styles.videoIndicator, { color: colors.primary }]}>
              🎥 VIDEO
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.keyPointsContainer}>
        <Text style={[styles.keyPointsTitle, { color: colors.text }]}>
          Key Form Points:
        </Text>
        {exercise.keyPoints.map((point, index) => (
          <Text key={index} style={[styles.keyPoint, { color: colors.textSecondary }]}>
            • {point}
          </Text>
        ))}
      </View>
      
      <TouchableOpacity 
        style={[styles.viewButton, { backgroundColor: colors.primary }]}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Watch ${exercise.name} tutorial`}
      >
        <Text style={styles.viewButtonText}>View Tutorial</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Exercise Form</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Master proper technique for optimal results
          </Text>
        </View>

        {/* Form Tips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Form Fundamentals</Text>
          <View style={[styles.tipsContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.tipText, { color: colors.text }]}>
              🎯 Quality over quantity - Proper form prevents injury and maximizes results.
            </Text>
            <Text style={[styles.tipText, { color: colors.text }]}>
              📹 Watch videos first - Understand the movement before attempting.
            </Text>
            <Text style={[styles.tipText, { color: colors.text }]}>
              🪞 Use mirrors - Check your form from different angles.
            </Text>
            <Text style={[styles.tipText, { color: colors.text }]}>
              🤏 Start with lighter weights - Master form before adding resistance.
            </Text>
          </View>
        </View>

        {/* Exercise Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Exercise Categories</Text>
          <View style={styles.categoriesGrid}>
            <View style={[
              styles.categoryCard,
              styles.categoryCardPrimary,
              { backgroundColor: colors.primary + '20', borderColor: colors.primary }
            ]}>
              <Text style={[styles.categoryCardTitle, { color: colors.primary }]}>
                💪 Strength
              </Text>
              <Text style={[styles.categoryCardDescription, { color: colors.textSecondary }]}>
                Build muscle and power
              </Text>
            </View>
            <View style={[
              styles.categoryCard,
              styles.categoryCardError,
              { backgroundColor: colors.error + '20', borderColor: colors.error }
            ]}>
              <Text style={[styles.categoryCardTitle, { color: colors.error }]}>
                🏃 Cardio
              </Text>
              <Text style={[styles.categoryCardDescription, { color: colors.textSecondary }]}>
                Improve endurance
              </Text>
            </View>
            <View style={[
              styles.categoryCard,
              styles.categoryCardSuccess,
              { backgroundColor: colors.success + '20', borderColor: colors.success }
            ]}>
              <Text style={[styles.categoryCardTitle, { color: colors.success }]}>
                🧘 Flexibility
              </Text>
              <Text style={[styles.categoryCardDescription, { color: colors.textSecondary }]}>
                Increase range of motion
              </Text>
            </View>
            <View style={[
              styles.categoryCard,
              styles.categoryCardAccent,
              { backgroundColor: colors.accent + '20', borderColor: colors.accent }
            ]}>
              <Text style={[styles.categoryCardTitle, { color: colors.accent }]}>
                ⚖️ Balance
              </Text>
              <Text style={[styles.categoryCardDescription, { color: colors.textSecondary }]}>
                Enhance stability
              </Text>
            </View>
          </View>
        </View>

        {/* Exercise List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Exercise Tutorials</Text>
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </View>

        {/* Common Mistakes */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Common Mistakes to Avoid</Text>
          <View style={[styles.mistakesContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.mistakeTitle, { color: colors.text }]}>
              ❌ Using momentum instead of muscle control
            </Text>
            <Text style={[styles.mistakeDescription, { color: colors.textSecondary }]}>
              Focus on slow, controlled movements through the full range of motion.
            </Text>
            
            <Text style={[styles.mistakeTitle, { color: colors.text }]}>
              ❌ Holding your breath
            </Text>
            <Text style={[styles.mistakeDescription, { color: colors.textSecondary }]}>
              Breathe out during exertion and in during the easier phase of the movement.
            </Text>
            
            <Text style={[styles.mistakeTitle, { color: colors.text }]}>
              ❌ Lifting too heavy too soon
            </Text>
            <Text style={[styles.mistakeDescription, { color: colors.textSecondary }]}>
              Progress gradually and prioritize form over the amount of weight lifted.
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryCardPrimary: {
    backgroundColor: '#007AFF20',
    borderColor: '#007AFF',
  },
  categoryCardError: {
    backgroundColor: '#FF3B3020',
    borderColor: '#FF3B30',
  },
  categoryCardSuccess: {
    backgroundColor: '#34C75920',
    borderColor: '#34C759',
  },
  categoryCardAccent: {
    backgroundColor: '#FF950020',
    borderColor: '#FF9500',
  },
  categoryCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryCardDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  exerciseCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
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
  exerciseDuration: {
    alignItems: 'flex-end',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  videoIndicator: {
    fontSize: 10,
    fontWeight: '600',
  },
  keyPointsContainer: {
    marginBottom: 16,
  },
  keyPointsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  keyPoint: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 2,
  },
  viewButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  mistakesContainer: {
    padding: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  mistakeTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 12,
  },
  mistakeDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
});

export default ExerciseFormScreen;