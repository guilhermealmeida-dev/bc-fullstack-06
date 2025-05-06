import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import CustomCard from '../CustomCard/CustomCard';
import CustomImage from '../CustomImage/CustomImage';
import { styles } from './style';
import { useApp } from '../../hooks/useApp';

function SectionAchievements() {
  const { user } = useApp();
  const achievements = user?.achievements ?? [];

  const groupedAchievements = [];
  for (let i = 0; i < achievements.length; i += 2) {
    groupedAchievements.push(achievements.slice(i, i + 2));
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={styles.scrollContainer}
    >
      {groupedAchievements.map((group, index) => (
        <CustomCard key={index}>
          <View style={styles.card}>
            {group.map((achievement, idx) => (
              <View key={idx} style={styles.content}>
                <View style={styles.backgroundImage}>
                  <CustomImage source={'medal'} style={styles.image} />
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.text}>
                    {achievement.criterion ?? 'Sem critério'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </CustomCard>
      ))}
    </ScrollView>
  );
}

export default SectionAchievements;
