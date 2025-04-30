import {Text, View} from 'react-native';
import {styles} from './style';
import {userPanel} from '../../types/userPanel';
import CustomImage from '../CustomImage/CustomImage';
type PanelHomeProp = {
  mensage: string;
  user: userPanel;
};
function PanelHome(prop: PanelHomeProp) {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.mensage}>{prop.mensage}</Text>
        <Text style={styles.name}>{prop.user.name} !</Text>
      </View>
      <CustomImage url={prop.user.avatar} style={styles.profile}/>
    </View>
  );
}
export default PanelHome;
