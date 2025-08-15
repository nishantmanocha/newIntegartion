import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FormScreen() {
  const [formData, setFormData] = useState({
    name: '',
    incomeFrequency: 'monthly',
    monthlyIncome: '',
    rent: '',
    emi: '',
    savingsGoal: '',
  });

  const handleNext = () => {
    if (!formData.monthlyIncome || !formData.savingsGoal) {
      Alert.alert('Required Fields', 'Please fill in all required fields');
      return;
    }
    router.push('/onboarding/permissions');
  };

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
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
          <Text style={styles.headerTitle}>Financial Profile</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressDot} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Tell us about your finances</Text>
          <Text style={styles.subtitle}>
            This helps us provide personalized saving recommendations
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name (Optional)</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => updateFormData('name', text)}
                placeholder="Enter your name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Income Frequency *</Text>
              <View style={styles.radioGroup}>
                {['weekly', 'monthly', 'yearly'].map((freq) => (
                  <TouchableOpacity
                    key={freq}
                    style={[
                      styles.radioButton,
                      formData.incomeFrequency === freq && styles.radioButtonActive,
                    ]}
                    onPress={() => updateFormData('incomeFrequency', freq)}>
                    <View style={[
                      styles.radioCircle,
                      formData.incomeFrequency === freq && styles.radioCircleActive,
                    ]} />
                    <Text style={[
                      styles.radioText,
                      formData.incomeFrequency === freq && styles.radioTextActive,
                    ]}>
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Monthly Income (₹) *</Text>
              <TextInput
                style={styles.input}
                value={formData.monthlyIncome}
                onChangeText={(text) => updateFormData('monthlyIncome', text)}
                placeholder="Enter monthly income"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Monthly Rent (₹)</Text>
              <TextInput
                style={styles.input}
                value={formData.rent}
                onChangeText={(text) => updateFormData('rent', text)}
                placeholder="Enter monthly rent"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Monthly EMI (₹)</Text>
              <TextInput
                style={styles.input}
                value={formData.emi}
                onChangeText={(text) => updateFormData('emi', text)}
                placeholder="Enter monthly EMI"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Daily Savings Goal (₹) *</Text>
              <TextInput
                style={styles.input}
                value={formData.savingsGoal}
                onChangeText={(text) => updateFormData('savingsGoal', text)}
                placeholder="Enter daily savings goal"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#FAF8F0" />
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
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginHorizontal: 4,
  },
  radioButtonActive: {
    borderColor: '#006B3F',
    backgroundColor: '#F0F8F0',
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 8,
  },
  radioCircleActive: {
    borderColor: '#006B3F',
    backgroundColor: '#006B3F',
  },
  radioText: {
    fontSize: 14,
    color: '#666',
  },
  radioTextActive: {
    color: '#006B3F',
    fontWeight: '600',
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