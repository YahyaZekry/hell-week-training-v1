import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  getFirestore,
  Firestore,
  DocumentData,
  CollectionReference,
  DocumentReference,
  Query,
  QuerySnapshot,
  DocumentSnapshot
} from 'firebase/firestore';

import { firebaseConfig } from '../firebaseConfig';

// Type definitions for data service responses
export interface DataServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UserProfile {
  id?: string;
  uid: string;
  email: string;
  displayName: string;
  createdAt?: any;
  updatedAt?: any;
  currentWeek?: number;
  totalWorkouts?: number;
  totalHours?: number;
  currentStreak?: number;
  longestStreak?: number;
  completionRate?: number;
  profile?: {
    age?: number | null;
    weight?: number | null;
    height?: number | null;
    fitnessLevel?: string;
    goals?: string[];
  };
  preferences?: {
    notifications?: boolean;
    units?: string;
    language?: string;
  };
}

export interface TrainingProgress {
  id?: string;
  userId: string;
  weekNumber: number;
  completedWorkouts?: number;
  totalWorkouts?: number;
  completedExercises?: number;
  totalExercises?: number;
  totalTime?: number;
  notes?: string;
  updatedAt?: any;
}

export interface ChecklistProgress {
  id?: string;
  userId: string;
  checklistType: string;
  completedItems?: string[];
  totalItems?: number;
  completedAt?: any;
  updatedAt?: any;
}

export interface WorkoutSession {
  id?: string;
  userId: string;
  workoutId: string;
  workoutName: string;
  duration: number;
  completedExercises: number;
  totalExercises: number;
  notes?: string;
  rating?: number;
  createdAt?: any;
}

export interface NutritionLog {
  id?: string;
  userId: string;
  date: string;
  meals?: {
    breakfast?: any[];
    lunch?: any[];
    dinner?: any[];
    snacks?: any[];
  };
  totalCalories?: number;
  totalProtein?: number;
  totalCarbs?: number;
  totalFat?: number;
  water?: number;
  notes?: string;
  updatedAt?: any;
}

export interface CommunityData {
  type: string;
  title: string;
  content: string;
  authorId?: string;
  authorName?: string;
  likes?: number;
  comments?: number;
  createdAt?: any;
}

// Collection names
interface Collections {
  users: string;
  trainingProgress: string;
  checklistProgress: string;
  workoutSessions: string;
  nutritionLogs: string;
  communityData: string;
}

class DataService {
  private db: Firestore;
  private readonly collections: Collections = {
    users: 'users',
    trainingProgress: 'trainingProgress',
    checklistProgress: 'checklistProgress',
    workoutSessions: 'workoutSessions',
    nutritionLogs: 'nutritionLogs',
    communityData: 'communityData'
  };

  constructor() {
    // Initialize Firestore
    this.db = getFirestore();
  }

  // User profile operations
  async createUserProfile(userId: string, userData: Partial<UserProfile>): Promise<DataServiceResponse<UserProfile>> {
    try {
      const userRef: DocumentReference = doc(this.db, this.collections.users, userId);
      const userDoc = {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(userRef, userDoc);
      return { success: true, data: userDoc as UserProfile };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getUserProfile(userId: string): Promise<DataServiceResponse<UserProfile>> {
    try {
      const userRef: DocumentReference = doc(this.db, this.collections.users, userId);
      const userDoc: DocumentSnapshot = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return { success: true, data: { id: userDoc.id, ...userDoc.data() } as UserProfile };
      } else {
        return { success: false, error: 'User profile not found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async updateUserProfile(userId: string, updateData: Partial<UserProfile>): Promise<DataServiceResponse> {
    try {
      const userRef: DocumentReference = doc(this.db, this.collections.users, userId);
      await updateDoc(userRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Training progress operations
  async saveTrainingProgress(userId: string, weekNumber: number, progressData: Partial<TrainingProgress>): Promise<DataServiceResponse<TrainingProgress>> {
    try {
      const docId = `${userId}_${weekNumber}`;
      const progressRef: DocumentReference = doc(this.db, this.collections.trainingProgress, docId);
      const progressDoc = {
        userId,
        weekNumber,
        ...progressData,
        updatedAt: serverTimestamp()
      };
      
      await setDoc(progressRef, progressDoc, { merge: true });
      return { success: true, data: progressDoc as TrainingProgress };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getTrainingProgress(userId: string, weekNumber: number): Promise<DataServiceResponse<TrainingProgress>> {
    try {
      const docId = `${userId}_${weekNumber}`;
      const progressRef: DocumentReference = doc(this.db, this.collections.trainingProgress, docId);
      const progressDoc: DocumentSnapshot = await getDoc(progressRef);
      
      if (progressDoc.exists()) {
        return { success: true, data: { id: progressDoc.id, ...progressDoc.data() } as TrainingProgress };
      } else {
        return { success: false, error: 'Training progress not found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getAllTrainingProgress(userId: string): Promise<DataServiceResponse<TrainingProgress[]>> {
    try {
      const q: Query = query(
        collection(this.db, this.collections.trainingProgress),
        where('userId', '==', userId),
        orderBy('weekNumber', 'asc')
      );
      const querySnapshot: QuerySnapshot = await getDocs(q);
      
      const progress: TrainingProgress[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as TrainingProgress));
      
      return { success: true, data: progress };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Checklist progress operations
  async saveChecklistProgress(userId: string, checklistType: string, progressData: Partial<ChecklistProgress>): Promise<DataServiceResponse<ChecklistProgress>> {
    try {
      const docId = `${userId}_${checklistType}`;
      const checklistRef: DocumentReference = doc(this.db, this.collections.checklistProgress, docId);
      const checklistDoc = {
        userId,
        checklistType,
        ...progressData,
        updatedAt: serverTimestamp()
      };
      
      await setDoc(checklistRef, checklistDoc, { merge: true });
      return { success: true, data: checklistDoc as ChecklistProgress };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getChecklistProgress(userId: string, checklistType: string): Promise<DataServiceResponse<ChecklistProgress>> {
    try {
      const docId = `${userId}_${checklistType}`;
      const checklistRef: DocumentReference = doc(this.db, this.collections.checklistProgress, docId);
      const checklistDoc: DocumentSnapshot = await getDoc(checklistRef);
      
      if (checklistDoc.exists()) {
        return { success: true, data: { id: checklistDoc.id, ...checklistDoc.data() } as ChecklistProgress };
      } else {
        return { success: false, error: 'Checklist progress not found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Workout session operations
  async saveWorkoutSession(sessionData: Omit<WorkoutSession, 'id' | 'createdAt'>): Promise<DataServiceResponse<WorkoutSession>> {
    try {
      const sessionRef: CollectionReference = collection(this.db, this.collections.workoutSessions);
      const sessionDoc = {
        ...sessionData,
        createdAt: serverTimestamp()
      };
      
      const docRef: DocumentReference = await addDoc(sessionRef, sessionDoc);
      return { success: true, data: { id: docRef.id, ...sessionDoc } as WorkoutSession };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getWorkoutSessions(userId: string, limitCount: number = 10): Promise<DataServiceResponse<WorkoutSession[]>> {
    try {
      const q: Query = query(
        collection(this.db, this.collections.workoutSessions),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const querySnapshot: QuerySnapshot = await getDocs(q);
      
      const sessions: WorkoutSession[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as WorkoutSession));
      
      return { success: true, data: sessions };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Nutrition log operations
  async saveNutritionLog(userId: string, date: string, nutritionData: Partial<NutritionLog>): Promise<DataServiceResponse<NutritionLog>> {
    try {
      const docId = `${userId}_${date}`;
      const nutritionRef: DocumentReference = doc(this.db, this.collections.nutritionLogs, docId);
      const nutritionDoc = {
        userId,
        date,
        ...nutritionData,
        updatedAt: serverTimestamp()
      };
      
      await setDoc(nutritionRef, nutritionDoc, { merge: true });
      return { success: true, data: nutritionDoc as NutritionLog };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getNutritionLog(userId: string, date: string): Promise<DataServiceResponse<NutritionLog>> {
    try {
      const docId = `${userId}_${date}`;
      const nutritionRef: DocumentReference = doc(this.db, this.collections.nutritionLogs, docId);
      const nutritionDoc: DocumentSnapshot = await getDoc(nutritionRef);
      
      if (nutritionDoc.exists()) {
        return { success: true, data: { id: nutritionDoc.id, ...nutritionDoc.data() } as NutritionLog };
      } else {
        return { success: false, error: 'Nutrition log not found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Community data operations
  async getCommunityData(type: string, limitCount: number = 20): Promise<DataServiceResponse<CommunityData[]>> {
    try {
      const q: Query = query(
        collection(this.db, this.collections.communityData),
        where('type', '==', type),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const querySnapshot: QuerySnapshot = await getDocs(q);
      
      const data: CommunityData[] = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          type: docData.type || '',
          title: docData.title || '',
          content: docData.content || '',
          authorId: docData.authorId,
          authorName: docData.authorName,
          likes: docData.likes,
          comments: docData.comments,
          createdAt: docData.createdAt
        } as CommunityData;
      });
      
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async saveCommunityData(data: Omit<CommunityData, 'id' | 'createdAt'>): Promise<DataServiceResponse<CommunityData>> {
    try {
      const communityRef: CollectionReference = collection(this.db, this.collections.communityData);
      const communityDoc = {
        ...data,
        createdAt: serverTimestamp()
      };
      
      const docRef: DocumentReference = await addDoc(communityRef, communityDoc);
      return { success: true, data: { id: docRef.id, ...communityDoc } as CommunityData };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Generic operations for additional functionality
  async getDocument(collectionName: string, documentId: string): Promise<DataServiceResponse<DocumentData>> {
    try {
      const docRef: DocumentReference = doc(this.db, collectionName, documentId);
      const docSnap: DocumentSnapshot = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
      } else {
        return { success: false, error: 'Document not found' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async saveDocument(collectionName: string, documentId: string, data: DocumentData): Promise<DataServiceResponse> {
    try {
      const docRef: DocumentReference = doc(this.db, collectionName, documentId);
      await setDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async queryCollection(
    collectionName: string,
    constraints: {
      field: string;
      operator: '==' | '!=' | '>' | '>=' | '<' | '<=' | 'array-contains' | 'in' | 'array-contains-any';
      value: any;
    }[],
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
    limitCount?: number
  ): Promise<DataServiceResponse<DocumentData[]>> {
    try {
      let q: Query = collection(this.db, collectionName);
      
      // Add where constraints
      constraints.forEach(constraint => {
        q = query(q, where(constraint.field, constraint.operator, constraint.value));
      });
      
      // Add ordering if specified
      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection));
      }
      
      // Add limit if specified
      if (limitCount) {
        q = query(q, limit(limitCount));
      }
      
      const querySnapshot: QuerySnapshot = await getDocs(q);
      const data: DocumentData[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deleteDocument(collectionName: string, documentId: string): Promise<DataServiceResponse> {
    try {
      const docRef: DocumentReference = doc(this.db, collectionName, documentId);
      await deleteDoc(docRef);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
const dataService = new DataService();
export default dataService;