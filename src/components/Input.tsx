import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

interface KitInputProps extends TextInputProps {
  /** Label text displayed above the input */
  label?: string;
  /** Optional icon to display on the left */
  icon?: React.ReactNode;
  /** Optional suffix content (like a button or icon) on the right */
  rightContent?: React.ReactNode;
  /** Custom style for the input container */
  containerStyle?: ViewStyle;
}

/**
 * Premium Input component with clean design and focus states.
 */
export function KitInput({
  label,
  icon,
  rightContent,
  containerStyle,
  onFocus,
  onBlur,
  style,
  ...props
}: KitInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          isFocused && styles.focused,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#8F9BB3"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8F9BB3',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#EDF1F7',
    paddingHorizontal: 16,
    minHeight: 56,
  },
  focused: {
    borderColor: '#3366FF',
    backgroundColor: '#F7F9FC',
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2138',
    paddingVertical: 12,
  },
  rightContent: {
    marginLeft: 12,
  },
});
