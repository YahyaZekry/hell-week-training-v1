/**
 * Theme Transition Component
 * Hell Week Training App
 * Provides smooth animations during theme changes
 */

import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

import { useThemeEvents } from '../../hooks/useThemeEvents';

interface ThemeTransitionProps {
  children: React.ReactNode;
  animationType?: 'fade' | 'slide' | 'scale' | 'flip';
  duration?: number;
  enabled?: boolean;
}

export const ThemeTransition: React.FC<ThemeTransitionProps> = ({
  children,
  animationType = 'fade',
  duration = 300,
  enabled = true,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const { width: screenWidth } = Dimensions.get('window');

  // Listen to theme changes
  useThemeEvents({
    onThemeChange: () => {
      if (enabled) {
        performTransition();
      }
    },
  });

  const performTransition = () => {
    setIsTransitioning(true);

    // Reset animation values
    fadeAnim.setValue(1);
    slideAnim.setValue(0);
    scaleAnim.setValue(1);
    rotateAnim.setValue(0);

    // Create animation sequence based on type
    const animations: Animated.CompositeAnimation[] = [];

    switch (animationType) {
      case 'fade':
        animations.push(
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: duration / 2,
            useNativeDriver: true,
          })
        );
        break;

      case 'slide':
        animations.push(
          Animated.timing(slideAnim, {
            toValue: screenWidth,
            duration: duration / 2,
            useNativeDriver: true,
          })
        );
        break;

      case 'scale':
        animations.push(
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: duration / 2,
            useNativeDriver: true,
          })
        );
        break;

      case 'flip':
        animations.push(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: true,
          })
        );
        break;
    }

    // Execute first half of animation
    Animated.parallel(animations).start(() => {
      // Reset for second half
      switch (animationType) {
        case 'fade':
          fadeAnim.setValue(0);
          break;
        case 'slide':
          slideAnim.setValue(-screenWidth);
          break;
        case 'scale':
          scaleAnim.setValue(0.95);
          break;
        case 'flip':
          rotateAnim.setValue(1);
          break;
      }

      // Execute second half of animation
      const secondAnimations: Animated.CompositeAnimation[] = [];

      switch (animationType) {
        case 'fade':
          secondAnimations.push(
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: duration / 2,
              useNativeDriver: true,
            })
          );
          break;

        case 'slide':
          secondAnimations.push(
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: duration / 2,
              useNativeDriver: true,
            })
          );
          break;

        case 'scale':
          secondAnimations.push(
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: duration / 2,
              useNativeDriver: true,
            })
          );
          break;

        case 'flip':
          secondAnimations.push(
            Animated.timing(rotateAnim, {
              toValue: 0,
              duration: duration / 2,
              useNativeDriver: true,
            })
          );
          break;
      }

      Animated.parallel(secondAnimations).start(() => {
        setIsTransitioning(false);
      });
    });
  };

  // Get transform styles based on animation type
  const getTransformStyle = () => {
    const transforms: any[] = [];

    switch (animationType) {
      case 'slide':
        transforms.push({ translateX: slideAnim });
        break;
      case 'scale':
        transforms.push({ scale: scaleAnim });
        break;
      case 'flip':
        transforms.push({
          rotateY: rotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          }),
        });
        break;
    }

    return transforms;
  };

  // Get animated style
  const animatedStyle = {
    opacity: animationType === 'fade' ? fadeAnim : 1,
    transform: getTransformStyle(),
    backgroundColor: 'transparent',
  };

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      {/* Transition overlay */}
      {isTransitioning && (
        <Animated.View
          style={[
            styles.transitionOverlay,
            {
              backgroundColor: 'transparent',
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 0],
              }),
            },
          ]}
        />
      )}

      {/* Animated content */}
      <Animated.View style={[styles.content, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  transitionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: 'none',
  },
  content: {
    flex: 1,
  },
});

export default ThemeTransition;
