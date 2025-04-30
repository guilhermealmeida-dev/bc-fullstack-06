import {
  GestureResponderEvent,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { styles } from './style';

type CustomButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: ViewStyle;
  textStyle?:TextStyle;
};

function CustomButton(props: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, props.buttonStyle]}
      onPress={props.onPress}>
      <Text style={[styles.text,props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
