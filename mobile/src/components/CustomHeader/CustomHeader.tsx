// src/components/CustomHeader.tsx
import React from 'react';
import {View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import styles from './style';

type HeaderProps = {
  title: string;
  style?: ViewStyle;
  children?: React.ReactNode;
  onBackPress?: () => void;
  showBackButton?: boolean;
};

const CustomHeader: React.FC<HeaderProps> = ({
  style,
  children,
  onBackPress,
  showBackButton = true,
}) => {
  return (
    <View style={[styles.header, style]}>
      {showBackButton && onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
};

export default CustomHeader;
