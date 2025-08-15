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
import { useRouter } from 'expo-router';
import { colors } from '../../src/theme/colors';
import { useApp } from '../../src/context/AppContext';

export default function Form() {
  const router = useRouter();
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

  const validateForm = () => {
    if (!formData.rent || !formData.emi || !formData.goal) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await api.setupUser(formData);
      router.push('/(onboarding)/permissions');
    } catch (error) {
      Alert.alert('Error', 'Failed to save your information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push('/(onboarding)/permissions');
  };

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
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{content.nameLabel}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={content.namePlaceholder}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholderTextColor={colors.textLight}
                />
              </View>
            </View>

            {/* Income Frequency */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{content.incomeLabel}</Text>
              <View style={styles.radioGroup}>
                {['monthly', 'weekly', 'daily'].map((freq) => (
                  <TouchableOpacity
                    key={freq}
                    style={[
                      styles.radioOption,
                      formData.incomeFrequency === freq && styles.radioOptionSelected
                    ]}
                    onPress={() => handleInputChange('incomeFrequency', freq)}
                  >
                    <Text style={[
                      styles.radioText,
                      formData.incomeFrequency === freq && styles.radioTextSelected
                    ]}>
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Monthly Rent */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{content.rentLabel} *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="home-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={content.rentPlaceholder}
                  value={formData.rent}
                  onChangeText={(value) => handleInputChange('rent', value)}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                />
              </View>
            </View>

            {/* Monthly EMI */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{content.emiLabel} *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="card-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={content.emiPlaceholder}
                  value={formData.emi}
                  onChangeText={(value) => handleInputChange('emi', value)}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                />
              </View>
            </View>

            {/* Savings Goal */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{content.goalLabel} *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="trophy-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
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

            {/* Continue Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <LinearGradient
                colors={loading ? [colors.textLight, colors.textLight] : colors.primaryGradient}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>{content.continueButton}</Text>
                {loading ? (
                  <Ionicons name="hourglass-outline" size={24} color={colors.white} />
                ) : (
                  <Ionicons name="arrow-forward" size={24} color={colors.white} />
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
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
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioOption: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  radioOptionSelected: {
    backgroundColor: colors.primary,
  },
  radioText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  radioTextSelected: {
    color: colors.white,
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
  buttonDisabled: {
    elevation: 2,
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