// components/SectionCard/SectionCard.tsx
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import CustomCard from '../CustomCard/CustomCard';
import {styles} from './style';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomImage from '../CustomImage/CustomImage';
import SectionAchievements from '../SectionAchievements/SectionAchievements';
import { useApp } from '../../hooks/useApp';

function SectionCard() {
  const {user} = useApp();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <CustomCard>
        <View style={styles.content}>
          <View style={styles.contentIcon}>
            <FontAwesome6 name="medal" size={25} color={'black'} />
          </View>
          <View style={styles.contentInfo}>
            <View style={styles.contentInfoNivel}>
              <Text style={styles.contentInfoNivelText}>{'Seu nível é'}</Text>
              <Text style={styles.contentInfoNivelValue}>
                {user?.level ?? 0}
              </Text>
            </View>
            <CustomImage source={'trofel'} style={styles.image} />
          </View>
          <View style={styles.contentProgress}>
            <View style={styles.contentProgressTop}>
              <Text style={styles.contentProgressTopText}>
                Pontos para o proximo nivel
              </Text>
              <Text style={styles.contentProgressTopXp}>
                {user?.xp ?? 0}/{1000}{' '}
                <Text style={[styles.contentProgressTopXp, {fontSize: 12}]}>
                  pts
                </Text>
              </Text>
            </View>
            <View style={styles.contentProgressBar}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: Math.min(((user?.xp ?? 0) / 1000) * 345.96, 345.96),
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      </CustomCard>
      <SectionAchievements />
    </ScrollView>
  );
}

export default SectionCard;
