import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  RefreshControl 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Header from '../components/Header';

const EducationScreen = ({ navigation }) => {
  const { 
    language, 
    tips, 
    api 
  } = useApp();
  
  const [refreshing, setRefreshing] = useState(false);
  const [expandedTips, setExpandedTips] = useState(new Set());

  useEffect(() => {
    loadTips();
  }, [language]);

  const loadTips = async () => {
    try {
      await api.getTips(language);
    } catch (error) {
      console.error('Failed to load tips:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTips();
    setRefreshing(false);
  };

  const getContent = () => {
    const content = {
      en: {
        title: 'Learn',
        subtitle: 'Financial education made simple',
        noTips: 'No tips available',
        noTipsDesc: 'Tips will appear here to help you save better',
        categories: {
          savings: 'Savings',
          budgeting: 'Budgeting',
          fraud_prevention: 'Fraud Prevention',
          planning: 'Planning',
          investment: 'Investment'
        }
      },
      hi: {
        title: 'सीखें',
        subtitle: 'वित्तीय शिक्षा को सरल बनाया गया',
        noTips: 'कोई सुझाव उपलब्ध नहीं',
        noTipsDesc: 'बेहतर बचत में आपकी मदद के लिए सुझाव यहाँ दिखाई देंगे',
        categories: {
          savings: 'बचत',
          budgeting: 'बजटिंग',
          fraud_prevention: 'धोखाधड़ी रोकथाम',
          planning: 'योजना',
          investment: 'निवेश'
        }
      },
      pb: {
        title: 'ਸਿੱਖੋ',
        subtitle: 'ਵਿੱਤੀ ਸਿੱਖਿਆ ਨੂੰ ਸਰਲ ਬਣਾਇਆ ਗਿਆ',
        noTips: 'ਕੋਈ ਸੁਝਾਅ ਉਪਲਬਧ ਨਹੀਂ',
        noTipsDesc: 'ਬਿਹਤਰ ਬਚਤ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਸੁਝਾਅ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ',
        categories: {
          savings: 'ਬਚਤ',
          budgeting: 'ਬਜਟਿੰਗ',
          fraud_prevention: 'ਧੋਖਾਧੜੀ ਰੋਕਥਾਮ',
          planning: 'ਯੋਜਨਾ',
          investment: 'ਨਿਵੇਸ਼'
        }
      }
    };
    return content[language] || content.en;
  };

  const content = getContent();

  const toggleTipExpansion = (tipId) => {
    const newExpandedTips = new Set(expandedTips);
    if (newExpandedTips.has(tipId)) {
      newExpandedTips.delete(tipId);
    } else {
      newExpandedTips.add(tipId);
    }
    setExpandedTips(newExpandedTips);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      savings: 'wallet-outline',
      budgeting: 'calculator-outline',
      fraud_prevention: 'shield-checkmark-outline',
      planning: 'map-outline',
      investment: 'trending-up-outline'
    };
    return icons[category] || 'information-circle-outline';
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      savings: colors.success,
      budgeting: colors.info,
      fraud_prevention: colors.error,
      planning: colors.warning,
      investment: colors.primary
    };
    return categoryColors[category] || colors.textSecondary;
  };

  const renderTip = ({ item }) => {
    const isExpanded = expandedTips.has(item.id);
    
    return (
      <TouchableOpacity 
        style={styles.tipCard}
        onPress={() => toggleTipExpansion(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.tipHeader}>
          <View style={styles.tipIconContainer}>
            <Ionicons 
              name={getCategoryIcon(item.category)} 
              size={24} 
              color={getCategoryColor(item.category)} 
            />
          </View>
          
          <View style={styles.tipHeaderText}>
            <Text style={styles.tipTitle}>{item.title}</Text>
            <View style={styles.categoryBadge}>
              <Text style={[
                styles.categoryBadgeText,
                { color: getCategoryColor(item.category) }
              ]}>
                {content.categories[item.category] || item.category}
              </Text>
            </View>
          </View>
          
          <View style={styles.expandIcon}>
            <Ionicons 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color={colors.textSecondary} 
            />
          </View>
        </View>
        
        {isExpanded && (
          <View style={styles.tipContent}>
            <Text style={styles.tipDescription}>{item.content}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="school-outline" size={64} color={colors.textLight} />
      <Text style={styles.emptyStateTitle}>{content.noTips}</Text>
      <Text style={styles.emptyStateDescription}>{content.noTipsDesc}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.subtitle}>{content.subtitle}</Text>
      
      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{tips.length}</Text>
          <Text style={styles.statLabel}>
            {language === 'hi' ? 'सुझाव' : language === 'pb' ? 'ਸੁਝਾਅ' : 'Tips'}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {new Set(tips.map(tip => tip.category)).size}
          </Text>
          <Text style={styles.statLabel}>
            {language === 'hi' ? 'श्रेणियां' : language === 'pb' ? 'ਸ਼੍ਰੇਣੀਆਂ' : 'Categories'}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {Math.ceil(tips.reduce((acc, tip) => acc + tip.content.length, 0) / 1000)}
          </Text>
          <Text style={styles.statLabel}>
            {language === 'hi' ? 'मिनट पढ़ें' : language === 'pb' ? 'ਮਿੰਟ ਪੜ੍ਹੋ' : 'Min Read'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={content.title} />
      
      <FlatList
        data={tips}
        renderItem={renderTip}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tips.length === 0 ? styles.emptyContainer : styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        ListHeaderComponent={tips.length > 0 ? renderHeader : null}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  headerContainer: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tipHeaderText: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
    lineHeight: 22,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  expandIcon: {
    marginLeft: 12,
  },
  tipContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tipDescription: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
    marginTop: 16,
  },
  emptyState: {
    alignItems: 'center',
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
    lineHeight: 22,
  },
});

export default EducationScreen;