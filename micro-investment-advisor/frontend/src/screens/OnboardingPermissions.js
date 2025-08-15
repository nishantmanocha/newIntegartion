import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';

const OnboardingPermissions = ({ navigation, route }) => {
  const { language } = useApp();
  const [permissions, setPermissions] = useState({
    sms: false,
    notifications: false,
  });

  const getContent = () => {
    const content = {
      en: {
        title: 'Enable Smart Features',
        subtitle: 'Help us provide better recommendations',
        smsTitle: 'SMS Reading (Simulation)',
        smsDescription: 'We\'ll simulate reading transaction SMS to categorize your spending automatically.',
        notificationTitle: 'Push Notifications',
        notificationDescription: 'Get daily savings reminders and important financial tips.',
        finishButton: 'Start Saving',
        skipButton: 'Maybe Later',
        privacyNote: 'Your privacy is our priority. All data stays secure and encrypted.'
      },
      hi: {
        title: 'स्मार्ट सुविधाएं सक्षम करें',
        subtitle: 'हमें बेहतर सुझाव देने में मदद करें',
        smsTitle: 'SMS रीडिंग (सिमुलेशन)',
        smsDescription: 'हम आपके खर्च को स्वचालित रूप से वर्गीकृत करने के लिए लेनदेन SMS पढ़ने का अनुकरण करेंगे।',
        notificationTitle: 'पुश नोटिफिकेशन',
        notificationDescription: 'दैनिक बचत अनुस्मारक और महत्वपूर्ण वित्तीय सुझाव प्राप्त करें।',
        finishButton: 'बचत शुरू करें',
        skipButton: 'बाद में शायद',
        privacyNote: 'आपकी गोपनीयता हमारी प्राथमिकता है। सभी डेटा सुरक्षित और एन्क्रिप्टेड रहता है।'
      },
      pb: {
        title: 'ਸਮਾਰਟ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਸਮਰੱਥ ਕਰੋ',
        subtitle: 'ਸਾਨੂੰ ਬਿਹਤਰ ਸੁਝਾਅ ਦੇਣ ਵਿੱਚ ਮਦਦ ਕਰੋ',
        smsTitle: 'SMS ਰੀਡਿੰਗ (ਸਿਮੂਲੇਸ਼ਨ)',
        smsDescription: 'ਅਸੀਂ ਤੁਹਾਡੇ ਖਰਚੇ ਨੂੰ ਆਟੋਮੈਟਿਕ ਵਰਗੀਕਰਨ ਲਈ ਲੈਣ-ਦੇਣ SMS ਪੜ੍ਹਨ ਦਾ ਅਨੁਕਰਣ ਕਰਾਂਗੇ।',
        notificationTitle: 'ਪੁਸ਼ ਨੋਟੀਫਿਕੇਸ਼ਨ',
        notificationDescription: 'ਰੋਜ਼ਾਨਾ ਬਚਤ ਰੀਮਾਈਂਡਰ ਅਤੇ ਮਹੱਤਵਪੂਰਨ ਵਿੱਤੀ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ।',
        finishButton: 'ਬਚਤ ਸ਼ੁਰੂ ਕਰੋ',
        skipButton: 'ਬਾਅਦ ਵਿੱਚ ਸ਼ਾਇਦ',
        privacyNote: 'ਤੁਹਾਡੀ ਪ੍ਰਾਈਵੇਸੀ ਸਾਡੀ ਤਰਜੀਹ ਹੈ। ਸਾਰਾ ਡੇਟਾ ਸੁਰੱਖਿਤ ਅਤੇ ਐਨਕ੍ਰਿਪਟਿਡ ਰਹਿੰਦਾ ਹੈ।'
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

  const handleSMSPermission = () => {
    // Simulate SMS permission request
    Alert.alert(
      'SMS Permission',
      'This is a simulation. In a real app, this would request SMS reading permission.',
      [
        { text: 'Deny', style: 'cancel' },
        { 
          text: 'Allow', 
          onPress: () => togglePermission('sms')
        }
      ]
    );
  };

  const handleNotificationPermission = () => {
    // Simulate notification permission request
    Alert.alert(
      'Notification Permission',
      'This is a simulation. In a real app, this would request notification permission.',
      [
        { text: 'Deny', style: 'cancel' },
        { 
          text: 'Allow', 
          onPress: () => togglePermission('notifications')
        }
      ]
    );
  };

  const handleFinish = () => {
    // Complete onboarding and navigate to main app
    if (route.params?.onComplete) {
      route.params.onComplete();
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  const handleSkip = () => {
    handleFinish();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={content.title} 
        onBack={() => navigation.goBack()}
        showLanguageToggle={false}
      />
      
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.subtitle}>{content.subtitle}</Text>
        </View>

        <View style={styles.permissionsContainer}>
          {/* SMS Permission */}
          <View style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <View style={styles.permissionIconContainer}>
                <Ionicons 
                  name="chatbubble-outline" 
                  size={24} 
                  color={permissions.sms ? colors.success : colors.textSecondary} 
                />
              </View>
              <View style={styles.permissionTextContainer}>
                <Text style={styles.permissionTitle}>{content.smsTitle}</Text>
                <Text style={styles.permissionDescription}>{content.smsDescription}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  permissions.sms && styles.toggleButtonActive
                ]}
                onPress={handleSMSPermission}
              >
                <View style={[
                  styles.toggleIndicator,
                  permissions.sms && styles.toggleIndicatorActive
                ]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Notification Permission */}
          <View style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <View style={styles.permissionIconContainer}>
                <Ionicons 
                  name="notifications-outline" 
                  size={24} 
                  color={permissions.notifications ? colors.success : colors.textSecondary} 
                />
              </View>
              <View style={styles.permissionTextContainer}>
                <Text style={styles.permissionTitle}>{content.notificationTitle}</Text>
                <Text style={styles.permissionDescription}>{content.notificationDescription}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  permissions.notifications && styles.toggleButtonActive
                ]}
                onPress={handleNotificationPermission}
              >
                <View style={[
                  styles.toggleIndicator,
                  permissions.notifications && styles.toggleIndicatorActive
                ]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.privacySection}>
          <View style={styles.privacyCard}>
            <Ionicons name="shield-checkmark" size={20} color={colors.success} />
            <Text style={styles.privacyText}>{content.privacyNote}</Text>
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>
            {language === 'hi' ? 'आपको मिलेगा:' : language === 'pb' ? 'ਤੁਹਾਨੂੰ ਮਿਲੇਗਾ:' : 'You\'ll get:'}
          </Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.benefitText}>
                {language === 'hi' ? 'व्यक्तिगत बचत सुझाव' : language === 'pb' ? 'ਵਿਅਕਤਿਗਤ ਬਚਤ ਸੁਝਾਅ' : 'Personalized savings tips'}
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.benefitText}>
                {language === 'hi' ? 'स्मार्ट खर्च ट्रैकिंग' : language === 'pb' ? 'ਸਮਾਰਟ ਖਰਚਾ ਟ੍ਰੈਕਿੰਗ' : 'Smart expense tracking'}
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.benefitText}>
                {language === 'hi' ? 'दैनिक बचत लक्ष्य' : language === 'pb' ? 'ਰੋਜ਼ਾਨਾ ਬਚਤ ਟੀਚਾ' : 'Daily savings goals'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipButtonText}>{content.skipButton}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.finishButton}
          onPress={handleFinish}
        >
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.finishButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.finishButtonText}>{content.finishButton}</Text>
            <Ionicons name="rocket" size={20} color={colors.textWhite} style={styles.buttonIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  permissionsContainer: {
    marginBottom: 30,
  },
  permissionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  permissionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  permissionTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.border,
    justifyContent: 'center',
    padding: 2,
  },
  toggleButtonActive: {
    backgroundColor: colors.success,
  },
  toggleIndicator: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleIndicatorActive: {
    alignSelf: 'flex-end',
  },
  privacySection: {
    marginBottom: 30,
  },
  privacyCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  privacyText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginLeft: 12,
  },
  benefitsSection: {
    flex: 1,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 12,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  skipButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  finishButton: {
    flex: 2,
    borderRadius: 25,
    overflow: 'hidden',
  },
  finishButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});

export default OnboardingPermissions;