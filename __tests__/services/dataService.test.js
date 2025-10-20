import dataService from '../../src/services/dataService';

// Mock Firebase Firestore
jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
      add: jest.fn(),
      where: jest.fn(() => ({
        where: jest.fn(() => ({
          orderBy: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn(),
            })),
            get: jest.fn(),
          })),
          limit: jest.fn(() => ({
            get: jest.fn(),
          })),
          get: jest.fn(),
        })),
        orderBy: jest.fn(() => ({
          limit: jest.fn(() => ({
            get: jest.fn(),
          })),
          get: jest.fn(),
        })),
        limit: jest.fn(() => ({
          get: jest.fn(),
        })),
        get: jest.fn(),
      })),
      orderBy: jest.fn(() => ({
        limit: jest.fn(() => ({
          get: jest.fn(),
        })),
        get: jest.fn(),
      })),
      limit: jest.fn(() => ({
        get: jest.fn(),
      })),
      get: jest.fn(),
    })),
    FieldValue: {
      serverTimestamp: jest.fn(() => 'mock-timestamp'),
    },
  }),
}));

describe('DataService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('User Profile Operations', () => {
    test('should have createUserProfile method', () => {
      expect(typeof dataService.createUserProfile).toBe('function');
    });

    test('should have getUserProfile method', () => {
      expect(typeof dataService.getUserProfile).toBe('function');
    });

    test('should have updateUserProfile method', () => {
      expect(typeof dataService.updateUserProfile).toBe('function');
    });
  });

  describe('Training Progress Operations', () => {
    test('should have saveTrainingProgress method', () => {
      expect(typeof dataService.saveTrainingProgress).toBe('function');
    });

    test('should have getTrainingProgress method', () => {
      expect(typeof dataService.getTrainingProgress).toBe('function');
    });

    test('should have getAllTrainingProgress method', () => {
      expect(typeof dataService.getAllTrainingProgress).toBe('function');
    });
  });

  describe('Generic Operations', () => {
    test('should have getDocument method', () => {
      expect(typeof dataService.getDocument).toBe('function');
    });

    test('should have saveDocument method', () => {
      expect(typeof dataService.saveDocument).toBe('function');
    });

    test('should have deleteDocument method', () => {
      expect(typeof dataService.deleteDocument).toBe('function');
    });

    test('should have queryCollection method', () => {
      expect(typeof dataService.queryCollection).toBe('function');
    });
  });
});