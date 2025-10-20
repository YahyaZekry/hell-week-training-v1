/**
 * Simple Background Component
 * Hell Week Training App
 * Direct background without complex theming
 */

import React from 'react';
import { View, StyleSheet, StatusBar, ImageBackground, Platform } from 'react-native';

interface SimpleBackgroundProps {
  children?: React.ReactNode;
}

export const SimpleBackground: React.FC<SimpleBackgroundProps> = ({
  children,
}) => {
  // Direct Android background fix
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      // Set status bar
      StatusBar.setBackgroundColor('#1a3d1a', true);
      StatusBar.setBarStyle('light-content', true);
    }
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/images/army_camouflage_blue_background.jpg')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1a3d1a" />
      <View style={styles.content}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a3d1a', // Direct dark green camouflage - required for Android background
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
});

export default SimpleBackground;