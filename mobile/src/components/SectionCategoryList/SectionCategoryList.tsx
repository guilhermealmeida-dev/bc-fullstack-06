import React from 'react';
import {FlatList} from 'react-native';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './style';

type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

type SectionCategoryListProps = {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
};

export default function SectionCategoryList({
  categories,
  onCategoryPress,
}: SectionCategoryListProps) {
  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <CategoryCard
          name={item.name}
          imageUrl={item.image}
          onPress={() => onCategoryPress(item)}
        />
      )}
    />
  );
}
