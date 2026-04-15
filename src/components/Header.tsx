import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface KitHeaderProps {
  /**
   * Main title of the header.
   * By default, it will be automatically converted to UPPERCASE.
   */
  title: string;

  /**
   * Optional subtitle displayed below the main title.
   */
  subtitle?: string;

  /**
   * Controls the visibility of the back button.
   * @default true
   */
  showBack?: boolean;

  /**
   * Callback function when the user presses the back button.
   */
  onBack?: () => void;

  /**
   * Background color of the header. Ignored if `transparent` is true.
   * @default '#FFFFFF'
   */
  backgroundColor?: string;

  /**
   * Custom style for the entire header container.
   */
  containerStyle?: ViewStyle;

  /**
   * Custom style for the title text.
   */
  titleStyle?: TextStyle;

  /**
   * Custom style for the subtitle text.
   */
  subtitleStyle?: TextStyle;

  /**
   * Component to display on the right side of the header.
   */
  rightContent?: React.ReactNode;

  /**
   * Component to display on the left side (replaces back button if showBack is false).
   */
  leftContent?: React.ReactNode;

  /**
   * If true, the header will have a transparent background and absolute positioning
   * to overlay the content below.
   * @default false
   */
  transparent?: boolean;
}

const ChevronLeft = ({ color = '#1A2138' }: { color?: string }) => (
  <View
    style={{
      width: 12,
      height: 12,
      borderLeftWidth: 2,
      borderBottomWidth: 2,
      borderColor: color,
      transform: [{ rotate: '45deg' }],
      marginLeft: 4,
    }}
  />
);

export function KitHeader({
  title,
  subtitle,
  showBack = true,
  onBack,
  backgroundColor = '#FFFFFF',
  containerStyle,
  titleStyle,
  subtitleStyle,
  rightContent,
  leftContent,
  transparent = false,
}: KitHeaderProps) {
  const insets = useSafeAreaInsets();

  const isIOS = Platform.OS === 'ios';
  const headerHeight = isIOS ? 120 : 85;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          height: headerHeight + insets.top,
          backgroundColor: transparent ? 'transparent' : backgroundColor,
          position: transparent ? 'absolute' : 'relative',
        },
        containerStyle,
      ]}
    >
      <View style={styles.side}>
        {showBack ? (
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [
              styles.backBtn,
              {
                backgroundColor: transparent
                  ? 'rgba(255,255,255,0.2)'
                  : '#FFFFFF',
              },
              pressed && styles.pressed,
            ]}
          >
            <ChevronLeft color={transparent ? '#FFFFFF' : '#1A2138'} />
          </Pressable>
        ) : (
          leftContent
        )}
      </View>

      <View style={styles.center}>
        <Text
          style={[
            styles.title,
            { color: transparent ? '#FFFFFF' : '#1A2138' },
            titleStyle,
          ]}
          numberOfLines={1}
        >
          {title.toUpperCase()}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              { color: transparent ? 'rgba(255,255,255,0.7)' : '#8F9BB3' },
              subtitleStyle,
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <View style={[styles.side, { alignItems: 'flex-end' }]}>
        {rightContent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
    zIndex: 100,
    borderBottomWidth: 0,
    paddingBottom: 25,
  },
  side: {
    width: 48,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});
