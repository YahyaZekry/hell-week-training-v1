/**
 * Simple Background Component
 * Hell Week Training App
 * Direct background without complex theming
 */

import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';

interface SimpleBackgroundProps {
  children?: React.ReactNode;
}

export const SimpleBackground: React.FC<SimpleBackgroundProps> = ({
  children,
}) => {
  // Direct Android background fix
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      // Set status bar to transparent to show background image
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setBarStyle('light-content', true);
      StatusBar.setTranslucent(true);
    }
  }, []);

  // Debug: Log when component renders
  console.warn('SimpleBackground rendering');

  return (
    <ImageBackground
      source={require('../../../assets/images/army_camouflage_blue_background.jpg')}
      style={styles.container}
      onLoad={() => console.warn('Background image loaded successfully')}
      onError={error => console.error('Error loading background image:', error)}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default SimpleBackground;
