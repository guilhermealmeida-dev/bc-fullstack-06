import {StyleSheet} from 'react-native';
import Fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.DMSans,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  button: {
    width: 321,
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: '#00BC7D',
    justifyContent: 'center',
  },
});
