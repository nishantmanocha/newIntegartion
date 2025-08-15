import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PermissionsScreen() {
  const [permissions, setPermissions] = useState({
    sms: false,
    notifications: false,
    location: false,
  });

  const handlePermissionToggle = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleComplete = () => {
    // In a real app, you would request actual permissions here
    Alert.alert(
      'Welcome!',
      'Your account has been set up successfully. You can now start your investment journey!',
      [
        {
          text: 'Get Started',
          onPress: () => router.replace('/(tabs)'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#006B3F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Permissions</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="shield-checkmark" size={48} color="#006B3F" />
            </View>
          </View>

          <Text style={styles.title}>Almost there!</Text>
          <Text style={styles.subtitle}>
            We need a few permissions to provide you with the best experience
          </Text>

          <View style={styles.permissionsList}>
            <View style={styles.permissionItem}>
              <View style={styles.permissionInfo}>
                <Ionicons name="chatbubble" size={24} color="#006B3F" />
                <View style={styles.permissionText}>
                  <Text style={styles.permissionTitle}>SMS Reading</Text>
                  <Text style={styles.permissionDescription}>
                    To analyze your spending patterns and provide smart recommendations
                  </Text>
                </View>
              </View>
              <Switch
                value={permissions.sms}
                onValueChange={() => handlePermissionToggle('sms')}
                trackColor={{ false: '#E0E0E0', true: '#006B3F' }}
                thumbColor={permissions.sms ? '#FAF8F0' : '#FFFFFF'}
              />
            </View>

            <View style={styles.permissionItem}>
              <View style={styles.permissionInfo}>
                <Ionicons name="notifications" size={24} color="#006B3F" />
                <View style={styles.permissionText}>
                  <Text style={styles.permissionTitle}>Notifications</Text>
                  <Text style={styles.permissionDescription}>
                    To remind you about daily savings goals and investment opportunities
                  </Text>
                </View>
              </View>
              <Switch
                value={permissions.notifications}
                onValueChange={() => handlePermissionToggle('notifications')}
                trackColor={{ false: '#E0E0E0', true: '#006B3F' }}
                thumbColor={permissions.notifications ? '#FAF8F0' : '#FFFFFF'}
              />
            </View>

            <View style={styles.permissionItem}>
              <View style={styles.permissionInfo}>
                <Ionicons name="location" size={24} color="#006B3F" />
                <View style={styles.permissionText}>
                  <Text style={styles.permissionTitle}>Location (Optional)</Text>
                  <Text style={styles.permissionDescription}>
                    To provide location-based financial services and offers
                  </Text>
                </View>
              </View>
              <Switch
                value={permissions.location}
                onValueChange={() => handlePermissionToggle('location')}
                trackColor={{ false: '#E0E0E0', true: '#006B3F' }}
                thumbColor={permissions.location ? '#FAF8F0' : '#FFFFFF'}
              />
            </View>
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color="#006B3F" />
            <Text style={styles.infoText}>
              Your data is encrypted and secure. We never share your personal information with third parties.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>Complete Setup</Text>
          <Ionicons name="checkmark" size={20} color="#FAF8F0" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F0',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#006B3F',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006B3F',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  permissionsList: {
    marginBottom: 30,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  permissionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  permissionText: {
    marginLeft: 16,
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F8F0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#006B3F',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#006B3F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FAF8F0',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});