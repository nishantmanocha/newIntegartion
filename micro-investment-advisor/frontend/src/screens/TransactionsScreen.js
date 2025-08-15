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
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';

const TransactionsScreen = ({ navigation }) => {
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
          Discretionary: 'ਵਿਵੇਕਾਧੀਨ',
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
    if (!selectedTransaction) return;

    try {
      await api.updateTransaction(selectedTransaction.id, { category: newCategory });
      setShowCategoryModal(false);
      setSelectedTransaction(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to update category. Please try again.');
    }
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
            } catch (error) {
              Alert.alert('Error', 'Failed to generate transactions. Please try again.');
            }
          }
        }
      ]
    );
  };

  const renderTransaction = ({ item }) => (
    <TouchableOpacity 
      style={styles.transactionItem}
      onPress={() => handleEditCategory(item)}
    >
      <View style={styles.transactionIcon}>
        <Text style={styles.iconText}>{getCategoryIcon(item.category)}</Text>
      </View>
      
      <View style={styles.transactionDetails}>
        <Text style={styles.merchantName}>{item.merchant}</Text>
        <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
        <View style={styles.categoryBadge}>
          <View style={[
            styles.categoryDot,
            { backgroundColor: getCategoryColor(item.category) }
          ]} />
          <Text style={styles.categoryText}>
            {content.categories[item.category] || item.category}
          </Text>
        </View>
      </View>
      
      <View style={styles.transactionAmount}>
        <Text style={[
          styles.amountText,
          { color: item.amount > 0 ? colors.success : colors.textPrimary }
        ]}>
          {formatCurrency(Math.abs(item.amount))}
        </Text>
        <Ionicons 
          name="chevron-forward" 
          size={16} 
          color={colors.textLight} 
        />
      </View>
    </TouchableOpacity>
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
          <Text style={styles.modalTitle}>{content.editCategory}</Text>
          
          {Object.keys(content.categories).map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryOption,
                selectedTransaction?.category === category && styles.categoryOptionSelected
              ]}
              onPress={() => updateTransactionCategory(category)}
            >
              <Text style={styles.categoryOptionIcon}>{getCategoryIcon(category)}</Text>
              <Text style={styles.categoryOptionText}>
                {content.categories[category]}
              </Text>
              {selectedTransaction?.category === category && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={() => setShowCategoryModal(false)}
          >
            <Text style={styles.modalCancelText}>
              {language === 'hi' ? 'रद्द करें' : language === 'pb' ? 'ਰੱਦ ਕਰੋ' : 'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="receipt-outline" size={64} color={colors.textLight} />
      <Text style={styles.emptyStateTitle}>{content.noTransactions}</Text>
      <Text style={styles.emptyStateDescription}>{content.noTransactionsDesc}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={content.title} />
      
      {/* Generate Fresh Transactions Button */}
      <View style={styles.headerActions}>
        <TouchableOpacity 
          style={styles.generateButton}
          onPress={handleGenerateFreshTransactions}
        >
          <Ionicons name="refresh" size={16} color={colors.white} />
          <Text style={styles.generateButtonText}>
            {language === 'hi' ? 'नया डेटा' : language === 'pb' ? 'ਨਵਾਂ ਡੇਟਾ' : 'Fresh Data'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={transactions.length === 0 ? styles.emptyContainer : styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
      
      {renderCategoryModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerActions: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'flex-end',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  generateButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 6,
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  merchantName: {
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  transactionAmount: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryOptionSelected: {
    backgroundColor: colors.background,
  },
  categoryOptionIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  categoryOptionText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  modalCancelButton: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});

export default TransactionsScreen;