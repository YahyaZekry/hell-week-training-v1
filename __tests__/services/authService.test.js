import authService from '../../src/services/authService';

// Mock Firebase modules
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    onAuthStateChanged: jest.fn(),
    currentUser: null,
  }),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
      })),
    })),
  }),
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    authService.cleanup();
  });

  describe('initializeAuth', () => {
    test('should initialize authentication successfully', async () => {
      const result = await authService.initializeAuth();
      expect(result).toBe(true);
    });
  });

  describe('getCurrentUser', () => {
    test('should return null when no current user', () => {
      const auth = require('@react-native-firebase/auth').default();
      auth.currentUser = null;

      const user = authService.getCurrentUser();
      expect(user).toBeNull();
    });
  });

  describe('onAuthStateChanged', () => {
    test('should add and remove auth state listeners', () => {
      const callback = jest.fn();
      const unsubscribe = authService.onAuthStateChanged(callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      unsubscribe();
    });
  });

  describe('cleanup', () => {
    test('should cleanup without errors', () => {
      expect(() => authService.cleanup()).not.toThrow();
    });
  });
});