import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'transactions') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'planner') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'learn') {
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
      <Tabs.Screen 
        name="home" 
        options={{ 
          tabBarLabel: 'Home',
          title: 'Home'
        }}
      />
      <Tabs.Screen 
        name="transactions" 
        options={{ 
          tabBarLabel: 'Transactions',
          title: 'Transactions'
        }}
      />
      <Tabs.Screen 
        name="planner" 
        options={{ 
          tabBarLabel: 'Planner',
          title: 'Planner'
        }}
      />
      <Tabs.Screen 
        name="learn" 
        options={{ 
          tabBarLabel: 'Learn',
          title: 'Learn'
        }}
      />
    </Tabs>
  );
}