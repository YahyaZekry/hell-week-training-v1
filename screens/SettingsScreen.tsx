import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

import audioService from '../services/audioService';
import hapticService from '../services/hapticService';
import settingsService from '../services/settingsService';
import { AppSettings } from '../types';

interface TrainingStyle {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  default: boolean;
}

interface VoiceGender {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(settingsService.getSettings() as AppSettings);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load settings on component mount
    setSettings(settingsService.getSettings() as AppSettings);
  }, []);

  // Update setting and save to storage
  const updateSetting = async (key: keyof AppSettings, value: any): Promise<void> => {
    try {
      setIsLoading(true);
      const newSettings = { ...settings, [key]: value };
      await (settingsService as any).updateSettings(newSettings as any);
      setSettings(newSettings);
      
      // Trigger haptic feedback for setting change
      await (hapticService as any).triggerHaptic('light');
    } catch (error) {
      console.error('Failed to update setting:', error);
      Alert.alert('Error', 'Failed to save setting');
    } finally {
      setIsLoading(false);
    }
  };

  // Update volume setting
  const updateVolume = async (type: string, value: number): Promise<void> => {
    try {
      setIsLoading(true);
      const newSettings = {
        ...settings,
        volume: {
          ...(settings as AppSettings).volume,
          [type]: value,
        },
      };
      await settingsService.updateSettings(newSettings);
      setSettings(newSettings);
      
      // Test the volume change
      if (type === 'voice') {
        await audioService.playVoiceCommand('warning', 'Volume test');
      } else if (type === 'effects') {
        await (audioService as any).playSoundEffect('tick');
      }
    } catch (error) {
      console.error('Failed to update volume:', error);
      Alert.alert('Error', 'Failed to save volume setting');
    } finally {
      setIsLoading(false);
    }
  };

  // Training style options
  const trainingStyles: TrainingStyle[] = [
    {
      id: 'navy_seal',
      name: 'Navy SEAL',
      description: 'Intense boot camp style with drill sergeant commands',
      icon: 'fitness',
      default: true,
    },
    {
      id: 'elite_fitness',
      name: 'Elite Fitness',
      description: 'Professional coaching with modern motivation',
      icon: 'trophy',
      default: false,
    },
    {
      id: 'hybrid',
      name: 'Hybrid',
      description: 'Balanced military-fitness approach',
      icon: 'sync',
      default: false,
    },
  ];

  // Voice gender options
  const voiceGenders: VoiceGender[] = [
    {
      id: 'male',
      name: 'Male Voice',
      icon: 'man',
    },
    {
      id: 'female',
      name: 'Female Voice',
      icon: 'woman',
    },
  ];

  // Render training style option
  const renderTrainingStyle = (style: TrainingStyle): React.ReactElement => {
    const isSelected = (settings as AppSettings).trainingStyle === style.id;
    
    return (
      <TouchableOpacity
        key={style.id}
        style={[
          styles.optionCard,
          isSelected && styles.selectedOptionCard,
        ]}
        onPress={() => updateSetting('trainingStyle' as keyof AppSettings, style.id)}
      >
        <View style={styles.optionHeader}>
          <Ionicons
            name={style.icon}
            size={24}
            color={isSelected ? '#007AFF' : '#666'}
          />
          <View style={styles.optionText}>
            <Text style={[
              styles.optionTitle,
              isSelected && styles.selectedOptionTitle,
            ]}>
              {style.name}
              {style.default && (
                <Text style={styles.defaultText}> (Default)</Text>
              )}
            </Text>
            <Text style={styles.optionDescription}>
              {style.description}
            </Text>
          </View>
          <View style={[
            styles.radioButton,
            isSelected && styles.selectedRadioButton,
          ]}>
            {isSelected && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render voice gender option
  const renderVoiceGender = (gender: VoiceGender): React.ReactElement => {
    const isSelected = (settings as AppSettings).voiceGender === gender.id;
    
    return (
      <TouchableOpacity
        key={gender.id}
        style={[
          styles.optionCard,
          isSelected && styles.selectedOptionCard,
        ]}
        onPress={() => updateSetting('voiceGender' as keyof AppSettings, gender.id)}
      >
        <View style={styles.optionHeader}>
          <Ionicons
            name={gender.icon}
            size={24}
            color={isSelected ? '#007AFF' : '#666'}
          />
          <Text style={[
            styles.optionTitle,
            isSelected && styles.selectedOptionTitle,
          ]}>
            {gender.name}
          </Text>
          <View style={[
            styles.radioButton,
            isSelected && styles.selectedRadioButton,
          ]}>
            {isSelected && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render volume slider
  const renderVolumeSlider = (type: string, title: string, icon: keyof typeof Ionicons.glyphMap): React.ReactElement => (
    <View style={styles.volumeSection}>
      <View style={styles.volumeHeader}>
        <Ionicons name={icon} size={20} color="#666" />
        <Text style={styles.volumeTitle}>{title}</Text>
        <Text style={styles.volumeValue}>
          {Math.round(((settings as AppSettings).volume as any)[type] * 100)}%
        </Text>
      </View>
      <Text style={styles.volumeSliderText}>
        Volume: {Math.round(((settings as AppSettings).volume as any)[type] * 100)}%
      </Text>
      <TouchableOpacity
        style={styles.volumeButton}
        onPress={() => updateVolume(type, Math.min(1, ((settings as AppSettings).volume as any)[type] + 0.1))}
      >
        <Text style={styles.volumeButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.volumeButton}
        onPress={() => updateVolume(type, Math.max(0, ((settings as AppSettings).volume as any)[type] - 0.1))}
      >
        <Text style={styles.volumeButtonText}>-</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            // navigation.goBack() - will be handled by expo-router
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Training Style Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training Style</Text>
          <Text style={styles.sectionDescription}>
            Choose your preferred training motivation style
          </Text>
          {trainingStyles.map(renderTrainingStyle)}
        </View>

        {/* Voice Gender Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Gender</Text>
          <Text style={styles.sectionDescription}>
            Select your preferred voice for commands
          </Text>
          {voiceGenders.map(renderVoiceGender)}
        </View>

        {/* Audio Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio Settings</Text>
          
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Voice Commands</Text>
            <Switch
              value={(settings as AppSettings).voiceEnabled}
              onValueChange={(value) => updateSetting('voiceEnabled' as keyof AppSettings, value)}
              trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Sound Effects</Text>
            <Switch
              value={(settings as AppSettings).soundEffects}
              onValueChange={(value) => updateSetting('soundEffects' as keyof AppSettings, value)}
              trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Background Music</Text>
            <Switch
              value={(settings as AppSettings).backgroundMusic}
              onValueChange={(value) => updateSetting('backgroundMusic' as keyof AppSettings, value)}
              trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Countdown Warnings</Text>
            <Switch
              value={(settings as AppSettings).countdownWarnings}
              onValueChange={(value) => updateSetting('countdownWarnings' as keyof AppSettings, value)}
              trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
              thumbColor="#fff"
            />
          </View>

          {/* Volume Controls */}
          <View style={styles.volumeContainer}>
            {renderVolumeSlider('voice', 'Voice Volume', 'volume-high')}
            {renderVolumeSlider('effects', 'Effects Volume', 'musical-notes')}
            {renderVolumeSlider('music', 'Music Volume', 'musical-note')}
          </View>
        </View>

        {/* Visual Effects Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visual Effects</Text>
          
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Animations</Text>
            <Switch
              value={(settings as AppSettings).visualEffects}
              onValueChange={(value) => updateSetting('visualEffects' as keyof AppSettings, value)}
              trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Pulse Effects</Text>
            <Switch
              value={(settings as AppSettings).pulseEffects}
              onValueChange={(value) => updateSetting('pulseEffects' as keyof AppSettings, value)}
              trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Transition Animations</Text>
            <Switch
              value={(settings as AppSettings).transitionAnimations}
              onValueChange={(value) => updateSetting('transitionAnimations' as keyof AppSettings, value)}
              trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Haptic Feedback Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Haptic Feedback</Text>
          
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Haptic Feedback</Text>
            <Switch
              value={(settings as AppSettings).hapticFeedback}
              onValueChange={(value) => updateSetting('hapticFeedback' as keyof AppSettings, value)}
              trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Intensity</Text>
            <View style={styles.intensityButtons}>
              {(['light', 'medium', 'heavy'] as const).map((intensity) => (
                <TouchableOpacity
                  key={intensity}
                  style={[
                    styles.intensityButton,
                    (settings as AppSettings).hapticIntensity === intensity && styles.selectedIntensityButton,
                  ]}
                  onPress={() => updateSetting('hapticIntensity' as keyof AppSettings, intensity)}
                >
                  <Text style={[
                    styles.intensityButtonText,
                    (settings as AppSettings).hapticIntensity === intensity && styles.selectedIntensityButtonText,
                  ]}>
                    {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Test Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Settings</Text>
          <TouchableOpacity
            style={styles.testButton}
            onPress={async () => {
              await audioService.playVoiceCommand('warning', 'Testing your settings');
              await (hapticService as any).triggerHaptic((settings as AppSettings).hapticIntensity);
            }}
          >
            <Ionicons name="play" size={20} color="#007AFF" />
            <Text style={styles.testButtonText}>Test Audio & Haptics</Text>
          </TouchableOpacity>
        </View>

        {/* Reset Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reset</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              Alert.alert(
                'Reset Settings',
                'Are you sure you want to reset all settings to default?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                      await (settingsService as any).resetToDefaults();
                      setSettings(settingsService.getSettings() as AppSettings);
                      Alert.alert('Success', 'Settings reset to default');
                    },
                  },
                ]
              );
            }}
          >
            <Ionicons name="refresh" size={20} color="#FF3B30" />
            <Text style={styles.resetButtonText}>Reset to Default</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedOptionCard: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedOptionTitle: {
    color: '#007AFF',
  },
  defaultText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'normal',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderColor: '#007AFF',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  volumeContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  volumeSection: {
    marginBottom: 20,
  },
  volumeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  volumeTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  volumeValue: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  volumeSliderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 8,
  },
  volumeButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  volumeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  intensityButtons: {
    flexDirection: 'row',
  },
  intensityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginLeft: 8,
  },
  selectedIntensityButton: {
    backgroundColor: '#007AFF',
  },
  intensityButtonText: {
    fontSize: 14,
    color: '#666',
  },
  selectedIntensityButtonText: {
    color: '#fff',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  testButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#FF3B30',
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default SettingsScreen;