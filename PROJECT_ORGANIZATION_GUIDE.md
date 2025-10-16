# Project Organization Guide

## Overview

This guide establishes a clear, scalable file organization architecture for the Hell Week Training app to prevent technical debt and improve maintainability.

## Current State Issues

1. **Redundant Files**: Unused `CustomTabBar.tsx` component
2. **Mixed File Types**: Both JavaScript and TypeScript files in services directory
3. **Inconsistent Structure**: Mixed flat and nested routing patterns
4. **Documentation Gaps**: No clear naming conventions or organization standards

## Recommended Directory Structure

```
hell-week-training/
├── .expo/                    # Expo configuration
├── .husky/                   # Git hooks
├── .vscode/                  # VS Code settings
├── android/                  # Android-specific code
├── ios/                      # iOS-specific code
├── app/                      # Expo Router pages
│   ├── (tabs)/              # Tab-based navigation
│   │   ├── _layout.tsx      # Tab layout configuration
│   │   ├── index.tsx        # Home screen
│   │   ├── training.tsx     # Training hub
│   │   ├── progress.tsx     # Progress tracking
│   │   └── nutrition.tsx    # Nutrition tracking
│   ├── (modals)/            # Modal screens
│   │   ├── _layout.tsx      # Modal layout configuration
│   │   ├── analytics.tsx    # Analytics modal
│   │   ├── settings.tsx     # Settings modal
│   │   └── exercise-form.tsx # Exercise form modal
│   ├── training/            # Training section routes
│   │   ├── _layout.tsx      # Training stack layout
│   │   ├── index.tsx        # Training hub
│   │   ├── schedule.tsx     # Training schedule
│   │   ├── preparation.tsx  # Preparation guide
│   │   └── checklists.tsx   # Training checklists
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Home/redirect
├── components/              # Reusable UI components
│   ├── common/              # Generic components
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   ├── Button.styles.ts
│   │   │   └── Button.types.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   └── Modal/
│   ├── navigation/          # Navigation-specific components
│   │   ├── TabBar/
│   │   ├── Header/
│   │   └── NavigationErrorBoundary/
│   └── features/            # Feature-specific components
│       ├── workout/
│       ├── nutrition/
│       └── progress/
├── constants/               # App constants
│   ├── Colors.ts
│   ├── Typography.ts
│   ├── Dimensions.ts
│   ├── Routes.ts
│   └── index.ts             # Export all constants
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   ├── useStorage.ts
│   ├── useDebounce.ts
│   └── index.ts             # Export all hooks
├── services/               # Business logic and API calls
│   ├── api/                # External API integrations
│   │   ├── firebase.ts
│   │   └── analytics.ts
│   ├── storage/            # Local storage services
│   │   ├── secureStorage.ts
│   │   └── preferences.ts
│   ├── features/           # Feature-specific services
│   │   ├── authService.ts
│   │   ├── workoutService.ts
│   │   ├── nutritionService.ts
│   │   └── progressService.ts
│   ├── utils/              # Utility functions
│   │   ├── dateUtils.ts
│   │   ├── validationUtils.ts
│   │   └── formatUtils.ts
│   └── index.ts            # Export all services
├── types/                  # TypeScript type definitions
│   ├── navigation.ts       # Navigation types
│   ├── api.ts             # API response types
│   ├── user.ts            # User-related types
│   ├── workout.ts         # Workout-related types
│   └── index.ts           # Export all types
├── utils/                  # Pure utility functions
│   ├── helpers.ts          # General helper functions
│   ├── calculations.ts     # Mathematical utilities
│   └── validators.ts       # Validation functions
├── assets/                 # Static assets
│   ├── fonts/             # Custom fonts
│   ├── icons/             # App icons
│   ├── images/            # Images and illustrations
│   │   ├── onboarding/
│   │   ├── exercises/
│   │   └── ui/
│   └── animations/        # Animation files
├── scripts/               # Build and utility scripts
│   ├── reset-project.js
│   ├── build-icons.js
│   └── generate-types.js
├── docs/                  # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
├── tests/                 # Test files
│   ├── __mocks__/
│   ├── components/
│   ├── services/
│   └── utils/
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .gitignore            # Git ignore rules
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler configuration
└── README.md             # Project documentation
```

## File Naming Conventions

### General Rules

1. **Use PascalCase for components**: `UserProfile.tsx`, `WorkoutCard.tsx`
2. **Use camelCase for utilities**: `formatDate.ts`, `validateEmail.ts`
3. **Use kebab-case for directories**: `user-profile/`, `workout-tracker/`
4. **Use descriptive names**: `ExerciseFormService.ts` instead of `Service.ts`

### Component Organization

Each component should follow this structure:

```
ComponentName/
├── index.tsx              # Main component file
├── ComponentName.styles.ts # Styles
├── ComponentName.types.ts  # TypeScript types
├── ComponentName.test.tsx  # Tests
└── README.md              # Component documentation (if complex)
```

### Service Organization

Services should be organized by feature:

```
services/
├── auth/
│   ├── authService.ts
│   ├── authTypes.ts
│   └── authUtils.ts
├── workout/
│   ├── workoutService.ts
│   ├── workoutTypes.ts
│   └── workoutUtils.ts
└── nutrition/
    ├── nutritionService.ts
    ├── nutritionTypes.ts
    └── nutritionUtils.ts
```

## Route Organization

### Expo Router Best Practices

1. **Group related routes**: Use parentheses for route groups
2. **Modals in separate group**: Keep modal routes in `(modals)` directory
3. **Nested routing**: Use subdirectories for related routes
4. **Consistent naming**: Use kebab-case for route files

### Route Structure Examples

```
app/
├── (tabs)/                 # Main tab navigation
│   ├── _layout.tsx        # Tab configuration
│   ├── index.tsx          # / (home)
│   ├── training.tsx       # /training
│   ├── progress.tsx       # /progress
│   └── nutrition.tsx      # /nutrition
├── (modals)/              # Modal screens
│   ├── _layout.tsx        # Modal configuration
│   ├── settings.tsx       # /settings (modal)
│   ├── analytics.tsx      # /analytics (modal)
│   └── exercise-form.tsx  # /exercise-form (modal)
└── training/              # Training section
    ├── _layout.tsx        # Training stack
    ├── index.tsx          # /training (hub)
    ├── schedule.tsx       # /training/schedule
    ├── preparation.tsx    # /training/preparation
    └── checklists.tsx     # /training/checklists
```

## Import/Export Patterns

### Barrel Exports

Use `index.ts` files to export related modules:

```typescript
// constants/index.ts
export { default as Colors } from './Colors';
export { default as Typography } from './Typography';
export { default as Dimensions } from './Dimensions';

// services/index.ts
export { authService } from './features/authService';
export { workoutService } from './features/workoutService';
export { nutritionService } from './features/nutritionService';
```

### Import Organization

Follow this import order:

1. React and React Native imports
2. Third-party library imports
3. Internal imports (from @/ alias)
4. Relative imports
5. Type imports

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Typography } from '@/constants';
import { useAuth } from '@/hooks';
import { Button, Card } from '@/components/common';
import { WorkoutCard } from '@/components/features/workout';
import { WorkoutService } from '@/services';
import type { Workout } from '@/types';
```

## Asset Organization

### Image Structure

```
assets/images/
├── onboarding/            # Onboarding screens
│   ├── step-1.png
│   ├── step-2.png
│   └── step-3.png
├── exercises/             # Exercise illustrations
│   ├── push-up.png
│   ├── squat.png
│   └── plank.png
├── ui/                    # UI elements
│   ├── icons/
│   ├── backgrounds/
│   └── patterns/
└── placeholders/          # Placeholder images
    ├── workout.png
    └── profile.png
```

### Icon Management

```
assets/icons/
├── tab/                   # Tab bar icons
│   ├── home.svg
│   ├── training.svg
│   ├── progress.svg
│   └── nutrition.svg
├── actions/               # Action icons
│   ├── play.svg
│   ├── pause.svg
│   ├── stop.svg
│   └── refresh.svg
└── social/                # Social media icons
    ├── share.svg
    ├── like.svg
    └── comment.svg
```

## Cleanup Plan

### Phase 1: Remove Redundant Files

1. **Delete unused components**:
   - `components/CustomTabBar.tsx` (not imported anywhere)

2. **Convert remaining JavaScript files**:
   - `services/visualEffectsService.js` → `services/features/visualEffectsService.ts`
   - `services/workoutService.js` → `services/features/workoutService.ts`
   - `services/workoutTrackingService.js` → `services/features/workoutTrackingService.ts`

3. **Remove duplicate files**:
   - Check for duplicate functionality between `app/` and `screens/` directories
   - Consolidate similar components

### Phase 2: Reorganize Directory Structure

1. **Create new directory structure**:
   - Move components to appropriate subdirectories
   - Organize services by feature
   - Create barrel export files

2. **Update all imports**:
   - Fix import paths after reorganization
   - Use absolute imports with `@/` alias
   - Ensure consistent import order

3. **Add documentation**:
   - Create README files for complex directories
   - Document component APIs
   - Add architectural decision records

### Phase 3: Standardize Naming

1. **Rename files to follow conventions**:
   - Components: PascalCase
   - Services: camelCase with descriptive names
   - Utilities: camelCase with function purpose

2. **Update TypeScript types**:
   - Create comprehensive type definitions
   - Organize types by feature
   - Export types from central location

## Documentation Standards

### Component Documentation

Each complex component should include:

```typescript
/**
 * WorkoutCard Component
 * 
 * Displays workout information in a card format.
 * Used in the training hub and workout history screens.
 * 
 * @example
 * ```tsx
 * <WorkoutCard
 *   workout={workoutData}
 *   onPress={() => navigation.navigate('WorkoutDetails', { id: workoutData.id })}
 *   variant="default"
 * />
 * ```
 */
```

### Service Documentation

Each service should include:

```typescript
/**
 * Workout Service
 * 
 * Handles all workout-related operations including:
 * - Fetching workout data
 * - Tracking workout progress
 * - Managing workout schedules
 * - Calculating workout statistics
 */
```

## Migration Strategy

### Week 1: Assessment and Planning
1. Audit current file structure
2. Identify redundant files
3. Plan new directory structure
4. Create migration checklist

### Week 2: Cleanup and Reorganization
1. Remove unused files
2. Convert JavaScript to TypeScript
3. Reorganize directory structure
4. Update import paths

### Week 3: Documentation and Validation
1. Add documentation
2. Test all functionality
3. Update team documentation
4. Final validation

## Success Metrics

1. **Reduced File Count**: Eliminate redundant files
2. **Consistent Structure**: All files follow organization patterns
3. **Clear Naming**: File names clearly indicate purpose
4. **Complete Documentation**: All complex components documented
5. **Zero JavaScript Files**: All files converted to TypeScript

## Maintenance Guidelines

1. **Regular Audits**: Monthly review of file organization
2. **Documentation Updates**: Keep documentation in sync with code
3. **Team Training**: Ensure team understands organization patterns
4. **Automated Checks**: Add lint rules to enforce organization

## Next Steps

After implementing this organization guide:

1. Conduct team training on new structure
2. Update onboarding documentation
3. Add automated checks for organization compliance
4. Monitor and adjust based on team feedback