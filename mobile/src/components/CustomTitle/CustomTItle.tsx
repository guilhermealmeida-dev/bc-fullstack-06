import { Text } from '@react-navigation/elements';
import { TextStyle } from 'react-native';
import { styles } from './styles';

type CustomTitleProps = {
    children: React.ReactNode;
    style?:TextStyle,
}
function CustomTitle(props: CustomTitleProps) {
    return(
        <Text style={[styles.title,props.style]}>{props.children}</Text>
    );
}
export default CustomTitle;