import {
  GestureResponderEvent,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {styles} from './style';

type CustomTextLinkProps = {
  text?: string;
  textlink: string;
  textStyle?: TextStyle;
  linkStyle?: TextStyle;
  onPress: (event: GestureResponderEvent) => void;
};

function CustomTextLink(props: CustomTextLinkProps) {
  return (
    <View style={styles.container}>
     <Text style={[styles.text, props.textStyle]}>
      {props.text}
      {' '}
      <Text
        onPress={props.onPress}
        style={[styles.textLink, props.linkStyle]}>
        {props.textlink}
      </Text>
    </Text>
    </View>
  );
}
export default CustomTextLink;
