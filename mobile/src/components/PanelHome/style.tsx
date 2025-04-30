import {StyleSheet} from 'react-native';
import Fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'red',
    width: 377,
    height: 64.28,
    top: 50,
    position: 'absolute',
  },
  containerText: {
    flexDirection: 'column',
    backgroundColor: 'green',
  },
  mensage: {
    fontFamily: Fonts.DMSans,
    fontWeight: 500,
    fontSize: 15,
    letterSpacing: 0,
    color: '#FFFFFF',
  },
  name: {
    fontFamily: Fonts.DMSans,
    fontWeight: 500,
    fontSize: 30,
    letterSpacing: 0,
    color: '#FFFFFF',
  },
  profile: {
    width: 100,
    height:100,
    borderRadius: 100,
  },
});
