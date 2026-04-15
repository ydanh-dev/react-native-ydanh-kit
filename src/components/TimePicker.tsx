import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  FlatList,
  Platform,
  TouchableOpacity,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';

const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 3;

interface WheelPickerProps {
  data: number[];
  selectedValue: number;
  onValueChange: (value: number) => void;
  label: string;
}

/**
 * Internal WheelPicker component that uses FlatList to simulate a native picker wheel.
 * It uses 'snapToInterval' and 'onMomentumScrollEnd' to handle automatic selection.
 */
const WheelPicker = ({
  data,
  selectedValue,
  onValueChange,
}: Omit<WheelPickerProps, 'label'>) => {
  const flatListRef = useRef<FlatList>(null);
  
  /** 
   * We add null items at the start and end of the list.
   * This allows the first and last numbers to be perfectly centered in the 3-item view.
   */
  const paddedData = useMemo(() => [null, ...data, null], [data]);

  /**
   * Called when the user finish scrolling.
   * Calculates which item is in the center based on its vertical offset.
   */
  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (data[index] !== undefined) {
      onValueChange(data[index] as number);
    }
  };

  /**
   * Effect to handle external changes to the selectedValue.
   * Automatically scrolls the list to the correct position (e.g., when resetting time).
   */
  useEffect(() => {
    const index = data.indexOf(selectedValue);
    if (index !== -1) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: index * ITEM_HEIGHT,
          animated: false,
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data, selectedValue]);

  return (
    <View style={styles.wheelColumn}>
      <View style={styles.wheelWrapper}>
        <FlatList
          ref={flatListRef}
          data={paddedData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={[styles.wheelItem, { height: ITEM_HEIGHT }]}>
              <Text
                style={[
                  styles.wheelItemText,
                  item === selectedValue ? styles.activeText : styles.inactiveText,
                ]}
              >
                {item !== null ? String(item).padStart(2, '0') : ''}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={onMomentumScrollEnd}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
    </View>
  );
};

interface KitTimePickerProps {
  visible: boolean;
  initialTime?: Date;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  title?: string;
}

export function KitTimePicker({
  visible,
  initialTime,
  onClose,
  onConfirm,
  title = 'Adjust Time',
}: KitTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date(initialTime || new Date()));

  useEffect(() => {
    if (visible) {
      setSelectedDateTime(new Date(initialTime || new Date()));
    }
  }, [visible, initialTime]);

  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  const setTimePart = (part: 'hour' | 'minute', nextValue: number) => {
    setSelectedDateTime((prev) => {
      const next = new Date(prev);
      if (part === 'hour') next.setHours(nextValue);
      if (part === 'minute') next.setMinutes(nextValue);
      return next;
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedDateTime);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.sheetOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.timeSheet}>
          <View style={styles.sheetHandle} />
          
          <View style={styles.timeHeader}>
            <Text style={styles.sheetTitle}>{title.toUpperCase()}</Text>
            <TouchableOpacity onPress={handleConfirm} style={styles.doneBtn}>
              <Text style={styles.doneBtnText}>DONE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.wheelContainer}>
            <View style={styles.selectionHighlight} pointerEvents="none" />
            <View style={styles.wheelColumns}>
              <WheelPicker
                data={hours}
                selectedValue={selectedDateTime.getHours()}
                onValueChange={(value) => setTimePart('hour', value)}
              />
              <View style={styles.wheelColonWrapper}>
                <Text style={styles.wheelColon}>:</Text>
              </View>
              <WheelPicker
                data={minutes}
                selectedValue={selectedDateTime.getMinutes()}
                onValueChange={(value) => setTimePart('minute', value)}
              />
            </View>
          </View>

          <View style={styles.wheelLabels}>
            <Text style={styles.wheelLabel}>HOUR</Text>
            <Text style={styles.wheelLabel}>MINUTE</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  timeSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    minHeight: 400,
    paddingBottom: Platform.OS === 'ios' ? 44 : 24,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EDF1F7',
    alignSelf: 'center',
    marginBottom: 20,
  },
  timeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  sheetTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1A2138',
    letterSpacing: 2,
  },
  doneBtn: {
    backgroundColor: '#3366FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1,
  },
  wheelContainer: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    justifyContent: 'center',
    marginTop: 10,
  },
  wheelColumns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wheelColumn: {
    flex: 1,
    alignItems: 'center',
  },
  columnLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#8F9BB3',
    marginBottom: 12,
    letterSpacing: 1,
  },
  wheelWrapper: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    width: '100%',
  },
  selectionHighlight: {
    ...StyleSheet.absoluteFillObject,
    height: ITEM_HEIGHT,
    top: ITEM_HEIGHT,
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    marginHorizontal: 16,
  },
  wheelItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelItemText: {
    fontSize: 32,
    fontWeight: '700',
  },
  activeText: {
    color: '#3366FF',
    fontWeight: '900',
  },
  inactiveText: {
    color: '#D1D9E8',
  },
  wheelColonWrapper: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelColon: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1A2138',
  },
  wheelLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingHorizontal: 40,
  },
  wheelLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#8F9BB3',
    letterSpacing: 1,
    textAlign: 'center',
    width: 80,
  },
});
