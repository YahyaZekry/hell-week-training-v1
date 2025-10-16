import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { appData } from '../data/data';

interface ChecklistItem {
  item: string;
  category: string;
  timeline?: string;
  frequency?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

interface ChecklistData {
  pre_checklist: ChecklistItem[];
  during_checklist: ChecklistItem[];
  post_checklist: ChecklistItem[];
}

interface CheckedItems {
  [key: string]: boolean;
}

const ChecklistsScreen: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  useEffect(() => {
    loadCheckedItems();
  }, []);

  const loadCheckedItems = async (): Promise<void> => {
    try {
      const jsonValue = await AsyncStorage.getItem('checkedItems');
      if (jsonValue !== null) {
        setCheckedItems(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Failed to load checked items.");
    }
  };

  const saveCheckedItems = async (newCheckedItems: CheckedItems): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(newCheckedItems);
      await AsyncStorage.setItem('checkedItems', jsonValue);
    } catch (e) {
      console.error("Failed to save checked items.");
    }
  };

  const toggleItem = (listName: string, index: number): void => {
    const key = `${listName}-${index}`;
    const newCheckedItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newCheckedItems);
    saveCheckedItems(newCheckedItems);
  };

  const renderChecklist = (listName: string, listData: ChecklistItem[]): React.ReactElement[] => {
    return listData.map((item, index) => {
      const key = `${listName}-${index}`;
      const isChecked = !!checkedItems[key];
      return (
        <TouchableOpacity 
          key={key} 
          onPress={() => toggleItem(listName, index)} 
          style={[
            styles.checklistItem,
            styles[`priority${item.priority.toLowerCase()}` as keyof typeof styles] as any,
            isChecked && styles.checkedItem
          ]}
        >
          <Ionicons 
            name={isChecked ? 'checkbox' : 'square-outline'} 
            size={24} 
            color={isChecked ? '#ffd700' : '#a0a0a0'} 
          />
          <View style={styles.itemContent}>
            <Text style={[styles.itemText, isChecked && styles.checkedText]}>
              {item.item}
            </Text>
            <Text style={styles.itemMeta}>
              {`${item.category} - ${item.timeline || item.frequency}`}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Training Checklists</Text>
      </View>
      <View style={styles.checklistsContainer}>
        <View style={styles.checklistSection}>
          <Text style={styles.sectionTitle}>Pre-Hell Week Preparation</Text>
          {renderChecklist('pre', (appData as ChecklistData).pre_checklist)}
        </View>

        <View style={styles.checklistSection}>
          <Text style={styles.sectionTitle}>During Hell Week</Text>
          {renderChecklist('during', (appData as ChecklistData).during_checklist)}
        </View>

        <View style={styles.checklistSection}>
          <Text style={styles.sectionTitle}>Post-Hell Week Recovery</Text>
          {renderChecklist('post', (appData as ChecklistData).post_checklist)}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    backgroundColor: '#001f3f',
    padding: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
  },
  checklistsContainer: {
    padding: 16,
  },
  checklistSection: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(76, 88, 102, 0.2)',
  },
  sectionTitle: {
    color: '#ffd700',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ffd700',
    paddingBottom: 8,
  },
  checklistItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkedItem: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  itemContent: {
    marginLeft: 12,
    flex: 1,
  },
  itemText: {
    color: '#e0e0e0',
    fontWeight: 'bold',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#a0a0a0',
  },
  itemMeta: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 4,
  },
  prioritycritical: {
    borderLeftColor: '#ff4757',
  },
  priorityhigh: {
    borderLeftColor: '#ff6b35',
  },
});

export default ChecklistsScreen;