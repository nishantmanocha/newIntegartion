import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TextInput,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Header from '../components/Header';

const { width: screenWidth } = Dimensions.get('window');

const PlannerScreen = ({ navigation }) => {
  const { 
    language, 
    projection, 
    budgets, 
    api, 
    formatCurrency 
  } = useApp();
  
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetForm, setBudgetForm] = useState({
    essentials: '',
    discretionary: '',
    debt: ''
  });

  useEffect(() => {
    loadPlannerData();
  }, []);

  useEffect(() => {
    if (budgets && Object.keys(budgets).length > 0) {
      setBudgetForm({
        essentials: budgets.essentials?.toString() || '',
        discretionary: budgets.discretionary?.toString() || '',
        debt: budgets.debt?.toString() || ''
      });
    }
  }, [budgets]);

  const loadPlannerData = async () => {
    try {
      await Promise.all([
        api.getProjection(),
        api.getBudgets()
      ]);
    } catch (error) {
      console.error('Failed to load planner data:', error);
    }
  };

  const getContent = () => {
    const content = {
      en: {
        title: 'Planner',
        monthlyProjection: 'Monthly Projection',
        budgetPlanning: 'Budget Planning',
        emergencyFund: 'Emergency Fund',
        totalIncome: 'Total Income',
        totalExpenses: 'Total Expenses',
        projectedSavings: 'Projected Savings',
        savingsRate: 'Savings Rate',
        essentials: 'Essentials',
        discretionary: 'Discretionary',
        debt: 'Debt & EMIs',
        editBudget: 'Edit Budget',
        saveBudget: 'Save Budget',
        cancel: 'Cancel',
        emergencyGoal: 'Emergency Goal',
        currentSaved: 'Current Saved'
      },
      hi: {
        title: 'योजनाकार',
        monthlyProjection: 'मासिक प्रक्षेपण',
        budgetPlanning: 'बजट योजना',
        emergencyFund: 'आपातकालीन फंड',
        totalIncome: 'कुल आय',
        totalExpenses: 'कुल खर्च',
        projectedSavings: 'अनुमानित बचत',
        savingsRate: 'बचत दर',
        essentials: 'आवश्यक',
        discretionary: 'विवेकाधीन',
        debt: 'ऋण और EMI',
        editBudget: 'बजट संपादित करें',
        saveBudget: 'बजट सहेजें',
        cancel: 'रद्द करें',
        emergencyGoal: 'आपातकालीन लक्ष्य',
        currentSaved: 'वर्तमान बचत'
      },
      pb: {
        title: 'ਯੋਜਨਾਕਾਰ',
        monthlyProjection: 'ਮਾਸਿਕ ਪ੍ਰੋਜੈਕਸ਼ਨ',
        budgetPlanning: 'ਬਜਟ ਯੋਜਨਾ',
        emergencyFund: 'ਐਮਰਜੈਂਸੀ ਫੰਡ',
        totalIncome: 'ਕੁੱਲ ਆਮਦਨ',
        totalExpenses: 'ਕੁੱਲ ਖਰਚ',
        projectedSavings: 'ਅਨੁਮਾਨਿਤ ਬਚਤ',
        savingsRate: 'ਬਚਤ ਦਰ',
        essentials: 'ਜ਼ਰੂਰੀ',
        discretionary: 'ਵਿਵੇਕਾਧੀਨ',
        debt: 'ਕਰਜ਼ਾ ਅਤੇ EMI',
        editBudget: 'ਬਜਟ ਸੰਪਾਦਿਤ ਕਰੋ',
        saveBudget: 'ਬਜਟ ਸੇਵ ਕਰੋ',
        cancel: 'ਰੱਦ ਕਰੋ',
        emergencyGoal: 'ਐਮਰਜੈਂਸੀ ਟੀਚਾ',
        currentSaved: 'ਮੌਜੂਦਾ ਬਚਤ'
      }
    };
    return content[language] || content.en;
  };

  const content = getContent();

  const handleSaveBudget = async () => {
    try {
      await api.updateBudgets({
        essentials: parseFloat(budgetForm.essentials) || 0,
        discretionary: parseFloat(budgetForm.discretionary) || 0,
        debt: parseFloat(budgetForm.debt) || 0
      });
      setEditingBudget(false);
      Alert.alert(
        language === 'hi' ? 'सफलता' : language === 'pb' ? 'ਸਫਲਤਾ' : 'Success',
        language === 'hi' ? 'बजट सफलतापूर्वक अपडेट किया गया' : 
        language === 'pb' ? 'ਬਜਟ ਸਫਲਤਾਪੂਰਵਕ ਅਪਡੇਟ ਕੀਤਾ ਗਿਆ' :
        'Budget updated successfully'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update budget. Please try again.');
    }
  };

  const getPieChartData = () => {
    const data = [
      {
        name: content.essentials,
        amount: budgets?.essentials || 15000,
        color: colors.essential,
        legendFontColor: colors.textPrimary,
        legendFontSize: 12,
      },
      {
        name: content.discretionary,
        amount: budgets?.discretionary || 5000,
        color: colors.discretionary,
        legendFontColor: colors.textPrimary,
        legendFontSize: 12,
      },
      {
        name: content.debt,
        amount: budgets?.debt || 3000,
        color: colors.debt,
        legendFontColor: colors.textPrimary,
        legendFontSize: 12,
      },
    ];
    return data;
  };

  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={content.title} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Monthly Projection Card */}
        <Card title={content.monthlyProjection} gradient={colors.primaryGradient}>
          <View style={styles.projectionGrid}>
            <View style={styles.projectionItem}>
              <Text style={styles.projectionLabel}>{content.totalIncome}</Text>
              <Text style={styles.projectionValue}>
                {formatCurrency(projection?.totalIncome || 25000)}
              </Text>
            </View>
            <View style={styles.projectionItem}>
              <Text style={styles.projectionLabel}>{content.totalExpenses}</Text>
              <Text style={styles.projectionValue}>
                {formatCurrency(projection?.totalExpenses || 20000)}
              </Text>
            </View>
            <View style={styles.projectionItem}>
              <Text style={styles.projectionLabel}>{content.projectedSavings}</Text>
              <Text style={[styles.projectionValue, { color: colors.success }]}>
                {formatCurrency(projection?.projectedSavings || 5000)}
              </Text>
            </View>
            <View style={styles.projectionItem}>
              <Text style={styles.projectionLabel}>{content.savingsRate}</Text>
              <Text style={[styles.projectionValue, { color: colors.success }]}>
                {projection?.savingsRate || 20}%
              </Text>
            </View>
          </View>
        </Card>

        {/* Budget Planning Card */}
        <Card 
          title={content.budgetPlanning} 
          showGradientHeader={false}
        >
          <View style={styles.chartContainer}>
            <PieChart
              data={getPieChartData()}
              width={screenWidth - 64}
              height={200}
              chartConfig={chartConfig}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              center={[10, 10]}
            />
          </View>

          {!editingBudget ? (
            <View>
              <View style={styles.budgetList}>
                {getPieChartData().map((item, index) => (
                  <View key={index} style={styles.budgetItem}>
                    <View style={[styles.budgetColorDot, { backgroundColor: item.color }]} />
                    <Text style={styles.budgetItemName}>{item.name}</Text>
                    <Text style={styles.budgetItemAmount}>{formatCurrency(item.amount)}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setEditingBudget(true)}
              >
                <Ionicons name="pencil" size={16} color={colors.primary} />
                <Text style={styles.editButtonText}>{content.editBudget}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.budgetForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{content.essentials}</Text>
                <TextInput
                  style={styles.input}
                  value={budgetForm.essentials}
                  onChangeText={(value) => setBudgetForm(prev => ({ ...prev, essentials: value }))}
                  keyboardType="numeric"
                  placeholder="15000"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{content.discretionary}</Text>
                <TextInput
                  style={styles.input}
                  value={budgetForm.discretionary}
                  onChangeText={(value) => setBudgetForm(prev => ({ ...prev, discretionary: value }))}
                  keyboardType="numeric"
                  placeholder="5000"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{content.debt}</Text>
                <TextInput
                  style={styles.input}
                  value={budgetForm.debt}
                  onChangeText={(value) => setBudgetForm(prev => ({ ...prev, debt: value }))}
                  keyboardType="numeric"
                  placeholder="3000"
                />
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setEditingBudget(false)}
                >
                  <Text style={styles.cancelButtonText}>{content.cancel}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={handleSaveBudget}
                >
                  <Text style={styles.saveButtonText}>{content.saveBudget}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Card>

        {/* Emergency Fund Card */}
        <Card title={content.emergencyFund} gradient={colors.secondaryGradient}>
          <View style={styles.emergencyContent}>
            <View style={styles.emergencyIcon}>
              <Ionicons name="shield-checkmark" size={32} color={colors.success} />
            </View>
            <View style={styles.emergencyDetails}>
              <View style={styles.emergencyRow}>
                <Text style={styles.emergencyLabel}>{content.emergencyGoal}</Text>
                <Text style={styles.emergencyValue}>
                  {formatCurrency((budgets?.essentials || 15000) * 6)}
                </Text>
              </View>
              <View style={styles.emergencyRow}>
                <Text style={styles.emergencyLabel}>{content.currentSaved}</Text>
                <Text style={styles.emergencyValue}>
                  {formatCurrency(projection?.projectedSavings || 5000)}
                </Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[
                    styles.progressFill,
                    { 
                      width: `${Math.min(100, ((projection?.projectedSavings || 5000) / ((budgets?.essentials || 15000) * 6)) * 100)}%` 
                    }
                  ]} />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(((projection?.projectedSavings || 5000) / ((budgets?.essentials || 15000) * 6)) * 100)}%
                </Text>
              </View>
            </View>
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
  projectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  projectionItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  projectionLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  projectionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  budgetList: {
    gap: 12,
    marginTop: 16,
  },
  budgetItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  budgetItemName: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  budgetItemAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 16,
  },
  editButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  budgetForm: {
    gap: 16,
    marginTop: 16,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.textPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: colors.textWhite,
    fontWeight: '600',
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyIcon: {
    marginRight: 16,
  },
  emergencyDetails: {
    flex: 1,
  },
  emergencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  emergencyLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emergencyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
  bottomPadding: {
    height: 20,
  },
});

export default PlannerScreen;