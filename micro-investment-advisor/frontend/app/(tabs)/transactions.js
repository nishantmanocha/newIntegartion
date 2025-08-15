import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  RefreshControl,
  Alert,
  Modal,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { useApp } from '../../src/context/AppContext';

const { width: screenWidth } = Dimensions.get('window');

export default function Transactions() {
  const { 
    language, 
    transactions, 
    api, 
    formatCurrency, 
    formatDate, 
    getCategoryIcon, 
    getCategoryColor 
  } = useApp();
  
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      await api.getTransactions();
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  const getContent = () => {
    const content = {
      en: {
        title: 'Transactions',
        noTransactions: 'No transactions yet',
        noTransactionsDesc: 'Your transactions will appear here',
        editCategory: 'Edit Category',
        categories: {
          Essential: 'Essential',
          Discretionary: 'Discretionary', 
          Debt: 'Debt',
          Income: 'Income'
        }
      },
      hi: {
        title: 'लेन-देन',
        noTransactions: 'अभी तक कोई लेन-देन नहीं',
        noTransactionsDesc: 'आपके लेन-देन यहाँ दिखाई देंगे',
        editCategory: 'श्रेणी संपादित करें',
        categories: {
          Essential: 'आवश्यक',
          Discretionary: 'विवेकाधीन',
          Debt: 'ऋण',
          Income: 'आय'
        }
      },
      pb: {
        title: 'ਲੈਣ-ਦੇਣ',
        noTransactions: 'ਅਜੇ ਤੱਕ ਕੋਈ ਲੈਣ-ਦੇਣ ਨਹੀਂ',
        noTransactionsDesc: 'ਤੁਹਾਡੇ ਲੈਣ-ਦੇਣ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ',
        editCategory: 'ਸ਼੍ਰੇਣੀ ਸੰਪਾਦਿਤ ਕਰੋ',
        categories: {
          Essential: 'ਜ਼ਰੂਰੀ',
          Discretionary: 'ਵਿਵੇਕਪੂਰਨ',
          Debt: 'ਕਰਜ਼ਾ',
          Income: 'ਆਮਦਨ'
        }
      }
    };
    return content[language] || content.en;
  };

  const content = getContent();

  const handleEditCategory = (transaction) => {
    setSelectedTransaction(transaction);
    setShowCategoryModal(true);
  };

  const updateTransactionCategory = async (newCategory) => {
    try {
      await api.updateTransaction(selectedTransaction.id, { category: newCategory });
      setShowCategoryModal(false);
      setSelectedTransaction(null);
      Alert.alert('Success', 'Category updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update category. Please try again.');
    }
  };

  const renderHeader = () => (
    <LinearGradient 
      colors={colors.primaryGradient} 
      style={styles.headerGradient}
    >
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{content.title}</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.transactionCard}
      onPress={() => handleEditCategory(item)}
      activeOpacity={0.7}
    >
      <View style={styles.transactionLeft}>
        <View style={[
          styles.categoryIcon, 
          { backgroundColor: getCategoryColor(item.category) + '20' }
        ]}>
          <Text style={styles.categoryEmoji}>{getCategoryIcon(item.category)}</Text>
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionDescription} numberOfLines={1}>
            {item.description}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
          <View style={styles.categoryBadge}>
            <Text style={[
              styles.categoryText,
              { color: getCategoryColor(item.category) }
            ]}>
              {content.categories[item.category] || item.category}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          item.type === 'Income' ? styles.incomeAmount : styles.expenseAmount
        ]}>
          {item.type === 'Income' ? '+' : '-'}{formatCurrency(Math.abs(item.amount))}
        </Text>
        <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="receipt-outline" size={80} color={colors.textLight} />
      </View>
      <Text style={styles.emptyTitle}>{content.noTransactions}</Text>
      <Text style={styles.emptyDescription}>{content.noTransactionsDesc}</Text>
    </View>
  );

  const renderCategoryModal = () => (
    <Modal
      visible={showCategoryModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{content.editCategory}</Text>
            <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.categoriesList}>
            {Object.keys(content.categories).map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryOption,
                  selectedTransaction?.category === category && styles.selectedCategory
                ]}
                onPress={() => updateTransactionCategory(category)}
              >
                <View style={styles.categoryOptionLeft}>
                  <Text style={styles.categoryEmoji}>{getCategoryIcon(category)}</Text>
                  <Text style={styles.categoryOptionText}>
                    {content.categories[category]}
                  </Text>
                </View>
                {selectedTransaction?.category === category && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      {transactions && transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={renderTransactionItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        renderEmptyState()
      )}
      
      {renderCategoryModal()}
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
  filterButton: {
    padding: 8,
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  transactionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  transactionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  transactionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  incomeAmount: {
    color: colors.success,
  },
  expenseAmount: {
    color: colors.error,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  categoriesList: {
    gap: 12,
  },
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  selectedCategory: {
    backgroundColor: colors.primary + '10',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  categoryOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    marginLeft: 12,
  },
});