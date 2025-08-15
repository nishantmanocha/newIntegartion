import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  RefreshControl,
  Alert,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

import { colors } from '../../src/theme/colors';
import { useApp } from '../../src/context/AppContext';

const { width: screenWidth } = Dimensions.get('window');

export default function Home() {
  const { 
    language, 
    safeSave, 
    weeklyData, 
    projection, 
    user, 
    api, 
    formatCurrency, 
    loading 
  } = useApp();
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      await Promise.all([
        api.getSafeSave(),
        api.getWeeklyData(),
        api.getProjection()
      ]);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const getContent = () => {
    const content = {
      en: {
        title: 'Home',
        greeting: user?.name ? `Hello, ${user.name}!` : 'Hello!',
        todaySave: 'Today\'s Safe Save',
        weeklyChart: 'Weekly Savings',
        impact: 'Your Impact',
        quickActions: 'Quick Actions',
        saveNow: 'Save Now',
        pauseSaving: 'Pause Saving',
        setGoal: 'Set Goal',
        generateFresh: 'Generate Fresh Data',
        impactMessage: 'You\'ll reach your goal',
        monthsEarlier: 'months sooner',
        confidence: 'Confidence',
        viewAll: 'View All'
      },
      hi: {
        title: 'होम',
        greeting: user?.name ? `नमस्ते, ${user.name}!` : 'नमस्ते!',
        todaySave: 'आज की सुरक्षित बचत',
        weeklyChart: 'साप्ताहिक बचत',
        impact: 'आपका प्रभाव',
        quickActions: 'त्वरित क्रियाएं',
        saveNow: 'अभी बचाएं',
        pauseSaving: 'बचत रोकें',
        setGoal: 'लक्ष्य सेट करें',
        generateFresh: 'नया डेटा जेनरेट करें',
        impactMessage: 'आप अपना लक्ष्य पूरा करेंगे',
        monthsEarlier: 'महीने पहले',
        confidence: 'विश्वास',
        viewAll: 'सभी देखें'
      },
      pb: {
        title: 'ਘਰ',
        greeting: user?.name ? `ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ${user.name}!` : 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ!',
        todaySave: 'ਅੱਜ ਦੀ ਸੁਰੱਖਿਤ ਬਚਤ',
        weeklyChart: 'ਹਫ਼ਤਾਵਾਰੀ ਬਚਤ',
        impact: 'ਤੁਹਾਡਾ ਪ੍ਰਭਾਵ',
        quickActions: 'ਤੇਜ਼ ਕਾਰਵਾਈਆਂ',
        saveNow: 'ਹੁਣ ਬਚਾਓ',
        pauseSaving: 'ਬਚਤ ਰੋਕੋ',
        setGoal: 'ਟੀਚਾ ਸੈੱਟ ਕਰੋ',
        generateFresh: 'ਨਵਾਂ ਡੇਟਾ ਬਣਾਓ',
        impactMessage: 'ਤੁਸੀਂ ਆਪਣਾ ਟੀਚਾ ਪੂਰਾ ਕਰੋਗੇ',
        monthsEarlier: 'ਮਹੀਨੇ ਪਹਿਲਾਂ',
        confidence: 'ਭਰੋਸਾ',
        viewAll: 'ਸਭ ਦੇਖੋ'
      }
    };
    return content[language] || content.en;
  };

  const content = getContent();

  const handleGenerateFresh = async () => {
    try {
      await api.generateFreshTransactions();
      Alert.alert('Success', 'Fresh data generated successfully!');
      await loadDashboardData();
    } catch (error) {
      Alert.alert('Error', 'Failed to generate fresh data. Please try again.');
    }
  };

  const renderHeader = () => (
    <LinearGradient 
      colors={colors.primaryGradient} 
      style={styles.headerGradient}
    >
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>{content.greeting}</Text>
            <Text style={styles.subtitle}>Let's grow your wealth today</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderSafeSaveCard = () => (
    <View style={styles.card}>
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.safeSaveGradient}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{content.todaySave}</Text>
          <Ionicons name="shield-checkmark" size={24} color={colors.white} />
        </View>
        <Text style={styles.safeSaveAmount}>
          {formatCurrency(safeSave?.amount || 0)}
        </Text>
        <Text style={styles.safeSaveDesc}>
          Based on your spending pattern
        </Text>
      </LinearGradient>
    </View>
  );

  const renderWeeklyChart = () => {
    if (!weeklyData?.chartData) return null;

    const chartConfig = {
      backgroundGradientFrom: colors.white,
      backgroundGradientTo: colors.white,
      color: (opacity = 1) => `rgba(0, 107, 63, ${opacity})`,
      strokeWidth: 3,
      barPercentage: 0.7,
      useShadowColorFromDataset: false,
      decimalPlaces: 0,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: colors.primary
      }
    };

    return (
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitleDark}>{content.weeklyChart}</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>{content.viewAll}</Text>
          </TouchableOpacity>
        </View>
        <LineChart
          data={weeklyData.chartData}
          width={screenWidth - 60}
          height={200}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
    );
  };

  const renderImpactCard = () => (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitleDark}>{content.impact}</Text>
        <View style={styles.confidenceBadge}>
          <Text style={styles.confidenceText}>
            {content.confidence}: {projection?.confidence || 85}%
          </Text>
        </View>
      </View>
      
      <View style={styles.impactContent}>
        <Text style={styles.impactMessage}>
          {content.impactMessage} {projection?.monthsEarlier || 3} {content.monthsEarlier}
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={colors.primaryGradient}
              style={[styles.progressFill, { width: `${projection?.progress || 35}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{projection?.progress || 35}% complete</Text>
        </View>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitleDark}>{content.quickActions}</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={colors.primaryGradient}
            style={styles.actionGradient}
          >
            <Ionicons name="add-circle" size={24} color={colors.white} />
            <Text style={styles.actionText}>{content.saveNow}</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.actionGradient, { backgroundColor: colors.warning }]}>
            <Ionicons name="pause-circle" size={24} color={colors.white} />
            <Text style={styles.actionText}>{content.pauseSaving}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.actionGradient, { backgroundColor: colors.info }]}>
            <Ionicons name="trophy" size={24} color={colors.white} />
            <Text style={styles.actionText}>{content.setGoal}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleGenerateFresh}>
          <View style={[styles.actionGradient, { backgroundColor: colors.accent }]}>
            <Ionicons name="refresh-circle" size={24} color={colors.white} />
            <Text style={styles.actionText}>{content.generateFresh}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
          {renderSafeSaveCard()}
          {renderWeeklyChart()}
          {renderImpactCard()}
          {renderQuickActions()}
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
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  profileButton: {
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
  safeSaveGradient: {
    borderRadius: 16,
    padding: 20,
    margin: -20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  cardTitleDark: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  safeSaveAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  safeSaveDesc: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  confidenceBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  confidenceText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  impactContent: {
    marginTop: 12,
  },
  impactMessage: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 16,
    lineHeight: 24,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'right',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  actionText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});