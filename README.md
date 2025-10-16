# Navy SEAL Hell Week Training Mobile App

A comprehensive mobile application for Navy SEAL Hell Week preparation, featuring Firebase backend integration, mobile-specific capabilities, and AI-powered coaching through MCP services.

## 🎯 Project Overview

This mobile application transforms the traditional Navy SEAL Hell Week training program into an interactive, data-driven experience with real-time progress tracking, personalized coaching, and advanced mobile features.

### Key Features

- **🔐 Secure Authentication**: Firebase-based user authentication with session management
- **📊 Progress Tracking**: Real-time training progress visualization with interactive charts
- **📱 Mobile-Specific Features**: Push notifications, GPS tracking, offline capabilities
- **🤖 AI-Powered Coaching**: Voice commands, image recognition, personalized workout generation
- **☁️ Cloud Backend**: Firebase integration for data persistence and synchronization
- **🔒 Enterprise Security**: End-to-end encryption, GDPR/HIPAA compliance
- **📈 Analytics Dashboard**: Comprehensive training metrics and performance insights

## 🏗️ Architecture

### Frontend (React Native/Expo)
- **Navigation**: React Navigation with bottom tabs and stack navigators
- **State Management**: React hooks and context API
- **UI Components**: Custom components with consistent design system
- **Charts**: React Native Chart Kit for data visualization

### Backend (Firebase)
- **Authentication**: Firebase Auth with email/password
- **Database**: Firestore for real-time data synchronization
- **Storage**: Firebase Storage for media files
- **Analytics**: Firebase Analytics for user behavior tracking

### Mobile Services
- **Push Notifications**: Scheduled training reminders and alerts
- **Location Services**: GPS tracking for outdoor workouts
- **Offline Support**: Local storage and sync queue for offline functionality
- **Background Tasks**: Automatic data synchronization and reminders

### MCP Integration
- **Speech Recognition**: Voice commands for hands-free operation
- **Image Recognition**: Exercise form analysis and progress photo analysis
- **AI Coaching**: Conversational AI for personalized guidance

## 📁 Project Structure

```
hell-week-app/
├── app.json                  # Expo configuration
├── firebaseConfig.js         # Firebase configuration
├── package.json              # Dependencies and scripts
├── App.js                    # Main application component
├── screens/                  # Screen components
│   ├── AuthScreen.js         # Authentication screen
│   ├── DashboardScreen.js    # Progress dashboard
│   ├── ScheduleScreen.js     # Training schedule
│   ├── PreparationScreen.js  # Preparation program
│   ├── ChecklistsScreen.js   # Training checklists
│   ├── NutritionScreen.js    # Nutrition tracking
│   ├── RecoveryScreen.js     # Recovery guidance
│   ├── MentalToughnessScreen.js # Mental training
│   └── TodayScreen.js        # Today's training
├── services/                 # Service layer
│   ├── authService.js        # Authentication service
│   ├── dataService.js        # Data management service
│   ├── mobileFeaturesService.js # Mobile-specific features
│   └── mcpService.js         # MCP integration service
├── components/               # Reusable components
│   └── BreathingExerciseModal.js
├── data/                     # Static data
│   └── data.js               # Training data and content
├── assets/                   # Images, fonts, etc.
│   ├── images/
│   └── fonts/
└── docs/                     # Documentation
    ├── DEPLOYMENT_GUIDE.md   # Deployment instructions
    └── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Expo CLI (`npm install -g @expo/cli`)
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project with Authentication, Firestore, and Storage enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hell-week-training/hell-week-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   npx expo install
   ```

3. **Configure Firebase**
   ```bash
   firebase login
   firebase init
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase configuration
   ```

5. **Start development server**
   ```bash
   npx expo start
   ```

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create new project
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Set up Storage bucket

2. **Configure Security Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

3. **Update Configuration**
   - Edit [`firebaseConfig.js`](firebaseConfig.js:1) with your project details
   - Update environment variables in `.env`

## 📱 Features Overview

### Authentication System
- User registration and login
- Password reset functionality
- Session persistence
- Profile management

### Training Dashboard
- Real-time progress visualization
- Interactive charts for training metrics
- Week-by-week progress tracking
- Personal statistics and achievements

### Mobile-Specific Features
- **Push Notifications**: Training reminders, progress updates, motivational alerts
- **GPS Tracking**: Route tracking for outdoor workouts, weather-based recommendations
- **Offline Mode**: Download workouts for offline access, sync when online
- **Background Tasks**: Automatic data sync, scheduled reminders

### AI-Powered Coaching (MCP)
- **Voice Commands**: Hands-free workout control, verbal logging
- **Image Recognition**: Exercise form analysis, progress photo comparison
- **Conversational AI**: Personalized coaching, mental toughness training
- **Smart Workouts**: AI-generated personalized training plans

### Data Management
- Real-time synchronization across devices
- Offline data storage and sync
- Data export and backup
- Privacy-focused data handling

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run tests
npm test

# Build for production
npm run build

# Deploy Firebase services
npm run deploy:firebase
```

### Code Style

- ESLint configuration for consistent code style
- Prettier for code formatting
- TypeScript support for type safety
- Comprehensive error handling

### Testing

- Unit tests with Jest
- Integration tests for Firebase services
- End-to-end testing with Detox
- Manual testing checklists

## 📊 Data Structure

### User Profile
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  currentWeek: number,
  totalWorkouts: number,
  totalHours: number,
  currentStreak: number,
  longestStreak: number,
  completionRate: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Training Progress
```javascript
{
  userId: string,
  week: number,
  miles: number,
  swimHours: number,
  strengthSessions: number,
  mentalTrainingHours: number,
  completedAt: timestamp
}
```

### Workout Session
```javascript
{
  userId: string,
  type: string,
  duration: number,
  calories: number,
  exercises: array,
  date: timestamp,
  completed: boolean
}
```

## 🔒 Security

### Data Protection
- End-to-end encryption for sensitive data
- Firebase security rules for access control
- Secure authentication with Firebase Auth
- GDPR and privacy compliance

### Security Rules
- User-specific data access
- Authentication-based permissions
- Data validation and sanitization
- Audit logging and monitoring

## 📈 Performance

### Optimization Strategies
- Lazy loading for components
- Image optimization and caching
- Efficient database queries
- Background task management

### Monitoring
- Firebase Performance Monitoring
- Crash reporting with Crashlytics
- Custom analytics tracking
- Real-time performance metrics

## 🚀 Deployment

### Development Build
```bash
npx expo start --dev-client
```

### Production Build
```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
```

### Firebase Deployment
```bash
firebase deploy --only functions,firestore:rules,storage
```

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md:1).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Review Process
- Automated testing must pass
- Code style requirements met
- Security review for sensitive changes
- Performance impact assessment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](docs/API.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Troubleshooting Guide](docs/TROUBLESHOOTING.md)

### Community
- GitHub Issues for bug reports
- Discussions for feature requests
- Wiki for additional documentation

### Contact
- Development Team: dev@hellweek-training.com
- Support: support@hellweek-training.com

## 🎯 Roadmap

### Phase 1: Core Features ✅
- [x] Firebase integration
- [x] Authentication system
- [x] Dashboard with real-time data
- [x] Basic mobile features

### Phase 2: Advanced Features 🚧
- [ ] MCP integration completion
- [ ] Advanced analytics
- [ ] Community features
- [ ] Wearable integration

### Phase 3: Enhancement 📋
- [ ] AI coaching improvements
- [ ] Advanced offline capabilities
- [ ] Performance optimizations
- [ ] Additional training programs

## 🙏 Acknowledgments

- Navy SEAL training instructors for program guidance
- Firebase team for excellent backend services
- React Native community for framework support
- MVP development team for dedication and expertise

---

**Disclaimer**: This application is designed for educational and training purposes. Always consult with qualified professionals before beginning any intense training program. The developers are not responsible for injuries or health issues resulting from use of this application.
