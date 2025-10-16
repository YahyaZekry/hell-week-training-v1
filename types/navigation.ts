import { ReactNode } from 'react';

// Main tab routes
export type MainTabParamList = {
  index: undefined;
  training: undefined;
  progress: undefined;
  nutrition: undefined;
};

// Training stack routes
export type TrainingStackParamList = {
  index: undefined;
  schedule: undefined;
  preparation: undefined;
  checklists: undefined;
};

// Hidden routes (accessible but not in tab bar)
export type HiddenRoutesParamList = {
  analytics: undefined;
  'exercise-form': undefined;
  mental: undefined;
  recovery: undefined;
  settings: undefined;
  'workout-history': undefined;
};

// Combined root param list
export type RootParamList = MainTabParamList & HiddenRoutesParamList;

// Navigation types
export interface NavigationRoute {
  name: keyof RootParamList;
  title: string;
  icon?: string;
  hidden?: boolean;
}

// Menu item types for home screen
export interface MenuItem {
  title: string;
  description: string;
  icon: string;
  route: string;
  params?: Record<string, any>;
}

// Training module types
export interface TrainingModule {
  title: string;
  description: string;
  icon: string;
  route: string;
  params?: Record<string, any>;
}

// Navigation error types
export interface NavigationError {
  route: string;
  error: string;
  timestamp: Date;
}

// Navigation state types
export interface NavigationState {
  currentRoute: string;
  previousRoute?: string;
  isLoading: boolean;
  error?: NavigationError;
}

// Navigation action types
export type NavigationAction =
  | { type: 'NAVIGATE'; payload: { route: string; params?: Record<string, any> } }
  | { type: 'GO_BACK' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: NavigationError | undefined };

// Theme-aware navigation options
export interface NavigationOptions {
  headerShown?: boolean;
  title?: string;
  headerTintColor?: string;
  headerStyle?: {
    backgroundColor?: string;
    borderBottomWidth?: number;
    borderBottomColor?: string;
  };
  tabBarButton?: () => ReactNode;
}