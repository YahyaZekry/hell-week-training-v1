# TypeScript Implementation Guide

## 📝 Type Definitions

### 1. Create `types/index.ts`

```typescript
// User types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
}

// Navigation types
export type RootStackParamList = {
  Main: undefined;
  WorkoutTimer: { workoutId: string };
  WorkoutHistory: undefined;
  Training: undefined;
  Recovery: undefined;
  Mental: undefined;
  Analytics: undefined;
};

export type MainTabParamList = {
  Today: undefined;
  Training: undefined;
  Progress: undefined;
  Nutrition: undefined;
};

export type TrainingTabParamList = {
  Workouts: undefined;
  Schedule: undefined;
  Checklists: undefined;
};

// Workout types
export interface Workout {
  id: string;
  name: string;
  description: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'mental';
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  restTime?: number; // in seconds
  instructions: string[];
  imageUrl?: string;
}

// Nutrition types
export interface NutritionPlan {
  id: string;
  name: string;
  description: string;
  meals: Meal[];
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: Food[];
  calories: number;
}

export interface Food {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Progress types
export interface ProgressEntry {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    arms?: number;
    thighs?: number;
  };
  workoutCompleted?: string;
  notes?: string;
}

// Service types
export interface AuthService {
  initializeAuth(): Promise<void>;
  signIn(email: string, password: string): Promise<User>;
  signUp(email: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
}

export interface DataService {
  saveWorkout(workout: Workout): Promise<void>;
  getWorkouts(): Promise<Workout[]>;
  saveProgress(entry: ProgressEntry): Promise<void>;
  getProgress(userId: string): Promise<ProgressEntry[]>;
}

// Component prop types
export interface ScreenProps {
  navigation: any;
  route: any;
}

export interface TabScreenProps extends ScreenProps {
  user: User;
}
```

## 🔧 Navigation Bar Styling Fixes

### 1. Update `app/_layout.js` → `app/_layout.tsx`

```typescript
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = focused ? 'today' : 'today-outline';
          } else if (route.name === 'training') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'progress') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'nutrition') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffd700',
        tabBarInactiveTintColor: '#a0a0a0',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#ffd700',
          height: Platform.OS === 'ios' ? 88 : 80,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 3,
          marginBottom: Platform.OS === 'ios' ? 0 : 3,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Today' }} />
      <Tabs.Screen name="training" options={{ title: 'Training' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="nutrition" options={{ title: 'Nutrition' }} />
      
      {/* Hide all other tabs */}
      <Tabs.Screen 
        name="analytics" 
        options={{ 
          title: 'Analytics',
          tabBarButton: () => null
        }} 
      />
      <Tabs.Screen 
        name="exercise-form" 
        options={{ 
          title: 'Exercise Form',
          tabBarButton: () => null
        }} 
      />
      <Tabs.Screen 
        name="mental" 
        options={{ 
          title: 'Mental Fitness',
          tabBarButton: () => null
        }} 
      />
      <Tabs.Screen 
        name="recovery" 
        options={{ 
          title: 'Recovery',
          tabBarButton: () => null
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: 'Settings',
          tabBarButton: () => null
        }} 
      />
      <Tabs.Screen 
        name="workout-history" 
        options={{ 
          title: 'Workout History',
          tabBarButton: () => null
        }} 
      />
      <Tabs.Screen 
        name="analytics/index" 
        options={{ 
          title: 'Analytics Index',
          tabBarButton: () => null
        }} 
      />
    </Tabs>
  );
};

export default TabLayout;
```

### 2. Update `app/training/_layout.js` → `app/training/_layout.tsx`

```typescript
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'schedule') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'checklists') {
            iconName = focused ? 'checkbox' : 'checkbox-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffd700',
        tabBarInactiveTintColor: '#a0a0a0',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          height: Platform.OS === 'ios' ? 88 : 80,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 3,
          marginBottom: Platform.OS === 'ios' ? 0 : 3,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#ffd700',
          height: 2,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Workouts' }} />
      <Tabs.Screen name="schedule" options={{ title: 'Schedule' }} />
      <Tabs.Screen name="checklists" options={{ title: 'Checklists' }} />
    </Tabs>
  );
}

export default Layout;
```

## 📱 Service Conversions

### 1. `services/authService.js` → `services/authService.ts`

```typescript
import { User } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

class AuthService {
  private currentUser: User | null = null;
  private authStateListeners: ((user: User | null) => void)[] = [];

  async initializeAuth(): Promise<void> {
    try {
      // Check for stored user session
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        this.currentUser = JSON.parse(userSession);
      }

      // Set up auth state listener
      firebaseOnAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || undefined,
            createdAt: new Date(),
            lastLoginAt: new Date(),
          };
          this.currentUser = user;
          AsyncStorage.setItem('userSession', JSON.stringify(user));
        } else {
          this.currentUser = null;
          AsyncStorage.removeItem('userSession');
        }
        this.notifyAuthStateChange(this.currentUser);
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || undefined,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };
      
      return user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signUp(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || undefined,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };
      
      return user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      this.currentUser = null;
      await AsyncStorage.removeItem('userSession');
      this.notifyAuthStateChange(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.authStateListeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(callback);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  private notifyAuthStateChange(user: User | null): void {
    this.authStateListeners.forEach(callback => callback(user));
  }
}

export default new AuthService();
```

## 🎨 Screen Conversions

### 1. `screens/TodayScreen.js` → `screens/TodayScreen.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { User, Workout, TabScreenProps } from '../types';
import authService from '../services/authService';
import dataService from '../services/dataService';

interface TodayScreenProps extends TabScreenProps {
  user: User;
}

const TodayScreen: React.FC<TodayScreenProps> = ({ route }) => {
  const { user } = route.params;
  const [todayWorkout, setTodayWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodayWorkout();
  }, []);

  const loadTodayWorkout = async () => {
    try {
      const workouts = await dataService.getWorkouts();
      // Get workout for today based on some logic
      const today = new Date().getDay();
      const workoutIndex = today % workouts.length;
      setTodayWorkout(workouts[workoutIndex]);
    } catch (error) {
      console.error('Error loading today workout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartWorkout = () => {
    if (todayWorkout) {
      // Navigate to workout timer
      Alert.alert('Starting Workout', `Beginning ${todayWorkout.name}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading today's workout...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Focus</Text>
        <Text style={styles.subtitle}>Get comfortable being uncomfortable.</Text>
      </View>

      {todayWorkout && (
        <View style={styles.workoutCard}>
          <Text style={styles.workoutTitle}>Today's Training (Week 1)</Text>
          <Text style={styles.dayTitle}>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</Text>
          
          <View style={styles.exerciseList}>
            {todayWorkout.exercises.map((exercise, index) => (
              <View key={exercise.id} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets && `${exercise.sets} sets`}
                  {exercise.reps && ` × ${exercise.reps} reps`}
                  {exercise.duration && ` × ${exercise.duration}s`}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  contentContainer: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  loadingText: {
    color: '#ffd700',
    fontSize: 16,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0a0a0',
  },
  workoutCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 8,
  },
  dayTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  exerciseList: {
    marginBottom: 30,
  },
  exerciseItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  startButton: {
    backgroundColor: '#ffd700',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a0a0a',
  },
});

export default TodayScreen;
```

## 📋 Migration Checklist

### Phase 1: Navigation Fixes
- [ ] Update `app/_layout.js` → `app/_layout.tsx`
- [ ] Update `app/training/_layout.js` → `app/training/_layout.tsx`
- [ ] Test navigation bar consistency

### Phase 2: Type Definitions
- [ ] Create `types/index.ts`
- [ ] Define all interfaces and types

### Phase 3: Service Layer
- [ ] Convert `services/authService.js`
- [ ] Convert `services/dataService.js`
- [ ] Convert `services/audioService.js`
- [ ] Convert remaining service files

### Phase 4: Screen Components
- [ ] Convert `screens/TodayScreen.js`
- [ ] Convert `screens/TrainingScreen.js`
- [ ] Convert `screens/ProgressScreen.js`
- [ ] Convert `screens/NutritionScreen.js`
- [ ] Convert remaining screen files

### Phase 5: Layout Files
- [ ] Convert remaining `app/*.js` files
- [ ] Update `App.js` → `App.tsx`

### Phase 6: Testing
- [ ] Test all navigation flows
- [ ] Verify UI consistency
- [ ] Test on different screen sizes
- [ ] Validate all features

## 🚀 Post-Migration Steps

1. Update `tsconfig.json` to include new type paths
2. Run TypeScript compiler to check for errors
3. Test the application thoroughly
4. Update documentation
5. Commit changes with proper version control