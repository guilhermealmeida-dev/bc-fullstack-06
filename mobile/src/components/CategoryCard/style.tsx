import { StyleSheet } from 'react-native';
import Fonts from '../../theme/fonts';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: 5,
  },
  image: {
    width: 61,
    height: 61,
    borderRadius: 61/2,
  },
  text: {
    fontFamily:Fonts.DMSans,
    fontWeight:600,
    fontSize:16,
    lineHeight:20,
    letterSpacing:0
  },
});

export default styles;
