import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  category: string;
  date: string;
  type: 'debit' | 'credit';
}

const categories = [
  'Essential',
  'Discretionary',
  'Debt',
  'Income',
  'Investment',
  'Transport',
  'Food',
  'Entertainment',
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Big Bazaar',
    amount: 1250,
    category: 'Essential',
    date: '2024-01-15',
    type: 'debit',
  },
  {
    id: '2',
    merchant: 'Paytm Recharge',
    amount: 100,
    category: 'Essential',
    date: '2024-01-15',
    type: 'debit',
  },
  {
    id: '3',
    merchant: 'Punjab Kirana Store',
    amount: 450,
    category: 'Food',
    date: '2024-01-14',
    type: 'debit',
  },
  {
    id: '4',
    merchant: 'Bharat Gas',
    amount: 950,
    category: 'Essential',
    date: '2024-01-14',
    type: 'debit',
  },
  {
    id: '5',
    merchant: 'State Bus Depot',
    amount: 50,
    category: 'Transport',
    date: '2024-01-13',
    type: 'debit',
  },
  {
    id: '6',
    merchant: 'Swiggy',
    amount: 350,
    category: 'Food',
    date: '2024-01-13',
    type: 'debit',
  },
  {
    id: '7',
    merchant: 'LIC Premium',
    amount: 2500,
    category: 'Investment',
    date: '2024-01-12',
    type: 'debit',
  },
  {
    id: '8',
    merchant: 'Salary Credit',
    amount: 45000,
    category: 'Income',
    date: '2024-01-01',
    type: 'credit',
  },
];

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Essential':
        return 'home';
      case 'Food':
        return 'restaurant';
      case 'Transport':
        return 'car';
      case 'Entertainment':
        return 'game-controller';
      case 'Investment':
        return 'trending-up';
      case 'Income':
        return 'add-circle';
      case 'Debt':
        return 'card';
      case 'Discretionary':
        return 'shopping-bag';
      default:
        return 'card';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Essential':
        return '#006B3F';
      case 'Food':
        return '#FF914D';
      case 'Transport':
        return '#003153';
      case 'Entertainment':
        return '#FFD700';
      case 'Investment':
        return '#28A745';
      case 'Income':
        return '#28A745';
      case 'Debt':
        return '#DC3545';
      case 'Discretionary':
        return '#6F42C1';
      default:
        return '#666';
    }
  };

  const handleEditCategory = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setSelectedCategory(transaction.category);
    setModalVisible(true);
  };

  const handleSaveCategory = () => {
    if (editingTransaction && selectedCategory) {
      setTransactions(prev =>
        prev.map(t =>
          t.id === editingTransaction.id
            ? { ...t, category: selectedCategory }
            : t
        )
      );
      setModalVisible(false);
      setEditingTransaction(null);
      setSelectedCategory('');
      Alert.alert('Success', 'Category updated successfully!');
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[
          styles.categoryIcon,
          { backgroundColor: getCategoryColor(item.category) + '20' }
        ]}>
          <Ionicons
            name={getCategoryIcon(item.category) as any}
            size={20}
            color={getCategoryColor(item.category)}
          />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.merchantName}>{item.merchant}</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
      </View>
      
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          { color: item.type === 'credit' ? '#28A745' : '#DC3545' }
        ]}>
          {item.type === 'credit' ? '+' : '-'}₹{item.amount}
        </Text>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => handleEditCategory(item)}>
          <Text style={[
            styles.categoryText,
            { color: getCategoryColor(item.category) }
          ]}>
            {item.category}
          </Text>
          <Ionicons name="chevron-down" size={16} color={getCategoryColor(item.category)} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#006B3F" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.transactionsList}
      />

      {/* Category Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Category</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>
              Select a new category for this transaction
            </Text>

            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryOption,
                    selectedCategory === category && styles.categoryOptionSelected,
                  ]}
                  onPress={() => setSelectedCategory(category)}>
                  <Ionicons
                    name={getCategoryIcon(category) as any}
                    size={20}
                    color={selectedCategory === category ? '#FFFFFF' : getCategoryColor(category)}
                  />
                  <Text style={[
                    styles.categoryOptionText,
                    selectedCategory === category && styles.categoryOptionTextSelected,
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.saveButton,
                !selectedCategory && styles.saveButtonDisabled,
              ]}
              onPress={handleSaveCategory}
              disabled={!selectedCategory}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
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
  filterButton: {
    padding: 8,
  },
  transactionsList: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryOption: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryOptionSelected: {
    backgroundColor: '#006B3F',
  },
  categoryOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  categoryOptionTextSelected: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});