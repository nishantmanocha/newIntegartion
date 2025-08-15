import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const Header = ({ title, showLanguageToggle = true, onBack = null }) => {
  const { language, setLanguage } = useApp();

  const toggleLanguage = () => {
    const languages = ['en', 'hi', 'pb'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const getLanguageLabel = () => {
    const labels = {
      'en': 'EN',
      'hi': 'हि',
      'pb': 'ਪਾ'
    };
    return labels[language] || 'EN';
  };

  return (
    <LinearGradient
      colors={colors.primaryGradient}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.content}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.textWhite} />
          </TouchableOpacity>
        )}
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {showLanguageToggle && (
          <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
            <Text style={styles.languageText}>{getLanguageLabel()}</Text>
            <Ionicons name="globe-outline" size={16} color={colors.textWhite} style={styles.languageIcon} />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 44, // Status bar height
    paddingBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 44,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textWhite,
    textAlign: 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  languageText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textWhite,
    marginRight: 4,
  },
  languageIcon: {
    marginLeft: 2,
  },
});

export default Header;