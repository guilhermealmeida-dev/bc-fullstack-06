import {StyleSheet} from 'react-native';
import Fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  content: {
    flex: 1,
    marginLeft: 30,
    marginVertical: 20,
    marginRight: 20,
    gap: 10,
  },

  contentIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  contentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  contentInfoNivel: {
    justifyContent: 'space-between',
    gap: 10,
  },

  contentInfoNivelText: {
    fontFamily: Fonts.DMSansBold,
    fontWeight: 600,
    fontSize: 12,
    color: '#191919',
  },

  contentInfoNivelValue: {
    fontFamily: Fonts.DMSansBold,
    fontWeight: 700,
    fontSize: 25,
    color: '#191919',
  },

  image: {
    width: 152.52,
    height: 92,
  },

  contentProgress: {
    flexDirection: 'column',
    gap: 8,
  },

  contentProgressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    textAlign: 'center',
  },

  contentProgressTopText: {
    fontFamily: Fonts.DMSans,
    fontWeight: 500,
    fontSize: 10,
    color: '#303841',
  },

  contentProgressTopXp: {
    fontFamily: Fonts.DMSans,
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'right',
  },

  contentProgressBar: {
    marginTop: 8,
  },

  progressBarBackground: {
    width: 345.96,
    height: 4,
    backgroundColor: '#69696926',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },

  progressBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 4,
    backgroundColor: '#000',
    opacity: 1,
    borderRadius: 4,
    zIndex: 1,
  },
  
});
