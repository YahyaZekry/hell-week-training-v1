import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText, ThemedCard } from '../../components/ui';
import { EnhancedThemeSelector } from '../../components/ui/EnhancedThemeSelector';
import { useTheme } from '../../providers/ThemeProvider';
import { ConsolidatedThemeName } from '../../theme';

interface SettingItem {
  id: string;
  title: string;
  description?: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  icon?: string;
  onPress?: () => void;
}

const SettingsScreen: React.FC = () => {
  const {
    theme,
    isDark,
    consolidatedThemeName = 'navyCamouflage' as ConsolidatedThemeName,
    setConsolidatedTheme,
    useConsolidatedSystem = false,
  } = useTheme();

  const [notifications, setNotifications] = React.useState(true);
  const [hapticFeedback, setHapticFeedback] = React.useState(true);
  const [autoSync, setAutoSync] = React.useState(true);
  const [useEnhancedSelector, setUseEnhancedSelector] = React.useState(true);

  const settingSections: {
    title: string;
    items: SettingItem[];
  }[] = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          description: 'Receive workout reminders and updates',
          type: 'toggle',
          value: notifications,
          icon: '🔔',
        },
        {
          id: 'haptics',
          title: 'Haptic Feedback',
          description: 'Feel tactile responses to actions',
          type: 'toggle',
          value: hapticFeedback,
          icon: '📳',
        },
        {
          id: 'autoSync',
          title: 'Auto Sync Data',
          description: 'Automatically sync your progress',
          type: 'toggle',
          value: autoSync,
          icon: '🔄',
        },
      ],
    },
    {
      title: 'Data & Privacy',
      items: [
        {
          id: 'export',
          title: 'Export Data',
          description: 'Download all your workout data',
          type: 'navigation',
          icon: '📤',
        },
        {
          id: 'backup',
          title: 'Backup & Restore',
          description: 'Manage your data backups',
          type: 'navigation',
          icon: '💾',
        },
        {
          id: 'privacy',
          title: 'Privacy Policy',
          description: 'Learn how we protect your data',
          type: 'navigation',
          icon: '🔒',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Profile Settings',
          description: 'Update your personal information',
          type: 'navigation',
          icon: '👤',
        },
        {
          id: 'goals',
          title: 'Fitness Goals',
          description: 'Set and track your fitness objectives',
          type: 'navigation',
          icon: '🎯',
        },
        {
          id: 'achievements',
          title: 'Achievements',
          description: 'View your earned badges and milestones',
          type: 'navigation',
          icon: '🏆',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          description: 'Get answers to common questions',
          type: 'navigation',
          icon: '❓',
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          description: 'Help us improve the app',
          type: 'navigation',
          icon: '💬',
        },
        {
          id: 'rate',
          title: 'Rate App',
          description: 'Share your experience',
          type: 'action',
          icon: '⭐',
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          id: 'version',
          title: 'App Version',
          description: 'Version 1.0.0',
          type: 'navigation',
          icon: 'ℹ️',
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          description: 'Legal terms and conditions',
          type: 'navigation',
          icon: '📄',
        },
        {
          id: 'credits',
          title: 'Credits',
          description: 'Acknowledgments and attributions',
          type: 'navigation',
          icon: '🙏',
        },
      ],
    },
  ];

  const SettingItem: React.FC<{ item: SettingItem }> = ({ item }) => {
    if (item.type === 'toggle') {
      return (
        <ThemedCard style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <ThemedText style={styles.settingIcon}>{item.icon}</ThemedText>
            <View style={styles.settingContent}>
              <ThemedText
                variant="body"
                weight="semibold"
                style={styles.settingTitle}
              >
                {item.title}
              </ThemedText>
              {item.description && (
                <ThemedText
                  variant="caption"
                  color="secondary"
                  style={styles.settingDescription}
                >
                  {item.description}
                </ThemedText>
              )}
            </View>
          </View>
          <Switch
            value={item.value}
            onValueChange={value => {
              switch (item.id) {
                case 'notifications':
                  setNotifications(value);
                  break;
                case 'haptics':
                  setHapticFeedback(value);
                  break;
                case 'autoSync':
                  setAutoSync(value);
                  break;
              }
            }}
            trackColor={{
              false: theme.colors.border.light,
              true: theme.colors.primary[300],
            }}
            thumbColor={theme.colors.text.primary}
            ios_backgroundColor={theme.colors.border.light}
          />
        </ThemedCard>
      );
    }

    return (
      <TouchableOpacity
        accessible
        accessibilityRole="button"
        accessibilityLabel={item.title}
        accessibilityHint={item.description}
      >
        <ThemedCard style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <ThemedText style={styles.settingIcon}>{item.icon}</ThemedText>
            <View style={styles.settingContent}>
              <ThemedText
                variant="body"
                weight="semibold"
                style={styles.settingTitle}
              >
                {item.title}
              </ThemedText>
              {item.description && (
                <ThemedText
                  variant="caption"
                  color="secondary"
                  style={styles.settingDescription}
                >
                  {item.description}
                </ThemedText>
              )}
            </View>
          </View>
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <ThemedText
            style={
              [
                styles.settingArrow,
                { color: theme.colors.text.secondary },
              ] as any
            }
          >
            ›
          </ThemedText>
        </ThemedCard>
      </TouchableOpacity>
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
      paddingTop: 20,
      paddingBottom: 24,
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
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      paddingHorizontal: 24,
    },
    sectionItems: {
      paddingHorizontal: 24,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 12,
      marginBottom: 8,
      borderWidth: 1,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
    },
    settingDescription: {
      fontSize: 14,
      lineHeight: 18,
    },
    settingArrow: {
      fontSize: 20,
      fontWeight: '300',
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 32,
      paddingHorizontal: 24,
    },
    footerText: {
      fontSize: 12,
      fontWeight: '400',
      marginBottom: 4,
    },
    themeToggleCard: {
      marginBottom: 8,
    },
    themeToggleContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    themeToggleLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    themeToggleIcon: {
      fontSize: 24,
      marginRight: 16,
    },
    themeToggleText: {
      flex: 1,
    },
    expandIcon: {
      fontSize: 24,
      fontWeight: '300',
    },
    enhancedSelectorContainer: {
      marginTop: 8,
      marginBottom: 24,
    },
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: 'transparent' }]}
      edges={['top']}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <ThemedText variant="heading1" style={styles.title}>
            Settings
          </ThemedText>
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <ThemedText variant="body" color="secondary" style={styles.subtitle}>
            Customize your app experience
          </ThemedText>
        </View>

        {/* Theme Toggle Section */}
        <View style={styles.section}>
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <ThemedText variant="heading3" style={styles.sectionTitle}>
            Appearance
          </ThemedText>
          <View style={styles.sectionItems}>
            <TouchableOpacity
              onPress={() => setUseEnhancedSelector(!useEnhancedSelector)}
              activeOpacity={0.7}
            >
              <ThemedCard style={styles.themeToggleCard}>
                <View style={styles.themeToggleContent}>
                  <View style={styles.themeToggleLeft}>
                    {/* eslint-disable-next-line react-native/no-raw-text */}
                    <ThemedText style={styles.themeToggleIcon}>🎨</ThemedText>
                    <View style={styles.themeToggleText}>
                      {/* eslint-disable-next-line react-native/no-raw-text */}
                      <ThemedText variant="body" weight="semibold">
                        Enhanced Theme Selector
                      </ThemedText>
                      <ThemedText variant="caption" color="secondary">
                        {useEnhancedSelector
                          ? 'Using new theme selector with patterns'
                          : 'Using classic theme selector'}
                      </ThemedText>
                    </View>
                  </View>
                  <ThemedText
                    style={
                      [
                        styles.expandIcon,
                        { color: theme.colors.text.secondary },
                      ] as any
                    }
                  >
                    {useEnhancedSelector ? '−' : '+'}
                  </ThemedText>
                </View>
              </ThemedCard>
            </TouchableOpacity>

            <ThemedCard style={styles.themeToggleCard}>
              <View style={styles.themeToggleContent}>
                <View style={styles.themeToggleLeft}>
                  <ThemedText style={styles.themeToggleIcon}>
                    {isDark ? '🌙' : '☀️'}
                  </ThemedText>
                  <View style={styles.themeToggleText}>
                    <ThemedText variant="body" weight="semibold">
                      {useConsolidatedSystem ? 'System Theme' : 'Manual Theme'}
                    </ThemedText>
                    <ThemedText variant="caption" color="secondary">
                      {useConsolidatedSystem
                        ? `Automatically switches based on device settings (${isDark ? 'Dark' : 'Light'})`
                        : `Currently using ${consolidatedThemeName} theme`}
                    </ThemedText>
                  </View>
                </View>
                <Switch
                  value={useConsolidatedSystem}
                  onValueChange={value => {
                    if (value && setConsolidatedTheme) {
                      setConsolidatedTheme(consolidatedThemeName);
                    }
                  }}
                  trackColor={{
                    false: theme.colors.border.light,
                    true: theme.colors.primary[300],
                  }}
                  thumbColor={theme.colors.text.primary}
                  ios_backgroundColor={theme.colors.border.light}
                />
              </View>
            </ThemedCard>
          </View>
        </View>

        {/* Enhanced Theme Selector */}
        {useEnhancedSelector && (
          <View style={styles.enhancedSelectorContainer}>
            <EnhancedThemeSelector
              onThemeSelect={(themeName: ConsolidatedThemeName) => {
                if (setConsolidatedTheme) {
                  setConsolidatedTheme(themeName);
                }
              }}
              selectedTheme={consolidatedThemeName}
              isDark={isDark}
            />
          </View>
        )}

        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <ThemedText variant="heading3" style={styles.sectionTitle}>
              {section.title}
            </ThemedText>
            <View style={styles.sectionItems}>
              {section.items.map(item => (
                <SettingItem key={item.id} item={item} />
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.footer}>
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <ThemedText
            variant="caption"
            color="secondary"
            style={styles.footerText}
          >
            Hell Week Training App
          </ThemedText>
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <ThemedText
            variant="caption"
            color="secondary"
            style={styles.footerText}
          >
            Version 1.0.0
          </ThemedText>
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <ThemedText
            variant="caption"
            color="secondary"
            style={styles.footerText}
          >
            © 2024 All rights reserved
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
