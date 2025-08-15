import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Simulate checking if user has completed onboarding
    // In a real app, this would check AsyncStorage or backend
    setTimeout(() => {
      setHasCompletedOnboarding(false); // Set to false to show onboarding first
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF8F0' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#006B3F', marginBottom: 20 }}>
          MicroInvest
        </Text>
        <ActivityIndicator size="large" color="#006B3F" />
        <Text style={{ marginTop: 20, color: '#666' }}>Loading your financial journey...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!hasCompletedOnboarding ? (
        <Stack.Screen name="onboarding" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}