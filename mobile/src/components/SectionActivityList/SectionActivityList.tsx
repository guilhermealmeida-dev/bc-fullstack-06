import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import styles from './style.tsx';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomTitle from '../CustomTitle/CustomTItle.tsx';
import {Activity} from '../../types/activity.tsx';
import ActivityCard from '../ActivityCard/ActivityCard.tsx';

type SectionActivityListProps = {
  activities: Activity[];
  title: string;
  renderAction?: () => React.ReactNode;
  showToggleButton?: boolean;
  isHorizontal?: boolean;
};

function SectionActivityList({
  activities,
  title,
  renderAction,
  showToggleButton,
  isHorizontal = false,
}: SectionActivityListProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <View>
      <View style={styles.sectionTitle}>
        <CustomTitle style={styles.title}>{title}</CustomTitle>

        {renderAction && <View>{renderAction()}</View>}

        {showToggleButton && (
          <TouchableOpacity onPress={() => setExpanded(prev => !prev)}>
            <FontAwesome6
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#191919"
              solid
            />
          </TouchableOpacity>
        )}
      </View>

      {expanded && (
        <FlatList
          data={activities}
          keyExtractor={item => item.id}
          horizontal={isHorizontal}
          contentContainerStyle={styles.containerList}
          renderItem={({item}) => <ActivityCard activity={item} />}
        />
      )}
    </View>
  );
}

export default SectionActivityList;
