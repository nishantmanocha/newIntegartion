import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../src/theme/colors';

export default function Index() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if onboarding is complete (this could come from AsyncStorage in a real app)
    // For now, we'll assume it's not complete and redirect to onboarding
    setTimeout(() => {
      if (!isOnboardingComplete) {
        router.replace('/(onboarding)/welcome');
      } else {
        router.replace('/(tabs)/home');
      }
    }, 1000); // Add a small delay for splash effect
  }, [isOnboardingComplete]);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: colors.primary 
    }}>
      <Text style={{ 
        color: colors.white, 
        fontSize: 24, 
        fontWeight: 'bold' 
      }}>
        Micro Investment Advisor
      </Text>
    </View>
  );
}