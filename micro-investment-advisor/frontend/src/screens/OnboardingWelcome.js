import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const OnboardingWelcome = ({ navigation }) => {
  const { language, setLanguage } = useApp();

  const toggleLanguage = () => {
    const languages = ['en', 'hi', 'pb'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const getContent = () => {
    const content = {
      en: {
        title: 'Save a little, grow a lot',
        subtitle: 'Your AI-powered micro-investment companion',
        description: 'Start saving just ₹10-₹50 daily and watch your money grow safely with smart recommendations tailored for you.',
        button: 'Get Started',
        languageLabel: 'EN'
      },
      hi: {
        title: 'थोड़ा बचाएं, बहुत बढ़ाएं',
        subtitle: 'आपका AI-संचालित माइक्रो-निवेश साथी',
        description: 'रोज़ाना सिर्फ ₹10-₹50 की बचत शुरू करें और आपके लिए तैयार स्मार्ट सुझावों के साथ अपना पैसा सुरक्षित रूप से बढ़ता देखें।',
        button: 'शुरू करें',
        languageLabel: 'हि'
      },
      pb: {
        title: 'ਥੋੜ੍ਹਾ ਬਚਾਓ, ਬਹੁਤ ਵਧਾਓ',
        subtitle: 'ਤੁਹਾਡਾ AI-ਸੰਚਾਲਿਤ ਮਾਈਕਰੋ-ਨਿਵੇਸ਼ ਸਾਥੀ',
        description: 'ਰੋਜ਼ਾਨਾ ਸਿਰਫ ₹10-₹50 ਦੀ ਬਚਤ ਸ਼ੁਰੂ ਕਰੋ ਅਤੇ ਤੁਹਾਡੇ ਲਈ ਤਿਆਰ ਸਮਾਰਟ ਸੁਝਾਵਾਂ ਨਾਲ ਆਪਣਾ ਪੈਸਾ ਸੁਰੱਖਿਤ ਰੂਪ ਵਿੱਚ ਵਧদਾ ਦੇਖੋ।',
        button: 'ਸ਼ੁਰੂ ਕਰੋ',
        languageLabel: 'ਪਾ'
      }
    };
    return content[language] || content.en;
  };

  const content = getContent();

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
            <Text style={styles.languageText}>{content.languageLabel}</Text>
            <Ionicons name="globe-outline" size={16} color={colors.primary} style={styles.languageIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>₹</Text>
              <Ionicons name="trending-up" size={32} color={colors.secondary} style={styles.logoIcon} />
            </View>
            <Text style={styles.appName}>Micro Advisor</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.subtitle}>{content.subtitle}</Text>
            <Text style={styles.description}>{content.description}</Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Ionicons name="shield-checkmark" size={24} color={colors.success} />
              <Text style={styles.featureText}>Bank-level Security</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="trending-up" size={24} color={colors.primary} />
              <Text style={styles.featureText}>Smart AI Recommendations</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="people" size={24} color={colors.accentOrange} />
              <Text style={styles.featureText}>Built for Everyone</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Form')}
          >
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>{content.button}</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.textWhite} style={styles.buttonIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
  languageIcon: {
    marginLeft: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 4,
  },
  logoIcon: {
    marginLeft: 4,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  featuresContainer: {
    alignItems: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 12,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  getStartedButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});

export default OnboardingWelcome;