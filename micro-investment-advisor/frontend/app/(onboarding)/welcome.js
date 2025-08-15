import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { useApp } from '../../src/context/AppContext';

export default function Welcome() {
  const router = useRouter();
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
        {/* Language Toggle */}
        <TouchableOpacity style={styles.languageToggle} onPress={toggleLanguage}>
          <Text style={styles.languageText}>{content.languageLabel}</Text>
          <Ionicons name="language" size={24} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.content}>
          {/* App Icon/Logo */}
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.iconBackground}
            >
              <Ionicons name="wallet" size={60} color={colors.white} />
            </LinearGradient>
          </View>

          {/* Main Content */}
          <View style={styles.textContent}>
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.subtitle}>{content.subtitle}</Text>
            <Text style={styles.description}>{content.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <FeatureItem 
              icon="shield-checkmark" 
              text={language === 'hi' ? 'सुरक्षित निवेश' : language === 'pb' ? 'ਸੁਰੱਖਿਤ ਨਿਵੇਸ਼' : 'Safe Investments'} 
            />
            <FeatureItem 
              icon="trending-up" 
              text={language === 'hi' ? 'स्मार्ट रिकमेंडेशन' : language === 'pb' ? 'ਸਮਾਰਟ ਸਿਫਾਰਿਸ਼ਾਂ' : 'Smart Recommendations'} 
            />
            <FeatureItem 
              icon="phone-portrait" 
              text={language === 'hi' ? 'आसान उपयोग' : language === 'pb' ? 'ਸੌਖਾ ਇਸਤੇਮਾਲ' : 'Easy to Use'} 
            />
          </View>

          {/* Get Started Button */}
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/(onboarding)/form')}
          >
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>{content.button}</Text>
              <Ionicons name="arrow-forward" size={24} color={colors.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const FeatureItem = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>
      <Ionicons name={icon} size={24} color={colors.primary} />
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 20,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 25,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  languageText: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    alignItems: 'flex-start',
    marginBottom: 50,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  featureText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
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
});