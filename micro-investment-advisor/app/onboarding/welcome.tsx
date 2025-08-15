import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const languages = [
  { code: 'EN', name: 'English' },
  { code: 'HI', name: 'हिंदी' },
  { code: 'PB', name: 'ਪੰਜਾਬੀ' },
];

export default function WelcomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const getLocalizedText = (key: string) => {
    const texts = {
      EN: {
        title: 'Save a little, grow a lot',
        subtitle: 'Your AI-powered micro-investment advisor',
        getStarted: 'Get Started',
      },
      HI: {
        title: 'थोड़ा बचाएं, बहुत बढ़ाएं',
        subtitle: 'आपका AI-संचालित माइक्रो-निवेश सलाहकार',
        getStarted: 'शुरू करें',
      },
      PB: {
        title: 'ਥੋੜਾ ਬਚਾਓ, ਬਹੁਤ ਵਧਾਓ',
        subtitle: 'ਤੁਹਾਡਾ AI-ਸੰਚਾਲਿਤ ਮਾਈਕ੍ਰੋ-ਨਿਵੇਸ਼ ਸਲਾਹਕਾਰ',
        getStarted: 'ਸ਼ੁਰੂ ਕਰੋ',
      },
    };
    return texts[selectedLanguage as keyof typeof texts][key as keyof typeof texts.EN];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>₹</Text>
          </View>
          <Text style={styles.brandName}>MicroInvest</Text>
        </View>
        
        <View style={styles.languageToggle}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.langButton,
                selectedLanguage === lang.code && styles.langButtonActive,
              ]}
              onPress={() => setSelectedLanguage(lang.code)}>
              <Text
                style={[
                  styles.langButtonText,
                  selectedLanguage === lang.code && styles.langButtonTextActive,
                ]}>
                {lang.code}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{getLocalizedText('title')}</Text>
        <Text style={styles.subtitle}>{getLocalizedText('subtitle')}</Text>
        
        <View style={styles.features}>
          <View style={styles.feature}>
            <Ionicons name="shield-checkmark" size={24} color="#006B3F" />
            <Text style={styles.featureText}>Safe & Secure</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="trending-up" size={24} color="#006B3F" />
            <Text style={styles.featureText}>Smart Investing</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="people" size={24} color="#006B3F" />
            <Text style={styles.featureText}>For Everyone</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/onboarding/form')}>
        <Text style={styles.buttonText}>{getLocalizedText('getStarted')}</Text>
        <Ionicons name="arrow-forward" size={20} color="#FAF8F0" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#006B3F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 4,
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  langButtonActive: {
    backgroundColor: '#006B3F',
  },
  langButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  langButtonTextActive: {
    color: '#FAF8F0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#006B3F',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 60,
  },
  features: {
    width: '100%',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
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