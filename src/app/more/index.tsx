import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../providers';

interface MoreItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  category: 'performance' | 'wellness' | 'settings';
}

const MoreScreen: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const moreItems: MoreItem[] = [
    // Performance & Analytics
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Deep dive into performance metrics and trends',
      icon: 'stats-chart',
      route: '/more/analytics',
      category: 'performance',
    },
    {
      id: 'workout-history',
      title: 'Workout History',
      description: 'Historical view of completed workouts',
      icon: 'bar-chart',
      route: '/more/workout-history',
      category: 'performance',
    },
    // Wellness & Recovery
    {
      id: 'mental',
      title: 'Mental Fitness',
      description: 'Mental toughness exercises and mindfulness',
      icon: 'medal',
      route: '/more/mental',
      category: 'wellness',
    },
    {
      id: 'recovery',
      title: 'Recovery',
      description: 'Recovery techniques and rest day guidance',
      icon: 'moon',
      route: '/more/recovery',
      category: 'wellness',
    },
    {
      id: 'exercise-form',
      title: 'Exercise Form',
      description: 'Video tutorials and form checking',
      icon: 'play-circle',
      route: '/more/exercise-form',
      category: 'wellness',
    },
    // App Settings
    {
      id: 'settings',
      title: 'Settings',
      description: 'App preferences and configuration',
      icon: 'settings',
      route: '/more/settings',
      category: 'settings',
    },
  ];

  const categories = [
    {
      id: 'performance',
      title: 'Performance & Analytics',
      icon: 'stats-chart',
    },
    { id: 'wellness', title: 'Wellness & Recovery', icon: 'heart' },
    { id: 'settings', title: 'App Settings', icon: 'settings' },
  ];

  const getCategoryItems = (categoryId: string) => {
    return moreItems.filter(item => item.category === categoryId);
  };

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const renderCategory = (category: (typeof categories)[0]) => {
    const categoryItems = getCategoryItems(category.id);

    return (
      <View key={category.id} style={styles.categoryContainer}>
        <View style={styles.categoryHeader}>
          <Ionicons
            name={category.icon as keyof typeof Ionicons.glyphMap}
            size={20}
            color={theme.colors.primary[500]}
          />
          <Text
            style={[styles.categoryTitle, { color: theme.colors.text.primary }]}
          >
            {category.title}
          </Text>
        </View>

        <View style={styles.categoryItems}>
          {categoryItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.moreItem,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border.light,
                },
              ]}
              onPress={() => handleNavigation(item.route)}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`Navigate to ${item.title}`}
              accessibilityHint={item.description}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.colors.primary[100] },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={theme.colors.primary[500]}
                />
              </View>
              <View style={styles.itemContent}>
                <Text
                  style={[
                    styles.itemTitle,
                    { color: theme.colors.text.primary },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.itemDescription,
                    { color: theme.colors.text.secondary },
                  ]}
                >
                  {item.description}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // Debug: Log when component renders
  console.warn('MoreScreen rendering with transparent background');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: 'transparent' }]}
      edges={['top']}
    >
      <ScrollView
        style={[styles.scrollView, { backgroundColor: 'transparent' }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            More Features
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.text.secondary }]}
          >
            Explore additional tools and settings
          </Text>
        </View>

        {categories.map(renderCategory)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  categoryItems: {
    paddingHorizontal: 24,
  },
  moreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MoreScreen;
