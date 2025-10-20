import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../providers';

const NutritionScreen: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const nutritionModules = [
    {
      title: 'Meal Planning',
      description: 'Plan your daily meals and track calories',
      icon: '🍽️',
    },
    {
      title: 'Nutrition Tracking',
      description: 'Monitor your macronutrients and water intake',
      icon: '📊',
    },
    {
      title: 'Recipes',
      description: 'Discover healthy recipes for your training',
      icon: '📖',
    },
    {
      title: 'Supplements',
      description: 'Track your supplement schedule',
      icon: '💊',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>Nutrition</Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Fuel your body for optimal performance
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.modulesContainer}>
          {nutritionModules.map((module, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.moduleCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border.light,
                },
              ]}
            >
              <Text style={styles.moduleIcon}>{module.icon}</Text>
              <Text style={[styles.moduleTitle, { color: theme.colors.text.primary }]}>
                {module.title}
              </Text>
              <Text style={[styles.moduleDescription, { color: theme.colors.text.secondary }]}>
                {module.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Quick Links */}
        <View style={styles.quickLinksSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Related Features
          </Text>
          <View style={styles.quickLinksGrid}>
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: theme.colors.surface }]}
              onPress={() => router.push('/more/analytics')}
            >
              <Ionicons name="analytics" size={24} color={theme.colors.primary[500]} />
              <Text style={[styles.quickLinkText, { color: theme.colors.text.primary }]}>
                Nutrition Analytics
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: theme.colors.surface }]}
              onPress={() => router.push('/more/mental')}
            >
              <Ionicons name="heart" size={24} color={theme.colors.primary[500]} />
              <Text style={[styles.quickLinkText, { color: theme.colors.text.primary }]}>
                Mental Wellness
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: theme.colors.surface }]}
              onPress={() => router.push('/more/recovery')}
            >
              <Ionicons name="walk" size={24} color={theme.colors.primary[500]} />
              <Text style={[styles.quickLinkText, { color: theme.colors.text.primary }]}>
                Recovery Tips
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: theme.colors.surface }]}
              onPress={() => router.push('/more/settings')}
            >
              <Ionicons name="settings" size={24} color={theme.colors.primary[500]} />
              <Text style={[styles.quickLinkText, { color: theme.colors.text.primary }]}>
                Diet Preferences
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: theme.colors.surface }]}
              onPress={() => router.push('/more/workout-history')}
            >
              <Ionicons name="bar-chart" size={24} color={theme.colors.primary[500]} />
              <Text style={[styles.quickLinkText, { color: theme.colors.text.primary }]}>
                Nutrition History
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickLinkCard, { backgroundColor: theme.colors.surface }]}
              onPress={() => router.push('/more/exercise-form')}
            >
              <Ionicons name="play-circle" size={24} color={theme.colors.primary[500]} />
              <Text style={[styles.quickLinkText, { color: theme.colors.text.primary }]}>
                Meal Prep Videos
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  modulesContainer: {
    paddingBottom: 20,
  },
  moduleCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'transparent',
    elevation: 3,
  },
  moduleIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  moduleDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  quickLinksSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickLinkCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickLinkText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default NutritionScreen;