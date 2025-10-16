import { 
  initializeApp, 
  getApps, 
  getApp,
  FirebaseApp
} from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  Auth,
  User as FirebaseUser,
  UserCredential
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  Firestore,
  DocumentData
} from 'firebase/firestore';

import { firebaseConfig } from '../firebaseConfig';
import { User, UserPreferences } from '../types';

// Type definitions for authentication responses
export interface AuthResponse {
  success: boolean;
  user?: {
    uid: string;
    email: string | null;
    displayName: string | null;
  };
  error?: string;
  message?: string;
}

export interface UserProfileResponse {
  success: boolean;
  data?: DocumentData;
  error?: string;
}

export interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string | null;
  createdAt: string;
  updatedAt: string;
  currentWeek: number;
  totalWorkouts: number;
  totalHours: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  profile: {
    age: number | null;
    weight: number | null;
    height: number | null;
    fitnessLevel: string;
    goals: string[];
  };
  preferences: UserPreferences;
}

export type AuthStateListener = (user: FirebaseUser | null) => void;

class AuthService {
  private app: FirebaseApp | null = null;
  private auth: Auth | null = null;
  private db: Firestore | null = null;
  private currentUser: FirebaseUser | null = null;
  private authListeners: AuthStateListener[] = [];
  private isInitialized: boolean = false;
  private isMockMode: boolean = false;

  // Initialize Firebase services
  async initializeAuth(): Promise<boolean> {
    try {
      if (this.isInitialized) {
        return true;
      }

      // Check if Firebase config is properly set
      if (firebaseConfig.apiKey === "your-api-key-here") {
        console.warn('Firebase configuration not updated. Using mock authentication for development.');
        this.setupMockAuth();
        return true;
      }

      // Initialize Firebase app
      if (getApps().length === 0) {
        this.app = initializeApp(firebaseConfig);
      } else {
        this.app = getApp();
      }

      // Initialize authentication
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);

      // Set up auth state listener
      onAuthStateChanged(this.auth, (user) => {
        this.currentUser = user;
        this.notifyAuthListeners(user);
      });

      this.isInitialized = true;
      console.log('Firebase authentication initialized successfully');
      return true;

    } catch (error) {
      console.error('Error initializing Firebase authentication:', error);
      this.setupMockAuth();
      return false;
    }
  }

  // Mock authentication for development when Firebase is not configured
  private setupMockAuth(): void {
    console.log('Setting up mock authentication for development');
    this.currentUser = null;
    this.isMockMode = true;
  }

  // Sign up with email and password
  async signUp(email: string, password: string, displayName: string): Promise<AuthResponse> {
    try {
      if (this.isMockMode) {
        return this.mockSignUp(email, displayName);
      }

      if (!this.auth) {
        throw new Error('Authentication not initialized');
      }

      // Create user account
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Update display name
      await updateProfile(userCredential.user, { displayName });

      // Create user profile in Firestore
      await this.createUserProfile(userCredential.user, displayName);

      return {
        success: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: displayName
        }
      };

    } catch (error: any) {
      console.error('Sign up error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      if (this.isMockMode) {
        return this.mockSignIn(email);
      }

      if (!this.auth) {
        throw new Error('Authentication not initialized');
      }

      const userCredential: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);

      return {
        success: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName
        }
      };

    } catch (error: any) {
      console.error('Sign in error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // Sign out
  async signOut(): Promise<AuthResponse> {
    try {
      if (this.isMockMode) {
        this.currentUser = null;
        this.notifyAuthListeners(null);
        return { success: true };
      }

      if (!this.auth) {
        throw new Error('Authentication not initialized');
      }

      await signOut(this.auth);
      return { success: true };

    } catch (error: any) {
      console.error('Sign out error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      if (this.isMockMode) {
        return { success: true, message: 'Password reset email sent (mock)' };
      }

      if (!this.auth) {
        throw new Error('Authentication not initialized');
      }

      await sendPasswordResetEmail(this.auth, email);
      return { success: true, message: 'Password reset email sent' };

    } catch (error: any) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // Get current user
  getCurrentUser(): FirebaseUser | null {
    return this.currentUser;
  }

  // Create user profile in Firestore
  private async createUserProfile(user: FirebaseUser, displayName: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.isMockMode) {
        return { success: true };
      }

      const userDoc: UserProfileData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currentWeek: 1,
        totalWorkouts: 0,
        totalHours: 0,
        currentStreak: 0,
        longestStreak: 0,
        completionRate: 0,
        profile: {
          age: null,
          weight: null,
          height: null,
          fitnessLevel: 'beginner',
          goals: []
        },
        preferences: {
          notifications: true,
          soundEnabled: true,
          hapticFeedback: true,
          darkMode: false,
          units: 'metric',
          language: 'en'
        }
      };

      await setDoc(doc(this.db!, 'users', user.uid), userDoc);
      return { success: true };

    } catch (error: any) {
      console.error('Error creating user profile:', error);
      return { success: false, error: error.message };
    }
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfileResponse> {
    try {
      if (this.isMockMode) {
        return {
          success: true,
          data: this.getMockUserProfile(userId)
        };
      }

      if (!this.db) {
        throw new Error('Firestore not initialized');
      }

      const docRef = doc(this.db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          success: true,
          data: docSnap.data()
        };
      } else {
        return {
          success: false,
          error: 'User profile not found'
        };
      }

    } catch (error: any) {
      console.error('Error getting user profile:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<UserProfileData>): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.isMockMode) {
        return { success: true };
      }

      if (!this.db) {
        throw new Error('Firestore not initialized');
      }

      const docRef = doc(this.db, 'users', userId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });

      return { success: true };

    } catch (error: any) {
      console.error('Error updating user profile:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Add auth state listener
  onAuthStateChanged(callback: AuthStateListener): () => void {
    this.authListeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.authListeners = this.authListeners.filter(listener => listener !== callback);
    };
  }

  // Notify all auth listeners
  private notifyAuthListeners(user: FirebaseUser | null): void {
    this.authListeners.forEach(callback => callback(user));
  }

  // Get user-friendly error messages
  private getErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'This email is already registered. Please use a different email or sign in.',
      'auth/invalid-email': 'Invalid email address. Please check and try again.',
      'auth/weak-password': 'Password is too weak. Please choose a stronger password (at least 6 characters).',
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password. Please try again or reset your password.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection and try again.'
    };

    return errorMessages[errorCode] || 'An error occurred. Please try again.';
  }

  // Mock authentication methods for development
  private mockSignUp(email: string, displayName: string): AuthResponse {
    const mockUser = {
      uid: `mock_${Date.now()}`,
      email: email,
      displayName: displayName
    };
    
    this.currentUser = mockUser as any;
    this.notifyAuthListeners(mockUser as any);
    
    return {
      success: true,
      user: mockUser
    };
  }

  private mockSignIn(email: string): AuthResponse {
    const mockUser = {
      uid: `mock_${Date.now()}`,
      email: email,
      displayName: email.split('@')[0]
    };
    
    this.currentUser = mockUser as any;
    this.notifyAuthListeners(mockUser as any);
    
    return {
      success: true,
      user: mockUser
    };
  }

  private getMockUserProfile(userId: string): UserProfileData {
    return {
      uid: userId,
      email: 'mock@example.com',
      displayName: 'Mock User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentWeek: 1,
      totalWorkouts: 0,
      totalHours: 0,
      currentStreak: 0,
      longestStreak: 0,
      completionRate: 0,
      profile: {
        age: 25,
        weight: 70,
        height: 175,
        fitnessLevel: 'beginner',
        goals: ['weight_loss', 'strength']
      },
      preferences: {
        notifications: true,
        soundEnabled: true,
        hapticFeedback: true,
        darkMode: false,
        units: 'metric',
        language: 'en'
      }
    };
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;