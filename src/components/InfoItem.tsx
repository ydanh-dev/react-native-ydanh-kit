import type { ReactNode } from 'react';
import { StyleSheet, View, Text, type ViewStyle } from 'react-native';

interface KitInfoItemProps {
  /** The descriptive label for the information (e.g., 'Full Name') */
  label: string;
  /** The actual value to display (e.g., 'John Doe') */
  value: string | number | null | undefined;
  /** Optional icon to display on the left. Can be any valid React Node (e.g., an Icon component) */
  icon?: ReactNode;
  /** Whether this is the last item in a list (removes the bottom border) */
  isLast?: boolean;
  /** Custom style for the item container */
  style?: ViewStyle;
}

/**
 * Professional InfoItem component for displaying label-value pairs with an optional icon.
 */
export const KitInfoItem = ({
  label,
  value,
  icon,
  isLast = false,
  style,
}: KitInfoItemProps) => {
  return (
    <View
      style={[
        styles.container,
        !isLast && styles.border,
        style,
      ]}
    >
      {icon && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value || '---'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F7',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
    paddingBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8F9BB3',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A2138',
  },
});
