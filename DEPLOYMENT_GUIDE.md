# Navy SEAL Hell Week Mobile App - Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the Navy SEAL Hell Week Training mobile application with Firebase backend integration, mobile-specific features, and MCP services.

## Prerequisites

### Development Environment
- Node.js 16+ and npm
- React Native development environment
- Expo CLI (`npm install -g @expo/cli`)
- Firebase CLI (`npm install -g firebase-tools`)
- Git for version control

### Firebase Account
- Google Firebase account
- Firebase project created
- Authentication enabled (Email/Password)
- Firestore database created
- Storage bucket configured

### Mobile Development
- iOS: Xcode 14+ (for iOS development)
- Android: Android Studio with latest SDK
- Physical device or emulator/simulator for testing

## Installation Steps

### 1. Project Setup

```bash
# Clone the repository
git clone <repository-url>
cd hell-week-training/hell-week-app

# Install dependencies
npm install

# Install additional required packages
npm install @react-native-async-storage/async-storage
npm install @react-native-firebase/app
npm install @react-native-firebase/auth
npm install @react-native-firebase/firestore
npm install @react-native-firebase/storage
npm install @react-native-firebase/analytics
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npm install @react-navigation/native-stack
npm install react-native-screens
npm install react-native-safe-area-context
npm install react-native-chart-kit
npm install react-native-svg

# For Expo development
npx expo install
```

### 2. Firebase Configuration

```bash
# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init

# Deploy security rules
firebase deploy --only firestore:rules

# Deploy indexes (if using)
firebase deploy --only firestore:indexes
```

### 3. Environment Configuration

Create a `.env` file in the project root:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Development Environment
NODE_ENV=development
EXPO_PUBLIC_ENV=development

# MCP Configuration (if using)
MCP_SERVER_URL=your_mcp_server_url
MCP_API_KEY=your_mcp_api_key
```

### 4. Firebase Configuration Setup

Update [`firebaseConfig.js`](firebaseConfig.js:1) with your Firebase project details:

```javascript
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
```

## Testing Strategy

### Unit Testing

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react-native

# Run unit tests
npm test
```

### Integration Testing

```bash
# Run integration tests
npm run test:integration

# Test Firebase services
npm run test:firebase

# Test MCP integrations
npm run test:mcp
```

### End-to-End Testing

```bash
# Install E2E testing dependencies
npm install --save-dev detox

# Build for testing
npm run build:test

# Run E2E tests
npm run test:e2e
```

### Manual Testing Checklist

#### Authentication
- [ ] User registration with email/password
- [ ] User login with valid credentials
- [ ] Password reset functionality
- [ ] Session persistence
- [ ] Logout functionality

#### Dashboard
- [ ] User profile display
- [ ] Training progress visualization
- [ ] Week selection functionality
- [ ] Metric switching (miles, swim, strength, mental)
- [ ] Data synchronization with Firebase

#### Mobile Features
- [ ] Push notification permissions
- [ ] Location services permissions
- [ ] Offline mode functionality
- [ ] Background task scheduling
- [ ] Weather integration

#### MCP Services
- [ ] Speech recognition commands
- [ ] Image analysis for exercise form
- [ ] AI coaching interactions
- [ ] Personalized workout generation

## Deployment Process

### Development Deployment

```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run on physical device
npx expo start --device
```

### Production Build

#### iOS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build profile
eas build:configure

# Build for iOS App Store
eas build --platform ios --profile production

# Build for iOS TestFlight
eas build --platform ios --profile preview
```

#### Android Build

```bash
# Build for Android Play Store
eas build --platform android --profile production

# Build for Android Internal Testing
eas build --platform android --profile preview
```

### Firebase Deployment

```bash
# Deploy all Firebase services
firebase deploy

# Deploy specific services
firebase deploy --only functions
firebase deploy --only hosting
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## Post-Deployment Configuration

### App Store Configuration

#### iOS App Store
1. Configure app metadata in App Store Connect
2. Upload screenshots and app icon
3. Set pricing and availability
4. Configure in-app purchases (if applicable)
5. Submit for review

#### Google Play Store
1. Configure app listing in Google Play Console
2. Upload screenshots and promotional graphics
3. Set content rating and distribution
4. Configure pricing and distribution
5. Submit for review

### Firebase Configuration

1. **Authentication Settings**
   - Configure email/password providers
   - Set up email templates
   - Configure rate limits

2. **Firestore Rules**
   - Deploy security rules
   - Test rule permissions
   - Monitor rule performance

3. **Storage Configuration**
   - Set up security rules
   - Configure CORS settings
   - Monitor storage usage

4. **Analytics Setup**
   - Configure custom events
   - Set up conversion tracking
   - Configure audience segments

## Monitoring and Maintenance

### Performance Monitoring

```bash
# Install performance monitoring packages
npm install @react-native-firebase/perf
npm install @react-native-firebase/crashlytics

# Configure performance monitoring in app
```

### Analytics Tracking

- User engagement metrics
- Feature usage statistics
- Performance benchmarks
- Error tracking and reporting

### Backup Strategy

1. **Firebase Data Backup**
   - Automated daily backups
   - Point-in-time recovery
   - Cross-region replication

2. **Code Repository Backup**
   - Version control with Git
   - Branch protection rules
   - Automated deployment pipelines

### Security Monitoring

1. **Authentication Monitoring**
   - Failed login attempts
   - Suspicious activity detection
   - Session management

2. **Data Access Monitoring**
   - API usage patterns
   - Data access logs
   - Permission violations

## Troubleshooting

### Common Issues

#### Firebase Connection Issues
```javascript
// Check Firebase configuration
console.log('Firebase Config:', firebaseConfig);

// Test Firebase connection
import { getFirestore } from 'firebase/firestore';
const db = getFirestore();
console.log('Firestore connected:', db);
```

#### Build Failures
```bash
# Clear Expo cache
npx expo start --clear

# Reset node modules
rm -rf node_modules package-lock.json
npm install

# Clear Metro cache
npx expo start --reset-cache
```

#### Permission Issues
```javascript
// Check permissions in app
import { Permissions } from 'expo';

const checkPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  console.log('Notification permission:', status);
};
```

### Debugging Tools

1. **React Native Debugger**
   - Install React Native Debugger
   - Configure for remote debugging
   - Use for network inspection

2. **Firebase Console**
   - Real-time database monitoring
   - Performance analytics
   - Crash reporting

3. **Expo Dev Tools**
   - Component inspector
   - Performance profiler
   - Network debugger

## Security Considerations

### Data Protection
1. **Encryption**
   - Data in transit: HTTPS/TLS
   - Data at rest: Firebase encryption
   - Sensitive data: Additional encryption layers

2. **Access Control**
   - Role-based access control
   - Principle of least privilege
   - Regular permission audits

### Privacy Compliance
1. **GDPR Compliance**
   - Data portability
  . Right to deletion
   - Consent management

2. **HIPAA Compliance** (if applicable)
   - Protected health information
   - Audit logging
  . Business associate agreements

## Performance Optimization

### App Performance
1. **Code Splitting**
   - Lazy loading of components
   - Dynamic imports
   - Bundle size optimization

2. **Image Optimization**
   - Responsive images
   - Compression
   - CDN delivery

### Firebase Performance
1. **Database Optimization**
   - Index optimization
   - Query optimization
   - Caching strategies

2. **Storage Optimization**
   - File compression
   - Caching policies
   - CDN configuration

## Scaling Considerations

### Horizontal Scaling
1. **Load Balancing**
   - Firebase auto-scaling
   - CDN distribution
   - Geographic distribution

2. **Database Scaling**
   - Read replicas
   - Sharding strategy
   - Connection pooling

### Vertical Scaling
1. **Resource Allocation**
   - Memory optimization
   - CPU utilization
   - Storage capacity planning

## Conclusion

This deployment guide provides comprehensive instructions for deploying the Navy SEAL Hell Week Training mobile application. Follow these steps carefully to ensure a successful deployment and maintain optimal performance and security.

For additional support, refer to:
- Firebase documentation
- React Native documentation
- Expo documentation
- MCP service documentation