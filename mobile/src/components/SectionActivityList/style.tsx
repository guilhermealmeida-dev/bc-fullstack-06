import {StyleSheet} from 'react-native';

const activityListStyles = StyleSheet.create({
  containerList: {
    justifyContent:'center',
    alignItems:'center',
    gap:20,
  },
  sectionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    color: '#171717',
  },
});

export default activityListStyles;
