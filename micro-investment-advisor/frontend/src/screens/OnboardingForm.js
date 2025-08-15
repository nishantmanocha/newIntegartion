import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';

const OnboardingForm = ({ navigation }) => {
  const { language, api } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    incomeFrequency: 'monthly',
    rent: '',
    emi: '',
    goal: '',
  });
  const [loading, setLoading] = useState(false);

  const getContent = () => {
    const content = {
      en: {
        title: 'Tell us about yourself',
        nameLabel: 'Your Name (Optional)',
        namePlaceholder: 'Enter your name',
        incomeLabel: 'Income Frequency',
        rentLabel: 'Monthly Rent (₹)',
        rentPlaceholder: 'e.g., 8000',
        emiLabel: 'Monthly EMI (₹)',
        emiPlaceholder: 'e.g., 2000',
        goalLabel: 'Savings Goal (₹)',
        goalPlaceholder: 'e.g., 50000',
        continueButton: 'Continue',
        skipButton: 'Skip for now'
      },
      hi: {
        title: 'अपने बारे में बताएं',
        nameLabel: 'आपका नाम (वैकल्पिक)',
        namePlaceholder: 'अपना नाम दर्ज करें',
        incomeLabel: 'आय की आवृत्ति',
        rentLabel: 'मासिक किराया (₹)',
        rentPlaceholder: 'जैसे, 8000',
        emiLabel: 'मासिक EMI (₹)',
        emiPlaceholder: 'जैसे, 2000',
        goalLabel: 'बचत का लक्ष्य (₹)',
        goalPlaceholder: 'जैसे, 50000',
        continueButton: 'जारी रखें',
        skipButton: 'अभी के लिए छोड़ें'
      },
      pb: {
        title: 'ਆਪਣੇ ਬਾਰੇ ਦੱਸੋ',
        nameLabel: 'ਤੁਹਾਡਾ ਨਾਮ (ਵਿਕਲਪਿਕ)',
        namePlaceholder: 'ਆਪਣਾ ਨਾਮ ਦਰਜ ਕਰੋ',
        incomeLabel: 'ਆਮਦਨ ਦੀ ਬਾਰੰਬਾਰਤਾ',
        rentLabel: 'ਮਾਸਿਕ ਕਿਰਾਇਆ (₹)',
        rentPlaceholder: 'ਜਿਵੇਂ, 8000',
        emiLabel: 'ਮਾਸਿਕ EMI (₹)',
        emiPlaceholder: 'ਜਿਵੇਂ, 2000',
        goalLabel: 'ਬਚਤ ਦਾ ਟੀਚਾ (₹)',
        goalPlaceholder: 'ਜਿਵੇਂ, 50000',
        continueButton: 'ਜਾਰੀ ਰੱਖੋ',
        skipButton: 'ਹੁਣ ਲਈ ਛੱਡੋ'
      }
    };
    return content[language] || content.en;
  };

  const content = getContent();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = async () => {
    try {
      setLoading(true);
      
      const userData = {
        ...formData,
        rent: parseFloat(formData.rent) || 0,
        emi: parseFloat(formData.emi) || 0,
        goal: parseFloat(formData.goal) || 10000,
        language: language
      };

      await api.setupUser(userData);
      navigation.navigate('Permissions');
    } catch (error) {
      Alert.alert('Error', 'Failed to save your information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Permissions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={content.title} 
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{content.nameLabel}</Text>
              <TextInput
                style={styles.input}
                placeholder={content.namePlaceholder}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholderTextColor={colors.textLight}
              />
            </View>

            {/* Income Frequency */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{content.incomeLabel}</Text>
              <View style={styles.frequencyContainer}>
                {['weekly', 'monthly'].map((freq) => (
                  <TouchableOpacity
                    key={freq}
                    style={[
                      styles.frequencyButton,
                      formData.incomeFrequency === freq && styles.frequencyButtonActive
                    ]}
                    onPress={() => handleInputChange('incomeFrequency', freq)}
                  >
                    <Text style={[
                      styles.frequencyText,
                      formData.incomeFrequency === freq && styles.frequencyTextActive
                    ]}>
                      {freq === 'weekly' ? 
                        (language === 'hi' ? 'साप्ताहिक' : language === 'pb' ? 'ਹਫ਼ਤਾਵਾਰੀ' : 'Weekly') :
                        (language === 'hi' ? 'मासिक' : language === 'pb' ? 'ਮਾਸਿਕ' : 'Monthly')
                      }
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Rent Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{content.rentLabel}</Text>
              <TextInput
                style={styles.input}
                placeholder={content.rentPlaceholder}
                value={formData.rent}
                onChangeText={(value) => handleInputChange('rent', value)}
                keyboardType="numeric"
                placeholderTextColor={colors.textLight}
              />
            </View>

            {/* EMI Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{content.emiLabel}</Text>
              <TextInput
                style={styles.input}
                placeholder={content.emiPlaceholder}
                value={formData.emi}
                onChangeText={(value) => handleInputChange('emi', value)}
                keyboardType="numeric"
                placeholderTextColor={colors.textLight}
              />
            </View>

            {/* Goal Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{content.goalLabel}</Text>
              <TextInput
                style={styles.input}
                placeholder={content.goalPlaceholder}
                value={formData.goal}
                onChangeText={(value) => handleInputChange('goal', value)}
                keyboardType="numeric"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color={colors.info} />
            <Text style={styles.infoText}>
              {language === 'hi' 
                ? 'यह जानकारी हमें आपके लिए बेहतर सुझाव देने में मदद करती है। आप बाद में भी इसे बदल सकते हैं।'
                : language === 'pb'
                ? 'ਇਹ ਜਾਣਕਾਰੀ ਸਾਨੂੰ ਤੁਹਾਡੇ ਲਈ ਬਿਹਤਰ ਸੁਝਾਅ ਦੇਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ। ਤੁਸੀਂ ਬਾਅਦ ਵਿੱਚ ਵੀ ਇਸਨੂੰ ਬਦਲ ਸਕਦੇ ਹੋ।'
                : 'This information helps us provide better recommendations for you. You can change this later.'
              }
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipButtonText}>{content.skipButton}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
          disabled={loading}
        >
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.continueButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.continueButtonText}>
              {loading ? '...' : content.continueButton}
            </Text>
            {!loading && (
              <Ionicons name="arrow-forward" size={20} color={colors.textWhite} style={styles.buttonIcon} />
            )}
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.textPrimary,
  },
  frequencyContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  frequencyButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  frequencyButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  frequencyText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  frequencyTextActive: {
    color: colors.textWhite,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
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
  continueButton: {
    flex: 2,
    borderRadius: 25,
    overflow: 'hidden',
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});

export default OnboardingForm;