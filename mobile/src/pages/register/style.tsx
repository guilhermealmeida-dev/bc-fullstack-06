import {StyleSheet} from 'react-native';
import Fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    width: '100%',
  },
  containerHeaderTitle: {
    alignItems: 'flex-start',
    gap: 10,
    width: '100%',
  },
  containerForm: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
  },
  containerInput: {
    gap: 6,
  },

  containerNavigation: {
    gap: 50,
  },
  text: {
    fontFamily: Fonts.DMSans,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#404040',
    width: 256,
    height: 96,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  keybord: {
    flexGrow: 1,
  },
});
