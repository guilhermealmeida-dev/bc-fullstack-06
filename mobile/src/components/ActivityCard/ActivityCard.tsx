import React from 'react';
import {View, Text} from 'react-native';
import styles from './style.tsx';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomImage from '../CustomImage/CustomImage';
import IconInfo from '../IconInfo/IconInfo';
import {Activity} from '../../types/activity';

type ActivityCardProps = {
  activity: Activity;
};

function ActivityCard({activity}: ActivityCardProps) {
  return (
    <View style={styles.containerActivity}>
      <View style={styles.containerActivityImage}>
        {activity.private && (
          <View style={styles.lockIconContainer}>
            <FontAwesome6 name="lock" size={13} color="#FFFFFF" />
          </View>
        )}
        {activity.image && (
          <CustomImage
            url={activity.image}
            style={styles.image}
          />
        )}
      </View>

      <View style={styles.containerActivityInfo}>
        <Text style={styles.subTitle}>{activity.title}</Text>

        <View style={styles.containerIcons}>
          <IconInfo
            icon={{
              name: 'calendar',
              size: 20,
              color: '#009966',
              Component: FontAwesome6,
            }}
            info={activity.scheduledDate}
            styleContainer={styles.IconInfo}
            textStyle={styles.textIcon}
          />
          <Text style={styles.textIcon}>{'|'}</Text>
          <IconInfo
            icon={{
              name: 'people-group',
              size: 20,
              color: '#009966',
              Component: FontAwesome6,
            }}
            info={activity.participantCount.toString()}
            styleContainer={styles.IconInfo}
            textStyle={styles.textIcon}
          />
        </View>
      </View>
    </View>
  );
}

export default ActivityCard;
