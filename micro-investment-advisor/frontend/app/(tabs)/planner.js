import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  RefreshControl,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { useApp } from '../../src/context/AppContext';

const { width: screenWidth } = Dimensions.get('window');

export default function Planner() {
  const { 
    language, 
    budgets, 
    projection, 
    api, 
    formatCurrency,
    loading 
  } = useApp();
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPlannerData();
  }, []);

  const loadPlannerData = async () => {
    try {
      await Promise.all([
        api.getBudgets(),
        api.getProjection()
      ]);
    } catch (error) {
      console.error('Failed to load planner data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPlannerData();
    setRefreshing(false);
  };

  const getContent = () => {
    const content = {
      en: {
        title: 'Financial Planner',
        budgets: 'Monthly Budgets',
        goals: 'Savings Goals',
        projections: 'Projections',
        setBudget: 'Set Budget',
        editGoals: 'Edit Goals'
      },
      hi: {
        title: 'वित्तीय योजनाकार',
        budgets: 'मासिक बजट',
        goals: 'बचत लक्ष्य',
        projections: 'अनुमान',
        setBudget: 'बजट सेट करें',
        editGoals: 'लक्ष्य संपादित करें'
      },
      pb: {
        title: 'ਵਿੱਤੀ ਯੋਜਨਾਕਾਰ',
        budgets: 'ਮਾਸਿਕ ਬਜਟ',
        goals: 'ਬਚਤ ਟੀਚੇ',
        projections: 'ਅਨੁਮਾਨ',
        setBudget: 'ਬਜਟ ਸੈੱਟ ਕਰੋ',
        editGoals: 'ਟੀਚੇ ਸੰਪਾਦਿਤ ਕਰੋ'
      }
    };
    return content[language] || content.en;
  };

  const content = getContent();

  const renderHeader = () => (
    <LinearGradient 
      colors={colors.primaryGradient} 
      style={styles.headerGradient}
    >
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{content.title}</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{content.budgets}</Text>
            <Text style={styles.cardSubtitle}>Budget management coming soon</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{content.setBudget}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{content.goals}</Text>
            <Text style={styles.cardSubtitle}>Goal tracking coming soon</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{content.editGoals}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});