import {StyleSheet} from 'react-native';
import Fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 377,
    height: 64.28,
    top: 50,
    position: 'absolute',
  },
  containerText: {
    flexDirection: 'column',
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
  containerProfile:{
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    gap:20,
  },
  containerProfileIcon:{
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#FFF',
    paddingVertical:8,
    paddingHorizontal:12,
    gap:6,
  },
  containerProfileIconText:{
    color:'#FFF',
    fontFamily:Fonts.BebasNeue,
    fontSize:14,
    fontWeight:400,
  },
  containerProfileAvatar: {
    width: 58,
    height: 58,
    borderRadius:58/2,
    overflow: 'hidden',
  },
});
