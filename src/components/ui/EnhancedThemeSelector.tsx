/**
 * Enhanced Theme Selector with Background Images and Better UX
 * Hell Week Training App
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { useViewport } from '../../../hooks/useViewport';
import { useTheme } from '../../providers/ThemeProvider';
import {
  ConsolidatedThemeName,
  consolidatedThemeMetadata,
  themeCategories,
} from '../../theme';

interface EnhancedThemeSelectorProps {
  onThemeSelect: (themeName: ConsolidatedThemeName) => void;
  selectedTheme: ConsolidatedThemeName;
  isDark: boolean;
}

interface ThemeCardProps {
  themeName: ConsolidatedThemeName;
  metadata: any;
  isSelected: boolean;
  isDark: boolean;
  onPress: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  themeName: _themeName,
  metadata,
  isSelected,
  isDark,
  onPress,
}) => {
  const { theme } = useTheme();
  const { width } = useViewport();
  
  // Calculate responsive dimensions - smaller boxes
  const cardWidth = useMemo(() => {
    if (width < 768) return width * 0.4; // 40% of screen width on small screens
    if (width < 992) return 140; // Fixed width on medium screens
    return 160; // Slightly larger on big screens
  }, [width]);
  
  const cardHeight = useMemo(() => {
    return cardWidth * 0.8; // Maintain aspect ratio (slightly taller)
  }, [cardWidth]);
  
  // Generate pattern background based on theme type
  const getPatternBackground = () => {
    const patternColors = metadata.pattern.colors;
    const patternType = metadata.pattern.type;
    
    switch (patternType) {
      case 'camouflage':
        return (
          <View style={[styles.patternContainer, { backgroundColor: patternColors[0] }]}>
            <View style={[styles.camouflagePatch, { backgroundColor: patternColors[1], top: '10%', left: '5%' }]} />
            <View style={[styles.camouflagePatch, { backgroundColor: patternColors[2], top: '25%', left: '60%' }]} />
            <View style={[styles.camouflagePatch, { backgroundColor: patternColors[3], top: '60%', left: '20%' }]} />
            <View style={[styles.camouflagePatch, { backgroundColor: patternColors[0], top: '70%', left: '75%' }]} />
          </View>
        );
      case 'tactical':
        return (
          <View style={[styles.patternContainer, { backgroundColor: patternColors[0] }]}>
            <View style={[styles.tacticalLine, { backgroundColor: patternColors[1], top: '20%' }]} />
            <View style={[styles.tacticalLine, { backgroundColor: patternColors[2], top: '50%' }]} />
            <View style={[styles.tacticalLine, { backgroundColor: patternColors[3], top: '80%' }]} />
          </View>
        );
      case 'stealth':
        return (
          <View style={[styles.patternContainer, { backgroundColor: patternColors[0] }]}>
            <View style={[styles.stealthGrid, { borderColor: patternColors[1] }]} />
          </View>
        );
      case 'desert':
        return (
          <View style={[styles.patternContainer, { backgroundColor: patternColors[0] }]}>
            <View style={[styles.desertWave, { backgroundColor: patternColors[1], top: '30%' }]} />
            <View style={[styles.desertWave, { backgroundColor: patternColors[2], top: '60%' }]} />
          </View>
        );
      case 'forest':
        return (
          <View style={[styles.patternContainer, { backgroundColor: patternColors[0] }]}>
            <View style={[styles.forestLeaf, { backgroundColor: patternColors[1], top: '15%', left: '20%' }]} />
            <View style={[styles.forestLeaf, { backgroundColor: patternColors[2], top: '40%', left: '70%' }]} />
            <View style={[styles.forestLeaf, { backgroundColor: patternColors[3], top: '65%', left: '35%' }]} />
          </View>
        );
      default:
        return <View style={[styles.patternContainer, { backgroundColor: patternColors[0] }]} />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.themeCard,
        {
          width: cardWidth,
          height: cardHeight,
          borderColor: theme.colors.border.light,
        },
        isSelected && [
          styles.selectedCard,
          { borderColor: theme.colors.border.focus, shadowColor: theme.colors.text.primary }
        ]
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardBackground}>
        {getPatternBackground()}
        <View style={styles.cardOverlay}>
          <View style={styles.cardContent}>
            <Text style={[
              styles.themeName,
              { color: isDark ? theme.colors.text.primary : theme.colors.text.inverse }
            ]}>
              {metadata.name}
            </Text>
            <View style={styles.colorPreview}>
              {(Object.values(metadata.previewColors) as string[]).map((color: string, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.colorDot,
                    { backgroundColor: color, borderColor: theme.colors.border.light }
                  ]}
                />
              ))}
            </View>
          </View>
          {isSelected && (
            <View style={[
              styles.selectedIndicator,
              { backgroundColor: theme.colors.success[500] }
            ]}>
              <Text style={styles.selectedText}>✓</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CategorySection: React.FC<{
  category: string;
  themes: string[];
  selectedTheme: ConsolidatedThemeName;
  isDark: boolean;
  onThemeSelect: (themeName: ConsolidatedThemeName) => void;
}> = ({ category, themes, selectedTheme, isDark, onThemeSelect }) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.categorySection}>
      <Text style={[
        styles.categoryTitle,
        { color: theme.colors.text.primary }
      ]}>
        {category}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.themeList}
      >
        {themes.map((themeName) => (
          <ThemeCard
            key={themeName}
            themeName={themeName as ConsolidatedThemeName}
            metadata={consolidatedThemeMetadata[themeName as ConsolidatedThemeName]}
            isSelected={selectedTheme === themeName}
            isDark={isDark}
            onPress={() => onThemeSelect(themeName as ConsolidatedThemeName)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export const EnhancedThemeSelector: React.FC<EnhancedThemeSelectorProps> = ({
  onThemeSelect,
  selectedTheme,
  isDark,
}) => {
  const { theme } = useTheme();

  const categorizedThemes = useMemo(() => {
    const categories: { [key: string]: string[] } = {};
    
    Object.entries(themeCategories).forEach(([_categoryKey, categoryData]) => {
      categories[categoryData.name] = categoryData.themes;
    });
    
    return categories;
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Choose Your Theme
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Select a theme that matches your style. Themes automatically adapt to light/dark mode.
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {Object.entries(categorizedThemes).map(([categoryName, themes]) => (
          <CategorySection
            key={categoryName}
            category={categoryName}
            themes={themes}
            selectedTheme={selectedTheme}
            isDark={isDark}
            onThemeSelect={onThemeSelect}
          />
        ))}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border.light }]}>
        <Text style={[styles.footerText, { color: theme.colors.text.secondary }]}>
          Themes automatically switch between light and dark modes based on your device settings
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  themeList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  themeCard: {
    borderRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
    marginRight: 12,
  },
  selectedCard: {
    borderWidth: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardBackground: {
    flex: 1,
    position: 'relative',
  },
  patternContainer: {
    flex: 1,
    position: 'relative',
  },
  // Camouflage pattern
  camouflagePatch: {
    position: 'absolute',
    width: 40,
    height: 30,
    borderRadius: 8,
    transform: [{ rotate: '15deg' }],
  },
  // Tactical pattern
  tacticalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
  },
  // Stealth pattern
  stealthGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  // Desert pattern
  desertWave: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 20,
    borderRadius: 10,
  },
  // Forest pattern
  forestLeaf: {
    position: 'absolute',
    width: 25,
    height: 35,
    borderRadius: 12,
    transform: [{ rotate: '45deg' }],
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Required for text contrast over patterns
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  themeName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  colorPreview: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 4,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default EnhancedThemeSelector;