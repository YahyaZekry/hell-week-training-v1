// Firebase Configuration - Navy SEAL Hell Week Training App
// Replace these values with your actual Firebase project configuration

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
  // This will be called when the app starts
  console.log('Firebase initialization starting...');
  
  // Check if we have valid config
  if (firebaseConfig.apiKey === "your-api-key-here") {
    console.warn('Firebase configuration not updated. Please update firebaseConfig.js with your actual Firebase project credentials.');
    return false;
  }
  
  return true;
};

export default firebaseConfig;