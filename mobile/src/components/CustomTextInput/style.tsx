import { StyleSheet } from 'react-native';
import Fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    gap: 6,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 376,
  },
  input: {
    width: '100%',
    height: 56,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E5E5',
    color: '#A1A1A1',
    fontSize: 16,
    fontFamily: Fonts.DMSans,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontFamily: Fonts.DMSansBold,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#404040',
  },
  required: {
    color: '#E7000B',
    marginLeft: 2,
  },
  error: {
    color: 'red',
    marginTop: 4,
    marginLeft: 4,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  iconWrapper: {
    position: 'absolute',
    right: 15,
    top: 16,
  },
});
