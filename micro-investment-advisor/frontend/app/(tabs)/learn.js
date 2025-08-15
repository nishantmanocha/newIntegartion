import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  RefreshControl,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { useApp } from '../../src/context/AppContext';

export default function Learn() {
  const { 
    language, 
    tips, 
    api,
    loading 
  } = useApp();
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadEducationData();
  }, []);

  const loadEducationData = async () => {
    try {
      await api.getTips(language);
    } catch (error) {
      console.error('Failed to load education data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEducationData();
    setRefreshing(false);
  };

  const getContent = () => {
    const content = {
      en: {
        title: 'Learn & Grow',
        financialTips: 'Financial Tips',
        noTips: 'No tips available',
        noTipsDesc: 'Check back later for financial insights'
      },
      hi: {
        title: 'सीखें और बढ़ें',
        financialTips: 'वित्तीय सुझाव',
        noTips: 'कोई सुझाव उपलब्ध नहीं',
        noTipsDesc: 'वित्तीय अंतर्दृष्टि के लिए बाद में देखें'
      },
      pb: {
        title: 'ਸਿੱਖੋ ਅਤੇ ਵਧੋ',
        financialTips: 'ਵਿੱਤੀ ਸਲਾਹਾਂ',
        noTips: 'ਕੋਈ ਸਲਾਹ ਉਪਲਬਧ ਨਹੀਂ',
        noTipsDesc: 'ਵਿੱਤੀ ਸੂਝ ਲਈ ਬਾਅਦ ਵਿੱਚ ਵੇਖੋ'
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
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderTipItem = ({ item }) => (
    <View style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <Ionicons name="bulb" size={24} color={colors.secondary} />
        <Text style={styles.tipCategory}>{item.category || 'Tip'}</Text>
      </View>
      <Text style={styles.tipContent}>{item.content || item.tip}</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="school-outline" size={80} color={colors.textLight} />
      </View>
      <Text style={styles.emptyTitle}>{content.noTips}</Text>
      <Text style={styles.emptyDescription}>{content.noTipsDesc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      {tips && tips.length > 0 ? (
        <FlatList
          data={tips}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTipItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        renderEmptyState()
      )}
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
  searchButton: {
    padding: 8,
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  tipCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  tipContent: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
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
});