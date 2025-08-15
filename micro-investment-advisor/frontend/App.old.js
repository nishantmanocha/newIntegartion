import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

// Import screens
import OnboardingWelcome from './src/screens/OnboardingWelcome';
import OnboardingForm from './src/screens/OnboardingForm';
import OnboardingPermissions from './src/screens/OnboardingPermissions';
import HomeScreen from './src/screens/HomeScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import PlannerScreen from './src/screens/PlannerScreen';
import EducationScreen from './src/screens/EducationScreen';

// Import context
import { AppProvider } from './src/context/AppContext';
import { colors } from './src/theme/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Planner') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Learn') {
            iconName = focused ? 'school' : 'school-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen}
        options={{ tabBarLabel: 'Transactions' }}
      />
      <Tab.Screen 
        name="Planner" 
        component={PlannerScreen}
        options={{ tabBarLabel: 'Planner' }}
      />
      <Tab.Screen 
        name="Learn" 
        component={EducationScreen}
        options={{ tabBarLabel: 'Learn' }}
      />
    </Tab.Navigator>
  );
}

// Onboarding stack navigator
function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={OnboardingWelcome} />
      <Stack.Screen name="Form" component={OnboardingForm} />
      <Stack.Screen name="Permissions" component={OnboardingPermissions} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={colors.primary} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isOnboardingComplete ? (
            <Stack.Screen name="Onboarding">
              {(props) => (
                <OnboardingNavigator 
                  {...props} 
                  onComplete={() => setIsOnboardingComplete(true)} 
                />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Main" component={MainTabNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}