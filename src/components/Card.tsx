import React from 'react';
import { StyleSheet, View, type ViewStyle, Platform } from 'react-native';

interface KitCardProps {
  /** Content to be rendered inside the card */
  children: React.ReactNode;
  /** Custom style for the card container */
  style?: ViewStyle;
}

/**
 * Premium Liquid Glass Card component with soft shadows and large border radius.
 * Ideal for wrapping grouped information like mission details or passenger info.
 */
export const KitCard = ({ children, style }: KitCardProps) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.08,
        shadowRadius: 25,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
