import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on iPhone 12 (390x844) as base design
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Device type detection
export const isTablet = SCREEN_WIDTH >= 768;
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isLargeDevice = SCREEN_WIDTH >= 414;

// Responsive dimensions
export const wp = (percentage) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

export const hp = (percentage) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive font sizes
export const fontSize = {
  xs: isSmallDevice ? 10 : isTablet ? 14 : 12,
  sm: isSmallDevice ? 12 : isTablet ? 16 : 14,
  base: isSmallDevice ? 14 : isTablet ? 18 : 16,
  lg: isSmallDevice ? 16 : isTablet ? 20 : 18,
  xl: isSmallDevice ? 18 : isTablet ? 24 : 20,
  '2xl': isSmallDevice ? 20 : isTablet ? 28 : 24,
  '3xl': isSmallDevice ? 24 : isTablet ? 32 : 28,
  '4xl': isSmallDevice ? 28 : isTablet ? 36 : 32,
  '5xl': isSmallDevice ? 32 : isTablet ? 40 : 36,
};

// Responsive spacing
export const spacing = {
  xs: isSmallDevice ? 2 : isTablet ? 6 : 4,
  sm: isSmallDevice ? 4 : isTablet ? 10 : 8,
  base: isSmallDevice ? 8 : isTablet ? 16 : 12,
  lg: isSmallDevice ? 12 : isTablet ? 20 : 16,
  xl: isSmallDevice ? 16 : isTablet ? 24 : 20,
  '2xl': isSmallDevice ? 20 : isTablet ? 32 : 24,
  '3xl': isSmallDevice ? 24 : isTablet ? 40 : 32,
  '4xl': isSmallDevice ? 32 : isTablet ? 48 : 40,
  '5xl': isSmallDevice ? 40 : isTablet ? 64 : 48,
};

// Responsive border radius
export const borderRadius = {
  none: 0,
  sm: isSmallDevice ? 2 : isTablet ? 6 : 4,
  base: isSmallDevice ? 4 : isTablet ? 10 : 6,
  md: isSmallDevice ? 6 : isTablet ? 12 : 8,
  lg: isSmallDevice ? 8 : isTablet ? 16 : 12,
  xl: isSmallDevice ? 12 : isTablet ? 20 : 16,
  '2xl': isSmallDevice ? 16 : isTablet ? 24 : 20,
  '3xl': isSmallDevice ? 20 : isTablet ? 32 : 24,
  full: 9999,
};

// Responsive icon sizes
export const iconSize = {
  xs: isSmallDevice ? 12 : isTablet ? 18 : 16,
  sm: isSmallDevice ? 16 : isTablet ? 22 : 20,
  base: isSmallDevice ? 20 : isTablet ? 28 : 24,
  lg: isSmallDevice ? 24 : isTablet ? 32 : 28,
  xl: isSmallDevice ? 28 : isTablet ? 36 : 32,
  '2xl': isSmallDevice ? 32 : isTablet ? 40 : 36,
};

// Responsive component sizes
export const componentSize = {
  button: {
    height: isSmallDevice ? 44 : isTablet ? 56 : 48,
    padding: isSmallDevice ? 12 : isTablet ? 18 : 16,
  },
  input: {
    height: isSmallDevice ? 40 : isTablet ? 52 : 44,
    padding: isSmallDevice ? 10 : isTablet ? 16 : 12,
  },
  card: {
    padding: isSmallDevice ? 12 : isTablet ? 24 : 16,
    margin: isSmallDevice ? 8 : isTablet ? 16 : 12,
  },
  header: {
    height: isSmallDevice ? 56 : isTablet ? 72 : 64,
    padding: isSmallDevice ? 12 : isTablet ? 24 : 16,
  },
  tabBar: {
    height: isSmallDevice ? 60 : isTablet ? 80 : 65,
    padding: isSmallDevice ? 8 : isTablet ? 12 : 10,
  },
};

// Get responsive value based on screen size
export const getResponsiveValue = (small, medium, large) => {
  if (isSmallDevice) return small;
  if (isTablet) return large;
  return medium;
};

// Screen dimensions
export const screenData = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isTablet,
  isSmallDevice,
  isLargeDevice,
};

// Responsive grid system
export const grid = {
  container: wp(100),
  col1: wp(8.333),
  col2: wp(16.666),
  col3: wp(25),
  col4: wp(33.333),
  col5: wp(41.666),
  col6: wp(50),
  col7: wp(58.333),
  col8: wp(66.666),
  col9: wp(75),
  col10: wp(83.333),
  col11: wp(91.666),
  col12: wp(100),
};