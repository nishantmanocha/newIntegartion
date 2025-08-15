import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface Budget {
  essentials: number;
  discretionary: number;
  debt: number;
}

export default function PlannerScreen() {
  const [budget, setBudget] = useState<Budget>({
    essentials: 15000,
    discretionary: 8000,
    debt: 5000,
  });
  const [monthlyProjection, setMonthlyProjection] = useState(12000);
  const [emergencyFund, setEmergencyFund] = useState(25000);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget>({ ...budget });

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 107, 63, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [8000, 9500, 12000, 11000, 13500, 12000],
      },
    ],
  };

  const pieChartData = [
    {
      name: 'Essentials',
      population: budget.essentials,
      color: '#006B3F',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Discretionary',
      population: budget.discretionary,
      color: '#FF914D',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Debt',
      population: budget.debt,
      color: '#DC3545',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ];

  const handleEditBudget = () => {
    setEditingBudget({ ...budget });
    setModalVisible(true);
  };

  const handleSaveBudget = () => {
    setBudget({ ...editingBudget });
    setModalVisible(false);
    Alert.alert('Success', 'Budget updated successfully!');
  };

  const handleInputChange = (key: keyof Budget, value: string) => {
    const numValue = parseInt(value) || 0;
    setEditingBudget(prev => ({ ...prev, [key]: numValue }));
  };

  const getSurplusStatus = () => {
    const totalBudget = budget.essentials + budget.discretionary + budget.debt;
    const surplus = monthlyProjection - totalBudget;
    
    if (surplus > 0) {
      return { status: 'Positive', color: '#28A745', icon: 'trending-up' };
    } else if (surplus < 0) {
      return { status: 'Negative', color: '#DC3545', icon: 'trending-down' };
    } else {
      return { status: 'Balanced', color: '#FFC107', icon: 'remove' };
    }
  };

  const surplusStatus = getSurplusStatus();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Financial Planner</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditBudget}>
            <Ionicons name="create" size={24} color="#006B3F" />
          </TouchableOpacity>
        </View>

        {/* Monthly Projection Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Projection</Text>
          <View style={styles.projectionContent}>
            <View style={styles.projectionLeft}>
              <Text style={styles.projectionAmount}>₹{monthlyProjection.toLocaleString()}</Text>
              <Text style={styles.projectionLabel}>Expected Income</Text>
            </View>
            <View style={styles.projectionRight}>
              <View style={[
                styles.surplusBadge,
                { backgroundColor: surplusStatus.color + '20' }
              ]}>
                <Ionicons name={surplusStatus.icon as any} size={20} color={surplusStatus.color} />
                <Text style={[styles.surplusText, { color: surplusStatus.color }]}>
                  {surplusStatus.status}
                </Text>
              </View>
            </View>
          </View>
          
          <BarChart
            data={monthlyData}
            width={screenWidth - 60}
            height={200}
            chartConfig={chartConfig}
            style={styles.chart}
            showBarTops
            showValuesOnTopOfBars
            yAxisLabel="₹"
            yAxisSuffix=""
          />
        </View>

        {/* Budget Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Budget Breakdown</Text>
          <View style={styles.budgetChart}>
            <PieChart
              data={pieChartData}
              width={screenWidth - 60}
              height={180}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
          
          <View style={styles.budgetDetails}>
            <View style={styles.budgetItem}>
              <View style={styles.budgetItemLeft}>
                <View style={[styles.budgetColor, { backgroundColor: '#006B3F' }]} />
                <Text style={styles.budgetLabel}>Essentials</Text>
              </View>
              <Text style={styles.budgetAmount}>₹{budget.essentials.toLocaleString()}</Text>
            </View>
            
            <View style={styles.budgetItem}>
              <View style={styles.budgetItemLeft}>
                <View style={[styles.budgetColor, { backgroundColor: '#FF914D' }]} />
                <Text style={styles.budgetLabel}>Discretionary</Text>
              </View>
              <Text style={styles.budgetAmount}>₹{budget.discretionary.toLocaleString()}</Text>
            </View>
            
            <View style={styles.budgetItem}>
              <View style={styles.budgetItemLeft}>
                <View style={[styles.budgetColor, { backgroundColor: '#DC3545' }]} />
                <Text style={styles.budgetLabel}>Debt</Text>
              </View>
              <Text style={styles.budgetAmount}>₹{budget.debt.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Emergency Fund Tracker */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Emergency Fund</Text>
          <View style={styles.emergencyContent}>
            <View style={styles.emergencyIcon}>
              <Ionicons name="shield-checkmark" size={32} color="#006B3F" />
            </View>
            <View style={styles.emergencyText}>
              <Text style={styles.emergencyAmount}>₹{emergencyFund.toLocaleString()}</Text>
              <Text style={styles.emergencyDescription}>
                Your safety net for unexpected expenses
              </Text>
            </View>
          </View>
          
          <View style={styles.emergencyProgress}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min((emergencyFund / 50000) * 100, 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((emergencyFund / 50000) * 100)}% of ₹50,000 goal
            </Text>
          </View>
        </View>

        {/* Savings Tips */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Smart Saving Tips</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#FFD700" />
              <Text style={styles.tipText}>
                Automate your savings to avoid forgetting
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="calculator" size={20} color="#006B3F" />
              <Text style={styles.tipText}>
                Review your budget monthly and adjust as needed
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="trending-up" size={20} color="#28A745" />
              <Text style={styles.tipText}>
                Start with small amounts and increase gradually
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Budget Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Budget</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>
              Adjust your monthly budget allocations
            </Text>

            <View style={styles.budgetInputs}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Essentials (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={editingBudget.essentials.toString()}
                  onChangeText={(text) => handleInputChange('essentials', text)}
                  placeholder="Enter amount"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Discretionary (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={editingBudget.discretionary.toString()}
                  onChangeText={(text) => handleInputChange('discretionary', text)}
                  placeholder="Enter amount"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Debt (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={editingBudget.debt.toString()}
                  onChangeText={(text) => handleInputChange('debt', text)}
                  placeholder="Enter amount"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Total Budget:</Text>
              <Text style={styles.totalAmount}>
                ₹{(editingBudget.essentials + editingBudget.discretionary + editingBudget.debt).toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveBudget}>
              <Text style={styles.saveButtonText}>Save Budget</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F0',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  editButton: {
    padding: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  projectionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  projectionLeft: {
    flex: 1,
  },
  projectionAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 4,
  },
  projectionLabel: {
    fontSize: 14,
    color: '#666',
  },
  projectionRight: {
    alignItems: 'flex-end',
  },
  surplusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  surplusText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  budgetChart: {
    alignItems: 'center',
    marginBottom: 20,
  },
  budgetDetails: {
    marginTop: 16,
  },
  budgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  budgetItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  budgetLabel: {
    fontSize: 16,
    color: '#333',
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  emergencyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 4,
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#666',
  },
  emergencyProgress: {
    marginTop: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#006B3F',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  tipsList: {
    marginTop: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  budgetInputs: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
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
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  saveButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});