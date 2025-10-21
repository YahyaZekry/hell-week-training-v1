import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '../../components/ScreenHeader';
import { Colors } from '../../constants/Colors';

const ScheduleScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const weeklySchedule = [
    { day: 'Monday', workout: 'Upper Body Strength', completed: true },
    { day: 'Tuesday', workout: 'Cardio & Core', completed: true },
    { day: 'Wednesday', workout: 'Lower Body Power', completed: false },
    { day: 'Thursday', workout: 'HIIT Training', completed: false },
    { day: 'Friday', workout: 'Full Body Conditioning', completed: false },
    { day: 'Saturday', workout: 'Active Recovery', completed: false },
    { day: 'Sunday', workout: 'Rest Day', completed: false },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: 'transparent' }]}
    >
      <ScreenHeader
        title="Training Schedule"
        subtitle="Your weekly workout plan"
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scheduleContainer}>
          {weeklySchedule.map((item, index) => (
            <View
              key={index}
              style={[
                styles.dayCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.dayHeader}>
                <Text style={[styles.dayText, { color: colors.text }]}>
                  {item.day}
                </Text>
                <View
                  style={[
                    styles.statusIndicator,
                    {
                      backgroundColor: item.completed
                        ? colors.success
                        : colors.border,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.workoutText, { color: colors.text }]}>
                {item.workout}
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
  scheduleContainer: {
    paddingBottom: 20,
  },
  dayCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: Colors.light.shadow,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  workoutText: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default ScheduleScreen;
