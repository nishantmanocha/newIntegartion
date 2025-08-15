import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Tip {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'saving' | 'fraud' | 'investment';
  icon: string;
  color: string;
}

const tips: Tip[] = [
  {
    id: '1',
    title: 'Start Small, Think Big',
    description: 'Begin with ₹10-50 daily savings and gradually increase',
    content: 'The key to successful saving is consistency, not the amount. Start with what you can comfortably afford, even if it\'s just ₹10 per day. Over time, as you get used to the habit, you can increase the amount. Remember, ₹10 daily becomes ₹3,650 in a year!',
    category: 'saving',
    icon: 'trending-up',
    color: '#28A745',
  },
  {
    id: '2',
    title: 'Beware of Fake Investment Schemes',
    description: 'Learn to identify and avoid fraudulent investment offers',
    content: 'If an investment opportunity promises unrealistic returns (like doubling your money in weeks), it\'s likely a scam. Legitimate investments typically offer 8-15% annual returns. Always verify the company\'s registration with SEBI and never invest through unregistered platforms.',
    category: 'fraud',
    icon: 'shield-checkmark',
    color: '#DC3545',
  },
  {
    id: '3',
    title: 'Emergency Fund First',
    description: 'Build a safety net before investing in riskier assets',
    content: 'Before investing in stocks or mutual funds, ensure you have 3-6 months of expenses saved in an emergency fund. This protects you from having to sell investments at a loss during financial emergencies. Keep this money in a high-yield savings account for easy access.',
    category: 'saving',
    icon: 'umbrella',
    color: '#006B3F',
  },
  {
    id: '4',
    title: 'Never Share OTP or PIN',
    description: 'Protect your banking credentials from fraudsters',
    content: 'Banks and financial institutions will never ask for your OTP, PIN, or password over phone or email. If someone claims to be from your bank and asks for these details, it\'s a scam. Hang up immediately and call your bank\'s official number to verify.',
    category: 'fraud',
    icon: 'lock-closed',
    color: '#FF914D',
  },
  {
    id: '5',
    title: 'Diversify Your Investments',
    description: 'Spread your money across different asset classes',
    content: 'Don\'t put all your eggs in one basket. Diversify across different investment types: fixed deposits for safety, mutual funds for growth, and gold for inflation protection. This reduces risk and improves your chances of consistent returns over time.',
    category: 'investment',
    icon: 'layers',
    color: '#6F42C1',
  },
  {
    id: '6',
    title: 'Track Your Expenses',
    description: 'Monitor spending to identify saving opportunities',
    content: 'Use apps or simple spreadsheets to track every rupee you spend. Categorize expenses to see where your money goes. You\'ll often find surprising areas where you can cut back, like unused subscriptions or impulse purchases. Small cuts add up to big savings.',
    category: 'saving',
    icon: 'calculator',
    color: '#FFD700',
  },
  {
    id: '7',
    title: 'Verify Investment Advisors',
    description: 'Check credentials before taking financial advice',
    content: 'Always verify that your financial advisor is registered with SEBI or IRDAI. Ask for their registration number and verify it on the official websites. Unregistered advisors may give poor advice or even steal your money. Legitimate advisors will be happy to provide their credentials.',
    category: 'fraud',
    icon: 'person-check',
    color: '#17A2B8',
  },
  {
    id: '8',
    title: 'Start Early, Benefit More',
    description: 'Time is your biggest ally in wealth building',
    content: 'Thanks to compound interest, starting to save and invest early gives you a huge advantage. ₹1,000 invested at age 25 could grow to ₹21,000 by age 65 (assuming 8% annual return). The same amount invested at age 35 would only grow to ₹10,000. Start today!',
    category: 'investment',
    icon: 'time',
    color: '#20C997',
  },
];

export default function LearnScreen() {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'saving':
        return '#28A745';
      case 'fraud':
        return '#DC3545';
      case 'investment':
        return '#006B3F';
      default:
        return '#666';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'saving':
        return 'Saving Tips';
      case 'fraud':
        return 'Fraud Prevention';
      case 'investment':
        return 'Investment Guide';
      default:
        return 'General';
    }
  };

  const handleTipPress = (tip: Tip) => {
    setSelectedTip(tip);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTip(null);
  };

  const renderTip = (tip: Tip) => (
    <TouchableOpacity
      key={tip.id}
      style={styles.tipCard}
      onPress={() => handleTipPress(tip)}>
      <View style={styles.tipHeader}>
        <View style={[
          styles.tipIcon,
          { backgroundColor: tip.color + '20' }
        ]}>
          <Ionicons name={tip.icon as any} size={24} color={tip.color} />
        </View>
        <View style={styles.tipBadge}>
          <Text style={[
            styles.tipBadgeText,
            { color: tip.color }
          ]}>
            {getCategoryLabel(tip.category)}
          </Text>
        </View>
      </View>
      
      <Text style={styles.tipTitle}>{tip.title}</Text>
      <Text style={styles.tipDescription}>{tip.description}</Text>
      
      <View style={styles.tipFooter}>
        <Text style={styles.readMore}>Read More</Text>
        <Ionicons name="chevron-forward" size={16} color="#006B3F" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learn & Grow</Text>
          <Text style={styles.headerSubtitle}>
            Master the art of smart saving and investing
          </Text>
        </View>

        {/* Featured Tip */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredHeader}>
            <Ionicons name="star" size={24} color="#FFD700" />
            <Text style={styles.featuredLabel}>Featured Tip</Text>
          </View>
          <Text style={styles.featuredTitle}>
            The 50-30-20 Rule for Smart Budgeting
          </Text>
          <Text style={styles.featuredDescription}>
            Allocate 50% of your income to needs, 30% to wants, and 20% to savings and investments. This simple rule helps maintain financial balance and ensures you're always saving something.
          </Text>
        </View>

        {/* Tips Grid */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Essential Knowledge</Text>
          <View style={styles.tipsGrid}>
            {tips.map(renderTip)}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="book" size={24} color="#006B3F" />
              <Text style={styles.actionText}>Download Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="calendar" size={24} color="#FF914D" />
              <Text style={styles.actionText}>Set Reminders</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Tip Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTip && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleRow}>
                    <View style={[
                      styles.modalIcon,
                      { backgroundColor: selectedTip.color + '20' }
                    ]}>
                      <Ionicons name={selectedTip.icon as any} size={24} color={selectedTip.color} />
                    </View>
                    <View style={styles.modalTitleContent}>
                      <Text style={styles.modalTitle}>{selectedTip.title}</Text>
                      <Text style={[
                        styles.modalCategory,
                        { color: selectedTip.color }
                      ]}>
                        {getCategoryLabel(selectedTip.category)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.modalBody}>
                  <Text style={styles.modalContentText}>{selectedTip.content}</Text>
                  
                  <View style={styles.modalActions}>
                    <TouchableOpacity style={styles.shareButton}>
                      <Ionicons name="share-social" size={20} color="#006B3F" />
                      <Text style={styles.shareButtonText}>Share Tip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bookmarkButton}>
                      <Ionicons name="bookmark" size={20} color="#FF914D" />
                      <Text style={styles.bookmarkButtonText}>Bookmark</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </>
            )}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
    marginLeft: 8,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  featuredDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tipCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipBadge: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tipBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
  },
  tipDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 12,
  },
  tipFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  readMore: {
    fontSize: 12,
    fontWeight: '600',
    color: '#006B3F',
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
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
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalTitleContent: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  modalCategory: {
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 24,
  },
  modalContentText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#006B3F',
    marginLeft: 6,
  },
  bookmarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  bookmarkButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF914D',
    marginLeft: 6,
  },
});