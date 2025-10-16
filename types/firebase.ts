// Firebase types for Hell Week Training App

import { User, Workout, WorkoutSession, NutritionEntry, Progress, RecoveryActivity, MentalFitnessSession, Checklist, Schedule, Analytics, Settings as UserSettings } from './index';

// Basic Firebase type definitions
export type WhereFilterOp = '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
export type OrderByDirection = 'asc' | 'desc';

// Firebase Document Data
export interface DocumentData {
  [key: string]: any;
}

// Firebase Set Options
export interface SetOptions {
  merge?: boolean;
  mergeFields?: string[];
}

// Firebase Document Types
export interface DocumentSnapshot {
  id: string;
  exists: boolean;
  metadata: {
    hasPendingWrites: boolean;
    fromCache: boolean;
  };
  ref: DocumentReference;
  data(): DocumentData | undefined;
  get(fieldPath: string): any;
}

export interface QueryDocumentSnapshot extends DocumentSnapshot {
  data(): DocumentData;
}

export interface QuerySnapshot {
  docs: QueryDocumentSnapshot[];
  empty: boolean;
  metadata: {
    hasPendingWrites: boolean;
    fromCache: boolean;
  };
  query: Query;
  size: number;
  docChanges: DocumentChange[];
}

export interface DocumentChange {
  type: 'added' | 'modified' | 'removed';
  doc: QueryDocumentSnapshot;
  oldIndex: number;
  newIndex: number;
}

// Firebase Query Types
export interface Query {
  where(fieldPath: string, opStr: WhereFilterOp, value: any): Query;
  orderBy(fieldPath: string, directionStr?: OrderByDirection): Query;
  limit(limit: number): Query;
  limitToLast(limitToLast: number): Query;
  startAt(snapshot: DocumentSnapshot): Query;
  startAfter(snapshot: DocumentSnapshot): Query;
  endBefore(snapshot: DocumentSnapshot): Query;
  endAt(snapshot: DocumentSnapshot): Query;
  get(): Promise<QuerySnapshot>;
  onSnapshot(
    onNext: (snapshot: QuerySnapshot) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
}

export interface DocumentReference {
  id: string;
  path: string;
  parent: CollectionReference | null;
  firestore: FirebaseFirestore;

  collection(collectionPath: string): CollectionReference;
  doc(documentPath?: string): DocumentReference;
  set(data: DocumentData, options?: SetOptions): Promise<void>;
  update(data: DocumentData): Promise<void>;
  delete(): Promise<void>;
  get(): Promise<DocumentSnapshot>;
  onSnapshot(
    onNext: (snapshot: DocumentSnapshot) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
}

export interface CollectionReference {
  id: string;
  path: string;
  parent: DocumentReference | null;
  firestore: FirebaseFirestore;

  doc(documentPath?: string): DocumentReference;
  add(data: DocumentData): Promise<DocumentReference>;
  where(fieldPath: string, opStr: WhereFilterOp, value: any): Query;
  orderBy(fieldPath: string, directionStr?: OrderByDirection): Query;
  limit(limit: number): Query;
  limitToLast(limitToLast: number): Query;
  startAt(snapshot: DocumentSnapshot): Query;
  startAfter(snapshot: DocumentSnapshot): Query;
  endBefore(snapshot: DocumentSnapshot): Query;
  endAt(snapshot: DocumentSnapshot): Query;
  get(): Promise<QuerySnapshot>;
  onSnapshot(
    onNext: (snapshot: QuerySnapshot) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
}

// Firebase Batch and Transaction Types
export interface WriteBatch {
  set(documentRef: DocumentReference, data: DocumentData, options?: SetOptions): WriteBatch;
  update(documentRef: DocumentReference, data: DocumentData): WriteBatch;
  delete(documentRef: DocumentReference): WriteBatch;
  commit(): Promise<void>;
}

export interface Transaction {
  get(documentRef: DocumentReference): Promise<DocumentSnapshot>;
  set(documentRef: DocumentReference, data: DocumentData, options?: SetOptions): Transaction;
  update(documentRef: DocumentReference, data: DocumentData): Transaction;
  delete(documentRef: DocumentReference): Transaction;
}

export interface PersistenceSettings {
  forceOwnership?: boolean;
}

export interface FirestoreSettings {
  cacheSizeBytes?: number;
  host?: string;
  ssl?: boolean;
  timestampsInSnapshots?: boolean;
}

// Firebase Firestore Interface
export interface FirebaseFirestore {
  batch(): WriteBatch;
  collection(collectionPath: string): CollectionReference;
  doc(documentPath: string): DocumentReference;
  enableNetwork(): Promise<void>;
  disableNetwork(): Promise<void>;
  enablePersistence(settings?: PersistenceSettings): Promise<void>;
  clearPersistence(): Promise<void>;
  waitForPendingWrites(): Promise<void>;
  runTransaction<T>(updateFunction: (transaction: Transaction) => Promise<T>): Promise<T>;
  settings(settings: FirestoreSettings): void;
}

// Firebase Auth Types
export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
  providerData: {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    providerId: string;
  }[];
  refreshToken: string;
  tenantId: string | null;
}

export interface FirebaseAuthError {
  code: string;
  message: string;
  email?: string;
  credential?: any;
  fullName?: string;
  phoneNumber?: string;
  tenantId?: string;
}

export interface AuthCredential {
  providerId: string;
  signInMethod: string;
  token?: string;
  secret?: string;
}

// Firestore Document Types (simplified)
export interface FirestoreDocument {
  id: string;
  exists: boolean;
  metadata: {
    hasPendingWrites: boolean;
    fromCache: boolean;
  };
  ref: DocumentReference;
}

export interface FirestoreSnapshot<T> {
  docs: FirestoreDocument[];
  empty: boolean;
  metadata: {
    hasPendingWrites: boolean;
    fromCache: boolean;
  };
  query: Query;
  size: number;
  docChanges: FirestoreDocumentChange[];
}

export interface FirestoreDocumentChange {
  type: 'added' | 'modified' | 'removed';
  doc: FirestoreDocument;
  oldIndex: number;
  newIndex: number;
}

export interface FirestoreQuery {
  where(fieldPath: string, opStr: WhereFilterOp, value: any): Query;
  orderBy(fieldPath: string, directionStr?: OrderByDirection): Query;
  limit(limit: number): Query;
  limitToLast(limitToLast: number): Query;
  startAt(snapshot: DocumentSnapshot): Query;
  startAfter(snapshot: DocumentSnapshot): Query;
  endBefore(snapshot: DocumentSnapshot): Query;
  endAt(snapshot: DocumentSnapshot): Query;
  get(): Promise<QuerySnapshot>;
  onSnapshot(
    onNext: (snapshot: QuerySnapshot) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
}

export interface FirestoreDocumentReference {
  id: string;
  path: string;
  parent: CollectionReference | null;
  firestore: FirebaseFirestore;

  collection(collectionPath: string): CollectionReference;
  doc(documentPath?: string): DocumentReference;
  set(data: any, options?: SetOptions): Promise<void>;
  update(data: any): Promise<void>;
  delete(): Promise<void>;
  get(): Promise<DocumentSnapshot>;
  onSnapshot(
    onNext: (snapshot: DocumentSnapshot) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
}

export interface FirestoreCollectionReference {
  id: string;
  path: string;
  parent: DocumentReference | null;
  firestore: FirebaseFirestore;

  doc(documentPath?: string): DocumentReference;
  add(data: any): Promise<DocumentReference>;
  where(fieldPath: string, opStr: WhereFilterOp, value: any): Query;
  orderBy(fieldPath: string, directionStr?: OrderByDirection): Query;
  limit(limit: number): Query;
  limitToLast(limitToLast: number): Query;
  startAt(snapshot: DocumentSnapshot): Query;
  startAfter(snapshot: DocumentSnapshot): Query;
  endBefore(snapshot: DocumentSnapshot): Query;
  endAt(snapshot: DocumentSnapshot): Query;
  get(): Promise<QuerySnapshot>;
  onSnapshot(
    onNext: (snapshot: QuerySnapshot) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
}

// Firebase Storage Types
export interface FirebaseStorageReference {
  bucket: string;
  fullPath: string;
  name: string;
  parent: FirebaseStorageReference | null;
  root: FirebaseStorageReference;
  storage: FirebaseStorage;

  child(path: string): FirebaseStorageReference;
  delete(): Promise<void>;
  getDownloadURL(): Promise<string>;
  getMetadata(): Promise<FullMetadata>;
  updateMetadata(metadata: SettableMetadata): Promise<FullMetadata>;
  put(data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata): UploadTask;
  putString(data: string, format?: string, metadata?: UploadMetadata): UploadTask;
  putFile(file: string, metadata?: UploadMetadata): UploadTask;
}

export interface UploadTask {
  snapshot: UploadTaskSnapshot;
  cancel(): boolean;
  catch(onRejected: (error: any) => any): Promise<any>;
  then(
    onFulfilled?: (snapshot: UploadTaskSnapshot) => any,
    onRejected?: (error: any) => any
  ): Promise<any>;
  on(
    event: 'state_changed',
    nextOrObserver?: {
      next?: (snapshot: UploadTaskSnapshot) => void;
      error?: (error: any) => void;
      complete?: () => void;
    },
    error?: (error: any) => void,
    complete?: () => void
  ): () => void;
}

export interface UploadTaskSnapshot {
  bytesTransferred: number;
  metadata: FullMetadata;
  ref: FirebaseStorageReference;
  state: 'running' | 'paused' | 'success' | 'canceled' | 'error';
  task: UploadTask;
  totalBytes: number;
}

export interface FullMetadata {
  bucket: string;
  cacheControl: string | null;
  contentDisposition: string | null;
  contentEncoding: string | null;
  contentLanguage: string | null;
  contentType: string | null;
  customMetadata: { [key: string]: string } | null;
  fullPath: string;
  generation: string;
  md5Hash: string | null;
  metadataGeneration: string;
  metageneration: string;
  name: string;
  size: number;
  timeCreated: string;
  updated: string;
}

export interface SettableMetadata {
  cacheControl?: string | null;
  contentDisposition?: string | null;
  contentEncoding?: string | null;
  contentLanguage?: string | null;
  contentType?: string | null;
  customMetadata?: { [key: string]: string } | null;
}

export interface UploadMetadata extends SettableMetadata {
  md5Hash?: string | null;
}

// Firebase Analytics Types
export interface FirebaseAnalytics {
  logEvent(name: string, properties?: { [key: string]: any }): void;
  setAnalyticsCollectionEnabled(enabled: boolean): void;
  setUserId(id: string | null): void;
  setUserProperty(name: string, value: string | null): void;
  setUserProperties(properties: { [key: string]: string | null }): void;
}

// Firebase Performance Types
export interface FirebasePerformance {
  newTrace(traceName: string): PerformanceTrace;
  newHttpMetric(url: string, httpMethod: string): HttpMetric;
  isPerformanceCollectionEnabled: boolean;
  setPerformanceCollectionEnabled(enabled: boolean): void;
}

export interface PerformanceTrace {
  start(): void;
  stop(): void;
  putMetric(metricName: string, value: number): void;
  incrementMetric(metricName: string, incrementBy: number): void;
  getMetric(metricName: string): number;
  getAttributes(): { [key: string]: string };
  putAttribute(attribute: string, value: string): void;
  removeAttribute(attribute: string): void;
}

export interface HttpMetric {
  start(): void;
  stop(): void;
  setHttpResponseCode(code: number): void;
  setRequestPayloadSize(bytes: number): void;
  setResponsePayloadSize(bytes: number): void;
  setResponseContentType(type: string): void;
  putAttribute(attribute: string, value: string): void;
  removeAttribute(attribute: string): void;
}

// Firebase Remote Config Types
export interface FirebaseRemoteConfig {
  fetch(): Promise<void>;
  fetchAndActivate(): Promise<boolean>;
  activate(): Promise<boolean>;
  ensureInitialized(): Promise<void>;
  getAll(): { [key: string]: RemoteConfigValue };
  getBoolean(key: string): boolean;
  getNumber(key: string): number;
  getString(key: string): string;
  getValue(key: string): RemoteConfigValue;
  setDefaults(defaults: { [key: string]: string | number | boolean }): void;
  setConfigSettings(settings: RemoteConfigSettings): void;
  onConfigUpdated(listener: () => void): () => void;
}

export interface RemoteConfigValue {
  source: 'remote' | 'default' | 'static';
  value(): string;
  asBoolean(): boolean;
  asNumber(): number;
}

export interface RemoteConfigSettings {
  fetchTimeoutMillis?: number;
  minimumFetchIntervalMillis?: number;
}

// Firebase Crashlytics Types
export interface FirebaseCrashlytics {
  crash(): void;
  log(message: string): void;
  setUserId(userId: string): void;
  setUserIdentifier(identifier: string): void;
  setUserName(name: string): void;
  setUserEmail(email: string): void;
  setCustomKey(key: string, value: string | number | boolean): void;
  setAttributes(attributes: { [key: string]: string }): void;
  recordError(error: Error): void;
  didCrashDuringPreviousExecution(): Promise<boolean>;
  sendUnsentReports(): Promise<void>;
  deleteUnsentReports(): Promise<void>;
}

// Firebase App Types
export interface FirebaseApp {
  name: string;
  options: FirebaseAppOptions;
  automaticDataCollectionEnabled: boolean;
  analytics(): FirebaseAnalytics;
  auth(): FirebaseAuth;
  firestore(): FirebaseFirestore;
  storage(): FirebaseStorage;
  performance(): FirebasePerformance;
  remoteConfig(): FirebaseRemoteConfig;
  crashlytics(): FirebaseCrashlytics;
  delete(): Promise<void>;
}

export interface FirebaseAppOptions {
  apiKey: string;
  authDomain?: string;
  databaseURL?: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  measurementId?: string;
}

// Firebase Auth Interface
export interface FirebaseAuth {
  currentUser: FirebaseUser | null;
  languageCode: string;
  tenantId: string | null;
  
  applyActionCode(code: string): Promise<void>;
  checkActionCode(code: string): Promise<ActionCodeInfo>;
  confirmPasswordReset(code: string, newPassword: string): Promise<void>;
  createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential>;
  fetchSignInMethodsForEmail(email: string): Promise<string[]>;
  getRedirectResult(): Promise<UserCredential>;
  isSignInWithEmailLink(emailLink: string): boolean;
  onAuthStateChanged(
    nextOrObserver: (user: FirebaseUser | null) => void,
    error?: (error: FirebaseAuthError) => void,
    completed?: () => void
  ): () => void;
  onIdTokenChanged(
    nextOrObserver: (user: FirebaseUser | null) => void,
    error?: (error: FirebaseAuthError) => void,
    completed?: () => void
  ): () => void;
  sendPasswordResetEmail(email: string): Promise<void>;
  sendSignInLinkToEmail(email: string, actionCodeSettings: ActionCodeSettings): Promise<void>;
  setLanguageCode(languageCode: string): void;
  setPersistence(persistence: string): Promise<void>;
  setTenantId(tenantId: string): void;
  signInAndRetrieveDataWithCredential(credential: AuthCredential): Promise<UserCredential>;
  signInAnonymously(): Promise<UserCredential>;
  signInWithCredential(credential: AuthCredential): Promise<UserCredential>;
  signInWithCustomToken(token: string): Promise<UserCredential>;
  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential>;
  signInWithEmailLink(email: string, emailLink: string): Promise<UserCredential>;
  signInWithPhoneNumber(phoneNumber: string, applicationVerifier: ApplicationVerifier): Promise<ConfirmationResult>;
  signInWithRedirect(provider: AuthProvider): Promise<void>;
  signOut(): Promise<void>;
  updateCurrentUser(user: FirebaseUser | null): Promise<void>;
  verifyPasswordResetCode(code: string): Promise<string>;
}

export interface UserCredential {
  user: FirebaseUser;
  credential: AuthCredential | null;
  operationType?: string;
  additionalUserInfo?: AdditionalUserInfo;
}

export interface AdditionalUserInfo {
  isNewUser: boolean;
  profile?: { [key: string]: any };
  providerId: string;
  username?: string;
}

export interface ActionCodeInfo {
  data: {
    email?: string;
    fromEmail?: string;
  };
  operation: 'PASSWORD_RESET' | 'VERIFY_EMAIL' | 'RECOVER_EMAIL' | 'EMAIL_SIGNIN' | 'VERIFY_AND_CHANGE_EMAIL' | 'REVERT_SECOND_FACTOR_ADDITION';
}

export interface ActionCodeSettings {
  url: string;
  iOS?: {
    bundleId: string;
  };
  android?: {
    packageName: string;
    installApp?: boolean;
    minimumVersion?: string;
  };
  handleCodeInApp?: boolean;
  dynamicLinkDomain?: string;
}

export interface ApplicationVerifier {
  verify(): Promise<string>;
  type: string;
}

export interface ConfirmationResult {
  verificationId: string;
  confirm(verificationCode: string): Promise<UserCredential>;
}

export interface AuthProvider {
  providerId: string;
  addScope(scope: string): AuthProvider;
  setCustomParameters(customOAuthParameters: { [key: string]: string }): AuthProvider;
}

// Firebase Storage Interface
export interface FirebaseStorage {
  maxOperationRetryTime: number;
  maxUploadRetryTime: number;
  ref(path?: string): FirebaseStorageReference;
  refFromURL(url: string): FirebaseStorageReference;
  setMaxOperationRetryTime(time: number): void;
  setMaxUploadRetryTime(time: number): void;
}

// Firebase Error Types
export interface FirebaseError extends Error {
  code: string;
  name: string;
  message: string;
  stack?: string;
}

// Firebase Service Types
export interface FirebaseServices {
  auth: FirebaseAuth;
  firestore: FirebaseFirestore;
  storage: FirebaseStorage;
  analytics: FirebaseAnalytics;
  performance: FirebasePerformance;
  remoteConfig: FirebaseRemoteConfig;
  crashlytics: FirebaseCrashlytics;
}

// Firebase Configuration Types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// Firebase Collection Names
export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
  WORKOUTS: 'workouts',
  WORKOUT_SESSIONS: 'workoutSessions',
  NUTRITION_ENTRIES: 'nutritionEntries',
  PROGRESS: 'progress',
  RECOVERY_ACTIVITIES: 'recoveryActivities',
  MENTAL_FITNESS_SESSIONS: 'mentalFitnessSessions',
  CHECKLISTS: 'checklists',
  SCHEDULES: 'schedules',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
  ACHIEVEMENTS: 'achievements',
  PERSONAL_RECORDS: 'personalRecords'
} as const;

// Firebase Document Converters
export interface FirestoreConverter<T> {
  toFirestore(data: T): DocumentData;
  fromFirestore(snapshot: QueryDocumentSnapshot): T;
}

// Default converters for our types
export const userConverter: FirestoreConverter<User> = {
  toFirestore(user: User): DocumentData {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      preferences: user.preferences
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const data = snapshot.data();
    return {
      id: data.id,
      email: data.email,
      displayName: data.displayName,
      photoURL: data.photoURL,
      createdAt: data.createdAt.toDate(),
      lastLoginAt: data.lastLoginAt.toDate(),
      preferences: data.preferences
    };
  }
};

export const workoutConverter: FirestoreConverter<Workout> = {
  toFirestore(workout: Workout): DocumentData {
    return {
      id: workout.id,
      name: workout.name,
      description: workout.description,
      duration: workout.duration,
      difficulty: workout.difficulty,
      category: workout.category,
      exercises: workout.exercises,
      completed: workout.completed,
      completedAt: workout.completedAt,
      userId: workout.userId,
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Workout {
    const data = snapshot.data();
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      duration: data.duration,
      difficulty: data.difficulty,
      category: data.category,
      exercises: data.exercises,
      completed: data.completed,
      completedAt: data.completedAt?.toDate(),
      userId: data.userId,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  }
};