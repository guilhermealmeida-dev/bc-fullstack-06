import {StyleSheet} from 'react-native';
import Fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 137,
    backgroundColor: '#00BC7D',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    position: 'relative',
    zIndex: 1,
  },
  headercontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  elipse3: {
    position: 'absolute',
    width: 214.84,
    height: 214.84,
    top: -78,
    left: -47,
    backgroundColor: '#FFFFFF1A',
    borderRadius: 214.84 / 2,
    zIndex: -2,
  },
  elipse4: {
    position: 'absolute',
    width: 214.84,
    height: 214.84,
    top: -114,
    left: -69,
    backgroundColor: '#FFFFFF1A',
    borderRadius: 214.84 / 2,
    zIndex: -1,
  },
  buttonSeeMore: {
    fontFamily: Fonts.BebasNeue,
    fontSize: 15,
    color: '#191919',
    letterSpacing: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80,
  },
  containerRecommendations: {
    flex: 1,
    marginBottom: 16,
  },
  containerCategory: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00BC7D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
