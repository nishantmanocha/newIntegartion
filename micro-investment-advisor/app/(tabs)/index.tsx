import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [todaySavings, setTodaySavings] = useState(45);
  const [confidenceLevel, setConfidenceLevel] = useState('High');
  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    // Simulate data loading
    const mockWeeklyData = [25, 30, 45, 35, 50, 40, 45];
    setWeeklyData(mockWeeklyData);
  }, []);

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
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#006B3F',
    },
  };

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'High':
        return '#28A745';
      case 'Medium':
        return '#FFC107';
      case 'Low':
        return '#DC3545';
      default:
        return '#28A745';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.subtitle}>Ready to grow your savings?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#006B3F" />
          </TouchableOpacity>
        </View>

        {/* Today's Safe Save Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Today's Safe Save</Text>
            <View style={[
              styles.confidenceBadge,
              { backgroundColor: getConfidenceColor(confidenceLevel) }
            ]}>
              <Text style={styles.confidenceText}>{confidenceLevel}</Text>
            </View>
          </View>
          <Text style={styles.savingsAmount}>₹{todaySavings}</Text>
          <Text style={styles.savingsDescription}>
            Based on your spending patterns and goals
          </Text>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="add-circle" size={20} color="#FAF8F0" />
            <Text style={styles.saveButtonText}>Save Now</Text>
          </TouchableOpacity>
        </View>

        {/* Weekly Savings Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Progress</Text>
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  data: weeklyData,
                },
              ],
            }}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          <View style={styles.chartStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹{Math.max(...weeklyData)}</Text>
              <Text style={styles.statLabel}>Best Day</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹{Math.round(weeklyData.reduce((a, b) => a + b, 0) / weeklyData.length)}</Text>
              <Text style={styles.statLabel}>Average</Text>
            </View>
          </View>
        </View>

        {/* Impact Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Impact</Text>
          <View style={styles.impactContent}>
            <View style={styles.impactIcon}>
              <Ionicons name="trending-up" size={32} color="#006B3F" />
            </View>
            <View style={styles.impactText}>
              <Text style={styles.impactTitle}>
                You'll reach ₹50,000 in 8 months sooner!
              </Text>
              <Text style={styles.impactDescription}>
                Keep up this pace and you'll achieve your goal faster than expected.
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="pause-circle" size={24} color="#FF914D" />
              </View>
              <Text style={styles.actionText}>Pause Saving</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="flag" size={24} color="#006B3F" />
              </View>
              <Text style={styles.actionText}>Set Goal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="analytics" size={24} color="#003153" />
              </View>
              <Text style={styles.actionText}>View Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="help-circle" size={24} color="#FFD700" />
              </View>
              <Text style={styles.actionText}>Get Help</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  profileButton: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  confidenceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  savingsAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 8,
  },
  savingsDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#006B3F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FAF8F0',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  impactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  impactText: {
    flex: 1,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  impactDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});