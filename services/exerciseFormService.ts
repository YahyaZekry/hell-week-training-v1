// Type definitions for exercise form service
export interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string;
  muscleGroups: string[];
  formTips: string[];
  commonMistakes: string[];
  videoUrl: string | null;
  images: string[];
  animationSequence: AnimationSequence[];
}

export interface AnimationSequence {
  phase: string;
  duration: number;
  instructions: string;
}

export interface ExerciseCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  exercises: Exercise[];
}

export interface FormMetrics {
  bodyAlignment?: number;
  elbowAngle?: number;
  kneeAlignment?: number;
  depth?: number;
}

export interface FormValidation {
  valid: boolean;
  feedback: string[];
  score: number;
  suggestions: string[];
}

export interface ExerciseProgression {
  id: string;
  name: string;
  difficulty: string;
}

export interface ServiceStatus {
  isInitialized: boolean;
  totalExercises: number;
  totalCategories: number;
  exerciseTypes: {
    upper_body: number;
    lower_body: number;
    core: number;
    full_body: number;
  };
}

class ExerciseFormService {
  private exercises: Exercise[] = [];
  private categories: ExerciseCategory[] = [];
  private isInitialized: boolean = false;

  // Initialize exercise form service
  async initialize(): Promise<boolean> {
    try {
      this.loadExercises();
      this.loadCategories();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize exercise form service:', error);
      return false;
    }
  }

  // Load exercise database
  private loadExercises(): void {
    this.exercises = [
      // Bodyweight Exercises
      {
        id: 'pushup',
        name: 'Push-up',
        category: 'upper_body',
        difficulty: 'beginner',
        equipment: 'none',
        muscleGroups: ['chest', 'shoulders', 'triceps'],
        formTips: [
          'Keep your body in a straight line from head to heels',
          'Lower your chest until it\'s about a fist height from the ground',
          'Keep your elbows at a 45-degree angle from your body',
          'Engage your core throughout the movement',
          'Push through your palms to return to starting position'
        ],
        commonMistakes: [
          'Letting hips sag or rise too high',
          'Flaring elbows out to 90 degrees',
          'Not lowering chest enough',
          'Holding breath during movement'
        ],
        videoUrl: null, // Would contain exercise video URL
        images: [
          'pushup_start.jpg',
          'pushup_mid.jpg',
          'pushup_end.jpg'
        ],
        animationSequence: [
          { phase: 'starting', duration: 2000, instructions: 'Start in high plank position with hands shoulder-width apart' },
          { phase: 'descending', duration: 2000, instructions: 'Lower your body keeping elbows at 45 degrees' },
          { phase: 'bottom', duration: 1000, instructions: 'Pause briefly when chest is near ground' },
          { phase: 'ascending', duration: 2000, instructions: 'Push back up to starting position' },
          { phase: 'rest', duration: 1000, instructions: 'Prepare for next repetition' }
        ]
      },
      {
        id: 'pullup',
        name: 'Pull-up',
        category: 'upper_body',
        difficulty: 'intermediate',
        equipment: 'pullup_bar',
        muscleGroups: ['lats', 'biceps', 'upper_back'],
        formTips: [
          'Start from a dead hang with arms fully extended',
          'Pull your chin over the bar',
          'Keep your core tight and avoid swinging',
          'Lower down in a controlled manner',
          'Focus on using your back muscles, not just arms'
        ],
        commonMistakes: [
          'Using momentum to swing up',
          'Not pulling high enough',
          'Dropping down too quickly',
          'Shrugging shoulders too much'
        ],
        videoUrl: null,
        images: [
          'pullup_start.jpg',
          'pullup_mid.jpg',
          'pullup_end.jpg'
        ],
        animationSequence: [
          { phase: 'starting', duration: 2000, instructions: 'Start from dead hang with arms fully extended' },
          { phase: 'pulling', duration: 2000, instructions: 'Pull your body up toward the bar' },
          { phase: 'top', duration: 1000, instructions: 'Chin should clear the bar' },
          { phase: 'lowering', duration: 2000, instructions: 'Lower down in controlled manner' },
          { phase: 'rest', duration: 1000, instructions: 'Reset for next repetition' }
        ]
      },
      {
        id: 'squat',
        name: 'Bodyweight Squat',
        category: 'lower_body',
        difficulty: 'beginner',
        equipment: 'none',
        muscleGroups: ['quads', 'glutes', 'hamstrings'],
        formTips: [
          'Stand with feet shoulder-width apart',
          'Keep your chest up and back straight',
          'Lower until thighs are parallel to ground',
          'Keep knees behind toes',
          'Drive through heels to return to standing'
        ],
        commonMistakes: [
          'Knees caving inward',
          'Leaning too far forward',
          'Not going low enough',
          'Rising onto toes'
        ],
        videoUrl: null,
        images: [
          'squat_start.jpg',
          'squat_mid.jpg',
          'squat_end.jpg'
        ],
        animationSequence: [
          { phase: 'starting', duration: 2000, instructions: 'Stand with feet shoulder-width apart' },
          { phase: 'descending', duration: 2000, instructions: 'Lower down keeping chest up' },
          { phase: 'bottom', duration: 1000, instructions: 'Thighs parallel to ground' },
          { phase: 'ascending', duration: 2000, instructions: 'Drive through heels to stand up' },
          { phase: 'rest', duration: 1000, instructions: 'Prepare for next repetition' }
        ]
      },
      {
        id: 'plank',
        name: 'Plank',
        category: 'core',
        difficulty: 'beginner',
        equipment: 'none',
        muscleGroups: ['core', 'shoulders', 'lower_back'],
        formTips: [
          'Start in push-up position',
          'Keep your body in straight line',
          'Engage your core muscles',
          'Don\'t let hips sag',
          'Keep breathing steadily'
        ],
        commonMistakes: [
          'Hips sagging or rising too high',
          'Holding breath',
          'Shoulders shrugged up',
          'Looking up or down excessively'
        ],
        videoUrl: null,
        images: [
          'plank_hold.jpg'
        ],
        animationSequence: [
          { phase: 'setup', duration: 3000, instructions: 'Get into plank position with proper alignment' },
          { phase: 'hold', duration: 30000, instructions: 'Maintain perfect form while breathing steadily' },
          { phase: 'finish', duration: 2000, instructions: 'Lower down carefully' }
        ]
      },
      {
        id: 'burpee',
        name: 'Burpee',
        category: 'full_body',
        difficulty: 'advanced',
        equipment: 'none',
        muscleGroups: ['full_body'],
        formTips: [
          'Start in standing position',
          'Drop into squat and place hands on ground',
          'Jump feet back into plank position',
          'Perform a push-up (optional)',
          'Jump feet back to squat and jump up'
        ],
        commonMistakes: [
          'Rounding back during jump back',
          'Not landing softly',
          'Skipping push-up portion',
          'Losing rhythm and momentum'
        ],
        videoUrl: null,
        images: [
          'burpee_1.jpg',
          'burpee_2.jpg',
          'burpee_3.jpg',
          'burpee_4.jpg'
        ],
        animationSequence: [
          { phase: 'standing', duration: 1000, instructions: 'Start in standing position' },
          { phase: 'squat', duration: 1000, instructions: 'Drop into squat with hands on ground' },
          { phase: 'jump_back', duration: 1000, instructions: 'Jump feet back to plank' },
          { phase: 'pushup', duration: 2000, instructions: 'Perform push-up' },
          { phase: 'jump_forward', duration: 1000, instructions: 'Jump feet back to squat' },
          { phase: 'jump_up', duration: 1000, instructions: 'Jump up with arms overhead' }
        ]
      },
      {
        id: 'lunge',
        name: 'Lunge',
        category: 'lower_body',
        difficulty: 'beginner',
        equipment: 'none',
        muscleGroups: ['quads', 'glutes', 'hamstrings'],
        formTips: [
          'Step forward with one leg',
          'Lower until both knees are 90 degrees',
          'Keep front knee behind toes',
          'Keep torso upright',
          'Push through front heel to return'
        ],
        commonMistakes: [
          'Front knee going past toes',
          'Leaning torso forward',
          'Not lowering deep enough',
          'Back knee hitting ground too hard'
        ],
        videoUrl: null,
        images: [
          'lunge_start.jpg',
          'lunge_mid.jpg',
          'lunge_end.jpg'
        ],
        animationSequence: [
          { phase: 'standing', duration: 1000, instructions: 'Stand with feet together' },
          { phase: 'step', duration: 1000, instructions: 'Step forward with one leg' },
          { phase: 'lower', duration: 2000, instructions: 'Lower until knees are 90 degrees' },
          { phase: 'rise', duration: 2000, instructions: 'Push through front heel to return' },
          { phase: 'switch', duration: 1000, instructions: 'Switch legs or repeat on same side' }
        ]
      },
      {
        id: 'mountain_climber',
        name: 'Mountain Climber',
        category: 'core',
        difficulty: 'intermediate',
        equipment: 'none',
        muscleGroups: ['core', 'shoulders', 'cardio'],
        formTips: [
          'Start in high plank position',
          'Keep your core engaged',
          'Bring knees toward chest alternately',
          'Maintain steady breathing',
          'Keep hips level throughout'
        ],
        commonMistakes: [
          'Hips rising too high',
          'Not bringing knees close enough',
          'Holding breath',
          'Moving too slowly for cardio benefit'
        ],
        videoUrl: null,
        images: [
          'mountain_climber_1.jpg',
          'mountain_climber_2.jpg'
        ],
        animationSequence: [
          { phase: 'start', duration: 2000, instructions: 'Start in high plank position' },
          { phase: 'right_knee', duration: 1000, instructions: 'Bring right knee toward chest' },
          { phase: 'left_knee', duration: 1000, instructions: 'Bring left knee toward chest' },
          { phase: 'repeat', duration: 10000, instructions: 'Continue alternating knees' }
        ]
      },
      {
        id: 'dip',
        name: 'Tricep Dip',
        category: 'upper_body',
        difficulty: 'intermediate',
        equipment: 'bench_chair',
        muscleGroups: ['triceps', 'shoulders', 'chest'],
        formTips: [
          'Sit on edge of bench with hands beside hips',
          'Slide off bench and lower body',
          'Keep elbows pointing back, not out',
          'Lower until elbows are 90 degrees',
          'Push back up to starting position'
        ],
        commonMistakes: [
          'Flaring elbows out to sides',
          'Not lowering deep enough',
          'Using legs too much for assistance',
          'Shoulders shrugging up toward ears'
        ],
        videoUrl: null,
        images: [
          'dip_start.jpg',
          'dip_mid.jpg',
          'dip_end.jpg'
        ],
        animationSequence: [
          { phase: 'setup', duration: 2000, instructions: 'Sit on bench edge with hands beside hips' },
          { phase: 'lower', duration: 2000, instructions: 'Slide off and lower until elbows 90 degrees' },
          { phase: 'push', duration: 2000, instructions: 'Push back up to starting position' },
          { phase: 'repeat', duration: 2000, instructions: 'Continue for desired repetitions' }
        ]
      }
    ];
  }

  // Load exercise categories
  private loadCategories(): void {
    this.categories = [
      {
        id: 'upper_body',
        name: 'Upper Body',
        description: 'Exercises targeting chest, back, shoulders, and arms',
        icon: '💪',
        exercises: this.exercises.filter(e => e.category === 'upper_body')
      },
      {
        id: 'lower_body',
        name: 'Lower Body',
        description: 'Exercises targeting legs and glutes',
        icon: '🦵',
        exercises: this.exercises.filter(e => e.category === 'lower_body')
      },
      {
        id: 'core',
        name: 'Core',
        description: 'Exercises targeting abs and core muscles',
        icon: '🎯',
        exercises: this.exercises.filter(e => e.category === 'core')
      },
      {
        id: 'full_body',
        name: 'Full Body',
        description: 'Compound exercises working multiple muscle groups',
        icon: '🔄',
        exercises: this.exercises.filter(e => e.category === 'full_body')
      }
    ];
  }

  // Get all exercises
  getAllExercises(): Exercise[] {
    return this.exercises;
  }

  // Get exercise by ID
  getExerciseById(id: string): Exercise | undefined {
    return this.exercises.find(exercise => exercise.id === id);
  }

  // Get all categories
  getAllCategories(): ExerciseCategory[] {
    return this.categories;
  }

  // Get category by ID
  getCategoryById(id: string): ExerciseCategory | undefined {
    return this.categories.find(category => category.id === id);
  }

  // Get exercises by category
  getExercisesByCategory(categoryId: string): Exercise[] {
    return this.exercises.filter(exercise => exercise.category === categoryId);
  }

  // Get exercises by difficulty
  getExercisesByDifficulty(difficulty: string): Exercise[] {
    return this.exercises.filter(exercise => exercise.difficulty === difficulty);
  }

  // Get exercises by equipment
  getExercisesByEquipment(equipment: string): Exercise[] {
    return this.exercises.filter(exercise => exercise.equipment === equipment);
  }

  // Search exercises
  searchExercises(query: string): Exercise[] {
    const searchQuery = query.toLowerCase();
    return this.exercises.filter(exercise => 
      exercise.name.toLowerCase().includes(searchQuery) ||
      exercise.muscleGroups.some(muscle => muscle.toLowerCase().includes(searchQuery)) ||
      exercise.category.toLowerCase().includes(searchQuery)
    );
  }

  // Get exercise animation sequence
  getExerciseAnimation(exerciseId: string): AnimationSequence[] {
    const exercise = this.getExerciseById(exerciseId);
    return exercise ? exercise.animationSequence : [];
  }

  // Get exercise form tips
  getExerciseFormTips(exerciseId: string): string[] {
    const exercise = this.getExerciseById(exerciseId);
    return exercise ? exercise.formTips : [];
  }

  // Get exercise common mistakes
  getExerciseCommonMistakes(exerciseId: string): string[] {
    const exercise = this.getExerciseById(exerciseId);
    return exercise ? exercise.commonMistakes : [];
  }

  // Get exercise muscle groups
  getExerciseMuscleGroups(exerciseId: string): string[] {
    const exercise = this.getExerciseById(exerciseId);
    return exercise ? exercise.muscleGroups : [];
  }

  // Get exercises by muscle group
  getExercisesByMuscleGroup(muscleGroup: string): Exercise[] {
    return this.exercises.filter(exercise => 
      exercise.muscleGroups.includes(muscleGroup)
    );
  }

  // Get recommended exercises for workout
  getRecommendedWorkoutExercises(workoutType: string = 'full_body', difficulty: string = 'intermediate', count: number = 5): Exercise[] {
    let exercises: Exercise[] = [];
    
    if (workoutType === 'upper_body') {
      exercises = this.getExercisesByCategory('upper_body');
    } else if (workoutType === 'lower_body') {
      exercises = this.getExercisesByCategory('lower_body');
    } else if (workoutType === 'core') {
      exercises = this.getExercisesByCategory('core');
    } else {
      // Full body - mix from different categories
      const upper = this.getExercisesByCategory('upper_body').slice(0, 2);
      const lower = this.getExercisesByCategory('lower_body').slice(0, 2);
      const core = this.getExercisesByCategory('core').slice(0, 1);
      exercises = [...upper, ...lower, ...core];
    }
    
    // Filter by difficulty
    if (difficulty !== 'all') {
      exercises = exercises.filter(exercise => exercise.difficulty === difficulty);
    }
    
    // If not enough exercises of exact difficulty, include nearby difficulties
    if (exercises.length < count && difficulty !== 'all') {
      const otherDifficulties = difficulty === 'beginner' ? ['intermediate'] : 
                               difficulty === 'intermediate' ? ['beginner', 'advanced'] : 
                               ['intermediate'];
      
      otherDifficulties.forEach(diff => {
        const moreExercises = this.exercises.filter(exercise => 
          exercise.difficulty === diff && !exercises.includes(exercise)
        );
        exercises.push(...moreExercises.slice(0, count - exercises.length));
      });
    }
    
    return exercises.slice(0, count);
  }

  // Get exercise progression path
  getExerciseProgression(baseExerciseId: string): ExerciseProgression[] {
    const baseExercise = this.getExerciseById(baseExerciseId);
    if (!baseExercise) return [];
    
    // Define progressions for common exercises
    const progressions: { [key: string]: ExerciseProgression[] } = {
      pushup: [
        { id: 'wall_pushup', name: 'Wall Push-up', difficulty: 'beginner' },
        { id: 'knee_pushup', name: 'Knee Push-up', difficulty: 'beginner' },
        { id: 'pushup', name: 'Push-up', difficulty: 'beginner' },
        { id: 'decline_pushup', name: 'Decline Push-up', difficulty: 'intermediate' },
        { id: 'diamond_pushup', name: 'Diamond Push-up', difficulty: 'advanced' }
      ],
      squat: [
        { id: 'wall_sit', name: 'Wall Sit', difficulty: 'beginner' },
        { id: 'squat', name: 'Bodyweight Squat', difficulty: 'beginner' },
        { id: 'jump_squat', name: 'Jump Squat', difficulty: 'intermediate' },
        { id: 'pistol_squat', name: 'Pistol Squat', difficulty: 'advanced' }
      ],
      pullup: [
        { id: 'negative_pullup', name: 'Negative Pull-up', difficulty: 'beginner' },
        { id: 'australian_pullup', name: 'Australian Pull-up', difficulty: 'intermediate' },
        { id: 'pullup', name: 'Pull-up', difficulty: 'intermediate' },
        { id: 'muscle_up', name: 'Muscle-up', difficulty: 'advanced' }
      ]
    };
    
    return progressions[baseExerciseId] || [];
  }

  // Get exercise alternative for equipment limitations
  getExerciseAlternatives(exerciseId: string, availableEquipment: string[] = ['none']): Exercise[] {
    const exercise = this.getExerciseById(exerciseId);
    if (!exercise) return [];
    
    // If current exercise equipment is available, return empty
    if (availableEquipment.includes(exercise.equipment)) {
      return [];
    }
    
    // Find alternatives with available equipment that target similar muscle groups
    return this.exercises.filter(altExercise => 
      availableEquipment.includes(altExercise.equipment) &&
      altExercise.id !== exerciseId &&
      altExercise.muscleGroups.some(muscle => exercise.muscleGroups.includes(muscle))
    );
  }

  // Validate exercise form (simplified simulation)
  validateExerciseForm(exerciseId: string, formMetrics: FormMetrics): FormValidation {
    const exercise = this.getExerciseById(exerciseId);
    if (!exercise) return { valid: false, feedback: ['Exercise not found'], score: 0, suggestions: [] };
    
    // This would integrate with motion tracking in a real implementation
    // For now, return simulated validation
    const validation: FormValidation = {
      valid: true,
      feedback: [],
      score: 85, // 0-100 score
      suggestions: []
    };
    
    // Simulate form checking based on exercise type
    if (exercise.id === 'pushup') {
      if (formMetrics.bodyAlignment && formMetrics.bodyAlignment < 0.8) {
        validation.valid = false;
        validation.feedback.push('Keep your body in a straight line');
        validation.score -= 15;
      }
      if (formMetrics.elbowAngle && formMetrics.elbowAngle > 120) {
        validation.feedback.push('Keep elbows closer to 45 degrees');
        validation.score -= 10;
      }
    } else if (exercise.id === 'squat') {
      if (formMetrics.kneeAlignment && formMetrics.kneeAlignment < 0.7) {
        validation.valid = false;
        validation.feedback.push('Keep knees aligned with feet');
        validation.score -= 15;
      }
      if (formMetrics.depth && formMetrics.depth < 0.8) {
        validation.feedback.push('Try to squat deeper');
        validation.score -= 10;
      }
    }
    
    return validation;
  }

  // Get service status
  getServiceStatus(): ServiceStatus {
    return {
      isInitialized: this.isInitialized,
      totalExercises: this.exercises.length,
      totalCategories: this.categories.length,
      exerciseTypes: {
        upper_body: this.exercises.filter(e => e.category === 'upper_body').length,
        lower_body: this.exercises.filter(e => e.category === 'lower_body').length,
        core: this.exercises.filter(e => e.category === 'core').length,
        full_body: this.exercises.filter(e => e.category === 'full_body').length,
      }
    };
  }
}

export default new ExerciseFormService();