import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

const Card = ({ 
  title, 
  children, 
  gradient = colors.primaryGradient,
  style = {},
  titleStyle = {},
  contentStyle = {},
  showGradientHeader = true
}) => {
  return (
    <View style={[styles.container, style]}>
      {showGradientHeader && title && (
        <LinearGradient
          colors={gradient}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </LinearGradient>
      )}
      {!showGradientHeader && title && (
        <View style={styles.plainHeader}>
          <Text style={[styles.plainTitle, titleStyle]}>{title}</Text>
        </View>
      )}
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  plainHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
  },
  plainTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  content: {
    padding: 16,
  },
});

export default Card;