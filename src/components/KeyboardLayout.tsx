import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  type ViewStyle
} from 'react-native';

interface KitKeyboardLayoutProps {
  /** Content to be rendered inside the layout */
  children: ReactNode;
  /** Custom style for the ScrollView content container */
  contentContainerStyle?: ViewStyle;
  /** Whether to show the vertical scroll indicator */
  showsVerticalScrollIndicator?: boolean;
}

/**
 * A specialized layout component that automatically handles keyboard avoiding
 * and scrolling for forms and inputs.
 * 
 * It wraps its children in a KeyboardAvoidingView and a ScrollView to ensure
 * that input fields remain visible when the keyboard is displayed.
 */
export function KitKeyboardLayout({
  children,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
}: KitKeyboardLayoutProps) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      /** 
       * On iOS, we use 'padding' behavior to push the content up.
       * On Android, system default behavior (adjustResize in AndroidManifest) 
       * is usually preferred, so we pass undefined.
       */
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      /**
       * Offset calculation for the keyboard. If the screen has a fixed header
       * outside of this layout, adjust this value accordingly.
       */
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        /** Ensures that tapping outside an input dismisses the keyboard properly */
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
