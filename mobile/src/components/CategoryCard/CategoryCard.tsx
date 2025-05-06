import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import CustomImage from '../CustomImage/CustomImage';

type CategoryCardProps = {
  name: string;
  onPress: () => void;
  imageUrl: string;
};

export default function CategoryCard(props: CategoryCardProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.content}>
        <CustomImage url={props.imageUrl} style={styles.image} />
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
