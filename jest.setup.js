// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        firebaseApiKey: 'test-api-key',
      },
    },
  },
}));

// Mock expo-linking
jest.mock('expo-linking', () => ({
  createURL: jest.fn((path) => `myapp:///${path}`),
  openURL: jest.fn(),
}));

// Mock Firebase Auth
jest.mock('@react-native-firebase/auth', () => {
  const auth = {
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    onAuthStateChanged: jest.fn(),
    currentUser: null,
  };
  return {
    __esModule: true,
    default: () => auth,
  };
});

// Mock Firebase Firestore
jest.mock('@react-native-firebase/firestore', () => {
  const firestore = {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
      add: jest.fn(),
      where: jest.fn(() => firestore.collection()),
      orderBy: jest.fn(() => firestore.collection()),
      limit: jest.fn(() => firestore.collection()),
      get: jest.fn(),
    })),
    FieldValue: {
      serverTimestamp: jest.fn(() => 'mock-timestamp'),
    },
  };
  return {
    __esModule: true,
    default: () => firestore,
  };
});