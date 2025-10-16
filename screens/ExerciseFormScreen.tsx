import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Animated,
  Image,
  TextInput,
} from 'react-native';

import exerciseFormService from '../services/exerciseFormService';

const { width, height } = Dimensions.get('window');

// Exercise types
interface ExerciseCategory {
  id: string;
  name: string;
  icon: string;
}

interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string;
  muscleGroups: string[];
  formTips: string[];
  commonMistakes: string[];
  animationSequence?: AnimationPhase[];
}

interface AnimationPhase {
  phase: string;
  duration: number;
  instructions: string;
}

interface ExerciseDetailsModalProps {
  exercise: Exercise | null;
  visible: boolean;
  onClose: () => void;
  onStartAnimation: (exercise: Exercise) => void;
}

interface AnimationModalProps {
  exercise: Exercise | null;
  visible: boolean;
  onClose: () => void;
  isAnimating: boolean;
  currentPhase: number;
  animationProgress: Animated.Value;
  onAnimationToggle: () => void;
}

const ExerciseFormScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showExerciseModal, setShowExerciseModal] = useState<boolean>(false);
  const [showAnimationModal, setShowAnimationModal] = useState<boolean>(false);
  const [currentAnimationPhase, setCurrentAnimationPhase] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationProgress, setAnimationProgress] = useState<Animated.Value>(new Animated.Value(0));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const animationTimer = useRef<number | null>(null);

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = exerciseFormService.searchExercises(searchQuery);
      setFilteredExercises(filtered);
    } else {
      setFilteredExercises(exercises);
    }
  }, [searchQuery, exercises]);

  const initializeData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await exerciseFormService.initialize();
      const allCategories = exerciseFormService.getAllCategories();
      setCategories(allCategories);
      if (allCategories.length > 0) {
        setSelectedCategory(allCategories[0]);
        const categoryExercises = exerciseFormService.getExercisesByCategory(allCategories[0].id);
        setExercises(categoryExercises);
        setFilteredExercises(categoryExercises);
      }
    } catch (error) {
      console.error('Failed to initialize exercise form screen:', error);
      Alert.alert('Error', 'Failed to load exercise data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (category: ExerciseCategory): void => {
    setSelectedCategory(category);
    const categoryExercises = exerciseFormService.getExercisesByCategory(category.id);
    setExercises(categoryExercises);
    setFilteredExercises(categoryExercises);
    setSearchQuery('');
  };

  const handleExerciseSelect = (exercise: Exercise): void => {
    setSelectedExercise(exercise);
    setShowExerciseModal(true);
  };

  const startAnimation = (exercise: Exercise): void => {
    setSelectedExercise(exercise);
    setShowAnimationModal(true);
    setCurrentAnimationPhase(0);
    setIsAnimating(true);
    runAnimationSequence(exercise.animationSequence || []);
  };

  const runAnimationSequence = (sequence: AnimationPhase[]): void => {
    if (sequence.length === 0) return;

    const runPhase = (phaseIndex: number): void => {
      if (phaseIndex >= sequence.length) {
        setIsAnimating(false);
        return;
      }

      const phase = sequence[phaseIndex];
      setCurrentAnimationPhase(phaseIndex);
      
      // Reset animation progress
      animationProgress.setValue(0);
      
      // Animate progress bar
      Animated.timing(animationProgress, {
        toValue: 1,
        duration: phase.duration,
        useNativeDriver: false,
      }).start(() => {
        // Move to next phase
        animationTimer.current = setTimeout(() => {
          runPhase(phaseIndex + 1);
        }, 500);
      });
    };

    runPhase(0);
  };

  const stopAnimation = (): void => {
    if (animationTimer.current) {
      clearTimeout(animationTimer.current);
    }
    setIsAnimating(false);
    animationProgress.stopAnimation();
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#666';
    }
  };

  const getEquipmentIcon = (equipment: string): string => {
    switch (equipment) {
      case 'none': return '🏃';
      case 'pullup_bar': return '🏋️';
      case 'bench_chair': return '🪑';
      default: return '⚙️';
    }
  };

  const renderCategoryTabs = (): React.ReactElement => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryTabs}
      contentContainerStyle={styles.categoryTabsContent}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryTab,
            selectedCategory?.id === category.id && styles.categoryTabActive
          ]}
          onPress={() => handleCategorySelect(category)}
        >
          <Text style={styles.categoryIcon}>{category.icon}</Text>
          <Text style={[
            styles.categoryText,
            selectedCategory?.id === category.id && styles.categoryTextActive
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSearchBar = (): React.ReactElement => (
    <View style={styles.searchContainer}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search exercises..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Text style={styles.clearIcon}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderExerciseCard = (exercise: Exercise): React.ReactElement => (
    <TouchableOpacity
      key={exercise.id}
      style={styles.exerciseCard}
      onPress={() => handleExerciseSelect(exercise)}
    >
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.exerciseMeta}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
            <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
          </View>
          <Text style={styles.equipmentIcon}>{getEquipmentIcon(exercise.equipment)}</Text>
        </View>
      </View>
      
      <View style={styles.muscleGroups}>
        {exercise.muscleGroups.slice(0, 3).map((muscle, index) => (
          <View key={index} style={styles.muscleBadge}>
            <Text style={styles.muscleText}>{muscle}</Text>
          </View>
        ))}
        {exercise.muscleGroups.length > 3 && (
          <Text style={styles.moreMusclesText}>+{exercise.muscleGroups.length - 3}</Text>
        )}
      </View>

      <View style={styles.exerciseActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleExerciseSelect(exercise)}
        >
          <Text style={styles.actionButtonText}>📖 Details</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryActionButton]}
          onPress={() => startAnimation(exercise)}
        >
          <Text style={styles.actionButtonText}>🎬 Animation</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderExerciseModal = (): React.ReactElement | null => {
    if (!selectedExercise) return null;

    return (
      <Modal
        visible={showExerciseModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedExercise.name}</Text>
            <TouchableOpacity onPress={() => setShowExerciseModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.exerciseDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>
                  {selectedExercise.category.replace('_', ' ')}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Difficulty</Text>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(selectedExercise.difficulty) }]}>
                  <Text style={styles.difficultyText}>{selectedExercise.difficulty}</Text>
                </View>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Equipment</Text>
                <Text style={styles.detailValue}>
                  {selectedExercise.equipment.replace('_', ' ')}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Muscle Groups</Text>
                <View style={styles.muscleGroupsList}>
                  {selectedExercise.muscleGroups.map((muscle, index) => (
                    <View key={index} style={styles.muscleBadge}>
                      <Text style={styles.muscleText}>{muscle}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>✅ Form Tips</Text>
              {selectedExercise.formTips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Text style={styles.tipNumber}>{index + 1}</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>⚠️ Common Mistakes</Text>
              {selectedExercise.commonMistakes.map((mistake, index) => (
                <View key={index} style={styles.mistakeItem}>
                  <Text style={styles.mistakeIcon}>❌</Text>
                  <Text style={styles.mistakeText}>{mistake}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.startAnimationButton}
              onPress={() => {
                setShowExerciseModal(false);
                startAnimation(selectedExercise);
              }}
            >
              <Text style={styles.startAnimationButtonText}>🎬 Start Animation</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderAnimationModal = (): React.ReactElement | null => {
    if (!selectedExercise) return null;

    const animationSequence = selectedExercise.animationSequence || [];
    const currentPhase = animationSequence[currentAnimationPhase] || {};

    return (
      <Modal
        visible={showAnimationModal}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={styles.animationContainer}>
          <View style={styles.animationHeader}>
            <TouchableOpacity onPress={() => {
              stopAnimation();
              setShowAnimationModal(false);
            }}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.animationTitle}>{selectedExercise.name}</Text>
            <View style={styles.animationControls}>
              <TouchableOpacity onPress={() => {
                if (isAnimating) {
                  stopAnimation();
                } else {
                  runAnimationSequence(animationSequence.slice(currentAnimationPhase));
                }
              }}>
                <Text style={styles.controlButton}>{isAnimating ? '⏸️' : '▶️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.animationContent}>
            <View style={styles.exerciseVisualization}>
              {/* This would contain actual exercise animation/images */}
              <View style={styles.placeholderAnimation}>
                <Text style={styles.placeholderAnimationText}>
                  🏃‍♂️ Exercise Animation
                </Text>
                <Text style={styles.placeholderSubtext}>
                  {currentPhase.phase?.replace('_', ' ').toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.animationInstructions}>
              <Text style={styles.instructionText}>{currentPhase.instructions}</Text>
            </View>

            <View style={styles.animationProgress}>
              <View style={styles.phaseIndicator}>
                <Text style={styles.phaseText}>
                  Phase {currentAnimationPhase + 1} of {animationSequence.length}
                </Text>
              </View>
              
              <View style={styles.progressBar}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width: animationProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
              
              <Text style={styles.phaseDuration}>
                {currentPhase.duration / 1000}s
              </Text>
            </View>

            <View style={styles.animationPhases}>
              {animationSequence.map((phase, index) => (
                <View
                  key={index}
                  style={[
                    styles.phaseDot,
                    index === currentAnimationPhase && styles.phaseDotActive,
                    index < currentAnimationPhase && styles.phaseDotCompleted,
                  ]}
                />
              ))}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading exercise database...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exercise Form Guide</Text>
        <Text style={styles.headerSubtitle}>Master proper technique with animated guides</Text>
      </View>

      {renderCategoryTabs()}
      {renderSearchBar()}

      <ScrollView 
        style={styles.exerciseList}
        ref={scrollViewRef}
        contentContainerStyle={styles.exerciseListContent}
      >
        {filteredExercises.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No exercises found</Text>
            <Text style={styles.noResultsSubtext}>Try a different search term</Text>
          </View>
        ) : (
          filteredExercises.map(renderExerciseCard)
        )}
      </ScrollView>

      {renderExerciseModal()}
      {renderAnimationModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  categoryTabs: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryTabsContent: {
    paddingHorizontal: 20,
  },
  categoryTab: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginRight: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  categoryTabActive: {
    borderBottomColor: '#2196F3',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearIcon: {
    fontSize: 18,
    color: '#666',
    marginLeft: 10,
  },
  exerciseList: {
    flex: 1,
  },
  exerciseListContent: {
    padding: 20,
  },
  exerciseCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  difficultyText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  equipmentIcon: {
    fontSize: 16,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  muscleBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
  },
  muscleText: {
    fontSize: 10,
    color: '#1976D2',
    fontWeight: '500',
  },
  moreMusclesText: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  exerciseActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  primaryActionButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  exerciseDetails: {
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  muscleGroupsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  formSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  mistakeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  mistakeIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  mistakeText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  startAnimationButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  startAnimationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  animationContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  animationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  animationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  animationControls: {
    flexDirection: 'row',
  },
  controlButton: {
    fontSize: 20,
    color: '#fff',
  },
  animationContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  exerciseVisualization: {
    width: width - 40,
    height: height * 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  placeholderAnimation: {
    alignItems: 'center',
  },
  placeholderAnimationText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  animationInstructions: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  instructionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  animationProgress: {
    alignItems: 'center',
    marginBottom: 20,
  },
  phaseIndicator: {
    marginBottom: 10,
  },
  phaseText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  progressBar: {
    width: width - 60,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  phaseDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  animationPhases: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  phaseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  phaseDotActive: {
    backgroundColor: '#4CAF50',
    transform: [{ scale: 1.2 }],
  },
  phaseDotCompleted: {
    backgroundColor: '#4CAF50',
  },
});

export default ExerciseFormScreen;