import {StyleSheet} from 'react-native';
import Fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    fontFamily: Fonts.DMSans,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#404040',
  },
  textLink: {
    fontFamily: Fonts.DMSansBold,
  },
});
