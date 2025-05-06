import React from 'react';
import {View, ViewStyle} from 'react-native';
import {styles} from './style';

type CustomCardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

function CustomCard({children}: CustomCardProps) {
  return <View style={styles.container}>{children}</View>;
}

export default CustomCard;
