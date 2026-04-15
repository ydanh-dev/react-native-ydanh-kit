import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';

export interface Customer {
  id: string;
  name: string;
  phone: string;
}

interface KitCustomerPickerProps {
  /** Whether the picker is visible */
  visible: boolean;
  /** Callback to close the picker */
  onClose: () => void;
  /** List of customers to choose from */
  customers: Customer[];
  /** The currently selected customer */
  selectedId?: string;
  /** Callback when a customer is selected */
  onSelect: (customer: Customer) => void;
  /** Whether the list is currently loading */
  isLoading?: boolean;
  /** Title of the sheet */
  title?: string;
}

const SearchIcon = ({ color = '#8F9BB3' }: { color?: string }) => (
  <View style={styles.searchIconFrame}>
    <View style={[styles.searchCircle, { borderColor: color }]} />
    <View style={[styles.searchHandle, { backgroundColor: color }]} />
  </View>
);

const CheckIcon = ({ color = '#3366FF' }: { color?: string }) => (
  <View style={styles.checkFrame}>
    <View style={[styles.checkLong, { backgroundColor: color }]} />
    <View style={[styles.checkShort, { backgroundColor: color }]} />
  </View>
);

/**
 * Premium Customer Picker component with search and avatar generation.
 */
export function KitCustomerPicker({
  visible,
  onClose,
  customers,
  selectedId,
  onSelect,
  isLoading = false,
  title = 'Select Passenger',
}: KitCustomerPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Memoized list of customers based on the search query.
   * Efficiently filters both name and phone numbers.
   */
  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return customers;
    const lowerQuery = searchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.phone.includes(searchQuery)
    );
  }, [customers, searchQuery]);

  /**
   * Generates a consistent background and text color for the user avatar
   * based on the first character of their name.
   */
  const getAvatarColor = (name: string): { bg: string; text: string } => {
    const colors = [
      { bg: '#E3F2FD', text: '#1976D2' },
      { bg: '#F3E5F5', text: '#7B1FA2' },
      { bg: '#E8F5E9', text: '#388E3C' },
      { bg: '#FFF3E0', text: '#F57C00' },
      { bg: '#FCE4EC', text: '#C2185B' },
    ];
    const index = name.charCodeAt(0) % colors.length;
    const avatarColor = colors[index];
    return avatarColor ?? colors[0]!;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>{title.toUpperCase()}</Text>

          <View style={styles.searchContainer}>
            <SearchIcon />
            <TextInput
              style={styles.searchInput}
              placeholder="Search name or phone..."
              placeholderTextColor="#8F8F8F"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#3366FF" />
            </View>
          ) : (
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
              {filteredCustomers.map((c) => {
                const isSelected = selectedId === c.id;
                const avatarProps = getAvatarColor(c.name);
                return (
                  <Pressable
                    key={c.id}
                    onPress={() => onSelect(c)}
                    style={styles.listItem}
                  >
                    <View style={[styles.avatar, { backgroundColor: avatarProps.bg }]}>
                      <Text style={[styles.avatarText, { color: avatarProps.text }]}>
                        {c.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.itemInfo}>
                      <Text style={[styles.itemName, isSelected && styles.selectedText]}>
                        {c.name}
                      </Text>
                      <Text style={styles.itemPhone}>{c.phone}</Text>
                    </View>
                    {isSelected && <CheckIcon />}
                  </Pressable>
                );
              })}
              <View style={{ height: 20 }} />
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    height: '85%',
    paddingBottom: Platform.OS === 'ios' ? 44 : 24,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EDF1F7',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1A2138',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 20,
  },
  searchIconFrame: {
    width: 20,
    height: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchHandle: {
    width: 7,
    height: 2,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2138',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F9FC',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '900',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A2138',
    marginBottom: 4,
  },
  itemPhone: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8F9BB3',
  },
  selectedText: {
    color: '#3366FF',
  },
  checkFrame: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkLong: {
    width: 14,
    height: 2,
    transform: [{ rotate: '-45deg' }],
    position: 'absolute',
    right: 0,
    top: 8,
  },
  checkShort: {
    width: 8,
    height: 2,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 2,
    bottom: 6,
  },
});
