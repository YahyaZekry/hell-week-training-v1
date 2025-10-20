/**
 * Theme Selector Component
 * Hell Week Training App
 * Comprehensive theme selection interface
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '../../providers/ThemeProvider';
import { themes, themeMetadata, themePreviewColors, ThemeName } from '../../theme';

import { ThemedText, ThemedCard, ThemedButton } from '.';

interface ThemeOption {
  name: ThemeName;
  displayName: string;
  description: string;
  category: string;
  preview: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
  };
}

const ThemeSelector: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { theme, themeName, setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Group themes by category
  const themeGroups = React.useMemo(() => {
    const groups: Record<string, ThemeOption[]> = {
      all: [],
      military: [],
      tactical: [],
      stealth: [],
      desert: [],
      forest: [],
    };

    Object.entries(themes).forEach(([name, _themeData]) => {
      const metadata = themeMetadata[name as ThemeName];
      const preview = themePreviewColors[name as ThemeName];
      
      // Convert array format to object format
      const previewObject = {
        primary: preview[0],
        secondary: preview[1],
        background: preview[2],
        surface: preview[3],
        text: preview[2], // Use background as text color for now
      };
      
      const option: ThemeOption = {
        name: name as ThemeName,
        displayName: metadata.name,
        description: metadata.description,
        category: metadata.category,
        preview: previewObject,
      };

      groups.all.push(option);
      if (groups[metadata.category]) {
        groups[metadata.category].push(option);
      }
    });

    return groups;
  }, []);

  const currentThemes = selectedCategory === 'all' 
    ? themeGroups.all 
    : themeGroups[selectedCategory] || [];

  const handleThemeSelect = async (themeName: ThemeName) => {
    await setTheme(themeName);
    if (onClose) {
      onClose();
    }
  };

  const categories = [
    { key: 'all', label: 'All Themes', icon: '🎨' },
    { key: 'military', label: 'Military', icon: '⚓' },
    { key: 'tactical', label: 'Tactical', icon: '🎯' },
    { key: 'stealth', label: 'Stealth', icon: '🥷' },
    { key: 'desert', label: 'Desert', icon: '🏜️' },
    { key: 'forest', label: 'Forest', icon: '🌲' },
  ];


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border.light }]}>
        {/* eslint-disable-next-line react-native/no-raw-text */}
        <ThemedText variant="heading2" style={styles.title}>
          Choose Theme
        </ThemedText>
        {/* eslint-disable-next-line react-native/no-raw-text */}
        <ThemedText variant="body" color="secondary" style={styles.subtitle}>
          Select a theme to customize your app experience
        </ThemedText>
      </View>

      {/* Category Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.categoryScroll, { borderBottomColor: theme.colors.border.light }]}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => (
          <ThemedButton
            key={category.key}
            variant={selectedCategory === category.key ? 'primary' : 'secondary'}
            size="small"
            onPress={() => setSelectedCategory(category.key)}
            style={styles.categoryButton}
          >
            {category.icon + ' ' + category.label}
          </ThemedButton>
        ))}
      </ScrollView>

      {/* Theme Options */}
      <ScrollView 
        style={styles.themeScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.themeContainer}
      >
        {currentThemes.map((themeOption) => {
          const isSelected = themeName === themeOption.name;
          
          return (
            <TouchableOpacity
              key={themeOption.name}
              onPress={() => handleThemeSelect(themeOption.name)}
              activeOpacity={0.7}
            >
              <ThemedCard
                style={StyleSheet.flatten([
                  styles.themeCard,
                  isSelected ? {
                    borderColor: theme.colors.primary[500],
                    borderWidth: 2,
                  } : {}
                ])}
              >
              <View style={styles.themePreview}>
                {/* Theme Preview Colors */}
                <View style={styles.colorPreview}>
                  <View
                    style={[
                      styles.colorDot,
                      { backgroundColor: themeOption.preview.primary, borderColor: theme.colors.border.light }
                    ]}
                  />
                  <View
                    style={[
                      styles.colorDot,
                      { backgroundColor: themeOption.preview.secondary, borderColor: theme.colors.border.light }
                    ]}
                  />
                  <View
                    style={[
                      styles.colorDot,
                      { backgroundColor: themeOption.preview.background, borderColor: theme.colors.border.light }
                    ]}
                  />
                  <View
                    style={[
                      styles.colorDot,
                      { backgroundColor: themeOption.preview.surface, borderColor: theme.colors.border.light }
                    ]}
                  />
                </View>

                {/* Theme Info */}
                <View style={styles.themeInfo}>
                  <ThemedText variant="body" weight="semibold">
                    {themeOption.displayName}
                  </ThemedText>
                  <ThemedText variant="caption" color="secondary" style={styles.description}>
                    {themeOption.description}
                  </ThemedText>
                </View>

                {/* Selection Indicator */}
                {isSelected && (
                  <View style={[styles.selectedIndicator, { backgroundColor: theme.colors.primary[100] }]}>
                    {/* eslint-disable-next-line react-native/no-raw-text */}
                    <ThemedText variant="body" color="primary">
                      ✓
                    </ThemedText>
                  </View>
                )}
              </View>
              </ThemedCard>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Close Button */}
      {onClose && (
        <View style={[styles.footer, { borderTopColor: theme.colors.border.light }]}>
          {/* eslint-disable react-native/no-raw-text */}
          <ThemedButton
            variant="secondary"
            onPress={onClose}
            style={styles.closeButton}
          >
            Close
          </ThemedButton>
          {/* eslint-enable react-native/no-raw-text */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
  categoryScroll: {
    maxHeight: 60,
    borderBottomWidth: 1,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 100,
  },
  themeScroll: {
    flex: 1,
  },
  themeContainer: {
    padding: 20,
    gap: 12,
  },
  themeCard: {
    padding: 16,
  },
  themePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  colorPreview: {
    flexDirection: 'row',
    gap: 4,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  themeInfo: {
    flex: 1,
  },
  description: {
    marginTop: 4,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  closeButton: {
    width: '100%',
  },
});

export default ThemeSelector;