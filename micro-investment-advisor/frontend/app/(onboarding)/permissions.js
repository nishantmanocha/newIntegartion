import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { useApp } from '../../src/context/AppContext';

export default function Permissions() {
  const router = useRouter();
  const { language } = useApp();
  const [permissions, setPermissions] = useState({
    notifications: false,
    location: false,
    analytics: false,
  });

  const getContent = () => {
    const content = {
      en: {
        title: 'Enable Smart Features',
        subtitle: 'Help us provide you with personalized recommendations',
        notificationTitle: 'Smart Notifications',
        notificationDesc: 'Get timely reminders and savings tips',
        locationTitle: 'Location Services',
        locationDesc: 'Find nearby ATMs and banking services',
        analyticsTitle: 'Usage Analytics',
        analyticsDesc: 'Help us improve the app experience',
        continueButton: 'Continue',
        skipButton: 'Skip All'
      },
      hi: {
        title: 'स्मार्ट फीचर्स सक्षम करें',
        subtitle: 'व्यक्तिगत सुझाव प्रदान करने में हमारी मदद करें',
        notificationTitle: 'स्मार्ट नोटिफिकेशन',
        notificationDesc: 'समय पर रिमाइंडर और बचत की सलाह पाएं',
        locationTitle: 'लोकेशन सेवाएं',
        locationDesc: 'नजदीकी एटीएम और बैंकिंग सेवाएं खोजें',
        analyticsTitle: 'उपयोग विश्लेषण',
        analyticsDesc: 'ऐप अनुभव बेहतर बनाने में हमारी मदद करें',
        continueButton: 'जारी रखें',
        skipButton: 'सभी छोड़ें'
      },
      pb: {
        title: 'ਸਮਾਰਟ ਫੀਚਰ ਚਾਲੂ ਕਰੋ',
        subtitle: 'ਵਿਅਕਤੀਗਤ ਸਿਫਾਰਿਸ਼ਾਂ ਪ੍ਰਦਾਨ ਕਰਨ ਵਿੱਚ ਸਾਡੀ ਮਦਦ ਕਰੋ',
        notificationTitle: 'ਸਮਾਰਟ ਨੋਟਿਫਿਕੇਸ਼ਨ',
        notificationDesc: 'ਸਮੇਂ ਸਿਰ ਰਿਮਾਈਂਡਰ ਅਤੇ ਬਚਤ ਦੀਆਂ ਸਲਾਹਾਂ ਪਾਓ',
        locationTitle: 'ਟਿਕਾਣਾ ਸੇਵਾਵਾਂ',
        locationDesc: 'ਨੇੜਲੇ ਏਟੀਐਮ ਅਤੇ ਬੈਂਕਿੰਗ ਸੇਵਾਵਾਂ ਲੱਭੋ',
        analyticsTitle: 'ਵਰਤੋਂ ਵਿਸ਼ਲੇਸ਼ਣ',
        analyticsDesc: 'ਐਪ ਅਨੁਭਵ ਬਿਹਤਰ ਬਣਾਉਣ ਵਿੱਚ ਸਾਡੀ ਮਦਦ ਕਰੋ',
        continueButton: 'ਜਾਰੀ ਰੱਖੋ',
        skipButton: 'ਸਭ ਛੱਡੋ'
      }
    };
    return content[language] || content.en;
  };

  const content = getContent();

  const togglePermission = (type) => {
    setPermissions(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleContinue = () => {
    // Here you would typically request actual permissions
    // For now, we'll just proceed to the main app
    router.replace('/(tabs)/home');
  };

  const handleSkipAll = () => {
    router.replace('/(tabs)/home');
  };

  const PermissionItem = ({ icon, title, description, isEnabled, onToggle }) => (
    <View style={styles.permissionItem}>
      <View style={styles.permissionIcon}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.permissionContent}>
        <Text style={styles.permissionTitle}>{title}</Text>
        <Text style={styles.permissionDesc}>{description}</Text>
      </View>
      <TouchableOpacity
        style={[styles.toggle, isEnabled && styles.toggleEnabled]}
        onPress={onToggle}
      >
        <View style={[styles.toggleThumb, isEnabled && styles.toggleThumbEnabled]} />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={colors.backgroundGradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{content.title}</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Icon and Title */}
            <View style={styles.titleSection}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={colors.primaryGradient}
                  style={styles.iconBackground}
                >
                  <Ionicons name="shield-checkmark" size={40} color={colors.white} />
                </LinearGradient>
              </View>
              <Text style={styles.subtitle}>{content.subtitle}</Text>
            </View>

            {/* Permissions List */}
            <View style={styles.permissionsList}>
              <PermissionItem
                icon="notifications-outline"
                title={content.notificationTitle}
                description={content.notificationDesc}
                isEnabled={permissions.notifications}
                onToggle={() => togglePermission('notifications')}
              />
              
              <PermissionItem
                icon="location-outline"
                title={content.locationTitle}
                description={content.locationDesc}
                isEnabled={permissions.location}
                onToggle={() => togglePermission('location')}
              />
              
              <PermissionItem
                icon="analytics-outline"
                title={content.analyticsTitle}
                description={content.analyticsDesc}
                isEnabled={permissions.analytics}
                onToggle={() => togglePermission('analytics')}
              />
            </View>

            {/* Continue Button */}
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <LinearGradient
                colors={colors.primaryGradient}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>{content.continueButton}</Text>
                <Ionicons name="arrow-forward" size={24} color={colors.white} />
              </LinearGradient>
            </TouchableOpacity>

            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkipAll}>
              <Text style={styles.skipButtonText}>{content.skipButton}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  permissionsList: {
    marginBottom: 40,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  permissionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  permissionDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleEnabled: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  toggleThumbEnabled: {
    alignSelf: 'flex-end',
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 20,
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
});