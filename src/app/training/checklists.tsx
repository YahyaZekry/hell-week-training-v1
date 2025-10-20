import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity , useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '../../components/ScreenHeader';
import { Colors } from '../../constants/Colors';

const ChecklistsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [checklistItems, setChecklistItems] = React.useState([
    { id: 1, title: 'Complete warm-up routine', completed: true },
    { id: 2, title: 'Check equipment setup', completed: true },
    { id: 3, title: 'Review exercise form', completed: false },
    { id: 4, title: 'Set workout goals', completed: false },
    { id: 5, title: 'Prepare water bottle', completed: false },
    { id: 6, title: 'Set timer for workout', completed: false },
  ]);

  const toggleItem = (id: number) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Checklists"
        subtitle="Track your training progress"
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.checklistContainer}>
          {checklistItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.checklistItem,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => toggleItem(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: item.completed ? colors.success : 'transparent' as const,
                    borderColor: colors.border,
                  },
                ]}
              >
                {item.completed && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text
                style={[
                  styles.checklistText,
                  item.completed && styles.completedText,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
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
  checklistContainer: {
    paddingBottom: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#ffffff' as const,
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through' as const,
    opacity: 0.6,
  },
  checklistText: {
    fontSize: 16,
    flex: 1,
  },
});

export default ChecklistsScreen;