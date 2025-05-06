import { StyleSheet } from 'react-native';
import Fonts from '../../theme/fonts';

const activityCardStyles = StyleSheet.create({
  containerActivity: {
    width: 354,
    height: 228,
    alignItems: 'center',
    gap: 16,
  },
  containerActivityImage: {
    width: '100%',
    flexDirection: 'row',
  },
  image: {
    width: 354,
    height: 160,
    borderRadius: 8,
  },
  containerActivityInfo: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  subTitle: {
    fontFamily: Fonts.DMSans,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#191919',
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 20,
    width: '100%',
    gap: 12,
  },
  IconInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 6,
    alignItems: 'center',
  },
  textIcon: {
    fontFamily: Fonts.DMSans,
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 0,
    color: '#404040',
  },
  lockIconContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 34.42,
    height: 34.42,
    backgroundColor: '#00BC7D',
    borderRadius: 17.21,
    borderWidth: 1,
    borderColor: '#00BC7D',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});

export default activityCardStyles;
