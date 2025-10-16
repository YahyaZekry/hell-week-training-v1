import AsyncStorage from '@react-native-async-storage/async-storage';
import { User as FirebaseUser } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import authService from '../services/authService';
import { User } from '../types';


const { width, height } = Dimensions.get('window');

interface AuthScreenProps {
  onAuthSuccess: (user: User) => void;
}

interface FormErrors {
  email?: string;
  password?: string;
  displayName?: string;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await authService.initializeAuth();
        setAuthInitialized(true);
        
        // Check for existing user session
        const user = authService.getCurrentUser();
        if (user) {
          // Convert Firebase user to our User type
          const convertedUser: User = {
            id: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            createdAt: new Date(),
            lastLoginAt: new Date(),
            preferences: {
              notifications: true,
              soundEnabled: true,
              hapticFeedback: true,
              darkMode: false,
              units: 'metric',
              language: 'en'
            }
          };
          onAuthSuccess(convertedUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthInitialized(true);
      }
    };

    initializeAuth();
  }, [onAuthSuccess]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !displayName) {
      newErrors.displayName = 'Display name is required';
    } else if (!isLogin && displayName.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      let result;
      if (isLogin) {
        result = await authService.signIn(email, password);
      } else {
        result = await authService.signUp(email, password, displayName);
      }

      if (result.success) {
        // Store user session
        await AsyncStorage.setItem('userSession', JSON.stringify(result.user));
        
        // Convert auth response user to our User type
        if (result.user) {
          const convertedUser: User = {
            id: result.user.uid,
            email: result.user.email || '',
            displayName: result.user.displayName || '',
            createdAt: new Date(),
            lastLoginAt: new Date(),
            preferences: {
              notifications: true,
              soundEnabled: true,
              hapticFeedback: true,
              darkMode: false,
              units: 'metric',
              language: 'en'
            }
          };
          onAuthSuccess(convertedUser);
        }
      } else {
        Alert.alert('Authentication Error', result.error);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address first.');
      return;
    }

    try {
      const result = await authService.resetPassword(email);
      if (result.success) {
        Alert.alert(
          'Password Reset',
          result.message || 'Password reset email sent! Check your inbox.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      Alert.alert('Error', 'Failed to send password reset email.');
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setEmail('');
    setPassword('');
    setDisplayName('');
  };

  if (!authInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffd700" />
        <Text style={styles.loadingText}>Initializing...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>NAVY SEAL</Text>
          <Text style={styles.headerSubtitle}>HELL WEEK TRAINING</Text>
          <Text style={styles.headerDescription}>
            {isLogin ? 'Welcome back, warrior' : 'Begin your transformation'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </Text>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Display Name</Text>
              <TextInput
                style={[styles.input, errors.displayName && styles.inputError]}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Enter your name"
                placeholderTextColor="#666"
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.displayName && (
                <Text style={styles.errorText}>{errors.displayName}</Text>
              )}
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIconText}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </Text>
            )}
          </TouchableOpacity>

          {isLogin && (
            <TouchableOpacity style={styles.linkButton} onPress={handleResetPassword}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.switchButton} onPress={toggleAuthMode}>
            <Text style={styles.switchText}>
              {isLogin 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"
              }
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By signing up, you agree to the Hell Week Training Program terms and conditions.
          </Text>
          <Text style={styles.footerText}>
            This intense training program requires medical clearance. Consult your physician before beginning.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    minHeight: height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  loadingText: {
    color: '#ffd700',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 12,
  },
  headerDescription: {
    fontSize: 16,
    color: '#c0c0c0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  formContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 32,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#ffd700',
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 2,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#ffd700',
    marginBottom: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
  },
  inputError: {
    borderColor: '#ff4757',
    borderWidth: 2,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  eyeIconText: {
    fontSize: 20,
  },
  errorText: {
    color: '#ff4757',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#ffd700',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#666',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  linkButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#ffd700',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  switchButton: {
    alignItems: 'center',
  },
  switchText: {
    color: '#c0c0c0',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 8,
  },
});

export default AuthScreen;