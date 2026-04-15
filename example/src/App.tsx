import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  KitCard, 
  KitHeader, 
  KitInfoItem, 
  KitInput, 
  KitKeyboardLayout, 
  KitTimePicker, 
  KitCustomerPicker 
} from '../../src/index';

const MOCK_CUSTOMERS = [
  { id: '1', name: 'Nguyen Van A', phone: '0901 234 567' },
  { id: '2', name: 'Tran Thi B', phone: '0988 777 666' },
  { id: '3', name: 'Le Van C', phone: '0912 333 444' },
  { id: '4', name: 'Pham Minh D', phone: '0977 111 222' },
];

export default function App() {
  const [time, setTime] = React.useState(new Date());
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [customerVisible, setCustomerVisible] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(MOCK_CUSTOMERS[0]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <KitKeyboardLayout>
          {/* 1. Header Transparent on Image */}
          <View style={styles.imageSection}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=2670' }}
              style={styles.imageHeader}
            >
              <KitHeader
                title="Profile & Pickup"
                subtitle="Transparent Header Restored"
                transparent
                onBack={() => { }}
              />
            </ImageBackground>
          </View>

          {/* 2. Standard Header Example (Inline) */}
          <KitHeader
            title="Pickup Confirmation"
            subtitle="Scroll to change time"
            onBack={() => { }}
            rightContent={
              <View style={styles.badge}>
                <Text style={styles.badgeText}>UI</Text>
              </View>
            }
          />

          <View style={styles.content}>
            <Text style={styles.sectionTitle}>TRIP DETAILS</Text>
            <KitCard style={styles.card}>
              <TouchableOpacity
                onPress={() => setCustomerVisible(true)}
                activeOpacity={0.7}
              >
                <KitInput
                  label="Passenger"
                  value={selectedCustomer?.name}
                  editable={false}
                  pointerEvents="none"
                  rightContent={<Text style={{ fontWeight: '900', color: '#3366FF' }}>CHOOSE</Text>}
                />
              </TouchableOpacity>

              <KitInput
                label="Driver Name"
                placeholder="Enter supervisor name"
                defaultValue="Anh Duy"
              />

              <TouchableOpacity
                onPress={() => setPickerVisible(true)}
                activeOpacity={0.7}
              >
                <KitInput
                  label="Pickup Time"
                  value={`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`}
                  editable={false}
                  pointerEvents="none"
                  rightContent={<Text style={{ fontWeight: '900', color: '#3366FF' }}>EDIT</Text>}
                />
              </TouchableOpacity>
              
              <KitInput
                label="Odometer"
                placeholder="0"
                keyboardType="numeric"
                rightContent={<Text style={{ fontWeight: '800', color: '#8F9BB3' }}>KM</Text>}
              />
            </KitCard>

            <View style={{ height: 20 }} />
            <Text style={styles.sectionTitle}>PASSENGER INFO</Text>
            <KitCard>
              <KitInfoItem
                label="Selected Passenger"
                value={selectedCustomer?.name || '---'}
                icon={<View style={[styles.dot, { backgroundColor: '#3366FF' }]} />}
              />
              <KitInfoItem
                label="Contact Number"
                value={selectedCustomer?.phone || '---'}
                isLast
              />
            </KitCard>
          </View>

          <View style={{ height: 100 }} />
        </KitKeyboardLayout>

        {/* Pickers */}
        <KitTimePicker
          visible={pickerVisible}
          initialTime={time}
          onClose={() => setPickerVisible(false)}
          onConfirm={(selectedDate) => setTime(selectedDate)}
          title="Select Pickup Time"
        />

        <KitCustomerPicker
          visible={customerVisible}
          customers={MOCK_CUSTOMERS}
          selectedId={selectedCustomer?.id}
          onClose={() => setCustomerVisible(false)}
          onSelect={(c) => {
            setSelectedCustomer(c);
            setCustomerVisible(false);
          }}
          title="Choose Passenger"
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8F9BB3',
    marginBottom: 12,
    marginLeft: 4,
    letterSpacing: 1,
  },
  imageSection: {
    marginBottom: 0,
  },
  imageHeader: {
    height: 250,
    width: '100%',
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3366FF',
  },
  badge: {
    backgroundColor: '#FF3D71',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
});
