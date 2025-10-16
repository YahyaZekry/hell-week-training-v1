import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView , useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '../../components/ScreenHeader';
import Colors from '../../constants/Colors';

const PreparationScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const preparationItems = [
    {
      title: 'Warm-up Routine',
      description: '5-10 minutes of light cardio and dynamic stretching',
      icon: '🏃‍♂️',
    },
    {
      title: 'Equipment Check',
      description: 'Ensure all equipment is properly set up and safe',
      icon: '🔧',
    },
    {
      title: 'Hydration',
      description: 'Drink water before, during, and after workouts',
      icon: '💧',
    },
    {
      title: 'Mental Preparation',
      description: 'Focus your mind and set clear intentions',
      icon: '🧠',
    },
    {
      title: 'Form Review',
      description: 'Review proper exercise form and technique',
      icon: '📋',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Preparation"
        subtitle="Get ready for your workout"
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.preparationContainer}>
          {preparationItems.map((item, index) => (
            <View
              key={index}
              style={[
                styles.preparationCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  shadowColor: colors.shadow,
                },
              ]}
            >
              <Text style={styles.preparationIcon}>{item.icon}</Text>
              <Text style={[styles.preparationTitle, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.preparationDescription, { color: colors.textSecondary }]}>
                {item.description}
              </Text>
            </View>
          ))}
        </View>
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
    paddingHorizontal: 16,
  },
  preparationContainer: {
    paddingBottom: 20,
  },
  preparationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  preparationIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  preparationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  preparationDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PreparationScreen;