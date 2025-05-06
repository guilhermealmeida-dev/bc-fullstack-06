import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    gap: 12,
    alignItems: 'center',
  },
  card:{
    flexDirection:'row',
    justifyContent:'space-around',
    padding:20
    
  },
  content: {
    flexDirection: 'column',
    width: 110,
    height: 155,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  backgroundImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    backgroundColor:'#D9D9D9',
  },
  image: {
    width: 69,
    height: 94,
    resizeMode: 'contain',
  },
  containerText: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
