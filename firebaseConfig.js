// Firebase Configuration - Navy SEAL Hell Week Training App
// React Native Firebase (Expo Compatible) Configuration
// Replace these values with your actual Firebase project configuration

import { getApps, initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

export const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Firebase project initialization function
export const initializeFirebase = () => {
  // Check if we have valid config
  if (firebaseConfig.apiKey === "your-api-key-here") {
    console.warn('Firebase configuration not updated. Please update firebaseConfig.js with your actual Firebase project credentials.');
    return null;
  }
  
  // Check if Firebase is already initialized
  if (getApps().length > 0) {
    return getApps()[0];
  }
  
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    return app;
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    return null;
  }
};

// Export Firebase services for use throughout the app
export { auth, firestore, functions, storage };

// Helper function to get current user
export const getCurrentUser = () => {
  return auth().currentUser;
};

// Helper function to get auth state changes
export const onAuthStateChanged = (callback) => {
  return auth().onAuthStateChanged(callback);
};

export default firebaseConfig;