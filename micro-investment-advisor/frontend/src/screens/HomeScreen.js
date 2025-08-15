import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  RefreshControl,
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Header from '../components/Header';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
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
        generateFresh: 'ਨਵਾਂ ਡੇਟਾ ਜਨਰੇਟ ਕਰੋ',
        impactMessage: 'ਤੁਸੀਂ ਆਪਣਾ ਟੀਚਾ ਪੂਰਾ ਕਰੋਗੇ',
        monthsEarlier: 'ਮਹੀਨੇ ਪਹਿਲਾਂ',
        confidence: 'ਭਰੋਸਾ',
        viewAll: 'ਸਭ ਦੇਖੋ'
      }
    };
    return content[language] || content.en;
  };

  const content = getContent();

  const handleSaveNow = () => {
    Alert.alert(
      content.saveNow,
      `${language === 'hi' ? 'क्या आप ₹' + (safeSave?.amount || 25) + ' बचाना चाहते हैं?' : 
        language === 'pb' ? 'ਕੀ ਤੁਸੀਂ ₹' + (safeSave?.amount || 25) + ' ਬਚਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?' :
        'Would you like to save ₹' + (safeSave?.amount || 25) + '?'}`,
      [
        { text: language === 'hi' ? 'रद्द करें' : language === 'pb' ? 'ਰੱਦ ਕਰੋ' : 'Cancel', style: 'cancel' },
        { 
          text: language === 'hi' ? 'हां, बचाएं' : language === 'pb' ? 'ਹਾਂ, ਬਚਾਓ' : 'Yes, Save',
          onPress: async () => {
            try {
              await api.addTransaction({
                merchant: 'Manual Savings',
                amount: -(safeSave?.amount || 25),
                category: 'Essential'
              });
              Alert.alert(
                language === 'hi' ? 'बचत सफल!' : language === 'pb' ? 'ਬਚਤ ਸਫਲ!' : 'Savings Successful!',
                `${formatCurrency(safeSave?.amount || 25)} ${language === 'hi' ? 'सफलतापूर्वक बचाया गया' : language === 'pb' ? 'ਸਫਲਤਾਪੂਰਵਕ ਬਚਾਇਆ ਗਿਆ' : 'saved successfully'}`
              );
              loadDashboardData();
            } catch (error) {
              Alert.alert('Error', 'Failed to save. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleGenerateFreshTransactions = () => {
    Alert.alert(
      language === 'hi' ? 'नए लेन-देन जेनरेट करें' : 
      language === 'pb' ? 'ਨਵੇਂ ਲੈਣ-ਦੇਣ ਜਨਰੇਟ ਕਰੋ' : 
      'Generate Fresh Transactions',
      language === 'hi' ? 'क्या आप 20-25 नए अनोखे लेन-देन जेनरेट करना चाहते हैं?' :
      language === 'pb' ? 'ਕੀ ਤੁਸੀਂ 20-25 ਨਵੇਂ ਵਿਲੱਖਣ ਲੈਣ-ਦੇਣ ਜਨਰੇਟ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?' :
      'Do you want to generate 20-25 fresh unique transactions?',
      [
        { text: language === 'hi' ? 'रद्द करें' : language === 'pb' ? 'ਰੱਦ ਕਰੋ' : 'Cancel', style: 'cancel' },
        { 
          text: language === 'hi' ? 'हां, जेनरेट करें' : language === 'pb' ? 'ਹਾਂ, ਜਨਰੇਟ ਕਰੋ' : 'Yes, Generate',
          onPress: async () => {
            try {
              const result = await api.generateFreshTransactions();
              Alert.alert(
                language === 'hi' ? 'सफल!' : language === 'pb' ? 'ਸਫਲ!' : 'Success!',
                `${result.count} ${language === 'hi' ? 'नए लेन-देन जेनरेट किए गए' : language === 'pb' ? 'ਨਵੇਂ ਲੈਣ-ਦੇਣ ਜਨਰੇਟ ਕੀਤੇ ਗਏ' : 'fresh transactions generated'}`
              );
              loadDashboardData();
            } catch (error) {
              Alert.alert('Error', 'Failed to generate transactions. Please try again.');
            }
          }
        }
      ]
    );
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence?.toLowerCase()) {
      case 'high': return colors.success;
      case 'medium': return colors.warning;
      case 'low': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getWeeklyChartData = () => {
    if (!weeklyData || Object.keys(weeklyData).length === 0) {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0],
          strokeWidth: 3,
          color: (opacity = 1) => `rgba(0, 107, 63, ${opacity})`,
        }]
      };
    }

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = days.map(day => weeklyData[day]?.savings || 0);

    return {
      labels: days,
      datasets: [{
        data: data,
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(0, 107, 63, ${opacity})`,
      }]
    };
  };

  const chartConfig = {
    backgroundColor: colors.white,
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 107, 63, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={content.title} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>{content.greeting}</Text>
          <Text style={styles.subtitle}>
            {language === 'hi' ? 'आइए आज कुछ बचत करते हैं' : 
             language === 'pb' ? 'ਆਓ ਅੱਜ ਕੁਝ ਬਚਤ ਕਰੀਏ' : 
             'Let\'s save something today'}
          </Text>
        </View>

        {/* Today's Safe Save Card */}
        <Card title={content.todaySave} gradient={colors.primaryGradient}>
          <View style={styles.safeSaveContent}>
            <View style={styles.safeSaveMain}>
              <Text style={styles.safeSaveAmount}>
                {formatCurrency(safeSave?.amount || 25)}
              </Text>
              <View style={styles.confidenceContainer}>
                <View style={[
                  styles.confidenceBadge,
                  { backgroundColor: getConfidenceColor(safeSave?.confidence) }
                ]}>
                  <Text style={styles.confidenceText}>
                    {safeSave?.confidence || 'Medium'} {content.confidence}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.safeSaveMessage}>
              {safeSave?.message || 
               `Based on your spending today, you can safely save ₹${safeSave?.amount || 25}`}
            </Text>
          </View>
        </Card>

        {/* Weekly Chart Card */}
        <Card title={content.weeklyChart} showGradientHeader={false}>
          <View style={styles.chartContainer}>
            <LineChart
              data={getWeeklyChartData()}
              width={screenWidth - 64}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </Card>

        {/* Impact Card */}
        <Card title={content.impact} gradient={colors.secondaryGradient}>
          <View style={styles.impactContent}>
            <View style={styles.impactIcon}>
              <Ionicons name="trending-up" size={32} color={colors.success} />
            </View>
            <View style={styles.impactText}>
              <Text style={styles.impactTitle}>
                {content.impactMessage}
              </Text>
              <Text style={styles.impactSubtitle}>
                {Math.floor((projection?.projectedSavings || 5000) / (safeSave?.amount || 25) / 30)} {content.monthsEarlier}
              </Text>
            </View>
            <View style={styles.impactAmount}>
              <Text style={styles.impactAmountText}>
                {formatCurrency(projection?.projectedSavings || 5000)}
              </Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <Card title={content.quickActions} showGradientHeader={false}>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleSaveNow}>
              <LinearGradient
                colors={colors.primaryGradient}
                style={styles.actionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="wallet" size={24} color={colors.textWhite} />
                <Text style={styles.actionButtonText}>{content.saveNow}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonSecondary}>
                <Ionicons name="pause-circle" size={24} color={colors.warning} />
                <Text style={styles.actionButtonSecondaryText}>{content.pauseSaving}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Planner')}
            >
              <View style={styles.actionButtonSecondary}>
                <Ionicons name="flag" size={24} color={colors.info} />
                <Text style={styles.actionButtonSecondaryText}>{content.setGoal}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleGenerateFreshTransactions}
            >
              <View style={[styles.actionButtonSecondary, { backgroundColor: colors.secondary + '20' }]}>
                <Ionicons name="refresh" size={24} color={colors.secondary} />
                <Text style={[styles.actionButtonSecondaryText, { color: colors.secondary }]}>{content.generateFresh}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Recent Insights */}
        <Card title={language === 'hi' ? 'हाल की जानकारी' : language === 'pb' ? 'ਤਾਜ਼ੀ ਜਾਣਕਾਰੀ' : 'Recent Insights'} showGradientHeader={false}>
          <View style={styles.insightsContainer}>
            <View style={styles.insightItem}>
              <Ionicons name="trending-down" size={20} color={colors.success} />
              <Text style={styles.insightText}>
                {language === 'hi' ? 'इस सप्ताह 12% कम खर्च किया' : 
                 language === 'pb' ? 'ਇਸ ਹਫ਼ਤੇ 12% ਘੱਟ ਖਰਚ ਕੀਤਾ' : 
                 'Spent 12% less this week'}
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="restaurant" size={20} color={colors.warning} />
              <Text style={styles.insightText}>
                {language === 'hi' ? 'खाने पर ₹450 बचा सकते हैं' : 
                 language === 'pb' ? 'ਖਾਣੇ ਉੱਤੇ ₹450 ਬਚਾ ਸਕਦੇ ਹੋ' : 
                 'Could save ₹450 on food'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
              <Text style={styles.viewAllText}>{content.viewAll} →</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={styles.bottomPadding} />
      </ScrollView>
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
  greetingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  safeSaveContent: {
    alignItems: 'center',
  },
  safeSaveMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  safeSaveAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginRight: 16,
  },
  confidenceContainer: {
    flexDirection: 'row',
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textWhite,
  },
  safeSaveMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  chart: {
    borderRadius: 16,
  },
  impactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactIcon: {
    marginRight: 16,
  },
  impactText: {
    flex: 1,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  impactSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  impactAmount: {
    alignItems: 'flex-end',
  },
  impactAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.success,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
    marginLeft: 12,
  },
  actionButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 12,
  },
  insightsContainer: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 12,
    flex: 1,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'right',
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;