import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {UserPanel} from '../../types/userPanel';
import CustomImage from '../CustomImage/CustomImage';
import IconInfo from '../IconInfo/IconInfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type PanelHomeProp = {
  mensage: string;
  user: UserPanel;
  onPress?: () => void;
};
function PanelHome(props: PanelHomeProp) {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.mensage}>{props.mensage}</Text>
        <Text style={styles.name}>{props.user.name} !</Text>
      </View>
      <View style={styles.containerProfile}>
        <IconInfo
          info={props.user.level as number}
          icon={{
            name: 'star',
            size: 16,
            color: '#ffff00',
            Component: MaterialIcons,
          }}
          styleContainer={styles.containerProfileIcon}
          textStyle={styles.containerProfileIconText}
        />
        <TouchableOpacity onPress={props.onPress}>
          <CustomImage
            url={props.user.avatar}
            style={styles.containerProfileAvatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default PanelHome;
